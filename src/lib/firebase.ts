// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {"apiKey":"mock-api-key","authDomain":"mock-auth-domain","projectId":"mock-project-id","storageBucket":"mock-storage-bucket","messagingSenderId":"mock-messaging-sender-id","appId":"mock-app-id"};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
