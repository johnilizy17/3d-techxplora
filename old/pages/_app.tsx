import Rapper from "@/layout/Rapper";
import "@/styles/globals.css";
import "@/styles/chatbot.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Toaster } from "@/utils/toaster";
import { KEYS } from "@/utils/constants";
import { useEffect } from "react";
import { requestNotificationPermission } from "@/utils/notification";
import NatificationLayout from "@/layout/NotificationLayout";
import { useSelector } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {

   if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then((registration) => {
      console.log("Service Worker registered:", registration);

      // Force the SW to update immediately
      registration.update();

      // Listen for waiting SW and skip waiting
      if (registration.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
      }

      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        newWorker?.addEventListener("statechange", () => {
          if (newWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // New SW installed, refresh to activate
              window.location.reload();
            }
          }
        });
      });
    })
    .catch(err => console.error("SW registration failed:", err));
}

  }, []);


  return (
    <GoogleOAuthProvider clientId={KEYS.google_id}>
      <Rapper>
        <NatificationLayout>
          <Component {...pageProps} />
          <Toaster />
        </NatificationLayout>
      </Rapper>
    </GoogleOAuthProvider>
  );
}
