// Array to store user data
let userArray = [];
// Variables to track the total votes for Messi and Ronaldo, and the overall total votes
let totalMessi;
let totalRonaldo;
let totalCount;

// Load data from localStorage on page load
const storedData = localStorage.getItem('userArray');
if (storedData) {
    userArray = JSON.parse(storedData);
}

// Function to validate email using a regular expression
function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to handle form submission
const handleSubmit = (event) => {
    // Retrieve form input values
    let name = $("#name").val();
    let country = $("#country").val();
    let email = $("#email").val();
    let favorite = $('input[name="favorite"]:checked').val();
    let check = true;

    event.preventDefault();

    // Function to perform form validation
    const validation = () => {
        if (name.trim() === "" || country.trim() === "" || email.trim() === "" || !favorite) {
            alert("Please fill in all the fields.");
            check = false;
            return;
        } else if (!isNaN(name)) {
            alert("Name should not be a number.");
            check = false;
            return;
        } else if (!isNaN(country)) {
            alert("Name should not be a number.");
            check = false;
            return;
        } else if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            check = false;
            return;
        } else if (!favorite) {
            alert("Please choose your favorite (Messi or Ronaldo).");
            check = false;
            return;
        } else {
            check = true;
        }
    };
    validation();

    // If validation passes, add user data to the array, store in localStorage, reset the form, and update progress
    if (check) {
        userArray.push({ userName: name, userCountry: country, userEmail: email, userFavorite: favorite });
        localStorage.setItem('userArray', JSON.stringify(userArray));
        $('form')[0].reset(); // Reset the form fields
        progress();
    }
};

// Event listener for form submission
$('form').submit(function (event) {
    event.preventDefault();
    handleSubmit(event);
});

// Function to calculate and display poll results
const showResult = () => {
    let countMessi = 0;
    let countRonaldo = 0;

    // Count votes for Messi and Ronaldo
    userArray.forEach((data) => {
        if (data.userFavorite === "messi") {
            countMessi++;
        } else if (data.userFavorite === "ronaldo") {
            countRonaldo++;
        }
    });

    // Calculate percentages
    totalCount = countMessi + countRonaldo;
    totalMessi = ((countMessi / totalCount) * 100).toFixed(0);
    totalRonaldo = ((countRonaldo / totalCount) * 100).toFixed(0);

    // Display results in the console
    console.log("totalMessi: " + totalMessi);
    console.log("totalRonaldo: " + totalRonaldo);
    console.log(userArray);

    // Update HTML elements with calculated percentages
    $("#messi-percent").text(`${totalMessi} %`);
    $("#ronaldo-percent").text(`${totalRonaldo} %`);

    // Update progress bars
    $("#myProgressMessi").val(totalMessi);
    $("#myProgressRonaldo").val(totalRonaldo);

    // Hide tick icon based on the winner
    if (totalMessi > totalRonaldo) {
        $(".ronaldo-tick").css("visibility", "hidden");
    } else if (totalMessi < totalRonaldo) {
        $(".messi-tick").css("visibility", "hidden");
    }
};

// Function to switch to results view
const progress = () => {
    $('main').css("display", "none");
    $('.show-result').css("display", "block");
    showResult();
};

// Dummy user data for initial testing
const dummyUsers = [
    { userName: "Alice", userCountry: "USA", userEmail: "alice@example.com", userFavorite: "messi" },
    { userName: "Bob", userCountry: "UK", userEmail: "bob@example.com", userFavorite: "ronaldo" },
    { userName: "Charlie", userCountry: "Canada", userEmail: "charlie@example.com", userFavorite: "messi" },
    { userName: "David", userCountry: "Germany", userEmail: "david@example.com", userFavorite: "ronaldo" },
    { userName: "Emma", userCountry: "France", userEmail: "emma@example.com", userFavorite: "messi" },
    { userName: "Frank", userCountry: "Spain", userEmail: "frank@example.com", userFavorite: "ronaldo" },
    { userName: "Grace", userCountry: "Italy", userEmail: "grace@example.com", userFavorite: "messi" },
    { userName: "Harry", userCountry: "Australia", userEmail: "harry@example.com", userFavorite: "ronaldo" },
    { userName: "Ivy", userCountry: "Japan", userEmail: "ivy@example.com", userFavorite: "messi" },
    { userName: "Jack", userCountry: "Brazil", userEmail: "jack@example.com", userFavorite: "ronaldo" },
    // Repeat the pattern for additional objects
    // ...
];

// Populate userArray with dummy data
dummyUsers.forEach((data) => {
    userArray.push(data);
});
