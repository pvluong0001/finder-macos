!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(this,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){e.exports=function(){let e,t={};const n={recursiveAll:!1,suffixClass:""};function r(n,o=!1,i=!1,a=0){const c=function(e,t=!1){var n=document.createElement("div");n.id=e,n.classList.add("finder-column"),t||n.classList.add("finder-column-hidden");return n.style.borderRight="1px dotted #c2c2c2",n}(([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)),o);n.forEach((n,o)=>{const i=function(n,o){const{label:i,children:a,syncData:c=!1,type:l,suffix:s}=n,d=document.createElement("div");d.classList.add("finder-cell-item");let f=`<div>${i}</div>`;s&&(f+=`<span class="${t.suffixClass}">${s}</span>`);"folder"===l?(d.className+=" folder las la-folder",f+='<span class="arrow"></span>'):d.className+=" folder las la-file";return d.innerHTML=f,d.addEventListener("click",()=>{const i=d.parentNode.querySelector(".active");i&&i.classList.remove("active"),d.classList.contains("active")||d.classList.add("active");const l=Array.from(e.children),s=l.indexOf(d.parentNode);l.forEach((e,t)=>{t>s&&e.remove()}),t.hasOwnProperty("handleItemClick")&&c?t.handleItemClick(n).then(e=>{r(e,!0,!1,++o)}):a&&a.length&&r(a,!0,!1,++o)}),d}(n,a);0===a&&0===o&&i.classList.add("active"),c.appendChild(i)}),e.appendChild(c),e.scrollLeft+=250,i&&n[0].hasOwnProperty("children")&&n[0].children.length&&r(n[0].children,!0,t.recursiveAll,++a)}return{init:function(r,o={}){e=r,e.classList.add("finder-container"),o.containerClass&&e.classList.add(o.containerClass),t={...n,...o}},setBaseData:function(e){if(!e||!e.length)throw new Error("Data invalid");r(e,!0,!0)}}}()}])}));