import displayWeatherPage from "./displayWeatherPage.js"

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

// Search bar functions
const searchIconClicked = () => {
  const searchInputDiv = document.querySelector(".search-bar")
  const cityQuery = searchInputDiv.value
  searchInputDiv.value = ""

  if (cityQuery != "") {
    const weatherDataBoxes = document.getElementsByClassName("weather-data")

    for (const weatherDataBox of weatherDataBoxes) {
      removeAllChildNodes(weatherDataBox)
    }

    const currentWeatherIconDiv = document.querySelector(
      ".current-weather-icon"
    )
    removeAllChildNodes(currentWeatherIconDiv)

    displayWeatherPage(cityQuery)
  }
}

const addSearchBarListeners = () => {
  const searchIconDiv = document.querySelector(".search-icon")
  searchIconDiv.addEventListener("click", searchIconClicked)

  const searchInputDiv = document.querySelector(".search-bar")

  searchInputDiv.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      searchIconClicked()
    }
  })
}

export default addSearchBarListeners
