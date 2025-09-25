//#region Import
import Map from "../../esriapi/4.30/@arcgis/core/Map.js";
import MapView from "../../esriapi/4.30/@arcgis/core/views/MapView.js";
import FeatureLayer from "../../esriapi/4.30/@arcgis/core/layers/FeatureLayer.js";
import FeatureTable from "../../esriapi/4.30/@arcgis/core/widgets/FeatureTable.js";
import MapImageLayer from "../../esriapi/4.30/@arcgis/core/layers/MapImageLayer.js";
import Home from "../../esriapi/4.30/@arcgis/core/widgets/Home.js";
import GraphicsLayer from "../../esriapi/4.30/@arcgis/core/layers/GraphicsLayer.js";
import Sketch from "../../esriapi/4.30/@arcgis/core/widgets/Sketch.js";
import * as geometryEngine from "../../esriapi/4.30/@arcgis/core/geometry/geometryEngine.js";
//#endregion

//#region Helper Functions

// ====== Sleep ======
/**
 * Sleep function to hold a process
 * @param {any} ms Sleeptime
 * @returns
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ====== Loader ======
// Get Loader Element
const loader = document.getElementById("loader");

/**
 * Loader display function
 * @param {any} divId Loader display div
 */
function showLoader(divId) {
    const target = document.getElementById(divId);

    // Parent position must be relative.
    if (getComputedStyle(target).position === "static") {
        target.style.position = "relative";
    }

    // Add a loader inside the same div
    target.appendChild(loader);
    loader.style.display = "flex";
}
/**
 * Loader hide function
 */
function hideLoader() {
    loader.style.display = "none";
}
//#endregion

//#region Basic map definitions
// ====== Initialize Arse ImageLayer ======
const arseILayer = new MapImageLayer({
    url: "http://localhost:6080/arcgis/rest/services/Maryanaj/Maryanaj/MapServer",
    sublayers: [{ id: 9 }]
});
arseILayer.when(() => {
    console.log("arseILayer loaded successfully.");
}).catch((error) => {
    console.error("Error loading arseILayer:", error);
});

// ====== Initialize Darkhast FeatureLayer ======
const darkhastFLayer = new FeatureLayer({
    url: "http://localhost:6080/arcgis/rest/services/Maryanaj/Maryanaj/MapServer/0",
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
    outFields: ["*"],
    // Creat Clustring for darkhastFeatureLayer
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
                    width: 3
                }
            },
            visualVariables: [{
                type: "color",
                field: "cluster_count",
                stops: [
                    { value: 1, color: "black" },
                    { value: 2, color: "#BEE8FF" },
                    { value: 100, color: "#002673" }
                ]
            }]
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
    }
});
let featureTable;
darkhastFLayer.when(() => {
    //console.log("darkhastFLayer loaded successfully.");

    const allFields = darkhastFLayer.fields;

    // filter geometry field for not showing
    const validFields = allFields.filter(field => field.type !== "geometry");

    // Dynamic display of featuretable columns and display of the top 10
    const columnTemplates = validFields.map((field, index) => {
        return {
            type: "field",
            fieldName: field.name,
            label: field.alias || field.name,
            visible: index < 10 // Top 10 Visiable
        };
    });

    // ====== Initialize FeatureTable ======    
    featureTable = new FeatureTable({
        container: "attributeTable",
        view: view,
        layer: darkhastFLayer,
        tableTemplate: {
            columnTemplates: columnTemplates
        }

    });
    // Override Zoom to selection for set mapview sacle
    const originalZoom = featureTable.zoomToSelection.bind(featureTable);

    featureTable.zoomToSelection = async function () {
        view.zoom = 18;
        originalZoom(); // call original method
    };
}).catch((error) => {
    console.error("Error loading darkhastFLayer:", error);
});

// ====== Initialize Map ======
const map = new Map({
    basemap: "osm",
    layers: [arseILayer, darkhastFLayer]
});

// ====== Initialize View ======
let view = new MapView({
    container: "map",
    map: map,
});
// Remove osm Attribution
view.ui.remove("attribution");

//view.when(() => {
//    console.log("MapView is ready");
//}).catch((error) => {
//    console.error("MapView failed to load:", error);
//});

