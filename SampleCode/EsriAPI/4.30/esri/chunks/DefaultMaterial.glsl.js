// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("exports ../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl ../views/3d/webgl-engine/core/shaderLibrary/Offset.glsl ../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput ../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl ../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/InstancedDoublePrecision.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/NormalAttribute.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/PositionAttribute.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/SymbolColor.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/TextureCoordinateAttribute.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexNormal.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/VerticalOffset.glsl ../views/3d/webgl-engine/core/shaderLibrary/default/DefaultMaterialAuxiliaryPasses.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/ComputeNormalTexture.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateAmbientOcclusion.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateSceneLighting.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassTerrainTest.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/Normals.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRendering.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/TextureTransformUV.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/VisualVariables.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/AlphaCutoff ../views/3d/webgl-engine/core/shaderLibrary/util/AlphaDiscard.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/MixExternalColor.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl ../views/3d/webgl-engine/core/shaderModules/Float3PassUniform ../views/3d/webgl-engine/core/shaderModules/Float4PassUniform ../views/3d/webgl-engine/core/shaderModules/FloatPassUniform ../views/3d/webgl-engine/core/shaderModules/interfaces ../views/3d/webgl-engine/core/shaderModules/ShaderBuilder ../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform ../views/3d/webgl-engine/lib/TransparencyPassType ../views/3d/webgl-engine/lib/VertexAttribute".split(" "),
function(q,x,y,z,A,B,C,h,D,E,F,G,H,I,J,K,L,m,M,N,O,P,k,r,f,Q,R,S,T,n,t,U,u,c,V,W,v,X){function w(a){const b=new V.ShaderBuilder,{vertex:g,fragment:e,varyings:l}=b;n.addProjViewLocalOrigin(g,a);b.include(D.PositionAttribute);l.add("vpos","vec3");b.include(Q.VisualVariables,a);b.include(C.InstancedDoublePrecision,a);b.include(I.VerticalOffset,a);b.include(f.colorTextureUV,a);if(a.output===z.ShaderOutput.Color){b.include(f.normalTextureUV,a);b.include(f.emissiveTextureUV,a);b.include(f.occlusionTextureUV,
a);b.include(f.metallicRoughnessTextureUV,a);n.addCameraPosition(g,a);b.include(h.NormalAttribute,a);b.include(B.Transform,a);const p=a.normalType===h.NormalType.Attribute||a.normalType===h.NormalType.Compressed;p&&a.offsetBackfaces&&b.include(y.Offset);b.include(K.ComputeNormalTexture,a);b.include(H.VertexNormal,a);a.instancedColor&&b.attributes.add(X.VertexAttribute.INSTANCECOLOR,"vec4");l.add("vPositionLocal","vec3");b.include(F.TextureCoordinateAttribute,a);b.include(x.ForwardLinearDepth,a);b.include(E.SymbolColor,
a);b.include(G.VertexColor,a);g.uniforms.add(new U.Float4PassUniform("externalColor",d=>d.externalColor));l.add("vcolorExt","vec4");a.multipassEnabled&&l.add("depth","float");g.code.add(c.glsl`
      void main(void) {
        forwardNormalizedVertexColor();
        vcolorExt = externalColor;
        ${a.instancedColor?"vcolorExt *\x3d instanceColor * 0.003921568627451;":""}
        vcolorExt *= vvColor();
        vcolorExt *= getSymbolColor();
        forwardColorMixMode();

        if (vcolorExt.a < ${c.glsl.float(R.symbolAlphaCutoff)}) {
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        } else {
          vpos = getVertexInLocalOriginSpace();
          vPositionLocal = vpos - view[3].xyz;
          vpos = subtractOrigin(vpos);
          ${p?c.glsl`vNormalWorld = dpNormal(vvLocalNormal(normalModel()));`:""}
          vpos = addVerticalOffset(vpos, localOrigin);
          ${a.hasVertexTangents?"vTangent \x3d dpTransformVertexTangent(tangent);":""}
          gl_Position = transformPosition(proj, view, vpos);
          ${p&&a.offsetBackfaces?"gl_Position \x3d offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
        }

        ${a.multipassEnabled?"depth \x3d (view * vec4(vpos, 1.0)).z;":""}
        forwardLinearDepth();
        forwardTextureCoordinates();
        forwardColorUV();
        forwardNormalUV();
        forwardEmissiveUV();
        forwardOcclusionUV();
        forwardMetallicRoughnessUV();
      }
    `);b.include(A.SliceDraw,a);b.include(m.EvaluateSceneLighting,a);b.include(L.EvaluateAmbientOcclusion,a);b.include(S.DiscardOrAdjustAlphaPass,a);b.include(a.instancedDoublePrecision?r.ReadShadowMapPass:r.ReadShadowMapDraw,a);b.include(N.multipassTerrainTest,a);n.addCameraPosition(e,a);e.uniforms.add(g.uniforms.get("localOrigin"),new t.Float3PassUniform("ambient",d=>d.ambient),new t.Float3PassUniform("diffuse",d=>d.diffuse),new u.FloatPassUniform("opacity",d=>d.opacity),new u.FloatPassUniform("layerOpacity",
d=>d.layerOpacity));a.hasColorTexture&&e.uniforms.add(new W.Texture2DPassUniform("tex",d=>d.texture));b.include(k.PhysicallyBasedRenderingParameters,a);b.include(P.PhysicallyBasedRendering,a);e.include(T.MixExternalColor);b.include(O.Normals,a);m.addAmbientBoostFactor(e);m.addLightingGlobalFactor(e);M.addMainLightIntensity(e);a.transparencyPassType===v.TransparencyPassType.ColorAlpha&&(b.outputs.add("fragColor","vec4",0),b.outputs.add("fragAlpha","float",1));e.code.add(c.glsl`
      void main() {
        discardBySlice(vpos);
        ${a.multipassEnabled?"terrainDepthTest(depth);":""}
        ${a.hasColorTexture?c.glsl`
                vec4 texColor = texture(tex, ${a.hasColorTextureTransform?c.glsl`colorUV`:c.glsl`vuv0`});
                ${a.textureAlphaPremultiplied?"texColor.rgb /\x3d texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:c.glsl`vec4 texColor = vec4(1.0);`}
        shadingParams.viewDirection = normalize(vpos - cameraPosition);
        ${a.normalType===h.NormalType.ScreenDerivative?c.glsl`
                vec3 normal = screenDerivativeNormal(vPositionLocal);`:c.glsl`
                shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
        ${a.pbrMode===k.PBRMode.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

        vec3 posWorld = vpos + localOrigin;

        float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
        float shadow = ${a.receiveShadows?"readShadowMap(vpos, linearDepth)":a.spherical?"lightingGlobalFactor * (1.0 - additionalAmbientScale)":"0.0"};

        vec3 matColor = max(ambient, diffuse);
        ${a.hasVertexColors?c.glsl`
                vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:c.glsl`
                vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        ${a.hasNormalTexture?c.glsl`
                mat3 tangentSpace = ${a.hasVertexTangents?"computeTangentSpace(normal);":"computeTangentSpace(normal, vpos, vuv0);"}
                vec3 shadingNormal = computeTextureNormal(tangentSpace, ${a.hasNormalTextureTransform?c.glsl`normalUV`:"vuv0"});`:c.glsl`vec3 shadingNormal = normal;`}
        vec3 normalGround = ${a.spherical?c.glsl`normalize(posWorld);`:c.glsl`vec3(0.0, 0.0, 1.0);`}

        ${a.snowCover?c.glsl`
                float snow = smoothstep(0.5, 0.55, dot(normal, normalGround));
                albedo = mix(albedo, vec3(1), snow);
                shadingNormal = mix(shadingNormal, normal, snow);
                ssao = mix(ssao, 1.0, snow);`:""}

        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

        ${a.pbrMode===k.PBRMode.Normal||a.pbrMode===k.PBRMode.Schematic?c.glsl`
                float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                ${a.snowCover?c.glsl`
                        mrr = mix(mrr, vec3(0.0, 1.0, 0.04), snow);
                        emission = mix(emission, vec3(0.0), snow);`:""}

                vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:c.glsl`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        fragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${a.transparencyPassType===v.TransparencyPassType.ColorAlpha?c.glsl`
                  fragColor = premultiplyAlpha(fragColor);
                  fragAlpha = fragColor.a;`:""}
      }
    `)}b.include(J.DefaultMaterialAuxiliaryPasses,a);return b}const Y=Object.freeze(Object.defineProperty({__proto__:null,build:w},Symbol.toStringTag,{value:"Module"}));q.DefaultMaterial=Y;q.build=w});