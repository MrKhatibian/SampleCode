import Map from "@arcgis/core/Map.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import MapView from "@arcgis/core/views/MapView.js";
import "./style.css";

// If GeoJSON files are not on the same domain as your website, a CORS enabled server
// or a proxy is required.
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Paste the url into a browser's address bar to download and view the attributes
// in the GeoJSON file. These attributes include:
// * mag - magnitude
// * type - earthquake or other event such as nuclear test
// * place - location of the event
// * time - the time of the event
// Use the Arcade Date() function to format time field into a human-readable format

const template = {
  title: "Earthquake Info",
  content: "Magnitude {mag} {type} hit {place} on {time}",
  fieldInfos: [
    {
      fieldName: "time",
      format: {
        dateFormat: "short-date-short-time"
      }
    }
  ]
};

const renderer = {
  type: "simple",
  field: "mag",
  symbol: {
    type: "simple-marker",
    color: "orange",
    outline: {
      color: "white"
    }
  },
  visualVariables: [
    {
      type: "size",
      field: "mag",
      stops: [
        {
          value: 2.5,
          size: "4px"
        },
        {
          value: 8,
          size: "40px"
        }
      ]
    }
  ]
};

const geojsonLayer = new GeoJSONLayer({
  url: url,
  copyright: "USGS Earthquakes",
  popupTemplate: template,
  renderer: renderer,
  orderBy: {
    field: "mag"
  }
});

const map = new Map({
  basemap: "gray-vector",
  layers: [geojsonLayer]
});

const view = new MapView({
  container: "viewDiv",
  center: [-168, 46],
  zoom: 2,
  map: map
});
