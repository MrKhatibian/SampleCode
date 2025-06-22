// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderModules/interfaces","../views/3d/webgl-engine/core/shaderModules/ShaderBuilder","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform"],function(c,h,a,k,e){function f(l){const b=new k.ShaderBuilder;b.include(h.ScreenSpacePass);b.fragment.uniforms.add(new e.Texture2DPassUniform("colorTexture",d=>d.color),new e.Texture2DPassUniform("depthTexture",d=>d.depth));b.fragment.code.add(a.glsl`
    void main() {
      float depthSample = texture(depthTexture, uv).r;
      if (depthSample ${l.haze?a.glsl`== 1.0`:a.glsl`!= 1.0`} ) {
          fragColor = vec4(0);
          return;
      }
      fragColor = texture(colorTexture, uv);
    }
    `);return b}class g extends a.NoParameters{}const m=Object.freeze(Object.defineProperty({__proto__:null,AtmosphereCompositingPassParameters:g,build:f},Symbol.toStringTag,{value:"Module"}));c.AtmosphereCompositing=m;c.AtmosphereCompositingPassParameters=g;c.build=f});