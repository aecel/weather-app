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
// --- Main code --- //

// Slide Show as a background
const imageArray = [bg13, bg14, bg9, bg12, bg18]

const mainDiv = document.querySelector("html")
imageSlider(mainDiv, imageArray)

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

const getData = async (cityName) => {
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
  const sunrise = weatherData.city.sunrise
  const sunset = weatherData.city.sunset
  const formattedSunrise = timestamp.toDate(sunrise).toString()
  const formattedSunset = timestamp.toDate(sunset).toString()

  const dateToday = formattedSunrise.slice(4, 15)
  const sunriseTime = formattedSunrise.slice(16, 21)
  const sunsetTime = formattedSunset.slice(16, 21)

  const dateDiv = document.querySelector(".date-info")
  dateDiv.textContent = dateToday

  const sunriseDiv = document.querySelector(".sunrise")
  sunriseDiv.textContent = "Sunrise Time: " + sunriseTime
  
  const sunsetDiv = document.querySelector(".sunset")
  sunsetDiv.textContent = "Sunset Time: " + sunsetTime

  console.log(countryName)

  const mainData = weatherData.list

  // Drawing the country flag icon
  const roundFlagElement = document.querySelector(".round-flag-icon")
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
