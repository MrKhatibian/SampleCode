// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("exports ../core/mathUtils ../core/libs/gl-matrix-2/math/mat4 ../core/libs/gl-matrix-2/factories/mat4f64 ../core/libs/gl-matrix-2/math/vec2 ../core/libs/gl-matrix-2/factories/vec2f64 ./vec32 ../core/libs/gl-matrix-2/factories/vec3f64 ../geometry/support/aaBoundingBox ../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput ../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl ../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/RgbaFloatEncoding.glsl ../views/3d/webgl-engine/core/shaderModules/Float2DrawUniform ../views/3d/webgl-engine/core/shaderModules/Float2PassUniform ../views/3d/webgl-engine/core/shaderModules/Float3DrawUniform ../views/3d/webgl-engine/core/shaderModules/interfaces ../views/3d/webgl-engine/core/shaderModules/Matrix4DrawUniform ../views/3d/webgl-engine/core/shaderModules/Matrix4PassUniform ../views/3d/webgl-engine/core/shaderModules/ShaderBuilder ../views/3d/webgl-engine/lib/VertexAttribute".split(" "),
function(h,g,q,m,n,H,r,I,t,u,v,J,K,w,L,x,f,M,N,O,y){function z(c){const e=new O.ShaderBuilder,k=c.output===u.ShaderOutput.Color,A=c.output===u.ShaderOutput.Highlight,{vertex:l,fragment:B}=e;e.include(v.SliceDraw,c);e.attributes.add(y.VertexAttribute.POSITION,"vec3");e.attributes.add(y.VertexAttribute.COLOR,"vec3");l.uniforms.add(new M.Matrix4DrawUniform("modelView",(a,b)=>q.multiply(C,b.camera.viewMatrix,q.fromTranslation(C,a.origin))),new N.Matrix4PassUniform("proj",(a,b)=>b.camera.projectionMatrix),
new w.Float2DrawUniform("screenMinMaxSize",(a,b,d)=>n.set(p,d.useFixedSizes?0:d.minSizePx*b.camera.pixelRatio,(a.isLeaf?256:64)*b.camera.pixelRatio)),c.useFixedSizes?new L.Float2PassUniform("pointScale",(a,b)=>n.set(p,a.fixedSize*b.camera.pixelRatio,b.camera.fullHeight)):new w.Float2DrawUniform("pointScale",(a,b,d)=>n.set(p,a.splatSize*d.scaleFactor*b.camera.pixelRatio,b.camera.fullHeight/b.camera.pixelRatio)));c.clippingEnabled?l.uniforms.add(new x.Float3DrawUniform("clipMin",(a,b,d)=>r.set(D,d.clipBox[0]-
a.origin[0],d.clipBox[1]-a.origin[1],d.clipBox[2]-a.origin[2])),new x.Float3DrawUniform("clipMax",(a,b,d)=>r.set(D,d.clipBox[3]-a.origin[0],d.clipBox[4]-a.origin[1],d.clipBox[5]-a.origin[2]))):(l.constants.add("clipMin","vec3",[-g.numberMaxFloat32,-g.numberMaxFloat32,-g.numberMaxFloat32]),l.constants.add("clipMax","vec3",[g.numberMaxFloat32,g.numberMaxFloat32,g.numberMaxFloat32]));k&&e.varyings.add("vColor","vec3");l.code.add(f.glsl`
    void main(void) {
      // Move clipped points outside of clipspace
      if (position.x < clipMin.x || position.y < clipMin.y || position.z < clipMin.z ||
        position.x > clipMax.x || position.y > clipMax.y || position.z > clipMax.z) {
        gl_Position = vec4(0.0,0.0,0.0,2.0);
        gl_PointSize = 0.0;
        return;
      }

      if (rejectBySlice(position)) {
        gl_Position = vec4(0.0,0.0,0.0,2.0);
        gl_PointSize = 0.0;
        return;
      }

      // Position in camera space
      vec4 camera = modelView * vec4(position, 1.0);

      float pointSize = pointScale.x;
      vec4 position = proj * camera;
     ${c.drawScreenSize?f.glsl`
      float clampedScreenSize = pointSize;`:f.glsl`
      float pointRadius = 0.5 * pointSize;
      vec4 cameraOffset = camera + vec4(0.0, pointRadius, 0.0, 0.0);
      vec4 positionOffset = proj * cameraOffset;
      float radius = abs(positionOffset.y - position.y);
      float viewHeight = pointScale.y;
      // screen diameter = (2 * r / w) * (h / 2)
      float screenPointSize = (radius / position.w) * viewHeight;
      float clampedScreenSize = clamp(screenPointSize, screenMinMaxSize.x, screenMinMaxSize.y);
      // Shift towards camera, to move rendered point out of terrain i.e. to
      // the camera-facing end of the virtual point when considering it as a
      // 3D sphere.
      camera.xyz -= normalize(camera.xyz) * pointRadius * clampedScreenSize / screenPointSize;
      position = proj * camera;`}

     gl_PointSize = clampedScreenSize;
     gl_Position = position;

     ${k?f.glsl`vColor = color;`:""}
    }
  `);B.include(K.RgbaFloatEncoding,c);A&&e.include(J.OutputHighlight,c);B.code.add(f.glsl`
    void main(void) {
        vec2 vOffset = gl_PointCoord - vec2(0.5, 0.5);
        float r2 = dot(vOffset, vOffset);

        if (r2 > 0.25) {
          discard;
        }
        ${A?f.glsl`outputHighlight();`:""}
        ${k?f.glsl`fragColor = vec4(vColor, 1.0);`:""}
    }
  `);return e}function E(c){return c?256:64}class F extends f.NoParameters{constructor(){super(...arguments);this.clipBox=t.create(t.positiveInfinity);this.useRealWorldSymbolSizes=this.useFixedSizes=!1;this.scaleFactor=1;this.sizePx=this.size=this.minSizePx=0}get fixedSize(){return this.drawScreenSpace?this.sizePx:this.size}get screenMinSize(){return this.useFixedSizes?0:this.minSizePx}get drawScreenSpace(){return this.useFixedSizes&&!this.useRealWorldSymbolSizes}}class G extends v.SlicePlaneParameters{constructor(c,
e,k){super(c);this.origin=c;this.isLeaf=e;this.splatSize=k}}const C=m.create(),D=I.create(),p=H.create();m=Object.freeze(Object.defineProperty({__proto__:null,PointRendererDrawParameters:G,PointRendererPassParameters:F,build:z,getMaxPointSizeScreenspace:E},Symbol.toStringTag,{value:"Module"}));h.PointRendererDrawParameters=G;h.PointRendererPassParameters=F;h.PointRendererShader=m;h.build=z;h.getMaxPointSizeScreenspace=E});