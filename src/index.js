// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, set, get } from "firebase/database";
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

// json z formulara
$(document).ready(function () {
  // Function to save form data as JSON
  function saveFormDataAsJSON() {
    // Capture form input values
    var university = document.getElementById("universitySelect").value;
    var major = document.getElementById("majorSelect").value;
    var employment = document.getElementById("employmentSelect").value;
    var price = document.getElementById("price").value;
    var rating = document.querySelector(".rating input:checked").value;

    // Create JSON object
    // Create JSON object
    var jsonData = {
      "name": university,
      "odbor": major,
      "work": employment,
      "money": price,
      "rating": rating // Fix the typo here
    };

    // You can now use the jsonData as needed, e.g., send it to a server or save it locally
    console.log(jsonData);

    // Push the data to a specific location with a unique 'university_id'
    var universitiesRef = ref(db, "university"); // Replace "university" with your desired database path

    // Generate a new 'university_id' using Firebase's push method
    var newUniversityRef = push(universitiesRef);

    // Set the data under the new 'university_id'
    set(newUniversityRef, jsonData, function (error) {
      if (error) {
        console.error("Data could not be saved." + error);
      } else {
        console.log("Data saved successfully.");
      }
    });
  }

  // Add click event listener to the "Pridať" button
  document.getElementById("saveButton").addEventListener("click", saveFormDataAsJSON);
});
