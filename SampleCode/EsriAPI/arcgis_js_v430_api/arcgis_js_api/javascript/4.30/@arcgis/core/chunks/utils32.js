/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.8.5
 */
const t="calcite-list",e="calcite-list-item";function l(e){return Array.from(e.assignedElements({flatten:!0}).filter((e=>e.matches(t))))}function a(l){const a=l.assignedElements({flatten:!0}),c=a.filter((t=>t?.matches("calcite-list-item-group"))).map((t=>Array.from(t.querySelectorAll(e)))).reduce(((t,e)=>[...t,...e]),[]),r=a.filter((t=>t?.matches(e)));return[...a.filter((e=>e?.matches(t))).map((t=>Array.from(t.querySelectorAll(e)))).reduce(((t,e)=>[...t,...e]),[]),...c,...r]}function c(t){t.forEach((e=>{e.setPosition=t.indexOf(e)+1,e.setSize=t.length}))}function r(t,e=!1){const l=e?"ancestor::calcite-list-item | ancestor::calcite-list-item-group":"ancestor::calcite-list-item";return document.evaluate(l,t,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotLength}export{a,l as b,r as g,c as u};
