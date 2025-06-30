import Map from "../../esriapi/4.30/@arcgis/core/Map.js";
import MapView from "../../esriapi/4.30/@arcgis/core/views/mapview.js";
import FeatureLayer from "../../esriapi/4.30/@arcgis/core/layers/featurelayer.js";


/********************
 * Add feature layer
 ********************/
const clusteredLayer = new FeatureLayer({
    url: "http://localhost:6080/arcgis/rest/services/Maryanaj/Maryanaj/FeatureServer/1",
    featureReduction: {
        type: "cluster",
        clusterRadius: "100px",        
        renderer: {
            type: "simple",            
            symbol: {
                type: "simple-marker", 
                outline: {
                    type: "simple-line", // optional, usually autocast
                    color: [0,77,158,0.5],
                    width: 3,
                    style: "solid"
                },
            },
            visualVariables: [
                {
                    type: "size",
                    field: "cluster_count",
                    stops: [
                        { value: 10, size: 15 },
                        { value: 100, size: 30 },
                        { value: 1000, size: 50 }
                    ]
                },
                {
                    type: "color",
                    field: "cluster_count",
                    stops: [
                        { value: 1, color: "#4CAF50" },     // Green
                        { value: 50, color: "#FFC107" },    // Yellow
                        { value: 100, color: "#F44336" }    // Red
                    ]
                }
            ]
        },
        labelingInfo: [{
            deconflictionStrategy: "none",
            labelExpressionInfo: {
                expression: "$feature.cluster_count"
            },
            symbol: {
                type: "text",
                color: "white",
                haloColor: "black",
                haloSize: "1px",
                font: {
                    family:"Arial",
                    size: 10,
                    weight: "bold"
                }
            },
            labelPlacement: "center-center"
        }]
    },    
    featureReductionPopupTemplate: {
        title: "Cluster of {cluster_count} features",
        content: "Click individual features for more details."
    },
    popupTemplate: {
        title: "{name}",
        content: "Naghshe Info"
    },
    outFields: ["*"]
});

const map = new Map({
    basemap: "osm",
    layers: [clusteredLayer]
});

const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 15, // Zoom level
    center: [48.464869, 34.834155], // Longitude, latitude 48.464869  34.834155
});