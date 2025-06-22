// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define(["exports","../SpatialReference","../spatialReferenceEllipsoidUtils","./spatialReferenceUtils","./SupportedGCSWkids"],function(c,f,d,a,e){c.getCGSForPlanet=function(b){return a.equals(b,d.SphericalPCPFMars)||a.isMars(b)?{wkid:e.SupportedGCSWkids.GCSMARS2000}:a.equals(b,d.SphericalPCPFMoon)||a.isMoon(b)?{wkid:e.SupportedGCSWkids.GCSMOON2000}:f.WGS84};Object.defineProperty(c,Symbol.toStringTag,{value:"Module"})});