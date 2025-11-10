// === Imports ===
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


// === Map Init ===
const map = new Map({
    basemap: "osm"
});

const view = new MapView({
    map,
    container: "mapView",
});
view.ui.remove("attribution");

// === Layers ===
const url = "http://localhost:6080/arcgis/rest/services/Maryanaj/Maryanaj/MapServer";

const darkhastFLayer = new FeatureLayer({
    url: `${url}/0`,
    popupTemplate: {
        title: "Darkhast",
        content: [
            {
                type: "fields",
                fieldInfos: [
                    { fieldName: "shodarkhast", label: "شماره درخواست" },
                    { fieldName: "noedarkhast", label: "نوع درخواست" },
                ],
            },
        ],
    },
});

const arseFLayer = new FeatureLayer({ url: `${url}/9` });
const graphicsLayer = new GraphicsLayer();

map.addMany([arseFLayer, darkhastFLayer, graphicsLayer]);

// === Add Home Widget ===
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

view.whenLayerView(darkhastFLayer)
    .then(async () => {
        const layer = darkhastFLayer ?? arseFLayer;
        await layer.when();

        const { fullExtent } = layer;
        if (!fullExtent) {
            console.error("Layer fullExtent unavailable");
            return;
        }

        // Set map constraints
        view.constraints = { geometry: fullExtent, minZoom: 14 };

        try {
            await view.goTo(fullExtent, { animate: false });

            const newLeftPolygon = await CreateNonIntersectingLeftPolygon(view, arseFLayer, fullExtent);

            window.leftPolygon = newLeftPolygon;

        } catch (err) {
            console.error("Error in map rendering:", err);
        }
    })
    .catch(err => console.error("Error loading layer:", err));

async function CreateNonIntersectingLeftPolygon(view, arseFLayer, fullExtent) {
    const width = fullExtent.xmax - fullExtent.xmin;
    const height = fullExtent.ymax - fullExtent.ymin;
    const offset = width * 0.2;

    let attempt = 0;
    let maxAttempts = 10;
    let leftPolygon = null;

    while (attempt < maxAttempts) {
        const shiftX = attempt * offset * 0.5;  // move left each time
        const leftExtent = new Extent({
            xmin: fullExtent.xmin - shiftX,
            xmax: fullExtent.xmin + offset - shiftX,
            ymin: fullExtent.ymax - offset + shiftX,
            ymax: fullExtent.ymax + shiftX,
            spatialReference: fullExtent.spatialReference
        });

        const { xmin, ymin, xmax, ymax, spatialReference } = leftExtent;
        const candidatePolygon = new Polygon({
            rings: [
                [xmin, ymin],
                [xmin, ymax],
                [xmax, ymax],
                [xmax, ymin],
                [xmin, ymin]
            ],
            spatialReference
        });

        const intersects = await DoesIntersect(candidatePolygon, arseFLayer);
        if (!intersects) {
            leftPolygon = candidatePolygon;
            console.log(`Found non-intersecting polygon after ${attempt + 1} tries`);
            break;
        }

        console.log(`Attempt ${attempt + 1}: polygon intersects — retrying...`);
        attempt++;
    }

    if (!leftPolygon) {
        console.warn("Could not find non-intersecting polygon within max attempts");
        return;
    }

    // Draw final polygon
    view.graphics.add(new Graphic({
        geometry: leftPolygon,
        symbol: {
            type: "simple-fill",
            color: [0, 255, 0, 0.2],
            outline: { color: [0, 255, 0], width: 2 }
        }
    }));    
    return leftPolygon;
}

async function DoesIntersect(polygon, layer) {
    const query = layer.createQuery();
    query.geometry = polygon;
    query.spatialRelationship = "intersects";
    query.returnGeometry = false;

    const result = await layer.queryFeatures(query);
    return result.features.length > 0;
}

async function GetPolygonByAttribute(field, value) {
    try {
        if (!arseFLayer) {
            console.error("GetPolygonByAttribute error: arseFLayer is not defined.");
            return null;
        }

        // Prepare query more efficiently
        const query = arseFLayer.createQuery();
        query.where = `${field} = '${value}'`;
        query.returnGeometry = true;
        query.outFields = [];
        query.num = 1; // only need the first feature

        const { features } = await arseFLayer.queryFeatures(query);

        // Return geometry safely, fallback to global leftPolygon
        return features.length > 0 ? features[0].geometry : (window.leftPolygon ?? null);

    } catch (err) {
        console.error("GetPolygonByAttribute error:", err);
        return null;
    }
}

