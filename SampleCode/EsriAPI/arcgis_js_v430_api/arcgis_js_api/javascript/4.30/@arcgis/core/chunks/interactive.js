/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import{h as e}from"../widgets/Widget.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.8.5
 */function t(){const e=navigator.userAgentData;return e?.brands?e.brands.map((({brand:e,version:t})=>`${e}/${t}`)).join(" "):navigator.userAgent}const n=/firefox/i.test(t()),i=n?new WeakMap:null;function o(){const{disabled:e}=this;e||HTMLElement.prototype.click.call(this)}function r(e){const t=e.target;if(n&&!i.get(t))return;const{disabled:o}=t;o&&e.preventDefault()}const a=["mousedown","mouseup","click"];function s(e){const t=e.target;n&&!i.get(t)||t.disabled&&(e.stopImmediatePropagation(),e.preventDefault())}const c={capture:!0};function l(e){if(e.disabled)return e.el.setAttribute("aria-disabled","true"),e.el.contains(document.activeElement)&&document.activeElement.blur(),void d(e);f(e),e.el.removeAttribute("aria-disabled")}function d(e){if(e.el.click=o,n){const t=function(e){return e.el.parentElement||e.el}(e),n=i.get(e.el);return n!==t&&(v(n),i.set(e.el,t)),void u(i.get(e.el))}u(e.el)}function u(e){e&&(e.addEventListener("pointerdown",r,c),a.forEach((t=>e.addEventListener(t,s,c))))}function f(e){if(delete e.el.click,n)return v(i.get(e.el)),void i.delete(e.el);v(e.el)}function v(e){e&&(e.removeEventListener("pointerdown",r,c),a.forEach((t=>e.removeEventListener(t,s,c))))}function m(e){e.disabled&&n&&d(e)}function g(e){n&&f(e)}function p({disabled:t},n){return e("div",{class:"interaction-container",inert:t},...n)}export{p as I,m as c,g as d,t as g,l as u};
