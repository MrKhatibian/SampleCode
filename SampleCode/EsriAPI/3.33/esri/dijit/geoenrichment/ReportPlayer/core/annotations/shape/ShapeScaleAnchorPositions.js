// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.33/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/annotations/shape/ShapeScaleAnchorPositions",[],function(){var a={CENTER:"Center",TOP_LEFT:"TopLeft",TOP:"Top",TOP_RIGHT:"TopRight",RIGHT:"Right",BOTTOM_LEFT:"BottomLeft",BOTTOM:"Bottom",BOTTOM_RIGHT:"BottomRight",LEFT:"Left",isSupported:function(b){for(var c in a)if(a[c]===b)return!0;return!1},toSupportedValue:function(b){return a.isSupported(b)?b:a.BOTTOM}};return a});