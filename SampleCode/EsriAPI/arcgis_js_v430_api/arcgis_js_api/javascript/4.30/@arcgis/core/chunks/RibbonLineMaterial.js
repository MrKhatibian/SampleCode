/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import{h as e}from"../core/lang.js";import{d as t,m as i,p as r}from"./mat4.js";import{I as a,c as o}from"./mat4f64.js";import{a as s,h as n,j as l,s as c,i as d,g as p,p as h,c as u,d as f,b as m,l as v}from"./vec3.js";import{f as g,c as S}from"./vec3f64.js";import{g as T,b as _}from"./sphere.js";import{d as y}from"./mathUtils2.js";import{O as b}from"./basicInterfaces.js";import{d as A,C as O,M as C,R as E}from"./Material.js";import{L as R,Y as L,Z as x,h as D,D as P,I,V as w,c as j,J as N,g as z,F as U,T as F,S as M,U as W,v as V,d as B,b as k,m as G,e as J,C as H,w as $,j as Y,P as Z,x as q,o as Q,k as X,l as K,p as ee,s as te,q as ie,r as re,A as ae,_ as oe,$ as se,a0 as ne,a1 as le,a2 as ce,R as de,u as pe,a as he,y as ue}from"./StencilUtils.js";import{a as fe,i as me}from"./Util.js";import{a as ve,V as ge}from"./VertexAttribute.js";import Se from"../core/Evented.js";import Te from"../core/Handles.js";import{d as _e}from"./maybe.js";import{P as ye}from"../core/scheduling.js";import{O as be}from"./Octree.js";import{L as Ae}from"./Logger.js";import{c as Oe}from"./mathUtils.js";import{g as Ce}from"./screenUtils.js";import{m as Ee}from"./vec2.js";import{Z as Re,c as Le,O as xe}from"./vec4f64.js";import{e as De}from"./frustum.js";import{c as Pe,d as Ie,f as we,i as je}from"./lineSegment.js";import{c as Ne,f as ze,z as Ue,g as Fe}from"./plane.js";import{n as Me}from"./InterleavedLayout.js";import{S as We,c as Ve,F as Be,R as ke,a as Ge,j as Je,f as He,k as $e,g as Ye}from"./Matrix4PassUniform.js";import{_ as Ze}from"./tslib.es6.js";import{p as qe}from"./ShaderTechniqueConfiguration.js";import{g as Qe}from"./interfaces3.js";import{p as Xe}from"./floatRGBA.js";import{g as Ke}from"../core/Accessor.js";import{d as et,T as tt,l as it,P as rt}from"./enums.js";import{a as at,T as ot}from"./Texture.js";import{s as st}from"./vec4.js";import{m as nt,d as lt,a as ct}from"./renderState.js";class dt extends A{get geometries(){return this._geometries}get transformation(){return this._transformation??a}set transformation(e){this._transformation=t(this._transformation??o(),e),this._invalidateBoundingVolume(),this._emit("transformationChanged",this)}get shaderTransformation(){return this._shaderTransformation}set shaderTransformation(e){this._shaderTransformation=e?t(this._shaderTransformation??o(),e):null,this._invalidateBoundingVolume(),this._emit("shaderTransformationChanged",this)}get effectiveTransformation(){return this.shaderTransformation??this.transformation}constructor(e={}){super(),this.type=O.Object,this._shaderTransformation=null,this._parentLayer=null,this._visible=!0,this.castShadow=e.castShadow??!0,this.usesVerticalDistanceToGround=e.usesVerticalDistanceToGround??!1,this.graphicUid=e.graphicUid,this.layerUid=e.layerUid,e.isElevationSource&&(this.lastValidElevationBB=new pt),this._geometries=e.geometries?Array.from(e.geometries):new Array}dispose(){this._geometries.length=0}get parentLayer(){return this._parentLayer}set parentLayer(e){fe(null==this._parentLayer||null==e,"Object3D can only be added to a single Layer"),this._parentLayer=e}addGeometry(e){e.visible=this._visible,this._geometries.push(e),this._emit("geometryAdded",{object:this,geometry:e}),this._invalidateBoundingVolume()}removeGeometry(e){const t=this._geometries.splice(e,1)[0];t&&(this._emit("geometryRemoved",{object:this,geometry:t}),this._invalidateBoundingVolume())}removeAllGeometries(){for(;this._geometries.length>0;)this.removeGeometry(0)}geometryVertexAttributeUpdated(e,t,i=!1){this._emit("attributesChanged",{object:this,geometry:e,attribute:t,sync:i}),ve(t)&&this._invalidateBoundingVolume()}get visible(){return this._visible}set visible(e){if(this._visible!==e){this._visible=e;for(const e of this._geometries)e.visible=this._visible;this._emit("visibilityChanged",this)}}maskOccludee(){const e=new R(b.MaskOccludee);for(const t of this._geometries)t.occludees=L(t.occludees,e);return this._emit("occlusionChanged",this),e}removeOcclude(e){for(const t of this._geometries)t.occludees=x(t.occludees,e);this._emit("occlusionChanged",this)}highlight(){const e=new R(b.Highlight);for(const t of this._geometries)t.highlights=L(t.highlights,e);return this._emit("highlightChanged",this),e}removeHighlight(e){for(const t of this._geometries)t.highlights=x(t.highlights,e);this._emit("highlightChanged",this)}getCombinedStaticTransformation(e,t){return i(t,this.transformation,e.transformation)}getCombinedShaderTransformation(e,t=o()){return i(t,this.effectiveTransformation,e.transformation)}get boundingVolumeWorldSpace(){return this._bvWorldSpace||(this._bvWorldSpace=this._bvWorldSpace||new ht,this._validateBoundingVolume(this._bvWorldSpace,St.WorldSpace)),this._bvWorldSpace}get boundingVolumeObjectSpace(){return this._bvObjectSpace||(this._bvObjectSpace=this._bvObjectSpace||new ht,this._validateBoundingVolume(this._bvObjectSpace,St.ObjectSpace)),this._bvObjectSpace}_validateBoundingVolume(e,t){const i=t===St.ObjectSpace;for(const t of this._geometries){const r=t.boundingInfo;r&&ut(r,e,i?t.transformation:this.getCombinedShaderTransformation(t))}s(T(e.bounds),e.min,e.max,.5);for(const t of this._geometries){const r=t.boundingInfo;if(null==r)continue;const a=i?t.transformation:this.getCombinedShaderTransformation(t),o=y(a);n(gt,r.center,a);const s=l(gt,T(e.bounds)),c=r.radius*o;e.bounds[3]=Math.max(e.bounds[3],s+c)}}_invalidateBoundingVolume(){const e=this._bvWorldSpace?.bounds;this._bvObjectSpace=this._bvWorldSpace=void 0,this._parentLayer&&e&&this._parentLayer.notifyObjectBBChanged(this,e)}_emit(e,t){this._parentLayer&&this._parentLayer.events.emit(e,t)}get test(){}}class pt{constructor(){this.min=g(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),this.max=g(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE)}isEmpty(){return this.max[0]<this.min[0]&&this.max[1]<this.min[1]&&this.max[2]<this.min[2]}}class ht extends pt{constructor(){super(...arguments),this.bounds=_()}}function ut(e,t,i){const a=e.bbMin,o=e.bbMax;if(r(i)){const e=c(ft,i[12],i[13],i[14]);d(mt,a,e),d(vt,o,e);for(let e=0;e<3;++e)t.min[e]=Math.min(t.min[e],mt[e]),t.max[e]=Math.max(t.max[e],vt[e])}else if(n(mt,a,i),p(a,o))for(let e=0;e<3;++e)t.min[e]=Math.min(t.min[e],mt[e]),t.max[e]=Math.max(t.max[e],mt[e]);else{n(vt,o,i);for(let e=0;e<3;++e)t.min[e]=Math.min(t.min[e],mt[e],vt[e]),t.max[e]=Math.max(t.max[e],mt[e],vt[e]);for(let e=0;e<3;++e){h(mt,a),h(vt,o),mt[e]=o[e],vt[e]=a[e],n(mt,mt,i),n(vt,vt,i);for(let e=0;e<3;++e)t.min[e]=Math.min(t.min[e],mt[e],vt[e]),t.max[e]=Math.max(t.max[e],mt[e],vt[e])}}}const ft=S(),mt=S(),vt=S(),gt=S();var St,Tt;!function(e){e[e.WorldSpace=0]="WorldSpace",e[e.ObjectSpace=1]="ObjectSpace"}(St||(St={})),function(e){e[e.ASYNC=0]="ASYNC",e[e.SYNC=1]="SYNC"}(Tt||(Tt={}));const _t=["layerObjectAdded","layerObjectRemoved","layerObjectsAdded","layerObjectsRemoved","transformationChanged","shaderTransformationChanged","visibilityChanged","occlusionChanged","highlightChanged","geometryAdded","geometryRemoved","attributesChanged"];class yt extends A{get objects(){return this._objects}constructor(e,t,i=""){super(),this.stage=e,this.apiLayerUid=i,this.type=O.Layer,this.events=new Se,this.visible=!0,this.pickable=!0,this.sliceable=!1,this._objects=new ye,this._objectsAdded=new ye,this._handles=new Te,this.apiLayerUid=i,this.visible=t?.visible??!0,this.pickable=t?.pickable??!0,this.updatePolicy=t?.updatePolicy??Tt.ASYNC,this._disableOctree=t?.disableOctree??!1,e.add(this);for(const t of _t)this._handles.add(this.events.on(t,(i=>e.handleEvent(t,i))))}destroy(){this._handles.size&&(this._handles.destroy(),this.stage.remove(this),this.invalidateSpatialQueryAccelerator())}add(e){this._objects.push(e),e.parentLayer=this,this.events.emit("layerObjectAdded",{layer:this,object:e}),null!=this._octree&&this._objectsAdded.push(e)}remove(e){this._objects.removeUnordered(e)&&(e.parentLayer=null,this.events.emit("layerObjectRemoved",{layer:this,object:e}),null!=this._octree&&(this._objectsAdded.removeUnordered(e)||this._octree.remove([e])))}addMany(e){this._objects.pushArray(e);for(const t of e)t.parentLayer=this;this.events.emit("layerObjectsAdded",{layer:this,objects:e}),null!=this._octree&&this._objectsAdded.pushArray(e)}removeMany(e){const t=new Array;if(this._objects.removeUnorderedMany(e,e.length,t),0!==t.length){for(const e of t)e.parentLayer=null;if(this.events.emit("layerObjectsRemoved",{layer:this,objects:t}),null!=this._octree){for(let e=0;e<t.length;)this._objectsAdded.removeUnordered(t[e])?(t[e]=t[t.length-1],t.length-=1):++e;this._octree.remove(t)}}}sync(){this.updatePolicy!==Tt.SYNC&&this.stage.syncLayer(this.id)}notifyObjectBBChanged(e,t){null==this._octree||this._objectsAdded.includes(e)||this._octree.update(e,t)}getSpatialQueryAccelerator(){return null==this._octree&&this._objects.length>50&&!this._disableOctree?(this._octree=new be((e=>e.boundingVolumeWorldSpace.bounds)),this._octree.add(this._objects.data,this._objects.length)):null!=this._octree&&this._objectsAdded.length>0&&(this._octree.add(this._objectsAdded.data,this._objectsAdded.length),this._objectsAdded.clear()),this._octree}invalidateSpatialQueryAccelerator(){this._octree=_e(this._octree),this._objectsAdded.clear()}}function bt(e){return null!=e&&e.type===O.Layer}var At,Ot;!function(e){e[e.Draped=0]="Draped",e[e.Screen=1]="Screen",e[e.World=2]="World",e[e.COUNT=3]="COUNT"}(At||(At={})),function(e){e[e.Center=0]="Center",e[e.Tip=1]="Tip",e[e.COUNT=2]="COUNT"}(Ot||(Ot={}));class Ct extends P{constructor(){super(...arguments),this.output=We.Color,this.transparencyPassType=D.NONE,this.occluder=!1,this.hasSlicePlane=!1,this.writeDepth=!1,this.space=At.Screen,this.hideOnShortSegments=!1,this.hasCap=!1,this.anchor=Ot.Center,this.hasTip=!1,this.vvSize=!1,this.vvColor=!1,this.vvOpacity=!1,this.hasOccludees=!1,this.multipassEnabled=!1,this.cullAboveGround=!1}get draped(){return this.space===At.Draped}}function Et(e,t){const i=e.vertex;i.uniforms.add(new Ve("intrinsicWidth",(e=>e.width))),t.vvSize?(e.attributes.add(ge.SIZEFEATUREATTRIBUTE,"float"),i.uniforms.add(new Be("vvSizeMinSize",(e=>e.vvSize.minSize)),new Be("vvSizeMaxSize",(e=>e.vvSize.maxSize)),new Be("vvSizeOffset",(e=>e.vvSize.offset)),new Be("vvSizeFactor",(e=>e.vvSize.factor))),i.code.add(Qe`float getSize() {
return intrinsicWidth * clamp(vvSizeOffset + sizeFeatureAttribute * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).x;
}`)):(e.attributes.add(ge.SIZE,"float"),i.code.add(Qe`float getSize(){
return intrinsicWidth * size;
}`)),t.vvOpacity?(e.attributes.add(ge.OPACITYFEATUREATTRIBUTE,"float"),i.constants.add("vvOpacityNumber","int",8),i.uniforms.add(new I("vvOpacityValues",(e=>e.vvOpacity.values),8),new I("vvOpacityOpacities",(e=>e.vvOpacity.opacityValues),8)),i.code.add(Qe`float interpolateOpacity( float value ){
if (value <= vvOpacityValues[0]) {
return vvOpacityOpacities[0];
}
for (int i = 1; i < vvOpacityNumber; ++i) {
if (vvOpacityValues[i] >= value) {
float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
return mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f);
}
}
return vvOpacityOpacities[vvOpacityNumber - 1];
}
vec4 applyOpacity( vec4 color ){
return vec4(color.xyz, interpolateOpacity(opacityFeatureAttribute));
}`)):i.code.add(Qe`vec4 applyOpacity( vec4 color ){
return color;
}`),t.vvColor?(e.include(w,t),e.attributes.add(ge.COLORFEATUREATTRIBUTE,"float"),i.code.add(Qe`vec4 getColor(){
return applyOpacity(interpolateVVColor(colorFeatureAttribute));
}`)):(e.attributes.add(ge.COLOR,"vec4"),i.code.add(Qe`vec4 getColor(){
return applyOpacity(color);
}`))}Ze([qe({count:We.COUNT})],Ct.prototype,"output",void 0),Ze([qe({count:D.COUNT})],Ct.prototype,"transparencyPassType",void 0),Ze([qe()],Ct.prototype,"occluder",void 0),Ze([qe()],Ct.prototype,"hasSlicePlane",void 0),Ze([qe()],Ct.prototype,"writeDepth",void 0),Ze([qe({count:At.COUNT})],Ct.prototype,"space",void 0),Ze([qe()],Ct.prototype,"hideOnShortSegments",void 0),Ze([qe()],Ct.prototype,"hasCap",void 0),Ze([qe({count:Ot.COUNT})],Ct.prototype,"anchor",void 0),Ze([qe()],Ct.prototype,"hasTip",void 0),Ze([qe()],Ct.prototype,"vvSize",void 0),Ze([qe()],Ct.prototype,"vvColor",void 0),Ze([qe()],Ct.prototype,"vvOpacity",void 0),Ze([qe()],Ct.prototype,"hasOccludees",void 0),Ze([qe()],Ct.prototype,"multipassEnabled",void 0),Ze([qe()],Ct.prototype,"cullAboveGround",void 0),Ze([qe({constValue:!1})],Ct.prototype,"occlusionPass",void 0),Ze([qe({constValue:!0})],Ct.prototype,"hasVvInstancing",void 0),Ze([qe({constValue:!0})],Ct.prototype,"hasSliceTranslatedView",void 0);class Rt{constructor(e,t,i){this._createTexture=e,this._parametersKey=t,this._repository=new Map,this._orphanCache=i.newCache(`procedural-texture-repository:${Ke()}`,(e=>e.dispose()))}destroy(){for(const[e,{texture:t}]of this._repository)t.dispose();this._repository.clear(),this._orphanCache.destroy()}swap(e,t=null){const i=this._acquire(e);return this.release(t),i}release(e){if(null==e)return;const t=this._parametersKey(e),i=this._repository.get(t);if(i&&(i.refCount--,0===i.refCount)){this._repository.delete(t);const{texture:e}=i,r=e.usedMemory;this._orphanCache.put(t,e,r)}}_acquire(e){if(null==e)return null;const t=this._parametersKey(e),i=this._repository.get(t);if(i)return i.refCount++,i.texture;const r=this._orphanCache.pop(t)??this._createTexture(e),a=new Lt(r);return this._repository.set(t,a),r}}class Lt{constructor(e){this.texture=e,this.refCount=1}}function xt(e,t){return new Rt((t=>{const{encodedData:i,textureSize:r}=function(e){const t=Dt(e),i=1/e.pixelRatio,r=Pt(e),a=It(e),o=(Math.floor(.5*(a-1))+.5)*i,s=[];let n=1;for(const e of t){for(let t=0;t<e;t++){const r=n*(Math.min(t,e-1-t)+.5)*i/o*.5+.5;s.push(r)}n=-n}const l=Math.round(t[0]/2),c=[...s.slice(l),...s.slice(0,l)],d=new Uint8Array(4*r);let p=0;for(const e of c)Xe(e,d,p),p+=4;return{encodedData:d,textureSize:r}}(t),a=new at;return a.internalFormat=et.RGBA,a.width=r,a.height=1,a.wrapMode=tt.REPEAT,new ot(e,a,i)}),(e=>`${e.pattern.join(",")}-r${e.pixelRatio}`),t)}function Dt(e){return e.pattern.map((t=>Math.round(t*e.pixelRatio)))}function Pt(e){if(null==e)return 1;const t=Dt(e);return Math.floor(t.reduce(((e,t)=>e+t)))}function It(e){return Dt(e).reduce(((e,t)=>Math.max(e,t)))}const wt=Le();function jt(e,t){e.constants.add("stippleAlphaColorDiscard","float",.001),e.constants.add("stippleAlphaHighlightDiscard","float",.5),t.stippleEnabled?function(e,t){const i=!(t.draped&&t.stipplePreferContinuous),{vertex:r,fragment:a}=e;a.include(ke),t.draped||(j(r,t),r.uniforms.add(new Ve("worldToScreenPerDistanceRatio",((e,t)=>1/t.camera.perScreenPixelRatio))),r.code.add(Qe`float computeWorldToScreenRatio(vec3 segmentCenter) {
float segmentDistanceToCamera = length(segmentCenter - cameraPosition);
return worldToScreenPerDistanceRatio / segmentDistanceToCamera;
}`)),e.varyings.add("vStippleDistance","float"),e.varyings.add("vStippleDistanceLimits","vec2"),e.varyings.add("vStipplePatternStretch","float"),r.code.add(Qe`
    float discretizeWorldToScreenRatio(float worldToScreenRatio) {
      float step = ${zt};

      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);
      return discreteWorldToScreenRatio;
    }
  `),r.code.add(Qe`vec2 computeStippleDistanceLimits(float startPseudoScreen, float segmentLengthPseudoScreen, float segmentLengthScreen, float patternLength) {`),r.code.add(Qe`
    if (segmentLengthPseudoScreen >= ${i?"patternLength":"1e4"}) {
  `),N(r),r.code.add(Qe`float repetitions = segmentLengthScreen / (patternLength * pixelRatio);
float flooredRepetitions = max(1.0, floor(repetitions + 0.5));
float segmentLengthScreenRounded = flooredRepetitions * patternLength;
float stretch = repetitions / flooredRepetitions;
vStipplePatternStretch = max(0.75, stretch);
return vec2(0.0, segmentLengthScreenRounded);
}
return vec2(startPseudoScreen, startPseudoScreen + segmentLengthPseudoScreen);
}`),a.uniforms.add(new z("stipplePatternTexture",(e=>e.stippleTexture)),new Ve("stipplePatternSDFNormalizer",(e=>{return(t=e.stipplePattern)?(Math.floor(.5*(It(t)-1))+.5)/t.pixelRatio:1;var t})),new Ve("stipplePatternPixelSizeInv",(e=>1/Nt(e)))),a.code.add(Qe`float getStippleSDF(out bool isClamped) {
float stippleDistanceClamped = clamp(vStippleDistance, vStippleDistanceLimits.x, vStippleDistanceLimits.y);
vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;
float u = stippleDistanceClamped * gl_FragCoord.w * stipplePatternPixelSizeInv * vLineSizeInv;
u = fract(u);
float encodedSDF = rgba2float(texture(stipplePatternTexture, vec2(u, 0.5)));
float sdf = (encodedSDF * 2.0 - 1.0) * stipplePatternSDFNormalizer;
return (sdf - 0.5) * vStipplePatternStretch + 0.5;
}
float getStippleSDF() {
bool ignored;
return getStippleSDF(ignored);
}
float getStippleAlpha() {
bool isClamped;
float stippleSDF = getStippleSDF(isClamped);
float antiAliasedResult = clamp(stippleSDF * vLineWidth + 0.5, 0.0, 1.0);
return isClamped ? floor(antiAliasedResult + 0.5) : antiAliasedResult;
}`),t.stippleOffColorEnabled?(a.uniforms.add(new U("stippleOffColor",(e=>{return null==(t=e.stippleOffColor)?Re:4===t.length?t:st(wt,t[0],t[1],t[2],1);var t}))),a.code.add(Qe`#define discardByStippleAlpha(stippleAlpha, threshold) {}
#define blendStipple(color, stippleAlpha) mix(color, stippleOffColor, stippleAlpha)`)):a.code.add(Qe`#define discardByStippleAlpha(stippleAlpha, threshold) if (stippleAlpha < threshold) { discard; }
#define blendStipple(color, stippleAlpha) vec4(color.rgb, color.a * stippleAlpha)`)}(e,t):function(e){e.fragment.code.add(Qe`float getStippleAlpha() { return 1.0; }
#define discardByStippleAlpha(_stippleAlpha_, _threshold_) {}
#define blendStipple(color, _stippleAlpha_) color`)}(e)}function Nt(e){const t=e.stipplePattern;return t?Pt(e.stipplePattern)/t.pixelRatio:1}const zt=Qe.float(.4),Ut=128,Ft=.5;function Mt(e){return"cross"===e||"x"===e}function Wt(e,t=Ut,i=t*Ft,r=0){const a=Vt(e,t,i,r);return new F(a,{mipmap:!1,wrap:{s:tt.CLAMP_TO_EDGE,t:tt.CLAMP_TO_EDGE},width:t,height:t,components:4,noUnpackFlip:!0,reloadable:!0})}function Vt(e,t=Ut,i=t*Ft,r=0){switch(e){case"circle":default:return function(e,t){const i=e/2-.5;return Ht(e,Gt(i,i,t/2))}(t,i);case"square":return function(e,t){return Bt(e,t,!1)}(t,i);case"cross":return function(e,t,i=0){return kt(e,t,!1,i)}(t,i,r);case"x":return function(e,t,i=0){return kt(e,t,!0,i)}(t,i,r);case"kite":return function(e,t){return Bt(e,t,!0)}(t,i);case"triangle":return function(e,t){return Ht(e,Jt(e/2,t,t/2))}(t,i);case"arrow":return function(e,t){const i=t,r=t/2,a=e/2,o=.8*i,s=Gt(a,(e-t)/2-o,Math.sqrt(o*o+r*r)),n=Jt(a,i,r);return Ht(e,((e,t)=>Math.max(n(e,t),-s(e,t))))}(t,i)}}function Bt(e,t,i){return i&&(t/=Math.SQRT2),Ht(e,((r,a)=>{let o=r-.5*e+.25,s=.5*e-a-.75;if(i){const e=(o+s)/Math.SQRT2;s=(s-o)/Math.SQRT2,o=e}return Math.max(Math.abs(o),Math.abs(s))-.5*t}))}function kt(e,t,i,r=0){t-=r,i&&(t*=Math.SQRT2);const a=.5*t;return Ht(e,((t,o)=>{let s,n=t-.5*e,l=.5*e-o-1;if(i){const e=(n+l)/Math.SQRT2;l=(l-n)/Math.SQRT2,n=e}return n=Math.abs(n),l=Math.abs(l),s=n>l?n>a?Math.sqrt((n-a)*(n-a)+l*l):l:l>a?Math.sqrt(n*n+(l-a)*(l-a)):n,s-=r/2,s}))}function Gt(e,t,i){return(r,a)=>{const o=r-e,s=a-t;return Math.sqrt(o*o+s*s)-i}}function Jt(e,t,i){const r=Math.sqrt(t*t+i*i);return(a,o)=>{const s=Math.abs(a-e)-i,n=o-e+t/2+.75,l=(t*s+i*n)/r,c=-n;return Math.max(l,c)}}function Ht(e,t){const i=new Uint8Array(4*e*e);for(let r=0;r<e;r++)for(let a=0;a<e;a++){const o=a+e*r;let s=t(a,r);s=s/e+.5,Xe(s,i,4*o)}return i}const $t=64,Yt=32,Zt=10,qt=.25;function Qt(e,t){const i=Vt(e,64,32,6.4),r=new at;return r.internalFormat=et.RGBA,r.width=64,r.height=64,r.wrapMode=tt.CLAMP_TO_EDGE,new ot(t,r,i)}function Xt(e,t){const{vertex:i,constants:r}=e;r.add("markerSizePerLineWidth","float",10),N(i),null==i.uniforms.get("markerScale")&&i.constants.add("markerScale","float",1),i.code.add(Qe`float getLineWidth() {
return max(getSize(), 1.0) * pixelRatio;
}
float getScreenMarkerSize() {
return markerSizePerLineWidth * markerScale * getLineWidth();
}`),t.space===At.World&&(i.constants.add("maxSegmentLengthFraction","float",.45),i.uniforms.add(new Ve("perRenderPixelRatio",((e,t)=>t.camera.perRenderPixelRatio))),i.code.add(Qe`bool areWorldMarkersHidden(vec4 pos, vec4 other) {
vec3 midPoint = mix(pos.xyz, other.xyz, 0.5);
float distanceToCamera = length(midPoint);
float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
float worldMarkerSize = getScreenMarkerSize() * screenToWorldRatio;
float segmentLen = length(pos.xyz - other.xyz);
return worldMarkerSize > maxSegmentLengthFraction * segmentLen;
}
float getWorldMarkerSize(vec4 pos) {
float distanceToCamera = length(pos.xyz);
float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
return getScreenMarkerSize() * screenToWorldRatio;
}`))}var Kt;!function(e){e[e.BUTT=0]="BUTT",e[e.SQUARE=1]="SQUARE",e[e.ROUND=2]="ROUND",e[e.COUNT=3]="COUNT"}(Kt||(Kt={}));class ei extends P{constructor(){super(...arguments),this.output=We.Color,this.capType=Kt.BUTT,this.transparencyPassType=D.NONE,this.occluder=!1,this.hasSlicePlane=!1,this.hasPolygonOffset=!1,this.writeDepth=!1,this.draped=!1,this.stippleEnabled=!1,this.stippleOffColorEnabled=!1,this.stipplePreferContinuous=!0,this.roundJoins=!1,this.applyMarkerOffset=!1,this.vvSize=!1,this.vvColor=!1,this.vvOpacity=!1,this.falloffEnabled=!1,this.innerColorEnabled=!1,this.hasOccludees=!1,this.multipassEnabled=!1,this.cullAboveGround=!1,this.wireframe=!1,this.objectAndLayerIdColorInstanced=!1}}Ze([qe({count:We.COUNT})],ei.prototype,"output",void 0),Ze([qe({count:Kt.COUNT})],ei.prototype,"capType",void 0),Ze([qe({count:D.COUNT})],ei.prototype,"transparencyPassType",void 0),Ze([qe()],ei.prototype,"occluder",void 0),Ze([qe()],ei.prototype,"hasSlicePlane",void 0),Ze([qe()],ei.prototype,"hasPolygonOffset",void 0),Ze([qe()],ei.prototype,"writeDepth",void 0),Ze([qe()],ei.prototype,"draped",void 0),Ze([qe()],ei.prototype,"stippleEnabled",void 0),Ze([qe()],ei.prototype,"stippleOffColorEnabled",void 0),Ze([qe()],ei.prototype,"stipplePreferContinuous",void 0),Ze([qe()],ei.prototype,"roundJoins",void 0),Ze([qe()],ei.prototype,"applyMarkerOffset",void 0),Ze([qe()],ei.prototype,"vvSize",void 0),Ze([qe()],ei.prototype,"vvColor",void 0),Ze([qe()],ei.prototype,"vvOpacity",void 0),Ze([qe()],ei.prototype,"falloffEnabled",void 0),Ze([qe()],ei.prototype,"innerColorEnabled",void 0),Ze([qe()],ei.prototype,"hasOccludees",void 0),Ze([qe()],ei.prototype,"multipassEnabled",void 0),Ze([qe()],ei.prototype,"cullAboveGround",void 0),Ze([qe()],ei.prototype,"wireframe",void 0),Ze([qe()],ei.prototype,"objectAndLayerIdColorInstanced",void 0),Ze([qe({constValue:!1})],ei.prototype,"occlusionPass",void 0),Ze([qe({constValue:!0})],ei.prototype,"hasVvInstancing",void 0),Ze([qe({constValue:!0})],ei.prototype,"hasSliceTranslatedView",void 0);const ti=Object.freeze(Object.defineProperty({__proto__:null,build:function(e){const t=new M,{attributes:i,varyings:r,constants:a,vertex:o,fragment:s}=t;t.include(W),t.include(Et,e),t.include(jt,e);const n=e.applyMarkerOffset&&!e.draped;n&&(o.uniforms.add(new Ve("markerScale",(e=>e.markerScale))),t.include(Xt,{space:At.World,draped:!1})),t.include(V,e),B(o,e),o.uniforms.add(new Ge("inverseProjectionMatrix",((e,t)=>t.camera.inverseProjectionMatrix)),new k("nearFar",((e,t)=>t.camera.nearFar)),new Ve("miterLimit",(e=>"miter"!==e.join?0:e.miterLimit)),new U("viewport",((e,t)=>t.camera.fullViewport))),o.constants.add("LARGE_HALF_FLOAT","float",65500),i.add(ge.POSITION,"vec3"),i.add(ge.PREVPOSITION,"vec3"),i.add(ge.NEXTPOSITION,"vec3"),i.add(ge.SUBDIVISIONFACTOR,"float"),i.add(ge.UV0,"vec2"),r.add("vColor","vec4"),r.add("vpos","vec3"),r.add("vLineDistance","float"),r.add("vLineWidth","float");const l=e.multipassEnabled&&e.output===We.Color;l&&r.add("depth","float");const c=e.stippleEnabled;c&&r.add("vLineSizeInv","float"),a.add("aaWidth","float",e.stippleEnabled?0:1);const d=e.capType===Kt.ROUND,p=e.stippleEnabled&&d,h=e.falloffEnabled||p;h&&r.add("vLineDistanceNorm","float"),d&&(r.add("vSegmentSDF","float"),r.add("vReverseSegmentSDF","float")),o.code.add(Qe`#define PERPENDICULAR(v) vec2(v.y, -v.x);
float interp(float ncp, vec4 a, vec4 b) {
return (-ncp - a.z) / (b.z - a.z);
}
vec2 rotate(vec2 v, float a) {
float s = sin(a);
float c = cos(a);
mat2 m = mat2(c, -s, s, c);
return m * v;
}`),o.code.add(Qe`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),o.code.add(Qe`
    void clipAndTransform(inout vec4 pos, inout vec4 prev, inout vec4 next, in bool isStartVertex) {
      float vnp = nearFar[0] * 0.99;

      if(pos.z > -nearFar[0]) {
        //current pos behind ncp --> we need to clip
        if (!isStartVertex) {
          if(prev.z < -nearFar[0]) {
            //previous in front of ncp
            pos = mix(prev, pos, interp(vnp, prev, pos));
            next = pos;
          } else {
            pos = vec4(0.0, 0.0, 0.0, 1.0);
          }
        } else {
          if(next.z < -nearFar[0]) {
            //next in front of ncp
            pos = mix(pos, next, interp(vnp, pos, next));
            prev = pos;
          } else {
            pos = vec4(0.0, 0.0, 0.0, 1.0);
          }
        }
      } else {
        //current position visible
        if (prev.z > -nearFar[0]) {
          //previous behind ncp
          prev = mix(pos, prev, interp(vnp, pos, prev));
        }
        if (next.z > -nearFar[0]) {
          //next behind ncp
          next = mix(next, pos, interp(vnp, next, pos));
        }
      }

      ${l?"depth = pos.z;":""}

      pos = projectAndScale(pos);
      next = projectAndScale(next);
      prev = projectAndScale(prev);
    }
  `),N(o),o.code.add(Qe`
  void main(void) {
    // unpack values from uv0.y
    bool isStartVertex = abs(abs(uv0.y)-3.0) == 1.0;

    float coverage = 1.0;

    // Check for special value of uv0.y which is used by the Renderer when graphics
    // are removed before the VBO is recompacted. If this is the case, then we just
    // project outside of clip space.
    if (uv0.y == 0.0) {
      // Project out of clip space
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
    }
    else {
      bool isJoin = abs(uv0.y) < 3.0;
      float lineSize = getSize();

      if (lineSize < 1.0) {
        coverage = lineSize; // convert sub-pixel coverage to alpha
        lineSize = 1.0;
      }
      lineSize += aaWidth;

      float lineWidth = lineSize * pixelRatio;
      vLineWidth = lineWidth;
      ${c?Qe`vLineSizeInv = 1.0 / lineSize;`:""}

      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(prevPosition, 1.0);
      vec4 next = view * vec4(nextPosition, 1.0);
  `),n&&o.code.add(Qe`vec4 other = isStartVertex ? next : prev;
bool markersHidden = areWorldMarkersHidden(pos, other);
if(!isJoin && !markersHidden) {
pos.xyz += normalize(other.xyz - pos.xyz) * getWorldMarkerSize(pos) * 0.5;
}`),o.code.add(Qe`clipAndTransform(pos, prev, next, isStartVertex);
vec2 left = (pos.xy - prev.xy);
vec2 right = (next.xy - pos.xy);
float leftLen = length(left);
float rightLen = length(right);`),(e.stippleEnabled||d)&&o.code.add(Qe`
      float isEndVertex = float(!isStartVertex);
      vec2 segmentOrigin = mix(pos.xy, prev.xy, isEndVertex);
      vec2 segment = mix(right, left, isEndVertex);
      ${d?Qe`vec2 segmentEnd = mix(next.xy, pos.xy, isEndVertex);`:""}
    `),o.code.add(Qe`left = (leftLen > 0.001) ? left/leftLen : vec2(0.0, 0.0);
right = (rightLen > 0.001) ? right/rightLen : vec2(0.0, 0.0);
vec2 capDisplacementDir = vec2(0, 0);
vec2 joinDisplacementDir = vec2(0, 0);
float displacementLen = lineWidth;
if (isJoin) {
bool isOutside = (left.x * right.y - left.y * right.x) * uv0.y > 0.0;
joinDisplacementDir = normalize(left + right);
joinDisplacementDir = PERPENDICULAR(joinDisplacementDir);
if (leftLen > 0.001 && rightLen > 0.001) {
float nDotSeg = dot(joinDisplacementDir, left);
displacementLen /= length(nDotSeg * left - joinDisplacementDir);
if (!isOutside) {
displacementLen = min(displacementLen, min(leftLen, rightLen)/abs(nDotSeg));
}
}
if (isOutside && (displacementLen > miterLimit * lineWidth)) {`),e.roundJoins?o.code.add(Qe`
        vec2 startDir = leftLen < 0.001 ? right : left;
        startDir = PERPENDICULAR(startDir);

        vec2 endDir = rightLen < 0.001 ? left : right;
        endDir = PERPENDICULAR(endDir);

        float factor = ${e.stippleEnabled?Qe`min(1.0, subdivisionFactor * ${Qe.float(1.5)})`:Qe`subdivisionFactor`};

        float rotationAngle = acos(clamp(dot(startDir, endDir), -1.0, 1.0));
        joinDisplacementDir = rotate(startDir, -sign(uv0.y) * factor * rotationAngle);
      `):o.code.add(Qe`if (leftLen < 0.001) {
joinDisplacementDir = right;
}
else if (rightLen < 0.001) {
joinDisplacementDir = left;
}
else {
joinDisplacementDir = (isStartVertex || subdivisionFactor > 0.0) ? right : left;
}
joinDisplacementDir = PERPENDICULAR(joinDisplacementDir);`);const u=e.capType!==Kt.BUTT;return o.code.add(Qe`
        displacementLen = lineWidth;
      }
    } else {
      // CAP handling ---------------------------------------------------
      joinDisplacementDir = isStartVertex ? right : left;
      joinDisplacementDir = PERPENDICULAR(joinDisplacementDir);

      ${u?Qe`capDisplacementDir = isStartVertex ? -right : left;`:""}
    }
  `),o.code.add(Qe`
    // Displacement (in pixels) caused by join/or cap
    vec2 dpos = joinDisplacementDir * sign(uv0.y) * displacementLen + capDisplacementDir * displacementLen;
    float lineDistNorm = sign(uv0.y) * pos.w;

    vLineDistance =  lineWidth * lineDistNorm;
    ${h?Qe`vLineDistanceNorm = lineDistNorm;`:""}

    pos.xy += dpos;
  `),d&&o.code.add(Qe`vec2 segmentDir = normalize(segment);
vSegmentSDF = (isJoin && isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentOrigin, segmentDir) * pos.w) ;
vReverseSegmentSDF = (isJoin && !isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentEnd, -segmentDir) * pos.w);`),e.stippleEnabled&&(e.draped?o.uniforms.add(new Ve("worldToScreenRatio",((e,t)=>1/t.screenToPCSRatio))):o.code.add(Qe`vec3 segmentCenter = mix((nextPosition + position) * 0.5, (position + prevPosition) * 0.5, isEndVertex);
float worldToScreenRatio = computeWorldToScreenRatio(segmentCenter);`),o.code.add(Qe`float segmentLengthScreenDouble = length(segment);
float segmentLengthScreen = segmentLengthScreenDouble * 0.5;
float discreteWorldToScreenRatio = discretizeWorldToScreenRatio(worldToScreenRatio);
float segmentLengthRender = length(mix(nextPosition - position, position - prevPosition, isEndVertex));
vStipplePatternStretch = worldToScreenRatio / discreteWorldToScreenRatio;`),e.draped?o.code.add(Qe`float segmentLengthPseudoScreen = segmentLengthScreen / pixelRatio * discreteWorldToScreenRatio / worldToScreenRatio;
float startPseudoScreen = uv0.x * discreteWorldToScreenRatio - mix(0.0, segmentLengthPseudoScreen, isEndVertex);`):o.code.add(Qe`float startPseudoScreen = mix(uv0.x, uv0.x - segmentLengthRender, isEndVertex) * discreteWorldToScreenRatio;
float segmentLengthPseudoScreen = segmentLengthRender * discreteWorldToScreenRatio;`),o.uniforms.add(new Ve("stipplePatternPixelSize",(e=>Nt(e)))),o.code.add(Qe`float patternLength = lineSize * stipplePatternPixelSize;
vStippleDistanceLimits = computeStippleDistanceLimits(startPseudoScreen, segmentLengthPseudoScreen, segmentLengthScreen, patternLength);
vStippleDistance = mix(vStippleDistanceLimits.x, vStippleDistanceLimits.y, isEndVertex);
if (segmentLengthScreenDouble >= 0.001) {
vec2 stippleDisplacement = pos.xy - segmentOrigin;
float stippleDisplacementFactor = dot(segment, stippleDisplacement) / (segmentLengthScreenDouble * segmentLengthScreenDouble);
vStippleDistance += (stippleDisplacementFactor - isEndVertex) * (vStippleDistanceLimits.y - vStippleDistanceLimits.x);
}
vStippleDistanceLimits *= pos.w;
vStippleDistance *= pos.w;
vStippleDistanceLimits = isJoin ?
vStippleDistanceLimits :
isStartVertex ?
vec2(-1e34, vStippleDistanceLimits.y) :
vec2(vStippleDistanceLimits.x, 1e34);`)),o.code.add(Qe`
      // Convert back into NDC
      pos.xy = (pos.xy / viewport.zw) * pos.w;

      vColor = getColor();
      vColor.a *= coverage;

      ${e.wireframe&&!e.draped?"pos.z -= 0.001 * pos.w;":""}

      // transform final position to camera space for slicing
      vpos = (inverseProjectionMatrix * pos).xyz;
      gl_Position = pos;
      forwardObjectAndLayerIdColor();
    }
  }
  `),l&&t.include(G,e),t.include(J,e),s.include(H),s.code.add(Qe`
  void main() {
    discardBySlice(vpos);
    ${l?"terrainDepthTest(depth);":""}
  `),e.wireframe?s.code.add(Qe`vec4 finalColor = vec4(1.0, 0.0, 1.0, 1.0);`):(d&&s.code.add(Qe`
        float sdf = min(vSegmentSDF, vReverseSegmentSDF);
        vec2 fragmentPosition = vec2(
          min(sdf, 0.0),
          vLineDistance
        ) * gl_FragCoord.w;

        float fragmentRadius = length(fragmentPosition);
        float fragmentCapSDF = (fragmentRadius - vLineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
        float capCoverage = clamp(0.5 - fragmentCapSDF, 0.0, 1.0);

        if (capCoverage < ${Qe.float($)}) {
          discard;
        }
      `),p?s.code.add(Qe`
      vec2 stipplePosition = vec2(
        min(getStippleSDF() * 2.0 - 1.0, 0.0),
        vLineDistanceNorm * gl_FragCoord.w
      );
      float stippleRadius = length(stipplePosition * vLineWidth);
      float stippleCapSDF = (stippleRadius - vLineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
      float stippleCoverage = clamp(0.5 - stippleCapSDF, 0.0, 1.0);
      float stippleAlpha = step(${Qe.float($)}, stippleCoverage);
      `):s.code.add(Qe`float stippleAlpha = getStippleAlpha();`),e.output!==We.ObjectAndLayerIdColor&&s.code.add(Qe`discardByStippleAlpha(stippleAlpha, stippleAlphaColorDiscard);`),s.uniforms.add(new U("intrinsicColor",(e=>e.color))),s.code.add(Qe`vec4 color = intrinsicColor * vColor;`),e.innerColorEnabled&&(s.uniforms.add(new U("innerColor",(e=>e.innerColor??e.color)),new Ve("innerWidth",((e,t)=>e.innerWidth*t.camera.pixelRatio))),s.code.add(Qe`float distToInner = abs(vLineDistance * gl_FragCoord.w) - innerWidth;
float innerAA = clamp(0.5 - distToInner, 0.0, 1.0);
float innerAlpha = innerColor.a + color.a * (1.0 - innerColor.a);
color = mix(color, vec4(innerColor.rgb, innerAlpha), innerAA);`)),s.code.add(Qe`vec4 finalColor = blendStipple(color, stippleAlpha);`),e.falloffEnabled&&(s.uniforms.add(new Ve("falloff",(e=>e.falloff))),s.code.add(Qe`finalColor.a *= pow(max(0.0, 1.0 - abs(vLineDistanceNorm * gl_FragCoord.w)), falloff);`)),e.stippleEnabled||s.code.add(Qe`float featherStartDistance = max(vLineWidth - 2.0, 0.0);
float value = abs(vLineDistance) * gl_FragCoord.w;
float feather = (value - featherStartDistance) / (vLineWidth - featherStartDistance);
finalColor.a *= 1.0 - clamp(feather, 0.0, 1.0);`)),e.transparencyPassType===D.ColorAlpha&&(t.outputs.add("fragColor","vec4",0),t.outputs.add("fragAlpha","float",1)),s.code.add(Qe`
    ${e.output===We.ObjectAndLayerIdColor?Qe`finalColor.a = 1.0;`:""}

    if (finalColor.a < ${Qe.float($)}) {
      discard;
    }

    ${e.output===We.Color?Qe`fragColor = highlightSlice(finalColor, vpos);`:""}
    ${e.output===We.Color&&e.transparencyPassType===D.ColorAlpha?Qe`
            fragColor = premultiplyAlpha(fragColor);
            fragAlpha = fragColor.a;`:""}
    ${e.output===We.Highlight?Qe`fragColor = vec4(1.0);`:""}
    ${e.output===We.ObjectAndLayerIdColor?Qe`outputObjectAndLayerIdColor();`:""}
  }
  `),t},ribbonlineNumRoundJoinSubdivisions:1},Symbol.toStringTag,{value:"Module"})),ii=new Map([[ge.POSITION,0],[ge.PREVPOSITION,1],[ge.NEXTPOSITION,2],[ge.SUBDIVISIONFACTOR,3],[ge.UV0,4],[ge.COLOR,5],[ge.COLORFEATUREATTRIBUTE,5],[ge.SIZE,6],[ge.SIZEFEATUREATTRIBUTE,6],[ge.OPACITYFEATUREATTRIBUTE,7],[ge.OBJECTANDLAYERIDCOLOR,8]]);class ri extends Y{initializeProgram(e){return new Z(e.rctx,ri.shader.get().build(this.configuration),ii)}_makePipelineState(e,t){const i=this.configuration,r=e===D.NONE,a=e===D.FrontFace,o=Je(i.output);return nt({blending:i.output===We.Color?r?q:Q(e):null,depthTest:{func:X(e)},depthWrite:r?i.writeDepth||o?lt:null:K(e),drawBuffers:i.output===We.Depth?{buffers:[it.NONE]}:ee(e),colorWrite:ct,stencilWrite:i.hasOccludees?te:null,stencilTest:i.hasOccludees?t?ie:re:null,polygonOffset:r||a?i.hasPolygonOffset?ai:null:ae})}initializePipeline(){const e=this.configuration;if(e.occluder){const t=e.hasPolygonOffset?ai:null;this._occluderPipelineTransparent=nt({blending:q,polygonOffset:t,depthTest:oe,depthWrite:null,colorWrite:ct,stencilWrite:null,stencilTest:se,drawBuffers:e.output===We.Depth?{buffers:[it.NONE]}:null}),this._occluderPipelineOpaque=nt({blending:q,polygonOffset:t,depthTest:oe,depthWrite:null,colorWrite:ct,stencilWrite:ne,stencilTest:le,drawBuffers:e.output===We.Depth?{buffers:[it.NONE]}:null}),this._occluderPipelineMaskWrite=nt({blending:null,polygonOffset:t,depthTest:ce,depthWrite:null,colorWrite:null,stencilWrite:te,stencilTest:ie,drawBuffers:e.output===We.Depth?{buffers:[it.NONE]}:null})}return this._occludeePipelineState=this._makePipelineState(this.configuration.transparencyPassType,!0),this._makePipelineState(this.configuration.transparencyPassType,!1)}get primitiveType(){return this.configuration.wireframe?rt.LINES:rt.TRIANGLE_STRIP}getPipeline(e,t,i){return e?this._occludeePipelineState:this.configuration.occluder?i?this._occluderPipelineTransparent:t?this._occluderPipelineOpaque:this._occluderPipelineMaskWrite:super.getPipeline()}}ri.shader=new de(ti,(()=>Promise.resolve().then((()=>ti))));const ai={factor:0,units:-4};var oi;!function(e){e[e.LEFT_JOIN_START=-2]="LEFT_JOIN_START",e[e.LEFT_JOIN_END=-1]="LEFT_JOIN_END",e[e.LEFT_CAP_START=-4]="LEFT_CAP_START",e[e.LEFT_CAP_END=-5]="LEFT_CAP_END",e[e.RIGHT_JOIN_START=2]="RIGHT_JOIN_START",e[e.RIGHT_JOIN_END=1]="RIGHT_JOIN_END",e[e.RIGHT_CAP_START=4]="RIGHT_CAP_START",e[e.RIGHT_CAP_END=5]="RIGHT_CAP_END"}(oi||(oi={}));class si extends C{constructor(e){super(e,new li),this._configuration=new ei,this.produces=new Map([[pe.OPAQUE_MATERIAL,e=>e===We.Highlight||e===We.ObjectAndLayerIdColor||e===We.Color&&this.parameters.renderOccluded===E.OccludeAndTransparentStencil],[pe.OPAQUE_NO_SSAO_DEPTH,e=>He(e)],[pe.OCCLUDER_MATERIAL,e=>$e(e)&&this.parameters.renderOccluded===E.OccludeAndTransparentStencil],[pe.TRANSPARENT_OCCLUDER_MATERIAL,e=>$e(e)&&this.parameters.renderOccluded===E.OccludeAndTransparentStencil],[pe.TRANSPARENT_MATERIAL,e=>e===We.Color&&this.parameters.writeDepth&&this.parameters.renderOccluded!==E.OccludeAndTransparentStencil],[pe.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL,e=>e===We.Color&&!this.parameters.writeDepth&&this.parameters.renderOccluded!==E.OccludeAndTransparentStencil],[pe.DRAPED_MATERIAL,e=>Ye(e)]]),this._vertexAttributeLocations=ii}getConfiguration(e,t){this._configuration.output=e,this._configuration.draped=t.slot===pe.DRAPED_MATERIAL;const i=null!=this.parameters.stipplePattern&&e!==We.Highlight;var r;return this._configuration.stippleEnabled=i,this._configuration.stippleOffColorEnabled=i&&null!=this.parameters.stippleOffColor,this._configuration.stipplePreferContinuous=i&&this.parameters.stipplePreferContinuous,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasOccludees=this.parameters.hasOccludees,this._configuration.roundJoins="round"===this.parameters.join,this._configuration.capType=this.parameters.cap,this._configuration.applyMarkerOffset=null!=this.parameters.markerParameters&&(r=this.parameters.markerParameters).anchor===Ot.Tip&&r.hideOnShortSegments&&"begin-end"===r.placement&&r.worldSpace,this._configuration.hasPolygonOffset=this.parameters.hasPolygonOffset,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.vvOpacity=!!this.parameters.vvOpacity,this._configuration.innerColorEnabled=this.parameters.innerWidth>0&&null!=this.parameters.innerColor,this._configuration.falloffEnabled=this.parameters.falloff>0,this._configuration.occluder=this.parameters.renderOccluded===E.OccludeAndTransparentStencil,this._configuration.transparencyPassType=t.transparencyPassType,this._configuration.multipassEnabled=t.multipassEnabled,this._configuration.cullAboveGround=t.multipassTerrain.cullAboveGround,this._configuration.wireframe=this.parameters.wireframe,this._configuration}intersectDraped(e,t,i,r,a,o){if(!i.options.selectionMode)return;const s=e.attributes.get(ge.POSITION).data,n=e.attributes.get(ge.SIZE);let l=this.parameters.width;if(this.parameters.vvSize){const t=e.attributes.get(ge.SIZEFEATUREATTRIBUTE).data[0];l*=Oe(this.parameters.vvSize.offset[0]+t*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0])}else n&&(l*=n.data[0]);const c=r[0],d=r[1],p=(l/2+4)*e.screenToWorldRatio;let h=Number.MAX_VALUE,u=0;for(let e=0;e<s.length-5;e+=3){const t=s[e],i=s[e+1],r=c-t,a=d-i,o=s[e+3]-t,n=s[e+4]-i,l=Oe((o*r+n*a)/(o*o+n*n),0,1),p=o*l-r,f=n*l-a,m=p*p+f*f;m<h&&(h=m,u=e/3)}h<p*p&&a(o.dist,o.normal,u,!1)}intersect(e,t,i,r,a,o){if(!i.options.selectionMode||!e.visible)return;if(!me(t))return void Ae.getLogger("esri.views.3d.webgl-engine.materials.RibbonLineMaterial").error("intersection assumes a translation-only matrix");const s=e.attributes,n=s.get(ge.POSITION).data;let p=this.parameters.width;if(this.parameters.vvSize){const e=s.get(ge.SIZEFEATUREATTRIBUTE).data[0];p*=Oe(this.parameters.vvSize.offset[0]+e*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0])}else s.has(ge.SIZE)&&(p*=s.get(ge.SIZE).data[0]);const g=i.camera,S=vi;Ee(S,i.point);const T=p*g.pixelRatio/2+4*g.pixelRatio;c(Ei[0],S[0]-T,S[1]+T,0),c(Ei[1],S[0]+T,S[1]+T,0),c(Ei[2],S[0]+T,S[1]-T,0),c(Ei[3],S[0]-T,S[1]-T,0);for(let e=0;e<4;e++)if(!g.unprojectFromRenderScreen(Ei[e],Ri[e]))return;ze(g.eye,Ri[0],Ri[1],Li),ze(g.eye,Ri[1],Ri[2],xi),ze(g.eye,Ri[2],Ri[3],Di),ze(g.eye,Ri[3],Ri[0],Pi);let _=Number.MAX_VALUE,y=0;const b=pi(this.parameters,s)?n.length-2:n.length-5;for(let e=0;e<b;e+=3){hi[0]=n[e]+t[12],hi[1]=n[e+1]+t[13],hi[2]=n[e+2]+t[14];const i=(e+3)%n.length;if(ui[0]=n[i]+t[12],ui[1]=n[i+1]+t[13],ui[2]=n[i+2]+t[14],Ue(Li,hi)<0&&Ue(Li,ui)<0||Ue(xi,hi)<0&&Ue(xi,ui)<0||Ue(Di,hi)<0&&Ue(Di,ui)<0||Ue(Pi,hi)<0&&Ue(Pi,ui)<0)continue;if(g.projectToRenderScreen(hi,gi),g.projectToRenderScreen(ui,Si),gi[2]<0&&Si[2]>0){u(fi,hi,ui);const e=g.frustum,t=-Ue(e[De.NEAR],hi)/f(fi,Fe(e[De.NEAR]));m(fi,fi,t),d(hi,hi,fi),g.projectToRenderScreen(hi,gi)}else if(gi[2]>0&&Si[2]<0){u(fi,ui,hi);const e=g.frustum,t=-Ue(e[De.NEAR],ui)/f(fi,Fe(e[De.NEAR]));m(fi,fi,t),d(ui,ui,fi),g.projectToRenderScreen(ui,Si)}else if(gi[2]<0&&Si[2]<0)continue;gi[2]=0,Si[2]=0;const r=Ie(we(gi,Si,yi),S);r<_&&(_=r,h(Ti,hi),h(_i,ui),y=e/3)}const A=i.rayBegin,O=i.rayEnd;if(_<T*T){let e=Number.MAX_VALUE;if(je(we(Ti,_i,yi),we(A,O,bi),mi)){u(mi,mi,A);const t=v(mi);m(mi,mi,1/t),e=t/l(A,O)}o(e,mi,y,!1)}}get _layout(){const t=Me().vec3f(ge.POSITION).vec3f(ge.PREVPOSITION).vec3f(ge.NEXTPOSITION).f32(ge.SUBDIVISIONFACTOR).vec2f(ge.UV0);return this.parameters.vvSize?t.f32(ge.SIZEFEATUREATTRIBUTE):t.f32(ge.SIZE),this.parameters.vvColor?t.f32(ge.COLORFEATUREATTRIBUTE):t.vec4f(ge.COLOR),this.parameters.vvOpacity&&t.f32(ge.OPACITYFEATUREATTRIBUTE),e("enable-feature:objectAndLayerId-rendering")&&t.vec4u8(ge.OBJECTANDLAYERIDCOLOR),t}createBufferWriter(){return new ci(this._layout,this.parameters)}createGLMaterial(e){return new ni(e)}validateParameters(e){"miter"!==e.join&&(e.miterLimit=0),null!=e.markerParameters&&(e.markerScale=e.markerParameters.width/e.width)}}class ni extends he{constructor(){super(...arguments),this._stipplePattern=null}dispose(){super.dispose(),this._stippleTextures.release(this._stipplePattern),this._stipplePattern=null}_updateOccludeeState(e){e.hasOccludees!==this._material.parameters.hasOccludees&&this._material.setParameters({hasOccludees:e.hasOccludees})}beginSlot(e){this._output===We.Color&&this._updateOccludeeState(e);const t=this._material.parameters.stipplePattern;return this._stipplePattern!==t&&(this._material.setParameters({stippleTexture:this._stippleTextures.swap(t,this._stipplePattern)}),this._stipplePattern=t),this.ensureTechnique(ri,e)}}class li extends ue{constructor(){super(...arguments),this.width=0,this.color=xe,this.join="miter",this.cap=Kt.BUTT,this.miterLimit=5,this.writeDepth=!0,this.hasPolygonOffset=!1,this.stippleTexture=null,this.stipplePreferContinuous=!0,this.markerParameters=null,this.markerScale=1,this.hasSlicePlane=!1,this.vvFastUpdate=!1,this.isClosed=!1,this.falloff=0,this.innerWidth=0,this.hasOccludees=!1,this.wireframe=!1}}class ci{constructor(e,t){this.vertexBufferLayout=e,this._parameters=t,this.numJoinSubdivisions=0;const i=t.stipplePattern?1:0;switch(this._parameters.join){case"miter":case"bevel":this.numJoinSubdivisions=i;break;case"round":this.numJoinSubdivisions=1+i}}_isClosed(e){return pi(this._parameters,e.attributes)}allocate(e){return this.vertexBufferLayout.createBuffer(e)}elementCount(e){const t=e.attributes.get(ge.POSITION).indices.length/2+1,i=this._isClosed(e);let r=i?2:4;return r+=((i?t:t-1)-(i?0:1))*(2*this.numJoinSubdivisions+4),r+=2,this._parameters.wireframe&&(r=2+4*(r-2)),r}write(t,i,r,a,o){const s=Ai,d=Oi,p=Ci,u=r.attributes.get(ge.POSITION),f=u.indices,m=u.data.length/3,v=r.attributes.get(ge.DISTANCETOSTART)?.data;f&&f.length!==2*(m-1)&&console.warn("RibbonLineMaterial does not support indices");const g=r.attributes.get(ge.SIZEFEATUREATTRIBUTE)?.data[0]??r.attributes.get(ge.SIZE)?.data[0]??1;let S=[1,1,1,1],T=0;const _=this.vertexBufferLayout.fields.has(ge.COLORFEATUREATTRIBUTE);_?T=r.attributes.get(ge.COLORFEATUREATTRIBUTE).data[0]:r.attributes.has(ge.COLOR)&&(S=r.attributes.get(ge.COLOR).data);const y=e("enable-feature:objectAndLayerId-rendering")?r.objectAndLayerIdColor:null,b=this.vertexBufferLayout.fields.has(ge.OPACITYFEATUREATTRIBUTE),A=b?r.attributes.get(ge.OPACITYFEATUREATTRIBUTE).data[0]:0,O=new Float32Array(a.buffer),C=e("enable-feature:objectAndLayerId-rendering")?new Uint8Array(a.buffer):null,E=this.vertexBufferLayout.stride/4;let R=o*E;const L=R;let x=0;const D=v?(e,t,i)=>x=v[i]:(e,t,i)=>x+=l(e,t),P=e("enable-feature:objectAndLayerId-rendering"),I=(e,t,i,r,a,o,s)=>{if(O[R++]=t[0],O[R++]=t[1],O[R++]=t[2],O[R++]=e[0],O[R++]=e[1],O[R++]=e[2],O[R++]=i[0],O[R++]=i[1],O[R++]=i[2],O[R++]=r,O[R++]=s,O[R++]=a,O[R++]=g,_)O[R++]=T;else{const e=Math.min(4*o,S.length-4);O[R++]=S[e],O[R++]=S[e+1],O[R++]=S[e+2],O[R++]=S[e+3]}b&&(O[R++]=A),P&&(null!=y&&(C[4*R]=y[0],C[4*R+1]=y[1],C[4*R+2]=y[2],C[4*R+3]=y[3]),R++)};R+=E,c(d,u.data[0],u.data[1],u.data[2]),t&&n(d,d,t);const w=this._isClosed(r);if(w){const e=u.data.length-3;c(s,u.data[e],u.data[e+1],u.data[e+2]),t&&n(s,s,t)}else c(p,u.data[3],u.data[4],u.data[5]),t&&n(p,p,t),I(d,d,p,1,oi.LEFT_CAP_START,0,0),I(d,d,p,1,oi.RIGHT_CAP_START,0,0),h(s,d),h(d,p);const j=w?0:1,N=w?m:m-1;for(let e=j;e<N;e++){const i=(e+1)%m*3;c(p,u.data[i],u.data[i+1],u.data[i+2]),t&&n(p,p,t),D(s,d,e),I(s,d,p,0,oi.LEFT_JOIN_END,e,x),I(s,d,p,0,oi.RIGHT_JOIN_END,e,x);const r=this.numJoinSubdivisions;for(let t=0;t<r;++t){const i=(t+1)/(r+1);I(s,d,p,i,oi.LEFT_JOIN_END,e,x),I(s,d,p,i,oi.RIGHT_JOIN_END,e,x)}I(s,d,p,1,oi.LEFT_JOIN_START,e,x),I(s,d,p,1,oi.RIGHT_JOIN_START,e,x),h(s,d),h(d,p)}w?(c(p,u.data[3],u.data[4],u.data[5]),t&&n(p,p,t),x=D(s,d,N),I(s,d,p,0,oi.LEFT_JOIN_END,j,x),I(s,d,p,0,oi.RIGHT_JOIN_END,j,x)):(x=D(s,d,N),I(s,d,d,0,oi.LEFT_CAP_END,N,x),I(s,d,d,0,oi.RIGHT_CAP_END,N,x)),di(O,L+E,O,L,E),R=di(O,R-E,O,R,E),this._parameters.wireframe&&this._addWireframeVertices(a,L,R,E)}_addWireframeVertices(e,t,i,r){const a=new Float32Array(e.buffer,i*Float32Array.BYTES_PER_ELEMENT),o=new Float32Array(e.buffer,t*Float32Array.BYTES_PER_ELEMENT,i-t);let s=0;const n=e=>s=di(o,e,a,s,r);for(let e=0;e<o.length-1;e+=2*r)n(e),n(e+2*r),n(e+1*r),n(e+2*r),n(e+1*r),n(e+3*r)}}function di(e,t,i,r,a){for(let o=0;o<a;o++)i[r++]=e[t++];return r}function pi(e,t){return!!e.isClosed&&t.get(ge.POSITION).indices.length>2}const hi=S(),ui=S(),fi=S(),mi=S(),vi=S(),gi=Ce(),Si=Ce(),Ti=S(),_i=S(),yi=Pe(),bi=Pe(),Ai=S(),Oi=S(),Ci=S(),Ei=[Ce(),Ce(),Ce(),Ce()],Ri=[S(),S(),S(),S()],Li=Ne(),xi=Ne(),Di=Ne(),Pi=Ne();export{Kt as C,Ot as L,Xt as M,dt as O,Rt as P,si as R,Tt as U,yt as W,Ut as a,At as b,Wt as c,Ft as d,Et as e,$t as f,Yt as g,qt as h,Ct as i,bt as j,Qt as k,xt as l,Zt as m,Mt as r};
