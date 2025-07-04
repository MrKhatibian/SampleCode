﻿import Map from "../../esriapi/4.30/@arcgis/core/map.js";
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
        //clusterminSize: "20px",
        //clusterMaxSize: "40px",        
        renderer: {
            type: "simple",            
            symbol: {
                type: "simple-marker",
                size: 20,
                color: "#004DA8",
                outline: {
                    color: "rgba(0, 139, 174, 0.5)",
                    width: 5,
                },
            },
        },
        popupTemplate: {
            title: "myCluster",
            content: "testttt"
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

