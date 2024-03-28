// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDPXEQFN6Nc0uNCFH9EVGTKUheRH0Erqb4",
    authDomain: "nossalei-bd3b6.firebaseapp.com",
    projectId: "nossalei-bd3b6",
    storageBucket: "nossalei-bd3b6.appspot.com",
    messagingSenderId: "821142695417",
    appId: "1:821142695417:web:2519d7cec9080bf66aa128",
    measurementId: "G-WNB43BX411"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };