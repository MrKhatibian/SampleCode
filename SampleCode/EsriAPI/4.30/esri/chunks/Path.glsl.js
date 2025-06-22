// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("exports ../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl ../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput ../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl ../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/ObjectAndLayerIdColor.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/PathVertexPosition.glsl ../views/3d/webgl-engine/core/shaderLibrary/output/OutputDepth.glsl ../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateAmbientOcclusion.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateSceneLighting.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassTerrainTest.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/Normals.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/NormalUtils.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl ../views/3d/webgl-engine/core/shaderModules/Float3PassUniform ../views/3d/webgl-engine/core/shaderModules/FloatPassUniform ../views/3d/webgl-engine/core/shaderModules/interfaces ../views/3d/webgl-engine/core/shaderModules/ShaderBuilder ../views/3d/webgl-engine/lib/TransparencyPassType".split(" "),
function(p,q,c,h,k,w,x,y,z,A,l,B,C,D,r,t,E,m,n,F,d,G,u){function v(a){const b=new G.ShaderBuilder,{vertex:f,fragment:e}=b;m.addProjViewLocalOrigin(f,a);b.varyings.add("vpos","vec3");b.include(x.PathVertexPosition,a);if(a.output===c.ShaderOutput.Color||a.output===c.ShaderOutput.ObjectAndLayerIdColor)b.include(k.Transform,a),b.include(t.ReadShadowMapDraw,a),b.include(q.ForwardLinearDepth,a),b.include(w.ObjectAndLayerIdColor,a),b.varyings.add("vnormal","vec3"),b.varyings.add("vcolor","vec4"),a.multipassEnabled&&
b.varyings.add("depth","float"),f.code.add(d.glsl`
      void main() {
        vpos = calculateVPos();
        vnormal = normalize(localNormal());

        ${a.multipassEnabled?"depth \x3d (view * vec4(vpos, 1.0)).z;":""}
        gl_Position = transformPosition(proj, view, vpos);

        ${a.output===c.ShaderOutput.Color?"forwardLinearDepth();":""}
        forwardObjectAndLayerIdColor();

        vcolor = getColor();
      }
    `);b.include(C.multipassTerrainTest,a);switch(a.output){case c.ShaderOutput.Color:b.include(h.SliceDraw,a);b.include(l.EvaluateSceneLighting,a);b.include(A.EvaluateAmbientOcclusion,a);b.include(t.ReadShadowMapDraw,a);b.include(D.Normals,a);m.addCameraPosition(e,a);l.addAmbientBoostFactor(e);l.addLightingGlobalFactor(e);e.uniforms.add(f.uniforms.get("localOrigin"),new n.Float3PassUniform("ambient",g=>g.ambient),new n.Float3PassUniform("diffuse",g=>g.diffuse),new n.Float3PassUniform("specular",
g=>g.specular),new F.FloatPassUniform("opacity",g=>g.opacity));e.include(E.ColorConversion);a.transparencyPassType===u.TransparencyPassType.ColorAlpha&&(b.outputs.add("fragColor","vec4",0),b.outputs.add("fragAlpha","float",1));B.addMainLightIntensity(e);e.code.add(d.glsl`
        void main() {
          discardBySlice(vpos);
          ${a.multipassEnabled?"terrainDepthTest(depth);":""}

          shadingParams.viewDirection = normalize(vpos - cameraPosition);
          shadingParams.normalView = vnormal;
          vec3 normal = shadingNormal(shadingParams);
          float ssao = evaluateAmbientOcclusionInverse();

          float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
          vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
          ${a.receiveShadows?"float shadow \x3d readShadowMap(vpos, linearDepth);":a.spherical?"float shadow \x3d lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow \x3d 0.0;"}
          vec3 albedo = vcolor.rgb * max(ambient, diffuse); // combine the old material parameters into a single one
          float combinedOpacity = vcolor.a * opacity;
          albedo += 0.25 * specular; // don't completely ignore specular for now

          vec3 shadedColor = evaluateSceneLighting(normal, albedo, shadow, 1.0 - ssao, additionalLight);
          fragColor = vec4(shadedColor, combinedOpacity);
          fragColor = highlightSlice(fragColor, vpos);
          ${a.transparencyPassType===u.TransparencyPassType.ColorAlpha?d.glsl`
                  fragColor = premultiplyAlpha(fragColor);
                  fragAlpha = fragColor.a;`:""}
        }
      `);break;case c.ShaderOutput.Depth:b.include(k.Transform,a);f.code.add(d.glsl`void main() {
vpos = calculateVPos();
gl_Position = transformPosition(proj, view, vpos);
}`);b.include(h.SliceDraw,a);e.code.add(d.glsl`void main() {
discardBySlice(vpos);
}`);break;case c.ShaderOutput.Shadow:case c.ShaderOutput.ShadowHighlight:case c.ShaderOutput.ShadowExcludeHighlight:case c.ShaderOutput.ViewshedShadow:b.include(k.Transform,a);q.addNearFar(b);b.varyings.add("depth","float");f.code.add(d.glsl`void main() {
vpos = calculateVPos();
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
}`);b.include(h.SliceDraw,a);b.include(y.OutputDepth,a);e.code.add(d.glsl`void main() {
discardBySlice(vpos);
outputDepth(depth);
}`);break;case c.ShaderOutput.ObjectAndLayerIdColor:b.include(h.SliceDraw,a);e.code.add(d.glsl`void main() {
discardBySlice(vpos);
outputObjectAndLayerIdColor();
}`);break;case c.ShaderOutput.Normal:b.include(k.Transform,a);b.include(r.NormalUtils,a);m.addViewNormal(f);b.varyings.add("vnormal","vec3");f.code.add(d.glsl`void main(void) {
vpos = calculateVPos();
vnormal = normalize((viewNormal * vec4(localNormal(), 1.0)).xyz);
gl_Position = transformPosition(proj, view, vpos);
}`);b.include(h.SliceDraw,a);e.code.add(d.glsl`void main() {
discardBySlice(vpos);
vec3 normal = normalize(vnormal);
if (gl_FrontFacing == false) normal = -normal;
fragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);
}`);break;case c.ShaderOutput.Highlight:b.include(k.Transform,a),b.include(r.NormalUtils,a),b.varyings.add("vnormal","vec3"),f.code.add(d.glsl`void main(void) {
vpos = calculateVPos();
gl_Position = transformPosition(proj, view, vpos);
}`),b.include(h.SliceDraw,a),b.include(z.OutputHighlight,a),e.code.add(d.glsl`void main() {
discardBySlice(vpos);
outputHighlight();
}`)}return b}const H=Object.freeze(Object.defineProperty({__proto__:null,build:v},Symbol.toStringTag,{value:"Module"}));p.Path=H;p.build=v});