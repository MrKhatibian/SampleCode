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

// Arse Image Layer
const arseILayer = new MapImageLayer({
    url: "http://localhost:6080/arcgis/rest/services/Maryanaj/MaryanajNN/MapServer",
    sublayers: [{
        id: 1
    }]
});

// Darkhast Feature Layer
const darkhastFLayer = new FeatureLayer({
    //url: "http://localhost:6080/arcgis/rest/services/Maryanaj/MaryanajNN/MapServer/0",
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
        content: "شماره: {Sohd}"
    },
    outFields: ["*"]
});

// Creat Clustring for darkhastFeatureLayer
darkhastFLayer.featureReduction = {
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

// Initialize map
const map = new Map({
    basemap: "osm"
});
const view = new MapView({
    container: "map",
    map: map,
    zoom: 14, // Zoom level
    center: [48.464869, 34.834155],
});
map.addMany([arseILayer, darkhastFLayer]);

//FeatureTable
const featureTable = new FeatureTable({
    view: view,
    layer: darkhastFLayer,
    tableTemplate: {
        columnTemplates: [
            {
                type: "field",
                fieldName: "Shop",
                label: "شماره پرونده"
            },
            {
                type: "field",
                fieldName: "Shod",
                label: "شماره درخواست"
            },
            {
                type: "field",
                fieldName: "noedarkhast",
                label: "نوع درخواست"
            },
            {
                type: "field",
                fieldName: "marhaleh",
                label: "مرحله"
            },
            {
                type: "field",
                fieldName: "noe_parvaneh",
                label: "نوع کاربری"
            }
        ]
    },
    container: "attributeTable"
});

// Global filter state
let filterValues = {
    //ebtal: 0,
    extent: null,
    noedarkhast: "",
    marhaleh: "",
    noe_parvaneh: "",
    noeTarh: "",
    mantaghe: null,
    mahdodeh: ""
};

// Build WHERE clause for filtering
function buildWhereClause() {
    const clauses = [];
    //clauses.push(`Ebtal = 0`);
    if (filterValues.noedarkhast) {
        clauses.push(`noedarkhast = N'${filterValues.noedarkhast}'`);
    }
    if (filterValues.marhaleh) {
        clauses.push(`marhaleh = N'${filterValues.marhaleh}'`);
    }
    if (filterValues.noe_parvaneh) {
        clauses.push(`noe_parvaneh = N'${filterValues.noe_parvaneh}'`);
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

// To return a feature set containing the attributes:
let darkhastFSet = await darkhastFLayer.queryFeatures(query)
// get Features from Featureset
let darkhastFeatures = darkhastFSet.features;

// Create the combo box (HTML <select> element)
const comboNoeDarkhast = document.getElementById("comboNoeDarkhast");
const comboMarhale = document.getElementById("comboMarhale");
const comboNoeKarbari = document.getElementById("comboNoeKarbari");
const comboNoeTarh = document.getElementById("comboNoeTarh");
const comboMantaghe = document.getElementById("comboMantaghe");
const comboMahdodeh = document.getElementById("comboMahdodeh");
//const inputFilter = document.getElementById("inFilter");

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


//Fill Comboboxes
const comboboxes = [comboNoeDarkhast, comboMarhale, comboNoeKarbari];
fillComboboxes(comboboxes);
function fillComboboxes(comboboxes) {
    for (let combobox of comboboxes) {
        const fieldName = dicCombo2Field[combobox.id]; // get the key for comboBoxValues
        //const fieldName = "noedarkhast"; // get the key for comboBoxValues
        updateComboBox(combobox, comboBoxValues[fieldName], filterValues[fieldName]);
    }
    return;
}

// Utility: Update combo box with unique values
function updateComboBox(combo, values, selectValue) {

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
        ;
        // 1. Build query
        query.where = where;
        // 2. Execute query - wait for it to complete
        darkhastFSet = await darkhastFLayer.queryFeatures(query);
        darkhastFeatures = darkhastFSet.features;
        // Set Data To Comboboxes
        comboBoxValues = getComboBoxValues(darkhastFeatures);
        fillComboboxes(comboboxes);
        featureTable.filterGeometry = query.geometry;// ensures it only shows data within the map view
        darkhastFLayer.definitionExpression = where;

    } catch (error) {
        console.error("Error syncing layer:", error);
    }
}
// Event: map extent changed
const chekSyncMap2FeatureTable = document.getElementById("chekSyncMap2FeatureTable");


//query.outFields = ["noedarkhast", "shodarkhast"];
view.watch("stationary", function (isStationary) {
    if (isStationary && chekSyncMap2FeatureTable.checked) {
        //const query = layer.createQuery();
        query.geometry = view.extent;
        //query.spatialRelationship = "intersects";
        //query.returnGeometry = true;
        //featureTable.layer = layer;// ensures the table shows data from the right layer
        
        updateFeatures();
    }
});




// Export CSV
document.getElementById("btnCSV").addEventListener("click", function () {
    exportTableToCSV(layer);
});

async function exportTableToCSV(layer) {
    const query = layer.createQuery();
    query.returnGeometry = false;
    query.outFields = ["*"];

    try {
        ;
        const results = await layer.queryFeatures(query);
        const features = results.features;
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
        link.setAttribute("download", "export.csv");
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
    exportEditedFeaturesToExcel(layer)
});
function exportEditedFeaturesToExcel(featureLayer, filename = "ویرایش‌ها.xlsx") {
    const query = featureLayer.createQuery();
    query.returnGeometry = false;
    query.outFields = ["*"];

    featureLayer.queryFeatures(query).then((results) => {
        const data = results.features.map((f) => f.attributes);
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "ویرایش‌ها");
        XLSX.writeFile(workbook, filename);
    }).catch((error) => {
        console.error("خطا در گرفتن داده‌ها:", error);
    });
}
//Export PDF
document.getElementById("btnPDF").addEventListener("click", () => {
    //exportFeatureLayerToPDF(layer)
    exportFeatureTableToPDF(layer)
});
async function exportFeatureLayerToPDF(featureLayer) {
    const query = featureLayer.createQuery();
    query.returnGeometry = false;
    //query.outFields = ["*"];
    query.outFields = ["shop", "shodarkhast", "noedarkhast", "address"];

    try {
        const results = await featureLayer.queryFeatures(query);
        const data = results.features.map(f => f.attributes);

        if (!data.length) {
            alert("هیچ داده‌ای برای خروجی وجود ندارد");
            return;
        }

        const columns = Object.keys(data[0]);
        const rows = data.map(item => columns.map(col => item[col]));

        // آماده‌سازی jsPDF با پشتیبانی فارسی (Right-To-Left)
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: "landscape", format: "a4" });

        doc.setFont("Vazir");
        doc.setFontSize(12);
        doc.text("خروجی PDF با فونت فارسی وزیر", 280, 20, { align: "right" });

        doc.autoTable({
            head: [columns],
            body: rows,
            styles: {
                font: "Vazir",
                fontSize: 10,
                halign: "right"
            },
            margin: { top: 30 },
        });

        doc.save("export-fa.pdf");
    } catch (error) {
        console.error("خطا در گرفتن داده‌ها یا تولید PDF:", error);
    }
}

