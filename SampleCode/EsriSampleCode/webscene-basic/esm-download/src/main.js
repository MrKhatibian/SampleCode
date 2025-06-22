import SceneView from "@arcgis/core/views/SceneView.js";
import WebScene from "@arcgis/core/WebScene.js";
import "./style.css";

const titleDiv = document.getElementById("titleDiv");

/************************************************************
 * Creates a new WebScene instance. A WebScene must reference
 * a PortalItem ID that represents a WebScene saved to
 * arcgis.com or an on-premise portal.
 *
 * To load a WebScene from an on-premise portal, set the portal
 * url with esriConfig.portalUrl.
 ************************************************************/
const scene = new WebScene({
  portalItem: {
    // autocasts as new PortalItem()
    id: "3a9976baef9240ab8645ee25c7e9c096"
  }
});

/************************************************************
 * Set the WebScene instance to the map property in a SceneView.
 ************************************************************/
const view = new SceneView({
  map: scene,
  container: "viewDiv",
  padding: {
    top: 40
  }
});

view.when(function () {
  // when the scene and view resolve, display the scene's
  // title in the DOM
  const title = scene.portalItem.title;
  titleDiv.innerHTML = title;
});
