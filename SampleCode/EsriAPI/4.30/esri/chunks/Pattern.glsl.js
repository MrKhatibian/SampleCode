// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("exports ../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput ../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl ../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/ObjectAndLayerIdColor.glsl ../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl ../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/MultipassTerrainTest.glsl ../views/3d/webgl-engine/core/shaderLibrary/shading/VisualVariables.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/AlphaCutoff ../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl ../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl ../views/3d/webgl-engine/core/shaderModules/Float4PassUniform ../views/3d/webgl-engine/core/shaderModules/FloatPassUniform ../views/3d/webgl-engine/core/shaderModules/interfaces ../views/3d/webgl-engine/core/shaderModules/ShaderBuilder ../views/3d/webgl-engine/lib/TransparencyPassType ../views/3d/webgl-engine/lib/VertexAttribute ../views/3d/webgl-engine/materials/PatternStyle".split(" "),
function(t,f,x,y,z,A,B,C,D,E,F,u,G,q,b,H,v,l,e){function w(a){const c=new H.ShaderBuilder,g=a.multipassEnabled&&a.output===f.ShaderOutput.Color,{vertex:d,fragment:h,attributes:m,varyings:n}=c;u.addProjViewLocalOrigin(d,a);c.include(y.Transform,a);c.include(A.VertexColor,a);c.include(D.VisualVariables,a);c.include(z.ObjectAndLayerIdColor,a);a.draped?d.uniforms.add(new q.FloatPassUniform("worldToScreenRatio",(p,k)=>1/k.screenToPCSRatio)):m.add(l.VertexAttribute.BOUNDINGRECT,"mat3");m.add(l.VertexAttribute.POSITION,
"vec3");m.add(l.VertexAttribute.UVMAPSPACE,"vec4");a.vvColor&&m.add(l.VertexAttribute.COLORFEATUREATTRIBUTE,"float");n.add("vColor","vec4");n.add("vpos","vec3");n.add("vuv","vec2");g&&n.add("depth","float");d.uniforms.add(new G.Float4PassUniform("uColor",p=>p.color));const r=a.style===e.Style.ForwardDiagonal||a.style===e.Style.BackwardDiagonal||a.style===e.Style.DiagonalCross;r&&d.code.add(b.glsl`
      const mat2 rotate45 = mat2(${b.glsl.float(.70710678118)}, ${b.glsl.float(-.70710678118)},
                                 ${b.glsl.float(.70710678118)}, ${b.glsl.float(.70710678118)});
    `);a.draped||(u.addCameraPosition(d,a),d.uniforms.add(new q.FloatPassUniform("worldToScreenPerDistanceRatio",(p,k)=>1/k.camera.perScreenPixelRatio)),d.code.add(b.glsl`vec3 projectPointToLineSegment(vec3 center, vec3 halfVector, vec3 point) {
float projectedLength = dot(halfVector, point - center) / dot(halfVector, halfVector);
return center + halfVector * clamp(projectedLength, -1.0, 1.0);
}`),d.code.add(b.glsl`vec3 intersectRayPlane(vec3 rayDir, vec3 rayOrigin, vec3 planeNormal, vec3 planePoint) {
float d = dot(planeNormal, planePoint);
float t = (d - dot(planeNormal, rayOrigin)) / dot(planeNormal, rayDir);
return rayOrigin + t * rayDir;
}`),d.code.add(b.glsl`
      float boundingRectDistanceToCamera() {
        vec3 center = vec3(boundingRect[0][0], boundingRect[0][1], boundingRect[0][2]);
        vec3 halfU = vec3(boundingRect[1][0], boundingRect[1][1], boundingRect[1][2]);
        vec3 halfV = vec3(boundingRect[2][0], boundingRect[2][1], boundingRect[2][2]);
        vec3 n = normalize(cross(halfU, halfV));

        vec3 viewDir = - vec3(view[0][2], view[1][2], view[2][2]);

        float viewAngle = dot(viewDir, n);
        float minViewAngle = ${b.glsl.float(.08715574274)};

        if (abs(viewAngle) < minViewAngle) {
          // view direction is (almost) parallel to plane -> clamp it to min angle
          float normalComponent = sign(viewAngle) * minViewAngle - viewAngle;
          viewDir = normalize(viewDir + normalComponent * n);
        }

        // intersect view direction with infinite plane that contains bounding rect
        vec3 planeProjected = intersectRayPlane(viewDir, cameraPosition, n, center);

        // clip to bounds by projecting to u and v line segments individually
        vec3 uProjected = projectPointToLineSegment(center, halfU, planeProjected);
        vec3 vProjected = projectPointToLineSegment(center, halfV, planeProjected);

        // use to calculate the closest point to camera on bounding rect
        vec3 closestPoint = uProjected + vProjected - center;

        return length(closestPoint - cameraPosition);
      }
    `));d.code.add(b.glsl`
    vec2 scaledUV() {
      vec2 uv = uvMapSpace.xy ${r?" * rotate45":""};
      vec2 uvCellOrigin = uvMapSpace.zw ${r?" * rotate45":""};

      ${a.draped?"":b.glsl`
            float distanceToCamera = boundingRectDistanceToCamera();
            float worldToScreenRatio = worldToScreenPerDistanceRatio / distanceToCamera;
          `}

      // Logarithmically discretize ratio to avoid jittering
      float step = 0.1;
      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);

      vec2 uvOffset = mod(uvCellOrigin * discreteWorldToScreenRatio, ${b.glsl.float(a.patternSpacing)});
      return uvOffset + (uv * discreteWorldToScreenRatio);
    }
  `);d.code.add(b.glsl`
    void main(void) {
      vuv = scaledUV();
      vpos = position;
      ${g?"depth \x3d (view * vec4(vpos, 1.0)).z;":""}
      forwardNormalizedVertexColor();
      forwardObjectAndLayerIdColor();
      ${a.hasVertexColors?"vColor *\x3d uColor;":a.vvColor?"vColor \x3d uColor * interpolateVVColor(colorFeatureAttribute);":"vColor \x3d uColor;"}
      gl_Position = transformPosition(proj, view, vpos);
    }
  `);c.include(x.SliceDraw,a);h.include(F.ColorConversion);a.draped&&h.uniforms.add(new q.FloatPassUniform("texelSize",(p,k)=>1/k.camera.pixelRatio));a.output===f.ShaderOutput.Highlight&&c.include(B.OutputHighlight,a);g&&c.include(C.multipassTerrainTest,a);a.output!==f.ShaderOutput.Highlight&&(h.code.add(b.glsl`
      const float lineWidth = ${b.glsl.float(a.lineWidth)};
      const float spacing = ${b.glsl.float(a.patternSpacing)};
      const float spacingINV = ${b.glsl.float(1/a.patternSpacing)};

      float coverage(float p, float txlSize) {
        p = mod(p, spacing);

        float halfTxlSize = txlSize / 2.0;

        float start = p - halfTxlSize;
        float end = p + halfTxlSize;

        float coverage = (ceil(end * spacingINV) - floor(start * spacingINV)) * lineWidth;
        coverage -= min(lineWidth, mod(start, spacing));
        coverage -= max(lineWidth - mod(end, spacing), 0.0);

        return coverage / txlSize;
      }
    `),a.draped||h.code.add(b.glsl`const int maxSamples = 5;
float sampleAA(float p) {
vec2 dxdy = abs(vec2(dFdx(p), dFdy(p)));
float fwidth = dxdy.x + dxdy.y;
ivec2 samples = 1 + ivec2(clamp(dxdy, 0.0, float(maxSamples - 1)));
vec2 invSamples = 1.0 / vec2(samples);
float accumulator = 0.0;
for (int j = 0; j < maxSamples; j++) {
if(j >= samples.y) {
break;
}
for (int i = 0; i < maxSamples; i++) {
if(i >= samples.x) {
break;
}
vec2 step = vec2(i,j) * invSamples - 0.5;
accumulator += coverage(p + step.x * dxdy.x + step.y * dxdy.y, fwidth);
}
}
accumulator /= float(samples.x * samples.y);
return accumulator;
}`));a.transparencyPassType===v.TransparencyPassType.ColorAlpha&&(c.outputs.add("fragColor","vec4",0),c.outputs.add("fragAlpha","float",1));h.code.add(b.glsl`
    void main() {
      discardBySlice(vpos);
      ${g?"terrainDepthTest(depth);":""}
      vec4 color = vColor;
      color = highlightSlice(color, vpos);

      ${a.output!==f.ShaderOutput.Highlight?b.glsl`color.a *= ${I(a)};`:""}

      ${a.output===f.ShaderOutput.ObjectAndLayerIdColor?b.glsl`color.a = 1.0;`:""}

      if (color.a < ${b.glsl.float(E.symbolAlphaCutoff)}) {
        discard;
      }

      ${a.output===f.ShaderOutput.Color?b.glsl`fragColor = color; ${a.transparencyPassType===v.TransparencyPassType.ColorAlpha?b.glsl`
                    fragColor = premultiplyAlpha(fragColor);
                    fragAlpha = fragColor.a;`:""}`:""}
      ${a.output===f.ShaderOutput.Highlight?b.glsl`outputHighlight();`:""}
      ${a.output===f.ShaderOutput.ObjectAndLayerIdColor?b.glsl`outputObjectAndLayerIdColor();`:""}
    }
  `);return c}function I(a){function c(g){return a.draped?b.glsl`coverage(vuv.${g}, texelSize)`:b.glsl`sampleAA(vuv.${g})`}switch(a.style){case e.Style.ForwardDiagonal:case e.Style.Horizontal:return c("y");case e.Style.BackwardDiagonal:case e.Style.Vertical:return c("x");case e.Style.DiagonalCross:case e.Style.Cross:return b.glsl`
        1.0 - (1.0 - ${c("x")}) * (1.0 - ${c("y")})
      `;default:return"0.0"}}const J=Object.freeze(Object.defineProperty({__proto__:null,build:w},Symbol.toStringTag,{value:"Module"}));t.Pattern=J;t.build=w});