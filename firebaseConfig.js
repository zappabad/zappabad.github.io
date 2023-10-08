// firebaseConfig.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbxn0DmAIXhAVYvHSDzMWxUalgdLWjmzw",
    authDomain: "fab-card-picker.firebaseapp.com",
    databaseURL: "https://fab-card-picker-default-rtdb.firebaseio.com",
    projectId: "fab-card-picker",
    storageBucket: "fab-card-picker.appspot.com",
    messagingSenderId: "466969619425",
    appId: "1:466969619425:web:d83cdf766971f052f200a0",
    measurementId: "G-0B6CRDHHEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Export db so it can be used in other files
export { db };
