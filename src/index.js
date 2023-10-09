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

      // Clean the university name to remove special characters and replace spaces with hyphens
      var cleanUniversityName = data.name
        .normalize('NFD') // Normalize accented characters to their non-accented counterparts
        .replace(/[\u0300-\u036f]/g, '') // Remove combining diacritical marks
        .replace(/[^\w\s]/gi, '') // Remove special characters
        .replace(/\s+/g, '-')      // Replace spaces with hyphens

      // Create a link button based on the clean university name
      var universityNameLink = document.createElement('a');
      universityNameLink.textContent = data.name;
      universityNameLink.href = generateUniversityLink(cleanUniversityName); // Call a function to generate the link
      universityNameLink.style.textDecoration = 'none';
      // Append the link button to the name cell
      nameCell.appendChild(universityNameLink);

      majorCell.innerHTML = data.odbor;
      employmentCell.innerHTML = generateValue(data.work);
      priceCell.innerHTML = data.money + " €";
      ratingCell.innerHTML = generateStarRating(data.rating);
    });
  });
}

// Function to generate the university link based on the clean name
function generateUniversityLink(cleanUniversityName) {

  switch (cleanUniversityName) {
    case 'Technicka-univerzita-v-Kosiciach':
      return 'https://www.tuke.sk/wps/portal';

    case 'Univerzita-Pavla-Jozefa-Safarika-v-Kosiciach':
      return 'https://www.upjs.sk';

    case 'Akademia-ozbrojenych-sil-generala-Milana-Rastislava-Stefanika':
      return 'https://www.aos.sk';

    case 'Univerzita-J-Selyeho':
      return 'https://www.portalvs.sk/sk/vysoka-skola/univerzita-j-selyeho-v-komarne';


  }
  // if (cleanUniversityName == 'Technicka-univerzita-v-Kosiciach') {
  //   return 'https://www.tuke.sk/wps/portal';
  // } else return '/dist/' + cleanUniversityName + '.html';
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

