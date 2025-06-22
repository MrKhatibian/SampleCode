import Map from "@arcgis/core/Map.js";
import SceneView from "@arcgis/core/views/SceneView.js";
import "./style.css";

const map = new Map({
  basemap: "topo-3d",
  ground: "world-elevation"
});

const view = new SceneView({
  container: "viewDiv",
  map: map,
  camera: {
    position: {
      spatialReference: {
        latestWkid: 3857,
        wkid: 102100
      },
      x: -11262192.883555487,
      y: 2315246.351026253,
      z: 18161244.728082635
    },
    heading: 0,
    tilt: 0.49
  }
});
