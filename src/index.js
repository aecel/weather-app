import style from "./style.css"
import bg9 from "./images/bg9.jpg"
import bg12 from "./images/bg12.jpg"
import bg13 from "./images/bg13.png"
import bg14 from "./images/bg14.jpg"
import bg18 from "./images/bg18.jpg"

import "/node_modules/flag-icons/css/flag-icons.min.css"

import imageSlider from "./imageSlider.js"
import displayWeatherPage from "./displayWeatherPage.js"
import addSearchBarListeners from "./addSearchBarListeners.js"

// --- Main code --- //

// Add slide show as a background
const imageArray = [bg13, bg14, bg9, bg12, bg18]
const mainDiv = document.querySelector("body")
imageSlider(mainDiv, imageArray)

// Add event listeners for the search bar
addSearchBarListeners()

// Display main page
displayWeatherPage("Quezon City")