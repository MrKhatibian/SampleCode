// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("exports ../views/3d/support/engineContent/marker ../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput ../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/RibbonVertexPosition.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/MarkerSizing.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassTerrainTest.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/AlphaCutoff ../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/RgbaFloatEncoding.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl ../views/3d/webgl-engine/core/shaderModules/Float2PassUniform ../views/3d/webgl-engine/core/shaderModules/Float4PassUniform ../views/3d/webgl-engine/core/shaderModules/FloatPassUniform ../views/3d/webgl-engine/core/shaderModules/interfaces ../views/3d/webgl-engine/core/shaderModules/Matrix4PassUniform ../views/3d/webgl-engine/core/shaderModules/ShaderBuilder ../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform ../views/3d/webgl-engine/lib/TransparencyPassType ../views/3d/webgl-engine/lib/VertexAttribute ../views/3d/webgl-engine/shaders/LineMarkerTechniqueConfiguration".split(" "),
function(r,l,k,w,x,y,z,A,B,C,q,D,t,E,c,F,G,H,u,m,n){function v(a){const b=new G.ShaderBuilder,p=a.multipassEnabled&&a.output===k.ShaderOutput.Color,e=a.space===n.LineMarkerSpace.World;b.include(x.RibbonVertexPosition,a);b.include(y.MarkerSizing,a);const {vertex:d,fragment:h}=b;h.include(C.RgbaFloatEncoding);q.addProjViewLocalOrigin(d,a);b.attributes.add(m.VertexAttribute.POSITION,"vec3");b.attributes.add(m.VertexAttribute.PREVPOSITION,"vec3");b.attributes.add(m.VertexAttribute.UV0,"vec2");b.varyings.add("vColor",
"vec4");b.varyings.add("vpos","vec3");b.varyings.add("vUV","vec2");b.varyings.add("vSize","float");p&&b.varyings.add("depth","float");a.hasTip&&b.varyings.add("vLineWidth","float");d.uniforms.add(new D.Float2PassUniform("nearFar",(f,g)=>g.camera.nearFar),new t.Float4PassUniform("viewport",(f,g)=>g.camera.fullViewport));d.code.add(c.glsl`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`);d.code.add(c.glsl`void clip(vec4 pos, inout vec4 prev) {
float vnp = nearFar[0] * 0.99;
if (prev.z > -nearFar[0]) {
float interpolation = (-vnp - pos.z) / (prev.z - pos.z);
prev = mix(pos, prev, interpolation);
}
}`);e?(b.attributes.add(m.VertexAttribute.NORMAL,"vec3"),q.addViewNormal(d),d.constants.add("tiltThreshold","float",.7),d.code.add(c.glsl`vec3 perpendicular(vec3 v) {
vec3 n = (viewNormal * vec4(normal.xyz, 1.0)).xyz;
vec3 n2 = cross(v, n);
vec3 forward = vec3(0.0, 0.0, 1.0);
float tiltDot = dot(forward, n);
return abs(tiltDot) < tiltThreshold ? n : n2;
}`)):d.code.add(c.glsl`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}`);d.code.add(c.glsl`
      #define vecN ${e?"vec3":"vec2"}

      vecN normalizedSegment(vecN pos, vecN prev) {
        vecN segment = pos - prev;
        float segmentLen = length(segment);

        // normalize or zero if too short
        return (segmentLen > 0.001) ? segment / segmentLen : ${e?"vec3(0.0, 0.0, 0.0)":"vec2(0.0, 0.0)"};
      }

      vecN displace(vecN pos, vecN prev, float displacementLen) {
        vecN segment = normalizedSegment(pos, prev);

        vecN displacementDirU = perpendicular(segment);
        vecN displacementDirV = segment;

        ${a.anchor===n.LineMarkerAnchor.Tip?"pos -\x3d 0.5 * displacementLen * displacementDirV;":""}

        return pos + displacementLen * (uv0.x * displacementDirU + uv0.y * displacementDirV);
      }
    `);a.space===n.LineMarkerSpace.Screen&&(d.uniforms.add(new F.Matrix4PassUniform("inverseProjectionMatrix",(f,g)=>g.camera.inverseProjectionMatrix)),d.code.add(c.glsl`vec3 inverseProject(vec4 posScreen) {
posScreen.xy = (posScreen.xy / viewport.zw) * posScreen.w;
return (inverseProjectionMatrix * posScreen).xyz;
}`),d.code.add(c.glsl`bool rayIntersectPlane(vec3 rayDir, vec3 planeOrigin, vec3 planeNormal, out vec3 intersection) {
float cos = dot(rayDir, planeNormal);
float t = dot(planeOrigin, planeNormal) / cos;
intersection = t * rayDir;
return abs(cos) > 0.001 && t > 0.0;
}`),d.uniforms.add(new E.FloatPassUniform("perScreenPixelRatio",(f,g)=>g.camera.perScreenPixelRatio)),d.code.add(c.glsl`
      vec4 toFront(vec4 displacedPosScreen, vec3 posLeft, vec3 posRight, vec3 prev, float lineWidth) {
        // Project displaced position back to camera space
        vec3 displacedPos = inverseProject(displacedPosScreen);

        // Calculate the plane that we want the marker to lie in. Note that this will always be an approximation since ribbon lines are generally
        // not planar and we do not know the actual position of the displaced prev vertices (they are offset in screen space, too).
        vec3 planeNormal = normalize(cross(posLeft - posRight, posLeft - prev));
        vec3 planeOrigin = posLeft;

        ${a.hasCap?"\n                if(prev.z \x3e posLeft.z) {\n                  vec2 diff \x3d posLeft.xy - posRight.xy;\n                  planeOrigin.xy +\x3d perpendicular(diff) / 2.0;\n                }\n              ":""};

        // Move the plane towards the camera by a margin dependent on the line width (approximated in world space). This tolerance corrects for the
        // non-planarity in most cases, but sharp joins can place the prev vertices at arbitrary positions so markers can still clip.
        float offset = lineWidth * perScreenPixelRatio;
        planeOrigin *= (1.0 - offset);

        // Intersect camera ray with the plane and make sure it is within clip space
        vec3 rayDir = normalize(displacedPos);
        vec3 intersection;
        if (rayIntersectPlane(rayDir, planeOrigin, planeNormal, intersection) && intersection.z < -nearFar[0] && intersection.z > -nearFar[1]) {
          return vec4(intersection.xyz, 1.0);
        }

        // Fallback: use depth of pos or prev, whichever is closer to the camera
        float minDepth = planeOrigin.z > prev.z ? length(planeOrigin) : length(prev);
        displacedPos *= minDepth / length(displacedPos);
        return vec4(displacedPos.xyz, 1.0);
      }
  `));q.addPixelRatio(d);d.code.add(c.glsl`void main(void) {
if (uv0.y == 0.0) {
gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
}
else {
float lineWidth = getLineWidth();
float screenMarkerSize = getScreenMarkerSize();
vec4 pos  = view * vec4(position, 1.0);
vec4 prev = view * vec4(prevPosition, 1.0);
clip(pos, prev);`);e?(a.hideOnShortSegments&&d.code.add(c.glsl`if (areWorldMarkersHidden(pos, prev)) {
gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
return;
}`),d.code.add(c.glsl`pos.xyz = displace(pos.xyz, prev.xyz, getWorldMarkerSize(pos));
vec4 displacedPosScreen = projectAndScale(pos);`)):(d.code.add(c.glsl`vec4 posScreen = projectAndScale(pos);
vec4 prevScreen = projectAndScale(prev);
vec4 displacedPosScreen = posScreen;
displacedPosScreen.xy = displace(posScreen.xy, prevScreen.xy, screenMarkerSize);`),a.space===n.LineMarkerSpace.Screen&&d.code.add(c.glsl`vec2 displacementDirU = perpendicular(normalizedSegment(posScreen.xy, prevScreen.xy));
vec3 lineRight = inverseProject(posScreen + lineWidth * vec4(displacementDirU.xy, 0.0, 0.0));
vec3 lineLeft = pos.xyz + (pos.xyz - lineRight);
pos = toFront(displacedPosScreen, lineLeft, lineRight, prev.xyz, lineWidth);
displacedPosScreen = projectAndScale(pos);`));d.code.add(c.glsl`
        ${p?"depth \x3d pos.z;":""}

        // Convert back into NDC
        displacedPosScreen.xy = (displacedPosScreen.xy / viewport.zw) * displacedPosScreen.w;

        // Convert texture coordinate into [0,1]
        vUV = (uv0 + 1.0) / 2.0;

        ${e?"":"vUV *\x3d displacedPosScreen.w;"}

        ${a.hasTip?"vLineWidth \x3d lineWidth;":""}

        vSize = screenMarkerSize;
        vColor = getColor();

        // Use camera space for slicing
        vpos = pos.xyz;

        gl_Position = displacedPosScreen;
      }
    }
  `);p&&b.include(z.multipassTerrainTest,a);b.include(w.SliceDraw,a);h.uniforms.add(new t.Float4PassUniform("intrinsicColor",f=>f.color),new H.Texture2DPassUniform("tex",f=>f.markerTexture));h.include(B.ColorConversion);b.constants.add("texelSize","float",1/l.markerTextureSize);h.code.add(c.glsl`float markerAlpha(vec2 samplePos) {
samplePos += vec2(0.5, -0.5) * texelSize;
float sdf = rgba2float(texture(tex, samplePos)) - 0.5;
float distance = sdf * vSize;
distance -= 0.5;
return clamp(0.5 - distance, 0.0, 1.0);
}`);a.hasTip&&(b.constants.add("relativeMarkerSize","float",l.markerSymbolSize/l.markerTextureSize),b.constants.add("relativeTipLineWidth","float",l.markerTipThicknessFactor),h.code.add(c.glsl`
    float tipAlpha(vec2 samplePos) {
      // Convert coordinates s.t. they are in pixels and relative to the tip of an arrow marker
      samplePos -= vec2(0.5, 0.5 + 0.5 * relativeMarkerSize);
      samplePos *= vSize;

      float halfMarkerSize = 0.5 * relativeMarkerSize * vSize;
      float halfTipLineWidth = 0.5 * max(1.0, relativeTipLineWidth * vLineWidth);

      ${e?"halfTipLineWidth *\x3d fwidth(samplePos.y);":""}

      float distance = max(abs(samplePos.x) - halfMarkerSize, abs(samplePos.y) - halfTipLineWidth);
      return clamp(0.5 - distance, 0.0, 1.0);
    }
  `));a.transparencyPassType===u.TransparencyPassType.ColorAlpha&&(b.outputs.add("fragColor","vec4",0),b.outputs.add("fragAlpha","float",1));b.constants.add("symbolAlphaCutoff","float",A.symbolAlphaCutoff);h.code.add(c.glsl`
  void main() {
    discardBySlice(vpos);
    ${p?"terrainDepthTest(depth);":""}

    vec4 finalColor = intrinsicColor * vColor;

    ${e?"vec2 samplePos \x3d vUV;":"vec2 samplePos \x3d vUV * gl_FragCoord.w;"}

    ${a.hasTip?"finalColor.a *\x3d max(markerAlpha(samplePos), tipAlpha(samplePos));":"finalColor.a *\x3d markerAlpha(samplePos);"}

    ${a.output===k.ShaderOutput.ObjectAndLayerIdColor?c.glsl`finalColor.a = 1.0;`:""}

    if (finalColor.a < symbolAlphaCutoff) {
      discard;
    }

    ${a.output===k.ShaderOutput.Color?c.glsl`fragColor = highlightSlice(finalColor, vpos);`:""}
    ${a.output===k.ShaderOutput.Color&&a.transparencyPassType===u.TransparencyPassType.ColorAlpha?c.glsl`
            fragColor = premultiplyAlpha(fragColor);
            fragAlpha = fragColor.a;`:""}
    ${a.output===k.ShaderOutput.Highlight?c.glsl`fragColor = vec4(1.0);`:""}
  }
  `);return b}const I=Object.freeze(Object.defineProperty({__proto__:null,build:v},Symbol.toStringTag,{value:"Module"}));r.LineMarker=I;r.build=v});