async function exportFeatureTableToPDF(featureLayer) {
    const query = featureLayer.createQuery();
    query.returnGeometry = false;
    query.outFields = ["shop", "shodarkhast", "noedarkhast", "address"];

    try {
        const results = await featureLayer.queryFeatures(query);
        const features = results.features;

        if (!features.length) {
            alert("هیچ داده‌ای برای خروجی وجود ندارد.");
            return;
        }


        // 🔸 ستونی که باید راست‌چین باشند
        const rtlColumns = ["address", "noedarkhast"]; //← این‌ها را مطابق داده‌های خودت تغییر بده

        // 🔸 لیست همه ستون‌ها
        const columns = Object.keys(features[0].attributes);

        // 🔸 هدر جدول با فاصله از راست و تنظیم راست/چپ‌چین بودن
        const headerRow = columns.map(col => ({
            text: col,
            alignment: rtlColumns.includes(col) ? 'right' : 'left',
            margin: [0, 0, 20, 0], // فاصله از راست
            bold: true
        }));

        // 🔸 سطرهای جدول با تنظیم چینش هر سلول
        const bodyRows = features.map(f => {
            return columns.map(col => ({
                text: String(f.attributes[col] ?? ""),
                alignment: rtlColumns.includes(col) ? 'right' : 'left'
            }));
        });

        // 🔸 تعریف نهایی فایل PDF
        const docDefinition = {
            pageSize: 'A4',
            pageMargins: [40, 60, 40, 60],
            header: {
                text: 'ویرایش شده',
                style: 'header',
                alignment: 'right',
                margin: [0, 10, 20, 0]
            },
            footer: function (currentPage, pageCount) {
                return {
                    text: `صفحه ${currentPage} از ${pageCount}`,
                    alignment: 'center',
                    fontSize: 9,
                    margin: [0, 10]
                };
            },
            content: [
                {
                    table: {
                        headerRows: 1,
                        widths: columns.map(() => 'auto'),
                        body: [headerRow, ...bodyRows]
                    },
                    layout: {
                        fillColor: function (rowIndex) {
                            return rowIndex === 0
                                ? '#cce5ff'
                                : rowIndex % 2 === 0
                                    ? '#f2f2f2'
                                    : null;
                        },
                        hLineWidth: () => 0.5,
                        vLineWidth: () => 0.5,
                        hLineColor: () => '#ccc',
                        vLineColor: () => '#ccc'
                    }
                },
                //    {
                //        text: 'تاریخ تهیه گزارش: ' + new Date().toLocaleDateString('fa-IR'),
                //        margin: [0, 20, 0, 0],
                //        alignment: 'right',
                //        fontSize: 10
                //    },
                //    {
                //        text: 'امضای مسئول بررسی:',
                //        margin: [0, 40, 0, 0],
                //        alignment: 'right',
                //        fontSize: 10
                //    },
                //    {
                //        canvas: [
                //            { type: 'line', x1: 400, y1: 0, x2: 200, y2: 0, lineWidth: 1 }
                //        ]
                //    }
            ],
            defaultStyle: {
                font: 'Vazir',
                alignment: 'right',
                fontSize: 10
            },
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    color: '#0074D9'
                }
            }
        };

        // ایجاد و دانلود فایل PDF
        pdfMake.createPdf(docDefinition).download("خروجی_جدول.pdf");

    } catch (err) {
        console.error("خطا در گرفتن داده‌ها یا ساخت PDF:", err);
    }
}

