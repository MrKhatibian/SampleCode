"use strict";(self.webpackChunkRemoteClient=self.webpackChunkRemoteClient||[]).push([[3526],{70045:(e,t,r)=>{var i;r.d(t,{B:()=>i}),function(e){e[e.Pass=0]="Pass",e[e.Draw=1]="Draw"}(i||(i={}))},62079:(e,t,r)=>{r.d(t,{C:()=>i,D:()=>a}),r(16699);var i,o,n=r(66573);function a(e){e.vertex.code.add(n.g`
    vec4 decodeSymbolColor(vec4 symbolColor, out int colorMixMode) {
      float symbolAlpha = 0.0;

      const float maxTint = 85.0;
      const float maxReplace = 170.0;
      const float scaleAlpha = 3.0;

      if (symbolColor.a > maxReplace) {
        colorMixMode = ${n.g.int(i.Multiply)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxReplace);
      } else if (symbolColor.a > maxTint) {
        colorMixMode = ${n.g.int(i.Replace)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxTint);
      } else if (symbolColor.a > 0.0) {
        colorMixMode = ${n.g.int(i.Tint)};
        symbolAlpha = scaleAlpha * symbolColor.a;
      } else {
        colorMixMode = ${n.g.int(i.Multiply)};
        symbolAlpha = 0.0;
      }

      return vec4(symbolColor.r, symbolColor.g, symbolColor.b, symbolAlpha);
    }
  `)}(o=i||(i={}))[o.Multiply=1]="Multiply",o[o.Ignore=2]="Ignore",o[o.Replace=3]="Replace",o[o.Tint=4]="Tint"},63338:(e,t,r)=>{var i;r.d(t,{G:()=>i}),function(e){e[e.Texture=0]="Texture",e[e.RenderBuffer=1]="RenderBuffer"}(i||(i={}))},26442:(e,t,r)=>{r.d(t,{M:()=>n});var i=r(63536),o=r(70045);class n extends i.U{constructor(e,t){super(e,"mat3",o.B.Draw,((r,i,o)=>r.setUniformMatrix3fv(e,t(i,o))))}}},63536:(e,t,r)=>{r.d(t,{D:()=>d,F:()=>h,M:()=>f,S:()=>i,U:()=>l,a:()=>p,b:()=>u,c:()=>m,l:()=>c,m:()=>s});var i,o,n=r(66573),a=r(70045);function s(e){return e===i.Shadow||e===i.ShadowHighlight||e===i.ShadowExcludeHighlight||e===i.ViewshedShadow}function c(e){return function(e){return function(e){return function(e){return e===i.Color}(e)||function(e){return e===i.Highlight||e===i.ObjectAndLayerIdColor}(e)}(e)||function(e){return e===i.Depth}(e)}(e)||e===i.Normal}(o=i||(i={}))[o.Color=0]="Color",o[o.Depth=1]="Depth",o[o.Normal=2]="Normal",o[o.Shadow=3]="Shadow",o[o.ShadowHighlight=4]="ShadowHighlight",o[o.ShadowExcludeHighlight=5]="ShadowExcludeHighlight",o[o.ViewshedShadow=6]="ViewshedShadow",o[o.Highlight=7]="Highlight",o[o.ObjectAndLayerIdColor=8]="ObjectAndLayerIdColor",o[o.COUNT=9]="COUNT";class l{constructor(e,t,r,i,o=null){if(this.name=e,this.type=t,this.arraySize=o,this.bind={[a.B.Pass]:null,[a.B.Draw]:null},i)switch(r){case a.B.Pass:this.bind[a.B.Pass]=i;break;case a.B.Draw:this.bind[a.B.Draw]=i}}equals(e){return this.type===e.type&&this.name===e.name&&this.arraySize===e.arraySize}}function d({code:e},t){t.doublePrecisionRequiresObfuscation?e.add(n.g`vec3 dpPlusFrc(vec3 a, vec3 b) {
return mix(a, a + b, vec3(notEqual(b, vec3(0))));
}
vec3 dpMinusFrc(vec3 a, vec3 b) {
return mix(vec3(0), a - b, vec3(notEqual(a, b)));
}
vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = dpPlusFrc(hiA, hiB);
vec3 e = dpMinusFrc(t1, hiA);
vec3 t2 = dpMinusFrc(hiB, e) + dpMinusFrc(hiA, dpMinusFrc(t1, e)) + loA + loB;
return t1 + t2;
}`):e.add(n.g`vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = hiA + hiB;
vec3 e = t1 - hiA;
vec3 t2 = ((hiB - e) + (hiA - (t1 - e))) + loA + loB;
return t1 + t2;
}`)}class u extends l{constructor(e,t){super(e,"vec3",a.B.Draw,((r,i,o,n)=>r.setUniform3fv(e,t(i,o,n))))}}class h extends l{constructor(e,t){super(e,"vec3",a.B.Pass,((r,i,o)=>r.setUniform3fv(e,t(i,o))))}}class m extends l{constructor(e,t){super(e,"float",a.B.Pass,((r,i,o)=>r.setUniform1f(e,t(i,o))))}}class f extends l{constructor(e,t){super(e,"mat3",a.B.Pass,((r,i,o)=>r.setUniformMatrix3fv(e,t(i,o))))}}class p extends l{constructor(e,t){super(e,"mat4",a.B.Pass,((r,i,o)=>r.setUniformMatrix4fv(e,t(i,o))))}}},16055:(e,t,r)=>{r.d(t,{N:()=>u,T:()=>d,a:()=>i});var i,o,n=r(63536),a=r(70045),s=r(73502),c=r(66573),l=r(97538);class d extends n.U{constructor(e,t){super(e,"sampler2D",a.B.Draw,((r,i,o)=>r.bindTexture(e,t(i,o))))}}function u(e,t){switch(t.normalType){case i.Compressed:e.attributes.add(l.V.NORMALCOMPRESSED,"vec2"),e.vertex.code.add(c.g`vec3 decompressNormal(vec2 normal) {
float z = 1.0 - abs(normal.x) - abs(normal.y);
return vec3(normal + sign(normal) * min(z, 0.0), z);
}
vec3 normalModel() {
return decompressNormal(normalCompressed);
}`);break;case i.Attribute:e.attributes.add(l.V.NORMAL,"vec3"),e.vertex.code.add(c.g`vec3 normalModel() {
return normal;
}`);break;case i.ScreenDerivative:e.fragment.code.add(c.g`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`);break;default:(0,s.n)(t.normalType);case i.COUNT:case i.Ground:}}(o=i||(i={}))[o.Attribute=0]="Attribute",o[o.Compressed=1]="Compressed",o[o.Ground=2]="Ground",o[o.ScreenDerivative=3]="ScreenDerivative",o[o.COUNT=4]="COUNT"},89167:(e,t,r)=>{r.d(t,{T:()=>p,a:()=>m,c:()=>u,e:()=>h,f:()=>d,w:()=>l});var i=r(6407),o=r(32773),n=r(20266),a=r(52134),s=r(63338);const c=!!(0,o.h)("enable-feature:webgl-debug");function l(){return c}function d(){return c}function u(e){if(l()){const t=e.getError();if(t){const r=function(e,t){switch(t){case e.INVALID_ENUM:return"Invalid Enum. An unacceptable value has been specified for an enumerated argument.";case e.INVALID_VALUE:return"Invalid Value. A numeric argument is out of range.";case e.INVALID_OPERATION:return"Invalid Operation. The specified command is not allowed for the current state.";case e.INVALID_FRAMEBUFFER_OPERATION:return"Invalid Framebuffer operation. The currently bound framebuffer is not framebuffer complete when trying to render to or to read from it.";case e.OUT_OF_MEMORY:return"Out of memory. Not enough memory is left to execute the command.";case e.CONTEXT_LOST_WEBGL:return"WebGL context has been lost";default:return"Unknown error"}}(e,t),o=(new Error).stack;n.L.getLogger("esri.views.webgl.checkWebGLError").error(new i.A("webgl-error","WebGL error occurred",{message:r,stack:o}))}}}function h(e){switch(e){case a.d.ALPHA:case a.d.LUMINANCE:case a.d.RED:case a.d.RED_INTEGER:case a.S.R8:case a.S.R8I:case a.S.R8UI:case a.S.R8_SNORM:case a.n.STENCIL_INDEX8:return 1;case a.d.LUMINANCE_ALPHA:case a.d.RG:case a.d.RG_INTEGER:case a.S.RGBA4:case a.S.R16F:case a.S.R16I:case a.S.R16UI:case a.S.RG8:case a.S.RG8I:case a.S.RG8UI:case a.S.RG8_SNORM:case a.S.RGB565:case a.S.RGB5_A1:case a.n.DEPTH_COMPONENT16:return 2;case a.d.DEPTH_COMPONENT:case a.d.RGB:case a.d.RGB_INTEGER:case a.S.RGB8:case a.S.RGB8I:case a.S.RGB8UI:case a.S.RGB8_SNORM:case a.S.SRGB8:case a.n.DEPTH_COMPONENT24:return 3;case a.d.DEPTH_STENCIL:case a.d.DEPTH24_STENCIL8:case a.d.RGBA:case a.d.RGBA_INTEGER:case a.S.RGBA8:case a.S.R32F:case a.S.R11F_G11F_B10F:case a.S.RG16F:case a.S.R32I:case a.S.R32UI:case a.S.RG16I:case a.S.RG16UI:case a.S.RGBA8I:case a.S.RGBA8UI:case a.S.RGBA8_SNORM:case a.S.SRGB8_ALPHA8:case a.S.RGB9_E5:case a.S.RGB10_A2UI:case a.S.RGB10_A2:case a.n.DEPTH_STENCIL:case a.n.DEPTH_COMPONENT32F:case a.n.DEPTH24_STENCIL8:return 4;case a.n.DEPTH32F_STENCIL8:return 5;case a.S.RGB16F:case a.S.RGB16I:case a.S.RGB16UI:return 6;case a.S.RG32F:case a.S.RG32I:case a.S.RG32UI:case a.S.RGBA16F:case a.S.RGBA16I:case a.S.RGBA16UI:return 8;case a.S.RGB32F:case a.S.RGB32I:case a.S.RGB32UI:return 12;case a.S.RGBA32F:case a.S.RGBA32I:case a.S.RGBA32UI:return 16;case a.m.COMPRESSED_RGB_S3TC_DXT1_EXT:case a.m.COMPRESSED_RGBA_S3TC_DXT1_EXT:return.5;case a.m.COMPRESSED_RGBA_S3TC_DXT3_EXT:case a.m.COMPRESSED_RGBA_S3TC_DXT5_EXT:return 1;case a.m.COMPRESSED_R11_EAC:case a.m.COMPRESSED_SIGNED_R11_EAC:case a.m.COMPRESSED_RGB8_ETC2:case a.m.COMPRESSED_SRGB8_ETC2:case a.m.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2:case a.m.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2:return.5;case a.m.COMPRESSED_RG11_EAC:case a.m.COMPRESSED_SIGNED_RG11_EAC:case a.m.COMPRESSED_RGBA8_ETC2_EAC:case a.m.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:return 1}return 0}class m{constructor(e=0,t=e){this.width=e,this.height=t,this.target=a.o.TEXTURE_2D,this.pixelFormat=a.d.RGBA,this.dataType=a.b.UNSIGNED_BYTE,this.samplingMode=a.c.LINEAR,this.wrapMode=a.T.REPEAT,this.maxAnisotropy=1,this.flipped=!1,this.hasMipmap=!1,this.isOpaque=!1,this.unpackAlignment=4,this.preMultiplyAlpha=!1,this.depth=1,this.isImmutable=!1}}class f extends m{constructor(e,t){switch(super(),this.context=e,Object.assign(this,t),this.internalFormat){case a.S.R16F:case a.S.R16I:case a.S.R16UI:case a.S.R32F:case a.S.R32I:case a.S.R32UI:case a.S.R8_SNORM:case a.S.R8:case a.S.R8I:case a.S.R8UI:this.pixelFormat=a.d.RED}}static validate(e,t){return new f(e,t)}}let p=class e{constructor(e,t=null,r=null){if(this.type=s.G.Texture,this._glName=null,this._samplingModeDirty=!1,this._wrapModeDirty=!1,this._wasImmutablyAllocated=!1,"context"in e)this._descriptor=e,r=t;else{const r=f.validate(e,t);if(!r)throw new i.A("Texture descriptor invalid");this._descriptor=r}this._descriptor.target===a.o.TEXTURE_CUBE_MAP?this._setDataCubeMap(r):this.setData(r)}get glName(){return this._glName}get descriptor(){return this._descriptor}get usedMemory(){return(e=this._descriptor).width<=0||e.height<=0?0:Math.round(e.width*e.height*(e.hasMipmap?4/3:1)*(null==e.internalFormat?4:h(e.internalFormat)));var e}get isDirty(){return this._samplingModeDirty||this._wrapModeDirty}dispose(){this._glName&&this._descriptor.context.instanceCounter.decrement(a.R.Texture,this),this._descriptor.context.gl&&this._glName&&(this._descriptor.context.unbindTexture(this),this._descriptor.context.gl.deleteTexture(this._glName),this._glName=null)}release(){this.dispose()}resize(e,t){const r=this._descriptor;if(r.width!==e||r.height!==t){if(this._wasImmutablyAllocated)throw new i.A("Immutable textures can't be resized!");r.width=e,r.height=t,this._descriptor.target===a.o.TEXTURE_CUBE_MAP?this._setDataCubeMap(null):this.setData(null)}}_setDataCubeMap(e=null){for(let t=a.o.TEXTURE_CUBE_MAP_POSITIVE_X;t<=a.o.TEXTURE_CUBE_MAP_NEGATIVE_Z;t++)this._setData(e,t)}setData(e){this._setData(e)}_setData(t,r){if(!this._descriptor.context?.gl)return;const o=this._descriptor.context.gl;u(o),this._glName||(this._glName=o.createTexture(),this._glName&&this._descriptor.context.instanceCounter.increment(a.R.Texture,this)),void 0===t&&(t=null);const n=this._descriptor,s=r??n.target,c=b(s);null===t&&(n.width=n.width||4,n.height=n.height||4,c&&(n.depth=n.depth??1));const l=this._descriptor.context.bindTexture(this,e.TEXTURE_UNIT_FOR_UPDATES);this._descriptor.context.setActiveTexture(e.TEXTURE_UNIT_FOR_UPDATES),g(n),this._configurePixelStorage(),u(o);const d=this._deriveInternalFormat();if(T(t)){let e="width"in t?t.width:t.codedWidth,r="height"in t?t.height:t.codedHeight;const i=1;t instanceof HTMLVideoElement&&(e=t.videoWidth,r=t.videoHeight),n.width&&n.height,c&&n.depth,n.isImmutable&&!this._wasImmutablyAllocated&&this._texStorage(s,d,n.hasMipmap,e,r,i),this._texImage(s,0,d,e,r,i,t),u(o),n.hasMipmap&&this.generateMipmap(),n.width||(n.width=e),n.height||(n.height=r),c&&!n.depth&&(n.depth=i)}else{const{width:e,height:r,depth:l}=n;if(null==e||null==r)throw new i.A("Width and height must be specified!");if(c&&null==l)throw new i.A("Depth must be specified!");if(n.isImmutable&&!this._wasImmutablyAllocated&&this._texStorage(s,d,n.hasMipmap,e,r,l),x(t)){const c=t.levels,u=E(s,e,r,l),h=Math.min(u-1,c.length-1);o.texParameteri(n.target,this._descriptor.context.gl.TEXTURE_MAX_LEVEL,h);const m=d;if(!(m in a.m))throw new i.A("Attempting to use compressed data with an uncompressed format!");this._forEachMipmapLevel(((e,t,r,i)=>{const o=c[Math.min(e,c.length-1)];this._compressedTexImage(s,e,m,t,r,i,o)}),h)}else this._texImage(s,0,d,e,r,l,t),u(o),n.hasMipmap&&this.generateMipmap()}v(o,this._descriptor),_(o,this._descriptor),function(e,t){const r=e.capabilities.textureFilterAnisotropic;r&&e.gl.texParameterf(t.target,r.TEXTURE_MAX_ANISOTROPY,t.maxAnisotropy??1)}(this._descriptor.context,this._descriptor),u(o),this._descriptor.context.bindTexture(l,e.TEXTURE_UNIT_FOR_UPDATES)}updateData(t,r,o,n,a,s,c=0){s||console.error("An attempt to use uninitialized data!"),this._glName||console.error("An attempt to update uninitialized texture!");const l=this._descriptor,d=this._deriveInternalFormat(),{context:u,pixelFormat:h,dataType:m,target:f,isImmutable:p}=l;if(p&&!this._wasImmutablyAllocated)throw new i.A("Cannot update immutable texture before allocation!");const g=u.bindTexture(this,e.TEXTURE_UNIT_FOR_UPDATES,!0);(r<0||o<0||r+n>l.width||o+a>l.height)&&console.error("An attempt to update out of bounds of the texture!"),this._configurePixelStorage();const{gl:v}=u;c&&v.pixelStorei(v.UNPACK_SKIP_ROWS,c),T(s)?v.texSubImage2D(f,t,r,o,n,a,h,m,s):x(s)?v.compressedTexSubImage2D(f,t,r,o,n,a,d,s.levels[t]):v.texSubImage2D(f,t,r,o,n,a,h,m,s),c&&v.pixelStorei(v.UNPACK_SKIP_ROWS,0),u.bindTexture(g,e.TEXTURE_UNIT_FOR_UPDATES)}updateData3D(t,r,o,n,a,s,c,l){l||console.error("An attempt to use uninitialized data!"),this._glName||console.error("An attempt to update uninitialized texture!");const d=this._descriptor,u=this._deriveInternalFormat(),{context:h,pixelFormat:m,dataType:f,isImmutable:p,target:g}=d;if(p&&!this._wasImmutablyAllocated)throw new i.A("Cannot update immutable texture before allocation!");b(g)||console.warn("Attempting to set 3D texture data on a non-3D texture");const v=h.bindTexture(this,e.TEXTURE_UNIT_FOR_UPDATES);h.setActiveTexture(e.TEXTURE_UNIT_FOR_UPDATES),(r<0||o<0||n<0||r+a>d.width||o+s>d.height||n+c>d.depth)&&console.error("An attempt to update out of bounds of the texture!"),this._configurePixelStorage();const{gl:_}=h;if(x(l))l=l.levels[t],_.compressedTexSubImage3D(g,t,r,o,n,a,s,c,u,l);else{const e=l;_.texSubImage3D(g,t,r,o,n,a,s,c,m,f,e)}h.bindTexture(v,e.TEXTURE_UNIT_FOR_UPDATES)}generateMipmap(){const t=this._descriptor;if(!t.hasMipmap){if(this._wasImmutablyAllocated)throw new i.A("Cannot add mipmaps to immutable texture after allocation");t.hasMipmap=!0,this._samplingModeDirty=!0,g(t)}t.samplingMode===a.c.LINEAR?(this._samplingModeDirty=!0,t.samplingMode=a.c.LINEAR_MIPMAP_NEAREST):t.samplingMode===a.c.NEAREST&&(this._samplingModeDirty=!0,t.samplingMode=a.c.NEAREST_MIPMAP_NEAREST);const r=this._descriptor.context.bindTexture(this,e.TEXTURE_UNIT_FOR_UPDATES);this._descriptor.context.setActiveTexture(e.TEXTURE_UNIT_FOR_UPDATES),this._descriptor.context.gl.generateMipmap(t.target),this._descriptor.context.bindTexture(r,e.TEXTURE_UNIT_FOR_UPDATES)}clearMipmap(){const e=this._descriptor;if(e.hasMipmap){if(this._wasImmutablyAllocated)throw new i.A("Cannot delete mipmaps to immutable texture after allocation");e.hasMipmap=!1,this._samplingModeDirty=!0,g(e)}e.samplingMode===a.c.LINEAR_MIPMAP_NEAREST?(this._samplingModeDirty=!0,e.samplingMode=a.c.LINEAR):e.samplingMode===a.c.NEAREST_MIPMAP_NEAREST&&(this._samplingModeDirty=!0,e.samplingMode=a.c.NEAREST)}setSamplingMode(e){e!==this._descriptor.samplingMode&&(this._descriptor.samplingMode=e,this._samplingModeDirty=!0)}setWrapMode(e){e!==this._descriptor.wrapMode&&(this._descriptor.wrapMode=e,g(this._descriptor),this._wrapModeDirty=!0)}applyChanges(){const e=this._descriptor,t=e.context.gl;this._samplingModeDirty&&(v(t,e),this._samplingModeDirty=!1),this._wrapModeDirty&&(_(t,e),this._wrapModeDirty=!1)}_deriveInternalFormat(){if(null!=this._descriptor.internalFormat)return this._descriptor.internalFormat===a.d.DEPTH_STENCIL&&(this._descriptor.internalFormat=a.d.DEPTH24_STENCIL8),this._descriptor.internalFormat;switch(this._descriptor.dataType){case a.b.FLOAT:switch(this._descriptor.pixelFormat){case a.d.RGBA:return this._descriptor.internalFormat=a.S.RGBA32F;case a.d.RGB:return this._descriptor.internalFormat=a.S.RGB32F;default:throw new i.A("Unable to derive format")}case a.b.UNSIGNED_BYTE:switch(this._descriptor.pixelFormat){case a.d.RGBA:return this._descriptor.internalFormat=a.S.RGBA8;case a.d.RGB:return this._descriptor.internalFormat=a.S.RGB8}}return this._descriptor.internalFormat=this._descriptor.pixelFormat===a.d.DEPTH_STENCIL?a.d.DEPTH24_STENCIL8:this._descriptor.pixelFormat}_configurePixelStorage(){const e=this._descriptor.context.gl,{unpackAlignment:t,flipped:r,preMultiplyAlpha:i}=this._descriptor;e.pixelStorei(e.UNPACK_ALIGNMENT,t),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,r?1:0),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,i?1:0)}_texStorage(e,t,r,o,n,s){const{gl:c}=this._descriptor.context;if(!(t in a.S))throw new i.A("Immutable textures must have a sized internal format");if(!this._descriptor.isImmutable)return;const l=r?E(e,o,n,s):1;if(b(e)){if(null==s)throw new i.A("Missing depth dimension for 3D texture upload");c.texStorage3D(e,l,t,o,n,s)}else c.texStorage2D(e,l,t,o,n);this._wasImmutablyAllocated=!0}_texImage(e,t,r,o,n,a,s){const c=this._descriptor.context.gl,l=b(e),{isImmutable:d,pixelFormat:u,dataType:h}=this._descriptor;if(d){if(null!=s){const r=s;if(l){if(null==a)throw new i.A("Missing depth dimension for 3D texture upload");c.texSubImage3D(e,t,0,0,0,o,n,a,u,h,r)}else c.texSubImage2D(e,t,0,0,o,n,u,h,r)}}else{const d=s;if(l){if(null==a)throw new i.A("Missing depth dimension for 3D texture upload");c.texImage3D(e,t,r,o,n,a,0,u,h,d)}else c.texImage2D(e,t,r,o,n,0,u,h,d)}}_compressedTexImage(e,t,r,o,n,a,s){const c=this._descriptor.context.gl,l=b(e);if(this._descriptor.isImmutable){if(null!=s)if(l){if(null==a)throw new i.A("Missing depth dimension for 3D texture upload");c.compressedTexSubImage3D(e,t,0,0,0,o,n,a,r,s)}else c.compressedTexSubImage2D(e,t,0,0,o,n,r,s)}else if(l){if(null==a)throw new i.A("Missing depth dimension for 3D texture upload");c.compressedTexImage3D(e,t,r,o,n,a,0,s)}else c.compressedTexImage2D(e,t,r,o,n,0,s)}_forEachMipmapLevel(e,t=1/0){let{width:r,height:o,depth:n,hasMipmap:s,target:c}=this._descriptor;const l=c===a.o.TEXTURE_3D;if(null==r||null==o||l&&null==n)throw new i.A("Missing texture dimensions for mipmap calculation");for(let i=0;e(i,r,o,n),s&&(1!==r||1!==o||l&&1!==n)&&!(i>=t);++i)r=Math.max(1,r>>1),o=Math.max(1,o>>1),l&&(n=Math.max(1,n>>1))}};function g(e){(null!=e.width&&e.width<0||null!=e.height&&e.height<0||null!=e.depth&&e.depth<0)&&console.error("Negative dimension parameters are not allowed!")}function v(e,t){let r=t.samplingMode,i=t.samplingMode;r===a.c.LINEAR_MIPMAP_NEAREST||r===a.c.LINEAR_MIPMAP_LINEAR?(r=a.c.LINEAR,t.hasMipmap||(i=a.c.LINEAR)):r!==a.c.NEAREST_MIPMAP_NEAREST&&r!==a.c.NEAREST_MIPMAP_LINEAR||(r=a.c.NEAREST,t.hasMipmap||(i=a.c.NEAREST)),e.texParameteri(t.target,e.TEXTURE_MAG_FILTER,r),e.texParameteri(t.target,e.TEXTURE_MIN_FILTER,i)}function _(e,t){"number"==typeof t.wrapMode?(e.texParameteri(t.target,e.TEXTURE_WRAP_S,t.wrapMode),e.texParameteri(t.target,e.TEXTURE_WRAP_T,t.wrapMode)):(e.texParameteri(t.target,e.TEXTURE_WRAP_S,t.wrapMode.s),e.texParameteri(t.target,e.TEXTURE_WRAP_T,t.wrapMode.t))}function x(e){return null!=e&&"type"in e&&"compressed"===e.type}function T(e){return null!=e&&!x(e)&&!function(e){return null!=e&&"byteLength"in e}(e)}function b(e){return e===a.o.TEXTURE_3D||e===a.o.TEXTURE_2D_ARRAY}function E(e,t,r,i=1){let o=Math.max(t,r);return e===a.o.TEXTURE_3D&&(o=Math.max(o,i)),Math.round(Math.log(o)/Math.LN2)+1}p.TEXTURE_UNIT_FOR_UPDATES=0},38632:(e,t,r)=>{r.d(t,{V:()=>o});var i=r(6407);let o=class e{constructor(e,t,r=""){this.major=e,this.minor=t,this._context=r}lessThan(e,t){return this.major<e||e===this.major&&this.minor<t}since(e,t){return!this.lessThan(e,t)}validate(e){if(this.major!==e.major){const t=this._context&&this._context+":",r=this._context&&this._context+" ";throw new i.A(t+"unsupported-version",`Required major ${r}version is '${this.major}', but got '\${version.major}.\${version.minor}'`,{version:e})}}clone(){return new e(this.major,this.minor,this._context)}static parse(t,r=""){const[o,n]=t.split("."),a=/^\s*\d+\s*$/;if(!o?.match||!a.test(o))throw new i.A((r&&r+":")+"invalid-version","Expected major version to be a number, but got '${version}'",{version:t});if(!n?.match||!a.test(n))throw new i.A((r&&r+":")+"invalid-version","Expected minor version to be a number, but got '${version}'",{version:t});const s=parseInt(o,10),c=parseInt(n,10);return new e(s,c,r)}}},57669:(e,t,r)=>{function i(e){return e=e||globalThis.location.hostname,l.some((t=>null!=e?.match(t)))}function o(e,t){return e&&(t=t||globalThis.location.hostname)?null!=t.match(n)||null!=t.match(s)?e.replace("static.arcgis.com","staticdev.arcgis.com"):null!=t.match(a)||null!=t.match(c)?e.replace("static.arcgis.com","staticqa.arcgis.com"):e:e}r.d(t,{a:()=>o,i:()=>i});const n=/^devext\.arcgis\.com$/,a=/^qaext\.arcgis\.com$/,s=/^[\w-]*\.mapsdevext\.arcgis\.com$/,c=/^[\w-]*\.mapsqa\.arcgis\.com$/,l=[/^([\w-]*\.)?[\w-]*\.zrh-dev-local\.esri\.com$/,n,a,/^jsapps\.esri\.com$/,s,c]},66573:(e,t,r)=>{r.d(t,{N:()=>i,g:()=>o});const i=class{};function o(e,...t){let r="";for(let i=0;i<t.length;i++)r+=e[i]+t[i];return r+=e[e.length-1],r}!function(e){e.int=function(e){return Math.round(e).toString()},e.float=function(e){return e.toPrecision(8)}}(o||(o={}))},31835:(e,t,r)=>{r.d(t,{b:()=>d,c:()=>c,f:()=>l});var i=r(16699),o=r(92080),n=r(26809),a=r(2589),s=r(85914);function c(e){return e?{origin:(0,a.e)(e.origin),vector:(0,a.e)(e.vector)}:{origin:(0,a.c)(),vector:(0,a.c)()}}function l(e,t,r=c()){return(0,n.p)(r.origin,e),(0,n.c)(r.vector,t,e),r}function d(e,t,r){return function(e,t,r,o,a){const{vector:c,origin:l}=e,d=(0,n.c)(s.s.get(),t,l),u=(0,n.d)(c,d)/(0,n.k)(c);return(0,n.b)(a,c,(0,i.c)(u,0,1)),(0,n.i)(a,a,e.origin)}(e,t,0,0,r)}(0,a.c)(),(0,a.c)(),new o.O((()=>c()))},43526:(e,t,r)=>{r.r(t),r.d(t,{C:()=>No,D:()=>wo,E:()=>Zo,F:()=>Po,M:()=>ln,N:()=>go,O:()=>Mo,R:()=>tn,S:()=>ko,a:()=>xo,b:()=>To,c:()=>yo,d:()=>bo,e:()=>_n,f:()=>hn,g:()=>Rn,h:()=>Gn,i:()=>$o,j:()=>Xo,k:()=>Yo,l:()=>vo,m:()=>mo,n:()=>Nn,o:()=>Qo,p:()=>Co,q:()=>en,r:()=>jn,u:()=>_o});var i,o,n=r(57669),a=r(16699),s=r(87889),c=r(88485),l=r(47812),d=r(87162),u=r(46484),h=r(26809),m=r(2589),f=r(47239),p=r(32773),g=r(4361),v=r(83902),_=r(45371),x=r(19766),T=r(66573),b=r(41390),E=r(97538),S=r(8844);class A{constructor(){this.id=(0,b.g)()}}(o=i||(i={}))[o.Layer=0]="Layer",o[o.Object=1]="Object",o[o.Mesh=2]="Mesh",o[o.Line=3]="Line",o[o.Point=4]="Point",o[o.Material=5]="Material",o[o.Texture=6]="Texture",o[o.COUNT=7]="COUNT";const M=new Map([[E.V.POSITION,0],[E.V.NORMAL,1],[E.V.NORMALCOMPRESSED,1],[E.V.UV0,2],[E.V.COLOR,3],[E.V.COLORFEATUREATTRIBUTE,3],[E.V.SIZE,4],[E.V.TANGENT,4],[E.V.CENTEROFFSETANDDISTANCE,5],[E.V.SYMBOLCOLOR,5],[E.V.FEATUREATTRIBUTE,6],[E.V.INSTANCEFEATUREATTRIBUTE,6],[E.V.INSTANCECOLOR,7],[E.V.OBJECTANDLAYERIDCOLOR,7],[E.V.INSTANCEOBJECTANDLAYERIDCOLOR,7],[E.V.INSTANCEMODEL,8],[E.V.INSTANCEMODELNORMAL,12],[E.V.INSTANCEMODELORIGINHI,11],[E.V.INSTANCEMODELORIGINLO,15]]);(0,a.d)(10),(0,a.d)(12),(0,a.d)(70),(0,a.d)(40);const w={scale:0,factor:0,minScaleFactor:0};function y(e,t){const r=t?y(t):{};for(const t in e){let i=e[t];i?.forEach&&(i=R(i)),null==i&&t in r||(r[t]=i)}return r}function R(e){const t=[];return e.forEach((e=>t.push(e))),t}const C={multiply:1,ignore:2,replace:3,tint:4};class I extends A{constructor(e,t){super(),this.type=i.Material,this.supportsEdges=!1,this._visible=!0,this._renderPriority=0,this._vertexAttributeLocations=M,this._pp0=(0,m.f)(0,0,1),this._pp1=(0,m.f)(0,0,0),this._parameters=y(e,t),this.validateParameters(this._parameters)}get parameters(){return this._parameters}update(e){return!1}setParameters(e,t=!0){(function(e,t){let r=!1;for(const i in t){const o=t[i];void 0!==o&&(Array.isArray(o)?null===e[i]?(e[i]=o.slice(),r=!0):(0,p.E)(e[i],o)&&(r=!0):e[i]!==o&&(r=!0,e[i]=o))}return r})(this._parameters,e)&&(this.validateParameters(this._parameters),t&&this.parametersChanged())}validateParameters(e){}get visible(){return this._visible}set visible(e){e!==this._visible&&(this._visible=e,this.parametersChanged())}shouldRender(e){return this.isVisible()&&this.isVisibleForOutput(e.output)&&(!this.parameters.isDecoration||e.bindParameters.decorations===v.D.ON)&&!!(this.parameters.renderOccluded&e.renderOccludedMask)}isVisibleForOutput(e){return!0}get renderPriority(){return this._renderPriority}set renderPriority(e){e!==this._renderPriority&&(this._renderPriority=e,this.parametersChanged())}get vertexAttributeLocations(){return this._vertexAttributeLocations}isVisible(){return this._visible}parametersChanged(){this.repository?.materialChanged(this)}queryRenderOccludedState(e){return this.isVisible()&&this.parameters.renderOccluded===e}intersectDraped(e,t,r,i,o,n){return this._pp0[0]=this._pp1[0]=i[0],this._pp0[1]=this._pp1[1]=i[1],this.intersect(e,t,r,this._pp0,this._pp1,o)}}var O;!function(e){e[e.None=0]="None",e[e.Occlude=1]="Occlude",e[e.Transparent=2]="Transparent",e[e.OccludeAndTransparent=4]="OccludeAndTransparent",e[e.OccludeAndTransparentStencil=8]="OccludeAndTransparentStencil",e[e.Opaque=16]="Opaque"}(O||(O={})),T.N;var N=r(92080),P=r(31835);function L(e,t,r){return(0,h.c)(D,t,e),(0,h.c)(B,r,e),.5*(0,h.l)((0,h.e)(D,D,B))}r(85914),new N.O(P.c),new N.O((()=>({p0:(0,m.c)(),p1:(0,m.c)(),p2:(0,m.c)()})));const D=(0,m.c)(),B=(0,m.c)(),F=new Float32Array(2);var V=r(32816),G=r(63536),U=r(70045);class z extends T.N{constructor(){super(),this._key="",this._keyDirty=!1,this._parameterBits=this._parameterBits?this._parameterBits.map((()=>0)):[],this._parameterNames||(this._parameterNames=[])}get key(){return this._keyDirty&&(this._keyDirty=!1,this._key=String.fromCharCode.apply(String,this._parameterBits)),this._key}snapshot(){const e=this._parameterNames,t={key:this.key};for(const r of e)t[r]=this[r];return t}}function H(e={}){return(t,r)=>{if(t._parameterNames=t._parameterNames??[],t._parameterNames.push(r),null!=e.constValue)Object.defineProperty(t,r,{get:()=>e.constValue});else{const i=t._parameterNames.length-1,o=e.count||2,n=Math.ceil(Math.log2(o)),a=t._parameterBits??[0];let s=0;for(;a[s]+n>16;)s++,s>=a.length&&a.push(0);t._parameterBits=a;const c=a[s],l=(1<<n)-1<<c;a[s]+=n,Object.defineProperty(t,r,{get(){return this[i]},set(e){if(this[i]!==e&&(this[i]=e,this._keyDirty=!0,this._parameterBits[s]=this._parameterBits[s]&~l|+e<<c&l,"number"!=typeof e&&"boolean"!=typeof e))throw new Error("Configuration value for "+r+" must be boolean or number, got "+typeof e)}})}}}r(19869);var j=r(29298),W=r(20266),k=r(69421);let q=class extends b.T{constructor(){super(...arguments),this.SCENEVIEW_HITTEST_RETURN_INTERSECTOR=!1,this.DECONFLICTOR_SHOW_VISIBLE=!1,this.DECONFLICTOR_SHOW_INVISIBLE=!1,this.DECONFLICTOR_SHOW_GRID=!1,this.LABELS_SHOW_BORDER=!1,this.TEXT_SHOW_BASELINE=!1,this.TEXT_SHOW_BORDER=!1,this.OVERLAY_DRAW_DEBUG_TEXTURE=!1,this.OVERLAY_SHOW_CENTER=!1,this.SHOW_POI=!1,this.TESTS_DISABLE_OPTIMIZATIONS=!1,this.TESTS_DISABLE_FAST_UPDATES=!1,this.DRAW_MESH_GEOMETRY_NORMALS=!1,this.FEATURE_TILE_FETCH_SHOW_TILES=!1,this.FEATURE_TILE_TREE_SHOW_TILES=!1,this.TERRAIN_TILE_TREE_SHOW_TILES=!1,this.I3S_TREE_SHOW_TILES=!1,this.I3S_SHOW_MODIFICATIONS=!1,this.LOD_INSTANCE_RENDERER_DISABLE_UPDATES=!1,this.LOD_INSTANCE_RENDERER_COLORIZE_BY_LEVEL=!1,this.EDGES_SHOW_HIDDEN_TRANSPARENT_EDGES=!1,this.LINE_WIREFRAMES=!1}};(0,V._)([(0,j.MZ)()],q.prototype,"SCENEVIEW_HITTEST_RETURN_INTERSECTOR",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"DECONFLICTOR_SHOW_VISIBLE",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"DECONFLICTOR_SHOW_INVISIBLE",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"DECONFLICTOR_SHOW_GRID",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"LABELS_SHOW_BORDER",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"TEXT_SHOW_BASELINE",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"TEXT_SHOW_BORDER",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"OVERLAY_DRAW_DEBUG_TEXTURE",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"OVERLAY_SHOW_CENTER",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"SHOW_POI",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"TESTS_DISABLE_OPTIMIZATIONS",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"TESTS_DISABLE_FAST_UPDATES",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"DRAW_MESH_GEOMETRY_NORMALS",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"FEATURE_TILE_FETCH_SHOW_TILES",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"FEATURE_TILE_TREE_SHOW_TILES",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"TERRAIN_TILE_TREE_SHOW_TILES",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"I3S_TREE_SHOW_TILES",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"I3S_SHOW_MODIFICATIONS",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"LOD_INSTANCE_RENDERER_DISABLE_UPDATES",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"LOD_INSTANCE_RENDERER_COLORIZE_BY_LEVEL",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"EDGES_SHOW_HIDDEN_TRANSPARENT_EDGES",void 0),(0,V._)([(0,j.MZ)()],q.prototype,"LINE_WIREFRAMES",void 0),q=(0,V._)([(0,k.$)("esri.views.3d.support.debugFlags")],q),new q;var $=r(6407),X=r(81272),Y=r(57732),Z=r(80959),J=r(99063),K=r(64604);async function Q(e,t){const{data:r}=await(0,K.A)(e,{responseType:"image",...t});return r}var ee=r(18683),te=r(52134),re=r(89167),ie=r(37322);function oe(e,t,r,i,o=te.a.ADD,n=te.a.ADD,a=[0,0,0,0]){return{srcRgb:e,srcAlpha:t,dstRgb:r,dstAlpha:i,opRgb:o,opAlpha:n,color:{r:a[0],g:a[1],b:a[2],a:a[3]}}}const ne={face:te.F.BACK,mode:te.C.CCW},ae={face:te.F.FRONT,mode:te.C.CCW},se=e=>e===v.C.Back?ne:e===v.C.Front?ae:null,ce={zNear:0,zFar:1},le={r:!0,g:!0,b:!0,a:!0};function de(e){return Ee.intern(e)}function ue(e){return Ae.intern(e)}function he(e){return we.intern(e)}function me(e){return Re.intern(e)}function fe(e){return Ie.intern(e)}function pe(e){return Ne.intern(e)}function ge(e){return Le.intern(e)}function ve(e){return Be.intern(e)}function _e(e){return Ve.intern(e)}function xe(e){return Ue.intern(e)}class Te{constructor(e,t){this._makeKey=e,this._makeRef=t,this._interns=new Map}intern(e){if(!e)return null;const t=this._makeKey(e),r=this._interns;return r.has(t)||r.set(t,this._makeRef(e)),r.get(t)??null}}function be(e){return"["+e.join(",")+"]"}const Ee=new Te(Se,(e=>({__tag:"Blending",...e})));function Se(e){return e?be([e.srcRgb,e.srcAlpha,e.dstRgb,e.dstAlpha,e.opRgb,e.opAlpha,e.color.r,e.color.g,e.color.b,e.color.a]):null}const Ae=new Te(Me,(e=>({__tag:"Culling",...e})));function Me(e){return e?be([e.face,e.mode]):null}const we=new Te(ye,(e=>({__tag:"PolygonOffset",...e})));function ye(e){return e?be([e.factor,e.units]):null}const Re=new Te(Ce,(e=>({__tag:"DepthTest",...e})));function Ce(e){return e?be([e.func]):null}const Ie=new Te(Oe,(e=>({__tag:"StencilTest",...e})));function Oe(e){return e?be([e.function.func,e.function.ref,e.function.mask,e.operation.fail,e.operation.zFail,e.operation.zPass]):null}const Ne=new Te(Pe,(e=>({__tag:"DepthWrite",...e})));function Pe(e){return e?be([e.zNear,e.zFar]):null}const Le=new Te(De,(e=>({__tag:"ColorWrite",...e})));function De(e){return e?be([e.r,e.g,e.b,e.a]):null}const Be=new Te(Fe,(e=>({__tag:"StencilWrite",...e})));function Fe(e){return e?be([e.mask]):null}const Ve=new Te(Ge,(e=>({__tag:"DrawBuffers",...e})));function Ge(e){return e?be(e.buffers):null}const Ue=new Te((function(e){return e?be([Se(e.blending),Me(e.culling),ye(e.polygonOffset),Ce(e.depthTest),Oe(e.stencilTest),Pe(e.depthWrite),De(e.colorWrite),Fe(e.stencilWrite),Ge(e.drawBuffers)]):null}),(e=>({blending:de(e.blending),culling:ue(e.culling),polygonOffset:he(e.polygonOffset),depthTest:me(e.depthTest),stencilTest:fe(e.stencilTest),depthWrite:pe(e.depthWrite),colorWrite:ge(e.colorWrite),stencilWrite:ve(e.stencilWrite),drawBuffers:_e(e.drawBuffers)})));class ze{constructor(e){this.channel=e,this.id=(0,b.g)()}}function He(e,t=!1){return e<=p.n?t?new Array(e).fill(0):new Array(e):new Float32Array(e)}function je(e){if(e.length<p.n)return Array.from(e);if((0,p.d)(e))return Float64Array.from(e);if(!("BYTES_PER_ELEMENT"in e))return Array.from(e);switch(e.BYTES_PER_ELEMENT){case 1:return Uint8Array.from(e);case 2:return(0,p.g)(e)?Uint16Array.from(e):Int16Array.from(e);case 4:return Float32Array.from(e);default:return Float64Array.from(e)}}(0,m.c)(),new Float32Array(6);class We{constructor(e,t,r){this.primitiveIndices=e,this._numIndexPerPrimitive=t,this.position=r,this._children=void 0,(0,x.a)(e.length>=1),(0,x.a)(3===r.size||4===r.size);const{data:i,size:o,indices:n}=r;(0,x.a)(n.length%this._numIndexPerPrimitive==0),(0,x.a)(n.length>=e.length*this._numIndexPerPrimitive);const a=e.length;let s=o*n[this._numIndexPerPrimitive*e[0]];ke.clear(),ke.push(s);const c=(0,m.f)(i[s],i[s+1],i[s+2]),l=(0,m.e)(c);for(let t=0;t<a;++t){const r=this._numIndexPerPrimitive*e[t];for(let e=0;e<this._numIndexPerPrimitive;++e){s=o*n[r+e],ke.push(s);let t=i[s];c[0]=Math.min(t,c[0]),l[0]=Math.max(t,l[0]),t=i[s+1],c[1]=Math.min(t,c[1]),l[1]=Math.max(t,l[1]),t=i[s+2],c[2]=Math.min(t,c[2]),l[2]=Math.max(t,l[2])}}this.bbMin=c,this.bbMax=l;const d=(0,h.a)((0,m.c)(),this.bbMin,this.bbMax,.5);this.radius=.5*Math.max(Math.max(l[0]-c[0],l[1]-c[1]),l[2]-c[2]);let u=this.radius*this.radius;for(let e=0;e<ke.length;++e){s=ke.at(e);const t=i[s]-d[0],r=i[s+1]-d[1],o=i[s+2]-d[2],n=t*t+r*r+o*o;if(n<=u)continue;const a=Math.sqrt(n),c=.5*(a-this.radius);this.radius=this.radius+c,u=this.radius*this.radius;const l=c/a;d[0]+=t*l,d[1]+=r*l,d[2]+=o*l}this.center=d,ke.clear()}getChildren(){if(this._children||(0,h.m)(this.bbMin,this.bbMax)<=1)return this._children;const e=(0,h.a)((0,m.c)(),this.bbMin,this.bbMax,.5),t=this.primitiveIndices.length,r=new Uint8Array(t),i=new Array(8);for(let e=0;e<8;++e)i[e]=0;const{data:o,size:n,indices:a}=this.position;for(let s=0;s<t;++s){let t=0;const c=this._numIndexPerPrimitive*this.primitiveIndices[s];let l=n*a[c],d=o[l],u=o[l+1],h=o[l+2];for(let e=1;e<this._numIndexPerPrimitive;++e){l=n*a[c+e];const t=o[l],r=o[l+1],i=o[l+2];t<d&&(d=t),r<u&&(u=r),i<h&&(h=i)}d<e[0]&&(t|=1),u<e[1]&&(t|=2),h<e[2]&&(t|=4),r[s]=t,++i[t]}let s=0;for(let e=0;e<8;++e)i[e]>0&&++s;if(s<2)return;const c=new Array(8);for(let e=0;e<8;++e)c[e]=i[e]>0?new Uint32Array(i[e]):void 0;for(let e=0;e<8;++e)i[e]=0;for(let e=0;e<t;++e){const t=r[e];c[t][i[t]++]=this.primitiveIndices[e]}this._children=new Array;for(let e=0;e<8;++e)void 0!==c[e]&&this._children.push(new We(c[e],this._numIndexPerPrimitive,this.position));return this._children}static prune(){ke.prune()}}const ke=new _.P({deallocator:null}),qe=(0,m.c)(),$e=(0,m.c)(),Xe=(0,m.c)(),Ye=(0,m.c)();class Ze extends A{constructor(e,t,r=null,o=i.Mesh,n=null,a=-1){super(),this.material=e,this.mapPositions=r,this.type=o,this.objectAndLayerIdColor=n,this.edgeIndicesLength=a,this.visible=!0,this._attributes=new Map,this._boundingInfo=null;for(const[e,r]of t)this._attributes.set(e,{...r,indices:(0,g.c)(r.indices)}),e===E.V.POSITION&&(this.edgeIndicesLength=this.edgeIndicesLength<0?this._attributes.get(e).indices.length:this.edgeIndicesLength)}instantiate(e={}){const t=new Ze(e.material||this.material,[],this.mapPositions,this.type,this.objectAndLayerIdColor,this.edgeIndicesLength);return this._attributes.forEach(((e,r)=>{e.exclusive=!1,t._attributes.set(r,e)})),t._boundingInfo=this._boundingInfo,t.transformation=e.transformation||this.transformation,t}get attributes(){return this._attributes}getMutableAttribute(e){let t=this._attributes.get(e);return t&&!t.exclusive&&(t={...t,exclusive:!0,data:je(t.data)},this._attributes.set(e,t)),t}setAttributeData(e,t){const r=this._attributes.get(e);r&&this._attributes.set(e,{...r,exclusive:!0,data:t})}get indexCount(){const e=this._attributes.values().next().value.indices;return e?.length??0}get faceCount(){return this.indexCount/3}get boundingInfo(){return null==this._boundingInfo&&(this._boundingInfo=this._calculateBoundingInfo()),this._boundingInfo}computeAttachmentOrigin(e){return!!(this.type===i.Mesh?this._computeAttachmentOriginTriangles(e):this.type===i.Line?this._computeAttachmentOriginLines(e):this._computeAttachmentOriginPoints(e))&&(null!=this._transformation&&(0,h.h)(e,e,this._transformation),!0)}_computeAttachmentOriginTriangles(e){return function(e,t){if(!e)return!1;const{size:r,data:i,indices:o}=e;(0,h.s)(t,0,0,0),(0,h.s)(Ye,0,0,0);let n=0,a=0;for(let e=0;e<o.length-2;e+=3){const s=o[e]*r,c=o[e+1]*r,l=o[e+2]*r;(0,h.s)(qe,i[s],i[s+1],i[s+2]),(0,h.s)($e,i[c],i[c+1],i[c+2]),(0,h.s)(Xe,i[l],i[l+1],i[l+2]);const d=L(qe,$e,Xe);d?((0,h.i)(qe,qe,$e),(0,h.i)(qe,qe,Xe),(0,h.b)(qe,qe,1/3*d),(0,h.i)(t,t,qe),n+=d):((0,h.i)(Ye,Ye,qe),(0,h.i)(Ye,Ye,$e),(0,h.i)(Ye,Ye,Xe),a+=3)}return!(0===a&&0===n||(0!==n?((0,h.b)(t,t,1/n),0):0===a||((0,h.b)(t,Ye,1/a),0)))}(this.attributes.get(E.V.POSITION),e)}_computeAttachmentOriginLines(e){const t=this.attributes.get(E.V.POSITION);return function(e,t,r){if(!e)return!1;(0,h.s)(r,0,0,0),(0,h.s)(Ye,0,0,0);let i=0,o=0;const{size:n,data:a,indices:s}=e,c=s.length-1,l=c+(t?2:0);for(let e=0;e<l;e+=2){const t=e<c?e+1:0,l=s[e<c?e:c]*n,d=s[t]*n;qe[0]=a[l],qe[1]=a[l+1],qe[2]=a[l+2],$e[0]=a[d],$e[1]=a[d+1],$e[2]=a[d+2],(0,h.b)(qe,(0,h.i)(qe,qe,$e),.5);const u=(0,h.G)(qe,$e);u>0?((0,h.i)(r,r,(0,h.b)(qe,qe,u)),i+=u):0===i&&((0,h.i)(Ye,Ye,qe),o++)}return 0!==i?((0,h.b)(r,r,1/i),!0):0!==o&&((0,h.b)(r,Ye,1/o),!0)}(t,function(e,t){return!(!("isClosed"in e)||!e.isClosed)&&t.indices.length>2}(this.material.parameters,t),e)}_computeAttachmentOriginPoints(e){return function(e,t){if(!e)return!1;const{size:r,data:i,indices:o}=e;(0,h.s)(t,0,0,0);let n=-1,a=0;for(let e=0;e<o.length;e++){const s=o[e]*r;n!==s&&(t[0]+=i[s],t[1]+=i[s+1],t[2]+=i[s+2],a++),n=s}return a>1&&(0,h.b)(t,t,1/a),a>0}(this.attributes.get(E.V.POSITION),e)}invalidateBoundingInfo(){this._boundingInfo=null}_calculateBoundingInfo(){const e=this.attributes.get(E.V.POSITION);if(!e||0===e.indices.length)return null;const t=this.type===i.Mesh?3:1;(0,x.a)(e.indices.length%t==0,"Indexing error: "+e.indices.length+" not divisible by "+t);const r=(0,g.a)(e.indices.length/t);return new We(r,t,e)}get transformation(){return this._transformation??d.I}set transformation(e){this._transformation=e&&e!==d.I?(0,d.a)(e):null}addHighlight(){const e=new ze(v.O.Highlight);return this.highlights=function(e,t){return null==e&&(e=[]),e.push(t),e}(this.highlights,e),e}removeHighlight(e){this.highlights=function(e,t){if(null==e)return null;const r=e.filter((e=>e!==t));return 0===r.length?null:r}(this.highlights,e)}}class Je{constructor(e){this._material=e.material,this._techniques=e.techniques,this._output=e.output}dispose(){this._techniques.release(this._technique)}get technique(){return this._technique}get _stippleTextures(){return this._techniques.constructionContext.stippleTextures}get _markerTextures(){return this._techniques.constructionContext.markerTextures}ensureTechnique(e,t){return this._technique=this._techniques.releaseAndAcquire(e,this._material.getConfiguration(this._output,t),this._technique),this._technique}ensureResources(e){return v.R.LOADED}}var Ke,Qe,et,tt;!function(e){e[e.INTEGRATED_MESH=0]="INTEGRATED_MESH",e[e.OPAQUE_TERRAIN=1]="OPAQUE_TERRAIN",e[e.OPAQUE_MATERIAL=2]="OPAQUE_MATERIAL",e[e.OPAQUE_NO_SSAO_DEPTH=3]="OPAQUE_NO_SSAO_DEPTH",e[e.TRANSPARENT_MATERIAL=4]="TRANSPARENT_MATERIAL",e[e.TRANSPARENT_NO_SSAO_DEPTH=5]="TRANSPARENT_NO_SSAO_DEPTH",e[e.TRANSPARENT_TERRAIN=6]="TRANSPARENT_TERRAIN",e[e.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL=7]="TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL",e[e.OCCLUDED_TERRAIN=8]="OCCLUDED_TERRAIN",e[e.OCCLUDER_MATERIAL=9]="OCCLUDER_MATERIAL",e[e.TRANSPARENT_OCCLUDER_MATERIAL=10]="TRANSPARENT_OCCLUDER_MATERIAL",e[e.OCCLUSION_PIXELS=11]="OCCLUSION_PIXELS",e[e.OPAQUE_ENVIRONMENT=12]="OPAQUE_ENVIRONMENT",e[e.TRANSPARENT_ENVIRONMENT=13]="TRANSPARENT_ENVIRONMENT",e[e.LASERLINES=14]="LASERLINES",e[e.LASERLINES_CONTRAST_CONTROL=15]="LASERLINES_CONTRAST_CONTROL",e[e.HUD_MATERIAL=16]="HUD_MATERIAL",e[e.LABEL_MATERIAL=17]="LABEL_MATERIAL",e[e.LINE_CALLOUTS=18]="LINE_CALLOUTS",e[e.LINE_CALLOUTS_HUD_DEPTH=19]="LINE_CALLOUTS_HUD_DEPTH",e[e.DRAPED_MATERIAL=20]="DRAPED_MATERIAL",e[e.DRAPED_WATER=21]="DRAPED_WATER",e[e.VIEWSHED=22]="VIEWSHED",e[e.VOXEL=23]="VOXEL",e[e.MAX_SLOTS=24]="MAX_SLOTS"}(Ke||(Ke={})),function(e){e[e.Undefined=0]="Undefined",e[e.DefinedSize=1]="DefinedSize",e[e.DefinedScale=2]="DefinedScale"}(Qe||(Qe={})),function(e){e[e.Undefined=0]="Undefined",e[e.DefinedAngle=1]="DefinedAngle"}(et||(et={})),T.N,(0,d.c)(),(0,m.c)(),(0,d.c)(),function(e){e[e.ColorAlpha=0]="ColorAlpha",e[e.FrontFace=1]="FrontFace",e[e.NONE=2]="NONE",e[e.COUNT=3]="COUNT"}(tt||(tt={}));class rt extends G.U{constructor(e,t){super(e,"mat4",U.B.Draw,((r,i,o)=>r.setUniformMatrix4fv(e,t(i,o))))}}function it(e,t){t.instancedDoublePrecision?e.constants.add("cameraPosition","vec3",m.Z):e.uniforms.add(new G.b("cameraPosition",((e,t)=>(0,h.s)(at,t.camera.viewInverseTransposeMatrix[3]-e.origin[0],t.camera.viewInverseTransposeMatrix[7]-e.origin[1],t.camera.viewInverseTransposeMatrix[11]-e.origin[2]))))}function ot(e,t){if(!t.instancedDoublePrecision)return void e.uniforms.add(new G.a("proj",((e,t)=>t.camera.projectionMatrix)),new rt("view",((e,t)=>(0,l.w)(nt,t.camera.viewMatrix,e.origin))),new G.b("localOrigin",(e=>e.origin)));const r=e=>(0,h.s)(at,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]);e.uniforms.add(new G.a("proj",((e,t)=>t.camera.projectionMatrix)),new G.a("view",((e,t)=>(0,l.w)(nt,t.camera.viewMatrix,r(t)))),new G.F("localOrigin",((e,t)=>r(t))))}const nt=(0,d.c)(),at=(0,m.c)();class st extends z{constructor(){super(...arguments),this.instancedDoublePrecision=!1,this.hasModelTransformation=!1}}(0,V._)([H()],st.prototype,"instancedDoublePrecision",void 0),(0,V._)([H()],st.prototype,"hasModelTransformation",void 0);const ct=(0,c.c)();function lt(e,t){const r=t.hasModelTransformation,i=t.instancedDoublePrecision;r&&(e.vertex.uniforms.add(new G.a("model",(e=>e.modelTransformation??d.I))),e.vertex.uniforms.add(new G.M("normalLocalOriginFromModel",(e=>((0,s.n)(ct,e.modelTransformation??d.I),ct))))),t.instanced&&i&&(e.attributes.add(E.V.INSTANCEMODELORIGINHI,"vec3"),e.attributes.add(E.V.INSTANCEMODELORIGINLO,"vec3"),e.attributes.add(E.V.INSTANCEMODEL,"mat3"),e.attributes.add(E.V.INSTANCEMODELNORMAL,"mat3"));const o=e.vertex;i&&(o.include(G.D,t),o.uniforms.add(new G.b("viewOriginHi",((e,t)=>function(e,t){const r=e.length;for(let i=0;i<r;++i)F[0]=e[i],t[i]=F[0];return t}((0,h.s)(dt,t.camera.viewInverseTransposeMatrix[3],t.camera.viewInverseTransposeMatrix[7],t.camera.viewInverseTransposeMatrix[11]),dt))),new G.b("viewOriginLo",((e,t)=>function(e,t){const r=e.length;for(let i=0;i<r;++i)F[0]=e[i],F[1]=e[i]-F[0],t[i]=F[1];return t}((0,h.s)(dt,t.camera.viewInverseTransposeMatrix[3],t.camera.viewInverseTransposeMatrix[7],t.camera.viewInverseTransposeMatrix[11]),dt))))),o.code.add(T.g`
    vec3 getVertexInLocalOriginSpace() {
      return ${r?i?"(model * vec4(instanceModel * localPosition().xyz, 1.0)).xyz":"(model * localPosition()).xyz":i?"instanceModel * localPosition().xyz":"localPosition().xyz"};
    }

    vec3 subtractOrigin(vec3 _pos) {
      ${i?T.g`
          // Negated inputs are intentionally the first two arguments. The other way around the obfuscation in dpAdd() stopped
          // working for macOS 14+ and iOS 17+.
          // Issue: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/56280
          vec3 originDelta = dpAdd(-instanceModelOriginHi, -instanceModelOriginLo, viewOriginHi, viewOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `),o.code.add(T.g`
    vec3 dpNormal(vec4 _normal) {
      return normalize(${r?i?"normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz)":"normalLocalOriginFromModel * _normal.xyz":i?"instanceModelNormal * _normal.xyz":"_normal.xyz"});
    }
    `),t.output===G.S.Normal&&(function(e){e.uniforms.add(new G.a("viewNormal",((e,t)=>t.camera.viewInverseTransposeMatrix)))}(o),o.code.add(T.g`
    vec3 dpNormalView(vec4 _normal) {
      return normalize((viewNormal * ${r?i?"vec4(normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz), 1.0)":"vec4(normalLocalOriginFromModel * _normal.xyz, 1.0)":i?"vec4(instanceModelNormal * _normal.xyz, 1.0)":"_normal"}).xyz);
    }
    `)),t.hasVertexTangents&&o.code.add(T.g`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${r?i?"return vec4(normalLocalOriginFromModel * (instanceModelNormal * _tangent.xyz), _tangent.w);":"return vec4(normalLocalOriginFromModel * _tangent.xyz, _tangent.w);":i?"return vec4(instanceModelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}
    }`)}const dt=(0,m.c)();class ut extends st{}function ht(e,t){!function(e,t,...r){if(!t.hasSlicePlane){const r=T.g`#define rejectBySlice(_pos_) false
#define discardBySlice(_pos_) {}
#define highlightSlice(_color_, _pos_) (_color_)`;return t.hasSliceInVertexProgram&&e.vertex.code.add(r),void e.fragment.code.add(r)}t.hasSliceInVertexProgram&&e.vertex.uniforms.add(...r),e.fragment.uniforms.add(...r);const i=T.g`struct SliceFactors {
float front;
float side0;
float side1;
float side2;
float side3;
};
SliceFactors calculateSliceFactors(vec3 pos) {
vec3 rel = pos - slicePlaneOrigin;
vec3 slicePlaneNormal = -cross(slicePlaneBasis1, slicePlaneBasis2);
float slicePlaneW = -dot(slicePlaneNormal, slicePlaneOrigin);
float basis1Len2 = dot(slicePlaneBasis1, slicePlaneBasis1);
float basis2Len2 = dot(slicePlaneBasis2, slicePlaneBasis2);
float basis1Dot = dot(slicePlaneBasis1, rel);
float basis2Dot = dot(slicePlaneBasis2, rel);
return SliceFactors(
dot(slicePlaneNormal, pos) + slicePlaneW,
-basis1Dot - basis1Len2,
basis1Dot - basis1Len2,
-basis2Dot - basis2Len2,
basis2Dot - basis2Len2
);
}
bool sliceByFactors(SliceFactors factors) {
return factors.front < 0.0
&& factors.side0 < 0.0
&& factors.side1 < 0.0
&& factors.side2 < 0.0
&& factors.side3 < 0.0;
}
bool sliceEnabled() {
return dot(slicePlaneBasis1, slicePlaneBasis1) != 0.0;
}
bool sliceByPlane(vec3 pos) {
return sliceEnabled() && sliceByFactors(calculateSliceFactors(pos));
}
#define rejectBySlice(_pos_) sliceByPlane(_pos_)
#define discardBySlice(_pos_) { if (sliceByPlane(_pos_)) discard; }`,o=T.g`vec4 applySliceHighlight(vec4 color, vec3 pos) {
SliceFactors factors = calculateSliceFactors(pos);
const float HIGHLIGHT_WIDTH = 1.0;
const vec4 HIGHLIGHT_COLOR = vec4(0.0, 0.0, 0.0, 0.3);
factors.front /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.front);
factors.side0 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side0);
factors.side1 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side1);
factors.side2 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side2);
factors.side3 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side3);
if (sliceByFactors(factors)) {
return color;
}
float highlightFactor = (1.0 - step(0.5, factors.front))
* (1.0 - step(0.5, factors.side0))
* (1.0 - step(0.5, factors.side1))
* (1.0 - step(0.5, factors.side2))
* (1.0 - step(0.5, factors.side3));
return mix(color, vec4(HIGHLIGHT_COLOR.rgb, color.a), highlightFactor * HIGHLIGHT_COLOR.a);
}`,n=t.hasSliceHighlight?T.g`
        ${o}
        #define highlightSlice(_color_, _pos_) (sliceEnabled() ? applySliceHighlight(_color_, _pos_) : (_color_))
      `:T.g`#define highlightSlice(_color_, _pos_) (_color_)`;t.hasSliceInVertexProgram&&e.vertex.code.add(i),e.fragment.code.add(i),e.fragment.code.add(n)}(e,t,new G.b("slicePlaneOrigin",((e,r)=>function(e,t,r){if(null==r.slicePlane)return m.Z;const i=mt(e,t,r),o=ft(i,r.slicePlane),n=pt(e,i,r);return null!=n?(0,h.h)(_t,o,n):o}(t,e,r))),new G.b("slicePlaneBasis1",((e,r)=>gt(t,e,r,r.slicePlane?.basis1))),new G.b("slicePlaneBasis2",((e,r)=>gt(t,e,r,r.slicePlane?.basis2))))}function mt(e,t,r){return e.instancedDoublePrecision?(0,h.s)(vt,r.camera.viewInverseTransposeMatrix[3],r.camera.viewInverseTransposeMatrix[7],r.camera.viewInverseTransposeMatrix[11]):t.slicePlaneLocalOrigin}function ft(e,t){return null!=e?(0,h.c)(_t,t.origin,e):t.origin}function pt(e,t,r){return e.hasSliceTranslatedView?null!=t?(0,l.w)(Tt,r.camera.viewMatrix,t):r.camera.viewMatrix:null}function gt(e,t,r,i){if(null==i||null==r.slicePlane)return m.Z;const o=mt(e,t,r),n=ft(o,r.slicePlane),a=pt(e,o,r);return null!=a?((0,h.i)(xt,i,n),(0,h.h)(_t,n,a),(0,h.h)(xt,xt,a),(0,h.c)(xt,xt,_t)):i}(0,V._)([H({constValue:!0})],ut.prototype,"hasSliceHighlight",void 0),(0,V._)([H({constValue:!1})],ut.prototype,"hasSliceInVertexProgram",void 0),(0,V._)([H({constValue:U.B.Pass})],ut.prototype,"pbrTextureBindType",void 0),T.N;const vt=(0,m.c)(),_t=(0,m.c)(),xt=(0,m.c)(),Tt=(0,d.c)();function bt(e,t){const r=t.output===G.S.ObjectAndLayerIdColor,i=t.objectAndLayerIdColorInstanced;r&&(e.varyings.add("objectAndLayerIdColorVarying","vec4"),i?e.attributes.add(E.V.INSTANCEOBJECTANDLAYERIDCOLOR,"vec4"):e.attributes.add(E.V.OBJECTANDLAYERIDCOLOR,"vec4")),e.vertex.code.add(T.g`
     void forwardObjectAndLayerIdColor() {
      ${r?i?T.g`objectAndLayerIdColorVarying = instanceObjectAndLayerIdColor * 0.003921568627451;`:T.g`objectAndLayerIdColorVarying = objectAndLayerIdColor * 0.003921568627451;`:T.g``} }`),e.fragment.code.add(T.g`
      void outputObjectAndLayerIdColor() {
        ${r?T.g`fragColor = objectAndLayerIdColorVarying;`:T.g``} }`)}class Et extends G.U{constructor(e,t,r){super(e,"vec4",U.B.Pass,((r,i,o)=>r.setUniform4fv(e,t(i,o))),r)}}class St extends G.U{constructor(e,t,r){super(e,"float",U.B.Pass,((r,i,o)=>r.setUniform1fv(e,t(i,o))),r)}}function At(e,t){const{vertex:r,attributes:i}=e;t.hasVvInstancing&&(t.vvSize||t.vvColor)&&i.add(E.V.INSTANCEFEATUREATTRIBUTE,"vec4"),t.vvSize?(r.uniforms.add(new G.F("vvSizeMinSize",(e=>e.vvSize.minSize))),r.uniforms.add(new G.F("vvSizeMaxSize",(e=>e.vvSize.maxSize))),r.uniforms.add(new G.F("vvSizeOffset",(e=>e.vvSize.offset))),r.uniforms.add(new G.F("vvSizeFactor",(e=>e.vvSize.factor))),r.uniforms.add(new G.M("vvSymbolRotationMatrix",(e=>e.vvSymbolRotationMatrix))),r.uniforms.add(new G.F("vvSymbolAnchor",(e=>e.vvSymbolAnchor))),r.code.add(T.g`vec3 vvScale(vec4 _featureAttribute) {
return clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize);
}
vec4 vvTransformPosition(vec3 position, vec4 _featureAttribute) {
return vec4(vvSymbolRotationMatrix * ( vvScale(_featureAttribute) * (position + vvSymbolAnchor)), 1.0);
}`),r.code.add(T.g`
      const float eps = 1.192092896e-07;
      vec4 vvTransformNormal(vec3 _normal, vec4 _featureAttribute) {
        vec3 vvScale = clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize + eps, vvSizeMaxSize);
        return vec4(vvSymbolRotationMatrix * _normal / vvScale, 1.0);
      }

      ${t.hasVvInstancing?T.g`
      vec4 vvLocalNormal(vec3 _normal) {
        return vvTransformNormal(_normal, instanceFeatureAttribute);
      }

      vec4 localPosition() {
        return vvTransformPosition(position, instanceFeatureAttribute);
      }`:""}
    `)):r.code.add(T.g`vec4 localPosition() { return vec4(position, 1.0); }
