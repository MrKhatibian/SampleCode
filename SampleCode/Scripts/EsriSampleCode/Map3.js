import Map from "../../esriapi/4.30/@arcgis/core/Map.js";
import MapImageLayer from "../../esriapi/4.30/@arcgis/core/layers/MapImageLayer.js";
import FeatureLayer from "../../esriapi/4.30/@arcgis/core/layers/FeatureLayer.js";
import GeoJSONLayer from "../../esriapi/4.30/@arcgis/core/layers/GeoJSONLayer.js";
import MapView from "../../esriapi/4.30/@arcgis/core/views/MapView.js";
import Legend from "../../esriapi/4.30/@arcgis/core/widgets/Legend.js";
import Expand from "../../esriapi/4.30/@arcgis/core/widgets/Expand.js";
import Home from "../../esriapi/4.30/@arcgis/core/widgets/Home.js";

/********************
 * Add feature layer
 ********************/
const featureLayer = new FeatureLayer({
    url: "http://localhost:6080/arcgis/rest/services/Maryanaj/MaryanajN/FeatureServer/1",
    outFields: ["*"]
});
const mapImageLayer = new MapImageLayer({
    url: "http://localhost:6080/arcgis/rest/services/Maryanaj/MaryanajN/MapServer",
    sublayers: [{
        id: 1
    }]
});
const clusteredLayer = new FeatureLayer({
    url: "http://localhost:6080/arcgis/rest/services/Maryanaj/MaryanajN/FeatureServer/0",
    renderer: {
        type: "simple",  // autocasts as new SimpleRenderer()
        symbol: {
            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
            size: 5,
            color: "black",
            outline: null
        }
    },
    featureReduction: {
        type: "cluster",
        clusterRadius: "100px",
        clusterMaxSize: 40,
        clusterMinSize: 10,
        maxScale: 3000,   
        renderer: {
            type: "unique-value",
            field: "cluster_count",
            uniqueValueInfos: [
                {
                    value: 1,
                    symbol: {
                        type: "simple-marker",                        
                        size: 5,
                        outline: null // No outline for cluster_count = 1
                    }
                }
            ],
            defaultSymbol: {
                type: "simple-marker",
                color: "#BEE8FF",
                size: 10,
                outline: {
                    type: "simple-line",
                    color: [0, 77, 158, 0.5],
                    width: 5
                }
            },
            visualVariables: [
                {
                    type: "color",
                    field: "cluster_count",
                    stops: [
                        { value: 1, color: "black" },
                        { value: 2, color: "#BEE8FF" },
                        { value: 100, color: "#002673" }
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
                    family: "Arial",
                    size: 10,
                    weight: "bold"
                }
            },
            labelPlacement: "center-center"
        }]
    },    
    popupTemplate: {
        title: "درخواست",
        content: "شماره: {ShoD}"
    },
    outFields: ["*"]
});

const map = new Map({
    basemap: "osm",
    layers: [mapImageLayer, clusteredLayer]
});

const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 15, // Zoom level
    center: [48.464869, 34.834155], // Longitude, latitude 48.464869  34.834155
});