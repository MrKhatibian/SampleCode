/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import{s as n,d as r}from"./screenUtils.js";import{m as e}from"./vec2.js";import{n as o,c as t,p as s,s as i}from"./vec3.js";import{a as c}from"./ray.js";import{s as u}from"./plane.js";function a(r,e,t=c()){return m(r,n(e),t),o(t.direction,t.direction),t}function m(n,e,o){return f(n,n.screenToRender(e,r(u.get())),o)}function f(n,o,s){const i=r(e(u.get(),o));if(i[2]=0,!n.unprojectFromRenderScreen(i,s.origin))return null;const c=r(e(u.get(),o));c[2]=1;const a=n.unprojectFromRenderScreen(c,u.get());return null==a?null:(t(s.direction,a,s.origin),s)}function l(n,e,o){return d(n,n.screenToRender(e,r(u.get())),o)}function d(n,r,e){s(e.origin,n.eye);const o=i(u.get(),r[0],r[1],1),c=n.unprojectFromRenderScreen(o,u.get());return null==c?null:(t(e.direction,c,e.origin),e)}export{a,f as b,l as c,d,m as f};
