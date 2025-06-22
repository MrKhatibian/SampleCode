// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("exports ../../../../../../core/libs/gl-matrix-2/math/mat4 ../../../../../../core/libs/gl-matrix-2/factories/mat4f64 ../../../../../../core/libs/gl-matrix-2/factories/vec3f64 ./CameraSpace.glsl ../../shaderModules/interfaces ../../shaderModules/Matrix4PassUniform".split(" "),function(a,d,f,g,h,e,k){class l extends e.NoParameters{constructor(){super(...arguments);this.localOrigin=g.zeros()}}a.LocalFromScreenSpace=function(b){b.include(h.CameraSpace);b.fragment.uniforms.add(new k.Matrix4PassUniform("inverseViewMatrix",
(m,n)=>{const c=f.create();d.translate(c,n.camera.viewMatrix,m.localOrigin);return d.invertOrIdentity(c,c)}));b.fragment.code.add(e.glsl`vec4 reconstructLocalPosition(vec2 coord, float linearDepth) {
vec4 cameraSpace = vec4(reconstructPosition(coord, linearDepth), 1.0);
return inverseViewMatrix * cameraSpace;
}`)};a.LocalFromScreenSpacePassParameters=l;Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})});