async function GenerateValidPointInPolygon(polygon, shoD = 0, maxAttempts = 200) {
    if (!polygon || !geometryEngine.isSimple(polygon)) {
        console.error("Invalid or non-simple polygon provided.");
        return null;
    }

    const { extent, spatialReference } = polygon;
    const dx = extent.xmax - extent.xmin;
    const dy = extent.ymax - extent.ymin;

    // Precompute layer query template (reduces object creation cost per iteration)
    const baseQuery = darkhastFLayer.createQuery();
    baseQuery.spatialRelationship = "intersects";
    baseQuery.returnGeometry = false; // No need for geometry if only checking existence
    baseQuery.outFields = [];

    for (let i = 0; i < maxAttempts; i++) {
        // Random coordinate inside polygon extent
        const x = extent.xmin + Math.random() * dx;
        const y = extent.ymin + Math.random() * dy;
        const candidate = new Point({ x, y, spatialReference });

        // Skip if point not in polygon
        if (!geometryEngine.contains(polygon, candidate)) continue;

        // Small buffer (in meters) to check spatial overlap
        const buffer = geometryEngine.buffer(candidate, 1, "meters");

        // Reuse query object to reduce GC overhead
        baseQuery.geometry = buffer;

        // queryFeatureCount is much faster than queryFeatures
        const count = await darkhastFLayer.queryFeatureCount(baseQuery);
        if (count === 0) {
            return {
                geometry: candidate,
                attributes: { ShoD: shoD }
            };
        }
    }

    console.warn("No valid point found in polygon after", maxAttempts, "attempts.");
    return null;
}

async function CreateDarkhastPoint(cNosazi) {
    try {
        // Step 1: Get polygon by attribute
        const polygon = await GetPolygonByAttribute("Code_nosazi", cNosazi);
        if (!polygon) {
            console.warn(`Polygon not found for Code_nosazi = ${cNosazi}`);
            return null;
        }

        // Step 2: Generate a valid point inside polygon
        const pointData = await GenerateValidPointInPolygon(polygon);
        if (!pointData?.geometry) {
            console.warn("Could not generate a valid point in polygon.");
            return null;
        }

        const pGeo = pointData.geometry;

        // Step 3: Ensure spatial reference is valid
        const sr = pGeo.spatialReference || arseFLayer.geometry.spatialReference;
        if (!sr?.wkid) {
            console.error("Missing spatial reference (wkid).");
            return null;
        }

        pGeo.spatialReference = sr;

        // Step 4: Draw the point on map
        graphicsLayer.add(new Graphic({
            geometry: pGeo,
            symbol: {
                type: "simple-marker",
                color: "red",
                size: 6,
                outline: { color: "white", width: 1 }
            },
            attributes: pointData.attributes
        }));
        return {
            wkt: `POINT(${pGeo.x} ${pGeo.y} 0)`,
            wkid: sr.wkid
        };
    } catch (err) {
        console.error("CreateDarkhastPoint error:", err);
        return null;
    }
}

window.GisDarkhast = async function (listDarkhat) {    
    if (!Array.isArray(listDarkhat) || listDarkhat.length === 0) {
        console.warn("The input must be an array of codes.");
        return [];
    }

    const results = [];
    for (var i = 0; i < listDarkhat.length; i++) {
        try {
            const shape = await CreateDarkhastPoint(listDarkhat[i].cNosazi);            
            if (shape && listDarkhat[i].shodarkhast && shape.wkt) {
                results.push({ Shod: listDarkhat[i].shodarkhast, ...shape });

                const response = await fetch('/Home/updateDarkhast', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ Shod: listDarkhat[i].shodarkhast, ...shape })
                });

                const res = await response.json();
                if (!res.success) {
                    console.warn(` Unsuccessful: ${res.message}`);
                } else {
                    console.log(`Successful save`);
                }

            } else {
                console.warn(`No points found for ${listDarkhat[i].cNosazi}.`);
            }
        } catch (err) {
            console.error(`Error processing:`, err);
        }
    }
    return results;
};

