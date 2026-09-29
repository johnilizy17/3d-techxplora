import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from '@/App.jsx'
import '@/index.css'
import store from '@/redux/store'

// Register service worker for offline support (only in production)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('✅ Service Worker registered:', registration.scope);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('🔄 New version available! Refresh to update.');
            }
          });
        });
      })
      .catch((error) => {
        console.warn('⚠️ Service Worker registration failed:', error);
      });
  });
} else if ('serviceWorker' in navigator && import.meta.env.DEV) {
  // Unregister service workers in development to avoid caching issues
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.unregister();
      console.log('🔧 Dev mode: Service Worker unregistered');
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
) 