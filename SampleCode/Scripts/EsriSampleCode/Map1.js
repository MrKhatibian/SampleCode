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

// === Map Init ===
const map = new Map({
    basemap: "osm"    
});

const view = new MapView({
    map,
    container: "mapView",
    center: [48.464869, 34.834155],
    zoom: 14,
});
view.ui.remove("attribution");
const url = "http://localhost:6080/arcgis/rest/services/Maryanaj/MaryanajNN/MapServer";

// === Layers ===
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

const arseFLayer = new FeatureLayer({ url: `${url}/1` });
const graphicsLayer = new GraphicsLayer();
let homeWidget = new Home({view: view});

map.addMany([arseFLayer, darkhastFLayer, graphicsLayer]);
view.ui.add(homeWidget, "top-left")

// === Helpers ===
async function getPolygonByAttribute(field, value) {
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

async function generateValidPointInPolygon(polygon, maxAttempts = 500) {
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

async function createDarkhastPoint(nCode) {
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

document.getElementById("btnUpdate").addEventListener("click", async () => {
    try {
        const shape = await createDarkhastPoint("501-8-4-28-0-0-0");
        if (!shape) return;

        const response = await fetch("/Home/updateDarkhast", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ShoD: 1097,
                ...shape,
            }),
        });

        const result = await response.json();
        alert(result.message);
    } catch (err) {
        alert("Error: " + err);
    }
});
