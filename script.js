// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtyIa8wTickNQFaOzN1Hp0q3YagudERVQ",
  authDomain: "slovak-school-rate.firebaseapp.com",
  projectId: "slovak-school-rate",
  storageBucket: "slovak-school-rate.appspot.com",
  messagingSenderId: "275981760714",
  appId: "1:275981760714:web:ac140639e25f982dfcdc33",
  measurementId: "G-S30KNNE62G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
