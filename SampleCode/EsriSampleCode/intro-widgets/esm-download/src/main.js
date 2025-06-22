import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle.js";
import "./style.css";

// Create the Map with an initial basemap
const map = new Map({
  basemap: "topo-vector"
});

// Create the MapView and reference the Map in the instance
const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [-86.049, 38.485],
  zoom: 3
});

// 1 - Create the widget
const toggle = new BasemapToggle({
  // 2 - Set properties
  view: view, // view that provides access to the map's 'topo-vector' basemap
  nextBasemap: "hybrid" // allows for toggling to the 'hybrid' basemap
});

// Add widget to the top right corner of the view
view.ui.add(toggle, "top-right");
