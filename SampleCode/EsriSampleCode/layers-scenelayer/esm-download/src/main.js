import Map from "@arcgis/core/Map.js";
import SceneView from "@arcgis/core/views/SceneView.js";
import SceneLayer from "@arcgis/core/layers/SceneLayer.js";
import "./style.css";

// Create Map
const map = new Map({
  basemap: "dark-gray-vector",
  ground: "world-elevation"
});

// Create the SceneView
const view = new SceneView({
  container: "viewDiv",
  map: map,
  camera: {
    position: [-74.0338, 40.6913, 707],
    tilt: 81,
    heading: 50
  }
});

// Create SceneLayer and add to the map
const sceneLayer = new SceneLayer({
  portalItem: {
    id: "2e0761b9a4274b8db52c4bf34356911e"
  },
  popupEnabled: false
});
map.add(sceneLayer);

// Create MeshSymbol3D for symbolizing SceneLayer
const symbol = {
  type: "mesh-3d", // autocasts as new MeshSymbol3D()
  symbolLayers: [
    {
      type: "fill", // autocasts as new FillSymbol3DLayer()
      // If the value of material is not assigned, the default color will be grey
      material: {
        color: [244, 247, 134]
      }
    }
  ]
};
// Add the renderer to sceneLayer
sceneLayer.renderer = {
  type: "simple", // autocasts as new SimpleRenderer()
  symbol: symbol
};
