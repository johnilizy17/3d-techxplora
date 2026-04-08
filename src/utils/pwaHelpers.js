// PWA Helper utilities

// Check if app is installed as PWA
export function isPWAInstalled() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true ||
    document.referrer.includes('android-app://')
  );
}

// Check if browser supports PWA features
export function isPWASupported() {
  return (
    'serviceWorker' in navigator &&
    'caches' in window &&
    'PushManager' in window
  );
}

// Prompt user to install PWA (if available)
export async function promptPWAInstall() {
  const deferredPrompt = window.deferredPrompt;
  
  if (!deferredPrompt) {
    console.log('PWA install prompt not available');
    return false;
  }

  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  
  console.log(`User response to install prompt: ${outcome}`);
  window.deferredPrompt = null;
  
  return outcome === 'accepted';
}

// Get app install status
export function getInstallStatus() {
  if (isPWAInstalled()) {
    return 'installed';
  }
  
  if (window.deferredPrompt) {
    return 'installable';
  }
  
  return 'not-installable';
}

// Check if running on iOS
export function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// Check if running on Android
export function isAndroid() {
  return /Android/.test(navigator.userAgent);
}

// Get device type
export function getDeviceType() {
  if (isIOS()) return 'ios';
  if (isAndroid()) return 'android';
  return 'desktop';
}

// Show iOS install instructions
export function showIOSInstallInstructions() {
  if (!isIOS()) return false;
  
  return {
    title: 'Install TechXplora',
    steps: [
      'Tap the Share button',
      'Scroll down and tap "Add to Home Screen"',
      'Tap "Add" in the top right corner'
    ]
  };
}

// Check if app needs update
export async function checkForUpdates() {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    
    if (registration) {
      await registration.update();
      return true;
    }
  }
  
  return false;
}

// Force app reload with cache clear
export async function forceReload() {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    
    for (const registration of registrations) {
      await registration.unregister();
    }
  }
  
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(name => caches.delete(name)));
  }
  
  window.location.reload(true);
}

// Get app version from manifest
export async function getAppVersion() {
  try {
    const response = await fetch('/manifest.json');
    const manifest = await response.json();
    return manifest.version || '1.0.0';
  } catch (error) {
    console.error('Error fetching app version:', error);
    return 'unknown';
  }
}

// Share content using Web Share API
export async function shareContent(data) {
  if (!navigator.share) {
    console.log('Web Share API not supported');
    return false;
  }

  try {
    await navigator.share(data);
    return true;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Error sharing:', error);
    }
    return false;
  }
}

// Copy to clipboard
export async function copyToClipboard(text) {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  }
  
  // Fallback for older browsers
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.select();
  
  try {
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    document.body.removeChild(textArea);
    return false;
  }
}

// Request persistent storage
export async function requestPersistentStorage() {
  if (navigator.storage && navigator.storage.persist) {
    const isPersisted = await navigator.storage.persist();
    console.log(`Persistent storage granted: ${isPersisted}`);
    return isPersisted;
  }
  
  return false;
}

// Check if storage is persisted
export async function isStoragePersisted() {
  if (navigator.storage && navigator.storage.persisted) {
    return await navigator.storage.persisted();
  }
  
  return false;
}

// Get network information
export function getNetworkInfo() {
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData
    };
  }
  
  return null;
}

// Check if on slow connection
export function isSlowConnection() {
  const networkInfo = getNetworkInfo();
  
  if (!networkInfo) return false;
  
  return (
    networkInfo.effectiveType === 'slow-2g' ||
    networkInfo.effectiveType === '2g' ||
    networkInfo.saveData === true
  );
}

// Preload critical resources
export function preloadResources(urls) {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
}

// Add to home screen event listener
export function setupInstallPromptListener(callback) {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
    
    if (callback) {
      callback(e);
    }
  });
}

// App installed event listener
export function setupAppInstalledListener(callback) {
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    window.deferredPrompt = null;
    
    if (callback) {
      callback();
    }
  });
}
