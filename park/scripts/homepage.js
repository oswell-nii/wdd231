const currentTemp = document.querySelector('#current-temp'); // Make sure you have an element with this ID in your HTML
const weatherIcon = document.querySelector('#weather-icon'); // Make sure you have an element with this ID in your HTML
const weatherDesc = document.querySelector('#current-desc'); // Make sure you have an element with this ID in your HTML
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=5.56&lon=-0.20&units=imperial&appid=23a8f7a4e01c8c6adda5d63e65cc8dd5';


document.addEventListener("DOMContentLoaded", () => {
    const visitMessage = document.querySelector("#visit-message");
    
    const lastVisit = localStorage.getItem("lastVisit");
    const currentDate = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysBetween = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysBetween < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysBetween} ${daysBetween === 1 ? "day" : "days"} ago.`;
        }
    }

    // Store current date for future visits
    localStorage.setItem("lastVisit", currentDate);
});
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error); // Use console.error for errors
    }
}

function displayResults(data) {
    // *** THIS IS THE KEY CHANGE ***
    if (currentTemp) { // Check if the element exists before trying to update it
        currentTemp.textContent = `${data.main.temp}°F`; // Use textContent for plain text
    }

    if (weatherDesc) {
        weatherDesc.textContent = `${data.weather[0].description}`;
    }

    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let desc = data.weather[0].description;

    if (weatherIcon) {
        weatherIcon.src = iconsrc;  // Use src for image elements
        weatherIcon.alt = desc;
    }
}

apiFetch();