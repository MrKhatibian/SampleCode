// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.33/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/WidgetQueryUtil",[],function(){var b={checkParentWidgets:function(a,d,b){for(var c=!1;a;){c=d(a)||c;if(b&&c)break;a=a.parentWidget}return c},isDataDrillingView:function(a){return b.checkParentWidgets(a,function(a){return a.isDataDrillingView},!0)},getReportContainerGrid:function(a){return b.findParentWidget(a,function(a){return a.isReportContainerGrid&&!a.isTempAddContainer})},findParentWidget:function(a,d){var e;b.checkParentWidgets(a,
function(a){if(d(a))return e=a,!0},!0);return e}};return b});