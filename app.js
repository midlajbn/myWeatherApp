function getWeather() {
    const apiKey = 'a34c48fd21feea4573a62e2b5fbbff33'; // Replace with your OpenWeatherMap API key
    const cityInput = document.getElementById('cityInput').value;
    const weatherInfo = document.getElementById('weatherInfo');

    // Make sure the user entered a city
    if (!cityInput) {
        alert('Please enter a city.');
        return;
    }

    // Fetch weather data from the OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Display the weather information
            const temperatureKelvin = data.main.temp;
            const description = data.weather[0].description;

            const weatherHtml = `
                <h5>Weather in ${cityInput}</h5>
                <p>Description: ${description}</p>
                <div>
                    <label>Temperature: </label>
                    <span id="temperature">${temperatureKelvin} K</span>
                    <button class="btn btn-link btn-sm" onclick="toggleTemperatureUnit()">Toggle Unit</button>
                </div>
            `;
            weatherInfo.innerHTML = weatherHtml;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
        });
}

function toggleTemperatureUnit() {
    const temperatureSpan = document.getElementById('temperature');
    const currentTemperature = temperatureSpan.innerText;

    if (currentTemperature.includes('K')) {
        // Convert Kelvin to Celsius
        const temperatureCelsius = parseFloat(currentTemperature) - 273.15;
        temperatureSpan.innerText = `${temperatureCelsius.toFixed(2)} °C`;
    } else if (currentTemperature.includes('°C')) {
        // Convert Celsius to Fahrenheit
        const temperatureFahrenheit = (parseFloat(currentTemperature) * 9/5) + 32;
        temperatureSpan.innerText = `${temperatureFahrenheit.toFixed(2)} °F`;
    } else if (currentTemperature.includes('°F')) {
        // Convert Fahrenheit to Celsius
        const temperatureCelsius = (parseFloat(currentTemperature) - 32) * 5/9;
        temperatureSpan.innerText = `${temperatureCelsius.toFixed(2)} °C`;
    } else {
        // Convert unknown unit to Celsius
        temperatureSpan.innerText = `${parseFloat(currentTemperature).toFixed(2)} °C`;
    }
}
