import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBqFcw9HiRt6gRVfX_OZzguwNVAtb3IuUA",
  authDomain: "mental-health-web-app-bc01c.firebaseapp.com",
  databaseURL: "https://mental-health-web-app-bc01c-default-rtdb.firebaseio.com",
  projectId: "mental-health-web-app-bc01c",
  storageBucket: "mental-health-web-app-bc01c.appspot.com",
  messagingSenderId: "324104910835",
  appId: "1:324104910835:web:f1eca38252942d1a7b8486"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // This gives you access to the Firebase Authentication
const db = getDatabase(app); // This gives you access to the Firebase Realtime Database

export { app, auth, db };
