//==============
// Import model
//==============

import Map from "../../esriapi/4.30/@arcgis/core/Map.js";
import MapView from "../../esriapi/4.30/@arcgis/core/views/mapview.js";
import FeatureLayer from "../../esriapi/4.30/@arcgis/core/layers/featurelayer.js";
import FeatureTable from "../../esriapi/4.30/@arcgis/core/widgets/FeatureTable.js";
import MapImageLayer from "../../esriapi/4.30/@arcgis/core/layers/MapImageLayer.js";
import Query from "../../esriapi/4.30/@arcgis/core/rest/support/Query.js";
import * as fnQuery from "../../esriapi/4.30/@arcgis/core/rest/query.js";
import * as projection from "../../esriapi/4.30/@arcgis/core/geometry/projection.js";
import SpatialReference from "../../esriapi/4.30/@arcgis/core/geometry/SpatialReference.js";
import * as geometryEngine from "../../esriapi/4.30/@arcgis/core/geometry/geometryEngine.js";

// ========================
// ArcGIS Map Layers Setup
// ========================

// Image Layer (Arse)
const arseILayer = new MapImageLayer({
    url: "http://localhost:6080/arcgis/rest/services/Maryanaj/MaryanajNN/MapServer",
    sublayers: [{ id: 1 }]
});

// Feature Layer (Darkhast)
const darkhastFLayer = new FeatureLayer({
    url: "http://localhost:6080/arcgis/rest/services/Maryanaj/MaryanajNN/MapServer/0",
    renderer: {
        type: "simple",
        symbol: {
            type: "simple-marker",
            size: 5,
            color: "black",
            outline: null
        }
    },
    popupTemplate: {
        title: "درخواست",
        content: "شماره: {Sohd}"
    },
    outFields: ["*"],
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
                        outline: null
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
            labelExpressionInfo: { expression: "$feature.cluster_count" },
            symbol: {
                type: "text",
                color: "white",
                haloColor: "black",
                haloSize: "1px",
                font: { family: "Arial", size: 10, weight: "bold" }
            },
            labelPlacement: "center-center"
        }]
    }
});

// ===============
// Map Initialization
// ===============
const map = new Map({ basemap: "osm" });
const view = new MapView({
    container: "map",
    map: map,
    zoom: 14,
    center: [48.464869, 34.834155]
});
map.addMany([arseILayer, darkhastFLayer]);

// ===============
// Feature Table
// ===============
const featureTable = new FeatureTable({
    view: view,
    layer: darkhastFLayer,
    tableTemplate: {
        columnTemplates: [
            { type: "field", fieldName: "Shop", label: "شماره پرونده" },
            { type: "field", fieldName: "Shod", label: "شماره درخواست" },
            { type: "field", fieldName: "noedarkhast", label: "نوع درخواست" },
            { type: "field", fieldName: "marhaleh", label: "مرحله" },
            { type: "field", fieldName: "noe_parvaneh", label: "نوع کاربری" }
        ]
    },
    container: "attributeTable"
});

// ==========================
// Filter Setup
// ==========================
let filterValues = {
    extent: null,
    noedarkhast: "",
    marhaleh: "",
    noe_parvaneh: "",
    noeTarh: "",
    mantaghe: null,
    mahdodeh: ""
};

// ==========================
// Helper Functions
// ==========================
function buildWhereClause() {
    const clauses = [];
    if (filterValues.noedarkhast) clauses.push(`noedarkhast = N'${filterValues.noedarkhast}'`);
    if (filterValues.marhaleh) clauses.push(`marhaleh = N'${filterValues.marhaleh}'`);
    if (filterValues.noe_parvaneh) clauses.push(`noe_parvaneh = N'${filterValues.noe_parvaneh}'`);
    return clauses.join(" AND ");
}
const query = darkhastFLayer.createQuery();
query.where = buildWhereClause();
query.geometry = view.extent;
query.spatialRelationship = "intersects";
query.returnGeometry = true;
query.outFields = ["*"];
function createQuery() {
    
    return query;
}

function getComboBoxValues(features) {
    const fields = ["noedarkhast", "marhaleh", "noe_parvaneh"];
    const result = Object.fromEntries(fields.map(f => [f, [""]]));
    const seen = Object.fromEntries(fields.map(f => [f, new Set()]));

    features.forEach(({ attributes }) => {
        if (!attributes) return;
        fields.forEach(f => {
            const val = attributes[f];
            if (val && !seen[f].has(val)) {
                seen[f].add(val);
                result[f].push(val);
            }
        });
    });
    return result;
}

function updateComboBox(combo, values = [], selectedValue = "") {
    if (!combo) return;
    combo.innerHTML = values.map(val => `<option value="${val}">${val}</option>`).join("");
    combo.value = selectedValue;
}

function fillComboboxes(comboboxes) {
    comboboxes.forEach(combo => {
        const fieldName = dicCombo2Field[combo.id];
        updateComboBox(combo, comboBoxValues[fieldName], filterValues[fieldName]);
    });
}

// ==========================
// Query + Update Logic
// ==========================
let darkhastFeatures = [];
let comboBoxValues = {};

async function updateFeatures() {
    try {

        query.where = buildWhereClause();
        const { features } = await darkhastFLayer.queryFeatures(query);
        darkhastFeatures = features;

        const newComboValues = getComboBoxValues(features);
        if (JSON.stringify(newComboValues) !== JSON.stringify(comboBoxValues)) {
            comboBoxValues = newComboValues;
            fillComboboxes(comboboxes);
        }

        featureTable.filterGeometry = query.geometry;
        darkhastFLayer.definitionExpression = query.where;

    } catch (error) {
        console.error("Error updating features:", error);
    }
}

// ==========================
// UI Setup
// ==========================
const comboNoeDarkhast = document.getElementById("comboNoeDarkhast");
const comboMarhale = document.getElementById("comboMarhale");
const comboNoeKarbari = document.getElementById("comboNoeKarbari");
const comboNoeTarh = document.getElementById("comboNoeTarh");
const comboMantaghe = document.getElementById("comboMantaghe");
const comboMahdodeh = document.getElementById("comboMahdodeh");

const dicCombo2Field = {
    comboNoeDarkhast: "noedarkhast",
    comboMarhale: "marhaleh",
    comboNoeKarbari: "noe_parvaneh"
};

const comboboxes = [comboNoeDarkhast, comboMarhale, comboNoeKarbari];

// Unified combo event handling
const comboMap = [
    [comboNoeDarkhast, "noedarkhast"],
    [comboMarhale, "marhaleh"],
    [comboNoeKarbari, "noe_parvaneh"],
    [comboNoeTarh, "noeTarh"],
    [comboMantaghe, "mantaghe"],
    [comboMahdodeh, "mahdodeh"]
];

comboMap.forEach(([combo, field]) => {
    combo?.addEventListener("change", () => {
        filterValues[field] = combo.value;
        updateFeatures();
    });
});

// Extent filter
const mapExtent = document.getElementById("mapExtent");
view.watch("stationary", isStationary => {
    if (isStationary && mapExtent?.checked) {
        filterValues.extent = view.extent;
        updateFeatures();
    }
});

// ==========================
// Initial Load
// ==========================
(async () => {
    await updateFeatures();
})();
