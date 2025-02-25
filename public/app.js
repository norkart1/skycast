async function getWeather() {
    const city = document.getElementById('city').value;

    if (city) {
        const response = await fetch(`/api/weather/${city}`);
        const data = await response.json();

        const weatherInfo = document.getElementById('weather-info');
        if (response.ok) {
            weatherInfo.innerHTML = `
                                      <h2>Weather in ${data.city}</h2>
                                              <p>Temperature: ${data.temperature}°C</p>
                                                      <p>Description: ${data.description}</p>
                                                              <p>Humidity: ${data.humidity}%</p>
                                                                      <p>Wind Speed: ${data.wind_speed} m/s</p>
                                                                            `;
        } else {
            weatherInfo.innerHTML = `<p>${data.message}</p>`;
        }
    } else {
        alert('Please enter a city name');
    }
}
                                                                                                  