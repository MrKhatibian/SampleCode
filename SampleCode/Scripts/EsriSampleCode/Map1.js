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

let leftExtent = new Extent();
view.whenLayerView(darkhastFLayer).then(function () {
    let layer = arseFLayer;
    if (darkhastFLayer) {
        layer = darkhastFLayer
    }
    view.goTo(layer.fullExtent, { animate: false })
        .catch(function (err) { console.error("Extent projection error: ", err) });

    // Limited View Extent and Zoom level
    const cityExtent = darkhastFLayer.fullExtent; // dynamic extent
    view.constraints = {
        geometry: cityExtent,
        minZoom: 13
    };
    console.log("cityExtent: ", cityExtent);
    // Creating polygons for DarkhaST that do not have Melk
    const width = cityExtent.xmax - cityExtent.xmin;
    const height = cityExtent.ymax - cityExtent.ymin;

    const lengthLeftExtent = width * 0.1; // یعنی 10 درصد فاصله


    //leftExtent = {
    //    xmin: cityExtent.xmin,
    //    ymax: cityExtent.ymax,
    //    xmax: cityExtent.xmin + lengthLeftExtent,
    //    ymin: cityExtent.ymax - lengthLeftExtent,

    //    spatialReference: cityExtent.spatialReference
    //};
    leftExtent.xmin = cityExtent.xmin;
    leftExtent.ymax = cityExtent.ymax;
    leftExtent.xmax = cityExtent.xmin + lengthLeftExtent;
    leftExtent.ymin = cityExtent.ymax - lengthLeftExtent;

    leftExtent.spatialReference = cityExtent.spatialReference;

    console.log("Right extent:", leftExtent);

    // اگر خواستی اون محدوده رو روی نقشه نشون بدی:
    view.graphics.add(new Graphic({
        geometry: leftExtent,
        symbol: {
            type: "simple-fill",
            color: [0, 0, 255, 0.1],
            outline: { color: [0, 0, 255], width: 2 }
        }
    }));
});


async function getPolygonByAttribute1(field, value) {
    try {
        const query = arseFLayer.createQuery();
        query.where = `${field} = '${value}'`;
        query.returnGeometry = true;
        query.outFields = ["*"];

        const result = await arseFLayer.queryFeatures(query);
        return result.features[0]?.geometry || null;
    } catch (err) {
        console.error("getPolygonByAttribute error:", err);
        return null;
    }
}
async function getPolygonByAttribute(field, value) {
    debugger;
    try {
        const query = arseFLayer.createQuery();
        query.where = `${field} = '${value}'`;
        query.returnGeometry = true;
        query.outFields = ["*"];

        const result = await arseFLayer.queryFeatures(query);
        return result.features[0]?.geometry || leftExtent;
    } catch (err) {
        console.error("getPolygonByAttribute error:", err);
        return null;
    }
}

async function generateValidPointInPolygon1(polygon, maxAttempts = 500) {
    const { extent, spatialReference } = polygon;

    for (let i = 0; i < maxAttempts; i++) {
        const x = extent.xmin + Math.random() * (extent.xmax - extent.xmin);
        const y = extent.ymin + Math.random() * (extent.ymax - extent.ymin);

        const candidate = new Point({ x, y, spatialReference });
        if (!geometryEngine.contains(polygon, candidate)) continue;

        const buffer = geometryEngine.buffer(candidate, 1, "meters");
        const query = darkhastFLayer.createQuery();
        query.geometry = buffer;
        query.spatialRelationship = "intersects";

        const { features } = await darkhastFLayer.queryFeatures(query);
        if (!features.length) return candidate;
    }

    console.warn("No valid point found in polygon.");
    return null;
}
async function generateValidPointInPolygon(polygon, ShoDValue = 0, maxAttempts = 200) {
    debugger
    const { extent, spatialReference } = polygon;

    for (let i = 0; i < maxAttempts; i++) {
        const x = extent.xmin + Math.random() * (extent.xmax - extent.xmin);
        const y = extent.ymin + Math.random() * (extent.ymax - extent.ymin);

        const candidate = new Point({ x, y, spatialReference });
        if (!geometryEngine.contains(polygon, candidate)) continue;

        const buffer = geometryEngine.buffer(candidate, 1, "meters");
        const query = darkhastFLayer.createQuery();
        query.geometry = buffer;
        query.spatialRelationship = "intersects";

        const { features } = await darkhastFLayer.queryFeatures(query);
        if (!features.length) {
            return {
                geometry: candidate,
                attributes: {
                    ShoD: ShoDValue
                }
            };
        }
    }

    console.warn("No valid point found in polygon.");
    return null;
}

