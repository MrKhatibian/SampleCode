/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import{_ as r}from"./tslib.es6.js";import"./Logger.js";import"../core/lang.js";import"../core/Error.js";import{subclass as s}from"../core/accessorSupport/decorators/subclass.js";import{W as e,r as t,F as i}from"./Container.js";import{A as a}from"./AGraphicContainer.js";let o=class extends a{get hasHighlight(){return this.children.some((r=>r.hasData))}renderChildren(r){this.attributeView.update(),r.drawPhase===e.HIGHLIGHT&&this.children.some((r=>r.hasData))&&(super.renderChildren(r),r.context.setColorMask(!0,!0,!0,!0),t(r,!0,(r=>{this._renderChildren(r,i.All)})))}};o=r([s("esri.views.2d.layers.graphics.HighlightGraphicContainer")],o);const h=o;export{h as H};
