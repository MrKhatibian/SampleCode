// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define("../../../chunks/tslib.es6 ../../../core/accessorSupport/decorators/property ../../../core/has ../../../core/Logger ../../../core/RandomLCG ../../../core/accessorSupport/decorators/subclass ./Column".split(" "),function(b,c,a,g,h,d,e){a=class extends e{constructor(f){super(f);this.columns=null;this.sortable=!1}initialize(){this._set("fieldName",`group:${this.label}`)}};b.__decorate([c.property()],a.prototype,"columns",void 0);b.__decorate([c.property({readOnly:!0})],a.prototype,"sortable",
void 0);return a=b.__decorate([d.subclass("esri.widgets.FeatureTable.Grid.GroupColumn")],a)});