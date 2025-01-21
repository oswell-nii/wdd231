const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');
const container = document.querySelector('#business-cards');
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

let companiesData = []; // To store fetched data

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

gridButton.addEventListener("click", () => {
    container.className = "bizcardgrid"; // Set container class for grid view
    renderCompanies("grid");
});

listButton.addEventListener("click", () => {
    container.className = "bizcardlist"; // Set container class for list view
    renderCompanies("list");
});

// Fetch JSON data from an external file
fetch('data/members.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(companies => {
        companiesData = companies; // Store the data for rendering
        renderCompanies("grid"); // Render default grid view
    })
    .catch(error => console.error('Error fetching JSON:', error));

// Function to render companies
function renderCompanies(view) {
    container.innerHTML = ""; // Clear the container

    companiesData.forEach(company => {
        if (view === "grid") {
            // Render in grid view with logo
            const card = document.createElement('div');
            card.className = 'company-card';

            const name = document.createElement('h2');
            name.textContent = company.name;

            const content = document.createElement('div');
            content.className = 'company-content';

            const logo = document.createElement('img');
            logo.src = company.image;
            logo.alt = `${company.name} Logo`;

            const details = document.createElement('div');
            details.className = 'company-details';
            details.innerHTML = `
                <p><strong>Address:</strong> ${company.address}</p>
                <p><strong>Phone:</strong> ${company.phone}</p>
                <p><strong>Website:</strong> <a href="${company.website}" target="_blank">${company.website}</a></p>
                <p><strong>Industry:</strong> ${company.industry}</p>
                <p><strong>Founded:</strong> ${company.founded}</p>
                <p><strong>Membership Level:</strong> ${company.membership_level}</p>
            `;

            content.appendChild(logo);
            content.appendChild(details);

            card.appendChild(name);
            card.appendChild(content);

            container.appendChild(card);
        } else if (view === "list") {
            // Render in list view without logo or card
            const listItem = document.createElement('div');
            listItem.className = 'company-list-item';

            listItem.innerHTML = `
                <h3>${company.name}</h3>
                <p><strong>Address:</strong> ${company.address}</p>
                <p><strong>Phone:</strong> ${company.phone}</p>
                <p><strong>Website:</strong> <a href="${company.website}" target="_blank">${company.website}</a></p>
                <p><strong>Industry:</strong> ${company.industry}</p>
                <p><strong>Founded:</strong> ${company.founded}</p>
                <p><strong>Membership Level:</strong> ${company.membership_level}</p>
            `;

            container.appendChild(listItem);
        }
    });
}
