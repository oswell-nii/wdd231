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
