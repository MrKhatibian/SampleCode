/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import{_ as e}from"./tslib.es6.js";import t from"../core/Collection.js";import{r as i,d as s,c as o}from"./mathUtils.js";import{c as r,d as a}from"./maybe.js";import{watch as n,syncAndInitial as h}from"../core/reactiveUtils.js";import{property as c}from"../core/accessorSupport/decorators/property.js";import{h as l}from"../core/lang.js";import"./Logger.js";import{subclass as d}from"../core/accessorSupport/decorators/subclass.js";import{B as p,c as u,y as f,f as v,w as m,C as w,s as g}from"./mat4.js";import{c as x,I as M}from"./mat4f64.js";import{x as _,i as b,u as P,h as F}from"./vec3.js";import{c as S,z as V,f as z}from"./vec3f64.js";import{a as y,F as D,S as C}from"./Matrix4PassUniform.js";import{S as j,C as T,a as R}from"./VertexArrayObject2.js";import{B as A,E as U,H as O,S as B,g as H,b as N,I as W,j as k,P as q,R as I,x as E,u as L}from"./StencilUtils.js";import{C as Q,D as X,a as Y,I as Z}from"./IntegerPassUniform.js";import{c as G,b as $}from"./vec4f64.js";import J from"../views/3d/webgl/RenderCamera.js";import{a as K}from"./Util.js";import{i as ee}from"./enums.js";import{C as te}from"./CameraSpace.glsl.js";import{g as ie,N as se}from"./interfaces3.js";import{S as oe}from"./ScreenSpacePass.glsl.js";import{R as re,M as ae}from"./Matrix4sPassUniform.js";import{D as ne}from"./Material.js";import{m as he,a as ce}from"./renderState.js";import{p as le,S as de}from"./ShaderTechniqueConfiguration.js";let pe=class extends J{constructor(){super(...arguments),this.sectionAngles=G()}get sectionAnglesDeg(){return $(this.sectionAngles.map((e=>i(e))))}set sectionAnglesDeg(e){this.sectionAngles=$(e.map((e=>s(e))))}get projectionMatrix(){const e=x();return p(e,this.sectionMatrix,this._projectionMatrixInternal)}get sectionMatrix(){const e=this.sectionAngles[0],t=this.sectionAngles[1],i=this.sectionAngles[2],s=this.sectionAngles[3];K(e<=t),K(i<=s);const o=2*Math.tan(this.fovX/2),r=2*Math.tan(this.fovY/2),a=Math.tan(e),n=Math.tan(t),h=Math.tan(i),c=n-a,l=Math.tan(s)-h,d=o/c,v=r/l,m=-(a+c/2)/o*2,w=-(h+l/2)/r*2,g=x();u(g,[m,w,0]);const M=x();f(M,[d,v,1]);const _=x();return p(_,M,g)}get _sectionRatioX(){const e=Math.tan(this.sectionAngles[0]),t=Math.tan(this.sectionAngles[1]),i=2*Math.tan(this.fovX/2);return Math.min(1,(t-e)/i)}setViewport(e,t){const i=t*this._sectionRatioX;return this.viewport=[e[0],e[1],i,t],i}};e([c()],pe.prototype,"sectionAngles",void 0),e([c()],pe.prototype,"sectionAnglesDeg",null),e([c()],pe.prototype,"projectionMatrix",null),e([c()],pe.prototype,"sectionMatrix",null),e([c()],pe.prototype,"_sectionRatioX",null),pe=e([d("esri.views.3d.webgl-engine.lib.ViewshedFaceCamera")],pe);class ue{constructor(){this.textureSizeModHighQuality=1.3,this.textureSizeModLowQuality=.9,this.textureSizeMultiple=128,this.toleranceSides=5,this.toleranceBottomTop=10}textureSizeModifier(e){return e?this.textureSizeModHighQuality:this.textureSizeModLowQuality}textureResizeModulo(e){return Math.ceil(e/this.textureSizeMultiple)*this.textureSizeMultiple}}const fe=["front","left","right","back","top","bottom"];class ve{constructor(e){this._fbos=e,this._enabled=!1,this._faces={},this._textureWidth=0,this._textureHeight=0,this.settings=new ue,this._maxTextureWidth=Math.min(l("esri-mobile")?4096:16384,e.rctx.parameters.maxTextureSize)}get depthTexture(){return this._handle?.getTexture()}get enabled(){return this._enabled}set enabled(e){this._enabled=e,e||this.disposeOffscreenBuffers()}get isTextureZero(){return 0===this._textureWidth||0===this._textureHeight}get nearFar(){const e=this.faces;return 0===e.length?null:e[0].nearFar}get numActiveFaces(){const e=this._faces;let t=0;return Object.keys(e).forEach((i=>{e[i]&&(t+=1)})),t}get faces(){const e=this._faces,t=[];for(const i of fe){const s=e[i];s&&t.push(s)}return t}get atlasRegions(){return this.faces.map((e=>[e.x/this._textureWidth,(e.x+e.width)/this._textureWidth,e.y/this._textureHeight,(e.y+e.height)/this._textureHeight]))}get viewshedProjectionMatrices(){return this.faces.map((e=>e.projectionMatrix))}get viewshedViewMatrices(){return this.faces.map((e=>e.viewMatrix))}_setupFaceCamera(e,t,i,s){const{observerRenderSpace:r,tiltedUpVector:a,targetRenderSpace:n,farDistanceRenderSpace:h,horizontalFieldOfView:c,verticalFieldOfView:l}=t,d=S();_(d,n,r);const p=S(),u=S(),f=(e,t)=>{const i=S(),s=x();return v(s,e,t),F(i,d,s),b(i,r,i),i};let m,w=a;const g=Math.min(90,c),M=Math.min(90,Math.max(0,(c-90)/2));let V=-45,z=45,y=-45,D=45;if(!["top","bottom"].includes(e)){const e=e=>o(e,-45,45);y=e(-l/2)-this.settings.toleranceBottomTop,D=e(+l/2)+this.settings.toleranceBottomTop}switch(e){case"front":m=n,V=-g/2,z=g/2;break;case"left":m=f(Math.PI/2,a),V=45-M;break;case"right":m=f(-Math.PI/2,a),z=-45+M;break;case"top":m=b(p,r,a),w=P(u,d);break;case"bottom":m=_(p,r,a),w=d;break;case"back":m=f(Math.PI,a)}const C=new pe({center:m,eye:r,up:w,far:h});C.sectionAnglesDeg=[V-this.settings.toleranceSides,z+this.settings.toleranceSides,y,D],C.fovY=Math.PI/2;const j=C.setViewport(i,s);return this._faces[e]=C,j}_bindFBO(){const e=this._fbos.rctx;e.unbindTexture(this.depthTexture),e.bindFramebuffer(this._handle?.fbo)}_computeActiveFaces(e){const t=new Set,{horizontalFieldOfView:i,verticalFieldOfView:s}=e,o=-s/2,r=s/2;return 0===i||0===s||(o<=45&&r>=-45&&t.add("front"),i>90&&(t.add("left"),t.add("right")),i>270&&t.add("back"),r>45-this.settings.toleranceBottomTop&&t.add("top"),o<-45+this.settings.toleranceBottomTop&&t.add("bottom")),t}_computeBaseTextureSize(e,t,i,s){const o=Math.min(window.devicePixelRatio,t)/e.pixelRatio,r=this.settings.textureSizeModifier(i),a=A(Math.floor(Math.max(e.fullWidth,e.fullHeight)*o*r)),n=Math.floor(this._maxTextureWidth/s),h=Math.min(n,a);return U(h)}_ensureFBO(){const e=this._textureWidth,t=this._textureHeight;this._handle?.fbo?.width===e&&this._handle?.fbo?.height===t||(this._handle?.release(),this._handle=this._fbos.acquire(e,t,"viewshed shadow map",Q.RGBA4)),this._handle.acquireDepth(X.DEPTH16_BUFFER)}clearFBO(){const e=this._fbos.rctx;this._ensureFBO(),this._bindFBO(),e.setClearColor(1,1,1,1),e.clear(ee.COLOR_BUFFER_BIT|ee.DEPTH_BUFFER_BIT)}dispose(){this.enabled=!1,this.disposeOffscreenBuffers()}disposeOffscreenBuffers(){this._handle=r(this._handle)}start(e,t,i,s){if(this._faces={},!this.enabled)return!1;const o=this._computeActiveFaces(t),r=o.size;if(0===r)return!1;const a=this._computeBaseTextureSize(e,s,i,r);if(0===a)return!1;let n=0,h=0,c=0;return fe.filter((e=>o.has(e))).forEach((e=>{const i=function(e,t){if(t<4)return 0;const i="front"===e||"left"===e;return 4===t?i?0:1:i||"right"===e?0:1}(e,r);i>h&&(c=Math.max(c,n),n=0),h=i;const s=i*a;n+=this._setupFaceCamera(e,t,[n,s],a)})),c=Math.max(c,n),this._textureWidth=this.settings.textureResizeModulo(c),this._textureHeight=(r<4?1:2)*a,this.clearFBO(),!0}finish(){this._handle?.detachDepth()}get test(){return{faces:this._faces,faceTypes:fe}}}function me(e){const t=e.fragment;e.include(te),t.include(O),t.code.add(ie`vec3 normalFromDepth(sampler2D depthMap, vec3 pixelPos, vec2 fragCoord, vec2 uv) {
ivec2 iuv = ivec2(uv * vec2(textureSize(depthMap, 0)));
float leftPixelDepth = linearizeDepth(texelFetch(depthMap, iuv + ivec2(-1, 0), 0).r);
float rightPixelDepth = linearizeDepth(texelFetch(depthMap, iuv + ivec2(1, 0), 0).r);
float bottomPixelDepth = linearizeDepth(texelFetch(depthMap, iuv + ivec2(0, -1), 0).r);
float topPixelDepth = linearizeDepth(texelFetch(depthMap, iuv + ivec2(0, 1), 0).r);
bool pickLeft = abs(pixelPos.z - leftPixelDepth) < abs(pixelPos.z - rightPixelDepth);
bool pickBottom = abs(pixelPos.z - bottomPixelDepth) < abs(pixelPos.z - topPixelDepth);
vec3 fragCoordHorizontal = pickLeft
? vec3(fragCoord + vec2(-1.0, 0.0), leftPixelDepth)
: vec3(fragCoord + vec2(1.0, 0.0), rightPixelDepth);
vec3 fragCoordVertical = pickBottom
? vec3(fragCoord + vec2(0.0, -1.0), bottomPixelDepth)
: vec3(fragCoord + vec2(0.0, 1.0), topPixelDepth);
vec3 verticalPixelPos = reconstructPosition(fragCoordHorizontal.xy, fragCoordHorizontal.z);
vec3 horizontalPixelPos = reconstructPosition(fragCoordVertical.xy, fragCoordVertical.z);
vec3 normal = normalize(cross(verticalPixelPos - pixelPos, horizontalPixelPos - pixelPos));
return pickLeft == pickBottom ? normal : -normal;
}`)}class we extends se{constructor(){super(...arguments),this.localOrigin=V()}}function ge(e){e.include(te),e.fragment.uniforms.add(new y("inverseViewMatrix",((e,t)=>{const i=x();return m(i,t.camera.viewMatrix,e.localOrigin),w(i,i)}))),e.fragment.code.add(ie`vec4 reconstructLocalPosition(vec2 coord, float linearDepth) {
vec4 cameraSpace = vec4(reconstructPosition(coord, linearDepth), 1.0);
return inverseViewMatrix * cameraSpace;
}`)}class xe extends we{constructor(){super(...arguments),this.targetVector=[1,0,0],this.upVector=[0,0,1],this.fovs=[45,45],this.headingAndTilt=[0,0],this.shadowMap={depthTexture:null,nearFar:[1,100],numActiveFaces:1,atlasRegions:[[0,0,1,1]]},this.projectionMatrices=M.flat(),this.viewMatrices=M.flat()}}const Me=x(),_e=Object.freeze(Object.defineProperty({__proto__:null,ViewshedPassParameters:xe,build:function(e){const t=new B,i=t.fragment;t.include(oe),t.include(ge),t.include(Y),i.include(O),i.include(re),i.uniforms.add(new H("depthTexture",((e,t)=>t.depth?.attachment))),i.uniforms.add(new y("inverseProjectionMatrix",((e,t)=>t.camera.inverseProjectionMatrix)),new y("inverseViewNormalMatrix",((e,t)=>w(Me,t.camera.viewInverseTransposeMatrix)))),i.uniforms.add(new D("viewshedTargetVector",((e,t)=>e.targetVector)),new D("viewshedUpVector",((e,t)=>e.upVector)),new N("viewshedFOVs",((e,t)=>e.fovs)),new N("viewshedHeadingAndTilt",((e,t)=>e.headingAndTilt)),new N("viewshedNearFar",((e,t)=>e.shadowMap.nearFar??[1,100]))),i.uniforms.add(new H("viewshedShadowMap",(e=>e.shadowMap.depthTexture)),new ae("viewshedProjectionMatrices",((e,t)=>e.projectionMatrices),6),new ae("viewshedViewMatrices",((e,t)=>e.viewMatrices),6),new Z("viewshedNumFaces",((e,t)=>e.shadowMap.numActiveFaces)),new W("viewshedAtlasRegions",((e,t)=>e.shadowMap.atlasRegions.flat()),24)),i.constants.add("visibleColor","vec4",[0,1,0,.5]),i.constants.add("occludedColor","vec4",[1,0,0,.5]);const s=e.useNormalMap;return s?(i.uniforms.add(new H("normalMap",((e,t)=>e.normalTexture))),i.code.add(ie`vec3 normalFromTexture() {
vec4 norm4 = texture(normalMap, uv);
vec3 nNormal = vec3(-1.0) + 2.0 * norm4.xyz;
return normalize((inverseViewNormalMatrix * vec4(nNormal, 1.0)).xyz);
}`)):t.include(me),i.code.add(ie`
    // UV coordinates of point projected onto viewshed shadow map
    vec2 getViewshedUv(vec4 worldPosition, int face) {
      mat4 viewshedMatrix = viewshedProjectionMatrices[face];
      vec4 viewshedUv4 = viewshedMatrix * worldPosition;
      vec3 viewshedUv = viewshedUv4.xyz / viewshedUv4.w;
      return viewshedUv.xy;
    }

    float viewshedDepthToFloat(float depth) {
      return (depth - viewshedNearFar[0]) / (viewshedNearFar[1] - viewshedNearFar[0]);
    }

    // Orthographic depth to viewshed of given point and given cube map face in range [0, 1].
    float getOrthographicDepthToViewshed(vec4 worldPosition, int face) {
      mat4 viewshedViewMatrix = viewshedViewMatrices[face];
      vec4 viewshedUv4 = viewshedViewMatrix * worldPosition;
      vec3 viewshedUv = viewshedUv4.xyz / viewshedUv4.w;
      float depth = -viewshedUv.z;
      return viewshedDepthToFloat(depth);
    }

    // Read depth from shadow map given uv and cube map face
    float getDepthFromShadowMap(vec2 uv, int face) {
      int index = 4 * face;

      float umin = viewshedAtlasRegions[index];
      float umax = viewshedAtlasRegions[index + 1];
      float vmin = viewshedAtlasRegions[index + 2];
      float vmax = viewshedAtlasRegions[index + 3];

      vec4 atlasRegion = vec4(umin, vmin, umax, vmax);
      return rgba4ToFloat(textureAtlasLookup(viewshedShadowMap, uv, atlasRegion));
    }

    struct ViewshedPoint {
      int face;
      vec2 uv;
      bool isWithin;
      float orthographicDepth;
    };

    // Find cube map face the given position lies in and return relevant information about it
    bool getViewshedPoint(vec4 worldPosition, out ViewshedPoint point) {
      vec3 nUp = normalize(viewshedUpVector);

      // Try with all active cube map faces
      for(int i=0; i < viewshedNumFaces; i++) {

        // Check if when projected, point lies within shadow map texture
        vec2 viewshedUv = getViewshedUv(worldPosition, i);
        if (viewshedUv.x > 0.0 && viewshedUv.x < 1.0 && viewshedUv.y > 0.0 && viewshedUv.y < 1.0) {
          float orthoDepth = getOrthographicDepthToViewshed(worldPosition, i);
          if (orthoDepth >= 0.0) { // found a cube map face

            // Check whether point is really inside viewshed geometry, not just within the camera frustum

            // outside farDistance
            vec3 position = worldPosition.xyz;
            bool isWithin = length(position) <= viewshedNearFar[1];

            // horizontally outside fov
            float t = dot(nUp, position);
            bool isBottomHalf = t > 0.0;
            vec3 nProjVector = normalize(position - t * nUp);
            if (isWithin) {
              float angle = acos(dot(normalize(viewshedTargetVector), nProjVector));
              if (angle > viewshedFOVs[0] / 2.0) {
                isWithin = false;
              }
            }

            // vertically outside fov
            if (isWithin) {
              float angle = acos(dot(nProjVector, normalize(position)));
              if (!isBottomHalf) {
                angle = -angle;
              }
              float tilt = viewshedHeadingAndTilt[1];
              float limit = viewshedFOVs[1] / 2.0;
              if (angle > limit || angle < -limit) {
                isWithin = false;
              }
            }

            point = ViewshedPoint(i, viewshedUv, isWithin, orthoDepth);
            return true;
          }
        }
      }

      // no cube face matches
      return false;
    }

    float normalCosAngle(float linearDepth, vec3 localPosition) {
      ${s?ie`vec3 normal = normalFromTexture();`:ie`
        vec3 cameraSpacePosition = reconstructPosition(gl_FragCoord.xy, linearDepth);
        vec3 normal = normalFromDepth(depthTexture, cameraSpacePosition, gl_FragCoord.xy, uv);
        normal = (inverseViewNormalMatrix * vec4(normal, 1.0)).xyz;
        `};

      vec3 viewingDir = normalize(localPosition);
      return dot(normal, viewingDir);
    }

    void main() {
      float depth = depthFromTexture(depthTexture, uv);

      // Outside camera planes
      if (depth >= 1.0 || depth <= 0.0) {
        return;
      }

      float linearDepth = linearizeDepth(depth);

      // Relative to viewshed position
      vec4 localPosition = reconstructLocalPosition(gl_FragCoord.xy, linearDepth);

      ViewshedPoint point;
      bool foundFace = getViewshedPoint(localPosition, point);

      // Outside every viewshed
      if (!foundFace || !point.isWithin) {
        return;
      }

      float viewshedDepth = getDepthFromShadowMap(point.uv, point.face);
      float distance = point.orthographicDepth;

      bool visible = distance < viewshedDepth;
      fragColor = visible ? visibleColor : occludedColor;

      float cosAngle = normalCosAngle(linearDepth, localPosition.xyz);

      // Everything facing away, and close to parallel is considered occluded.
      // Theshold corresponds to around 0.6 degrees, tuned empirically.
      if (cosAngle > -0.01) {
        fragColor = occludedColor;
      }
    }`),t}},Symbol.toStringTag,{value:"Module"}));class be extends k{initializeProgram(e){return new q(e.rctx,be.shader.get().build(this.configuration),ne)}initializePipeline(){return he({colorWrite:ce,blending:E})}}be.shader=new I(_e,(()=>Promise.resolve().then((()=>_e))));class Pe extends de{constructor(){super(...arguments),this.useNormalMap=!0}}e([le()],Pe.prototype,"useNormalMap",void 0);let Fe=class extends j{get viewshedShadowMap(){return this._viewshedShadowMap}get enabled(){return this._viewsheds.length>0}constructor(e,i){super(e),this._pluginContext=null,this.renderHighQuality=!1,this._parameters=new xe,this._configuration=new Pe,this._viewsheds=new t,this.produces=new Map([[L.VIEWSHED,()=>!0]]),this._renderShadowMap=i}initialize(){this.addHandles(n((()=>this.view.qualitySettings.maximumPixelRatio),(e=>this._maximumPixelRatio=e),h))}destroy(){this.uninitializeRenderContext()}consumes(){return this.enabled?T:R}initializeRenderContext(e){this._pluginContext=e,this._viewshedShadowMap=new ve(this.fboCache),this._viewshedShadowMap.enabled=!0}renderNode(e,t,i){const{bindParameters:s,rctx:o}=e;if(!this.enabled||!s.depth||null==i)return;const r=this._setupNormals(i);if(null!=this._technique&&this._configuration.useNormalMap===r||(this._configuration.useNormalMap=r,this._technique=this._pluginContext?.techniques.acquire(be,this._configuration)),this._technique?.compiled)for(const t of this._viewsheds){const i=e.rctx.getBoundFramebufferObject(),r=this._renderViewshedShadowCubeMap(s,t),a=this._viewshedShadowMap;r&&null!=a.depthTexture&&!a.isTextureZero&&(this._setPassParameters(t),e.rctx.bindFramebuffer(i),o.bindTechnique(this._technique,s,this._parameters),o.screen.draw())}else this._pluginContext?.requestRender()}uninitializeRenderContext(){this._pluginContext=null,this._viewshedShadowMap.dispose(),this._technique=a(this._technique)}updateViewsheds(e){const i=e.removes;null!=i&&(t.isCollection(i)?this._viewsheds.removeMany(i):this._viewsheds.remove(i));const s=e.adds;if(null!=s)if(t.isCollection(s)){const e=s.filter((e=>!this._viewsheds.includes(e)));this._viewsheds.addMany(e)}else this._viewsheds.includes(s)||this._viewsheds.add(s)}_renderViewshedShadowCubeMap(e,t){const i=this._viewshedShadowMap;if(!i.enabled)return!1;const s=i.start(e.camera,t,this.renderHighQuality,this._maximumPixelRatio);if(s)for(const t of i.faces)this._renderShadowMap(e,t,C.ViewshedShadow);return i.finish(),s}_setPassParameters(e){const t=this._parameters,i=this._viewshedShadowMap,o=e.observerRenderSpace;t.localOrigin=o,t.fovs=[s(e.horizontalFieldOfView),s(e.verticalFieldOfView)],t.headingAndTilt=[s(e.heading),s(e.tiltParallelToSurface)],t.upVector=e.tiltedUpVector;const r=function(e,t){const i=S();return _(i,e,t)}(e.targetRenderSpace,o);t.targetVector=r,t.shadowMap=i;const a=[],n=[];for(let e=0;e<i.numActiveFaces;e++)m(Ve,i.viewshedViewMatrices[e],o),a.push(...Ve.flat()),Se(i.viewshedProjectionMatrices[e],Ve,ze),n.push(...ze.flat());t.viewMatrices=a,t.projectionMatrices=n}_setupNormals(e){const t=e.get("normals"),i=t?.getTexture();return this._parameters.normalTexture=i,null!=i}get test(){return{viewsheds:this._viewsheds}}};function Se(e,t,i){const s=z(.5,.5,.5);return u(i,s),g(i,i,s),p(i,i,e),p(i,i,t),i}e([c()],Fe.prototype,"_pluginContext",void 0),e([c()],Fe.prototype,"fboCache",void 0),e([c()],Fe.prototype,"view",void 0),e([c()],Fe.prototype,"viewshedShadowMap",null),Fe=e([d("esri.views.3d.webgl-engine.lib.Viewshed")],Fe);const Ve=x(),ze=x();export{me as N,Fe as V};
