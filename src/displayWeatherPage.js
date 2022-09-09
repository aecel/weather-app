import { styleCurrentWeatherData, styleForecastData } from "./styleElements.js"

import getCurrentWeatherByCity from "./getCurrentWeatherByCity.js"
import getDataByCity from "./getDataByCity.js"

const displayWeatherPage = async (cityName) => {
  // Getting Current Weather Data
  const currentWeatherData = await getCurrentWeatherByCity(cityName)

  styleCurrentWeatherData(currentWeatherData)

  // Getting 3-hour Forecast Data
  const weatherData = await getDataByCity(cityName)

  styleForecastData(weatherData)
}

export default displayWeatherPage