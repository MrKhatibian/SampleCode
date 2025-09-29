// Improved & refactored ArcGIS 4.30 application
// Key changes:
// - Proper async initialization/order (view exists before using it)
// - Fewer globals; scoped queries; robust validations
// - Fixed date validation bugs and safer date->Persian conversion
// - Defensive DOM checks and error handling
// - Cleaner filter building and explicit escaping
// - Minor UX improvements (loader handling, toggles)

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
const gisConfig = {
    services: {
        mapServer: "http://localhost:6080/arcgis/rest/services/Maryanaj/Maryanaj/MapServer",
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

//#region App state
const gisState = {
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

//const fieldsName = {
//    sDateSend: "date_rooz",
//    eDateSend: "date_rooz",
//    noeDarkhast: "noedarkhast",
//    marhale: "marhaleh",
//    noeKarbari: "",
//    mantaghe: "mantaghe",
//    mahdodeh: "hoze",
//    ebtal: "Ebtal"
//};

//#endregion

//#region Initialization
async function init() {
    try {
        // Create base layers
        gisState.arseILayer = new MapImageLayer({
            url: gisConfig.services.mapServer,
            sublayers: [{ id: 9 }]
        });

        gisState.darkhastFLayer = new FeatureLayer({
            url: gisConfig.services.mapServer,
            //outFields: Object.values(CONFIG.fields),
            outFields: ["*"],
            popupTemplate: { title: "درخواست", content: "شماره: {shodarkhast}" },
            renderer: {
                type: "simple",
                symbol: { type: "simple-marker", size: 5, color: "black", outline: null }
            },
            featureReduction: {
                type: "cluster",
                clusterRadius: "100px",
                clusterMaxSize: 40,
                clusterMinSize: 10,
                maxScale: 3000,
                renderer: {
                    type: "unique-value",
                    field: "cluster_count",
                    uniqueValueInfos: [{ value: 1, symbol: { type: "simple-marker", size: 5, outline: null } }],
                    defaultSymbol: { type: "simple-marker", color: "#BEE8FF", size: 10, outline: { type: "simple-line", color: [0, 77, 158, 0.5], width: 3 } },
                    visualVariables: [{ type: "color", field: "cluster_count", stops: [{ value: 1, color: "black" }, { value: 2, color: "#BEE8FF" }, { value: 100, color: "#002673" }] }]
                },
                labelingInfo: [{ deconflictionStrategy: "none", labelExpressionInfo: { expression: "$feature.cluster_count" }, symbol: { type: "text", color: "white", haloColor: "black", haloSize: "1px", font: { family: "Arial", size: 10, weight: "bold" } }, labelPlacement: "center-center" }]
            }
        });

        // Create map + view
        gisState.map = new Map({ basemap: "osm", layers: [gisState.arseILayer, gisState.darkhastFLayer] });

        gisState.view = new MapView({ container: "map", map: gisState.map });

        // Remove attribution if exists
        try { gisState.view.ui.remove("attribution"); } catch (e) { /* ignore */ }

        // wait for view and primary layer to be ready
        await gisState.view.when();
        await gisState.darkhastFLayer.when();

        // Fit to layer extent
        const fullExtent = gisState.darkhastFLayer.fullExtent || gisState.arseILayer.fullExtent;
        if (fullExtent) {
            await gisState.view.goTo(fullExtent, { animate: false });
            gisState.view.constraints = { geometry: fullExtent, minZoom: 14 };
        }

        // Add Home widget
        const home = new Home({ view: gisState.view, viewpoint: { targetGeometry: fullExtent } });
        gisState.view.ui.add(home, "top-left");

        // Build FeatureTable AFTER view is ready
        await createFeatureTable();

        // Setup sketch
        setupSketch();

        // Setup UI handlers after feature table exists
        setupUI();

        // kick off initial query
        await updateFeatures();

        console.log("App initialized");
    } catch (err) {
        console.error("Initialization failed:", err);
    }
}
//#endregion

//#region FeatureTable
async function createFeatureTable() {
    // prepare column templates by reading fields (remove geometry)
    const fields = gisState.darkhastFLayer.fields || [];
    const validFields = fields.filter(f => f.type !== "geometry");
    const columnTemplates = validFields.map((field, idx) => ({
        type: "field",
        fieldName: field.name,
        label: field.alias || field.name,
        visible: idx < 10
    }));

    gisState.featureTable = new FeatureTable({
        container: "attributeTable",
        view: gisState.view,
        layer: gisState.darkhastFLayer,
        tableTemplate: { columnTemplates }
    });

    // override zoomToSelection with safer approach: check view exists
    if (gisState.featureTable && typeof gisState.featureTable.zoomToSelection === "function") {
        const original = gisState.featureTable.zoomToSelection.bind(gisState.featureTable);
        gisState.featureTable.zoomToSelection = async function () {
            try { gisState.view.zoom = 18; } catch (e) { /* ignore */ }
            return original();
        };
    }
}
//#endregion

//#region Sketch Tool
function setupSketch() {
    gisState.sketchLayer = new GraphicsLayer();
    gisState.map.add(gisState.sketchLayer);

    gisState.sketch = new Sketch({
        layer: gisState.sketchLayer,
        view: gisState.view,
        creationMode: "single"
    });

    const btnSketch = document.getElementById("btnSketch");
    const btnDelSketch = document.getElementById("btnDelSketch");

    if (btnDelSketch) { gisState.view.ui.add("btnDelSketch", "top-right"); btnDelSketch.hidden = true; }
    if (btnSketch) { gisState.view.ui.add("btnSketch", "top-left"); }

    let sketchActive = false;

    if (btnSketch) {
        btnSketch.addEventListener("click", () => {
            sketchActive = !sketchActive;
            if (sketchActive) {
                btnSketch.title = "Sketch Off"; btnSketch.style.color = "green"; gisState.sketch.create("polygon");
                if (btnDelSketch) btnDelSketch.hidden = false;
            } else {
                btnSketch.title = "Sketch On"; btnSketch.style.color = "red"; gisState.sketch.cancel(); gisState.sketchLayer.removeAll();
                if (btnDelSketch) btnDelSketch.hidden = true;
                updateFeatures() // reset
            }
        });
    }

    if (btnDelSketch) {
        btnDelSketch.addEventListener("click", () => { if (btnSketch) btnSketch.click(); });
    }

    gisState.sketch.on("create", async event => {
        if (event.state === "complete") {
            const geometry = event.graphic && event.graphic.geometry;
            if (geometry) {
                await updateFeatures({ geometry });
            }
        } else if (event.state === "cancel") {
            if (btnSketch) btnSketch.click();
        }
    });

    gisState.sketch.on("update", async event => {
        if (event.state === "complete") {
            if (gisState.sketchLayer.graphics.length > 0) {
                const geometry = event.graphics && event.graphics[0] && event.graphics[0].geometry;
                if (geometry) await updateFeatures({ geometry });
            } else {
                if (btnSketch) btnSketch.click();
            }
        }
    });
}
//#endregion

//#region UI Setup
function setupUI() {
    // Link map <-> table button
    const btnLinkMap2Table = document.getElementById("btnLinkMap2Table");
    const calIcon = btnLinkMap2Table && btnLinkMap2Table.querySelector("calcite-icon");
    if (btnLinkMap2Table) gisState.view.ui.add(btnLinkMap2Table, "top-left");

    if (btnLinkMap2Table) {
        btnLinkMap2Table.addEventListener("click", () => {
            gisState.linkMap2Table = !gisState.linkMap2Table;
            if (gisState.linkMap2Table) {
                btnLinkMap2Table.title = "Unlinked Map to Table";
                btnLinkMap2Table.style.color = "green";
                if (calIcon) calIcon.icon = "online";
                updateFeatures();
            } else {
                btnLinkMap2Table.title = "Linked Map to Table";
                btnLinkMap2Table.style.color = "red";
                if (calIcon) calIcon.icon = "offline";
            }
        });
    }

    // Filter UI elements (defensive)
    //const comboIds = ["comboNoeDarkhast", "comboMarhale", "comboNoeKarbari", "comboMantaghe", "comboMahdodeh"];

    //const combos = comboIds.map(id => document.getElementById(id)).filter(Boolean);

    //combos.forEach(combo => {
    //    combo.addEventListener("change", () => {
    //        const fieldKey = combo.id.replace(/^combo/, "").toLowerCase();
    //        // Map to state keys explicitly
    //        const dic = { combonoedarkhast: "noedarkhast", combomarhale: "marhaleh", combonoeparvaneh: "noe_parvaneh", combomantaghe: "mantaghe", combomahdodeh: "hoze" };
    //        const mapKey = dic[combo.id.toLowerCase()] || dic[combo.id.replace(/[^a-z]/gi, "").toLowerCase()];
    //        if (mapKey) gisState.filterValues[mapKey] = combo.value;
    //        updateFeatures();
    //    });
    //});
    // ---------- Get Combobox Elements ----------
    const comboNoeDarkhast = document.getElementById("comboNoeDarkhast");
    const comboMarhale = document.getElementById("comboMarhale");
    const comboNoeKarbari = document.getElementById("comboNoeKarbari");
    const comboMantaghe = document.getElementById("comboMantaghe");
    const comboMahdodeh = document.getElementById("comboMahdodeh");
    // ---------- Comboxes changed ----------
    comboNoeDarkhast.addEventListener("change", function () {
        gisState.filterValues.noedarkhast = this.value;
        updateFeatures();
    });
    comboMarhale.addEventListener("change", function () {
        gisState.filterValues.marhaleh = this.value;
        updateFeatures();
    });
    comboNoeKarbari.addEventListener("change", function () {
        gisState.filterValues.noe_parvaneh = this.value;
        updateFeatures();
    });
    comboMantaghe.addEventListener("change", function () {
        gisState.filterValues.mantaghe = this.value;
        updateFeatures();
    });
    comboMahdodeh.addEventListener("change", function () {
        gisState.filterValues.hoze = this.value;
        updateFeatures();
    });


    const startDateEl = document.getElementById("startDateSend");
    const endDateEl = document.getElementById("endDateSend");

    if (startDateEl) startDateEl.addEventListener("change", () => {
        const dateStr = startDateEl.value;
        if (!dateValidation(dateStr)) return; gisState.filterValues.sDateSend = convert2shamsi(dateStr); updateFeatures();
    });
    if (endDateEl) endDateEl.addEventListener("change", () => {
        const dateStr = endDateEl.value; if (!dateValidation(dateStr)) return; gisState.filterValues.eDateSend = convert2shamsi(dateStr); updateFeatures();
    });

    // view stationary watcher
    gisState.view.watch("stationary", isStationary => { if (isStationary && gisState.linkMap2Table) updateFeatures(); });

    // Clear filters
    const btnClear = document.getElementById("btnClearFilters");
    if (btnClear) btnClear.addEventListener("click", () => {
        gisState.filterValues = { extent: null, sDateSend: null, eDateSend: null, noedarkhast: "", marhaleh: "", noe_parvaneh: "", mantaghe: null, hoze: null };
        const start = document.getElementById("startDateSend"); if (start) start.value = "";
        const end = document.getElementById("endDateSend"); if (end) end.value = "";
        updateFeatures({ geometry: gisState.arseILayer ? gisState.arseILayer.extent : null });
    });

    // CSV/Excel/Map export handlers
    const btnCSV = document.getElementById("btnCSV");
    if (btnCSV) btnCSV.addEventListener("click", () => {
        try {
            const { headers, rows } = getHeadersAndRows(gisState.featureTable, gisState.darkhastFeatures);
            exportCSV(headers, rows);
        } catch (e) { console.error(e); }
    });

    const btnExcel = document.getElementById("btnExcel");
    if (btnExcel) btnExcel.addEventListener("click", () => {
        try { const { headers, rows } = getHeadersAndRows(gisState.featureTable, gisState.darkhastFeatures); exportExcel(headers, rows); } catch (e) { console.error(e); }
    });

    const btnScreenshot = document.getElementById("btnMapScreenshot");
    if (btnScreenshot) btnScreenshot.addEventListener("click", async () => {
        try { const screenshot = await gisState.view.takeScreenshot({ format: "png" }); const link = document.createElement("a"); link.href = screenshot.dataUrl; link.download = "map.png"; link.click(); } catch (e) { console.error(e); }
    });
}
//#endregion

//#region Filters
function buildWhereClause() {
    const v = gisState.filterValues;
    const f = gisConfig.fields;
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

        // apply filters to layerView (fast client-side filtering for view)
        const layerView = await gisState.view.whenLayerView(gisState.darkhastFLayer);
        layerView.filter = { geometry, spatialRelationship: "intersects" };

        // server-side filter for other consumers
        gisState.darkhastFLayer.definitionExpression = where;

        // feature table geometry filter
        if (gisState.featureTable) gisState.featureTable.filterGeometry = geometry;

        // query features from the layer directly (fresh query)
        const q = gisState.darkhastFLayer.createQuery();
        q.where = where; q.geometry = geometry; q.spatialRelationship = "intersects"; q.returnGeometry = true;
        q.outFields = ["*"]; //q.outFields = Object.values(CONFIG.fields);

        const fset = await gisState.darkhastFLayer.queryFeatures(q);
        gisState.darkhastFeatures = Array.isArray(fset.features) ? fset.features : [];

        // update combobox values
        gisState.comboBoxValues = getComboBoxValues(gisState.darkhastFeatures);
        fillComboboxes();
    } catch (err) {
        console.error("updateFeatures error:", err);
    } finally { hideLoader(); }
}

function getEffectiveGeometry() {
    if (gisState.sketchLayer && gisState.sketchLayer.graphics && gisState.sketchLayer.graphics.length > 0) {
        try { return geometryEngine.intersect(gisState.sketchLayer.graphics.getItemAt(0).geometry, gisState.view.extent); } 
        catch (e) { return gisState.sketchLayer.graphics.getItemAt(0).geometry; }
    }
    if (gisState.linkMap2Table) return gisState.view.extent;
    return gisState.darkhastFLayer.fullExtent;
}
//#endregion

//#region ComboBox Handling
//function getComboBoxValues(features) {
//    const result = { noedarkhast: [""], marhaleh: [""], noe_parvaneh: [""], mantaghe: [""], hoze: [""] };
//    const seen = { noedarkhast: new Set(), marhaleh: new Set(), noe_parvaneh: new Set(), mantaghe: new Set(), hoze: new Set() };
//    for (const f of features) {
//        const a = f.attributes || {};
//        if (a.noedarkhast && !seen.noedarkhast.has(a.noedarkhast)) { seen.noedarkhast.add(a.noedarkhast); result.noedarkhast.push(a.noedarkhast); }
//        if (a.marhaleh && !seen.marhaleh.has(a.marhaleh)) { seen.marhaleh.add(a.marhaleh); result.marhaleh.push(a.marhaleh); }
//        if (a.noe_parvaneh && !seen.noe_parvaneh.has(a.noe_parvaneh)) { seen.noe_parvaneh.add(a.noe_parvaneh); result.noe_parvaneh.push(a.noe_parvaneh); }
//        if (a.mantaghe && !seen.mantaghe.has(a.mantaghe)) { seen.mantaghe.add(a.mantaghe); result.mantaghe.push(a.mantaghe); }
//        if (a.hoze && !seen.hoze.has(a.hoze)) { seen.hoze.add(a.hoze); result.hoze.push(a.hoze); }
//    }
//    return result;
//}
function getComboBoxValues(features) {
    const keys = Object.values(gisConfig.comboMapping);
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
// Fill combobox DOMs - expects specific ids
//function fillComboboxes() {
//    const mapping = { comboNoeDarkhast: 'noedarkhast', comboMarhale: 'marhaleh', comboNoeKarbari: 'noe_parvaneh', comboMantaghe: 'mantaghe', comboMahdodeh: 'hoze' };
//    Object.entries(mapping).forEach(([id, key]) => {
//        const el = document.getElementById(id);
//        if (!el) return;
//        el.innerHTML = "";
//        const values = gisState.comboBoxValues[key] || [""];
//        for (const v of values) { const opt = document.createElement('option'); opt.value = v; opt.text = v; el.appendChild(opt); }
//        // attempt to retain previous filter
//        if (gisState.filterValues[key] !== undefined) el.value = gisState.filterValues[key] || "";
//    });
//}
function fillComboboxes() {
    Object.entries(gisConfig.comboMapping).forEach(([id, key]) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = "";
        const values = gisState.comboBoxValues[key] || [""];
        values.forEach(v => {
            const opt = document.createElement("option");
            opt.value = v;
            opt.text = v;
            el.appendChild(opt);
        });
        if (gisState.filterValues[key] !== undefined) el.value = gisState.filterValues[key] || "";
    });
}
//#endregion

// Date helpers
function dateValidation(date) {
    if (!date) { console.warn("No date selected"); return false; }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) { console.warn("Invalid date format:", date); return false; }
    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) { console.warn("Invalid date value:", date); return false; }
    return true;
}

function convert2shamsi(date) {
    const d = new Date(date);
    if (isNaN(d.getTime())) { console.warn("Invalid date:", date); return null; }
    try {
        const fmt = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const parts = fmt.formatToParts(d);
        const y = parts.find(p => p.type === 'year')?.value;
        const m = parts.find(p => p.type === 'month')?.value;
        const day = parts.find(p => p.type === 'day')?.value;
        if (!y || !m || !day) return null;
        return Number(`${y}${m}${day}`);
    } catch (e) {
        console.warn('convert2shamsi failed', e); return null;
    }
}

//#region Export Helpers
// Export helpers (kept mostly as-is, with safer validations)
function getHeadersAndRows(featureTable, features) {
    if (!featureTable || !featureTable.columns || !featureTable.columns.items) throw new Error('featureTable is missing');
    if (!Array.isArray(features)) throw new Error('features must be array');
    const visibleFields = featureTable.columns.items.filter(c => !c.hidden);
    if (!visibleFields.length) throw new Error('No visible fields');
    const headers = visibleFields.map(c => c.label || c.fieldName);
    const rows = features.map(f => {
        const r = {};
        visibleFields.forEach(c => { r[c.label || c.fieldName] = f.attributes && f.attributes[c.fieldName] !== undefined ? f.attributes[c.fieldName] : null; });
        return r;
    });
    return { headers, rows };
}

function exportCSV(headers, rows, delimiter = ',', filename = 'Export') {
    try {
        if (!Array.isArray(headers) || headers.length === 0) throw new Error('headers invalid');
        if (!Array.isArray(rows)) throw new Error('rows invalid');
        const csvRows = rows.map((row, idx) => {
            if (!row || typeof row !== 'object') return headers.map(() => '');
            return headers.map(h => `"${(row[h] != null ? String(row[h]).replace(/"/g, '""') : '')}"`).join(delimiter);
        });
        const full = [headers.join(delimiter), ...csvRows].join('\r\n');
        const blob = new Blob(["\uFEFF" + full], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = `${filename}.csv`; document.body.appendChild(link); link.click(); document.body.removeChild(link);
    } catch (e) { console.error('exportCSV error', e); }
}

function exportExcel(headers, rows, filename = 'Export') {
    try {
        if (!Array.isArray(headers) || !headers.length) throw new Error('headers invalid');
        if (!Array.isArray(rows)) throw new Error('rows invalid');
        if (typeof XLSX === 'undefined') throw new Error('XLSX not available. Include SheetJS.');
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(rows, { header: headers });
        XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A1' });
        XLSX.utils.book_append_sheet(wb, ws, filename);
        XLSX.writeFile(wb, `${filename}.xlsx`);
    } catch (e) { console.error('exportExcel error', e); }
}
//#endregion

//#region Loader
const loader = document.getElementById("loader");
function showLoader(divId) { const target = document.getElementById(divId); if (!target || !loader) return; if (getComputedStyle(target).position === 'static') target.style.position = 'relative'; try { target.appendChild(loader); } catch (e) { } loader.style.display = 'flex'; }
function hideLoader() { if (loader) loader.style.display = 'none'; }
//#endregion

// utility
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// start app
init();
