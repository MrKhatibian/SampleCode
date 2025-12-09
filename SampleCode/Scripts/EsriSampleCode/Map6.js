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

/**
 * Find nearest Melk price
 * @param {string} cNosazi
 */
async function FindNearestMelkAPI(cNosazi) {
    if (!CNosaziMelkValidation(cNosazi)) return null;
    
    // 01 - Created graphicslayer        
    const gLayerFindNearestMelk = new GraphicsLayer();
    map.add(gLayerFindNearestMelk);
    gLayerFindNearestMelk.removeAll();

    // 02 - Filter feature layer Melk for have a price
    fLayerMelk.definitionExpression = `Max_price_ > 0`;

    // 03 - Find nearest Melk
    const fnearestMelk = await FindNearestMelk(fLayerMelk, gLayerFindNearestMelk);
    const arzeshMelk = fnearestMelk.attributes.Max_price_;
    console.log("Price nearest Melk: ", fnearestMelk.attributes.Max_price_);

    const response = await fetch('/Home/SetNearestArzeshAmlak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cNosazi, arzeshMelk })
    });

    const res = await response.json();
    if (!res.success) {
        console.warn(` Unsuccessful: ${res.message}`);
    } else {
        console.log(`Successful save`);
    }
}


const btnFindNearestMelk = document.getElementById("btnFindNearestMelk");
btnFindNearestMelk.addEventListener("click", async () => {
    FindNearestMelkAPI("1-25-156-15-0-0-0");
});

