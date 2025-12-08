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
                    { fieldName: "Max_price_", label: "قیمت" },
                ],
            }
        ],
    },
});

const fLayerMahdodeh = new FeatureLayer({
    url: `${url}/2`,
    popupTemplate: {
        title: "Mahdodeh"       
    }
});

const fLayerHarim = new FeatureLayer({
    url: `${url}/3`,
    popupTemplate: {
        title: "Harim",        
    }
});

// =============== Add layer ===============
map.addMany([fLayerHarim, fLayerMahdodeh, fLayerMabar, fLayerMelk]);
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

const btnFindNearestMelk = document.getElementById("btnFindNearestMelk");
btnFindNearestMelk.addEventListener("click", async () => {
    // 01 - Created Graphicslayer        
    const gLayerFindNearestMelk = new GraphicsLayer();
    map.add(gLayerFindNearestMelk);
    gLayerFindNearestMelk.removeAll();

    fLayerMelk.definitionExpression = `Max_price_ > 0`;
    FindNearestMelk(fLayerMelk, gLayerFindNearestMelk)
});

async function FindNearestMelk(featureLayer, graphicslayer, targetFeature, counter = 5, searchDistance = 100) {
    
    const selectFeatures = await SelectByAttribute(fLayerMelk, "Code_Nosazi", "1-25-156-15-0-0-0");
    if (selectFeatures.length < 1) return console.Error("Not find any Melk.");
    const geoSelectFeature = selectFeatures[0].geometry;
      
    const locationValidCodenosazi = await SelectByLocation(fLayerHarim, geoSelectFeature, "intersects")
    if (locationValidCodenosazi.length < 1) return console.error("Melk is outside of Harim's boudary");    

    

    // 01 - Get geometry Harim
    const queryHarim = fLayerHarim.createQuery();
    queryHarim.returnGeometry = true;
    const resultHarim = await fLayerHarim.queryFeatures(queryHarim);
    if (resultHarim.features.length < 1) return console.error("Not find any Harim.")

    // if Harim have a multi features
    const geoHarim = resultHarim.features.length === 1
        ? resultHarim.features[0].geometry
        : geometryEngine.union(resultHarim.features.map(f => f.geometry));
    // View Filter
    const viewMelk = await view.whenLayerView(fLayerMelk);
    viewMelk.filter = { geometry: geoHarim, spatialRelationship: "contains" };

    // 02 - Get geometry Mahdodeh
    const queryMahdodeh = fLayerMahdodeh.createQuery();
    queryMahdodeh.returnGeometry = true;
    const resultMahdodeh = await fLayerMahdodeh.queryFeatures(queryMahdodeh);
    if (resultMahdodeh.features.length < 1) return console.error("Not find any Mahdodeh.")

    const geoMahdodeh = resultMahdodeh.features.length === 1
        ? resultMahdodeh.features[0].geometry
        : geometryEngine.union(resultMahdodeh.features(f => f.geometry));

    // 03 - Get geometry between in Harim and Mahdodeh
    

    //view.when(fLayerMelk).then(viewMelk => {
    //    //viewMelk.effect = {
    //    //    filter: { geometry: geoHarim, },
    //    //    //includedEffect: "opacity(100%)",
    //    //    //excludedEffect: "opacity(20%) blur(2px)"
    //    //};
    //    viewMelk.filter = { geometry: geoHarim, spatialRelationship: "intersects" }

    //})

    const queryMelk = fLayerMelk.createQuery();
    queryMelk.geometry = geoHarim;
    queryMelk.spatialRelationship = "contains";
    const MelkInHarim = await fLayerMelk.queryFeatures(queryMelk);
        
    //const selectFeatures = MelkInHarim.features.find(f => f.attributes.Code_nosazi === "1-25-156-15-0-0-0");
    //const geoSelectFeature = selectFeatures?.geometry;
    //view.goTo(geoSelectFeature);
    //view.goTo({
    //    target: geoSelectFeature,
    //    zoom: 17
    //})// have bugs

    graphicslayer.add(new Graphic({
        geometry: geoSelectFeature,
        symbol: {
            type: "simple-fill", color: [0, 0, 255, 0.1], outline: { color: [39, 235, 245] }
        }
    }));

    const buffSelectFeature = geometryEngine.buffer(geoSelectFeature, searchDistance, "meters");
    graphicslayer.add(new Graphic({
        geometry: buffSelectFeature,
        symbol: {
            type: "simple-fill", color: [164, 230, 41, 0.2], outline: { color: [31, 100, 50] }
        }
    }));
    view.goTo(buffSelectFeature);

    const candidateFeatures = await SelectByLocation(MelkInHarim, buffSelectFeature, "intersects");
    if (candidateFeatures.length === 0) return null;
    
    let distance = [];
    candidateFeatures.forEach(f => {
        if (f.geometry.extent.equals(geoSelectFeature.extent) ) return;
        const d = geometryEngine.distance(geoSelectFeature, f.geometry, "meters");
        distance.push({
            distance: d,
            feature: f
        });
    });

    //
    distance.sort((a, b) => a.distance - b.distance);    

    let nearestMelk = distance[0];
    graphicslayer.add(new Graphic({
        geometry: nearestMelk.feature.geometry,
        symbol: {
            type: "simple-fill", color: [0, 255, 0, 0.2], outline: "green"
        }
    }));
    console.log(nearestMelk);

    //let top5MinDistance = distance.slice(0, counter);
    //console.log(top5MinDistance);

    //top5MinDistance.forEach(f => {
    //    if (f.feature.attributes.Max_price_ > 0) {
    //        graphicslayer.add(new Graphic({
    //            geometry: f.feature.geometry,
    //            symbol: {
    //                type: "simple-fill", color: [255, 0, 0, 0.2], outline: { color: "red" }
    //            }
    //        }));
    //    }
    //});

    


}


