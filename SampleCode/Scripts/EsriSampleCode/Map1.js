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

            const newLeftPolygon = await createNonIntersectingLeftPolygon(view, arseFLayer, fullExtent);

            window.leftPolygon = newLeftPolygon;

        } catch (err) {
            console.error("Error in map rendering:", err);
        }
    })
    .catch(err => console.error("Error loading layer:", err));

async function createNonIntersectingLeftPolygon(view, arseFLayer, fullExtent) {
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

        const intersects = await doesIntersect(candidatePolygon, arseFLayer);
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

async function doesIntersect(polygon, layer) {
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

async function GenerateValidPointInPolygon(polygon, ShoDValue = 0, maxAttempts = 200) {
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
                attributes: { ShoD: ShoDValue }
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

window.gisDarkhast = async function (darkhast) {
    debugger;
    if (!Array.isArray(darkhast) || darkhast.length === 0) {
        console.warn("The input must be an array of codes.");
        return [];
    }

    const results = [];
    for (var i = 0; i < darkhast.length; i++) {
        try {
            const shape = await CreateDarkhastPoint(darkhast[i].cNosazi);            
            if (shape && darkhast[i].shodarkhast && shape.wkt) {
                results.push({ Shod: darkhast[i].shodarkhast, ...shape });

                const response = await fetch('/Home/updateDarkhast', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ Shod: darkhast[i].shodarkhast, ...shape })
                });

                const res = await response.json();
                if (!res.success) {
                    console.warn(` ناموفق: ${res.message}`);
                } else {
                    console.log(`✅ ذخیره موفق`);
                }

            } else {
                console.warn(`نقطه‌ای برای ${darkhast[i].cNosazi} یافت نشد.`);
            }
        } catch (err) {
            console.error(`Error processing:`, err);
        }
    }
    return results;
};

async function checkDarkhastInParcel1(darkhast, arseFLayer) {
    
    const code = normalizeCodeNosazi(darkhast.cNosazi);
    if (!code) return { ...darkhast, valid: false, reason: "Invalid codeNosazi" };

    const query = arseFLayer.createQuery();
    query.where = `Code_nosazi = '${code}'`;
    query.returnGeometry = true;
    query.outFields = ["*"];
    const parcelResult = await arseFLayer.queryFeatures(query);
    let parcelGeom;
    if (parcelResult.features.length === 0) {
        if (!window.leftPolygon) {
            console.warn("Left polygon not ready or undefined");
            return { ...darkhast, valid: false, reason: "Parcel not found and leftPolygon not ready" };
        }
        parcelGeom = window.leftPolygon;
        //return { ...darkhast, valid: false, reason: "Parcel not found" };
    } else {
        parcelGeom = parcelResult.features[0].geometry;
    }
    if (!parcelGeom) {
        console.warn("Parcel geometry is undefined");
        return { ...darkhast, valid: false, reason: "Parcel geometry undefined" };
    }
    const point = parseWKTPoint(darkhast.shape);
    if (!point) return { ...darkhast, valid: false, reason: "Invalid shape" };

    const inside = geometryEngine.contains(parcelGeom, point);
    if (!inside) {
        //console.log(`LeftPolygon: ${leftPolygon.spatialReference.wkid}, Point: ${point.spatialReference.wkid}, parcelGeom: ${parcelGeom.spatialReference.wkid}`);
    }
    return { ...darkhast, valid: inside, reason: inside ? "Inside parcel" : "Outside parcel" };
}
async function checkDarkhastInParcel(darkhast, arseFLayer) {
    const code = normalizeCodeNosazi(darkhast.cNosazi);
    if (!code) return { ...darkhast, valid: false, reason: "Invalid codeNosazi" };

    const query = arseFLayer.createQuery();
    query.where = `Code_nosazi = '${code}'`;
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
    const point = parseWKTPoint(darkhast.shape);
    if (!point) return { ...darkhast, valid: false, reason: "Invalid shape" };

    // SpatialReference validation
    if (point.spatialReference?.wkid !== parcelGeom.spatialReference?.wkid) {
        point = projection.project(point, parcelGeom.spatialReference);
    }

    const inside = geometryEngine.contains(parcelGeom, point);
    return { ...darkhast, valid: inside, reason: inside ? "Inside parcel" : "Outside parcel" };
}

