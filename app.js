let url = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=";
let apiKey = "69a6ecc2d818efa244a91365f5a4c169";

let searchInput = document.querySelector(".city-input");
let btn = document.querySelector(".btn");

async function getWeather(city) {
  try {
    let response = await fetch(url + apiKey + "&q=" + city);
    let data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

async function getWeatherData() {
  let city = searchInput.value;
  let weatherData = await getWeather(city);
  //   console.log(weatherData);

  let weatherIcon = document.querySelector(".weather-icon");
  let description = document.querySelector(".description");
  let cityName = document.querySelector(".city-name");
  let temperature = document.querySelector(".temperature");
  let humidityValue = document.querySelector(".humidity-value");
  let windValue = document.querySelector(".wind-value");

  if (weatherData.cod === 200) {
    document.querySelector(".valid").classList.remove("hidden");
    document.querySelector(".invalid").classList.add("hidden");

    description.textContent = weatherData.weather[0].description;
    description.style.textTransform = "capitalize";
    cityName.textContent = weatherData.name;
    temperature.textContent = Math.round(weatherData.main.temp) + "°C";
    humidityValue.textContent = weatherData.main.humidity + "%";
    windValue.textContent = weatherData.wind.speed + "km/h";

    if (weatherData.weather[0].main === "Clouds") {
      weatherIcon.src = "./assests/clouds.png";
    } else if (weatherData.weather[0].main === "Clear") {
      weatherIcon.src = "./assests/clear.png";
    } else if (weatherData.weather[0].main === "Rain") {
      weatherIcon.src = "./assests/rain.png";
    } else if (weatherData.weather[0].main === "Snow") {
      weatherIcon.src = "./assests/snow.png";
    } else if (weatherData.weather[0].main === "Drizzle") {
      weatherIcon.src = "./assests/drizzle.png";
    } else if (weatherData.weather[0].main === "Mist") {
      weatherIcon.src = "./assests/mist.png";
    } else {
    }

    searchInput.value = "";
  } else {
    document.querySelector(".valid").classList.add("hidden");
    document.querySelector(".invalid").classList.remove("hidden");

    searchInput.value = "";
  }
}

btn.addEventListener("click", getWeatherData);
searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getWeatherData();
  }
});
