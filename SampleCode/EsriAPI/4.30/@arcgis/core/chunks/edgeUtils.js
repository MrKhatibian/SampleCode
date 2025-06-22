/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import o from"../Color.js";import{h as e}from"../core/lang.js";import{a as t}from"./screenUtils.js";import{f as r,b as n}from"./vec4f64.js";import{n as a}from"./compilerUtils.js";import{p as l}from"./floatRGBA.js";import{D as d}from"./DecodeSymbolColor.glsl.js";import{U as c,R as i,S as s,c as m,D as f,M as x,b as u,F as v,a as p}from"./Matrix4PassUniform.js";import{F as C}from"./Float4DrawUniform.js";import{B as w}from"./BindType.js";import{g as F}from"./interfaces3.js";import{T as M,N as T}from"./NormalAttribute.glsl.js";import{V as O}from"./VertexAttribute.js";import{M as h}from"./Matrix3DrawUniform.js";var g,I;!function(o){o[o.INVISIBLE=0]="INVISIBLE",o[o.TRANSPARENT=1]="TRANSPARENT",o[o.OPAQUE=2]="OPAQUE"}(g||(g={}));class S extends c{constructor(o,e){super(o,"int",w.Draw,((t,r,n)=>t.setUniform1i(o,e(r,n))))}}!function(o){o[o.Uniform=0]="Uniform",o[o.Varying=1]="Varying",o[o.COUNT=2]="COUNT"}(I||(I={}));function y(o,e){l(o/429496.7296*.5+.5,e)}function E(o,t){switch(t.componentData){case I.Varying:return function(o,t){const{vertex:r,fragment:n}=o;r.include(i),r.uniforms.add(new M("componentColorTex",(o=>o.componentParameters.texture.texture))),o.attributes.add(O.COMPONENTINDEX,"float"),o.varyings.add("vExternalColorMixMode","mediump float"),o.varyings.add("vExternalColor","vec4");const a=t.output===s.ObjectAndLayerIdColor;a&&o.varyings.add("vObjectAndLayerIdColor","vec4"),o.include(d),r.constants.add("elevationScale","float",858993.4592),r.constants.add("stride","float",e("enable-feature:objectAndLayerId-rendering")?3:2),r.code.add(F`vec2 getComponentTextureCoordinates(float componentIndex, float typeOffset) {
float index = componentIndex * stride + typeOffset;
float texSize = float(textureSize(componentColorTex, 0).x);
float coordX = mod(index, texSize);
float coordY = floor(index / texSize);
return vec2(coordX, coordY) + 0.5;
}`),r.code.add(F`
  vec4 _readComponentColor() {
    vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 0.0);

    return texelFetch(componentColorTex, ivec2(textureCoordinates), 0);
   }

   float readElevationOffset() {
    vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 1.0);

    vec4 encodedElevation = texelFetch(componentColorTex, ivec2(textureCoordinates), 0);
    return (rgba2float(encodedElevation) - 0.5) * elevationScale;
  }

  ${a?F`
          void forwardObjectAndLayerIdColor() {
            vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 2.0);

            vObjectAndLayerIdColor = texelFetch(componentColorTex, ivec2(textureCoordinates), 0);
          }`:F`void forwardObjectAndLayerIdColor() {}`}

  vec4 forwardExternalColor(out bool castShadows) {
    vec4 componentColor = _readComponentColor() * 255.0;

    float shadowFlag = mod(componentColor.b * 255.0, 2.0);
    componentColor.b -= shadowFlag;
    castShadows = shadowFlag >= 1.0;

    int decodedColorMixMode;
    vExternalColor = decodeSymbolColor(componentColor, decodedColorMixMode) * 0.003921568627451; // = 1/255;
    vExternalColorMixMode = float(decodedColorMixMode) + 0.5; // add 0.5 to avoid interpolation artifacts

    return vExternalColor;
  }
`),n.code.add(F`
  void readExternalColor(out vec4 externalColor, out int externalColorMixMode) {
    externalColor = vExternalColor;
    externalColorMixMode = int(vExternalColorMixMode);
  }

  void outputObjectAndLayerIdColor() {
     ${a?F`fragColor = vObjectAndLayerIdColor;`:""}
  }
`)}(o,t);case I.Uniform:return function(o,e){const{vertex:t,fragment:r}=o;t.uniforms.add(new C("externalColor",(o=>o.componentParameters.externalColor))),r.uniforms.add(new S("externalColorMixMode",(o=>o.componentParameters.externalColorMixMode))),o.varyings.add("vExternalColor","vec4"),t.code.add(F`float readElevationOffset() {
return 0.0;
}
void forwardObjectAndLayerIdColor() {}
vec4 forwardExternalColor(out bool castShadows) {
vExternalColor = externalColor;
castShadows = true;
return externalColor;
}`);const n=e.output===s.ObjectAndLayerIdColor;r.code.add(F`
  void readExternalColor(out vec4 color, out int colorMixMode) {
    color = vExternalColor;
    colorMixMode = externalColorMixMode;
  }

  void outputObjectAndLayerIdColor() {
    ${n?F`fragColor = vec4(0,0,0,0);`:""}
 }
`)}(o,t);case I.COUNT:return;default:a(t.componentData)}}function L(o,e){const t=o.vertex;t.include(i),o.include(T,e),t.uniforms.add(new m("distanceFalloffFactor",(o=>o.distanceFalloffFactor))),t.code.add(F`float distanceBasedPerspectiveFactor(float distance) {
return clamp(sqrt(distanceFalloffFactor / distance), 0.0, 1.0);
}`),t.uniforms.add(new M("componentDataTex",(o=>o.componentDataTexture))),o.attributes.add(O.COMPONENTINDEX,"float"),t.constants.add("componentColorFieldOffset","float",0),t.constants.add("componentOtherFieldOffset","float",1),t.constants.add("componentVerticalOffsetFieldOffset","float",2),t.constants.add("componentFieldCount","float",3),t.constants.add("lineWidthFractionFactor","float",8),t.constants.add("extensionLengthOffset","float",128),t.constants.add("verticalOffsetScale","float",858993.4592),t.code.add(F`
    vec2 _componentTextureCoords(float componentIndex, float fieldOffset) {
      float fieldIndex = componentFieldCount * componentIndex + fieldOffset;
      float texSize = float(textureSize(componentDataTex, 0).x);
      float colIndex = mod(fieldIndex, texSize);
      float rowIndex = floor(fieldIndex / texSize);

      return vec2(colIndex, rowIndex) + 0.5;
    }

    struct ComponentData {
      vec4 color;
      vec3 normal;
      vec3 normal2;
      float lineWidth;
      float extensionLength;
      float type;
      float verticalOffset;
    };

    ComponentData readComponentData() {
      vec2 colorIndex = _componentTextureCoords(componentIndex, componentColorFieldOffset);
      vec2 otherIndex = _componentTextureCoords(componentIndex, componentOtherFieldOffset);
      vec2 verticalOffsetIndex = _componentTextureCoords(componentIndex, componentVerticalOffsetFieldOffset);
      vec3 normal = normalModel();
      vec3 normal2 = ${e.silhouette?F`decompressNormal(normal2Compressed)`:F`normal`};

      vec4 colorValue = texelFetch(componentDataTex, ivec2(colorIndex), 0);
      vec4 otherValue = texelFetch(componentDataTex, ivec2(otherIndex), 0);
      float verticalOffset = (rgba2float(texelFetch(componentDataTex, ivec2(verticalOffsetIndex), 0)) - 0.5) * verticalOffsetScale;

      return ComponentData(
        vec4(colorValue.rgb, colorValue.a * otherValue.w), // otherValue.w stores separate opacity
        normal, normal2,
        otherValue.x * (255.0 / lineWidthFractionFactor),
        otherValue.y * 255.0 - extensionLengthOffset,
        -(otherValue.z * 255.0) + 0.5, // SOLID (=0/255) needs to be > 0.0, SKETCHY (=1/255) needs to be <= 0;
        verticalOffset
      );
    }
  `),e.legacy?t.code.add(F`vec3 _modelToWorldNormal(vec3 normal) {
return (model * vec4(normal, 0.0)).xyz;
}
vec3 _modelToViewNormal(vec3 normal) {
return (localView * model * vec4(normal, 0.0)).xyz;
}`):(t.uniforms.add(new h("transformNormalGlobalFromModel",(o=>o.transformNormalGlobalFromModel))),t.code.add(F`vec3 _modelToWorldNormal(vec3 normal) {
return transformNormalGlobalFromModel * normal;
}`)),e.silhouette?(o.attributes.add(O.NORMAL2COMPRESSED,"vec2"),t.code.add(F`vec3 worldNormal(ComponentData data) {
return _modelToWorldNormal(normalize(data.normal + data.normal2));
}`)):t.code.add(F`vec3 worldNormal(ComponentData data) {
return _modelToWorldNormal(data.normal);
}`),e.legacy?t.code.add(F`void worldAndViewFromModelPosition(vec3 modelPos, float verticalOffset, out vec3 worldPos, out vec3 viewPos) {
worldPos = (model * vec4(modelPos, 1.0)).xyz;
viewPos = (localView * vec4(worldPos, 1.0)).xyz;
}`):(t.include(f,e),t.uniforms.add(new x("transformViewFromCameraRelativeRS",(o=>o.transformViewFromCameraRelativeRS)),new h("transformWorldFromModelRS",(o=>o.transformWorldFromModelRS)),new u("transformWorldFromModelTL",(o=>o.transformWorldFromModelTL)),new u("transformWorldFromModelTH",(o=>o.transformWorldFromModelTH)),new v("transformWorldFromViewTL",(o=>o.transformWorldFromViewTL)),new v("transformWorldFromViewTH",(o=>o.transformWorldFromViewTH))),t.code.add(F`
      void worldAndViewFromModelPosition(vec3 modelPos, float verticalOffset, out vec3 worldPos, out vec3 viewPos) {
        vec3 rotatedModelPosition = transformWorldFromModelRS * modelPos;

        vec3 transformCameraRelativeFromModel = dpAdd(
          transformWorldFromModelTL,
          transformWorldFromModelTH,
          -transformWorldFromViewTL,
          -transformWorldFromViewTH
        );

        worldPos = transformCameraRelativeFromModel + rotatedModelPosition;

        if (verticalOffset != 0.0) {
          vec3 vUp = ${e.spherical?F`normalize(transformWorldFromModelTL + rotatedModelPosition);`:F`vec3(0.0, 0.0, 1.0);`}
          worldPos += verticalOffset * vUp;
        }

        viewPos = transformViewFromCameraRelativeRS * worldPos;
      }
    `)),t.uniforms.add(new p("transformProjFromView",((o,e)=>e.camera.projectionMatrix))),t.code.add(F`vec4 projFromViewPosition(vec3 position) {
return transformProjFromView * vec4(position, 1.0);
}`),t.code.add(F`float calculateExtensionLength(float extensionLength, float lineLength) {
return extensionLength / (log2(max(1.0, 256.0 / lineLength)) * 0.2 + 1.0);
}`)}function P(o){return o===b.Sketch||o===b.Mixed}var b,V;function j(o){return o&&o.enabled&&(function(o){return"extrude"===o.type}(o)||function(o){return"fill"===o.type}(o))&&null!=o.edges}function N(o,e){return A(function(o){return o&&o.enabled&&o.edges||null}(o),e)}function A(e,a){if(null==e)return null;const l=null!=e.color?n(o.toUnitRGBA(e.color)):r(0,0,0,0),d=t(e.size),c=t(e.extensionLength);switch(e.type){case"solid":return U({color:l,size:d,extensionLength:c,...a});case"sketch":return function(o){return{...R,...o,type:b.Sketch}}({color:l,size:d,extensionLength:c,...a});default:return}}function U(o){return{...D,...o,type:b.Solid}}!function(o){o[o.Solid=0]="Solid",o[o.Sketch=1]="Sketch",o[o.Mixed=2]="Mixed",o[o.COUNT=3]="COUNT"}(b||(b={})),function(o){o[o.REGULAR=0]="REGULAR",o[o.SILHOUETTE=1]="SILHOUETTE"}(V||(V={}));const D={color:r(0,0,0,.2),size:1,extensionLength:0,opacity:1,objectTransparency:g.OPAQUE,hasSlicePlane:!1},R={color:r(0,0,0,.2),size:1,extensionLength:0,opacity:1,objectTransparency:g.OPAQUE,hasSlicePlane:!1};export{I as C,b as E,g as T,A as a,L as b,U as c,V as d,y as e,N as f,E as g,j as h,P as u};