function parseWKTPoint(wkt) {
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

// btn Update XY Darkhast
const btnUpdateXYDarkhast = document.getElementById("btnUpdateXYDarkhast");
//btnSelect.classList = "esri-widget esri-widget--button esri-interactive";
view.ui.add(btnUpdateXYDarkhast, "top-right");

btnUpdateXYDarkhast.addEventListener("click", async () => {
    try {
        console.log("Starting to receive data from Shahrsazi");

        const allDarkhastList = await GetDarkhatFromShahrsazi();
        //if (!Array.isArray(allDarkhastList) || allDarkhastList.length === 0) {
        //    console.warn("No Darkhast were received from the Shahrsazi.");
        //    return;
        //}
        const { listWithShape, listWithoutShape } = await GetDarkhatFromShahrsazi1();
        debugger;

        //const darkhastWithShape = [];
        //const darkhastWithoutShape = [];

        //for (const darkhast of allDarkhastList) {
        //    const hasShape = darkhast.shape && darkhast.shape.trim() !== "";
        //    (hasShape ? darkhastWithShape : darkhastWithoutShape).push(darkhast);
        //}

        //console.log(`With shape: ${darkhastWithShape.length}, Without shape: ${darkhastWithoutShape.length}`);
        console.log(`With shape: ${listWithShape.length}, Without shape: ${listWithoutShape.length}`);

        // ----------------------------------------------------------
        // STEP A — Check “with shape” points inside parcel
        // ----------------------------------------------------------
        const invalidWithShape = [];
        const validWithShape = [];        
        
        for (const d of listWithShape) {            
            const res = await checkDarkhastInParcel(d, arseFLayer);
            if (res.valid) {
                validWithShape.push(res);
            } else {
                console.warn(`${res.cNosazi} point outside parcel → will reprocess`);
                invalidWithShape.push(res);

                // visualize red point
                const point = parseWKTPoint(d.shape);
                if (point) {
                    view.graphics.add(new Graphic({
                        geometry: point,
                        symbol: {
                            type: "simple-marker",
                            color: [255, 0, 0, 0.8],
                            size: 6,
                            outline: { color: "white", width: 0.5 }
                        }
                    }));
                }
            }
        }

        console.log(`Inside parcel: ${validWithShape.length}, Outside parcel: ${invalidWithShape.length}`);

        // ----------------------------------------------------------
        // STEP B — Merge invalid-with-shape with no-shape list
        // ----------------------------------------------------------
        const reprocessList = [...listWithoutShape, ...invalidWithShape];
        debugger;
        const reprocessListValid = reprocessList;
        //    .map(d => {
        //        const validCode = normalizeCodeNosazi(d.cNosazi);
        //        return validCode ? { ...d, cNosazi: validCode } : null;
        //    })
        //    .filter(Boolean);

        //console.log(`Total for regeneration: ${reprocessListValid.length}`);

        // ----------------------------------------------------------
        // STEP C — Generate new points for reprocess list
        // ----------------------------------------------------------
        if (reprocessListValid.length > 0) {
            
            const results = await gisDarkhast(reprocessListValid);
            if (results)
                console.log(`New points created: ${results.length}/${reprocessListValid.length}`);
        }

    } catch (err) {
        console.error("Error in the XY Darkhast update process:", err);
    }
});


async function GetDarkhatFromShahrsazi() {
    try {
        const response = await fetch("/Home/GetAllDarkhast", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message);
            return [];
        }

        return result.data; // [{shodarkhast:1, shParvandeh:'A123', shape:'POINT(...)'}, ...]
    } catch (err) {
        console.error("Error in GetDarkhatFromShahrsazi:", err);
        return [];
    }
}
async function GetDarkhatFromShahrsazi1() {
    try {
        const response = await fetch("/Home/GetAllDarkhast1", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        if (!result.success) { throw new Error(result.message); }
        return result;
        //const { listWithShape, listWithoutShape } = result;
        //console.log(listWithShape.length, listWithoutShape.length);
        //return result.data; // [{shodarkhast:1, shParvandeh:'A123', shape:'POINT(...)'}, ...]
    } catch (err) {
        console.error("Error in GetDarkhatFromShahrsazi1:", err);
        return [];
    }
}

function normalizeCodeNosazi(cNosazi) {
    if (!cNosazi || typeof cNosazi !== "string") return null;

    const parts = cNosazi.trim().split('-');
    if (parts.length !== 7) return null;

    // All Parts must be numeric
    if (parts.some(p => !/^\d+$/.test(p))) return null;

    // Sections 1, 2, 3, and 4 must not be blank or zero
    if (parts.slice(0, 4).some(p => p === "")) return null;

    // The last three parts must be exactly zero
    parts[4] = parts[5] = parts[6] = "0";

    return parts.join("-");
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

