import { store } from "@/url/redux/store";
import { onMessageListener, requestFCMToken } from "./firebase";
import { setNotification } from "@/url/redux/slices/authSlice";
import axios from "axios";

// utils/notifications.ts
export async function requestNotificationPermission(): Promise<void> {
  const token = await requestFCMToken();
  if (token) {
    // send token to your backend for later pushes
    store.dispatch(setNotification(token))
   }
}

// utils/registerServiceWorker.ts
export async function registerServiceWorker(): Promise<void> {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("/sw.js");
      console.log("✅ Service worker registered");
    } catch (err) {
      console.error("❌ Service worker registration failed", err);
    }
  }
}

export async function SentNotification(
  token: string,
  title: string,
  body: string,
  targetUrl: string = "/dashboard"
) {
  try {
    const res = await axios.post("/api/sendPush", {
      token,
      title,
      body,
      data: { url: targetUrl }, // send the URL to the service worker
    }, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error: any) {
    console.error("Error sending notification:", error.response || error);
    return { error: "Failed to send notification" };
  }
}


