const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#current-desc');
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=5.56&lon=-0.20&units=imperial&appid=23a8f7a4e01c8c6adda5d63e65cc8dd5';


async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error){
        console.log(error);
    };
}

function displayResults(data) {
    console.log('hi Oswell');
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    weatherDesc.innerHTML = `${data.weather[0].description}`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('SRC', iconsrc);
    weatherIcon.setAttribute('alt', desc);
}

const spotlightContainer = document.querySelector("#business-cards");
const jsonUrl = "data/members.json";

// Function to fetch JSON data and display spotlight cards
async function fetchAndDisplaySpotlights() {
    try {
        // Fetch the JSON data
        const response = await fetch(jsonUrl);
        if (!response.ok) throw new Error("Failed to load JSON data");
        const members = await response.json();

        // Filter for gold (3) or silver (2) members
        const eligibleMembers = members.filter(member => member.membership_level === 2 || member.membership_level === 3);

        // Shuffle and select two or three random members
        const shuffledMembers = eligibleMembers.sort(() => Math.random() - 0.5);
        const spotlights = shuffledMembers.slice(0, 3);

        // Generate and append spotlight cards
        spotlights.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("spotlight-card");

            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} Logo">
                <h3>${member.name}</h3>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                <p><strong>Membership Level:</strong> ${member.membership_level === 3 ? "Gold" : "Silver"}</p>
            `;

            spotlightContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching and displaying spotlights:", error);
    }
}

// Call the function
fetchAndDisplaySpotlights();


apiFetch();