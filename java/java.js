function formateDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${hours}:${minutes} ${day}`;
}
let now = new Date();
let changeDate = document.querySelector("#current-date");
changeDate.innerHTML = formateDate(now);

function getWeatherInfo(response) {
  let temperatureApi = Math.round(response.data.main.temp);
  let temperatureOnPage = document.querySelector("#today-temperature");
  temperatureOnPage.innerHTML = temperatureApi;
}
function searchCity(event) {
  event.preventDefault();
  let cityNameOnPage = document.querySelector("#city");
  let cityInput = document.querySelector(".form-control");
  let city = `${cityInput.value}`;
  console.log(city);
  cityNameOnPage.innerHTML = `${city}`;
  let apiKey = "7023f90e93ab93e37a85cf988f11ec93";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(getWeatherInfo);
}
let form = document.querySelector("#form-input");
form.addEventListener("submit", searchCity);

function showWeather(response) {
  let city = document.querySelector("#city");
  let temperature = Math.round(response.data.main.temp);
  let temperatureOnPage = document.querySelector("#today-temperature");
  city.innerHTML = `${response.data.name}`;
  temperatureOnPage.innerHTML = temperature;
}

function retrievePosition(position) {
  let apiKey = "7023f90e93ab93e37a85cf988f11ec93";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);
let currentLocationButton = document.querySelector("#current-btn");
currentLocationButton.addEventListener("click", showWeather);

//    //https://github.com/OlgaNyko/WeatherProject
