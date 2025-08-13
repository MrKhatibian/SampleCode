import Map from "../../esriapi/4.30/@arcgis/core/Map.js";
import MapView from "../../esriapi/4.30/@arcgis/core/views/MapView.js";
import FeatureLayer from "../../esriapi/4.30/@arcgis/core/layers/FeatureLayer.js";
import GraphicsLayer from "../../EsriAPI/4.30/@arcgis/core/layers/GraphicsLayer.js"
import * as geometryEngine from "../../EsriAPI/4.30/@arcgis/core/geometry/geometryEngine.js";
import Point from "../../EsriAPI/4.30/@arcgis/core/geometry/Point.js";
import Graphic from "../../EsriAPI/4.30/@arcgis/core/Graphic.js";
import * as webMercatorUtils from "../../EsriAPI/4.30/@arcgis/core/geometry/support/webMercatorUtils.js";
import Query from "../../EsriAPI/4.30/@arcgis/core/rest/support/Query.js";
import MapImageLayer from "../../EsriAPI/4.30/@arcgis/core/layers/MapImageLayer.js";


const map = new Map({ basemap: "osm" });

const view = new MapView({
    map: map,
    container: "mapView",
    center: [48.464869, 34.834155],
    zoom: 14
});

const url = "http://localhost:6080/arcgis/rest/services/Maryanaj/MaryanajNN/MapServer";

const darkhastFLayer = new FeatureLayer({
    url: `${url}/0`,
    popupTemplate: {
        title: "Darkhast",
        content: [{
            type: "fields", // Autocasts as new FieldsContent()
            // Autocasts as new FieldInfo[]
            fieldInfos: [
                {
                    fieldName: "shodarkhast",
                    label: "Shomare Darkhast",
                },
                {
                    fieldName: "noedarkhast",
                    label: "Noe Darkhast"
                }]
        }],
    },
});

const arseFLayer = new FeatureLayer({ url: `${url}/1` });

const graphicsLayer = new GraphicsLayer();

map.addMany([arseFLayer, darkhastFLayer, graphicsLayer]);

async function getPolygonByAttribute(field, value) {
    debugger;

    const query = arseFLayer.createQuery();
    query.where = `${field} = '${value}'`;
    query.returnGeometry = true;
    query.outfields = ["*"];
    query.outSpatialReference = view.spatialReference;

    const result = await arseFLayer.queryFeatures(query);
    return result.features.length ? result.features[0].geometry : null;

}

// Generate a unique random point inside the polygon
async function generateValidPointInPolygon(polygon) {
    debugger;
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

        const query = darkhastFLayer.createQuery();
        query.geometry = buffer;
        query.spatialRelationship = "intersects";
        query.returnGeometry = false;

        const result = await darkhastFLayer.queryFeatures(query);
        if (result.features.length === 0) {
            return candidatePoint;
        }

        attempts++;
    }

    console.warn("Failed to generate a unique point.");
    return null;
}

let wkt = "";

// Main logic
async function createDarkhastPoint(nCode) {
    debugger;
    graphicsLayer.removeAll();

    const polygon = await getPolygonByAttribute("Code_nosazi", nCode);
    if (!polygon) {
        console.error("No polygon found with Code_nosazi:", nCode);
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
    debugger;
    // Convert randomPoint x y to WGS84 lat/log
    const utmPoint = webMercatorUtils.webMercatorToGeographic(randomPoint); 

    // Define SpatialRefrence
    proj4.defs("EPSG:3857", "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +units=m +no_defs");
    proj4.defs("EPSG:32639", "+proj=utm +zone=39 +datum=WGS84 +units=m +no_defs");

    // Convert SpatialRefrence from WebMercator to UTM N39
    const [xUTM, yUTM] = proj4("EPSG:3857", "EPSG:32639", [randomPoint.x, randomPoint.y]);

    // Create geometry for set geometry's field value
    wkt = `POINT(${xUTM} ${yUTM} 0)`;

    console.log("Generated point geometry:", randomPoint.toJSON());
    console.log("Generated point geometry:", wkt);
}

document.getElementById("btnSabtDarkhast").addEventListener("click", () => {
    createDarkhastPoint("501-8-4-28-0-0-0");
})
let data = { test: "Hi" };
document.getElementById("testConnection").addEventListener("click", function () {
    alert(data.test);
    debugger;
    $.ajax({
        cache: false,
        data: data,
        type: "get",
        datatype: "JSON",
        url: '/Home/testConnection',
        success: function (data) {
            alert(data.result);
        },
        error: function (error) {
            alert("Error: " + error);
        }
    });
    //fetch('/Home/testConnection')
    //    .then(response => response.json())
    //    .then(data => {
    //        alert(data.result);
    //    })
    //    .catch(error => {
    //        alert("Error: " + error);
    //    });
});
let darkhastNewValue = { shodarkhast: 1097, noedarkhast: "پروانه1" }

document.getElementById("btnUpdate").addEventListener("click", () => {
    //alert("hi");
    debugger;
    $.ajax({
        cache: false,
        type: "POST",  // Changed from GET to POST
        dataType: "json",    // lowercase 't' in dataType
        url: '/Home/updateDarkhast',
        //data: darkhastNewValue, // Send data to the server
        data: JSON.stringify({
            shodarkhast: 1097,       // your Id
            Shape: wkt       // POINT(X Y)
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            alert(data.message); // changed to match the controller's return
        },
        error: function (xhr, status, error) {
            alert("Error: " + error);
        }
    });
});