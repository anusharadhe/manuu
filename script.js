const slideshowContainer = document.querySelector(".slideshow-container");
const images = slideshowContainer.querySelectorAll("img");
let currentImageIndex = 0;

function showNextImage() {
    images[currentImageIndex].style.display = "none";
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].style.display = "block";
}

setInterval(showNextImage, 3000);

// Initialize user submissions data from local storage
let userSubmissions = JSON.parse(localStorage.getItem("userSubmissions")) || [];

// Handle form submission
const infoForm = document.getElementById("info-form");
const userInfoDisplay = document.getElementById("user-info-display");
const adminPasswordInput = document.getElementById("admin-password");
const adminLoginButton = document.getElementById("admin-login");

infoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = infoForm.name.value;
    const email = infoForm.email.value;
    const message = infoForm.message.value;

    // Store the user information
    userSubmissions.push({
        name,
        email,
        message,
    });

    // Save the updated user submissions data to local storage
    localStorage.setItem("userSubmissions", JSON.stringify(userSubmissions));

    // Clear the form
    infoForm.reset();
});

// Admin login
adminLoginButton.addEventListener("click", function () {
    const adminPassword = adminPasswordInput.value;


    if (adminPassword === 'Manu@@0111') {
        if (userSubmissions.length > 0) {
            // Display all user information for the admin
            let userInfoHTML = "";
            userSubmissions.forEach((submission, index) => {
                userInfoHTML += `
                    <p><strong>Submission ${index + 1}:</strong></p>
                    <p><strong>Name:</strong> ${submission.name}</p>
                    <p><strong>Email:</strong> ${submission.email}</p>
                    <p><strong>Message:</strong> ${submission.message}</p>
                `;
            });
            userInfoDisplay.innerHTML = userInfoHTML;
        } else {
            userInfoDisplay.innerHTML = "No user submissions to display.";
        }
        userInfoDisplay.style.display = "block";
    } else {
        alert("Admin login failed. Please enter the correct password.");
    }
});
