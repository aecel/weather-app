import style from "./style.css"
import imageSlider from "./imageSlider.js"
import bg1 from "./images/bg1.jpg"
import bg2 from "./images/bg2.jpg"
import bg3 from "./images/bg3.jpg"
import bg4 from "./images/bg4.jpg"
import bg5 from "./images/bg5.jpg"

const imageArray = [bg1, bg2, bg3, bg4, bg5]

const mainDiv = document.querySelector("html")
imageSlider(mainDiv, imageArray)
