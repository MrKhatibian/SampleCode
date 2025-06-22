// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("exports ../core/libs/gl-matrix-2/factories/vec4f64 ../views/3d/webgl-engine/core/shaderLibrary/ScreenSizeScaling.glsl ../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput ../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl ../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassTerrainTest.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/AlphaCutoff ../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl ../views/3d/webgl-engine/core/shaderModules/Float3PassUniform ../views/3d/webgl-engine/core/shaderModules/Float4PassUniform ../views/3d/webgl-engine/core/shaderModules/interfaces ../views/3d/webgl-engine/core/shaderModules/ShaderBuilder ../views/3d/webgl-engine/lib/TransparencyPassType ../views/3d/webgl-engine/lib/VertexAttribute".split(" "),
function(r,n,x,p,y,z,A,B,C,t,D,u,d,E,v,q){function w(a){const c=new E.ShaderBuilder,l=a.multipassEnabled&&a.output===p.ShaderOutput.Color;c.include(z.Transform,a);c.include(x.ScreenSizeScaling,a);c.include(y.SliceDraw,a);const {vertex:h,fragment:f}=c;f.include(C.ColorConversion);t.addProjViewLocalOrigin(h,a);f.uniforms.add(new u.Float4PassUniform("uColor",b=>b.color));c.attributes.add(q.VertexAttribute.POSITION,"vec3");c.varyings.add("vWorldPosition","vec3");l&&c.varyings.add("depth","float");a.screenSizeEnabled&&
c.attributes.add(q.VertexAttribute.OFFSET,"vec3");a.shadingEnabled&&(t.addViewNormal(h),c.attributes.add(q.VertexAttribute.NORMAL,"vec3"),c.varyings.add("vViewNormal","vec3"));h.code.add(d.glsl`
    void main(void) {
      vWorldPosition = ${a.screenSizeEnabled?"screenSizeScaling(offset, position)":"position"};
  `);a.shadingEnabled&&h.code.add(d.glsl`vec3 worldNormal = normal;
vViewNormal = (viewNormal * vec4(worldNormal, 1)).xyz;`);h.code.add(d.glsl`
    ${l?"depth \x3d (view * vec4(vWorldPosition, 1.0)).z;":""}
    gl_Position = transformPosition(proj, view, vWorldPosition);
  }
  `);l&&c.include(A.multipassTerrainTest,a);f.code.add(d.glsl`
    void main() {
      discardBySlice(vWorldPosition);
      ${l?"terrainDepthTest(depth);":""}
    `);a.shadingEnabled?(f.uniforms.add(new D.Float3PassUniform("shadingDirection",b=>b.shadingDirection)),f.uniforms.add(new u.Float4PassUniform("shadedColor",b=>{{var e=b.shadingTint;b=b.color;const m=1-e[3],k=e[3]+b[3]*m;0===k?g[3]=k:(g[0]=(e[0]*e[3]+b[0]*b[3]*m)/k,g[1]=(e[1]*e[3]+b[1]*b[3]*m)/k,g[2]=(e[2]*e[3]+b[2]*b[3]*m)/k,g[3]=b[3]);e=g}return e})),f.code.add(d.glsl`vec3 viewNormalNorm = normalize(vViewNormal);
float shadingFactor = 1.0 - clamp(-dot(viewNormalNorm, shadingDirection), 0.0, 1.0);
vec4 finalColor = mix(uColor, shadedColor, shadingFactor);`)):f.code.add(d.glsl`vec4 finalColor = uColor;`);a.transparencyPassType===v.TransparencyPassType.ColorAlpha&&(c.outputs.add("fragColor","vec4",0),c.outputs.add("fragAlpha","float",1));f.code.add(d.glsl`
      ${a.output===p.ShaderOutput.ObjectAndLayerIdColor?d.glsl`finalColor.a = 1.0;`:""}
      if (finalColor.a < ${d.glsl.float(B.symbolAlphaCutoff)}) {
        discard;
      }

      ${a.output===p.ShaderOutput.Color?d.glsl`fragColor = highlightSlice(finalColor, vWorldPosition); ${a.transparencyPassType===v.TransparencyPassType.ColorAlpha?d.glsl`
                    fragColor = premultiplyAlpha(fragColor);
                    fragAlpha = fragColor.a;`:""}`:""}
    }
    `);return c}const g=n.create();n=Object.freeze(Object.defineProperty({__proto__:null,build:w},Symbol.toStringTag,{value:"Module"}));r.ShadedColorMaterialShader=n;r.build=w});