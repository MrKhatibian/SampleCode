/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import n from"../Ground.js";import{p as l,i as r,q as t}from"../core/lang.js";import{g as u}from"./unitUtils.js";function i(r){if(null==r)return null;if(r instanceof n)return o(r);const t=r.tileInfo;if(null==t)return null;const i=l(t.lods);return null==i?null:i.resolution*u(t.spatialReference)}function o(n){if(null==n)return null;const l=n.layers.items.map(e).filter(r);return t(l)??null}function e(n){return n&&"tileInfo"in n?i(n):null}export{i as a,o as g};
