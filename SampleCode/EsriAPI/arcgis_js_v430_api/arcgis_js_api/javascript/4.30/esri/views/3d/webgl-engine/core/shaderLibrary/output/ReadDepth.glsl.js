// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("exports ../../../../../../core/libs/gl-matrix-2/math/vec2 ../../../../../../core/libs/gl-matrix-2/factories/vec2f64 ../util/RgbaFloatEncoding.glsl ../../shaderModules/Float2PassUniform ../../shaderModules/interfaces".split(" "),function(c,e,f,g,h,b){const k=f.create();c.ReadDepth=function(a){a.uniforms.add(new h.Float2PassUniform("zProjectionMap",(d,l)=>{d=l.camera.projectionMatrix;return e.set(k,d[14],d[10])}));a.code.add(b.glsl`float linearizeDepth(float depth) {
float depthNdc = depth * 2.0 - 1.0;
float c1 = zProjectionMap[0];
float c2 = zProjectionMap[1];
return -(c1 / (depthNdc + c2 + 1e-7));
}`);a.code.add(b.glsl`float depthFromTexture(sampler2D depthTexture, vec2 uv) {
ivec2 iuv = ivec2(uv * vec2(textureSize(depthTexture, 0)));
float depth = texelFetch(depthTexture, iuv, 0).r;
return depth;
}`);a.code.add(b.glsl`float linearDepthFromTexture(sampler2D depthTexture, vec2 uv) {
return linearizeDepth(depthFromTexture(depthTexture, uv));
}`)};c.ReadLinearDepth=function(a){a.include(g.RgbaFloatEncoding);a.code.add(b.glsl`float linearDepthFromFloat(float depth, vec2 nearFar) {
return -(depth * (nearFar[1] - nearFar[0]) + nearFar[0]);
}
float linearDepthFromRGBA(vec4 depth, vec2 nearFar) {
return linearDepthFromFloat(rgba2float(depth), nearFar);
}
float linearDepthFromTexture(sampler2D depthTexture, vec2 uv, vec2 nearFar) {
ivec2 iuv = ivec2(uv * vec2(textureSize(depthTexture, 0)));
return linearDepthFromRGBA(texelFetch(depthTexture, iuv, 0), nearFar);
}`)};Object.defineProperty(c,Symbol.toStringTag,{value:"Module"})});