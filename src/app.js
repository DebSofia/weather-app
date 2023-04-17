// Display the current date and time using JS

const apiKey = `349039acab4517a804dcf4a9066de7b5`;

let now = new Date();

let time = now.toLocaleTimeString("eu-PT", {
  hour: "2-digit",

  minute: "2-digit",
});

console.log(time);
console.log(now);

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = weekDays[now.getDay()];
console.log(currentDay);

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[now.getMonth()];
console.log(month);

let day = now.getDate();
console.log(day);

let year = now.getFullYear();
console.log(year);

let weekDay = weekDays[now.getDay()];
console.log(weekDay);

function displayCurrentTime() {
  let p = document.querySelector("#current-time");
  console.log(p);

  p.innerHTML = time;
}

displayCurrentTime();

function displayCurrentWeekDay() {
  let h3 = document.querySelector("#current-week-day");
  h3.innerHTML = currentDay;
}

displayCurrentWeekDay();

function displayCurrentDate() {
  let p = document.querySelector("#current-date");
  p.innerHTML = `${month}  ${day}, ${year}`;
}

displayCurrentDate();

// Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

function findElementById(elementId) {
  return document.querySelector(`#${elementId}`);
}

/*function searchCity(event) {
  event.preventDefault();
  const searchInput = findElementById("search-city-input");
  const searchInputValue = searchInput.value;
  const mainCityTitleElement = findElementById("main-city-title");

  if (searchInputValue) {
    mainCityTitleElement.innerHTML = `${searchInputValue}`;
  }
}*/

function searchCity(event) {
  event.preventDefault();
  const searchInput = document.getElementById("search-city-input");
  const searchInputValue = searchInput.value;

  getWeatherByCityAndUpdateDom(searchInputValue);

  /*if (searchInputValue) {
    mainCityTitleElement.innerHTML = `${searchInputValue}`;
    secondaryCityElements.forEach((element) => {
      element.innerHTML = searchInputValue;
    });
    cityName.innerHTML = `${searchInputValue}`;
  } */
}

function getWeatherByCityAndUpdateDom(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(url).then(function (response) {
    console.log(response);
    const { data } = response;
    const currentData = data.list[0];
    console.log(currentData);

    const mainCityTitleElement = document.getElementById("main-city-title");
    const secondaryCityElements = document.querySelectorAll(".second-city");
    const cityNameElement = document.querySelector(".city-name");

    mainCityTitleElement.innerHTML = `${cityName}`;

    const mainTemperature = Math.round(currentData.main.temp);
    const cityTemperature = findElementById("temperature-celsius");
    cityTemperature.innerHTML = `${mainTemperature}ºCelsius`;

    const humidity = document.querySelector(".h-percentage");
    humidity.innerHTML = `${currentData.main.humidity}%`;

    const timeCityElement = document.querySelector("#time-city-name");
    timeCityElement.innerHTML = cityName;

    for (let i = 0; i < 4; i++) {
      const secondaryCityTitlesElements =
        document.querySelectorAll(".second-city");

      const secondaryCityTempElements = document.querySelectorAll(
        ".secondary-temperature"
      );
      secondaryCityTempElements[i].innerHTML = i;

      const secondaryWeekDayElements = document.querySelectorAll(".week-day");
      secondaryWeekDayElements[i].innerHTML = i;

      const date = new Date();
      date.setDate(date.getDate() + i + 1);
      console.log(date);

      const fullDate = `${date.toISOString().split("T")[0]} 12:00:00`;
      console.log(fullDate);

      const dayWeatherData = data.list.find(function (d) {
        if (d.dt_txt === fullDate) {
          return true;
        } else {
          return false;
        }
      });
      console.log(dayWeatherData);

      secondaryCityTitlesElements[i].innerHTML = cityName;
      secondaryCityTempElements[i].innerHTML = `${Math.round(
        dayWeatherData.main.temp
      )}ºCelsius`;

      secondaryWeekDayElements[i].innerHTML = weekDays[date.getDay()];
    }
  });
}

const clickButton = document.querySelector("#search-button");
//clickButton.addEventListener("click", searchCity);

// Get the input field
const input = document.querySelector("#search-city-input");

// Execute a function when the user presses a key on the keyboard

clickButton.addEventListener("click", function (event) {
  event.preventDefault();
  // Get the input value
  const city = input.value;
  // Perform search logic with the city value
  console.log("Searching for city:", city);
  // Update DOM elements with city value
  const mainCityTitleElement = document.getElementById("main-city-title");
  const secondaryCityElements = document.querySelectorAll(".second-city");
  const cityNameElement = document.querySelector(".city-name");

  mainCityTitleElement.innerHTML = `${city}`;
  secondaryCityElements.forEach((element) => {
    element.innerHTML = city;
  });
  cityNameElement.innerHTML = `${city}`;

  // Call the function to get weather data and update DOM with weather data
  getWeatherByCityAndUpdateDom(city);
});

// Add event listener for Enter key press on input field
// input.addEventListener("keydown", function (event) {
//   // Check if the key code is 13, which corresponds to the Enter key
//   if (event.key === "Enter") {
//     // Cancel the default action, if needed
//     event.preventDefault();
//     // Trigger the search button click event
//     clickButton.click();
//   }
// });
// get city name by lat and long

function onLocationConfirm(position) {
  console.log(position);

  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  axios
    .get(apiUrl)
    .then((response) => {
      // Extract city name from the response
      const city = response.data[0].name;
      console.log(`City: ${city}`);
      getWeatherByCityAndUpdateDom(city);
    })
    .catch((error) => {
      console.error(error);
    });
}

function onLocationCancel(params) {
  console.log(params);
}

function getCurrentPosition(params) {
  navigator.geolocation.getCurrentPosition(
    onLocationConfirm,
    onLocationCancel,
    {}
  );
}
const currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getCurrentPosition);

/*const celsius = 19;
console.log(celsius);

const temperureCElement = findElementById("temperature-c");
temperureCElement.innerHTML = `${celsius}º Celsius`;

function celsiusToFahrenheit(degrees) {
  return degrees * 1.8 + 32;
}

function displayTemperatureFahrenheit(event) {
  event.preventDefault();

  const h2 = findElementById("temperature-c");

  const temperatureFahrenheit = celsiusToFahrenheit(celsius);

  if (temperatureFahrenheit) {
    h2.innerHTML = temperatureFahrenheit + "º  Fahrenheit";
  }
}

let linkClick = findElementById("temperature-f");

linkClick.addEventListener("click", displayTemperatureFahrenheit);

function displayTemperatureCelsius(event) {
  event.preventDefault();

  const h2 = findElementById("temperature-c");
  const temperatureCelsius = celsius;

  if (temperatureCelsius) {
    h2.innerHTML = celsius + "º" + "Celsius";
  }
}

let linkClickAgain = findElementById("temperature-c");

linkClickAgain.addEventListener("click", displayTemperatureCelsius);*/
