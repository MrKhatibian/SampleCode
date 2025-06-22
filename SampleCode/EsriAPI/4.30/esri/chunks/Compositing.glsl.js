// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("exports ../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl ../views/3d/webgl-engine/core/shaderLibrary/output/ReadDepth.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/RgbaFloatEncoding.glsl ../views/3d/webgl-engine/core/shaderModules/Float2PassUniform ../views/3d/webgl-engine/core/shaderModules/FloatPassUniform ../views/3d/webgl-engine/core/shaderModules/interfaces ../views/3d/webgl-engine/core/shaderModules/ShaderBuilder ../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform".split(" "),
function(e,h,k,l,m,n,b,p,q){function f(c){const a=new p.ShaderBuilder;a.include(h.ScreenSpacePass);a.fragment.uniforms.add(new q.Texture2DPassUniform("tex",d=>d.texture));c.hasOpacityFactor&&a.fragment.uniforms.add(new n.FloatPassUniform("opacity",d=>d.opacity));c.isDepthBlit&&(a.fragment.uniforms.add(new m.Float2PassUniform("nearFar",(d,r)=>r.camera.nearFar)),a.fragment.include(k.ReadDepth),a.fragment.include(l.RgbaFloatEncoding));a.fragment.code.add(b.glsl`
    void main() {
      ${c.isDepthBlit?b.glsl`
              float normalizedLinearDepth = (-linearDepthFromTexture(tex, uv) - nearFar[0]) / (nearFar[1] - nearFar[0]);
              fragColor = float2rgba(normalizedLinearDepth);`:b.glsl`
              fragColor = texture(tex, uv) ${c.hasOpacityFactor?"* opacity":""};`}
    }`);return a}class g extends b.NoParameters{constructor(){super(...arguments);this.opacity=1}}const t=Object.freeze(Object.defineProperty({__proto__:null,CompositingPassParameters:g,build:f},Symbol.toStringTag,{value:"Module"}));e.Compositing=t;e.CompositingPassParameters=g;e.build=f});