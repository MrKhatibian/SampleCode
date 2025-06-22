// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../../symbols/cim/utils"],function(d,k){class l{constructor(a){const {offsetX:e,offsetY:f,postAngle:g,fontSize:h,scaleFactor:b,transforms:c}=a;this.offsetX=e;this.offsetY=f;this.postAngle=g;this.fontSize=Math.min(h,96);(this.transforms=c)&&1<c.infos.length&&(a=k.applyParentTransform(h,g,!1,e,f,c),this.fontSize=Math.min(a.size,96),this.postAngle=a.rotation,this.offsetX=a.offsetX,this.offsetY=a.offsetY);b&&(this.fontSize*=b,this.offsetX*=b,this.offsetY*=b)}}d.TextMeshTransformProps=
l;Object.defineProperty(d,Symbol.toStringTag,{value:"Module"})});