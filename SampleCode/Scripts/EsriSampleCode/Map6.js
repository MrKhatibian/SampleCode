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

const MabarFLayer = new FeatureLayer({
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

const ArseFLayer = new FeatureLayer({
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
map.addMany([MabarFLayer, ArseFLayer]);
ArseFLayer.when(() => {
    const homeWidget = new Home({
        view: view,
        viewpoint: {
            targetGeometry: ArseFLayer.fullExtent
        }
    });

    view.ui.add(homeWidget, "top-left");    
});

view.whenLayerView(ArseFLayer)
    .then(() => {
        view.goTo(ArseFLayer.fullExtent);
    });

const btnFindStreets = document.getElementById("btnFindStreets");
btnFindStreets.addEventListener("click", async () => {
    try {
        // 03 - Created Graphicslayer
        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);
        graphicsLayer.removeAll();

        // 01 - Finded Parsel
        let arseQuery = ArseFLayer.createQuery();
        arseQuery.returnGeometry = true;
        arseQuery.outFields = ["*"];
        arseQuery.where = `Code_nosazi = '1-16-39-23-0-0-0'`;

        const resultArse = await ArseFLayer.queryFeatures(arseQuery);        
        if (resultArse.features.length < 1) { throw new Error("Parcel not found"); }

        const selectedParsel = resultArse.features[0];
        const geoSelectParsel = selectedParsel.geometry;
        graphicsLayer.add(new Graphic({
            geometry: geoSelectParsel,
            symbol: { type: "simple-fill", color: [0, 255, 0, 0.1], outline: { color: "green"} }
        }));

        // 02 - created buffer
        const buffParsel = geometryEngine.buffer(geoSelectParsel, 10, "meters");

        // 03 - 
        graphicsLayer.add(new Graphic({
            geometry: buffParsel,
            symbol: {
                type: "simple-fill", color: [0, 0, 255, 0.1], outline: {color: "blue"} }
        }));        
        
        // 04 - Finded Street
        const mabarQuery = MabarFLayer.createQuery();
        mabarQuery.returnGeometry = true;
        mabarQuery.outFields = ["*"];
        mabarQuery.geometry = buffParsel;
        mabarQuery.spatialRelationship = "intersects";

        const selectedMabar = await MabarFLayer.queryFeatures(mabarQuery);
        
        selectedMabar.features.forEach((features) => {            
            graphicsLayer.add(new Graphic({
                geometry: features.geometry,
                symbol: { type: "simple-line", width: 3, color: "red" }
            }));
        });
        
        const maxArzeMabar = Math.max(...selectedMabar.features.map(f => f.attributes.street_len));
        console.log("Max: ", maxArzeMabar);
        // Zoom to parcel
        view.goTo(geoSelectParsel);

    } catch (err) {
        console.error(err);
    }
});
