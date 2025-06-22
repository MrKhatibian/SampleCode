// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define(["exports"],function(b){class c{constructor(a){this._store=a;this._controller=new AbortController}destroy(){this._controller.abort()}get _options(){return{signal:this._controller.signal}}unsafeSetQueryHistoricMoment(a){throw Error("InternalError: LoadStrategy does not support query info");}async queryOverride(a){throw Error("InternalError: LoadStrategy does not support fetching");}async queryByObjectId(a){throw Error("InternalError: LoadStrategy does not support fetching");}}b.ALoadStrategy=
c;Object.defineProperty(b,Symbol.toStringTag,{value:"Module"})});