// Set View extent to Darkhst featureLayer extent
view.whenLayerView(darkhastFLayer).then(function () {
    let layer = arseILayer;
    if (darkhastFLayer) {
        layer = darkhastFLayer
    }
    view.goTo(layer.fullExtent, {
        animate: false
    }).catch(function (error) {
        console.error("Extent projection error: ", error);
    });

    // Limited View Extent and Zoom level
    const cityExtent = layer.fullExtent; // dynamic extent
    view.constraints = {
        geometry: cityExtent,
        minZoom: 14
    };
});



// ====== Add btn Home Widget ======
// Wait until the layer is loaded before creating Home widget
darkhastFLayer.when(() => {
    let homeWidget = new Home({
        view: view,
        viewpoint: {
            targetGeometry: darkhastFLayer.fullExtent
        }
    });

    view.ui.add(homeWidget, "top-left");
});

// ====== Add btn linkMap2Table ======
const btnLinkMap2Table = document.getElementById("btnLinkMap2Table");
view.ui.add(btnLinkMap2Table, "top-left");
const calIcon = btnLinkMap2Table.querySelector("calcite-icon");

let linkMap2Table = false;
btnLinkMap2Table.addEventListener("click", () => {
    linkMap2Table = !linkMap2Table;
    if (linkMap2Table) {
        // Acttive 
        btnLinkMap2Table.title = "Unlinked Map to Table";
        btnLinkMap2Table.style.color = "green";
        calIcon.icon = "online";

        // Map extent changed
        query.geometry = view.extent;
        updateFeatures();
    } else {
        // Passive 
        btnLinkMap2Table.title = "Linked Map to Table";
        btnLinkMap2Table.style.color = "red";
        calIcon.icon = "offline";
    }
});
//#endregion

//#region Sketch
// ====== Initialize Sketch ======
const sketchLayer = new GraphicsLayer();
map.add(sketchLayer);

const sketch = new Sketch({
    layer: sketchLayer,
    view: view,
    creationMode: "single",
    //visibleElements: {
    //    createTools: {
    //        point: false,
    //        polyline: false,
    //        circle: false,
    //        rectangle: false
    //    },
    //    selectionTools: {
    //        "rectangle-selection": false,
    //        "lasso-selection": false
    //    },
    //    settingsMenu: false
    //}
});

// === Initilize btn Delete Sketch ===
const btnDelSketch = document.getElementById("btnDelSketch");
view.ui.add("btnDelSketch", "top-right");
btnDelSketch.hidden = true;

// === Initialize btn Sketch ===
const btnSketch = document.getElementById("btnSketch");
view.ui.add("btnSketch", "top-left")
let sketchFlag = false;

btnSketch.addEventListener("click", () => {
    sketchFlag = !sketchFlag;
    if (sketchFlag) {
        // Acttive         
        btnSketch.title = "Sketch Off";
        btnSketch.style.color = "green";
        sketch.create("polygon");
        btnDelSketch.hidden = false;
    } else {
        // Passive         
        btnSketch.title = "Sketch On";
        btnSketch.style.color = "red";
        sketch.cancel();
        sketchLayer.removeAll();
        btnDelSketch.hidden = true;
        query.geometry = arseILayer.extent;
        updateFeatures();
    }
});

// Event btn DelSketch
btnDelSketch.addEventListener("click", () => {
    btnSketch.click();
});

// When Sketch creation is complete
sketch.on("create", async (event) => {
    if (event.state === "complete") {
        try {
            const geometry = event.graphic?.geometry;
            if (geometry) {
                query.geometry = geometry;
                await updateFeatures();
            }
        } catch (err) {
            console.error("CreateFeatures error:", err);
        }
    } else if (event.state === "cancel") {
        btnSketch.click();
    }
});

// When Sketch update is complete
sketch.on("update", async (event) => {
    if (event.state === "complete") {
        try {
            if (sketchLayer.graphics.length > 0) { // When Sketch was cleared
                const geometry = event.graphics[0]?.geometry;
                if (geometry) {
                    query.geometry = geometry;
                    await updateFeatures();
                }
            } else { btnSketch.click(); }
        } catch (err) {
            console.error("UpdateFeatures error:", err);
        }
    }
});
//#endregion

