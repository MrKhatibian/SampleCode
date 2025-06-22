// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("exports ../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput ../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl ../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/ObjectAndLayerIdColor.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl ../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassTerrainTest.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/VisualVariables.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/AlphaCutoff ../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl ../views/3d/webgl-engine/core/shaderModules/Float4PassUniform ../views/3d/webgl-engine/core/shaderModules/interfaces ../views/3d/webgl-engine/core/shaderModules/ShaderBuilder ../views/3d/webgl-engine/lib/TransparencyPassType ../views/3d/webgl-engine/lib/VertexAttribute".split(" "),
function(h,d,r,t,u,v,w,x,y,z,A,B,C,c,D,k,l){function m(a){const b=new D.ShaderBuilder,{vertex:f,fragment:n,attributes:p,varyings:g}=b;B.addProjViewLocalOrigin(f,a);b.include(t.Transform,a);b.include(v.VertexColor,a);b.include(y.VisualVariables,a);b.include(u.ObjectAndLayerIdColor,a);p.add(l.VertexAttribute.POSITION,"vec3");a.vvColor&&p.add(l.VertexAttribute.COLORFEATUREATTRIBUTE,"float");g.add("vColor","vec4");g.add("vpos","vec3");const e=a.multipassEnabled&&a.output===d.ShaderOutput.Color;e&&g.add("depth",
"float");f.uniforms.add(new C.Float4PassUniform("eColor",E=>E.color));f.code.add(c.glsl`
    void main(void) {
      vpos = position;
      forwardNormalizedVertexColor();
      forwardObjectAndLayerIdColor();

      ${a.hasVertexColors?"vColor *\x3d eColor;":a.vvColor?"vColor \x3d eColor * interpolateVVColor(colorFeatureAttribute);":"vColor \x3d eColor;"}
      ${e?"depth \x3d (view * vec4(vpos, 1.0)).z;":""}
      gl_Position = transformPosition(proj, view, vpos);
    }
  `);b.include(r.SliceDraw,a);e&&b.include(x.multipassTerrainTest,a);n.include(A.ColorConversion);const q=a.output===d.ShaderOutput.Highlight;q&&b.include(w.OutputHighlight,a);a.transparencyPassType===k.TransparencyPassType.ColorAlpha&&(b.outputs.add("fragColor","vec4",0),b.outputs.add("fragAlpha","float",1));n.code.add(c.glsl`
  void main() {
    discardBySlice(vpos);
    ${e?"terrainDepthTest(depth);":""}
    vec4 fColor = vColor;

    ${a.output===d.ShaderOutput.ObjectAndLayerIdColor?c.glsl`fColor.a = 1.0;`:""}

    if (fColor.a < ${c.glsl.float(z.symbolAlphaCutoff)}) {
      discard;
    }

    ${a.output===d.ShaderOutput.Color?c.glsl`fragColor = highlightSlice(fColor, vpos); ${a.transparencyPassType===k.TransparencyPassType.ColorAlpha?c.glsl`
                  fragColor = premultiplyAlpha(fragColor);
                  fragAlpha = fragColor.a;`:""}`:""}
    ${q?c.glsl`outputHighlight();`:""};
    ${a.output===d.ShaderOutput.ObjectAndLayerIdColor?c.glsl`outputObjectAndLayerIdColor();`:""}
  }
  `);return b}const F=Object.freeze(Object.defineProperty({__proto__:null,build:m},Symbol.toStringTag,{value:"Module"}));h.ColorMaterial=F;h.build=m});