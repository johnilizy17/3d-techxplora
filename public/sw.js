importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js");

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyA1_QVvTrD6E6JONVwcQVBJNamksCtdL18",
  authDomain: "xplore-ai-288c9.firebaseapp.com",
  projectId: "xplore-ai-288c9",
  storageBucket: "xplore-ai-288c9.firebasestorage.app",
  messagingSenderId: "252884070340",
  appId: "1:252884070340:web:f2e583065381c21e7ebe91"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {

  // ...existing code...
  const notificationTitle =
    payload.notification?.title ||
    payload.data?.title ||
    "Notification";
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body || "",
    icon: "/icons/notification.svg",
    data: {
      url: payload.data?.url || "/" // page to navigate
    },
  };
// ...existing code...

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  const clickResponsePromise = clients.openWindow(event.data.url);
  event.waitUntil(clickResponsePromise);
});
