// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("exports ./vec32 ../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl ../views/3d/webgl-engine/core/shaderLibrary/output/ReadDepth.glsl ../views/3d/webgl-engine/core/shaderModules/Float2DrawUniform ../views/3d/webgl-engine/core/shaderModules/FloatPassUniform ../views/3d/webgl-engine/core/shaderModules/interfaces ../views/3d/webgl-engine/core/shaderModules/ShaderBuilder ../views/3d/webgl-engine/core/shaderModules/Texture2DDrawUniform ../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform".split(" "),
function(f,h,k,l,m,n,b,p,q,r){function g(){const d=new p.ShaderBuilder,e=d.fragment;d.include(k.ScreenSpacePass);e.include(l.ReadDepth);e.uniforms.add(new r.Texture2DPassUniform("depthMap",a=>a.depthTexture),new q.Texture2DDrawUniform("tex",a=>a.colorTexture),new m.Float2DrawUniform("blurSize",a=>a.blurSize),new n.FloatPassUniform("projScale",(a,c)=>{c=h.distance(c.camera.eye,c.camera.center);return 5E4<c?Math.max(0,a.projScale-(c-5E4)):a.projScale}));e.code.add(b.glsl`
    void blurFunction(vec2 uv, float r, float center_d, float sharpness, inout float wTotal, inout float bTotal) {
      float c = texture(tex, uv).r;
      float d = linearDepthFromTexture(depthMap, uv);

      float ddiff = d - center_d;

      float w = exp(-r * r * ${b.glsl.float(.08)} - ddiff * ddiff * sharpness);
      wTotal += w;
      bTotal += w * c;
    }
  `);d.outputs.add("fragBlur","float");e.code.add(b.glsl`
    void main(void) {
      float b = 0.0;
      float w_total = 0.0;

      float center_d = linearDepthFromTexture(depthMap, uv);

      float sharpness = -0.05 * projScale / center_d;
      for (int r = -${b.glsl.int(4)}; r <= ${b.glsl.int(4)}; ++r) {
        float rf = float(r);
        vec2 uvOffset = uv + rf * blurSize;
        blurFunction(uvOffset, rf, center_d, sharpness, w_total, b);
      }

      fragBlur = b / w_total;
    }
  `);return d}const t=Object.freeze(Object.defineProperty({__proto__:null,build:g},Symbol.toStringTag,{value:"Module"}));f.SSAOBlur=t;f.build=g});