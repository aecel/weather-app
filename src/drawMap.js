let map, marker

const initMap = () => {
  map = L.map("map")
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map)
}

const drawMap = (lat, lon) => {
  if (!map) initMap()

  map.setView([lat, lon], 13)

  if (marker) {
    // remove marker?
    marker.remove(map)
  }

  marker = L.marker([lat, lon])
  marker.addTo(map)

  return map
}

export default drawMap
