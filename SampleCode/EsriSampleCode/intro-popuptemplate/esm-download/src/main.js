import Map from "@arcgis/core/Map.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import MapView from "@arcgis/core/views/MapView.js";
import Legend from "@arcgis/core/widgets/Legend.js";
import "./style.css";

// Create the map
const map = new Map({
  basemap: "gray-vector"
});

// Create the MapView
const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [-73.95, 40.702],
  zoom: 10
});

view.ui.add(new Legend({ view: view }), "bottom-left");

/*************************************************************
 * The PopupTemplate content is the text that appears inside the
 * popup. {fieldName} can be used to reference the value of an
 * attribute of the selected feature. HTML elements can be used
 * to provide structure and styles within the content. The
 * fieldInfos property is an array of objects (each object representing
 * a field) that is use to format number fields and customize field
 * aliases in the popup and legend.
 **************************************************************/

const template = {
  // autocasts as new PopupTemplate()
  title: "{NAME} in {COUNTY}",
  content: [
    {
      // It is also possible to set the fieldInfos outside of the content
      // directly in the popupTemplate. If no fieldInfos is specifically set
      // in the content, it defaults to whatever may be set within the popupTemplate.
      type: "fields",
      fieldInfos: [
        {
          fieldName: "B12001_calc_pctMarriedE",
          label: "Married %"
        },
        {
          fieldName: "B12001_calc_numMarriedE",
          label: "People Married",
          format: {
            digitSeparator: true,
            places: 0
          }
        },
        {
          fieldName: "B12001_calc_numNeverE",
          label: "People that Never Married",
          format: {
            digitSeparator: true,
            places: 0
          }
        },
        {
          fieldName: "B12001_calc_numDivorcedE",
          label: "People Divorced",
          format: {
            digitSeparator: true,
            places: 0
          }
        }
      ]
    }
  ]
};

// Reference the popupTemplate instance in the
// popupTemplate property of FeatureLayer
const featureLayer = new FeatureLayer({
  url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/ACS_Marital_Status_Boundaries/FeatureServer/2",
  popupTemplate: template
});
map.add(featureLayer);
