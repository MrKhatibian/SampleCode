import Map from "../../EsriAPI/arcgis_js_v430_api/arcgis_js_api/javascript/4.30/@arcgis/core/Map.js";
import MapView from "../../EsriAPI/arcgis_js_v430_api/arcgis_js_api/javascript/4.30/@arcgis/core/views/MapView.js";
import FeatureLayer from "../../EsriAPI/arcgis_js_v430_api/arcgis_js_api/javascript/4.30/@arcgis/core/layers/FeatureLayer.js";
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