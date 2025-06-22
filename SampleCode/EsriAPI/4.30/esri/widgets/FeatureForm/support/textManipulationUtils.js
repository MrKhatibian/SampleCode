// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(g,e){async function h(){const {Marked:c}=await new Promise((a,b)=>g(["../../../chunks/marked.esm"],a,b)),k=()=>"",f={};for(const a of l)f[a]=k;d=new c({renderer:{del:a=>`<span style="text-decoration:line-through;">${a}</span>`,link:(a,b,m)=>`<a${null!=a?` href="${a}"`:""}${null!=b?` title="${b}"`:""} target="_blank">${m??""}</a>`,...f}})}let d;const l="blockquote html hr checkbox table tablerow tablecell image".split(" ");e.compileTextElementMarkdownToHTML=async function(c){d||
await h();return d.parse(c)};Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});