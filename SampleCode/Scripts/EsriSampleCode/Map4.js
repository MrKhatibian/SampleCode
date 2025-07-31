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
darkhastFLayer.when(() => {
    console.log("darkhastFLayer loaded successfully.");
    view.goTo(darkhastFLayer.fullExtent);

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

// Initialize FeatureTable
const featureTable = new FeatureTable({
    container: "attributeTable",
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
    }
});

// Set Fields Name
let fieldsName = {
    dateSend: "date_rooz",
    noeDarkhast: "noedarkhast",
    marhale: "marhaleh",
    noeKarbari: "",
    mantaghe: "mantaghe",
    mahale: "",
    ebtal: "Ebtal"
};

// Global filter state
let filterValues = {
    extent: null,
    noedarkhast: "",
    marhaleh: "",
    noe_parvaneh: "",
    mantaghe: null,
    mahdodeh: "",
    //ebtal: 0,
};

/**
 * Build WHERE clause for filtering
 * @returns Where String for Filter Data
 */
function buildWhereClause() {
    const clauses = [];
    //clauses.push(`Ebtal = 0`);
    if (filterValues.noedarkhast) {
        clauses.push(`${fieldsName.noeDarkhast} = N'${filterValues.noedarkhast}'`);
    }
    if (filterValues.marhaleh) {
        clauses.push(`${fieldsName.marhale} = N'${filterValues.marhaleh}'`);
    }
    if (filterValues.noe_parvaneh) {
        clauses.push(`${fieldsName.noeKarbari} = N'${filterValues.noe_parvaneh}'`);
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

// Create the combo box (HTML <select> element)
const comboNoeDarkhast = document.getElementById("comboNoeDarkhast");
const comboMarhale = document.getElementById("comboMarhale");
const comboNoeKarbari = document.getElementById("comboNoeKarbari");
const comboNoeTarh = document.getElementById("comboNoeTarh");
const comboMantaghe = document.getElementById("comboMantaghe");
const comboMahdodeh = document.getElementById("comboMahdodeh");


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
    const keys = ["noedarkhast", "marhaleh", "noe_parvaneh"];

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
    comboNoeKarbari: "noe_parvaneh"
};

/**
 * Fill Comboboxes
 * @param {any} comboboxes Combobox object
  */
const comboboxes = [comboNoeDarkhast, comboMarhale, comboNoeKarbari];
fillComboboxes(comboboxes);
function fillComboboxes(comboboxes) {
    for (let combobox of comboboxes) {
        const fieldName = dicCombo2Field[combobox.id]; // get the key for comboBoxValues
        //const fieldName = "noedarkhast"; // get the key for comboBoxValues
        updateComboBox(combobox, comboBoxValues[fieldName], filterValues[fieldName]);
    }
}

/**
 * Update combo box with unique values
 * @param {any} combo Combobox object
 * @param {any} values Combobox values
 * @param {any} selectValue Delect Combobox value
 * @returns update Comboboxes and selected value
 */
function updateComboBox(combo, values, selectValue) {
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
comboNoeTarh.addEventListener("change", function () {
    filterValues.noeTarh = this.value;
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
document.getElementById("btnUpdate").addEventListener("click", () => {

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

//Expprt GeoJSON
document.getElementById("btnGeoJSON").addEventListener("click", () => {
    exportToGeoJSON(darkhastFeatures)
});
async function exportToGeoJSON(features) {    
    try {        
        if (!features.length) {
            alert("No features to export.");
            return;
        }

        // تبدیل به GeoJSON FeatureCollection
        const geojson = {
            type: "FeatureCollection",
            features: features
                .filter(f => f.geometry)  // فقط اون‌هایی که geometry دارند
                .map(f => ({
                    type: "Feature",
                    geometry: f.geometry.toJSON(),
                    properties: f.attributes
                }))
        };

        // تبدیل به string و ساخت Blob
        const geojsonString = JSON.stringify(geojson, null, 2);
        const blob = new Blob([geojsonString], { type: "application/json" });

        // ساخت لینک دانلود
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Export.geojson";
        a.click();
        URL.revokeObjectURL(url);
    } catch (err) {
        console.error("Export failed", err);
    }
}
document.getElementById("btnShp").addEventListener("click", () => {
    exportToShapefile(layer)
});

//Export Shape not work
async function exportToShapefile(featureLayer) {
    const query = featureLayer.createQuery();
    query.outFields = ["*"];
    query.returnGeometry = true;

    try {
        const result = await featureLayer.queryFeatures(query);
        const features = result.features;

        if (!features.length) {
            alert("هیچ داده‌ای برای خروجی وجود ندارد.");
            return;
        }

        // تبدیل به GeoJSON
        const geojson = {
            type: "FeatureCollection",
            features: features
                .filter(f => f.geometry)  // فقط اون‌هایی که geometry دارند
                .map(f => ({
                    type: "Feature",
                    geometry: f.geometry.toJSON(),
                    properties: f.attributes
                }))
        };

        // استفاده از shp-write برای خروجی گرفتن
        //Have bugs in there
        shpwrite.download(geojson, {
            file: "Exported_Shapefile"
        });

    } catch (err) {
        console.error("خطا در گرفتن داده‌ها:", err);
    }
}
// Export KML
document.getElementById("btnKml").addEventListener("click", () => {
    console.log("SR:", layer.spatialReference.wkid);
    exportToKML(layer);
});

async function exportToKML(featureLayer) {
    const query = featureLayer.createQuery();
    query.outFields = ["*"];
    query.returnGeometry = true;

    try {
        const result = await featureLayer.queryFeatures(query);
        const features = result.features.filter(f => f.geometry);

        if (!features.length) {
            alert("هیچ داده‌ای برای خروجی وجود ندارد.");
            return;
        }
        ;
        const geojsonFeatures = features.map(f => ({
            type: "Feature",
            geometry: arcgisGeometryToGeoJSON(f.geometry),
            //properties: f.attributes
            properties: {
                name: f.attributes["shodarkhast"],
                description: Object.entries(f.attributes).map(([key, val]) => `${key}: ${val}`).join("\n")
            }
        }));

        const kmlString = tokml({
            type: "FeatureCollection",
            features: geojsonFeatures
        });

        const blob = new Blob(["\ufeff" + kmlString], {
            type: "application/vnd.google-earth.kml+xml;charset=utf-8"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "features.kml";
        a.click();
        URL.revokeObjectURL(url);

    } catch (err) {
        console.error("❌ خطا در گرفتن یا تبدیل داده‌ها:", err);
    }
}

function arcgisGeometryToGeoJSON(geometry) {
    if (geometry.type === "point") {
        return {
            type: "Point",
            coordinates: [geometry.x, geometry.y]
        };
    } else if (geometry.type === "polyline") {
        return {
            type: "LineString",
            coordinates: geometry.paths[0]
        };
    } else if (geometry.type === "polygon") {
        return {
            type: "Polygon",
            coordinates: geometry.rings
        };
    }
    return null;
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