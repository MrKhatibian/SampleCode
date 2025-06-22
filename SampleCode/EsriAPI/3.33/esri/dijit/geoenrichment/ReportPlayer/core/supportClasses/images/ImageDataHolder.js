// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.33/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/images/ImageDataHolder",[],function(){var a={},c={},d={};a.putImageData=function(b,e){if("string"===typeof b&&e){var a=b.toLowerCase();d[a]=b;c[a]=e}else console.error("Invalid image filename or data!")};a.getImageData=function(b){return"string"!==typeof b?null:c[b.toLowerCase()]};a.findFileNameByData=function(b){for(var a in c)if(b===c[a])return d[a];return null};return a});