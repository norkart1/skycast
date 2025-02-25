const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6656;
const MONGO_URI = process.env.MONGO_URI;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const API_URL = 'http://api.openweathermap.org/data/2.5/weather';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Weather Schema
const WeatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  description: String,
  humidity: Number,
  wind_speed: Number,
  timestamp: { type: Date, default: Date.now },
});

const Weather = mongoose.model('Weather', WeatherSchema);

// Middleware to serve static files
app.use(express.static('public'));

// API Route to fetch and store weather data
app.get('/api/weather/:city', async (req, res) => {
  const city = req.params.city;

  try {
    const response = await axios.get(API_URL, {
      params: { q: city, appid: WEATHER_API_KEY, units: 'metric' }
    });

    const weatherData = {
      city,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind_speed: response.data.wind.speed,
    };

    // Save to MongoDB
    const weather = new Weather(weatherData);
    await weather.save();

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch weather data' });
  }
});

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
