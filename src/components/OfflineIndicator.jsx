import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { WifiOff, Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function OfflineIndicator() {
  const isOnline = useOnlineStatus();
  const [showNotification, setShowNotification] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowNotification(true);
      setWasOffline(true);
    } else if (wasOffline) {
      // Show "back online" message briefly
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        setWasOffline(false);
      }, 3000);
    }
  }, [isOnline, wasOffline]);

  if (!showNotification) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
        isOnline
          ? 'bg-green-500 text-white'
          : 'bg-orange-500 text-white'
      }`}
    >
      {isOnline ? (
        <>
          <Wifi className="w-5 h-5" />
          <span className="font-medium">Back online</span>
        </>
      ) : (
        <>
          <WifiOff className="w-5 h-5" />
          <span className="font-medium">You're offline</span>
        </>
      )}
    </div>
  );
}
