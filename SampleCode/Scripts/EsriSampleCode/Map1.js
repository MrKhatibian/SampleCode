import Map from "../../esriapi/4.30/@arcgis/core/Map.js";
import MapView from "../../esriapi/4.30/@arcgis/core/views/mapview.js";
import FeatureLayer from "../../esriapi/4.30/@arcgis/core/layers/featurelayer.js";
import Expand from "../../esriapi/4.30/@arcgis/core/widgets/expand.js";
import Legend from "../../esriapi/4.30/@arcgis/core/widgets/legend.js";


const clusteredLayer = new FeatureLayer({
    url: "http://localhost:6080/arcgis/rest/services/Maryanaj/MaryanajN/FeatureServer/0",
    featureReduction: {
        type: "cluster",
        clusterRadius: "100px",
        renderer: {}, // will be set dynamically below
        labelingInfo: [{
            deconflictionStrategy: "none",
            labelExpressionInfo: {
                expression: "IIF($feature.cluster_count < 3, '', $feature.cluster_count)"
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
    zoom: 15,
    center: [48.464869, 34.834155]
});

// Zoom-based rendering logic
view.watch("zoom", (zoomLevel) => {
    updateClusterRenderer(zoomLevel);
});

function updateClusterRenderer(zoom) {
    const zoomStats = {
        10: { min: 3, max: 50 },
        11: { min: 3, max: 80 },
        12: { min: 3, max: 150 },
        13: { min: 3, max: 300 },
        14: { min: 3, max: 600 },
        15: { min: 3, max: 1000 },
        16: { min: 3, max: 2000 }
    };
    const stats = zoomStats[zoom] || zoomStats[15];

    const sizeStops = getStops(stats.min, stats.max, [15, 22, 30, 40, 50]);
    const colorStops = getStops(stats.min, stats.max, ["#4CAF50", "#8BC34A", "#FFC107", "#FF9800", "#F44336"], "color");

    clusteredLayer.featureReduction.renderer = {
        type: "simple",
        symbol: {
            type: "simple-marker",
            outline: {
                type: "simple-line",
                color: [0, 77, 158, 0.5],
                width: 3
            }
        },
        visualVariables: [
            {
                type: "size",
                field: "cluster_count",
                stops: [
                    { value: 1, size: 0 },
                    { value: 2, size: 0 },
                    ...sizeStops
                ]
            },
            {
                type: "color",
                field: "cluster_count",
                stops: colorStops
            }
        ]
    };
}

function getStops(min, max, values, type = "size") {
    const count = values.length;
    const step = (max - min) / (count - 1);
    return values.map((val, i) => ({
        value: min + i * step,
        [type]: val
    }));
}