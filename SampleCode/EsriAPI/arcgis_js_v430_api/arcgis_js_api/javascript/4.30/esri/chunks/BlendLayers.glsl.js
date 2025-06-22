// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("exports ../views/3d/webgl-engine/core/shaderLibrary/terrain/BackgroundGrid.glsl ../views/3d/webgl-engine/core/shaderLibrary/terrain/BlendLayersOutput ../views/3d/webgl-engine/core/shaderLibrary/terrain/TileBackground.glsl ../views/3d/webgl-engine/core/shaderLibrary/terrain/TileComposite.glsl ../views/3d/webgl-engine/core/shaderModules/Float3PassUniform ../views/3d/webgl-engine/core/shaderModules/FloatPassUniform ../views/3d/webgl-engine/core/shaderModules/interfaces ../views/3d/webgl-engine/core/shaderModules/ShaderBuilder ../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform".split(" "),
function(b,h,k,l,m,n,p,e,q,r){function g(a){const c=new q.ShaderBuilder,f=c.fragment;c.include(m.TileComposite);if(a.background===b.BackgroundMode.Only)return(a=a.output===k.BlendLayersOutput.ColorComposite)?f.uniforms.add(new n.Float3PassUniform("backgroundColor",d=>d.backgroundColor)):f.include(h.BackgroundGrid),f.code.add(e.glsl`
      void main() {
        fragColor = vec4(${a?e.glsl`backgroundColor`:e.glsl`gridColor(uv)`}, 1.0);
      }
    `),c;c.include(l.TileBackground,a);f.uniforms.add(new r.Texture2DPassUniform("tex",d=>d.texture),new p.FloatPassUniform("opacity",d=>d.opacity)).code.add(e.glsl`void main() {
fragColor = blendLayers(uv, texture(tex, uv), opacity);
}`);return c}b.BackgroundMode=void 0;(function(a){a[a.BelowLayer=0]="BelowLayer";a[a.Only=1]="Only";a[a.COUNT=2]="COUNT"})(b.BackgroundMode||(b.BackgroundMode={}));const t=Object.freeze(Object.defineProperty({__proto__:null,get BackgroundMode(){return b.BackgroundMode},build:g},Symbol.toStringTag,{value:"Module"}));b.BlendLayers=t;b.build=g});