//Expprt GeoJSON
document.getElementById("btnGeoJSON").addEventListener("click", () => {
    exportToGeoJSON(layer)
});
async function exportToGeoJSON(featureLayer) {
    const query = featureLayer.createQuery();
    //query.outFields = ["*"];
    query.outFields = ["shop", "shodarkhast", "noedarkhast", "address"];
    query.returnGeometry = true;

    try {
        const result = await featureLayer.queryFeatures(query);
        const features = result.features;

        if (!features.length) {
            alert("هیچ داده‌ای برای خروجی وجود ندارد.");
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
        a.download = "features.geojson";
        a.click();
        URL.revokeObjectURL(url);
    } catch (err) {
        console.error("❌ خطا در گرفتن یا تبدیل داده‌ها:", err);
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


//document.getElementById("btnKml").addEventListener("click", async () => {
//    await projection.load();

//    const query = layer.createQuery();
//    query.outFields = ["*"];
//    query.returnGeometry = true;

//    const result = await layer.queryFeatures(query);
//    const features = result.features.filter(f => f.geometry);

//    if (!features.length) {
//        alert("هیچ فیچری پیدا نشد.");
//        return;
//    }

//    const sourceSR = new SpatialReference({ wkid: 32639 }); // your layer's spatial reference
//    const targetSR = new SpatialReference({ wkid: 4326 });  // WGS84 for KML

//    const projectedGeometries = await projection.projectMany(
//        features.map(f => f.geometry),
//        sourceSR,
//        targetSR
//    );

//    const geojsonFeatures = projectedGeometries.map((geom, i) => ({
//        type: "Feature",
//        geometry: arcgisGeometryToGeoJSON(geom),
//        properties: {
//            name: features[i].attributes["Name"] || `Feature ${i + 1}`,
//            description: Object.entries(features[i].attributes)
//                .map(([k, v]) => `${k}: ${v}`).join("\n")
//        }
//    }));

//    const kmlString = tokml({
//        type: "FeatureCollection",
//        features: geojsonFeatures
//    });

//    const blob = new Blob(["\ufeff" + kmlString], {
//        type: "application/vnd.google-earth.kml+xml;charset=utf-8"
//    });

//    const url = URL.createObjectURL(blob);
//    const a = document.createElement("a");
//    a.href = url;
//    a.download = "features.kml";
//    a.click();
//    URL.revokeObjectURL(url);
//});

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