async function CheckDarkhastInParcel1(darkhast, arseFLayer) {
    //const code = normalizeCodeNosazi(darkhast.cNosazi);
    //if (!code) return { ...darkhast, valid: false, reason: "Invalid codeNosazi" };

    const query = arseFLayer.createQuery();
    query.where = `Code_nosazi = '${darkhast.cNosazi}'`;
    query.returnGeometry = true;
    query.outFields = ["*"];
    const parcelResult = await arseFLayer.queryFeatures(query);
    let parcelGeom;

    if (parcelResult.features.length === 0) {
        if (!window.leftPolygon) {
            console.warn("Left polygon is not ready");
            return { ...darkhast, valid: false, reason: "Parcel not found and no leftPolygon" };
        }
        parcelGeom = window.leftPolygon;
    } else {
        parcelGeom = parcelResult.features[0].geometry;
    }
    if (!parcelGeom) {
        console.warn("Parcel geometry is undefined");
        return { ...darkhast, valid: false, reason: "Parcel geometry undefined" };
    }
    let point = ParselWKTPoint(darkhast.shape);
    if (!point) return { ...darkhast, valid: false, reason: "Invalid shape" };

    // SpatialReference validation
    if (point.spatialReference?.wkid !== parcelGeom.spatialReference?.wkid) {
        point = projection.project(point, parcelGeom.spatialReference);
    }

    const inside = geometryEngine.contains(parcelGeom, point);
    return { ...darkhast, valid: inside, reason: inside ? "Inside parcel" : "Outside parcel" };
}
async function CheckDarkhastInParcel(darkhast, arseFLayer) {

    const query = arseFLayer.createQuery();
    query.where = `Code_nosazi = '${darkhast.cNosazi}'`;
    query.returnGeometry = true;
    query.outFields = ["*"];
    //console.log("checkParcl: ", darkhast.cNosazi);

    const parcelResult = await arseFLayer.queryFeatures(query);
    let parcelGeom = parcelResult.features[0]?.geometry || window.leftPolygon;

    if (!parcelGeom) {
        return { ...darkhast, valid: false, reason: "Parcel not found" };
    }

    let point = ParselWKTPoint(darkhast.shape);
    if (!point) return { ...darkhast, valid: false, reason: "Invalid shape" };

    // هماهنگ‌سازی SpatialReference
    if (point.spatialReference?.wkid !== parcelGeom.spatialReference?.wkid) {
        point = projection.project(point, parcelGeom.spatialReference);
    }

    const inside = geometryEngine.contains(parcelGeom, point);
    return { ...darkhast, valid: inside };
}

function ParselWKTPoint(wkt) {
    try {
        const match = wkt.match(/POINT\s*\(\s*([0-9.+-]+)\s+([0-9.+-]+)\s*\)/i);
        if (!match) return null;

        return new Point({
            x: parseFloat(match[1]),
            y: parseFloat(match[2]),
            //spatialReference: { wkid: 4326 } // adjust to your SR
            spatialReference: { wkid: arseFLayer.spatialReference?.wkid || 32639 }
        });
    } catch {
        return null;
    }
}

async function fetchBatch(skip, batchSize = 100) {
    const response = await fetch(`/Home/GetAllDarkhastBatch?skip=${skip}&batchSize=${batchSize}`);
    return response.json();
}

async function fetchAllBatches(totalCount, batchSize = 100, concurrency = 5) {    
    const skips = [];
    for (let s = 0; s < totalCount; s += batchSize) {
        skips.push(s);
    }

    let active = 0;
    let index = 0;
    let results = [];

    return new Promise((resolve, reject) => {
        function next() {            
            // همه Batch‌ها تمام شده؟
            if (index >= skips.length && active === 0) {
                return resolve(results);
            }            
            // اگر می‌توانیم کارگر جدید فعال کنیم
            while (active < concurrency && index < skips.length) {                
                const currentSkip = skips[index++];
                active++;
                fetchBatch(currentSkip)
                    .then(res => {
                        results.push(res);
                        UpdateProgressbar(progressbar1, Math.round(results.length / skips.length * 100));                        
                        //console.log(`Batch ${currentSkip} loaded.`);
                    })
                    .catch(err => console.error("Batch error:", err))
                    .finally(() => {
                        active--;
                        next(); // کارگر بعدی
                    });
            }
        }

        next();
    });
}

