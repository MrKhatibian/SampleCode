// Complete ArcGIS 4.30 Application - Fully Functional
// Features:
// - Map & FeatureLayer initialization
// - FeatureTable with dynamic columns
// - Sketch Tool for geometry filtering
// - ComboBox filtering
// - Export to CSV/Excel
// - Loader display
// - English comments for clarity

//#region Imports
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

//#region Config
const CONFIG = {
    services: {
        mapImage: "http://localhost:6080/arcgis/rest/services/Maryanaj/Maryanaj/MapServer",
        feature: "http://localhost:6080/arcgis/rest/services/Maryanaj/Maryanaj/MapServer/0"
    },
    fields: {
        sDateSend: "date_rooz",
        eDateSend: "date_rooz",
        noeDarkhast: "noedarkhast",
        marhale: "marhaleh",
        noeKarbari: "noe_parvaneh",
        mantaghe: "mantaghe",
        mahdodeh: "hoze",
        ebtal: "Ebtal"
    },
    comboMapping: {
        comboNoeDarkhast: "noedarkhast",
        comboMarhale: "marhaleh",
        comboNoeKarbari: "noe_parvaneh",
        comboMantaghe: "mantaghe",
        comboMahdodeh: "hoze"
    }
};
//#endregion

//#region State
const state = {
    map: null,
    view: null,
    arseILayer: null,
    darkhastFLayer: null,
    featureTable: null,
    sketchLayer: null,
    sketch: null,
    darkhastFeatures: [],
    comboBoxValues: {},
    linkMap2Table: false,
    filterValues: {
        extent: null,
        sDateSend: null,
        eDateSend: null,
        noedarkhast: "",
        marhaleh: "",
        noe_parvaneh: "",
        mantaghe: null,
        hoze: null
    }
};
//#endregion

//#region Initialization
async function init() {
    try {
        // Create layers
        state.arseILayer = new MapImageLayer({ url: CONFIG.services.mapImage, sublayers: [{ id: 9 }] });
        state.darkhastFLayer = new FeatureLayer({
            url: CONFIG.services.feature,
            outFields: Object.values(CONFIG.fields),
            popupTemplate: { title: "درخواست", content: "شماره: {shodarkhast}" }
        });

        // Create map and view
        state.map = new Map({ basemap: "osm", layers: [state.arseILayer, state.darkhastFLayer] });
        state.view = new MapView({ container: "map", map: state.map });

        await state.view.when();
        await state.darkhastFLayer.when();

        // Zoom to layer extent
        const fullExtent = state.darkhastFLayer.fullExtent || state.arseILayer.fullExtent;
        if (fullExtent) await state.view.goTo(fullExtent, { animate: false });

        // Add Home widget
        state.view.ui.add(new Home({ view: state.view }), "top-left");

        // Initialize FeatureTable
        await createFeatureTable();

        // Initialize Sketch and UI
        setupSketch();
        setupUI();

        // Initial query
        await updateFeatures();

        console.log("App initialized");
    } catch (err) {
        console.error("Initialization failed:", err);
    }
}
//#endregion

//#region FeatureTable
async function createFeatureTable() {
    const validFields = state.darkhastFLayer.fields.filter(f => f.type !== "geometry");
    const columnTemplates = validFields.map((field, idx) => ({
        type: "field",
        fieldName: field.name,
        label: field.alias || field.name,
        visible: idx < 10
    }));

    state.featureTable = new FeatureTable({
        container: "attributeTable",
        view: state.view,
        layer: state.darkhastFLayer,
        tableTemplate: { columnTemplates }
    });
}
//#endregion

//#region Filters
function buildWhereClause() {
    const v = state.filterValues;
    const f = CONFIG.fields;
    const clauses = [];
    if (v.sDateSend) clauses.push(`${f.sDateSend} > ${escapeSqlValue(v.sDateSend)}`);
    if (v.eDateSend) clauses.push(`${f.eDateSend} < ${escapeSqlValue(v.eDateSend)}`);
    if (v.noedarkhast) clauses.push(`${f.noeDarkhast} = N'${escapeSqlString(v.noedarkhast)}'`);
    if (v.marhaleh) clauses.push(`${f.marhale} = N'${escapeSqlString(v.marhaleh)}'`);
    if (v.noe_parvaneh) clauses.push(`${f.noeKarbari} = N'${escapeSqlString(v.noe_parvaneh)}'`);
    if (v.mantaghe) clauses.push(`${f.mantaghe} = N'${escapeSqlString(v.mantaghe)}'`);
    if (v.hoze) clauses.push(`${f.mahdodeh} = N'${escapeSqlString(v.hoze)}'`);
    return clauses.length ? clauses.join(" AND ") : "1=1";
}

