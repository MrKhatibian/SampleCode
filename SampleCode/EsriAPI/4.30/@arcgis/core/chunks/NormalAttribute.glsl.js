/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import{U as e}from"./Matrix4PassUniform.js";import{B as r}from"./BindType.js";import{n as a}from"./compilerUtils.js";import{g as o}from"./interfaces3.js";import{V as s}from"./VertexAttribute.js";class t extends e{constructor(e,a){super(e,"sampler2D",r.Draw,((r,o,s)=>r.bindTexture(e,a(o,s))))}}function i(e,r){switch(r.normalType){case n.Compressed:e.attributes.add(s.NORMALCOMPRESSED,"vec2"),e.vertex.code.add(o`vec3 decompressNormal(vec2 normal) {
float z = 1.0 - abs(normal.x) - abs(normal.y);
return vec3(normal + sign(normal) * min(z, 0.0), z);
}
vec3 normalModel() {
return decompressNormal(normalCompressed);
}`);break;case n.Attribute:e.attributes.add(s.NORMAL,"vec3"),e.vertex.code.add(o`vec3 normalModel() {
return normal;
}`);break;case n.ScreenDerivative:e.fragment.code.add(o`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`);break;default:a(r.normalType);case n.COUNT:case n.Ground:}}var n;!function(e){e[e.Attribute=0]="Attribute",e[e.Compressed=1]="Compressed",e[e.Ground=2]="Ground",e[e.ScreenDerivative=3]="ScreenDerivative",e[e.COUNT=4]="COUNT"}(n||(n={}));export{i as N,t as T,n as a};
