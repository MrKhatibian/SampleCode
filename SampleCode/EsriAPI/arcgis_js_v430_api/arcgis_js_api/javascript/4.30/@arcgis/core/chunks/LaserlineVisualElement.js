/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import"../core/lang.js";import{s as e,c as t,n as i,l as n,j as s,h as a,p as r,e as l,i as o}from"./vec3.js";import{c,f as h,e as d}from"./vec3f64.js";import{a as p,c as u,g as f,h as g}from"./lineSegment.js";import{V as _}from"./VisualElement.js";import{_ as m}from"./tslib.es6.js";import{c as P,f as b}from"./maybe.js";import{property as v}from"../core/accessorSupport/decorators/property.js";import"./Logger.js";import{subclass as w}from"../core/accessorSupport/decorators/subclass.js";import{c as x,f as D,a as V,g as E,b as L}from"./frustum.js";import{w as y}from"./ray.js";import{V as C}from"./ViewingMode.js";import{V as S,b as A,C as M}from"./VertexArrayObject2.js";import{n as R}from"./DoubleArray.js";import{g as j}from"./glUtil.js";import{n as T}from"./InterleavedLayout.js";import{H as O,g as q,S as I,b as z,j as N,P as W,R as U,F as H,u as B}from"./StencilUtils.js";import{V as F}from"./VertexAttribute.js";import{w as G}from"./mat4.js";import{c as X}from"./mat4f64.js";import{g as k}from"./vec2.js";import{c as $}from"./vec2f64.js";import{C as J}from"./CameraSpace.glsl.js";import{c as K,F as Q,a as Y}from"./Matrix4PassUniform.js";import{g as Z,N as ee}from"./interfaces3.js";import{g as te,P as ie,U as ne}from"./enums.js";import{m as se,s as ae,a as re}from"./renderState.js";import{B as le}from"./BufferObject.js";import{p as oe,S as ce}from"./ShaderTechniqueConfiguration.js";import{d as he}from"./mathUtils.js";import{D as de,u as pe}from"./Material.js";import{t as ue}from"./vec4.js";import{c as fe}from"./vec4f64.js";import{c as ge,r as _e}from"./plane.js";import{g as me,b as Pe}from"./sphere.js";import{S as be}from"./ScreenSpacePass.glsl.js";function ve(e,t){const i=e.fragment;i.include(O),e.include(J),i.uniforms.add(new K("globalAlpha",(e=>e.globalAlpha)),new Q("glowColor",(e=>e.glowColor)),new K("glowWidth",((e,t)=>e.glowWidth*t.camera.pixelRatio)),new K("glowFalloff",(e=>e.glowFalloff)),new Q("innerColor",(e=>e.innerColor)),new K("innerWidth",((e,t)=>e.innerWidth*t.camera.pixelRatio)),new q("depthMap",((e,t)=>t.depth?.attachment)),new q("normalMap",(e=>e.normals)),new q("frameColor",((e,t)=>t.mainColor))),i.code.add(Z`vec4 blendPremultiplied(vec4 source, vec4 dest) {
float oneMinusSourceAlpha = 1.0 - source.a;
return vec4(
source.rgb + dest.rgb * oneMinusSourceAlpha,
source.a + dest.a * oneMinusSourceAlpha
);
}`),i.code.add(Z`vec4 premultipliedColor(vec3 rgb, float alpha) {
return vec4(rgb * alpha, alpha);
}`),i.code.add(Z`vec4 laserlineProfile(float dist) {
if (dist > glowWidth) {
return vec4(0.0);
}
float innerAlpha = (1.0 - smoothstep(0.0, innerWidth, dist));
float glowAlpha = pow(max(0.0, 1.0 - dist / glowWidth), glowFalloff);
return blendPremultiplied(
premultipliedColor(innerColor, innerAlpha),
premultipliedColor(glowColor, glowAlpha)
);
}`),i.code.add(Z`bool laserlineReconstructFromDepth(out vec3 pos, out vec3 normal, out float angleCutoffAdjust, out float depthDiscontinuityAlpha) {
float depth = depthFromTexture(depthMap, uv);
if (depth == 1.0) {
return false;
}
float linearDepth = linearizeDepth(depth);
pos = reconstructPosition(gl_FragCoord.xy, linearDepth);
float minStep = 6e-8;
float depthStep = clamp(depth + minStep, 0.0, 1.0);
float linearDepthStep = linearizeDepth(depthStep);
float depthError = abs(linearDepthStep - linearDepth);
if (depthError > 0.2) {
normal = texture(normalMap, uv).xyz * 2.0 - 1.0;
angleCutoffAdjust = 0.004;
} else {
normal = normalize(cross(dFdx(pos), dFdy(pos)));
angleCutoffAdjust = 0.0;
}
float ddepth = fwidth(linearDepth);
depthDiscontinuityAlpha = 1.0 - smoothstep(0.0, 0.01, -ddepth / linearDepth);
return true;
}`),t.contrastControlEnabled?(i.uniforms.add(new K("globalAlphaContrastBoost",(e=>null!=e.globalAlphaContrastBoost?e.globalAlphaContrastBoost:1))),i.code.add(Z`float rgbToLuminance(vec3 color) {
return dot(vec3(0.2126, 0.7152, 0.0722), color);
}
vec4 laserlineOutput(vec4 color) {
float backgroundLuminance = rgbToLuminance(texture(frameColor, uv).rgb);
float alpha = clamp(globalAlpha * max(backgroundLuminance * globalAlphaContrastBoost, 1.0), 0.0, 1.0);
return color * alpha;
}`)):i.code.add(Z`vec4 laserlineOutput(vec4 color) {
return color * globalAlpha;
}`)}const we=$(),xe=X(),De=Object.freeze(Object.defineProperty({__proto__:null,build:function(e){const t=new I;t.include(ve,e);const{vertex:i,fragment:n}=t;return i.uniforms.add(new Y("modelView",((e,{camera:t})=>G(xe,t.viewMatrix,e.origin))),new Y("proj",((e,{camera:t})=>t.projectionMatrix)),new K("glowWidth",((e,{camera:t})=>e.glowWidth*t.pixelRatio)),new z("pixelToNDC",((e,{camera:t})=>k(we,2/t.fullViewport[2],2/t.fullViewport[3])))),t.attributes.add(F.START,"vec3"),t.attributes.add(F.END,"vec3"),t.attributes.add(F.UP,"vec3"),t.attributes.add(F.EXTRUDE,"vec2"),t.varyings.add("uv","vec2"),t.varyings.add("vViewStart","vec3"),t.varyings.add("vViewEnd","vec3"),t.varyings.add("vViewPlane","vec4"),i.code.add(Z`void main() {
vec3 pos = mix(start, end, extrude.x);
vec4 viewPos = modelView * vec4(pos, 1);
vec4 projPos = proj * viewPos;
vec2 ndcPos = projPos.xy / projPos.w;
vec3 viewUp = (modelView * vec4(extrude.y * up, 0)).xyz;
vec4 projPosUp = proj * vec4(viewPos.xyz + viewUp, 1);
vec2 projExtrudeDir = normalize(projPosUp.xy / projPosUp.w - ndcPos);
vec2 lxy = abs(sign(projExtrudeDir) - ndcPos);
ndcPos += length(lxy) * projExtrudeDir;
vec3 worldPlaneNormal = normalize(cross(up, normalize(end - start)));
vec3 viewPlaneNormal = (modelView * vec4(worldPlaneNormal, 0)).xyz;
vViewStart = (modelView * vec4(start, 1)).xyz;
vViewEnd = (modelView * vec4(end, 1)).xyz;
vViewPlane = vec4(viewPlaneNormal, -dot(viewPlaneNormal, vViewStart));
float xPaddingPixels = sign(dot(viewPlaneNormal, viewPos.xyz)) * (extrude.x * 2.0 - 1.0) * glowWidth;
ndcPos.x += xPaddingPixels * pixelToNDC.x;
uv = ndcPos * 0.5 + 0.5;
gl_Position = vec4(ndcPos, 0, 1);
}`),n.uniforms.add(new K("perScreenPixelRatio",((e,t)=>t.camera.perScreenPixelRatio))),n.code.add(Z`float planeDistancePixels(vec4 plane, vec3 pos, vec3 start, vec3 end) {
vec3 origin = mix(start, end, 0.5);
vec3 basis = end - origin;
vec3 posAtOrigin = pos - origin;
float x = dot(normalize(basis), posAtOrigin);
float y = dot(plane.xyz, posAtOrigin);
float dx = max(abs(x) - length(basis), 0.0);
float dy = y;
float dist = length(vec2(dx, dy));
float width = fwidth(y);
float maxPixelDistance = length(pos) * perScreenPixelRatio * 2.0;
float pixelDist = dist / min(width, maxPixelDistance);
return abs(pixelDist);
}
void main() {
vec3 dEndStart = vViewEnd - vViewStart;
if (dot(dEndStart, dEndStart) < 1e-5) {
discard;
}
vec3 pos;
vec3 normal;
float angleCutoffAdjust;
float depthDiscontinuityAlpha;
if (!laserlineReconstructFromDepth(pos, normal, angleCutoffAdjust, depthDiscontinuityAlpha)) {
discard;
}
float distance = planeDistancePixels(vViewPlane, pos, vViewStart, vViewEnd);
vec4 color = laserlineProfile(distance);
float alpha = (1.0 - smoothstep(0.995 - angleCutoffAdjust, 0.999 - angleCutoffAdjust, abs(dot(normal, vViewPlane.xyz))));
fragColor = laserlineOutput(color * alpha * depthDiscontinuityAlpha);
}`),t}},Symbol.toStringTag,{value:"Module"}));class Ve extends N{initializeProgram(e){return new W(e.rctx,Ve.shader.get().build(this.configuration),Ee)}initializePipeline(){return se({blending:ae(te.ONE,te.ONE_MINUS_SRC_ALPHA),colorWrite:re})}}Ve.shader=new U(De,(()=>Promise.resolve().then((()=>De))));const Ee=new Map([[F.START,0],[F.END,1],[F.UP,2],[F.EXTRUDE,3]]);class Le{constructor(e){this._renderCoordsHelper=e,this._buffers=null,this._origin=c(),this._dirty=!1,this._count=0,this._vao=null}set vertices(e){const t=R(3*e.length);let i=0;for(const n of e)t[i++]=n[0],t[i++]=n[1],t[i++]=n[2];this.buffers=[t]}set buffers(t){if(this._buffers=t,this._buffers.length>0){const t=this._buffers[0],i=3*Math.floor(t.length/3/2);e(this._origin,t[i],t[i+1],t[i+2])}else e(this._origin,0,0,0);this._dirty=!0}get origin(){return this._origin}draw(e){const t=this._ensureVAO(e);null!=t&&(e.bindVAO(t),e.drawArrays(ie.TRIANGLES,0,this._count))}dispose(){null!=this._vao&&this._vao.dispose()}_ensureVAO(e){return null==this._buffers?null:(null==this._vao&&(this._vao=this._createVAO(e,this._buffers)),this._ensureVertexData(this._vao,this._buffers),this._vao)}_createVAO(e,t){const i=this._createDataBuffer(t);return this._dirty=!1,new S(e,Ee,{data:j(Ae)},{data:le.createVertex(e,ne.STATIC_DRAW,i)})}_ensureVertexData(e,t){if(!this._dirty)return;const i=this._createDataBuffer(t);e.vertexBuffers.data?.setData(i),this._dirty=!1}_createDataBuffer(i){const n=i.reduce(((e,t)=>e+ye(t)),0);this._count=n;const s=Ae.createBuffer(n),a=this._origin;let r=0,l=0;for(const n of i){for(let i=0;i<n.length;i+=3){const o=e(Se,n[i],n[i+1],n[i+2]);0===i?l=this._renderCoordsHelper.getAltitude(o):this._renderCoordsHelper.setAltitude(o,l);const c=this._renderCoordsHelper.worldUpAtPosition(o,Ce),h=r+2*i,d=t(Se,o,a);if(i<n.length-3){s.up.setVec(h,c),s.up.setVec(h+3,c),s.up.setVec(h+5,c);for(let e=0;e<6;e++)s.start.setVec(h+e,d);s.extrude.setValues(h,0,-1),s.extrude.setValues(h+1,1,-1),s.extrude.setValues(h+2,1,1),s.extrude.setValues(h+3,0,-1),s.extrude.setValues(h+4,1,1),s.extrude.setValues(h+5,0,1)}if(i>0){s.up.setVec(h-2,c),s.up.setVec(h-4,c),s.up.setVec(h-5,c);for(let e=-6;e<0;e++)s.end.setVec(h+e,d)}}r+=ye(n)}return s.buffer}}function ye(e){return 2*(e.length/3-1)*3}const Ce=c(),Se=c(),Ae=T().vec3f(F.START).vec3f(F.END).vec3f(F.UP).vec2f(F.EXTRUDE);class Me extends ce{constructor(){super(...arguments),this.contrastControlEnabled=!1}}m([oe()],Me.prototype,"contrastControlEnabled",void 0);const Re=he(6);function je(e){return k(Oe,Math.cos(e.angleCutoff),Math.cos(Math.max(0,e.angleCutoff-he(2))))}function Te(e,t,i){return a(We,e,i),r(Ie,t),Ie[3]=0,ue(Ie,Ie,i),_e(We,Ie,Ue)}const Oe=$(),qe=c(),Ie=fe(),ze=c(),Ne=c(),We=c(),Ue=ge(),He=Pe(),Be=Object.freeze(Object.defineProperty({__proto__:null,build:function(e){const c=new I;c.include(be),c.include(ve,e);const h=c.fragment;if(e.lineVerticalPlaneEnabled||e.heightManifoldEnabled)if(h.uniforms.add(new K("maxPixelDistance",((t,i)=>e.heightManifoldEnabled?2*i.camera.computeScreenPixelSizeAt(t.heightManifoldTarget):2*i.camera.computeScreenPixelSizeAt(t.lineVerticalPlaneSegment.origin)))),h.code.add(Z`float planeDistancePixels(vec4 plane, vec3 pos) {
float dist = dot(plane.xyz, pos) + plane.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`),e.spherical){const e=(e,t,i)=>a(e,t.heightManifoldTarget,i.camera.viewMatrix),r=(e,t)=>a(e,[0,0,0],t.camera.viewMatrix);h.uniforms.add(new H("heightManifoldOrigin",((s,a)=>(e(qe,s,a),r(Ne,a),t(Ne,Ne,qe),i(Ie,Ne),Ie[3]=n(Ne),Ie))),new Q("globalOrigin",((e,t)=>r(qe,t))),new K("cosSphericalAngleThreshold",((e,t)=>1-Math.max(2,s(t.camera.eye,e.heightManifoldTarget)*t.camera.perRenderPixelRatio)/n(e.heightManifoldTarget)))),h.code.add(Z`float globeDistancePixels(float posInGlobalOriginLength) {
float dist = abs(posInGlobalOriginLength - heightManifoldOrigin.w);
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}
float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
vec3 posInGlobalOriginNorm = normalize(globalOrigin - pos);
float cosAngle = dot(posInGlobalOriginNorm, heightManifoldOrigin.xyz);
vec3 posInGlobalOrigin = globalOrigin - pos;
float posInGlobalOriginLength = length(posInGlobalOrigin);
float sphericalDistance = globeDistancePixels(posInGlobalOriginLength);
float planarDistance = planeDistancePixels(heightPlane, pos);
return cosAngle < cosSphericalAngleThreshold ? sphericalDistance : planarDistance;
}`)}else h.code.add(Z`float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
return planeDistancePixels(heightPlane, pos);
}`);if(e.pointDistanceEnabled&&(h.uniforms.add(new K("maxPixelDistance",((e,t)=>2*t.camera.computeScreenPixelSizeAt(e.pointDistanceTarget)))),h.code.add(Z`float sphereDistancePixels(vec4 sphere, vec3 pos) {
float dist = distance(sphere.xyz, pos) - sphere.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`)),e.intersectsLineEnabled&&(h.uniforms.add(new K("perScreenPixelRatio",((e,t)=>t.camera.perScreenPixelRatio))),h.code.add(Z`float lineDistancePixels(vec3 start, vec3 dir, float radius, vec3 pos) {
float dist = length(cross(dir, pos - start)) / (length(pos) * perScreenPixelRatio);
return abs(dist) - radius;
}`)),(e.lineVerticalPlaneEnabled||e.intersectsLineEnabled)&&h.code.add(Z`bool pointIsWithinLine(vec3 pos, vec3 start, vec3 end) {
vec3 dir = end - start;
float t2 = dot(dir, pos - start);
float l2 = dot(dir, dir);
return t2 >= 0.0 && t2 <= l2;
}`),h.code.add(Z`void main() {
vec3 pos;
vec3 normal;
float angleCutoffAdjust;
float depthDiscontinuityAlpha;
if (!laserlineReconstructFromDepth(pos, normal, angleCutoffAdjust, depthDiscontinuityAlpha)) {
discard;
}
vec4 color = vec4(0, 0, 0, 0);`),e.heightManifoldEnabled){h.uniforms.add(new z("angleCutoff",(e=>je(e))),new H("heightPlane",((e,t)=>Te(e.heightManifoldTarget,e.renderCoordsHelper.worldUpAtPosition(e.heightManifoldTarget,qe),t.camera.viewMatrix))));const t=e.spherical?Z`normalize(globalOrigin - pos)`:Z`heightPlane.xyz`;h.code.add(Z`
    {
      vec2 angleCutoffAdjusted = angleCutoff - angleCutoffAdjust;

      // Fade out laserlines on flat surfaces
      float heightManifoldAlpha = 1.0 - smoothstep(angleCutoffAdjusted.x, angleCutoffAdjusted.y, abs(dot(normal, ${t})));

      vec4 heightManifoldColor = laserlineProfile(heightManifoldDistancePixels(heightPlane, pos));
      color = max(color, heightManifoldColor * heightManifoldAlpha);
    }
    `)}return e.pointDistanceEnabled&&(h.uniforms.add(new z("angleCutoff",(e=>je(e))),new H("pointDistanceSphere",((e,t)=>function(e,t){return a(me(He),e.pointDistanceOrigin,t.camera.viewMatrix),He[3]=s(e.pointDistanceOrigin,e.pointDistanceTarget),He}(e,t)))),h.code.add(Z`{
float pointDistanceSphereDistance = sphereDistancePixels(pointDistanceSphere, pos);
vec4 pointDistanceSphereColor = laserlineProfile(pointDistanceSphereDistance);
float pointDistanceSphereAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, normalize(pos - pointDistanceSphere.xyz))));
color = max(color, pointDistanceSphereColor * pointDistanceSphereAlpha);
}`)),e.lineVerticalPlaneEnabled&&(h.uniforms.add(new z("angleCutoff",(e=>je(e))),new H("lineVerticalPlane",((e,t)=>function(e,t){const n=p(e.lineVerticalPlaneSegment,.5,qe),s=e.renderCoordsHelper.worldUpAtPosition(n,ze),a=i(Ne,e.lineVerticalPlaneSegment.vector),r=l(qe,s,a);return i(r,r),Te(e.lineVerticalPlaneSegment.origin,r,t.camera.viewMatrix)}(e,t))),new Q("lineVerticalStart",((e,t)=>function(e,t){const i=r(qe,e.lineVerticalPlaneSegment.origin);return e.renderCoordsHelper.setAltitude(i,0),a(i,i,t.camera.viewMatrix)}(e,t))),new Q("lineVerticalEnd",((e,t)=>function(e,t){const i=o(qe,e.lineVerticalPlaneSegment.origin,e.lineVerticalPlaneSegment.vector);return e.renderCoordsHelper.setAltitude(i,0),a(i,i,t.camera.viewMatrix)}(e,t)))),h.code.add(Z`{
if (pointIsWithinLine(pos, lineVerticalStart, lineVerticalEnd)) {
float lineVerticalDistance = planeDistancePixels(lineVerticalPlane, pos);
vec4 lineVerticalColor = laserlineProfile(lineVerticalDistance);
float lineVerticalAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, lineVerticalPlane.xyz)));
color = max(color, lineVerticalColor * lineVerticalAlpha);
}
}`)),e.intersectsLineEnabled&&(h.uniforms.add(new z("angleCutoff",(e=>je(e))),new Q("intersectsLineStart",((e,t)=>a(qe,e.lineStartWorld,t.camera.viewMatrix))),new Q("intersectsLineEnd",((e,t)=>a(qe,e.lineEndWorld,t.camera.viewMatrix))),new Q("intersectsLineDirection",((e,t)=>(r(Ie,e.intersectsLineSegment.vector),Ie[3]=0,i(qe,ue(Ie,Ie,t.camera.viewMatrix))))),new K("intersectsLineRadius",(e=>e.intersectsLineRadius))),h.code.add(Z`{
if (pointIsWithinLine(pos, intersectsLineStart, intersectsLineEnd)) {
float intersectsLineDistance = lineDistancePixels(intersectsLineStart, intersectsLineDirection, intersectsLineRadius, pos);
vec4 intersectsLineColor = laserlineProfile(intersectsLineDistance);
float intersectsLineAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, 1.0 - abs(dot(normal, intersectsLineDirection)));
color = max(color, intersectsLineColor * intersectsLineAlpha);
}
}`)),h.code.add(Z`fragColor = laserlineOutput(color * depthDiscontinuityAlpha);
}`),c},defaultAngleCutoff:Re},Symbol.toStringTag,{value:"Module"}));class Fe extends ee{constructor(){super(...arguments),this.innerColor=h(1,1,1),this.innerWidth=1,this.glowColor=h(1,.5,0),this.glowWidth=8,this.glowFalloff=8,this.globalAlpha=.75,this.globalAlphaContrastBoost=2,this.angleCutoff=he(6),this.pointDistanceOrigin=c(),this.pointDistanceTarget=c(),this.lineVerticalPlaneSegment=u(),this.intersectsLineSegment=u(),this.intersectsLineRadius=3,this.heightManifoldTarget=c(),this.lineStartWorld=c(),this.lineEndWorld=c()}}class Ge extends N{initializeProgram(e){return new W(e.rctx,Ge.shader.get().build(this.configuration),de)}initializePipeline(){return se({blending:ae(te.ONE,te.ONE_MINUS_SRC_ALPHA),colorWrite:re})}}Ge.shader=new U(Be,(()=>Promise.resolve().then((()=>Be))));class Xe extends Me{constructor(){super(...arguments),this.heightManifoldEnabled=!1,this.pointDistanceEnabled=!1,this.lineVerticalPlaneEnabled=!1,this.intersectsLineEnabled=!1,this.spherical=!1}}m([oe()],Xe.prototype,"heightManifoldEnabled",void 0),m([oe()],Xe.prototype,"pointDistanceEnabled",void 0),m([oe()],Xe.prototype,"lineVerticalPlaneEnabled",void 0),m([oe()],Xe.prototype,"intersectsLineEnabled",void 0),m([oe()],Xe.prototype,"spherical",void 0);let ke=class extends A{constructor(e){super(e),this._technique=null,this._heightManifoldEnabled=!1,this._pointDistanceEnabled=!1,this._lineVerticalPlaneEnabled=!1,this._intersectsLineEnabled=!1,this._intersectsLineInfinite=!1,this._pathVerticalPlaneEnabled=!1,this._pathVerticalPlaneData=null,this._pathTechnique=null,this._passParameters=new Fe,this.produces=new Map([[B.LASERLINES,()=>!this.contrastControlEnabled],[B.LASERLINES_CONTRAST_CONTROL,()=>this.contrastControlEnabled]])}initialize(){this._passParameters.renderCoordsHelper=this.renderCoordsHelper}consumes(){return M}get isDecoration(){return this._isDecoration}get heightManifoldEnabled(){return this._heightManifoldEnabled}set heightManifoldEnabled(e){this._heightManifoldEnabled!==e&&(this._heightManifoldEnabled=e,this._requestRender())}get heightManifoldTarget(){return this._passParameters.heightManifoldTarget}set heightManifoldTarget(e){r(this._passParameters.heightManifoldTarget,e),this._requestRender()}get pointDistanceEnabled(){return this._pointDistanceEnabled}set pointDistanceEnabled(e){e!==this._pointDistanceEnabled&&(this._pointDistanceEnabled=e,this._requestRender())}get pointDistanceTarget(){return this._passParameters.pointDistanceTarget}set pointDistanceTarget(e){r(this._passParameters.pointDistanceTarget,e),this._requestRender()}get pointDistanceOrigin(){return this._passParameters.pointDistanceOrigin}set pointDistanceOrigin(e){r(this._passParameters.pointDistanceOrigin,e),this._requestRender()}get lineVerticalPlaneEnabled(){return this._lineVerticalPlaneEnabled}set lineVerticalPlaneEnabled(e){e!==this._lineVerticalPlaneEnabled&&(this._lineVerticalPlaneEnabled=e,this._requestRender())}get lineVerticalPlaneSegment(){return this._passParameters.lineVerticalPlaneSegment}set lineVerticalPlaneSegment(e){f(e,this._passParameters.lineVerticalPlaneSegment),this._requestRender()}get intersectsLineEnabled(){return this._intersectsLineEnabled}set intersectsLineEnabled(e){e!==this._intersectsLineEnabled&&(this._intersectsLineEnabled=e,this._requestRender())}get intersectsLineSegment(){return this._passParameters.intersectsLineSegment}set intersectsLineSegment(e){f(e,this._passParameters.intersectsLineSegment),this._requestRender()}get intersectsLineRadius(){return this._passParameters.intersectsLineRadius}set intersectsLineRadius(e){e!==this._passParameters.intersectsLineRadius&&(this._passParameters.intersectsLineRadius=e,this._requestRender())}get intersectsLineInfinite(){return this._intersectsLineInfinite}set intersectsLineInfinite(e){e!==this._intersectsLineInfinite&&(this._intersectsLineInfinite=e,this._requestRender())}get pathVerticalPlaneEnabled(){return this._pathVerticalPlaneEnabled}set pathVerticalPlaneEnabled(e){e!==this._pathVerticalPlaneEnabled&&(this._pathVerticalPlaneEnabled=e,null!=this._pathVerticalPlaneData&&this._requestRender())}set pathVerticalPlaneVertices(e){null==this._pathVerticalPlaneData&&(this._pathVerticalPlaneData=new Le(this._passParameters.renderCoordsHelper)),this._pathVerticalPlaneData.vertices=e,this.pathVerticalPlaneEnabled&&this._requestRender()}set pathVerticalPlaneBuffers(e){null==this._pathVerticalPlaneData&&(this._pathVerticalPlaneData=new Le(this._passParameters.renderCoordsHelper)),this._pathVerticalPlaneData.buffers=e,this.pathVerticalPlaneEnabled&&this._requestRender()}setParameters(e){pe(this._passParameters,e)&&this._requestRender()}initializeRenderContext(e){this._context=e,this._techniques=e.techniques,this._techniqueConfig=new Xe;const t=new Me;t.contrastControlEnabled=this.contrastControlEnabled,this._pathTechnique=this._techniques.acquire(Ve,t)}uninitializeRenderContext(){this._technique=P(this._technique),this._pathVerticalPlaneData=b(this._pathVerticalPlaneData),this._pathTechnique=P(this._pathTechnique)}prepareTechnique(){return this.heightManifoldEnabled||this.pointDistanceEnabled||this.lineVerticalPlaneSegment||this.intersectsLineEnabled?(this._techniqueConfig.heightManifoldEnabled=this.heightManifoldEnabled,this._techniqueConfig.lineVerticalPlaneEnabled=this.lineVerticalPlaneEnabled,this._techniqueConfig.pointDistanceEnabled=this.pointDistanceEnabled,this._techniqueConfig.intersectsLineEnabled=this.intersectsLineEnabled,this._techniqueConfig.contrastControlEnabled=this.contrastControlEnabled,this._techniqueConfig.spherical=this.viewingMode===C.Global,this._technique=this._techniques.releaseAndAcquire(Ge,this._techniqueConfig,this._technique),this._technique):this._pathTechnique}renderNode(e,t,i){const n=i?.get("normals")?.getTexture();n&&(this._passParameters.normals=n,(this.heightManifoldEnabled||this.pointDistanceEnabled||this.lineVerticalPlaneSegment||this.intersectsLineEnabled)&&this._renderUnified(e,t),this.pathVerticalPlaneEnabled&&this._renderPath(e))}_renderUnified(e,t){const i=e.rctx;this._updatePassParameters(e),i.bindTechnique(t,e.bindParameters,this._passParameters),i.screen.draw()}_renderPath(e){if(null==this._pathVerticalPlaneData||null==this._pathTechnique)return;const t=e.rctx,i=this._pathTechnique;t.bindTechnique(i,e.bindParameters,{...this._passParameters,origin:this._pathVerticalPlaneData.origin}),this._pathVerticalPlaneData.draw(e.rctx)}_updatePassParameters(e){if(!this._intersectsLineEnabled)return;const t=e.bindParameters.camera;if(this._intersectsLineInfinite){if(D(y(this._passParameters.intersectsLineSegment.origin,this._passParameters.intersectsLineSegment.vector),$e),$e.c0=-Number.MAX_VALUE,!V(t.frustum,$e))return;E($e,this._passParameters.lineStartWorld),L($e,this._passParameters.lineEndWorld)}else r(this._passParameters.lineStartWorld,this._passParameters.intersectsLineSegment.origin),o(this._passParameters.lineEndWorld,this._passParameters.intersectsLineSegment.origin,this._passParameters.intersectsLineSegment.vector)}_requestRender(){this._context&&this._context.requestRender()}get test(){}};m([v({constructOnly:!0})],ke.prototype,"viewingMode",void 0),m([v({constructOnly:!0})],ke.prototype,"contrastControlEnabled",void 0),m([v({constructOnly:!0})],ke.prototype,"_isDecoration",void 0),m([v({constructOnly:!0})],ke.prototype,"renderCoordsHelper",void 0),ke=m([w("esri.views.3d.webgl-engine.effects.laserlines.LaserLineRenderer")],ke);const $e=x();class Je extends _{constructor(e){super(e),this._angleCutoff=Re,this._style={},this._heightManifoldTarget=c(),this._heightManifoldEnabled=!1,this._intersectsLine=u(),this._intersectsLineEnabled=!1,this._intersectsLineInfinite=!1,this._lineVerticalPlaneSegment=null,this._pathVerticalPlaneBuffers=null,this._pointDistanceLine=null,this.applyProperties(e)}get testData(){}createResources(){this._ensureRenderer()}destroyResources(){this._disposeRenderer()}updateVisibility(){this._syncRenderer(),this._syncHeightManifold(),this._syncIntersectsLine(),this._syncPathVerticalPlane(),this._syncLineVerticalPlane(),this._syncPointDistance()}get angleCutoff(){return this._angleCutoff}set angleCutoff(e){this._angleCutoff!==e&&(this._angleCutoff=e,this._syncAngleCutoff())}get style(){return this._style}set style(e){this._style=e,this._syncStyle()}get heightManifoldTarget(){return this._heightManifoldEnabled?this._heightManifoldTarget:null}set heightManifoldTarget(e){null!=e?(r(this._heightManifoldTarget,e),this._heightManifoldEnabled=!0):this._heightManifoldEnabled=!1,this._syncRenderer(),this._syncHeightManifold()}set intersectsWorldUpAtLocation(e){if(null==e)return void(this.intersectsLine=null);const t=this.view.renderCoordsHelper.worldUpAtPosition(e,Ke);this.intersectsLine=g(e,t),this.intersectsLineInfinite=!0}get intersectsLine(){return this._intersectsLineEnabled?this._intersectsLine:null}set intersectsLine(e){null!=e?(f(e,this._intersectsLine),this._intersectsLineEnabled=!0):this._intersectsLineEnabled=!1,this._syncIntersectsLine(),this._syncRenderer()}get intersectsLineInfinite(){return this._intersectsLineInfinite}set intersectsLineInfinite(e){this._intersectsLineInfinite=e,this._syncIntersectsLineInfinite()}get lineVerticalPlaneSegment(){return this._lineVerticalPlaneSegment}set lineVerticalPlaneSegment(e){this._lineVerticalPlaneSegment=null!=e?f(e):null,this._syncLineVerticalPlane(),this._syncRenderer()}get pathVerticalPlane(){return this._pathVerticalPlaneBuffers}set pathVerticalPlane(e){this._pathVerticalPlaneBuffers=e,this._syncPathVerticalPlane(),this._syncLineVerticalPlane(),this._syncPointDistance(),this._syncRenderer()}get pointDistanceLine(){return this._pointDistanceLine}set pointDistanceLine(e){this._pointDistanceLine=null!=e?{origin:d(e.origin),target:e.target?d(e.target):null}:null,this._syncPointDistance(),this._syncRenderer()}_syncRenderer(){this.attached&&this.visible&&(this._intersectsLineEnabled||this._heightManifoldEnabled||null!=this._pointDistanceLine||null!=this._pathVerticalPlaneBuffers)?this._ensureRenderer():this._disposeRenderer()}_ensureRenderer(){null==this._renderer&&(this._renderer=new ke({renderCoordsHelper:this.view.renderCoordsHelper,contrastControlEnabled:!0,_isDecoration:this.isDecoration,viewingMode:this.view.state.viewingMode}),this._syncStyle(),this._syncHeightManifold(),this._syncIntersectsLine(),this._syncIntersectsLineInfinite(),this._syncPathVerticalPlane(),this._syncLineVerticalPlane(),this._syncPointDistance(),this._syncAngleCutoff(),this.view._stage&&this.view._stage.addRenderPlugin(this._renderer))}_syncStyle(){null!=this._renderer&&(this._renderer.setParameters(this._style),null!=this._style.intersectsLineRadius&&(this._renderer.intersectsLineRadius=this._style.intersectsLineRadius))}_syncAngleCutoff(){null!=this._renderer&&this._renderer.setParameters({angleCutoff:this._angleCutoff})}_syncHeightManifold(){null!=this._renderer&&(this._renderer.heightManifoldEnabled=this._heightManifoldEnabled&&this.visible,this._heightManifoldEnabled&&(this._renderer.heightManifoldTarget=this._heightManifoldTarget))}_syncIntersectsLine(){null!=this._renderer&&(this._renderer.intersectsLineEnabled=this._intersectsLineEnabled&&this.visible,this._intersectsLineEnabled&&(this._renderer.intersectsLineSegment=this._intersectsLine))}_syncIntersectsLineInfinite(){null!=this._renderer&&(this._renderer.intersectsLineInfinite=this._intersectsLineInfinite)}_syncPathVerticalPlane(){null!=this._renderer&&(this._renderer.pathVerticalPlaneEnabled=null!=this._pathVerticalPlaneBuffers&&this.visible,null!=this._pathVerticalPlaneBuffers&&(this._renderer.pathVerticalPlaneBuffers=this._pathVerticalPlaneBuffers))}_syncLineVerticalPlane(){null!=this._renderer&&(this._renderer.lineVerticalPlaneEnabled=null!=this._lineVerticalPlaneSegment&&this.visible,null!=this._lineVerticalPlaneSegment&&(this._renderer.lineVerticalPlaneSegment=this._lineVerticalPlaneSegment))}_syncPointDistance(){if(null==this._renderer)return;const e=this._pointDistanceLine,t=null!=e;this._renderer.pointDistanceEnabled=t&&null!=e.target&&this.visible,t&&(this._renderer.pointDistanceOrigin=e.origin,null!=e.target&&(this._renderer.pointDistanceTarget=e.target))}_disposeRenderer(){null!=this._renderer&&this.view._stage&&(this.view._stage.removeRenderPlugin(this._renderer),this._renderer=null)}}const Ke=c();export{Je as L};
