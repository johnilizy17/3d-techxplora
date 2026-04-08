import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Download, 
  CheckCircle2, 
  WifiOff, 
  RefreshCw,
  Share2,
  HardDrive
} from 'lucide-react';
import { 
  isPWAInstalled, 
  isPWASupported, 
  getInstallStatus,
  getDeviceType,
  showIOSInstallInstructions,
  checkForUpdates,
  shareContent,
  isStoragePersisted,
  requestPersistentStorage
} from '@/utils/pwaHelpers';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { toast } from 'sonner';

export default function PWAStatus() {
  const [installStatus, setInstallStatus] = useState('checking');
  const [deviceType, setDeviceType] = useState('desktop');
  const [isPersisted, setIsPersisted] = useState(false);
  const [checking, setChecking] = useState(false);
  const isOnline = useOnlineStatus();

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    setInstallStatus(getInstallStatus());
    setDeviceType(getDeviceType());
    
    const persisted = await isStoragePersisted();
    setIsPersisted(persisted);
  };

  const handleInstall = () => {
    if (deviceType === 'ios') {
      const instructions = showIOSInstallInstructions();
      toast.info(
        <div>
          <p className="font-semibold mb-2">{instructions.title}</p>
          <ol className="list-decimal list-inside space-y-1">
            {instructions.steps.map((step, i) => (
              <li key={i} className="text-sm">{step}</li>
            ))}
          </ol>
        </div>,
        { duration: 10000 }
      );
    } else if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      window.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          toast.success('App installed successfully!');
          checkStatus();
        }
        window.deferredPrompt = null;
      });
    }
  };

  const handleCheckUpdates = async () => {
    setChecking(true);
    try {
      await checkForUpdates();
      toast.success('App is up to date!');
    } catch (error) {
      toast.error('Failed to check for updates');
    } finally {
      setChecking(false);
    }
  };

  const handleShare = async () => {
    const shared = await shareContent({
      title: 'TechXplora',
      text: 'Check out TechXplora - Interactive learning platform!',
      url: window.location.origin
    });

    if (shared) {
      toast.success('Shared successfully!');
    } else {
      toast.error('Sharing not supported on this device');
    }
  };

  const handleRequestPersistence = async () => {
    const granted = await requestPersistentStorage();
    
    if (granted) {
      toast.success('Persistent storage granted!');
      setIsPersisted(true);
    } else {
      toast.info('Persistent storage not available');
    }
  };

  if (!isPWASupported()) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>PWA Not Supported</CardTitle>
          <CardDescription>
            Your browser doesn't support Progressive Web App features
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="w-5 h-5" />
          App Status
        </CardTitle>
        <CardDescription>
          Progressive Web App features and installation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Installation Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {installStatus === 'installed' ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Download className="w-5 h-5 text-muted-foreground" />
            )}
            <span className="font-medium">Installation</span>
          </div>
          <Badge variant={installStatus === 'installed' ? 'default' : 'secondary'}>
            {installStatus === 'installed' ? 'Installed' : 
             installStatus === 'installable' ? 'Available' : 'Not Available'}
          </Badge>
        </div>

        {/* Online Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WifiOff className={`w-5 h-5 ${isOnline ? 'text-green-500' : 'text-orange-500'}`} />
            <span className="font-medium">Connection</span>
          </div>
          <Badge variant={isOnline ? 'default' : 'secondary'}>
            {isOnline ? 'Online' : 'Offline'}
          </Badge>
        </div>

        {/* Storage Persistence */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className={`w-5 h-5 ${isPersisted ? 'text-green-500' : 'text-muted-foreground'}`} />
            <span className="font-medium">Storage</span>
          </div>
          <Badge variant={isPersisted ? 'default' : 'secondary'}>
            {isPersisted ? 'Persistent' : 'Temporary'}
          </Badge>
        </div>

        {/* Device Type */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium">Device</span>
          </div>
          <Badge variant="outline">
            {deviceType.charAt(0).toUpperCase() + deviceType.slice(1)}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-4 border-t">
          {installStatus === 'installable' && (
            <Button onClick={handleInstall} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Install App
            </Button>
          )}

          {installStatus === 'installed' && (
            <Button 
              variant="outline" 
              onClick={handleCheckUpdates}
              disabled={checking}
              className="w-full"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${checking ? 'animate-spin' : ''}`} />
              Check for Updates
            </Button>
          )}

          {!isPersisted && (
            <Button 
              variant="outline" 
              onClick={handleRequestPersistence}
              className="w-full"
            >
              <HardDrive className="w-4 h-4 mr-2" />
              Enable Persistent Storage
            </Button>
          )}

          <Button 
            variant="ghost" 
            onClick={handleShare}
            className="w-full"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share App
          </Button>
        </div>

        {/* Info */}
        <div className="text-xs text-muted-foreground pt-2 border-t">
          {installStatus === 'installed' ? (
            <p>✓ App is installed and can work offline</p>
          ) : installStatus === 'installable' ? (
            <p>Install the app for offline access and better performance</p>
          ) : (
            <p>Visit this site on mobile to install the app</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
