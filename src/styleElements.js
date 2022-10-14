import drawMap from "./drawMap.js"

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const styleWeatherIcon = (iconCode) => {
  const weatherIconUrl = `./images/weather-icons/${iconCode}.svg`
  const weatherIcon = document.createElement("img")
  weatherIcon.src = weatherIconUrl
  weatherIcon.style.height = "40px"

  weatherIcon.style.width = "auto"
  weatherIcon.style.paddingTop = "10px"
  weatherIcon.style.paddingBottom = "10px"
  // weatherIcon.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
  // weatherIcon.style.borderRadius = "50%"
  // weatherIcon.style.padding = "5px"

  return weatherIcon
}

const styleDateTime = (data) => {
  const dataString = data.toString()
  const day = dataString.slice(0, 3)
  const date = dataString.slice(4, 10)
  const time = dataString.slice(16, 21)
  const timeZone = dataString.slice(25)

  const divElement = document.createElement("div")
  divElement.classList.add("in-grid")
  divElement.classList.add("no-bg")

  const dayText = document.createElement("p")
  dayText.textContent = day
  dayText.style.fontWeight = "bold"

  const dayTime = document.createElement("p")
  dayTime.textContent = date + " " + time

  divElement.appendChild(dayText)
  divElement.appendChild(dayTime)

  divElement.style.flexDirection = "column"
  divElement.style.gap = "5px"
  divElement.style.width = "80%"
  divElement.style.textAlign = "center"

  return divElement
}

const styleTempData = (data) => {
  const mainTempData = data.main
  const temp = mainTempData.temp
  const feelsLike = mainTempData.feels_like
  const mainWeatherData = data.weather[0]
  const forecast = mainWeatherData.main
  const forecastDescription = mainWeatherData.description

  const forecastElement = document.createElement("div")
  forecastElement.classList.add("in-grid")
  forecastElement.classList.add("no-bg")

  const forecastText = document.createElement("p")
  forecastText.textContent = forecast
  forecastText.style.fontWeight = "bold"

  const descriptionText = document.createElement("p")
  descriptionText.textContent = capitalizeFirstLetter(forecastDescription)

  forecastElement.appendChild(forecastText)
  forecastElement.appendChild(descriptionText)

  forecastElement.style.flexDirection = "column"
  forecastElement.style.gap = "5px"
  // forecastElement.style.width = "80%"
  forecastElement.style.textAlign = "center"

  const tempElement = document.createElement("div")
  tempElement.style.display = "flex"
  tempElement.style.gap = "10px"
  tempElement.style.fontSize = "0.6rem"
  tempElement.style.flexDirection = "column"

  const tempBox1 = document.createElement("div")
  tempBox1.classList.add("in-grid")
  // tempBox1.style.height = "50px"
  // tempBox1.style.width = "50px"
  tempBox1.style.padding = "10px"
  // tempBox1.style.flexDirection = "column"

  const tempBox1text = document.createElement("p")
  tempBox1text.textContent = "Temp: " + temp + " " + "°C"
  // tempBox1text.style.fontWeight = "bold"
  // tempBox1text.style.marginBottom = "5px"

  // const tempBox1temp = document.createElement("p")
  // tempBox1temp.textContent = temp + " " + "°C"

  tempBox1.appendChild(tempBox1text)
  // tempBox1.appendChild(tempBox1temp)

  const tempBox2 = document.createElement("div")
  tempBox2.classList.add("in-grid")
  // tempBox2.style.height = "50px"
  // tempBox2.style.width = "50px"
  tempBox2.style.padding = "10px"
  tempBox2.style.flexDirection = "column"

  const tempBox2text = document.createElement("p")
  tempBox2text.textContent = "Feels like: " + feelsLike + " " + "°C"
  // tempBox2text.style.fontWeight = "bold"
  // tempBox2text.style.marginBottom = "5px"

  // const tempBox2temp = document.createElement("p")
  // tempBox2temp.textContent = feelsLike + " " + "°C"

  tempBox2.appendChild(tempBox2text)
  // tempBox2.appendChild(tempBox2temp)

  tempElement.appendChild(tempBox1)
  tempElement.appendChild(tempBox2)

  const returnElement = document.createElement("div")
  returnElement.style.textAlign = "center"
  // returnElement.classList.add("in-grid")
  // returnElement.classList.add("no-bg")
  // returnElement.style.flexDirection = "column"

  returnElement.appendChild(forecastElement)
  returnElement.appendChild(tempElement)

  return returnElement
}

// Drawing the country flag icon
const drawFlagIcon = (countryCode) => {
  const roundFlagElement = document.querySelector(".round-flag-icon")
  const roundFlagClasses = roundFlagElement.classList

  for (const class1 of roundFlagClasses) {
    if (class1 != "round-flag-icon") {
      roundFlagElement.classList.remove(class1)
    }
  }

  roundFlagElement.classList.add(`round-flag-${countryCode}`)
}

const styleCurrentWeatherData = (currentWeatherData) => {
  const currentMainData = currentWeatherData.main
  const currentTemp = currentMainData.temp
  const currentFeelsLike = currentMainData.feels_like
  const currentWeatherObj = currentWeatherData.weather[0]
  const currentMainWeather = currentWeatherObj.main
  const currentDescription = currentWeatherObj.description
  const currentIconCode = currentWeatherObj.icon
  const currentWeatherIcon = styleWeatherIcon(currentIconCode)
  currentWeatherIcon.style.height = "40px"
  currentWeatherIcon.style.width = "auto"

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
  currentTempDiv.innerHTML =
    '<img class="small-icon" src="./images/temp.svg"><b>Current Temp:</b>' +
    currentTemp +
    " °C"
  const currentFeelsLikeDiv = document.querySelector(".current-feels-like")
  currentFeelsLikeDiv.innerHTML =
    '<img class="small-icon" src="./images/feels-like.svg"><b>Feels like:</b>' +
    currentFeelsLike +
    " °C"
}

const styleForecastData = (weatherData) => {
  // Getting relevant data
  const countryCode = weatherData.city.country
  const countryCodeLower = countryCode.toLowerCase()

  const regionNames = new Intl.DisplayNames(["en"], { type: "region" })
  const countryName = regionNames.of(countryCode)
  const nameOfCity = weatherData.city.name
  const topLeftText = nameOfCity + ", " + countryName + ` (${countryCode})`

  const cityNameDiv = document.querySelector(".city-name")
  cityNameDiv.textContent = topLeftText

  const coord = weatherData.city.coord
  const lat = coord.lat
  const lon = coord.lon
  const mainMap = drawMap(lat, lon)

  const sunrise = weatherData.city.sunrise
  const sunset = weatherData.city.sunset
  const timestamp = require("unix-timestamp")
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

  drawFlagIcon(countryCodeLower)

  const mainData = weatherData.list

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

export { styleCurrentWeatherData, styleForecastData }
