const getCurrentWeatherByCity = async (cityName) => {
  const myId = "53b00adb233bb2197b269f59bae84d26"
  try {
    const queryPattern = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myId}&limit=1&units=metric`
    const response = await fetch(queryPattern, { mode: "cors" })
    const jsonResponse = await response.json()
    return jsonResponse
  } catch (err) {
    console.log("City not found, please try again.")
    console.log(err)
  }
}

export default getCurrentWeatherByCity
