/**
 * Custom React Hook for Google Analytics
 * Automatically tracks page views and provides event tracking
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackEvent } from '@/utils/analytics';

/**
 * Hook to automatically track page views
 * Usage: useAnalytics() in your main App component
 */
export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view whenever location changes
    const pageTitle = document.title || 'Techxplora';
    trackPageView(location.pathname, pageTitle);
  }, [location]);
};

/**
 * Hook to track specific events
 * Usage: const { trackEvent } = useAnalyticsEvent();
 */
export const useAnalyticsEvent = () => {
  return {
    trackEvent,
  };
};

export default useAnalytics;
