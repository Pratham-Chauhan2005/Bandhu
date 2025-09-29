// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {"apiKey":"fake-api-key","authDomain":"fake-auth-domain","projectId":"fake-project-id","storageBucket":"fake-storage-bucket","messagingSenderId":"fake-messaging-sender-id","appId":"fake-app-id"};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
