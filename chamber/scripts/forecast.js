const dayOne = document.querySelector('#day1');
const dayTwo = document.querySelector('#day2');
const dayThree = document.querySelector('#day3');
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=5.56&lon=-0.20&units=imperial&appid=23a8f7a4e01c8c6adda5d63e65cc8dd5';


async function apiFetch() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayForecastResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error){
        console.log(error);
    };
}

function displayForecastResults(data) {
    console.log('hi Oswell');
    dayOne.innerHTML = data.list[8].main.temp + '&deg;F'
    dayTwo.innerHTML = data.list[16].main.temp + '&deg;F'
    dayThree.innerHTML = data.list[24].main.temp + '&deg;F'
}

apiFetch();