async function loadAllDarkhast() {
    RestProgressbar(progressbar1);
    // اول یک Batch کوچک می‌گیریم تا totalCount را بفهمیم
    const first = await fetchBatch(0, 1);

    const totalCount = first.totalCount;

    console.log("Total records:", totalCount);

    const all = await fetchAllBatches(totalCount, 100, 5);

    // ادغام همهٔ دیتای دریافتی
    let listWithShape = [];
    let listWithoutShape = [];

    for (let batch of all) {
        listWithShape.push(...batch.listWithShape);
        listWithoutShape.push(...batch.listWithoutShape);
    }

    console.log("DONE ✅");
    console.log("Total with shape:", listWithShape.length);
    console.log("Total without shape:", listWithoutShape.length);

    return { listWithShape, listWithoutShape };
}

async function checkInBatches(list, batchSize = 100) {
    const valid = [];
    const invalid = [];

    for (let i = 0; i < list.length; i += batchSize) {
        const batch = list.slice(i, i + batchSize);        
        const results = await Promise.all(
            batch.map(d => CheckDarkhastInParcel(d, arseFLayer))
        );

        results.forEach(r => {
            if (r.valid) valid.push(r);
            else invalid.push(r);
        });        
        UpdateProgressbar(progressbar2, Math.round((valid.length + invalid.length) / list.length * 100));
        console.log(`Batch ${Math.floor(i / batchSize) + 1} processed (${batch.length} items)`);
    }

    return { valid, invalid };
}

async function processBatches(list, batchSize, processorFn) {
    let results = [];

    for (let i = 0; i < list.length; i += batchSize) {
        const batch = list.slice(i, i + batchSize);

        const batchResult = await processorFn(batch);
        if (Array.isArray(batchResult)) {
            results = results.concat(batchResult);
        }

        console.log(`Processed batch ${Math.floor(i / batchSize) + 1}`);
    }

    return results;
}

// btn Update XY Darkhast
const btnUpdateXYDarkhast = document.getElementById("btnUpdateXYDarkhast");
//btnSelect.classList = "esri-widget esri-widget--button esri-interactive";
view.ui.add(btnUpdateXYDarkhast, "top-right");
//btnUpdateXYDarkhast.addEventListener("click", async () => {
//    try {
//        console.log("Starting to receive data from Shahrsazi");                
//        const { listWithShape, listWithoutShape } = await loadAllDarkhast();
//        console.log(`With shape: ${listWithShape.length}, Without shape: ${listWithoutShape.length}`);

//        // ----------------------------------------------------------
//        // STEP A — Check “with shape” points inside parcel
//        // ----------------------------------------------------------
//        const invalidWithShape = [];
//        const validWithShape = [];        
        
//        for (const d of listWithShape) {            
//            const res = await CheckDarkhastInParcel(d, arseFLayer);
//            if (res.valid) {
//                validWithShape.push(res);
//            } else {
//                console.warn(`${res.cNosazi} point outside parcel → will reprocess`);
//                invalidWithShape.push(res);

//                // visualize red point
//                const point = ParselWKTPoint(d.shape);
//                if (point) {
//                    view.graphics.add(new Graphic({
//                        geometry: point,
//                        symbol: {
//                            type: "simple-marker",
//                            color: [255, 0, 0, 0.8],
//                            size: 6,
//                            outline: { color: "white", width: 0.5 }
//                        }
//                    }));
//                }
//            }
//        }

//        console.log(`Inside parcel: ${validWithShape.length}, Outside parcel: ${invalidWithShape.length}`);

//        // ----------------------------------------------------------
//        // STEP B — Merge invalid-with-shape with no-shape list
//        // ----------------------------------------------------------
//        const reprocessList = [...listWithoutShape, ...invalidWithShape]; 

//        // ----------------------------------------------------------
//        // STEP C — Generate new points for reprocess list
//        // ----------------------------------------------------------
//        if (reprocessList.length > 0) {
            
//            const results = await GisDarkhast(reprocessList);
//            if (results)
//                console.log(`New points created: ${results.length}/${reprocessList.length}`);
//        }

