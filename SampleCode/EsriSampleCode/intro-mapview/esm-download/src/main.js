import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import "./style.css";

const map = new Map({
  basemap: "topo-vector"
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  zoom: 4,
  center: [15, 65] // longitude, latitude
});
