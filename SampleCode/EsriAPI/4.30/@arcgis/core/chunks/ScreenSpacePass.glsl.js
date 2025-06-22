/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
import{U as s}from"./Matrix4PassUniform.js";import{B as o}from"./BindType.js";import{g as t}from"./interfaces3.js";import{V as i}from"./VertexAttribute.js";class r extends s{constructor(s,t){super(s,"bool",o.Pass,((o,i,r)=>o.setUniform1b(s,t(i,r))))}}function e(s,o=!0){s.attributes.add(i.POSITION,"vec2"),o&&s.varyings.add("uv","vec2"),s.vertex.code.add(t`
    void main(void) {
      gl_Position = vec4(position, 0.0, 1.0);
      ${o?t`uv = position * 0.5 + vec2(0.5);`:""}
    }
  `)}export{r as B,e as S};
