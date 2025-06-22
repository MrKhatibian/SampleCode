/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.30/esri/copyright.txt for details.
*/
function n(n){return n&&"function"==typeof n.highlight}function e(n){return n&&"function"==typeof n.maskOccludee}function t(n,e,t){return null==n||n>=t&&(0===e||n<=e)}function u(n,e){if(e&&n){const{minScale:u,maxScale:r}=n;if(i(u,r))return t(e,u,r)}return!0}function i(n,e){return null!=n&&n>0||null!=e&&e>0}function r(n){return!n?.minScale||!n.maxScale||n.minScale>=n.maxScale}function a(n){return null!=n&&"object"==typeof n&&"createQuery"in n&&"queryFeatures"in n&&"layer"in n&&"view"in n}export{i as a,u as b,n as h,a as i,e as o,t as s,r as v};
