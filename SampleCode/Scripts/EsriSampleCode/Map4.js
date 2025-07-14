import Map from "../../esriapi/4.30/@arcgis/core/Map.js";
import MapView from "../../esriapi/4.30/@arcgis/core/views/mapview.js";
import FeatureLayer from "../../esriapi/4.30/@arcgis/core/layers/featurelayer.js";
import FeatureTable from "../../esriapi/4.30/@arcgis/core/widgets/FeatureTable.js";
import Query from "../../esriapi/4.30/@arcgis/core/rest/support/Query.js";

// Initialize map
const map = new Map({ basemap: "osm" });
const view = new MapView({
    container: "map",
    map: map,
    zoom: 15, // Zoom level
    center: [48.464869, 34.834155],
});

//FeatureLayer
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
    //definitionExpression : `Ebtal != 0`,
    outFields: ["*"]
});
//let layer = new FeatureLayer();
//layer = featureLayer;
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

//FeatureTable
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

// Create the combo box (HTML <select> element)
const comboNoeDarkhast = document.getElementById("comboNoeDarkhast");
const inputFilter = document.getElementById("inFilter");


layer.load().then(() => {
    console.log("layer loaded");
});

// Utility: Update combo box with unique values
function updateComboBox(combo, values) {
    combo.innerHTML = "";// Clear
    values.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        option.text = value;
        combo.appendChild(option);
    });
}

// Global filter state
let filterState = {
    extent: null,
    noeDarkhast: "",
    codDarkhast: null
};

// Build WHERE clause for filtering
function buildWhereClause() {
    const clauses = [];

    if (filterState.noeDarkhast) {
        clauses.push(`noedarkhast = N'${filterState.noeDarkhast}'`);
    }
    if (filterState.codDarkhast) {
        clauses.push(`c_noedarkhast = ${filterState.codDarkhast}`);
    }

    return clauses.join(" AND ");
}

// Main update function: apply extent and definitionExpression
function updateFeatures() {
    const query = layer.createQuery();
    query.geometry = filterState.extent;
    query.spatialRelationship = "intersects";
    query.returnGeometry = false;
    //query.outFields = ["noedarkhast", "shodarkhast"];
    query.outFields = ["*"];

    const where = buildWhereClause();
    if (where) {
        query.where = where;
        layer.definitionExpression = where;
    } else {
        layer.definitionExpression = "";
    }

    layer.queryFeatures(query).then(featureSet => {
        const features = featureSet.features;

        //const noedarkhastValues = [...new Set(features.map(f => f.attributes.noedarkhast).filter(Boolean))];
        const seen = new Set();
        const noedarkhastValues = [];

        for (const f of features) {
            const val = f.attributes?.noedarkhast;
            if (val && !seen.has(val)) {
                seen.add(val);
                noedarkhastValues.push(val);
            }
        }

        updateComboBox(comboNoeDarkhast, noedarkhastValues);

        //const otherValues = [...new Set(features.map(f => f.attributes.shodarkhast).filter(Boolean))];
        //updateComboBox(comboOther, otherValues);
    });
}

// Event: map extent changed
view.watch("stationary", function (isStationary) {
    if (isStationary) {
        filterState.extent = view.extent;
        updateFeatures();
    }
});

// Event: input text filter
inputFilter.addEventListener("input", function () {
    const value = this.value?.trim();
    value = parseInt(value);
    if (!value || isNaN(value)) {
        console.warn("مقدار ورودی نامعتیر است");
        return;
    }

    filterState.codDarkhast = value;
    updateFeatures();
});

// Event: comboNoeDarkhast changed
comboNoeDarkhast.addEventListener("change", function () {
    filterState.noeDarkhast = this.value;
    updateFeatures();
});
  