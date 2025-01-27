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

apiFetch();