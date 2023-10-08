// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import * as $ from 'jquery';

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
      employmentCell.innerHTML = generateValue(data.work);
      priceCell.innerHTML = data.money + " €";
      ratingCell.innerHTML = generateStarRating(data.rating);
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

function generateStarRating(rating) {
  const maxRating = 5; // Maximum rating possible (adjust as needed)
  const starValue = 20; // Value per star (adjust as needed)
  const totalStars = Math.floor(rating / starValue); // Calculate the number of filled stars
  let stars = '';

  for (let i = 1; i <= maxRating; i++) {
    if (i <= totalStars) {
      stars += '<label>&#9733;</label>'; // Filled star character
    } else {
      stars += '<label>&#9734;</label>'; // Empty star character
    }
  }

  return stars;
}

function generateValue(value) {
  const result = value == 1 ? "Áno" : "Nie";
  return result;
}

$(document).ready(function () {
  $("#searchForm").submit(function (event) {
    event.preventDefault(); // Prevent form submission and page reload
    const searchTerm = $("#searchBar").val().toLowerCase();

    // Loop through each row in the table body
    $("#universityTable tbody tr").each(function () {
      const row = $(this);
      const schoolName = row.find("td:first").text().toLowerCase();

      // Check if the school name contains the search term
      if (schoolName.includes(searchTerm)) {
        row.show();
      } else {
        row.hide();
      }
    });
  });
});

