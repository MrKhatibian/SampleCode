// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.30/esri/copyright.txt for details.
//>>built
define(["exports","../../../../core/mathUtils","../Slice/sliceToolConfig"],function(a,c,b){const d=b.resizeHandleCornerWidth,e=b.displayFocusMultiplier*d;c=Math.sin(c.deg2rad(2));b=b.displayFocusMultiplier/1.5;a.angleOpenThreshold=1;a.fovFocusedArcWidth=e;a.fovUnfocusedArcWidth=d;a.observerManipulatorSize=5;a.scaleOrientArcAngle=5;a.scaleOrientArrowTipFocusMultiplier=b;a.scaleOrientArrowTipLength=c;a.scaleOrientHandleRadius=.0025;a.scaleOrientMinDistance=1;Object.defineProperty(a,Symbol.toStringTag,
{value:"Module"})});