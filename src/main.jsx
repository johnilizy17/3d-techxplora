import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from '@/App.jsx'
import '@/index.css'
import store from '@/redux/store'

// Service worker disabled temporarily - uncomment when ready
// if (import.meta.env.PROD && 'serviceWorker' in navigator) {
//   import('@/utils/serviceWorker').then(({ register }) => {
//     register();
//   }).catch(err => {
//     console.warn('Service worker registration failed:', err);
//   });
// }

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
) 