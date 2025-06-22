// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.33/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/dataProvider/supportClasses/tasks/parsers/AttrUtil",[],function(){var a={},d="ID OBJECTID AREA_ID STORE_ID HasData aggregationMethod sourceCountry radiusIndex".split(" ");a.cleanUpAttrs=function(a,b){a&&d.forEach(function(c){b&&b[c]||delete a[c]})};return a});