// Button Find Maximum length of Street for Melk
const btnFindStreets = document.getElementById("btnFindStreets");
btnFindStreets.addEventListener("click", async () => {
    try {
        // 01 - Created gLayerFindNearestMelk        
        const gLayerFindStreet = new GraphicsLayer();
        map.add(gLayerFindStreet);
        gLayerFindStreet.removeAll();

        FindMaxWidthStreet(fLayerMelk, fLayerMabar, gLayerFindStreet, "Code_nosazi", "1-16-11-2-0-0-0");
    } catch (err) {
        console.error(err);
    }
});
/**
 * 
 * @param {string} fLayerMelk
 * @param {string} fLayerMabar
 * @param {string} cNosaziMelk
 */
async function FindMaxWidthStreet(fLayerMelk, fLayerMabar, graphicsLayer,fieldMelk, cNosaziMelk = "") {
    try {
        // ============== Validation ===============
        // Validation for feature layer Melk URL
        if (!URLMapServiceValidation(fLayerMelk.url)) throw new Error("The URL of the Melk map service is not correct."); //En
        //if (!URLMapServiceValidation(fLayerMelk.url)) throw new Error("آدرس سرویس نقشه عرصه صحیح نیست."); //Pr

        // Validation for feature layer Mabar URL
        if (!URLMapServiceValidation(fLayerMabar.url)) throw new Error("The URL of the Mabar map service is not correct."); //En
        //if (!URLMapServiceValidation(fLayerMabar.url)) throw new Error("آدرس سرویس نقشه معبر صحیح نیست."); //Pr

        // Validation for Code Nosazi Melk
        if (!CNosaziMelkValidation(cNosaziMelk)) throw new Error("The Melk code nosazi is not correct."); //En
        //if (!CNosaziMelkValidation(cNosaziMelk)) throw new Error("کدنوسازی ملک صحیح نیست."); //Pr

        // ============== Initialization ===============
        

        // 01 - Finded Melk
        const selectMelks = await SelectByAttribute(fLayerMelk, fieldMelk, cNosaziMelk);
        const geoSelectMelk = selectMelks[0].geometry;
        graphicsLayer.add(new Graphic({
            geometry: geoSelectMelk,
            symbol: { type: "simple-fill", color: [0, 255, 0, 0.2], outline: { color: "green" } }
        }));

        // Zoom to Melk
        view.goTo(geoSelectMelk);                

        await sleep(1000); 
        // 02 - Create Buffer for Melk
        const buffMelk = geometryEngine.buffer(geoSelectMelk, 35, "meters");
        graphicsLayer.add(new Graphic({
            geometry: buffMelk,
            symbol: {
                type: "simple-fill", color: [0, 0, 255, 0.1], outline: { color: "blue" }
            }
        }));
        
        await sleep(1000); 
        // 03 - Find Mabars        
        const selectMabars = await SelectByLocation(fLayerMabar, buffMelk, "intersects");
        if (!selectMabars)        
            console.log(`Not found any Mabar.`); //En
            //console.log(`هیچی معبری یافت نشد.`); //Pr
        selectMabars.forEach((features) => {
            graphicsLayer.add(new Graphic({
                geometry: features.geometry,
                symbol: {
                    type: "simple-line", width: 2, color: "red", outLine: {width: 0} }
            }));
        });
        
        await sleep(1000); 
        // 04 - Validation Mabars
        const validListMabar = await MabarValidation(selectMabars, selectMelks[0])
        if (validListMabar.length < 1) { 
            console.Error("Not found any mabar."); return; //En
            //console.Error("هیچ معبری یافت نشد."); return; //Pr
        }
        validListMabar.map((mabar) => {
            graphicsLayer.add(new Graphic({
                geometry: mabar.geometry,
                symbol: {
                    type: "simple-line", width: 2, color: "blue", outline: { width: 0 }
                }
            }));
        });
        
        await sleep(1000);         
        // 05 - Finded Maximum Street Width
        const maxWidthMabarLength = Math.max(...validListMabar.map(f => f.attributes.street_len));
        console.log("Max: ", maxWidthMabarLength);

        const maxObjWidthMabar = validListMabar.reduce((prev, current) => {
            return (current.attributes.street_len > prev.attributes.street_len)
                ? current
                : prev;
        });
        graphicsLayer.add(new Graphic({
            geometry: maxObjWidthMabar.geometry,
            symbol: {
                type: "simple-line", width: 3, color: [121, 245, 39], outline: { width: 0 }
            }
        }));

        const fMaxObjWidthMabar = maxObjWidthMabar.attributes;
        console.log(`Max Object Name: ${fMaxObjWidthMabar.NAME}, Street length: ${fMaxObjWidthMabar.street_len}, Street99: ${fMaxObjWidthMabar.street_99}`);


    } catch (err) {
        console.error(`There is an Error in finding the maximum width of Street.`, err); //En
        //console.error(`در یافتن حداکثر عرض خیابان خطایی وجود دارد.`, err); //Pr
    }
}

