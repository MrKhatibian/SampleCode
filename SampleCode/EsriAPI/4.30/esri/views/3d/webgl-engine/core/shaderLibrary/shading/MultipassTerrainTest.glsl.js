// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define(["exports","../output/ReadDepth.glsl","../../shaderModules/interfaces","../../shaderModules/Texture2DPassUniform"],function(a,f,b,g){class h{constructor(){this.cullAboveGround=!1}}a.MultipassTerrainUniforms=h;a.multipassTerrainTest=function(c,d){if(d.multipassEnabled){c.fragment.include(f.ReadDepth);c.fragment.uniforms.add(new g.Texture2DPassUniform("terrainDepthTexture",(l,k)=>k.multipassTerrain.depth?.attachment));var e=d.occlusionPass;c.fragment.code.add(b.glsl`
   ${e?"bool":"void"} terrainDepthTest(float fragmentDepth) {
      float depth = texelFetch(terrainDepthTexture, ivec2(gl_FragCoord.xy), 0).r;
      float linearDepth = linearizeDepth(depth);
      ${e?b.glsl`return fragmentDepth < linearDepth && depth < 1.0;`:b.glsl`
          if(fragmentDepth ${d.cullAboveGround?"\x3e":"\x3c\x3d"} linearDepth){
            discard;
          }`}
    }`)}};Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})});