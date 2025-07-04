// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.33/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/types/arcgis/eainfo/templates/AttrElements.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Tabs"\x3e\r\n  \r\n    \x3c!-- description --\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Section" \r\n      data-dojo-props\x3d"showHeader:false,label:\'${i18nArcGIS.eainfo.detailed.attr.section.description}\'"\x3e\r\n  \r\n      \x3c!-- Label --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n        data-dojo-props\x3d"target:\'attrlabl\',minOccurs:1,label:\'${i18nArcGIS.eainfo.detailed.attr.attrlabl}\'"\x3e\r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- Alias --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n        data-dojo-props\x3d"target:\'attalias\',minOccurs:0,label:\'${i18nArcGIS.eainfo.detailed.attr.attalias}\'"\x3e\r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- Definition --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n        data-dojo-props\x3d"target:\'attrdef\',minOccurs:1,label:\'${i18nArcGIS.eainfo.detailed.attr.attrdef}\'"\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputTextArea"\x3e\x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- Definition Source --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n        data-dojo-props\x3d"target:\'attrdefs\',minOccurs:1,label:\'${i18nArcGIS.eainfo.detailed.attr.attrdefs}\'"\x3e\r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- Type --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n        data-dojo-props\x3d"target:\'attrtype\',minOccurs:1,label:\'${i18nArcGIS.eainfo.detailed.attr.attrtype}\'"\x3e\r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- Width --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n        data-dojo-props\x3d"target:\'attwidth\',minOccurs:1,label:\'${i18nArcGIS.eainfo.detailed.attr.attwidth}\'"\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputNumber" data-dojo-props\x3d"integerOnly:true"\x3e\x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- Precision --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n        data-dojo-props\x3d"target:\'atprecis\',minOccurs:0,label:\'${i18nArcGIS.eainfo.detailed.attr.atprecis}\'"\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputNumber" data-dojo-props\x3d"integerOnly:true"\x3e\x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- Scale --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n        data-dojo-props\x3d"target:\'attscale\',minOccurs:0,label:\'${i18nArcGIS.eainfo.detailed.attr.attscale}\'"\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputNumber" data-dojo-props\x3d"integerOnly:true"\x3e\x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- Indexed --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n        data-dojo-props\x3d"target:\'atindex\',minOccurs:0,label:\'${i18nArcGIS.eainfo.detailed.attr.atindex}\'"\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \r\n    \x3c!-- value --\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Section" \r\n      data-dojo-props\x3d"showHeader:false,label:\'${i18nArcGIS.eainfo.detailed.attr.section.value}\'"\x3e\r\n      \r\n      \x3c!-- explanation and accuracy --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n        data-dojo-props\x3d"target:\'attrvai\',minOccurs:0,showHeader:false"\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n          data-dojo-props\x3d"target:\'attrva\',minOccurs:0,label:\'${i18nArcGIS.eainfo.detailed.attr.attrvai.attrva}\'"\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n          data-dojo-props\x3d"target:\'attrvae\',minOccurs:0,label:\'${i18nArcGIS.eainfo.detailed.attr.attrvai.attrvae}\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputNumber"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- Value Measurement Frequency --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n        data-dojo-props\x3d"target:\'attrmfrq\',minOccurs:0,label:\'${i18nArcGIS.eainfo.detailed.attr.attrmfrq}\'"\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/form/InputSelectCode"\r\n          data-dojo-props\x3d"codelistType:\'MD_MaintenanceFrequenceCode\'"\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- Beginning Date of Values --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n        data-dojo-props\x3d"target:\'begdatea\',minOccurs:0,label:\'${i18nArcGIS.eainfo.detailed.attr.begdatea}\'"\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/form/InputDate" data-dojo-props\x3d"allowTime:false"\x3e\x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- Ending Date of Values --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n        data-dojo-props\x3d"target:\'enddatea\',minOccurs:0,label:\'${i18nArcGIS.eainfo.detailed.attr.enddatea}\'"\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/form/InputDate" data-dojo-props\x3d"allowTime:false"\x3e\x3c/div\x3e\r\n      \x3c/div\x3e\r\n\r\n      \x3c!-- Coverage field output width; for ArcInfo Workstation --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/HiddenElement" data-dojo-props\x3d"target:\'atoutwid\'"\x3e\x3c/div\x3e  \r\n      \r\n      \x3c!-- Coverage field number of decimals --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/HiddenElement" data-dojo-props\x3d"target:\'atnumdec\'"\x3e\x3c/div\x3e      \r\n      \r\n    \x3c/div\x3e\r\n    \r\n    \x3c!-- domain --\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Section" \r\n      data-dojo-props\x3d"showHeader:false,label:\'${i18nArcGIS.eainfo.detailed.attr.section.domain}\'"\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n        data-dojo-props\x3d"target:\'attrdomv\',minOccurs:1,maxOccurs:\'unbounded\',label:\'${i18nArcGIS.eainfo.detailed.attr.attrdomv.caption}\'"\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/ElementChoice"\x3e\r\n\r\n          \x3c!-- Unrepresentable Domain --\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n            data-dojo-props\x3d"target:\'udom\',minOccurs:1,label:\'${i18nArcGIS.eainfo.detailed.attr.attrdomv.udom.caption}\'"\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputTextArea"\x3e\x3c/div\x3e\r\n          \x3c/div\x3e\r\n                    \r\n          \x3c!-- Enumerated Domain --\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n            data-dojo-props\x3d"target:\'edom\',minOccurs:1,showHeader:false,label:\'${i18nArcGIS.eainfo.detailed.attr.attrdomv.edom.caption}\'"\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n              data-dojo-props\x3d"target:\'edomv\',minOccurs:1,label:\'${i18nArcGIS.eainfo.detailed.attr.attrdomv.edom.edomv}\'"\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n              data-dojo-props\x3d"target:\'edomvd\',minOccurs:1,label:\'${i18nArcGIS.eainfo.detailed.attr.attrdomv.edom.edomvd}\'"\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n              data-dojo-props\x3d"target:\'edomvds\',minOccurs:1,label:\'${i18nArcGIS.eainfo.detailed.attr.attrdomv.edom.edomvds}\'"\x3e\r\n            \x3c/div\x3e\r\n          \x3c/div\x3e\r\n          \r\n          \x3c!-- Range Domain --\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n            data-dojo-props\x3d"target:\'rdom\',minOccurs:1,showHeader:false,label:\'${i18nArcGIS.eainfo.detailed.attr.attrdomv.rdom.caption}\'"\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/form/MinNumberElement"\r\n              data-dojo-props\x3d"target:\'rdommin\',minOccurs:1,label:\'${i18nArcGIS.eainfo.detailed.attr.attrdomv.rdom.rdommin}\'"\x3e\r\n              \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputNumber"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n              data-dojo-props\x3d"target:\'rdommax\',minOccurs:1,label:\'${i18nArcGIS.eainfo.detailed.attr.attrdomv.rdom.rdommax}\'"\x3e\r\n              \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/form/InputMaxNumber"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n              data-dojo-props\x3d"target:\'rdommean\',minOccurs:0,label:\'${i18nArcGIS.eainfo.detailed.attr.attrdomv.rdom.rdommean}\'"\x3e\r\n              \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputNumber"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n              data-dojo-props\x3d"target:\'rdomstdv\',minOccurs:0,label:\'${i18nArcGIS.eainfo.detailed.attr.attrdomv.rdom.rdomstdv}\'"\x3e\r\n              \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputNumber"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n              data-dojo-props\x3d"target:\'attrunit\',minOccurs:0,label:\'${i18nArcGIS.eainfo.detailed.attr.attrdomv.rdom.attrunit}\'"\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/OpenElement"\r\n              data-dojo-props\x3d"target:\'attrmres\',minOccurs:0,label:\'${i18nArcGIS.eainfo.detailed.attr.attrdomv.rdom.attrmres}\'"\x3e\r\n              \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputNumber"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n          \x3c/div\x3e\r\n          \r\n          \x3c!-- Codeset Domain --\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n            data-dojo-props\x3d"target:\'codesetd\',minOccurs:1,showHeader:false,label:\'${i18nArcGIS.eainfo.detailed.attr.attrdomv.codesetd.caption}\'"\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n              data-dojo-props\x3d"target:\'codesetn\',minOccurs:1,label:\'${i18nArcGIS.eainfo.detailed.attr.attrdomv.codesetd.codesetn}\'"\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n              data-dojo-props\x3d"target:\'codesets\',minOccurs:1,label:\'${i18nArcGIS.eainfo.detailed.attr.attrdomv.codesetd.codesets}\'"\x3e\r\n            \x3c/div\x3e\r\n          \x3c/div\x3e\r\n          \r\n        \x3c/div\x3e    \r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n      \r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/arcgis/eainfo/AttrElements","dojo/_base/declare dojo/_base/lang dojo/has ../../../../../kernel ../../../base/Descriptor dojo/text!./templates/AttrElements.html ../form/MinNumberElement ../form/InputMaxNumber".split(" "),function(a,b,c,d,e,f){a=a(e,{templateString:f});c("extend-esri")&&b.setObject("dijit.metadata.types.arcgis.eainfo.AttrElements",a,d);return a});