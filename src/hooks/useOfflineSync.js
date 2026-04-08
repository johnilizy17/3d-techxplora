import { useEffect, useState } from 'react';
import { useOnlineStatus } from './useOnlineStatus';
import { getPendingSyncItems, markSyncComplete } from '@/utils/offlineStorage';
import { toast } from 'sonner';

export function useOfflineSync() {
  const isOnline = useOnlineStatus();
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  // Check pending items on mount
  useEffect(() => {
    checkPendingItems();
  }, []);

  // Sync when coming back online
  useEffect(() => {
    if (isOnline && pendingCount > 0) {
      syncPendingItems();
    }
  }, [isOnline, pendingCount]);

  const checkPendingItems = async () => {
    try {
      const items = await getPendingSyncItems();
      setPendingCount(items.length);
    } catch (error) {
      console.error('Error checking pending items:', error);
    }
  };

  const syncPendingItems = async () => {
    if (isSyncing) return;

    setIsSyncing(true);
    
    try {
      const items = await getPendingSyncItems();
      
      if (items.length === 0) {
        setPendingCount(0);
        return;
      }

      toast.info(`Syncing ${items.length} pending items...`);

      let successCount = 0;
      let failCount = 0;

      for (const item of items) {
        try {
          // Sync based on item type
          await syncItem(item);
          await markSyncComplete(item.id);
          successCount++;
        } catch (error) {
          console.error('Failed to sync item:', item, error);
          failCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`Synced ${successCount} items successfully`);
      }

      if (failCount > 0) {
        toast.error(`Failed to sync ${failCount} items`);
      }

      await checkPendingItems();
    } catch (error) {
      console.error('Error syncing pending items:', error);
      toast.error('Failed to sync offline data');
    } finally {
      setIsSyncing(false);
    }
  };

  const syncItem = async (item) => {
    // Implement your sync logic based on item type
    // This should make API calls to sync the data
    
    switch (item.type) {
      case 'quiz_submission':
        // Sync quiz submission
        // await api.submitQuiz(item.data);
        break;
      
      case 'progress_update':
        // Sync progress update
        // await api.updateProgress(item.data);
        break;
      
      case 'course_enrollment':
        // Sync course enrollment
        // await api.enrollCourse(item.data);
        break;
      
      default:
        console.warn('Unknown sync item type:', item.type);
    }
  };

  return {
    isSyncing,
    pendingCount,
    syncPendingItems,
    checkPendingItems
  };
}
