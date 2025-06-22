/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import{m as n}from"./handleUtils.js";let o,t;const a=globalThis.esriConfig?.locale??globalThis.dojoConfig?.locale;function e(){return a??globalThis.navigator?.language??"en"}function s(){return void 0===t&&(t=e()),t}function i(n){o=n||void 0,d()}function c(n=s()){const o=/^([a-zA-Z]{2,3})(?:[_-]\w+)*$/.exec(n);return o?.[1].toLowerCase()}const r={he:!0,ar:!0};function l(n=s()){const o=c(n);return void 0!==o&&(r[o]||!1)}const u=[];function f(o){return u.push(o),n((()=>u.splice(u.indexOf(o),1)))}const g=[];function h(o){return g.push(o),n((()=>g.splice(g.indexOf(o),1)))}function d(){const n=o??e();t!==n&&([...g].forEach((o=>o(n))),t=n,[...u].forEach((o=>o(n))))}globalThis.addEventListener?.("languagechange",d);export{c as a,h as b,s as g,f as o,l as p,i as s};
