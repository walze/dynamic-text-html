parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"bhRG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class e{constructor(e=/<<(.+)>>/u,t="[field]"){this.flag=e,this.defaultCssSelector=t}matchFlag(e){const t=e.match(this.flag);return t?t[1]:null}replaceFlag(e,t="\n"){return e.replace(this.flag,t)}everyNthLineBreak(e,t=0){const r=this.replaceFlag(e,"").trim().split(/\r\n|\r|\n/gu),l=[];let s=!1,a=0,c=0;return r.map(e=>{let r=!1;const n=""===e;l[a]||(l[a]=""),n?c++:c=0,r=c===t&&0!==t,l[a]+=`${e}\r\n`,r||(s=!1),r&&!s&&(a++,s=!0)}),0===t?l[0]:l}}exports.default=e;
},{}],"6Nue":[function(require,module,exports) {

},{}],"iHh7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const t=exports.mapObj=((t,e)=>{const s={};let a=0;for(const c in t)s[c]=e(t[c],c,a++);return s}),e=exports.fetchFiles=(t=>Object.keys(t).map(async e=>({name:`${e}.txt`,data:await fetch(t[e]).then(t=>t.text())})));
},{}],"vfZe":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("marked"),e=r(t);function r(t){return t&&t.__esModule?t:{default:t}}class s{constructor(t){if("string"!=typeof t)throw new Error(`constructor got ${typeof t} instead of string`);this._string=t}string(){return this._string}removePTag(){return new s(this._string.replace(/<p>/gu,"").replace(/<\/p>/gu,""))}removeComments(){return new s(this._string.replace(/\{\{[^]*\}\}/gu,""))}mark(){return new s((0,e.default)(this._string))}_replaceCustomMark(...t){const{3:e}=t;this._string=e;const r=t[2]?t[2].split(" "):null,s=Boolean(t[1])?"div":"span";return this.makeElement(s,r)}customMarks(){const t=this._string.replace(/(!?)\{([^{}]+)*\}(\S+)/gu,this._replaceCustomMark.bind(this));return new s(t)}makeElement(t,e,r=null){const s=e?e.join(" "):null;return`<${t} ${r?`id="${r}"`:""} ${s?`class="${s}"`:""}>${this._string}</${t}>`}}exports.default=s;
},{}],"HY/A":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),require("../styles/dynamic-files.css");var e=require("./helpers"),t=require("./StringFormatter"),r=a(t),i=require("./FileFormatter"),s=a(i);function a(e){return e&&e.__esModule?e:{default:e}}class n extends s.default{constructor(e){super(e.flag,e.defaultCssSelector);const t=e.triggers&&e.triggers.default?e.triggers.default:null;this.triggers=this._bindThisToTriggers(e.triggers),this.triggers.default=this._renderDefault(this.defaultCssSelector,t).bind(this)}render(e){const t=new r.default(e.data);e.data=t.removeComments().string();const i=this.matchFlag(e.data);return i?this._emitTrigger(i,e):this._emitTrigger("default",e)}_emitTrigger(e,t,...r){if("default"===e)return this.triggers.default(t,...r);const i=`[${t.name.match(/(.+).txt/u)[1]}]`,s=Array.from(document.querySelectorAll(i)).map(e=>(this._displayFileNameToggle(t.name,e),e)),a=this.triggers[e];return a?a(t,s,...r):null}renderFatherChildren(e,t,i){t.map((t,s)=>{i.map((a,n)=>{Array.from(t.querySelectorAll(a)).map((t,a)=>{const l=a*i.length,d=n+l,o=(e[0].constructor===Array?new r.default(e[s][d]):new r.default(e[d])).customMarks().mark().removePTag().string();t.innerHTML=o})})})}_renderDefault(e,t){const i=Array.from(document.querySelectorAll(e));let s=0;return t&&t(i),e=>{const t=i[s++],a=new r.default(e.data).removeComments().customMarks().mark().string();t.innerHTML=a,this._displayFileNameToggle(e.name,t)}}_bindThisToTriggers(t){return(0,e.mapObj)(t,e=>e.bind(this))}_displayFileNameToggle(e,t){const r=document.createElement("div");r.classList.add("show-file-name"),r.innerHTML=e,t.classList.add("dynamic"),t.insertBefore(r,t.firstChild);const i=this._onDynamicFieldClick(r,2);let s=!1;window.addEventListener("keyup",e=>{"z"===e.key&&(s=!1)}),window.addEventListener("keydown",e=>{"z"===e.key&&(s=!0)}),t.addEventListener("click",e=>{s&&i(e)}),r.addEventListener("click",i)}_onDynamicFieldClick(e,t=3){let r=!1;return i=>{i.detail<t||(i.stopPropagation(),(r=!r)?e.classList.add("active"):e.classList.remove("active"))}}}exports.default=n;
},{"../styles/dynamic-files.css":"6Nue","./helpers":"iHh7","./StringFormatter":"vfZe","./FileFormatter":"bhRG"}],"3U5J":[function(require,module,exports) {
module.exports={FileFormatter:require("./FileFormatter.js"),FileRenderer:require("./FileRenderer.js"),helpers:require("./helpers.js"),StringFormatter:require("./StringFormatter.js")};
},{"./FileFormatter.js":"bhRG","./FileRenderer.js":"HY/A","./helpers.js":"iHh7","./StringFormatter.js":"vfZe"}],"G21N":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./js/**.js");Object.keys(e).forEach(function(r){"default"!==r&&"__esModule"!==r&&Object.defineProperty(exports,r,{enumerable:!0,get:function(){return e[r]}})});
},{"./js/**.js":"3U5J"}]},{},["G21N"], null)
//# sourceMappingURL=barrel.map