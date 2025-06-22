/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import e from"../TimeExtent.js";import r from"../core/Error.js";import{I as t,N as s}from"./ensureType.js";const m={type:e,json:{read:{source:"timeExtent",reader:r=>r?Array.isArray(r)?e.fromArray(r):e.fromJSON(r):null},write:{writer:(e,t,s,m)=>{e&&(e.isEmpty?m?.messages&&m.messages.push(new r("invalid-timeExtent","TimeExtent cannot be empty")):t[s]=e.toArray())},target:{timeExtent:{type:[[t,s]]}}}}};export{m as t};
