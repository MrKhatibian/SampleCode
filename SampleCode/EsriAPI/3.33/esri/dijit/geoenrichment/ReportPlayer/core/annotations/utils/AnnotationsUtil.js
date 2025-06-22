// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.33/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/annotations/utils/AnnotationsUtil",["dojo/dom-style"],function(d){return{alignAnnotationContainer:function(b,a,c){var e=a&&a.horizontalAlign||"left",f=a&&a.verticalAlign||"top";a={left:"auto",right:"auto",top:"auto",bottom:"auto"};d.set(b.content,a);switch(e){case "left":a.left="0px";break;case "center":var e=b.getWidth(),g=c?c.w:d.get(b.content,"width");a.left=(e-g)/2+"px";break;case "right":a.right="0px"}switch(f){case "top":a.top="0px";break;case "middle":f=
b.getHeight();c=c?c.h:d.get(b.content,"height");a.top=(f-c)/2+"px";break;case "bottom":a.bottom="0px"}d.set(b.content,a)}}});