vec4 vvLocalNormal(vec3 _normal) { return vec4(_normal, 1.0); }`),t.vvColor?(r.constants.add("vvColorNumber","int",8),r.uniforms.add(new St("vvColorValues",(e=>e.vvColor.values),8),new Et("vvColorColors",(e=>e.vvColor.colors),8)),r.code.add(T.g`
      vec4 interpolateVVColor(float value) {
        if (value <= vvColorValues[0]) {
          return vvColorColors[0];
        }

        for (int i = 1; i < vvColorNumber; ++i) {
          if (vvColorValues[i] >= value) {
            float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
            return mix(vvColorColors[i-1], vvColorColors[i], f);
          }
        }
        return vvColorColors[vvColorNumber - 1];
      }

      vec4 vvGetColor(vec4 featureAttribute) {
        return interpolateVVColor(featureAttribute.y);
      }

      ${t.hasVvInstancing?T.g`
            vec4 vvColor() {
              return vvGetColor(instanceFeatureAttribute);
            }`:"vec4 vvColor() { return vec4(1.0); }"}
    `)):r.code.add(T.g`vec4 vvColor() { return vec4(1.0); }`)}class Mt extends G.U{constructor(e,t){super(e,"vec4",U.B.Pass,((r,i,o)=>r.setUniform4fv(e,t(i,o))))}}class wt extends G.U{constructor(e,t){super(e,"sampler2D",U.B.Pass,((r,i,o)=>r.bindTexture(e,t(i,o))))}}let yt;var Rt;!function(e){e[e.ETC1_RGB=0]="ETC1_RGB",e[e.ETC2_RGBA=1]="ETC2_RGBA",e[e.BC1_RGB=2]="BC1_RGB",e[e.BC3_RGBA=3]="BC3_RGBA",e[e.BC4_R=4]="BC4_R",e[e.BC5_RG=5]="BC5_RG",e[e.BC7_M6_RGB=6]="BC7_M6_RGB",e[e.BC7_M5_RGBA=7]="BC7_M5_RGBA",e[e.PVRTC1_4_RGB=8]="PVRTC1_4_RGB",e[e.PVRTC1_4_RGBA=9]="PVRTC1_4_RGBA",e[e.ASTC_4x4_RGBA=10]="ASTC_4x4_RGBA",e[e.ATC_RGB=11]="ATC_RGB",e[e.ATC_RGBA=12]="ATC_RGBA",e[e.FXT1_RGB=17]="FXT1_RGB",e[e.PVRTC2_4_RGB=18]="PVRTC2_4_RGB",e[e.PVRTC2_4_RGBA=19]="PVRTC2_4_RGBA",e[e.ETC2_EAC_R11=20]="ETC2_EAC_R11",e[e.ETC2_EAC_RG11=21]="ETC2_EAC_RG11",e[e.RGBA32=13]="RGBA32",e[e.RGB565=14]="RGB565",e[e.BGR565=15]="BGR565",e[e.RGBA4444=16]="RGBA4444"}(Rt||(Rt={}));let Ct=null,It=null;async function Ot(){return null==It&&(yt??=(async()=>{const e=await r.e(8674).then(r.bind(r,68674)),t=await e.default({locateFile:e=>(0,ee.g)(`esri/libs/basisu/${e}`)});return t.initializeBasis(),t})(),It=yt,Ct=await It),It}function Nt(e,t,r,i,o){const n=(0,re.e)(t?te.m.COMPRESSED_RGBA8_ETC2_EAC:te.m.COMPRESSED_RGB8_ETC2),a=o&&e>1?(4**e-1)/(3*4**(e-1)):1;return Math.ceil(r*i*n*a)}function Pt(e){return e.getNumImages()>=1&&!e.isUASTC()}function Lt(e){return e.getFaces()>=1&&e.isETC1S()}function Dt(e,t,r,i,o,n,a,s){const{compressedTextureETC:c,compressedTextureS3TC:l}=e.capabilities,[d,u]=c?i?[Rt.ETC2_RGBA,te.m.COMPRESSED_RGBA8_ETC2_EAC]:[Rt.ETC1_RGB,te.m.COMPRESSED_RGB8_ETC2]:l?i?[Rt.BC3_RGBA,te.m.COMPRESSED_RGBA_S3TC_DXT5_EXT]:[Rt.BC1_RGB,te.m.COMPRESSED_RGB_S3TC_DXT1_EXT]:[Rt.RGBA32,te.d.RGBA],h=t.hasMipmap?r:Math.min(1,r),m=[];for(let e=0;e<h;e++)m.push(new Uint8Array(a(e,d))),s(e,d,m[e]);return t.internalFormat=u,t.hasMipmap=m.length>1,t.samplingMode=t.hasMipmap?te.c.LINEAR_MIPMAP_LINEAR:te.c.LINEAR,t.width=o,t.height=n,new re.T(e,t,{type:"compressed",levels:m})}const Bt=()=>W.L.getLogger("esri.views.3d.webgl-engine.lib.DDSUtil");function Ft(e){return e.charCodeAt(0)+(e.charCodeAt(1)<<8)+(e.charCodeAt(2)<<16)+(e.charCodeAt(3)<<24)}const Vt=Ft("DXT1"),Gt=Ft("DXT3"),Ut=Ft("DXT5");function zt(e,t,r){if(e instanceof ImageData)return zt(Ht(e),t,r);const i=document.createElement("canvas");return i.width=t,i.height=r,i.getContext("2d").drawImage(e,0,0,i.width,i.height),i}function Ht(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");if(null==r)throw new $.A("Failed to create 2d context from HTMLCanvasElement");return r.putImageData(e,0,0),t}class jt extends A{get parameters(){return this._parameters}constructor(e,t){super(),this._data=e,this.type=i.Texture,this._glTexture=null,this._loadingPromise=null,this._loadingController=null,this.events=new X.A,this._parameters={...qt,...t},this._startPreload(e)}dispose(){this.unload(),this._data=this.frameUpdate=void 0}_startPreload(e){null!=e&&(e instanceof HTMLVideoElement?(this.frameUpdate=t=>this._frameUpdate(e,t),this._startPreloadVideoElement(e)):e instanceof HTMLImageElement&&this._startPreloadImageElement(e))}_startPreloadVideoElement(e){if(!((0,J.w8)(e.src)||"auto"===e.preload&&e.crossOrigin)){e.preload="auto",e.crossOrigin="anonymous";const t=!e.paused;if(e.src=e.src,t&&e.autoplay){const t=()=>{e.removeEventListener("canplay",t),e.play()};e.addEventListener("canplay",t)}}}_startPreloadImageElement(e){(0,J.DB)(e.src)||(0,J.w8)(e.src)||e.crossOrigin||(e.crossOrigin="anonymous",e.src=e.src)}_createDescriptor(e){const t=new re.a;return t.wrapMode=this._parameters.wrap??te.T.REPEAT,t.flipped=!this._parameters.noUnpackFlip,t.samplingMode=this._parameters.mipmap?te.c.LINEAR_MIPMAP_LINEAR:te.c.LINEAR,t.hasMipmap=!!this._parameters.mipmap,t.preMultiplyAlpha=!!this._parameters.preMultiplyAlpha,t.maxAnisotropy=this._parameters.maxAnisotropy??(this._parameters.mipmap?e.parameters.maxMaxAnisotropy:1),t}get glTexture(){return this._glTexture}get memoryEstimate(){return this._glTexture?.usedMemory||function(e,t){if(null==e)return 0;if((0,p.s)(e)||(0,p.K)(e))return t.encoding===v.T.KTX2_ENCODING?function(e,t){if(null==Ct)return e.byteLength;const r=new Ct.KTX2File(new Uint8Array(e)),i=Lt(r)?Nt(r.getLevels(),r.getHasAlpha(),r.getWidth(),r.getHeight(),t):0;return r.close(),r.delete(),i}(e,!!t.mipmap):t.encoding===v.T.BASIS_ENCODING?function(e,t){if(null==Ct)return e.byteLength;const r=new Ct.BasisFile(new Uint8Array(e)),i=Pt(r)?Nt(r.getNumLevels(0),r.getHasAlpha(),r.getImageWidth(0,0),r.getImageHeight(0,0),t):0;return r.close(),r.delete(),i}(e,!!t.mipmap):e.byteLength;const{width:r,height:i}=e instanceof Image||e instanceof ImageData||e instanceof HTMLCanvasElement||e instanceof HTMLVideoElement?Wt(e):t;return(t.mipmap?4/3:1)*r*i*(t.components||4)||0}(this._data,this._parameters)}load(e){if(this._glTexture)return this._glTexture;if(this._loadingPromise)return this._loadingPromise;const t=this._data;return null==t?(this._glTexture=new re.T(e,this._createDescriptor(e),null),this._glTexture):(this._parameters.reloadable||(this._data=void 0),"string"==typeof t?this._loadFromURL(e,t):t instanceof Image?this._loadFromImageElement(e,t):t instanceof HTMLVideoElement?this._loadFromVideoElement(e,t):t instanceof ImageData||t instanceof HTMLCanvasElement?this._loadFromImage(e,t):((0,p.s)(t)||(0,p.K)(t))&&this._parameters.encoding===v.T.DDS_ENCODING?this._loadFromDDSData(e,t):((0,p.s)(t)||(0,p.K)(t))&&this._parameters.encoding===v.T.KTX2_ENCODING?this._loadFromKTX2(e,t):((0,p.s)(t)||(0,p.K)(t))&&this._parameters.encoding===v.T.BASIS_ENCODING?this._loadFromBasis(e,t):(0,p.K)(t)?this._loadFromPixelData(e,t):(0,p.s)(t)?this._loadFromPixelData(e,new Uint8Array(t)):null)}_frameUpdate(e,t){return null==this._glTexture||e.readyState<kt.HAVE_CURRENT_DATA||t===e.currentTime?t:(this._glTexture.setData(e),this._glTexture.descriptor.hasMipmap&&this._glTexture.generateMipmap(),this._parameters.updateCallback&&this._parameters.updateCallback(),e.currentTime)}_loadFromDDSData(e,t){return this._glTexture=function(e,t,r){const i=function(e,t){const r=new Int32Array(e,0,31);if(542327876!==r[0])return Bt().error("Invalid magic number in DDS header"),null;if(!(4&r[20]))return Bt().error("Unsupported format, must contain a FourCC code"),null;const i=r[21];let o,n;switch(i){case Vt:o=8,n=te.m.COMPRESSED_RGB_S3TC_DXT1_EXT;break;case Gt:o=16,n=te.m.COMPRESSED_RGBA_S3TC_DXT3_EXT;break;case Ut:o=16,n=te.m.COMPRESSED_RGBA_S3TC_DXT5_EXT;break;default:return Bt().error("Unsupported FourCC code:",(a=i,String.fromCharCode(255&a,a>>8&255,a>>16&255,a>>24&255))),null}var a;let s=1,c=r[4],l=r[3];(3&c||3&l)&&(Bt().warn("Rounding up compressed texture size to nearest multiple of 4."),c=c+3&-4,l=l+3&-4);const d=c,u=l;131072&r[2]&&!1!==t&&(s=Math.max(1,r[7]));let h,m,f=r[1]+4;const p=[];for(let t=0;t<s;++t)m=(c+3>>2)*(l+3>>2)*o,h=new Uint8Array(e,f,m),p.push(h),f+=m,c=Math.max(1,c>>1),l=Math.max(1,l>>1);return{textureData:{type:"compressed",levels:p},internalFormat:n,width:d,height:u}}(r,t.hasMipmap??!1);if(null==i)throw new Error("DDS texture data is null");const{textureData:o,internalFormat:n,width:a,height:s}=i;return t.samplingMode=o.levels.length>1?te.c.LINEAR_MIPMAP_LINEAR:te.c.LINEAR,t.hasMipmap=o.levels.length>1,t.internalFormat=n,t.width=a,t.height=s,new re.T(e,t,o)}(e,this._createDescriptor(e),t),this._glTexture}_loadFromKTX2(e,t){return this._loadAsync((()=>async function(e,t,r){null==Ct&&(Ct=await Ot());const i=new Ct.KTX2File(new Uint8Array(r));if(!Lt(i))return null;i.startTranscoding();const o=Dt(e,t,i.getLevels(),i.getHasAlpha(),i.getWidth(),i.getHeight(),((e,t)=>i.getImageTranscodedSizeInBytes(e,0,0,t)),((e,t,r)=>i.transcodeImage(r,e,0,0,t,0,-1,-1)));return i.close(),i.delete(),o}(e,this._createDescriptor(e),t).then((e=>(this._glTexture=e,e)))))}_loadFromBasis(e,t){return this._loadAsync((()=>async function(e,t,r){null==Ct&&(Ct=await Ot());const i=new Ct.BasisFile(new Uint8Array(r));if(!Pt(i))return null;i.startTranscoding();const o=Dt(e,t,i.getNumLevels(0),i.getHasAlpha(),i.getImageWidth(0,0),i.getImageHeight(0,0),((e,t)=>i.getImageTranscodedSizeInBytes(0,e,t)),((e,t,r)=>i.transcodeImage(r,0,e,t,0,0)));return i.close(),i.delete(),o}(e,this._createDescriptor(e),t).then((e=>(this._glTexture=e,e)))))}_loadFromPixelData(e,t){(0,x.a)(this._parameters.width>0&&this._parameters.height>0);const r=this._createDescriptor(e);return r.pixelFormat=1===this._parameters.components?te.d.LUMINANCE:3===this._parameters.components?te.d.RGB:te.d.RGBA,r.width=this._parameters.width??0,r.height=this._parameters.height??0,this._glTexture=new re.T(e,r,t),this._glTexture}_loadFromURL(e,t){return this._loadAsync((async r=>{const i=await Q(t,{signal:r});return(0,Z.Te)(r),this._loadFromImage(e,i)}))}_loadFromImageElement(e,t){return t.complete?this._loadFromImage(e,t):this._loadAsync((async r=>{const i=await(0,K.l)(t,t.src,!1,r);return(0,Z.Te)(r),this._loadFromImage(e,i)}))}_loadFromVideoElement(e,t){return t.readyState>=kt.HAVE_CURRENT_DATA?this._loadFromImage(e,t):this._loadFromVideoElementAsync(e,t)}_loadFromVideoElementAsync(e,t){return this._loadAsync((r=>new Promise(((i,o)=>{const n=()=>{t.removeEventListener("loadeddata",a),t.removeEventListener("error",s),(0,Y.r)(c)},a=()=>{t.readyState>=kt.HAVE_CURRENT_DATA&&(n(),i(this._loadFromImage(e,t)))},s=e=>{n(),o(e||new $.A("Failed to load video"))};t.addEventListener("loadeddata",a),t.addEventListener("error",s);const c=(0,Z.u7)(r,(()=>s((0,Z.NK)())))}))))}_loadFromImage(e,t){let r=t;if(!(r instanceof HTMLVideoElement)){const{maxTextureSize:t}=e.parameters;r=this._parameters.downsampleUncompressed?function(e,t){let r=e.width*e.height;if(r<4096)return e instanceof ImageData?Ht(e):e;let i=e.width,o=e.height;do{i=Math.ceil(i/2),o=Math.ceil(o/2),r=i*o}while(r>1048576||null!=t&&(i>t||o>t));return zt(e,i,o)}(r,t):function(e,t){const r=Math.max(e.width,e.height);if(r<=t)return e;const i=t/r;return zt(e,Math.round(e.width*i),Math.round(e.height*i))}(r,t)}const i=Wt(r);this._parameters.width=i.width,this._parameters.height=i.height;const o=this._createDescriptor(e);return o.pixelFormat=3===this._parameters.components?te.d.RGB:te.d.RGBA,o.width=i.width,o.height=i.height,this._glTexture=new re.T(e,o,r),this._glTexture}_loadAsync(e){const t=new AbortController;this._loadingController=t;const r=e(t.signal);this._loadingPromise=r;const i=()=>{this._loadingController===t&&(this._loadingController=null),this._loadingPromise===r&&(this._loadingPromise=null)};return r.then(i,i),r}unload(){if(this._glTexture=(0,Y.f)(this._glTexture),null!=this._loadingController){const e=this._loadingController;this._loadingController=null,this._loadingPromise=null,e.abort()}this.events.emit("unloaded")}}function Wt(e){return e instanceof HTMLVideoElement?{width:e.videoWidth,height:e.videoHeight}:e}var kt;!function(e){e[e.HAVE_NOTHING=0]="HAVE_NOTHING",e[e.HAVE_METADATA=1]="HAVE_METADATA",e[e.HAVE_CURRENT_DATA=2]="HAVE_CURRENT_DATA",e[e.HAVE_FUTURE_DATA=3]="HAVE_FUTURE_DATA",e[e.HAVE_ENOUGH_DATA=4]="HAVE_ENOUGH_DATA"}(kt||(kt={}));const qt={wrap:{s:te.T.REPEAT,t:te.T.REPEAT},mipmap:!0,noUnpackFlip:!1,preMultiplyAlpha:!1,downsampleUncompressed:!1};class $t extends G.U{constructor(e,t){super(e,"vec2",U.B.Pass,((r,i,o)=>r.setUniform2fv(e,t(i,o))))}}function Xt(e){e.uniforms.add(new $t("zProjectionMap",((e,t)=>function(e){const t=e.projectionMatrix;return(0,ie.g)(Yt,t[14],t[10])}(t.camera)))),e.code.add(T.g`float linearizeDepth(float depth) {
float depthNdc = depth * 2.0 - 1.0;
float c1 = zProjectionMap[0];
float c2 = zProjectionMap[1];
return -(c1 / (depthNdc + c2 + 1e-7));
}`),e.code.add(T.g`float depthFromTexture(sampler2D depthTexture, vec2 uv) {
ivec2 iuv = ivec2(uv * vec2(textureSize(depthTexture, 0)));
float depth = texelFetch(depthTexture, iuv, 0).r;
return depth;
}`),e.code.add(T.g`float linearDepthFromTexture(sampler2D depthTexture, vec2 uv) {
return linearizeDepth(depthFromTexture(depthTexture, uv));
}`)}const Yt=(0,u.c)();function Zt(e,t){if(!t.multipassEnabled)return;e.fragment.include(Xt),e.fragment.uniforms.add(new wt("terrainDepthTexture",((e,t)=>t.multipassTerrain.depth?.attachment)));const r=t.occlusionPass;e.fragment.code.add(T.g`
   ${r?"bool":"void"} terrainDepthTest(float fragmentDepth) {
      float depth = texelFetch(terrainDepthTexture, ivec2(gl_FragCoord.xy), 0).r;
      float linearDepth = linearizeDepth(depth);
      ${r?T.g`return fragmentDepth < linearDepth && depth < 1.0;`:T.g`
          if(fragmentDepth ${t.cullAboveGround?">":"<="} linearDepth){
            discard;
          }`}
    }`)}function Jt(e){e.vertex.code.add(T.g`const float PI = 3.141592653589793;`),e.fragment.code.add(T.g`const float PI = 3.141592653589793;
