/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import{_ as r}from"./tslib.es6.js";import{JSONSupport as t}from"../core/JSONSupport.js";import{property as s}from"../core/accessorSupport/decorators/property.js";import"../core/lang.js";import"./Logger.js";import{subclass as e}from"../core/accessorSupport/decorators/subclass.js";const o="https://.*";var p;let i=p=class extends t{constructor(){super(...arguments),this.url=""}destroy(){this.url=""}get isSecureUrl(){return!!(r=this.url)&&/^https:\/\/.*/i.test(r);var r}get isDataURI(){return!!(r=this.url)&&/data:([-\w]+\/[-+\w.]+)?(;?\w+=[-\w]+)*(;base64)?,.*/gu.test(r);var r}clone(){return new p({url:this.url})}};r([s({type:String,json:{write:{isRequired:!0}}})],i.prototype,"url",void 0),r([s()],i.prototype,"isSecureUrl",null),r([s()],i.prototype,"isDataURI",null),i=p=r([e("esri.webdoc.support.SlideThumbnail")],i);export{i as S,o as T};
