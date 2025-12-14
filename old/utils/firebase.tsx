// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import { getMessaging, getToken, onMessage, Messaging } from "firebase/messaging";

// 🔹 Firebase Config
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDERID,
};

// 🔹 Initialize App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// 🔹 Init Firebase AI
const ai = getAI(app, { backend: new GoogleAIBackend() });
const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

// 🔹 Init Messaging (only if supported by browser)
let messaging: Messaging | null = null;
if (typeof window !== "undefined" && "Notification" in window) {
    try {
        messaging = getMessaging(app);
    } catch (e) {
        console.warn("⚠️ Messaging not supported in this environment");
    }
}

// 🔹 Request permission & get FCM token
export async function requestFCMToken() {
    if (!messaging) return null;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
        console.warn("❌ Notification permission denied");
        return null;
    }

    try {
        const registration = await navigator.serviceWorker.ready; // Use already registered SW
        const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: registration,
        });
        onMessageListener()
        console.log("✅ FCM Token:", token);
        return token;
    } catch (error) {
        console.error("⚠️ Error getting FCM token:", error);
        return null;
    }
}

export function onMessageListener() {
    return new Promise((resolve) => {
        if (!messaging) return;
        onMessage(messaging, (payload:any) => {
            const { title, body } = payload.notification;
  new Notification(title, { body });
            resolve(payload);
        });
    });
}


export { model, messaging };
