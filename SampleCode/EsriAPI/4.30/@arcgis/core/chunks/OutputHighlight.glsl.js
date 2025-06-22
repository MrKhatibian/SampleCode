/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import{S as e}from"./Matrix4PassUniform.js";import{V as r}from"./VertexPosition.glsl.js";import{b as o,g as a}from"./StencilUtils.js";import{g as t}from"./interfaces3.js";import{V as d}from"./VertexAttribute.js";import{f as i}from"./vec4f64.js";function c(e){e.varyings.add("linearDepth","float")}function n(e){e.vertex.uniforms.add(new o("nearFar",((e,r)=>r.camera.nearFar)))}function s(e){e.vertex.code.add(t`float calculateLinearDepth(vec2 nearFar,float z) {
return (-z - nearFar[0]) / (nearFar[1] - nearFar[0]);
}`)}function l(o,a){const{vertex:d}=o;switch(a.output){case e.Color:if(a.receiveShadows)return c(o),void d.code.add(t`void forwardLinearDepth() { linearDepth = gl_Position.w; }`);break;case e.Shadow:case e.ShadowHighlight:case e.ShadowExcludeHighlight:case e.ViewshedShadow:return o.include(r,a),c(o),n(o),s(o),void d.code.add(t`void forwardLinearDepth() {
linearDepth = calculateLinearDepth(nearFar, vPosition_view.z);
}`)}d.code.add(t`void forwardLinearDepth() {}`)}function v(e){s(e),e.vertex.code.add(t`vec4 transformPositionWithDepth(mat4 proj, mat4 view, vec3 pos, vec2 nearFar, out float depth) {
vec4 eye = view * vec4(pos, 1.0);
depth = calculateLinearDepth(nearFar,eye.z);
return proj * eye;
}`),e.vertex.code.add(t`vec4 transformPosition(mat4 proj, mat4 view, vec3 pos) {
return proj * (view * vec4(pos, 1.0));
}`)}function f(e,r){r.hasVertexColors?(e.attributes.add(d.COLOR,"vec4"),e.varyings.add("vColor","vec4"),e.vertex.code.add(t`void forwardVertexColor() { vColor = color; }`),e.vertex.code.add(t`void forwardNormalizedVertexColor() { vColor = color * 0.003921568627451; }`)):e.vertex.code.add(t`void forwardVertexColor() {}
void forwardNormalizedVertexColor() {}`)}const h=i(1,1,0,1),u=i(1,0,1,1);function p(e){e.fragment.uniforms.add(new a("depthTexture",((e,r)=>r.mainDepth))),e.fragment.constants.add("occludedHighlightFlag","vec4",h).add("unoccludedHighlightFlag","vec4",u),e.fragment.code.add(t`void outputHighlight() {
float sceneDepth = float(texelFetch(depthTexture, ivec2(gl_FragCoord.xy), 0).x);
if (gl_FragCoord.z > sceneDepth + 5e-7) {
fragColor = occludedHighlightFlag;
} else {
fragColor = unoccludedHighlightFlag;
}
}`)}export{l as F,p as O,v as T,f as V,n as a,c as b,h as o,u};
