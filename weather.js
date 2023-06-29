const apiKey = '0043c73601397f353e22eff18db108d2';
const cityInput = document.getElementById('city-input');
const cityList = document.getElementById('city-list');
const form = document.querySelector('form');
const weatherDiv = document.getElementById('weather');
const unitToggle = document.getElementById('unit-toggle');
const unitLabel = document.getElementById('unit-label');

let isCelsius = false;

unitToggle.addEventListener('change', () => {
  isCelsius = !isCelsius;
  if (isCelsius) {
    unitLabel.textContent = 'Celsius';
  } else {
    unitLabel.textContent = 'Fahrenheit';
  }
});

cityInput.addEventListener('input', () => {
  cityList.innerHTML = '';

  const matchingCities = cities.filter(city =>
    city.toLowerCase().startsWith(cityInput.value.toLowerCase())
  );

  matchingCities.forEach(city => {
    const li = document.createElement('li');
    li.textContent = city;
    li.addEventListener('click', () => {
      cityInput.value = city;
      cityList.innerHTML = '';
    });
    cityList.appendChild(li);
  });
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const city = cityInput.value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(data => {
      let temperature = data.main.temp;
      if (isCelsius) {
        temperature = ((temperature - 32) * 5/9).toFixed(1);
      }
      const description = data.weather[0].description;

      weatherDiv.innerHTML = `<p>${city}: ${temperature}° ${isCelsius ? 'C' : 'F'}, ${description}</p>`;
    })
    .catch(error => {
      weatherDiv.innerHTML = '<p>Unable to retrieve weather information in the area.</p>';
    });
});
