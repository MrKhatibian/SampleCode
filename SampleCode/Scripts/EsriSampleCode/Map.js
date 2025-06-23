import Map from "../../esriapi/4.30/@arcgis/core/map.js";
import MapView from "../../esriapi/4.30/@arcgis/core/views/mapview.js";
import FeatureLayer from "../../esriapi/4.30/@arcgis/core/layers/featurelayer.js";
const map = new Map({
    basemap: "osm"
});

const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 15, // Zoom level
    center: [48.464869, 34.834155], // Longitude, latitude 48.464869  34.834155
});

/********************
 * Add feature layer
 ********************/

// Carbon storage of trees in Warren Wilson College.
const featureLayer = new FeatureLayer({
    url: "http://localhost:6080/arcgis/rest/services/Maryanaj/Maryanaj_14030619/FeatureServer/0",
    outFields: ["*"]
});

map.add(featureLayer);