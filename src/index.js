// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, get } from "firebase/database";
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
const db = getDatabase(app);

// Reference to the "university" node in the database
const universitiesRef = ref(db, 'university');

// Reference to the <select> element in your HTML
const universitySelect = document.getElementById('universitySelect');

// Retrieve the university data and populate the <select>
get(universitiesRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const universitiesData = snapshot.val();
      for (const universityId in universitiesData) {
        if (universitiesData.hasOwnProperty(universityId)) {
          const university = universitiesData[universityId];
          const universityName = university.name;
          const option = document.createElement('option');
          option.value = universityId; // Set the value to the university_id
          option.textContent = universityName;
          universitySelect.appendChild(option);
        }
      }
    } else {
      console.log("University data does not exist.");
    }
  })
  .catch((error) => {
    console.error("Error getting university data:", error);
  });