//#region Attribute managment
// Set Fields Name
let fieldsName = {
    sDateSend: "date_rooz",
    eDateSend: "date_rooz",
    noeDarkhast: "noedarkhast",
    marhale: "marhaleh",
    noeKarbari: "",
    mantaghe: "mantaghe",
    mahdodeh: "hoze",
    ebtal: "Ebtal"
};

// Global filter state
let filterValues = {
    extent: null,
    sDateSend: null,
    eDateSend: null,
    noedarkhast: "",
    marhaleh: "",
    noe_parvaneh: "",
    mantaghe: null,
    hoze: null,
    //ebtal: 0,
};

/**
 * Build WHERE clause for filtering
 * @returns Where String for Filter Data
 */
function buildWhereClause() {
    const clauses = [];
    //clauses.push(`Ebtal = 0`);
    if (filterValues.sDateSend) {

        clauses.push(`${fieldsName.sDateSend} > ${filterValues.sDateSend}`);
    }
    if (filterValues.eDateSend) {

        clauses.push(`${fieldsName.eDateSend} < ${filterValues.eDateSend}`);
    }
    if (filterValues.noedarkhast) {
        clauses.push(`${fieldsName.noeDarkhast} = N'${filterValues.noedarkhast}'`);
    }
    if (filterValues.marhaleh) {
        clauses.push(`${fieldsName.marhale} = N'${filterValues.marhaleh}'`);
    }
    if (filterValues.noe_parvaneh) {
        clauses.push(`${fieldsName.noeKarbari} = N'${filterValues.noe_parvaneh}'`);
    }
    if (filterValues.mantaghe) {
        clauses.push(`${fieldsName.mantaghe} = N'${filterValues.mantaghe}'`);
    }
    if (filterValues.hoze) {
        clauses.push(`${fieldsName.mahdodeh} = N'${filterValues.hoze}'`);
    }
    return clauses.join(" AND ");
}

//Creat Where
let where = buildWhereClause();

// Build query
const query = darkhastFLayer.createQuery();
query.where = where; // for attributes
query.geometry = view.extent;  // for Geometry
query.spatialRelationship = "intersects";  // this is the default
query.returnGeometry = true;
query.outFields = ["*"];

let darkhastFSet;
let darkhastFeatures = [];
try {
    // To return a feature set containing the attributes:
    darkhastFSet = await darkhastFLayer.queryFeatures(query);
    // get Features from Featureset
    darkhastFeatures = darkhastFSet.features;
} catch (err) {
    console.error("Initial queryFeatures failed:", err);
}

// Get Combobox Elements
const comboNoeDarkhast = document.getElementById("comboNoeDarkhast");
const comboMarhale = document.getElementById("comboMarhale");
const comboNoeKarbari = document.getElementById("comboNoeKarbari");
const comboMantaghe = document.getElementById("comboMantaghe");
const comboMahdodeh = document.getElementById("comboMahdodeh");

// Get Date Value
const startDateSend = document.getElementById("startDateSend");
const endDateSend = document.getElementById("endDateSend");

// Set Data To Comboboxes
let comboBoxValues = getComboBoxValues(darkhastFeatures);

/**
 * Get Values form map service and fill for his comboBox
 * @param {any} features //add objec FeatureSet.features
 * @returns Object 
 */
function getComboBoxValues(features) {
    const result = {};
    const seenMap = {};
    const keys = ["noedarkhast", "marhaleh", "noe_parvaneh", "mantaghe", "hoze"];

    // Initialize maps for each key
    for (const key of keys) {
        result[key] = [""];         // Include blank entry
        seenMap[key] = new Set();
    }
    for (let feature of features) {
        const attrs = feature.attributes;
        if (!attrs) continue;

        for (const key of keys) {
            const val = attrs[key];
            if (val && !seenMap[key].has(val)) {
                seenMap[key].add(val);
                result[key].push(val);
            }
        }
    }
    // Sort Value
    //for (const key of keys) {
    //    result[key] = [""].concat([...seenMap[key]].sort());
    //}
    return result;
}

