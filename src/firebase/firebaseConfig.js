import { initializeApp } from "firebase/app";

import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
  vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Messaging service
export const messaging = getMessaging(app);

export const requestForToken = () => {
  // The method getToken() allows FCM to use the VAPID key credential
  // when sending message requests to different push services
  return getToken(messaging, { vapidKey: import.meta.env.VITE_APP_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);

        const storedToken = localStorage.getItem("fcmToken");

        if (storedToken) {
          if (currentToken !== storedToken) {
            localStorage.setItem("fcmToken", currentToken);
          }
        } else {
          localStorage.setItem("fcmToken", currentToken);
        }
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};
