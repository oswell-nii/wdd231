// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Populate the thank you page with the form data
document.getElementById('firstName').textContent = urlParams.get('firstName');
document.getElementById('lastName').textContent = urlParams.get('lastName');
document.getElementById('email').textContent = urlParams.get('email');
document.getElementById('phone').textContent = urlParams.get('phone');
document.getElementById('orgName').textContent = urlParams.get('orgName');
document.getElementById("timestamp").textContent = urlParams.get("timestamp") || "Date not available";
