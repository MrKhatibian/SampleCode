// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("exports ../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl ../views/3d/webgl-engine/core/shaderLibrary/Offset.glsl ../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput ../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl ../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/InstancedDoublePrecision.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/NormalAttribute.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/PositionAttribute.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/SymbolColor.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/TextureCoordinateAttribute.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/VerticalOffset.glsl ../views/3d/webgl-engine/core/shaderLibrary/default/DefaultMaterialAuxiliaryPasses.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateAmbientOcclusion.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateSceneLighting.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassTerrainTest.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRendering.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/VisualVariables.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/AlphaCutoff ../views/3d/webgl-engine/core/shaderLibrary/util/AlphaDiscard.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/MixExternalColor.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl ../views/3d/webgl-engine/core/shaderModules/Float3PassUniform ../views/3d/webgl-engine/core/shaderModules/Float4PassUniform ../views/3d/webgl-engine/core/shaderModules/FloatPassUniform ../views/3d/webgl-engine/core/shaderModules/interfaces ../views/3d/webgl-engine/core/shaderModules/ShaderBuilder ../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform ../views/3d/webgl-engine/lib/TransparencyPassType ../views/3d/webgl-engine/lib/VertexAttribute".split(" "),
function(m,w,x,n,y,z,A,B,C,D,E,F,G,H,I,k,p,J,K,f,q,L,M,N,O,l,r,P,t,c,Q,R,u,S){function v(a){const b=new Q.ShaderBuilder,{vertex:g,fragment:e,varyings:h}=b;l.addProjViewLocalOrigin(g,a);b.include(C.PositionAttribute);h.add("vpos","vec3");b.include(L.VisualVariables,a);b.include(A.InstancedDoublePrecision,a);b.include(G.VerticalOffset,a);a.output===n.ShaderOutput.Color&&(l.addCameraPosition(b.vertex,a),b.include(B.NormalAttribute,a),b.include(z.Transform,a),a.offsetBackfaces&&b.include(x.Offset),a.instancedColor&&
b.attributes.add(S.VertexAttribute.INSTANCECOLOR,"vec4"),h.add("vNormalWorld","vec3"),h.add("localvpos","vec3"),a.multipassEnabled&&h.add("depth","float"),b.include(E.TextureCoordinateAttribute,a),b.include(w.ForwardLinearDepth,a),b.include(D.SymbolColor,a),b.include(F.VertexColor,a),g.uniforms.add(new P.Float4PassUniform("externalColor",d=>d.externalColor)),h.add("vcolorExt","vec4"),g.code.add(c.glsl`
        void main(void) {
          forwardNormalizedVertexColor();
          vcolorExt = externalColor;
          ${a.instancedColor?"vcolorExt *\x3d instanceColor * 0.003921568627451;":""}
          vcolorExt *= vvColor();
          vcolorExt *= getSymbolColor();
          forwardColorMixMode();

          if (vcolorExt.a < ${c.glsl.float(M.symbolAlphaCutoff)}) {
            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          } else {
            vpos = getVertexInLocalOriginSpace();
            localvpos = vpos - view[3].xyz;
            vpos = subtractOrigin(vpos);
            vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            ${a.offsetBackfaces?"gl_Position \x3d offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
          }
          ${a.multipassEnabled?c.glsl`depth = (view * vec4(vpos, 1.0)).z;`:""}
          forwardLinearDepth();
          forwardTextureCoordinates();
        }
      `));a.output===n.ShaderOutput.Color&&(b.include(y.SliceDraw,a),b.include(k.EvaluateSceneLighting,a),b.include(I.EvaluateAmbientOcclusion,a),b.include(N.DiscardOrAdjustAlphaPass,a),b.include(a.instancedDoublePrecision?q.ReadShadowMapPass:q.ReadShadowMapDraw,a),b.include(J.multipassTerrainTest,a),l.addCameraPosition(b.fragment,a),p.addMainLightDirection(e),k.addAmbientBoostFactor(e),k.addLightingGlobalFactor(e),e.uniforms.add(g.uniforms.get("localOrigin"),g.uniforms.get("view"),new r.Float3PassUniform("ambient",
d=>d.ambient),new r.Float3PassUniform("diffuse",d=>d.diffuse),new t.FloatPassUniform("opacity",d=>d.opacity),new t.FloatPassUniform("layerOpacity",d=>d.layerOpacity)),a.hasColorTexture&&e.uniforms.add(new R.Texture2DPassUniform("tex",d=>d.texture)),b.include(f.PhysicallyBasedRenderingParameters,a),b.include(K.PhysicallyBasedRendering,a),e.include(O.MixExternalColor),a.transparencyPassType===u.TransparencyPassType.ColorAlpha&&(b.outputs.add("fragColor","vec4",0),b.outputs.add("fragAlpha","float",1)),
p.addMainLightIntensity(e),e.code.add(c.glsl`
      void main() {
        discardBySlice(vpos);
        ${a.multipassEnabled?c.glsl`terrainDepthTest(depth);`:""}
        ${a.hasColorTexture?c.glsl`
                vec4 texColor = texture(tex, ${a.hasColorTextureTransform?c.glsl`colorUV`:c.glsl`vuv0`});
                ${a.textureAlphaPremultiplied?"texColor.rgb /\x3d texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:c.glsl`vec4 texColor = vec4(1.0);`}
        vec3 viewDirection = normalize(vpos - cameraPosition);
        ${a.pbrMode===f.PBRMode.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        ${a.receiveShadows?"float shadow \x3d readShadowMap(vpos, linearDepth);":a.spherical?"float shadow \x3d lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow \x3d 0.0;"}
        vec3 matColor = max(ambient, diffuse);
        ${a.hasVertexColors?c.glsl`
                vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:c.glsl`
                vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        ${a.snowCover?c.glsl`albedo = mix(albedo, vec3(1), 0.9);`:c.glsl``}
        ${c.glsl`
            vec3 shadingNormal = normalize(vNormalWorld);
            albedo *= 1.2;
            vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
            float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
            float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
            float treeRadialFalloff = vColor.r;
            float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
            additionalLight += backLightFactor * mainLightIntensity;`}
        ${a.pbrMode===f.PBRMode.Normal||a.pbrMode===f.PBRMode.Schematic?a.spherical?c.glsl`vec3 normalGround = normalize(vpos + localOrigin);`:c.glsl`vec3 normalGround = vec3(0.0, 0.0, 1.0);`:c.glsl``}
        ${a.pbrMode===f.PBRMode.Normal||a.pbrMode===f.PBRMode.Schematic?c.glsl`
                float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                ${a.snowCover?c.glsl`
                        mrr = vec3(0.0, 1.0, 0.04);
                        emission = vec3(0.0);`:""}

                vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:c.glsl`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        fragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${a.transparencyPassType===u.TransparencyPassType.ColorAlpha?c.glsl`
                fragColor = premultiplyAlpha(fragColor);
                fragAlpha = fragColor.a;`:""}
      }
    `));b.include(H.DefaultMaterialAuxiliaryPasses,a);return b}const T=Object.freeze(Object.defineProperty({__proto__:null,build:v},Symbol.toStringTag,{value:"Module"}));m.RealisticTree=T;m.build=v});