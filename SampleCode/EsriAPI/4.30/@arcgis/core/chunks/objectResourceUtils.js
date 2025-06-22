/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import{a as e}from"./devEnvironmentUtils.js";import{c as t,h as o}from"./mathUtils.js";import{m as a,n as r,f as i}from"./mat3.js";import{I as n,f as s,c as l}from"./mat3f64.js";import{i as c}from"./mat4.js";import{I as d,c as u}from"./mat4f64.js";import{O as m,c as h}from"./vec2f64.js";import{s as p,g as f,j as v,p as g,n as x,c as b,l as T,b as y,d as w,r as M,h as C,F as S,a as O}from"./vec3.js";import{c as E,Z as j,d as A,f as P}from"./vec3f64.js";import{j as I,e as _}from"./aaBoundingBox.js";import{F as z,w as L,d as R,V as N,g as G,e as B,v as F,b as D,S as V,H as U,R as H,j as q,P as W,U as Y,C as J,a3 as k,c as Z,m as X,h as $,i as K,x as Q,o as ee,k as te,p as oe,s as ae,q as re,r as ie,t as ne,D as se,u as le,O as ce,T as de,G as ue,n as me}from"./StencilUtils.js";import{d as he,o as pe,s as fe,B as ve,n as ge,r as xe}from"./BufferView.js";import{a as be,t as Te,n as ye,f as we}from"./vec32.js";import{t as Me,b as Ce}from"./vec42.js";import{l as Se,D as Oe,g as Ee,c as je,i as Ae,j as Pe,h as Ie}from"./DefaultMaterial_COLOR_GAMMA.js";import{i as _e}from"./resourceUtils3.js";import{Z as ze,O as Le}from"./vec2f32.js";import Re from"../request.js";import{r as Ne}from"./asyncUtils.js";import{h as Ge,Q as Be}from"../core/lang.js";import Fe from"../core/Error.js";import{L as De}from"./Logger.js";import{N as Ve}from"./NestedMap.js";import{throwIfAbortError as Ue}from"../core/promiseUtils.js";import{V as He}from"./Version.js";import{a as qe}from"./Indices.js";import{r as We}from"./requestImageUtils.js";import{A as Ye}from"./Attribute.js";import{A as Je,a as ke,C as Ze,b as Xe}from"./basicInterfaces.js";import{V as $e}from"./VertexAttribute.js";import{V as Ke}from"./ViewingMode.js";import{n as Qe}from"./InterleavedLayout.js";import{F as et,S as tt,U as ot,c as at,M as rt,l as it,m as nt}from"./Matrix4PassUniform.js";import{N as st,a as lt,T as ct}from"./NormalAttribute.glsl.js";import{n as dt}from"./compilerUtils.js";import{g as ut,N as mt}from"./interfaces3.js";import{P as ht,I as pt,b as ft,V as vt,T as gt,c as xt,C as bt,d as Tt,e as yt,f as wt,g as Mt,h as Ct,i as St,M as Ot,j as Et,k as jt,l as At}from"./IntegerPassUniform.js";import{G as Pt}from"./GLTextureMaterial.js";import{e as It,D as _t,R as zt,M as Lt,v as Rt}from"./Material.js";import{i as Nt,D as Gt}from"./RayIntersections.js";import{g as Bt}from"./verticalOffsetUtils.js";import{c as Ft,f as Dt}from"./vec4f64.js";import{T as Vt,O as Ut,a as Ht,F as qt,V as Wt}from"./OutputHighlight.glsl.js";import{P as Yt}from"./VertexPosition.glsl.js";import{D as Jt,C as kt}from"./DecodeSymbolColor.glsl.js";import{V as Zt}from"./VerticalOffset.glsl.js";import{R as Xt,M as $t}from"./Matrix4sPassUniform.js";import{B as Kt}from"./BindType.js";import{_ as Qt}from"./tslib.es6.js";import{f as eo}from"./maybe.js";import{watch as to}from"../core/reactiveUtils.js";import{M as oo}from"../core/scheduling.js";import{property as ao}from"../core/accessorSupport/decorators/property.js";import{subclass as ro}from"../core/accessorSupport/decorators/subclass.js";import{g as io}from"./vec2.js";import no from"../views/3d/webgl/RenderNode.js";import{S as so,B as lo}from"./ScreenSpacePass.glsl.js";import{m as co,a as uo,c as mo,d as ho}from"./renderState.js";import{C as po}from"./CameraSpace.glsl.js";import{T as fo,d as vo,h as go,i as xo,l as bo,j as To}from"./enums.js";import{a as yo,T as wo}from"./Texture.js";import{s as Mo}from"./vec4.js";import{p as Co}from"./ShaderTechniqueConfiguration.js";function So(e,t){const o=e.fragment,a=void 0!==t.lightingSphericalHarmonicsOrder?t.lightingSphericalHarmonicsOrder:2;0===a?(o.uniforms.add(new et("lightingAmbientSH0",((e,t)=>p(Oo,t.lighting.sh.r[0],t.lighting.sh.g[0],t.lighting.sh.b[0])))),o.code.add(ut`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
return ambientLight * (1.0 - ambientOcclusion);
}`)):1===a?(o.uniforms.add(new z("lightingAmbientSH_R",((e,t)=>Mo(Eo,t.lighting.sh.r[0],t.lighting.sh.r[1],t.lighting.sh.r[2],t.lighting.sh.r[3]))),new z("lightingAmbientSH_G",((e,t)=>Mo(Eo,t.lighting.sh.g[0],t.lighting.sh.g[1],t.lighting.sh.g[2],t.lighting.sh.g[3]))),new z("lightingAmbientSH_B",((e,t)=>Mo(Eo,t.lighting.sh.b[0],t.lighting.sh.b[1],t.lighting.sh.b[2],t.lighting.sh.b[3])))),o.code.add(ut`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec4 sh0 = vec4(
0.282095,
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y
);
vec3 ambientLight = vec3(
dot(lightingAmbientSH_R, sh0),
dot(lightingAmbientSH_G, sh0),
dot(lightingAmbientSH_B, sh0)
);
return ambientLight * (1.0 - ambientOcclusion);
}`)):2===a&&(o.uniforms.add(new et("lightingAmbientSH0",((e,t)=>p(Oo,t.lighting.sh.r[0],t.lighting.sh.g[0],t.lighting.sh.b[0]))),new z("lightingAmbientSH_R1",((e,t)=>Mo(Eo,t.lighting.sh.r[1],t.lighting.sh.r[2],t.lighting.sh.r[3],t.lighting.sh.r[4]))),new z("lightingAmbientSH_G1",((e,t)=>Mo(Eo,t.lighting.sh.g[1],t.lighting.sh.g[2],t.lighting.sh.g[3],t.lighting.sh.g[4]))),new z("lightingAmbientSH_B1",((e,t)=>Mo(Eo,t.lighting.sh.b[1],t.lighting.sh.b[2],t.lighting.sh.b[3],t.lighting.sh.b[4]))),new z("lightingAmbientSH_R2",((e,t)=>Mo(Eo,t.lighting.sh.r[5],t.lighting.sh.r[6],t.lighting.sh.r[7],t.lighting.sh.r[8]))),new z("lightingAmbientSH_G2",((e,t)=>Mo(Eo,t.lighting.sh.g[5],t.lighting.sh.g[6],t.lighting.sh.g[7],t.lighting.sh.g[8]))),new z("lightingAmbientSH_B2",((e,t)=>Mo(Eo,t.lighting.sh.b[5],t.lighting.sh.b[6],t.lighting.sh.b[7],t.lighting.sh.b[8])))),o.code.add(ut`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight * (1.0 - ambientOcclusion);
}`),t.pbrMode!==ht.Normal&&t.pbrMode!==ht.Schematic||o.code.add(ut`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance(float ambientOcclusion)
{
vec3 ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2;
return ambientLight *= (1.0 - ambientOcclusion) * skyTransmittance;
}`))}const Oo=E(),Eo=Ft();function jo(e,t){const o=e.fragment;switch(o.code.add(ut`struct ShadingNormalParameters {
vec3 normalView;
vec3 viewDirection;
} shadingParams;`),t.doubleSidedMode){case Ao.None:o.code.add(ut`vec3 shadingNormal(ShadingNormalParameters params) {
return normalize(params.normalView);
}`);break;case Ao.View:o.code.add(ut`vec3 shadingNormal(ShadingNormalParameters params) {
return dot(params.normalView, params.viewDirection) > 0.0 ? normalize(-params.normalView) : normalize(params.normalView);
}`);break;case Ao.WindingOrder:o.code.add(ut`vec3 shadingNormal(ShadingNormalParameters params) {
return gl_FrontFacing ? normalize(params.normalView) : normalize(-params.normalView);
}`);break;default:dt(t.doubleSidedMode);case Ao.COUNT:}}var Ao;function Po({normalTexture:e,metallicRoughnessTexture:t,metallicFactor:o,roughnessFactor:a,emissiveTexture:r,emissiveFactor:i,occlusionTexture:n}){return null==e&&null==t&&null==r&&(null==i||f(i,j))&&null==n&&(null==a||1===a)&&(null==o||1===o)}function Io({normalTexture:e,metallicRoughnessTexture:t,metallicFactor:o,roughnessFactor:a,emissiveTexture:r,emissiveFactor:i,occlusionTexture:n}){return null==e&&null==t&&null==r&&(null==i||f(i,j))&&null==n&&(null==a||1===a)&&(null==o||1===o||0===o)}!function(e){e[e.None=0]="None",e[e.View=1]="View",e[e.WindingOrder=2]="WindingOrder",e[e.COUNT=3]="COUNT"}(Ao||(Ao={}));const _o=[1,1,.5],zo=[0,.6,.2],Lo=[0,1,.2];function Ro(e){e.vertex.code.add(ut`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}function No(e,t){t.hasSymbolColors?(e.include(Jt),e.attributes.add($e.SYMBOLCOLOR,"vec4"),e.varyings.add("colorMixMode","mediump float"),e.vertex.code.add(ut`int symbolColorMixMode;
vec4 getSymbolColor() {
return decodeSymbolColor(symbolColor, symbolColorMixMode) * 0.003921568627451;
}
void forwardColorMixMode() {
colorMixMode = float(symbolColorMixMode) + 0.5;
}`)):(e.fragment.uniforms.add(new pt("colorMixMode",(e=>It[e.colorMixMode]))),e.vertex.code.add(ut`vec4 getSymbolColor() { return vec4(1.0); }
void forwardColorMixMode() {}`))}function Go(e,t){switch(t.output){case tt.Shadow:case tt.ShadowHighlight:case tt.ShadowExcludeHighlight:case tt.ViewshedShadow:e.fragment.include(Xt),e.fragment.code.add(ut`float _calculateFragDepth(const in float depth) {
const float SLOPE_SCALE = 2.0;
const float BIAS = 20.0 * .000015259;
float m = max(abs(dFdx(depth)), abs(dFdy(depth)));
return depth + SLOPE_SCALE * m + BIAS;
}
void outputDepth(float _linearDepth) {
fragColor = floatToRgba4(_calculateFragDepth(_linearDepth));
}`)}}function Bo(e){e.fragment.code.add(ut`
    #define discardOrAdjustAlpha(color) { if (color.a < ${ut.float(L)}) { discard; } }
  `)}class Fo extends ot{constructor(e,t){super(e,"float",Kt.Draw,((o,a,r)=>o.setUniform1f(e,t(a,r))))}}function Do(e,t){Uo(e,t,new at("textureAlphaCutoff",(e=>e.textureAlphaCutoff)))}function Vo(e,t){Uo(e,t,new Fo("textureAlphaCutoff",(e=>e.textureAlphaCutoff)))}function Uo(e,t,o){const a=e.fragment;switch(t.alphaDiscardMode!==Je.Mask&&t.alphaDiscardMode!==Je.MaskBlend||a.uniforms.add(o),t.alphaDiscardMode){case Je.Blend:return e.include(Bo);case Je.Opaque:a.code.add(ut`void discardOrAdjustAlpha(inout vec4 color) {
color.a = 1.0;
}`);break;case Je.Mask:a.code.add(ut`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } else { color.a = 1.0; } }`);break;case Je.MaskBlend:e.fragment.code.add(ut`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } }`)}}function Ho(e,t){const{vertex:o,fragment:a}=e,r=t.hasColorTexture&&t.alphaDiscardMode!==Je.Opaque;switch(t.output){case tt.Depth:R(o,t),e.include(Vt,t),e.include(B,t),e.include(ft,t),r&&a.uniforms.add(new G("tex",(e=>e.texture))),o.code.add(ut`void main(void) {
vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();
}`),e.include(Do,t),a.code.add(ut`
          void main(void) {
            discardBySlice(vpos);
            ${r?ut`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?ut`colorUV`:ut`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
          }
        `);break;case tt.Shadow:case tt.ShadowHighlight:case tt.ShadowExcludeHighlight:case tt.ViewshedShadow:case tt.ObjectAndLayerIdColor:R(o,t),e.include(Vt,t),e.include(ft,t),e.include(N,t),e.include(Go,t),e.include(B,t),e.include(F,t),Ht(e),e.varyings.add("depth","float"),r&&a.uniforms.add(new G("tex",(e=>e.texture))),o.code.add(ut`void main(void) {
vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
forwardTextureCoordinates();
forwardObjectAndLayerIdColor();
}`),e.include(Do,t),a.code.add(ut`
          void main(void) {
            discardBySlice(vpos);
            ${r?ut`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?ut`colorUV`:ut`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
            ${t.output===tt.ObjectAndLayerIdColor?ut`outputObjectAndLayerIdColor();`:ut`outputDepth(depth);`}
          }
        `);break;case tt.Normal:{R(o,t),e.include(Vt,t),e.include(st,t),e.include(vt,t),e.include(ft,t),e.include(N,t),r&&a.uniforms.add(new G("tex",(e=>e.texture))),t.normalType===lt.ScreenDerivative&&e.varyings.add("vPositionView","vec3");const i=t.normalType===lt.Attribute||t.normalType===lt.Compressed;o.code.add(ut`
          void main(void) {
            vpos = getVertexInLocalOriginSpace();

            ${i?ut`vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:ut`
                  // Get vertex position in camera space for screen-space derivative normals
                  vPositionView = (view * vec4(vpos, 1.0)).xyz;
                `}
            vpos = subtractOrigin(vpos);
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            forwardTextureCoordinates();
          }
        `),e.include(B,t),e.include(Do,t),a.code.add(ut`
          void main() {
            discardBySlice(vpos);
            ${r?ut`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?ut`colorUV`:ut`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}

            ${t.normalType===lt.ScreenDerivative?ut`vec3 normal = screenDerivativeNormal(vPositionView);`:ut`
                  vec3 normal = normalize(vNormalWorld);
                  if (gl_FrontFacing == false){
                    normal = -normal;
                  }`}
            fragColor = vec4(0.5 + 0.5 * normal, 1.0);
          }
        `);break}case tt.Highlight:R(o,t),e.include(Vt,t),e.include(ft,t),e.include(N,t),r&&a.uniforms.add(new G("tex",(e=>e.texture))),o.code.add(ut`void main(void) {
vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();
}`),e.include(B,t),e.include(Do,t),e.include(Ut,t),a.code.add(ut`
          void main() {
            discardBySlice(vpos);
            ${r?ut`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?ut`colorUV`:ut`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
            outputHighlight();
          }
        `)}}function qo(e,t){const o=e.fragment;t.hasVertexTangents?(e.attributes.add($e.TANGENT,"vec4"),e.varyings.add("vTangent","vec4"),t.doubleSidedMode===Ao.WindingOrder?o.code.add(ut`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):o.code.add(ut`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):o.code.add(ut`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`),t.textureCoordinateType!==gt.None&&(e.include(xt,t),o.uniforms.add(t.pbrTextureBindType===Kt.Pass?new G("normalTexture",(e=>e.textureNormal)):new ct("normalTexture",(e=>e.textureNormal))),t.hasNormalTextureTransform&&(o.uniforms.add(new D("scale",(e=>e.scale??m))),o.uniforms.add(new rt("normalTextureTransformMatrix",(e=>e.normalTextureTransformMatrix??n)))),o.code.add(ut`vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
vec3 rawNormal = textureLookup(normalTexture, uv).rgb * 2.0 - 1.0;`),t.hasNormalTextureTransform&&o.code.add(ut`mat3 normalTextureRotation = mat3(normalTextureTransformMatrix[0][0]/scale[0], normalTextureTransformMatrix[0][1]/scale[1], 0.0,
normalTextureTransformMatrix[1][0]/scale[0], normalTextureTransformMatrix[1][1]/scale[1], 0.0,
0.0, 0.0, 0.0 );
rawNormal.xy = (normalTextureRotation * vec3(rawNormal.x, rawNormal.y, 1.0)).xy;`),o.code.add(ut`return tangentSpace * rawNormal;
}`))}class Wo extends ot{constructor(e,t){super(e,"vec2",Kt.Draw,((o,a,r,i)=>o.setUniform2fv(e,t(a,r,i))))}}const Yo=Object.freeze(Object.defineProperty({__proto__:null,build:function(){const e=new V,t=e.fragment;return e.include(so),t.include(U),t.uniforms.add(new G("depthMap",(e=>e.depthTexture)),new ct("tex",(e=>e.colorTexture)),new Wo("blurSize",(e=>e.blurSize)),new at("projScale",((e,t)=>{const o=v(t.camera.eye,t.camera.center);return o>5e4?Math.max(0,e.projScale-(o-5e4)):e.projScale}))),t.code.add(ut`
    void blurFunction(vec2 uv, float r, float center_d, float sharpness, inout float wTotal, inout float bTotal) {
      float c = texture(tex, uv).r;
      float d = linearDepthFromTexture(depthMap, uv);

      float ddiff = d - center_d;

      float w = exp(-r * r * ${ut.float(.08)} - ddiff * ddiff * sharpness);
      wTotal += w;
      bTotal += w * c;
    }
  `),e.outputs.add("fragBlur","float"),t.code.add(ut`
    void main(void) {
      float b = 0.0;
      float w_total = 0.0;

      float center_d = linearDepthFromTexture(depthMap, uv);

      float sharpness = -0.05 * projScale / center_d;
      for (int r = -${ut.int(4)}; r <= ${ut.int(4)}; ++r) {
        float rf = float(r);
        vec2 uvOffset = uv + rf * blurSize;
        blurFunction(uvOffset, rf, center_d, sharpness, w_total, b);
      }

      fragBlur = b / w_total;
    }
  `),e}},Symbol.toStringTag,{value:"Module"}));class Jo extends q{initializeProgram(e){return new W(e.rctx,Jo.shader.get().build(),_t)}initializePipeline(){return co({colorWrite:uo})}}Jo.shader=new H(Yo,(()=>Promise.resolve().then((()=>Yo))));class ko extends mt{constructor(){super(...arguments),this.projScale=1}}class Zo extends ko{constructor(){super(...arguments),this.intensity=1}}class Xo extends mt{}class $o extends Xo{constructor(){super(...arguments),this.blurSize=h()}}function Ko(e){return Math.max(10,20*e.computeScreenPixelSizeAtDist(Math.abs(4*e.relativeElevation)))}const Qo=h(),ea=Object.freeze(Object.defineProperty({__proto__:null,build:function(){const e=new V,t=e.fragment;return e.include(so),e.include(po),t.include(U),t.uniforms.add(new at("radius",((e,t)=>Ko(t.camera)))).code.add(ut`vec3 sphere[16] = vec3[16](
vec3(0.186937, 0.0, 0.0),
vec3(0.700542, 0.0, 0.0),
vec3(-0.864858, -0.481795, -0.111713),
vec3(-0.624773, 0.102853, -0.730153),
vec3(-0.387172, 0.260319, 0.007229),
vec3(-0.222367, -0.642631, -0.707697),
vec3(-0.01336, -0.014956, 0.169662),
vec3(0.122575, 0.1544, -0.456944),
vec3(-0.177141, 0.85997, -0.42346),
vec3(-0.131631, 0.814545, 0.524355),
vec3(-0.779469, 0.007991, 0.624833),
vec3(0.308092, 0.209288,0.35969),
vec3(0.359331, -0.184533, -0.377458),
vec3(0.192633, -0.482999, -0.065284),
vec3(0.233538, 0.293706, -0.055139),
vec3(0.417709, -0.386701, 0.442449)
);
float fallOffFunction(float vv, float vn, float bias) {
float f = max(radius * radius - vv, 0.0);
return f * f * f * max(vn - bias, 0.0);
}`),t.code.add(ut`float aoValueFromPositionsAndNormal(vec3 C, vec3 n_C, vec3 Q) {
vec3 v = Q - C;
float vv = dot(v, v);
float vn = dot(normalize(v), n_C);
return fallOffFunction(vv, vn, 0.1);
}`),t.uniforms.add(new G("normalMap",(e=>e.normalTexture)),new G("depthMap",(e=>e.depthTexture)),new at("projScale",(e=>e.projScale)),new G("rnm",(e=>e.noiseTexture)),new D("rnmScale",((e,t)=>io(Qo,t.camera.fullWidth/e.noiseTexture.descriptor.width,t.camera.fullHeight/e.noiseTexture.descriptor.height))),new at("intensity",(e=>e.intensity)),new D("screenSize",((e,t)=>io(Qo,t.camera.fullWidth,t.camera.fullHeight)))),e.outputs.add("fragOcclusion","float"),t.code.add(ut`
    void main(void) {
      float depth = depthFromTexture(depthMap, uv);

      // Early out if depth is out of range, such as in the sky
      if (depth >= 1.0 || depth <= 0.0) {
        fragOcclusion = 1.0;
        return;
      }

      // get the normal of current fragment
      vec4 norm4 = texture(normalMap, uv);
      if(norm4.a != 1.0) {
        fragOcclusion = 1.0;
        return;
      }
      vec3 norm = vec3(-1.0) + 2.0 * norm4.xyz;

      float currentPixelDepth = linearizeDepth(depth);
      vec3 currentPixelPos = reconstructPosition(gl_FragCoord.xy, currentPixelDepth);

      float sum = 0.0;
      vec3 tapPixelPos;

      vec3 fres = normalize(2.0 * texture(rnm, uv * rnmScale).xyz - 1.0);

      // note: the factor 2.0 should not be necessary, but makes ssao much nicer.
      // bug or deviation from CE somewhere else?
      float ps = projScale / (2.0 * currentPixelPos.z * zScale.x + zScale.y);

      for(int i = 0; i < ${ut.int(16)}; ++i) {
        vec2 unitOffset = reflect(sphere[i], fres).xy;
        vec2 offset = vec2(-unitOffset * radius * ps);

        // don't use current or very nearby samples
        if( abs(offset.x) < 2.0 || abs(offset.y) < 2.0){
          continue;
        }

        vec2 tc = vec2(gl_FragCoord.xy + offset);
        if (tc.x < 0.0 || tc.y < 0.0 || tc.x > screenSize.x || tc.y > screenSize.y) continue;
        vec2 tcTap = tc / screenSize;
        float occluderFragmentDepth = linearDepthFromTexture(depthMap, tcTap);

        tapPixelPos = reconstructPosition(tc, occluderFragmentDepth);

        sum += aoValueFromPositionsAndNormal(currentPixelPos, norm, tapPixelPos);
      }

      // output the result
      float A = max(1.0 - sum * intensity / float(${ut.int(16)}), 0.0);

      // Anti-tone map to reduce contrast and drag dark region farther: (x^0.2 + 1.2 * x^4) / 2.2
      A = (pow(A, 0.2) + 1.2 * A*A*A*A) / 2.2;

      fragOcclusion = A;
    }
  `),e},getRadius:Ko},Symbol.toStringTag,{value:"Module"}));class ta extends q{initializeProgram(e){return new W(e.rctx,ta.shader.get().build(),_t)}initializePipeline(){return co({colorWrite:uo})}}ta.shader=new H(ea,(()=>Promise.resolve().then((()=>ea))));const oa=2;let aa=class extends no{constructor(e){super(e),this.consumes={required:["normals"]},this.produces="ssao",this.isEnabled=()=>!1,this._enableTime=oo(0),this._passParameters=new Zo,this._drawParameters=new $o}initialize(){const e=Uint8Array.from(atob("eXKEvZaUc66cjIKElE1jlJ6MjJ6Ufkl+jn2fcXp5jBx7c6KEflSGiXuXeW6OWs+tfqZ2Yot2Y7Zzfo2BhniEj3xoiXuXj4eGZpqEaHKDWjSMe7palFlzc3BziYOGlFVzg6Zzg7CUY5JrjFF7eYJ4jIKEcyyEonSXe7qUfqZ7j3xofqZ2c4R5lFZ5Y0WUbppoe1l2cIh2ezyUho+BcHN2cG6DbpqJhqp2e1GcezhrdldzjFGUcyxjc3aRjDyEc1h7Sl17c6aMjH92pb6Mjpd4dnqBjMOEhqZleIOBYzB7gYx+fnqGjJuEkWlwnCx7fGl+c4hjfGyRe5qMlNOMfnqGhIWHc6OMi4GDc6aMfqZuc6aMzqJzlKZ+lJ6Me3qRfoFue0WUhoR5UraEa6qMkXiPjMOMlJOGe7JrUqKMjK6MeYRzdod+Sl17boiPc6qEeYBlcIh2c1WEe7GDiWCDa0WMjEmMdod+Y0WcdntzhmN8WjyMjKJjiXtzgYxYaGd+a89zlEV7e2GJfnd+lF1rcK5zc4p5cHuBhL6EcXp5eYB7fnh8iX6HjIKEeaxuiYOGc66RfG2Ja5hzjlGMjEmMe9OEgXuPfHyGhPeEdl6JY02McGuMfnqGhFiMa3WJfnx2l4hwcG1uhmN8c0WMc39og1GBbrCEjE2EZY+JcIh2cIuGhIWHe0mEhIVrc09+gY5+eYBlnCyMhGCDl3drfmmMgX15aGd+gYx+fnuRfnhzY1SMsluJfnd+hm98WtNrcIuGh4SEj0qPdkqOjFF7jNNjdnqBgaqUjMt7boeBhnZ4jDR7c5pze4GGjEFrhLqMjHyMc0mUhKZze4WEa117kWlwbpqJjHZ2eX2Bc09zeId+e0V7WlF7jHJ2l72BfId8l3eBgXyBe897jGl7c66cgW+Xc76EjKNbgaSEjGx4fId8jFFjgZB8cG6DhlFziZhrcIh2fH6HgUqBgXiPY8dahGFzjEmMhEFre2dxhoBzc5SGfleGe6alc7aUeYBlhKqUdlp+cH5za4OEczxza0Gcc4J2jHZ5iXuXjH2Jh5yRjH2JcFx+hImBjH+MpddCl3dreZeJjIt8ZW18bm1zjoSEeIOBlF9oh3N7hlqBY4+UeYFwhLJjeYFwaGd+gUqBYxiEYot2fqZ2ondzhL6EYyiEY02Ea0VjgZB8doaGjHxoc66cjEGEiXuXiXWMiZhreHx8frGMe75rY02Ec5pzfnhzlEp4a3VzjM+EhFFza3mUY7Zza1V5e2iMfGyRcziEhDyEkXZ2Y4OBnCx7g5t2eyBjgV6EhEFrcIh2dod+c4Z+nJ5zjm15jEmUeYxijJp7nL6clIpjhoR5WrZraGd+fnuRa6pzlIiMg6ZzfHx5foh+eX1ufnB5eX1ufnB5aJt7UqKMjIh+e3aBfm5lbYSBhGFze6J4c39oc0mUc4Z+e0V7fKFVe0WEdoaGY02Ec4Z+Y02EZYWBfH6HgU1+gY5+hIWUgW+XjJ57ebWRhFVScHuBfJ6PhBx7WqJzlM+Ujpd4gHZziX6HjHmEgZN+lJt5boiPe2GJgX+GjIGJgHZzeaxufnB5hF2JtdN7jJ57hp57hK6ElFVzg6ZzbmiEbndzhIWHe3uJfoFue3qRhJd2j3xoc65zlE1jc3p8lE1jhniEgXJ7e657vZaUc3qBh52BhIF4aHKDa9drgY5+c52GWqZzbpqJe8tjnM+UhIeMfo2BfGl+hG1zSmmMjKJjZVaGgX15c1lze0mEp4OHa3mUhIWHhDyclJ6MeYOJkXiPc0VzhFiMlKaEboSJa5Jze41re3qRhn+HZYWBe0mEc4p5fnORbox5lEp4hGFjhGGEjJuEc1WEhLZjeHeGa7KlfHx2hLaMeX1ugY5+hIWHhKGPjMN7c1WEho1zhoBzZYx7fnhzlJt5exyUhFFziXtzfmmMa6qMYyiEiXxweV12kZSMeWqXSl17fnhzxmmMrVGEe1mcc4p5eHeGjK6MgY5+doaGa6pzlGV7g1qBh4KHkXiPeW6OaKqafqZ2eXZ5e1V7jGd7boSJc3BzhJd2e0mcYot2h1RoY8dahK6EQmWEWjx7e1l2lL6UgXyBdnR4eU9zc0VreX1umqaBhld7fo2Bc6KEc5Z+hDyEcIeBWtNrfHyGe5qMhMuMe5qMhEGEbVVupcNzg3aHhIF4boeBe0mEdlptc39ofFl5Y8uUlJOGiYt2UmGEcyxjjGx4jFF7a657ZYWBnElzhp57iXtrgZN+tfOEhIOBjE2HgU1+e8tjjKNbiWCDhE15gUqBgYN7fnqGc66ce9d7iYSBj0qPcG6DnGGcT3eGa6qMZY+JlIiMl4hwc3aRdnqBlGV7eHJ2hLZjfnuRhDyEeX6MSk17g6Z+c6aUjHmEhIF4gXyBc76EZW18fGl+fkl+jCxrhoVwhDyUhIqGlL2DlI6EhJd2tdN7eYORhEGMa2Faa6pzc3Bzc4R5lIRznM+UY9eMhDycc5Z+c4p5c4iGY117pb6MgXuPrbJafnx2eYOJeXZ5e657hDyEcziElKZjfoB5eHeGj4WRhGGEe6KGeX1utTStc76EhFGJnCyMa5hzfH6HnNeceYB7hmN8gYuMhIVrczSMgYF8h3N7c5pza5hzjJqEYIRdgYuMlL2DeYRzhGGEeX1uhLaEc4iGeZ1zdl6JhrVteX6Me2iMfm5lWqJzSpqEa6pzdnmchHx2c6OMhNdrhoR5g3aHczxzeW52gV6Ejm15frGMc0Vzc4Z+l3drfniJe+9rWq5rlF1rhGGEhoVwe9OEfoh+e7pac09+c3qBY0lrhDycdnp2lJ6MiYOGhGCDc3aRlL2DlJt5doaGdnp2gYF8gWeOjF2Uc4R5c5Z+jEmMe7KEc4mEeYJ4dmyBe0mcgXiPbqJ7eYB7fmGGiYSJjICGlF1reZ2PnElzbpqJfH6Hc39oe4WEc5eJhK6EhqyJc3qBgZB8c09+hEmEaHKDhFGJc5SGiXWMUpaEa89zc6OMnCyMiXtrho+Be5qMc7KEjJ57dmN+hKGPjICGbmiEe7prdod+hGCDdnmchBx7eX6MkXZ2hGGEa657hm98jFFjY5JreYOJgY2EjHZ2a295Y3FajJ6Mc1J+YzB7e4WBjF2Uc4R5eV12gYxzg1qBeId+c9OUc5pzjFFjgY5+hFiMlIaPhoR5lIpjjIKBlNdSe7KEeX2BfrGMhIqGc65zjE2UhK6EklZ+QmWEeziMWqZza3VzdnR4foh+gYF8n3iJiZhrnKp7gYF8eId+lJ6Me1lrcIuGjKJjhmN8c66MjFF7a6prjJ6UnJ5zezyUfruRWlF7nI5zfHyGe657h4SEe8tjhBx7jFFjc09+c39ojICMeZeJeXt+YzRzjHZ2c0WEcIeBeXZ5onSXkVR+gYJ+eYFwdldzgYF7eX2BjJ6UiXuXlE1jh4SEe1mchLJjc4Z+hqZ7eXZ5bm1zlL6Ue5p7iWeGhKqUY5pzjKJjcIeBe8t7gXyBYIRdlEp4a3mGnK6EfmmMZpqEfFl5gYxzjKZuhGFjhoKGhHx2fnx2eXuMe3aBiWeGvbKMe6KGa5hzYzB7gZOBlGV7hmN8hqZlYot2Y117a6pzc6KEfId8foB5rctrfneJfJ6PcHN2hFiMc5pzjH92c0VzgY2EcElzdmCBlFVzg1GBc65zY4OBboeBcHiBeYJ4ewxzfHx5lIRzlEmEnLKEbk1zfJ6PhmN8eYBljBiEnMOEiXxwezyUcIeBe76EdsKEeX2BdnR4jGWUrXWMjGd7fkl+j4WRlEGMa5Jzho+BhDyEfnqMeXt+g3aHlE1jczClhNN7ZW18eHx8hGFjZW18iXWMjKJjhH57gYuMcIuGWjyMe4ZtjJuExmmMj4WRdntzi4GDhFFzYIRdnGGcjJp7Y0F7e4WEkbCGiX57fnSHa657a6prhBCMe3Z+SmmMjH92eHJ2hK6EY1FzexhrvbKMnI5za4OEfnd+eXuMhImBe897hLaMjN+EfG+BeIOBhF1+eZeJi4GDkXZ2eXKEgZ6Ejpd4c2GHa1V5e5KUfqZuhCx7jKp7lLZrg11+hHx2hFWUoot2nI5zgbh5mo9zvZaUe3qRbqKMfqZ2kbCGhFiM"),(e=>e.charCodeAt(0))),t=new yo;t.wrapMode=fo.CLAMP_TO_EDGE,t.pixelFormat=vo.RGB,t.wrapMode=fo.REPEAT,t.hasMipmap=!0,t.width=32,t.height=32,this._passParameters.noiseTexture=new wo(this.renderingContext,t,e),this._ssaoTechnique=this.techniques.acquire(ta),this._blurTechnique=this.techniques.acquire(Jo),this.addHandles(to((()=>this.isEnabled()),(()=>this._enableTime=oo(0))))}destroy(){this._passParameters.noiseTexture=eo(this._passParameters.noiseTexture),this._blurTechnique.release(),this._ssaoTechnique.release()}render(e){const o=this.bindParameters,a=e.find((({name:e})=>"normals"===e)),r=a?.getTexture(),i=a?.getTexture(go),n=this.fboCache,s=o.camera,l=s.fullViewport[2],c=s.fullViewport[3],d=Math.round(l/oa),u=Math.round(c/oa);if(!this._ssaoTechnique.compiled||!this._blurTechnique.compiled)return this._enableTime=oo(performance.now()),this.requestRender(),n.acquire(d,u,"ssao",bt.RED);0===this._enableTime&&(this._enableTime=oo(performance.now()));const m=this.renderingContext,h=this.view.qualitySettings.fadeDuration,p=s.relativeElevation,f=t((Tt-p)/(Tt-yt),0,1),v=h>0?Math.min(h,performance.now()-this._enableTime)/h:1,g=v*f;this._passParameters.normalTexture=r,this._passParameters.depthTexture=i,this._passParameters.projScale=1/s.computeScreenPixelSizeAtDist(1),this._passParameters.intensity=4*ra/Ko(s)**6*g;const x=n.acquire(l,c,"ssao input",bt.RG);m.unbindTexture(x.fbo.colorTexture),m.bindFramebuffer(x.fbo),m.setViewport(0,0,l,c),m.bindTechnique(this._ssaoTechnique,o,this._passParameters,this._drawParameters),m.screen.draw();const b=n.acquire(d,u,"ssao blur",bt.RED);m.unbindTexture(b.fbo.colorTexture),m.bindFramebuffer(b.fbo),this._drawParameters.colorTexture=x.getTexture(),io(this._drawParameters.blurSize,0,oa/c),m.bindTechnique(this._blurTechnique,o,this._passParameters,this._drawParameters),m.setViewport(0,0,d,u),m.screen.draw(),x.release();const T=n.acquire(d,u,"ssao",bt.RED);return m.unbindTexture(T.fbo.colorTexture),m.bindFramebuffer(T.fbo),m.setViewport(0,0,l,c),m.setClearColor(1,1,1,0),m.clear(xo.COLOR_BUFFER_BIT),this._drawParameters.colorTexture=b.getTexture(),io(this._drawParameters.blurSize,oa/l,0),m.bindTechnique(this._blurTechnique,o,this._passParameters,this._drawParameters),m.setViewport(0,0,d,u),m.screen.draw(),m.setViewport4fv(s.fullViewport),b.release(),v<1&&this.requestRender(ke.UPDATE),T}};Qt([ao()],aa.prototype,"consumes",void 0),Qt([ao()],aa.prototype,"produces",void 0),Qt([ao({constructOnly:!0})],aa.prototype,"techniques",void 0),Qt([ao({constructOnly:!0})],aa.prototype,"isEnabled",void 0),aa=Qt([ro("esri.views.3d.webgl-engine.effects.ssao.SSAO")],aa);const ra=.5;function ia(e,t){const o=e.fragment;t.receiveAmbientOcclusion?(o.uniforms.add(new G("ssaoTex",((e,t)=>t.ssao?.getTexture()))),o.constants.add("blurSizePixelsInverse","float",1/oa),o.code.add(ut`float evaluateAmbientOcclusionInverse() {
vec2 ssaoTextureSizeInverse = 1.0 / vec2(textureSize(ssaoTex, 0));
return texture(ssaoTex, gl_FragCoord.xy * blurSizePixelsInverse * ssaoTextureSizeInverse).r;
}
float evaluateAmbientOcclusion() {
return 1.0 - evaluateAmbientOcclusionInverse();
}`)):o.code.add(ut`float evaluateAmbientOcclusionInverse() { return 1.0; }
float evaluateAmbientOcclusion() { return 0.0; }`)}function na(e){e.constants.add("ambientBoostFactor","float",wt)}function sa(e){e.uniforms.add(new at("lightingGlobalFactor",((e,t)=>t.lighting.globalFactor)))}function la(e,t){const o=e.fragment;switch(e.include(ia,t),t.pbrMode!==ht.Disabled&&e.include(Mt,t),e.include(So,t),e.include(Y),o.code.add(ut`
    const float GAMMA_SRGB = 2.1;
    const float INV_GAMMA_SRGB = 0.4761904;
    ${t.pbrMode===ht.Disabled?"":"const vec3 GROUND_REFLECTANCE = vec3(0.2);"}
  `),na(o),sa(o),Ct(o),o.code.add(ut`
    float additionalDirectedAmbientLight(vec3 vPosWorld) {
      float vndl = dot(${t.spherical?ut`normalize(vPosWorld)`:ut`vec3(0.0, 0.0, 1.0)`}, mainLightDirection);
      return smoothstep(0.0, 1.0, clamp(vndl * 2.5, 0.0, 1.0));
    }
  `),St(o),o.code.add(ut`vec3 evaluateAdditionalLighting(float ambientOcclusion, vec3 vPosWorld) {
float additionalAmbientScale = additionalDirectedAmbientLight(vPosWorld);
return (1.0 - ambientOcclusion) * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor * mainLightIntensity;
}`),t.pbrMode){case ht.Disabled:case ht.WaterOnIntegratedMesh:case ht.Water:e.include(Ot),o.code.add(ut`vec3 evaluateSceneLighting(vec3 normalWorld, vec3 albedo, float shadow, float ssao, vec3 additionalLight)
{
vec3 mainLighting = evaluateMainLighting(normalWorld, shadow);
vec3 ambientLighting = calculateAmbientIrradiance(normalWorld, ssao);
vec3 albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
vec3 totalLight = mainLighting + ambientLighting + additionalLight;
totalLight = min(totalLight, vec3(PI));
vec3 outColor = vec3((albedoLinear / PI) * totalLight);
return pow(outColor, vec3(INV_GAMMA_SRGB));
}`);break;case ht.Normal:case ht.Schematic:o.code.add(ut`const float fillLightIntensity = 0.25;
const float horizonLightDiffusion = 0.4;
const float additionalAmbientIrradianceFactor = 0.02;
vec3 evaluateSceneLightingPBR(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight, vec3 viewDir, vec3 normalGround, vec3 mrr, vec3 _emission, float additionalAmbientIrradiance)
{
vec3 viewDirection = -viewDir;
vec3 h = normalize(viewDirection + mainLightDirection);
PBRShadingInfo inputs;
inputs.NdotL = clamp(dot(normal, mainLightDirection), 0.001, 1.0);
inputs.NdotV = clamp(abs(dot(normal, viewDirection)), 0.001, 1.0);
inputs.NdotH = clamp(dot(normal, h), 0.0, 1.0);
inputs.VdotH = clamp(dot(viewDirection, h), 0.0, 1.0);
inputs.NdotNG = clamp(dot(normal, normalGround), -1.0, 1.0);
vec3 reflectedView = normalize(reflect(viewDirection, normal));
inputs.RdotNG = clamp(dot(reflectedView, normalGround), -1.0, 1.0);
inputs.albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
inputs.ssao = ssao;
inputs.metalness = mrr[0];
inputs.roughness = clamp(mrr[1] * mrr[1], 0.001, 0.99);`),o.code.add(ut`inputs.f0 = (0.16 * mrr[2] * mrr[2]) * (1.0 - inputs.metalness) + inputs.albedoLinear * inputs.metalness;
inputs.f90 = vec3(clamp(dot(inputs.f0, vec3(50.0 * 0.33)), 0.0, 1.0));
inputs.diffuseColor = inputs.albedoLinear * (vec3(1.0) - inputs.f0) * (1.0 - inputs.metalness);`),t.useFillLights?o.uniforms.add(new lo("hasFillLights",((e,t)=>t.enableFillLights))):o.constants.add("hasFillLights","bool",!1),o.code.add(ut`vec3 ambientDir = vec3(5.0 * normalGround[1] - normalGround[0] * normalGround[2], - 5.0 * normalGround[0] - normalGround[2] * normalGround[1], normalGround[1] * normalGround[1] + normalGround[0] * normalGround[0]);
ambientDir = ambientDir != vec3(0.0) ? normalize(ambientDir) : normalize(vec3(5.0, -1.0, 0.0));
inputs.NdotAmbDir = hasFillLights ? abs(dot(normal, ambientDir)) : 1.0;
vec3 mainLightIrradianceComponent = inputs.NdotL * (1.0 - shadow) * mainLightIntensity;
vec3 fillLightsIrradianceComponent = inputs.NdotAmbDir * mainLightIntensity * fillLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(normal, ssao) + additionalLight;
inputs.skyIrradianceToSurface = ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
inputs.groundIrradianceToSurface = GROUND_REFLECTANCE * ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;`),o.uniforms.add(new at("lightingSpecularStrength",((e,t)=>t.lighting.mainLight.specularStrength)),new at("lightingEnvironmentStrength",((e,t)=>t.lighting.mainLight.environmentStrength))),o.code.add(ut`vec3 horizonRingDir = inputs.RdotNG * normalGround - reflectedView;
vec3 horizonRingH = normalize(viewDirection + horizonRingDir);
inputs.NdotH_Horizon = dot(normal, horizonRingH);
vec3 mainLightRadianceComponent = lightingSpecularStrength * normalDistribution(inputs.NdotH, inputs.roughness) * mainLightIntensity * (1.0 - shadow);
vec3 horizonLightRadianceComponent = lightingEnvironmentStrength * normalDistribution(inputs.NdotH_Horizon, min(inputs.roughness + horizonLightDiffusion, 1.0)) * mainLightIntensity * fillLightIntensity;
vec3 ambientLightRadianceComponent = lightingEnvironmentStrength * calculateAmbientRadiance(ssao) + additionalLight;
float normalDirectionModifier = mix(1., min(mix(0.1, 2.0, (inputs.NdotNG + 1.) * 0.5), 1.0), clamp(inputs.roughness * 5.0, 0.0 , 1.0));
inputs.skyRadianceToSurface = (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;
inputs.groundRadianceToSurface = 0.5 * GROUND_REFLECTANCE * (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;
inputs.averageAmbientRadiance = ambientLightIrradianceComponent[1] * (1.0 + GROUND_REFLECTANCE[1]);`),o.code.add(ut`
        vec3 reflectedColorComponent = evaluateEnvironmentIllumination(inputs);
        vec3 additionalMaterialReflectanceComponent = inputs.albedoLinear * additionalAmbientIrradiance;
        vec3 emissionComponent = _emission == vec3(0.0) ? _emission : pow(_emission, vec3(GAMMA_SRGB));
        vec3 outColorLinear = reflectedColorComponent + additionalMaterialReflectanceComponent + emissionComponent;
        ${t.pbrMode!==ht.Schematic||t.hasColorTexture?ut`vec3 outColor = pow(blackLevelSoftCompression(outColorLinear, inputs), vec3(INV_GAMMA_SRGB));`:ut`vec3 outColor = pow(max(vec3(0.0), outColorLinear - 0.005 * inputs.averageAmbientRadiance), vec3(INV_GAMMA_SRGB));`}
        return outColor;
      }
    `);break;case ht.Simplified:case ht.TerrainWithWater:e.include(Ot),o.code.add(ut`const float roughnessTerrain = 0.5;
const float specularityTerrain = 0.5;
const vec3 fresnelReflectionTerrain = vec3(0.04);
vec3 evaluatePBRSimplifiedLighting(vec3 n, vec3 c, float shadow, float ssao, vec3 al, vec3 vd, vec3 nup) {
vec3 viewDirection = -vd;
vec3 h = normalize(viewDirection + mainLightDirection);
float NdotL = clamp(dot(n, mainLightDirection), 0.001, 1.0);
float NdotV = clamp(abs(dot(n, viewDirection)), 0.001, 1.0);
float NdotH = clamp(dot(n, h), 0.0, 1.0);
float NdotNG = clamp(dot(n, nup), -1.0, 1.0);
vec3 albedoLinear = pow(c, vec3(GAMMA_SRGB));
float lightness = 0.3 * albedoLinear[0] + 0.5 * albedoLinear[1] + 0.2 * albedoLinear[2];
vec3 f0 = (0.85 * lightness + 0.15) * fresnelReflectionTerrain;
vec3 f90 =  vec3(clamp(dot(f0, vec3(50.0 * 0.33)), 0.0, 1.0));
vec3 mainLightIrradianceComponent = (1. - shadow) * NdotL * mainLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(n, ssao) + al;
vec3 ambientSky = ambientLightIrradianceComponent + mainLightIrradianceComponent;
vec3 indirectDiffuse = ((1.0 - NdotNG) * mainLightIrradianceComponent + (1.0 + NdotNG ) * ambientSky) * 0.5;
vec3 outDiffColor = albedoLinear * (1.0 - f0) * indirectDiffuse / PI;
vec3 mainLightRadianceComponent = normalDistribution(NdotH, roughnessTerrain) * mainLightIntensity;
vec2 dfg = prefilteredDFGAnalytical(roughnessTerrain, NdotV);
vec3 specularColor = f0 * dfg.x + f90 * dfg.y;
vec3 specularComponent = specularityTerrain * specularColor * mainLightRadianceComponent;
vec3 outColorLinear = outDiffColor + specularComponent;
vec3 outColor = pow(outColorLinear, vec3(INV_GAMMA_SRGB));
return outColor;
}`);break;default:dt(t.pbrMode);case ht.COUNT:}}class ca extends ot{constructor(e,t,o){super(e,"mat4",Kt.Draw,((o,a,r,i)=>o.setUniformMatrix4fv(e,t(a,r,i))),o)}}class da extends mt{constructor(){super(...arguments),this.modelTransformation=d}}class ua extends da{constructor(){super(...arguments),this.origin=E()}}function ma(e,t){t.receiveShadows&&(e.fragment.uniforms.add(new $t("shadowMapMatrix",((e,t)=>t.shadowMap.getShadowMapMatrices(e.origin)),4)),pa(e))}function ha(e,t){t.receiveShadows&&(e.fragment.uniforms.add(new ca("shadowMapMatrix",((e,t)=>t.shadowMap.getShadowMapMatrices(e.origin)),4)),pa(e))}function pa(e){const t=e.fragment;t.include(Xt),t.uniforms.add(new G("shadowMap",((e,t)=>t.shadowMap.depthTexture)),new pt("numCascades",((e,t)=>t.shadowMap.numCascades)),new z("cascadeDistances",((e,t)=>t.shadowMap.cascadeDistances))),t.code.add(ut`int chooseCascade(float depth, out mat4 mat) {
vec4 distance = cascadeDistances;
int i = depth < distance[1] ? 0 : depth < distance[2] ? 1 : depth < distance[3] ? 2 : 3;
mat = i == 0 ? shadowMapMatrix[0] : i == 1 ? shadowMapMatrix[1] : i == 2 ? shadowMapMatrix[2] : shadowMapMatrix[3];
return i;
}
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, ivec2 textureSize, vec3 lvpos) {
float xScale = float(textureSize.y) / float(textureSize.x);
return vec2((float(i) + lvpos.x) * xScale, lvpos.y);
}
float readShadowMapDepth(ivec2 uv, sampler2D _depthTex) {
return rgba4ToFloat(texelFetch(_depthTex, uv, 0));
}
float posIsInShadow(ivec2 uv, vec3 lvpos, sampler2D _depthTex) {
return readShadowMapDepth(uv, _depthTex) < lvpos.z ? 1.0 : 0.0;
}
float filterShadow(vec2 uv, vec3 lvpos, ivec2 texSize, sampler2D _depthTex) {
vec2 st = fract(uv * vec2(texSize) + vec2(0.5));
ivec2 base = ivec2(uv * vec2(texSize) - vec2(0.5));
float s00 = posIsInShadow(ivec2(base.x, base.y), lvpos, _depthTex);
float s10 = posIsInShadow(ivec2(base.x + 1, base.y), lvpos, _depthTex);
float s11 = posIsInShadow(ivec2(base.x + 1, base.y + 1), lvpos, _depthTex);
float s01 = posIsInShadow(ivec2(base.x, base.y + 1), lvpos, _depthTex);
return mix(mix(s00, s10, st.x), mix(s01, s11, st.x), st.y);
}
float readShadowMap(const in vec3 _vpos, float _linearDepth) {
mat4 mat;
int i = chooseCascade(_linearDepth, mat);
if (i >= numCascades) { return 0.0; }
vec3 lvpos = lightSpacePosition(_vpos, mat);
if (lvpos.z >= 1.0 || lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) { return 0.0; }
ivec2 size = textureSize(shadowMap, 0);
vec2 uv = cascadeCoordinates(i, size, lvpos);
return filterShadow(uv, lvpos, size, shadowMap);
}`)}function fa(e,t){t.hasColorTextureTransform?(e.vertex.uniforms.add(new rt("colorTextureTransformMatrix",(e=>e.colorTextureTransformMatrix??n))),e.varyings.add("colorUV","vec2"),e.vertex.code.add(ut`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(ut`void forwardColorUV(){}`)}function va(e,t){t.hasNormalTextureTransform&&t.textureCoordinateType!==gt.None?(e.vertex.uniforms.add(new rt("normalTextureTransformMatrix",(e=>e.normalTextureTransformMatrix??n))),e.varyings.add("normalUV","vec2"),e.vertex.code.add(ut`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(ut`void forwardNormalUV(){}`)}function ga(e,t){t.hasEmissionTextureTransform&&t.textureCoordinateType!==gt.None?(e.vertex.uniforms.add(new rt("emissiveTextureTransformMatrix",(e=>e.emissiveTextureTransformMatrix??n))),e.varyings.add("emissiveUV","vec2"),e.vertex.code.add(ut`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(ut`void forwardEmissiveUV(){}`)}function xa(e,t){t.hasOcclusionTextureTransform&&t.textureCoordinateType!==gt.None?(e.vertex.uniforms.add(new rt("occlusionTextureTransformMatrix",(e=>e.occlusionTextureTransformMatrix??n))),e.varyings.add("occlusionUV","vec2"),e.vertex.code.add(ut`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(ut`void forwardOcclusionUV(){}`)}function ba(e,t){t.hasMetallicRoughnessTextureTransform&&t.textureCoordinateType!==gt.None?(e.vertex.uniforms.add(new rt("metallicRoughnessTextureTransformMatrix",(e=>e.metallicRoughnessTextureTransformMatrix??n))),e.varyings.add("metallicRoughnessUV","vec2"),e.vertex.code.add(ut`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(ut`void forwardMetallicRoughnessUV(){}`)}function Ta(e){e.include(J),e.code.add(ut`
    vec3 mixExternalColor(vec3 internalColor, vec3 textureColor, vec3 externalColor, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      vec3 internalMixed = internalColor * textureColor;
      vec3 allMixed = internalMixed * externalColor;

      if (mode == ${ut.int(kt.Multiply)}) {
        return allMixed;
      }
      if (mode == ${ut.int(kt.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${ut.int(kt.Replace)}) {
        return externalColor;
      }

      // tint (or something invalid)
      float vIn = rgb2v(internalMixed);
      vec3 hsvTint = rgb2hsv(externalColor);
      vec3 hsvOut = vec3(hsvTint.x, hsvTint.y, vIn * hsvTint.z);
      return hsv2rgb(hsvOut);
    }

    float mixExternalOpacity(float internalOpacity, float textureOpacity, float externalOpacity, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      float internalMixed = internalOpacity * textureOpacity;
      float allMixed = internalMixed * externalOpacity;

      if (mode == ${ut.int(kt.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${ut.int(kt.Replace)}) {
        return externalOpacity;
      }

      // multiply or tint (or something invalid)
      return allMixed;
    }
  `)}const ya=Object.freeze(Object.defineProperty({__proto__:null,build:function(e){const t=new V,{vertex:o,fragment:a,varyings:r}=t;if(R(o,e),t.include(Yt),r.add("vpos","vec3"),t.include(N,e),t.include(k,e),t.include(Zt,e),t.include(fa,e),e.output===tt.Color){t.include(va,e),t.include(ga,e),t.include(xa,e),t.include(ba,e),Z(o,e),t.include(st,e),t.include(Vt,e);const i=e.normalType===lt.Attribute||e.normalType===lt.Compressed;i&&e.offsetBackfaces&&t.include(Ro),t.include(qo,e),t.include(vt,e),e.instancedColor&&t.attributes.add($e.INSTANCECOLOR,"vec4"),r.add("vPositionLocal","vec3"),t.include(ft,e),t.include(qt,e),t.include(No,e),t.include(Wt,e),o.uniforms.add(new z("externalColor",(e=>e.externalColor))),r.add("vcolorExt","vec4"),e.multipassEnabled&&r.add("depth","float"),o.code.add(ut`
      void main(void) {
        forwardNormalizedVertexColor();
        vcolorExt = externalColor;
        ${e.instancedColor?"vcolorExt *= instanceColor * 0.003921568627451;":""}
        vcolorExt *= vvColor();
        vcolorExt *= getSymbolColor();
        forwardColorMixMode();

        if (vcolorExt.a < ${ut.float(L)}) {
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        } else {
          vpos = getVertexInLocalOriginSpace();
          vPositionLocal = vpos - view[3].xyz;
          vpos = subtractOrigin(vpos);
          ${i?ut`vNormalWorld = dpNormal(vvLocalNormal(normalModel()));`:""}
          vpos = addVerticalOffset(vpos, localOrigin);
          ${e.hasVertexTangents?"vTangent = dpTransformVertexTangent(tangent);":""}
          gl_Position = transformPosition(proj, view, vpos);
          ${i&&e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
        }

        ${e.multipassEnabled?"depth = (view * vec4(vpos, 1.0)).z;":""}
        forwardLinearDepth();
        forwardTextureCoordinates();
        forwardColorUV();
        forwardNormalUV();
        forwardEmissiveUV();
        forwardOcclusionUV();
        forwardMetallicRoughnessUV();
      }
    `),t.include(B,e),t.include(la,e),t.include(ia,e),t.include(Do,e),t.include(e.instancedDoublePrecision?ma:ha,e),t.include(X,e),Z(a,e),a.uniforms.add(o.uniforms.get("localOrigin"),new et("ambient",(e=>e.ambient)),new et("diffuse",(e=>e.diffuse)),new at("opacity",(e=>e.opacity)),new at("layerOpacity",(e=>e.layerOpacity))),e.hasColorTexture&&a.uniforms.add(new G("tex",(e=>e.texture))),t.include(Et,e),t.include(Mt,e),a.include(Ta),t.include(jo,e),na(a),sa(a),St(a),e.transparencyPassType===$.ColorAlpha&&(t.outputs.add("fragColor","vec4",0),t.outputs.add("fragAlpha","float",1)),a.code.add(ut`
      void main() {
        discardBySlice(vpos);
        ${e.multipassEnabled?"terrainDepthTest(depth);":""}
        ${e.hasColorTexture?ut`
                vec4 texColor = texture(tex, ${e.hasColorTextureTransform?ut`colorUV`:ut`vuv0`});
                ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:ut`vec4 texColor = vec4(1.0);`}
        shadingParams.viewDirection = normalize(vpos - cameraPosition);
        ${e.normalType===lt.ScreenDerivative?ut`
                vec3 normal = screenDerivativeNormal(vPositionLocal);`:ut`
                shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
        ${e.pbrMode===ht.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

        vec3 posWorld = vpos + localOrigin;

        float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
        float shadow = ${e.receiveShadows?"readShadowMap(vpos, linearDepth)":e.spherical?"lightingGlobalFactor * (1.0 - additionalAmbientScale)":"0.0"};

        vec3 matColor = max(ambient, diffuse);
        ${e.hasVertexColors?ut`
                vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:ut`
                vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        ${e.hasNormalTexture?ut`
                mat3 tangentSpace = ${e.hasVertexTangents?"computeTangentSpace(normal);":"computeTangentSpace(normal, vpos, vuv0);"}
                vec3 shadingNormal = computeTextureNormal(tangentSpace, ${e.hasNormalTextureTransform?ut`normalUV`:"vuv0"});`:ut`vec3 shadingNormal = normal;`}
        vec3 normalGround = ${e.spherical?ut`normalize(posWorld);`:ut`vec3(0.0, 0.0, 1.0);`}

        ${e.snowCover?ut`
                float snow = smoothstep(0.5, 0.55, dot(normal, normalGround));
                albedo = mix(albedo, vec3(1), snow);
                shadingNormal = mix(shadingNormal, normal, snow);
                ssao = mix(ssao, 1.0, snow);`:""}

        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

        ${e.pbrMode===ht.Normal||e.pbrMode===ht.Schematic?ut`
                float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                ${e.snowCover?ut`
                        mrr = mix(mrr, vec3(0.0, 1.0, 0.04), snow);
                        emission = mix(emission, vec3(0.0), snow);`:""}

                vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:ut`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        fragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${e.transparencyPassType===$.ColorAlpha?ut`
                  fragColor = premultiplyAlpha(fragColor);
                  fragAlpha = fragColor.a;`:""}
      }
    `)}return t.include(Ho,e),t}},Symbol.toStringTag,{value:"Module"}));class wa extends At{constructor(){super(...arguments),this.isSchematic=!1,this.usePBR=!1,this.mrrFactors=A(_o),this.hasVertexColors=!1,this.hasSymbolColors=!1,this.doubleSided=!1,this.doubleSidedType="normal",this.cullFace=Ze.Back,this.isInstanced=!1,this.hasInstancedColor=!1,this.emissiveFactor=P(0,0,0),this.instancedDoublePrecision=!1,this.normalType=lt.Attribute,this.receiveShadows=!0,this.receiveAmbientOcclusion=!0,this.castShadows=!0,this.shadowMappingEnabled=!1,this.ambient=P(.2,.2,.2),this.diffuse=P(.8,.8,.8),this.externalColor=Dt(1,1,1,1),this.colorMixMode="multiply",this.opacity=1,this.layerOpacity=1,this.origin=E(),this.hasSlicePlane=!1,this.hasSliceHighlight=!0,this.offsetTransparentBackfaces=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.modelTransformation=null,this.transparent=!1,this.writeDepth=!0,this.customDepthTest=Xe.Less,this.textureAlphaMode=Je.Blend,this.textureAlphaCutoff=K,this.textureAlphaPremultiplied=!1,this.hasOccludees=!1,this.renderOccluded=zt.Occlude,this.isDecoration=!1}}class Ma extends jt{constructor(){super(...arguments),this.origin=E(),this.slicePlaneLocalOrigin=this.origin}}class Ca extends q{initializeConfiguration(e,t){t.spherical=e.viewingMode===Ke.Global,t.doublePrecisionRequiresObfuscation=e.rctx.driverTest.doublePrecisionRequiresObfuscation.result,t.textureCoordinateType=t.hasColorTexture||t.hasMetallicRoughnessTexture||t.hasEmissionTexture||t.hasOcclusionTexture||t.hasNormalTexture?gt.Default:gt.None,t.objectAndLayerIdColorInstanced=t.instanced}initializeProgram(e){return this._initializeProgram(e,Ca.shader)}_initializeProgram(e,t){return new W(e.rctx,t.get().build(this.configuration),_t)}_makePipeline(e,t){const o=this.configuration,a=e===$.NONE,r=e===$.FrontFace;return co({blending:o.output===tt.Color&&o.transparent?a?Q:ee(e):null,culling:Sa(o)?mo(o.cullFace):null,depthTest:{func:te(e,(i=o.customDepthTest,i===Xe.Lequal?To.LEQUAL:To.LESS))},depthWrite:(a||r)&&o.writeDepth?ho:null,drawBuffers:o.output===tt.Depth?{buffers:[bo.NONE]}:oe(e),colorWrite:uo,stencilWrite:o.hasOccludees?ae:null,stencilTest:o.hasOccludees?t?re:ie:null,polygonOffset:a||r?null:ne(o.enableOffset)});var i}initializePipeline(){return this._occludeePipelineState=this._makePipeline(this.configuration.transparencyPassType,!0),this._makePipeline(this.configuration.transparencyPassType,!1)}getPipeline(e){return e?this._occludeePipelineState:super.getPipeline()}}function Sa(e){return e.cullFace!==Ze.None||!e.hasSlicePlane&&!e.transparent&&!e.doubleSidedMode}Ca.shader=new H(ya,(()=>Promise.resolve().then((()=>ya))));class Oa extends se{constructor(){super(...arguments),this.output=tt.Color,this.alphaDiscardMode=Je.Opaque,this.doubleSidedMode=Ao.None,this.pbrMode=ht.Disabled,this.cullFace=Ze.None,this.transparencyPassType=$.NONE,this.normalType=lt.Attribute,this.textureCoordinateType=gt.None,this.customDepthTest=Xe.Less,this.spherical=!1,this.hasVertexColors=!1,this.hasSymbolColors=!1,this.hasVerticalOffset=!1,this.hasSlicePlane=!1,this.hasSliceHighlight=!0,this.hasColorTexture=!1,this.hasMetallicRoughnessTexture=!1,this.hasEmissionTexture=!1,this.hasOcclusionTexture=!1,this.hasNormalTexture=!1,this.hasScreenSizePerspective=!1,this.hasVertexTangents=!1,this.hasOccludees=!1,this.multipassEnabled=!1,this.hasModelTransformation=!1,this.offsetBackfaces=!1,this.vvSize=!1,this.vvColor=!1,this.receiveShadows=!1,this.receiveAmbientOcclusion=!1,this.textureAlphaPremultiplied=!1,this.instanced=!1,this.instancedColor=!1,this.objectAndLayerIdColorInstanced=!1,this.instancedDoublePrecision=!1,this.doublePrecisionRequiresObfuscation=!1,this.writeDepth=!0,this.transparent=!1,this.enableOffset=!0,this.cullAboveGround=!1,this.snowCover=!1,this.hasColorTextureTransform=!1,this.hasEmissionTextureTransform=!1,this.hasNormalTextureTransform=!1,this.hasOcclusionTextureTransform=!1,this.hasMetallicRoughnessTextureTransform=!1}}Qt([Co({count:tt.COUNT})],Oa.prototype,"output",void 0),Qt([Co({count:Je.COUNT})],Oa.prototype,"alphaDiscardMode",void 0),Qt([Co({count:Ao.COUNT})],Oa.prototype,"doubleSidedMode",void 0),Qt([Co({count:ht.COUNT})],Oa.prototype,"pbrMode",void 0),Qt([Co({count:Ze.COUNT})],Oa.prototype,"cullFace",void 0),Qt([Co({count:$.COUNT})],Oa.prototype,"transparencyPassType",void 0),Qt([Co({count:lt.COUNT})],Oa.prototype,"normalType",void 0),Qt([Co({count:gt.COUNT})],Oa.prototype,"textureCoordinateType",void 0),Qt([Co({count:Xe.COUNT})],Oa.prototype,"customDepthTest",void 0),Qt([Co()],Oa.prototype,"spherical",void 0),Qt([Co()],Oa.prototype,"hasVertexColors",void 0),Qt([Co()],Oa.prototype,"hasSymbolColors",void 0),Qt([Co()],Oa.prototype,"hasVerticalOffset",void 0),Qt([Co()],Oa.prototype,"hasSlicePlane",void 0),Qt([Co()],Oa.prototype,"hasSliceHighlight",void 0),Qt([Co()],Oa.prototype,"hasColorTexture",void 0),Qt([Co()],Oa.prototype,"hasMetallicRoughnessTexture",void 0),Qt([Co()],Oa.prototype,"hasEmissionTexture",void 0),Qt([Co()],Oa.prototype,"hasOcclusionTexture",void 0),Qt([Co()],Oa.prototype,"hasNormalTexture",void 0),Qt([Co()],Oa.prototype,"hasScreenSizePerspective",void 0),Qt([Co()],Oa.prototype,"hasVertexTangents",void 0),Qt([Co()],Oa.prototype,"hasOccludees",void 0),Qt([Co()],Oa.prototype,"multipassEnabled",void 0),Qt([Co()],Oa.prototype,"hasModelTransformation",void 0),Qt([Co()],Oa.prototype,"offsetBackfaces",void 0),Qt([Co()],Oa.prototype,"vvSize",void 0),Qt([Co()],Oa.prototype,"vvColor",void 0),Qt([Co()],Oa.prototype,"receiveShadows",void 0),Qt([Co()],Oa.prototype,"receiveAmbientOcclusion",void 0),Qt([Co()],Oa.prototype,"textureAlphaPremultiplied",void 0),Qt([Co()],Oa.prototype,"instanced",void 0),Qt([Co()],Oa.prototype,"instancedColor",void 0),Qt([Co()],Oa.prototype,"objectAndLayerIdColorInstanced",void 0),Qt([Co()],Oa.prototype,"instancedDoublePrecision",void 0),Qt([Co()],Oa.prototype,"doublePrecisionRequiresObfuscation",void 0),Qt([Co()],Oa.prototype,"writeDepth",void 0),Qt([Co()],Oa.prototype,"transparent",void 0),Qt([Co()],Oa.prototype,"enableOffset",void 0),Qt([Co()],Oa.prototype,"cullAboveGround",void 0),Qt([Co()],Oa.prototype,"snowCover",void 0),Qt([Co()],Oa.prototype,"hasColorTextureTransform",void 0),Qt([Co()],Oa.prototype,"hasEmissionTextureTransform",void 0),Qt([Co()],Oa.prototype,"hasNormalTextureTransform",void 0),Qt([Co()],Oa.prototype,"hasOcclusionTextureTransform",void 0),Qt([Co()],Oa.prototype,"hasMetallicRoughnessTextureTransform",void 0),Qt([Co({constValue:!1})],Oa.prototype,"occlusionPass",void 0),Qt([Co({constValue:!0})],Oa.prototype,"hasVvInstancing",void 0),Qt([Co({constValue:!1})],Oa.prototype,"useCustomDTRExponentForWater",void 0),Qt([Co({constValue:!1})],Oa.prototype,"supportsTextureAtlas",void 0),Qt([Co({constValue:!0})],Oa.prototype,"useFillLights",void 0);const Ea=Object.freeze(Object.defineProperty({__proto__:null,build:function(e){const t=new V,{vertex:o,fragment:a,varyings:r}=t;return R(o,e),t.include(Yt),r.add("vpos","vec3"),t.include(N,e),t.include(k,e),t.include(Zt,e),e.output===tt.Color&&(Z(t.vertex,e),t.include(st,e),t.include(Vt,e),e.offsetBackfaces&&t.include(Ro),e.instancedColor&&t.attributes.add($e.INSTANCECOLOR,"vec4"),r.add("vNormalWorld","vec3"),r.add("localvpos","vec3"),e.multipassEnabled&&r.add("depth","float"),t.include(ft,e),t.include(qt,e),t.include(No,e),t.include(Wt,e),o.uniforms.add(new z("externalColor",(e=>e.externalColor))),r.add("vcolorExt","vec4"),o.code.add(ut`
        void main(void) {
          forwardNormalizedVertexColor();
          vcolorExt = externalColor;
          ${e.instancedColor?"vcolorExt *= instanceColor * 0.003921568627451;":""}
          vcolorExt *= vvColor();
          vcolorExt *= getSymbolColor();
          forwardColorMixMode();

          if (vcolorExt.a < ${ut.float(L)}) {
            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          } else {
            vpos = getVertexInLocalOriginSpace();
            localvpos = vpos - view[3].xyz;
            vpos = subtractOrigin(vpos);
            vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            ${e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
          }
          ${e.multipassEnabled?ut`depth = (view * vec4(vpos, 1.0)).z;`:""}
          forwardLinearDepth();
          forwardTextureCoordinates();
        }
      `)),e.output===tt.Color&&(t.include(B,e),t.include(la,e),t.include(ia,e),t.include(Do,e),t.include(e.instancedDoublePrecision?ma:ha,e),t.include(X,e),Z(t.fragment,e),Ct(a),na(a),sa(a),a.uniforms.add(o.uniforms.get("localOrigin"),o.uniforms.get("view"),new et("ambient",(e=>e.ambient)),new et("diffuse",(e=>e.diffuse)),new at("opacity",(e=>e.opacity)),new at("layerOpacity",(e=>e.layerOpacity))),e.hasColorTexture&&a.uniforms.add(new G("tex",(e=>e.texture))),t.include(Et,e),t.include(Mt,e),a.include(Ta),e.transparencyPassType===$.ColorAlpha&&(t.outputs.add("fragColor","vec4",0),t.outputs.add("fragAlpha","float",1)),St(a),a.code.add(ut`
      void main() {
        discardBySlice(vpos);
        ${e.multipassEnabled?ut`terrainDepthTest(depth);`:""}
        ${e.hasColorTexture?ut`
                vec4 texColor = texture(tex, ${e.hasColorTextureTransform?ut`colorUV`:ut`vuv0`});
                ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:ut`vec4 texColor = vec4(1.0);`}
        vec3 viewDirection = normalize(vpos - cameraPosition);
        ${e.pbrMode===ht.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        ${e.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":e.spherical?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;"}
        vec3 matColor = max(ambient, diffuse);
        ${e.hasVertexColors?ut`
                vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:ut`
                vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        ${e.snowCover?ut`albedo = mix(albedo, vec3(1), 0.9);`:ut``}
        ${ut`
            vec3 shadingNormal = normalize(vNormalWorld);
            albedo *= 1.2;
            vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
            float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
            float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
            float treeRadialFalloff = vColor.r;
            float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
            additionalLight += backLightFactor * mainLightIntensity;`}
        ${e.pbrMode===ht.Normal||e.pbrMode===ht.Schematic?e.spherical?ut`vec3 normalGround = normalize(vpos + localOrigin);`:ut`vec3 normalGround = vec3(0.0, 0.0, 1.0);`:ut``}
        ${e.pbrMode===ht.Normal||e.pbrMode===ht.Schematic?ut`
                float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                ${e.snowCover?ut`
                        mrr = vec3(0.0, 1.0, 0.04);
                        emission = vec3(0.0);`:""}

                vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:ut`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        fragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${e.transparencyPassType===$.ColorAlpha?ut`
                fragColor = premultiplyAlpha(fragColor);
                fragAlpha = fragColor.a;`:""}
      }
    `)),t.include(Ho,e),t}},Symbol.toStringTag,{value:"Module"}));class ja extends Ca{initializeConfiguration(e,t){super.initializeConfiguration(e,t),t.hasMetallicRoughnessTexture=!1,t.hasEmissionTexture=!1,t.hasOcclusionTexture=!1,t.hasNormalTexture=!1,t.hasModelTransformation=!1,t.normalType=lt.Attribute,t.doubleSidedMode=Ao.WindingOrder,t.hasVertexTangents=!1}initializeProgram(e){return this._initializeProgram(e,ja.shader)}}ja.shader=new H(Ea,(()=>Promise.resolve().then((()=>Ea))));class Aa extends Lt{constructor(e){super(e,Ia),this.supportsEdges=!0,this.produces=new Map([[le.OPAQUE_MATERIAL,e=>(it(e)||nt(e))&&!this.parameters.transparent],[le.TRANSPARENT_MATERIAL,e=>(it(e)||nt(e))&&this.parameters.transparent&&this.parameters.writeDepth],[le.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL,e=>(it(e)||nt(e))&&this.parameters.transparent&&!this.parameters.writeDepth]]),this._configuration=new Oa,this._vertexBufferLayout=function(e){const t=Qe().vec3f($e.POSITION);return e.normalType===lt.Compressed?t.vec2i16($e.NORMALCOMPRESSED,{glNormalized:!0}):t.vec3f($e.NORMAL),e.hasVertexTangents&&t.vec4f($e.TANGENT),(e.textureId||e.normalTextureId||e.metallicRoughnessTextureId||e.emissiveTextureId||e.occlusionTextureId)&&t.vec2f($e.UV0),e.hasVertexColors&&t.vec4u8($e.COLOR),e.hasSymbolColors&&t.vec4u8($e.SYMBOLCOLOR),Ge("enable-feature:objectAndLayerId-rendering")&&t.vec4u8($e.OBJECTANDLAYERIDCOLOR),t}(this.parameters)}isVisibleForOutput(e){return e!==tt.Shadow&&e!==tt.ShadowExcludeHighlight&&e!==tt.ShadowHighlight||this.parameters.castShadows}isVisible(){const e=this.parameters;if(!super.isVisible()||0===e.layerOpacity)return!1;const{hasInstancedColor:t,hasVertexColors:o,hasSymbolColors:a,vvColor:r}=e,i="replace"===e.colorMixMode,n=e.opacity>0,s=e.externalColor&&e.externalColor[3]>0,l=t||r||a;return o&&l?i||n:o?i?s:n:l?i||n:i?s:n}getConfiguration(e,t){return this._configuration.output=e,this._configuration.hasNormalTexture=!!this.parameters.normalTextureId,this._configuration.hasColorTexture=!!this.parameters.textureId,this._configuration.hasVertexTangents=this.parameters.hasVertexTangents,this._configuration.instanced=this.parameters.isInstanced,this._configuration.instancedDoublePrecision=this.parameters.instancedDoublePrecision,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.hasVerticalOffset=null!=this.parameters.verticalOffset,this._configuration.hasScreenSizePerspective=null!=this.parameters.screenSizePerspective,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasSliceHighlight=this.parameters.hasSliceHighlight,this._configuration.alphaDiscardMode=this.parameters.textureAlphaMode,this._configuration.normalType=this.parameters.normalType,this._configuration.transparent=this.parameters.transparent,this._configuration.writeDepth=this.parameters.writeDepth,null!=this.parameters.customDepthTest&&(this._configuration.customDepthTest=this.parameters.customDepthTest),this._configuration.hasOccludees=this.parameters.hasOccludees,this._configuration.cullFace=this.parameters.hasSlicePlane?Ze.None:this.parameters.cullFace,this._configuration.multipassEnabled=t.multipassEnabled,this._configuration.cullAboveGround=t.multipassTerrain.cullAboveGround,this._configuration.hasModelTransformation=null!=this.parameters.modelTransformation,e===tt.Color&&(this._configuration.hasVertexColors=this.parameters.hasVertexColors,this._configuration.hasSymbolColors=this.parameters.hasSymbolColors,this.parameters.treeRendering?this._configuration.doubleSidedMode=Ao.WindingOrder:this._configuration.doubleSidedMode=this.parameters.doubleSided&&"normal"===this.parameters.doubleSidedType?Ao.View:this.parameters.doubleSided&&"winding-order"===this.parameters.doubleSidedType?Ao.WindingOrder:Ao.None,this._configuration.instancedColor=this.parameters.hasInstancedColor,this._configuration.receiveShadows=this.parameters.receiveShadows&&this.parameters.shadowMappingEnabled,this._configuration.receiveAmbientOcclusion=this.parameters.receiveAmbientOcclusion&&null!=t.ssao,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.textureAlphaPremultiplied=!!this.parameters.textureAlphaPremultiplied,this._configuration.pbrMode=this.parameters.usePBR?this.parameters.isSchematic?ht.Schematic:ht.Normal:ht.Disabled,this._configuration.hasMetallicRoughnessTexture=!!this.parameters.metallicRoughnessTextureId,this._configuration.hasEmissionTexture=!!this.parameters.emissiveTextureId,this._configuration.hasOcclusionTexture=!!this.parameters.occlusionTextureId,this._configuration.offsetBackfaces=!(!this.parameters.transparent||!this.parameters.offsetTransparentBackfaces),this._configuration.transparencyPassType=t.transparencyPassType,this._configuration.enableOffset=t.camera.relativeElevation<ce,this._configuration.snowCover=this.hasSnowCover(t),this._configuration.hasColorTextureTransform=!!this.parameters.colorTextureTransformMatrix,this._configuration.hasNormalTextureTransform=!!this.parameters.normalTextureTransformMatrix,this._configuration.hasEmissionTextureTransform=!!this.parameters.emissiveTextureTransformMatrix,this._configuration.hasOcclusionTextureTransform=!!this.parameters.occlusionTextureTransformMatrix,this._configuration.hasMetallicRoughnessTextureTransform=!!this.parameters.metallicRoughnessTextureTransformMatrix),this._configuration}hasSnowCover(e){return null!=e.weather&&e.weatherVisible&&"snowy"===e.weather.type&&"enabled"===e.weather.snowCover}intersect(e,t,o,a,r,i){if(null!=this.parameters.verticalOffset){const e=o.camera;p(Ga,t[12],t[13],t[14]);let i=null;switch(o.viewingMode){case Ke.Global:i=x(Ra,Ga);break;case Ke.Local:i=g(Ra,La)}let n=0;const s=b(Ba,Ga,e.eye),l=T(s),c=y(s,s,1/l);let d=null;this.parameters.screenSizePerspective&&(d=w(i,c)),n+=Rt(e,l,this.parameters.verticalOffset,d??0,this.parameters.screenSizePerspective),y(i,i,n),M(Na,i,o.transform.inverseRotation),a=b(_a,a,Na),r=b(za,r,Na)}Nt(e,o,a,r,Bt(o.verticalOffset),i)}createGLMaterial(e){return new Pa(e)}createBufferWriter(){return new Gt(this._vertexBufferLayout)}}class Pa extends Pt{constructor(e){super({...e,...e.material.parameters})}_updateShadowState(e){e.shadowMap.enabled!==this._material.parameters.shadowMappingEnabled&&this._material.setParameters({shadowMappingEnabled:e.shadowMap.enabled})}_updateOccludeeState(e){e.hasOccludees!==this._material.parameters.hasOccludees&&this._material.setParameters({hasOccludees:e.hasOccludees})}beginSlot(e){this._output===tt.Color&&(this._updateShadowState(e),this._updateOccludeeState(e));const t=this._material.parameters;this.updateTexture(t.textureId);const o=e.camera.viewInverseTransposeMatrix;return p(t.origin,o[3],o[7],o[11]),this._material.setParameters(this.textureBindParameters),this.ensureTechnique(t.treeRendering?ja:Ca,e)}}const Ia=new class extends wa{constructor(){super(...arguments),this.initTextureTransparent=!1,this.treeRendering=!1,this.hasVertexTangents=!1}},_a=E(),za=E(),La=P(0,0,1),Ra=E(),Na=E(),Ga=E(),Ba=E();function Fa(e){if(null==e)return null;const t=null!=e.offset?e.offset:ze,o=null!=e.rotation?e.rotation:0,r=null!=e.scale?e.scale:Le,i=s(1,0,0,0,1,0,t[0],t[1],1),n=s(Math.cos(o),-Math.sin(o),0,Math.sin(o),Math.cos(o),0,0,0,1),c=s(r[0],0,0,0,r[1],0,0,0,1),d=l();return a(d,n,c),a(d,i,d),d}class Da{constructor(){this.geometries=new Array,this.materials=new Array,this.textures=new Array}}class Va{constructor(e,t,o){this.name=e,this.lodThreshold=t,this.pivotOffset=o,this.stageResources=new Da,this.numberOfVertices=0}}const Ua=()=>De.getLogger("esri.views.3d.layers.graphics.objectResourceUtils");async function Ha(e,t){const o=await async function(e,t){const o=t?.streamDataRequester;if(o)return async function(e,t,o){const a=await Ne(t.request(e,"json",o));return!0===a.ok?a.value:(Ue(a.error),void qa(a.error.details.url))}(e,o,t);const a=await Ne(Re(e,t));return!0===a.ok?a.value.data:(Ue(a.error),void qa(a.error))}(e,t),a=await async function(e,t){const o=new Array;for(const a in e){const r=e[a],i=r.images[0].data;if(!i){Ua().warn("Externally referenced texture data is not yet supported");continue}const n=r.encoding+";base64,"+i,s="/textureDefinitions/"+a,l="rgba"===r.channels?r.alphaChannelUsage||"transparency":"none",c={noUnpackFlip:!0,wrap:{s:fo.REPEAT,t:fo.REPEAT},preMultiplyAlpha:Ja(l)!==Je.Opaque},d=t?.disableTextures?Promise.resolve(null):We(n,t);o.push(d.then((e=>({refId:s,image:e,parameters:c,alphaChannelUsage:l}))))}const a=await Promise.all(o),r={};for(const e of a)r[e.refId]=e;return r}(o.textureDefinitions??{},t);let r=0;for(const e in a)if(a.hasOwnProperty(e)){const t=a[e];r+=t?.image?t.image.width*t.image.height*4:0}return{resource:o,textures:a,size:r+Be(o)}}function qa(e){throw new Fe("",`Request for object resource failed: ${e}`)}function Wa(e){const t=e.params,o=t.topology;let a=!0;switch(t.vertexAttributes||(Ua().warn("Geometry must specify vertex attributes"),a=!1),t.topology){case"PerAttributeArray":break;case"Indexed":case null:case void 0:{const e=t.faces;if(e){if(t.vertexAttributes)for(const o in t.vertexAttributes){const t=e[o];t?.values?(null!=t.valueType&&"UInt32"!==t.valueType&&(Ua().warn(`Unsupported indexed geometry indices type '${t.valueType}', only UInt32 is currently supported`),a=!1),null!=t.valuesPerElement&&1!==t.valuesPerElement&&(Ua().warn(`Unsupported indexed geometry values per element '${t.valuesPerElement}', only 1 is currently supported`),a=!1)):(Ua().warn(`Indexed geometry does not specify face indices for '${o}' attribute`),a=!1)}}else Ua().warn("Indexed geometries must specify faces"),a=!1;break}default:Ua().warn(`Unsupported topology '${o}'`),a=!1}e.params.material||(Ua().warn("Geometry requires material"),a=!1);const r=e.params.vertexAttributes;for(const e in r)r[e].values||(Ua().warn("Geometries with externally defined attributes are not yet supported"),a=!1);return a}function Ya(e){const t=I();return e.forEach((e=>{const o=e.boundingInfo;null!=o&&(_(t,o.bbMin),_(t,o.bbMax))})),t}function Ja(e){switch(e){case"mask":return Je.Mask;case"maskAndTransparency":return Je.MaskBlend;case"none":return Je.Opaque;default:return Je.Blend}}function ka(e){const t=e.params;return{id:1,material:t.material,texture:t.texture,region:t.texture}}const Za=new He(1,2,"wosr");async function Xa(t,o){const a=$a(e(t));if("wosr"===a.fileType){const e=await(o.cache?o.cache.loadWOSR(a.url,o):Ha(a.url,o)),{engineResources:t,referenceBoundingBox:r}=function(e,t){const o=new Array,a=new Array,r=new Array,i=new Ve,n=e.resource,s=He.parse(n.version||"1.0","wosr");Za.validate(s);const l=n.model.name,c=n.model.geometries,d=n.materialDefinitions??{},u=e.textures;let m=0;const h=new Map;for(let e=0;e<c.length;e++){const n=c[e];if(!Wa(n))continue;const s=ka(n),l=n.params.vertexAttributes,p=[],f=e=>{if("PerAttributeArray"===n.params.topology)return null;const t=n.params.faces;for(const o in t)if(o===e)return t[o].values;return null},v=l[$e.POSITION],g=v.values.length/v.valuesPerElement;for(const e in l){const t=l[e],o=t.values,a=f(e)??qe(g);p.push([e,new Ye(o,a,t.valuesPerElement,!0)])}const x=s.texture,b=u&&u[x];if(b&&!h.has(x)){const{image:e,parameters:t}=b,o=new de(e,t);a.push(o),h.set(x,o)}const T=h.get(x),y=T?T.id:void 0,w=s.material;let M=i.get(w,x);if(null==M){const e=d[w.substring(w.lastIndexOf("/")+1)].params;1===e.transparency&&(e.transparency=0);const o=b&&b.alphaChannelUsage,a=e.transparency>0||"transparency"===o||"maskAndTransparency"===o,r=b?Ja(b.alphaChannelUsage):void 0,n={ambient:A(e.diffuse),diffuse:A(e.diffuse),opacity:1-(e.transparency||0),transparent:a,textureAlphaMode:r,textureAlphaCutoff:.33,textureId:y,initTextureTransparent:!0,doubleSided:!0,cullFace:Ze.None,colorMixMode:e.externalColorMixMode||"tint",textureAlphaPremultiplied:b?.parameters.preMultiplyAlpha??!1};t?.materialParameters&&Object.assign(n,t.materialParameters),M=new Aa(n),i.set(w,x,M)}r.push(M);const C=new ue(M,p);m+=p.find((e=>e[0]===$e.POSITION))?.[1]?.indices.length??0,o.push(C)}return{engineResources:[{name:l,stageResources:{textures:a,materials:r,geometries:o},pivotOffset:n.model.pivotOffset,numberOfVertices:m,lodThreshold:null}],referenceBoundingBox:Ya(o)}}(e,o);return{lods:t,referenceBoundingBox:r,isEsriSymbolResource:!1,isWosr:!0}}const r=await(o.cache?o.cache.loadGLTF(a.url,o,!!o.usePBR):Se(new Oe(o.streamDataRequester),a.url,o,o.usePBR)),i=r.model.meta?.ESRI_proxyEllipsoid,n=r.meta.isEsriSymbolResource&&null!=i&&"EsriRealisticTreesStyle"===r.meta.ESRI_webstyle;n&&!r.customMeta.esriTreeRendering&&(r.customMeta.esriTreeRendering=!0,function(e,t){for(let o=0;o<e.model.lods.length;++o){const a=e.model.lods[o];for(const r of a.parts){const a=r.attributes.normal;if(null==a)return;const i=r.attributes.position,n=i.count,s=E(),l=E(),d=E(),m=new Uint8Array(4*n),h=new Float64Array(3*n),p=c(u(),r.transform);let f=0,v=0;for(let c=0;c<n;c++){i.getVec(c,l),a.getVec(c,s),C(l,l,r.transform),b(d,l,t.center),S(d,d,t.radius);const n=d[2],u=T(d),g=Math.min(.45+.55*u*u,1);S(d,d,t.radius),null!==p&&C(d,d,p),x(d,d),o+1!==e.model.lods.length&&e.model.lods.length>1&&O(d,d,s,n>-1?.2:Math.min(-4*n-3.8,1)),h[f]=d[0],h[f+1]=d[1],h[f+2]=d[2],f+=3,m[v]=255*g,m[v+1]=255*g,m[v+2]=255*g,m[v+3]=255,v+=4}r.attributes.normal=new ve(h),r.attributes.color=new pe(m)}}}(r,i));const s=!!o.usePBR,l=r.meta.isEsriSymbolResource?{usePBR:s,isSchematic:!1,treeRendering:n,mrrFactors:[...Lo]}:{usePBR:s,isSchematic:!1,treeRendering:!1,mrrFactors:[..._o]},d={...o.materialParameters,treeRendering:n},{engineResources:m,referenceBoundingBox:h}=Ka(r,l,d,o.skipHighLods&&null==a.specifiedLodIndex?{skipHighLods:!0}:{skipHighLods:!1,singleLodIndex:a.specifiedLodIndex});return{lods:m,referenceBoundingBox:h,isEsriSymbolResource:r.meta.isEsriSymbolResource,isWosr:!1}}function $a(e){const t=e.match(/(.*\.(gltf|glb))(\?lod=([0-9]+))?$/);return t?{fileType:"gltf",url:t[1],specifiedLodIndex:null!=t[4]?Number(t[4]):null}:e.match(/(.*\.(json|json\.gz))$/)?{fileType:"wosr",url:e,specifiedLodIndex:null}:{fileType:"unknown",url:e,specifiedLodIndex:null}}function Ka(e,t,a,n){const s=e.model,l=new Array,c=new Map,d=new Map,u=s.lods.length,h=I();return s.lods.forEach(((e,p)=>{const f=!0===n.skipHighLods&&(u>1&&0===p||u>3&&1===p)||!1===n.skipHighLods&&null!=n.singleLodIndex&&p!==n.singleLodIndex;if(f&&0!==p)return;const v=new Va(e.name,e.lodThreshold,[0,0,0]);e.parts.forEach((e=>{const n=f?new Aa({}):function(e,t,o,a,r,i,n){const s=t.material+(t.attributes.normal?"_normal":"")+(t.attributes.color?"_color":"")+(t.attributes.texCoord0?"_texCoord0":"")+(t.attributes.tangent?"_tangent":""),l=e.materials.get(t.material),c=null!=t.attributes.texCoord0,d=null!=t.attributes.normal;if(null==l)return null;const u=function(e){switch(e){case"BLEND":return Je.Blend;case"MASK":return Je.Mask;case"OPAQUE":case null:case void 0:return Je.Opaque}}(l.alphaMode);if(!i.has(s)){if(c){const t=(t,o=!1)=>{if(null!=t&&!n.has(t)){const a=e.textures.get(t);if(null!=a){const e=a.data;n.set(t,new de(_e(e)?e.data:e,{...a.parameters,preMultiplyAlpha:!_e(e)&&o,encoding:_e(e)&&null!=e.encoding?e.encoding:void 0}))}}};t(l.textureColor,u!==Je.Opaque),t(l.textureNormal),t(l.textureOcclusion),t(l.textureEmissive),t(l.textureMetallicRoughness)}const o=l.color[0]**(1/Ee),h=l.color[1]**(1/Ee),p=l.color[2]**(1/Ee),f=l.emissiveFactor[0]**(1/Ee),v=l.emissiveFactor[1]**(1/Ee),g=l.emissiveFactor[2]**(1/Ee),x=null!=l.textureColor&&c?n.get(l.textureColor):null,b=Po({normalTexture:l.textureNormal,metallicRoughnessTexture:l.textureMetallicRoughness,metallicFactor:l.metallicFactor,roughnessFactor:l.roughnessFactor,emissiveTexture:l.textureEmissive,emissiveFactor:l.emissiveFactor,occlusionTexture:l.textureOcclusion}),T=null!=l.normalTextureTransform?.scale?l.normalTextureTransform?.scale:m;i.set(s,new Aa({...a,transparent:u===Je.Blend,customDepthTest:Xe.Lequal,textureAlphaMode:u,textureAlphaCutoff:l.alphaCutoff,diffuse:[o,h,p],ambient:[o,h,p],opacity:l.opacity,doubleSided:l.doubleSided,doubleSidedType:"winding-order",cullFace:l.doubleSided?Ze.None:Ze.Back,hasVertexColors:!!t.attributes.color,hasVertexTangents:!!t.attributes.tangent,normalType:d?lt.Attribute:lt.ScreenDerivative,castShadows:!0,receiveShadows:l.receiveShadows,receiveAmbientOcclusion:l.receiveAmbientOcclustion,textureId:null!=x?x.id:void 0,colorMixMode:l.colorMixMode,normalTextureId:null!=l.textureNormal&&c?n.get(l.textureNormal).id:void 0,textureAlphaPremultiplied:null!=x&&!!x.parameters.preMultiplyAlpha,occlusionTextureId:null!=l.textureOcclusion&&c?n.get(l.textureOcclusion).id:void 0,emissiveTextureId:null!=l.textureEmissive&&c?n.get(l.textureEmissive).id:void 0,metallicRoughnessTextureId:null!=l.textureMetallicRoughness&&c?n.get(l.textureMetallicRoughness).id:void 0,emissiveFactor:[f,v,g],mrrFactors:b?[...zo]:[l.metallicFactor,l.roughnessFactor,a.mrrFactors[2]],isSchematic:b,colorTextureTransformMatrix:Fa(l.colorTextureTransform),normalTextureTransformMatrix:Fa(l.normalTextureTransform),scale:[T[0],T[1]],occlusionTextureTransformMatrix:Fa(l.occlusionTextureTransform),emissiveTextureTransformMatrix:Fa(l.emissiveTextureTransform),metallicRoughnessTextureTransformMatrix:Fa(l.metallicRoughnessTextureTransform),...r}))}const h=i.get(s);if(o.stageResources.materials.push(h),c){const e=e=>{null!=e&&o.stageResources.textures.push(n.get(e))};e(l.textureColor),e(l.textureNormal),e(l.textureOcclusion),e(l.textureEmissive),e(l.textureMetallicRoughness)}return h}(s,e,v,t,a,c,d),{geometry:l,vertexCount:u}=function(e,t){const a=e.attributes.position.count,n=je(e.indices||a,e.primitiveType),s=me(3*a),{typedBuffer:l,typedBufferStride:c}=e.attributes.position;be(s,l,e.transform,3,c);const d=[[$e.POSITION,new Ye(s,n,3,!0)]];if(null!=e.attributes.normal){const t=me(3*a),{typedBuffer:i,typedBufferStride:s}=e.attributes.normal;r(Qa,e.transform),Te(t,i,Qa,3,s),o(Qa)&&ye(t,t),d.push([$e.NORMAL,new Ye(t,n,3,!0)])}if(null!=e.attributes.tangent){const t=me(4*a),{typedBuffer:r,typedBufferStride:s}=e.attributes.tangent;i(Qa,e.transform),Me(t,r,Qa,4,s),o(Qa)&&ye(t,t,4),d.push([$e.TANGENT,new Ye(t,n,4,!0)])}if(null!=e.attributes.texCoord0){const t=me(2*a),{typedBuffer:o,typedBufferStride:r}=e.attributes.texCoord0;Ae(t,o,2,r),d.push([$e.UV0,new Ye(t,n,2,!0)])}const u=e.attributes.color;if(null!=u){const t=new Uint8Array(4*a);4===u.elementCount?u instanceof he?Ce(t,u,255):u instanceof pe?Pe(t,u):u instanceof fe&&Ce(t,u,1/256):(t.fill(255),u instanceof ve?we(t,u.typedBuffer,255,4,u.typedBufferStride):e.attributes.color instanceof ge?Ie(t,u.typedBuffer,4,e.attributes.color.typedBufferStride):e.attributes.color instanceof xe&&we(t,u.typedBuffer,1/256,4,u.typedBufferStride)),d.push([$e.COLOR,new Ye(t,n,4,!0)])}return{geometry:new ue(t,d),vertexCount:a}}(e,null!=n?n:new Aa({})),g=l.boundingInfo;null!=g&&0===p&&(_(h,g.bbMin),_(h,g.bbMax)),null!=n&&(v.stageResources.geometries.push(l),v.numberOfVertices+=u)})),f||l.push(v)})),{engineResources:l,referenceBoundingBox:h}}const Qa=l(),er=Object.freeze(Object.defineProperty({__proto__:null,fetch:Xa,gltfToEngineResources:Ka,parseUrl:$a},Symbol.toStringTag,{value:"Module"}));export{qo as C,Bo as D,la as E,Wo as F,Ta as M,jo as N,Go as O,ha as R,aa as S,Io as a,_o as b,Fo as c,zo as d,Aa as e,Ma as f,Fa as g,Xa as h,ia as i,na as j,sa as k,Ao as l,So as m,Ha as n,ua as o,Vo as p,ma as q,er as r,Po as u};