/**
 * Find Feature in a Feature Layer with field & value
 * @param {object} featureLayer FeatureLayer
 * @param {string} field 
 * @param {string} value
 * @returns {object} Feature 
 */
async function SelectByAttribute(featureLayer, field, value) {
    let query = featureLayer.createQuery();
    query.returnGeometry = true;
    query.outFields = ["*"];    
    query.where = `${field} = '${value}'`;
    const result = await featureLayer.queryFeatures(query);    
    if (result.features.length < 1)
        console.log("Feature not found."); //En
        //console.log("عارضه مورد نظر یافت نشد."); //Pr    
    return result.features;
}

/**
 * Find Feature in a Feature Layer with relationship
 * @param {object} featureLayer FeatureLayer
 * @param {object} geometry 
 * @param {string} relationship
 * @returns {object} Feature 
 */
async function SelectByLocation(featureLayer, geometry, relationship) {
    let query = featureLayer.createQuery();
    query.returnGeometry = true;
    query.geometry = geometry;
    query.spatialRelationship = relationship;
    const result = await featureLayer.queryFeatures(query);
    if (result.features.length < 1)
        console.log("Feature not found."); //En
        //console.log("عارضه مورد نظر یافت نشد."); //Pr
    return result.features;
}

/**
 * Validation for map service URL
 * @param {string} url
 * @returns {boolean}
 */
function URLMapServiceValidation(url) {
    // The type of URL must be String
    if (!url || typeof url !== "string") throw new Error("The type of URL must be String."); //En
    //if (!url || typeof url !== "string") throw new Error("نوع آدرس سرویس نقشه باید رشته‌ای باشد."); //Pr
    return true;
}

/**
 * Validation for Code Nosazi Melk
 * @param {string} cNosazi
 * @returns {boolean}
 */
function CNosaziMelkValidation(cNosazi) {
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

/**
 * Finding the right Mabar
 * @param {object} listMabar
 * @param {object} melk
 * @returns {features}
 */
async function MabarValidation(listMabar, melk) {
    
    let validListMabar = [];

    for (const mabar of listMabar) {
        // Create flat buffer
        const widthMabar = mabar.attributes.street_len;
        if (!widthMabar || widthMabar === 0 || widthMabar == undefined || widthMabar == "")
            console.warn(`The width of Street{${mabar.attributes.OBJECTID}} is not ture.`); //En
            //console.warn(`عرض معبر {${mabar.attributes.OBJECTID}} صحیح نیست.`); //Pr
        

        const distansBuffMabar = widthMabar / 2 + 2;
        const buffMabar = FlatBuffer(mabar.geometry, distansBuffMabar, "meters");

        // Query parcels inside buffer
        //const query = fLayerMelk.createQuery();
        //query.outFields = ["Code_nosazi"];
        //query.geometry = buffMabar;
        //query.spatialRelationship = "intersects";

        //const result = await fLayerMelk.queryFeatures(query);
        const result = await SelectByLocation(fLayerMelk, buffMabar, "intersects");

        const isSelectedMelkInside = result.some(f =>
            f.attributes.Code_nosazi === melk.attributes.Code_nosazi
        );

        console.log("Have Melk:", isSelectedMelkInside);

        if (isSelectedMelkInside) validListMabar.push(mabar);
    }
    return validListMabar;
}
/**
 * Create flat buffer
 * @param {object} line
 * @param {number} distance
 * @param {string} unit
 * @returns {feature} Polygon
 */
function FlatBuffer(line, distance, unit = "meters") {
    // Create left offset
    const left = geometryEngine.offset(
        line,
        distance,
        unit,
        "butt",   // endType: flat
        "miter"   // joinType: sharp edges
    );

    // Create right offset
    const right = geometryEngine.offset(
        line,
        -distance,
        unit,
        "butt",
        "miter"
    );

    // Union both sides: polygon
    return geometryEngine.union([left, right]);
}



// Sleep 
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }


