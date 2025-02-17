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
    fetch("data/parks.json")
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

document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".gallery");
    const modal = document.querySelector("#modal");
    const modalTitle = document.querySelector("#modal-title");
    const modalImage = document.querySelector("#modal-image");
    const modalDescription = document.querySelector("#modal-description");
    const modalAddress = document.querySelector("#modal-address");
    const closeModal = document.querySelector(".close");

    fetch("data/parks.json")
        .then(response => response.json())
        .then(data => {
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
                    <button class="learn-more" data-name="${item.name}" data-image="${item.image}" data-description="${item.description}" data-address="${item.address}">Learn More</button>
                `;

                gallery.appendChild(card);
            });

            // Add event listeners to all "Learn More" buttons
            document.querySelectorAll(".learn-more").forEach(button => {
                button.addEventListener("click", function () {
                    modalTitle.textContent = this.dataset.name;
                    modalImage.src = this.dataset.image;
                    modalImage.alt = this.dataset.name;
                    modalDescription.textContent = this.dataset.description;
                    modalAddress.textContent = this.dataset.address;
                    modal.style.display = "block";
                });
            });
        })
        .catch(error => console.error("Error loading JSON:", error));

    // Close modal when clicking the close button
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close modal when clicking outside of it
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
