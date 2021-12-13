// current day+time //
let now = new Date();
let hour = now.getHours();
let min = now.getMinutes();
if (hour < 10) {
  hour = `0${hour}`;
}
if (min < 10) {
  min = `0${min}`;
}
let days = [
  "Sunday",
  "Monday",
  "Teausday",
  "Wednsday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let currentTime = document.querySelector("h5");
currentTime.innerHTML = `${day} ${hour}:${min}`;
// Open page with current info //
let apiKey = "089de42863cffcedc265abdd75619b42";
navigator.geolocation.getCurrentPosition(getCurrentLocation);

function getCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

// search city //
let search = document.querySelector(".sub");
function currentCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search");
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=metric&appid=${apiKey}`;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${searchCity.value}`;
  axios.get(apiUrlCity).then(showTemp);
}
search.addEventListener("click", currentCity);
// temp functions //
function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let deg = document.querySelector("#deg");
  deg.innerHTML = `${temp}°C`;
  console.log(temp);
  let feels = document.querySelector("#f");
  let feelslike = Math.round(response.data.main.feels_like);
  feels.innerHTML = `${feelslike}°C`;
  function degC(event) {
    event.preventDefault();
    let butC = temp;
    deg.innerHTML = `${butC}°C`;
    feels.innerHTML = `${feelslike}°C`;
  }
  function degF(event) {
    event.preventDefault();
    let butF = Math.round((temp * 9) / 5 + 32);
    deg.innerHTML = `${butF}°F`;
    let feels = document.querySelector("#f");
    let feelsDegF = Math.round((feelslike * 9) / 5 + 32);
    feels.innerHTML = `${feelsDegF}°F`;
  }
  let butc = document.querySelector(".butC");
  let butf = document.querySelector(".butF");
  butc.addEventListener("click", degC);
  butf.addEventListener("click", degF);

  let currentCity = response.data.name;
  console.log(currentCity);
  let h3 = document.querySelector("h3");
  h3.innerHTML = currentCity;

  let wind = Math.round(response.data.wind.speed);
  let windspeed = document.querySelector("#w");
  windspeed.innerHTML = `${wind} km/h`;
  let humidity = response.data.main.humidity;
  let hum = document.querySelector("#h");
  hum.innerHTML = `${humidity}%`;

  let weatherKind = response.data.weather[0].main;
  let h4 = document.querySelector("h4");
  h4.innerHTML = weatherKind;
}

// current location + temp //

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let place = document.querySelector(".current");
place.addEventListener("click", getCurrentPosition);
