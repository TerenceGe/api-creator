module.exports=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=1)}([function(e,t){e.exports=require("cross-fetch")},function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o);t.default=(e,t={})=>async(n="GET",o="/hello",i={},a=!1)=>{const s=t.apiKey,u=t.headers||{},c=t.tokenFetcher,p=t.errorTransformer||(e=>Promise.reject({message:e})),l=t.responseTransformer||(e=>e);let f=i,d=e+o;if(u.Accept||(u.Accept="application/json"),u["Content-Type"]||(u["Content-Type"]="application/json"),a&&c){const e=await c();e&&(u.Authorization=e)}s&&"object"==typeof s&&s.key&&s.value&&(s.position&&"params"===s.position?f={...i,[s.key]:s.value}:u[s.key]=s.value);const y={method:n,headers:u};if("GET"===n){const e=`${Object.keys(f).map(e=>[e,f[e]].map(encodeURIComponent).join("=")).join("&")}`;e&&(d+=`?${e}`)}else if("POST"===n||"PUT"===n)if("application/x-www-form-urlencoded"===u["Content-Type"])y.body=`${Object.keys(f).map(e=>[e,f[e]].join("=")).join("&")}`;else if("multipart/form-data"===u["Content-Type"]){delete u["Content-Type"];const e=new FormData;Object.keys(f).forEach(t=>e.append(t,f[t])),y.body=e}else y.body=JSON.stringify(f);return r()(d,y).then(e=>{if(!e.ok)return e.json().then(p);const t=e.headers.get("content-type");return/json/.test(t)?e.json().then(l):/text/.test(t)?e.text().then(l):null})}}]);