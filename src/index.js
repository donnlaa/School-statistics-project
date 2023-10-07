// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onValue } from "firebase/database";

// Your web app's Firebase configuration
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

// Reference to your Firebase Realtime Database
var universitiesRef = ref(db, "university");

// Function to populate the HTML table with data from Firebase
function populateTable() {
  onValue(universitiesRef, (snapshot) => {
    var universityTable = document.getElementById("universityTable").getElementsByTagName('tbody')[0];

    universityTable.innerHTML = ''; // Clear existing table rows

    snapshot.forEach((childSnapshot) => {
      var data = childSnapshot.val();
      var row = universityTable.insertRow(-1);

      // Add data to the table cells
      var nameCell = row.insertCell(0);
      var majorCell = row.insertCell(1);
      var employmentCell = row.insertCell(2);
      var priceCell = row.insertCell(3);
      var ratingCell = row.insertCell(4);

      nameCell.innerHTML = data.name;
      majorCell.innerHTML = data.odbor;
      employmentCell.innerHTML = data.work;
      priceCell.innerHTML = data.money;
      ratingCell.innerHTML = data.rating;
    });
  });
}

// Call the function to populate the table
populateTable();

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
    var jsonData = {
      "name": university,
      "odbor": major,
      "work": employment,
      "money": price,
      "rating": rating
    };

    // Push the data to a specific location with a unique 'university_id'
    var newUniversityRef = push(universitiesRef);

    // Set the data under the new 'university_id'
    set(newUniversityRef, jsonData, (error) => {
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
