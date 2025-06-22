// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.33/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/annotations/shape/ShapeBarFlowDirections",[],function(){var b={UP:"Up",RIGHT:"Right",DOWN:"Down",LEFT:"Left",isHorizontal:function(a){return a===b.LEFT||a===b.RIGHT},isSupported:function(a){for(var c in b)if(b[c]===a)return!0;return!1},toSupportedValue:function(a){return b.isSupported(a)?a:b.RIGHT}};return b});