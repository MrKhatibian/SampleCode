// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("exports ../core/libs/gl-matrix-2/math/mat4 ../core/libs/gl-matrix-2/factories/mat4f64 ../views/3d/webgl-engine/core/shaderLibrary/NormalFromDepth.glsl ../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl ../views/3d/webgl-engine/core/shaderLibrary/output/ReadDepth.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/LocalFromScreenSpace.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/RgbaFloat16Encoding.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/TextureAtlasLookup.glsl ../views/3d/webgl-engine/core/shaderModules/Float2PassUniform ../views/3d/webgl-engine/core/shaderModules/Float3PassUniform ../views/3d/webgl-engine/core/shaderModules/FloatsPassUniform ../views/3d/webgl-engine/core/shaderModules/IntegerPassUniform ../views/3d/webgl-engine/core/shaderModules/interfaces ../views/3d/webgl-engine/core/shaderModules/Matrix4PassUniform ../views/3d/webgl-engine/core/shaderModules/Matrix4sPassUniform ../views/3d/webgl-engine/core/shaderModules/ShaderBuilder ../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform".split(" "),
function(f,u,g,v,w,x,m,y,z,h,n,A,B,e,p,q,C,k){function r(l){const d=new C.ShaderBuilder,c=d.fragment;d.include(w.ScreenSpacePass);d.include(m.LocalFromScreenSpace);d.include(z.TextureAtlasLookup);c.include(x.ReadDepth);c.include(y.Rgba4FloatEncoding);c.uniforms.add(new k.Texture2DPassUniform("depthTexture",(a,b)=>b.depth?.attachment));c.uniforms.add(new p.Matrix4PassUniform("inverseProjectionMatrix",(a,b)=>b.camera.inverseProjectionMatrix),new p.Matrix4PassUniform("inverseViewNormalMatrix",(a,b)=>
u.invertOrIdentity(D,b.camera.viewInverseTransposeMatrix)));c.uniforms.add(new n.Float3PassUniform("viewshedTargetVector",(a,b)=>a.targetVector),new n.Float3PassUniform("viewshedUpVector",(a,b)=>a.upVector),new h.Float2PassUniform("viewshedFOVs",(a,b)=>a.fovs),new h.Float2PassUniform("viewshedHeadingAndTilt",(a,b)=>a.headingAndTilt),new h.Float2PassUniform("viewshedNearFar",(a,b)=>a.shadowMap.nearFar??[1,100]));c.uniforms.add(new k.Texture2DPassUniform("viewshedShadowMap",a=>a.shadowMap.depthTexture),
new q.Matrix4sPassUniform("viewshedProjectionMatrices",(a,b)=>a.projectionMatrices,6),new q.Matrix4sPassUniform("viewshedViewMatrices",(a,b)=>a.viewMatrices,6),new B.IntegerPassUniform("viewshedNumFaces",(a,b)=>a.shadowMap.numActiveFaces),new A.FloatsPassUniform("viewshedAtlasRegions",(a,b)=>a.shadowMap.atlasRegions.flat(),24));c.constants.add("visibleColor","vec4",[0,1,0,.5]);c.constants.add("occludedColor","vec4",[1,0,0,.5]);(l=l.useNormalMap)?(c.uniforms.add(new k.Texture2DPassUniform("normalMap",
(a,b)=>a.normalTexture)),c.code.add(e.glsl`vec3 normalFromTexture() {
vec4 norm4 = texture(normalMap, uv);
vec3 nNormal = vec3(-1.0) + 2.0 * norm4.xyz;
return normalize((inverseViewNormalMatrix * vec4(nNormal, 1.0)).xyz);
}`)):d.include(v.NormalFromDepth);c.code.add(e.glsl`
    // UV coordinates of point projected onto viewshed shadow map
    vec2 getViewshedUv(vec4 worldPosition, int face) {
      mat4 viewshedMatrix = viewshedProjectionMatrices[face];
      vec4 viewshedUv4 = viewshedMatrix * worldPosition;
      vec3 viewshedUv = viewshedUv4.xyz / viewshedUv4.w;
      return viewshedUv.xy;
    }

    float viewshedDepthToFloat(float depth) {
      return (depth - viewshedNearFar[0]) / (viewshedNearFar[1] - viewshedNearFar[0]);
    }

    // Orthographic depth to viewshed of given point and given cube map face in range [0, 1].
    float getOrthographicDepthToViewshed(vec4 worldPosition, int face) {
      mat4 viewshedViewMatrix = viewshedViewMatrices[face];
      vec4 viewshedUv4 = viewshedViewMatrix * worldPosition;
      vec3 viewshedUv = viewshedUv4.xyz / viewshedUv4.w;
      float depth = -viewshedUv.z;
      return viewshedDepthToFloat(depth);
    }

    // Read depth from shadow map given uv and cube map face
    float getDepthFromShadowMap(vec2 uv, int face) {
      int index = 4 * face;

      float umin = viewshedAtlasRegions[index];
      float umax = viewshedAtlasRegions[index + 1];
      float vmin = viewshedAtlasRegions[index + 2];
      float vmax = viewshedAtlasRegions[index + 3];

      vec4 atlasRegion = vec4(umin, vmin, umax, vmax);
      return rgba4ToFloat(textureAtlasLookup(viewshedShadowMap, uv, atlasRegion));
    }

    struct ViewshedPoint {
      int face;
      vec2 uv;
      bool isWithin;
      float orthographicDepth;
    };

    // Find cube map face the given position lies in and return relevant information about it
    bool getViewshedPoint(vec4 worldPosition, out ViewshedPoint point) {
      vec3 nUp = normalize(viewshedUpVector);

      // Try with all active cube map faces
      for(int i=0; i < viewshedNumFaces; i++) {

        // Check if when projected, point lies within shadow map texture
        vec2 viewshedUv = getViewshedUv(worldPosition, i);
        if (viewshedUv.x > 0.0 && viewshedUv.x < 1.0 && viewshedUv.y > 0.0 && viewshedUv.y < 1.0) {
          float orthoDepth = getOrthographicDepthToViewshed(worldPosition, i);
          if (orthoDepth >= 0.0) { // found a cube map face

            // Check whether point is really inside viewshed geometry, not just within the camera frustum

            // outside farDistance
            vec3 position = worldPosition.xyz;
            bool isWithin = length(position) <= viewshedNearFar[1];

            // horizontally outside fov
            float t = dot(nUp, position);
            bool isBottomHalf = t > 0.0;
            vec3 nProjVector = normalize(position - t * nUp);
            if (isWithin) {
              float angle = acos(dot(normalize(viewshedTargetVector), nProjVector));
              if (angle > viewshedFOVs[0] / 2.0) {
                isWithin = false;
              }
            }

            // vertically outside fov
            if (isWithin) {
              float angle = acos(dot(nProjVector, normalize(position)));
              if (!isBottomHalf) {
                angle = -angle;
              }
              float tilt = viewshedHeadingAndTilt[1];
              float limit = viewshedFOVs[1] / 2.0;
              if (angle > limit || angle < -limit) {
                isWithin = false;
              }
            }

            point = ViewshedPoint(i, viewshedUv, isWithin, orthoDepth);
            return true;
          }
        }
      }

      // no cube face matches
      return false;
    }

    float normalCosAngle(float linearDepth, vec3 localPosition) {
      ${l?e.glsl`vec3 normal = normalFromTexture();`:e.glsl`
        vec3 cameraSpacePosition = reconstructPosition(gl_FragCoord.xy, linearDepth);
        vec3 normal = normalFromDepth(depthTexture, cameraSpacePosition, gl_FragCoord.xy, uv);
        normal = (inverseViewNormalMatrix * vec4(normal, 1.0)).xyz;
        `};

      vec3 viewingDir = normalize(localPosition);
      return dot(normal, viewingDir);
    }

    void main() {
      float depth = depthFromTexture(depthTexture, uv);

      // Outside camera planes
      if (depth >= 1.0 || depth <= 0.0) {
        return;
      }

      float linearDepth = linearizeDepth(depth);

      // Relative to viewshed position
      vec4 localPosition = reconstructLocalPosition(gl_FragCoord.xy, linearDepth);

      ViewshedPoint point;
      bool foundFace = getViewshedPoint(localPosition, point);

      // Outside every viewshed
      if (!foundFace || !point.isWithin) {
        return;
      }

      float viewshedDepth = getDepthFromShadowMap(point.uv, point.face);
      float distance = point.orthographicDepth;

      bool visible = distance < viewshedDepth;
      fragColor = visible ? visibleColor : occludedColor;

      float cosAngle = normalCosAngle(linearDepth, localPosition.xyz);

      // Everything facing away, and close to parallel is considered occluded.
      // Theshold corresponds to around 0.6 degrees, tuned empirically.
      if (cosAngle > -0.01) {
        fragColor = occludedColor;
      }
    }`);return d}class t extends m.LocalFromScreenSpacePassParameters{constructor(){super(...arguments);this.targetVector=[1,0,0];this.upVector=[0,0,1];this.fovs=[45,45];this.headingAndTilt=[0,0];this.shadowMap={depthTexture:null,nearFar:[1,100],numActiveFaces:1,atlasRegions:[[0,0,1,1]]};this.projectionMatrices=g.IDENTITY.flat();this.viewMatrices=g.IDENTITY.flat()}}const D=g.create(),E=Object.freeze(Object.defineProperty({__proto__:null,ViewshedPassParameters:t,build:r},Symbol.toStringTag,{value:"Module"}));
f.Viewshed=E;f.ViewshedPassParameters=t;f.build=r});