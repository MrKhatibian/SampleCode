// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.33/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/form/HiddenElement","dojo/_base/declare dojo/_base/lang dojo/dom-style dojo/has ../../../kernel ./Element".split(" "),function(a,b,f,c,d,e){a=a(e,{_isHidden:!0,minOccurs:0,preferOpen:!0,noToggle:!0,hide:!0,notApplicable:!0,postCreate:function(){this.inherited(arguments);this.domNode.style.display="none"}});c("extend-esri")&&b.setObject("dijit.metadata.form.HiddenElement",a,d);return a});