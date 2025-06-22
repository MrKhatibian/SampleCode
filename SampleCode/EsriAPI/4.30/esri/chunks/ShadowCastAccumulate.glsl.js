// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("exports ../core/libs/gl-matrix-2/math/mat4 ../core/libs/gl-matrix-2/factories/mat4f64 ../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl ../views/3d/webgl-engine/core/shaderLibrary/output/ReadDepth.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/CameraSpace.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/RgbaFloatEncoding.glsl ../views/3d/webgl-engine/core/shaderModules/interfaces ../views/3d/webgl-engine/core/shaderModules/Matrix4PassUniform ../views/3d/webgl-engine/core/shaderModules/ShaderBuilder ../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform".split(" "),
function(d,f,e,m,n,p,q,r,t,u,v,g){function h(w){const a=new v.ShaderBuilder,c=a.fragment;c.include(r.RgbaFloatEncoding);c.include(n.ReadDepth);a.include(q.CameraSpace);a.include(m.ScreenSpacePass);a.include(p.ReadShadowMapPass,w);c.uniforms.add(new g.Texture2DPassUniform("shadowMap",(k,b)=>b.shadowMap.depthTexture),new g.Texture2DPassUniform("depthMap",(k,b)=>b.depth?.attachment),new u.Matrix4PassUniform("inverseViewMatrix",(k,b)=>f.invert(l,f.translate(l,b.camera.viewMatrix,b.camera.center))));c.constants.add("sampleValue",
"float",x);a.outputs.add("sampleCount","float");c.code.add(t.glsl`void main(void) {
float depth = depthFromTexture(depthMap, uv);
if (depth >= 1.0 || depth <= 0.0) {
discard;
}
float currentPixelDepth = linearizeDepth(depth);
vec4 currentPixelPos = vec4(reconstructPosition(gl_FragCoord.xy, currentPixelDepth), 1.0);
vec4 worldSpacePos = inverseViewMatrix * currentPixelPos;
mat4 shadowMatrix;
float linearDepth = -currentPixelDepth;
int i = chooseCascade(linearDepth, shadowMatrix);
if (i >= numCascades) {
discard;
}
vec3 lvpos = lightSpacePosition(worldSpacePos.xyz, shadowMatrix);
if (lvpos.z >= 1.0 || lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) {
discard;
}
ivec2 texSize = textureSize(shadowMap, 0);
ivec2 uvShadow = ivec2(cascadeCoordinates(i, texSize, lvpos) * vec2(texSize));
float depthShadow = readShadowMapDepth(uvShadow, shadowMap);
bool shadow = depthShadow < lvpos.z;
if (!shadow) {
discard;
}
sampleCount = sampleValue;
}`);return a}const x=1/255,l=e.create();e=Object.freeze(Object.defineProperty({__proto__:null,ShadowCastMaxSamples:255,build:h},Symbol.toStringTag,{value:"Module"}));d.ShadowCastAccumulate=e;d.ShadowCastMaxSamples=255;d.build=h});