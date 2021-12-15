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
  "Tuesday",
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
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
  axios.get(apiUrlForecast).then(showForecast);
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
  let feels = document.querySelector("#f");
  let feelslike = Math.round(response.data.main.feels_like);
  feels.innerHTML = `${feelslike}°C`;
  function degC(event) {
    event.preventDefault();
    let butC = temp;
    deg.innerHTML = `${butC}°C`;
    feels.innerHTML = `${feelslike}°C`;
    windspeed.innerHTML = `${wind} km/h`;
  }
  function degF(event) {
    event.preventDefault();
    let butF = Math.round((temp * 9) / 5 + 32);
    deg.innerHTML = `${butF}°F`;
    let feels = document.querySelector("#f");
    let feelsDegF = Math.round((feelslike * 9) / 5 + 32);
    feels.innerHTML = `${feelsDegF}°F`;
    let mWind = Math.round(wind * 0.62137);
    windspeed.innerHTML = `${mWind} mp/h`;
  }
  let butc = document.querySelector(".butC");
  let butf = document.querySelector(".butF");
  butc.addEventListener("click", degC);
  butf.addEventListener("click", degF);

  let currentCity = response.data.name;
  console.log(currentCity);
  let h3 = document.querySelector("h3");
  h3.innerHTML = currentCity;

  let sunriseTime = response.data.sys.sunrise;
  let sunsetTime = response.data.sys.sunset;
  let date = new Date(sunriseTime * 1000);
  let dateS = new Date(sunsetTime * 1000);
  let hour = date.getHours();
  let minuts = date.getMinutes();
  let hourS = dateS.getHours();
  let minutsS = dateS.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (minuts < 10 || minutsS < 10) {
    minuts = `0${minuts}`;
    minutsS = `0${minutsS}`;
  }
  let sunrise = `${hour}:${minuts}`;
  let sunset = `${hourS}:${minutsS}`;
  console.log(sunrise);

  let sunriseTimeFinal = document.querySelector("#sunrise");
  sunriseTimeFinal.innerHTML = sunrise;
  let sunsetTimeFinal = document.querySelector("#sunset");
  sunsetTimeFinal.innerHTML = sunset;

  let wind = Math.round(response.data.wind.speed);
  let windspeed = document.querySelector("#w");
  windspeed.innerHTML = `${wind} km/h`;

  let humidity = response.data.main.humidity;
  let hum = document.querySelector("#h");
  hum.innerHTML = `${humidity}%`;

  let weatherKind = response.data.weather[0].description;
  let h4 = document.querySelector("h4");
  h4.innerHTML = weatherKind;

  console.log(response.data.weather[0].icon);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

// current location + temp //
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let place = document.querySelector(".current");
place.addEventListener("click", getCurrentPosition);

// forcast dayli //
function showForecast(response) {
  console.log(response);
  let forecastDayly = response.data.daily;
  let forecastElement = document.querySelector(".forecast");
  forecastHTML = `<div class="row">`;
  forecastDayly.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
         <img 
         class="icon" 
         src="http://openweathermap.org/img/wn/${
           forecastDay.weather[0].icon
         }@2x.png" 
         alt="cloudy" 
         width="60px">
         <div class="forecast-temp"><strong>${Math.round(
           forecastDay.temp.day
         )}</strong></div>
          <div class="forecast-day">${formatDay(forecastDay.dt)}</div></div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function formatDay(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
