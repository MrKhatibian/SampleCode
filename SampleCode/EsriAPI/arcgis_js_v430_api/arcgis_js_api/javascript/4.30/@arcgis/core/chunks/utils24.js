/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import{B as e}from"./dom.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.8.5
 */const t="CALCITE-COMBOBOX-ITEM",n="CALCITE-COMBOBOX-ITEM-GROUP",i=`${t}, ${n}`,o={input:"input",chipInvisible:"chip--invisible",selectionDisplayFit:"selection-display-fit",selectionDisplaySingle:"selection-display-single",listContainer:"list-container",icon:"icon"};function l(e){const t=e.parentElement?.closest(i),n=t?.parentElement?.closest(i);return[t,n].filter((e=>e))}function s(e){return e.ancestors?.filter((e=>"CALCITE-COMBOBOX-ITEM"===e.nodeName))||[]}function c(t){return e(t.querySelectorAll("calcite-combobox-item"))}function a(t){return e(t.querySelectorAll("calcite-combobox-item")).filter((e=>e.selected)).length>0}function r(e){return document.evaluate("ancestor::calcite-combobox-item | ancestor::calcite-combobox-item-group",e,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotLength}function u(e){return e.includes("single")}export{o as C,i as a,c as b,t as c,n as d,l as e,r as f,s as g,a as h,u as i};
