// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define(["exports","../../../core/shaderModules/interfaces"],function(b,c){b.DiscardByCoverage=function(a){a=a.fragment;a.constants.add("coverageTestThreshold","float",.01);a.code.add(c.glsl`#define discardByCoverage(radius, coverage) { if (coverage < coverageTestThreshold) discard; }`)};Object.defineProperty(b,Symbol.toStringTag,{value:"Module"})});