import Map from "../../esriapi/4.30/@arcgis/core/map.js";
import MapView from "../../esriapi/4.30/@arcgis/core/views/mapview.js";
import FeatureLayer from "../../esriapi/4.30/@arcgis/core/layers/featurelayer.js";
import Expand from "../../esriapi/4.30/@arcgis/core/widgets/expand.js";
import Legend from "../../esriapi/4.30/@arcgis/core/widgets/legend.js";


// Displays each weather station with three variables:
// Rotation - indicates wind direction
// Color - indicates air temperature
// Size - indicates wind speed


const renderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        // Arrow marker
        path: "M14.5,29 23.5,0 14.5,9 5.5,0z",
        color: [50, 50, 50],
        outline: {
            color: [0, 0, 0, 0.7],
            width: 0.5
        },
        angle: 180,
        size: 15
    },
    visualVariables: [
        {
            type: "rotation",
            // Use {cluster_avg_WIND_DIRECT} in the
            // featureReudction.popupTemplate to
            // display the average temperature of all
            // features within the cluster
            field: "WIND_DIRECT",
            rotationType: "geographic"
        },
        {
            type: "size",
            // Use {cluster_avg_WIND_SPEED} in the
            // featureReudction.popupTemplate to
            // display the average temperature of all
            // features within the cluster
            field: "POP_RANK",
            minDataValue: 362400,
            maxDataValue: 601951,
            minSize: 15,
            maxSize: 40
        },
        {
            type: "color",
            // Use {cluster_avg_TEMP} in the
            // featureReudction.popupTemplate to
            // display the average temperature of all
            // features within the cluster
            field: "POP_RANK",
            stops: [
                { value: 1, color: "#2b83ba" },
                { value: 2, color: "#abdda4" },
                { value: 3, color: "#ffffbf" },
                { value: 4, color: "#fdae61" },
                { value: 5, color: "#d7191c" }
            ]
        }
    ]
};


// Configures clustering on the layer including
// a popupTemplate referring to aggregate fields
// that summarize the values of the fields used
// to render the cluster graphics.


const clusterConfig = {
    type: "cluster",
    popupTemplate: {
        content: [{
            type: "text",
            text: "This cluster represents <b>{cluster_count}</b> weather stations."
        }, {
            type: "fields",
            fieldInfos: [{
                fieldName: "cluster_avg_WIND_SPEED",
                label: "Average wind speed (km/h)",
                format: {
                    places: 0
                }
            }, {
                fieldName: "cluster_avg_WIND_DIRECT",
                label: "Average wind direction (degrees)",
                format: {
                    places: 0
                }
            }, {
                fieldName: "cluster_avg_TEMP",
                label: "Average temperature (°F)",
                format: {
                    places: 0
                }
            }]
        }]
    }
};


const layer = new FeatureLayer({
    //portalItem: {
    //    id: "cb1886ff0a9d4156ba4d2fadd7e8a139"
    //},
    url: "http://localhost:6080/arcgis/rest/services/World/FeatureServer/0",
    renderer,
    featureReduction: clusterConfig
});

// Layer used only for geographic context
const baseLayer2 = new FeatureLayer({
     url:"http://localhost:6080/arcgis/rest/services/World/FeatureServer/1"
})
const baseLayer = new FeatureLayer({
    //portalItem: {
    //    id: "2b93b06dc0dc4e809d3c8db5cb96ba69"
    //},
    url: "http://localhost:6080/arcgis/rest/services/World/FeatureServer/2",
    legendEnabled: false,
    popupEnabled: false,
    renderer: {
        type: "simple",
        symbol: {
            type: "simple-fill",
            color: [200, 200, 200, 0.75],
            outline: {
                color: "white",
                width: 0.5
            }
        }
    }
});

const map = new Map({
    layers: [baseLayer, baseLayer2, layer]
});


const spatialReference = {
    wkid: 54036
};

const view = new MapView({
    container: "viewDiv",
    map,
    center: {
        x: 0,
        y: 0,
        spatialReference: spatialReference
    },
    spatialReference: spatialReference,
    scale: 2,
    constraints: {
        rotationEnabled: false
    },
    graphics: [
        {
            symbol: {
                type: "simple-fill",
                color: null,
                outline: {
                    width: 1,
                    color: [200, 200, 200, 0.75]
                }
            },
            geometry: {
                type: "extent",
                xmin: -180,
                xmax: 180,
                ymin: -90,
                ymax: 90,
                spatialReference: { wkid: 4326 }
            }
        }
    ]
});

const legend = new Legend({
    view: view,
    container: "legendDiv"
});

const infoDiv = document.getElementById("infoDiv");
view.ui.add(new Expand({
    view: view,
    content: infoDiv,
    expandIcon: "list-bullet",
    expanded: true
}), "top-right");

const toggleButton = document.getElementById("toggle-cluster");
toggleButton.addEventListener("click", toggleClustering);

// To turn off clustering on a layer, set the
// featureReduction property to null
function toggleClustering() {
    let fr = layer.featureReduction;
    layer.featureReduction = (fr && fr.type === "cluster") ? null : clusterConfig;
    toggleButton.innerText = toggleButton.innerText === "Enable Clustering" ? "Disable Clustering" : "Enable Clustering";
}