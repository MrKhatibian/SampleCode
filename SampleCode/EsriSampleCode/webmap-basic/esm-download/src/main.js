import MapView from "@arcgis/core/views/MapView.js";
import WebMap from "@arcgis/core/WebMap.js";
import "./style.css";

/************************************************************
 * Creates a new WebMap instance. A WebMap must reference
 * a PortalItem ID that represents a WebMap saved to
 * arcgis.com or an on-premise portal.
 *
 * To load a WebMap from an on-premise portal, set the portal
 * url with esriConfig.portalUrl.
 ************************************************************/
const webmap = new WebMap({
  portalItem: {
    // autocasts as new PortalItem()
    id: "f2e9b762544945f390ca4ac3671cfa72"
  }
});

/************************************************************
 * Set the WebMap instance to the map property in a MapView.
 ************************************************************/
const view = new MapView({
  map: webmap,
  container: "viewDiv"
});
