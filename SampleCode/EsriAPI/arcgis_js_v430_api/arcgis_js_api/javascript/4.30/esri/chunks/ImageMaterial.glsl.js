// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("exports ../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput ../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl ../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassTerrainTest.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/AlphaCutoff ../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl ../views/3d/webgl-engine/core/shaderModules/FloatPassUniform ../views/3d/webgl-engine/core/shaderModules/interfaces ../views/3d/webgl-engine/core/shaderModules/ShaderBuilder ../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform ../views/3d/webgl-engine/lib/TransparencyPassType ../views/3d/webgl-engine/lib/VertexAttribute".split(" "),
function(g,m,n,p,q,r,t,u,v,c,w,x,h,d){function k(b){const a=new w.ShaderBuilder,{vertex:l,fragment:e}=a;u.addProjViewLocalOrigin(l,b);a.include(p.Transform,b);a.attributes.add(d.VertexAttribute.POSITION,"vec3");a.attributes.add(d.VertexAttribute.UV0,"vec2");b.perspectiveInterpolation&&a.attributes.add(d.VertexAttribute.PERSPECTIVEDIVIDE,"float");a.varyings.add("vpos","vec3");b.multipassEnabled&&a.varyings.add("depth","float");l.code.add(c.glsl`
    void main(void) {
      vpos = position;
      ${b.multipassEnabled?"depth \x3d (view * vec4(vpos, 1.0)).z;":""}
      vTexCoord = uv0;
      gl_Position = transformPosition(proj, view, vpos);

      ${b.perspectiveInterpolation?"gl_Position *\x3d perspectiveDivide;":""}
    }
  `);a.include(n.SliceDraw,b);a.include(q.multipassTerrainTest,b);e.uniforms.add(new x.Texture2DPassUniform("tex",f=>f.texture),new v.FloatPassUniform("opacity",f=>f.opacity));a.varyings.add("vTexCoord","vec2");b.transparencyPassType===h.TransparencyPassType.ColorAlpha&&(a.outputs.add("fragColor","vec4",0),a.outputs.add("fragAlpha","float",1));e.include(t.ColorConversion);e.code.add(c.glsl`
    void main() {
      discardBySlice(vpos);
      ${b.multipassEnabled?"terrainDepthTest(depth);":""}
      fragColor = texture(tex, vTexCoord) * opacity;

      if (fragColor.a < ${c.glsl.float(r.defaultMaskAlphaCutoff)}) {
        discard;
      }

      fragColor = highlightSlice(fragColor, vpos);
      ${b.transparencyPassType===h.TransparencyPassType.ColorAlpha?c.glsl`
              fragColor = premultiplyAlpha(fragColor);
              fragAlpha = fragColor.a;`:""}
      ${b.output===m.ShaderOutput.ObjectAndLayerIdColor?c.glsl`
              fragColor = vec4(0,0,0,1);`:""}
    }
    `);return a}const y=Object.freeze(Object.defineProperty({__proto__:null,build:k},Symbol.toStringTag,{value:"Module"}));g.ImageMaterial=y;g.build=k});