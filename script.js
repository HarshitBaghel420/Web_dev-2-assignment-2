const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "b27e52f2a8e4f05dd9629b2da959bc19";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (!city) {
    displayError("Please enter a city name");
    return;
  }

  try {
    const weatherData = await getWeatherData(city);
    displayWeatherInfo(weatherData);
  } catch (error) {
    displayError("Could not fetch weather data. Please try another city.");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${Math.round(temp)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent =
    description.charAt(0).toUpperCase() + description.slice(1);
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  if (weatherId >= 200 && weatherId < 300) {
    return "⛈";
  }
  if (weatherId >= 300 && weatherId < 600) {
    return "🌧";
  }
  if (weatherId >= 600 && weatherId < 700) {
    return "❄";
  }
  if (weatherId >= 700 && weatherId < 800) {
    return "🌫";
  }
  if (weatherId === 800) {
    return "☀";
  }
  if (weatherId > 800) {
    return "☁";
  }

  return "❓";
}

function displayError(message) {
  card.textContent = "";
  card.style.display = "flex";

  const errorElement = document.createElement("p");
  errorElement.textContent = message;
  errorElement.classList.add("errorDisplay");
  card.appendChild(errorElement);
}
