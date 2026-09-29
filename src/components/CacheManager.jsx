import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Trash2, RefreshCw, HardDrive } from 'lucide-react';
import { getStorageStats, clearOldCache, clearStore, STORES } from '@/utils/offlineStorage';
import { getCacheSize, clearAllCaches } from '@/utils/serviceWorker';
import { toast } from 'sonner';

export default function CacheManager() {
  const [stats, setStats] = useState(null);
  const [cacheSize, setCacheSize] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [storageStats, cacheSizeInfo] = await Promise.all([
        getStorageStats(),
        getCacheSize()
      ]);
      
      setStats(storageStats);
      setCacheSize(cacheSizeInfo);
    } catch (error) {
      console.error('Error loading stats:', error);
      toast.error('Failed to load cache statistics');
    }
  };

  const handleClearOldCache = async () => {
    setLoading(true);
    try {
      await clearOldCache();
      toast.success('Old cache cleared successfully');
      await loadStats();
    } catch (error) {
      console.error('Error clearing old cache:', error);
      toast.error('Failed to clear old cache');
    } finally {
      setLoading(false);
    }
  };

  const handleClearAllCache = async () => {
    if (!confirm('Are you sure you want to clear all cached data? This will remove all offline content.')) {
      return;
    }

    setLoading(true);
    try {
      await Promise.all([
        clearAllCaches(),
        clearStore(STORES.QUIZZES),
        clearStore(STORES.COURSES),
        clearStore(STORES.QUESTIONS)
      ]);
      
      toast.success('All cache cleared successfully');
      await loadStats();
    } catch (error) {
      console.error('Error clearing all cache:', error);
      toast.error('Failed to clear cache');
    } finally {
      setLoading(false);
    }
  };

  if (!stats || !cacheSize) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="w-6 h-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Cache Management
        </CardTitle>
        <CardDescription>
          Manage offline data and storage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Storage Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Storage Used</span>
            <span className="font-medium">{cacheSize.usageInMB} MB / {cacheSize.quotaInMB} MB</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${cacheSize.percentUsed}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {cacheSize.percentUsed}% of available storage
          </p>
        </div>

        {/* Cached Items */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Quizzes</p>
            <p className="text-2xl font-bold">{stats.quizzes}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Courses</p>
            <p className="text-2xl font-bold">{stats.courses}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Questions</p>
            <p className="text-2xl font-bold">{stats.questions}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Pending Sync</p>
            <p className="text-2xl font-bold">{stats.pendingSync}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-4">
          <Button
            variant="outline"
            onClick={handleClearOldCache}
            disabled={loading}
            className="w-full"
          >
            <HardDrive className="w-4 h-4 mr-2" />
            Clear Old Cache (7+ days)
          </Button>
          
          <Button
            variant="destructive"
            onClick={handleClearAllCache}
            disabled={loading}
            className="w-full"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All Cache
          </Button>

          <Button
            variant="ghost"
            onClick={loadStats}
            disabled={loading}
            className="w-full"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Stats
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
