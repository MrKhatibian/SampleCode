/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import{f as t}from"../widgets/Widget.js";import{c as o}from"./observers.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.8.5
 */let e;const s={childList:!0};function r(t){e||(e=o("mutation",n)),e.observe(t.el,s)}function i(t){e.unobserve(t.el)}function n(o){o.forEach((({target:o})=>{t(o)}))}export{r as c,i as d};
