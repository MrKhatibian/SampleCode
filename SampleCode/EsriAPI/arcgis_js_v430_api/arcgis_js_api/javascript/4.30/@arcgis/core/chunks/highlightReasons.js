/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import o from"../Color.js";import{H as r}from"./HighlightOptions.js";const c={selection:c=>new r({color:new o([c.color.r/2,c.color.g/2,c.color.b/2,c.color.a])}),highlight:o=>o,popup:c=>new r({color:new o([c.color.g,c.color.b,c.color.r,c.color.a])})};function l(o){if(!o)return 0;let r=1;for(const l in c){if(l===o)break;r<<=1}return r}const t=Object.keys(c);export{c as a,l as g,t as h};
