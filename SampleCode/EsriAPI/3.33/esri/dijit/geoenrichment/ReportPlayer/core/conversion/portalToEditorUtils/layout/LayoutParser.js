// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.33/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/conversion/portalToEditorUtils/layout/LayoutParser",["esri/dijit/geoenrichment/utils/JsonXmlConverter","./GraphicReportSectionsParser","./ClassicReportSectionsParser"],function(c,d,e){return{parseReportXML:function(a){a.log(a.file.data);var b=c.parseXml(a.file.data);a.parsers.getParser("document").parseDocument(b,a);a.report.isGraphicReport?(a.templateJson.sectionsTables=[],d.parseSectionsGraphic(b,a)):(a.templateJson.sections=[],e.parseSectionsClassic(b,
a))}}});