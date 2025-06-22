// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("exports ../geometry/support/Ellipsoid ../views/3d/terrain/OverlayContent ../views/3d/webgl-engine/collections/Component/Material/ComponentTechniqueConfiguration ../views/3d/webgl-engine/collections/Component/Material/shader/ComponentData.glsl ../views/3d/webgl-engine/collections/Component/Material/shader/VertexDiscardByOpacity.glsl ../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl ../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput ../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/NormalAttribute.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/TextureCoordinateAttribute.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexNormal.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexPosition.glsl ../views/3d/webgl-engine/core/shaderLibrary/output/OutputDepth.glsl ../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl ../views/3d/webgl-engine/core/shaderLibrary/output/ReadDepth.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/ComputeMaterialColor.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/ComputeNormalTexture.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/ComputeShadingNormal.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateSceneLighting.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassTerrainTest.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/ReadBaseColorTexture.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl ../views/3d/webgl-engine/core/shaderLibrary/terrain/Overlay.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/AlphaCutoff ../views/3d/webgl-engine/core/shaderLibrary/util/AlphaDiscard.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/EllipsoidMode ../views/3d/webgl-engine/core/shaderModules/interfaces ../views/3d/webgl-engine/core/shaderModules/ShaderBuilder ../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform ../views/3d/webgl-engine/lib/TransparencyPassType".split(" "),
function(p,l,B,q,r,C,D,e,E,F,G,H,I,J,K,L,M,N,O,t,m,P,Q,g,R,S,u,T,U,v,b,V,w,x){function y(a){const c=new V.ShaderBuilder;c.include(J.VertexPosition,a);c.include(I.VertexNormal,a);c.include(H.VertexColor,a);c.include(G.TextureCoordinateAttribute,a);c.include(D.ForwardLinearDepth,a);c.include(r.ComponentData,a);c.include(U.DiscardOrAdjustAlphaDraw,a);c.include(E.SlicePass,a);c.include(R.ReadBaseColorTexture,a);c.include(C.VertexDiscardByOpacity,a);const {vertex:k,fragment:d}=c;if(a.pbrMode===g.PBRMode.Normal||
a.pbrMode===g.PBRMode.Schematic)c.include(g.PhysicallyBasedRenderingParameters,a),a.hasNormalTexture&&c.include(O.ComputeNormalTexture,a);const z=a.output===e.ShaderOutput.Shadow||a.output===e.ShaderOutput.ShadowHighlight||a.output===e.ShaderOutput.ShadowExcludeHighlight;z&&a.componentData===r.ComponentDataType.Varying?k.code.add(b.glsl`#define discardShadows(castShadows) { if(!castShadows) { gl_Position = vec4(1e38, 1e38, 1e38, 1.0); return; } }`):k.code.add(b.glsl`#define discardShadows(castShadows) {}`);
const f=a.integratedMeshMode===q.IntegratedMeshMode.ColorOverlay||a.integratedMeshMode===q.IntegratedMeshMode.ColorOverlayWithWater;var h=f&&a.output===e.ShaderOutput.Color&&a.pbrMode===g.PBRMode.WaterOnIntegratedMesh;f&&(c.include(m.EvaluateSceneLighting,a),c.include(u.OverlayIM,a),a.spherical?k.code.add(b.glsl`
      const float invEllipsoidRadius = ${b.glsl.float(1/(a.ellipsoidMode===v.EllipsoidMode.Earth?l.earth.radius:a.ellipsoidMode===v.EllipsoidMode.Mars?l.mars.radius:l.moon.radius))};
      vec2 projectOverlay(vec3 pos) {
        return pos.xy / (1.0 + invEllipsoidRadius * pos.z);
      }
      `):k.code.add(b.glsl`vec2 projectOverlay(vec3 pos) { return pos.xy; }`));h&&(c.varyings.add("tbnTangent","vec3"),c.varyings.add("tbnBiTangent","vec3"),c.varyings.add("groundNormal","vec3"));k.code.add(b.glsl`
    void main() {
      bool castShadows;
      vec4 externalColor = forwardExternalColor(castShadows);
      discardShadows(castShadows);

      vertexDiscardByOpacity(externalColor.a);

      ${a.output===e.ShaderOutput.ObjectAndLayerIdColor?b.glsl`externalColor.a = 1.0;`:""}

      if (externalColor.a < ${b.glsl.float(T.symbolAlphaCutoff)}) {
        // Discard this vertex
        gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        return;
      }

      forwardPosition(readElevationOffset());
      forwardNormal();
      forwardTextureCoordinates();
      forwardVertexColor();
      forwardLinearDepth();
      ${a.output===e.ShaderOutput.ObjectAndLayerIdColor?b.glsl`forwardObjectAndLayerIdColor();`:""}
      ${h?a.spherical?b.glsl`
                groundNormal = normalize(positionWorld());
                tbnTangent = normalize(cross(vec3(0.0, 0.0, 1.0), groundNormal));
                tbnBiTangent = normalize(cross(groundNormal, tbnTangent));`:b.glsl`
                groundNormal = vec3(0.0, 0.0, 1.0);
                tbnTangent = vec3(1.0, 0.0, 0.0);
                tbnBiTangent = vec3(0.0, 1.0, 0.0);`:""}
      ${f?b.glsl`setOverlayVTC(projectOverlay(position));`:""}
    }
  `);a.output===e.ShaderOutput.Color&&(d.include(M.ReadLinearDepth),c.include(Q.multipassTerrainTest,a),c.include(N.ComputeMaterialColor,a),c.include(t.ComputeShadingNormal,a),c.include(m.EvaluateSceneLighting,a),a.transparencyPassType===x.TransparencyPassType.ColorAlpha&&(c.outputs.add("fragColor","vec4",0),c.outputs.add("fragAlpha","float",1)),a.receiveShadows?(c.include(S.ReadShadowMapPass,a),d.code.add(b.glsl`float evaluateShadow() {
return readShadowMap(vPositionWorldCameraRelative, linearDepth);
}`)):d.code.add(b.glsl`float evaluateShadow() { return 0.0; }`),f&&d.uniforms.add(new w.Texture2DPassUniform("ovColorTex",(A,n)=>u.getIMColorTexture(A,n))),d.code.add(b.glsl`
      void main() {
        discardBySlice(vPositionWorldCameraRelative);
        ${a.multipassEnabled?b.glsl`terrainDepthTest(vPosition_view.z);`:""}

        vec4 textureColor = readBaseColorTexture();
        discardOrAdjustAlpha(textureColor);

        vec4 externalColor;
        int externalColorMixMode;
        readExternalColor(externalColor, externalColorMixMode);

        vec4 materialColor = computeMaterialColor(
          textureColor,
          externalColor,
          externalColorMixMode
        );
        ${f?b.glsl`vec4 overlayColor = getOverlayColor(ovColorTex, vtcOverlay);`:""}
    `),a.pbrMode===g.PBRMode.Normal||a.pbrMode===g.PBRMode.Schematic?(P.addMainLightIntensity(d),d.code.add(b.glsl`
        ${a.pbrMode===g.PBRMode.Normal?b.glsl`
                applyPBRFactors();
                if (int(externalColorMixMode) == 3) {
                  mrr = vec3(0.0, 0.6, 0.2);
                }`:""}
        vec3 normalVertex = shadingNormalWorld();
        float additionalIrradiance = 0.02 * mainLightIntensity[2];
      `),a.hasNormalTexture?d.code.add(b.glsl`mat3 tangentSpace = computeTangentSpace(normalVertex, vPositionWorldCameraRelative, vuv0);
vec3 shadingNormal = computeTextureNormal(tangentSpace, vuv0);`):d.code.add(b.glsl`vec3 shadingNormal = normalVertex;`),d.code.add(b.glsl`${a.spherical?b.glsl`vec3 normalGround = normalize(positionWorld());`:b.glsl`vec3 normalGround = vec3(0.0, 0.0, 1.0);`}
      `),d.code.add(b.glsl`
        vec3 viewDir = normalize(vPositionWorldCameraRelative);
        float ssao = 1.0 - occlusion * evaluateAmbientOcclusionInverse();
        ${a.snowCover?b.glsl`
                vec3 surfaceNormal = normalize(shadingNormalWorld());
                float snow = smoothstep(0.5, 0.55, dot(surfaceNormal, normalize(positionWorld())));
                materialColor.rgb = mix(materialColor.rgb, vec3(1.1), snow);
                ssao = mix(ssao, 0.5 * ssao, snow);
                shadingNormal = mix(shadingNormal, surfaceNormal, snow);`:""}

        ${f?b.glsl` materialColor = materialColor * (1.0 - overlayColor.a) + overlayColor;`:""}

        vec3 additionalLight = evaluateAdditionalLighting(ssao, positionWorld());
        vec4 shadedColor = vec4(evaluateSceneLightingPBR(shadingNormal, materialColor.rgb, evaluateShadow(), ssao, additionalLight, viewDir, normalGround, mrr, emission, additionalIrradiance), materialColor.a);
        `)):(a.receiveShadows?d.code.add(b.glsl`float shadow = evaluateShadow();`):a.spherical?(m.addLightingGlobalFactor(d),d.code.add(b.glsl`float additionalAmbientScale = additionalDirectedAmbientLight(positionWorld());
float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);`)):d.code.add(b.glsl`float shadow = 0.0;`),h&&d.uniforms.add(new w.Texture2DPassUniform("ovNormalTex",(A,n)=>n.overlay?.getTexture(B.OverlayContent.WaterNormal))),a.snowCover&&d.code.add(b.glsl`vec3 surfaceNormal = normalize(cross(dFdx(vPositionWorldCameraRelative), dFdy(vPositionWorldCameraRelative)));
float snow = smoothstep(0.5, 0.55, dot(surfaceNormal, normalize(positionWorld())));
materialColor.rgb = mix(materialColor.rgb, vec3(1), snow);`),d.code.add(b.glsl`
        float ambientOcclusion = evaluateAmbientOcclusion();
        vec3 additionalLight = evaluateAdditionalLighting(ambientOcclusion, positionWorld());

        ${f?b.glsl` materialColor = materialColor * (1.0 - overlayColor.a) + overlayColor;`:""}

        vec4 shadedColor = vec4(evaluateSceneLighting(shadingNormalWorld(), materialColor.rgb, shadow, ambientOcclusion, additionalLight), materialColor.a);
      ${h?b.glsl`
              vec4 overlayWaterMask = getOverlayColor(ovNormalTex, vtcOverlay);
              float waterNormalLength = length(overlayWaterMask);
              if (waterNormalLength > 0.95) {
                mat3 tbnMatrix = mat3(tbnTangent, tbnBiTangent, groundNormal);
                vec4 waterColorLinear = getOverlayWaterColor(overlayWaterMask, overlayColor, -normalize(vPositionWorldCameraRelative), shadow, groundNormal, tbnMatrix, vPosition_view, positionWorld());
                vec4 waterColorNonLinear = delinearizeGamma(vec4(waterColorLinear.xyz, 1.0));
                // un-gamma the ground color to mix in linear space
                shadedColor = mix(shadedColor, waterColorNonLinear, waterColorLinear.w);
              }`:""}
      `)),d.code.add(b.glsl`
        fragColor = highlightSlice(shadedColor, vPositionWorldCameraRelative);
        ${a.transparencyPassType===x.TransparencyPassType.ColorAlpha?b.glsl`
                fragColor = premultiplyAlpha(fragColor);
                fragAlpha = fragColor.a;`:""}
      }
    `));if((h=a.output===e.ShaderOutput.Depth)||z||a.output===e.ShaderOutput.ViewshedShadow)h||c.include(K.OutputDepth,a),d.code.add(b.glsl`
      void main() {
        discardBySlice(vPositionWorldCameraRelative);

        vec4 textureColor = readBaseColorTexture();
        discardOrAdjustAlpha(textureColor);

        ${h?"":b.glsl`outputDepth(linearDepth);`}
      }
    `);a.output===e.ShaderOutput.Normal&&(c.include(t.ComputeShadingNormal,a),d.code.add(b.glsl`
      void main() {
        discardBySlice(vPositionWorldCameraRelative);

        vec4 textureColor = readBaseColorTexture();
        discardOrAdjustAlpha(textureColor);

        // note: the alpha component needs to be 1.0 in order for this material to influence ambient occlusion,
        // see the ssao fragment shader
        float alpha = ${a.normalType===F.NormalType.Ground?"0.0":"1.0"};
        fragColor = vec4(vec3(.5) + .5 * shadingNormal_view(), alpha);
      }
    `));a.output===e.ShaderOutput.ObjectAndLayerIdColor&&c.fragment.code.add(b.glsl`
      void main() {
        discardBySlice(vPositionWorldCameraRelative);

        vec4 textureColor = readBaseColorTexture();
        discardOrAdjustAlpha(textureColor);

        ${f?b.glsl`fragColor = getOverlayColorTexel(vtcOverlay);`:"outputObjectAndLayerIdColor();"}
      }
    `);a.output===e.ShaderOutput.Highlight&&(c.include(L.OutputHighlight),d.code.add(b.glsl`
      void main() {
        discardBySlice(vPositionWorldCameraRelative);

        vec4 textureColor = readBaseColorTexture();
        discardOrAdjustAlpha(textureColor);

        ${f?b.glsl`
                vec4 overlayColor = getCombinedOverlayColor();
                if (overlayColor.a == 0.0) {
                  fragColor = vec4(0.0);
                  return;
                }`:""}

        outputHighlight();
      }
    `));return c}const W=Object.freeze(Object.defineProperty({__proto__:null,build:y},Symbol.toStringTag,{value:"Module"}));p.ComponentShader=W;p.build=y});