//    } catch (err) {
//        console.error("Error in the XY Darkhast update process:", err);
//    }
//});
btnUpdateXYDarkhast.addEventListener("click", async () => {
    try {
        console.log("Starting to receive data from Shahrsazi");
        RestProgressbar(progressbar1);
        RestProgressbar(progressbar2);
        RestProgressbar(progressbar3);
        ShowProgressbar();

        // دریافت لیست‌ها
        const { listWithShape, listWithoutShape } = await loadAllDarkhast();
        console.log(`With shape: ${listWithShape.length}, Without shape: ${listWithoutShape.length}`);
        
        // ----------------------------------------------------------
        // ✅ STEP A — Batch check “with shape” data (100 by 100)
        // ----------------------------------------------------------
        const { valid, invalid } = await checkInBatches(listWithShape, 100);
        console.log(`Inside parcel: ${valid.length}, Outside parcel: ${invalid.length}`);
        return;
        // نمایش red point فقط برای invalid‌ها
        invalid.forEach(d => {
            const point = ParselWKTPoint(d.shape);
            if (point) {
                view.graphics.add(new Graphic({
                    geometry: point,
                    symbol: {
                        type: "simple-marker",
                        color: [0, 255, 0, 0.8],
                        size: 6,
                        outline: { color: "white", width: 0.5 }
                    }
                }));
            }
        });

        // ----------------------------------------------------------
        // ✅ STEP B — Merge invalid-with-shape with no-shape list
        // ----------------------------------------------------------
        const reprocessList = [...listWithoutShape, ...invalid];
        console.log("Total reprocess count:", reprocessList.length);

        // ----------------------------------------------------------
        // ✅ STEP C — Generate new points in batches (100 by 100)
        // ----------------------------------------------------------
        if (reprocessList.length > 0) {
            const results = await processBatches(reprocessList, 100, GisDarkhast);
            console.log(`New points created: ${results.length}/${reprocessList.length}`);
        }

    } catch (err) {
        console.error("Error in the XY Darkhast update process:", err);
    }
});

// =============== Progressbar hanlder ===============
const divprogressbar = document.getElementById("divProgressbar");
const btnStartProgressbar = document.getElementById("btnStartProgressbar");
const progressbar1 = document.getElementById("progressbar1");
const progressbar2 = document.getElementById("progressbar2");
const progressbar3 = document.getElementById("progressbar3");

btnStartProgressbar.addEventListener("click", () => {    
    ShowProgressbar();    
    UpdateProgressbar(25);    
});
function RestProgressbar(progressbar) {
    UpdateProgressbar(progressbar, 0);     
}
function ShowProgressbar(Show = true) {    
    divprogressbar.hidden = !Show;
}
function UpdateProgressbar(progressbar, prsent) {    
    progressbar.style.width = progressbar.textContent = `${prsent}%`;
}


// === Sketch Init ===
const sketchLayer = new GraphicsLayer();
map.add(sketchLayer);

const sketch = new Sketch({
    layer: sketchLayer,
    view: view,
    creationMode: "single",
    visibleElements: {
        //selectionTools: { "rectangle": true },
        //settingsMenu: false,
        createTools: {
            point: false,
            polyline: false,
            circle: false,
            rectangle: false
        },
        selectionTools: {
            "rectangle-selection": false,
        },
        settingsMenu: false
    }
});

reactiveUtils.when(() => sketch.state === "active", () => {
    sketch.on("create", async (event) => {
        if (event.state === "complete") {
            const geometry = event.graphic.geometry;

            // پاک‌کردن محدوده قبلی
            sketchLayer.removeAll();
            sketchLayer.add(event.graphic);

            // جستجوی فیچرهای داخل محدوده
            const query = darkhastFLayer.createQuery();
            query.geometry = geometry;
            query.spatialRelationship = "intersects";
            query.returnGeometry = true;
            query.outFields = ["*"];

            const result = await darkhastFLayer.queryFeatures(query);

            // نمایش انتخاب‌شده‌ها
            graphicsLayer.removeAll();
            result.features.forEach((f) => {
                f.symbol = {
                    type: "simple-fill",
                    color: [0, 0, 255, 0.2],
                    outline: { color: "blue", width: 2 }
                };
                graphicsLayer.add(f);
            });

            console.log("Selected features:", result.features);
        }
    });
});

document.getElementById("btnSabtDarkhast").addEventListener("click", async () => {
    const shp = await CreateDarkhastPoint("501-8-4-28-0-0-0");
    console.log("Shape:", shp);
});

document.getElementById("testConnection").addEventListener("click", async () => {
    try {
        const res = await fetch("/Home/testConnection");
        const data = await res.json();
        alert(data.result);
    } catch (err) {
        alert("Error: " + err);
    }
});

