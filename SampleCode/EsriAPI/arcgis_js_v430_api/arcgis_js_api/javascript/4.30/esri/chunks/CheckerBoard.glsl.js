// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("exports ../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassTerrainTest.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl ../views/3d/webgl-engine/core/shaderModules/Float2PassUniform ../views/3d/webgl-engine/core/shaderModules/Float4PassUniform ../views/3d/webgl-engine/core/shaderModules/interfaces ../views/3d/webgl-engine/core/shaderModules/ShaderBuilder ../views/3d/webgl-engine/lib/TransparencyPassType ../views/3d/webgl-engine/lib/VertexAttribute".split(" "),
function(f,n,p,q,r,g,e,t,h,k){function l(b){const a=new t.ShaderBuilder,{vertex:m,fragment:c}=a;q.addProjViewLocalOrigin(m,b);a.attributes.add(k.VertexAttribute.POSITION,"vec3");a.attributes.add(k.VertexAttribute.UV0,"vec2");a.varyings.add("vUV","vec2");b.multipassEnabled&&a.varyings.add("depth","float");m.code.add(e.glsl`
    void main(void) {
      vUV = uv0;
      ${b.multipassEnabled?"depth \x3d (view * vec4(position, 1.0)).z;":""}
      gl_Position = proj * view * vec4(position, 1.0);
    }
  `);a.include(n.multipassTerrainTest,b);c.uniforms.add(new r.Float2PassUniform("size",d=>d.size));c.uniforms.add(new g.Float4PassUniform("color1",d=>d.color1));c.uniforms.add(new g.Float4PassUniform("color2",d=>d.color2));c.include(p.ColorConversion);b.transparencyPassType===h.TransparencyPassType.ColorAlpha&&(a.outputs.add("fragColor","vec4",0),a.outputs.add("fragAlpha","float",1));c.code.add(e.glsl`
    void main() {
      ${b.multipassEnabled?"terrainDepthTest(depth);":""}
      vec2 uvScaled = vUV / (2.0 * size);

      vec2 uv = fract(uvScaled - 0.25);
      vec2 ab = clamp((abs(uv - 0.5) - 0.25) / fwidth(uvScaled), -0.5, 0.5);
      float fade = smoothstep(0.25, 0.5, max(fwidth(uvScaled.x), fwidth(uvScaled.y)));
      float t = mix(abs(ab.x + ab.y), 0.5, fade);

      fragColor = mix(color2, color1, t);
      ${b.transparencyPassType===h.TransparencyPassType.ColorAlpha?e.glsl`
              fragColor = premultiplyAlpha(fragColor);
              fragAlpha = fragColor.a;`:""}
    }
  `);return a}const u=Object.freeze(Object.defineProperty({__proto__:null,build:l},Symbol.toStringTag,{value:"Module"}));f.CheckerBoard=u;f.build=l});