import Map from "../../esriapi/4.30/@arcgis/core/Map.js";
import MapView from "../../esriapi/4.30/@arcgis/core/views/MapView.js";
import FeatureLayer from "../../esriapi/4.30/@arcgis/core/layers/FeatureLayer.js";
import GraphicsLayer from "../../EsriAPI/4.30/@arcgis/core/layers/GraphicsLayer.js"


const map = new Map({ basemap: "osm" });

const view = new MapView({
    map: map,
    container: "mapView",
    center: [48.464869, 34.834155],
    zoom: 14
});

const url = "http://localhost:6080/arcgis/rest/services/Maryanaj/MaryanajNN/MapServer";

const darkhastFLayer = new FeatureLayer({
    url: `${url}+/0`,

});

const arseFLayer = new FeatureLayer({
    url: `${url}+/1`,
});

const graphicsLayer = new GraphicsLayer();


map.addMany([arseFLayer, darkhastFLayer, graphicsLayer]);

async function getPolygonByAttribute(field, value) {
    const query = arseFLayer.createQuery();
    query.where = `'${field}' = '${value}'`;
    query.returnGeometry = true;
    query.outfields = ["*"];
    query.outSpatialReference = view.spatialReference;

    const result = await arseFLayer.queryFeatures(query);
    return result.features.length ? result.features[0].geometry : null;    
}

document.getElementById("btnSabtDarkhast").addEventListener("click", () => {
    alert("Hi Mohammad");
})

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/geometry/geometryEngine",
    "esri/geometry/Point",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/tasks/support/Query"
], function (Map, MapView, FeatureLayer, geometryEngine, Point, Graphic, GraphicsLayer, Query) {

    const map = new Map({ basemap: "streets-navigation-vector" });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [51.4, 35.7], // Adjust to your location
        zoom: 12
    });

    // Replace with your actual MapServer layer URLs
    const arseLayer = new FeatureLayer({
        url: "https://your-server.com/arcgis/rest/services/your-service/MapServer/0" // Polygon layer
    });

    const darkhastLayer = new FeatureLayer({
        url: "https://your-server.com/arcgis/rest/services/your-service/MapServer/1" // Point layer
    });

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);
    map.add(arseLayer);
    map.add(darkhastLayer);

    // Query a specific polygon by attribute
    async function getPolygonByAttribute(attributeName, value) {
        const query = arseLayer.createQuery();
        query.where = `${attributeName} = '${value}'`;
        query.returnGeometry = true;
        query.outSpatialReference = view.spatialReference;

        const result = await arseLayer.queryFeatures(query);
        return result.features.length ? result.features[0].geometry : null;
    }

    // Generate a unique random point inside the polygon
    async function generateValidPointInPolygon(polygon) {
        const extent = polygon.extent;
        let attempts = 0;
        const maxAttempts = 1000;

        while (attempts < maxAttempts) {
            const x = extent.xmin + Math.random() * (extent.xmax - extent.xmin);
            const y = extent.ymin + Math.random() * (extent.ymax - extent.ymin);

            const candidatePoint = new Point({
                x, y,
                spatialReference: polygon.spatialReference
            });

            if (!geometryEngine.contains(polygon, candidatePoint)) {
                attempts++;
                continue;
            }

            const buffer = geometryEngine.buffer(candidatePoint, 1, "meters");

            const query = darkhastLayer.createQuery();
            query.geometry = buffer;
            query.spatialRelationship = "intersects";
            query.returnGeometry = false;

            const result = await darkhastLayer.queryFeatures(query);
            if (result.features.length === 0) {
                return candidatePoint;
            }

            attempts++;
        }

        console.warn("Failed to generate a unique point.");
        return null;
    }

    // Main logic
    async function runWorkflow(selectedId) {
        graphicsLayer.removeAll();

        const polygon = await getPolygonByAttribute("id", selectedId);
        if (!polygon) {
            console.error("No polygon found with ID:", selectedId);
            return;
        }

        const randomPoint = await generateValidPointInPolygon(polygon);
        if (!randomPoint) return;

        const pointGraphic = new Graphic({
            geometry: randomPoint,
            symbol: {
                type: "simple-marker",
                color: "red",
                size: 10
            }
        });

        graphicsLayer.add(pointGraphic);

        console.log("Generated point geometry:", randomPoint.toJSON());
    }

    // Example: call with a specific ID (replace with your real attribute value)
    view.when(() => {
        runWorkflow("1234"); // Replace "1234" with actual ID or attribute
    });

});
