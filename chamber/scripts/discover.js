const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

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

document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".gallery");

    // Fetch the JSON data
    fetch("data/discover.json")
        .then(response => response.json())
        .then(data => {
            // Loop through the data and create cards
            data.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                    <h2>${item.name}</h2>
                    <figure>
                        <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
                    </figure>
                    <address>${item.address}</address>
                    <p>${item.description}</p>
                    <button>Learn More</button>
                `;

                gallery.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading JSON:", error));
});
