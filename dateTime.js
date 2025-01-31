const apiKey = 'fb5d52b3ec58e712f2b7076ec8b8ff4c';
    const weatherAPI = (city) =>
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const defaultCity = 'Karachi';

    // Function to fetch weather data
    async function fetchWeather(city) {
      try {
        const response = await fetch(weatherAPI(city));
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        updateWeather(data);
      } catch (error) {
        alert(error.message);
      }
    }

    // Function to update UI
    function updateWeather(data) {
      document.getElementById('temperature').innerHTML = `${Math.round(data.main.temp)}°<sub>C</sub>`;
      document.getElementById('feelsLike').innerHTML = `Feels Like: ${Math.round(data.main.feels_like)}°<sub>C</sub>`;
      document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById('minTemp').innerHTML = `min-temp: ${Math.round(data.main.temp_min)}°<sub>C</sub>`;
      document.getElementById('maxTemp').innerHTML = `max-temp: ${Math.round(data.main.temp_max)}°<sub>C</sub>`;
      document.getElementById('clouds').textContent = `${data.clouds.all}%`;
      document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
      document.getElementById('weatherDescription').textContent = data.weather[0].main;
      document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    }

    // Event listener for search
    document.getElementById('searchButton').addEventListener('click', () => {
      const city = document.getElementById('cityInput').value.trim();
      if (city) {
        fetchWeather(city);
      } else {
        alert('Please enter a city name!');
      }
    });

    // Load default city weather on page load
    window.onload = () => {
      fetchWeather(defaultCity);
    };