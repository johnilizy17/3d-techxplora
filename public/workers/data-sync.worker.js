// Web Worker for Data Synchronization
// Handles background sync of offline data

self.addEventListener('message', async (event) => {
  const { type, data } = event.data;

  switch (type) {
    case 'SYNC_PENDING_DATA':
      await syncPendingData(data);
      break;
    
    case 'BATCH_UPLOAD':
      await batchUpload(data);
      break;
    
    case 'COMPRESS_DATA':
      compressData(data);
      break;
    
    case 'VALIDATE_SYNC_DATA':
      validateSyncData(data);
      break;
    
    default:
      self.postMessage({ error: 'Unknown sync type' });
  }
});

// Sync pending data
async function syncPendingData(data) {
  const { items, apiUrl, token } = data;
  const results = {
    success: [],
    failed: [],
    total: items.length
  };

  for (const item of items) {
    try {
      const response = await fetch(`${apiUrl}/${item.endpoint}`, {
        method: item.method || 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(item.data)
      });

      if (response.ok) {
        results.success.push({
          id: item.id,
          type: item.type,
          timestamp: Date.now()
        });
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      results.failed.push({
        id: item.id,
        type: item.type,
        error: error.message
      });
    }

    // Report progress
    self.postMessage({
      type: 'SYNC_PROGRESS',
      progress: {
        completed: results.success.length + results.failed.length,
        total: items.length,
        percentage: ((results.success.length + results.failed.length) / items.length) * 100
      }
    });
  }

  self.postMessage({
    type: 'SYNC_COMPLETE',
    result: results
  });
}

// Batch upload data
async function batchUpload(data) {
  const { items, apiUrl, token, batchSize = 10 } = data;
  const batches = [];

  // Split into batches
  for (let i = 0; i < items.length; i += batchSize) {
    batches.push(items.slice(i, i + batchSize));
  }

  const results = {
    success: 0,
    failed: 0,
    errors: []
  };

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];

    try {
      const response = await fetch(`${apiUrl}/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items: batch })
      });

      if (response.ok) {
        results.success += batch.length;
      } else {
        throw new Error(`Batch ${i + 1} failed`);
      }
    } catch (error) {
      results.failed += batch.length;
      results.errors.push({
        batch: i + 1,
        error: error.message
      });
    }

    // Report progress
    self.postMessage({
      type: 'BATCH_PROGRESS',
      progress: {
        batch: i + 1,
        totalBatches: batches.length,
        percentage: ((i + 1) / batches.length) * 100
      }
    });
  }

  self.postMessage({
    type: 'BATCH_COMPLETE',
    result: results
  });
}

// Compress data for efficient storage
function compressData(data) {
  const { items } = data;
  
  // Simple compression: remove unnecessary fields, deduplicate
  const compressed = items.map(item => {
    const essential = {
      id: item.id,
      type: item.type,
      data: item.data
    };

    // Remove null/undefined values
    Object.keys(essential.data).forEach(key => {
      if (essential.data[key] === null || essential.data[key] === undefined) {
        delete essential.data[key];
      }
    });

    return essential;
  });

  const originalSize = JSON.stringify(items).length;
  const compressedSize = JSON.stringify(compressed).length;
  const savings = ((originalSize - compressedSize) / originalSize) * 100;

  self.postMessage({
    type: 'COMPRESSION_COMPLETE',
    result: {
      compressed,
      originalSize,
      compressedSize,
      savings: savings.toFixed(2)
    }
  });
}

// Validate sync data
function validateSyncData(data) {
  const { items } = data;
  const validation = {
    valid: [],
    invalid: [],
    warnings: []
  };

  items.forEach((item, index) => {
    const issues = [];

    // Check required fields
    if (!item.id) issues.push('Missing ID');
    if (!item.type) issues.push('Missing type');
    if (!item.data) issues.push('Missing data');

    // Check data integrity
    if (item.data) {
      if (typeof item.data !== 'object') {
        issues.push('Data must be an object');
      }

      if (Object.keys(item.data).length === 0) {
        validation.warnings.push({
          index,
          message: 'Empty data object'
        });
      }
    }

    if (issues.length > 0) {
      validation.invalid.push({
        index,
        item,
        issues
      });
    } else {
      validation.valid.push(item);
    }
  });

  self.postMessage({
    type: 'VALIDATION_COMPLETE',
    result: validation
  });
}
