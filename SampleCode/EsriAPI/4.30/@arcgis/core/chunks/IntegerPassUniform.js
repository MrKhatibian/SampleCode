/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import{n as e}from"./compilerUtils.js";import{c as t}from"./mat3f64.js";import{c as o}from"./vec4f64.js";import{a,N as r,T as n}from"./NormalAttribute.glsl.js";import{a as i,b as s,V as c}from"./VertexPosition.glsl.js";import{g as l}from"./interfaces3.js";import{M as d}from"./Matrix3DrawUniform.js";import{M as u,F as h,b as m,U as f}from"./Matrix4PassUniform.js";import{V as g}from"./VertexAttribute.js";import{g as v,U as p}from"./StencilUtils.js";import{B as x}from"./BindType.js";import"../core/Error.js";import"./Logger.js";import"./basicInterfaces.js";import{c as b,l as y}from"./mathUtils.js";import{s as N,p as S,u as R,b as T,i as w,a as L}from"./vec3.js";import{c as F,f as _}from"./vec3f64.js";var H,C,M,V;function G(t,o){switch(o.normalType){case a.Attribute:case a.Compressed:t.include(r,o),t.varyings.add("vNormalWorld","vec3"),t.varyings.add("vNormalView","vec3"),t.vertex.uniforms.add(new d("transformNormalGlobalFromModel",(e=>e.transformNormalGlobalFromModel)),new u("transformNormalViewFromGlobal",(e=>e.transformNormalViewFromGlobal))),t.vertex.code.add(l`void forwardNormal() {
vNormalWorld = transformNormalGlobalFromModel * normalModel();
vNormalView = transformNormalViewFromGlobal * vNormalWorld;
}`);break;case a.Ground:t.include(c,o),t.varyings.add("vNormalWorld","vec3"),t.vertex.code.add(l`
        void forwardNormal() {
          vNormalWorld = ${o.spherical?l`normalize(vPositionWorldCameraRelative);`:l`vec3(0.0, 0.0, 1.0);`}
        }
        `);break;case a.ScreenDerivative:t.vertex.code.add(l`void forwardNormal() {}`);break;default:e(o.normalType);case a.COUNT:}}!function(e){e[e.RED=0]="RED",e[e.RG=1]="RG",e[e.RGBA4=2]="RGBA4",e[e.RGBA=3]="RGBA",e[e.RGBA_MIPMAP=4]="RGBA_MIPMAP",e[e.R16F=5]="R16F",e[e.RGBA16F=6]="RGBA16F"}(H||(H={})),function(e){e[e.DEPTH_STENCIL_TEXTURE=0]="DEPTH_STENCIL_TEXTURE",e[e.DEPTH16_BUFFER=1]="DEPTH16_BUFFER"}(C||(C={}));class U extends s{constructor(){super(...arguments),this.transformNormalViewFromGlobal=t()}}class A extends i{constructor(){super(...arguments),this.transformNormalGlobalFromModel=t(),this.toMapSpace=o()}}function D(e){e.uniforms.add(new h("mainLightDirection",((e,t)=>t.lighting.mainLight.direction)))}function E(e){e.uniforms.add(new h("mainLightIntensity",((e,t)=>t.lighting.mainLight.intensity)))}function I(e){D(e.fragment),E(e.fragment),e.fragment.code.add(l`vec3 evaluateMainLighting(vec3 normal_global, float shadowing) {
float dotVal = clamp(dot(normal_global, mainLightDirection), 0.0, 1.0);
return mainLightIntensity * ((1.0 - shadowing) * dotVal);
}`)}function P(t,o){switch(o.textureCoordinateType){case M.Default:return t.attributes.add(g.UV0,"vec2"),t.varyings.add("vuv0","vec2"),void t.vertex.code.add(l`void forwardTextureCoordinates() {
vuv0 = uv0;
}`);case M.Compressed:return t.attributes.add(g.UV0,"vec2"),t.varyings.add("vuv0","vec2"),void t.vertex.code.add(l`vec2 getUV0() {
return uv0 / 16384.0;
}
void forwardTextureCoordinates() {
vuv0 = getUV0();
}`);case M.Atlas:return t.attributes.add(g.UV0,"vec2"),t.varyings.add("vuv0","vec2"),t.attributes.add(g.UVREGION,"vec4"),t.varyings.add("vuvRegion","vec4"),void t.vertex.code.add(l`void forwardTextureCoordinates() {
vuv0 = uv0;
vuvRegion = uvRegion;
}`);default:e(o.textureCoordinateType);case M.None:return void t.vertex.code.add(l`void forwardTextureCoordinates() {}`);case M.COUNT:return}}function O(e){e.fragment.code.add(l`vec4 textureAtlasLookup(sampler2D tex, vec2 textureCoordinates, vec4 atlasRegion) {
vec2 atlasScale = atlasRegion.zw - atlasRegion.xy;
vec2 uvAtlas = fract(textureCoordinates) * atlasScale + atlasRegion.xy;
float maxdUV = 0.125;
vec2 dUVdx = clamp(dFdx(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
vec2 dUVdy = clamp(dFdy(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
return textureGrad(tex, uvAtlas, dUVdx, dUVdy);
}`)}function k(t,o){switch(t.include(P,o),o.textureCoordinateType){case M.Default:case M.Compressed:return void t.fragment.code.add(l`vec4 textureLookup(sampler2D tex, vec2 uv) {
return texture(tex, uv);
}`);case M.Atlas:return t.include(O),void t.fragment.code.add(l`vec4 textureLookup(sampler2D tex, vec2 uv) {
return textureAtlasLookup(tex, uv, vuvRegion);
}`);default:e(o.textureCoordinateType);case M.None:case M.COUNT:return}}function B(e,t){const o=e.fragment,a=t.hasMetallicRoughnessTexture||t.hasEmissionTexture||t.hasOcclusionTexture;if(t.pbrMode===V.Normal&&a&&e.include(k,t),t.pbrMode!==V.Schematic)if(t.pbrMode!==V.Disabled){if(t.pbrMode===V.Normal){o.code.add(l`vec3 mrr;
vec3 emission;
float occlusion;`);const e=t.pbrTextureBindType;t.hasMetallicRoughnessTexture&&(o.uniforms.add(e===x.Pass?new v("texMetallicRoughness",(e=>e.textureMetallicRoughness)):new n("texMetallicRoughness",(e=>e.textureMetallicRoughness))),o.code.add(l`void applyMetallnessAndRoughness(vec2 uv) {
vec3 metallicRoughness = textureLookup(texMetallicRoughness, uv).rgb;
mrr[0] *= metallicRoughness.b;
mrr[1] *= metallicRoughness.g;
}`)),t.hasEmissionTexture&&(o.uniforms.add(e===x.Pass?new v("texEmission",(e=>e.textureEmissive)):new n("texEmission",(e=>e.textureEmissive))),o.code.add(l`void applyEmission(vec2 uv) {
emission *= textureLookup(texEmission, uv).rgb;
}`)),t.hasOcclusionTexture?(o.uniforms.add(e===x.Pass?new v("texOcclusion",(e=>e.textureOcclusion)):new n("texOcclusion",(e=>e.textureOcclusion))),o.code.add(l`void applyOcclusion(vec2 uv) {
occlusion *= textureLookup(texOcclusion, uv).r;
}
float getBakedOcclusion() {
return occlusion;
}`)):o.code.add(l`float getBakedOcclusion() { return 1.0; }`),e===x.Pass?o.uniforms.add(new h("emissionFactor",(e=>e.emissiveFactor)),new h("mrrFactors",(e=>e.mrrFactors))):o.uniforms.add(new m("emissionFactor",(e=>e.emissiveFactor)),new m("mrrFactors",(e=>e.mrrFactors))),o.code.add(l`
    void applyPBRFactors() {
      mrr = mrrFactors;
      emission = emissionFactor;
      occlusion = 1.0;

      ${t.hasMetallicRoughnessTexture?l`applyMetallnessAndRoughness(${t.hasMetallicRoughnessTextureTransform?l`metallicRoughnessUV`:"vuv0"});`:""}

      ${t.hasEmissionTexture?l`applyEmission(${t.hasEmissiveTextureTransform?l`emissiveUV`:"vuv0"});`:""}

      ${t.hasOcclusionTexture?l`applyOcclusion(${t.hasOcclusionTextureTransform?l`occlusionUV`:"vuv0"});`:""}
    }
  `)}}else o.code.add(l`float getBakedOcclusion() { return 1.0; }`);else o.code.add(l`vec3 mrr = vec3(0.0, 0.6, 0.2);
vec3 emission = vec3(0.0);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`)}function W(e){const t=e.fragment.code;t.add(l`vec3 evaluateDiffuseIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float NdotNG)
{
return ((1.0 - NdotNG) * ambientGround + (1.0 + NdotNG) * ambientSky) * 0.5;
}`),t.add(l`float integratedRadiance(float cosTheta2, float roughness)
{
return (cosTheta2 - 1.0) / (cosTheta2 * (1.0 - roughness * roughness) - 1.0);
}`),t.add(l`vec3 evaluateSpecularIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float RdotNG, float roughness)
{
float cosTheta2 = 1.0 - RdotNG * RdotNG;
float intRadTheta = integratedRadiance(cosTheta2, roughness);
float ground = RdotNG < 0.0 ? 1.0 - intRadTheta : 1.0 + intRadTheta;
float sky = 2.0 - ground;
return (ground * ambientGround + sky * ambientSky) * 0.5;
}`)}function j(e,t){const o=e.fragment.code;e.include(p),t.pbrMode!==V.Normal&&t.pbrMode!==V.Schematic&&t.pbrMode!==V.Simplified&&t.pbrMode!==V.TerrainWithWater||(o.add(l`float normalDistribution(float NdotH, float roughness)
{
float a = NdotH * roughness;
float b = roughness / (1.0 - NdotH * NdotH + a * a);
return b * b * INV_PI;
}`),o.add(l`const vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022);
const vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040);
const vec2 c2 = vec2(-1.04, 1.04);
vec2 prefilteredDFGAnalytical(float roughness, float NdotV) {
vec4 r = roughness * c0 + c1;
float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * r.x + r.y;
return c2 * a004 + r.zw;
}`)),t.pbrMode!==V.Normal&&t.pbrMode!==V.Schematic||(e.include(W),o.add(l`struct PBRShadingInfo
{
float NdotL;
float NdotV;
float NdotH;
float VdotH;
float LdotH;
float NdotNG;
float RdotNG;
float NdotAmbDir;
float NdotH_Horizon;
vec3 skyRadianceToSurface;
vec3 groundRadianceToSurface;
vec3 skyIrradianceToSurface;
vec3 groundIrradianceToSurface;
float averageAmbientRadiance;
float ssao;
vec3 albedoLinear;
vec3 f0;
vec3 f90;
vec3 diffuseColor;
float metalness;
float roughness;
};`),o.add(l`vec3 evaluateEnvironmentIllumination(PBRShadingInfo inputs) {
vec3 indirectDiffuse = evaluateDiffuseIlluminationHemisphere(inputs.groundIrradianceToSurface, inputs.skyIrradianceToSurface, inputs.NdotNG);
vec3 indirectSpecular = evaluateSpecularIlluminationHemisphere(inputs.groundRadianceToSurface, inputs.skyRadianceToSurface, inputs.RdotNG, inputs.roughness);
vec3 diffuseComponent = inputs.diffuseColor * indirectDiffuse * INV_PI;
vec2 dfg = prefilteredDFGAnalytical(inputs.roughness, inputs.NdotV);
vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;
vec3 specularComponent = specularColor * indirectSpecular;
return (diffuseComponent + specularComponent);
}`),o.add(l`float gamutMapChanel(float x, vec2 p){
return (x < p.x) ? mix(0.0, p.y, x/p.x) : mix(p.y, 1.0, (x - p.x) / (1.0 - p.x) );
}`),o.add(l`vec3 blackLevelSoftCompression(vec3 inColor, PBRShadingInfo inputs){
vec3 outColor;
vec2 p = vec2(0.02 * (inputs.averageAmbientRadiance), 0.0075 * (inputs.averageAmbientRadiance));
outColor.x = gamutMapChanel(inColor.x, p) ;
outColor.y = gamutMapChanel(inColor.y, p) ;
outColor.z = gamutMapChanel(inColor.z, p) ;
return outColor;
}`))}function z(e,t){const o=e.fragment.code;e.include(p),o.add(l`
  struct PBRShadingWater
  {
      float NdotL;   // cos angle between normal and light direction
      float NdotV;   // cos angle between normal and view direction
      float NdotH;   // cos angle between normal and half vector
      float VdotH;   // cos angle between view direction and half vector
      float LdotH;   // cos angle between light direction and half vector
      float VdotN;   // cos angle between view direction and normal vector
  };

  float dtrExponent = ${t.useCustomDTRExponentForWater?"2.2":"2.0"};
  `),o.add(l`vec3 fresnelReflection(float angle, vec3 f0, float f90) {
return f0 + (f90 - f0) * pow(1.0 - angle, 5.0);
}`),o.add(l`float normalDistributionWater(float NdotH, float roughness)
{
float r2 = roughness * roughness;
float NdotH2 = NdotH * NdotH;
float denom = pow((NdotH2 * (r2 - 1.0) + 1.0), dtrExponent) * PI;
return r2 / denom;
}`),o.add(l`float geometricOcclusionKelemen(float LoH)
{
return 0.25 / (LoH * LoH);
}`),o.add(l`vec3 brdfSpecularWater(in PBRShadingWater props, float roughness, vec3 F0, float F0Max)
{
vec3  F = fresnelReflection(props.VdotH, F0, F0Max);
float dSun = normalDistributionWater(props.NdotH, roughness);
float V = geometricOcclusionKelemen(props.LdotH);
float diffusionSunHaze = mix(roughness + 0.045, roughness + 0.385, 1.0 - props.VdotH);
float strengthSunHaze  = 1.2;
float dSunHaze = normalDistributionWater(props.NdotH, diffusionSunHaze)*strengthSunHaze;
return ((dSun + dSunHaze) * V) * F;
}
vec3 tonemapACES(const vec3 x) {
return (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
}`)}!function(e){e[e.None=0]="None",e[e.Default=1]="Default",e[e.Atlas=2]="Atlas",e[e.Compressed=3]="Compressed",e[e.COUNT=4]="COUNT"}(M||(M={})),function(e){e[e.Disabled=0]="Disabled",e[e.Normal=1]="Normal",e[e.Schematic=2]="Schematic",e[e.Water=3]="Water",e[e.WaterOnIntegratedMesh=4]="WaterOnIntegratedMesh",e[e.Simplified=5]="Simplified",e[e.TerrainWithWater=6]="TerrainWithWater",e[e.COUNT=7]="COUNT"}(V||(V={}));const $=3e5,K=5e5;class X{constructor(e=F()){this.intensity=e}}class q{constructor(e=F(),t=_(.57735,.57735,.57735)){this.intensity=e,this.direction=t}}class J{constructor(e=F(),t=_(.57735,.57735,.57735),o=!0,a=1,r=1){this.intensity=e,this.direction=t,this.castShadows=o,this.specularStrength=a,this.environmentStrength=r}}class Q{constructor(){this.r=[0],this.g=[0],this.b=[0]}}function Y(e,t,o){(o=o||e).length=e.length;for(let a=0;a<e.length;a++)o[a]=e[a]*t[a];return o}function Z(e,t,o){(o=o||e).length=e.length;for(let a=0;a<e.length;a++)o[a]=e[a]*t;return o}function ee(e,t,o){(o=o||e).length=e.length;for(let a=0;a<e.length;a++)o[a]=e[a]+t[a];return o}function te(e){return(e+1)*(e+1)}function oe(e,t,o){const a=e[0],r=e[1],n=e[2],i=o||[];return i.length=te(t),t>=0&&(i[0]=.28209479177),t>=1&&(i[1]=.4886025119*a,i[2]=.4886025119*n,i[3]=.4886025119*r),t>=2&&(i[4]=1.09254843059*a*r,i[5]=1.09254843059*r*n,i[6]=.31539156525*(3*n*n-1),i[7]=1.09254843059*a*n,i[8]=.54627421529*(a*a-r*r)),i}const ae=[],re=[],ne=[],ie=[0],se=[0],ce=F(),le=[3.141593,2.094395,2.094395,2.094395,.785398,.785398,.785398,.785398,.785398];class de{constructor(){this.color=F(),this.intensity=1}}class ue{constructor(){this.direction=F(),this.ambient=new de,this.diffuse=new de}}const he=.4;class me{constructor(){this._shOrder=2,this._legacy=new ue,this.globalFactor=.5,this.noonFactor=.5,this._sphericalHarmonics=new Q,this._mainLight=new J(F(),_(1,0,0),!1)}get legacy(){return this._legacy}get sh(){return this._sphericalHarmonics}get mainLight(){return this._mainLight}set(e){(function(e,t,o,a){!function(e,t){const o=te(e),a=t||{r:[],g:[],b:[]};a.r.length=a.g.length=a.b.length=o;for(let e=0;e<o;e++)a.r[e]=a.g[e]=a.b[e]=0}(t,a),N(o.intensity,0,0,0);let r=!1;const n=ae,i=re,s=ne;n.length=0,i.length=0,s.length=0;for(const t of e)t instanceof J&&!r?(S(o.direction,t.direction),S(o.intensity,t.intensity),o.specularStrength=t.specularStrength,o.environmentStrength=t.environmentStrength,o.castShadows=t.castShadows,r=!0):t instanceof J||t instanceof q?n.push(t):t instanceof X?i.push(t):t instanceof Q&&s.push(t);(function(e,t){const o=(a=t.r.length,b(Math.floor(Math.sqrt(a)-1),0,2));var a;for(const a of e)R(ce,a.direction),oe(ce,o,ie),Y(ie,le),Z(ie,a.intensity[0],se),ee(t.r,se),Z(ie,a.intensity[1],se),ee(t.g,se),Z(ie,a.intensity[2],se),ee(t.b,se)})(n,a),function(e,t){oe(ce,0,ie);for(const o of e)t.r[0]+=ie[0]*le[0]*o.intensity[0]*4*Math.PI,t.g[0]+=ie[0]*le[0]*o.intensity[1]*4*Math.PI,t.b[0]+=ie[0]*le[0]*o.intensity[2]*4*Math.PI}(i,a);for(const e of s)ee(a.r,e.r),ee(a.g,e.g),ee(a.b,e.b)})(e,this._shOrder,this._mainLight,this._sphericalHarmonics),S(this._legacy.direction,this._mainLight.direction);const t=1/Math.PI;this._legacy.ambient.color[0]=.282095*this._sphericalHarmonics.r[0]*t,this._legacy.ambient.color[1]=.282095*this._sphericalHarmonics.g[0]*t,this._legacy.ambient.color[2]=.282095*this._sphericalHarmonics.b[0]*t,T(this._legacy.diffuse.color,this._mainLight.intensity,t),S(fe,this._legacy.diffuse.color),T(fe,fe,.4*this.globalFactor),w(this._legacy.ambient.color,this._legacy.ambient.color,fe)}copyFrom(e){this._sphericalHarmonics.r=Array.from(e.sh.r),this._sphericalHarmonics.g=Array.from(e.sh.g),this._sphericalHarmonics.b=Array.from(e.sh.b),S(this._mainLight.direction,e.mainLight.direction),S(this._mainLight.intensity,e.mainLight.intensity),this._mainLight.castShadows=e.mainLight.castShadows,this._mainLight.specularStrength=e.mainLight.specularStrength,this._mainLight.environmentStrength=e.mainLight.environmentStrength,this.globalFactor=e.globalFactor,this.noonFactor=e.noonFactor}lerpLighting(e,t,o){if(L(this._mainLight.intensity,e.mainLight.intensity,t.mainLight.intensity,o),this._mainLight.environmentStrength=y(e.mainLight.environmentStrength,t.mainLight.environmentStrength,o),this._mainLight.specularStrength=y(e.mainLight.specularStrength,t.mainLight.specularStrength,o),S(this._mainLight.direction,t.mainLight.direction),this._mainLight.castShadows=t.mainLight.castShadows,this.globalFactor=y(e.globalFactor,t.globalFactor,o),this.noonFactor=y(e.noonFactor,t.noonFactor,o),e.sh.r.length===t.sh.r.length)for(let a=0;a<t.sh.r.length;a++)this._sphericalHarmonics.r[a]=y(e.sh.r[a],t.sh.r[a],o),this._sphericalHarmonics.g[a]=y(e.sh.g[a],t.sh.g[a],o),this._sphericalHarmonics.b[a]=y(e.sh.b[a],t.sh.b[a],o);else for(let e=0;e<t.sh.r.length;e++)this._sphericalHarmonics.r[e]=t.sh.r[e],this._sphericalHarmonics.g[e]=t.sh.g[e],this._sphericalHarmonics.b[e]=t.sh.b[e]}}const fe=F();class ge extends f{constructor(e,t){super(e,"int",x.Pass,((o,a,r)=>o.setUniform1i(e,t(a,r))))}}export{X as A,H as C,C as D,q as F,ge as I,I as M,V as P,me as S,M as T,G as V,O as a,P as b,k as c,K as d,$ as e,he as f,j as g,D as h,E as i,B as j,A as k,U as l,z as m,J as n};
