// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define(["./basicInterfaces"],function(b){class c{constructor(a){this._material=a.material;this._techniques=a.techniques;this._output=a.output}dispose(){this._techniques.release(this._technique)}get technique(){return this._technique}get _stippleTextures(){return this._techniques.constructionContext.stippleTextures}get _markerTextures(){return this._techniques.constructionContext.markerTextures}ensureTechnique(a,d){return this._technique=this._techniques.releaseAndAcquire(a,this._material.getConfiguration(this._output,
d),this._technique)}ensureResources(a){return b.ResourceState.LOADED}}return c});