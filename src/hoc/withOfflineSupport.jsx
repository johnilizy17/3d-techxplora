import { useEffect, useState } from 'react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { WifiOff, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

/**
 * Higher-Order Component to add offline support to any page
 * @param {Component} WrappedComponent - The component to wrap
 * @param {Object} options - Configuration options
 * @returns {Component} - Enhanced component with offline support
 */
export function withOfflineSupport(WrappedComponent, options = {}) {
  const {
    showOfflineIndicator = true,
    showOfflineBadge = false,
    cacheData = null, // Function to cache data
    getCachedData = null, // Function to get cached data
    pageName = 'Page'
  } = options;

  return function OfflineEnhancedComponent(props) {
    const isOnline = useOnlineStatus();
    const [isOfflineAvailable, setIsOfflineAvailable] = useState(false);
    const [cachedData, setCachedData] = useState(null);

    // Check if data is available offline
    useEffect(() => {
      if (getCachedData) {
        checkOfflineAvailability();
      }
    }, []);

    const checkOfflineAvailability = async () => {
      try {
        const data = await getCachedData();
        if (data) {
          setIsOfflineAvailable(true);
          if (!isOnline) {
            setCachedData(data);
          }
        }
      } catch (error) {
        console.error('Error checking offline availability:', error);
      }
    };

    // Cache data when online
    useEffect(() => {
      if (isOnline && cacheData && props.data) {
        cacheData(props.data).catch(err => 
          console.error('Failed to cache data:', err)
        );
      }
    }, [isOnline, props.data]);

    return (
      <div className="relative">
        {/* Offline Indicator */}
        {showOfflineIndicator && !isOnline && (
          <div className="bg-orange-100 dark:bg-orange-900/20 border-2 border-orange-300 dark:border-orange-500/20 p-4 rounded-2xl mb-6 flex items-center gap-3">
            <WifiOff className="w-5 h-5 text-orange-600 dark:text-orange-500" />
            <div>
              <span className="text-sm font-bold text-orange-700 dark:text-orange-400 block">
                You're offline
              </span>
              <span className="text-xs text-orange-600 dark:text-orange-500">
                {isOfflineAvailable 
                  ? 'Viewing cached content' 
                  : 'Some features may be limited'}
              </span>
            </div>
          </div>
        )}

        {/* Offline Badge */}
        {showOfflineBadge && isOfflineAvailable && (
          <div className="mb-4">
            <Badge variant="secondary" className="gap-1">
              <Download className="w-3 h-3" />
              Available Offline
            </Badge>
          </div>
        )}

        {/* Wrapped Component */}
        <WrappedComponent 
          {...props} 
          isOnline={isOnline}
          isOfflineAvailable={isOfflineAvailable}
          cachedData={cachedData}
        />
      </div>
    );
  };
}

/**
 * Hook version for functional components
 */
export function useOfflineSupport(options = {}) {
  const {
    cacheData = null,
    getCachedData = null,
    data = null
  } = options;

  const isOnline = useOnlineStatus();
  const [isOfflineAvailable, setIsOfflineAvailable] = useState(false);
  const [cachedData, setCachedData] = useState(null);

  // Check if data is available offline
  useEffect(() => {
    if (getCachedData) {
      checkOfflineAvailability();
    }
  }, []);

  const checkOfflineAvailability = async () => {
    try {
      const data = await getCachedData();
      if (data) {
        setIsOfflineAvailable(true);
        if (!isOnline) {
          setCachedData(data);
        }
      }
    } catch (error) {
      console.error('Error checking offline availability:', error);
    }
  };

  // Cache data when online
  useEffect(() => {
    if (isOnline && cacheData && data) {
      cacheData(data).catch(err => 
        console.error('Failed to cache data:', err)
      );
    }
  }, [isOnline, data]);

  return {
    isOnline,
    isOfflineAvailable,
    cachedData,
    checkOfflineAvailability
  };
}
