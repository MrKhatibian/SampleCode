/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import{h as e}from"../core/lang.js";import{c as t}from"./mathUtils.js";import{f as o}from"./mat3.js";import{c as i}from"./mat3f64.js";import{i as a}from"./mat4.js";import{c as r}from"./mat4f64.js";import{c as s,f as n}from"./vec2f64.js";import{s as l,h as c,n as d,c as p,b as f,p as u,l as v,j as h,i as g,r as m,d as x}from"./vec3.js";import{c as S,f as b}from"./vec3f64.js";import{Z as O,b as P,c as C,f as y}from"./vec4f64.js";import{c as w}from"./aaBoundingRect.js";import{o as A}from"./BufferView.js";import{d as z,c as T,F as j,z as E,J as D,m as R,g as I,S as V,e as F,C as _,V as U,v as N,b as L,w as M,i as B,h as H,R as $,j as G,P as q,o as W,p as Y,D as k,u as X,K as Z}from"./StencilUtils.js";import{d as J}from"./debugFlags2.js";import{n as K}from"./InterleavedLayout.js";import{c as Q,R as ee,S as te,h as oe}from"./Matrix4PassUniform.js";import{S as ie,a as ae,b as re,c as se}from"./VerticalOffset.glsl.js";import{g as ne}from"./interfaces3.js";import{V as le}from"./VertexAttribute.js";import{G as ce,a as de}from"./GLTextureMaterial.js";import{D as pe,M as fe,b as ue,c as ve,p as he,v as ge,R as me}from"./Material.js";import{a as xe}from"./Util.js";import{c as Se,d as be,e as Oe,f as Pe,g as Ce,h as ye}from"./RayIntersections.js";import{g as we,m as Ae}from"./vec2.js";import{B as ze}from"./ScreenSpacePass.glsl.js";import{H as Te}from"./VertexArrayObject2.js";import{o as je,u as Ee}from"./OutputHighlight.glsl.js";import{V as De}from"./ViewingMode.js";import{g as Re,j as Ie,P as Ve}from"./enums.js";import{s as Fe,d as _e,m as Ue,a as Ne}from"./renderState.js";import{_ as Le}from"./tslib.es6.js";import{p as Me}from"./ShaderTechniqueConfiguration.js";function Be(e,t){e.include(ie),e.attributes.add(le.POSITION,"vec3"),e.attributes.add(le.NORMAL,"vec3"),e.attributes.add(le.CENTEROFFSETANDDISTANCE,"vec4");const o=e.vertex;z(o,t),T(o,t),o.uniforms.add(new j("viewport",((e,t)=>t.camera.fullViewport)),new Q("polygonOffset",(e=>e.shaderPolygonOffset)),new Q("cameraGroundRelative",((e,t)=>t.camera.aboveGround?1:-1))),t.hasVerticalOffset&&ae(o),o.constants.add("smallOffsetAngle","float",.984807753012208),o.code.add(ne`struct ProjectHUDAux {
vec3 posModel;
vec3 posView;
vec3 vnormal;
float distanceToCamera;
float absCosAngle;
};`),o.code.add(ne`
    float applyHUDViewDependentPolygonOffset(float pointGroundDistance, float absCosAngle, inout vec3 posView) {
      float pointGroundSign = ${t.multipassEnabled?ne.float(0):ne`sign(pointGroundDistance)`};
      if (pointGroundSign == 0.0) {
        pointGroundSign = cameraGroundRelative;
      }

      // cameraGroundRelative is -1 if camera is below ground, 1 if above ground
      // groundRelative is 1 if both camera and symbol are on the same side of the ground, -1 otherwise
      float groundRelative = cameraGroundRelative * pointGroundSign;

      // view angle dependent part of polygon offset emulation: we take the absolute value because the sign that is
      // dropped is instead introduced using the ground-relative position of the symbol and the camera
      if (polygonOffset > .0) {
        float cosAlpha = clamp(absCosAngle, 0.01, 1.0);
        float tanAlpha = sqrt(1.0 - cosAlpha * cosAlpha) / cosAlpha;
        float factor = (1.0 - tanAlpha / viewport[2]);

        // same side of the terrain
        if (groundRelative > 0.0) {
          posView *= factor;
        }
        // opposite sides of the terrain
        else {
          posView /= factor;
        }
      }

      return groundRelative;
    }
  `),t.draped&&!t.hasVerticalOffset||E(o),t.draped||(o.uniforms.add(new Q("perDistancePixelRatio",((e,t)=>Math.tan(t.camera.fovY/2)/(t.camera.fullViewport[2]/2)))),o.code.add(ne`
    void applyHUDVerticalGroundOffset(vec3 normalModel, inout vec3 posModel, inout vec3 posView) {
      float distanceToCamera = length(posView);

      // Compute offset in world units for a half pixel shift
      float pixelOffset = distanceToCamera * perDistancePixelRatio * ${ne.float(.5)};

      // Apply offset along normal in the direction away from the ground surface
      vec3 modelOffset = normalModel * cameraGroundRelative * pixelOffset;

      // Apply the same offset also on the view space position
      vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;

      posModel += modelOffset;
      posView += viewOffset;
    }
  `)),t.screenCenterOffsetUnitsEnabled&&D(o),t.hasScreenSizePerspective&&re(o),o.code.add(ne`
    vec4 projectPositionHUD(out ProjectHUDAux aux) {
      vec3 centerOffset = centerOffsetAndDistance.xyz;
      float pointGroundDistance = centerOffsetAndDistance.w;

      aux.posModel = position;
      aux.posView = (view * vec4(aux.posModel, 1.0)).xyz;
      aux.vnormal = normal;
      ${t.draped?"":"applyHUDVerticalGroundOffset(aux.vnormal, aux.posModel, aux.posView);"}

      // Screen sized offset in world space, used for example for line callouts
      // Note: keep this implementation in sync with the CPU implementation, see
      //   - MaterialUtil.verticalOffsetAtDistance
      //   - HUDMaterial.applyVerticalOffsetTransformation

      aux.distanceToCamera = length(aux.posView);

      vec3 viewDirObjSpace = normalize(cameraPosition - aux.posModel);
      float cosAngle = dot(aux.vnormal, viewDirObjSpace);

      aux.absCosAngle = abs(cosAngle);

      ${t.hasScreenSizePerspective&&(t.hasVerticalOffset||t.screenCenterOffsetUnitsEnabled)?"vec3 perspectiveFactor = screenSizePerspectiveScaleFactor(aux.absCosAngle, aux.distanceToCamera, screenSizePerspectiveAlignment);":""}

      ${t.hasVerticalOffset?t.hasScreenSizePerspective?"float verticalOffsetScreenHeight = applyScreenSizePerspectiveScaleFactorFloat(verticalOffset.x, perspectiveFactor);":"float verticalOffsetScreenHeight = verticalOffset.x;":""}

      ${t.hasVerticalOffset?ne`
            float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * aux.distanceToCamera, verticalOffset.z, verticalOffset.w);
            vec3 modelOffset = aux.vnormal * worldOffset;
            aux.posModel += modelOffset;
            vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;
            aux.posView += viewOffset;
            // Since we elevate the object, we need to take that into account
            // in the distance to ground
            pointGroundDistance += worldOffset;`:""}

      float groundRelative = applyHUDViewDependentPolygonOffset(pointGroundDistance, aux.absCosAngle, aux.posView);

      ${t.screenCenterOffsetUnitsEnabled?"":ne`
            // Apply x/y in view space, but z in screen space (i.e. along posView direction)
            aux.posView += vec3(centerOffset.x, centerOffset.y, 0.0);

            // Same material all have same z != 0.0 condition so should not lead to
            // branch fragmentation and will save a normalization if it's not needed
            if (centerOffset.z != 0.0) {
              aux.posView -= normalize(aux.posView) * centerOffset.z;
            }
          `}

      vec4 posProj = proj * vec4(aux.posView, 1.0);

      ${t.screenCenterOffsetUnitsEnabled?t.hasScreenSizePerspective?"float centerOffsetY = applyScreenSizePerspectiveScaleFactorFloat(centerOffset.y, perspectiveFactor);":"float centerOffsetY = centerOffset.y;":""}

      ${t.screenCenterOffsetUnitsEnabled?"posProj.xy += vec2(centerOffset.x, centerOffsetY) * pixelRatio * 2.0 / viewport.zw * posProj.w;":""}

      // constant part of polygon offset emulation
      posProj.z -= groundRelative * polygonOffset * posProj.w;
      return posProj;
    }
  `)}class He{constructor(){this.factor=new $e,this.factorAlignment=new $e}}class $e{constructor(){this.scale=0,this.factor=0,this.minScaleFactor=0}}function Ge(e){e.uniforms.add(new ze("alignPixelEnabled",((e,t)=>t.alignPixelEnabled))),e.code.add(ne`vec4 alignToPixelCenter(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.500123) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = (floor(xy * widthHeight) + vec2(0.5)) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`),e.code.add(ne`vec4 alignToPixelOrigin(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.5) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = floor((xy + 0.5 * pixelSz) * widthHeight) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`)}function qe(e,t){const{vertex:o,fragment:i}=e;o.include(Ge),t.multipassEnabled&&e.varyings.add("depth","float"),o.code.add(ne`
  void main(void) {
    vec4 posProjCenter;
    if (dot(position, position) > 0.0) {
      // Render single point to center of the pixel to avoid subpixel filtering to affect the marker color
      ProjectHUDAux projectAux;
      vec4 posProj = projectPositionHUD(projectAux);
      posProjCenter = alignToPixelCenter(posProj, viewport.zw);

      ${t.multipassEnabled?"depth = projectAux.posView.z;":""}
      vec3 vpos = projectAux.posModel;
      if (rejectBySlice(vpos)) {
        // Project out of clip space
        posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
      }

    } else {
      // Project out of clip space
      posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
    }

    gl_Position = posProjCenter;
    gl_PointSize = 1.0;
  }
  `),e.include(R,t),i.code.add(ne`
  void main() {
    fragColor = vec4(1);
    ${t.multipassEnabled?ne`
        if(terrainDepthTest(depth)) {
          fragColor.g = 0.5;
        }`:""}
  }
  `)}function We(e){e.vertex.uniforms.add(new Q("renderTransparentlyOccludedHUD",((e,t)=>t.hudRenderStyle===Te.Occluded?1:t.hudRenderStyle===Te.NotOccluded?0:.75)),new j("viewport",((e,t)=>t.camera.fullViewport)),new I("hudVisibilityTexture",((e,t)=>t.hudVisibility?.getTexture()))),e.vertex.include(Ge),e.vertex.code.add(ne`bool testHUDVisibility(vec4 posProj) {
vec4 posProjCenter = alignToPixelCenter(posProj, viewport.zw);
vec4 occlusionPixel = texture(hudVisibilityTexture, .5 + .5 * posProjCenter.xy / posProjCenter.w);
if (renderTransparentlyOccludedHUD > 0.5) {
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g * renderTransparentlyOccludedHUD < 1.0;
}
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g == 1.0;
}`)}function Ye(e){return e.outlineColor[3]>0&&e.outlineSize>0}function ke(e,t=Xe){var o,i,a;return e.textureIsSignedDistanceField?(o=e.anchorPosition,a=t,null!=(i=e.distanceFieldBoundingBox)?we(a,o[0]*(i[2]-i[0])+i[0],o[1]*(i[3]-i[1])+i[1]):we(a,0,0)):Ae(t,e.anchorPosition),t}const Xe=s(),Ze=Object.freeze(Object.defineProperty({__proto__:null,build:function(e){const t=new V,o=e.signedDistanceFieldEnabled;if(t.include(Be,e),t.include(F,e),e.occlusionPass)return t.include(qe,e),t;const{vertex:i,fragment:a}=t;t.include(ie),a.include(ee),a.include(_),t.include(U,e),t.include(N,e),t.include(We),t.varyings.add("vcolor","vec4"),t.varyings.add("vtc","vec2"),t.varyings.add("vsize","vec2"),t.varyings.add("voccluded","float"),i.uniforms.add(new j("viewport",((e,t)=>t.camera.fullViewport)),new L("screenOffset",((e,t)=>we(Xe,2*e.screenOffset[0]*t.camera.pixelRatio,2*e.screenOffset[1]*t.camera.pixelRatio))),new L("anchorPosition",(e=>ke(e))),new j("materialColor",(e=>e.color))),D(i),o&&(i.uniforms.add(new j("outlineColor",(e=>e.outlineColor))),a.uniforms.add(new j("outlineColor",(e=>Ye(e)?e.outlineColor:O)),new Q("outlineSize",(e=>Ye(e)?e.outlineSize:0)))),e.pixelSnappingEnabled&&i.include(Ge),e.hasScreenSizePerspective&&(se(i),re(i)),e.debugDrawLabelBorder&&t.varyings.add("debugBorderCoords","vec4"),t.attributes.add(le.UV0,"vec2"),t.attributes.add(le.COLOR,"vec4"),t.attributes.add(le.SIZE,"vec2"),t.attributes.add(le.FEATUREATTRIBUTE,"vec4"),i.code.add(ne`
    void main(void) {
      ProjectHUDAux projectAux;
      vec4 posProj = projectPositionHUD(projectAux);
      forwardObjectAndLayerIdColor();

      if (rejectBySlice(projectAux.posModel)) {
        // Project outside of clip plane
        gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
        return;
      }
      vec2 inputSize;
      ${e.hasScreenSizePerspective?ne`
            inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
            vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);
         `:ne`
            inputSize = size;
            vec2 screenOffsetScaled = screenOffset;`}

      ${e.vvSize?"inputSize *= vvScale(featureAttribute).xx;":""}

      vec2 combinedSize = inputSize * pixelRatio;
      vec4 quadOffset = vec4(0.0);
      bool visible = testHUDVisibility(posProj);
      voccluded = visible ? 0.0 : 1.0;
    `);const r=ne`vec2 uv01 = floor(uv0);
vec2 uv = uv0 - uv01;
quadOffset.xy = ((uv01 - anchorPosition) * 2.0 * combinedSize + screenOffsetScaled) / viewport.zw * posProj.w;`,s=e.pixelSnappingEnabled?o?ne`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:ne`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:ne`posProj += quadOffset;`;i.code.add(ne`
    ${e.occlusionTestEnabled?"if (visible) {":""}
    ${r}
    ${e.vvColor?"vcolor = interpolateVVColor(featureAttribute.y) * materialColor;":"vcolor = color / 255.0 * materialColor;"}

    ${e.output===te.ObjectAndLayerIdColor?ne`vcolor.a = 1.0;`:""}

    bool alphaDiscard = vcolor.a < ${ne.float(M)};
    ${o?`alphaDiscard = alphaDiscard && outlineColor.a < ${ne.float(M)};`:""}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${s}
      gl_Position = posProj;
    }

    vtc = uv;

    ${e.debugDrawLabelBorder?"debugBorderCoords = vec4(uv01, 1.5 / combinedSize);":""}
    vsize = inputSize;
    ${e.occlusionTestEnabled?ne`} else { vtc = vec2(0.0);
      ${e.debugDrawLabelBorder?"debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);}":"}"}`:""}
  }
  `),a.uniforms.add(new I("tex",(e=>e.texture)));const n=e.debugDrawLabelBorder?ne`(isBorder > 0.0 ? 0.0 : ${ne.float(B)})`:ne.float(B),l=ne`
    ${e.debugDrawLabelBorder?ne`
      float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`:""}

    ${e.sampleSignedDistanceFieldTexelCenter?ne`
      // Attempt to sample texel centers to avoid that thin cross outlines
      // disappear with large symbol sizes.
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/7058#issuecomment-603041
      float txSize = float(textureSize(tex, 0).x);
      float texelSize = 1.0 / txSize;

      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      vec2 samplePos = vtc + (vec2(1.0, -1.0) * texelSize) * scaleFactor;
      `:ne`
      vec2 samplePos = vtc;
      `}

    ${o?ne`
      vec4 fillPixelColor = vcolor;

      // Get distance and map it into [-0.5, 0.5]
      float d = rgba2float(texture(tex, samplePos)) - 0.5;

      // Distance in output units (i.e. pixels)
      float dist = d * vsize.x;

      // Create smooth transition from the icon into its outline
      float fillAlphaFactor = clamp(0.5 - dist, 0.0, 1.0);
      fillPixelColor.a *= fillAlphaFactor;

      if (outlineSize > 0.25) {
        vec4 outlinePixelColor = outlineColor;
        float clampedOutlineSize = min(outlineSize, 0.5*vsize.x);

        // Create smooth transition around outline
        float outlineAlphaFactor = clamp(0.5 - (abs(dist) - 0.5*clampedOutlineSize), 0.0, 1.0);
        outlinePixelColor.a *= outlineAlphaFactor;

        if (
          outlineAlphaFactor + fillAlphaFactor < ${n} ||
          fillPixelColor.a + outlinePixelColor.a < ${ne.float(M)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
          vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        fragColor = vec4(compositeColor, compositeAlpha);
      } else {
        if (fillAlphaFactor < ${n}) {
          discard;
        }

        fragColor = premultiplyAlpha(fillPixelColor);
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-dist/vsize.x*2.0, 0.0, 1.0), clamp(dist/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:ne`
          vec4 texColor = texture(tex, vtc, -0.5);
          if (texColor.a < ${n}) {
            discard;
          }
          fragColor = texColor * premultiplyAlpha(vcolor);
          `}

    // Draw debug border with transparency, so that original texels along border are still partially visible
    ${e.debugDrawLabelBorder?ne`fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);`:""}
  `;switch(e.output){case te.Color:e.transparencyPassType===H.ColorAlpha&&(t.outputs.add("fragColor","vec4",0),t.outputs.add("fragAlpha","float",1)),a.code.add(ne`
        void main() {
          ${l}
          ${e.transparencyPassType===H.FrontFace?"fragColor.rgb /= fragColor.a;":""}
          ${e.transparencyPassType===H.ColorAlpha?"fragAlpha = fragColor.a;":""}
        }`);break;case te.ObjectAndLayerIdColor:a.code.add(ne`
        void main() {
          ${l}
          outputObjectAndLayerIdColor();
        }`);break;case te.Highlight:a.constants.add("occludedHighlightFlag","vec4",je),a.constants.add("unoccludedHighlightFlag","vec4",Ee),a.code.add(ne`
        void main() {
          ${l}
          if (voccluded == 1.0) {
            fragColor = occludedHighlightFlag;
          } else {
            fragColor = unoccludedHighlightFlag;
          }
        }`)}return t},calculateAnchorPosForRendering:ke},Symbol.toStringTag,{value:"Module"}));class Je extends G{initializeConfiguration(e,t){t.spherical=e.viewingMode===De.Global}initializeProgram(e){return new q(e.rctx,Je.shader.get().build(this.configuration),pe)}initializePipeline(){const e=this.configuration.transparencyPassType,t=this.configuration,o=e===H.NONE,i=e===H.FrontFace,a=this.configuration.hasPolygonOffset?Ke:null,r=t.draped?null:(o||i)&&t.output!==te.Highlight&&(t.depthEnabled||t.occlusionPass)?_e:null;return Ue({blending:t.output===te.Color||t.output===te.Highlight?o?Qe:W(e):null,depthTest:t.draped?null:{func:Ie.LEQUAL},depthWrite:r,drawBuffers:Y(e),colorWrite:Ne,polygonOffset:a})}get primitiveType(){return this.configuration.occlusionPass?Ve.POINTS:Ve.TRIANGLES}}Je.shader=new $(Ze,(()=>Promise.resolve().then((()=>Ze))));const Ke={factor:0,units:-4},Qe=Fe(Re.ONE,Re.ONE_MINUS_SRC_ALPHA);class et extends k{constructor(){super(...arguments),this.output=te.Color,this.transparencyPassType=H.NONE,this.screenCenterOffsetUnitsEnabled=!1,this.spherical=!1,this.occlusionTestEnabled=!0,this.signedDistanceFieldEnabled=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.vvSize=!1,this.vvColor=!1,this.hasVerticalOffset=!1,this.hasScreenSizePerspective=!1,this.debugDrawLabelBorder=!1,this.hasSlicePlane=!1,this.hasPolygonOffset=!1,this.depthEnabled=!0,this.pixelSnappingEnabled=!0,this.draped=!1,this.multipassEnabled=!1,this.cullAboveGround=!1,this.occlusionPass=!1,this.objectAndLayerIdColorInstanced=!1}}Le([Me({count:te.COUNT})],et.prototype,"output",void 0),Le([Me({count:H.COUNT})],et.prototype,"transparencyPassType",void 0),Le([Me()],et.prototype,"screenCenterOffsetUnitsEnabled",void 0),Le([Me()],et.prototype,"spherical",void 0),Le([Me()],et.prototype,"occlusionTestEnabled",void 0),Le([Me()],et.prototype,"signedDistanceFieldEnabled",void 0),Le([Me()],et.prototype,"sampleSignedDistanceFieldTexelCenter",void 0),Le([Me()],et.prototype,"vvSize",void 0),Le([Me()],et.prototype,"vvColor",void 0),Le([Me()],et.prototype,"hasVerticalOffset",void 0),Le([Me()],et.prototype,"hasScreenSizePerspective",void 0),Le([Me()],et.prototype,"debugDrawLabelBorder",void 0),Le([Me()],et.prototype,"hasSlicePlane",void 0),Le([Me()],et.prototype,"hasPolygonOffset",void 0),Le([Me()],et.prototype,"depthEnabled",void 0),Le([Me()],et.prototype,"pixelSnappingEnabled",void 0),Le([Me()],et.prototype,"draped",void 0),Le([Me()],et.prototype,"multipassEnabled",void 0),Le([Me()],et.prototype,"cullAboveGround",void 0),Le([Me()],et.prototype,"occlusionPass",void 0),Le([Me()],et.prototype,"objectAndLayerIdColorInstanced",void 0),Le([Me({constValue:!0})],et.prototype,"hasSliceInVertexProgram",void 0),Le([Me({constValue:!1})],et.prototype,"hasVvInstancing",void 0);class tt extends fe{constructor(e){super(e,new Pt),this._configuration=new et,this.produces=new Map([[X.HUD_MATERIAL,e=>oe(e)&&!this.parameters.drawInSecondSlot],[X.LABEL_MATERIAL,e=>oe(e)&&this.parameters.drawInSecondSlot],[X.OCCLUSION_PIXELS,()=>this.parameters.occlusionTest],[X.DRAPED_MATERIAL,e=>oe(e)]])}getConfiguration(e,t){return this._configuration.output=e,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasVerticalOffset=!!this.parameters.verticalOffset,this._configuration.hasScreenSizePerspective=!!this.parameters.screenSizePerspective,this._configuration.screenCenterOffsetUnitsEnabled="screen"===this.parameters.centerOffsetUnits,this._configuration.hasPolygonOffset=this.parameters.polygonOffset,this._configuration.draped=this.parameters.draped,this._configuration.occlusionTestEnabled=this.parameters.occlusionTest,this._configuration.pixelSnappingEnabled=this.parameters.pixelSnappingEnabled,this._configuration.signedDistanceFieldEnabled=this.parameters.textureIsSignedDistanceField,this._configuration.sampleSignedDistanceFieldTexelCenter=this.parameters.sampleSignedDistanceFieldTexelCenter,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.occlusionPass=t.slot===X.OCCLUSION_PIXELS&&this.parameters.occlusionTest,e===te.Color&&(this._configuration.debugDrawLabelBorder=!!J.LABELS_SHOW_BORDER),this._configuration.depthEnabled=this.parameters.depthEnabled,this._configuration.transparencyPassType=t.transparencyPassType,this._configuration.multipassEnabled=t.multipassEnabled,this._configuration.cullAboveGround=t.multipassTerrain.cullAboveGround,this._configuration}intersect(e,t,i,r,s,n){if(!(i.options.selectionMode&&i.options.hud&&e.visible&&i.point))return;const g=this.parameters,m=i.point,x=i.camera;let{scaleX:b,scaleY:O}=this._getScreenScale(e);b*=x.pixelRatio,O*=x.pixelRatio,o(pt,t),e.attributes.has(le.FEATUREATTRIBUTE)&&function(e){const t=e[0],o=e[1],i=e[2],a=e[3],r=e[4],s=e[5],n=e[6],l=e[7],c=e[8],d=1/Math.sqrt(t*t+o*o+i*i),p=1/Math.sqrt(a*a+r*r+s*s),f=1/Math.sqrt(n*n+l*l+c*c);e[0]=t*d,e[1]=o*d,e[2]=i*d,e[3]=a*p,e[4]=r*p,e[5]=s*p,e[6]=n*f,e[7]=l*f,e[8]=c*f}(pt);const P=e.attributes.get(le.POSITION),C=e.attributes.get(le.SIZE),y=e.attributes.get(le.NORMAL),w=e.attributes.get(le.CENTEROFFSETANDDISTANCE);xe(P.size>=3);const A=ke(g),z="screen"===this.parameters.centerOffsetUnits;for(let e=0;e<P.data.length/P.size;e++){const o=e*P.size;l(st,P.data[o],P.data[o+1],P.data[o+2]),c(st,st,t);const r=e*C.size;bt[0]=C.data[r]*b,bt[1]=C.data[r+1]*O,c(st,st,x.viewMatrix);const s=e*w.size;if(l(vt,w.data[s],w.data[s+1],w.data[s+2]),!z&&(st[0]+=vt[0],st[1]+=vt[1],0!==vt[2])){const e=vt[2];d(vt,st),p(st,st,f(vt,vt,e))}const T=e*y.size;if(l(nt,y.data[T],y.data[T+1],y.data[T+2]),it(nt,pt,x,mt),this._applyVerticalOffsetTransformationView(st,mt,x,rt),x.applyProjection(st,lt),lt[0]>-1){z&&(vt[0]||vt[1])&&(lt[0]+=vt[0]*x.pixelRatio,0!==vt[1]&&(lt[1]+=ue(vt[1],rt.factorAlignment)*x.pixelRatio),x.unapplyProjection(lt,st)),lt[0]+=this.parameters.screenOffset[0]*x.pixelRatio,lt[1]+=this.parameters.screenOffset[1]*x.pixelRatio,lt[0]=Math.floor(lt[0]),lt[1]=Math.floor(lt[1]),ve(bt,rt.factor,bt);const e=xt*x.pixelRatio;let t=0;if(g.textureIsSignedDistanceField&&(t=g.outlineSize*x.pixelRatio/2),at(m,lt[0],lt[1],bt,e,t,g,A)){const e=i.ray;if(c(dt,st,a(ut,x.viewMatrix)),lt[0]=m[0],lt[1]=m[1],x.unprojectFromRenderScreen(lt,st)){const t=S();u(t,e.direction);const o=1/v(t);f(t,t,o),n(h(e.origin,st)*o,t,-1,!0,1,dt)}}}}}intersectDraped(e,t,o,i,a,r){const s=e.attributes.get(le.POSITION),n=e.attributes.get(le.SIZE),l=this.parameters,c=ke(l);let{scaleX:d,scaleY:p}=this._getScreenScale(e);d*=e.screenToWorldRatio,p*=e.screenToWorldRatio;const f=St*e.screenToWorldRatio;for(let t=0;t<s.data.length/s.size;t++){const o=t*s.size,u=s.data[o],v=s.data[o+1],h=t*n.size;bt[0]=n.data[h]*d,bt[1]=n.data[h+1]*p;let g=0;l.textureIsSignedDistanceField&&(g=l.outlineSize*e.screenToWorldRatio/2),at(i,u,v,bt,f,g,l,c)&&a(r.dist,r.normal,-1,!1)}}createBufferWriter(){return new wt(this)}_updateScaleInfo(e,t,o){const i=this.parameters;null!=i.screenSizePerspective?he(o,t,i.screenSizePerspective,e.factor):(e.factor.scale=1,e.factor.factor=0,e.factor.minScaleFactor=0),null!=i.screenSizePerspectiveAlignment?he(o,t,i.screenSizePerspectiveAlignment,e.factorAlignment):(e.factorAlignment.factor=e.factor.factor,e.factorAlignment.scale=e.factor.scale,e.factorAlignment.minScaleFactor=e.factor.minScaleFactor)}applyShaderOffsetsView(e,t,o,i,a,r,s){const n=it(t,o,a,mt);return this._applyVerticalGroundOffsetView(e,n,a,s),this._applyVerticalOffsetTransformationView(s,n,a,r),this._applyPolygonOffsetView(s,n,i[3],a,s),this._applyCenterOffsetView(s,i,s),s}applyShaderOffsetsNDC(e,t,o,i,a){return this._applyCenterOffsetNDC(e,t,o,i),null!=a&&u(a,i),this._applyPolygonOffsetNDC(i,t,o,i),i}_applyPolygonOffsetView(e,o,i,a,r){const s=a.aboveGround?1:-1;let n=Math.sign(i);0===n&&(n=s);const l=s*n;if(this.parameters.shaderPolygonOffset<=0)return u(r,e);const c=t(Math.abs(o.cosAngle),.01,1),d=1-Math.sqrt(1-c*c)/c/a.viewport[2];return f(r,e,l>0?d:1/d),r}_applyVerticalGroundOffsetView(e,t,o,i){const a=v(e),r=o.aboveGround?1:-1,s=.5*o.computeRenderPixelSizeAtDist(a),n=f(st,t.normal,r*s);return g(i,e,n),i}_applyVerticalOffsetTransformationView(e,t,o,i){const a=this.parameters;if(!a.verticalOffset?.screenLength){if(a.screenSizePerspective||a.screenSizePerspectiveAlignment){const o=v(e);this._updateScaleInfo(i,o,t.cosAngle)}else i.factor.scale=1,i.factorAlignment.scale=1;return e}const r=v(e),s=a.screenSizePerspectiveAlignment??a.screenSizePerspective,n=ge(o,r,a.verticalOffset,t.cosAngle,s);return this._updateScaleInfo(i,r,t.cosAngle),f(t.normal,t.normal,n),g(e,e,t.normal)}_applyCenterOffsetView(e,t,o){const i="screen"!==this.parameters.centerOffsetUnits;return o!==e&&u(o,e),i&&(o[0]+=t[0],o[1]+=t[1],t[2]&&(d(nt,o),g(o,o,f(nt,nt,t[2])))),o}_applyCenterOffsetNDC(e,t,o,i){const a="screen"!==this.parameters.centerOffsetUnits;return i!==e&&u(i,e),a||(i[0]+=t[0]/o.fullWidth*2,i[1]+=t[1]/o.fullHeight*2),i}_applyPolygonOffsetNDC(e,t,o,i){const a=this.parameters.shaderPolygonOffset;if(e!==i&&u(i,e),a){const e=o.aboveGround?1:-1,r=e*Math.sign(t[3]);i[2]-=(r||e)*a}return i}createGLMaterial(e){return new ot(e)}calculateRelativeScreenBounds(e,t,o=w()){return function(e,t,o,i){i[0]=e.anchorPosition[0]*-t[0]+e.screenOffset[0]*o,i[1]=e.anchorPosition[1]*-t[1]+e.screenOffset[1]*o}(this.parameters,e,t,o),o[2]=o[0]+e[0],o[3]=o[1]+e[1],o}_getScreenScale(e){const t=e.attributes.get(le.FEATUREATTRIBUTE);if(null==t)return{scaleX:1,scaleY:1};const o=P(t.data,gt),[i,a]=Z(ht,this.parameters,o);return{scaleX:i,scaleY:a}}}class ot extends ce{constructor(e){super({...e,...e.material.parameters})}selectProgram(e){return this.ensureTechnique(Je,e)}beginSlot(e){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.selectProgram(e)}}function it(e,t,i,a){return(function(e){return e instanceof Float32Array&&e.length>=16}(r=t)||function(e){return Array.isArray(e)&&e.length>=16}(r))&&(t=o(ft,t)),m(a.normal,e,t),c(a.normal,a.normal,i.viewInverseTransposeMatrix),a.cosAngle=x(ct,Ot),a;var r}function at(e,t,o,i,a,r,s,n){let l=t-a-(n[0]>0?i[0]*n[0]:0),c=l+i[0]+2*a,d=o-a-(n[1]>0?i[1]*n[1]:0),p=d+i[1]+2*a;const f=s.distanceFieldBoundingBox;return s.textureIsSignedDistanceField&&null!=f&&(l+=i[0]*f[0],d+=i[1]*f[1],c-=i[0]*(1-f[2]),p-=i[1]*(1-f[3]),l-=r,c+=r,d-=r,p+=r),e[0]>l&&e[0]<c&&e[1]>d&&e[1]<p}const rt=new He,st=S(),nt=S(),lt=C(),ct=S(),dt=S(),pt=i(),ft=i(),ut=r(),vt=S(),ht=S(),gt=C(),mt={normal:ct,cosAngle:0},xt=1,St=2,bt=[0,0],Ot=b(0,0,1);class Pt extends de{constructor(){super(...arguments),this.renderOccluded=me.Occlude,this.isDecoration=!1,this.color=y(1,1,1,1),this.texCoordScale=[1,1],this.polygonOffset=!1,this.anchorPosition=n(.5,.5),this.screenOffset=[0,0],this.shaderPolygonOffset=1e-5,this.textureIsSignedDistanceField=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.outlineColor=y(1,1,1,1),this.outlineSize=0,this.vvSizeEnabled=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.hasSlicePlane=!1,this.pixelSnappingEnabled=!0,this.occlusionTest=!0,this.centerOffsetUnits="world",this.drawInSecondSlot=!1,this.depthEnabled=!0,this.draped=!1}}const Ct=K().vec3f(le.POSITION).vec3f(le.NORMAL).vec2f(le.UV0).vec4u8(le.COLOR).vec2f(le.SIZE).vec4f(le.CENTEROFFSETANDDISTANCE).vec4f(le.FEATUREATTRIBUTE),yt=Ct.clone().vec4u8(le.OBJECTANDLAYERIDCOLOR);class wt{constructor(t){this._material=t,this.vertexBufferLayout=e("enable-feature:objectAndLayerId-rendering")?yt:Ct}elementCount(e){return 6*e.attributes.get(le.POSITION).indices.length}write(e,t,o,i,a){Se(o.attributes.get(le.POSITION),e,i.position,a,6),be(o.attributes.get(le.NORMAL),t,i.normal,a,6);const r=o.attributes.get(le.UV0).data;let s,n,l,c;if(null==r||r.length<4){const e=this._material.parameters;s=0,n=0,l=e.texCoordScale[0],c=e.texCoordScale[1]}else s=r[0],n=r[1],l=r[2],c=r[3];l=Math.min(1.99999,l+1),c=Math.min(1.99999,c+1);let d=o.attributes.get(le.POSITION).indices.length,p=a;const f=i.uv0;for(let e=0;e<d;++e)f.set(p,0,s),f.set(p,1,n),p++,f.set(p,0,l),f.set(p,1,n),p++,f.set(p,0,l),f.set(p,1,c),p++,f.set(p,0,l),f.set(p,1,c),p++,f.set(p,0,s),f.set(p,1,c),p++,f.set(p,0,s),f.set(p,1,n),p++;Oe(o.attributes.get(le.COLOR),4,i.color,a,6);const{data:u,indices:v}=o.attributes.get(le.SIZE);d=v.length;const h=i.size;p=a;for(let e=0;e<d;++e){const t=u[2*v[e]],o=u[2*v[e]+1];for(let e=0;e<6;++e)h.set(p,0,t),h.set(p,1,o),p++}if(o.attributes.get(le.CENTEROFFSETANDDISTANCE)?Pe(o.attributes.get(le.CENTEROFFSETANDDISTANCE),i.centerOffsetAndDistance,a,6):Ce(i.centerOffsetAndDistance,a,6*d),o.attributes.get(le.FEATUREATTRIBUTE)?Pe(o.attributes.get(le.FEATUREATTRIBUTE),i.featureAttribute,a,6):Ce(i.featureAttribute,a,6*d),null!=o.objectAndLayerIdColor){const e=o.attributes.get(le.POSITION)?.indices;if(e){const t=e.length,r=i.getField(le.OBJECTANDLAYERIDCOLOR,A);ye(o.objectAndLayerIdColor,r,t,a,6)}}}}export{Ge as A,tt as H,He as S,Be as a,We as b};
