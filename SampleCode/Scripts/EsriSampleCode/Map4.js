import Map from "../../esriapi/4.30/@arcgis/core/Map.js";
import MapView from "../../esriapi/4.30/@arcgis/core/views/mapview.js";
import FeatureLayer from "../../esriapi/4.30/@arcgis/core/layers/featurelayer.js";
import FeatureTable from "../../esriapi/4.30/@arcgis/core/widgets/FeatureTable.js";
import MapImageLayer from "../../esriapi/4.30/@arcgis/core/layers/MapImageLayer.js";
import Query from "../../esriapi/4.30/@arcgis/core/rest/support/Query.js";

// ImageLayers
const imageLayer = new MapImageLayer({
    url: "http://localhost:6080/arcgis/rest/services/Maryanaj/MaryanajN/MapServer",
    sublayers: [{
        id: 1
    }]
});
//FeatureLayers
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
map.addMany([imageLayer, layer]);
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
//const inputFilter = document.getElementById("inFilter");


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

// Global filter state
let filterState = {
    //ebtal: 0,
    extent: null,
    noeDarkhast: "",
    codDarkhast: null
};

// Build WHERE clause for filtering
function buildWhereClause() {
    const clauses = [];
    //clauses.push(`Ebtal = 0`);
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
        query.where = where;
        layer.definitionExpression = "";
    }
    featureTable.filterGeometry = query.geometry;
    //featureTable.refresh();
    layer.queryFeatures(query).then(featureSet => {
        const features = featureSet.features;

        //const noedarkhastValues = [...new Set(features.map(f => f.attributes.noedarkhast).filter(Boolean))];
        const seen = new Set();
        const noedarkhastValues = [];
        noedarkhastValues.push("");
        for (const f of features) {
            const val = f.attributes?.noedarkhast;
            if (val && !seen.has(val)) {
                seen.add(val);
                noedarkhastValues.push(val);
            }
        }
        const comboSelectValue = filterState.noeDarkhast;
        updateComboBox(comboNoeDarkhast, noedarkhastValues, comboSelectValue);

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
//inputFilter.addEventListener("input", function () {
//    let value = this.value?.trim();
//    value = parseInt(value);
//    if (!value || isNaN(value)) {
//        console.warn("مقدار ورودی نامعتیر است");
//        return;
//    }
//    filterState.codDarkhast = value;
//    updateFeatures();
//});

// Event: comboNoeDarkhast changed
comboNoeDarkhast.addEventListener("change", function () {
    filterState.noeDarkhast = this.value;
    updateFeatures();
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
        debugger;
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
    debugger;
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
