const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const styleWeatherIcon = (iconCode) => {
  const weatherIconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`
  const weatherIcon = document.createElement("img")
  weatherIcon.src = weatherIconUrl
  weatherIcon.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
  weatherIcon.style.borderRadius = "50%"
  weatherIcon.style.padding = "5px"

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
  forecastElement.style.width = "80%"
  forecastElement.style.textAlign = "center"

  const tempElement = document.createElement("div")
  tempElement.style.display = "flex"
  tempElement.style.gap = "10px"
  tempElement.style.fontSize = "0.65rem"

  const tempBox1 = document.createElement("div")
  tempBox1.classList.add("in-grid")
  tempBox1.style.height = "50px"
  tempBox1.style.width = "50px"
  tempBox1.style.padding = "5px"
  tempBox1.style.flexDirection = "column"

  const tempBox1text = document.createElement("p")
  tempBox1text.textContent = "Temp"
  tempBox1text.style.fontWeight = "bold"
  tempBox1text.style.marginBottom = "5px"

  const tempBox1temp = document.createElement("p")
  tempBox1temp.textContent = temp + " " + "°C"

  tempBox1.appendChild(tempBox1text)
  tempBox1.appendChild(tempBox1temp)

  const tempBox2 = document.createElement("div")
  tempBox2.classList.add("in-grid")
  tempBox2.style.height = "50px"
  tempBox2.style.width = "50px"
  tempBox2.style.padding = "5px"
  tempBox2.style.flexDirection = "column"

  const tempBox2text = document.createElement("p")
  tempBox2text.textContent = "Feels like"
  tempBox2text.style.fontWeight = "bold"
  tempBox2text.style.marginBottom = "5px"

  const tempBox2temp = document.createElement("p")
  tempBox2temp.textContent = feelsLike + " " + "°C"

  tempBox2.appendChild(tempBox2text)
  tempBox2.appendChild(tempBox2temp)

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

export { styleDateTime, styleTempData, styleWeatherIcon }