const float LIGHT_NORMALIZATION = 1.0 / PI;
const float INV_PI = 0.3183098861837907;
const float HALF_PI = 1.570796326794897;`)}const Kt=.001;function Qt(e){e.code.add(T.g`vec4 premultiplyAlpha(vec4 v) {
return vec4(v.rgb * v.a, v.a);
}
vec3 rgb2hsv(vec3 c) {
vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);
float d = q.x - min(q.w, q.y);
float e = 1.0e-10;
return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), min(d / (q.x + e), 1.0), q.x);
}
vec3 hsv2rgb(vec3 c) {
vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
float rgb2v(vec3 c) {
return max(c.x, max(c.y, c.z));
}`)}class er{constructor(){this._includedModules=new Map}include(e,t){this._includedModules.has(e)?this._includedModules.get(e):(this._includedModules.set(e,t),e(this.builder,t))}}class tr extends er{constructor(){super(...arguments),this.vertex=new or,this.fragment=new or,this.attributes=new nr,this.varyings=new ar,this.extensions=new sr,this.constants=new lr,this.outputs=new cr}get fragmentUniforms(){return this.fragment.uniforms.entries}get builder(){return this}generate(e){const t=this.extensions.generateSource(e),r=this.attributes.generateSource(e),i=this.varyings.generateSource(e),o="vertex"===e?this.vertex:this.fragment,n=o.uniforms.generateSource(),a=o.code.generateSource(),s="vertex"===e?ur:dr,c=this.constants.generateSource().concat(o.constants.generateSource()),l=this.outputs.generateSource(e);return`#version 300 es\n${t.join("\n")}\n\n${s}\n\n${c.join("\n")}\n\n${n.join("\n")}\n\n${r.join("\n")}\n\n${i.join("\n")}\n\n${l.join("\n")}\n\n${a.join("\n")}`}generateBindPass(e){const t=new Map;this.vertex.uniforms.entries.forEach((e=>{const r=e.bind[U.B.Pass];r&&t.set(e.name,r)})),this.fragment.uniforms.entries.forEach((e=>{const r=e.bind[U.B.Pass];r&&t.set(e.name,r)}));const r=Array.from(t.values()),i=r.length;return(t,o)=>{for(let n=0;n<i;++n)r[n](e,t,o)}}generateBindDraw(e){const t=new Map;this.vertex.uniforms.entries.forEach((e=>{const r=e.bind[U.B.Draw];r&&t.set(e.name,r)})),this.fragment.uniforms.entries.forEach((e=>{const r=e.bind[U.B.Draw];r&&t.set(e.name,r)}));const r=Array.from(t.values()),i=r.length;return(t,o,n)=>{for(let a=0;a<i;++a)r[a](e,t,o,n)}}}class rr{constructor(e){this._stage=e,this._entries=new Map}add(...e){for(const t of e)this._add(t);return this._stage}get(e){return this._entries.get(e)}_add(e){if(null!=e){if(this._entries.has(e.name)&&!this._entries.get(e.name).equals(e))throw new $.A(`Duplicate uniform name ${e.name} for different uniform type`);this._entries.set(e.name,e)}else W.L.getLogger("esri.views.3d.webgl-engine.core.shaderModules.shaderBuilder").error(`Trying to add null Uniform from ${(new Error).stack}.`)}generateSource(){return Array.from(this._entries.values()).map((e=>null!=e.arraySize?`uniform ${e.type} ${e.name}[${e.arraySize}];`:`uniform ${e.type} ${e.name};`))}get entries(){return Array.from(this._entries.values())}}class ir{constructor(e){this._stage=e,this._entries=new Array}add(e){return this._entries.push(e),this._stage}generateSource(){return this._entries}}class or extends er{constructor(){super(...arguments),this.uniforms=new rr(this),this.code=new ir(this),this.constants=new lr}get builder(){return this}}class nr{constructor(){this._entries=new Array}add(e,t){this._entries.push([e,t])}generateSource(e){return"fragment"===e?[]:this._entries.map((e=>`in ${e[1]} ${e[0]};`))}}class ar{constructor(){this._entries=new Map}add(e,t){this._entries.has(e)&&(0,x.a)(this._entries.get(e)===t),this._entries.set(e,t)}generateSource(e){const t=new Array;return this._entries.forEach(((r,i)=>t.push("vertex"===e?`out ${r} ${i};`:`in ${r} ${i};`))),t}}class sr{constructor(){this._entries=new Set}add(e){this._entries.add(e)}generateSource(e){const t="vertex"===e?sr.ALLOWLIST_VERTEX:sr.ALLOWLIST_FRAGMENT;return Array.from(this._entries).filter((e=>t.includes(e))).map((e=>`#extension ${e} : enable`))}}sr.ALLOWLIST_FRAGMENT=["GL_EXT_shader_texture_lod","GL_OES_standard_derivatives"],sr.ALLOWLIST_VERTEX=[];class cr{constructor(){this._entries=new Map}add(e,t,r=0){const i=this._entries.get(r);i?(0,x.a)(i.name===e&&i.type===t,`Fragment shader output location ${r} occupied`):this._entries.set(r,{name:e,type:t})}generateSource(e){if("vertex"===e)return[];0===this._entries.size&&this._entries.set(0,{name:cr.DEFAULT_NAME,type:cr.DEFAULT_TYPE});const t=new Array;return this._entries.forEach(((e,r)=>t.push(`layout(location = ${r}) out ${e.type} ${e.name};`))),t}}cr.DEFAULT_TYPE="vec4",cr.DEFAULT_NAME="fragColor";class lr{constructor(){this._entries=new Set}add(e,t,r){let i="ERROR_CONSTRUCTOR_STRING";switch(t){case"float":i=lr._numberToFloatStr(r);break;case"int":i=lr._numberToIntStr(r);break;case"bool":i=r.toString();break;case"vec2":i=`vec2(${lr._numberToFloatStr(r[0])},                            ${lr._numberToFloatStr(r[1])})`;break;case"vec3":i=`vec3(${lr._numberToFloatStr(r[0])},                            ${lr._numberToFloatStr(r[1])},                            ${lr._numberToFloatStr(r[2])})`;break;case"vec4":i=`vec4(${lr._numberToFloatStr(r[0])},                            ${lr._numberToFloatStr(r[1])},                            ${lr._numberToFloatStr(r[2])},                            ${lr._numberToFloatStr(r[3])})`;break;case"ivec2":i=`ivec2(${lr._numberToIntStr(r[0])},                             ${lr._numberToIntStr(r[1])})`;break;case"ivec3":i=`ivec3(${lr._numberToIntStr(r[0])},                             ${lr._numberToIntStr(r[1])},                             ${lr._numberToIntStr(r[2])})`;break;case"ivec4":i=`ivec4(${lr._numberToIntStr(r[0])},                             ${lr._numberToIntStr(r[1])},                             ${lr._numberToIntStr(r[2])},                             ${lr._numberToIntStr(r[3])})`;break;case"mat2":case"mat3":case"mat4":i=`${t}(${Array.prototype.map.call(r,(e=>lr._numberToFloatStr(e))).join(", ")})`}return this._entries.add(`const ${t} ${e} = ${i};`),this}static _numberToIntStr(e){return e.toFixed(0)}static _numberToFloatStr(e){return Number.isInteger(e)?e.toFixed(1):e.toString()}generateSource(){return Array.from(this._entries)}}const dr="#ifdef GL_FRAGMENT_PRECISION_HIGH\n  precision highp float;\n  precision highp sampler2D;\n#else\n  precision mediump float;\n  precision mediump sampler2D;\n#endif",ur="precision highp float;\nprecision highp sampler2D;";class hr{constructor(e,t){this._module=e,this._loadModule=t}get(){return this._module}async reload(){return this._module=await this._loadModule(),this._module}}class mr{constructor(e,t,r){this.release=r,this.initializeConfiguration(e,t),this._configuration=t.snapshot(),this._program=this.initializeProgram(e),this._pipeline=this.initializePipeline(e)}destroy(){this._program=(0,Y.f)(this._program),this._pipeline=this._configuration=null}reload(e){(0,Y.f)(this._program),this._program=this.initializeProgram(e),this._pipeline=this.initializePipeline(e)}get program(){return this._program}get compiled(){return this.program.compiled}get key(){return this._configuration.key}get configuration(){return this._configuration}ensureAttributeLocations(e){this.program.assertCompatibleVertexAttributeLocations(e)}get primitiveType(){return te.P.TRIANGLES}getPipeline(e,t,r){return this._pipeline}initializeConfiguration(e,t){}}const fr=oe(te.g.SRC_ALPHA,te.g.ONE,te.g.ONE_MINUS_SRC_ALPHA,te.g.ONE_MINUS_SRC_ALPHA),pr=oe(te.g.ONE,te.g.ZERO,te.g.ONE,te.g.ONE_MINUS_SRC_ALPHA);function gr(e){return e===tt.FrontFace?null:pr}const vr={factor:-1,units:-2};function _r(e){return e?vr:null}function xr(e,t=te.j.LESS){return e===tt.NONE||e===tt.FrontFace?t:te.j.LEQUAL}function Tr(e){return e===tt.ColorAlpha?{buffers:[te.f.COLOR_ATTACHMENT0,te.f.COLOR_ATTACHMENT1]}:null}class br{constructor(e,t,r){this._context=e,this._locations=r,this._textures=new Map,this._freeTextureUnits=new _.P({deallocator:null}),this._glProgram=e.programCache.acquire(t.generate("vertex"),t.generate("fragment"),r),this._glProgram.stop=()=>{throw new Error("Wrapped _glProgram used directly")},this.bindPass=t.generateBindPass(this),this.bindDraw=t.generateBindDraw(this),this._fragmentUniforms=(0,re.w)()?t.fragmentUniforms:null}dispose(){this._glProgram.dispose()}get glName(){return this._glProgram.glName}get hasTransformFeedbackVaryings(){return this._glProgram.hasTransformFeedbackVaryings}get compiled(){return this._glProgram.compiled}setUniform1b(e,t){this._glProgram.setUniform1i(e,t?1:0)}setUniform1i(e,t){this._glProgram.setUniform1i(e,t)}setUniform1f(e,t){this._glProgram.setUniform1f(e,t)}setUniform2fv(e,t){this._glProgram.setUniform2fv(e,t)}setUniform3fv(e,t){this._glProgram.setUniform3fv(e,t)}setUniform4fv(e,t){this._glProgram.setUniform4fv(e,t)}setUniformMatrix3fv(e,t){this._glProgram.setUniformMatrix3fv(e,t)}setUniformMatrix4fv(e,t){this._glProgram.setUniformMatrix4fv(e,t)}setUniform1fv(e,t){this._glProgram.setUniform1fv(e,t)}setUniform1iv(e,t){this._glProgram.setUniform1iv(e,t)}setUniform2iv(e,t){this._glProgram.setUniform3iv(e,t)}setUniform3iv(e,t){this._glProgram.setUniform3iv(e,t)}setUniform4iv(e,t){this._glProgram.setUniform4iv(e,t)}assertCompatibleVertexAttributeLocations(e){e.locations!==this._locations&&console.error("VertexAttributeLocations are incompatible")}stop(){this._textures.clear(),this._freeTextureUnits.clear()}bindTexture(e,t){if(null==t?.glName){const t=this._textures.get(e);return t&&(this._context.bindTexture(null,t.unit),this._freeTextureUnit(t),this._textures.delete(e)),null}let r=this._textures.get(e);return null==r?(r=this._allocTextureUnit(t),this._textures.set(e,r)):r.texture=t,this._context.useProgram(this),this.setUniform1i(e,r.unit),this._context.bindTexture(t,r.unit),r.unit}rebindTextures(){this._context.useProgram(this),this._textures.forEach(((e,t)=>{this._context.bindTexture(e.texture,e.unit),this.setUniform1i(t,e.unit)})),this._fragmentUniforms?.forEach((e=>{"sampler2D"!==e.type&&"samplerCube"!==e.type||this._textures.has(e.name)||console.error(`Texture sampler ${e.name} has no bound texture`)}))}_allocTextureUnit(e){return{texture:e,unit:0===this._freeTextureUnits.length?this._textures.size:this._freeTextureUnits.pop()}}_freeTextureUnit(e){this._freeTextureUnits.push(e.unit)}}te.j.LESS,te.j.ALWAYS;const Er={mask:255},Sr={function:{func:te.j.ALWAYS,ref:v.S.OutlineVisualElementMask,mask:v.S.OutlineVisualElementMask},operation:{fail:te.k.KEEP,zFail:te.k.KEEP,zPass:te.k.ZERO}},Ar={function:{func:te.j.ALWAYS,ref:v.S.OutlineVisualElementMask,mask:v.S.OutlineVisualElementMask},operation:{fail:te.k.KEEP,zFail:te.k.KEEP,zPass:te.k.REPLACE}};te.j.EQUAL,v.S.OutlineVisualElementMask,v.S.OutlineVisualElementMask,te.k.KEEP,te.k.KEEP,te.k.KEEP,te.j.NOTEQUAL,v.S.OutlineVisualElementMask,v.S.OutlineVisualElementMask,te.k.KEEP,te.k.KEEP,te.k.KEEP;var Mr=r(72509),wr=r(19907),yr=r(23164),Rr=r(866),Cr=r(37176),Ir=r(83839),Or=r(73067);class Nr{constructor(){this._outer=new Map}clear(){this._outer.clear()}get empty(){return 0===this._outer.size}get(e,t){return this._outer.get(e)?.get(t)}set(e,t,r){const i=this._outer.get(e);i?i.set(t,r):this._outer.set(e,new Map([[t,r]]))}delete(e,t){const r=this._outer.get(e);r&&(r.delete(t),0===r.size&&this._outer.delete(e))}forEach(e){this._outer.forEach(((t,r)=>e(t,r)))}}var Pr,Lr,Dr,Br,Fr=r(38632),Vr=r(57760),Gr=r(63949),Ur=r(16055),zr=r(73502),Hr=r(62482),jr=r(26442);function Wr(e){e.attributes.add(E.V.POSITION,"vec3"),e.vertex.code.add(T.g`vec3 positionModel() { return position; }`)}function kr(e,t){e.include(Wr);const r=e.vertex;r.include(G.D,t),e.varyings.add("vPositionWorldCameraRelative","vec3"),e.varyings.add("vPosition_view","vec3"),r.uniforms.add(new G.F("transformWorldFromViewTH",(e=>e.transformWorldFromViewTH)),new G.F("transformWorldFromViewTL",(e=>e.transformWorldFromViewTL)),new G.M("transformViewFromCameraRelativeRS",(e=>e.transformViewFromCameraRelativeRS)),new G.a("transformProjFromView",(e=>e.transformProjFromView)),new jr.M("transformWorldFromModelRS",(e=>e.transformWorldFromModelRS)),new G.b("transformWorldFromModelTH",(e=>e.transformWorldFromModelTH)),new G.b("transformWorldFromModelTL",(e=>e.transformWorldFromModelTL))),r.code.add(T.g`vec3 positionWorldCameraRelative() {
vec3 rotatedModelPosition = transformWorldFromModelRS * positionModel();
vec3 transform_CameraRelativeFromModel = dpAdd(
transformWorldFromModelTL,
transformWorldFromModelTH,
-transformWorldFromViewTL,
-transformWorldFromViewTH
);
return transform_CameraRelativeFromModel + rotatedModelPosition;
}`),r.code.add(T.g`
    void forwardPosition(float fOffset) {
      vPositionWorldCameraRelative = positionWorldCameraRelative();
      if (fOffset != 0.0) {
        vPositionWorldCameraRelative += fOffset * ${t.spherical?T.g`normalize(transformWorldFromViewTL + vPositionWorldCameraRelative)`:T.g`vec3(0.0, 0.0, 1.0)`};
      }

      vPosition_view = transformViewFromCameraRelativeRS * vPositionWorldCameraRelative;
      gl_Position = transformProjFromView * vec4(vPosition_view, 1.0);
    }
  `),e.fragment.uniforms.add(new G.F("transformWorldFromViewTL",(e=>e.transformWorldFromViewTL))),r.code.add(T.g`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`),e.fragment.code.add(T.g`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`)}class qr extends T.N{constructor(){super(...arguments),this.transformWorldFromViewTH=(0,m.c)(),this.transformWorldFromViewTL=(0,m.c)(),this.transformViewFromCameraRelativeRS=(0,c.c)(),this.transformProjFromView=(0,d.c)()}}class $r extends T.N{constructor(){super(...arguments),this.transformWorldFromModelRS=(0,c.c)(),this.transformWorldFromModelTH=(0,m.c)(),this.transformWorldFromModelTL=(0,m.c)()}}function Xr(e,t){switch(t.normalType){case Ur.a.Attribute:case Ur.a.Compressed:e.include(Ur.N,t),e.varyings.add("vNormalWorld","vec3"),e.varyings.add("vNormalView","vec3"),e.vertex.uniforms.add(new jr.M("transformNormalGlobalFromModel",(e=>e.transformNormalGlobalFromModel)),new G.M("transformNormalViewFromGlobal",(e=>e.transformNormalViewFromGlobal))),e.vertex.code.add(T.g`void forwardNormal() {
vNormalWorld = transformNormalGlobalFromModel * normalModel();
vNormalView = transformNormalViewFromGlobal * vNormalWorld;
}`);break;case Ur.a.Ground:e.include(kr,t),e.varyings.add("vNormalWorld","vec3"),e.vertex.code.add(T.g`
        void forwardNormal() {
          vNormalWorld = ${t.spherical?T.g`normalize(vPositionWorldCameraRelative);`:T.g`vec3(0.0, 0.0, 1.0);`}
        }
        `);break;case Ur.a.ScreenDerivative:e.vertex.code.add(T.g`void forwardNormal() {}`);break;default:(0,zr.n)(t.normalType);case Ur.a.COUNT:}}!function(e){e[e.RED=0]="RED",e[e.RG=1]="RG",e[e.RGBA4=2]="RGBA4",e[e.RGBA=3]="RGBA",e[e.RGBA_MIPMAP=4]="RGBA_MIPMAP",e[e.R16F=5]="R16F",e[e.RGBA16F=6]="RGBA16F"}(Pr||(Pr={})),function(e){e[e.DEPTH_STENCIL_TEXTURE=0]="DEPTH_STENCIL_TEXTURE",e[e.DEPTH16_BUFFER=1]="DEPTH16_BUFFER"}(Lr||(Lr={}));class Yr extends qr{constructor(){super(...arguments),this.transformNormalViewFromGlobal=(0,c.c)()}}class Zr extends $r{constructor(){super(...arguments),this.transformNormalGlobalFromModel=(0,c.c)(),this.toMapSpace=(0,Hr.c)()}}function Jr(e){e.uniforms.add(new G.F("mainLightDirection",((e,t)=>t.lighting.mainLight.direction)))}function Kr(e){e.uniforms.add(new G.F("mainLightIntensity",((e,t)=>t.lighting.mainLight.intensity)))}function Qr(e){Jr(e.fragment),Kr(e.fragment),e.fragment.code.add(T.g`vec3 evaluateMainLighting(vec3 normal_global, float shadowing) {
float dotVal = clamp(dot(normal_global, mainLightDirection), 0.0, 1.0);
return mainLightIntensity * ((1.0 - shadowing) * dotVal);
}`)}function ei(e,t){switch(t.textureCoordinateType){case Dr.Default:return e.attributes.add(E.V.UV0,"vec2"),e.varyings.add("vuv0","vec2"),void e.vertex.code.add(T.g`void forwardTextureCoordinates() {
vuv0 = uv0;
}`);case Dr.Compressed:return e.attributes.add(E.V.UV0,"vec2"),e.varyings.add("vuv0","vec2"),void e.vertex.code.add(T.g`vec2 getUV0() {
return uv0 / 16384.0;
}
void forwardTextureCoordinates() {
vuv0 = getUV0();
}`);case Dr.Atlas:return e.attributes.add(E.V.UV0,"vec2"),e.varyings.add("vuv0","vec2"),e.attributes.add(E.V.UVREGION,"vec4"),e.varyings.add("vuvRegion","vec4"),void e.vertex.code.add(T.g`void forwardTextureCoordinates() {
vuv0 = uv0;
vuvRegion = uvRegion;
}`);default:(0,zr.n)(t.textureCoordinateType);case Dr.None:return void e.vertex.code.add(T.g`void forwardTextureCoordinates() {}`);case Dr.COUNT:return}}function ti(e){e.fragment.code.add(T.g`vec4 textureAtlasLookup(sampler2D tex, vec2 textureCoordinates, vec4 atlasRegion) {
vec2 atlasScale = atlasRegion.zw - atlasRegion.xy;
vec2 uvAtlas = fract(textureCoordinates) * atlasScale + atlasRegion.xy;
float maxdUV = 0.125;
vec2 dUVdx = clamp(dFdx(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
vec2 dUVdy = clamp(dFdy(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
return textureGrad(tex, uvAtlas, dUVdx, dUVdy);
}`)}function ri(e,t){switch(e.include(ei,t),t.textureCoordinateType){case Dr.Default:case Dr.Compressed:return void e.fragment.code.add(T.g`vec4 textureLookup(sampler2D tex, vec2 uv) {
return texture(tex, uv);
}`);case Dr.Atlas:return e.include(ti),void e.fragment.code.add(T.g`vec4 textureLookup(sampler2D tex, vec2 uv) {
return textureAtlasLookup(tex, uv, vuvRegion);
}`);default:(0,zr.n)(t.textureCoordinateType);case Dr.None:case Dr.COUNT:return}}function ii(e,t){const r=e.fragment,i=t.hasMetallicRoughnessTexture||t.hasEmissionTexture||t.hasOcclusionTexture;if(t.pbrMode===Br.Normal&&i&&e.include(ri,t),t.pbrMode!==Br.Schematic)if(t.pbrMode!==Br.Disabled){if(t.pbrMode===Br.Normal){r.code.add(T.g`vec3 mrr;
vec3 emission;
float occlusion;`);const e=t.pbrTextureBindType;t.hasMetallicRoughnessTexture&&(r.uniforms.add(e===U.B.Pass?new wt("texMetallicRoughness",(e=>e.textureMetallicRoughness)):new Ur.T("texMetallicRoughness",(e=>e.textureMetallicRoughness))),r.code.add(T.g`void applyMetallnessAndRoughness(vec2 uv) {
vec3 metallicRoughness = textureLookup(texMetallicRoughness, uv).rgb;
mrr[0] *= metallicRoughness.b;
mrr[1] *= metallicRoughness.g;
}`)),t.hasEmissionTexture&&(r.uniforms.add(e===U.B.Pass?new wt("texEmission",(e=>e.textureEmissive)):new Ur.T("texEmission",(e=>e.textureEmissive))),r.code.add(T.g`void applyEmission(vec2 uv) {
emission *= textureLookup(texEmission, uv).rgb;
}`)),t.hasOcclusionTexture?(r.uniforms.add(e===U.B.Pass?new wt("texOcclusion",(e=>e.textureOcclusion)):new Ur.T("texOcclusion",(e=>e.textureOcclusion))),r.code.add(T.g`void applyOcclusion(vec2 uv) {
occlusion *= textureLookup(texOcclusion, uv).r;
}
float getBakedOcclusion() {
return occlusion;
}`)):r.code.add(T.g`float getBakedOcclusion() { return 1.0; }`),e===U.B.Pass?r.uniforms.add(new G.F("emissionFactor",(e=>e.emissiveFactor)),new G.F("mrrFactors",(e=>e.mrrFactors))):r.uniforms.add(new G.b("emissionFactor",(e=>e.emissiveFactor)),new G.b("mrrFactors",(e=>e.mrrFactors))),r.code.add(T.g`
    void applyPBRFactors() {
      mrr = mrrFactors;
      emission = emissionFactor;
      occlusion = 1.0;

      ${t.hasMetallicRoughnessTexture?T.g`applyMetallnessAndRoughness(${t.hasMetallicRoughnessTextureTransform?T.g`metallicRoughnessUV`:"vuv0"});`:""}

      ${t.hasEmissionTexture?T.g`applyEmission(${t.hasEmissiveTextureTransform?T.g`emissiveUV`:"vuv0"});`:""}

      ${t.hasOcclusionTexture?T.g`applyOcclusion(${t.hasOcclusionTextureTransform?T.g`occlusionUV`:"vuv0"});`:""}
    }
  `)}}else r.code.add(T.g`float getBakedOcclusion() { return 1.0; }`);else r.code.add(T.g`vec3 mrr = vec3(0.0, 0.6, 0.2);
vec3 emission = vec3(0.0);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`)}function oi(e){const t=e.fragment.code;t.add(T.g`vec3 evaluateDiffuseIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float NdotNG)
{
return ((1.0 - NdotNG) * ambientGround + (1.0 + NdotNG) * ambientSky) * 0.5;
}`),t.add(T.g`float integratedRadiance(float cosTheta2, float roughness)
{
return (cosTheta2 - 1.0) / (cosTheta2 * (1.0 - roughness * roughness) - 1.0);
}`),t.add(T.g`vec3 evaluateSpecularIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float RdotNG, float roughness)
{
float cosTheta2 = 1.0 - RdotNG * RdotNG;
float intRadTheta = integratedRadiance(cosTheta2, roughness);
float ground = RdotNG < 0.0 ? 1.0 - intRadTheta : 1.0 + intRadTheta;
float sky = 2.0 - ground;
return (ground * ambientGround + sky * ambientSky) * 0.5;
}`)}function ni(e,t){const r=e.fragment.code;e.include(Jt),t.pbrMode!==Br.Normal&&t.pbrMode!==Br.Schematic&&t.pbrMode!==Br.Simplified&&t.pbrMode!==Br.TerrainWithWater||(r.add(T.g`float normalDistribution(float NdotH, float roughness)
{
float a = NdotH * roughness;
float b = roughness / (1.0 - NdotH * NdotH + a * a);
return b * b * INV_PI;
}`),r.add(T.g`const vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022);
const vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040);
const vec2 c2 = vec2(-1.04, 1.04);
vec2 prefilteredDFGAnalytical(float roughness, float NdotV) {
vec4 r = roughness * c0 + c1;
float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * r.x + r.y;
return c2 * a004 + r.zw;
}`)),t.pbrMode!==Br.Normal&&t.pbrMode!==Br.Schematic||(e.include(oi),r.add(T.g`struct PBRShadingInfo
{
float NdotL;
float NdotV;
float NdotH;
float VdotH;
float LdotH;
float NdotNG;
float RdotNG;
float NdotAmbDir;
float NdotH_Horizon;
vec3 skyRadianceToSurface;
vec3 groundRadianceToSurface;
vec3 skyIrradianceToSurface;
vec3 groundIrradianceToSurface;
float averageAmbientRadiance;
float ssao;
vec3 albedoLinear;
vec3 f0;
vec3 f90;
vec3 diffuseColor;
float metalness;
float roughness;
};`),r.add(T.g`vec3 evaluateEnvironmentIllumination(PBRShadingInfo inputs) {
vec3 indirectDiffuse = evaluateDiffuseIlluminationHemisphere(inputs.groundIrradianceToSurface, inputs.skyIrradianceToSurface, inputs.NdotNG);
vec3 indirectSpecular = evaluateSpecularIlluminationHemisphere(inputs.groundRadianceToSurface, inputs.skyRadianceToSurface, inputs.RdotNG, inputs.roughness);
vec3 diffuseComponent = inputs.diffuseColor * indirectDiffuse * INV_PI;
vec2 dfg = prefilteredDFGAnalytical(inputs.roughness, inputs.NdotV);
vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;
vec3 specularComponent = specularColor * indirectSpecular;
return (diffuseComponent + specularComponent);
}`),r.add(T.g`float gamutMapChanel(float x, vec2 p){
return (x < p.x) ? mix(0.0, p.y, x/p.x) : mix(p.y, 1.0, (x - p.x) / (1.0 - p.x) );
}`),r.add(T.g`vec3 blackLevelSoftCompression(vec3 inColor, PBRShadingInfo inputs){
vec3 outColor;
vec2 p = vec2(0.02 * (inputs.averageAmbientRadiance), 0.0075 * (inputs.averageAmbientRadiance));
outColor.x = gamutMapChanel(inColor.x, p) ;
outColor.y = gamutMapChanel(inColor.y, p) ;
outColor.z = gamutMapChanel(inColor.z, p) ;
return outColor;
}`))}!function(e){e[e.None=0]="None",e[e.Default=1]="Default",e[e.Atlas=2]="Atlas",e[e.Compressed=3]="Compressed",e[e.COUNT=4]="COUNT"}(Dr||(Dr={})),function(e){e[e.Disabled=0]="Disabled",e[e.Normal=1]="Normal",e[e.Schematic=2]="Schematic",e[e.Water=3]="Water",e[e.WaterOnIntegratedMesh=4]="WaterOnIntegratedMesh",e[e.Simplified=5]="Simplified",e[e.TerrainWithWater=6]="TerrainWithWater",e[e.COUNT=7]="COUNT"}(Br||(Br={}));(0,m.c)();const ai=.4;(0,m.c)();class si extends G.U{constructor(e,t){super(e,"int",U.B.Pass,((r,i,o)=>r.setUniform1i(e,t(i,o))))}}class ci extends Je{constructor(e){super(e),this._numLoading=0,this._disposed=!1,this._textures=e.textures,this._textureId=e.textureId,this._acquire(e.textureId,(e=>this._texture=e)),this._acquire(e.normalTextureId,(e=>this._textureNormal=e)),this._acquire(e.emissiveTextureId,(e=>this._textureEmissive=e)),this._acquire(e.occlusionTextureId,(e=>this._textureOcclusion=e)),this._acquire(e.metallicRoughnessTextureId,(e=>this._textureMetallicRoughness=e))}dispose(){this._texture=(0,Y.c)(this._texture),this._textureNormal=(0,Y.c)(this._textureNormal),this._textureEmissive=(0,Y.c)(this._textureEmissive),this._textureOcclusion=(0,Y.c)(this._textureOcclusion),this._textureMetallicRoughness=(0,Y.c)(this._textureMetallicRoughness),this._disposed=!0}ensureResources(e){return 0===this._numLoading?v.R.LOADED:v.R.LOADING}get textureBindParameters(){return new li(null!=this._texture?this._texture.glTexture:null,null!=this._textureNormal?this._textureNormal.glTexture:null,null!=this._textureEmissive?this._textureEmissive.glTexture:null,null!=this._textureOcclusion?this._textureOcclusion.glTexture:null,null!=this._textureMetallicRoughness?this._textureMetallicRoughness.glTexture:null)}updateTexture(e){null!=this._texture&&e===this._texture.id||(this._texture=(0,Y.c)(this._texture),this._textureId=e,this._acquire(this._textureId,(e=>this._texture=e)))}_acquire(e,t){if(null==e)return void t(null);const r=this._textures.acquire(e);if((0,Z.$X)(r))return++this._numLoading,void r.then((e=>{if(this._disposed)return(0,Y.c)(e),void t(null);t(e)})).finally((()=>--this._numLoading));t(r)}}class li extends T.N{constructor(e=null,t=null,r=null,i=null,o=null,n,a){super(),this.texture=e,this.textureNormal=t,this.textureEmissive=r,this.textureOcclusion=i,this.textureMetallicRoughness=o,this.scale=n,this.normalTextureTransformMatrix=a}}function di(e,t,r){const{data:i,indices:o}=e,n=t.typedBuffer,a=t.typedBufferStride,s=o.length;r*=a;for(let e=0;e<s;++e){const t=2*o[e];n[r]=i[t],n[r+1]=i[t+1],r+=a}}function ui(e,t,r,i){const{data:o,indices:n}=e,a=t.typedBuffer,s=t.typedBufferStride,c=n.length;if(r*=s,null==i||1===i)for(let e=0;e<c;++e){const t=3*n[e];a[r]=o[t],a[r+1]=o[t+1],a[r+2]=o[t+2],r+=s}else for(let e=0;e<c;++e){const t=3*n[e];for(let e=0;e<i;++e)a[r]=o[t],a[r+1]=o[t+1],a[r+2]=o[t+2],r+=s}}function hi(e,t,r,i=1){const{data:o,indices:n}=e,a=t.typedBuffer,s=t.typedBufferStride,c=n.length;if(r*=s,1===i)for(let e=0;e<c;++e){const t=4*n[e];a[r]=o[t],a[r+1]=o[t+1],a[r+2]=o[t+2],a[r+3]=o[t+3],r+=s}else for(let e=0;e<c;++e){const t=4*n[e];for(let e=0;e<i;++e)a[r]=o[t],a[r+1]=o[t+1],a[r+2]=o[t+2],a[r+3]=o[t+3],r+=s}}function mi(e,t,r,i,o=1){const n=t.typedBuffer,a=t.typedBufferStride;if(i*=a,1===o)for(let t=0;t<r;++t)n[i]=e[0],n[i+1]=e[1],n[i+2]=e[2],n[i+3]=e[3],i+=a;else for(let t=0;t<r;++t)for(let t=0;t<o;++t)n[i]=e[0],n[i+1]=e[1],n[i+2]=e[2],n[i+3]=e[3],i+=a}function fi(e,t,r,i,o,n){switch(e){case E.V.POSITION:{(0,x.a)(3===t.size);const i=o.getField(e,Mr.B);(0,x.a)(!!i,`No buffer view for ${e}`),i&&function(e,t,r,i,o=1){if(!t)return void ui(e,r,i,o);const{data:n,indices:a}=e,s=r.typedBuffer,c=r.typedBufferStride,d=a.length,u=t[0],h=t[1],m=t[2],f=t[4],p=t[5],g=t[6],v=t[8],_=t[9],x=t[10],T=t[12],b=t[13],E=t[14];i*=c;let S=0,A=0,M=0;const w=(0,l.p)(t)?e=>{S=n[e]+T,A=n[e+1]+b,M=n[e+2]+E}:e=>{const t=n[e],r=n[e+1],i=n[e+2];S=u*t+f*r+v*i+T,A=h*t+p*r+_*i+b,M=m*t+g*r+x*i+E};if(1===o)for(let e=0;e<d;++e)w(3*a[e]),s[i]=S,s[i+1]=A,s[i+2]=M,i+=c;else for(let e=0;e<d;++e){w(3*a[e]);for(let e=0;e<o;++e)s[i]=S,s[i+1]=A,s[i+2]=M,i+=c}}(t,r,i,n);break}case E.V.NORMAL:{(0,x.a)(3===t.size);const r=o.getField(e,Mr.B);(0,x.a)(!!r,`No buffer view for ${e}`),r&&function(e,t,r,i,o=1){if(!t)return void ui(e,r,i,o);const{data:n,indices:a}=e,s=t,c=r.typedBuffer,d=r.typedBufferStride,u=a.length,h=s[0],m=s[1],f=s[2],p=s[4],g=s[5],v=s[6],_=s[8],x=s[9],T=s[10],b=!(0,l.q)(s),E=1e-6,S=.999999;i*=d;let A=0,M=0,w=0;const y=(0,l.p)(s)?e=>{A=n[e],M=n[e+1],w=n[e+2]}:e=>{const t=n[e],r=n[e+1],i=n[e+2];A=h*t+p*r+_*i,M=m*t+g*r+x*i,w=f*t+v*r+T*i};if(1===o)if(b)for(let e=0;e<u;++e){y(3*a[e]);const t=A*A+M*M+w*w;if(t<S&&t>E){const e=1/Math.sqrt(t);c[i]=A*e,c[i+1]=M*e,c[i+2]=w*e}else c[i]=A,c[i+1]=M,c[i+2]=w;i+=d}else for(let e=0;e<u;++e)y(3*a[e]),c[i]=A,c[i+1]=M,c[i+2]=w,i+=d;else for(let e=0;e<u;++e){if(y(3*a[e]),b){const e=A*A+M*M+w*w;if(e<S&&e>E){const t=1/Math.sqrt(e);A*=t,M*=t,w*=t}}for(let e=0;e<o;++e)c[i]=A,c[i+1]=M,c[i+2]=w,i+=d}}(t,i,r,n);break}case E.V.NORMALCOMPRESSED:{(0,x.a)(2===t.size);const r=o.getField(e,Mr.D);(0,x.a)(!!r,`No buffer view for ${e}`),r&&di(t,r,n);break}case E.V.UV0:{(0,x.a)(2===t.size);const r=o.getField(e,Mr.c);(0,x.a)(!!r,`No buffer view for ${e}`),r&&di(t,r,n);break}case E.V.COLOR:case E.V.SYMBOLCOLOR:{const r=o.getField(e,Mr.o);(0,x.a)(!!r,`No buffer view for ${e}`),(0,x.a)(3===t.size||4===t.size),!r||3!==t.size&&4!==t.size||function(e,t,r,i,o=1){const{data:n,indices:a}=e,s=r.typedBuffer,c=r.typedBufferStride,l=a.length;if(i*=c,t!==n.length||4!==t)if(1!==o)if(4!==t)for(let e=0;e<l;++e){const t=3*a[e];for(let e=0;e<o;++e)s[i]=n[t],s[i+1]=n[t+1],s[i+2]=n[t+2],s[i+3]=255,i+=c}else for(let e=0;e<l;++e){const t=4*a[e];for(let e=0;e<o;++e)s[i]=n[t],s[i+1]=n[t+1],s[i+2]=n[t+2],s[i+3]=n[t+3],i+=c}else{if(4===t){for(let e=0;e<l;++e){const t=4*a[e];s[i]=n[t],s[i+1]=n[t+1],s[i+2]=n[t+2],s[i+3]=n[t+3],i+=c}return}for(let e=0;e<l;++e){const t=3*a[e];s[i]=n[t],s[i+1]=n[t+1],s[i+2]=n[t+2],s[i+3]=255,i+=c}}else{s[i]=n[0],s[i+1]=n[1],s[i+2]=n[2],s[i+3]=n[3];const e=new Uint32Array(r.typedBuffer.buffer,r.start),t=c/4,a=e[i/=4];i+=t;const d=l*o;for(let r=1;r<d;++r)e[i]=a,i+=t}}(t,t.size,r,n);break}case E.V.COLORFEATUREATTRIBUTE:{const r=o.getField(e,Mr.b);(0,x.a)(!!r,`No buffer view for ${e}`),(0,x.a)(1===t.size),r&&1===t.size&&function(e,t,r){const{data:i,indices:o}=e,n=t.typedBuffer,a=t.typedBufferStride,s=o.length,c=i[0];r*=a;for(let e=0;e<s;++e)n[r]=c,r+=a}(t,r,n);break}case E.V.TANGENT:{(0,x.a)(4===t.size);const i=o.getField(e,Mr.d);(0,x.a)(!!i,`No buffer view for ${e}`),i&&function(e,t,r,i,o=1){if(!t)return void hi(e,r,i,o);const{data:n,indices:a}=e,s=t,c=r.typedBuffer,d=r.typedBufferStride,u=a.length,h=s[0],m=s[1],f=s[2],p=s[4],g=s[5],v=s[6],_=s[8],x=s[9],T=s[10],b=!(0,l.q)(s),E=1e-6,S=.999999;if(i*=d,1===o)for(let e=0;e<u;++e){const t=4*a[e],r=n[t],o=n[t+1],s=n[t+2],l=n[t+3];let u=h*r+p*o+_*s,A=m*r+g*o+x*s,M=f*r+v*o+T*s;if(b){const e=u*u+A*A+M*M;if(e<S&&e>E){const t=1/Math.sqrt(e);u*=t,A*=t,M*=t}}c[i]=u,c[i+1]=A,c[i+2]=M,c[i+3]=l,i+=d}else for(let e=0;e<u;++e){const t=4*a[e],r=n[t],s=n[t+1],l=n[t+2],u=n[t+3];let A=h*r+p*s+_*l,M=m*r+g*s+x*l,w=f*r+v*s+T*l;if(b){const e=A*A+M*M+w*w;if(e<S&&e>E){const t=1/Math.sqrt(e);A*=t,M*=t,w*=t}}for(let e=0;e<o;++e)c[i]=A,c[i+1]=M,c[i+2]=w,c[i+3]=u,i+=d}}(t,r,i,n);break}case E.V.PROFILERIGHT:case E.V.PROFILEUP:case E.V.PROFILEVERTEXANDNORMAL:case E.V.FEATUREVALUE:{(0,x.a)(4===t.size);const r=o.getField(e,Mr.d);(0,x.a)(!!r,`No buffer view for ${e}`),r&&hi(t,r,n)}}}class pi{constructor(e){this.vertexBufferLayout=e}elementCount(e){return e.attributes.get(E.V.POSITION).indices.length}write(e,t,r,i,o){!function(e,t,r,i,o,n){for(const a of t.fields.keys()){const t=e.attributes.get(a),s=t?.indices;if(t&&s)fi(a,t,r,i,o,n);else if(a===E.V.OBJECTANDLAYERIDCOLOR&&null!=e.objectAndLayerIdColor){const t=e.attributes.get(E.V.POSITION)?.indices;if(t){const r=t.length,i=o.getField(a,Mr.o);mi(e.objectAndLayerIdColor,i,r,n)}}}}(r,this.vertexBufferLayout,e,t,i,o)}}class gi{constructor(e=!1,t=!0){this.isVerticalRay=e,this.normalRequired=t}}const vi=(0,f.c)();function _i(e,t,r,o,n,a){if(!e.visible)return;const s=(0,h.x)(Oi,o,r),c=(e,t,r)=>{a(e,r,t,!1)},l=new gi(!1,t.options.normalRequired);if(e.boundingInfo){(0,x.a)(e.type===i.Mesh);const o=t.tolerance;Ti(e.boundingInfo,r,s,o,n,l,c)}else{const t=e.attributes.get(E.V.POSITION),i=t.indices;!function(e,t,r,i,o,n,a,s,c,l){const d=t,u=Ni,m=Math.abs(d[0]),f=Math.abs(d[1]),p=Math.abs(d[2]),g=m>=f?m>=p?0:2:f>=p?1:2,v=g,_=d[v]<0?2:1,x=(g+_)%3,T=(g+(3-_))%3,b=d[x]/d[v],E=d[T]/d[v],S=1/d[v],A=Ei,M=Si,w=Ai,{normalRequired:y}=c;for(let t=r;t<i;++t){const r=3*t,i=a*o[r];(0,h.s)(u[0],n[i+0],n[i+1],n[i+2]);const c=a*o[r+1];(0,h.s)(u[1],n[c+0],n[c+1],n[c+2]);const d=a*o[r+2];(0,h.s)(u[2],n[d+0],n[d+1],n[d+2]),s&&((0,h.p)(u[0],s.applyToVertex(u[0][0],u[0][1],u[0][2],t)),(0,h.p)(u[1],s.applyToVertex(u[1][0],u[1][1],u[1][2],t)),(0,h.p)(u[2],s.applyToVertex(u[2][0],u[2][1],u[2][2],t))),(0,h.x)(A,u[0],e),(0,h.x)(M,u[1],e),(0,h.x)(w,u[2],e);const m=A[x]-b*A[v],f=A[T]-E*A[v],p=M[x]-b*M[v],g=M[T]-E*M[v],_=w[x]-b*w[v],R=w[T]-E*w[v],C=_*g-R*p,I=m*R-f*_,O=p*f-g*m;if((C<0||I<0||O<0)&&(C>0||I>0||O>0))continue;const N=C+I+O;if(0===N)continue;const P=C*(S*A[v])+I*(S*M[v])+O*(S*w[v]);if(P*Math.sign(N)<0)continue;const L=P/N;L>=0&&l(L,t,y?wi(u):null)}}(r,s,0,i.length/3,i,t.data,t.stride,n,l,c)}}const xi=(0,m.c)();function Ti(e,t,r,i,o,n,a){if(null==e)return;const s=(0,h.s)(xi,1/(c=r)[0],1/c[1],1/c[2]);var c;if((0,f.u)(vi,e.bbMin),(0,f.v)(vi,e.bbMax),null!=o&&o.applyToAabb(vi),function(e,t,r,i){return function(e,t,r,i,o){const n=(e[0]-i-t[0])*r[0],a=(e[3]+i-t[0])*r[0];let s=Math.min(n,a),c=Math.max(n,a);const l=(e[1]-i-t[1])*r[1],d=(e[4]+i-t[1])*r[1];if(c=Math.min(c,Math.max(l,d)),c<0)return!1;if(s=Math.max(s,Math.min(l,d)),s>c)return!1;const u=(e[2]-i-t[2])*r[2],h=(e[5]+i-t[2])*r[2];return c=Math.min(c,Math.max(u,h)),!(c<0)&&(s=Math.max(s,Math.min(u,h)),!(s>c)&&s<1/0)}(e,t,r,i)}(vi,t,s,i)){const{primitiveIndices:s,position:c}=e,l=s?s.length:c.indices.length/3;if(l>Ci){const s=e.getChildren();if(void 0!==s){for(const e of s)Ti(e,t,r,i,o,n,a);return}}!function(e,t,r,i,o,n,a,s,c,l,d){const u=e[0],h=e[1],m=e[2],f=t[0],p=t[1],g=t[2],{normalRequired:v}=l;for(let e=0;e<i;++e){const t=s[e],r=3*t,i=a*o[r];let l=n[i],_=n[i+1],x=n[i+2];const T=a*o[r+1];let b=n[T],E=n[T+1],S=n[T+2];const A=a*o[r+2];let M=n[A],w=n[A+1],y=n[A+2];null!=c&&([l,_,x]=c.applyToVertex(l,_,x,e),[b,E,S]=c.applyToVertex(b,E,S,e),[M,w,y]=c.applyToVertex(M,w,y,e));const R=b-l,C=E-_,I=S-x,O=M-l,N=w-_,P=y-x,L=p*P-N*g,D=g*O-P*f,B=f*N-O*p,F=R*L+C*D+I*B;if(Math.abs(F)<=Ii)continue;const V=u-l,G=h-_,U=m-x,z=V*L+G*D+U*B;if(F>0){if(z<0||z>F)continue}else if(z>0||z<F)continue;const H=G*I-C*U,j=U*R-I*V,W=V*C-R*G,k=f*H+p*j+g*W;if(F>0){if(k<0||z+k>F)continue}else if(k>0||z+k<F)continue;const q=(O*H+N*j+P*W)/F;q>=0&&d(q,t,v?Mi(R,C,I,O,N,P,bi):null)}}(t,r,0,l,c.indices,c.data,c.stride,s,o,n,a)}}const bi=(0,m.c)();const Ei=(0,m.c)(),Si=(0,m.c)(),Ai=(0,m.c)();function Mi(e,t,r,i,o,n,a){return(0,h.s)(yi,e,t,r),(0,h.s)(Ri,i,o,n),(0,h.e)(a,yi,Ri),(0,h.n)(a,a),a}function wi(e){return(0,h.x)(yi,e[1],e[0]),(0,h.x)(Ri,e[2],e[0]),(0,h.e)(bi,yi,Ri),(0,h.n)(bi,bi),bi}const yi=(0,m.c)(),Ri=(0,m.c)(),Ci=1e3,Ii=1e-7,Oi=(0,m.c)(),Ni=[(0,m.c)(),(0,m.c)(),(0,m.c)()];var Pi=r(5611),Li=r(23937);const Di=new class{constructor(e=0){this.offset=e,this.sphere=(0,Pi.b)(),this.tmpVertex=(0,m.c)()}applyToVertex(e,t,r){const i=this.objectTransform.transform,o=(0,h.s)(Bi,e,t,r),n=(0,h.h)(o,o,i),a=this.offset/(0,h.l)(n);(0,h.o)(n,n,n,a);const s=this.objectTransform.inverse;return(0,h.h)(this.tmpVertex,n,s),this.tmpVertex}applyToMinMax(e,t){const r=this.offset/(0,h.l)(e);(0,h.o)(e,e,e,r);const i=this.offset/(0,h.l)(t);(0,h.o)(t,t,t,i)}applyToAabb(e){const t=this.offset/Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]+=e[0]*t,e[1]+=e[1]*t,e[2]+=e[2]*t;const r=this.offset/Math.sqrt(e[3]*e[3]+e[4]*e[4]+e[5]*e[5]);return e[3]+=e[3]*r,e[4]+=e[4]*r,e[5]+=e[5]*r,e}applyToBoundingSphere(e){const t=(0,h.l)((0,Pi.g)(e)),r=this.offset/t;return(0,h.o)((0,Pi.g)(this.sphere),(0,Pi.g)(e),(0,Pi.g)(e),r),this.sphere[3]=e[3]+e[3]*this.offset/t,this.sphere}};new class{constructor(e=0){this.componentLocalOriginLength=0,this._totalOffset=0,this._offset=0,this._tmpVertex=(0,m.c)(),this._tmpMbs=(0,Pi.b)(),this._tmpObb=new Li.O,this._resetOffset(e)}_resetOffset(e){this._offset=e,this._totalOffset=e}set offset(e){this._resetOffset(e)}get offset(){return this._offset}set componentOffset(e){this._totalOffset=this._offset+e}set localOrigin(e){this.componentLocalOriginLength=(0,h.l)(e)}applyToVertex(e,t,r){const i=(0,h.s)(Bi,e,t,r),o=(0,h.s)(Fi,e,t,r+this.componentLocalOriginLength),n=this._totalOffset/(0,h.l)(o);return(0,h.o)(this._tmpVertex,i,o,n),this._tmpVertex}applyToAabb(e){const t=this.componentLocalOriginLength,r=e[0],i=e[1],o=e[2]+t,n=e[3],a=e[4],s=e[5]+t,c=Math.abs(r),l=Math.abs(i),d=Math.abs(o),u=Math.abs(n),h=Math.abs(a),m=Math.abs(s),f=.5*(1+Math.sign(r*n))*Math.min(c,u),p=.5*(1+Math.sign(i*a))*Math.min(l,h),g=.5*(1+Math.sign(o*s))*Math.min(d,m),v=Math.max(c,u),_=Math.max(l,h),x=Math.max(d,m),T=Math.sqrt(f*f+p*p+g*g),b=Math.sign(c+r),E=Math.sign(l+i),S=Math.sign(d+o),A=Math.sign(u+n),M=Math.sign(h+a),w=Math.sign(m+s),y=this._totalOffset;if(T<y)return e[0]-=(1-b)*y,e[1]-=(1-E)*y,e[2]-=(1-S)*y,e[3]+=A*y,e[4]+=M*y,e[5]+=w*y,e;const R=y/Math.sqrt(v*v+_*_+x*x),C=y/T,I=C-R,O=-I;return e[0]+=r*(b*O+C),e[1]+=i*(E*O+C),e[2]+=o*(S*O+C),e[3]+=n*(A*I+R),e[4]+=a*(M*I+R),e[5]+=s*(w*I+R),e}applyToMbs(e){const t=(0,h.l)((0,Pi.g)(e)),r=this._totalOffset/t;return(0,h.o)((0,Pi.g)(this._tmpMbs),(0,Pi.g)(e),(0,Pi.g)(e),r),this._tmpMbs[3]=e[3]+e[3]*this._totalOffset/t,this._tmpMbs}applyToObb(e){return(0,Li.c)(e,this._totalOffset,this._totalOffset,S.V.Global,this._tmpObb),this._tmpObb}},new class{constructor(e=0){this.offset=e,this.tmpVertex=(0,m.c)()}applyToVertex(e,t,r){const i=(0,h.s)(Bi,e,t,r),o=(0,h.i)(Fi,i,this.localOrigin),n=this.offset/(0,h.l)(o);return(0,h.o)(this.tmpVertex,i,o,n),this.tmpVertex}applyToAabb(e){const t=Vi,r=Gi,i=Ui;for(let o=0;o<3;++o)t[o]=e[0+o]+this.localOrigin[o],r[o]=e[3+o]+this.localOrigin[o],i[o]=t[o];const o=this.applyToVertex(t[0],t[1],t[2]);for(let t=0;t<3;++t)e[t]=o[t],e[t+3]=o[t];const n=t=>{const r=this.applyToVertex(t[0],t[1],t[2]);for(let t=0;t<3;++t)e[t]=Math.min(e[t],r[t]),e[t+3]=Math.max(e[t+3],r[t])};for(let e=1;e<8;++e){for(let o=0;o<3;++o)i[o]=e&1<<o?r[o]:t[o];n(i)}let a=0;for(let e=0;e<3;++e)t[e]*r[e]<0&&(a|=1<<e);if(0!==a&&7!==a)for(let e=0;e<8;++e)if(!(a&e)){for(let o=0;o<3;++o)i[o]=a&1<<o?0:e&1<<o?t[o]:r[o];n(i)}for(let t=0;t<3;++t)e[t]-=this.localOrigin[t],e[t+3]-=this.localOrigin[t];return e}};const Bi=(0,m.c)(),Fi=(0,m.c)(),Vi=(0,m.c)(),Gi=(0,m.c)(),Ui=(0,m.c)();function zi(e){e.varyings.add("linearDepth","float")}function Hi(e){e.vertex.uniforms.add(new $t("nearFar",((e,t)=>t.camera.nearFar)))}function ji(e){e.vertex.code.add(T.g`float calculateLinearDepth(vec2 nearFar,float z) {
return (-z - nearFar[0]) / (nearFar[1] - nearFar[0]);
}`)}function Wi(e,t){const{vertex:r}=e;switch(t.output){case G.S.Color:if(t.receiveShadows)return zi(e),void r.code.add(T.g`void forwardLinearDepth() { linearDepth = gl_Position.w; }`);break;case G.S.Shadow:case G.S.ShadowHighlight:case G.S.ShadowExcludeHighlight:case G.S.ViewshedShadow:return e.include(kr,t),zi(e),Hi(e),ji(e),void r.code.add(T.g`void forwardLinearDepth() {
linearDepth = calculateLinearDepth(nearFar, vPosition_view.z);
}`)}r.code.add(T.g`void forwardLinearDepth() {}`)}function ki(e){ji(e),e.vertex.code.add(T.g`vec4 transformPositionWithDepth(mat4 proj, mat4 view, vec3 pos, vec2 nearFar, out float depth) {
vec4 eye = view * vec4(pos, 1.0);
depth = calculateLinearDepth(nearFar,eye.z);
return proj * eye;
}`),e.vertex.code.add(T.g`vec4 transformPosition(mat4 proj, mat4 view, vec3 pos) {
return proj * (view * vec4(pos, 1.0));
}`)}function qi(e,t){t.hasVertexColors?(e.attributes.add(E.V.COLOR,"vec4"),e.varyings.add("vColor","vec4"),e.vertex.code.add(T.g`void forwardVertexColor() { vColor = color; }`),e.vertex.code.add(T.g`void forwardNormalizedVertexColor() { vColor = color * 0.003921568627451; }`)):e.vertex.code.add(T.g`void forwardVertexColor() {}
void forwardNormalizedVertexColor() {}`)}const $i=(0,Hr.f)(1,1,0,1),Xi=(0,Hr.f)(1,0,1,1);function Yi(e){e.fragment.uniforms.add(new wt("depthTexture",((e,t)=>t.mainDepth))),e.fragment.constants.add("occludedHighlightFlag","vec4",$i).add("unoccludedHighlightFlag","vec4",Xi),e.fragment.code.add(T.g`void outputHighlight() {
float sceneDepth = float(texelFetch(depthTexture, ivec2(gl_FragCoord.xy), 0).x);
if (gl_FragCoord.z > sceneDepth + 5e-7) {
fragColor = occludedHighlightFlag;
} else {
fragColor = unoccludedHighlightFlag;
}
}`)}var Zi=r(62079),Ji=r(91276);function Ki(e){e.vertex.code.add(T.g`float screenSizePerspectiveViewAngleDependentFactor(float absCosAngle) {
return absCosAngle * absCosAngle * absCosAngle;
}`),e.vertex.code.add(T.g`vec3 screenSizePerspectiveScaleFactor(float absCosAngle, float distanceToCamera, vec3 params) {
return vec3(
min(params.x / (distanceToCamera - params.y), 1.0),
screenSizePerspectiveViewAngleDependentFactor(absCosAngle),
params.z
);
}`),e.vertex.code.add(T.g`float applyScreenSizePerspectiveScaleFactorFloat(float size, vec3 factor) {
return mix(size * clamp(factor.x, factor.z, 1.0), size, factor.y);
}`),e.vertex.code.add(T.g`float screenSizePerspectiveScaleFloat(float size, float absCosAngle, float distanceToCamera, vec3 params) {
return applyScreenSizePerspectiveScaleFactorFloat(
size,
screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params)
);
}`),e.vertex.code.add(T.g`vec2 applyScreenSizePerspectiveScaleFactorVec2(vec2 size, vec3 factor) {
return mix(size * clamp(factor.x, factor.z, 1.0), size, factor.y);
}`),e.vertex.code.add(T.g`vec2 screenSizePerspectiveScaleVec2(vec2 size, float absCosAngle, float distanceToCamera, vec3 params) {
return applyScreenSizePerspectiveScaleFactorVec2(size, screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params));
}`)}const Qi=(0,m.c)();function eo(e,t){const r=e.vertex;t.hasVerticalOffset?(function(e){e.uniforms.add(new Mt("verticalOffset",((e,t)=>{const{minWorldLength:r,maxWorldLength:i,screenLength:o}=e.verticalOffset,n=Math.tan(.5*t.camera.fovY)/(.5*t.camera.fullViewport[3]),a=t.camera.pixelRatio||1;return(0,Ji.s)(to,o*a,n,r,i)})))}(r),t.hasScreenSizePerspective&&(e.include(Ki),function(e){e.uniforms.add(new G.F("screenSizePerspectiveAlignment",(e=>function(e){return(0,h.s)(Qi,e.parameters.divisor,e.parameters.offset,e.minScaleFactor)}(e.screenSizePerspectiveAlignment||e.screenSizePerspective))))}(r),it(e.vertex,t)),r.code.add(T.g`
      vec3 calculateVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        float viewDistance = length((view * vec4(worldPos, 1.0)).xyz);
        ${t.spherical?T.g`vec3 worldNormal = normalize(worldPos + localOrigin);`:T.g`vec3 worldNormal = vec3(0.0, 0.0, 1.0);`}
        ${t.hasScreenSizePerspective?T.g`
            float cosAngle = dot(worldNormal, normalize(worldPos - cameraPosition));
            float verticalOffsetScreenHeight = screenSizePerspectiveScaleFloat(verticalOffset.x, abs(cosAngle), viewDistance, screenSizePerspectiveAlignment);`:T.g`
            float verticalOffsetScreenHeight = verticalOffset.x;`}
        // Screen sized offset in world space, used for example for line callouts
        float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * viewDistance, verticalOffset.z, verticalOffset.w);
        return worldNormal * worldOffset;
      }

      vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        return worldPos + calculateVerticalOffset(worldPos, localOrigin);
      }
    `)):r.code.add(T.g`vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) { return worldPos; }`)}const to=(0,Hr.c)();function ro(e){e.code.add(T.g`const float MAX_RGBA4_FLOAT =
