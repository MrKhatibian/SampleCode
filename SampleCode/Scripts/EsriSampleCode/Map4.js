import Map from "../../esriapi/4.30/@arcgis/core/Map.js";
import MapView from "../../esriapi/4.30/@arcgis/core/views/mapview.js";
import FeatureLayer from "../../esriapi/4.30/@arcgis/core/layers/featurelayer.js";
import FeatureTable from "../../esriapi/4.30/@arcgis/core/widgets/FeatureTable.js";
import MapImageLayer from "../../esriapi/4.30/@arcgis/core/layers/MapImageLayer.js";

// Initialize Arse ImageLayer
const arseILayer = new MapImageLayer({
    url: "http://localhost:6080/arcgis/rest/services/Maryanaj/MaryanajNN/MapServer",
    sublayers: [{ id: 1 }]
});
arseILayer.when(() => {
    console.log("arseILayer loaded successfully.");
}).catch((error) => {
    console.error("Error loading arseILayer:", error);
});

// Initialize Darkhast FeatureLayer
const darkhastFLayer = new FeatureLayer({
    url: "http://localhost:6080/arcgis/rest/services/Maryanaj/MaryanajNN/MapServer/0",
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
        content: "شماره: {Sohd}"
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
    }
});
let featureTable;
darkhastFLayer.when(() => {
    console.log("darkhastFLayer loaded successfully.");
    if (darkhastFLayer.fullExtent) {
        view.goTo(darkhastFLayer.fullExtent);
    }

    const allFields = darkhastFLayer.fields;

    // filter geometry field for not showing
    const validFields = allFields.filter(field => field.type !== "geometry");

    // Dynamic display of featuretable columns and display of the top 10
    const columnTemplates = validFields.map((field, index) => {
        return {
            type: "field",
            fieldName: field.name,
            label: field.alias || field.name,
            visible: index < 10 // فقط 10 تای اول قابل مشاهده باشند
        };
    });

    // Initialize FeatureTable
    featureTable = new FeatureTable({
        container: "attributeTable",
        view: view,
        layer: darkhastFLayer,
        tableTemplate: {
            columnTemplates: columnTemplates
        }
    });
}).catch((error) => {
    console.error("Error loading darkhastFLayer:", error);
});

// Initialize Map
const map = new Map({
    basemap: "osm",
    layers: [arseILayer, darkhastFLayer]
});

// Initialize View
let view = new MapView({
    container: "map",
    map: map,
    //zoom: 14, // Zoom level
    //center: [48.464869, 34.834155],
});
view.when(() => {
    console.log("MapView is ready");
}).catch((error) => {
    console.error("MapView failed to load:", error);
});

// Set Fields Name
let fieldsName = {
    sDateSend: "date_rooz",
    eDateSend: "date_rooz",
    noeDarkhast: "noedarkhast",
    marhale: "marhaleh",
    noeKarbari: "",
    mantaghe: "mantaghe",
    mahdodeh: "",
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
    mahdodeh: "",
    //ebtal: 0,
};

//Creat Where
let where = buildWhereClause();

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
    return clauses.join(" AND ");
}

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

// Create the combo box (HTML <select> element)
const comboNoeDarkhast = document.getElementById("comboNoeDarkhast");
const comboMarhale = document.getElementById("comboMarhale");
const comboNoeKarbari = document.getElementById("comboNoeKarbari");
const comboMantaghe = document.getElementById("comboMantaghe");
const comboMahdodeh = document.getElementById("comboMahdodeh");

//
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
    const keys = ["noedarkhast", "marhaleh", "noe_parvaneh", "mantaghe"];

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
    return result;
}

// Dictionary convert Combobox name to Field name
const dicCombo2Field = {
    comboNoeDarkhast: "noedarkhast",
    comboMarhale: "marhaleh",
    comboNoeKarbari: "noe_parvaneh",
    comboMantaghe: "mantaghe"
};

/**
 * Fill Comboboxes
 * @param {any} comboboxes Combobox object
  */
const comboboxes = [comboNoeDarkhast, comboMarhale, comboNoeKarbari, comboMantaghe];
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
 * @param {any} selectValue Delect Combobox value
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
}

// Event: comboNoeDarkhast changed
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
    filterValues.mahdodeh = this.value;
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
    console.log("pats:", parts);
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

// Main update function: apply extent and definitionExpression
async function updateFeatures() {
    where = buildWhereClause();
    try {
        // 1. Build query
        query.where = where;
        // 2. Execute query - wait for it to complete
        darkhastFSet = await darkhastFLayer.queryFeatures(query);
        darkhastFeatures = darkhastFSet.features;
        // Set Data To Comboboxes
        comboBoxValues = getComboBoxValues(darkhastFeatures);
        fillComboboxes(comboboxes);

        view.whenLayerView(darkhastFLayer).then(function (layerView) {
            //extent = view.extent;
            layerView.filter = {
                geometry: query.geometry,
                spatialRelationship: "intersects",
            };
        });
        featureTable.filterGeometry = query.geometry;// ensures it only shows data within the map view
        darkhastFLayer.definitionExpression = where;

    } catch (error) {
        console.error("Error syncing layer:", error);
    }
}

// Event: map extent changed
const mapExtent = document.getElementById("mapExtent");
mapExtent.addEventListener('change', () => {
    if (mapExtent.checked) {
        query.geometry = view.extent;
        updateFeatures();
    }
});

view.watch("stationary", function (isStationary) {
    if (isStationary && mapExtent.checked) {
        query.geometry = view.extent;
        updateFeatures();
    }
});

// Clear Filters
document.getElementById("btnClearFilters").addEventListener("click", () => {
    filterValues = {
        extent: null,
        sDateSend: null,
        noedarkhast: "",
        marhaleh: "",
        noe_parvaneh: "",
        mantaghe: null,
        mahdodeh: "",
        //ebtal: 0,
    };
    startDateSend.value = "";
    endDateSend.value = "";
    updateFeatures();
});

// Export CSV
document.getElementById("btnCSV").addEventListener("click", function () {
    exportTableToCSV(darkhastFeatures);
});
async function exportTableToCSV(features) {
    try {
        if (!features.length) {
            alert("No features to export.");
            return;
        }

        // Convert to CSV
        const csv = convertFeaturesToCSV(features);
        const BOM = "\uFEFF";
        const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "Export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (err) {
        console.error("Export failed", err);
    }
}
function convertFeaturesToCSV(features) {
    ;
    const fields = Object.keys(features[0].attributes);
    const header = fields.join(",");
    const rows = features.map(f => {
        return fields.map(field => `"${f.attributes[field]}"`).join(",");
    });
    return [header, ...rows].join("\r\n");
}

//Export Excel
document.getElementById("btnExcel").addEventListener("click", () => {
    exportEditedFeaturesToExcel(darkhastFeatures)
});
function exportEditedFeaturesToExcel(features, filename = "Export.xlsx") {
    try {
        const data = features.map((f) => f.attributes);
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "‌Export");
        XLSX.writeFile(workbook, filename);
    } catch (error) {
        console.error("Export failed", error);
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