// Dictionary convert Combobox name to Field name
const dicCombo2Field = {
    comboNoeDarkhast: "noedarkhast",
    comboMarhale: "marhaleh",
    comboNoeKarbari: "noe_parvaneh",
    comboMantaghe: "mantaghe",
    comboMahdodeh: "hoze"
};

/**
 * Fill Comboboxes
 * @param {any} comboboxes Combobox object
 */
const comboboxes = [comboNoeDarkhast, comboMarhale, comboNoeKarbari, comboMantaghe, comboMahdodeh];
fillComboboxes(comboboxes);
function fillComboboxes(comboboxes) {
    for (let combobox of comboboxes) {
        const fieldName = dicCombo2Field[combobox.id]; // get the key for comboBoxValues
        //const fieldName = "noedarkhast"; // get the key for comboBoxValues
        updateComboValues(combobox, comboBoxValues[fieldName], filterValues[fieldName]);
    }
}

/**
 * Update combo box with unique values
 * @param {any} combo Combobox object
 * @param {any} values Combobox values
 * @param {any} selectValue Select Combobox value
 * @returns update Comboboxes and selected value
 */
function updateComboValues(combo, values, selectValue) {
    if (!Array.isArray(values)) {
        console.warn(`Invalid values for combo: ${combo.id}`);
        return;
    }
    combo.innerHTML = "";
    values.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        option.text = value;
        combo.appendChild(option);
    });
    combo.value = selectValue;
    // Select combox Value
    //if (values.includes(selectValue)) {

    //} else {
    //    combo.selectedIndex = 0;
    //}
}
//#endregion

//#region Events
//Comboxes changed
comboNoeDarkhast.addEventListener("change", function () {
    filterValues.noedarkhast = this.value;
    updateFeatures();
});
comboMarhale.addEventListener("change", function () {
    filterValues.marhaleh = this.value;
    updateFeatures();
});
comboNoeKarbari.addEventListener("change", function () {
    filterValues.noe_parvaneh = this.value;
    updateFeatures();
});
comboMantaghe.addEventListener("change", function () {
    filterValues.mantaghe = this.value;
    updateFeatures();
});
comboMahdodeh.addEventListener("change", function () {
    filterValues.hoze = this.value;
    updateFeatures();
});
startDateSend.addEventListener("change", () => {
    const dateStr = startDateSend.value;

    if (!dateValidation(dateStr)) { return };

    // All good → convert to Persian and apply filter
    const persianDate = convert2shamsi(dateStr);
    filterValues.sDateSend = persianDate;
    updateFeatures();
});
endDateSend.addEventListener("change", () => {
    const dateStr = endDateSend.value;

    if (!dateValidation(dateStr)) { return };

    // All good → convert to Persian and apply filter
    const persianDate = convert2shamsi(dateStr);
    filterValues.eDateSend = persianDate;
    updateFeatures();
});

// View changed
view.watch("stationary", function (isStationary) {
    if (isStationary && linkMap2Table) {
        updateFeatures();
    }
});
//#endregion

// #region Date
/**
 * 
 * @param {any} date
 * @returns
 */
