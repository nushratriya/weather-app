// My OpenWeatherMap API key
const apiKey = '0d92a5fbbf6cc66217cac29e590190f2'; 

// Function to fetch weather data based on city
function getWeather() {
  const city = document.getElementById('city').value; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  // Clear previous results
  document.getElementById('temperature').innerText = '';
  document.getElementById('humidity').innerText = '';
  document.getElementById('weather-description').innerText = '';
  document.getElementById('wind-info').innerText = '';
  document.getElementById('sun-info').innerText = '';
  document.getElementById('location').innerText = '';
  document.getElementById('error-message').innerText = '';

  // Fetch weather data from API
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      // Extract data if the response is valid
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const weatherDescription = data.weather[0].description;
      const windSpeed = data.wind.speed;
      const windDirection = data.wind.deg;
      const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
      const location = data.name;
      const country = data.sys.country;

      // Update the UI with the data
      document.getElementById('location').innerText = `Location: ${location}, ${country}`;
      document.getElementById('temperature').innerText = `Temperature: ${temperature}°F`;
      document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;
      document.getElementById('weather-description').innerText = `Description: ${weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}`;
      document.getElementById('wind-info').innerText = `Wind Speed: ${windSpeed} m/s ${getWindDirection(windDirection)}`;
      document.getElementById('sun-info').innerText = `Sunrise: ${sunrise} | Sunset: ${sunset}`;
    })
    .catch(error => {
      document.getElementById('error-message').innerText = `Error: Location not found. 
      Please check the city name and try again.`;
    });
}

// Convert wind degrees to compass direction
function getWindDirection(degrees) {
  const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
  const index = Math.floor((degrees / 45) + 0.5);
  return directions[index % 8];
}

// Event listener for the search button
document.getElementById('search-button').addEventListener('click', getWeather);
