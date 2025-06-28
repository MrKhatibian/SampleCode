import Map from "../../esriapi/4.30/@arcgis/core/map.js";
import FeatureLayer from "../../esriapi/4.30/@arcgis/core/layers/FeatureLayer.js";
import GeoJSONLayer from "../../esriapi/4.30/@arcgis/core/layers/GeoJSONLayer.js";
import MapView from "../../esriapi/4.30/@arcgis/core/views/MapView.js";
import Legend from "../../esriapi/4.30/@arcgis/core/widgets/Legend.js";
import Expand from "../../esriapi/4.30/@arcgis/core/widgets/Expand.js";
import Home from "../../esriapi/4.30/@arcgis/core/widgets/Home.js";

// Configures clustering on the layer. A cluster radius
// of 100px indicates an area comprising screen space 100px
// in length from the center of the cluster

const clusterConfig = {
    type: "cluster",
    clusterRadius: "100px",
    // {cluster_count} is an aggregate field containing
    // the number of features comprised by the cluster
    popupTemplate: {
        title: "Cluster summary",
        content: "This cluster represents {cluster_count} earthquakes.",
        fieldInfos: [
            {
                fieldName: "cluster_count",
                format: {
                    places: 0,
                    digitSeparator: true,
                },
            },
        ],
    },
    clusterMinSize: "24px",
    clusterMaxSize: "60px",
    labelingInfo: [
        {
            deconflictionStrategy: "none",
            labelExpressionInfo: {
                expression: "Text($feature.cluster_count, '#,###')",
            },
            symbol: {
                type: "text",
                color: "#004a5d",
                font: {
                    weight: "bold",
                    family: "Noto Sans",
                    size: "12px",
                },
            },
            labelPlacement: "center-center",
        },
    ],
};


const layer = new GeoJSONLayer({
    title: "Earthquakes from the last month",
    url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
    copyright: "USGS Earthquakes",

    featureReduction: clusterConfig,

    // popupTemplates can still be viewed on
    // individual features
    popupTemplate: {
        title: "Magnitude {mag} {type}",
        content: "Magnitude {mag} {type} hit {place} on {time}",
        fieldInfos: [
            {
                fieldName: "time",
                format: {
                    dateFormat: "short-date-short-time",
                },
            },
        ],
    },
    renderer: {
        type: "simple",
        field: "mag",
        symbol: {
            type: "simple-marker",
            size: 4,
            color: "#69dcff",
            outline: {
                color: "rgba(0, 139, 174, 0.5)",
                width: 5,
            },
        },
    },
});

// background layer for geographic context
// projected to Alaska Polar Stereographic
const baseLayer = new FeatureLayer({
    portalItem: {
        id: "2b93b06dc0dc4e809d3c8db5cb96ba69",
    },
    legendEnabled: false,
    popupEnabled: false,
    renderer: {
        type: "simple",
        symbol: {
            type: "simple-fill",
            color: [65, 65, 65, 1],
            outline: {
                color: [50, 50, 50, 0.75],
                width: 0.5,
            },
        },
    },
    spatialReference: {
        wkid: 5936,
    },
});

const map = new Map({
    layers: [baseLayer, layer],
});

const view = new MapView({
    container: "viewDiv",
    extent: {
        spatialReference: {
            wkid: 5936,
        },
        xmin: 1270382,
        ymin: -1729511,
        xmax: 2461436,
        ymax: -953893,
    },
    spatialReference: {
        // WGS_1984_EPSG_Alaska_Polar_Stereographic
        wkid: 5936,
    },
    constraints: {
        minScale: 15469455,
    },
    map: map,
});

view.ui.add(
    new Home({
        view: view,
    }),
    "top-left",
);

const legend = new Legend({
    view: view,
    container: "legendDiv",
});

const infoDiv = document.getElementById("infoDiv");
view.ui.add(
    new Expand({
        view: view,
        content: infoDiv,
        expandIcon: "list-bullet",
        expanded: false,
    }),
    "top-left",
);

const toggleButton = document.getElementById("cluster");

// To turn off clustering on a layer, set the
// featureReduction property to null
toggleButton.addEventListener("click", () => {
    let fr = layer.featureReduction;
    layer.featureReduction = fr && fr.type === "cluster" ? null : clusterConfig;
    toggleButton.innerText =
        toggleButton.innerText === "Enable Clustering"
            ? "Disable Clustering"
            : "Enable Clustering";
});