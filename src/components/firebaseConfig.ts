// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkrkJ4mRM8tqdt5iZyiqlUChuTBuxPxew",
  authDomain: "taskcalendar-7472a.firebaseapp.com",
  projectId: "taskcalendar-7472a",
  storageBucket: "taskcalendar-7472a.firebasestorage.app",
  messagingSenderId: "859524044005",
  appId: "1:859524044005:web:07ac654f5ef5ee04f2f00c",
  measurementId: "G-MT3KTPTNSZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics, app };
