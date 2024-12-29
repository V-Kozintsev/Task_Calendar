// storage/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCkrkJ4mRM8tqdt5iZyiqlUChuTBuxPxew",
  authDomain: "taskcalendar-7472a.firebaseapp.com",
  projectId: "taskcalendar-7472a",
  storageBucket: "taskcalendar-7472a.appspot.com",
  messagingSenderId: "859524044005",
  appId: "1:859524044005:web:07ac654f5ef5ee04f2f00c",
  measurementId: "G-MT3KTPTNSZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Инициализация Firestore

export { analytics, db }; // Экспортируем db
