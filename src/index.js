import style from "./style.css"
import imageSlider from "./imageSlider.js"
import bg9 from "./images/bg9.jpg"
import bg12 from "./images/bg12.jpg"
import bg13 from "./images/bg13.png"
import bg14 from "./images/bg14.jpg"
import bg18 from "./images/bg18.jpg"
import { searchIcon } from "./lordIcons.js"

import "/node_modules/flag-icons/css/flag-icons.min.css"

import {
  styleDateTime,
  styleTempData,
  styleWeatherIcon,
} from "./styleElements.js"
import drawMap from "./drawMap.js"

// --- Main code --- //

// Slide Show as a background
const imageArray = [bg13, bg14, bg9, bg12, bg18]

const mainDiv = document.querySelector("body")
imageSlider(mainDiv, imageArray)

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

const searchIconClicked = () => {
  const searchInputDiv = document.querySelector(".search-bar")
  const cityQuery = searchInputDiv.value
  if (cityQuery != "") {
    const weatherDataBoxes = document.getElementsByClassName("weather-data")

    for (const weatherDataBox of weatherDataBoxes) {
      removeAllChildNodes(weatherDataBox)
    }

    const currentWeatherIconDiv = document.querySelector(".current-weather-icon")
    removeAllChildNodes(currentWeatherIconDiv)
    // const mapDiv = document.getElementById("map")
    // removeAllChildNodes(mapDiv)

    getData(cityQuery)
  }
  searchInputDiv.value = ""
}

const searchIconDiv = document.querySelector(".search-icon")
searchIconDiv.addEventListener("click", searchIconClicked)

const searchInputDiv = document.querySelector(".search-bar")

// Execute a function when the user presses a key on the keyboard
searchInputDiv.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault()
    // Trigger the button element with a click
    searchIconClicked()
  }
})

// --- Test code --- //

const myId = "53b00adb233bb2197b269f59bae84d26"

const timestamp = require("unix-timestamp")

const regionNames = new Intl.DisplayNames(["en"], { type: "region" })

const getDataByCity = async (cityName) => {
  const queryPattern = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${myId}&limit=1&units=metric&cnt=8`
  const response = await fetch(queryPattern, { mode: "cors" })
  const jsonResponse = await response.json()
  return jsonResponse
}

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const getCurrentWeatherByCity = async (cityName) => {
  const queryPattern = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myId}&limit=1&units=metric`
  const response = await fetch(queryPattern, { mode: "cors" })
  const jsonResponse = await response.json()
  return jsonResponse
}

const getData = async (cityName) => {
  // Getting Current Weather Data
  const currentWeatherData = await getCurrentWeatherByCity(cityName)
  console.log(currentWeatherData)

  const currentMainData = currentWeatherData.main
  const currentTemp = currentMainData.temp
  const currentFeelsLike = currentMainData.feels_like
  const currentWeatherObj = currentWeatherData.weather[0]
  const currentMainWeather = currentWeatherObj.main
  const currentDescription = currentWeatherObj.description
  const currentIconCode = currentWeatherObj.icon
  const currentWeatherIcon = styleWeatherIcon(currentIconCode)
  currentWeatherIcon.style.height = "80px"
  currentWeatherIcon.style.width = "80px"

  const currentWeatherIconDiv = document.querySelector(".current-weather-icon")
  currentWeatherIconDiv.appendChild(currentWeatherIcon)
  const currentWeatherMainDiv = document.querySelector(".current-weather-main")
  currentWeatherMainDiv.textContent = currentMainWeather
  const currentWeatherDescriptionDiv = document.querySelector(
    ".current-weather-description"
  )
  currentWeatherDescriptionDiv.textContent =
    capitalizeFirstLetter(currentDescription)
  const currentTempDiv = document.querySelector(".current-temp")
  currentTempDiv.innerHTML = "<b>Current Temp:</b>&nbsp" + currentTemp + " °C"
  const currentFeelsLikeDiv = document.querySelector(".current-feels-like")
  currentFeelsLikeDiv.innerHTML = "<b>Feels like:</b>&nbsp" + currentFeelsLike + " °C"

  // Getting 3-hour Forecast Data
  const weatherData = await getDataByCity(cityName)
  console.log(weatherData)

  // Getting relevant data
  const countryCode = weatherData.city.country
  const countryCodeLower = countryCode.toLowerCase()
  const countryName = regionNames.of(countryCode)
  const nameOfCity = weatherData.city.name
  const topLeftText = nameOfCity + ", " + countryName

  const cityNameDiv = document.querySelector(".city-name")
  cityNameDiv.textContent = topLeftText

  const coord = weatherData.city.coord
  const lat = coord.lat
  const lon = coord.lon
  const mainMap = drawMap(lat, lon)

  const sunrise = weatherData.city.sunrise
  const sunset = weatherData.city.sunset
  const formattedSunrise = timestamp.toDate(sunrise).toString()
  const formattedSunset = timestamp.toDate(sunset).toString()

  const dateToday = formattedSunrise.slice(4, 15)
  const timeZone = formattedSunrise.slice(25, 33)
  const timeZoneDesc = formattedSunrise.slice(33)
  const sunriseTime = formattedSunrise.slice(16, 21)
  const sunsetTime = formattedSunset.slice(16, 21)
  const timeNow = new Date().toLocaleTimeString()

  const dateDiv = document.querySelector(".date-info")
  const dateNowDiv = document.querySelector(".date-now")
  const timeNowDiv = document.querySelector(".time-now")
  const timezone1Div = document.querySelector(".timezone-1")
  const timezone2Div = document.querySelector(".timezone-2")
  dateNowDiv.textContent = dateToday
  timeNowDiv.textContent = timeNow
  timezone1Div.textContent = timeZone
  timezone2Div.textContent = timeZoneDesc

  const sunriseDiv = document.querySelector(".sunrise-text")
  sunriseDiv.textContent = sunriseTime

  const sunsetDiv = document.querySelector(".sunset-text")
  sunsetDiv.textContent = sunsetTime

  const mainData = weatherData.list

  // Drawing the country flag icon
  const roundFlagElement = document.querySelector(".round-flag-icon")
  const roundFlagClasses = roundFlagElement.classList

  for (const class1 of roundFlagClasses) {
    if (class1 != "round-flag-icon") {
      roundFlagElement.classList.remove(class1)
    }
  }

  roundFlagElement.classList.add(`round-flag-${countryCodeLower}`)

  // Main loop for getting weather data for each timestamp
  // Each timestamp represents the 8 weather data boxes
  let counter = 0
  for (const data of mainData) {
    const weatherDataBox = document.querySelector(`.weather-data-${counter}`)

    // Getting date and time data
    const dateTime = timestamp.toDate(data.dt)
    const dateTimeBox = styleDateTime(dateTime)
    weatherDataBox.appendChild(dateTimeBox)

    // Getting the weather icon
    const mainWeatherData = data.weather[0]
    const weatherIconCode = mainWeatherData.icon
    const weatherIconElement = styleWeatherIcon(weatherIconCode)
    weatherDataBox.appendChild(weatherIconElement)

    // Getting main temperature and weather data
    const forecastBox = styleTempData(data)

    weatherDataBox.appendChild(forecastBox)

    counter++
  }
}

getData("Quezon City")

// const handleError =
//   (fn) =>
//   (...params) =>
//     fn(...params).catch(console.error)
// const safeFn = handleError(Fn)
