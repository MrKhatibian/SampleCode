// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.33/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/PlayerThemes",[],function(){var a={LIGHT:"light",DARK:"dark",isSupported:function(b){for(var c in a)if(a[c]===b)return!0;return!1},toSupportedValue:function(b){return a.isSupported(b)?b:a.DARK}};return a});