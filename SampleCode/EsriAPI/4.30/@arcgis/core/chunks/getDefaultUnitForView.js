/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import{a2 as t}from"./unitUtils.js";import r from"../portal/Portal.js";function e(e){const n="metric";if(null==e)return n;const a=e.map,i=(a&&"portalItem"in a?a.portalItem?.portal:null)??r.getDefault();switch(i.user?.units??i.units){case n:return n;case"english":return"imperial"}return t(e.spatialReference)??n}export{e as g};
