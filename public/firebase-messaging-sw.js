// Scripts for firebase and firebase messaging
self.importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
self.importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
// const defaultConfig = {
//   apiKey: true,
//   projectId: true,
//   messagingSenderId: true,
//   appId: true,
// };

// firebase.initializeApp(defaultConfig);

// Retrieve firebase messaging
// const messaging = firebase.messaging();

fetch("/firebase-config.json")
  .then((response) => {
    return response.json();
  })
  .then((jsContent) => {
    const config = eval(jsContent);
    firebase.initializeApp(config.firebaseConfig);
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage(function (payload) {
      // console.log(defaultConfig);
      console.log("Received background message");
      console.log(payload);

      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
      };

      self.registration.showNotification(
        notificationTitle,
        notificationOptions
      );
    });
  })
  .catch((error) => {
    console.error("Error initializing Firebase in service worker:", error);
  });

//Listens for background notifications
// messaging.onBackgroundMessage(function (payload) {
//   // console.log(defaultConfig);
//   console.log("Received background message");
//   console.log(payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