function dateValidation(date) {
    // Check if the date is empty
    if (!date) {
        console.warn("No date selected.");
        return;
    }

    // Check if the format is correct (YYYY-MM-DD)
    const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(date);
    if (!isValidFormat) {
        console.warn("Invalid date format:", date);
        return;
    }

    // Check if it's a real valid date (e.g., not 2025-02-30)
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        console.warn("Invalid date value:", dateStr);
        return;
    }
    return true;
}
function convert2shamsi(date) {
    const _date = new Date(date);

    if (isNaN(_date)) {
        console.warn("Invalid date:", date);
        return null;
    }

    const formatter = new Intl.DateTimeFormat('en-US-u-ca-persian', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const parts = formatter.formatToParts(_date);
    //console.log("pats:", parts);
    const yearPart = parts.find(p => p.type === 'year');
    const monthPart = parts.find(p => p.type === 'month');
    const dayPart = parts.find(p => p.type === 'day');

    if (!yearPart || !monthPart || !dayPart) {
        console.warn("Could not parse date parts:", parts);
        return null;
    }
    const persianDate = `${yearPart.value}${monthPart.value}${dayPart.value}`;
    return Number(persianDate);
}
//#endregion

//#region Main Logic
/**
 * Get Geometry
 * @param {any} view for View extent
 * @param {any} sketchLayer for Sketch extent
 * @returns geometry 
 */
function getEffectiveGeometry(view, sketchLayer) {
    if (sketchLayer.graphics.length > 0) {
        return geometryEngine.intersect(sketchLayer.graphics.getItemAt(0).geometry, view.extent);
    } else if (linkMap2Table) {
        return view.extent;
    } else {
        return darkhastFLayer.fullExtent;
    }
}

// Main update function: apply extent and definitionExpression
async function updateFeatures() {
    showLoader("map");
    try {
        // ====== 1. Get Value ======
        where = buildWhereClause();
        const getGeometry = getEffectiveGeometry(view, sketchLayer);

        // ====== 2. Set Filter ======
        // Geometric filter applied
        const layerView = await view.whenLayerView(darkhastFLayer);
        layerView.filter = {
            geometry: getGeometry,
            spatialRelationship: "intersects"
        };
        // Attribute filter applied
        darkhastFLayer.definitionExpression = where;
        // FeatureTable filter applied
        featureTable.filterGeometry = getGeometry;


        // ====== 3. Build query ======
        query.where = where;
        query.geometry = getGeometry;

        // Execute query - wait for it to complete
        darkhastFSet = await darkhastFLayer.queryFeatures(query);
        darkhastFeatures = darkhastFSet.features;
        // Set Data To Comboboxes
        comboBoxValues = getComboBoxValues(darkhastFeatures);
        fillComboboxes(comboboxes);
    } catch (error) {
        console.error("Error syncing layer:", error);
    } finally { hideLoader(); }
}

// ====== Clear Filters ======
document.getElementById("btnClearFilters").addEventListener("click", () => {
    filterValues = {
        extent: null,
        sDateSend: null,
        noedarkhast: "",
        marhaleh: "",
        noe_parvaneh: "",
        mantaghe: null,
        mahdodeh: null,
        //ebtal: 0,
    };
    query.geometry = arseILayer.extent;
    startDateSend.value = "";
    endDateSend.value = "";
    updateFeatures();
});

/**
 * Validation for features and visibleFields
 * @param {any} features FeatureLayer
 * @param {any} visibleFields Array
 * @returns ture/false
 */
function featuresAndVisiblefieldsValidation(features, visibleFields) {
    // Validation for Features
    if (!features.length) {
        console.log("No features for export.");
        return false;
    }

    // Validation for visibleFields
    if (!visibleFields.length) {
        console.log("No visible fields to export.");
        return false;
    }
    return true;
}

/**
 * Get Headers and Data for export
 * @param {FeatureTable} featureTable - FeatureTable instance
 * @param {Array} features - FeatureLayer.features
 * @returns {{ headers: string[], rows: Object[] }}
 */
function getHeadersAndRows(featureTable, features) {
    try {
        // Validation
        if (!featureTable || !featureTable.columns || !featureTable.columns.items) {
            throw new Error("Validation failed, featureTable must be object and Missing 'columns.items'.");
        }
        if (!Array.isArray(features)) {
            throw new Error("Validation failed, features must be an array.");
        }

        // Visible fields in feature table
        const visibleFields = featureTable.columns.items.filter(col => !col.hidden);
        if (visibleFields.length === 0) {
            throw new Error("No visible fields found, Returning empty result.");
        }

        // Headers
        const headers = visibleFields.map(col => col.label || col.fieldName);

        // Rows
        if (features.length === 0) {
            console.warn("No features provided. Returning empty Rows.");
            return { headers, rows: [] };
        }
        const rows = features.map((f, i) => {
            if (!f || !f.attributes) {
                console.warn(`Feature at index ${i} is invalid or missing attributes.`);
                return {};
            }
            let row = {};
            visibleFields.forEach(col => {
                row[col.label || col.fieldName] =
                    f.attributes && f.attributes[col.fieldName] !== undefined
                        ? f.attributes[col.fieldName]
                        : null; // default value
            });
            return row;
        });

        return { headers, rows };
    } catch (error) {
        console.error("Error in getHeadersAndRows:", error.message);
        return { headers: [], rows: [] };
    }
}

// ====== CSV Export ====== //
document.getElementById("btnCSV").addEventListener("click", function () {
    try {
        const { headers, rows } = getHeadersAndRows(featureTable, darkhastFeatures);
        exportCSV(headers, rows);
    } catch (error) {
        console.error("Error in btnCSV Clicked:", error.message);
    }
});

/**
 * Export to CSV from Data in featuresTable
 * @param {Array} headers
 * @param {Array} rows
 * @param {string} delimiter Default is: ','
 * @param {string} filename Default is: Export
 */
function exportCSV(headers, rows, delimiter = ",", filename = "Export") {
    try {
        // Validation
        if (!Array.isArray(headers) || headers.length === 0) {
            throw new Error("Validation failed, 'headers' must be a non-empty array.");
        }
        if (!Array.isArray(rows)) {
            throw new Error("Validation failed, 'rows' must be an array.");
        }
        if (typeof delimiter !== "string" || delimiter.length === 0) {
            throw new Error("Validation failed, 'delimiter' must be a non-empty string.");
        }
        if (typeof filename !== "string" || filename.trim().length === 0) {
            throw new Error("Validation failed, 'filename' must be a non-empty string.");
        }
        // Build CSV rows  
        let csvRows = [];
        if (rows.length !== 0) {
            csvRows = rows.map((row, i) => {
                if (typeof row !== "object" || row === null) {
                    console.warn(`Row at index ${i} is not a valid object and Skipping.`);
                    return headers.map(() => "").join(delimiter); // empty row
                }
                return headers.map(h => {
                    const value = row[h];
                    return `"${value != null ? String(value).replace(/"/g, '""') : ""}"`;
                }).join(delimiter);
            });
        } else { console.warn("Rows is an empty array.") }

        // Full CSV data
        const fullData = [headers.join(delimiter), ...csvRows].join("\r\n");
        // Added file extension to file name
        const filenameWithExt = `${filename}.csv`;

        // Convert to CSV        
        const BOM = "\uFEFF";// UTF-8 for Excel
        const blob = new Blob([BOM + fullData], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filenameWithExt;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Error in exportCSV:", error.message);
    }
}

// ====== Excel Export ====== //
document.getElementById("btnExcel").addEventListener("click", () => {    
    try {debugger
        const { headers, rows } = getHeadersAndRows(featureTable, darkhastFeatures);
        exportExcel(headers, rows);
    } catch (error) {
        console.error("Error in btnExcel Clicked:", error.message);
    }
});

/**
 * Export to Excel from Data in featuresTable
 * @param {Array} headers
 * @param {Array} rows 
 * @param {string} filename Default is: Export
 */
function exportExcel(headers, rows, filename = "Export") {
    try {debugger
        // Validation
        if (!Array.isArray(headers) || headers.length === 0) {
            throw new Error("Validation failed, 'headers' must be a non-empty array.");
        }
        if (!Array.isArray(rows)) {
            throw new Error("Validation failed, 'rows' must be an array.");
        }
        if (typeof filename !== "string" || filename.trim().length === 0) {
            throw new Error("Validation failed, 'filename' must be a non-empty string.");
        }

        // Added file extension to file name
        const filenameWithExt = `${filename}.xlsx`;

        // Make Workbook
        const workbook = XLSX.utils.book_new();

        // Created Sheet
        const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });

        // Set in first row started
        XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });

        // Make Excel
        XLSX.utils.book_append_sheet(workbook, worksheet, filename);

        // Save it
        XLSX.writeFile(workbook, filenameWithExt);
    } catch (error) {
        console.error("Error in exportExcel:", error.message);
    }
}

//Export Image 
document.getElementById("btnMapScreenshot").addEventListener("click", async () => {
    try {
        const screenshot = await view.takeScreenshot({ format: "png" });

        const link = document.createElement("a");
        link.href = screenshot.dataUrl;
        link.download = "map.png";
        link.click();

    } catch (err) {
        console.error("❌ خطا در گرفتن اسکرین‌شات:", err);
    }
});
//#endregion