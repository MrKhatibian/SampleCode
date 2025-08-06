import Map from "../../esriapi/4.30/@arcgis/core/Map.js";
import MapView from "../../esriapi/4.30/@arcgis/core/views/MapView.js";
import FeatureLayer from "../../esriapi/4.30/@arcgis/core/layers/FeatureLayer.js";
import MapImageLayer from "../../EsriAPI/4.30/@arcgis/core/layers/MapImageLayer.js"


const map = new Map({ basemap: "osm" });

const view = new MapView({
    map: map,
    container: "mapView",
    center: [48.464869, 34.834155],
    zoom: 14
});

const url = "http://localhost:6080/arcgis/rest/services/Maryanaj/MaryanajNN/MapServer";

const layerDarkhast = new MapImageLayer({
    url: url,
    sublayers: [{ id: 0 }]
});

const layerArse = new MapImageLayer({
    url: url,
    sublayers: [{ id: 1 }]
});

map.addMany([layerArse, layerDarkhast]);