15.0 / 16.0 +
15.0 / 16.0 / 16.0 +
15.0 / 16.0 / 16.0 / 16.0 +
15.0 / 16.0 / 16.0 / 16.0 / 16.0;
const vec4 FIXED_POINT_FACTORS_RGBA4 = vec4(1.0, 16.0, 16.0 * 16.0, 16.0 * 16.0 * 16.0);
vec4 floatToRgba4(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA4_FLOAT);
vec4 fixedPointU4 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS_RGBA4) * 16.0);
const float toU4AsFloat = 1.0 / 15.0;
return fixedPointU4 * toU4AsFloat;
}
const vec4 RGBA4_2_FLOAT_FACTORS = vec4(
15.0 / (16.0),
15.0 / (16.0 * 16.0),
15.0 / (16.0 * 16.0 * 16.0),
15.0 / (16.0 * 16.0 * 16.0 * 16.0)
);
float rgba4ToFloat(vec4 rgba) {
return dot(rgba, RGBA4_2_FLOAT_FACTORS);
}`)}class io extends G.U{constructor(e,t,r){super(e,"mat4",U.B.Pass,((r,i,o)=>r.setUniformMatrix4fv(e,t(i,o))),r)}}var oo=r(67321);r(90740),r(40499),r(93181),r(13671),r(58498),r(91047),r(17745),r(36544),r(44945);let no=class extends b.T{constructor(e){super(e),this.view=null,this.consumes={required:[]},this.produces="composite-color",this._context=null,this._dirty=!0}initialize(){this.addHandles([(0,oo.wB)((()=>this.view.ready),(e=>{e&&this.view._stage?.renderer.addRenderNode(this)}),oo.Vh)])}destroy(){this.view._stage?.renderer?.removeRenderNode(this)}render(){throw new $.A("RenderNode:render-function-not-implemented","render() is not implemented.")}get camera(){return this.view.state.camera.clone()}get sunLight(){return this.bindParameters.lighting.legacy}get gl(){return this.view._stage.renderView.renderingContext.gl}acquireOutputFramebuffer(){const e=this._frameBuffer?.getTexture()?.descriptor,t=this.view._stage.renderer.fboCache.acquire(e?.width??640,e?.height??480,this.produces);return t.fbo?.initializeAndBind(),t}bindRenderTarget(){return this._frameBuffer?.fbo?.initializeAndBind(),this._frameBuffer}requestRender(e){e===v.a.UPDATE&&this.view._stage?.renderView.requestRender(e),this._dirty=!0}resetWebGLState(){this.renderingContext.resetState(),this.renderingContext.bindFramebuffer(this._frameBuffer?.fbo)}get fboCache(){return this.view._stage.renderer.fboCache}get bindParameters(){return this._context.bindParameters}get renderingContext(){return this.view._stage.renderView.renderingContext}updateAnimation(){return!!this._dirty&&(this._dirty=!1,!0)}doRender(e,t){this._context=t,this._frameBuffer=e.find((({name:e})=>e===this.produces));try{return this.render(e)}finally{this._frameBuffer=null}}};(0,V._)([(0,j.MZ)({constructOnly:!0})],no.prototype,"view",void 0),(0,V._)([(0,j.MZ)({constructOnly:!0})],no.prototype,"consumes",void 0),(0,V._)([(0,j.MZ)()],no.prototype,"produces",void 0),no=(0,V._)([(0,k.$)("esri.views.3d.webgl.RenderNode")],no);const ao=no;class so extends G.U{constructor(e,t){super(e,"bool",U.B.Pass,((r,i,o)=>r.setUniform1b(e,t(i,o))))}}function co(e,t=!0){e.attributes.add(E.V.POSITION,"vec2"),t&&e.varyings.add("uv","vec2"),e.vertex.code.add(T.g`
    void main(void) {
      gl_Position = vec4(position, 0.0, 1.0);
      ${t?T.g`uv = position * 0.5 + vec2(0.5);`:""}
    }
  `)}function lo(e){e.fragment.uniforms.add(new Mt("projInfo",((e,t)=>function(e){const t=e.projectionMatrix;return 0===t[11]?(0,Ji.s)(uo,2/(e.fullWidth*t[0]),2/(e.fullHeight*t[5]),(1+t[12])/t[0],(1+t[13])/t[5]):(0,Ji.s)(uo,-2/(e.fullWidth*t[0]),-2/(e.fullHeight*t[5]),(1-t[8])/t[0],(1-t[9])/t[5])}(t.camera)))),e.fragment.uniforms.add(new $t("zScale",((e,t)=>0===t.camera.projectionMatrix[11]?(0,ie.g)(ho,0,1):(0,ie.g)(ho,1,0)))),e.fragment.code.add(T.g`vec3 reconstructPosition(vec2 fragCoord, float depth) {
return vec3((fragCoord * projInfo.xy + projInfo.zw) * (zScale.x * depth + zScale.y), depth);
}`)}const uo=(0,Hr.c)(),ho=(0,u.c)();function mo(e,t){const r=e.fragment,i=void 0!==t.lightingSphericalHarmonicsOrder?t.lightingSphericalHarmonicsOrder:2;0===i?(r.uniforms.add(new G.F("lightingAmbientSH0",((e,t)=>(0,h.s)(fo,t.lighting.sh.r[0],t.lighting.sh.g[0],t.lighting.sh.b[0])))),r.code.add(T.g`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
return ambientLight * (1.0 - ambientOcclusion);
}`)):1===i?(r.uniforms.add(new Mt("lightingAmbientSH_R",((e,t)=>(0,Ji.s)(po,t.lighting.sh.r[0],t.lighting.sh.r[1],t.lighting.sh.r[2],t.lighting.sh.r[3]))),new Mt("lightingAmbientSH_G",((e,t)=>(0,Ji.s)(po,t.lighting.sh.g[0],t.lighting.sh.g[1],t.lighting.sh.g[2],t.lighting.sh.g[3]))),new Mt("lightingAmbientSH_B",((e,t)=>(0,Ji.s)(po,t.lighting.sh.b[0],t.lighting.sh.b[1],t.lighting.sh.b[2],t.lighting.sh.b[3])))),r.code.add(T.g`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec4 sh0 = vec4(
0.282095,
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y
);
vec3 ambientLight = vec3(
dot(lightingAmbientSH_R, sh0),
dot(lightingAmbientSH_G, sh0),
dot(lightingAmbientSH_B, sh0)
);
return ambientLight * (1.0 - ambientOcclusion);
}`)):2===i&&(r.uniforms.add(new G.F("lightingAmbientSH0",((e,t)=>(0,h.s)(fo,t.lighting.sh.r[0],t.lighting.sh.g[0],t.lighting.sh.b[0]))),new Mt("lightingAmbientSH_R1",((e,t)=>(0,Ji.s)(po,t.lighting.sh.r[1],t.lighting.sh.r[2],t.lighting.sh.r[3],t.lighting.sh.r[4]))),new Mt("lightingAmbientSH_G1",((e,t)=>(0,Ji.s)(po,t.lighting.sh.g[1],t.lighting.sh.g[2],t.lighting.sh.g[3],t.lighting.sh.g[4]))),new Mt("lightingAmbientSH_B1",((e,t)=>(0,Ji.s)(po,t.lighting.sh.b[1],t.lighting.sh.b[2],t.lighting.sh.b[3],t.lighting.sh.b[4]))),new Mt("lightingAmbientSH_R2",((e,t)=>(0,Ji.s)(po,t.lighting.sh.r[5],t.lighting.sh.r[6],t.lighting.sh.r[7],t.lighting.sh.r[8]))),new Mt("lightingAmbientSH_G2",((e,t)=>(0,Ji.s)(po,t.lighting.sh.g[5],t.lighting.sh.g[6],t.lighting.sh.g[7],t.lighting.sh.g[8]))),new Mt("lightingAmbientSH_B2",((e,t)=>(0,Ji.s)(po,t.lighting.sh.b[5],t.lighting.sh.b[6],t.lighting.sh.b[7],t.lighting.sh.b[8])))),r.code.add(T.g`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight * (1.0 - ambientOcclusion);
}`),t.pbrMode!==Br.Normal&&t.pbrMode!==Br.Schematic||r.code.add(T.g`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance(float ambientOcclusion)
{
vec3 ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2;
return ambientLight *= (1.0 - ambientOcclusion) * skyTransmittance;
}`))}const fo=(0,m.c)(),po=(0,Hr.c)();function go(e,t){const r=e.fragment;switch(r.code.add(T.g`struct ShadingNormalParameters {
vec3 normalView;
vec3 viewDirection;
} shadingParams;`),t.doubleSidedMode){case vo.None:r.code.add(T.g`vec3 shadingNormal(ShadingNormalParameters params) {
return normalize(params.normalView);
}`);break;case vo.View:r.code.add(T.g`vec3 shadingNormal(ShadingNormalParameters params) {
return dot(params.normalView, params.viewDirection) > 0.0 ? normalize(-params.normalView) : normalize(params.normalView);
}`);break;case vo.WindingOrder:r.code.add(T.g`vec3 shadingNormal(ShadingNormalParameters params) {
return gl_FrontFacing ? normalize(params.normalView) : normalize(-params.normalView);
}`);break;default:(0,zr.n)(t.doubleSidedMode);case vo.COUNT:}}var vo;function _o({normalTexture:e,metallicRoughnessTexture:t,metallicFactor:r,roughnessFactor:i,emissiveTexture:o,emissiveFactor:n,occlusionTexture:a}){return null==e&&null==t&&null==o&&(null==n||(0,h.g)(n,m.Z))&&null==a&&(null==i||1===i)&&(null==r||1===r)}function xo({normalTexture:e,metallicRoughnessTexture:t,metallicFactor:r,roughnessFactor:i,emissiveTexture:o,emissiveFactor:n,occlusionTexture:a}){return null==e&&null==t&&null==o&&(null==n||(0,h.g)(n,m.Z))&&null==a&&(null==i||1===i)&&(null==r||1===r||0===r)}!function(e){e[e.None=0]="None",e[e.View=1]="View",e[e.WindingOrder=2]="WindingOrder",e[e.COUNT=3]="COUNT"}(vo||(vo={}));const To=[1,1,.5],bo=[0,.6,.2],Eo=[0,1,.2];function So(e){e.vertex.code.add(T.g`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}function Ao(e,t){t.hasSymbolColors?(e.include(Zi.D),e.attributes.add(E.V.SYMBOLCOLOR,"vec4"),e.varyings.add("colorMixMode","mediump float"),e.vertex.code.add(T.g`int symbolColorMixMode;
vec4 getSymbolColor() {
return decodeSymbolColor(symbolColor, symbolColorMixMode) * 0.003921568627451;
}
void forwardColorMixMode() {
colorMixMode = float(symbolColorMixMode) + 0.5;
}`)):(e.fragment.uniforms.add(new si("colorMixMode",(e=>C[e.colorMixMode]))),e.vertex.code.add(T.g`vec4 getSymbolColor() { return vec4(1.0); }
void forwardColorMixMode() {}`))}function Mo(e,t){switch(t.output){case G.S.Shadow:case G.S.ShadowHighlight:case G.S.ShadowExcludeHighlight:case G.S.ViewshedShadow:e.fragment.include(ro),e.fragment.code.add(T.g`float _calculateFragDepth(const in float depth) {
const float SLOPE_SCALE = 2.0;
const float BIAS = 20.0 * .000015259;
float m = max(abs(dFdx(depth)), abs(dFdy(depth)));
return depth + SLOPE_SCALE * m + BIAS;
}
void outputDepth(float _linearDepth) {
fragColor = floatToRgba4(_calculateFragDepth(_linearDepth));
}`)}}function wo(e){e.fragment.code.add(T.g`
    #define discardOrAdjustAlpha(color) { if (color.a < ${T.g.float(Kt)}) { discard; } }
  `)}class yo extends G.U{constructor(e,t){super(e,"float",U.B.Draw,((r,i,o)=>r.setUniform1f(e,t(i,o))))}}function Ro(e,t){Io(e,t,new G.c("textureAlphaCutoff",(e=>e.textureAlphaCutoff)))}function Co(e,t){Io(e,t,new yo("textureAlphaCutoff",(e=>e.textureAlphaCutoff)))}function Io(e,t,r){const i=e.fragment;switch(t.alphaDiscardMode!==v.A.Mask&&t.alphaDiscardMode!==v.A.MaskBlend||i.uniforms.add(r),t.alphaDiscardMode){case v.A.Blend:return e.include(wo);case v.A.Opaque:i.code.add(T.g`void discardOrAdjustAlpha(inout vec4 color) {
color.a = 1.0;
}`);break;case v.A.Mask:i.code.add(T.g`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } else { color.a = 1.0; } }`);break;case v.A.MaskBlend:e.fragment.code.add(T.g`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } }`)}}function Oo(e,t){const{vertex:r,fragment:i}=e,o=t.hasColorTexture&&t.alphaDiscardMode!==v.A.Opaque;switch(t.output){case G.S.Depth:ot(r,t),e.include(ki,t),e.include(ht,t),e.include(ei,t),o&&i.uniforms.add(new wt("tex",(e=>e.texture))),r.code.add(T.g`void main(void) {
vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();
}`),e.include(Ro,t),i.code.add(T.g`
          void main(void) {
            discardBySlice(vpos);
            ${o?T.g`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?T.g`colorUV`:T.g`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
          }
        `);break;case G.S.Shadow:case G.S.ShadowHighlight:case G.S.ShadowExcludeHighlight:case G.S.ViewshedShadow:case G.S.ObjectAndLayerIdColor:ot(r,t),e.include(ki,t),e.include(ei,t),e.include(At,t),e.include(Mo,t),e.include(ht,t),e.include(bt,t),Hi(e),e.varyings.add("depth","float"),o&&i.uniforms.add(new wt("tex",(e=>e.texture))),r.code.add(T.g`void main(void) {
vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
forwardTextureCoordinates();
forwardObjectAndLayerIdColor();
}`),e.include(Ro,t),i.code.add(T.g`
          void main(void) {
            discardBySlice(vpos);
            ${o?T.g`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?T.g`colorUV`:T.g`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
            ${t.output===G.S.ObjectAndLayerIdColor?T.g`outputObjectAndLayerIdColor();`:T.g`outputDepth(depth);`}
          }
        `);break;case G.S.Normal:{ot(r,t),e.include(ki,t),e.include(Ur.N,t),e.include(Xr,t),e.include(ei,t),e.include(At,t),o&&i.uniforms.add(new wt("tex",(e=>e.texture))),t.normalType===Ur.a.ScreenDerivative&&e.varyings.add("vPositionView","vec3");const n=t.normalType===Ur.a.Attribute||t.normalType===Ur.a.Compressed;r.code.add(T.g`
          void main(void) {
            vpos = getVertexInLocalOriginSpace();

            ${n?T.g`vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:T.g`
                  // Get vertex position in camera space for screen-space derivative normals
                  vPositionView = (view * vec4(vpos, 1.0)).xyz;
                `}
            vpos = subtractOrigin(vpos);
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            forwardTextureCoordinates();
          }
        `),e.include(ht,t),e.include(Ro,t),i.code.add(T.g`
          void main() {
            discardBySlice(vpos);
            ${o?T.g`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?T.g`colorUV`:T.g`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}

            ${t.normalType===Ur.a.ScreenDerivative?T.g`vec3 normal = screenDerivativeNormal(vPositionView);`:T.g`
                  vec3 normal = normalize(vNormalWorld);
                  if (gl_FrontFacing == false){
                    normal = -normal;
                  }`}
            fragColor = vec4(0.5 + 0.5 * normal, 1.0);
          }
        `);break}case G.S.Highlight:ot(r,t),e.include(ki,t),e.include(ei,t),e.include(At,t),o&&i.uniforms.add(new wt("tex",(e=>e.texture))),r.code.add(T.g`void main(void) {
vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();
}`),e.include(ht,t),e.include(Ro,t),e.include(Yi,t),i.code.add(T.g`
          void main() {
            discardBySlice(vpos);
            ${o?T.g`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?T.g`colorUV`:T.g`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
            outputHighlight();
          }
        `)}}function No(e,t){const r=e.fragment;t.hasVertexTangents?(e.attributes.add(E.V.TANGENT,"vec4"),e.varyings.add("vTangent","vec4"),t.doubleSidedMode===vo.WindingOrder?r.code.add(T.g`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):r.code.add(T.g`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):r.code.add(T.g`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`),t.textureCoordinateType!==Dr.None&&(e.include(ri,t),r.uniforms.add(t.pbrTextureBindType===U.B.Pass?new wt("normalTexture",(e=>e.textureNormal)):new Ur.T("normalTexture",(e=>e.textureNormal))),t.hasNormalTextureTransform&&(r.uniforms.add(new $t("scale",(e=>e.scale??u.O))),r.uniforms.add(new G.M("normalTextureTransformMatrix",(e=>e.normalTextureTransformMatrix??c.I)))),r.code.add(T.g`vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
vec3 rawNormal = textureLookup(normalTexture, uv).rgb * 2.0 - 1.0;`),t.hasNormalTextureTransform&&r.code.add(T.g`mat3 normalTextureRotation = mat3(normalTextureTransformMatrix[0][0]/scale[0], normalTextureTransformMatrix[0][1]/scale[1], 0.0,
normalTextureTransformMatrix[1][0]/scale[0], normalTextureTransformMatrix[1][1]/scale[1], 0.0,
0.0, 0.0, 0.0 );
rawNormal.xy = (normalTextureRotation * vec3(rawNormal.x, rawNormal.y, 1.0)).xy;`),r.code.add(T.g`return tangentSpace * rawNormal;
}`))}class Po extends G.U{constructor(e,t){super(e,"vec2",U.B.Draw,((r,i,o,n)=>r.setUniform2fv(e,t(i,o,n))))}}const Lo=Object.freeze(Object.defineProperty({__proto__:null,build:function(){const e=new tr,t=e.fragment;return e.include(co),t.include(Xt),t.uniforms.add(new wt("depthMap",(e=>e.depthTexture)),new Ur.T("tex",(e=>e.colorTexture)),new Po("blurSize",(e=>e.blurSize)),new G.c("projScale",((e,t)=>{const r=(0,h.j)(t.camera.eye,t.camera.center);return r>5e4?Math.max(0,e.projScale-(r-5e4)):e.projScale}))),t.code.add(T.g`
    void blurFunction(vec2 uv, float r, float center_d, float sharpness, inout float wTotal, inout float bTotal) {
      float c = texture(tex, uv).r;
      float d = linearDepthFromTexture(depthMap, uv);

      float ddiff = d - center_d;

      float w = exp(-r * r * ${T.g.float(.08)} - ddiff * ddiff * sharpness);
      wTotal += w;
      bTotal += w * c;
    }
  `),e.outputs.add("fragBlur","float"),t.code.add(T.g`
    void main(void) {
      float b = 0.0;
      float w_total = 0.0;

      float center_d = linearDepthFromTexture(depthMap, uv);

      float sharpness = -0.05 * projScale / center_d;
      for (int r = -${T.g.int(4)}; r <= ${T.g.int(4)}; ++r) {
        float rf = float(r);
        vec2 uvOffset = uv + rf * blurSize;
        blurFunction(uvOffset, rf, center_d, sharpness, w_total, b);
      }

      fragBlur = b / w_total;
    }
  `),e}},Symbol.toStringTag,{value:"Module"}));class Do extends mr{initializeProgram(e){return new br(e.rctx,Do.shader.get().build(),M)}initializePipeline(){return xe({colorWrite:le})}}Do.shader=new hr(Lo,(()=>Promise.resolve().then((()=>Lo))));class Bo extends T.N{constructor(){super(...arguments),this.projScale=1}}class Fo extends Bo{constructor(){super(...arguments),this.intensity=1}}class Vo extends T.N{}class Go extends Vo{constructor(){super(...arguments),this.blurSize=(0,u.c)()}}function Uo(e){return Math.max(10,20*e.computeScreenPixelSizeAtDist(Math.abs(4*e.relativeElevation)))}const zo=(0,u.c)(),Ho=Object.freeze(Object.defineProperty({__proto__:null,build:function(){const e=new tr,t=e.fragment;return e.include(co),e.include(lo),t.include(Xt),t.uniforms.add(new G.c("radius",((e,t)=>Uo(t.camera)))).code.add(T.g`vec3 sphere[16] = vec3[16](
vec3(0.186937, 0.0, 0.0),
vec3(0.700542, 0.0, 0.0),
vec3(-0.864858, -0.481795, -0.111713),
vec3(-0.624773, 0.102853, -0.730153),
vec3(-0.387172, 0.260319, 0.007229),
vec3(-0.222367, -0.642631, -0.707697),
vec3(-0.01336, -0.014956, 0.169662),
vec3(0.122575, 0.1544, -0.456944),
vec3(-0.177141, 0.85997, -0.42346),
vec3(-0.131631, 0.814545, 0.524355),
vec3(-0.779469, 0.007991, 0.624833),
vec3(0.308092, 0.209288,0.35969),
vec3(0.359331, -0.184533, -0.377458),
vec3(0.192633, -0.482999, -0.065284),
vec3(0.233538, 0.293706, -0.055139),
vec3(0.417709, -0.386701, 0.442449)
);
float fallOffFunction(float vv, float vn, float bias) {
float f = max(radius * radius - vv, 0.0);
return f * f * f * max(vn - bias, 0.0);
}`),t.code.add(T.g`float aoValueFromPositionsAndNormal(vec3 C, vec3 n_C, vec3 Q) {
vec3 v = Q - C;
float vv = dot(v, v);
float vn = dot(normalize(v), n_C);
return fallOffFunction(vv, vn, 0.1);
}`),t.uniforms.add(new wt("normalMap",(e=>e.normalTexture)),new wt("depthMap",(e=>e.depthTexture)),new G.c("projScale",(e=>e.projScale)),new wt("rnm",(e=>e.noiseTexture)),new $t("rnmScale",((e,t)=>(0,ie.g)(zo,t.camera.fullWidth/e.noiseTexture.descriptor.width,t.camera.fullHeight/e.noiseTexture.descriptor.height))),new G.c("intensity",(e=>e.intensity)),new $t("screenSize",((e,t)=>(0,ie.g)(zo,t.camera.fullWidth,t.camera.fullHeight)))),e.outputs.add("fragOcclusion","float"),t.code.add(T.g`
    void main(void) {
      float depth = depthFromTexture(depthMap, uv);

      // Early out if depth is out of range, such as in the sky
      if (depth >= 1.0 || depth <= 0.0) {
        fragOcclusion = 1.0;
        return;
      }

      // get the normal of current fragment
      vec4 norm4 = texture(normalMap, uv);
      if(norm4.a != 1.0) {
        fragOcclusion = 1.0;
        return;
      }
      vec3 norm = vec3(-1.0) + 2.0 * norm4.xyz;

      float currentPixelDepth = linearizeDepth(depth);
      vec3 currentPixelPos = reconstructPosition(gl_FragCoord.xy, currentPixelDepth);

      float sum = 0.0;
      vec3 tapPixelPos;

      vec3 fres = normalize(2.0 * texture(rnm, uv * rnmScale).xyz - 1.0);

      // note: the factor 2.0 should not be necessary, but makes ssao much nicer.
      // bug or deviation from CE somewhere else?
      float ps = projScale / (2.0 * currentPixelPos.z * zScale.x + zScale.y);

      for(int i = 0; i < ${T.g.int(16)}; ++i) {
        vec2 unitOffset = reflect(sphere[i], fres).xy;
        vec2 offset = vec2(-unitOffset * radius * ps);

        // don't use current or very nearby samples
        if( abs(offset.x) < 2.0 || abs(offset.y) < 2.0){
          continue;
        }

        vec2 tc = vec2(gl_FragCoord.xy + offset);
        if (tc.x < 0.0 || tc.y < 0.0 || tc.x > screenSize.x || tc.y > screenSize.y) continue;
        vec2 tcTap = tc / screenSize;
        float occluderFragmentDepth = linearDepthFromTexture(depthMap, tcTap);

        tapPixelPos = reconstructPosition(tc, occluderFragmentDepth);

        sum += aoValueFromPositionsAndNormal(currentPixelPos, norm, tapPixelPos);
      }

      // output the result
      float A = max(1.0 - sum * intensity / float(${T.g.int(16)}), 0.0);

      // Anti-tone map to reduce contrast and drag dark region farther: (x^0.2 + 1.2 * x^4) / 2.2
      A = (pow(A, 0.2) + 1.2 * A*A*A*A) / 2.2;

      fragOcclusion = A;
    }
  `),e},getRadius:Uo},Symbol.toStringTag,{value:"Module"}));class jo extends mr{initializeProgram(e){return new br(e.rctx,jo.shader.get().build(),M)}initializePipeline(){return xe({colorWrite:le})}}jo.shader=new hr(Ho,(()=>Promise.resolve().then((()=>Ho))));const Wo=2;let ko=class extends ao{constructor(e){super(e),this.consumes={required:["normals"]},this.produces="ssao",this.isEnabled=()=>!1,this._enableTime=(0,_.M)(0),this._passParameters=new Fo,this._drawParameters=new Go}initialize(){const e=Uint8Array.from(atob("eXKEvZaUc66cjIKElE1jlJ6MjJ6Ufkl+jn2fcXp5jBx7c6KEflSGiXuXeW6OWs+tfqZ2Yot2Y7Zzfo2BhniEj3xoiXuXj4eGZpqEaHKDWjSMe7palFlzc3BziYOGlFVzg6Zzg7CUY5JrjFF7eYJ4jIKEcyyEonSXe7qUfqZ7j3xofqZ2c4R5lFZ5Y0WUbppoe1l2cIh2ezyUho+BcHN2cG6DbpqJhqp2e1GcezhrdldzjFGUcyxjc3aRjDyEc1h7Sl17c6aMjH92pb6Mjpd4dnqBjMOEhqZleIOBYzB7gYx+fnqGjJuEkWlwnCx7fGl+c4hjfGyRe5qMlNOMfnqGhIWHc6OMi4GDc6aMfqZuc6aMzqJzlKZ+lJ6Me3qRfoFue0WUhoR5UraEa6qMkXiPjMOMlJOGe7JrUqKMjK6MeYRzdod+Sl17boiPc6qEeYBlcIh2c1WEe7GDiWCDa0WMjEmMdod+Y0WcdntzhmN8WjyMjKJjiXtzgYxYaGd+a89zlEV7e2GJfnd+lF1rcK5zc4p5cHuBhL6EcXp5eYB7fnh8iX6HjIKEeaxuiYOGc66RfG2Ja5hzjlGMjEmMe9OEgXuPfHyGhPeEdl6JY02McGuMfnqGhFiMa3WJfnx2l4hwcG1uhmN8c0WMc39og1GBbrCEjE2EZY+JcIh2cIuGhIWHe0mEhIVrc09+gY5+eYBlnCyMhGCDl3drfmmMgX15aGd+gYx+fnuRfnhzY1SMsluJfnd+hm98WtNrcIuGh4SEj0qPdkqOjFF7jNNjdnqBgaqUjMt7boeBhnZ4jDR7c5pze4GGjEFrhLqMjHyMc0mUhKZze4WEa117kWlwbpqJjHZ2eX2Bc09zeId+e0V7WlF7jHJ2l72BfId8l3eBgXyBe897jGl7c66cgW+Xc76EjKNbgaSEjGx4fId8jFFjgZB8cG6DhlFziZhrcIh2fH6HgUqBgXiPY8dahGFzjEmMhEFre2dxhoBzc5SGfleGe6alc7aUeYBlhKqUdlp+cH5za4OEczxza0Gcc4J2jHZ5iXuXjH2Jh5yRjH2JcFx+hImBjH+MpddCl3dreZeJjIt8ZW18bm1zjoSEeIOBlF9oh3N7hlqBY4+UeYFwhLJjeYFwaGd+gUqBYxiEYot2fqZ2ondzhL6EYyiEY02Ea0VjgZB8doaGjHxoc66cjEGEiXuXiXWMiZhreHx8frGMe75rY02Ec5pzfnhzlEp4a3VzjM+EhFFza3mUY7Zza1V5e2iMfGyRcziEhDyEkXZ2Y4OBnCx7g5t2eyBjgV6EhEFrcIh2dod+c4Z+nJ5zjm15jEmUeYxijJp7nL6clIpjhoR5WrZraGd+fnuRa6pzlIiMg6ZzfHx5foh+eX1ufnB5eX1ufnB5aJt7UqKMjIh+e3aBfm5lbYSBhGFze6J4c39oc0mUc4Z+e0V7fKFVe0WEdoaGY02Ec4Z+Y02EZYWBfH6HgU1+gY5+hIWUgW+XjJ57ebWRhFVScHuBfJ6PhBx7WqJzlM+Ujpd4gHZziX6HjHmEgZN+lJt5boiPe2GJgX+GjIGJgHZzeaxufnB5hF2JtdN7jJ57hp57hK6ElFVzg6ZzbmiEbndzhIWHe3uJfoFue3qRhJd2j3xoc65zlE1jc3p8lE1jhniEgXJ7e657vZaUc3qBh52BhIF4aHKDa9drgY5+c52GWqZzbpqJe8tjnM+UhIeMfo2BfGl+hG1zSmmMjKJjZVaGgX15c1lze0mEp4OHa3mUhIWHhDyclJ6MeYOJkXiPc0VzhFiMlKaEboSJa5Jze41re3qRhn+HZYWBe0mEc4p5fnORbox5lEp4hGFjhGGEjJuEc1WEhLZjeHeGa7KlfHx2hLaMeX1ugY5+hIWHhKGPjMN7c1WEho1zhoBzZYx7fnhzlJt5exyUhFFziXtzfmmMa6qMYyiEiXxweV12kZSMeWqXSl17fnhzxmmMrVGEe1mcc4p5eHeGjK6MgY5+doaGa6pzlGV7g1qBh4KHkXiPeW6OaKqafqZ2eXZ5e1V7jGd7boSJc3BzhJd2e0mcYot2h1RoY8dahK6EQmWEWjx7e1l2lL6UgXyBdnR4eU9zc0VreX1umqaBhld7fo2Bc6KEc5Z+hDyEcIeBWtNrfHyGe5qMhMuMe5qMhEGEbVVupcNzg3aHhIF4boeBe0mEdlptc39ofFl5Y8uUlJOGiYt2UmGEcyxjjGx4jFF7a657ZYWBnElzhp57iXtrgZN+tfOEhIOBjE2HgU1+e8tjjKNbiWCDhE15gUqBgYN7fnqGc66ce9d7iYSBj0qPcG6DnGGcT3eGa6qMZY+JlIiMl4hwc3aRdnqBlGV7eHJ2hLZjfnuRhDyEeX6MSk17g6Z+c6aUjHmEhIF4gXyBc76EZW18fGl+fkl+jCxrhoVwhDyUhIqGlL2DlI6EhJd2tdN7eYORhEGMa2Faa6pzc3Bzc4R5lIRznM+UY9eMhDycc5Z+c4p5c4iGY117pb6MgXuPrbJafnx2eYOJeXZ5e657hDyEcziElKZjfoB5eHeGj4WRhGGEe6KGeX1utTStc76EhFGJnCyMa5hzfH6HnNeceYB7hmN8gYuMhIVrczSMgYF8h3N7c5pza5hzjJqEYIRdgYuMlL2DeYRzhGGEeX1uhLaEc4iGeZ1zdl6JhrVteX6Me2iMfm5lWqJzSpqEa6pzdnmchHx2c6OMhNdrhoR5g3aHczxzeW52gV6Ejm15frGMc0Vzc4Z+l3drfniJe+9rWq5rlF1rhGGEhoVwe9OEfoh+e7pac09+c3qBY0lrhDycdnp2lJ6MiYOGhGCDc3aRlL2DlJt5doaGdnp2gYF8gWeOjF2Uc4R5c5Z+jEmMe7KEc4mEeYJ4dmyBe0mcgXiPbqJ7eYB7fmGGiYSJjICGlF1reZ2PnElzbpqJfH6Hc39oe4WEc5eJhK6EhqyJc3qBgZB8c09+hEmEaHKDhFGJc5SGiXWMUpaEa89zc6OMnCyMiXtrho+Be5qMc7KEjJ57dmN+hKGPjICGbmiEe7prdod+hGCDdnmchBx7eX6MkXZ2hGGEa657hm98jFFjY5JreYOJgY2EjHZ2a295Y3FajJ6Mc1J+YzB7e4WBjF2Uc4R5eV12gYxzg1qBeId+c9OUc5pzjFFjgY5+hFiMlIaPhoR5lIpjjIKBlNdSe7KEeX2BfrGMhIqGc65zjE2UhK6EklZ+QmWEeziMWqZza3VzdnR4foh+gYF8n3iJiZhrnKp7gYF8eId+lJ6Me1lrcIuGjKJjhmN8c66MjFF7a6prjJ6UnJ5zezyUfruRWlF7nI5zfHyGe657h4SEe8tjhBx7jFFjc09+c39ojICMeZeJeXt+YzRzjHZ2c0WEcIeBeXZ5onSXkVR+gYJ+eYFwdldzgYF7eX2BjJ6UiXuXlE1jh4SEe1mchLJjc4Z+hqZ7eXZ5bm1zlL6Ue5p7iWeGhKqUY5pzjKJjcIeBe8t7gXyBYIRdlEp4a3mGnK6EfmmMZpqEfFl5gYxzjKZuhGFjhoKGhHx2fnx2eXuMe3aBiWeGvbKMe6KGa5hzYzB7gZOBlGV7hmN8hqZlYot2Y117a6pzc6KEfId8foB5rctrfneJfJ6PcHN2hFiMc5pzjH92c0VzgY2EcElzdmCBlFVzg1GBc65zY4OBboeBcHiBeYJ4ewxzfHx5lIRzlEmEnLKEbk1zfJ6PhmN8eYBljBiEnMOEiXxwezyUcIeBe76EdsKEeX2BdnR4jGWUrXWMjGd7fkl+j4WRlEGMa5Jzho+BhDyEfnqMeXt+g3aHlE1jczClhNN7ZW18eHx8hGFjZW18iXWMjKJjhH57gYuMcIuGWjyMe4ZtjJuExmmMj4WRdntzi4GDhFFzYIRdnGGcjJp7Y0F7e4WEkbCGiX57fnSHa657a6prhBCMe3Z+SmmMjH92eHJ2hK6EY1FzexhrvbKMnI5za4OEfnd+eXuMhImBe897hLaMjN+EfG+BeIOBhF1+eZeJi4GDkXZ2eXKEgZ6Ejpd4c2GHa1V5e5KUfqZuhCx7jKp7lLZrg11+hHx2hFWUoot2nI5zgbh5mo9zvZaUe3qRbqKMfqZ2kbCGhFiM"),(e=>e.charCodeAt(0))),t=new re.a;t.wrapMode=te.T.CLAMP_TO_EDGE,t.pixelFormat=te.d.RGB,t.wrapMode=te.T.REPEAT,t.hasMipmap=!0,t.width=32,t.height=32,this._passParameters.noiseTexture=new re.T(this.renderingContext,t,e),this._ssaoTechnique=this.techniques.acquire(jo),this._blurTechnique=this.techniques.acquire(Do),this.addHandles((0,oo.wB)((()=>this.isEnabled()),(()=>this._enableTime=(0,_.M)(0))))}destroy(){this._passParameters.noiseTexture=(0,Y.f)(this._passParameters.noiseTexture),this._blurTechnique.release(),this._ssaoTechnique.release()}render(e){const t=this.bindParameters,r=e.find((({name:e})=>"normals"===e)),i=r?.getTexture(),o=r?.getTexture(te.h),n=this.fboCache,s=t.camera,c=s.fullViewport[2],l=s.fullViewport[3],d=Math.round(c/Wo),u=Math.round(l/Wo);if(!this._ssaoTechnique.compiled||!this._blurTechnique.compiled)return this._enableTime=(0,_.M)(performance.now()),this.requestRender(),n.acquire(d,u,"ssao",Pr.RED);0===this._enableTime&&(this._enableTime=(0,_.M)(performance.now()));const h=this.renderingContext,m=this.view.qualitySettings.fadeDuration,f=s.relativeElevation,p=(0,a.c)((5e5-f)/2e5,0,1),g=m>0?Math.min(m,performance.now()-this._enableTime)/m:1,x=g*p;this._passParameters.normalTexture=i,this._passParameters.depthTexture=o,this._passParameters.projScale=1/s.computeScreenPixelSizeAtDist(1),this._passParameters.intensity=4*qo/Uo(s)**6*x;const T=n.acquire(c,l,"ssao input",Pr.RG);h.unbindTexture(T.fbo.colorTexture),h.bindFramebuffer(T.fbo),h.setViewport(0,0,c,l),h.bindTechnique(this._ssaoTechnique,t,this._passParameters,this._drawParameters),h.screen.draw();const b=n.acquire(d,u,"ssao blur",Pr.RED);h.unbindTexture(b.fbo.colorTexture),h.bindFramebuffer(b.fbo),this._drawParameters.colorTexture=T.getTexture(),(0,ie.g)(this._drawParameters.blurSize,0,Wo/l),h.bindTechnique(this._blurTechnique,t,this._passParameters,this._drawParameters),h.setViewport(0,0,d,u),h.screen.draw(),T.release();const E=n.acquire(d,u,"ssao",Pr.RED);return h.unbindTexture(E.fbo.colorTexture),h.bindFramebuffer(E.fbo),h.setViewport(0,0,c,l),h.setClearColor(1,1,1,0),h.clear(te.i.COLOR_BUFFER_BIT),this._drawParameters.colorTexture=b.getTexture(),(0,ie.g)(this._drawParameters.blurSize,Wo/c,0),h.bindTechnique(this._blurTechnique,t,this._passParameters,this._drawParameters),h.setViewport(0,0,d,u),h.screen.draw(),h.setViewport4fv(s.fullViewport),b.release(),g<1&&this.requestRender(v.a.UPDATE),E}};(0,V._)([(0,j.MZ)()],ko.prototype,"consumes",void 0),(0,V._)([(0,j.MZ)()],ko.prototype,"produces",void 0),(0,V._)([(0,j.MZ)({constructOnly:!0})],ko.prototype,"techniques",void 0),(0,V._)([(0,j.MZ)({constructOnly:!0})],ko.prototype,"isEnabled",void 0),ko=(0,V._)([(0,k.$)("esri.views.3d.webgl-engine.effects.ssao.SSAO")],ko);const qo=.5;function $o(e,t){const r=e.fragment;t.receiveAmbientOcclusion?(r.uniforms.add(new wt("ssaoTex",((e,t)=>t.ssao?.getTexture()))),r.constants.add("blurSizePixelsInverse","float",1/Wo),r.code.add(T.g`float evaluateAmbientOcclusionInverse() {
vec2 ssaoTextureSizeInverse = 1.0 / vec2(textureSize(ssaoTex, 0));
return texture(ssaoTex, gl_FragCoord.xy * blurSizePixelsInverse * ssaoTextureSizeInverse).r;
}
float evaluateAmbientOcclusion() {
return 1.0 - evaluateAmbientOcclusionInverse();
}`)):r.code.add(T.g`float evaluateAmbientOcclusionInverse() { return 1.0; }
float evaluateAmbientOcclusion() { return 0.0; }`)}function Xo(e){e.constants.add("ambientBoostFactor","float",ai)}function Yo(e){e.uniforms.add(new G.c("lightingGlobalFactor",((e,t)=>t.lighting.globalFactor)))}function Zo(e,t){const r=e.fragment;switch(e.include($o,t),t.pbrMode!==Br.Disabled&&e.include(ni,t),e.include(mo,t),e.include(Jt),r.code.add(T.g`
    const float GAMMA_SRGB = 2.1;
    const float INV_GAMMA_SRGB = 0.4761904;
    ${t.pbrMode===Br.Disabled?"":"const vec3 GROUND_REFLECTANCE = vec3(0.2);"}
  `),Xo(r),Yo(r),Jr(r),r.code.add(T.g`
    float additionalDirectedAmbientLight(vec3 vPosWorld) {
      float vndl = dot(${t.spherical?T.g`normalize(vPosWorld)`:T.g`vec3(0.0, 0.0, 1.0)`}, mainLightDirection);
      return smoothstep(0.0, 1.0, clamp(vndl * 2.5, 0.0, 1.0));
    }
  `),Kr(r),r.code.add(T.g`vec3 evaluateAdditionalLighting(float ambientOcclusion, vec3 vPosWorld) {
float additionalAmbientScale = additionalDirectedAmbientLight(vPosWorld);
return (1.0 - ambientOcclusion) * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor * mainLightIntensity;
}`),t.pbrMode){case Br.Disabled:case Br.WaterOnIntegratedMesh:case Br.Water:e.include(Qr),r.code.add(T.g`vec3 evaluateSceneLighting(vec3 normalWorld, vec3 albedo, float shadow, float ssao, vec3 additionalLight)
{
vec3 mainLighting = evaluateMainLighting(normalWorld, shadow);
vec3 ambientLighting = calculateAmbientIrradiance(normalWorld, ssao);
vec3 albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
vec3 totalLight = mainLighting + ambientLighting + additionalLight;
totalLight = min(totalLight, vec3(PI));
vec3 outColor = vec3((albedoLinear / PI) * totalLight);
return pow(outColor, vec3(INV_GAMMA_SRGB));
}`);break;case Br.Normal:case Br.Schematic:r.code.add(T.g`const float fillLightIntensity = 0.25;
const float horizonLightDiffusion = 0.4;
const float additionalAmbientIrradianceFactor = 0.02;
vec3 evaluateSceneLightingPBR(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight, vec3 viewDir, vec3 normalGround, vec3 mrr, vec3 _emission, float additionalAmbientIrradiance)
{
vec3 viewDirection = -viewDir;
vec3 h = normalize(viewDirection + mainLightDirection);
PBRShadingInfo inputs;
inputs.NdotL = clamp(dot(normal, mainLightDirection), 0.001, 1.0);
inputs.NdotV = clamp(abs(dot(normal, viewDirection)), 0.001, 1.0);
inputs.NdotH = clamp(dot(normal, h), 0.0, 1.0);
inputs.VdotH = clamp(dot(viewDirection, h), 0.0, 1.0);
inputs.NdotNG = clamp(dot(normal, normalGround), -1.0, 1.0);
vec3 reflectedView = normalize(reflect(viewDirection, normal));
inputs.RdotNG = clamp(dot(reflectedView, normalGround), -1.0, 1.0);
inputs.albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
inputs.ssao = ssao;
inputs.metalness = mrr[0];
inputs.roughness = clamp(mrr[1] * mrr[1], 0.001, 0.99);`),r.code.add(T.g`inputs.f0 = (0.16 * mrr[2] * mrr[2]) * (1.0 - inputs.metalness) + inputs.albedoLinear * inputs.metalness;
inputs.f90 = vec3(clamp(dot(inputs.f0, vec3(50.0 * 0.33)), 0.0, 1.0));
inputs.diffuseColor = inputs.albedoLinear * (vec3(1.0) - inputs.f0) * (1.0 - inputs.metalness);`),t.useFillLights?r.uniforms.add(new so("hasFillLights",((e,t)=>t.enableFillLights))):r.constants.add("hasFillLights","bool",!1),r.code.add(T.g`vec3 ambientDir = vec3(5.0 * normalGround[1] - normalGround[0] * normalGround[2], - 5.0 * normalGround[0] - normalGround[2] * normalGround[1], normalGround[1] * normalGround[1] + normalGround[0] * normalGround[0]);
ambientDir = ambientDir != vec3(0.0) ? normalize(ambientDir) : normalize(vec3(5.0, -1.0, 0.0));
inputs.NdotAmbDir = hasFillLights ? abs(dot(normal, ambientDir)) : 1.0;
vec3 mainLightIrradianceComponent = inputs.NdotL * (1.0 - shadow) * mainLightIntensity;
vec3 fillLightsIrradianceComponent = inputs.NdotAmbDir * mainLightIntensity * fillLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(normal, ssao) + additionalLight;
inputs.skyIrradianceToSurface = ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
inputs.groundIrradianceToSurface = GROUND_REFLECTANCE * ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;`),r.uniforms.add(new G.c("lightingSpecularStrength",((e,t)=>t.lighting.mainLight.specularStrength)),new G.c("lightingEnvironmentStrength",((e,t)=>t.lighting.mainLight.environmentStrength))),r.code.add(T.g`vec3 horizonRingDir = inputs.RdotNG * normalGround - reflectedView;
vec3 horizonRingH = normalize(viewDirection + horizonRingDir);
inputs.NdotH_Horizon = dot(normal, horizonRingH);
vec3 mainLightRadianceComponent = lightingSpecularStrength * normalDistribution(inputs.NdotH, inputs.roughness) * mainLightIntensity * (1.0 - shadow);
vec3 horizonLightRadianceComponent = lightingEnvironmentStrength * normalDistribution(inputs.NdotH_Horizon, min(inputs.roughness + horizonLightDiffusion, 1.0)) * mainLightIntensity * fillLightIntensity;
vec3 ambientLightRadianceComponent = lightingEnvironmentStrength * calculateAmbientRadiance(ssao) + additionalLight;
float normalDirectionModifier = mix(1., min(mix(0.1, 2.0, (inputs.NdotNG + 1.) * 0.5), 1.0), clamp(inputs.roughness * 5.0, 0.0 , 1.0));
inputs.skyRadianceToSurface = (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;
inputs.groundRadianceToSurface = 0.5 * GROUND_REFLECTANCE * (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;
inputs.averageAmbientRadiance = ambientLightIrradianceComponent[1] * (1.0 + GROUND_REFLECTANCE[1]);`),r.code.add(T.g`
        vec3 reflectedColorComponent = evaluateEnvironmentIllumination(inputs);
        vec3 additionalMaterialReflectanceComponent = inputs.albedoLinear * additionalAmbientIrradiance;
        vec3 emissionComponent = _emission == vec3(0.0) ? _emission : pow(_emission, vec3(GAMMA_SRGB));
        vec3 outColorLinear = reflectedColorComponent + additionalMaterialReflectanceComponent + emissionComponent;
        ${t.pbrMode!==Br.Schematic||t.hasColorTexture?T.g`vec3 outColor = pow(blackLevelSoftCompression(outColorLinear, inputs), vec3(INV_GAMMA_SRGB));`:T.g`vec3 outColor = pow(max(vec3(0.0), outColorLinear - 0.005 * inputs.averageAmbientRadiance), vec3(INV_GAMMA_SRGB));`}
        return outColor;
      }
    `);break;case Br.Simplified:case Br.TerrainWithWater:e.include(Qr),r.code.add(T.g`const float roughnessTerrain = 0.5;
const float specularityTerrain = 0.5;
const vec3 fresnelReflectionTerrain = vec3(0.04);
vec3 evaluatePBRSimplifiedLighting(vec3 n, vec3 c, float shadow, float ssao, vec3 al, vec3 vd, vec3 nup) {
vec3 viewDirection = -vd;
vec3 h = normalize(viewDirection + mainLightDirection);
float NdotL = clamp(dot(n, mainLightDirection), 0.001, 1.0);
float NdotV = clamp(abs(dot(n, viewDirection)), 0.001, 1.0);
float NdotH = clamp(dot(n, h), 0.0, 1.0);
float NdotNG = clamp(dot(n, nup), -1.0, 1.0);
vec3 albedoLinear = pow(c, vec3(GAMMA_SRGB));
float lightness = 0.3 * albedoLinear[0] + 0.5 * albedoLinear[1] + 0.2 * albedoLinear[2];
vec3 f0 = (0.85 * lightness + 0.15) * fresnelReflectionTerrain;
vec3 f90 =  vec3(clamp(dot(f0, vec3(50.0 * 0.33)), 0.0, 1.0));
vec3 mainLightIrradianceComponent = (1. - shadow) * NdotL * mainLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(n, ssao) + al;
vec3 ambientSky = ambientLightIrradianceComponent + mainLightIrradianceComponent;
vec3 indirectDiffuse = ((1.0 - NdotNG) * mainLightIrradianceComponent + (1.0 + NdotNG ) * ambientSky) * 0.5;
vec3 outDiffColor = albedoLinear * (1.0 - f0) * indirectDiffuse / PI;
vec3 mainLightRadianceComponent = normalDistribution(NdotH, roughnessTerrain) * mainLightIntensity;
vec2 dfg = prefilteredDFGAnalytical(roughnessTerrain, NdotV);
vec3 specularColor = f0 * dfg.x + f90 * dfg.y;
vec3 specularComponent = specularityTerrain * specularColor * mainLightRadianceComponent;
vec3 outColorLinear = outDiffColor + specularComponent;
vec3 outColor = pow(outColorLinear, vec3(INV_GAMMA_SRGB));
return outColor;
}`);break;default:(0,zr.n)(t.pbrMode);case Br.COUNT:}}class Jo extends G.U{constructor(e,t,r){super(e,"mat4",U.B.Draw,((r,i,o,n)=>r.setUniformMatrix4fv(e,t(i,o,n))),r)}}class Ko extends T.N{constructor(){super(...arguments),this.modelTransformation=d.I}}class Qo extends Ko{constructor(){super(...arguments),this.origin=(0,m.c)()}}function en(e,t){t.receiveShadows&&(e.fragment.uniforms.add(new io("shadowMapMatrix",((e,t)=>t.shadowMap.getShadowMapMatrices(e.origin)),4)),rn(e))}function tn(e,t){t.receiveShadows&&(e.fragment.uniforms.add(new Jo("shadowMapMatrix",((e,t)=>t.shadowMap.getShadowMapMatrices(e.origin)),4)),rn(e))}function rn(e){const t=e.fragment;t.include(ro),t.uniforms.add(new wt("shadowMap",((e,t)=>t.shadowMap.depthTexture)),new si("numCascades",((e,t)=>t.shadowMap.numCascades)),new Mt("cascadeDistances",((e,t)=>t.shadowMap.cascadeDistances))),t.code.add(T.g`int chooseCascade(float depth, out mat4 mat) {
vec4 distance = cascadeDistances;
int i = depth < distance[1] ? 0 : depth < distance[2] ? 1 : depth < distance[3] ? 2 : 3;
mat = i == 0 ? shadowMapMatrix[0] : i == 1 ? shadowMapMatrix[1] : i == 2 ? shadowMapMatrix[2] : shadowMapMatrix[3];
return i;
}
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, ivec2 textureSize, vec3 lvpos) {
float xScale = float(textureSize.y) / float(textureSize.x);
return vec2((float(i) + lvpos.x) * xScale, lvpos.y);
}
float readShadowMapDepth(ivec2 uv, sampler2D _depthTex) {
return rgba4ToFloat(texelFetch(_depthTex, uv, 0));
}
float posIsInShadow(ivec2 uv, vec3 lvpos, sampler2D _depthTex) {
return readShadowMapDepth(uv, _depthTex) < lvpos.z ? 1.0 : 0.0;
}
float filterShadow(vec2 uv, vec3 lvpos, ivec2 texSize, sampler2D _depthTex) {
vec2 st = fract(uv * vec2(texSize) + vec2(0.5));
ivec2 base = ivec2(uv * vec2(texSize) - vec2(0.5));
float s00 = posIsInShadow(ivec2(base.x, base.y), lvpos, _depthTex);
float s10 = posIsInShadow(ivec2(base.x + 1, base.y), lvpos, _depthTex);
float s11 = posIsInShadow(ivec2(base.x + 1, base.y + 1), lvpos, _depthTex);
float s01 = posIsInShadow(ivec2(base.x, base.y + 1), lvpos, _depthTex);
return mix(mix(s00, s10, st.x), mix(s01, s11, st.x), st.y);
}
float readShadowMap(const in vec3 _vpos, float _linearDepth) {
mat4 mat;
int i = chooseCascade(_linearDepth, mat);
if (i >= numCascades) { return 0.0; }
vec3 lvpos = lightSpacePosition(_vpos, mat);
if (lvpos.z >= 1.0 || lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) { return 0.0; }
ivec2 size = textureSize(shadowMap, 0);
vec2 uv = cascadeCoordinates(i, size, lvpos);
return filterShadow(uv, lvpos, size, shadowMap);
}`)}function on(e,t){t.hasColorTextureTransform?(e.vertex.uniforms.add(new G.M("colorTextureTransformMatrix",(e=>e.colorTextureTransformMatrix??c.I))),e.varyings.add("colorUV","vec2"),e.vertex.code.add(T.g`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(T.g`void forwardColorUV(){}`)}function nn(e,t){t.hasNormalTextureTransform&&t.textureCoordinateType!==Dr.None?(e.vertex.uniforms.add(new G.M("normalTextureTransformMatrix",(e=>e.normalTextureTransformMatrix??c.I))),e.varyings.add("normalUV","vec2"),e.vertex.code.add(T.g`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(T.g`void forwardNormalUV(){}`)}function an(e,t){t.hasEmissionTextureTransform&&t.textureCoordinateType!==Dr.None?(e.vertex.uniforms.add(new G.M("emissiveTextureTransformMatrix",(e=>e.emissiveTextureTransformMatrix??c.I))),e.varyings.add("emissiveUV","vec2"),e.vertex.code.add(T.g`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(T.g`void forwardEmissiveUV(){}`)}function sn(e,t){t.hasOcclusionTextureTransform&&t.textureCoordinateType!==Dr.None?(e.vertex.uniforms.add(new G.M("occlusionTextureTransformMatrix",(e=>e.occlusionTextureTransformMatrix??c.I))),e.varyings.add("occlusionUV","vec2"),e.vertex.code.add(T.g`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(T.g`void forwardOcclusionUV(){}`)}function cn(e,t){t.hasMetallicRoughnessTextureTransform&&t.textureCoordinateType!==Dr.None?(e.vertex.uniforms.add(new G.M("metallicRoughnessTextureTransformMatrix",(e=>e.metallicRoughnessTextureTransformMatrix??c.I))),e.varyings.add("metallicRoughnessUV","vec2"),e.vertex.code.add(T.g`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(T.g`void forwardMetallicRoughnessUV(){}`)}function ln(e){e.include(Qt),e.code.add(T.g`
    vec3 mixExternalColor(vec3 internalColor, vec3 textureColor, vec3 externalColor, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      vec3 internalMixed = internalColor * textureColor;
      vec3 allMixed = internalMixed * externalColor;

      if (mode == ${T.g.int(Zi.C.Multiply)}) {
        return allMixed;
      }
      if (mode == ${T.g.int(Zi.C.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${T.g.int(Zi.C.Replace)}) {
        return externalColor;
      }

      // tint (or something invalid)
      float vIn = rgb2v(internalMixed);
      vec3 hsvTint = rgb2hsv(externalColor);
      vec3 hsvOut = vec3(hsvTint.x, hsvTint.y, vIn * hsvTint.z);
      return hsv2rgb(hsvOut);
    }

    float mixExternalOpacity(float internalOpacity, float textureOpacity, float externalOpacity, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      float internalMixed = internalOpacity * textureOpacity;
      float allMixed = internalMixed * externalOpacity;

      if (mode == ${T.g.int(Zi.C.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${T.g.int(Zi.C.Replace)}) {
        return externalOpacity;
      }

      // multiply or tint (or something invalid)
      return allMixed;
    }
  `)}const dn=Object.freeze(Object.defineProperty({__proto__:null,build:function(e){const t=new tr,{vertex:r,fragment:i,varyings:o}=t;if(ot(r,e),t.include(Wr),o.add("vpos","vec3"),t.include(At,e),t.include(lt,e),t.include(eo,e),t.include(on,e),e.output===G.S.Color){t.include(nn,e),t.include(an,e),t.include(sn,e),t.include(cn,e),it(r,e),t.include(Ur.N,e),t.include(ki,e);const n=e.normalType===Ur.a.Attribute||e.normalType===Ur.a.Compressed;n&&e.offsetBackfaces&&t.include(So),t.include(No,e),t.include(Xr,e),e.instancedColor&&t.attributes.add(E.V.INSTANCECOLOR,"vec4"),o.add("vPositionLocal","vec3"),t.include(ei,e),t.include(Wi,e),t.include(Ao,e),t.include(qi,e),r.uniforms.add(new Mt("externalColor",(e=>e.externalColor))),o.add("vcolorExt","vec4"),e.multipassEnabled&&o.add("depth","float"),r.code.add(T.g`
      void main(void) {
        forwardNormalizedVertexColor();
        vcolorExt = externalColor;
        ${e.instancedColor?"vcolorExt *= instanceColor * 0.003921568627451;":""}
        vcolorExt *= vvColor();
        vcolorExt *= getSymbolColor();
        forwardColorMixMode();

        if (vcolorExt.a < ${T.g.float(Kt)}) {
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        } else {
          vpos = getVertexInLocalOriginSpace();
          vPositionLocal = vpos - view[3].xyz;
          vpos = subtractOrigin(vpos);
          ${n?T.g`vNormalWorld = dpNormal(vvLocalNormal(normalModel()));`:""}
          vpos = addVerticalOffset(vpos, localOrigin);
          ${e.hasVertexTangents?"vTangent = dpTransformVertexTangent(tangent);":""}
          gl_Position = transformPosition(proj, view, vpos);
          ${n&&e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
        }

        ${e.multipassEnabled?"depth = (view * vec4(vpos, 1.0)).z;":""}
        forwardLinearDepth();
        forwardTextureCoordinates();
        forwardColorUV();
        forwardNormalUV();
        forwardEmissiveUV();
        forwardOcclusionUV();
        forwardMetallicRoughnessUV();
      }
    `),t.include(ht,e),t.include(Zo,e),t.include($o,e),t.include(Ro,e),t.include(e.instancedDoublePrecision?en:tn,e),t.include(Zt,e),it(i,e),i.uniforms.add(r.uniforms.get("localOrigin"),new G.F("ambient",(e=>e.ambient)),new G.F("diffuse",(e=>e.diffuse)),new G.c("opacity",(e=>e.opacity)),new G.c("layerOpacity",(e=>e.layerOpacity))),e.hasColorTexture&&i.uniforms.add(new wt("tex",(e=>e.texture))),t.include(ii,e),t.include(ni,e),i.include(ln),t.include(go,e),Xo(i),Yo(i),Kr(i),e.transparencyPassType===tt.ColorAlpha&&(t.outputs.add("fragColor","vec4",0),t.outputs.add("fragAlpha","float",1)),i.code.add(T.g`
      void main() {
        discardBySlice(vpos);
        ${e.multipassEnabled?"terrainDepthTest(depth);":""}
        ${e.hasColorTexture?T.g`
                vec4 texColor = texture(tex, ${e.hasColorTextureTransform?T.g`colorUV`:T.g`vuv0`});
                ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:T.g`vec4 texColor = vec4(1.0);`}
        shadingParams.viewDirection = normalize(vpos - cameraPosition);
        ${e.normalType===Ur.a.ScreenDerivative?T.g`
                vec3 normal = screenDerivativeNormal(vPositionLocal);`:T.g`
                shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
        ${e.pbrMode===Br.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

        vec3 posWorld = vpos + localOrigin;

        float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
        float shadow = ${e.receiveShadows?"readShadowMap(vpos, linearDepth)":e.spherical?"lightingGlobalFactor * (1.0 - additionalAmbientScale)":"0.0"};

        vec3 matColor = max(ambient, diffuse);
        ${e.hasVertexColors?T.g`
                vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:T.g`
                vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        ${e.hasNormalTexture?T.g`
                mat3 tangentSpace = ${e.hasVertexTangents?"computeTangentSpace(normal);":"computeTangentSpace(normal, vpos, vuv0);"}
                vec3 shadingNormal = computeTextureNormal(tangentSpace, ${e.hasNormalTextureTransform?T.g`normalUV`:"vuv0"});`:T.g`vec3 shadingNormal = normal;`}
        vec3 normalGround = ${e.spherical?T.g`normalize(posWorld);`:T.g`vec3(0.0, 0.0, 1.0);`}

        ${e.snowCover?T.g`
                float snow = smoothstep(0.5, 0.55, dot(normal, normalGround));
                albedo = mix(albedo, vec3(1), snow);
                shadingNormal = mix(shadingNormal, normal, snow);
                ssao = mix(ssao, 1.0, snow);`:""}

        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

        ${e.pbrMode===Br.Normal||e.pbrMode===Br.Schematic?T.g`
                float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                ${e.snowCover?T.g`
                        mrr = mix(mrr, vec3(0.0, 1.0, 0.04), snow);
                        emission = mix(emission, vec3(0.0), snow);`:""}

                vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:T.g`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        fragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${e.transparencyPassType===tt.ColorAlpha?T.g`
                  fragColor = premultiplyAlpha(fragColor);
                  fragAlpha = fragColor.a;`:""}
      }
    `)}return t.include(Oo,e),t}},Symbol.toStringTag,{value:"Module"}));class un extends Yr{constructor(){super(...arguments),this.isSchematic=!1,this.usePBR=!1,this.mrrFactors=(0,m.d)(To),this.hasVertexColors=!1,this.hasSymbolColors=!1,this.doubleSided=!1,this.doubleSidedType="normal",this.cullFace=v.C.Back,this.isInstanced=!1,this.hasInstancedColor=!1,this.emissiveFactor=(0,m.f)(0,0,0),this.instancedDoublePrecision=!1,this.normalType=Ur.a.Attribute,this.receiveShadows=!0,this.receiveAmbientOcclusion=!0,this.castShadows=!0,this.shadowMappingEnabled=!1,this.ambient=(0,m.f)(.2,.2,.2),this.diffuse=(0,m.f)(.8,.8,.8),this.externalColor=(0,Hr.f)(1,1,1,1),this.colorMixMode="multiply",this.opacity=1,this.layerOpacity=1,this.origin=(0,m.c)(),this.hasSlicePlane=!1,this.hasSliceHighlight=!0,this.offsetTransparentBackfaces=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.modelTransformation=null,this.transparent=!1,this.writeDepth=!0,this.customDepthTest=v.b.Less,this.textureAlphaMode=v.A.Blend,this.textureAlphaCutoff=.1,this.textureAlphaPremultiplied=!1,this.hasOccludees=!1,this.renderOccluded=O.Occlude,this.isDecoration=!1}}class hn extends Zr{constructor(){super(...arguments),this.origin=(0,m.c)(),this.slicePlaneLocalOrigin=this.origin}}class mn extends mr{initializeConfiguration(e,t){t.spherical=e.viewingMode===S.V.Global,t.doublePrecisionRequiresObfuscation=e.rctx.driverTest.doublePrecisionRequiresObfuscation.result,t.textureCoordinateType=t.hasColorTexture||t.hasMetallicRoughnessTexture||t.hasEmissionTexture||t.hasOcclusionTexture||t.hasNormalTexture?Dr.Default:Dr.None,t.objectAndLayerIdColorInstanced=t.instanced}initializeProgram(e){return this._initializeProgram(e,mn.shader)}_initializeProgram(e,t){return new br(e.rctx,t.get().build(this.configuration),M)}_makePipeline(e,t){const r=this.configuration,i=e===tt.NONE,o=e===tt.FrontFace;return xe({blending:r.output===G.S.Color&&r.transparent?i?fr:gr(e):null,culling:fn(r)?se(r.cullFace):null,depthTest:{func:xr(e,(n=r.customDepthTest,n===v.b.Lequal?te.j.LEQUAL:te.j.LESS))},depthWrite:(i||o)&&r.writeDepth?ce:null,drawBuffers:r.output===G.S.Depth?{buffers:[te.l.NONE]}:Tr(e),colorWrite:le,stencilWrite:r.hasOccludees?Er:null,stencilTest:r.hasOccludees?t?Ar:Sr:null,polygonOffset:i||o?null:_r(r.enableOffset)});var n}initializePipeline(){return this._occludeePipelineState=this._makePipeline(this.configuration.transparencyPassType,!0),this._makePipeline(this.configuration.transparencyPassType,!1)}getPipeline(e){return e?this._occludeePipelineState:super.getPipeline()}}function fn(e){return e.cullFace!==v.C.None||!e.hasSlicePlane&&!e.transparent&&!e.doubleSidedMode}mn.shader=new hr(dn,(()=>Promise.resolve().then((()=>dn))));class pn extends ut{constructor(){super(...arguments),this.output=G.S.Color,this.alphaDiscardMode=v.A.Opaque,this.doubleSidedMode=vo.None,this.pbrMode=Br.Disabled,this.cullFace=v.C.None,this.transparencyPassType=tt.NONE,this.normalType=Ur.a.Attribute,this.textureCoordinateType=Dr.None,this.customDepthTest=v.b.Less,this.spherical=!1,this.hasVertexColors=!1,this.hasSymbolColors=!1,this.hasVerticalOffset=!1,this.hasSlicePlane=!1,this.hasSliceHighlight=!0,this.hasColorTexture=!1,this.hasMetallicRoughnessTexture=!1,this.hasEmissionTexture=!1,this.hasOcclusionTexture=!1,this.hasNormalTexture=!1,this.hasScreenSizePerspective=!1,this.hasVertexTangents=!1,this.hasOccludees=!1,this.multipassEnabled=!1,this.hasModelTransformation=!1,this.offsetBackfaces=!1,this.vvSize=!1,this.vvColor=!1,this.receiveShadows=!1,this.receiveAmbientOcclusion=!1,this.textureAlphaPremultiplied=!1,this.instanced=!1,this.instancedColor=!1,this.objectAndLayerIdColorInstanced=!1,this.instancedDoublePrecision=!1,this.doublePrecisionRequiresObfuscation=!1,this.writeDepth=!0,this.transparent=!1,this.enableOffset=!0,this.cullAboveGround=!1,this.snowCover=!1,this.hasColorTextureTransform=!1,this.hasEmissionTextureTransform=!1,this.hasNormalTextureTransform=!1,this.hasOcclusionTextureTransform=!1,this.hasMetallicRoughnessTextureTransform=!1}}(0,V._)([H({count:G.S.COUNT})],pn.prototype,"output",void 0),(0,V._)([H({count:v.A.COUNT})],pn.prototype,"alphaDiscardMode",void 0),(0,V._)([H({count:vo.COUNT})],pn.prototype,"doubleSidedMode",void 0),(0,V._)([H({count:Br.COUNT})],pn.prototype,"pbrMode",void 0),(0,V._)([H({count:v.C.COUNT})],pn.prototype,"cullFace",void 0),(0,V._)([H({count:tt.COUNT})],pn.prototype,"transparencyPassType",void 0),(0,V._)([H({count:Ur.a.COUNT})],pn.prototype,"normalType",void 0),(0,V._)([H({count:Dr.COUNT})],pn.prototype,"textureCoordinateType",void 0),(0,V._)([H({count:v.b.COUNT})],pn.prototype,"customDepthTest",void 0),(0,V._)([H()],pn.prototype,"spherical",void 0),(0,V._)([H()],pn.prototype,"hasVertexColors",void 0),(0,V._)([H()],pn.prototype,"hasSymbolColors",void 0),(0,V._)([H()],pn.prototype,"hasVerticalOffset",void 0),(0,V._)([H()],pn.prototype,"hasSlicePlane",void 0),(0,V._)([H()],pn.prototype,"hasSliceHighlight",void 0),(0,V._)([H()],pn.prototype,"hasColorTexture",void 0),(0,V._)([H()],pn.prototype,"hasMetallicRoughnessTexture",void 0),(0,V._)([H()],pn.prototype,"hasEmissionTexture",void 0),(0,V._)([H()],pn.prototype,"hasOcclusionTexture",void 0),(0,V._)([H()],pn.prototype,"hasNormalTexture",void 0),(0,V._)([H()],pn.prototype,"hasScreenSizePerspective",void 0),(0,V._)([H()],pn.prototype,"hasVertexTangents",void 0),(0,V._)([H()],pn.prototype,"hasOccludees",void 0),(0,V._)([H()],pn.prototype,"multipassEnabled",void 0),(0,V._)([H()],pn.prototype,"hasModelTransformation",void 0),(0,V._)([H()],pn.prototype,"offsetBackfaces",void 0),(0,V._)([H()],pn.prototype,"vvSize",void 0),(0,V._)([H()],pn.prototype,"vvColor",void 0),(0,V._)([H()],pn.prototype,"receiveShadows",void 0),(0,V._)([H()],pn.prototype,"receiveAmbientOcclusion",void 0),(0,V._)([H()],pn.prototype,"textureAlphaPremultiplied",void 0),(0,V._)([H()],pn.prototype,"instanced",void 0),(0,V._)([H()],pn.prototype,"instancedColor",void 0),(0,V._)([H()],pn.prototype,"objectAndLayerIdColorInstanced",void 0),(0,V._)([H()],pn.prototype,"instancedDoublePrecision",void 0),(0,V._)([H()],pn.prototype,"doublePrecisionRequiresObfuscation",void 0),(0,V._)([H()],pn.prototype,"writeDepth",void 0),(0,V._)([H()],pn.prototype,"transparent",void 0),(0,V._)([H()],pn.prototype,"enableOffset",void 0),(0,V._)([H()],pn.prototype,"cullAboveGround",void 0),(0,V._)([H()],pn.prototype,"snowCover",void 0),(0,V._)([H()],pn.prototype,"hasColorTextureTransform",void 0),(0,V._)([H()],pn.prototype,"hasEmissionTextureTransform",void 0),(0,V._)([H()],pn.prototype,"hasNormalTextureTransform",void 0),(0,V._)([H()],pn.prototype,"hasOcclusionTextureTransform",void 0),(0,V._)([H()],pn.prototype,"hasMetallicRoughnessTextureTransform",void 0),(0,V._)([H({constValue:!1})],pn.prototype,"occlusionPass",void 0),(0,V._)([H({constValue:!0})],pn.prototype,"hasVvInstancing",void 0),(0,V._)([H({constValue:!1})],pn.prototype,"useCustomDTRExponentForWater",void 0),(0,V._)([H({constValue:!1})],pn.prototype,"supportsTextureAtlas",void 0),(0,V._)([H({constValue:!0})],pn.prototype,"useFillLights",void 0);const gn=Object.freeze(Object.defineProperty({__proto__:null,build:function(e){const t=new tr,{vertex:r,fragment:i,varyings:o}=t;return ot(r,e),t.include(Wr),o.add("vpos","vec3"),t.include(At,e),t.include(lt,e),t.include(eo,e),e.output===G.S.Color&&(it(t.vertex,e),t.include(Ur.N,e),t.include(ki,e),e.offsetBackfaces&&t.include(So),e.instancedColor&&t.attributes.add(E.V.INSTANCECOLOR,"vec4"),o.add("vNormalWorld","vec3"),o.add("localvpos","vec3"),e.multipassEnabled&&o.add("depth","float"),t.include(ei,e),t.include(Wi,e),t.include(Ao,e),t.include(qi,e),r.uniforms.add(new Mt("externalColor",(e=>e.externalColor))),o.add("vcolorExt","vec4"),r.code.add(T.g`
        void main(void) {
          forwardNormalizedVertexColor();
          vcolorExt = externalColor;
          ${e.instancedColor?"vcolorExt *= instanceColor * 0.003921568627451;":""}
          vcolorExt *= vvColor();
          vcolorExt *= getSymbolColor();
          forwardColorMixMode();

          if (vcolorExt.a < ${T.g.float(Kt)}) {
            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          } else {
            vpos = getVertexInLocalOriginSpace();
            localvpos = vpos - view[3].xyz;
            vpos = subtractOrigin(vpos);
            vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            ${e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
          }
          ${e.multipassEnabled?T.g`depth = (view * vec4(vpos, 1.0)).z;`:""}
          forwardLinearDepth();
          forwardTextureCoordinates();
        }
      `)),e.output===G.S.Color&&(t.include(ht,e),t.include(Zo,e),t.include($o,e),t.include(Ro,e),t.include(e.instancedDoublePrecision?en:tn,e),t.include(Zt,e),it(t.fragment,e),Jr(i),Xo(i),Yo(i),i.uniforms.add(r.uniforms.get("localOrigin"),r.uniforms.get("view"),new G.F("ambient",(e=>e.ambient)),new G.F("diffuse",(e=>e.diffuse)),new G.c("opacity",(e=>e.opacity)),new G.c("layerOpacity",(e=>e.layerOpacity))),e.hasColorTexture&&i.uniforms.add(new wt("tex",(e=>e.texture))),t.include(ii,e),t.include(ni,e),i.include(ln),e.transparencyPassType===tt.ColorAlpha&&(t.outputs.add("fragColor","vec4",0),t.outputs.add("fragAlpha","float",1)),Kr(i),i.code.add(T.g`
      void main() {
        discardBySlice(vpos);
        ${e.multipassEnabled?T.g`terrainDepthTest(depth);`:""}
        ${e.hasColorTexture?T.g`
                vec4 texColor = texture(tex, ${e.hasColorTextureTransform?T.g`colorUV`:T.g`vuv0`});
                ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:T.g`vec4 texColor = vec4(1.0);`}
        vec3 viewDirection = normalize(vpos - cameraPosition);
        ${e.pbrMode===Br.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        ${e.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":e.spherical?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;"}
        vec3 matColor = max(ambient, diffuse);
        ${e.hasVertexColors?T.g`
                vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:T.g`
                vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        ${e.snowCover?T.g`albedo = mix(albedo, vec3(1), 0.9);`:T.g``}
        ${T.g`
            vec3 shadingNormal = normalize(vNormalWorld);
            albedo *= 1.2;
            vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
            float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
            float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
            float treeRadialFalloff = vColor.r;
            float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
            additionalLight += backLightFactor * mainLightIntensity;`}
        ${e.pbrMode===Br.Normal||e.pbrMode===Br.Schematic?e.spherical?T.g`vec3 normalGround = normalize(vpos + localOrigin);`:T.g`vec3 normalGround = vec3(0.0, 0.0, 1.0);`:T.g``}
        ${e.pbrMode===Br.Normal||e.pbrMode===Br.Schematic?T.g`
                float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                ${e.snowCover?T.g`
                        mrr = vec3(0.0, 1.0, 0.04);
                        emission = vec3(0.0);`:""}

                vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:T.g`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        fragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${e.transparencyPassType===tt.ColorAlpha?T.g`
                fragColor = premultiplyAlpha(fragColor);
                fragAlpha = fragColor.a;`:""}
      }
    `)),t.include(Oo,e),t}},Symbol.toStringTag,{value:"Module"}));class vn extends mn{initializeConfiguration(e,t){super.initializeConfiguration(e,t),t.hasMetallicRoughnessTexture=!1,t.hasEmissionTexture=!1,t.hasOcclusionTexture=!1,t.hasNormalTexture=!1,t.hasModelTransformation=!1,t.normalType=Ur.a.Attribute,t.doubleSidedMode=vo.WindingOrder,t.hasVertexTangents=!1}initializeProgram(e){return this._initializeProgram(e,vn.shader)}}vn.shader=new hr(gn,(()=>Promise.resolve().then((()=>gn))));class _n extends I{constructor(e){super(e,Tn),this.supportsEdges=!0,this.produces=new Map([[Ke.OPAQUE_MATERIAL,e=>((0,G.l)(e)||(0,G.m)(e))&&!this.parameters.transparent],[Ke.TRANSPARENT_MATERIAL,e=>((0,G.l)(e)||(0,G.m)(e))&&this.parameters.transparent&&this.parameters.writeDepth],[Ke.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL,e=>((0,G.l)(e)||(0,G.m)(e))&&this.parameters.transparent&&!this.parameters.writeDepth]]),this._configuration=new pn,this._vertexBufferLayout=function(e){const t=(0,Gr.n)().vec3f(E.V.POSITION);return e.normalType===Ur.a.Compressed?t.vec2i16(E.V.NORMALCOMPRESSED,{glNormalized:!0}):t.vec3f(E.V.NORMAL),e.hasVertexTangents&&t.vec4f(E.V.TANGENT),(e.textureId||e.normalTextureId||e.metallicRoughnessTextureId||e.emissiveTextureId||e.occlusionTextureId)&&t.vec2f(E.V.UV0),e.hasVertexColors&&t.vec4u8(E.V.COLOR),e.hasSymbolColors&&t.vec4u8(E.V.SYMBOLCOLOR),(0,p.h)("enable-feature:objectAndLayerId-rendering")&&t.vec4u8(E.V.OBJECTANDLAYERIDCOLOR),t}(this.parameters)}isVisibleForOutput(e){return e!==G.S.Shadow&&e!==G.S.ShadowExcludeHighlight&&e!==G.S.ShadowHighlight||this.parameters.castShadows}isVisible(){const e=this.parameters;if(!super.isVisible()||0===e.layerOpacity)return!1;const{hasInstancedColor:t,hasVertexColors:r,hasSymbolColors:i,vvColor:o}=e,n="replace"===e.colorMixMode,a=e.opacity>0,s=e.externalColor&&e.externalColor[3]>0,c=t||o||i;return r&&c?n||a:r?n?s:a:c?n||a:n?s:a}getConfiguration(e,t){return this._configuration.output=e,this._configuration.hasNormalTexture=!!this.parameters.normalTextureId,this._configuration.hasColorTexture=!!this.parameters.textureId,this._configuration.hasVertexTangents=this.parameters.hasVertexTangents,this._configuration.instanced=this.parameters.isInstanced,this._configuration.instancedDoublePrecision=this.parameters.instancedDoublePrecision,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.hasVerticalOffset=null!=this.parameters.verticalOffset,this._configuration.hasScreenSizePerspective=null!=this.parameters.screenSizePerspective,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasSliceHighlight=this.parameters.hasSliceHighlight,this._configuration.alphaDiscardMode=this.parameters.textureAlphaMode,this._configuration.normalType=this.parameters.normalType,this._configuration.transparent=this.parameters.transparent,this._configuration.writeDepth=this.parameters.writeDepth,null!=this.parameters.customDepthTest&&(this._configuration.customDepthTest=this.parameters.customDepthTest),this._configuration.hasOccludees=this.parameters.hasOccludees,this._configuration.cullFace=this.parameters.hasSlicePlane?v.C.None:this.parameters.cullFace,this._configuration.multipassEnabled=t.multipassEnabled,this._configuration.cullAboveGround=t.multipassTerrain.cullAboveGround,this._configuration.hasModelTransformation=null!=this.parameters.modelTransformation,e===G.S.Color&&(this._configuration.hasVertexColors=this.parameters.hasVertexColors,this._configuration.hasSymbolColors=this.parameters.hasSymbolColors,this.parameters.treeRendering?this._configuration.doubleSidedMode=vo.WindingOrder:this._configuration.doubleSidedMode=this.parameters.doubleSided&&"normal"===this.parameters.doubleSidedType?vo.View:this.parameters.doubleSided&&"winding-order"===this.parameters.doubleSidedType?vo.WindingOrder:vo.None,this._configuration.instancedColor=this.parameters.hasInstancedColor,this._configuration.receiveShadows=this.parameters.receiveShadows&&this.parameters.shadowMappingEnabled,this._configuration.receiveAmbientOcclusion=this.parameters.receiveAmbientOcclusion&&null!=t.ssao,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.textureAlphaPremultiplied=!!this.parameters.textureAlphaPremultiplied,this._configuration.pbrMode=this.parameters.usePBR?this.parameters.isSchematic?Br.Schematic:Br.Normal:Br.Disabled,this._configuration.hasMetallicRoughnessTexture=!!this.parameters.metallicRoughnessTextureId,this._configuration.hasEmissionTexture=!!this.parameters.emissiveTextureId,this._configuration.hasOcclusionTexture=!!this.parameters.occlusionTextureId,this._configuration.offsetBackfaces=!(!this.parameters.transparent||!this.parameters.offsetTransparentBackfaces),this._configuration.transparencyPassType=t.transparencyPassType,this._configuration.enableOffset=t.camera.relativeElevation<5e5,this._configuration.snowCover=this.hasSnowCover(t),this._configuration.hasColorTextureTransform=!!this.parameters.colorTextureTransformMatrix,this._configuration.hasNormalTextureTransform=!!this.parameters.normalTextureTransformMatrix,this._configuration.hasEmissionTextureTransform=!!this.parameters.emissiveTextureTransformMatrix,this._configuration.hasOcclusionTextureTransform=!!this.parameters.occlusionTextureTransformMatrix,this._configuration.hasMetallicRoughnessTextureTransform=!!this.parameters.metallicRoughnessTextureTransformMatrix),this._configuration}hasSnowCover(e){return null!=e.weather&&e.weatherVisible&&"snowy"===e.weather.type&&"enabled"===e.weather.snowCover}intersect(e,t,r,i,o,n){if(null!=this.parameters.verticalOffset){const e=r.camera;(0,h.s)(wn,t[12],t[13],t[14]);let n=null;switch(r.viewingMode){case S.V.Global:n=(0,h.n)(An,wn);break;case S.V.Local:n=(0,h.p)(An,Sn)}let s=0;const c=(0,h.c)(yn,wn,e.eye),l=(0,h.l)(c),d=(0,h.b)(c,c,1/l);let u=null;this.parameters.screenSizePerspective&&(u=(0,h.d)(n,d)),s+=function(e,t,r,i,o){let n=(r.screenLength||0)*e.pixelRatio;null!=o&&(n=function(e,t,r,i){return function(e,t){return(0,a.l)(e*Math.max(t.scale,t.minScaleFactor),e,t.factor)}(e,function(e,t,r){const i=r.parameters;return w.scale=Math.min(i.divisor/(t-i.offset),1),w.factor=function(e){return Math.abs(e*e*e)}(e),w}(t,r,i))}(n,i,t,o));const s=n*Math.tan(.5*e.fovY)/(.5*e.fullHeight);return(0,a.c)(s*t,r.minWorldLength||0,null!=r.maxWorldLength?r.maxWorldLength:1/0)}(e,l,this.parameters.verticalOffset,u??0,this.parameters.screenSizePerspective),(0,h.b)(n,n,s),(0,h.r)(Mn,n,r.transform.inverseRotation),i=(0,h.c)(bn,i,Mn),o=(0,h.c)(En,o,Mn)}_i(e,r,i,o,function(e){return null!=e?(Di.offset=e,Di):null}(r.verticalOffset),n)}createGLMaterial(e){return new xn(e)}createBufferWriter(){return new pi(this._vertexBufferLayout)}}class xn extends ci{constructor(e){super({...e,...e.material.parameters})}_updateShadowState(e){e.shadowMap.enabled!==this._material.parameters.shadowMappingEnabled&&this._material.setParameters({shadowMappingEnabled:e.shadowMap.enabled})}_updateOccludeeState(e){e.hasOccludees!==this._material.parameters.hasOccludees&&this._material.setParameters({hasOccludees:e.hasOccludees})}beginSlot(e){this._output===G.S.Color&&(this._updateShadowState(e),this._updateOccludeeState(e));const t=this._material.parameters;this.updateTexture(t.textureId);const r=e.camera.viewInverseTransposeMatrix;return(0,h.s)(t.origin,r[3],r[7],r[11]),this._material.setParameters(this.textureBindParameters),this.ensureTechnique(t.treeRendering?vn:mn,e)}}const Tn=new class extends un{constructor(){super(...arguments),this.initTextureTransparent=!1,this.treeRendering=!1,this.hasVertexTangents=!1}},bn=(0,m.c)(),En=(0,m.c)(),Sn=(0,m.f)(0,0,1),An=(0,m.c)(),Mn=(0,m.c)(),wn=(0,m.c)(),yn=(0,m.c)();function Rn(e){if(null==e)return null;const t=null!=e.offset?e.offset:Ir.Z,r=null!=e.rotation?e.rotation:0,i=null!=e.scale?e.scale:Ir.O,o=(0,c.f)(1,0,0,0,1,0,t[0],t[1],1),n=(0,c.f)(Math.cos(r),-Math.sin(r),0,Math.sin(r),Math.cos(r),0,0,0,1),a=(0,c.f)(i[0],0,0,0,i[1],0,0,0,1),l=(0,c.c)();return(0,s.m)(l,n,a),(0,s.m)(l,o,l),l}class Cn{constructor(){this.geometries=new Array,this.materials=new Array,this.textures=new Array}}class In{constructor(e,t,r){this.name=e,this.lodThreshold=t,this.pivotOffset=r,this.stageResources=new Cn,this.numberOfVertices=0}}const On=()=>W.L.getLogger("esri.views.3d.layers.graphics.objectResourceUtils");async function Nn(e,t){const r=await async function(e,t){const r=t?.streamDataRequester;if(r)return async function(e,t,r){const i=await(0,Or.r)(t.request(e,"json",r));return!0===i.ok?i.value:((0,Z.QP)(i.error),void Pn(i.error.details.url))}(e,r,t);const i=await(0,Or.r)((0,K.A)(e,t));return!0===i.ok?i.value.data:((0,Z.QP)(i.error),void Pn(i.error))}(e,t),i=await async function(e,t){const r=new Array;for(const i in e){const o=e[i],n=o.images[0].data;if(!n){On().warn("Externally referenced texture data is not yet supported");continue}const a=o.encoding+";base64,"+n,s="/textureDefinitions/"+i,c="rgba"===o.channels?o.alphaChannelUsage||"transparency":"none",l={noUnpackFlip:!0,wrap:{s:te.T.REPEAT,t:te.T.REPEAT},preMultiplyAlpha:Bn(c)!==v.A.Opaque},d=t?.disableTextures?Promise.resolve(null):Q(a,t);r.push(d.then((e=>({refId:s,image:e,parameters:l,alphaChannelUsage:c}))))}const i=await Promise.all(r),o={};for(const e of i)o[e.refId]=e;return o}(r.textureDefinitions??{},t);let o=0;for(const e in i)if(i.hasOwnProperty(e)){const t=i[e];o+=t?.image?t.image.width*t.image.height*4:0}return{resource:r,textures:i,size:o+(0,p.Q)(r)}}function Pn(e){throw new $.A("",`Request for object resource failed: ${e}`)}function Ln(e){const t=e.params,r=t.topology;let i=!0;switch(t.vertexAttributes||(On().warn("Geometry must specify vertex attributes"),i=!1),t.topology){case"PerAttributeArray":break;case"Indexed":case null:case void 0:{const e=t.faces;if(e){if(t.vertexAttributes)for(const r in t.vertexAttributes){const t=e[r];t?.values?(null!=t.valueType&&"UInt32"!==t.valueType&&(On().warn(`Unsupported indexed geometry indices type '${t.valueType}', only UInt32 is currently supported`),i=!1),null!=t.valuesPerElement&&1!==t.valuesPerElement&&(On().warn(`Unsupported indexed geometry values per element '${t.valuesPerElement}', only 1 is currently supported`),i=!1)):(On().warn(`Indexed geometry does not specify face indices for '${r}' attribute`),i=!1)}}else On().warn("Indexed geometries must specify faces"),i=!1;break}default:On().warn(`Unsupported topology '${r}'`),i=!1}e.params.material||(On().warn("Geometry requires material"),i=!1);const o=e.params.vertexAttributes;for(const e in o)o[e].values||(On().warn("Geometries with externally defined attributes are not yet supported"),i=!1);return i}function Dn(e){const t=(0,f.j)();return e.forEach((e=>{const r=e.boundingInfo;null!=r&&((0,f.e)(t,r.bbMin),(0,f.e)(t,r.bbMax))})),t}function Bn(e){switch(e){case"mask":return v.A.Mask;case"maskAndTransparency":return v.A.MaskBlend;case"none":return v.A.Opaque;default:return v.A.Blend}}function Fn(e){const t=e.params;return{id:1,material:t.material,texture:t.texture,region:t.texture}}const Vn=new Fr.V(1,2,"wosr");async function Gn(e,t){const r=Un((0,n.a)(e));if("wosr"===r.fileType){const e=await(t.cache?t.cache.loadWOSR(r.url,t):Nn(r.url,t)),{engineResources:i,referenceBoundingBox:o}=function(e,t){const r=new Array,i=new Array,o=new Array,n=new Nr,a=e.resource,s=Fr.V.parse(a.version||"1.0","wosr");Vn.validate(s);const c=a.model.name,l=a.model.geometries,d=a.materialDefinitions??{},u=e.textures;let h=0;const f=new Map;for(let e=0;e<l.length;e++){const a=l[e];if(!Ln(a))continue;const s=Fn(a),c=a.params.vertexAttributes,p=[],_=e=>{if("PerAttributeArray"===a.params.topology)return null;const t=a.params.faces;for(const r in t)if(r===e)return t[r].values;return null},x=c[E.V.POSITION],T=x.values.length/x.valuesPerElement;for(const e in c){const t=c[e],r=t.values,i=_(e)??(0,g.a)(T);p.push([e,new Vr.A(r,i,t.valuesPerElement,!0)])}const b=s.texture,S=u&&u[b];if(S&&!f.has(b)){const{image:e,parameters:t}=S,r=new jt(e,t);i.push(r),f.set(b,r)}const A=f.get(b),M=A?A.id:void 0,w=s.material;let y=n.get(w,b);if(null==y){const e=d[w.substring(w.lastIndexOf("/")+1)].params;1===e.transparency&&(e.transparency=0);const r=S&&S.alphaChannelUsage,i=e.transparency>0||"transparency"===r||"maskAndTransparency"===r,o=S?Bn(S.alphaChannelUsage):void 0,a={ambient:(0,m.d)(e.diffuse),diffuse:(0,m.d)(e.diffuse),opacity:1-(e.transparency||0),transparent:i,textureAlphaMode:o,textureAlphaCutoff:.33,textureId:M,initTextureTransparent:!0,doubleSided:!0,cullFace:v.C.None,colorMixMode:e.externalColorMixMode||"tint",textureAlphaPremultiplied:S?.parameters.preMultiplyAlpha??!1};t?.materialParameters&&Object.assign(a,t.materialParameters),y=new _n(a),n.set(w,b,y)}o.push(y);const R=new Ze(y,p);h+=p.find((e=>e[0]===E.V.POSITION))?.[1]?.indices.length??0,r.push(R)}return{engineResources:[{name:c,stageResources:{textures:i,materials:o,geometries:r},pivotOffset:a.model.pivotOffset,numberOfVertices:h,lodThreshold:null}],referenceBoundingBox:Dn(r)}}(e,t);return{lods:i,referenceBoundingBox:o,isEsriSymbolResource:!1,isWosr:!0}}const i=await(t.cache?t.cache.loadGLTF(r.url,t,!!t.usePBR):(0,Rr.l)(new Rr.D(t.streamDataRequester),r.url,t,t.usePBR)),o=i.model.meta?.ESRI_proxyEllipsoid,a=i.meta.isEsriSymbolResource&&null!=o&&"EsriRealisticTreesStyle"===i.meta.ESRI_webstyle;a&&!i.customMeta.esriTreeRendering&&(i.customMeta.esriTreeRendering=!0,function(e,t){for(let r=0;r<e.model.lods.length;++r){const i=e.model.lods[r];for(const o of i.parts){const i=o.attributes.normal;if(null==i)return;const n=o.attributes.position,a=n.count,s=(0,m.c)(),c=(0,m.c)(),u=(0,m.c)(),f=new Uint8Array(4*a),p=new Float64Array(3*a),g=(0,l.i)((0,d.c)(),o.transform);let v=0,_=0;for(let l=0;l<a;l++){n.getVec(l,c),i.getVec(l,s),(0,h.h)(c,c,o.transform),(0,h.c)(u,c,t.center),(0,h.F)(u,u,t.radius);const a=u[2],d=(0,h.l)(u),m=Math.min(.45+.55*d*d,1);(0,h.F)(u,u,t.radius),null!==g&&(0,h.h)(u,u,g),(0,h.n)(u,u),r+1!==e.model.lods.length&&e.model.lods.length>1&&(0,h.a)(u,u,s,a>-1?.2:Math.min(-4*a-3.8,1)),p[v]=u[0],p[v+1]=u[1],p[v+2]=u[2],v+=3,f[_]=255*m,f[_+1]=255*m,f[_+2]=255*m,f[_+3]=255,_+=4}o.attributes.normal=new Mr.B(p),o.attributes.color=new Mr.o(f)}}}(i,o));const s=!!t.usePBR,c=i.meta.isEsriSymbolResource?{usePBR:s,isSchematic:!1,treeRendering:a,mrrFactors:[...Eo]}:{usePBR:s,isSchematic:!1,treeRendering:!1,mrrFactors:[...To]},u={...t.materialParameters,treeRendering:a},{engineResources:f,referenceBoundingBox:p}=zn(i,c,u,t.skipHighLods&&null==r.specifiedLodIndex?{skipHighLods:!0}:{skipHighLods:!1,singleLodIndex:r.specifiedLodIndex});return{lods:f,referenceBoundingBox:p,isEsriSymbolResource:i.meta.isEsriSymbolResource,isWosr:!1}}function Un(e){const t=e.match(/(.*\.(gltf|glb))(\?lod=([0-9]+))?$/);return t?{fileType:"gltf",url:t[1],specifiedLodIndex:null!=t[4]?Number(t[4]):null}:e.match(/(.*\.(json|json\.gz))$/)?{fileType:"wosr",url:e,specifiedLodIndex:null}:{fileType:"unknown",url:e,specifiedLodIndex:null}}function zn(e,t,r,i){const o=e.model,n=new Array,c=new Map,l=new Map,d=o.lods.length,h=(0,f.j)();return o.lods.forEach(((e,m)=>{const p=!0===i.skipHighLods&&(d>1&&0===m||d>3&&1===m)||!1===i.skipHighLods&&null!=i.singleLodIndex&&m!==i.singleLodIndex;if(p&&0!==m)return;const g=new In(e.name,e.lodThreshold,[0,0,0]);e.parts.forEach((e=>{const i=p?new _n({}):function(e,t,r,i,o,n,a){const s=t.material+(t.attributes.normal?"_normal":"")+(t.attributes.color?"_color":"")+(t.attributes.texCoord0?"_texCoord0":"")+(t.attributes.tangent?"_tangent":""),c=e.materials.get(t.material),l=null!=t.attributes.texCoord0,d=null!=t.attributes.normal;if(null==c)return null;const h=function(e){switch(e){case"BLEND":return v.A.Blend;case"MASK":return v.A.Mask;case"OPAQUE":case null:case void 0:return v.A.Opaque}}(c.alphaMode);if(!n.has(s)){if(l){const t=(t,r=!1)=>{if(null!=t&&!a.has(t)){const i=e.textures.get(t);if(null!=i){const e=i.data;a.set(t,new jt((0,Cr.i)(e)?e.data:e,{...i.parameters,preMultiplyAlpha:!(0,Cr.i)(e)&&r,encoding:(0,Cr.i)(e)&&null!=e.encoding?e.encoding:void 0}))}}};t(c.textureColor,h!==v.A.Opaque),t(c.textureNormal),t(c.textureOcclusion),t(c.textureEmissive),t(c.textureMetallicRoughness)}const r=c.color[0]**(1/Rr.g),m=c.color[1]**(1/Rr.g),f=c.color[2]**(1/Rr.g),p=c.emissiveFactor[0]**(1/Rr.g),g=c.emissiveFactor[1]**(1/Rr.g),_=c.emissiveFactor[2]**(1/Rr.g),x=null!=c.textureColor&&l?a.get(c.textureColor):null,T=_o({normalTexture:c.textureNormal,metallicRoughnessTexture:c.textureMetallicRoughness,metallicFactor:c.metallicFactor,roughnessFactor:c.roughnessFactor,emissiveTexture:c.textureEmissive,emissiveFactor:c.emissiveFactor,occlusionTexture:c.textureOcclusion}),b=null!=c.normalTextureTransform?.scale?c.normalTextureTransform?.scale:u.O;n.set(s,new _n({...i,transparent:h===v.A.Blend,customDepthTest:v.b.Lequal,textureAlphaMode:h,textureAlphaCutoff:c.alphaCutoff,diffuse:[r,m,f],ambient:[r,m,f],opacity:c.opacity,doubleSided:c.doubleSided,doubleSidedType:"winding-order",cullFace:c.doubleSided?v.C.None:v.C.Back,hasVertexColors:!!t.attributes.color,hasVertexTangents:!!t.attributes.tangent,normalType:d?Ur.a.Attribute:Ur.a.ScreenDerivative,castShadows:!0,receiveShadows:c.receiveShadows,receiveAmbientOcclusion:c.receiveAmbientOcclustion,textureId:null!=x?x.id:void 0,colorMixMode:c.colorMixMode,normalTextureId:null!=c.textureNormal&&l?a.get(c.textureNormal).id:void 0,textureAlphaPremultiplied:null!=x&&!!x.parameters.preMultiplyAlpha,occlusionTextureId:null!=c.textureOcclusion&&l?a.get(c.textureOcclusion).id:void 0,emissiveTextureId:null!=c.textureEmissive&&l?a.get(c.textureEmissive).id:void 0,metallicRoughnessTextureId:null!=c.textureMetallicRoughness&&l?a.get(c.textureMetallicRoughness).id:void 0,emissiveFactor:[p,g,_],mrrFactors:T?[...bo]:[c.metallicFactor,c.roughnessFactor,i.mrrFactors[2]],isSchematic:T,colorTextureTransformMatrix:Rn(c.colorTextureTransform),normalTextureTransformMatrix:Rn(c.normalTextureTransform),scale:[b[0],b[1]],occlusionTextureTransformMatrix:Rn(c.occlusionTextureTransform),emissiveTextureTransformMatrix:Rn(c.emissiveTextureTransform),metallicRoughnessTextureTransformMatrix:Rn(c.metallicRoughnessTextureTransform),...o}))}const m=n.get(s);if(r.stageResources.materials.push(m),l){const e=e=>{null!=e&&r.stageResources.textures.push(a.get(e))};e(c.textureColor),e(c.textureNormal),e(c.textureOcclusion),e(c.textureEmissive),e(c.textureMetallicRoughness)}return m}(o,e,g,t,r,c,l),{geometry:n,vertexCount:d}=function(e,t){const r=e.attributes.position.count,i=(0,Rr.c)(e.indices||r,e.primitiveType),o=He(3*r),{typedBuffer:n,typedBufferStride:c}=e.attributes.position;(0,wr.a)(o,n,e.transform,3,c);const l=[[E.V.POSITION,new Vr.A(o,i,3,!0)]];if(null!=e.attributes.normal){const t=He(3*r),{typedBuffer:o,typedBufferStride:n}=e.attributes.normal;(0,s.n)(Hn,e.transform),(0,wr.t)(t,o,Hn,3,n),(0,a.h)(Hn)&&(0,wr.n)(t,t),l.push([E.V.NORMAL,new Vr.A(t,i,3,!0)])}if(null!=e.attributes.tangent){const t=He(4*r),{typedBuffer:o,typedBufferStride:n}=e.attributes.tangent;(0,s.f)(Hn,e.transform),(0,yr.t)(t,o,Hn,4,n),(0,a.h)(Hn)&&(0,wr.n)(t,t,4),l.push([E.V.TANGENT,new Vr.A(t,i,4,!0)])}if(null!=e.attributes.texCoord0){const t=He(2*r),{typedBuffer:o,typedBufferStride:n}=e.attributes.texCoord0;(0,Rr.i)(t,o,2,n),l.push([E.V.UV0,new Vr.A(t,i,2,!0)])}const d=e.attributes.color;if(null!=d){const t=new Uint8Array(4*r);4===d.elementCount?d instanceof Mr.d?(0,yr.b)(t,d,255):d instanceof Mr.o?(0,Rr.j)(t,d):d instanceof Mr.s&&(0,yr.b)(t,d,1/256):(t.fill(255),d instanceof Mr.B?(0,wr.f)(t,d.typedBuffer,255,4,d.typedBufferStride):e.attributes.color instanceof Mr.n?(0,Rr.h)(t,d.typedBuffer,4,e.attributes.color.typedBufferStride):e.attributes.color instanceof Mr.r&&(0,wr.f)(t,d.typedBuffer,1/256,4,d.typedBufferStride)),l.push([E.V.COLOR,new Vr.A(t,i,4,!0)])}return{geometry:new Ze(t,l),vertexCount:r}}(e,null!=i?i:new _n({})),_=n.boundingInfo;null!=_&&0===m&&((0,f.e)(h,_.bbMin),(0,f.e)(h,_.bbMax)),null!=i&&(g.stageResources.geometries.push(n),g.numberOfVertices+=d)})),p||n.push(g)})),{engineResources:n,referenceBoundingBox:h}}const Hn=(0,c.c)(),jn=Object.freeze(Object.defineProperty({__proto__:null,fetch:Gn,gltfToEngineResources:zn,parseUrl:Un},Symbol.toStringTag,{value:"Module"}))},92080:(e,t,r)=>{r.d(t,{O:()=>a,a:()=>c,c:()=>h,f:()=>u,w:()=>d}),r(32773);var i=r(45371),o=r(26809),n=r(2589);r(85914);class a{constructor(e){this._allocator=e,this._items=[],this._itemsPtr=0,this._grow()}get(){return 0===this._itemsPtr&&(0,i.n)((()=>this._reset())),this._itemsPtr===this._items.length&&this._grow(),this._items[this._itemsPtr++]}_reset(){const e=Math.min(3*Math.max(8,this._itemsPtr),this._itemsPtr+3*s);this._items.length=Math.min(e,this._items.length),this._itemsPtr=0}_grow(){for(let e=0;e<Math.max(8,Math.min(this._items.length,s));e++)this._items.push(this._allocator())}}const s=1024;function c(e){return e?l((0,n.e)(e.origin),(0,n.e)(e.direction)):l((0,n.c)(),(0,n.c)())}function l(e,t){return{origin:e,direction:t}}function d(e,t){const r=m.get();return r.origin=e,r.direction=t,r}function u(e,t,r=c()){return(0,o.p)(r.origin,e),(0,o.c)(r.direction,t,e),r}function h(e,t,r){const i=(0,o.d)(e.direction,(0,o.c)(r,t,e.origin));return(0,o.i)(r,e.origin,(0,o.b)(r,e.direction,i)),r}const m=new a((()=>c()));(0,n.c)()},5611:(e,t,r)=>{r.d(t,{a:()=>_,b:()=>f,c:()=>v,d:()=>N,f:()=>T,g:()=>x,i:()=>M}),r(32773),r(20266);var i=r(16699),o=r(47812),n=r(26809),a=r(2589),s=r(91276),c=r(62482),l=r(18527),d=r(91695),u=r(92080),h=r(85914);const m=f();function f(){return(0,c.c)()}const p=s.a,g=s.a;function v(e,t){return(0,s.c)(t,e)}function _(e){return e[3]}function x(e){return e}function T(e,t,r,i){return(0,c.f)(e,t,r,i)}function b(e,t,r){if(null==t)return!1;if(!S(e,t,E))return!1;let{t0:i,t1:o}=E;if((i<0||o<i&&o>0)&&(i=o),i<0)return!1;if(r){const{origin:e,direction:o}=t;r[0]=e[0]+o[0]*i,r[1]=e[1]+o[1]*i,r[2]=e[2]+o[2]*i}return!0}const E={t0:0,t1:0};function S(e,t,r){const{origin:i,direction:o}=t,n=A;n[0]=i[0]-e[0],n[1]=i[1]-e[1],n[2]=i[2]-e[2];const a=o[0]*o[0]+o[1]*o[1]+o[2]*o[2];if(0===a)return!1;const s=2*(o[0]*n[0]+o[1]*n[1]+o[2]*n[2]),c=s*s-4*a*(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]-e[3]*e[3]);if(c<0)return!1;const l=Math.sqrt(c);return r.t0=(-s-l)/(2*a),r.t1=(-s+l)/(2*a),!0}const A=(0,a.c)();function M(e,t){return b(e,t,null)}function w(e,t,r){const i=h.s.get(),a=h.a.get();(0,n.e)(i,t.origin,t.direction);const s=_(e);(0,n.e)(r,i,t.origin),(0,n.b)(r,r,1/(0,n.l)(r)*s);const c=R(e,t.origin),l=(0,h.b)(t.origin,r);return(0,o.f)(a,l+c,i),(0,n.h)(r,r,a),r}function y(e,t,r){const i=(0,n.c)(h.s.get(),t,e),o=(0,n.b)(h.s.get(),i,e[3]/(0,n.l)(i));return(0,n.i)(r,o,e)}function R(e,t){const r=(0,n.c)(h.s.get(),t,e),o=(0,n.l)(r),a=_(e),s=a+Math.abs(a-o);return(0,i.a)(a/s)}const C=(0,a.c)();function I(e,t,r,o){const a=(0,n.c)(C,t,e);switch(r){case d.A.X:{const e=(0,i.b)(a,C)[2];return(0,n.s)(o,-Math.sin(e),Math.cos(e),0)}case d.A.Y:{const e=(0,i.b)(a,C),t=e[1],r=e[2],s=Math.sin(t);return(0,n.s)(o,-s*Math.cos(r),-s*Math.sin(r),Math.cos(t))}case d.A.Z:return(0,n.n)(o,a);default:return}}function O(e,t){const r=(0,n.c)(P,t,e);return(0,n.l)(r)-e[3]}function N(e,t){const r=(0,n.m)(e,t),i=_(e);return r<=i*i}const P=(0,a.c)(),L=f();Object.freeze(Object.defineProperty({__proto__:null,NullSphere:m,altitudeAt:O,angleToSilhouette:R,axisAt:I,clear:function(e){e[0]=e[1]=e[2]=e[3]=0},closestPoint:function(e,t,r){return b(e,t,r)?r:((0,u.c)(t,e,r),y(e,r,r))},closestPointOnSilhouette:w,containsPoint:N,copy:v,create:f,distanceToSilhouette:function(e,t){const r=(0,n.c)(h.s.get(),t,e),i=(0,n.k)(r),o=e[3]*e[3];return Math.sqrt(Math.abs(i-o))},elevate:function(e,t,r){return e!==r&&(r[0]=e[0],r[1]=e[1],r[2]=e[2]),r[3]=e[3]+t,r},equals:g,exactEquals:p,fromCenterAndRadius:function(e,t){return(0,c.f)(e[0],e[1],e[2],t)},fromRadius:function(e,t){return e[0]=e[1]=e[2]=0,e[3]=t,e},fromValues:T,getCenter:x,getRadius:_,intersectLine:function(e,t,r){const i=(0,u.f)(t,r);if(!S(e,i,E))return[];const{origin:o,direction:s}=i,{t0:c,t1:d}=E,h=t=>{const r=(0,a.c)();return(0,n.o)(r,o,s,t),y(e,r,r)};return Math.abs(c-d)<(0,l.g)()?[h(c)]:[h(c),h(d)]},intersectRay:b,intersectRayClosestSilhouette:function(e,t,r){if(b(e,t,r))return r;const i=w(e,t,h.s.get());return(0,n.i)(r,t.origin,(0,n.b)(h.s.get(),t.direction,(0,n.j)(t.origin,i)/(0,n.l)(t.direction))),r},intersectsRay:M,projectPoint:y,setAltitudeAt:function(e,t,r,i){const o=O(e,t),a=I(e,t,d.A.Z,P),s=(0,n.b)(P,a,r-o);return(0,n.i)(i,t,s)},setExtent:function(e,t,r){return e!==r&&v(e,r),r},tmpSphere:L,union:function(e,t,r=(0,c.c)()){const i=(0,n.j)(e,t),o=e[3],a=t[3];return i+a<o?((0,s.c)(r,e),r):i+o<a?((0,s.c)(r,t),r):((0,n.a)(r,e,t,(i+a-o)/(2*i)),r[3]=(i+o+a)/2,r)},wrap:function(e){return e}},Symbol.toStringTag,{value:"Module"}))},83839:(e,t,r)=>{function i(){return new Float32Array(2)}function o(e,t){const r=new Float32Array(2);return r[0]=e,r[1]=t,r}r.d(t,{O:()=>a,Z:()=>n,c:()=>i,f:()=>o});const n=i(),a=o(1,1);o(1,0),o(0,1)},19907:(e,t,r)=>{function i(e,t,r){o(e.typedBuffer,t.typedBuffer,r,e.typedBufferStride,t.typedBufferStride)}function o(e,t,r,i=3,o=i){if(e.length/i!==Math.ceil(t.length/o))return e;const n=e.length/i,a=r[0],s=r[1],c=r[2],l=r[4],d=r[5],u=r[6],h=r[8],m=r[9],f=r[10],p=r[12],g=r[13],v=r[14];let _=0,x=0;for(let r=0;r<n;r++){const r=t[_],n=t[_+1],T=t[_+2];e[x]=a*r+l*n+h*T+p,e[x+1]=s*r+d*n+m*T+g,e[x+2]=c*r+u*n+f*T+v,_+=o,x+=i}return e}function n(e,t,r){a(e.typedBuffer,t.typedBuffer,r,e.typedBufferStride,t.typedBufferStride)}function a(e,t,r,i=3,o=i){if(e.length/i!==Math.ceil(t.length/o))return;const n=e.length/i,a=r[0],s=r[1],c=r[2],l=r[3],d=r[4],u=r[5],h=r[6],m=r[7],f=r[8];let p=0,g=0;for(let r=0;r<n;r++){const r=t[p],n=t[p+1],v=t[p+2];e[g]=a*r+l*n+h*v,e[g+1]=s*r+d*n+m*v,e[g+2]=c*r+u*n+f*v,p+=o,g+=i}}function s(e,t,r){c(e.typedBuffer,t.typedBuffer,r,e.typedBufferStride,t.typedBufferStride)}function c(e,t,r,i=3,o=i){const n=Math.min(e.length/i,t.length/o);let a=0,s=0;for(let c=0;c<n;c++)e[s]=r*t[a],e[s+1]=r*t[a+1],e[s+2]=r*t[a+2],a+=o,s+=i;return e}function l(e,t,r,i=3,o=i){const n=e.length/i;if(n!==Math.ceil(t.length/o))return e;let a=0,s=0;for(let c=0;c<n;c++)e[s]=t[a]+r[0],e[s+1]=t[a+1]+r[1],e[s+2]=t[a+2]+r[2],a+=o,s+=i;return e}function d(e,t){u(e.typedBuffer,t.typedBuffer,e.typedBufferStride,t.typedBufferStride)}function u(e,t,r=3,i=r){const o=Math.min(e.length/r,t.length/i);let n=0,a=0;for(let s=0;s<o;s++){const o=t[n],s=t[n+1],c=t[n+2],l=o*o+s*s+c*c;if(l>0){const t=1/Math.sqrt(l);e[a]=t*o,e[a+1]=t*s,e[a+2]=t*c}n+=i,a+=r}}r.d(t,{a:()=>o,b:()=>l,c:()=>i,d:()=>n,e:()=>d,f:()=>c,n:()=>u,s:()=>s,t:()=>a}),r(32773),r(20266)},23164:(e,t,r)=>{function i(e,t,r){o(e.typedBuffer,t.typedBuffer,r,e.typedBufferStride,t.typedBufferStride)}function o(e,t,r,i=4,o=i){if(e.length/i!=t.length/o)return;const n=e.length/i,a=r[0],s=r[1],c=r[2],l=r[3],d=r[4],u=r[5],h=r[6],m=r[7],f=r[8];let p=0,g=0;for(let r=0;r<n;r++){const r=t[p],n=t[p+1],v=t[p+2],_=t[p+3];e[g]=a*r+l*n+h*v,e[g+1]=s*r+d*n+m*v,e[g+2]=c*r+u*n+f*v,e[g+3]=_,p+=o,g+=i}}function n(e,t){const r=Math.min(e.count,t.count),i=e.typedBuffer,o=e.typedBufferStride,n=t.typedBuffer,a=t.typedBufferStride;for(let e=0;e<r;e++){const t=e*o,r=e*a,s=n[r],c=n[r+1],l=n[r+2],d=s*s+c*c+l*l;if(d>0){const e=1/Math.sqrt(d);i[t]=e*s,i[t+1]=e*c,i[t+2]=e*l}}}function a(e,t,r){s(e.typedBuffer,t,r,e.typedBufferStride)}function s(e,t,r,i=4){const o=Math.min(e.length/i,t.count),n=t.typedBuffer,a=t.typedBufferStride;let s=0,c=0;for(let t=0;t<o;t++)e[c]=r*n[s],e[c+1]=r*n[s+1],e[c+2]=r*n[s+2],e[c+3]=r*n[s+3],s+=a,c+=i}r.d(t,{a:()=>i,b:()=>s,n:()=>n,s:()=>a,t:()=>o}),r(32773),r(20266)}}]);