async function createDarkhastPoint1(nCode) {
    graphicsLayer.removeAll();

    const polygon = await getPolygonByAttribute("Code_nosazi", nCode);
    if (!polygon) return null;

    const point = await generateValidPointInPolygon(polygon);
    if (!point) return null;

    // add point to map
    graphicsLayer.add(
        new Graphic({
            geometry: point,
            symbol: { type: "simple-marker", color: "red", size: 5 },
        })
    );

    return {
        wkt: `POINT(${point.x} ${point.y} 0)`,
        wkid: point.spatialReference.wkid,
    };
    // If need for Projection
    // const wgs84Point = project(randomPoint, { wkid: 4326 });
}
async function createDarkhastPoint(nCode) {
    //graphicsLayer.removeAll();

    const polygon = await getPolygonByAttribute("Code_nosazi", nCode);
    if (!polygon) return null;

    const point = await generateValidPointInPolygon(polygon);
    if (!point) return null;

    // add point to map
    graphicsLayer.add(
        new Graphic({
            geometry: point,
            symbol: { type: "simple-marker", color: "red", size: 5 },
        })
    );

    return {
        wkt: `POINT(${point.x} ${point.y} 0)`,
        wkid: point.spatialReference.wkid,
    };
    // If need for Projection
    // const wgs84Point = project(randomPoint, { wkid: 4326 });
}

window.gisDarkhast = async function (codNArray) {
    if (!Array.isArray(codNArray) || codNArray.length === 0) {
        console.warn("ورودی باید آرایه‌ای از کدها باشد.");
        return [];
    }

    const results = [];

    for (const codN of codNArray) {
        try {
            const shape = await createDarkhastPoint(codN);
            if (shape) {
                results.push({ codN, ...shape });
            } else {
                console.warn(`نقطه‌ای برای کد ${codN} یافت نشد.`);
            }
        } catch (err) {
            console.error(`خطا در پردازش کد ${codN}:`, err);
        }
    }

    console.log("نتایج نهایی:", results);
    return results;
};

// دکمه برای فعال‌سازی انتخاب
const btnUpdateXYDarkhast = document.getElementById("btnUpdateXYDarkhast");
//btnSelect.classList = "esri-widget esri-widget--button esri-interactive";
view.ui.add(btnUpdateXYDarkhast, "top-right");

btnUpdateXYDarkhast.addEventListener("click", async () => {

    let arrayCNosazi = ["501-10-10-15-0-0-0", "501-10-14-12-0-0-0", "501-10-10-1-0-0-0", "501-10-3-12-0-0-0"];
    const results = await gisDarkhast(arrayCNosazi);

    console.log("Updated: ", results);
});

async function getDarkhatFromShahrsazi() {
    try {
        const response = await fetch("/Home/getAllDarkhast", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });

        const result = await response.json();
        return result;
    } catch (err) {
        console.error("Error in getDarkhatFromShahrsazi: " + err);
    }
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
//view.ui.add(sketch, "top-right");
// وقتی روی دکمه کلیک شد، ابزار Rectangle فعال شود
//btnSelect.addEventListener("click", () => {
//    sketch.create("rectangle");
//});

// وقتی رسم تمام شد
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

// === Helpers ===






// === Event Listeners ===
document.getElementById("btnSabtDarkhast").addEventListener("click", async () => {
    const shp = await createDarkhastPoint("501-8-4-28-0-0-0");
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

//document.getElementById("btnUpdate").addEventListener("click", async () => {
//    try {
//        const shape = await createDarkhastPoint("501-8-4-28-0-0-0");
//        if (!shape) return;

//        const response = await fetch("/Home/updateDarkhast", {
//            method: "POST",
//            headers: { "Content-Type": "application/json" },
//            body: JSON.stringify({
//                ShoD: 1097,
//                ...shape,
//            }),
//        });

//        const result = await response.json();
//        alert(result.message);
//    } catch (err) {
//        alert("Error: " + err);
//    }
//});
