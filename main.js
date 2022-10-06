// Token zou je kunnen opvragen op https://www.mapbox.com/
const myToken = "";

mapboxgl.accessToken = myToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [5.55891, 52.02863],
  zoom: 7,
  language: "nl-NL",
});

let directions = new MapboxDirections({
  accessToken: mapboxgl.accessToken,
  language: "nl-NL",
  profile: "mapbox/driving",
  unit: "metric",
});

map.addControl(directions, "top-left");

directions.on("route", (e) => {
  let kmDistance = e.route[0].distance / 1000;
  let startRate = 5;
  let kmRate = 2.47;

  let totalCosts = startRate + kmDistance * kmRate;

  let tag = document.createElement("p");
  let text = document.createTextNode("Prijs: €" + totalCosts.toFixed(2));
  tag.appendChild(text);

  document
    .getElementsByClassName("mapbox-directions-component")[1]
    .appendChild(tag);
});