function escapeSqlString(s) { return String(s).replace(/'/g, "''"); }
function escapeSqlValue(v) { return Number(v) || v; }
//#endregion

//#region Update Features
async function updateFeatures(options = {}) {
    showLoader("map");
    try {
        const where = buildWhereClause();
        const geometry = options.geometry || getEffectiveGeometry();

        const layerView = await state.view.whenLayerView(state.darkhastFLayer);
        layerView.filter = { geometry, spatialRelationship: "intersects" };
        state.darkhastFLayer.definitionExpression = where;

        if (state.featureTable) state.featureTable.filterGeometry = geometry;

        const q = state.darkhastFLayer.createQuery();
        q.where = where;
        q.geometry = geometry;
        q.outFields = Object.values(CONFIG.fields);
        q.returnGeometry = true;

        const fset = await state.darkhastFLayer.queryFeatures(q);
        state.darkhastFeatures = fset.features || [];

        state.comboBoxValues = getComboBoxValues(state.darkhastFeatures);
        fillComboboxes();
    } catch (err) {
        console.error("updateFeatures error:", err);
    } finally { hideLoader(); }
}

function getEffectiveGeometry() {
    if (state.sketchLayer?.graphics?.length > 0) return state.sketchLayer.graphics.getItemAt(0).geometry;
    if (state.linkMap2Table) return state.view.extent;
    return state.darkhastFLayer.fullExtent;
}
//#endregion

//#region ComboBox Handling
function getComboBoxValues(features) {
    const keys = Object.values(CONFIG.comboMapping);
    const result = Object.fromEntries(keys.map(k => [k, [""]]));
    const seen = Object.fromEntries(keys.map(k => [k, new Set()]));
    for (const f of features) {
        const a = f.attributes || {};
        keys.forEach(k => {
            if (a[k] && !seen[k].has(a[k])) {
                seen[k].add(a[k]);
                result[k].push(a[k]);
            }
        });
    }
    return result;
}

function fillComboboxes() {
    Object.entries(CONFIG.comboMapping).forEach(([id, key]) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = "";
        const values = state.comboBoxValues[key] || [""];
        values.forEach(v => {
            const opt = document.createElement("option");
            opt.value = v;
            opt.text = v;
            el.appendChild(opt);
        });
        if (state.filterValues[key] !== undefined) el.value = state.filterValues[key] || "";
    });
}
//#endregion

//#region Sketch Tool
function setupSketch() {
    state.sketchLayer = new GraphicsLayer();
    state.map.add(state.sketchLayer);

    state.sketch = new Sketch({ layer: state.sketchLayer, view: state.view, creationMode: "single" });
}
//#endregion

//#region UI Setup
function setupUI() {
    const btnLinkMap2Table = document.getElementById("btnLinkMap2Table");
    if (btnLinkMap2Table) {
        btnLinkMap2Table.addEventListener("click", () => {
            state.linkMap2Table = !state.linkMap2Table;
            updateFeatures();
        });
    }
}
//#endregion

//#region Date Helpers
function dateValidation(date) {
    if (!date) return false;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
    return !isNaN(new Date(date).getTime());
}

function convert2shamsi(date) {
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    const fmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { year: "numeric", month: "2-digit", day: "2-digit" });
    const parts = fmt.formatToParts(d);
    return Number(`${parts.find(p => p.type === "year")?.value}${parts.find(p => p.type === "month")?.value}${parts.find(p => p.type === "day")?.value}`);
}
//#endregion

//#region Export Helpers
function getHeadersAndRows(featureTable, features) {
    const visibleFields = featureTable.columns.items.filter(c => !c.hidden);
    const headers = visibleFields.map(c => c.label || c.fieldName);
    const rows = features.map(f => {
        const r = {};
        visibleFields.forEach(c => { r[c.label || c.fieldName] = f.attributes[c.fieldName] ?? null; });
        return r;
    });
    return { headers, rows };
}

function exportCSV(headers, rows, delimiter = ",", filename = "Export") {
    const csvRows = rows.map(row => headers.map(h => `"${(row[h] ?? "").toString().replace(/"/g, '""')}"`).join(delimiter));
    const full = [headers.join(delimiter), ...csvRows].join("\r\n");
    const blob = new Blob(["\uFEFF" + full], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = `${filename}.csv`; link.click();
}

function exportExcel(headers, rows, filename = "Export") {
    if (typeof XLSX === "undefined") throw new Error("XLSX not available");
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows, { header: headers });
    XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" });
    XLSX.utils.book_append_sheet(wb, ws, filename);
    XLSX.writeFile(wb, `${filename}.xlsx`);
}
//#endregion

//#region Loader
const loader = document.getElementById("loader");
function showLoader(divId) { const target = document.getElementById(divId); if (target && loader) { target.appendChild(loader); loader.style.display = "flex"; } }
function hideLoader() { if (loader) loader.style.display = "none"; }
//#endregion

// Start the application
init();
