import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBmj-JMrsKeXbtIXquKBBmZzqJv8R327fE",
  authDomain: "h-sound-b2391.firebaseapp.com",
  projectId: "h-sound-b2391",
  storageBucket: "h-sound-b2391.firebasestorage.app",
  messagingSenderId: "2853371644",
  appId: "1:2853371644:web:a2a6509e238c4f4a8aa179"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;