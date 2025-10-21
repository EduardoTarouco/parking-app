// Import the functions you need from the SDKs you need
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdb_q9GEbCqIYoF4DA5J1yN5D27pthTvY",
  authDomain: "parking-app-8fc9f.firebaseapp.com",
  projectId: "parking-app-8fc9f",
  storageBucket: "parking-app-8fc9f.firebasestorage.app",
  messagingSenderId: "707318729083",
  appId: "1:707318729083:web:02c7e6bf618223f8c755de",
  measurementId: "G-5D88RBM5QP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

isSupported().then((yes) => {
  if (yes) {
    const analytics = getAnalytics(app);
  } else {
    console.log("Firebase Analytics não suportado neste ambiente");
  }
});

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };