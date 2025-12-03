// ============= Imports ===============
import Map from "../../EsriAPI/4.30/@arcgis/core/Map.js";
import MapView from "../../EsriAPI/4.30/@arcgis/core/views/MapView.js";
import FeatureLayer from "../../EsriAPI/4.30/@arcgis/core/layers/FeatureLayer.js";
import GraphicsLayer from "../../EsriAPI/4.30/@arcgis/core/layers/GraphicsLayer.js";
import * as geometryEngine from "../../EsriAPI/4.30/@arcgis/core/geometry/geometryEngine.js";
import Point from "../../EsriAPI/4.30/@arcgis/core/geometry/Point.js";
import Graphic from "../../EsriAPI/4.30/@arcgis/core/Graphic.js";
import Home from "../../EsriAPI/4.30/@arcgis/core/widgets/Home.js";
import * as project from "../../EsriAPI/4.30/@arcgis/core/geometry/projection.js";
import Extent from "../../EsriAPI/4.30/@arcgis/core/geometry/Extent.js";
import Sketch from "../../EsriAPI/4.30/@arcgis/core/widgets/Sketch.js";
import * as reactiveUtils from "../../EsriAPI/4.30/@arcgis/core/core/reactiveUtils.js";
import Polygon from "../../EsriAPI/4.30/@arcgis/core/geometry/Polygon.js";
import Editor from "../../EsriAPI/4.30/@arcgis/core/widgets/Editor.js";

// =============== Map Init ===============
const map = new Map({
    basemap: "osm"
});

const view = new MapView({
    map,
    container: "mapView",
});
view.ui.remove("attribution");

// =============== Layers URL ===============
const url = "http://localhost:6080/arcgis/rest/services/Sabzevar/SabzevarDevelop/MapServer";

const fLayerMabar = new FeatureLayer({
    url: `${url}/0`,
    popupTemplate: {
        title: "Mabar",
        content: [
            {
                type: "fields",
                fieldInfos: [
                    { fieldName: "NAME", label: "نام معبر" },
                    { fieldName: "street_len", label: "عرض موجود" },
                    { fieldName: "street_99", label: "عرض پیشنهادی" },
                ],
            },
        ],
    },
});

const fLayerMelk = new FeatureLayer({
    url: `${url}/1`,
    popupTemplate: {
        title: "Arse",
        content: [
            {
                type: "fields",
                fieldInfos: [
                    { fieldName: "Code_nosazi", label: "کدنوسازی" },
                ],
            },
        ],
    },
});

// =============== Add layer ===============
map.addMany([fLayerMabar, fLayerMelk]);
fLayerMelk.when(() => {
    const homeWidget = new Home({
        view: view,
        viewpoint: {
            targetGeometry: fLayerMelk.fullExtent
        }
    });

    view.ui.add(homeWidget, "top-left");    
});

view.whenLayerView(fLayerMelk)
    .then(() => {
        view.goTo(fLayerMelk.fullExtent);
    });

// ============== Core Logic ===============

const btnFindNearestParcel = document.getElementById("btnFindNearestParcel");
btnFindNearestParcel.addEventListener("click", async () => {
    findMaxWidthStreet(fLayerMelk, fLayerMabar, "1-17-56-4-0-0-0");
});

/**
 * 
 * @param {string} fLayerMelk
 * @param {string} fLayerMabar
 * @param {string} cNosaziMelk
 */
async function findMaxWidthStreet(fLayerMelk, fLayerMabar, cNosaziMelk = "") {
    try {
        // ============== Validation ===============
        // Validation for feature layer Melk URL
        if (!urlMapServiceValidation(fLayerMelk.url)) throw new Error("The URL of the Melk map service is not correct."); //En
        //if (!urlValidation(fLayerMelk.url)) throw new Error("آدرس سرویس نقشه عرصه صحیح نیست."); //Pr

        // Validation for feature layer Mabar URL
        if (!urlMapServiceValidation(fLayerMabar.url)) throw new Error("The URL of the Mabar map service is not correct."); //En
        //if (!urlValidation(fLayerMabar.url)) throw new Error("آدرس سرویس نقشه معبر صحیح نیست."); //Pr

        // Validation for Code Nosazi Melk
        if (!cNosaziMelkValidation(cNosaziMelk)) throw new Error("The Melk code nosazi is not correct."); //En
        //if (!cNosaziMelkValidation(cNosaziMelk)) throw new Error("کدنوسازی ملک صحیح نیست."); //Pr

        // ============== Initialization ===============

        // 01 - Created Graphicslayer
        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);
        graphicsLayer.removeAll();

        // 02 - Finded Parsel
        let queryMelk = fLayerMelk.createQuery();
        queryMelk.returnGeometry = true;
        queryMelk.outFields = ["*"];
        queryMelk.where = `Code_nosazi = '${cNosaziMelk}'`;
        const resultArse = await fLayerMelk.queryFeatures(queryMelk);
        if (resultArse.features.length < 1) { throw new Error("Parcel not found."); } //En
        //if (resultArse.features.length < 1) { throw new Error("ملک مورد نظر یافت نشد."); } //Pr

        const selectParsel = resultArse.features[0];
        const geoSelectParsel = selectParsel.geometry;
        graphicsLayer.add(new Graphic({
            geometry: geoSelectParsel,
            symbol: { type: "simple-fill", color: [0, 255, 0, 0.1], outline: { color: "green" } }
        }));
        // Zoom to parcel
        view.goTo(geoSelectParsel);
        await sleep(1000);

    } catch (err) {
        console.error(`There is an Error in finding the maximum width of Street.`, err); //En
        //console.error(`در یافتن حداکثر عرض خیابان خطایی وجود دارد.`, err); //Pr
    }
}

function urlMapServiceValidation(url) {
    // The type of URL must be String
    if (!url || typeof url !== "string") throw new Error("The type of URL must be String."); //En
    //if (!url || typeof url !== "string") throw new Error("نوع آدرس سرویس نقشه باید رشته‌ای باشد."); //Pr
    return true;
}

function cNosaziMelkValidation(cNosazi) {
    // The type of Code Nosazi must be String
    if (!cNosazi || typeof cNosazi !== "string") throw new Error("The type of Code Nosazi must be String."); //En
    //if (!cNosazi || typeof cNosazi !== "string") throw new Error("نوع کد نوسازی باید رشته‌ای باشد."); //Pr

    // The length of Code Nosazi must be exactly seven parts
    const parts = cNosazi.trim().split('-');
    if (parts.length !== 7) throw new Error("The length of Code Nosazi must be exactly seven."); //En
    //if (parts.length !== 7) throw new Error("طول کد نوسازی باید دقیقاً هفت باشد."); //Pr

    // All Parts must be numeric
    if (parts.some(p => !/^\d+$/.test(p))) throw new Error("All Parts must be numeric."); //En
    //if (parts.some(p => !/^\d+$/.test(p))) throw new Error("تمام قسمت‌ها باید عددی باشند."); //Pr

    // The last three parts must be exactly zero
    if (parts[4] !== "0" || parts[5] !== "0" || parts[6] !== "0") throw new Error("The last three parts must be exactly zero."); //En
    //if (parts[4] !== "0" || parts[5] !== "0" || parts[6] !== "0") throw new Error("سه بخش آخر باید دقیقاً صفر باشند."); //Pr

    // Sections 1, 2, 3, and 4 must not be blank or zero    
    if (parts.slice(0, 4).some(p => p === "0")) throw new Error("Sections 1, 2, 3, and 4 must not be zero."); //En
    //if (parts.slice(0, 4).some(p => p === "0")) throw new Error("بخش‌های ۱، ۲، ۳ و ۴ نباید صفر باشند."); //Pr

    return true;
}

const btnFindStreets = document.getElementById("btnFindStreets");
btnFindStreets.addEventListener("click", async () => {
    try {
        // 01 - Created Graphicslayer        
        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);
        graphicsLayer.removeAll();

        // 02 - Finded Parsel
        let arseQuery = fLayerMelk.createQuery();
        arseQuery.returnGeometry = true;
        arseQuery.outFields = ["*"];
        arseQuery.where = `Code_nosazi = '1-25-149-40-0-0-0'`;

        const resultArse = await fLayerMelk.queryFeatures(arseQuery);        
        if (resultArse.features.length < 1) { throw new Error("Parcel not found"); }

        const selectParsel = resultArse.features[0];
        const geoSelectParsel = selectParsel.geometry;
        graphicsLayer.add(new Graphic({
            geometry: geoSelectParsel,
            symbol: { type: "simple-fill", color: [0, 255, 0, 0.1], outline: { color: "green"} }
        }));
        // Zoom to parcel
        view.goTo(geoSelectParsel);
        await sleep(2000);

        // 03 - created buffer
        const buffParsel = geometryEngine.buffer(geoSelectParsel, 35, "meters");        
        graphicsLayer.add(new Graphic({
            geometry: buffParsel,
            symbol: {
                type: "simple-fill", color: [0, 0, 255, 0.1], outline: {color: "blue"} }
        }));        
        
        // 04 - Finded Streets
        const mabarQuery = fLayerMabar.createQuery();
        mabarQuery.returnGeometry = true;
        mabarQuery.outFields = ["*"];
        mabarQuery.geometry = buffParsel;
        mabarQuery.spatialRelationship = "intersects";

        const selectedMabar = await fLayerMabar.queryFeatures(mabarQuery);
        
        selectedMabar.features.forEach((features) => {            
            graphicsLayer.add(new Graphic({
                geometry: features.geometry,
                symbol: { type: "simple-line", width: 3, color: "red" }
            }));
        });
        await sleep(2000);
        debugger
        // 05 - Validation Mabars
        const validListMabar = await ValidationMabar(selectedMabar.features, selectParsel)
        validListMabar.map((mabar) => {
            graphicsLayer.add(new Graphic({
                geometry: mabar.geometry,
                symbol: {
                    type: "simple-line", width: 2, color: "blue", outline: { width: 0 }
                }
            }));
        });
        await sleep(2000);

        // 05 - Finded Maximum Street Length
        const maxArzeMabar = Math.max(...validListMabar.map(f => f.attributes.street_len));
        console.log("Max: ", maxArzeMabar);

        const maxObjArzeMabar = validListMabar.reduce((prev, current) => {
            return (current.attributes.street_len > prev.attributes.street_len)
                ? current
                : prev;
        });
        graphicsLayer.add(new Graphic({
            geometry: maxObjArzeMabar.geometry,
            symbol: {
                type: "simple-line", width: 3, color: [121, 245, 39], outline: { width: 0}
            }
        }));

        const featureMaxObjArzeMabar = maxObjArzeMabar.attributes;
        console.log(`Max Object Name: ${featureMaxObjArzeMabar.NAME}, Street length: ${featureMaxObjArzeMabar.street_len}, Street99: ${featureMaxObjArzeMabar.street_99}`);

        
    } catch (err) {
        console.error(err);
    }
});

async function ValidationMabar(listMabar, selectedParcel) {

    let validListMabar = [];

    for (const mabar of listMabar) {
        debugger
        // Create flat buffer
        const distansBuffMabar = mabar.attributes.street_len / 2 + 2;
        const buffMabar = createFlatBuffer(mabar.geometry, distansBuffMabar, "meters");

        // Query parcels inside buffer
        const query = fLayerMelk.createQuery();
        query.outFields = ["Code_nosazi"];
        query.geometry = buffMabar;
        query.spatialRelationship = "intersects";

        const result = await fLayerMelk.queryFeatures(query);

        const isSelectedParcelInside = result.features.some(parcel =>
            parcel.attributes.Code_nosazi === selectedParcel.attributes.Code_nosazi
        );

        console.log("Have parcel:", isSelectedParcelInside);

        if (isSelectedParcelInside) {
            validListMabar.push(mabar);
        }
    }

    return validListMabar;
}


function createFlatBuffer(lineGeom, distance, unit = "meters") {
    // Create left offset
    const left = geometryEngine.offset(
        lineGeom,
        distance,
        unit,
        "butt",   // endType → flat
        "miter"   // joinType → sharp edges
    );

    // Create right offset
    const right = geometryEngine.offset(
        lineGeom,
        -distance,
        unit,
        "butt",
        "miter"
    );

    // Union both sides → polygon
    return geometryEngine.union([left, right]);
}



// Sleep 
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }