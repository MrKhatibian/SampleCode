/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import{g as e}from"./interfaces3.js";import{B as t}from"./BindType.js";var a;function r(e){return o(e)||e===a.Depth||e===a.Normal||e===a.ObjectAndLayerIdColor}function o(e){return e===a.Shadow||e===a.ShadowHighlight||e===a.ShadowExcludeHighlight||e===a.ViewshedShadow}function s(e){return h(e)||e===a.Normal}function n(e){return e===a.Highlight||e===a.ObjectAndLayerIdColor}function i(e){return e===a.Color||n(e)}function c(e){return e===a.Color}function l(e){return c(e)||e===a.ObjectAndLayerIdColor}function u(e){return function(e){return c(e)||e===a.Highlight}(e)||v(e)}function d(e){return c(e)||n(e)}function h(e){return d(e)||v(e)}function v(e){return e===a.Depth}function f(t){t.code.add(e`const float MAX_RGBA_FLOAT =
255.0 / 256.0 +
255.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 / 256.0;
const vec4 FIXED_POINT_FACTORS = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
vec4 float2rgba(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA_FLOAT);
vec4 fixedPointU8 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS) * 256.0);
const float toU8AsFloat = 1.0 / 255.0;
return fixedPointU8 * toU8AsFloat;
}
const vec4 RGBA_2_FLOAT_FACTORS = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgba2float(vec4 rgba) {
return dot(rgba, RGBA_2_FLOAT_FACTORS);
}`)}!function(e){e[e.Color=0]="Color",e[e.Depth=1]="Depth",e[e.Normal=2]="Normal",e[e.Shadow=3]="Shadow",e[e.ShadowHighlight=4]="ShadowHighlight",e[e.ShadowExcludeHighlight=5]="ShadowExcludeHighlight",e[e.ViewshedShadow=6]="ViewshedShadow",e[e.Highlight=7]="Highlight",e[e.ObjectAndLayerIdColor=8]="ObjectAndLayerIdColor",e[e.COUNT=9]="COUNT"}(a||(a={}));class A{constructor(e,a,r,o,s=null){if(this.name=e,this.type=a,this.arraySize=s,this.bind={[t.Pass]:null,[t.Draw]:null},o)switch(r){case t.Pass:this.bind[t.Pass]=o;break;case t.Draw:this.bind[t.Draw]=o}}equals(e){return this.type===e.type&&this.name===e.name&&this.arraySize===e.arraySize}}function g({code:t},a){a.doublePrecisionRequiresObfuscation?t.add(e`vec3 dpPlusFrc(vec3 a, vec3 b) {
return mix(a, a + b, vec3(notEqual(b, vec3(0))));
}
vec3 dpMinusFrc(vec3 a, vec3 b) {
return mix(vec3(0), a - b, vec3(notEqual(a, b)));
}
vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = dpPlusFrc(hiA, hiB);
vec3 e = dpMinusFrc(t1, hiA);
vec3 t2 = dpMinusFrc(hiB, e) + dpMinusFrc(hiA, dpMinusFrc(t1, e)) + loA + loB;
return t1 + t2;
}`):t.add(e`vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = hiA + hiB;
vec3 e = t1 - hiA;
vec3 t2 = ((hiB - e) + (hiA - (t1 - e))) + loA + loB;
return t1 + t2;
}`)}class p extends A{constructor(e,a){super(e,"vec3",t.Draw,((t,r,o,s)=>t.setUniform3fv(e,a(r,o,s))))}}class m extends A{constructor(e,a){super(e,"vec3",t.Pass,((t,r,o)=>t.setUniform3fv(e,a(r,o))))}}class b extends A{constructor(e,a){super(e,"float",t.Pass,((t,r,o)=>t.setUniform1f(e,a(r,o))))}}class w extends A{constructor(e,a){super(e,"mat3",t.Pass,((t,r,o)=>t.setUniformMatrix3fv(e,a(r,o))))}}class F extends A{constructor(e,a){super(e,"mat4",t.Pass,((t,r,o)=>t.setUniformMatrix4fv(e,a(r,o))))}}export{g as D,m as F,w as M,f as R,a as S,A as U,F as a,p as b,b as c,c as d,l as e,v as f,i as g,d as h,n as i,r as j,h as k,s as l,o as m,u as n};
