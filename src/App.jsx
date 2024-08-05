import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { onMessage } from "firebase/messaging";
import { messaging, requestForToken } from "./firebase/firebaseConfig";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Message from "./components/Message";

function App() {
  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      requestForToken();
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    requestPermission();

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("incoming message");
      console.log(payload);
      toast(<Message notification={payload.notification} />, {
        autoClose: false,
        closeOnClick: false,
        closeButton: true,
      });
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <ToastContainer />
    </>
  );
}

export default App;
