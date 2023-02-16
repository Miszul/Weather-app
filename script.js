let now = new Date();
let weekDays = [
  `sunday`,
  `monday`,
  `tuesday`,
  `wednesday`,
  `thursday`,
  `friday`,
  `saturday`,
];
let weekDay = weekDays[now.getDay()];
let day = now.getDate();
if (day < 10) {
  day = "0" + day;
}
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let month = months[now.getMonth()];
let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = "0" + hour;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
let date = document.querySelector("h2");
date.innerHTML = `${weekDay}</br>${day}.${month}.${year}
`;
let time = document.querySelector("#time");
time.innerHTML = `${hour}:${minutes}`;

function unitCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `2°C`;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", unitCelsius);
function unitFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `36°F`;
}
let fahrenheit = document.querySelector("#fahr");
fahrenheit.addEventListener("click", unitFahrenheit);

function displayWeather(response) {
  let h1 = document.querySelector("h1");
  let displayedTemp = document.querySelector("#current-temp");
  h1.innerHTML = response.data.name;
  let celsius = Math.round(response.data.main.temp);
  displayedTemp.innerHTML = `${celsius}°C`;
}

function changeData(response) {
  console.log(response);
  let lat = response.data[0].lat;
  let lon = response.data[0].lon;
  console.log(`${lat}`);
  let unit = "metric";
  let apiKey = `53f3bc1f5d348c44be3e3754c7185573`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  console.log(`${weatherUrl}`);
  axios.get(weatherUrl).then(displayWeather);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let apiKey = `53f3bc1f5d348c44be3e3754c7185573`;
  let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=1&appid=${apiKey}`;
  axios.get(apiUrl).then(changeData);
  console.log(apiUrl);
}

let searchBar = document.querySelector("form");
searchBar.addEventListener("submit", changeCity);
