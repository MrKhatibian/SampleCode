/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import{c as s}from"./vec3f64.js";import{e as t,a,b as e}from"./euclideanLengthMeasurementUtils.js";import{a as n,b as r,c as o}from"./viewUtils.js";function i(s){return r(s)??a(s)}function c(s,a){return n(s,a)??t(s,a)}function u(s,t,a){return f[0]=s[0],f[1]=s[1],f[2]=3===s.length?s[2]:0,m[0]=t[0],m[1]=t[1],m[2]=3===t.length?t[2]:0,o(f,m,a)??e(f,m,a)}const f=s(),m=s();export{c as a,u as b,i as c};
