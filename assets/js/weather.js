// const myform = document.getElementById("myform");
// myform.addEventListener('submit',function(event){
//     event.preventDefault();

//     const City = document.getElementById("city-input");
//     console.log(`This input you have provided are ${City.value}`);
//     const apiKey = '98bfd625c1de4381bc4b5bebfe979ce0';
//     const  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=${apiKey}`;

//     fetch(apiUrl).then(function(response){
//         console.log(response);
//     })
// });




// // Your API key from OpenWeather
const myform = document.getElementById("myform");
const city = document.getElementById("city-input")

const apiKey = '98bfd625c1de4381bc4b5bebfe979ce0';
const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

// Function to fetch weather datahhtps
function getWeather(city) {
  // Convert city name to latitude and longitude
  // You could use another API like the OpenWeather 'geocoding' to get lat & lon
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const { lat, lon } = data.coord;
      return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);
    })
    .then(response => response.json())
    .then(data => {
      updateWeatherDisplay(data);
    });
}

// Function to update the weather display
function updateWeatherDisplay(weatherData) {
  // Update the DOM with the weather data
  // You will have to parse the 'weatherData' and create HTML elements accordingly
  const forecastList = weatherData.list;

  const currentWeather = forecastList[0];
  document.getElementById('current-temp').textContent = `${currentWeather.main.temp} °F`;
  document.getElementById('current-wind').textContent = `${currentWeather.wind.speed} MPH`;
  document.getElementById('current-humiditiy').textContent = `${currentWeather.main.humidity}%`;
   // Update the 5-day forecast; assuming you want to update it at midday for each day
   const forecastContainer = document.getElementById('forecast-container');
   forecastContainer.innerHTML = ''; // Clear existing forecast entries

   // Loop over each day's midday forecast
  for (let i = 0; i < forecastList.length; i += 8) { // This skips 8 intervals assuming data is every 3 hours
    const dailyForecast = forecastList[i];
    
    // Create forecast card for each day
    const forecastCard = document.createElement('div');
    forecastCard.classList.add('forecast-card');
    forecastCard.innerHTML = `
      <div class="forecast-date">${new Date(dailyForecast.dt_txt).toLocaleDateString()}</div>
      <div class="weather-icon">
        <img src="http://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}.png" alt="Weather Icon">
      </div>
      <div>Temp: ${dailyForecast.main.temp} °F</div>
      <div>Wind: ${dailyForecast.wind.speed} MPH</div>
      <div>Humidity: ${dailyForecast.main.humidity}%</div>
    `;
    
    // Append the card to the forecast container
    forecastContainer.appendChild(forecastCard);
  }

}

// Event listener for the search button
document.getElementById('search-button').addEventListener('click', (event) => {

event.preventDefault();
  const city = document.getElementById('city-input').value;
  console.log(`This is the inpute you have provided are ${city}`);
  getWeather(city);
});

function saveSearchHistory(city) {
    let history = localStorage.getItem('searchHistory');
    history = history ? JSON.parse(history) : [];
    if (!history.includes(city)) {
      history.push(city);
      localStorage.setItem('searchHistory', JSON.stringify(history));
      updateSearchHistory();
    }
  }
  
  function updateSearchHistory() {
    // Get the search history from localStorage and update the DOM
    const historyContainer = document.getElementById('search-history');
  historyContainer.innerHTML = ''; // Clear existing history entries

  const searches = JSON.parse(localStorage.getItem('searchHistory')) || [];

  searches.forEach(city => {
    const cityButton = document.createElement('button');
    cityButton.textContent = city;
    cityButton.classList.add('city-button', 'btn', 'btn-outline-secondary', 'btn-block');
    cityButton.onclick = function() {
    
      getWeather(city);
    };
     // Append the button to the history container
     historyContainer.appendChild(cityButton);
    });

  }
  