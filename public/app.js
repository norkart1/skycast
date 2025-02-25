async function getWeather() {
    const city = document.getElementById('city').value;
    const weatherCard = document.getElementById('weather-card');

    if (city) {
        const response = await fetch(`/api/weather/${city}`);
        const data = await response.json();

        if (response.ok) {
            document.getElementById('city-name').innerText = `📍 ${data.city}`;
            document.getElementById('description').innerText = `🌤️ ${data.description}`;
            document.getElementById('temperature').innerText = data.temperature;
            document.getElementById('humidity').innerText = data.humidity;
            document.getElementById('wind-speed').innerText = data.wind_speed;

            weatherCard.style.display = 'block';
        } else {
            weatherCard.style.display = 'none';
            alert('City not found! Please enter a valid city.');
        }
    } else {
        alert('Please enter a city name!');
    }
}

