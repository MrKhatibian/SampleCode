// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("exports ../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl ../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput ../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl ../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/ObjectAndLayerIdColor.glsl ../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateAmbientLighting.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassTerrainTest.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/NormalUtils.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/Water.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/WaterDistortion.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/AlphaCutoff ../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl ../views/3d/webgl-engine/core/shaderModules/Float4PassUniform ../views/3d/webgl-engine/core/shaderModules/FloatPassUniform ../views/3d/webgl-engine/core/shaderModules/interfaces ../views/3d/webgl-engine/core/shaderModules/ShaderBuilder ../views/3d/webgl-engine/lib/TransparencyPassType ../views/3d/webgl-engine/lib/VertexAttribute".split(" "),
function(n,x,f,l,y,z,A,B,m,C,p,D,E,F,q,h,G,r,H,t,c,I,u,v){function w(b){const a=new I.ShaderBuilder,{vertex:d,fragment:e}=a;r.addProjViewLocalOrigin(d,b);a.include(y.Transform,b);a.attributes.add(v.VertexAttribute.POSITION,"vec3");a.attributes.add(v.VertexAttribute.UV0,"vec2");const g=new H.Float4PassUniform("waterColor",k=>k.color);if(b.output===f.ShaderOutput.Color&&b.draped)return a.varyings.add("vpos","vec3"),d.uniforms.add(g),d.code.add(c.glsl`
        void main(void) {
          if (waterColor.a < ${c.glsl.float(h.symbolAlphaCutoff)}) {
            // Discard this vertex
            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
            return;
          }

          vpos = position;
          gl_Position = transformPosition(proj, view, vpos);
        }
    `),e.uniforms.add(g),e.code.add(c.glsl`void main() {
fragColor = waterColor;
}`),a;b.output===f.ShaderOutput.Color&&(a.include(p.NormalUtils,b),a.include(x.ForwardLinearDepth,b),a.varyings.add("vuv","vec2"),a.varyings.add("vpos","vec3"),a.varyings.add("vnormal","vec3"),a.varyings.add("vtbnMatrix","mat3"),b.multipassEnabled&&a.varyings.add("depth","float"),d.uniforms.add(g),d.code.add(c.glsl`
      void main(void) {
        if (waterColor.a < ${c.glsl.float(h.symbolAlphaCutoff)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vuv = uv0;
        vpos = position;

        vnormal = getLocalUp(vpos, localOrigin);
        vtbnMatrix = getTBNMatrix(vnormal);

        ${b.multipassEnabled?"depth \x3d (view * vec4(vpos, 1.0)).z;":""}

        gl_Position = transformPosition(proj, view, vpos);
        ${b.output===f.ShaderOutput.Color?"forwardLinearDepth();":""}
      }
    `));a.include(C.multipassTerrainTest,b);switch(b.output){case f.ShaderOutput.Color:a.include(m.MainLighting);a.include(B.EvaluateAmbientLighting,{pbrMode:D.PBRMode.Disabled,lightingSphericalHarmonicsOrder:2});a.include(q.WaterDistortion);a.include(l.SliceDraw,b);a.include(E.ReadShadowMapDraw,b);a.include(F.Water,b);e.uniforms.add(g,new t.FloatPassUniform("timeElapsed",k=>k.timeElapsed),d.uniforms.get("view"),d.uniforms.get("localOrigin"));r.addCameraPosition(e,b);e.include(G.ColorConversion);
b.transparencyPassType===u.TransparencyPassType.ColorAlpha&&(a.outputs.add("fragColor","vec4",0),a.outputs.add("fragAlpha","float",1));m.addMainLightDirection(e);m.addMainLightIntensity(e);e.code.add(c.glsl`
      void main() {
        discardBySlice(vpos);
        ${b.multipassEnabled?"terrainDepthTest(depth);":""}
        vec3 localUp = vnormal;
        // the created normal is in tangent space
        vec4 tangentNormalFoam = getSurfaceNormalAndFoam(vuv, timeElapsed);

        // we rotate the normal according to the tangent-bitangent-normal-Matrix
        vec3 n = normalize(vtbnMatrix * tangentNormalFoam.xyz);
        vec3 v = -normalize(vpos - cameraPosition);
        float shadow = ${b.receiveShadows?c.glsl`1.0 - readShadowMap(vpos, linearDepth)`:"1.0"};
        vec4 vPosView = view * vec4(vpos, 1.0);
        vec4 final = vec4(getSeaColor(n, v, mainLightDirection, waterColor.rgb, mainLightIntensity, localUp, shadow, tangentNormalFoam.w, vPosView.xyz, vpos + localOrigin), waterColor.w);

        // gamma correction
        fragColor = delinearizeGamma(final);
        fragColor = highlightSlice(fragColor, vpos);
        ${b.transparencyPassType===u.TransparencyPassType.ColorAlpha?c.glsl`
                fragColor = premultiplyAlpha(fragColor);
                fragAlpha = fragColor.a;`:""}
      }
    `);break;case f.ShaderOutput.Normal:a.include(p.NormalUtils,b);a.include(q.WaterDistortion,b);a.include(l.SliceDraw,b);a.varyings.add("vpos","vec3");a.varyings.add("vuv","vec2");d.uniforms.add(g);d.code.add(c.glsl`
        void main(void) {
          if (waterColor.a < ${c.glsl.float(h.symbolAlphaCutoff)}) {
            // Discard this vertex
            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
            return;
          }

          vuv = uv0;
          vpos = position;

          gl_Position = transformPosition(proj, view, vpos);
        }
    `);e.uniforms.add(new t.FloatPassUniform("timeElapsed",k=>k.timeElapsed));e.code.add(c.glsl`void main() {
discardBySlice(vpos);
vec4 tangentNormalFoam = getSurfaceNormalAndFoam(vuv, timeElapsed);
tangentNormalFoam.xyz = normalize(tangentNormalFoam.xyz);
fragColor = vec4((tangentNormalFoam.xyz + vec3(1.0)) * 0.5, tangentNormalFoam.w);
}`);break;case f.ShaderOutput.Highlight:a.include(A.OutputHighlight,b);a.varyings.add("vpos","vec3");d.uniforms.add(g);d.code.add(c.glsl`
      void main(void) {
        if (waterColor.a < ${c.glsl.float(h.symbolAlphaCutoff)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vpos = position;
        gl_Position = transformPosition(proj, view, vpos);
      }
    `);a.include(l.SliceDraw,b);e.code.add(c.glsl`void main() {
discardBySlice(vpos);
outputHighlight();
}`);break;case f.ShaderOutput.ObjectAndLayerIdColor:a.include(z.ObjectAndLayerIdColor,b),a.varyings.add("vpos","vec3"),d.uniforms.add(g),d.code.add(c.glsl`
      void main(void) {
        if (waterColor.a < ${c.glsl.float(h.symbolAlphaCutoff)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vpos = position;
        gl_Position = transformPosition(proj, view, vpos);
        forwardObjectAndLayerIdColor();
      }
    `),a.include(l.SliceDraw,b),e.code.add(c.glsl`void main() {
discardBySlice(vpos);
outputObjectAndLayerIdColor();
}`)}return a}const J=Object.freeze(Object.defineProperty({__proto__:null,build:w},Symbol.toStringTag,{value:"Module"}));n.WaterSurface=J;n.build=w});