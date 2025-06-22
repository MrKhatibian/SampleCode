/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import{U as r}from"./Matrix4PassUniform.js";import{B as s}from"./BindType.js";class t extends r{constructor(r,t){super(r,"mat3",s.Draw,((s,a,o)=>s.setUniformMatrix3fv(r,t(a,o))))}}export{t as M};
