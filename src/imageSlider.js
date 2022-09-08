import previous from "./images/previous.svg"
import next from "./images/next.svg"

const newSlideCircle = () => {
  const circle = document.createElement("div")
  circle.style.height = "5px"
  circle.style.width = "5px"
  circle.style.borderRadius = "50%"
  circle.style.border = "1px white solid"
  circle.style.cursor = "pointer"
  circle.style.zIndex = "1"

  return circle
}

const shadeCircle = (circle, arrayOfCircles) => {
  for (const circ of arrayOfCircles) {
    circ.style.backgroundColor = "unset"
  }
  circle.style.backgroundColor = "white"
}

const slideShow = (
  mainDiv,
  arrayOfImageUrl,
  arrayOfCircles,
  duration,
  previousBox,
  nextBox
) => {
  // First default background
  mainDiv.style.backgroundImage = `url(${arrayOfImageUrl[0]})`
  shadeCircle(arrayOfCircles[0], arrayOfCircles)

  let counter = 1

  // Change counter, bg, shaded circle when a circle is clicked
  for (const circle of arrayOfCircles) {
    circle.addEventListener("click", (e) => {
      const index = arrayOfCircles.indexOf(e.target)
      counter = index
      // console.log(counter)
      mainDiv.style.backgroundImage = `url(${arrayOfImageUrl[counter]})`
      shadeCircle(arrayOfCircles[counter], arrayOfCircles)
    })
  }

  // Change counter, bg, shaded circle when the previous button is clicked
  previousBox.addEventListener("click", () => {
    if (counter == 0) {
      counter = arrayOfImageUrl.length - 1
    } else {
      counter--
    }
    console.log("prevbox " + counter)
    mainDiv.style.backgroundImage = `url(${arrayOfImageUrl[counter]})`
    shadeCircle(arrayOfCircles[counter], arrayOfCircles)
  })

  // Change counter, bg, shaded circle when the next button is clicked
  nextBox.addEventListener("click", () => {
    if (counter == arrayOfImageUrl.length - 1) {
      counter = 0
    } else {
      counter++
    }
    // console.log("prevbox " + counter)
    mainDiv.style.backgroundImage = `url(${arrayOfImageUrl[counter]})`
    shadeCircle(arrayOfCircles[counter], arrayOfCircles)
  })

  // Main slide show loop
  const i = setInterval(() => {
    // console.log(counter)

    // Do things in here for each image

    mainDiv.style.backgroundImage = `url(${arrayOfImageUrl[counter]})`
    shadeCircle(arrayOfCircles[counter], arrayOfCircles)

    counter++
    if (counter === arrayOfImageUrl.length) {
      // clearInterval(i)
      counter = 0
    }
  }, duration)
}

const stylizeArrowBox = (box, imageSrc) => {
  box.style.width = "6%"
  box.style.height = "100%"
  box.style.display = "flex"
  box.style.justifyContent = "center"
  box.style.alignItems = "center"
  box.style.cursor = "pointer"
  box.style.zIndex = "1"

  // Image element style
  const imageElement = document.createElement("img")
  imageElement.src = imageSrc
  imageElement.style.height = "40px"
  imageElement.style.display = "none"

  // Append image
  box.appendChild(imageElement)

  //Box Listeners
  box.addEventListener("mouseenter", () => {
    box.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
    imageElement.style.display = "flex"
    // console.log("Displaying box")
  })
  box.addEventListener("mouseleave", () => {
    box.style.backgroundColor = "unset"
    imageElement.style.display = "none"
    // console.log("Hiding box")
  })
}

const imageSlider = (appendSliderToThisDiv, arrayOfImageUrl) => {
  // Main Div style
  appendSliderToThisDiv.style.height = "100%"
  appendSliderToThisDiv.style.width = "100%"
  appendSliderToThisDiv.style.backgroundSize = "cover"
  appendSliderToThisDiv.style.backgroundPosition = "center"
  appendSliderToThisDiv.style.backgroundRepeat = "no-repeat"
  appendSliderToThisDiv.style.position = "relative"

  // Inside Main Div
  // Navigation Div style
  const navigationDiv = document.createElement("div")
  navigationDiv.style.height = "100%"
  navigationDiv.style.width = "100%"
  navigationDiv.style.backgroundColor = "rgba(0, 0, 0, 0.2)"
  navigationDiv.style.position = "absolute"
  // navigationDiv.style.top = "0px"
  // navigationDiv.style.left = "0px"
  navigationDiv.style.display = "flex"

  // Inside Navigation Div
  // Previous Box || Center Box || Next Box

  // Previous Box style
  const previousBox = document.createElement("div")
  stylizeArrowBox(previousBox, previous)

  // Center Box style
  const centerBox = document.createElement("div")
  centerBox.style.flex = "1"
  centerBox.style.display = "flex"
  centerBox.style.justifyContent = "center"
  centerBox.style.alignItems = "flex-end"
  centerBox.style.marginBottom = "7vh"
  centerBox.style.gap = "15px"

  let arrayOfCircles = []
  for (const imageSrc of arrayOfImageUrl) {
    const newCircle = newSlideCircle()
    centerBox.appendChild(newCircle)
    arrayOfCircles.push(newCircle)
  }

  // Next Box Style
  const nextBox = document.createElement("div")
  stylizeArrowBox(nextBox, next)

  // Appending children
  navigationDiv.appendChild(previousBox)
  navigationDiv.appendChild(centerBox)
  navigationDiv.appendChild(nextBox)
  appendSliderToThisDiv.appendChild(navigationDiv)

  // Working slideshow (changing background of Main Div every 5 seconds)
  slideShow(
    appendSliderToThisDiv,
    arrayOfImageUrl,
    arrayOfCircles,
    30000,
    previousBox,
    nextBox
  )
}

export default imageSlider

// const arrayOfImages = []
// const pictureFrame = document.createElement("div")
// for (const image of arrayOfImageUrl) {
//   const imageElement = document.createElement("img")
//   imageElement.style.objectFit = "contain"
//   imageElement.classList.toggle("display-none")
//   imageElement.style.maxHeight = "100%"
//   imageElement.style.maxWidth = "100%"
//   imageElement.src = image

//   arrayOfImages.push(imageElement)

//   pictureFrame.appendChild(imageElement)
// }

// Slideshow of Image divs
// let counter = 1
// arrayOfImages[0].classList.toggle("display-none")
// const i = setInterval(() => {
//   console.log(counter)

//   // Do things in here for each image

//   for (const image of arrayOfImages) {
//     image.classList.add("display-none")
//   }

//   arrayOfImages[counter].classList.toggle("display-none")

//   counter++
//   if (counter === arrayOfImages.length) {
//     // clearInterval(i)
//     counter = 0
//   }
// }, 1000)