async function FindNearestMelk(featureLayer, graphicslayer, targetFeature, counter = 5, searchDistance = 100) {
    
    const selectFeatures = await SelectByAttribute(fLayerMelk, "Code_Nosazi", "1-25-156-15-0-0-0");
    if (selectFeatures.length < 1) return console.Error("Not find any Melk.");
    const geoSelectFeature = selectFeatures[0].geometry;                  

    // 01 - Get geometry Harim
    const queryHarim = fLayerHarim.createQuery();
    queryHarim.returnGeometry = true;
    const resultHarim = await fLayerHarim.queryFeatures(queryHarim);
    if (resultHarim.features.length < 1) return console.error("Not find any Harim.")

    // if Harim have a multi features
    const geoHarim = resultHarim.features.length === 1
        ? resultHarim.features[0].geometry
        : geometryEngine.union(resultHarim.features.map(f => f.geometry));
    

    // 02 - Get geometry Mahdodeh
    const queryMahdodeh = fLayerMahdodeh.createQuery();
    queryMahdodeh.returnGeometry = true;
    const resultMahdodeh = await fLayerMahdodeh.queryFeatures(queryMahdodeh);
    if (resultMahdodeh.features.length < 1) return console.error("Not find any Mahdodeh.")

    const geoMahdodeh = resultMahdodeh.features.length === 1
        ? resultMahdodeh.features[0].geometry
        : geometryEngine.union(resultMahdodeh.features(f => f.geometry));

    // 03 - Get geometry between in Harim and Mahdodeh
    const geoBetween = geometryEngine.difference(geoHarim, geoMahdodeh);  
    searchDistance = Math.round(FindMaxDistanceInPolygon(geoBetween) / 5);
    //graphicslayer.add(new Graphic({
    //    geometry: geoBetween,
    //    symbol: { type: "simple-fill", color: [0, 0, 255, 0.5], outline: { color: "blue" } }
    //})); // for Show in Webgis
    
    // 04 - Location validation for selected Melk
    const locationValidSelectedMelk = geometryEngine.intersects(geoBetween, geoSelectFeature)
    if (!locationValidSelectedMelk) return console.error("Melk is outside of Harim's boudary");

    // 05 - Show Selected Melk in Map
    graphicslayer.add(new Graphic({
        geometry: geoSelectFeature,
        symbol: {
            type: "simple-fill", color: [0, 0, 255, 0.1], outline: { color: [39, 235, 245] }
        }
    }));
    //view.goTo({
    //    target: geoSelectFeature,
    //    zoom: 17
    //});
    view.goTo(geoSelectFeature);

    await sleep(1000);

    // 06 - Create buffer around of Selected melk    
    let bufferDistance = searchDistance;
    const maxDistance = 5 * searchDistance;
    let candidateFeatures = [];

    while (candidateFeatures.length < 1 && bufferDistance <= maxDistance) {

        console.log("Searching with buffer:", bufferDistance);
        // Create buffer
        const buffSelectFeature = geometryEngine.buffer(geoSelectFeature, bufferDistance, "meters");        
        graphicslayer.add(new Graphic({
            geometry: buffSelectFeature,
            symbol: {
                type: "simple-fill", color: [164, 230, 41, 0.2], outline: { color: [31, 100, 50] }
            }
        }));
        view.goTo(buffSelectFeature);

        // Get candidate Melks
        let result = await SelectByLocation(fLayerMelk, buffSelectFeature, "intersects");        
        result = result.filter(f => geometryEngine.intersects(f.geometry, geoMahdodeh));
        candidateFeatures = result;

        // Loop
        if (candidateFeatures.length < 1) { bufferDistance += searchDistance; }
        await sleep(100);
    }
        
    if (candidateFeatures.length < 1) {
        return console.error("Not find any Candidate Melk even with max buffer.");        
    } else {
        console.log("Found candidates:", candidateFeatures.length);
    }


    //// 06 - Create buffer around of Selected melk
    //const buffSelectFeature = geometryEngine.buffer(geoSelectFeature, searchDistance, "meters");
    //graphicslayer.add(new Graphic({
    //    geometry: buffSelectFeature,
    //    symbol: {
    //        type: "simple-fill", color: [164, 230, 41, 0.2], outline: { color: [31, 100, 50] }
    //    }
    //}));
    //view.goTo(buffSelectFeature);
    
    //// 07 - Get candidate Melks
    //let candidateFeatures = await SelectByLocation(fLayerMelk, buffSelectFeature, "intersects");
    //if (candidateFeatures.length < 1) return console.error("Not find any Candidate Melk.");
    //candidateFeatures = candidateFeatures.filter(f => {
    //    const insideMahdode = geometryEngine.intersects(f.geometry, geoMahdodeh);
    //    return insideMahdode === true;
    //});

    // 08 - Calculation distance between selected Melk and candidate Melks
    let distance = [];
    candidateFeatures.forEach(f => {
        if (f.geometry.extent.equals(geoSelectFeature.extent) ) return;
        const d = geometryEngine.distance(geoSelectFeature, f.geometry, "meters");
        distance.push({
            distance: d,
            feature: f
        });
    });


    // 09 - Find minimum distance
    distance.sort((a, b) => a.distance - b.distance);    

    let nearestMelk = distance[0];
    graphicslayer.add(new Graphic({
        geometry: nearestMelk.feature.geometry,
        symbol: {
            type: "simple-fill", color: [0, 255, 0, 0.2], outline: "green"
        }
    }));
    console.log(nearestMelk);
    return nearestMelk.feature;
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


    // View Filter
    //const viewMelk = await view.whenLayerView(fLayerMelk);
    //viewMelk.filter = { geometry: geoHarim, spatialRelationship: "contains" };

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

const btnPolygonDistance = document.getElementById("btnPolygonDistance");
btnPolygonDistance.addEventListener("click", async() => {    

    // 01 - Get geometry Harim
    const queryHarim = fLayerHarim.createQuery();
    queryHarim.returnGeometry = true;
    const resultHarim = await fLayerHarim.queryFeatures(queryHarim);
    if (resultHarim.features.length < 1) return console.error("Not find any Harim.")

    // if Harim have a multi features
    const geoHarim = resultHarim.features.length === 1
        ? resultHarim.features[0].geometry
        : geometryEngine.union(resultHarim.features.map(f => f.geometry));


    // 02 - Get geometry Mahdodeh
    const queryMahdodeh = fLayerMahdodeh.createQuery();
    queryMahdodeh.returnGeometry = true;
    const resultMahdodeh = await fLayerMahdodeh.queryFeatures(queryMahdodeh);
    if (resultMahdodeh.features.length < 1) return console.error("Not find any Mahdodeh.")

    const geoMahdodeh = resultMahdodeh.features.length === 1
        ? resultMahdodeh.features[0].geometry
        : geometryEngine.union(resultMahdodeh.features(f => f.geometry));

    // 03 - Get geometry between in Harim and Mahdodeh
    const geoBetween = geometryEngine.difference(geoHarim, geoMahdodeh);  
    
    console.log(FindMaxDistanceInPolygon(geoBetween));
})
function FindMaxDistanceInPolygon(polygon) {
    // 04 - Calculate convex hull
    const hull = geometryEngine.convexHull(polygon);

    // 05 - Convert to Points
    const hullPoints = hull.rings[0].map(r => ({ x: r[0], y: r[1] }));

    // 06 - Calculate maximum distance
    const maxDistance = PolygonDiameter(hullPoints);
    return maxDistance;
}
function PolygonDiameter(points) {
    
    const n = points.length;
    if (n < 2) return 0;

    let k = 1
    let maxDistance = 0;

    for (let i = 0; i < n; i++) {
        let next_i = (i + 1) % n;

        while (true) {
            let next_k = (k + 1) % n;
            const area = Math.abs(
                (points[next_i].x - points[i].x) * (points[next_k].y - points[k].y) -
                (points[next_i].y - points[i].y) * (points[next_k].x - points[k].x)
            );
            if (area > 0) k = next_k;
            else break;
        }
        let d = Distance(points[i], points[k])
        if (d > maxDistance) maxDistance = d;
    }
    return maxDistance;
}

function Distance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

// Sleep 
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }


