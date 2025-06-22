// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define(["exports","../output/ReadDepth.glsl","../../shaderModules/interfaces","../../shaderModules/Texture2DPassUniform"],function(a,c,d,e){class f{}a.MultipassGeometryUniforms=f;a.multipassGeometryTest=function(b){b.include(c.ReadDepth);b.uniforms.add(new e.Texture2DPassUniform("geometryDepthTexture",(h,g)=>g.multipassGeometry.depth?.attachment));b.code.add(d.glsl`bool geometryDepthTest(vec2 pos, float elementDepth) {
float geometryDepth = linearDepthFromTexture(geometryDepthTexture, pos);
return (elementDepth < (geometryDepth - 1.0));
}`)};Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})});