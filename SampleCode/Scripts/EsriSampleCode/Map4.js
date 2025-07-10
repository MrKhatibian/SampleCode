import Map from "../../esriapi/4.30/@arcgis/core/Map.js";
import MapView from "../../esriapi/4.30/@arcgis/core/views/mapview.js";
import FeatureLayer from "../../esriapi/4.30/@arcgis/core/layers/featurelayer.js";
import FeatureTable from "../../esriapi/4.30/@arcgis/core/widgets/FeatureTable.js";
//import promiseutils from "../../esriapi/4.30/esri/core/promiseutils.js"



// Initialize map
const map = new Map({ basemap: "osm" });
const view = new MapView({
    container: "map",
    map: map,
    zoom: 15, // Zoom level
    center: [48.464869, 34.834155], // Longitude, latitude 48.464869  34.834155
});

// Sample FeatureLayer (replace with your own)
const layer = new FeatureLayer({
    url: "http://localhost:6080/arcgis/rest/services/Maryanaj/MaryanajND/FeatureServer/0",
    renderer: {
        type: "simple",  // autocasts as new SimpleRenderer()
        symbol: {
            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
            size: 5,
            color: "black",
            outline: null
        }
    },
    popupTemplate: {
        title: "درخواست",
        content: "شماره: {shodarkhast}"
    },
    outFields: ["*"]
});

layer.featureReduction = {
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
                width: 3
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
};


map.add(layer);

debugger;
const featureTable = new FeatureTable({
    view: view,
    layer: layer,
    tableTemplate: {
        columnTemplates: [
            {
                type: "field",
                fieldName: "shop",
                label: "شماره پرونده"
            },
            {
                type: "field",
                fieldName: "shodarkhast",
                label: "شماره درخواست"
            },
            {
                type: "field",
                fieldName: "noedarkhast",
                label: "نوع درخواست"
            }
        ]
    },
    container: "attributeTable"
});

document.getElementById("inFilter").addEventListener("input", function () {
    const value = this.value;
    layer.definitionExpression = value ? `c_noedarkhast = ${value}` : "";
});