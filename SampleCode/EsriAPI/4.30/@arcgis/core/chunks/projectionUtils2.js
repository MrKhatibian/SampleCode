/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import{tryProjectWithZConversion as e}from"../geometry/projection.js";import{g as o}from"./ElevationProvider.js";function r(r,i,t,n=!1){const a=e(r,i);return null==a?null:(a.hasZ&&!n||null==t||(a.z=o(t,a)??0),a)}function i(e,o,r){r.warnOnce(`Failed to project analysis geometry (id: '${e.id}'), projection from spatial reference (wkid: '${o.wkid}') to view spatial reference is not supported. Projection may be possible after calling projection.load().`)}export{r as a,i as l};
