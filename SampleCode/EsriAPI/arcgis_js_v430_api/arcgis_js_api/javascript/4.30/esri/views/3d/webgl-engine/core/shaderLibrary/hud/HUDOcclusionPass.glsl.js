// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define(["exports","./AlignPixel.glsl","../shading/MultipassTerrainTest.glsl","../../shaderModules/interfaces"],function(d,f,g,b){d.HUDOcclusionPass=function(c,a){const {vertex:e,fragment:h}=c;e.include(f.AlignPixel);a.multipassEnabled&&c.varyings.add("depth","float");e.code.add(b.glsl`
  void main(void) {
    vec4 posProjCenter;
    if (dot(position, position) > 0.0) {
      // Render single point to center of the pixel to avoid subpixel filtering to affect the marker color
      ProjectHUDAux projectAux;
      vec4 posProj = projectPositionHUD(projectAux);
      posProjCenter = alignToPixelCenter(posProj, viewport.zw);

      ${a.multipassEnabled?"depth \x3d projectAux.posView.z;":""}
      vec3 vpos = projectAux.posModel;
      if (rejectBySlice(vpos)) {
        // Project out of clip space
        posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
      }

    } else {
      // Project out of clip space
      posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
    }

    gl_Position = posProjCenter;
    gl_PointSize = 1.0;
  }
  `);c.include(g.multipassTerrainTest,a);h.code.add(b.glsl`
  void main() {
    fragColor = vec4(1);
    ${a.multipassEnabled?b.glsl`
        if(terrainDepthTest(depth)) {
          fragColor.g = 0.5;
        }`:""}
  }
  `)};Object.defineProperty(d,Symbol.toStringTag,{value:"Module"})});