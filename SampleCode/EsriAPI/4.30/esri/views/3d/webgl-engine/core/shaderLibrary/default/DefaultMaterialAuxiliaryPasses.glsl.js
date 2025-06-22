// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("exports ../ForwardLinearDepth.glsl ../ShaderOutput ../Slice.glsl ../Transform.glsl ../attributes/NormalAttribute.glsl ../attributes/ObjectAndLayerIdColor.glsl ../attributes/TextureCoordinateAttribute.glsl ../attributes/VertexNormal.glsl ../output/OutputDepth.glsl ../output/OutputHighlight.glsl ../shading/VisualVariables.glsl ../util/AlphaDiscard.glsl ../util/View.glsl ../../shaderModules/interfaces ../../shaderModules/Texture2DPassUniform ../../../lib/basicInterfaces".split(" "),function(u,
v,d,l,m,k,w,n,x,y,z,t,p,q,c,r,A){u.DefaultMaterialAuxiliaryPasses=function(b,a){const {vertex:e,fragment:f}=b,g=a.hasColorTexture&&a.alphaDiscardMode!==A.AlphaDiscardMode.Opaque;switch(a.output){case d.ShaderOutput.Depth:q.addProjViewLocalOrigin(e,a);b.include(m.Transform,a);b.include(l.SliceDraw,a);b.include(n.TextureCoordinateAttribute,a);g&&f.uniforms.add(new r.Texture2DPassUniform("tex",h=>h.texture));e.code.add(c.glsl`void main(void) {
vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();
}`);b.include(p.DiscardOrAdjustAlphaPass,a);f.code.add(c.glsl`
          void main(void) {
            discardBySlice(vpos);
            ${g?c.glsl`
                    vec4 texColor = texture(tex, ${a.hasColorTextureTransform?c.glsl`colorUV`:c.glsl`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
          }
        `);break;case d.ShaderOutput.Shadow:case d.ShaderOutput.ShadowHighlight:case d.ShaderOutput.ShadowExcludeHighlight:case d.ShaderOutput.ViewshedShadow:case d.ShaderOutput.ObjectAndLayerIdColor:q.addProjViewLocalOrigin(e,a);b.include(m.Transform,a);b.include(n.TextureCoordinateAttribute,a);b.include(t.VisualVariables,a);b.include(y.OutputDepth,a);b.include(l.SliceDraw,a);b.include(w.ObjectAndLayerIdColor,a);v.addNearFar(b);b.varyings.add("depth","float");g&&f.uniforms.add(new r.Texture2DPassUniform("tex",
h=>h.texture));e.code.add(c.glsl`void main(void) {
vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
forwardTextureCoordinates();
forwardObjectAndLayerIdColor();
}`);b.include(p.DiscardOrAdjustAlphaPass,a);f.code.add(c.glsl`
          void main(void) {
            discardBySlice(vpos);
            ${g?c.glsl`
                    vec4 texColor = texture(tex, ${a.hasColorTextureTransform?c.glsl`colorUV`:c.glsl`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
            ${a.output===d.ShaderOutput.ObjectAndLayerIdColor?c.glsl`outputObjectAndLayerIdColor();`:c.glsl`outputDepth(depth);`}
          }
        `);break;case d.ShaderOutput.Normal:q.addProjViewLocalOrigin(e,a);b.include(m.Transform,a);b.include(k.NormalAttribute,a);b.include(x.VertexNormal,a);b.include(n.TextureCoordinateAttribute,a);b.include(t.VisualVariables,a);g&&f.uniforms.add(new r.Texture2DPassUniform("tex",h=>h.texture));a.normalType===k.NormalType.ScreenDerivative&&b.varyings.add("vPositionView","vec3");e.code.add(c.glsl`
          void main(void) {
            vpos = getVertexInLocalOriginSpace();

            ${a.normalType===k.NormalType.Attribute||a.normalType===k.NormalType.Compressed?c.glsl`vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:c.glsl`
                  // Get vertex position in camera space for screen-space derivative normals
                  vPositionView = (view * vec4(vpos, 1.0)).xyz;
                `}
            vpos = subtractOrigin(vpos);
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            forwardTextureCoordinates();
          }
        `);b.include(l.SliceDraw,a);b.include(p.DiscardOrAdjustAlphaPass,a);f.code.add(c.glsl`
          void main() {
            discardBySlice(vpos);
            ${g?c.glsl`
                    vec4 texColor = texture(tex, ${a.hasColorTextureTransform?c.glsl`colorUV`:c.glsl`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}

            ${a.normalType===k.NormalType.ScreenDerivative?c.glsl`vec3 normal = screenDerivativeNormal(vPositionView);`:c.glsl`
                  vec3 normal = normalize(vNormalWorld);
                  if (gl_FrontFacing == false){
                    normal = -normal;
                  }`}
            fragColor = vec4(0.5 + 0.5 * normal, 1.0);
          }
        `);break;case d.ShaderOutput.Highlight:q.addProjViewLocalOrigin(e,a),b.include(m.Transform,a),b.include(n.TextureCoordinateAttribute,a),b.include(t.VisualVariables,a),g&&f.uniforms.add(new r.Texture2DPassUniform("tex",h=>h.texture)),e.code.add(c.glsl`void main(void) {
vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();
}`),b.include(l.SliceDraw,a),b.include(p.DiscardOrAdjustAlphaPass,a),b.include(z.OutputHighlight,a),f.code.add(c.glsl`
          void main() {
            discardBySlice(vpos);
            ${g?c.glsl`
                    vec4 texColor = texture(tex, ${a.hasColorTextureTransform?c.glsl`colorUV`:c.glsl`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
            outputHighlight();
          }
        `)}};Object.defineProperty(u,Symbol.toStringTag,{value:"Module"})});