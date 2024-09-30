/**
* vue v3.5.5
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/var e,t;let n,l,r,i,s,o,a,c,f,p;function d(e){let t=/* @__PURE__ */Object.create(null);for(let n of e.split(","))t[n]=1;return e=>e in t}let h={},g=[],m=()=>{},_=()=>!1,y=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&(e.charCodeAt(2)>122||97>e.charCodeAt(2)),b=e=>e.startsWith("onUpdate:"),S=Object.assign,C=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1);},x=Object.prototype.hasOwnProperty,E=(e,t)=>x.call(e,t),w=Array.isArray,k=e=>"[object Map]"===D(e),T=e=>"[object Set]"===D(e),N=e=>"function"==typeof e,O=e=>"string"==typeof e,P=e=>"symbol"==typeof e,M=e=>null!==e&&"object"==typeof e,I=e=>(M(e)||N(e))&&N(e.then)&&N(e.catch),L=Object.prototype.toString,D=e=>L.call(e),F=e=>D(e).slice(8,-1),V=e=>"[object Object]"===D(e),U=e=>O(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,j=/* @__PURE__ */d(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),B=e=>{let t=/* @__PURE__ */Object.create(null);return n=>t[n]||(t[n]=e(n))},$$1=/-(\w)/g,H=B(e=>e.replace($$1,(e,t)=>t?t.toUpperCase():"")),W=/\B([A-Z])/g,K=B(e=>e.replace(W,"-$1").toLowerCase()),z=B(e=>e.charAt(0).toUpperCase()+e.slice(1)),q=B(e=>e?`on${z(e)}`:""),G=(e,t)=>!Object.is(e,t),J=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t);},X=(e,t,n,l=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:l,value:n});},Z=e=>{let t=parseFloat(e);return isNaN(t)?e:t},Y=e=>{let t=O(e)?Number(e):NaN;return isNaN(t)?e:t},Q=()=>n||(n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{});function et(e){if(w(e)){let t={};for(let n=0;n<e.length;n++){let l=e[n],r=O(l)?function(e){let t={};return e.replace(er,"").split(en).forEach(e=>{if(e){let n=e.split(el);n.length>1&&(t[n[0].trim()]=n[1].trim());}}),t}(l):et(l);if(r)for(let e in r)t[e]=r[e];}return t}if(O(e)||M(e))return e}let en=/;(?![^(]*\))/g,el=/:([^]+)/,er=/\/\*[^]*?\*\//g;function ei(e){let t="";if(O(e))t=e;else if(w(e))for(let n=0;n<e.length;n++){let l=ei(e[n]);l&&(t+=l+" ");}else if(M(e))for(let n in e)e[n]&&(t+=n+" ");return t.trim()}let eo=/* @__PURE__ */d("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");let ec=e=>!!(e&&!0===e.__v_isRef),ef=e=>O(e)?e:null==e?"":w(e)||M(e)&&(e.toString===L||!N(e.toString))?ec(e)?ef(e.value):JSON.stringify(e,ep,2):String(e),ep=(e,t)=>ec(t)?ep(e,t.value):k(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],l)=>(e[ed(t,l)+" =>"]=n,e),{})}:T(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>ed(e))}:P(t)?ed(t):!M(t)||w(t)||V(t)?t:String(t),ed=(e,t="")=>{var n;return P(e)?`Symbol(${null!=(n=e.description)?n:t})`:e};class eh{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=l,!e&&l&&(this.index=(l.scopes||(l.scopes=[])).push(this)-1);}get active(){return this._active}pause(){if(this._active){let e,t;if(this._isPaused=!0,this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause();}}resume(){if(this._active&&this._isPaused){let e,t;if(this._isPaused=!1,this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume();}}run(e){if(this._active){let t=l;try{return l=this,e()}finally{l=t;}}}on(){l=this;}off(){l=this.parent;}stop(e){if(this._active){let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index);}this.parent=void 0,this._active=!1;}}}function ev(){return l}let e_=/* @__PURE__ */new WeakSet;class ey{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.nextEffect=void 0,this.cleanup=void 0,this.scheduler=void 0,l&&l.active&&l.effects.push(this);}pause(){this.flags|=64;}resume(){64&this.flags&&(this.flags&=-65,e_.has(this)&&(e_.delete(this),this.trigger()));}notify(){(!(2&this.flags)||32&this.flags)&&(8&this.flags||(this.flags|=8,this.nextEffect=i,i=this));}run(){if(!(1&this.flags))return this.fn();this.flags|=2,eM(this),eC(this);let e=r,t=eR;r=this,eR=!0;try{return this.fn()}finally{ex(this),r=e,eR=t,this.flags&=-3;}}stop(){if(1&this.flags){for(let e=this.deps;e;e=e.nextDep)ek(e);this.deps=this.depsTail=void 0,eM(this),this.onStop&&this.onStop(),this.flags&=-2;}}trigger(){64&this.flags?e_.add(this):this.scheduler?this.scheduler():this.runIfDirty();}runIfDirty(){eE(this)&&this.run();}get dirty(){return eE(this)}}let eb=0;function eS(){let e;if(!(--eb>0)){for(;i;){let t=i;for(i=void 0;t;){let n=t.nextEffect;if(t.nextEffect=void 0,t.flags&=-9,1&t.flags)try{t.trigger();}catch(t){e||(e=t);}t=n;}}if(e)throw e}}function eC(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t;}function ex(e){let t;let n=e.depsTail,l=n;for(;l;){let e=l.prevDep;-1===l.version?(l===n&&(n=e),ek(l),function(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0);}(l)):t=l,l.dep.activeLink=l.prevActiveLink,l.prevActiveLink=void 0,l=e;}e.deps=t,e.depsTail=n;}function eE(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&ew(t.dep.computed)||t.dep.version!==t.version)return !0;return !!e._dirty}function ew(e){if(4&e.flags&&!(16&e.flags)||(e.flags&=-17,e.globalVersion===eI))return;e.globalVersion=eI;let t=e.dep;if(e.flags|=2,t.version>0&&!e.isSSR&&!eE(e)){e.flags&=-3;return}let n=r,l=eR;r=e,eR=!0;try{eC(e);let n=e.fn(e._value);(0===t.version||G(n,e._value))&&(e._value=n,t.version++);}catch(e){throw t.version++,e}finally{r=n,eR=l,ex(e),e.flags&=-3;}}function ek(e){let{dep:t,prevSub:n,nextSub:l}=e;if(n&&(n.nextSub=l,e.prevSub=void 0),l&&(l.prevSub=n,e.nextSub=void 0),t.subs===e&&(t.subs=n),!t.subs&&t.computed){t.computed.flags&=-5;for(let e=t.computed.deps;e;e=e.nextDep)ek(e);}}let eR=!0,eN=[];function eO(){eN.push(eR),eR=!1;}function eP(){let e=eN.pop();eR=void 0===e||e;}function eM(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=r;r=void 0;try{t();}finally{r=e;}}}let eI=0;class eL{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0;}}class eD{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0;}track(e){if(!r||!eR||r===this.computed)return;let t=this.activeLink;if(void 0===t||t.sub!==r)t=this.activeLink=new eL(r,this),r.deps?(t.prevDep=r.depsTail,r.depsTail.nextDep=t,r.depsTail=t):r.deps=r.depsTail=t,4&r.flags&&function e(t){let n=t.dep.computed;if(n&&!t.dep.subs){n.flags|=20;for(let t=n.deps;t;t=t.nextDep)e(t);}let l=t.dep.subs;l!==t&&(t.prevSub=l,l&&(l.nextSub=t)),t.dep.subs=t;}(t);else if(-1===t.version&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=r.depsTail,t.nextDep=void 0,r.depsTail.nextDep=t,r.depsTail=t,r.deps===t&&(r.deps=e);}return t}trigger(e){this.version++,eI++,this.notify(e);}notify(e){eb++;try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify();}finally{eS();}}}let eF=/* @__PURE__ */new WeakMap,eV=Symbol(""),eU=Symbol(""),ej=Symbol("");function eB(e,t,n){if(eR&&r){let t=eF.get(e);t||eF.set(e,t=/* @__PURE__ */new Map);let l=t.get(n);l||t.set(n,l=new eD),l.track();}}function e$(e,t,n,l,r,i){let s=eF.get(e);if(!s){eI++;return}let o=e=>{e&&e.trigger();};if(eb++,"clear"===t)s.forEach(o);else {let r=w(e),i=r&&U(n);if(r&&"length"===n){let e=Number(l);s.forEach((t,n)=>{("length"===n||n===ej||!P(n)&&n>=e)&&o(t);});}else switch(void 0!==n&&o(s.get(n)),i&&o(s.get(ej)),t){case"add":r?i&&o(s.get("length")):(o(s.get(eV)),k(e)&&o(s.get(eU)));break;case"delete":!r&&(o(s.get(eV)),k(e)&&o(s.get(eU)));break;case"set":k(e)&&o(s.get(eV));}}eS();}function eH(e){let t=tP(e);return t===e?t:(eB(t,"iterate",ej),tN(e)?t:t.map(tI))}function eW(e){return eB(e=tP(e),"iterate",ej),e}let eK={__proto__:null,[Symbol.iterator](){return ez(this,Symbol.iterator,tI)},concat(...e){return eH(this).concat(...e.map(e=>w(e)?eH(e):e))},entries(){return ez(this,"entries",e=>(e[1]=tI(e[1]),e))},every(e,t){return eG(this,"every",e,t,void 0,arguments)},filter(e,t){return eG(this,"filter",e,t,e=>e.map(tI),arguments)},find(e,t){return eG(this,"find",e,t,tI,arguments)},findIndex(e,t){return eG(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return eG(this,"findLast",e,t,tI,arguments)},findLastIndex(e,t){return eG(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return eG(this,"forEach",e,t,void 0,arguments)},includes(...e){return eX(this,"includes",e)},indexOf(...e){return eX(this,"indexOf",e)},join(e){return eH(this).join(e)},lastIndexOf(...e){return eX(this,"lastIndexOf",e)},map(e,t){return eG(this,"map",e,t,void 0,arguments)},pop(){return eZ(this,"pop")},push(...e){return eZ(this,"push",e)},reduce(e,...t){return eJ(this,"reduce",e,t)},reduceRight(e,...t){return eJ(this,"reduceRight",e,t)},shift(){return eZ(this,"shift")},some(e,t){return eG(this,"some",e,t,void 0,arguments)},splice(...e){return eZ(this,"splice",e)},toReversed(){return eH(this).toReversed()},toSorted(e){return eH(this).toSorted(e)},toSpliced(...e){return eH(this).toSpliced(...e)},unshift(...e){return eZ(this,"unshift",e)},values(){return ez(this,"values",tI)}};function ez(e,t,n){let l=eW(e),r=l[t]();return l===e||tN(e)||(r._next=r.next,r.next=()=>{let e=r._next();return e.value&&(e.value=n(e.value)),e}),r}let eq=Array.prototype;function eG(e,t,n,l,r,i){let s=eW(e),o=s!==e&&!tN(e),a=s[t];if(a!==eq[t]){let t=a.apply(e,i);return o?tI(t):t}let u=n;s!==e&&(o?u=function(t,l){return n.call(this,tI(t),l,e)}:n.length>2&&(u=function(t,l){return n.call(this,t,l,e)}));let c=a.call(s,u,l);return o&&r?r(c):c}function eJ(e,t,n,l){let r=eW(e),i=n;return r!==e&&(tN(e)?n.length>3&&(i=function(t,l,r){return n.call(this,t,l,r,e)}):i=function(t,l,r){return n.call(this,t,tI(l),r,e)}),r[t](i,...l)}function eX(e,t,n){let l=tP(e);eB(l,"iterate",ej);let r=l[t](...n);return (-1===r||!1===r)&&tO(n[0])?(n[0]=tP(n[0]),l[t](...n)):r}function eZ(e,t,n=[]){eO(),eb++;let l=tP(e)[t].apply(e,n);return eS(),eP(),l}let eY=/* @__PURE__ */d("__proto__,__v_isRef,__isVue"),eQ=new Set(/* @__PURE__ */Object.getOwnPropertyNames(Symbol).filter(e=>"arguments"!==e&&"caller"!==e).map(e=>Symbol[e]).filter(P));function e0(e){P(e)||(e=String(e));let t=tP(this);return eB(t,"has",e),t.hasOwnProperty(e)}class e1{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t;}get(e,t,n){let l=this._isReadonly,r=this._isShallow;if("__v_isReactive"===t)return !l;if("__v_isReadonly"===t)return l;if("__v_isShallow"===t)return r;if("__v_raw"===t)return n===(l?r?tC:tS:r?tb:ty).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let i=w(e);if(!l){let e;if(i&&(e=eK[t]))return e;if("hasOwnProperty"===t)return e0}let s=Reflect.get(e,t,tD(e)?e:n);return (P(t)?eQ.has(t):eY(t))?s:(l||eB(e,"get",t),r)?s:tD(s)?i&&U(t)?s:s.value:M(s)?l?tw(s):tx(s):s}}class e2 extends e1{constructor(e=!1){super(!1,e);}set(e,t,n,l){let r=e[t];if(!this._isShallow){let t=tR(r);if(tN(n)||tR(n)||(r=tP(r),n=tP(n)),!w(e)&&tD(r)&&!tD(n))return !t&&(r.value=n,!0)}let i=w(e)&&U(t)?Number(t)<e.length:E(e,t),s=Reflect.set(e,t,n,tD(e)?e:l);return e===tP(l)&&(i?G(n,r)&&e$(e,"set",t,n):e$(e,"add",t,n)),s}deleteProperty(e,t){let n=E(e,t);e[t];let l=Reflect.deleteProperty(e,t);return l&&n&&e$(e,"delete",t,void 0),l}has(e,t){let n=Reflect.has(e,t);return P(t)&&eQ.has(t)||eB(e,"has",t),n}ownKeys(e){return eB(e,"iterate",w(e)?"length":eV),Reflect.ownKeys(e)}}class e6 extends e1{constructor(e=!1){super(!0,e);}set(e,t){return !0}deleteProperty(e,t){return !0}}let e8=/* @__PURE__ */new e2,e4=/* @__PURE__ */new e6,e3=/* @__PURE__ */new e2(!0),e9=e=>e,e7=e=>Reflect.getPrototypeOf(e);function te(e,t,n=!1,l=!1){let r=tP(e=e.__v_raw),i=tP(t);n||(G(t,i)&&eB(r,"get",t),eB(r,"get",i));let{has:s}=e7(r),o=l?e9:n?tL:tI;return s.call(r,t)?o(e.get(t)):s.call(r,i)?o(e.get(i)):void(e!==r&&e.get(t))}function tt(e,t=!1){let n=this.__v_raw,l=tP(n),r=tP(e);return t||(G(e,r)&&eB(l,"has",e),eB(l,"has",r)),e===r?n.has(e):n.has(e)||n.has(r)}function tn(e,t=!1){return e=e.__v_raw,t||eB(tP(e),"iterate",eV),Reflect.get(e,"size",e)}function tl(e,t=!1){t||tN(e)||tR(e)||(e=tP(e));let n=tP(this);return e7(n).has.call(n,e)||(n.add(e),e$(n,"add",e,e)),this}function tr(e,t,n=!1){n||tN(t)||tR(t)||(t=tP(t));let l=tP(this),{has:r,get:i}=e7(l),s=r.call(l,e);s||(e=tP(e),s=r.call(l,e));let o=i.call(l,e);return l.set(e,t),s?G(t,o)&&e$(l,"set",e,t):e$(l,"add",e,t),this}function ti(e){let t=tP(this),{has:n,get:l}=e7(t),r=n.call(t,e);r||(e=tP(e),r=n.call(t,e)),l&&l.call(t,e);let i=t.delete(e);return r&&e$(t,"delete",e,void 0),i}function ts(){let e=tP(this),t=0!==e.size,n=e.clear();return t&&e$(e,"clear",void 0,void 0),n}function to(e,t){return function(n,l){let r=this,i=r.__v_raw,s=tP(i),o=t?e9:e?tL:tI;return e||eB(s,"iterate",eV),i.forEach((e,t)=>n.call(l,o(e),o(t),r))}}function ta(e,t,n){return function(...l){let r=this.__v_raw,i=tP(r),s=k(i),o="entries"===e||e===Symbol.iterator&&s,a=r[e](...l),u=n?e9:t?tL:tI;return t||eB(i,"iterate","keys"===e&&s?eU:eV),{next(){let{value:e,done:t}=a.next();return t?{value:e,done:t}:{value:o?[u(e[0]),u(e[1])]:u(e),done:t}},[Symbol.iterator](){return this}}}}function tu(e){return function(...t){return "delete"!==e&&("clear"===e?void 0:this)}}let[tc,tf,tp,td]=/* @__PURE__ */function(){let e={get(e){return te(this,e)},get size(){return tn(this)},has:tt,add:tl,set:tr,delete:ti,clear:ts,forEach:to(!1,!1)},t={get(e){return te(this,e,!1,!0)},get size(){return tn(this)},has:tt,add(e){return tl.call(this,e,!0)},set(e,t){return tr.call(this,e,t,!0)},delete:ti,clear:ts,forEach:to(!1,!0)},n={get(e){return te(this,e,!0)},get size(){return tn(this,!0)},has(e){return tt.call(this,e,!0)},add:tu("add"),set:tu("set"),delete:tu("delete"),clear:tu("clear"),forEach:to(!0,!1)},l={get(e){return te(this,e,!0,!0)},get size(){return tn(this,!0)},has(e){return tt.call(this,e,!0)},add:tu("add"),set:tu("set"),delete:tu("delete"),clear:tu("clear"),forEach:to(!0,!0)};return ["keys","values","entries",Symbol.iterator].forEach(r=>{e[r]=ta(r,!1,!1),n[r]=ta(r,!0,!1),t[r]=ta(r,!1,!0),l[r]=ta(r,!0,!0);}),[e,n,t,l]}();function th(e,t){let n=t?e?td:tp:e?tf:tc;return (t,l,r)=>"__v_isReactive"===l?!e:"__v_isReadonly"===l?e:"__v_raw"===l?t:Reflect.get(E(n,l)&&l in t?n:t,l,r)}let tg={get:/* @__PURE__ */th(!1,!1)},tv={get:/* @__PURE__ */th(!1,!0)},tm={get:/* @__PURE__ */th(!0,!1)},ty=/* @__PURE__ */new WeakMap,tb=/* @__PURE__ */new WeakMap,tS=/* @__PURE__ */new WeakMap,tC=/* @__PURE__ */new WeakMap;function tx(e){return tR(e)?e:tT(e,!1,e8,tg,ty)}function tE(e){return tT(e,!1,e3,tv,tb)}function tw(e){return tT(e,!0,e4,tm,tS)}function tT(e,t,n,l,r){if(!M(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;let i=r.get(e);if(i)return i;let s=e.__v_skip||!Object.isExtensible(e)?0:function(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}(F(e));if(0===s)return e;let o=new Proxy(e,2===s?l:n);return r.set(e,o),o}function tA(e){return tR(e)?tA(e.__v_raw):!!(e&&e.__v_isReactive)}function tR(e){return !!(e&&e.__v_isReadonly)}function tN(e){return !!(e&&e.__v_isShallow)}function tO(e){return !!e&&!!e.__v_raw}function tP(e){let t=e&&e.__v_raw;return t?tP(t):e}function tM(e){return !E(e,"__v_skip")&&Object.isExtensible(e)&&X(e,"__v_skip",!0),e}let tI=e=>M(e)?tx(e):e,tL=e=>M(e)?tw(e):e;function tD(e){return !!e&&!0===e.__v_isRef}function tF(e){return tU(e,!1)}function tU(e,t){return tD(e)?e:new tj(e,t)}class tj{constructor(e,t){this.dep=new eD,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:tP(e),this._value=t?e:tI(e),this.__v_isShallow=t;}get value(){return this.dep.track(),this._value}set value(e){let t=this._rawValue,n=this.__v_isShallow||tN(e)||tR(e);G(e=n?e:tP(e),t)&&(this._rawValue=e,this._value=n?e:tI(e),this.dep.trigger());}}function t$(e){return tD(e)?e.value:e}let tW={get:(e,t,n)=>"__v_raw"===t?e:t$(Reflect.get(e,t,n)),set:(e,t,n,l)=>{let r=e[t];return tD(r)&&!tD(n)?(r.value=n,!0):Reflect.set(e,t,n,l)}};function tK(e){return tA(e)?e:new Proxy(e,tW)}class tQ{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new eD(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=eI-1,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n;}notify(){this.flags|=16,r!==this&&this.dep.notify();}get value(){let e=this.dep.track();return ew(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e);}}let t2={},t6=/* @__PURE__ */new WeakMap;function t4(e,t=!1,n=f){if(n){let t=t6.get(n);t||t6.set(n,t=[]),t.push(e);}}function t3(e,t=1/0,n){if(t<=0||!M(e)||e.__v_skip||(n=n||/* @__PURE__ */new Set).has(e))return e;if(n.add(e),t--,tD(e))t3(e.value,t,n);else if(w(e))for(let l=0;l<e.length;l++)t3(e[l],t,n);else if(T(e)||k(e))e.forEach(e=>{t3(e,t,n);});else if(V(e)){for(let l in e)t3(e[l],t,n);for(let l of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,l)&&t3(e[l],t,n);}return e}function t7(e,t,n,l){try{return l?e(...l):e()}catch(e){nt(e,t,n);}}function ne(e,t,n,l){if(N(e)){let r=t7(e,t,n,l);return r&&I(r)&&r.catch(e=>{nt(e,t,n);}),r}if(w(e)){let r=[];for(let i=0;i<e.length;i++)r.push(ne(e[i],t,n,l));return r}}function nt(e,t,n,l=!0){t&&t.vnode;let{errorHandler:r,throwUnhandledErrorInProduction:i}=t&&t.appContext.config||h;if(t){let l=t.parent,i=t.proxy,s=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){let t=l.ec;if(t){for(let n=0;n<t.length;n++)if(!1===t[n](e,i,s))return}l=l.parent;}if(r){eO(),t7(r,null,10,[e,i,s]),eP();return}}!function(e,t,n,l=!0,r=!1){if(r)throw e;console.error(e);}(e,0,0,l,i);}let nn=!1,nl=!1,nr=[],ni=0,ns=[],no=null,na=0,nu=/* @__PURE__ */Promise.resolve(),nc=null;function nf(e){let t=nc||nu;return e?t.then(this?e.bind(this):e):t}function np(e){if(!(1&e.flags)){let t=nm(e),n=nr[nr.length-1];!n||!(2&e.flags)&&t>=nm(n)?nr.push(e):nr.splice(function(e){let t=nn?ni+1:0,n=nr.length;for(;t<n;){let l=t+n>>>1,r=nr[l],i=nm(r);i<e||i===e&&2&r.flags?t=l+1:n=l;}return t}(t),0,e),e.flags|=1,nd();}}function nd(){nn||nl||(nl=!0,nc=nu.then(function e(t){nl=!1,nn=!0;try{for(ni=0;ni<nr.length;ni++){let e=nr[ni];e&&!(8&e.flags)&&(4&e.flags&&(e.flags&=-2),t7(e,e.i,e.i?15:14),e.flags&=-2);}}finally{for(;ni<nr.length;ni++){let e=nr[ni];e&&(e.flags&=-2);}ni=0,nr.length=0,nv(),nn=!1,nc=null,(nr.length||ns.length)&&e();}}));}function nh(e){w(e)?ns.push(...e):no&&-1===e.id?no.splice(na+1,0,e):1&e.flags||(ns.push(e),e.flags|=1),nd();}function ng(e,t,n=nn?ni+1:0){for(;n<nr.length;n++){let t=nr[n];if(t&&2&t.flags){if(e&&t.id!==e.uid)continue;nr.splice(n,1),n--,4&t.flags&&(t.flags&=-2),t(),t.flags&=-2;}}}function nv(e){if(ns.length){let e=[...new Set(ns)].sort((e,t)=>nm(e)-nm(t));if(ns.length=0,no){no.push(...e);return}for(na=0,no=e;na<no.length;na++){let e=no[na];4&e.flags&&(e.flags&=-2),8&e.flags||e(),e.flags&=-2;}no=null,na=0;}}let nm=e=>null==e.id?2&e.flags?-1:1/0:e.id,n_=null,ny=null;function nb(e){let t=n_;return n_=e,ny=e&&e.type.__scopeId||null,t}function nE(e,t=n_,n){if(!t||e._n)return e;let l=(...n)=>{let r;l._d&&ic(-1);let i=nb(t);try{r=e(...n);}finally{nb(i),l._d&&ic(1);}return r};return l._n=!0,l._c=!0,l._d=!0,l}function nw(e,t){if(null===n_)return e;let n=iG(n_),l=e.dirs||(e.dirs=[]);for(let e=0;e<t.length;e++){let[r,i,s,o=h]=t[e];r&&(N(r)&&(r={mounted:r,updated:r}),r.deep&&t3(i),l.push({dir:r,instance:n,value:i,oldValue:void 0,arg:s,modifiers:o}));}return e}function nk(e,t,n,l){let r=e.dirs,i=t&&t.dirs;for(let s=0;s<r.length;s++){let o=r[s];i&&(o.oldValue=i[s].value);let a=o.dir[l];a&&(eO(),ne(a,n,8,[e.el,o,e,t]),eP());}}let nT=Symbol("_vte"),nA=e=>e.__isTeleport;let nV=Symbol("_leaveCb"),nU=Symbol("_enterCb");function nj(){let e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:/* @__PURE__ */new Map};return lS(()=>{e.isMounted=!0;}),lE(()=>{e.isUnmounting=!0;}),e}let nB=[Function,Array],n$={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:nB,onEnter:nB,onAfterEnter:nB,onEnterCancelled:nB,onBeforeLeave:nB,onLeave:nB,onAfterLeave:nB,onLeaveCancelled:nB,onBeforeAppear:nB,onAppear:nB,onAfterAppear:nB,onAppearCancelled:nB},nH=e=>{let t=e.subTree;return t.component?nH(t.component):t};function nW(e){let t=e[0];if(e.length>1){for(let n of e)if(n.type!==il){t=n;break}}return t}let nK={name:"BaseTransition",props:n$,setup(e,{slots:t}){let n=iD(),l=nj();return ()=>{let r=t.default&&nZ(t.default(),!0);if(!r||!r.length)return;let i=nW(r),s=tP(e),{mode:o}=s;if(l.isLeaving)return nG(i);let a=nJ(i);if(!a)return nG(i);let u=nq(a,s,l,n,e=>u=e);a.type!==il&&nX(a,u);let c=n.subTree,f=c&&nJ(c);if(f&&f.type!==il&&!iv(a,f)&&nH(n).type!==il){let e=nq(f,s,l,n);if(nX(f,e),"out-in"===o&&a.type!==il)return l.isLeaving=!0,e.afterLeave=()=>{l.isLeaving=!1,8&n.job.flags||n.update(),delete e.afterLeave;},nG(i);"in-out"===o&&a.type!==il&&(e.delayLeave=(e,t,n)=>{nz(l,f)[String(f.key)]=f,e[nV]=()=>{t(),e[nV]=void 0,delete u.delayedLeave;},u.delayedLeave=n;});}return i}}};function nz(e,t){let{leavingVNodes:n}=e,l=n.get(t.type);return l||(l=/* @__PURE__ */Object.create(null),n.set(t.type,l)),l}function nq(e,t,n,l,r){let{appear:i,mode:s,persisted:o=!1,onBeforeEnter:a,onEnter:u,onAfterEnter:c,onEnterCancelled:f,onBeforeLeave:p,onLeave:d,onAfterLeave:h,onLeaveCancelled:g,onBeforeAppear:m,onAppear:_,onAfterAppear:y,onAppearCancelled:b}=t,S=String(e.key),C=nz(n,e),x=(e,t)=>{e&&ne(e,l,9,t);},E=(e,t)=>{let n=t[1];x(e,t),w(e)?e.every(e=>e.length<=1)&&n():e.length<=1&&n();},k={mode:s,persisted:o,beforeEnter(t){let l=a;if(!n.isMounted){if(!i)return;l=m||a;}t[nV]&&t[nV](!0);let r=C[S];r&&iv(e,r)&&r.el[nV]&&r.el[nV](),x(l,[t]);},enter(e){let t=u,l=c,r=f;if(!n.isMounted){if(!i)return;t=_||u,l=y||c,r=b||f;}let s=!1,o=e[nU]=t=>{s||(s=!0,t?x(r,[e]):x(l,[e]),k.delayedLeave&&k.delayedLeave(),e[nU]=void 0);};t?E(t,[e,o]):o();},leave(t,l){let r=String(e.key);if(t[nU]&&t[nU](!0),n.isUnmounting)return l();x(p,[t]);let i=!1,s=t[nV]=n=>{i||(i=!0,l(),n?x(g,[t]):x(h,[t]),t[nV]=void 0,C[r]!==e||delete C[r]);};C[r]=e,d?E(d,[t,s]):s();},clone(e){let i=nq(e,t,n,l,r);return r&&r(i),i}};return k}function nG(e){if(lc(e))return (e=ix(e)).children=null,e}function nJ(e){if(!lc(e))return nA(e.type)&&e.children?nW(e.children):e;let{shapeFlag:t,children:n}=e;if(n){if(16&t)return n[0];if(32&t&&N(n.default))return n.default()}}function nX(e,t){6&e.shapeFlag&&e.component?(e.transition=t,nX(e.component.subTree,t)):128&e.shapeFlag?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t;}function nZ(e,t=!1,n){let l=[],r=0;for(let i=0;i<e.length;i++){let s=e[i],o=null==n?s.key:String(n)+String(null!=s.key?s.key:i);s.type===ie?(128&s.patchFlag&&r++,l=l.concat(nZ(s.children,t,o))):(t||s.type!==il)&&l.push(null!=o?ix(s,{key:o}):s);}if(r>1)for(let e=0;e<l.length;e++)l[e].patchFlag=-2;return l}/*! #__NO_SIDE_EFFECTS__ */function nY(e,t){return N(e)?S({name:e.name},t,{setup:e}):e}function n0(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0];}function n2(e,t,n,l,r=!1){if(w(e)){e.forEach((e,i)=>n2(e,t&&(w(t)?t[i]:t),n,l,r));return}if(lo(l)&&!r)return;let i=4&l.shapeFlag?iG(l.component):l.el,s=r?null:i,{i:o,r:a}=e,u=t&&t.r,c=o.refs===h?o.refs={}:o.refs,f=o.setupState,p=tP(f),d=f===h?()=>!1:e=>E(p,e);if(null!=u&&u!==a&&(O(u)?(c[u]=null,d(u)&&(f[u]=null)):tD(u)&&(u.value=null)),N(a))t7(a,o,12,[s,c]);else {let t=O(a),l=tD(a);if(t||l){let o=()=>{if(e.f){let n=t?d(a)?f[a]:c[a]:a.value;r?w(n)&&C(n,i):w(n)?n.includes(i)||n.push(i):t?(c[a]=[i],d(a)&&(f[a]=c[a])):(a.value=[i],e.k&&(c[e.k]=a.value));}else t?(c[a]=s,d(a)&&(f[a]=s)):l&&(a.value=s,e.k&&(c[e.k]=s));};s?(o.id=-1,rR(o,n)):o();}}}let lo=e=>!!e.type.__asyncLoader;let lc=e=>e.type.__isKeepAlive;function ld(e,t){lg(e,"a",t);}function lh(e,t){lg(e,"da",t);}function lg(e,t,n=iL){let l=e.__wdc||(e.__wdc=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent;}return e()});if(l_(t,l,n),n){let e=n.parent;for(;e&&e.parent;)lc(e.parent.vnode)&&function(e,t,n,l){let r=l_(t,e,l,!0);lw(()=>{C(l[t],r);},n);}(l,t,n,e),e=e.parent;}}function l_(e,t,n=iL,l=!1){if(n){let r=n[e]||(n[e]=[]),i=t.__weh||(t.__weh=(...l)=>{eO();let r=iF(n),i=ne(t,n,e,l);return r(),eP(),i});return l?r.unshift(i):r.push(i),i}}let ly=e=>(t,n=iL)=>{ij&&"sp"!==e||l_(e,(...e)=>t(...e),n);},lb=ly("bm"),lS=ly("m"),lC=ly("bu"),lx=ly("u"),lE=ly("bum"),lw=ly("um"),lk=ly("sp"),lT=ly("rtg"),lA=ly("rtc");function lR(e,t=iL){l_("ec",e,t);}let lP=Symbol.for("v-ndc");function lF(e,t,n,l){let r;let i=n,s=w(e);if(s||O(e)){let n=s&&tA(e),l=!1;n&&(l=!tN(e),e=eW(e)),r=Array(e.length);for(let n=0,s=e.length;n<s;n++)r[n]=t(l?tI(e[n]):e[n],n,void 0,i);}else if("number"==typeof e){r=Array(e);for(let n=0;n<e;n++)r[n]=t(n+1,n,void 0,i);}else if(M(e)){if(e[Symbol.iterator])r=Array.from(e,(e,n)=>t(e,n,void 0,i));else {let n=Object.keys(e);r=Array(n.length);for(let l=0,s=n.length;l<s;l++){let s=n[l];r[l]=t(e[s],s,l,i);}}}else r=[];return r}let l$=e=>e?iU(e)?iG(e):l$(e.parent):null,lH=/* @__PURE__ */S(/* @__PURE__ */Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>l$(e.parent),$root:e=>l$(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>re(e),$forceUpdate:e=>e.f||(e.f=()=>{np(e.update);}),$nextTick:e=>e.n||(e.n=nf.bind(e.proxy)),$watch:e=>rK.bind(e)}),lW=(e,t)=>e!==h&&!e.__isScriptSetup&&E(e,t),lK={get({_:e},t){let n,l,r;if("__v_skip"===t)return !0;let{ctx:i,setupState:s,data:o,props:a,accessCache:u,type:c,appContext:f}=e;if("$"!==t[0]){let l=u[t];if(void 0!==l)switch(l){case 1:return s[t];case 2:return o[t];case 4:return i[t];case 3:return a[t]}else {if(lW(s,t))return u[t]=1,s[t];if(o!==h&&E(o,t))return u[t]=2,o[t];if((n=e.propsOptions[0])&&E(n,t))return u[t]=3,a[t];if(i!==h&&E(i,t))return u[t]=4,i[t];l9&&(u[t]=0);}}let p=lH[t];return p?("$attrs"===t&&eB(e.attrs,"get",""),p(e)):(l=c.__cssModules)&&(l=l[t])?l:i!==h&&E(i,t)?(u[t]=4,i[t]):E(r=f.config.globalProperties,t)?r[t]:void 0},set({_:e},t,n){let{data:l,setupState:r,ctx:i}=e;return lW(r,t)?(r[t]=n,!0):l!==h&&E(l,t)?(l[t]=n,!0):!E(e.props,t)&&!("$"===t[0]&&t.slice(1) in e)&&(i[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:l,appContext:r,propsOptions:i}},s){let o;return !!n[s]||e!==h&&E(e,s)||lW(t,s)||(o=i[0])&&E(o,s)||E(l,s)||E(lH,s)||E(r.config.globalProperties,s)},defineProperty(e,t,n){return null!=n.get?e._.accessCache[t]=0:E(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function l6(e){return w(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}let l9=!0;function l7(e,t,n){ne(w(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n);}function re(e){let t;let n=e.type,{mixins:l,extends:r}=n,{mixins:i,optionsCache:s,config:{optionMergeStrategies:o}}=e.appContext,a=s.get(n);return a?t=a:i.length||l||r?(t={},i.length&&i.forEach(e=>rt(t,e,o,!0)),rt(t,n,o)):t=n,M(n)&&s.set(n,t),t}function rt(e,t,n,l=!1){let{mixins:r,extends:i}=t;for(let s in i&&rt(e,i,n,!0),r&&r.forEach(t=>rt(e,t,n,!0)),t)if(l&&"expose"===s);else {let l=rn[s]||n&&n[s];e[s]=l?l(e[s],t[s]):t[s];}return e}let rn={data:rl,props:ro,emits:ro,methods:rs,computed:rs,beforeCreate:ri,created:ri,beforeMount:ri,mounted:ri,beforeUpdate:ri,updated:ri,beforeDestroy:ri,beforeUnmount:ri,destroyed:ri,unmounted:ri,activated:ri,deactivated:ri,errorCaptured:ri,serverPrefetch:ri,components:rs,directives:rs,watch:function(e,t){if(!e)return t;if(!t)return e;let n=S(/* @__PURE__ */Object.create(null),e);for(let l in t)n[l]=ri(e[l],t[l]);return n},provide:rl,inject:function(e,t){return rs(rr(e),rr(t))}};function rl(e,t){return t?e?function(){return S(N(e)?e.call(this,this):e,N(t)?t.call(this,this):t)}:t:e}function rr(e){if(w(e)){let t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function ri(e,t){return e?[...new Set([].concat(e,t))]:t}function rs(e,t){return e?S(/* @__PURE__ */Object.create(null),e,t):t}function ro(e,t){return e?w(e)&&w(t)?[.../* @__PURE__ */new Set([...e,...t])]:S(/* @__PURE__ */Object.create(null),l6(e),l6(null!=t?t:{})):t}function ra(){return {app:null,config:{isNativeTag:_,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:/* @__PURE__ */Object.create(null),optionsCache:/* @__PURE__ */new WeakMap,propsCache:/* @__PURE__ */new WeakMap,emitsCache:/* @__PURE__ */new WeakMap}}let ru=0,rc=null;function rf(e,t){if(iL){let n=iL.provides,l=iL.parent&&iL.parent.provides;l===n&&(n=iL.provides=Object.create(l)),n[e]=t;}}function rp(e,t,n=!1){let l=iL||n_;if(l||rc){let r=rc?rc._context.provides:l?null==l.parent?l.vnode.appContext&&l.vnode.appContext.provides:l.parent.provides:void 0;if(r&&e in r)return r[e];if(arguments.length>1)return n&&N(t)?t.call(l&&l.proxy):t}}let rh={},rg=()=>Object.create(rh),rv=e=>Object.getPrototypeOf(e)===rh;function rm(e,t,n,l){let r;let[i,s]=e.propsOptions,o=!1;if(t)for(let a in t){let u;if(j(a))continue;let c=t[a];i&&E(i,u=H(a))?s&&s.includes(u)?(r||(r={}))[u]=c:n[u]=c:rX(e.emitsOptions,a)||a in l&&c===l[a]||(l[a]=c,o=!0);}if(s){let t=tP(n),l=r||h;for(let r=0;r<s.length;r++){let o=s[r];n[o]=r_(i,t,o,l[o],e,!E(l,o));}}return o}function r_(e,t,n,l,r,i){let s=e[n];if(null!=s){let e=E(s,"default");if(e&&void 0===l){let e=s.default;if(s.type!==Function&&!s.skipFactory&&N(e)){let{propsDefaults:i}=r;if(n in i)l=i[n];else {let s=iF(r);l=i[n]=e.call(null,t),s();}}else l=e;r.ce&&r.ce._setProp(n,l);}s[0]&&(i&&!e?l=!1:s[1]&&(""===l||l===K(n))&&(l=!0));}return l}let ry=/* @__PURE__ */new WeakMap;function rb(e){return !("$"===e[0]||j(e))}let rS=e=>"_"===e[0]||"$stable"===e,rC=e=>w(e)?e.map(iT):[iT(e)],rx=(e,t,n)=>{if(t._n)return t;let l=nE((...e)=>rC(t(...e)),n);return l._c=!1,l},rE=(e,t,n)=>{let l=e._ctx;for(let n in e){if(rS(n))continue;let r=e[n];if(N(r))t[n]=rx(n,r,l);else if(null!=r){let e=rC(r);t[n]=()=>e;}}},rw=(e,t)=>{let n=rC(t);e.slots.default=()=>n;},rk=(e,t,n)=>{for(let l in t)(n||"_"!==l)&&(e[l]=t[l]);},rT=(e,t,n)=>{let l=e.slots=rg();if(32&e.vnode.shapeFlag){let e=t._;e?(rk(l,t,n),n&&X(l,"_",e,!0)):rE(t,l);}else t&&rw(e,t);},rA=(e,t,n)=>{let{vnode:l,slots:r}=e,i=!0,s=h;if(32&l.shapeFlag){let e=t._;e?n&&1===e?i=!1:rk(r,t,n):(i=!t.$stable,rE(t,r)),s=t;}else t&&(rw(e,t),s={default:1});if(i)for(let e in r)rS(e)||null!=s[e]||delete r[e];},rR=r9;function rN(e){return rP(e)}function rP(e,t){var n;let l,r;Q().__VUE__=!0;let{insert:i,remove:s,patchProp:o,createElement:a,createText:u,createComment:c,setText:f,setElementText:p,parentNode:d,nextSibling:_,setScopeId:y=m,insertStaticContent:b}=e,C=(e,t,n,l=null,r=null,i=null,s,o=null,a=!!t.dynamicChildren)=>{if(e===t)return;e&&!iv(e,t)&&(l=er(e),Y(e,r,i,!0),e=null),-2===t.patchFlag&&(a=!1,t.dynamicChildren=null);let{type:u,ref:c,shapeFlag:f}=t;switch(u){case it:x(e,t,n,l);break;case il:w(e,t,n,l);break;case ir:null==e&&k(t,n,l,s);break;case ie:V(e,t,n,l,r,i,s,o,a);break;default:1&f?R(e,t,n,l,r,i,s,o,a):6&f?U(e,t,n,l,r,i,s,o,a):64&f?u.process(e,t,n,l,r,i,s,o,a,eo):128&f&&u.process(e,t,n,l,r,i,s,o,a,eo);}null!=c&&r&&n2(c,e&&e.ref,i,t||e,!t);},x=(e,t,n,l)=>{if(null==e)i(t.el=u(t.children),n,l);else {let n=t.el=e.el;t.children!==e.children&&f(n,t.children);}},w=(e,t,n,l)=>{null==e?i(t.el=c(t.children||""),n,l):t.el=e.el;},k=(e,t,n,l)=>{[e.el,e.anchor]=b(e.children,t,n,l,e.el,e.anchor);},T=({el:e,anchor:t},n,l)=>{let r;for(;e&&e!==t;)r=_(e),i(e,n,l),e=r;i(t,n,l);},A=({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=_(e),s(e),e=n;s(t);},R=(e,t,n,l,r,i,s,o,a)=>{"svg"===t.type?s="svg":"math"===t.type&&(s="mathml"),null==e?O(t,n,l,r,i,s,o,a):L(e,t,r,i,s,o,a);},O=(e,t,n,l,r,s,u,c)=>{let f,d;let{props:h,shapeFlag:g,transition:m,dirs:_}=e;if(f=e.el=a(e.type,s,h&&h.is,h),8&g?p(f,e.children):16&g&&I(e.children,f,null,l,r,rM(e,s),u,c),_&&nk(e,null,l,"created"),P(f,e,e.scopeId,u,l),h){for(let e in h)"value"===e||j(e)||o(f,e,null,h[e],s,l);"value"in h&&o(f,"value",null,h.value,s),(d=h.onVnodeBeforeMount)&&iO(d,l,e);}_&&nk(e,null,l,"beforeMount");let y=rL(r,m);y&&m.beforeEnter(f),i(f,t,n),((d=h&&h.onVnodeMounted)||y||_)&&rR(()=>{d&&iO(d,l,e),y&&m.enter(f),_&&nk(e,null,l,"mounted");},r);},P=(e,t,n,l,r)=>{if(n&&y(e,n),l)for(let t=0;t<l.length;t++)y(e,l[t]);if(r){let n=r.subTree;if(t===n||r2(n.type)&&(n.ssContent===t||n.ssFallback===t)){let t=r.vnode;P(e,t,t.scopeId,t.slotScopeIds,r.parent);}}},I=(e,t,n,l,r,i,s,o,a=0)=>{for(let u=a;u<e.length;u++)C(null,e[u]=o?iA(e[u]):iT(e[u]),t,n,l,r,i,s,o);},L=(e,t,n,l,r,i,s)=>{let a;let u=t.el=e.el,{patchFlag:c,dynamicChildren:f,dirs:d}=t;c|=16&e.patchFlag;let g=e.props||h,m=t.props||h;if(n&&rI(n,!1),(a=m.onVnodeBeforeUpdate)&&iO(a,n,t,e),d&&nk(t,e,n,"beforeUpdate"),n&&rI(n,!0),(g.innerHTML&&null==m.innerHTML||g.textContent&&null==m.textContent)&&p(u,""),f?D(e.dynamicChildren,f,u,n,l,rM(t,r),i):s||q(e,t,u,null,n,l,rM(t,r),i,!1),c>0){if(16&c)F(u,g,m,n,r);else if(2&c&&g.class!==m.class&&o(u,"class",null,m.class,r),4&c&&o(u,"style",g.style,m.style,r),8&c){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let l=e[t],i=g[l],s=m[l];(s!==i||"value"===l)&&o(u,l,i,s,r,n);}}1&c&&e.children!==t.children&&p(u,t.children);}else s||null!=f||F(u,g,m,n,r);((a=m.onVnodeUpdated)||d)&&rR(()=>{a&&iO(a,n,t,e),d&&nk(t,e,n,"updated");},l);},D=(e,t,n,l,r,i,s)=>{for(let o=0;o<t.length;o++){let a=e[o],u=t[o],c=a.el&&(a.type===ie||!iv(a,u)||70&a.shapeFlag)?d(a.el):n;C(a,u,c,null,l,r,i,s,!0);}},F=(e,t,n,l,r)=>{if(t!==n){if(t!==h)for(let i in t)j(i)||i in n||o(e,i,t[i],null,r,l);for(let i in n){if(j(i))continue;let s=n[i],a=t[i];s!==a&&"value"!==i&&o(e,i,a,s,r,l);}"value"in n&&o(e,"value",t.value,n.value,r);}},V=(e,t,n,l,r,s,o,a,c)=>{let f=t.el=e?e.el:u(""),p=t.anchor=e?e.anchor:u(""),{patchFlag:d,dynamicChildren:h,slotScopeIds:g}=t;g&&(a=a?a.concat(g):g),null==e?(i(f,n,l),i(p,n,l),I(t.children||[],n,p,r,s,o,a,c)):d>0&&64&d&&h&&e.dynamicChildren?(D(e.dynamicChildren,h,n,r,s,o,a),(null!=t.key||r&&t===r.subTree)&&rD(e,t,!0)):q(e,t,n,p,r,s,o,a,c);},U=(e,t,n,l,r,i,s,o,a)=>{t.slotScopeIds=o,null==e?512&t.shapeFlag?r.ctx.activate(t,n,l,s,a):B(t,n,l,r,i,s,a):$(e,t,a);},B=(e,t,n,l,r,i,s)=>{let o=e.component=iI(e,l,r);lc(e)&&(o.ctx.renderer=eo),iB(o,!1,s),o.asyncDep?(r&&r.registerDep(o,W,s),e.el||w(null,o.subTree=iS(il),t,n)):W(o,e,t,n,r,i,s);},$=(e,t,n)=>{let l=t.component=e.component;if(function(e,t,n){let{props:l,children:r,component:i}=e,{props:s,children:o,patchFlag:a}=t,u=i.emitsOptions;if(t.dirs||t.transition)return !0;if(!n||!(a>=0))return (!!r||!!o)&&(!o||!o.$stable)||l!==s&&(l?!s||r0(l,s,u):!!s);if(1024&a)return !0;if(16&a)return l?r0(l,s,u):!!s;if(8&a){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t];if(s[n]!==l[n]&&!rX(u,n))return !0}}return !1}(e,t,n)){if(l.asyncDep&&!l.asyncResolved){z(l,t,n);return}l.next=t,l.update();}else t.el=e.el,l.vnode=t;},W=(e,t,n,l,i,s,o)=>{let a=()=>{if(e.isMounted){let t,{next:n,bu:l,u:r,parent:u,vnode:c}=e;{let t=function e(t){let n=t.subTree.component;if(n)return n.asyncDep&&!n.asyncResolved?n:e(n)}(e);if(t){n&&(n.el=c.el,z(e,n,o)),t.asyncDep.then(()=>{e.isUnmounted||a();});return}}let f=n;rI(e,!1),n?(n.el=c.el,z(e,n,o)):n=c,l&&J(l),(t=n.props&&n.props.onVnodeBeforeUpdate)&&iO(t,u,n,c),rI(e,!0);let p=rZ(e),h=e.subTree;e.subTree=p,C(h,p,d(h.el),er(h),e,i,s),n.el=p.el,null===f&&r1(e,p.el),r&&rR(r,i),(t=n.props&&n.props.onVnodeUpdated)&&rR(()=>iO(t,u,n,c),i);}else {let o;let{el:a,props:u}=t,{bm:c,m:f,parent:p,root:d,type:h}=e,g=lo(t);if(rI(e,!1),c&&J(c),!g&&(o=u&&u.onVnodeBeforeMount)&&iO(o,p,t),rI(e,!0),a&&r){let t=()=>{e.subTree=rZ(e),r(a,e.subTree,e,i,null);};g&&h.__asyncHydrate?h.__asyncHydrate(a,e,t):t();}else {d.ce&&d.ce._injectChildStyle(h);let r=e.subTree=rZ(e);C(null,r,n,l,e,i,s),t.el=r.el;}if(f&&rR(f,i),!g&&(o=u&&u.onVnodeMounted)){let e=t;rR(()=>iO(o,p,e),i);}(256&t.shapeFlag||p&&lo(p.vnode)&&256&p.vnode.shapeFlag)&&e.a&&rR(e.a,i),e.isMounted=!0,t=n=l=null;}};e.scope.on();let u=e.effect=new ey(a);e.scope.off();let c=e.update=u.run.bind(u),f=e.job=u.runIfDirty.bind(u);f.i=e,f.id=e.uid,u.scheduler=()=>np(f),rI(e,!0),c();},z=(e,t,n)=>{t.component=e;let l=e.vnode.props;e.vnode=t,e.next=null,function(e,t,n,l){let{props:r,attrs:i,vnode:{patchFlag:s}}=e,o=tP(r),[a]=e.propsOptions,u=!1;if((l||s>0)&&!(16&s)){if(8&s){let n=e.vnode.dynamicProps;for(let l=0;l<n.length;l++){let s=n[l];if(rX(e.emitsOptions,s))continue;let c=t[s];if(a){if(E(i,s))c!==i[s]&&(i[s]=c,u=!0);else {let t=H(s);r[t]=r_(a,o,t,c,e,!1);}}else c!==i[s]&&(i[s]=c,u=!0);}}}else {let l;for(let s in rm(e,t,r,i)&&(u=!0),o)t&&(E(t,s)||(l=K(s))!==s&&E(t,l))||(a?n&&(void 0!==n[s]||void 0!==n[l])&&(r[s]=r_(a,o,s,void 0,e,!0)):delete r[s]);if(i!==o)for(let e in i)t&&E(t,e)||(delete i[e],u=!0);}u&&e$(e.attrs,"set","");}(e,t.props,l,n),rA(e,t.children,n),eO(),ng(e),eP();},q=(e,t,n,l,r,i,s,o,a=!1)=>{let u=e&&e.children,c=e?e.shapeFlag:0,f=t.children,{patchFlag:d,shapeFlag:h}=t;if(d>0){if(128&d){X(u,f,n,l,r,i,s,o,a);return}if(256&d){G(u,f,n,l,r,i,s,o,a);return}}8&h?(16&c&&el(u,r,i),f!==u&&p(n,f)):16&c?16&h?X(u,f,n,l,r,i,s,o,a):el(u,r,i,!0):(8&c&&p(n,""),16&h&&I(f,n,l,r,i,s,o,a));},G=(e,t,n,l,r,i,s,o,a)=>{let u;e=e||g,t=t||g;let c=e.length,f=t.length,p=Math.min(c,f);for(u=0;u<p;u++){let l=t[u]=a?iA(t[u]):iT(t[u]);C(e[u],l,n,null,r,i,s,o,a);}c>f?el(e,r,i,!0,!1,p):I(t,n,l,r,i,s,o,a,p);},X=(e,t,n,l,r,i,s,o,a)=>{let u=0,c=t.length,f=e.length-1,p=c-1;for(;u<=f&&u<=p;){let l=e[u],c=t[u]=a?iA(t[u]):iT(t[u]);if(iv(l,c))C(l,c,n,null,r,i,s,o,a);else break;u++;}for(;u<=f&&u<=p;){let l=e[f],u=t[p]=a?iA(t[p]):iT(t[p]);if(iv(l,u))C(l,u,n,null,r,i,s,o,a);else break;f--,p--;}if(u>f){if(u<=p){let e=p+1,f=e<c?t[e].el:l;for(;u<=p;)C(null,t[u]=a?iA(t[u]):iT(t[u]),n,f,r,i,s,o,a),u++;}}else if(u>p)for(;u<=f;)Y(e[u],r,i,!0),u++;else {let d;let h=u,m=u,_=/* @__PURE__ */new Map;for(u=m;u<=p;u++){let e=t[u]=a?iA(t[u]):iT(t[u]);null!=e.key&&_.set(e.key,u);}let y=0,b=p-m+1,S=!1,x=0,E=Array(b);for(u=0;u<b;u++)E[u]=0;for(u=h;u<=f;u++){let l;let c=e[u];if(y>=b){Y(c,r,i,!0);continue}if(null!=c.key)l=_.get(c.key);else for(d=m;d<=p;d++)if(0===E[d-m]&&iv(c,t[d])){l=d;break}void 0===l?Y(c,r,i,!0):(E[l-m]=u+1,l>=x?x=l:S=!0,C(c,t[l],n,null,r,i,s,o,a),y++);}let w=S?function(e){let t,n,l,r,i;let s=e.slice(),o=[0],a=e.length;for(t=0;t<a;t++){let a=e[t];if(0!==a){if(e[n=o[o.length-1]]<a){s[t]=n,o.push(t);continue}for(l=0,r=o.length-1;l<r;)e[o[i=l+r>>1]]<a?l=i+1:r=i;a<e[o[l]]&&(l>0&&(s[t]=o[l-1]),o[l]=t);}}for(l=o.length,r=o[l-1];l-- >0;)o[l]=r,r=s[r];return o}(E):g;for(d=w.length-1,u=b-1;u>=0;u--){let e=m+u,f=t[e],p=e+1<c?t[e+1].el:l;0===E[u]?C(null,f,n,p,r,i,s,o,a):S&&(d<0||u!==w[d]?Z(f,n,p,2):d--);}}},Z=(e,t,n,l,r=null)=>{let{el:s,type:o,transition:a,children:u,shapeFlag:c}=e;if(6&c){Z(e.component.subTree,t,n,l);return}if(128&c){e.suspense.move(t,n,l);return}if(64&c){o.move(e,t,n,eo);return}if(o===ie){i(s,t,n);for(let e=0;e<u.length;e++)Z(u[e],t,n,l);i(e.anchor,t,n);return}if(o===ir){T(e,t,n);return}if(2!==l&&1&c&&a){if(0===l)a.beforeEnter(s),i(s,t,n),rR(()=>a.enter(s),r);else {let{leave:e,delayLeave:l,afterLeave:r}=a,o=()=>i(s,t,n),u=()=>{e(s,()=>{o(),r&&r();});};l?l(s,o,u):u();}}else i(s,t,n);},Y=(e,t,n,l=!1,r=!1)=>{let i;let{type:s,props:o,ref:a,children:u,dynamicChildren:c,shapeFlag:f,patchFlag:p,dirs:d,cacheIndex:h}=e;if(-2===p&&(r=!1),null!=a&&n2(a,null,n,e,!0),null!=h&&(t.renderCache[h]=void 0),256&f){t.ctx.deactivate(e);return}let g=1&f&&d,m=!lo(e);if(m&&(i=o&&o.onVnodeBeforeUnmount)&&iO(i,t,e),6&f)en(e.component,n,l);else {if(128&f){e.suspense.unmount(n,l);return}g&&nk(e,null,t,"beforeUnmount"),64&f?e.type.remove(e,t,n,eo,l):c&&!c.hasOnce&&(s!==ie||p>0&&64&p)?el(c,t,n,!1,!0):(s===ie&&384&p||!r&&16&f)&&el(u,t,n),l&&ee(e);}(m&&(i=o&&o.onVnodeUnmounted)||g)&&rR(()=>{i&&iO(i,t,e),g&&nk(e,null,t,"unmounted");},n);},ee=e=>{let{type:t,el:n,anchor:l,transition:r}=e;if(t===ie){et(n,l);return}if(t===ir){A(e);return}let i=()=>{s(n),r&&!r.persisted&&r.afterLeave&&r.afterLeave();};if(1&e.shapeFlag&&r&&!r.persisted){let{leave:t,delayLeave:l}=r,s=()=>t(n,i);l?l(e.el,i,s):s();}else i();},et=(e,t)=>{let n;for(;e!==t;)n=_(e),s(e),e=n;s(t);},en=(e,t,n)=>{let{bum:l,scope:r,job:i,subTree:s,um:o,m:a,a:u}=e;rF(a),rF(u),l&&J(l),r.stop(),i&&(i.flags|=8,Y(s,e,t,n)),o&&rR(o,t),rR(()=>{e.isUnmounted=!0;},t),t&&t.pendingBranch&&!t.isUnmounted&&e.asyncDep&&!e.asyncResolved&&e.suspenseId===t.pendingId&&(t.deps--,0===t.deps&&t.resolve());},el=(e,t,n,l=!1,r=!1,i=0)=>{for(let s=i;s<e.length;s++)Y(e[s],t,n,l,r);},er=e=>{if(6&e.shapeFlag)return er(e.component.subTree);if(128&e.shapeFlag)return e.suspense.next();let t=_(e.anchor||e.el),n=t&&t[nT];return n?_(n):t},ei=!1,es=(e,t,n)=>{null==e?t._vnode&&Y(t._vnode,null,null,!0):C(t._vnode||null,e,t,null,null,null,n),t._vnode=e,ei||(ei=!0,ng(),nv(),ei=!1);},eo={p:C,um:Y,m:Z,r:ee,mt:B,mc:I,pc:q,pbc:D,n:er,o:e};return {render:es,hydrate:l,createApp:(n=l,function(e,t=null){N(e)||(e=S({},e)),null==t||M(t)||(t=null);let l=ra(),r=/* @__PURE__ */new WeakSet,i=[],s=!1,o=l.app={_uid:ru++,_component:e,_props:t,_container:null,_context:l,_instance:null,version:i1,get config(){return l.config},set config(v){},use:(e,...t)=>(r.has(e)||(e&&N(e.install)?(r.add(e),e.install(o,...t)):N(e)&&(r.add(e),e(o,...t))),o),mixin:e=>(l.mixins.includes(e)||l.mixins.push(e),o),component:(e,t)=>t?(l.components[e]=t,o):l.components[e],directive:(e,t)=>t?(l.directives[e]=t,o):l.directives[e],mount(r,i,a){if(!s){let u=o._ceVNode||iS(e,t);return u.appContext=l,!0===a?a="svg":!1===a&&(a=void 0),i&&n?n(u,r):es(u,r,a),s=!0,o._container=r,r.__vue_app__=o,iG(u.component)}},onUnmount(e){i.push(e);},unmount(){s&&(ne(i,o._instance,16),es(null,o._container),delete o._container.__vue_app__);},provide:(e,t)=>(l.provides[e]=t,o),runWithContext(e){let t=rc;rc=o;try{return e()}finally{rc=t;}}};return o})}}function rM({type:e,props:t},n){return "svg"===n&&"foreignObject"===e||"mathml"===n&&"annotation-xml"===e&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function rI({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5);}function rL(e,t){return (!e||e&&!e.pendingBranch)&&t&&!t.persisted}function rD(e,t,n=!1){let l=e.children,r=t.children;if(w(l)&&w(r))for(let e=0;e<l.length;e++){let t=l[e],i=r[e];!(1&i.shapeFlag)||i.dynamicChildren||((i.patchFlag<=0||32===i.patchFlag)&&((i=r[e]=iA(r[e])).el=t.el),n||-2===i.patchFlag||rD(t,i)),i.type===it&&(i.el=t.el);}}function rF(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8;}let rV=Symbol.for("v-scx"),rU=()=>rp(rV);function rH(e,t,n){return rW(e,t,n)}function rW(e,t,n=h){let l;let{immediate:r,deep:i,flush:s,once:o}=n,a=S({},n);if(ij){if("sync"===s){let e=rU();l=e.__watcherHandles||(e.__watcherHandles=[]);}else {if(t&&!r)return {stop:m,resume:m,pause:m};a.once=!0;}}let u=iL;a.call=(e,t,n)=>ne(e,u,t,n);let c=!1;"post"===s?a.scheduler=e=>{rR(e,u&&u.suspense);}:"sync"!==s&&(c=!0,a.scheduler=(e,t)=>{t?e():np(e);}),a.augmentJob=e=>{t&&(e.flags|=4),c&&(e.flags|=2,u&&(e.id=u.uid,e.i=u));};let p=function(e,t,n=h){let l,r,i,s;let{immediate:o,deep:a,once:u,scheduler:c,augmentJob:p,call:d}=n,g=e=>a?e:tN(e)||!1===a||0===a?t3(e,1):t3(e),_=!1,y=!1;if(tD(e)?(r=()=>e.value,_=tN(e)):tA(e)?(r=()=>g(e),_=!0):w(e)?(y=!0,_=e.some(e=>tA(e)||tN(e)),r=()=>e.map(e=>tD(e)?e.value:tA(e)?g(e):N(e)?d?d(e,2):e():void 0)):r=N(e)?t?d?()=>d(e,2):e:()=>{if(i){eO();try{i();}finally{eP();}}let t=f;f=l;try{return d?d(e,3,[s]):e(s)}finally{f=t;}}:m,t&&a){let e=r,t=!0===a?1/0:a;r=()=>t3(e(),t);}let b=ev(),S=()=>{l.stop(),b&&C(b.effects,l);};if(u){if(t){let e=t;t=(...t)=>{e(...t),S();};}else {let e=r;r=()=>{e(),S();};}}let x=y?Array(e.length).fill(t2):t2,E=e=>{if(1&l.flags&&(l.dirty||e)){if(t){let e=l.run();if(a||_||(y?e.some((e,t)=>G(e,x[t])):G(e,x))){i&&i();let n=f;f=l;try{let n=[e,x===t2?void 0:y&&x[0]===t2?[]:x,s];d?d(t,3,n):t(...n),x=e;}finally{f=n;}}}else l.run();}};return p&&p(E),(l=new ey(r)).scheduler=c?()=>c(E,!1):E,s=e=>t4(e,!1,l),i=l.onStop=()=>{let e=t6.get(l);if(e){if(d)d(e,4);else for(let t of e)t();t6.delete(l);}},t?o?E(!0):x=l.run():c?c(E.bind(null,!0),!0):l.run(),S.pause=l.pause.bind(l),S.resume=l.resume.bind(l),S.stop=S,S}(e,t,a);return l&&l.push(p),p}function rK(e,t,n){let l;let r=this.proxy,i=O(e)?e.includes(".")?rz(r,e):()=>r[e]:e.bind(r,r);N(t)?l=t:(l=t.handler,n=t);let s=iF(this),o=rW(i,l.bind(r),n);return s(),o}function rz(e,t){let n=t.split(".");return ()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}let rG=(e,t)=>"modelValue"===t||"model-value"===t?e.modelModifiers:e[`${t}Modifiers`]||e[`${H(t)}Modifiers`]||e[`${K(t)}Modifiers`];function rJ(e,t,...n){let l;if(e.isUnmounted)return;let r=e.vnode.props||h,i=n,s=t.startsWith("update:"),o=s&&rG(r,t.slice(7));o&&(o.trim&&(i=n.map(e=>O(e)?e.trim():e)),o.number&&(i=n.map(Z)));let a=r[l=q(t)]||r[l=q(H(t))];!a&&s&&(a=r[l=q(K(t))]),a&&ne(a,e,6,i);let u=r[l+"Once"];if(u){if(e.emitted){if(e.emitted[l])return}else e.emitted={};e.emitted[l]=!0,ne(u,e,6,i);}}function rX(e,t){return !!(e&&y(t))&&(E(e,(t=t.slice(2).replace(/Once$/,""))[0].toLowerCase()+t.slice(1))||E(e,K(t))||E(e,t))}function rZ(e){let t,n;let{type:l,vnode:r,proxy:i,withProxy:s,propsOptions:[o],slots:a,attrs:u,emit:c,render:f,renderCache:p,props:d,data:h,setupState:g,ctx:m,inheritAttrs:_}=e,y=nb(e);try{if(4&r.shapeFlag){let e=s||i;t=iT(f.call(e,e,p,d,g,h,m)),n=u;}else t=iT(l.length>1?l(d,{attrs:u,slots:a,emit:c}):l(d,null)),n=l.props?u:rY(u);}catch(n){ii.length=0,nt(n,e,1),t=iS(il);}let S=t;if(n&&!1!==_){let e=Object.keys(n),{shapeFlag:t}=S;e.length&&7&t&&(o&&e.some(b)&&(n=rQ(n,o)),S=ix(S,n,!1,!0));}return r.dirs&&((S=ix(S,null,!1,!0)).dirs=S.dirs?S.dirs.concat(r.dirs):r.dirs),r.transition&&nX(S,r.transition),t=S,nb(y),t}let rY=e=>{let t;for(let n in e)("class"===n||"style"===n||y(n))&&((t||(t={}))[n]=e[n]);return t},rQ=(e,t)=>{let n={};for(let l in e)b(l)&&l.slice(9) in t||(n[l]=e[l]);return n};function r0(e,t,n){let l=Object.keys(t);if(l.length!==Object.keys(e).length)return !0;for(let r=0;r<l.length;r++){let i=l[r];if(t[i]!==e[i]&&!rX(n,i))return !0}return !1}function r1({vnode:e,parent:t},n){for(;t;){let l=t.subTree;if(l.suspense&&l.suspense.activeBranch===e&&(l.el=e.el),l===e)(e=t.vnode).el=n,t=t.parent;else break}}let r2=e=>e.__isSuspense;function r9(e,t){t&&t.pendingBranch?w(e)?t.effects.push(...e):t.effects.push(e):nh(e);}let ie=Symbol.for("v-fgt"),it=Symbol.for("v-txt"),il=Symbol.for("v-cmt"),ir=Symbol.for("v-stc"),ii=[],is=null;function io(e=!1){ii.push(is=e?null:[]);}function ia(){ii.pop(),is=ii[ii.length-1]||null;}let iu=1;function ic(e){iu+=e,e<0&&is&&(is.hasOnce=!0);}function ip(e){return e.dynamicChildren=iu>0?is||g:null,ia(),iu>0&&is&&is.push(e),e}function id(e,t,n,l,r,i){return ip(ib(e,t,n,l,r,i,!0))}function ih(e,t,n,l,r){return ip(iS(e,t,n,l,r,!0))}function ig(e){return !!e&&!0===e.__v_isVNode}function iv(e,t){return e.type===t.type&&e.key===t.key}let i_=({key:e})=>null!=e?e:null,iy=({ref:e,ref_key:t,ref_for:n})=>("number"==typeof e&&(e=""+e),null!=e?O(e)||tD(e)||N(e)?{i:n_,r:e,k:t,f:!!n}:e:null);function ib(e,t=null,n=null,l=0,r=null,i=e===ie?0:1,s=!1,o=!1){let a={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&i_(t),ref:t&&iy(t),scopeId:ny,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:l,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:n_};return o?(iR(a,n),128&i&&e.normalize(a)):n&&(a.shapeFlag|=O(n)?8:16),iu>0&&!s&&is&&(a.patchFlag>0||6&i)&&32!==a.patchFlag&&is.push(a),a}let iS=function(e,t=null,n=null,l=0,r=null,i=!1){var s;if(e&&e!==lP||(e=il),ig(e)){let l=ix(e,t,!0);return n&&iR(l,n),iu>0&&!i&&is&&(6&l.shapeFlag?is[is.indexOf(e)]=l:is.push(l)),l.patchFlag=-2,l}if(N(s=e)&&"__vccOpts"in s&&(e=e.__vccOpts),t){let{class:e,style:n}=t=iC(t);e&&!O(e)&&(t.class=ei(e)),M(n)&&(tO(n)&&!w(n)&&(n=S({},n)),t.style=et(n));}let o=O(e)?1:r2(e)?128:nA(e)?64:M(e)?4:N(e)?2:0;return ib(e,t,n,l,r,o,i,!0)};function iC(e){return e?tO(e)||rv(e)?S({},e):e:null}function ix(e,t,n=!1,l=!1){let{props:r,ref:i,patchFlag:s,children:o,transition:a}=e,u=t?iN(r||{},t):r,c={__v_isVNode:!0,__v_skip:!0,type:e.type,props:u,key:u&&i_(u),ref:t&&t.ref?n&&i?w(i)?i.concat(iy(t)):[i,iy(t)]:iy(t):i,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:o,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==ie?-1===s?16:16|s:s,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:a,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&ix(e.ssContent),ssFallback:e.ssFallback&&ix(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return a&&l&&nX(c,a.clone(c)),c}function iE(e=" ",t=0){return iS(it,null,e,t)}function iw(e,t){let n=iS(ir,null,e);return n.staticCount=t,n}function ik(e="",t=!1){return t?(io(),ih(il,null,e)):iS(il,null,e)}function iT(e){return null==e||"boolean"==typeof e?iS(il):w(e)?iS(ie,null,e.slice()):"object"==typeof e?iA(e):iS(it,null,String(e))}function iA(e){return null===e.el&&-1!==e.patchFlag||e.memo?e:ix(e)}function iR(e,t){let n=0,{shapeFlag:l}=e;if(null==t)t=null;else if(w(t))n=16;else if("object"==typeof t){if(65&l){let n=t.default;n&&(n._c&&(n._d=!1),iR(e,n()),n._c&&(n._d=!0));return}{n=32;let l=t._;l||rv(t)?3===l&&n_&&(1===n_.slots._?t._=1:(t._=2,e.patchFlag|=1024)):t._ctx=n_;}}else N(t)?(t={default:t,_ctx:n_},n=32):(t=String(t),64&l?(n=16,t=[iE(t)]):n=8);e.children=t,e.shapeFlag|=n;}function iN(...e){let t={};for(let n=0;n<e.length;n++){let l=e[n];for(let e in l)if("class"===e)t.class!==l.class&&(t.class=ei([t.class,l.class]));else if("style"===e)t.style=et([t.style,l.style]);else if(y(e)){let n=t[e],r=l[e];r&&n!==r&&!(w(n)&&n.includes(r))&&(t[e]=n?[].concat(n,r):r);}else ""!==e&&(t[e]=l[e]);}return t}function iO(e,t,n,l=null){ne(e,t,7,[n,l]);}let iP=ra(),iM=0;function iI(e,t,n){let l=e.type,r=(t?t.appContext:e.appContext)||iP,i={uid:iM++,vnode:e,type:l,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new eh(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:function e(t,n,l=!1){let r=l?ry:n.propsCache,i=r.get(t);if(i)return i;let s=t.props,o={},a=[],u=!1;if(!N(t)){let r=t=>{u=!0;let[l,r]=e(t,n,!0);S(o,l),r&&a.push(...r);};!l&&n.mixins.length&&n.mixins.forEach(r),t.extends&&r(t.extends),t.mixins&&t.mixins.forEach(r);}if(!s&&!u)return M(t)&&r.set(t,g),g;if(w(s))for(let e=0;e<s.length;e++){let t=H(s[e]);rb(t)&&(o[t]=h);}else if(s)for(let e in s){let t=H(e);if(rb(t)){let n=s[e],l=o[t]=w(n)||N(n)?{type:n}:S({},n),r=l.type,i=!1,u=!0;if(w(r))for(let e=0;e<r.length;++e){let t=r[e],n=N(t)&&t.name;if("Boolean"===n){i=!0;break}"String"===n&&(u=!1);}else i=N(r)&&"Boolean"===r.name;l[0]=i,l[1]=u,(i||E(l,"default"))&&a.push(t);}}let c=[o,a];return M(t)&&r.set(t,c),c}(l,r),emitsOptions:function e(t,n,l=!1){let r=n.emitsCache,i=r.get(t);if(void 0!==i)return i;let s=t.emits,o={},a=!1;if(!N(t)){let r=t=>{let l=e(t,n,!0);l&&(a=!0,S(o,l));};!l&&n.mixins.length&&n.mixins.forEach(r),t.extends&&r(t.extends),t.mixins&&t.mixins.forEach(r);}return s||a?(w(s)?s.forEach(e=>o[e]=null):S(o,s),M(t)&&r.set(t,o),o):(M(t)&&r.set(t,null),null)}(l,r),emit:null,emitted:null,propsDefaults:h,inheritAttrs:l.inheritAttrs,ctx:h,data:h,props:h,attrs:h,slots:h,refs:h,setupState:h,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=t?t.root:i,i.emit=rJ.bind(null,i),e.ce&&e.ce(i),i}let iL=null,iD=()=>iL||n_;{let e=Q(),t=(t,n)=>{let l;return (l=e[t])||(l=e[t]=[]),l.push(n),e=>{l.length>1?l.forEach(t=>t(e)):l[0](e);}};s=t("__VUE_INSTANCE_SETTERS__",e=>iL=e),o=t("__VUE_SSR_SETTERS__",e=>ij=e);}let iF=e=>{let t=iL;return s(e),e.scope.on(),()=>{e.scope.off(),s(t);}},iV=()=>{iL&&iL.scope.off(),s(null);};function iU(e){return 4&e.vnode.shapeFlag}let ij=!1;function iB(e,t=!1,n=!1){t&&o(t);let{props:l,children:r}=e.vnode,i=iU(e);!function(e,t,n,l=!1){let r={},i=rg();for(let n in e.propsDefaults=/* @__PURE__ */Object.create(null),rm(e,t,r,i),e.propsOptions[0])n in r||(r[n]=void 0);n?e.props=l?r:tE(r):e.type.props?e.props=r:e.props=i,e.attrs=i;}(e,l,i,t),rT(e,r,n);let s=i?function(e,t){let n=e.type;e.accessCache=/* @__PURE__ */Object.create(null),e.proxy=new Proxy(e.ctx,lK);let{setup:l}=n;if(l){let n=e.setupContext=l.length>1?iq(e):null,r=iF(e);eO();let i=t7(l,e,0,[e.props,n]);if(eP(),r(),I(i)){if(lo(e)||n0(e),i.then(iV,iV),t)return i.then(n=>{i$(e,n,t);}).catch(t=>{nt(t,e,0);});e.asyncDep=i;}else i$(e,i,t);}else iK(e,t);}(e,t):void 0;return t&&o(!1),s}function i$(e,t,n){N(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:M(t)&&(e.setupState=tK(t)),iK(e,n);}function iK(e,t,n){let l=e.type;if(!e.render){if(!t&&a&&!l.render){let t=l.template||re(e).template;if(t){let{isCustomElement:n,compilerOptions:r}=e.appContext.config,{delimiters:i,compilerOptions:s}=l,o=S(S({isCustomElement:n,delimiters:i},r),s);l.render=a(t,o);}}e.render=l.render||m;}{let t=iF(e);eO();try{!function(e){let t=re(e),n=e.proxy,l=e.ctx;l9=!1,t.beforeCreate&&l7(t.beforeCreate,e,"bc");let{data:r,computed:i,methods:s,watch:o,provide:a,inject:u,created:c,beforeMount:f,mounted:p,beforeUpdate:d,updated:h,activated:g,deactivated:_,beforeDestroy:y,beforeUnmount:b,destroyed:S,unmounted:C,render:x,renderTracked:E,renderTriggered:k,errorCaptured:T,serverPrefetch:A,expose:R,inheritAttrs:P,components:I,directives:L,filters:D}=t;if(u&&function(e,t,n=m){for(let n in w(e)&&(e=rr(e)),e){let l;let r=e[n];tD(l=M(r)?"default"in r?rp(r.from||n,r.default,!0):rp(r.from||n):rp(r))?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>l.value,set:e=>l.value=e}):t[n]=l;}}(u,l,null),s)for(let e in s){let t=s[e];N(t)&&(l[e]=t.bind(n));}if(r){let t=r.call(n,n);M(t)&&(e.data=tx(t));}if(l9=!0,i)for(let e in i){let t=i[e],r=N(t)?t.bind(n,n):N(t.get)?t.get.bind(n,n):m,s=iX({get:r,set:!N(t)&&N(t.set)?t.set.bind(n):m});Object.defineProperty(l,e,{enumerable:!0,configurable:!0,get:()=>s.value,set:e=>s.value=e});}if(o)for(let e in o)!function e(t,n,l,r){let i=r.includes(".")?rz(l,r):()=>l[r];if(O(t)){let e=n[t];N(e)&&rH(i,e);}else if(N(t))rH(i,t.bind(l));else if(M(t)){if(w(t))t.forEach(t=>e(t,n,l,r));else {let e=N(t.handler)?t.handler.bind(l):n[t.handler];N(e)&&rH(i,e,t);}}}(o[e],l,n,e);if(a){let e=N(a)?a.call(n):a;Reflect.ownKeys(e).forEach(t=>{rf(t,e[t]);});}function F(e,t){w(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n));}if(c&&l7(c,e,"c"),F(lb,f),F(lS,p),F(lC,d),F(lx,h),F(ld,g),F(lh,_),F(lR,T),F(lA,E),F(lT,k),F(lE,b),F(lw,C),F(lk,A),w(R)){if(R.length){let t=e.exposed||(e.exposed={});R.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t});});}else e.exposed||(e.exposed={});}x&&e.render===m&&(e.render=x),null!=P&&(e.inheritAttrs=P),I&&(e.components=I),L&&(e.directives=L),A&&n0(e);}(e);}finally{eP(),t();}}}let iz={get:(e,t)=>(eB(e,"get",""),e[t])};function iq(e){return {attrs:new Proxy(e.attrs,iz),slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{};}}}function iG(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(tK(tM(e.exposed)),{get:(t,n)=>n in t?t[n]:n in lH?lH[n](e):void 0,has:(e,t)=>t in e||t in lH})):e.proxy}let iX=(e,t)=>(function(e,t,n=!1){let l,r;return N(e)?l=e:(l=e.get,r=e.set),new tQ(l,r,n)})(e,0,ij);function iZ(e,t,n){let l=arguments.length;return 2!==l?(l>3?n=Array.prototype.slice.call(arguments,2):3===l&&ig(n)&&(n=[n]),iS(e,t,n)):!M(t)||w(t)?iS(e,null,t):ig(t)?iS(e,null,[t]):iS(e,t)}let i1="3.5.5",se="undefined"!=typeof window&&window.trustedTypes;if(se)try{p=/* @__PURE__ */se.createPolicy("vue",{createHTML:e=>e});}catch(e){}let st=p?e=>p.createHTML(e):e=>e,sn="undefined"!=typeof document?document:null,sl=sn&&/* @__PURE__ */sn.createElement("template"),sr="transition",si="animation",ss=Symbol("_vtc"),so={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},sa=/* @__PURE__ */S({},n$,so);((e=(e,{slots:t})=>iZ(nK,sp(e),t)).displayName="Transition",e.props=sa,e);let sc=(e,t=[])=>{w(e)?e.forEach(e=>e(...t)):e&&e(...t);},sf=e=>!!e&&(w(e)?e.some(e=>e.length>1):e.length>1);function sp(e){let t={};for(let n in e)n in so||(t[n]=e[n]);if(!1===e.css)return t;let{name:n="v",type:l,duration:r,enterFromClass:i=`${n}-enter-from`,enterActiveClass:s=`${n}-enter-active`,enterToClass:o=`${n}-enter-to`,appearFromClass:a=i,appearActiveClass:u=s,appearToClass:c=o,leaveFromClass:f=`${n}-leave-from`,leaveActiveClass:p=`${n}-leave-active`,leaveToClass:d=`${n}-leave-to`}=e,h=function(e){if(null==e)return null;if(M(e))return [Y(e.enter),Y(e.leave)];{let t=Y(e);return [t,t]}}(r),g=h&&h[0],m=h&&h[1],{onBeforeEnter:_,onEnter:y,onEnterCancelled:b,onLeave:C,onLeaveCancelled:x,onBeforeAppear:E=_,onAppear:w=y,onAppearCancelled:k=b}=t,T=(e,t,n)=>{sh(e,t?c:o),sh(e,t?u:s),n&&n();},A=(e,t)=>{e._isLeaving=!1,sh(e,f),sh(e,d),sh(e,p),t&&t();},R=e=>(t,n)=>{let r=e?w:y,s=()=>T(t,e,n);sc(r,[t,s]),sg(()=>{sh(t,e?a:i),sd(t,e?c:o),sf(r)||sm(t,l,g,s);});};return S(t,{onBeforeEnter(e){sc(_,[e]),sd(e,i),sd(e,s);},onBeforeAppear(e){sc(E,[e]),sd(e,a),sd(e,u);},onEnter:R(!1),onAppear:R(!0),onLeave(e,t){e._isLeaving=!0;let n=()=>A(e,t);sd(e,f),sd(e,p),sS(),sg(()=>{e._isLeaving&&(sh(e,f),sd(e,d),sf(C)||sm(e,l,m,n));}),sc(C,[e,n]);},onEnterCancelled(e){T(e,!1),sc(b,[e]);},onAppearCancelled(e){T(e,!0),sc(k,[e]);},onLeaveCancelled(e){A(e),sc(x,[e]);}})}function sd(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.add(t)),(e[ss]||(e[ss]=/* @__PURE__ */new Set)).add(t);}function sh(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.remove(t));let n=e[ss];n&&(n.delete(t),n.size||(e[ss]=void 0));}function sg(e){requestAnimationFrame(()=>{requestAnimationFrame(e);});}let sv=0;function sm(e,t,n,l){let r=e._endId=++sv,i=()=>{r===e._endId&&l();};if(n)return setTimeout(i,n);let{type:s,timeout:o,propCount:a}=s_(e,t);if(!s)return l();let u=s+"end",c=0,f=()=>{e.removeEventListener(u,p),i();},p=t=>{t.target===e&&++c>=a&&f();};setTimeout(()=>{c<a&&f();},o+1),e.addEventListener(u,p);}function s_(e,t){let n=window.getComputedStyle(e),l=e=>(n[e]||"").split(", "),r=l(`${sr}Delay`),i=l(`${sr}Duration`),s=sy(r,i),o=l(`${si}Delay`),a=l(`${si}Duration`),u=sy(o,a),c=null,f=0,p=0;t===sr?s>0&&(c=sr,f=s,p=i.length):t===si?u>0&&(c=si,f=u,p=a.length):p=(c=(f=Math.max(s,u))>0?s>u?sr:si:null)?c===sr?i.length:a.length:0;let d=c===sr&&/\b(transform|all)(,|$)/.test(l(`${sr}Property`).toString());return {type:c,timeout:f,propCount:p,hasTransform:d}}function sy(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((t,n)=>sb(t)+sb(e[n])))}function sb(e){return "auto"===e?0:1e3*Number(e.slice(0,-1).replace(",","."))}function sS(){return document.body.offsetHeight}let sC=Symbol("_vod"),sx=Symbol("_vsh");let sk=Symbol("");let sR=/(^|;)\s*display\s*:/,sN=/\s*!important$/;function sO(e,t,n){if(w(n))n.forEach(n=>sO(e,t,n));else if(null==n&&(n=""),t.startsWith("--"))e.setProperty(t,n);else {let l=function(e,t){let n=sM[t];if(n)return n;let l=H(t);if("filter"!==l&&l in e)return sM[t]=l;l=z(l);for(let n=0;n<sP.length;n++){let r=sP[n]+l;if(r in e)return sM[t]=r}return t}(e,t);sN.test(n)?e.setProperty(K(l),n.replace(sN,""),"important"):e[l]=n;}}let sP=["Webkit","Moz","ms"],sM={},sI="http://www.w3.org/1999/xlink";function sL(e,t,n,l,r,i=eo(t)){l&&t.startsWith("xlink:")?null==n?e.removeAttributeNS(sI,t.slice(6,t.length)):e.setAttributeNS(sI,t,n):null==n||i&&!(n||""===n)?e.removeAttribute(t):e.setAttribute(t,i?"":P(n)?String(n):n);}function sD(e,t,n,l){e.addEventListener(t,n,l);}let sF=Symbol("_vei"),sV=/(?:Once|Passive|Capture)$/,sU=0,sj=/* @__PURE__ */Promise.resolve(),sB=()=>sU||(sj.then(()=>sU=0),sU=Date.now()),s$=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)>96&&123>e.charCodeAt(2),sH={};/*! #__NO_SIDE_EFFECTS__ */function sW(e,t,n){let l=nY(e,t);V(l)&&S(l,t);class r extends sq{constructor(e){super(l,e,n);}}return r.def=l,r}let sz="undefined"!=typeof HTMLElement?HTMLElement:class{};class sq extends sz{constructor(e,t={},n=ob){super(),this._def=e,this._props=t,this._createApp=n,this._isVueCE=!0,this._instance=null,this._app=null,this._nonce=this._def.nonce,this._connected=!1,this._resolved=!1,this._numberProps=null,this._styleChildren=/* @__PURE__ */new WeakSet,this._ob=null,this.shadowRoot&&n!==ob?this._root=this.shadowRoot:!1!==e.shadowRoot?(this.attachShadow({mode:"open"}),this._root=this.shadowRoot):this._root=this,this._def.__asyncLoader||this._resolveProps(this._def);}connectedCallback(){if(!this.isConnected)return;this.shadowRoot||this._parseSlots(),this._connected=!0;let e=this;for(;e=e&&(e.parentNode||e.host);)if(e instanceof sq){this._parent=e;break}this._instance||(this._resolved?(this._setParent(),this._update()):e&&e._pendingResolve?this._pendingResolve=e._pendingResolve.then(()=>{this._pendingResolve=void 0,this._resolveDef();}):this._resolveDef());}_setParent(e=this._parent){e&&(this._instance.parent=e._instance,this._instance.provides=e._instance.provides);}disconnectedCallback(){this._connected=!1,nf(()=>{this._connected||(this._ob&&(this._ob.disconnect(),this._ob=null),this._app&&this._app.unmount(),this._instance&&(this._instance.ce=void 0),this._app=this._instance=null);});}_resolveDef(){if(this._pendingResolve)return;for(let e=0;e<this.attributes.length;e++)this._setAttr(this.attributes[e].name);this._ob=new MutationObserver(e=>{for(let t of e)this._setAttr(t.attributeName);}),this._ob.observe(this,{attributes:!0});let e=(e,t=!1)=>{let n;this._resolved=!0,this._pendingResolve=void 0;let{props:l,styles:r}=e;if(l&&!w(l))for(let e in l){let t=l[e];(t===Number||t&&t.type===Number)&&(e in this._props&&(this._props[e]=Y(this._props[e])),(n||(n=/* @__PURE__ */Object.create(null)))[H(e)]=!0);}this._numberProps=n,t&&this._resolveProps(e),this.shadowRoot&&this._applyStyles(r),this._mount(e);},t=this._def.__asyncLoader;t?this._pendingResolve=t().then(t=>e(this._def=t,!0)):e(this._def);}_mount(e){this._app=this._createApp(e),e.configureApp&&e.configureApp(this._app),this._app._ceVNode=this._createVNode(),this._app.mount(this._root);let t=this._instance&&this._instance.exposed;if(t)for(let e in t)E(this,e)||Object.defineProperty(this,e,{get:()=>t$(t[e])});}_resolveProps(e){let{props:t}=e,n=w(t)?t:Object.keys(t||{});for(let e of Object.keys(this))"_"!==e[0]&&n.includes(e)&&this._setProp(e,this[e]);for(let e of n.map(H))Object.defineProperty(this,e,{get(){return this._getProp(e)},set(t){this._setProp(e,t,!0,!0);}});}_setAttr(e){if(e.startsWith("data-v-"))return;let t=this.hasAttribute(e),n=t?this.getAttribute(e):sH,l=H(e);t&&this._numberProps&&this._numberProps[l]&&(n=Y(n)),this._setProp(l,n,!1,!0);}_getProp(e){return this._props[e]}_setProp(e,t,n=!0,l=!1){t!==this._props[e]&&(t===sH?delete this._props[e]:(this._props[e]=t,"key"===e&&this._app&&(this._app._ceVNode.key=t)),l&&this._instance&&this._update(),n&&(!0===t?this.setAttribute(K(e),""):"string"==typeof t||"number"==typeof t?this.setAttribute(K(e),t+""):t||this.removeAttribute(K(e))));}_update(){o_(this._createVNode(),this._root);}_createVNode(){let e={};this.shadowRoot||(e.onVnodeMounted=e.onVnodeUpdated=this._renderSlots.bind(this));let t=iS(this._def,S(e,this._props));return this._instance||(t.ce=e=>{this._instance=e,e.ce=this,e.isCE=!0;let t=(e,t)=>{this.dispatchEvent(new CustomEvent(e,V(t[0])?S({detail:t},t[0]):{detail:t}));};e.emit=(e,...n)=>{t(e,n),K(e)!==e&&t(K(e),n);},this._setParent();}),t}_applyStyles(e,t){if(!e)return;if(t){if(t===this._def||this._styleChildren.has(t))return;this._styleChildren.add(t);}let n=this._nonce;for(let t=e.length-1;t>=0;t--){let l=document.createElement("style");n&&l.setAttribute("nonce",n),l.textContent=e[t],this.shadowRoot.prepend(l);}}_parseSlots(){let e;let t=this._slots={};for(;e=this.firstChild;){let n=1===e.nodeType&&e.getAttribute("slot")||"default";(t[n]||(t[n]=[])).push(e),this.removeChild(e);}}_renderSlots(){let e=(this._teleportTarget||this).querySelectorAll("slot"),t=this._instance.type.__scopeId;for(let n=0;n<e.length;n++){let l=e[n],r=l.getAttribute("name")||"default",i=this._slots[r],s=l.parentNode;if(i)for(let e of i){if(t&&1===e.nodeType){let n;let l=t+"-s",r=document.createTreeWalker(e,1);for(e.setAttribute(l,"");n=r.nextNode();)n.setAttribute(l,"");}s.insertBefore(e,l);}else for(;l.firstChild;)s.insertBefore(l.firstChild,l);s.removeChild(l);}}_injectChildStyle(e){this._applyStyles(e.styles,e);}_removeChildStyle(e){}}let sZ=/* @__PURE__ */new WeakMap,sY=/* @__PURE__ */new WeakMap,sQ=Symbol("_moveCb"),s0=Symbol("_enterCb");(t={name:"TransitionGroup",props:/* @__PURE__ */S({},sa,{tag:String,moveClass:String}),setup(e,{slots:t}){let n,l;let r=iD(),i=nj();return lx(()=>{if(!n.length)return;let t=e.moveClass||`${e.name||"v"}-move`;if(!function(e,t,n){let l=e.cloneNode(),r=e[ss];r&&r.forEach(e=>{e.split(/\s+/).forEach(e=>e&&l.classList.remove(e));}),n.split(/\s+/).forEach(e=>e&&l.classList.add(e)),l.style.display="none";let i=1===t.nodeType?t:t.parentNode;i.appendChild(l);let{hasTransform:s}=s_(l);return i.removeChild(l),s}(n[0].el,r.vnode.el,t))return;n.forEach(s2),n.forEach(s6);let l=n.filter(s8);sS(),l.forEach(e=>{let n=e.el,l=n.style;sd(n,t),l.transform=l.webkitTransform=l.transitionDuration="";let r=n[sQ]=e=>{(!e||e.target===n)&&(!e||/transform$/.test(e.propertyName))&&(n.removeEventListener("transitionend",r),n[sQ]=null,sh(n,t));};n.addEventListener("transitionend",r);});}),()=>{let s=tP(e),o=sp(s),a=s.tag||ie;if(n=[],l)for(let e=0;e<l.length;e++){let t=l[e];t.el&&t.el instanceof Element&&(n.push(t),nX(t,nq(t,o,i,r)),sZ.set(t,t.el.getBoundingClientRect()));}l=t.default?nZ(t.default()):[];for(let e=0;e<l.length;e++){let t=l[e];null!=t.key&&nX(t,nq(t,o,i,r));}return iS(a,null,l)}}},delete t.props.mode,t);function s2(e){let t=e.el;t[sQ]&&t[sQ](),t[s0]&&t[s0]();}function s6(e){sY.set(e,e.el.getBoundingClientRect());}function s8(e){let t=sZ.get(e),n=sY.get(e),l=t.left-n.left,r=t.top-n.top;if(l||r){let t=e.el.style;return t.transform=t.webkitTransform=`translate(${l}px,${r}px)`,t.transitionDuration="0s",e}}let s4=e=>{let t=e.props["onUpdate:modelValue"]||!1;return w(t)?e=>J(t,e):t};function s3(e){e.target.composing=!0;}function s5(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")));}let s9=Symbol("_assign"),s7={created(e,{modifiers:{lazy:t,trim:n,number:l}},r){e[s9]=s4(r);let i=l||r.props&&"number"===r.props.type;sD(e,t?"change":"input",t=>{if(t.target.composing)return;let l=e.value;n&&(l=l.trim()),i&&(l=Z(l)),e[s9](l);}),n&&sD(e,"change",()=>{e.value=e.value.trim();}),t||(sD(e,"compositionstart",s3),sD(e,"compositionend",s5),sD(e,"change",s5));},mounted(e,{value:t}){e.value=null==t?"":t;},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:l,trim:r,number:i}},s){if(e[s9]=s4(s),e.composing)return;let o=(i||"number"===e.type)&&!/^0\d/.test(e.value)?Z(e.value):e.value,a=null==t?"":t;o===a||document.activeElement===e&&"range"!==e.type&&(l&&t===n||r&&e.value.trim()===a)||(e.value=a);}};let oc=["ctrl","shift","alt","meta"],of={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&0!==e.button,middle:e=>"button"in e&&1!==e.button,right:e=>"button"in e&&2!==e.button,exact:(e,t)=>oc.some(n=>e[`${n}Key`]&&!t.includes(n))},op=(e,t)=>{let n=e._withMods||(e._withMods={}),l=t.join(".");return n[l]||(n[l]=(n,...l)=>{for(let e=0;e<t.length;e++){let l=of[t[e]];if(l&&l(n,t))return}return e(n,...l)})},og=/* @__PURE__ */S({patchProp:(e,t,n,l,r,i)=>{let s="svg"===r;"class"===t?function(e,t,n){let l=e[ss];l&&(t=(t?[t,...l]:[...l]).join(" ")),null==t?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t;}(e,l,s):"style"===t?function(e,t,n){let l=e.style,r=O(n),i=!1;if(n&&!r){if(t){if(O(t))for(let e of t.split(";")){let t=e.slice(0,e.indexOf(":")).trim();null==n[t]&&sO(l,t,"");}else for(let e in t)null==n[e]&&sO(l,e,"");}for(let e in n)"display"===e&&(i=!0),sO(l,e,n[e]);}else if(r){if(t!==n){let e=l[sk];e&&(n+=";"+e),l.cssText=n,i=sR.test(n);}}else t&&e.removeAttribute("style");sC in e&&(e[sC]=i?l.display:"",e[sx]&&(l.display="none"));}(e,n,l):y(t)?b(t)||function(e,t,n,l,r=null){let i=e[sF]||(e[sF]={}),s=i[t];if(l&&s)s.value=l;else {let[n,o]=function(e){let t;if(sV.test(e)){let n;for(t={};n=e.match(sV);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0;}return [":"===e[2]?e.slice(3):K(e.slice(2)),t]}(t);l?sD(e,n,i[t]=function(e,t){let n=e=>{if(e._vts){if(e._vts<=n.attached)return}else e._vts=Date.now();ne(function(e,t){if(!w(t))return t;{let n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0;},t.map(e=>t=>!t._stopped&&e&&e(t))}}(e,n.value),t,5,[e]);};return n.value=e,n.attached=sB(),n}(l,r),o):s&&(!function(e,t,n,l){e.removeEventListener(t,n,l);}(e,n,s,o),i[t]=void 0);}}(e,t,0,l,i):("."===t[0]?(t=t.slice(1),0):"^"===t[0]?(t=t.slice(1),1):!function(e,t,n,l){if(l)return !!("innerHTML"===t||"textContent"===t||t in e&&s$(t)&&N(n));if("spellcheck"===t||"draggable"===t||"translate"===t||"form"===t||"list"===t&&"INPUT"===e.tagName||"type"===t&&"TEXTAREA"===e.tagName)return !1;if("width"===t||"height"===t){let t=e.tagName;if("IMG"===t||"VIDEO"===t||"CANVAS"===t||"SOURCE"===t)return !1}return !(s$(t)&&O(n))&&!!(t in e||e._isVueCE&&(/[A-Z]/.test(t)||!O(n)))}(e,t,l,s))?("true-value"===t?e._trueValue=l:"false-value"===t&&(e._falseValue=l),sL(e,t,l,s)):(!function(e,t,n,l){if("innerHTML"===t||"textContent"===t){null!=n&&(e[t]="innerHTML"===t?st(n):n);return}let r=e.tagName;if("value"===t&&"PROGRESS"!==r&&!r.includes("-")){let l="OPTION"===r?e.getAttribute("value")||"":e.value,i=null==n?"checkbox"===e.type?"on":"":String(n);l===i&&"_value"in e||(e.value=i),null==n&&e.removeAttribute(t),e._value=n;return}let i=!1;if(""===n||null==n){let l=typeof e[t];if("boolean"===l){var s;n=!!(s=n)||""===s;}else null==n&&"string"===l?(n="",i=!0):"number"===l&&(n=0,i=!0);}try{e[t]=n;}catch(e){}i&&e.removeAttribute(t);}(e,t,l),e.tagName.includes("-")||"value"!==t&&"checked"!==t&&"selected"!==t||sL(e,t,l,s,i,"value"!==t));}},{insert:(e,t,n)=>{t.insertBefore(e,n||null);},remove:e=>{let t=e.parentNode;t&&t.removeChild(e);},createElement:(e,t,n,l)=>{let r="svg"===t?sn.createElementNS("http://www.w3.org/2000/svg",e):"mathml"===t?sn.createElementNS("http://www.w3.org/1998/Math/MathML",e):n?sn.createElement(e,{is:n}):sn.createElement(e);return "select"===e&&l&&null!=l.multiple&&r.setAttribute("multiple",l.multiple),r},createText:e=>sn.createTextNode(e),createComment:e=>sn.createComment(e),setText:(e,t)=>{e.nodeValue=t;},setElementText:(e,t)=>{e.textContent=t;},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>sn.querySelector(e),setScopeId(e,t){e.setAttribute(t,"");},insertStaticContent(e,t,n,l,r,i){let s=n?n.previousSibling:t.lastChild;if(r&&(r===i||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),n),r!==i&&(r=r.nextSibling););else {sl.innerHTML=st("svg"===l?`<svg>${e}</svg>`:"mathml"===l?`<math>${e}</math>`:e);let r=sl.content;if("svg"===l||"mathml"===l){let e=r.firstChild;for(;e.firstChild;)r.appendChild(e.firstChild);r.removeChild(e);}t.insertBefore(r,n);}return [s?s.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}});let o_=(...e)=>{(c||(c=rN(og))).render(...e);},ob=(...e)=>{let t=(c||(c=rN(og))).createApp(...e),{mount:n}=t;return t.mount=e=>{let l=ox(e);if(!l)return;let r=t._component;N(r)||r.render||r.template||(r.template=l.innerHTML),1===l.nodeType&&(l.textContent="");let i=n(l,!1,oC(l));return l instanceof Element&&(l.removeAttribute("v-cloak"),l.setAttribute("data-v-app","")),i},t};function oC(e){return e instanceof SVGElement?"svg":"function"==typeof MathMLElement&&e instanceof MathMLElement?"mathml":void 0}function ox(e){return O(e)?document.querySelector(e):e}

class ApiService {
    // 通用请求封装
    static async request(endpoint, method = 'GET', data = null, headers = {}) {
      const url = endpoint;
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      };
  
      // 如果是 POST 或 PUT 方法，传递 body 数据
      if (data) {
        options.body = JSON.stringify(data);
      }
  
      try {
        const response = await fetch(url, options);
  
        // 检查响应是否成功
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || '请求失败');
        }
  
        // 返回解析后的 JSON 数据
        return await response.json();
      } catch (error) {
        // 捕获并抛出错误
        console.error('请求失败:', error.message);
        throw error;
      }
    }
  
    // GET 请求封装
    static async get(endpoint, headers = {}) {
      return await this.request(endpoint, 'GET', null, headers);
    }
  
    // POST 请求封装
    static async post(endpoint, data, headers = {}) {
      return await this.request(endpoint, 'POST', data, headers);
    }
  
    // PUT 请求封装
    static async put(endpoint, data, headers = {}) {
      return await this.request(endpoint, 'PUT', data, headers);
    }
  
    // DELETE 请求封装
    static async delete(endpoint, headers = {}) {
      return await this.request(endpoint, 'DELETE', null, headers);
    }
  }

function pageByArticleIdApi(data) {
    return ApiService.post('/api/comment/pageByArticleId', data);
}

function pageByTopPid(data) {
    return ApiService.post('/api/comment/pageByTopPid', data);
}

function getLoginUserApi() {
    return ApiService.get('/api/getLoginUser');
}

function submitCommentApi(data) {
    return ApiService.post('/api/comment/submitComment', data);
}

function displayTime(data) {
    const timePublish = new Date(data);
    const timeNow = new Date();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30; // 继续使用30天的概念简化计算
    const diffValue = timeNow - timePublish;
  
    if (diffValue < 0) {
      return "刚刚发表";
    }
  
    const diffMonth = diffValue / month;
    const diffWeek = diffValue / week;
    const diffDay = diffValue / day;
    const diffHour = diffValue / hour;
    const diffMinute = diffValue / minute;
  
    let result;
  
    if (diffMonth >= 3) {
      result = `${timePublish.getFullYear()}-${(timePublish.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${timePublish
        .getDate()
        .toString()
        .padStart(2, '0')}`;
    } else if (diffMonth >= 1) {
      result = `${Math.floor(diffMonth)}月前`;
    } else if (diffWeek >= 1) {
      result = `${Math.floor(diffWeek)}周前`;
    } else if (diffDay >= 1) {
      result = `${Math.floor(diffDay)}天前`;
    } else if (diffHour >= 1) {
      result = `${Math.floor(diffHour)}小时前`;
    } else if (diffMinute >= 1) {
      result = `${Math.floor(diffMinute)}分钟前`;
    } else {
      result = "刚刚发表";
    }
  
    return result;
  }

function assertNonEmptyString (str) {
  if (typeof str !== 'string' || !str) {
    throw new Error('expected a non-empty string, got: ' + str)
  }
}

function assertNumber (number) {
  if (typeof number !== 'number') {
    throw new Error('expected a number, got: ' + number)
  }
}

const DB_VERSION_CURRENT = 1;
const DB_VERSION_INITIAL = 1;
const STORE_EMOJI = 'emoji';
const STORE_KEYVALUE = 'keyvalue';
const STORE_FAVORITES = 'favorites';
const FIELD_TOKENS = 'tokens';
const INDEX_TOKENS = 'tokens';
const FIELD_UNICODE = 'unicode';
const INDEX_COUNT = 'count';
const FIELD_GROUP = 'group';
const FIELD_ORDER = 'order';
const INDEX_GROUP_AND_ORDER = 'group-order';
const KEY_ETAG = 'eTag';
const KEY_URL = 'url';
const KEY_PREFERRED_SKINTONE = 'skinTone';
const MODE_READONLY = 'readonly';
const MODE_READWRITE = 'readwrite';
const INDEX_SKIN_UNICODE = 'skinUnicodes';
const FIELD_SKIN_UNICODE = 'skinUnicodes';

const DEFAULT_DATA_SOURCE$1 = 'https://cdn.jsdelivr.net/npm/emoji-picker-element-data@^1/en/emojibase/data.json';
const DEFAULT_LOCALE$1 = 'en';

// like lodash's uniqBy but much smaller
function uniqBy$1 (arr, func) {
  const set = new Set();
  const res = [];
  for (const item of arr) {
    const key = func(item);
    if (!set.has(key)) {
      set.add(key);
      res.push(item);
    }
  }
  return res
}

function uniqEmoji (emojis) {
  return uniqBy$1(emojis, _ => _.unicode)
}

function initialMigration (db) {
  function createObjectStore (name, keyPath, indexes) {
    const store = keyPath
      ? db.createObjectStore(name, { keyPath })
      : db.createObjectStore(name);
    if (indexes) {
      for (const [indexName, [keyPath, multiEntry]] of Object.entries(indexes)) {
        store.createIndex(indexName, keyPath, { multiEntry });
      }
    }
    return store
  }

  createObjectStore(STORE_KEYVALUE);
  createObjectStore(STORE_EMOJI, /* keyPath */ FIELD_UNICODE, {
    [INDEX_TOKENS]: [FIELD_TOKENS, /* multiEntry */ true],
    [INDEX_GROUP_AND_ORDER]: [[FIELD_GROUP, FIELD_ORDER]],
    [INDEX_SKIN_UNICODE]: [FIELD_SKIN_UNICODE, /* multiEntry */ true]
  });
  createObjectStore(STORE_FAVORITES, undefined, {
    [INDEX_COUNT]: ['']
  });
}

const openIndexedDBRequests = {};
const databaseCache = {};
const onCloseListeners = {};

function handleOpenOrDeleteReq (resolve, reject, req) {
  // These things are almost impossible to test with fakeIndexedDB sadly
  /* istanbul ignore next */
  req.onerror = () => reject(req.error);
  /* istanbul ignore next */
  req.onblocked = () => reject(new Error('IDB blocked'));
  req.onsuccess = () => resolve(req.result);
}

async function createDatabase (dbName) {
  const db = await new Promise((resolve, reject) => {
    const req = indexedDB.open(dbName, DB_VERSION_CURRENT);
    openIndexedDBRequests[dbName] = req;
    req.onupgradeneeded = e => {
      // Technically there is only one version, so we don't need this `if` check
      // But if an old version of the JS is in another browser tab
      // and it gets upgraded in the future and we have a new DB version, well...
      // better safe than sorry.
      /* istanbul ignore else */
      if (e.oldVersion < DB_VERSION_INITIAL) {
        initialMigration(req.result);
      }
    };
    handleOpenOrDeleteReq(resolve, reject, req);
  });
  // Handle abnormal closes, e.g. "delete database" in chrome dev tools.
  // No need for removeEventListener, because once the DB can no longer
  // fire "close" events, it will auto-GC.
  // Unfortunately cannot test in fakeIndexedDB: https://github.com/dumbmatter/fakeIndexedDB/issues/50
  /* istanbul ignore next */
  db.onclose = () => closeDatabase(dbName);
  return db
}

function openDatabase (dbName) {
  if (!databaseCache[dbName]) {
    databaseCache[dbName] = createDatabase(dbName);
  }
  return databaseCache[dbName]
}

function dbPromise (db, storeName, readOnlyOrReadWrite, cb) {
  return new Promise((resolve, reject) => {
    // Use relaxed durability because neither the emoji data nor the favorites/preferred skin tone
    // are really irreplaceable data. IndexedDB is just a cache in this case.
    const txn = db.transaction(storeName, readOnlyOrReadWrite, { durability: 'relaxed' });
    const store = typeof storeName === 'string'
      ? txn.objectStore(storeName)
      : storeName.map(name => txn.objectStore(name));
    let res;
    cb(store, txn, (result) => {
      res = result;
    });

    txn.oncomplete = () => resolve(res);
    /* istanbul ignore next */
    txn.onerror = () => reject(txn.error);
  })
}

function closeDatabase (dbName) {
  // close any open requests
  const req = openIndexedDBRequests[dbName];
  const db = req && req.result;
  if (db) {
    db.close();
    const listeners = onCloseListeners[dbName];
    /* istanbul ignore else */
    if (listeners) {
      for (const listener of listeners) {
        listener();
      }
    }
  }
  delete openIndexedDBRequests[dbName];
  delete databaseCache[dbName];
  delete onCloseListeners[dbName];
}

function deleteDatabase (dbName) {
  return new Promise((resolve, reject) => {
    // close any open requests
    closeDatabase(dbName);
    const req = indexedDB.deleteDatabase(dbName);
    handleOpenOrDeleteReq(resolve, reject, req);
  })
}

// The "close" event occurs during an abnormal shutdown, e.g. a user clearing their browser data.
// However, it doesn't occur with the normal "close" event, so we handle that separately.
// https://www.w3.org/TR/IndexedDB/#close-a-database-connection
function addOnCloseListener (dbName, listener) {
  let listeners = onCloseListeners[dbName];
  if (!listeners) {
    listeners = onCloseListeners[dbName] = [];
  }
  listeners.push(listener);
}

// list of emoticons that don't match a simple \W+ regex
// extracted using:
// require('emoji-picker-element-data/en/emojibase/data.json').map(_ => _.emoticon).filter(Boolean).filter(_ => !/^\W+$/.test(_))
const irregularEmoticons = new Set([
  ':D', 'XD', ":'D", 'O:)',
  ':X', ':P', ';P', 'XP',
  ':L', ':Z', ':j', '8D',
  'XO', '8)', ':B', ':O',
  ':S', ":'o", 'Dx', 'X(',
  'D:', ':C', '>0)', ':3',
  '</3', '<3', '\\M/', ':E',
  '8#'
]);

function extractTokens (str) {
  return str
    .split(/[\s_]+/)
    .map(word => {
      if (!word.match(/\w/) || irregularEmoticons.has(word)) {
        // for pure emoticons like :) or :-), just leave them as-is
        return word.toLowerCase()
      }

      return word
        .replace(/[)(:,]/g, '')
        .replace(/’/g, "'")
        .toLowerCase()
    }).filter(Boolean)
}

const MIN_SEARCH_TEXT_LENGTH$1 = 2;

// This is an extra step in addition to extractTokens(). The difference here is that we expect
// the input to have already been run through extractTokens(). This is useful for cases like
// emoticons, where we don't want to do any tokenization (because it makes no sense to split up
// ">:)" by the colon) but we do want to lowercase it to have consistent search results, so that
// the user can type ':P' or ':p' and still get the same result.
function normalizeTokens (str) {
  return str
    .filter(Boolean)
    .map(_ => _.toLowerCase())
    .filter(_ => _.length >= MIN_SEARCH_TEXT_LENGTH$1)
}

// Transform emoji data for storage in IDB
function transformEmojiData (emojiData) {
  const res = emojiData.map(({ annotation, emoticon, group, order, shortcodes, skins, tags, emoji, version }) => {
    const tokens = [...new Set(
      normalizeTokens([
        ...(shortcodes || []).map(extractTokens).flat(),
        ...(tags || []).map(extractTokens).flat(),
        ...extractTokens(annotation),
        emoticon
      ])
    )].sort();
    const res = {
      annotation,
      group,
      order,
      tags,
      tokens,
      unicode: emoji,
      version
    };
    if (emoticon) {
      res.emoticon = emoticon;
    }
    if (shortcodes) {
      res.shortcodes = shortcodes;
    }
    if (skins) {
      res.skinTones = [];
      res.skinUnicodes = [];
      res.skinVersions = [];
      for (const { tone, emoji, version } of skins) {
        res.skinTones.push(tone);
        res.skinUnicodes.push(emoji);
        res.skinVersions.push(version);
      }
    }
    return res
  });
  return res
}

// helper functions that help compress the code better

function callStore (store, method, key, cb) {
  store[method](key).onsuccess = e => (cb && cb(e.target.result));
}

function getIDB (store, key, cb) {
  callStore(store, 'get', key, cb);
}

function getAllIDB (store, key, cb) {
  callStore(store, 'getAll', key, cb);
}

function commit (txn) {
  /* istanbul ignore else */
  if (txn.commit) {
    txn.commit();
  }
}

// like lodash's minBy
function minBy (array, func) {
  let minItem = array[0];
  for (let i = 1; i < array.length; i++) {
    const item = array[i];
    if (func(minItem) > func(item)) {
      minItem = item;
    }
  }
  return minItem
}

// return an array of results representing all items that are found in each one of the arrays
//

function findCommonMembers (arrays, uniqByFunc) {
  const shortestArray = minBy(arrays, _ => _.length);
  const results = [];
  for (const item of shortestArray) {
    // if this item is included in every array in the intermediate results, add it to the final results
    if (!arrays.some(array => array.findIndex(_ => uniqByFunc(_) === uniqByFunc(item)) === -1)) {
      results.push(item);
    }
  }
  return results
}

async function isEmpty (db) {
  return !(await get(db, STORE_KEYVALUE, KEY_URL))
}

async function hasData (db, url, eTag) {
  const [oldETag, oldUrl] = await Promise.all([KEY_ETAG, KEY_URL]
    .map(key => get(db, STORE_KEYVALUE, key)));
  return (oldETag === eTag && oldUrl === url)
}

async function doFullDatabaseScanForSingleResult (db, predicate) {
  // This batching algorithm is just a perf improvement over a basic
  // cursor. The BATCH_SIZE is an estimate of what would give the best
  // perf for doing a full DB scan (worst case).
  //
  // Mini-benchmark for determining the best batch size:
  //
  // PERF=1 pnpm build:rollup && pnpm test:adhoc
  //
  // (async () => {
  //   performance.mark('start')
  //   await $('emoji-picker').database.getEmojiByShortcode('doesnotexist')
  //   performance.measure('total', 'start')
  //   console.log(performance.getEntriesByName('total').slice(-1)[0].duration)
  // })()
  const BATCH_SIZE = 50; // Typically around 150ms for 6x slowdown in Chrome for above benchmark
  return dbPromise(db, STORE_EMOJI, MODE_READONLY, (emojiStore, txn, cb) => {
    let lastKey;

    const processNextBatch = () => {
      emojiStore.getAll(lastKey && IDBKeyRange.lowerBound(lastKey, true), BATCH_SIZE).onsuccess = e => {
        const results = e.target.result;
        for (const result of results) {
          lastKey = result.unicode;
          if (predicate(result)) {
            return cb(result)
          }
        }
        if (results.length < BATCH_SIZE) {
          return cb()
        }
        processNextBatch();
      };
    };
    processNextBatch();
  })
}

async function loadData (db, emojiData, url, eTag) {
  try {
    const transformedData = transformEmojiData(emojiData);
    await dbPromise(db, [STORE_EMOJI, STORE_KEYVALUE], MODE_READWRITE, ([emojiStore, metaStore], txn) => {
      let oldETag;
      let oldUrl;
      let todo = 0;

      function checkFetched () {
        if (++todo === 2) { // 2 requests made
          onFetched();
        }
      }

      function onFetched () {
        if (oldETag === eTag && oldUrl === url) {
          // check again within the transaction to guard against concurrency, e.g. multiple browser tabs
          return
        }
        // delete old data
        emojiStore.clear();
        // insert new data
        for (const data of transformedData) {
          emojiStore.put(data);
        }
        metaStore.put(eTag, KEY_ETAG);
        metaStore.put(url, KEY_URL);
        commit(txn);
      }

      getIDB(metaStore, KEY_ETAG, result => {
        oldETag = result;
        checkFetched();
      });

      getIDB(metaStore, KEY_URL, result => {
        oldUrl = result;
        checkFetched();
      });
    });
  } finally {
  }
}

async function getEmojiByGroup (db, group) {
  return dbPromise(db, STORE_EMOJI, MODE_READONLY, (emojiStore, txn, cb) => {
    const range = IDBKeyRange.bound([group, 0], [group + 1, 0], false, true);
    getAllIDB(emojiStore.index(INDEX_GROUP_AND_ORDER), range, cb);
  })
}

async function getEmojiBySearchQuery (db, query) {
  const tokens = normalizeTokens(extractTokens(query));

  if (!tokens.length) {
    return []
  }

  return dbPromise(db, STORE_EMOJI, MODE_READONLY, (emojiStore, txn, cb) => {
    // get all results that contain all tokens (i.e. an AND query)
    const intermediateResults = [];

    const checkDone = () => {
      if (intermediateResults.length === tokens.length) {
        onDone();
      }
    };

    const onDone = () => {
      const results = findCommonMembers(intermediateResults, _ => _.unicode);
      cb(results.sort((a, b) => a.order < b.order ? -1 : 1));
    };

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const range = i === tokens.length - 1
        ? IDBKeyRange.bound(token, token + '\uffff', false, true) // treat last token as a prefix search
        : IDBKeyRange.only(token); // treat all other tokens as an exact match
      getAllIDB(emojiStore.index(INDEX_TOKENS), range, result => {
        intermediateResults.push(result);
        checkDone();
      });
    }
  })
}

// This could have been implemented as an IDB index on shortcodes, but it seemed wasteful to do that
// when we can already query by tokens and this will give us what we're looking for 99.9% of the time
async function getEmojiByShortcode (db, shortcode) {
  const emojis = await getEmojiBySearchQuery(db, shortcode);

  // In very rare cases (e.g. the shortcode "v" as in "v for victory"), we cannot search because
  // there are no usable tokens (too short in this case). In that case, we have to do an inefficient
  // full-database scan, which I believe is an acceptable tradeoff for not having to have an extra
  // index on shortcodes.

  if (!emojis.length) {
    const predicate = _ => ((_.shortcodes || []).includes(shortcode.toLowerCase()));
    return (await doFullDatabaseScanForSingleResult(db, predicate)) || null
  }

  return emojis.filter(_ => {
    const lowerShortcodes = (_.shortcodes || []).map(_ => _.toLowerCase());
    return lowerShortcodes.includes(shortcode.toLowerCase())
  })[0] || null
}

async function getEmojiByUnicode (db, unicode) {
  return dbPromise(db, STORE_EMOJI, MODE_READONLY, (emojiStore, txn, cb) => (
    getIDB(emojiStore, unicode, result => {
      if (result) {
        return cb(result)
      }
      getIDB(emojiStore.index(INDEX_SKIN_UNICODE), unicode, result => cb(result || null));
    })
  ))
}

function get (db, storeName, key) {
  return dbPromise(db, storeName, MODE_READONLY, (store, txn, cb) => (
    getIDB(store, key, cb)
  ))
}

function set (db, storeName, key, value) {
  return dbPromise(db, storeName, MODE_READWRITE, (store, txn) => {
    store.put(value, key);
    commit(txn);
  })
}

function incrementFavoriteEmojiCount (db, unicode) {
  return dbPromise(db, STORE_FAVORITES, MODE_READWRITE, (store, txn) => (
    getIDB(store, unicode, result => {
      store.put((result || 0) + 1, unicode);
      commit(txn);
    })
  ))
}

function getTopFavoriteEmoji (db, customEmojiIndex, limit) {
  if (limit === 0) {
    return []
  }
  return dbPromise(db, [STORE_FAVORITES, STORE_EMOJI], MODE_READONLY, ([favoritesStore, emojiStore], txn, cb) => {
    const results = [];
    favoritesStore.index(INDEX_COUNT).openCursor(undefined, 'prev').onsuccess = e => {
      const cursor = e.target.result;
      if (!cursor) { // no more results
        return cb(results)
      }

      function addResult (result) {
        results.push(result);
        if (results.length === limit) {
          return cb(results) // done, reached the limit
        }
        cursor.continue();
      }

      const unicodeOrName = cursor.primaryKey;
      const custom = customEmojiIndex.byName(unicodeOrName);
      if (custom) {
        return addResult(custom)
      }
      // This could be done in parallel (i.e. make the cursor and the get()s parallelized),
      // but my testing suggests it's not actually faster.
      getIDB(emojiStore, unicodeOrName, emoji => {
        if (emoji) {
          return addResult(emoji)
        }
        // emoji not found somehow, ignore (may happen if custom emoji change)
        cursor.continue();
      });
    };
  })
}

// trie data structure for prefix searches
// loosely based on https://github.com/nolanlawson/substring-trie

const CODA_MARKER = ''; // marks the end of the string

function trie (arr, itemToTokens) {
  const map = new Map();
  for (const item of arr) {
    const tokens = itemToTokens(item);
    for (const token of tokens) {
      let currentMap = map;
      for (let i = 0; i < token.length; i++) {
        const char = token.charAt(i);
        let nextMap = currentMap.get(char);
        if (!nextMap) {
          nextMap = new Map();
          currentMap.set(char, nextMap);
        }
        currentMap = nextMap;
      }
      let valuesAtCoda = currentMap.get(CODA_MARKER);
      if (!valuesAtCoda) {
        valuesAtCoda = [];
        currentMap.set(CODA_MARKER, valuesAtCoda);
      }
      valuesAtCoda.push(item);
    }
  }

  const search = (query, exact) => {
    let currentMap = map;
    for (let i = 0; i < query.length; i++) {
      const char = query.charAt(i);
      const nextMap = currentMap.get(char);
      if (nextMap) {
        currentMap = nextMap;
      } else {
        return []
      }
    }

    if (exact) {
      const results = currentMap.get(CODA_MARKER);
      return results || []
    }

    const results = [];
    // traverse
    const queue = [currentMap];
    while (queue.length) {
      const currentMap = queue.shift();
      const entriesSortedByKey = [...currentMap.entries()].sort((a, b) => a[0] < b[0] ? -1 : 1);
      for (const [key, value] of entriesSortedByKey) {
        if (key === CODA_MARKER) { // CODA_MARKER always comes first; it's the empty string
          results.push(...value);
        } else {
          queue.push(value);
        }
      }
    }
    return results
  };

  return search
}

const requiredKeys$1 = [
  'name',
  'url'
];

function assertCustomEmojis (customEmojis) {
  const isArray = customEmojis && Array.isArray(customEmojis);
  const firstItemIsFaulty = isArray &&
    customEmojis.length &&
    (!customEmojis[0] || requiredKeys$1.some(key => !(key in customEmojis[0])));
  if (!isArray || firstItemIsFaulty) {
    throw new Error('Custom emojis are in the wrong format')
  }
}

function customEmojiIndex (customEmojis) {
  assertCustomEmojis(customEmojis);

  const sortByName = (a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;

  //
  // all()
  //
  const all = customEmojis.sort(sortByName);

  //
  // search()
  //
  const emojiToTokens = emoji => {
    const set = new Set();
    if (emoji.shortcodes) {
      for (const shortcode of emoji.shortcodes) {
        for (const token of extractTokens(shortcode)) {
          set.add(token);
        }
      }
    }
    return set
  };
  const searchTrie = trie(customEmojis, emojiToTokens);
  const searchByExactMatch = _ => searchTrie(_, true);
  const searchByPrefix = _ => searchTrie(_, false);

  // Search by query for custom emoji. Similar to how we do this in IDB, the last token
  // is treated as a prefix search, but every other one is treated as an exact match.
  // Then we AND the results together
  const search = query => {
    const tokens = extractTokens(query);
    const intermediateResults = tokens.map((token, i) => (
      (i < tokens.length - 1 ? searchByExactMatch : searchByPrefix)(token)
    ));
    return findCommonMembers(intermediateResults, _ => _.name).sort(sortByName)
  };

  //
  // byShortcode, byName
  //
  const shortcodeToEmoji = new Map();
  const nameToEmoji = new Map();
  for (const customEmoji of customEmojis) {
    nameToEmoji.set(customEmoji.name.toLowerCase(), customEmoji);
    for (const shortcode of (customEmoji.shortcodes || [])) {
      shortcodeToEmoji.set(shortcode.toLowerCase(), customEmoji);
    }
  }

  const byShortcode = shortcode => shortcodeToEmoji.get(shortcode.toLowerCase());
  const byName = name => nameToEmoji.get(name.toLowerCase());

  return {
    all,
    search,
    byShortcode,
    byName
  }
}

const isFirefoxContentScript = typeof wrappedJSObject !== 'undefined';

// remove some internal implementation details, i.e. the "tokens" array on the emoji object
// essentially, convert the emoji from the version stored in IDB to the version used in-memory
function cleanEmoji (emoji) {
  if (!emoji) {
    return emoji
  }
  // if inside a Firefox content script, need to clone the emoji object to prevent Firefox from complaining about
  // cross-origin object. See: https://github.com/nolanlawson/emoji-picker-element/issues/356
  /* istanbul ignore if */
  if (isFirefoxContentScript) {
    emoji = structuredClone(emoji);
  }
  delete emoji.tokens;
  if (emoji.skinTones) {
    const len = emoji.skinTones.length;
    emoji.skins = Array(len);
    for (let i = 0; i < len; i++) {
      emoji.skins[i] = {
        tone: emoji.skinTones[i],
        unicode: emoji.skinUnicodes[i],
        version: emoji.skinVersions[i]
      };
    }
    delete emoji.skinTones;
    delete emoji.skinUnicodes;
    delete emoji.skinVersions;
  }
  return emoji
}

function warnETag (eTag) {
  if (!eTag) {
    console.warn('emoji-picker-element is more efficient if the dataSource server exposes an ETag header.');
  }
}

const requiredKeys = [
  'annotation',
  'emoji',
  'group',
  'order',
  'version'
];

function assertEmojiData (emojiData) {
  if (!emojiData ||
    !Array.isArray(emojiData) ||
    !emojiData[0] ||
    (typeof emojiData[0] !== 'object') ||
    requiredKeys.some(key => (!(key in emojiData[0])))) {
    throw new Error('Emoji data is in the wrong format')
  }
}

function assertStatus (response, dataSource) {
  if (Math.floor(response.status / 100) !== 2) {
    throw new Error('Failed to fetch: ' + dataSource + ':  ' + response.status)
  }
}

async function getETag (dataSource) {
  const response = await fetch(dataSource, { method: 'HEAD' });
  assertStatus(response, dataSource);
  const eTag = response.headers.get('etag');
  warnETag(eTag);
  return eTag
}

async function getETagAndData (dataSource) {
  const response = await fetch(dataSource);
  assertStatus(response, dataSource);
  const eTag = response.headers.get('etag');
  warnETag(eTag);
  const emojiData = await response.json();
  assertEmojiData(emojiData);
  return [eTag, emojiData]
}

// TODO: including these in blob-util.ts causes typedoc to generate docs for them,
// even with --excludePrivate ¯\_(ツ)_/¯
/** @private */
/**
 * Convert an `ArrayBuffer` to a binary string.
 *
 * Example:
 *
 * ```js
 * var myString = blobUtil.arrayBufferToBinaryString(arrayBuff)
 * ```
 *
 * @param buffer - array buffer
 * @returns binary string
 */
function arrayBufferToBinaryString(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var length = bytes.byteLength;
    var i = -1;
    while (++i < length) {
        binary += String.fromCharCode(bytes[i]);
    }
    return binary;
}
/**
 * Convert a binary string to an `ArrayBuffer`.
 *
 * ```js
 * var myBuffer = blobUtil.binaryStringToArrayBuffer(binaryString)
 * ```
 *
 * @param binary - binary string
 * @returns array buffer
 */
function binaryStringToArrayBuffer(binary) {
    var length = binary.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    var i = -1;
    while (++i < length) {
        arr[i] = binary.charCodeAt(i);
    }
    return buf;
}

// generate a checksum based on the stringified JSON
async function jsonChecksum (object) {
  const inString = JSON.stringify(object);
  let inBuffer = binaryStringToArrayBuffer(inString);

  // this does not need to be cryptographically secure, SHA-1 is fine
  const outBuffer = await crypto.subtle.digest('SHA-1', inBuffer);
  const outBinString = arrayBufferToBinaryString(outBuffer);
  const res = btoa(outBinString);
  return res
}

async function checkForUpdates (db, dataSource) {
  // just do a simple HEAD request first to see if the eTags match
  let emojiData;
  let eTag = await getETag(dataSource);
  if (!eTag) { // work around lack of ETag/Access-Control-Expose-Headers
    const eTagAndData = await getETagAndData(dataSource);
    eTag = eTagAndData[0];
    emojiData = eTagAndData[1];
    if (!eTag) {
      eTag = await jsonChecksum(emojiData);
    }
  }
  if (await hasData(db, dataSource, eTag)) ; else {
    if (!emojiData) {
      const eTagAndData = await getETagAndData(dataSource);
      emojiData = eTagAndData[1];
    }
    await loadData(db, emojiData, dataSource, eTag);
  }
}

async function loadDataForFirstTime (db, dataSource) {
  let [eTag, emojiData] = await getETagAndData(dataSource);
  if (!eTag) {
    // Handle lack of support for ETag or Access-Control-Expose-Headers
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers#Browser_compatibility
    eTag = await jsonChecksum(emojiData);
  }

  await loadData(db, emojiData, dataSource, eTag);
}

class Database {
  constructor ({ dataSource = DEFAULT_DATA_SOURCE$1, locale = DEFAULT_LOCALE$1, customEmoji = [] } = {}) {
    this.dataSource = dataSource;
    this.locale = locale;
    this._dbName = `emoji-picker-element-${this.locale}`;
    this._db = undefined;
    this._lazyUpdate = undefined;
    this._custom = customEmojiIndex(customEmoji);

    this._clear = this._clear.bind(this);
    this._ready = this._init();
  }

  async _init () {
    const db = this._db = await openDatabase(this._dbName);

    addOnCloseListener(this._dbName, this._clear);
    const dataSource = this.dataSource;
    const empty = await isEmpty(db);

    if (empty) {
      await loadDataForFirstTime(db, dataSource);
    } else { // offline-first - do an update asynchronously
      this._lazyUpdate = checkForUpdates(db, dataSource);
    }
  }

  async ready () {
    const checkReady = async () => {
      if (!this._ready) {
        this._ready = this._init();
      }
      return this._ready
    };
    await checkReady();
    // There's a possibility of a race condition where the element gets added, removed, and then added again
    // with a particular timing, which would set the _db to undefined.
    // We *could* do a while loop here, but that seems excessive and could lead to an infinite loop.
    if (!this._db) {
      await checkReady();
    }
  }

  async getEmojiByGroup (group) {
    assertNumber(group);
    await this.ready();
    return uniqEmoji(await getEmojiByGroup(this._db, group)).map(cleanEmoji)
  }

  async getEmojiBySearchQuery (query) {
    assertNonEmptyString(query);
    await this.ready();
    const customs = this._custom.search(query);
    const natives = uniqEmoji(await getEmojiBySearchQuery(this._db, query)).map(cleanEmoji);
    return [
      ...customs,
      ...natives
    ]
  }

  async getEmojiByShortcode (shortcode) {
    assertNonEmptyString(shortcode);
    await this.ready();
    const custom = this._custom.byShortcode(shortcode);
    if (custom) {
      return custom
    }
    return cleanEmoji(await getEmojiByShortcode(this._db, shortcode))
  }

  async getEmojiByUnicodeOrName (unicodeOrName) {
    assertNonEmptyString(unicodeOrName);
    await this.ready();
    const custom = this._custom.byName(unicodeOrName);
    if (custom) {
      return custom
    }
    return cleanEmoji(await getEmojiByUnicode(this._db, unicodeOrName))
  }

  async getPreferredSkinTone () {
    await this.ready();
    return (await get(this._db, STORE_KEYVALUE, KEY_PREFERRED_SKINTONE)) || 0
  }

  async setPreferredSkinTone (skinTone) {
    assertNumber(skinTone);
    await this.ready();
    return set(this._db, STORE_KEYVALUE, KEY_PREFERRED_SKINTONE, skinTone)
  }

  async incrementFavoriteEmojiCount (unicodeOrName) {
    assertNonEmptyString(unicodeOrName);
    await this.ready();
    return incrementFavoriteEmojiCount(this._db, unicodeOrName)
  }

  async getTopFavoriteEmoji (limit) {
    assertNumber(limit);
    await this.ready();
    return (await getTopFavoriteEmoji(this._db, this._custom, limit)).map(cleanEmoji)
  }

  set customEmoji (customEmojis) {
    this._custom = customEmojiIndex(customEmojis);
  }

  get customEmoji () {
    return this._custom.all
  }

  async _shutdown () {
    await this.ready(); // reopen if we've already been closed/deleted
    try {
      await this._lazyUpdate; // allow any lazy updates to process before closing/deleting
    } catch (err) { /* ignore network errors (offline-first) */ }
  }

  // clear references to IDB, e.g. during a close event
  _clear () {
    // We don't need to call removeEventListener or remove the manual "close" listeners.
    // The memory leak tests prove this is unnecessary. It's because:
    // 1) IDBDatabases that can no longer fire "close" automatically have listeners GCed
    // 2) we clear the manual close listeners in databaseLifecycle.js.
    this._db = this._ready = this._lazyUpdate = undefined;
  }

  async close () {
    await this._shutdown();
    await closeDatabase(this._dbName);
  }

  async delete () {
    await this._shutdown();
    await deleteDatabase(this._dbName);
  }
}

// via https://unpkg.com/browse/emojibase-data@6.0.0/meta/groups.json
const allGroups = [
  [-1, '✨', 'custom'],
  [0, '😀', 'smileys-emotion'],
  [1, '👋', 'people-body'],
  [3, '🐱', 'animals-nature'],
  [4, '🍎', 'food-drink'],
  [5, '🏠️', 'travel-places'],
  [6, '⚽', 'activities'],
  [7, '📝', 'objects'],
  [8, '⛔️', 'symbols'],
  [9, '🏁', 'flags']
].map(([id, emoji, name]) => ({ id, emoji, name }));

const groups = allGroups.slice(1);

const MIN_SEARCH_TEXT_LENGTH = 2;
const NUM_SKIN_TONES = 6;

/* istanbul ignore next */
const rIC = typeof requestIdleCallback === 'function' ? requestIdleCallback : setTimeout;

// check for ZWJ (zero width joiner) character
function hasZwj (emoji) {
  return emoji.unicode.includes('\u200d')
}

// Find one good representative emoji from each version to test by checking its color.
// Ideally it should have color in the center. For some inspiration, see:
// https://about.gitlab.com/blog/2018/05/30/journey-in-native-unicode-emoji/
//
// Note that for certain versions (12.1, 13.1), there is no point in testing them explicitly, because
// all the emoji from this version are compound-emoji from previous versions. So they would pass a color
// test, even in browsers that display them as double emoji. (E.g. "face in clouds" might render as
// "face without mouth" plus "fog".) These emoji can only be filtered using the width test,
// which happens in checkZwjSupport.js.
const versionsAndTestEmoji = {
  '🫨': 15.1, // shaking head, technically from v15 but see note above
  '🫠': 14,
  '🥲': 13.1, // smiling face with tear, technically from v13 but see note above
  '🥻': 12.1, // sari, technically from v12 but see note above
  '🥰': 11,
  '🤩': 5,
  '👱‍♀️': 4,
  '🤣': 3,
  '👁️‍🗨️': 2,
  '😀': 1,
  '😐️': 0.7,
  '😃': 0.6
};

const TIMEOUT_BEFORE_LOADING_MESSAGE = 1000; // 1 second
const DEFAULT_SKIN_TONE_EMOJI = '🖐️';
const DEFAULT_NUM_COLUMNS = 8;

// Based on https://fivethirtyeight.com/features/the-100-most-used-emojis/ and
// https://blog.emojipedia.org/facebook-reveals-most-and-least-used-emojis/ with
// a bit of my own curation. (E.g. avoid the "OK" gesture because of connotations:
// https://emojipedia.org/ok-hand/)
const MOST_COMMONLY_USED_EMOJI = [
  '😊',
  '😒',
  '❤️',
  '👍️',
  '😍',
  '😂',
  '😭',
  '☺️',
  '😔',
  '😩',
  '😏',
  '💕',
  '🙌',
  '😘'
];

// It's important to list Twemoji Mozilla before everything else, because Mozilla bundles their
// own font on some platforms (notably Windows and Linux as of this writing). Typically, Mozilla
// updates faster than the underlying OS, and we don't want to render older emoji in one font and
// newer emoji in another font:
// https://github.com/nolanlawson/emoji-picker-element/pull/268#issuecomment-1073347283
const FONT_FAMILY = '"Twemoji Mozilla","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol",' +
  '"Noto Color Emoji","EmojiOne Color","Android Emoji",sans-serif';

/* istanbul ignore next */
const DEFAULT_CATEGORY_SORTING = (a, b) => a < b ? -1 : a > b ? 1 : 0;

// Test if an emoji is supported by rendering it to canvas and checking that the color is not black
// See https://about.gitlab.com/blog/2018/05/30/journey-in-native-unicode-emoji/
// and https://www.npmjs.com/package/if-emoji for inspiration
// This implementation is largely borrowed from if-emoji, adding the font-family


const getTextFeature = (text, color) => {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;

  const ctx = canvas.getContext('2d', {
    // Improves the performance of `getImageData()`
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getContextAttributes#willreadfrequently
    willReadFrequently: true
  });
  ctx.textBaseline = 'top';
  ctx.font = `100px ${FONT_FAMILY}`;
  ctx.fillStyle = color;
  ctx.scale(0.01, 0.01);
  ctx.fillText(text, 0, 0);

  return ctx.getImageData(0, 0, 1, 1).data
};

const compareFeatures = (feature1, feature2) => {
  const feature1Str = [...feature1].join(',');
  const feature2Str = [...feature2].join(',');
  // This is RGBA, so for 0,0,0, we are checking that the first RGB is not all zeroes.
  // Most of the time when unsupported this is 0,0,0,0, but on Chrome on Mac it is
  // 0,0,0,61 - there is a transparency here.
  return feature1Str === feature2Str && !feature1Str.startsWith('0,0,0,')
};

function testColorEmojiSupported (text) {
  // Render white and black and then compare them to each other and ensure they're the same
  // color, and neither one is black. This shows that the emoji was rendered in color.
  const feature1 = getTextFeature(text, '#000');
  const feature2 = getTextFeature(text, '#fff');
  return feature1 && feature2 && compareFeatures(feature1, feature2)
}

// rather than check every emoji ever, which would be expensive, just check some representatives from the
// different emoji releases to determine what the font supports

function determineEmojiSupportLevel () {
  const entries = Object.entries(versionsAndTestEmoji);
  try {
    // start with latest emoji and work backwards
    for (const [emoji, version] of entries) {
      if (testColorEmojiSupported(emoji)) {
        return version
      }
    }
  } catch (e) { // canvas error
  } finally {
  }
  // In case of an error, be generous and just assume all emoji are supported (e.g. for canvas errors
  // due to anti-fingerprinting add-ons). Better to show some gray boxes than nothing at all.
  return entries[0][1] // first one in the list is the most recent version
}

// Check which emojis we know for sure aren't supported, based on Unicode version level
let promise;
const detectEmojiSupportLevel = () => {
  if (!promise) {
    // Delay so it can run while the IDB database is being created by the browser (on another thread).
    // This helps especially with first load – we want to start pre-populating the database on the main thread,
    // and then wait for IDB to commit everything, and while waiting we run this check.
    promise = new Promise(resolve => (
      rIC(() => (
        resolve(determineEmojiSupportLevel()) // delay so ideally this can run while IDB is first populating
      ))
    ));
  }
  return promise
};
// determine which emojis containing ZWJ (zero width joiner) characters
// are supported (rendered as one glyph) rather than unsupported (rendered as two or more glyphs)
const supportedZwjEmojis = new Map();

const VARIATION_SELECTOR = '\ufe0f';
const SKINTONE_MODIFIER = '\ud83c';
const ZWJ = '\u200d';
const LIGHT_SKIN_TONE = 0x1F3FB;
const LIGHT_SKIN_TONE_MODIFIER = 0xdffb;

// TODO: this is a naive implementation, we can improve it later
// It's only used for the skintone picker, so as long as people don't customize with
// really exotic emoji then it should work fine
function applySkinTone (str, skinTone) {
  if (skinTone === 0) {
    return str
  }
  const zwjIndex = str.indexOf(ZWJ);
  if (zwjIndex !== -1) {
    return str.substring(0, zwjIndex) +
      String.fromCodePoint(LIGHT_SKIN_TONE + skinTone - 1) +
      str.substring(zwjIndex)
  }
  if (str.endsWith(VARIATION_SELECTOR)) {
    str = str.substring(0, str.length - 1);
  }
  return str + SKINTONE_MODIFIER + String.fromCodePoint(LIGHT_SKIN_TONE_MODIFIER + skinTone - 1)
}

function halt (event) {
  event.preventDefault();
  event.stopPropagation();
}

// Implementation left/right or up/down navigation, circling back when you
// reach the start/end of the list
function incrementOrDecrement (decrement, val, arr) {
  val += (decrement ? -1 : 1);
  if (val < 0) {
    val = arr.length - 1;
  } else if (val >= arr.length) {
    val = 0;
  }
  return val
}

// like lodash's uniqBy but much smaller
function uniqBy (arr, func) {
  const set = new Set();
  const res = [];
  for (const item of arr) {
    const key = func(item);
    if (!set.has(key)) {
      set.add(key);
      res.push(item);
    }
  }
  return res
}

// We don't need all the data on every emoji, and there are specific things we need
// for the UI, so build a "view model" from the emoji object we got from the database

function summarizeEmojisForUI (emojis, emojiSupportLevel) {
  const toSimpleSkinsMap = skins => {
    const res = {};
    for (const skin of skins) {
      // ignore arrays like [1, 2] with multiple skin tones
      // also ignore variants that are in an unsupported emoji version
      // (these do exist - variants from a different version than their base emoji)
      if (typeof skin.tone === 'number' && skin.version <= emojiSupportLevel) {
        res[skin.tone] = skin.unicode;
      }
    }
    return res
  };

  return emojis.map(({ unicode, skins, shortcodes, url, name, category, annotation }) => ({
    unicode,
    name,
    shortcodes,
    url,
    category,
    annotation,
    id: unicode || name,
    skins: skins && toSimpleSkinsMap(skins)
  }))
}

// import rAF from one place so that the bundle size is a bit smaller
const rAF = requestAnimationFrame;

// "Svelte action"-like utility to detect layout changes via ResizeObserver.
// If ResizeObserver is unsupported, we just use rAF once and don't bother to update.


let resizeObserverSupported = typeof ResizeObserver === 'function';

function resizeObserverAction (node, abortSignal, onUpdate) {
  let resizeObserver;
  if (resizeObserverSupported) {
    resizeObserver = new ResizeObserver(onUpdate);
    resizeObserver.observe(node);
  } else { // just run once, don't bother trying to track it
    rAF(onUpdate);
  }

  // cleanup function (called on destroy)
  abortSignal.addEventListener('abort', () => {
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
  });
}

// get the width of the text inside of a DOM node, via https://stackoverflow.com/a/59525891/680742
function calculateTextWidth (node) {
  // skip running this in jest/vitest because we don't need to check for emoji support in that environment
  /* istanbul ignore else */
  {
    const range = document.createRange();
    range.selectNode(node.firstChild);
    return range.getBoundingClientRect().width
  }
}

let baselineEmojiWidth;

/**
 * Check if the given emojis containing ZWJ characters are supported by the current browser (don't render
 * as double characters) and return true if all are supported.
 * @param zwjEmojisToCheck
 * @param baselineEmoji
 * @param emojiToDomNode
 */
function checkZwjSupport (zwjEmojisToCheck, baselineEmoji, emojiToDomNode) {
  let allSupported = true;
  for (const emoji of zwjEmojisToCheck) {
    const domNode = emojiToDomNode(emoji);
    const emojiWidth = calculateTextWidth(domNode);
    if (typeof baselineEmojiWidth === 'undefined') { // calculate the baseline emoji width only once
      baselineEmojiWidth = calculateTextWidth(baselineEmoji);
    }
    // On Windows, some supported emoji are ~50% bigger than the baseline emoji, but what we really want to guard
    // against are the ones that are 2x the size, because those are truly broken (person with red hair = person with
    // floating red wig, black cat = cat with black square, polar bear = bear with snowflake, etc.)
    // So here we set the threshold at 1.8 times the size of the baseline emoji.
    const supported = emojiWidth / 1.8 < baselineEmojiWidth;
    supportedZwjEmojis.set(emoji.unicode, supported);

    if (!supported) {
      allSupported = false;
    }
  }
  return allSupported
}

// like lodash's uniq

function uniq (arr) {
  return uniqBy(arr, _ => _)
}

// Note we put this in its own function outside Picker.js to avoid Svelte doing an invalidation on the "setter" here.
// At best the invalidation is useless, at worst it can cause infinite loops:
// https://github.com/nolanlawson/emoji-picker-element/pull/180
// https://github.com/sveltejs/svelte/issues/6521
// Also note tabpanelElement can be null if the element is disconnected immediately after connected
function resetScrollTopIfPossible (element) {
  /* istanbul ignore else */
  if (element) { // Makes me nervous not to have this `if` guard
    element.scrollTop = 0;
  }
}

function getFromMap (cache, key, func) {
  let cached = cache.get(key);
  if (!cached) {
    cached = func();
    cache.set(key, cached);
  }
  return cached
}

function toString (value) {
  return '' + value
}

function parseTemplate (htmlString) {
  const template = document.createElement('template');
  template.innerHTML = htmlString;
  return template
}

const parseCache = new WeakMap();
const domInstancesCache = new WeakMap();
// This needs to be a symbol because it needs to be different from any possible output of a key function
const unkeyedSymbol = Symbol('un-keyed');

// Not supported in Safari <=13
const hasReplaceChildren = 'replaceChildren' in Element.prototype;
function replaceChildren (parentNode, newChildren) {
  /* istanbul ignore else */
  if (hasReplaceChildren) {
    parentNode.replaceChildren(...newChildren);
  } else { // minimal polyfill for Element.prototype.replaceChildren
    parentNode.innerHTML = '';
    parentNode.append(...newChildren);
  }
}

function doChildrenNeedRerender (parentNode, newChildren) {
  let oldChild = parentNode.firstChild;
  let oldChildrenCount = 0;
  // iterate using firstChild/nextSibling because browsers use a linked list under the hood
  while (oldChild) {
    const newChild = newChildren[oldChildrenCount];
    // check if the old child and new child are the same
    if (newChild !== oldChild) {
      return true
    }
    oldChild = oldChild.nextSibling;
    oldChildrenCount++;
  }
  // if new children length is different from old, we must re-render
  return oldChildrenCount !== newChildren.length
}

function patchChildren (newChildren, instanceBinding) {
  const { targetNode } = instanceBinding;
  let { targetParentNode } = instanceBinding;

  let needsRerender = false;

  if (targetParentNode) { // already rendered once
    needsRerender = doChildrenNeedRerender(targetParentNode, newChildren);
  } else { // first render of list
    needsRerender = true;
    instanceBinding.targetNode = undefined; // placeholder node not needed anymore, free memory
    instanceBinding.targetParentNode = targetParentNode = targetNode.parentNode;
  }
  // avoid re-rendering list if the dom nodes are exactly the same before and after
  if (needsRerender) {
    replaceChildren(targetParentNode, newChildren);
  }
}

function patch (expressions, instanceBindings) {
  for (const instanceBinding of instanceBindings) {
    const {
      targetNode,
      currentExpression,
      binding: {
        expressionIndex,
        attributeName,
        attributeValuePre,
        attributeValuePost
      }
    } = instanceBinding;

    const expression = expressions[expressionIndex];

    if (currentExpression === expression) {
      // no need to update, same as before
      continue
    }

    instanceBinding.currentExpression = expression;

    if (attributeName) { // attribute replacement
      targetNode.setAttribute(attributeName, attributeValuePre + toString(expression) + attributeValuePost);
    } else { // text node / child element / children replacement
      let newNode;
      if (Array.isArray(expression)) { // array of DOM elements produced by tag template literals
        patchChildren(expression, instanceBinding);
      } else if (expression instanceof Element) { // html tag template returning a DOM element
        newNode = expression;
        targetNode.replaceWith(newNode);
      } else { // primitive - string, number, etc
        // nodeValue is faster than textContent supposedly https://www.youtube.com/watch?v=LY6y3HbDVmg
        // note we may be replacing the value in a placeholder text node
        targetNode.nodeValue = toString(expression);
      }
      if (newNode) {
        instanceBinding.targetNode = newNode;
      }
    }
  }
}

function parse (tokens) {
  let htmlString = '';

  let withinTag = false;
  let withinAttribute = false;
  let elementIndexCounter = -1; // depth-first traversal order

  const elementsToBindings = new Map();
  const elementIndexes = [];

  for (let i = 0, len = tokens.length; i < len; i++) {
    const token = tokens[i];
    htmlString += token;

    if (i === len - 1) {
      break // no need to process characters - no more expressions to be found
    }

    for (let j = 0; j < token.length; j++) {
      const char = token.charAt(j);
      switch (char) {
        case '<': {
          const nextChar = token.charAt(j + 1);
          if (nextChar === '/') { // closing tag
            // leaving an element
            elementIndexes.pop();
          } else { // not a closing tag
            withinTag = true;
            elementIndexes.push(++elementIndexCounter);
          }
          break
        }
        case '>': {
          withinTag = false;
          withinAttribute = false;
          break
        }
        case '=': {
          withinAttribute = true;
          break
        }
      }
    }

    const elementIndex = elementIndexes[elementIndexes.length - 1];
    const bindings = getFromMap(elementsToBindings, elementIndex, () => []);

    let attributeName;
    let attributeValuePre;
    let attributeValuePost;
    if (withinAttribute) {
      // I never use single-quotes for attribute values in HTML, so just support double-quotes or no-quotes
      const match = /(\S+)="?([^"=]*)$/.exec(token);
      attributeName = match[1];
      attributeValuePre = match[2];
      attributeValuePost = /^[^">]*/.exec(tokens[i + 1])[0];
    }

    const binding = {
      attributeName,
      attributeValuePre,
      attributeValuePost,
      expressionIndex: i
    };

    bindings.push(binding);

    if (!withinTag && !withinAttribute) {
      // Add a placeholder text node, so we can find it later. Note we only support one dynamic child text node
      htmlString += ' ';
    }
  }

  const template = parseTemplate(htmlString);

  return {
    template,
    elementsToBindings
  }
}

function traverseAndSetupBindings (dom, elementsToBindings) {
  const instanceBindings = [];
  // traverse dom
  const treeWalker = document.createTreeWalker(dom, NodeFilter.SHOW_ELEMENT);

  let element = dom;
  let elementIndex = -1;
  do {
    const bindings = elementsToBindings.get(++elementIndex);
    if (bindings) {
      for (let i = 0; i < bindings.length; i++) {
        const binding = bindings[i];

        const targetNode = binding.attributeName
          ? element // attribute binding, just use the element itself
          : element.firstChild; // not an attribute binding, so has a placeholder text node

        const instanceBinding = {
          binding,
          targetNode,
          targetParentNode: undefined,
          currentExpression: undefined
        };

        instanceBindings.push(instanceBinding);
      }
    }
  } while ((element = treeWalker.nextNode()))

  return instanceBindings
}

function parseHtml (tokens) {
  // All templates and bound expressions are unique per tokens array
  const { template, elementsToBindings } = getFromMap(parseCache, tokens, () => parse(tokens));

  // When we parseHtml, we always return a fresh DOM instance ready to be updated
  const dom = template.cloneNode(true).content.firstElementChild;
  const instanceBindings = traverseAndSetupBindings(dom, elementsToBindings);

  return function updateDomInstance (expressions) {
    patch(expressions, instanceBindings);
    return dom
  }
}

function createFramework (state) {
  const domInstances = getFromMap(domInstancesCache, state, () => new Map());
  let domInstanceCacheKey = unkeyedSymbol;

  function html (tokens, ...expressions) {
    // Each unique lexical usage of map() is considered unique due to the html`` tagged template call it makes,
    // which has lexically unique tokens. The unkeyed symbol is just used for html`` usage outside of a map().
    const domInstancesForTokens = getFromMap(domInstances, tokens, () => new Map());
    const updateDomInstance = getFromMap(domInstancesForTokens, domInstanceCacheKey, () => parseHtml(tokens));

    return updateDomInstance(expressions) // update with expressions
  }

  function map (array, callback, keyFunction) {
    return array.map((item, index) => {
      const originalCacheKey = domInstanceCacheKey;
      domInstanceCacheKey = keyFunction(item);
      try {
        return callback(item, index)
      } finally {
        domInstanceCacheKey = originalCacheKey;
      }
    })
  }

  return { map, html }
}

function render (container, state, helpers, events, actions, refs, abortSignal, actionContext, firstRender) {
  const { labelWithSkin, titleForEmoji, unicodeWithSkin } = helpers;
  const { html, map } = createFramework(state);

  function emojiList (emojis, searchMode, prefix) {
    return map(emojis, (emoji, i) => {
      return html`<button role="${searchMode ? 'option' : 'menuitem'}" aria-selected="${searchMode ? i === state.activeSearchItem : ''}" aria-label="${labelWithSkin(emoji, state.currentSkinTone)}" title="${titleForEmoji(emoji)}" class="${
                'emoji' +
                (searchMode && i === state.activeSearchItem ? ' active' : '') +
                (emoji.unicode ? '' : ' custom-emoji')
              }" id="${`${prefix}-${emoji.id}`}" style="${emoji.unicode ? '' : `--custom-emoji-background: url(${JSON.stringify(emoji.url)})`}">${
        emoji.unicode
          ? unicodeWithSkin(emoji, state.currentSkinTone)
          : ''
      }</button>`
      // It's important for the cache key to be unique based on the prefix, because the framework caches based on the
      // unique tokens + cache key, and the same emoji may be used in the tab as well as in the fav bar
    }, emoji => `${prefix}-${emoji.id}`)
  }

  const section = () => {
    return html`<section data-ref="rootElement" class="picker" aria-label="${state.i18n.regionLabel}" style="${state.pickerStyle}"><div class="pad-top"></div><div class="search-row"><div class="search-wrapper"><input id="search" class="search" type="search" role="combobox" enterkeyhint="search" placeholder="${state.i18n.searchLabel}" autocapitalize="none" autocomplete="off" spellcheck="true" aria-expanded="${!!(state.searchMode && state.currentEmojis.length)}" aria-controls="search-results" aria-describedby="search-description" aria-autocomplete="list" aria-activedescendant="${state.activeSearchItemId ? `emo-${state.activeSearchItemId}` : ''}" data-ref="searchElement" data-on-input="onSearchInput" data-on-keydown="onSearchKeydown"><label class="sr-only" for="search">${state.i18n.searchLabel}</label> <span id="search-description" class="sr-only">${state.i18n.searchDescription}</span></div><div class="skintone-button-wrapper ${state.skinTonePickerExpandedAfterAnimation ? 'expanded' : ''}"><button id="skintone-button" class="emoji ${state.skinTonePickerExpanded ? 'hide-focus' : ''}" aria-label="${state.skinToneButtonLabel}" title="${state.skinToneButtonLabel}" aria-describedby="skintone-description" aria-haspopup="listbox" aria-expanded="${state.skinTonePickerExpanded}" aria-controls="skintone-list" data-on-click="onClickSkinToneButton">${state.skinToneButtonText}</button></div><span id="skintone-description" class="sr-only">${state.i18n.skinToneDescription}</span><div data-ref="skinToneDropdown" id="skintone-list" class="skintone-list hide-focus ${state.skinTonePickerExpanded ? '' : 'hidden no-animate'}" style="transform:translateY(${state.skinTonePickerExpanded ? 0 : 'calc(-1 * var(--num-skintones) * var(--total-emoji-size))'})" role="listbox" aria-label="${state.i18n.skinTonesLabel}" aria-activedescendant="skintone-${state.activeSkinTone}" aria-hidden="${!state.skinTonePickerExpanded}" tabIndex="-1" data-on-focusout="onSkinToneOptionsFocusOut" data-on-click="onSkinToneOptionsClick" data-on-keydown="onSkinToneOptionsKeydown" data-on-keyup="onSkinToneOptionsKeyup">${
    map(state.skinTones, (skinTone, i) => {
    return html`<div id="skintone-${i}" class="emoji ${i === state.activeSkinTone ? 'active' : ''}" aria-selected="${i === state.activeSkinTone}" role="option" title="${state.i18n.skinTones[i]}" aria-label="${state.i18n.skinTones[i]}">${skinTone}</div>`
    }, skinTone => skinTone)
        }</div></div><div class="nav" role="tablist" style="grid-template-columns:repeat(${state.groups.length},1fr)" aria-label="${state.i18n.categoriesLabel}" data-on-keydown="onNavKeydown" data-on-click="onNavClick">${
            map(state.groups, (group) => {
              return html`<button role="tab" class="nav-button" aria-controls="tab-${group.id}" aria-label="${state.i18n.categories[group.name]}" aria-selected="${!state.searchMode && state.currentGroup.id === group.id}" title="${state.i18n.categories[group.name]}" data-group-id="${group.id}"><div class="nav-emoji emoji">${group.emoji}</div></button>`
            }, group => group.id)
          }</div><div class="indicator-wrapper"><div class="indicator" style="transform:translateX(${(/* istanbul ignore next */ (state.isRtl ? -1 : 1)) * state.currentGroupIndex * 100}%)"></div></div><div class="message ${state.message ? '' : 'gone'}" role="alert" aria-live="polite">${state.message}</div><div data-ref="tabpanelElement" class="tabpanel ${(!state.databaseLoaded || state.message) ? 'gone' : ''}" role="${state.searchMode ? 'region' : 'tabpanel'}" aria-label="${state.searchMode ? state.i18n.searchResultsLabel : state.i18n.categories[state.currentGroup.name]}" id="${state.searchMode ? '' : `tab-${state.currentGroup.id}`}" tabIndex="0" data-on-click="onEmojiClick"><div data-action="calculateEmojiGridStyle">${
              map(state.currentEmojisWithCategories, (emojiWithCategory, i) => {
                return html`<div><div id="menu-label-${i}" class="category ${state.currentEmojisWithCategories.length === 1 && state.currentEmojisWithCategories[0].category === '' ? 'gone' : ''}" aria-hidden="true">${
                  state.searchMode
                    ? state.i18n.searchResultsLabel
                    : (
                      emojiWithCategory.category
                        ? emojiWithCategory.category
                        : (
                          state.currentEmojisWithCategories.length > 1
                            ? state.i18n.categories.custom
                            : state.i18n.categories[state.currentGroup.name]
                        )
                    )
                }</div><div class="emoji-menu ${i !== 0 && !state.searchMode && state.currentGroup.id === -1 ? 'visibility-auto' : ''}" style="${`--num-rows: ${Math.ceil(emojiWithCategory.emojis.length / state.numColumns)}`}" data-action="updateOnIntersection" role="${state.searchMode ? 'listbox' : 'menu'}" aria-labelledby="menu-label-${i}" id="${state.searchMode ? 'search-results' : ''}">${
              emojiList(emojiWithCategory.emojis, state.searchMode, /* prefix */ 'emo')
            }</div></div>`
              }, emojiWithCategory => emojiWithCategory.category)
            }</div></div><div class="favorites onscreen emoji-menu ${state.message ? 'gone' : ''}" role="menu" aria-label="${state.i18n.favoritesLabel}" data-on-click="onEmojiClick">${
            emojiList(state.currentFavorites, /* searchMode */ false, /* prefix */ 'fav')
          }</div><button data-ref="baselineEmoji" aria-hidden="true" tabindex="-1" class="abs-pos hidden emoji baseline-emoji">😀</button></section>`
  };

  const rootDom = section();

  // helper for traversing the dom, finding elements by an attribute, and getting the attribute value
  const forElementWithAttribute = (attributeName, callback) => {
    for (const element of container.querySelectorAll(`[${attributeName}]`)) {
      callback(element, element.getAttribute(attributeName));
    }
  };

  if (firstRender) { // not a re-render
    container.appendChild(rootDom);

    // we only bind events/refs once - there is no need to find them again given this component structure

    // bind events
    for (const eventName of ['click', 'focusout', 'input', 'keydown', 'keyup']) {
      forElementWithAttribute(`data-on-${eventName}`, (element, listenerName) => {
        element.addEventListener(eventName, events[listenerName]);
      });
    }

    // find refs
    forElementWithAttribute('data-ref', (element, ref) => {
      refs[ref] = element;
    });

    // destroy/abort logic
    abortSignal.addEventListener('abort', () => {
      container.removeChild(rootDom);
    });
  }

  // set up actions - these are re-bound on every render
  forElementWithAttribute('data-action', (element, action) => {
    let boundActions = actionContext.get(action);
    if (!boundActions) {
      actionContext.set(action, (boundActions = new WeakSet()));
    }

    // avoid applying the same action to the same element multiple times
    if (!boundActions.has(element)) {
      boundActions.add(element);
      actions[action](element);
    }
  });
}

/* istanbul ignore next */
const qM = typeof queueMicrotask === 'function' ? queueMicrotask : callback => Promise.resolve().then(callback);

function createState (abortSignal) {
  let destroyed = false;
  let currentObserver;

  const propsToObservers = new Map();
  const dirtyObservers = new Set();

  let queued;

  const flush = () => {
    if (destroyed) {
      return
    }
    const observersToRun = [...dirtyObservers];
    dirtyObservers.clear(); // clear before running to force any new updates to run in another tick of the loop
    try {
      for (const observer of observersToRun) {
        observer();
      }
    } finally {
      queued = false;
      if (dirtyObservers.size) { // new updates, queue another one
        queued = true;
        qM(flush);
      }
    }
  };

  const state = new Proxy({}, {
    get (target, prop) {
      if (currentObserver) {
        let observers = propsToObservers.get(prop);
        if (!observers) {
          observers = new Set();
          propsToObservers.set(prop, observers);
        }
        observers.add(currentObserver);
      }
      return target[prop]
    },
    set (target, prop, newValue) {
      if (target[prop] !== newValue) {
        target[prop] = newValue;
        const observers = propsToObservers.get(prop);
        if (observers) {
          for (const observer of observers) {
            dirtyObservers.add(observer);
          }
          if (!queued) {
            queued = true;
            qM(flush);
          }
        }
      }
      return true
    }
  });

  const createEffect = (callback) => {
    const runnable = () => {
      const oldObserver = currentObserver;
      currentObserver = runnable;
      try {
        return callback()
      } finally {
        currentObserver = oldObserver;
      }
    };
    return runnable()
  };

  // destroy logic
  abortSignal.addEventListener('abort', () => {
    destroyed = true;
  });

  return {
    state,
    createEffect
  }
}

// Compare two arrays, with a function called on each item in the two arrays that returns true if the items are equal
function arraysAreEqualByFunction (left, right, areEqualFunc) {
  if (left.length !== right.length) {
    return false
  }
  for (let i = 0; i < left.length; i++) {
    if (!areEqualFunc(left[i], right[i])) {
      return false
    }
  }
  return true
}

const intersectionObserverCache = new WeakMap();

function intersectionObserverAction (node, abortSignal, listener) {
  /* istanbul ignore else */
  {
    // The scroll root is always `.tabpanel`
    const root = node.closest('.tabpanel');

    let observer = intersectionObserverCache.get(root);
    if (!observer) {
      // TODO: replace this with the contentvisibilityautostatechange event when all supported browsers support it.
      // For now we use IntersectionObserver because it has better cross-browser support, and it would be bad for
      // old Safari versions if they eagerly downloaded all custom emoji all at once.
      observer = new IntersectionObserver(listener, {
        root,
        // trigger if we are 1/2 scroll container height away so that the images load a bit quicker while scrolling
        rootMargin: '50% 0px 50% 0px',
        // trigger if any part of the emoji grid is intersecting
        threshold: 0
      });

      // avoid creating a new IntersectionObserver for every category; just use one for the whole root
      intersectionObserverCache.set(root, observer);

      // assume that the abortSignal is always the same for this root node; just add one event listener
      abortSignal.addEventListener('abort', () => {
        observer.disconnect();
      });
    }

    observer.observe(node);
  }
}

/* eslint-disable prefer-const,no-labels,no-inner-declarations */

// constants
const EMPTY_ARRAY = [];

const { assign } = Object;

function createRoot (shadowRoot, props) {
  const refs = {};
  const abortController = new AbortController();
  const abortSignal = abortController.signal;
  const { state, createEffect } = createState(abortSignal);
  const actionContext = new Map();

  // initial state
  assign(state, {
    skinToneEmoji: undefined,
    i18n: undefined,
    database: undefined,
    customEmoji: undefined,
    customCategorySorting: undefined,
    emojiVersion: undefined
  });

  // public props
  assign(state, props);

  // private props
  assign(state, {
    initialLoad: true,
    currentEmojis: [],
    currentEmojisWithCategories: [],
    rawSearchText: '',
    searchText: '',
    searchMode: false,
    activeSearchItem: -1,
    message: undefined,
    skinTonePickerExpanded: false,
    skinTonePickerExpandedAfterAnimation: false,
    currentSkinTone: 0,
    activeSkinTone: 0,
    skinToneButtonText: undefined,
    pickerStyle: undefined,
    skinToneButtonLabel: '',
    skinTones: [],
    currentFavorites: [],
    defaultFavoriteEmojis: undefined,
    numColumns: DEFAULT_NUM_COLUMNS,
    isRtl: false,
    currentGroupIndex: 0,
    groups: groups,
    databaseLoaded: false,
    activeSearchItemId: undefined
  });

  //
  // Update the current group based on the currentGroupIndex
  //
  createEffect(() => {
    if (state.currentGroup !== state.groups[state.currentGroupIndex]) {
      state.currentGroup = state.groups[state.currentGroupIndex];
    }
  });

  //
  // Utils/helpers
  //

  const focus = id => {
    shadowRoot.getElementById(id).focus();
  };

  const emojiToDomNode = emoji => shadowRoot.getElementById(`emo-${emoji.id}`);

  // fire a custom event that crosses the shadow boundary
  const fireEvent = (name, detail) => {
    refs.rootElement.dispatchEvent(new CustomEvent(name, {
      detail,
      bubbles: true,
      composed: true
    }));
  };

  //
  // Comparison utils
  //

  const compareEmojiArrays = (a, b) => a.id === b.id;

  const compareCurrentEmojisWithCategories = (a, b) => {
    const { category: aCategory, emojis: aEmojis } = a;
    const { category: bCategory, emojis: bEmojis } = b;

    if (aCategory !== bCategory) {
      return false
    }

    return arraysAreEqualByFunction(aEmojis, bEmojis, compareEmojiArrays)
  };

  //
  // Update utils to avoid excessive re-renders
  //

  // avoid excessive re-renders by checking the value before setting
  const updateCurrentEmojis = (newEmojis) => {
    if (!arraysAreEqualByFunction(state.currentEmojis, newEmojis, compareEmojiArrays)) {
      state.currentEmojis = newEmojis;
    }
  };

  // avoid excessive re-renders
  const updateSearchMode = (newSearchMode) => {
    if (state.searchMode !== newSearchMode) {
      state.searchMode = newSearchMode;
    }
  };

  // avoid excessive re-renders
  const updateCurrentEmojisWithCategories = (newEmojisWithCategories) => {
    if (!arraysAreEqualByFunction(state.currentEmojisWithCategories, newEmojisWithCategories, compareCurrentEmojisWithCategories)) {
      state.currentEmojisWithCategories = newEmojisWithCategories;
    }
  };

  // Helpers used by PickerTemplate

  const unicodeWithSkin = (emoji, currentSkinTone) => (
    (currentSkinTone && emoji.skins && emoji.skins[currentSkinTone]) || emoji.unicode
  );

  const labelWithSkin = (emoji, currentSkinTone) => (
    uniq([
      (emoji.name || unicodeWithSkin(emoji, currentSkinTone)),
      emoji.annotation,
      ...(emoji.shortcodes || EMPTY_ARRAY)
    ].filter(Boolean)).join(', ')
  );

  const titleForEmoji = (emoji) => (
    emoji.annotation || (emoji.shortcodes || EMPTY_ARRAY).join(', ')
  );

  const helpers = {
    labelWithSkin, titleForEmoji, unicodeWithSkin
  };
  const events = {
    onClickSkinToneButton,
    onEmojiClick,
    onNavClick,
    onNavKeydown,
    onSearchKeydown,
    onSkinToneOptionsClick,
    onSkinToneOptionsFocusOut,
    onSkinToneOptionsKeydown,
    onSkinToneOptionsKeyup,
    onSearchInput
  };
  const actions = {
    calculateEmojiGridStyle,
    updateOnIntersection
  };

  let firstRender = true;
  createEffect(() => {
    render(shadowRoot, state, helpers, events, actions, refs, abortSignal, actionContext, firstRender);
    firstRender = false;
  });

  //
  // Determine the emoji support level (in requestIdleCallback)
  //

  // mount logic
  if (!state.emojiVersion) {
    detectEmojiSupportLevel().then(level => {
      // Can't actually test emoji support in Jest/Vitest/JSDom, emoji never render in color in Cairo
      /* istanbul ignore next */
      if (!level) {
        state.message = state.i18n.emojiUnsupportedMessage;
      }
    });
  }

  //
  // Set or update the database object
  //

  createEffect(() => {
    // show a Loading message if it takes a long time, or show an error if there's a network/IDB error
    async function handleDatabaseLoading () {
      let showingLoadingMessage = false;
      const timeoutHandle = setTimeout(() => {
        showingLoadingMessage = true;
        state.message = state.i18n.loadingMessage;
      }, TIMEOUT_BEFORE_LOADING_MESSAGE);
      try {
        await state.database.ready();
        state.databaseLoaded = true; // eslint-disable-line no-unused-vars
      } catch (err) {
        console.error(err);
        state.message = state.i18n.networkErrorMessage;
      } finally {
        clearTimeout(timeoutHandle);
        if (showingLoadingMessage) { // Seems safer than checking the i18n string, which may change
          showingLoadingMessage = false;
          state.message = ''; // eslint-disable-line no-unused-vars
        }
      }
    }

    if (state.database) {
      /* no await */
      handleDatabaseLoading();
    }
  });

  //
  // Global styles for the entire picker
  //

  createEffect(() => {
    state.pickerStyle = `
      --num-groups: ${state.groups.length}; 
      --indicator-opacity: ${state.searchMode ? 0 : 1}; 
      --num-skintones: ${NUM_SKIN_TONES};`;
  });

  //
  // Set or update the customEmoji
  //

  createEffect(() => {
    if (state.customEmoji && state.database) {
      updateCustomEmoji(); // re-run whenever customEmoji change
    }
  });

  createEffect(() => {
    if (state.customEmoji && state.customEmoji.length) {
      if (state.groups !== allGroups) { // don't update unnecessarily
        state.groups = allGroups;
      }
    } else if (state.groups !== groups) {
      if (state.currentGroupIndex) {
        // If the current group is anything other than "custom" (which is first), decrement.
        // This fixes the odd case where you set customEmoji, then pick a category, then unset customEmoji
        state.currentGroupIndex--;
      }
      state.groups = groups;
    }
  });

  //
  // Set or update the preferred skin tone
  //

  createEffect(() => {
    async function updatePreferredSkinTone () {
      if (state.databaseLoaded) {
        state.currentSkinTone = await state.database.getPreferredSkinTone();
      }
    }

    /* no await */ updatePreferredSkinTone();
  });

  createEffect(() => {
    state.skinTones = Array(NUM_SKIN_TONES).fill().map((_, i) => applySkinTone(state.skinToneEmoji, i));
  });

  createEffect(() => {
    state.skinToneButtonText = state.skinTones[state.currentSkinTone];
  });

  createEffect(() => {
    state.skinToneButtonLabel = state.i18n.skinToneLabel.replace('{skinTone}', state.i18n.skinTones[state.currentSkinTone]);
  });

  //
  // Set or update the favorites emojis
  //

  createEffect(() => {
    async function updateDefaultFavoriteEmojis () {
      const { database } = state;
      const favs = (await Promise.all(MOST_COMMONLY_USED_EMOJI.map(unicode => (
        database.getEmojiByUnicodeOrName(unicode)
      )))).filter(Boolean); // filter because in Jest/Vitest tests we don't have all the emoji in the DB
      state.defaultFavoriteEmojis = favs;
    }

    if (state.databaseLoaded) {
      /* no await */ updateDefaultFavoriteEmojis();
    }
  });

  function updateCustomEmoji () {
    // Certain effects have an implicit dependency on customEmoji since it affects the database
    // Getting it here on the state ensures this effect re-runs when customEmoji change.
    const { customEmoji, database } = state;
    const databaseCustomEmoji = customEmoji || EMPTY_ARRAY;
    if (database.customEmoji !== databaseCustomEmoji) {
      // Avoid setting this if the customEmoji have _not_ changed, because the setter triggers a re-computation of the
      // `customEmojiIndex`. Note we don't bother with deep object changes.
      database.customEmoji = databaseCustomEmoji;
    }
  }

  createEffect(() => {
    async function updateFavorites () {
      updateCustomEmoji(); // re-run whenever customEmoji change
      const { database, defaultFavoriteEmojis, numColumns } = state;
      const dbFavorites = await database.getTopFavoriteEmoji(numColumns);
      const favorites = await summarizeEmojis(uniqBy([
        ...dbFavorites,
        ...defaultFavoriteEmojis
      ], _ => (_.unicode || _.name)).slice(0, numColumns));
      state.currentFavorites = favorites;
    }

    if (state.databaseLoaded && state.defaultFavoriteEmojis) {
      /* no await */ updateFavorites();
    }
  });

  //
  // Re-run whenever the emoji grid changes size, and re-calc style/layout-related state variables:
  // 1) Re-calculate the --num-columns var because it may have changed
  // 2) Re-calculate whether we're in RTL mode or not.
  //
  // The benefit of doing this in one place is to align with rAF/ResizeObserver
  // and do all the calculations in one go. RTL vs LTR is not strictly layout-related,
  // but since we're already reading the style here, and since it's already aligned with
  // the rAF loop, this is the most appropriate place to do it perf-wise.
  //

  function calculateEmojiGridStyle (node) {
    resizeObserverAction(node, abortSignal, () => {
      /* istanbul ignore next */
      { // jsdom throws errors for this kind of fancy stuff
        // read all the style/layout calculations we need to make
        const style = getComputedStyle(refs.rootElement);
        const newNumColumns = parseInt(style.getPropertyValue('--num-columns'), 10);
        const newIsRtl = style.getPropertyValue('direction') === 'rtl';

        // write to state variables
        state.numColumns = newNumColumns;
        state.isRtl = newIsRtl;
      }
    });
  }

  // Re-run whenever the custom emoji in a category are shown/hidden. This is an optimization that simulates
  // what we'd get from `<img loading=lazy>` but without rendering an `<img>`.
  function updateOnIntersection (node) {
    intersectionObserverAction(node, abortSignal, (entries) => {
      for (const { target, isIntersecting } of entries) {
        target.classList.toggle('onscreen', isIntersecting);
      }
    });
  }

  //
  // Set or update the currentEmojis. Check for invalid ZWJ renderings
  // (i.e. double emoji).
  //

  createEffect(() => {
    async function updateEmojis () {
      const { searchText, currentGroup, databaseLoaded, customEmoji } = state;
      if (!databaseLoaded) {
        state.currentEmojis = [];
        state.searchMode = false;
      } else if (searchText.length >= MIN_SEARCH_TEXT_LENGTH) {
        const newEmojis = await getEmojisBySearchQuery(searchText);
        if (state.searchText === searchText) { // if the situation changes asynchronously, do not update
          updateCurrentEmojis(newEmojis);
          updateSearchMode(true);
        }
      } else { // database is loaded and we're not in search mode, so we're in normal category mode
        const { id: currentGroupId } = currentGroup;
        // avoid race condition where currentGroupId is -1 and customEmoji is undefined/empty
        if (currentGroupId !== -1 || (customEmoji && customEmoji.length)) {
          const newEmojis = await getEmojisByGroup(currentGroupId);
          if (state.currentGroup.id === currentGroupId) { // if the situation changes asynchronously, do not update
            updateCurrentEmojis(newEmojis);
            updateSearchMode(false);
          }
        }
      }
    }

    /* no await */ updateEmojis();
  });

  const resetScrollTopInRaf = () => {
    rAF(() => resetScrollTopIfPossible(refs.tabpanelElement));
  };

  // Some emojis have their ligatures rendered as two or more consecutive emojis
  // We want to treat these the same as unsupported emojis, so we compare their
  // widths against the baseline widths and remove them as necessary
  createEffect(() => {
    const { currentEmojis, emojiVersion } = state;
    const zwjEmojisToCheck = currentEmojis
      .filter(emoji => emoji.unicode) // filter custom emoji
      .filter(emoji => hasZwj(emoji) && !supportedZwjEmojis.has(emoji.unicode));
    if (!emojiVersion && zwjEmojisToCheck.length) {
      // render now, check their length later
      updateCurrentEmojis(currentEmojis);
      rAF(() => checkZwjSupportAndUpdate(zwjEmojisToCheck));
    } else {
      const newEmojis = emojiVersion ? currentEmojis : currentEmojis.filter(isZwjSupported);
      updateCurrentEmojis(newEmojis);
      // Reset scroll top to 0 when emojis change
      resetScrollTopInRaf();
    }
  });

  function checkZwjSupportAndUpdate (zwjEmojisToCheck) {
    const allSupported = checkZwjSupport(zwjEmojisToCheck, refs.baselineEmoji, emojiToDomNode);
    if (allSupported) {
      // Even if all emoji are supported, we still need to reset the scroll top to 0 when emojis change
      resetScrollTopInRaf();
    } else {
      // Force update. We only do this if there are any unsupported ZWJ characters since otherwise,
      // for browsers that support all emoji, it would be an unnecessary extra re-render.
      state.currentEmojis = [...state.currentEmojis];
    }
  }

  function isZwjSupported (emoji) {
    return !emoji.unicode || !hasZwj(emoji) || supportedZwjEmojis.get(emoji.unicode)
  }

  async function filterEmojisByVersion (emojis) {
    const emojiSupportLevel = state.emojiVersion || await detectEmojiSupportLevel();
    // !version corresponds to custom emoji
    return emojis.filter(({ version }) => !version || version <= emojiSupportLevel)
  }

  async function summarizeEmojis (emojis) {
    return summarizeEmojisForUI(emojis, state.emojiVersion || await detectEmojiSupportLevel())
  }

  async function getEmojisByGroup (group) {
    // -1 is custom emoji
    const emoji = group === -1 ? state.customEmoji : await state.database.getEmojiByGroup(group);
    return summarizeEmojis(await filterEmojisByVersion(emoji))
  }

  async function getEmojisBySearchQuery (query) {
    return summarizeEmojis(await filterEmojisByVersion(await state.database.getEmojiBySearchQuery(query)))
  }

  createEffect(() => {
  });

  //
  // Derive currentEmojisWithCategories from currentEmojis. This is always done even if there
  // are no categories, because it's just easier to code the HTML this way.
  //

  createEffect(() => {
    function calculateCurrentEmojisWithCategories () {
      const { searchMode, currentEmojis } = state;
      if (searchMode) {
        return [
          {
            category: '',
            emojis: currentEmojis
          }
        ]
      }
      const categoriesToEmoji = new Map();
      for (const emoji of currentEmojis) {
        const category = emoji.category || '';
        let emojis = categoriesToEmoji.get(category);
        if (!emojis) {
          emojis = [];
          categoriesToEmoji.set(category, emojis);
        }
        emojis.push(emoji);
      }
      return [...categoriesToEmoji.entries()]
        .map(([category, emojis]) => ({ category, emojis }))
        .sort((a, b) => state.customCategorySorting(a.category, b.category))
    }

    const newEmojisWithCategories = calculateCurrentEmojisWithCategories();
    updateCurrentEmojisWithCategories(newEmojisWithCategories);
  });

  //
  // Handle active search item (i.e. pressing up or down while searching)
  //

  createEffect(() => {
    state.activeSearchItemId = state.activeSearchItem !== -1 && state.currentEmojis[state.activeSearchItem].id;
  });

  //
  // Handle user input on the search input
  //

  createEffect(() => {
    const { rawSearchText } = state;
    rIC(() => {
      state.searchText = (rawSearchText || '').trim(); // defer to avoid input delays, plus we can trim here
      state.activeSearchItem = -1;
    });
  });

  function onSearchKeydown (event) {
    if (!state.searchMode || !state.currentEmojis.length) {
      return
    }

    const goToNextOrPrevious = (previous) => {
      halt(event);
      state.activeSearchItem = incrementOrDecrement(previous, state.activeSearchItem, state.currentEmojis);
    };

    switch (event.key) {
      case 'ArrowDown':
        return goToNextOrPrevious(false)
      case 'ArrowUp':
        return goToNextOrPrevious(true)
      case 'Enter':
        if (state.activeSearchItem === -1) {
          // focus the first option in the list since the list must be non-empty at this point (it's verified above)
          state.activeSearchItem = 0;
        } else { // there is already an active search item
          halt(event);
          return clickEmoji(state.currentEmojis[state.activeSearchItem].id)
        }
    }
  }

  //
  // Handle user input on nav
  //

  function onNavClick (event) {
    const { target } = event;
    const closestTarget = target.closest('.nav-button');
    /* istanbul ignore if */
    if (!closestTarget) {
      return // This should never happen, but makes me nervous not to have it
    }
    const groupId = parseInt(closestTarget.dataset.groupId, 10);
    refs.searchElement.value = ''; // clear search box input
    state.rawSearchText = '';
    state.searchText = '';
    state.activeSearchItem = -1;
    state.currentGroupIndex = state.groups.findIndex(_ => _.id === groupId);
  }

  function onNavKeydown (event) {
    const { target, key } = event;

    const doFocus = el => {
      if (el) {
        halt(event);
        el.focus();
      }
    };

    switch (key) {
      case 'ArrowLeft':
        return doFocus(target.previousElementSibling)
      case 'ArrowRight':
        return doFocus(target.nextElementSibling)
      case 'Home':
        return doFocus(target.parentElement.firstElementChild)
      case 'End':
        return doFocus(target.parentElement.lastElementChild)
    }
  }

  //
  // Handle user input on an emoji
  //

  async function clickEmoji (unicodeOrName) {
    const emoji = await state.database.getEmojiByUnicodeOrName(unicodeOrName);
    const emojiSummary = [...state.currentEmojis, ...state.currentFavorites]
      .find(_ => (_.id === unicodeOrName));
    const skinTonedUnicode = emojiSummary.unicode && unicodeWithSkin(emojiSummary, state.currentSkinTone);
    await state.database.incrementFavoriteEmojiCount(unicodeOrName);
    fireEvent('emoji-click', {
      emoji,
      skinTone: state.currentSkinTone,
      ...(skinTonedUnicode && { unicode: skinTonedUnicode }),
      ...(emojiSummary.name && { name: emojiSummary.name })
    });
  }

  async function onEmojiClick (event) {
    const { target } = event;
    /* istanbul ignore if */
    if (!target.classList.contains('emoji')) {
      // This should never happen, but makes me nervous not to have it
      return
    }
    halt(event);
    const id = target.id.substring(4); // replace 'emo-' or 'fav-' prefix

    /* no await */ clickEmoji(id);
  }

  //
  // Handle user input on the skintone picker
  //

  function changeSkinTone (skinTone) {
    state.currentSkinTone = skinTone;
    state.skinTonePickerExpanded = false;
    focus('skintone-button');
    fireEvent('skin-tone-change', { skinTone });
    /* no await */ state.database.setPreferredSkinTone(skinTone);
  }

  function onSkinToneOptionsClick (event) {
    const { target: { id } } = event;
    const match = id && id.match(/^skintone-(\d)/); // skintone option format
    /* istanbul ignore if */
    if (!match) { // not a skintone option
      return // This should never happen, but makes me nervous not to have it
    }
    halt(event);
    const skinTone = parseInt(match[1], 10); // remove 'skintone-' prefix
    changeSkinTone(skinTone);
  }

  function onClickSkinToneButton (event) {
    state.skinTonePickerExpanded = !state.skinTonePickerExpanded;
    state.activeSkinTone = state.currentSkinTone;
    // this should always be true, since the button is obscured by the listbox, so this `if` is just to be sure
    if (state.skinTonePickerExpanded) {
      halt(event);
      rAF(() => focus('skintone-list'));
    }
  }

  // To make the animation nicer, change the z-index of the skintone picker button
  // *after* the animation has played. This makes it appear that the picker box
  // is expanding "below" the button
  createEffect(() => {
    if (state.skinTonePickerExpanded) {
      refs.skinToneDropdown.addEventListener('transitionend', () => {
        state.skinTonePickerExpandedAfterAnimation = true; // eslint-disable-line no-unused-vars
      }, { once: true });
    } else {
      state.skinTonePickerExpandedAfterAnimation = false; // eslint-disable-line no-unused-vars
    }
  });

  function onSkinToneOptionsKeydown (event) {
    // this should never happen, but makes me nervous not to have it
    /* istanbul ignore if */
    if (!state.skinTonePickerExpanded) {
      return
    }
    const changeActiveSkinTone = async nextSkinTone => {
      halt(event);
      state.activeSkinTone = nextSkinTone;
    };

    switch (event.key) {
      case 'ArrowUp':
        return changeActiveSkinTone(incrementOrDecrement(true, state.activeSkinTone, state.skinTones))
      case 'ArrowDown':
        return changeActiveSkinTone(incrementOrDecrement(false, state.activeSkinTone, state.skinTones))
      case 'Home':
        return changeActiveSkinTone(0)
      case 'End':
        return changeActiveSkinTone(state.skinTones.length - 1)
      case 'Enter':
        // enter on keydown, space on keyup. this is just how browsers work for buttons
        // https://lists.w3.org/Archives/Public/w3c-wai-ig/2019JanMar/0086.html
        halt(event);
        return changeSkinTone(state.activeSkinTone)
      case 'Escape':
        halt(event);
        state.skinTonePickerExpanded = false;
        return focus('skintone-button')
    }
  }

  function onSkinToneOptionsKeyup (event) {
    // this should never happen, but makes me nervous not to have it
    /* istanbul ignore if */
    if (!state.skinTonePickerExpanded) {
      return
    }
    switch (event.key) {
      case ' ':
        // enter on keydown, space on keyup. this is just how browsers work for buttons
        // https://lists.w3.org/Archives/Public/w3c-wai-ig/2019JanMar/0086.html
        halt(event);
        return changeSkinTone(state.activeSkinTone)
    }
  }

  async function onSkinToneOptionsFocusOut (event) {
    // On blur outside of the skintone listbox, collapse the skintone picker.
    const { relatedTarget } = event;
    // The `else` should never happen, but makes me nervous not to have it
    /* istanbul ignore else */
    if (!relatedTarget || relatedTarget.id !== 'skintone-list') {
      state.skinTonePickerExpanded = false;
    }
  }

  function onSearchInput (event) {
    state.rawSearchText = event.target.value;
  }

  return {
    $set (newState) {
      assign(state, newState);
    },
    $destroy () {
      abortController.abort();
    }
  }
}

const DEFAULT_DATA_SOURCE = 'https://cdn.jsdelivr.net/npm/emoji-picker-element-data@^1/en/emojibase/data.json';
const DEFAULT_LOCALE = 'en';

var enI18n = {
  categoriesLabel: 'Categories',
  emojiUnsupportedMessage: 'Your browser does not support color emoji.',
  favoritesLabel: 'Favorites',
  loadingMessage: 'Loading…',
  networkErrorMessage: 'Could not load emoji.',
  regionLabel: 'Emoji picker',
  searchDescription: 'When search results are available, press up or down to select and enter to choose.',
  searchLabel: 'Search',
  searchResultsLabel: 'Search results',
  skinToneDescription: 'When expanded, press up or down to select and enter to choose.',
  skinToneLabel: 'Choose a skin tone (currently {skinTone})',
  skinTonesLabel: 'Skin tones',
  skinTones: [
    'Default',
    'Light',
    'Medium-Light',
    'Medium',
    'Medium-Dark',
    'Dark'
  ],
  categories: {
    custom: 'Custom',
    'smileys-emotion': 'Smileys and emoticons',
    'people-body': 'People and body',
    'animals-nature': 'Animals and nature',
    'food-drink': 'Food and drink',
    'travel-places': 'Travel and places',
    activities: 'Activities',
    objects: 'Objects',
    symbols: 'Symbols',
    flags: 'Flags'
  }
};

var baseStyles = ":host{--emoji-size:1.375rem;--emoji-padding:0.5rem;--category-emoji-size:var(--emoji-size);--category-emoji-padding:var(--emoji-padding);--indicator-height:3px;--input-border-radius:0.5rem;--input-border-size:1px;--input-font-size:1rem;--input-line-height:1.5;--input-padding:0.25rem;--num-columns:8;--outline-size:2px;--border-size:1px;--border-radius:0;--skintone-border-radius:1rem;--category-font-size:1rem;display:flex;width:min-content;height:400px}:host,:host(.light){color-scheme:light;--background:#fff;--border-color:#e0e0e0;--indicator-color:#385ac1;--input-border-color:#999;--input-font-color:#111;--input-placeholder-color:#999;--outline-color:#999;--category-font-color:#111;--button-active-background:#e6e6e6;--button-hover-background:#d9d9d9}:host(.dark){color-scheme:dark;--background:#222;--border-color:#444;--indicator-color:#5373ec;--input-border-color:#ccc;--input-font-color:#efefef;--input-placeholder-color:#ccc;--outline-color:#fff;--category-font-color:#efefef;--button-active-background:#555555;--button-hover-background:#484848}@media (prefers-color-scheme:dark){:host{color-scheme:dark;--background:#222;--border-color:#444;--indicator-color:#5373ec;--input-border-color:#ccc;--input-font-color:#efefef;--input-placeholder-color:#ccc;--outline-color:#fff;--category-font-color:#efefef;--button-active-background:#555555;--button-hover-background:#484848}}:host([hidden]){display:none}button{margin:0;padding:0;border:0;background:0 0;box-shadow:none;-webkit-tap-highlight-color:transparent}button::-moz-focus-inner{border:0}input{padding:0;margin:0;line-height:1.15;font-family:inherit}input[type=search]{-webkit-appearance:none}:focus{outline:var(--outline-color) solid var(--outline-size);outline-offset:calc(-1*var(--outline-size))}:host([data-js-focus-visible]) :focus:not([data-focus-visible-added]){outline:0}:focus:not(:focus-visible){outline:0}.hide-focus{outline:0}*{box-sizing:border-box}.picker{contain:content;display:flex;flex-direction:column;background:var(--background);border:var(--border-size) solid var(--border-color);border-radius:var(--border-radius);width:100%;height:100%;overflow:hidden;--total-emoji-size:calc(var(--emoji-size) + (2 * var(--emoji-padding)));--total-category-emoji-size:calc(var(--category-emoji-size) + (2 * var(--category-emoji-padding)))}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.hidden{opacity:0;pointer-events:none}.abs-pos{position:absolute;left:0;top:0}.gone{display:none!important}.skintone-button-wrapper,.skintone-list{background:var(--background);z-index:3}.skintone-button-wrapper.expanded{z-index:1}.skintone-list{position:absolute;inset-inline-end:0;top:0;z-index:2;overflow:visible;border-bottom:var(--border-size) solid var(--border-color);border-radius:0 0 var(--skintone-border-radius) var(--skintone-border-radius);will-change:transform;transition:transform .2s ease-in-out;transform-origin:center 0}@media (prefers-reduced-motion:reduce){.skintone-list{transition-duration:.001s}}@supports not (inset-inline-end:0){.skintone-list{right:0}}.skintone-list.no-animate{transition:none}.tabpanel{overflow-y:auto;scrollbar-gutter:stable;-webkit-overflow-scrolling:touch;will-change:transform;min-height:0;flex:1;contain:content}.emoji-menu{display:grid;grid-template-columns:repeat(var(--num-columns),var(--total-emoji-size));justify-content:space-around;align-items:flex-start;width:100%}.emoji-menu.visibility-auto{content-visibility:auto;contain-intrinsic-size:calc(var(--num-columns)*var(--total-emoji-size)) calc(var(--num-rows)*var(--total-emoji-size))}.category{padding:var(--emoji-padding);font-size:var(--category-font-size);color:var(--category-font-color)}.emoji,button.emoji{font-size:var(--emoji-size);display:flex;align-items:center;justify-content:center;border-radius:100%;height:var(--total-emoji-size);width:var(--total-emoji-size);line-height:1;overflow:hidden;font-family:var(--emoji-font-family);cursor:pointer}@media (hover:hover) and (pointer:fine){.emoji:hover,button.emoji:hover{background:var(--button-hover-background)}}.emoji.active,.emoji:active,button.emoji.active,button.emoji:active{background:var(--button-active-background)}.custom-emoji::after{content:\"\";width:var(--emoji-size);height:var(--emoji-size);background-repeat:no-repeat;background-position:center center;background-size:contain;background-image:none}.onscreen .custom-emoji::after{background-image:var(--custom-emoji-background)}.nav,.nav-button{align-items:center}.nav{display:grid;justify-content:space-between;contain:content}.nav-button{display:flex;justify-content:center}.nav-emoji{font-size:var(--category-emoji-size);width:var(--total-category-emoji-size);height:var(--total-category-emoji-size)}.indicator-wrapper{display:flex;border-bottom:1px solid var(--border-color)}.indicator{width:calc(100%/var(--num-groups));height:var(--indicator-height);opacity:var(--indicator-opacity);background-color:var(--indicator-color);will-change:transform,opacity;transition:opacity .1s linear,transform .25s ease-in-out}@media (prefers-reduced-motion:reduce){.indicator{will-change:opacity;transition:opacity .1s linear}}.pad-top,input.search{background:var(--background);width:100%}.pad-top{height:var(--emoji-padding);z-index:3}.search-row{display:flex;align-items:center;position:relative;padding-inline-start:var(--emoji-padding);padding-bottom:var(--emoji-padding)}.search-wrapper{flex:1;min-width:0}input.search{padding:var(--input-padding);border-radius:var(--input-border-radius);border:var(--input-border-size) solid var(--input-border-color);color:var(--input-font-color);font-size:var(--input-font-size);line-height:var(--input-line-height)}input.search::placeholder{color:var(--input-placeholder-color)}.favorites{overflow-y:auto;scrollbar-gutter:stable;display:flex;flex-direction:row;border-top:var(--border-size) solid var(--border-color);contain:content}.message{padding:var(--emoji-padding)}";

const PROPS = [
  'customEmoji',
  'customCategorySorting',
  'database',
  'dataSource',
  'i18n',
  'locale',
  'skinToneEmoji',
  'emojiVersion'
];

// Styles injected ourselves, so we can declare the FONT_FAMILY variable in one place
const EXTRA_STYLES = `:host{--emoji-font-family:${FONT_FAMILY}}`;

class PickerElement extends HTMLElement {
  constructor (props) {
    super();
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = baseStyles + EXTRA_STYLES;
    this.shadowRoot.appendChild(style);
    this._ctx = {
      // Set defaults
      locale: DEFAULT_LOCALE,
      dataSource: DEFAULT_DATA_SOURCE,
      skinToneEmoji: DEFAULT_SKIN_TONE_EMOJI,
      customCategorySorting: DEFAULT_CATEGORY_SORTING,
      customEmoji: null,
      i18n: enI18n,
      emojiVersion: null,
      ...props
    };
    // Handle properties set before the element was upgraded
    for (const prop of PROPS) {
      if (prop !== 'database' && Object.prototype.hasOwnProperty.call(this, prop)) {
        this._ctx[prop] = this[prop];
        delete this[prop];
      }
    }
    this._dbFlush(); // wait for a flush before creating the db, in case the user calls e.g. a setter or setAttribute
  }

  connectedCallback () {
    // The _cmp may be defined if the component was immediately disconnected and then reconnected. In that case,
    // do nothing (preserve the state)
    if (!this._cmp) {
      this._cmp = createRoot(this.shadowRoot, this._ctx);
    }
  }

  disconnectedCallback () {
    // Check in a microtask if the element is still connected. If so, treat this as a "move" rather than a disconnect
    // Inspired by Vue: https://vuejs.org/guide/extras/web-components.html#building-custom-elements-with-vue
    qM(() => {
      // this._cmp may be defined if connect-disconnect-connect-disconnect occurs synchronously
      if (!this.isConnected && this._cmp) {
        this._cmp.$destroy();
        this._cmp = undefined;

        const { database } = this._ctx;
        database.close()
          // only happens if the database failed to load in the first place, so we don't care
          .catch(err => console.error(err));
      }
    });
  }

  static get observedAttributes () {
    return ['locale', 'data-source', 'skin-tone-emoji', 'emoji-version'] // complex objects aren't supported, also use kebab-case
  }

  attributeChangedCallback (attrName, oldValue, newValue) {
    this._set(
      // convert from kebab-case to camelcase
      // see https://github.com/sveltejs/svelte/issues/3852#issuecomment-665037015
      attrName.replace(/-([a-z])/g, (_, up) => up.toUpperCase()),
      // convert string attribute to float if necessary
      attrName === 'emoji-version' ? parseFloat(newValue) : newValue
    );
  }

  _set (prop, newValue) {
    this._ctx[prop] = newValue;
    if (this._cmp) {
      this._cmp.$set({ [prop]: newValue });
    }
    if (['locale', 'dataSource'].includes(prop)) {
      this._dbFlush();
    }
  }

  _dbCreate () {
    const { locale, dataSource, database } = this._ctx;
    // only create a new database if we really need to
    if (!database || database.locale !== locale || database.dataSource !== dataSource) {
      this._set('database', new Database({ locale, dataSource }));
    }
  }

  // Update the Database in one microtask if the locale/dataSource change. We do one microtask
  // so we don't create two Databases if e.g. both the locale and the dataSource change
  _dbFlush () {
    qM(() => (
      this._dbCreate()
    ));
  }
}

const definitions = {};

for (const prop of PROPS) {
  definitions[prop] = {
    get () {
      if (prop === 'database') {
        // in rare cases, the microtask may not be flushed yet, so we need to instantiate the DB
        // now if the user is asking for it
        this._dbCreate();
      }
      return this._ctx[prop]
    },
    set (val) {
      if (prop === 'database') {
        throw new Error('database is read-only')
      }
      this._set(prop, val);
    }
  };
}

Object.defineProperties(PickerElement.prototype, definitions);

/* istanbul ignore else */
if (!customElements.get('emoji-picker')) { // if already defined, do nothing (e.g. same script imported twice)
  customElements.define('emoji-picker', PickerElement);
}

// DialogService.js

class DialogService {
    static dialogQueue = [];
    static offset = 10; // 基础间距，追加到弹窗高度

    static createDialog(message, type = 'success', position = 'top-center') {
        // 创建弹窗内容
        const dialogElement = document.createElement('div');
        dialogElement.classList.add('dialog', type); // 应用对应类型的样式
        let icon = '';
        if(type === 'warning') {
            icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256m0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4"></path></svg>';
        } else if(type === 'success') {
            icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"></path></svg>';
        } else if(type === 'error') {
            icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336z"></path></svg>';
        }
        dialogElement.innerHTML = `
      <span class="dialog-icon">${icon}</span> <span class="dialog-message">${message}</span>
    `;

        // 将样式和弹窗添加到 body
        document.body.appendChild(dialogElement);

        // 将弹窗添加到队列
        this.dialogQueue.push({ element: dialogElement, position });

        // 计算弹窗的位置并显示
        this.updateDialogPositions();

        // 设置延迟自动关闭弹窗，例如 3 秒后关闭
        setTimeout(() => {
            this.closeDialog(dialogElement);
        }, 3000); // 延迟 3000 毫秒（即 3 秒）

        return dialogElement; // 返回弹窗元素以便后续使用
    }

    static setPosition(dialogElement, position, topPosition) {
        dialogElement.style.left = 'auto'; // 确保在设置 right 时 left 不干扰
        dialogElement.style.right = 'auto'; // 确保在设置 left 时 right 不干扰
        dialogElement.style.transform = ''; // 清除任何变换

        switch (position) {
            case 'top-right':
                dialogElement.style.top = `${topPosition}px`;
                dialogElement.style.right = '0';
                break;
            case 'top-left':
                dialogElement.style.top = `${topPosition}px`;
                dialogElement.style.left = '0';
                break;
            case 'top-center':
                dialogElement.style.top = `${topPosition}px`;
                dialogElement.style.left = '50%';
                dialogElement.style.transform = 'translateX(-50%)'; // 居中
                break;
            default:
                // 默认位置
                dialogElement.style.top = `${topPosition}px`;
                dialogElement.style.right = '0';
                break;
        }
    }

    static updateDialogPositions() {
        let topPosition = 20; // 初始顶部位置

        this.dialogQueue.forEach(dialogItem => {
            const { element, position } = dialogItem;

            // 设置弹窗的位置
            this.setPosition(element, position, topPosition);

            // 计算下一个弹窗的位置
            topPosition += element.offsetHeight + this.offset;

            // 显示弹窗
            element.classList.add('show');
        });
    }

    static closeDialog(dialogElement) {
        // 隐藏并从 body 移除弹窗
        if (dialogElement) {
            dialogElement.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(dialogElement);

                // 从队列中移除已关闭的弹窗
                this.dialogQueue = this.dialogQueue.filter(d => d.element !== dialogElement);

                // 更新后续弹窗的位置
                this.updateDialogPositions();
            }, 300); // 等待 300 毫秒以确保弹窗完全隐藏
        }
    }

    static openDialog(message, type = 'success', position = 'top-center') {
        this.createDialog(message, type, position);
    }
}

const _hoisted_1$1 = { class: "comment-editor-box" };
const _hoisted_2$1 = {
  key: 0,
  class: "comment-info-box"
};
const _hoisted_3$1 = { class: "comment-input-box" };
const _hoisted_4$1 = { class: "comment-input-box" };
const _hoisted_5$1 = { class: "comment-input-box" };
const _hoisted_6$1 = { class: "comment-submit-box" };
const _hoisted_7$1 = { style: {"position":"relative"} };
const _hoisted_8$1 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 100 100",
  preserveAspectRatio: "xMidYMid",
  width: "20",
  height: "20",
  style: {"shape-rendering":"auto","display":"inline-block","background":"rgba(255, 255, 255, 0)"}
};
const _hoisted_9$1 = { key: 1 };


const _sfc_main$1 = {
  __name: 'PerfreeCommentEditor',
  props: ['articleId', 'pid', 'topPid', 'userId'],
  emits: ['closeReply', 'commentSubmit'],
  setup(__props, { emit: __emit }) {

const props = __props;
const emit = __emit;
let showEmojiPanel = tF(false);
const editor = tF();
const emojiPicker = tF();
let comment = tF({
  content: '',
  articleId: props.articleId,
  pid: props.pid,
  topPid: props.topPid,
  website: null,
  email: null,
  userName: null
});
let canCommentSubmit = tF(true);
let submitLoading = tF(false);

function closeReply() {
  emit('closeReply', props.pid, props.topPid);
}

/**
 * 点击表情事件
 * @param emoji
 */
function onEmojiClick(emoji) {
  const start = editor.value.selectionStart;
  const end = editor.value.selectionEnd;
  comment.value.content = comment.value.content.slice(0, start) +  emoji.detail.emoji.unicode + comment.value.content.slice(end);
  editor.value.focus();
  nf(() => {
    editor.value.focus();
    // 设置光标位置到 emoji 后面
    const newPosition = start + emoji.detail.emoji.unicode.length;
    editor.value.setSelectionRange(newPosition, newPosition);
  });
}

/**
 * 关闭表情面板
 * @param event
 */
function handleCloseEmojiPicker(event) {
  const path = event.composedPath();
  if (emojiPicker.value && !path.includes(emojiPicker.value)) {
    showEmojiPanel.value = false;
  }
}

/**
 * 提交评论
 */
function submitComment() {
  if (!canCommentSubmit.value) {
    return;
  }

  if (!props.userId && !comment.value.userName) {
    DialogService.openDialog('请填写姓名或昵称!', 'error');
    return;
  }
  if (!props.userId && !comment.value.email) {
    DialogService.openDialog('请填写邮箱!', 'error');
    return;
  }
  if (!props.userId && !validateEmail(comment.value.email)) {
    DialogService.openDialog('请填写正确的邮箱!', 'error');
    return;
  }
  if(comment.value.website && !validateURL(comment.value.website)) {
    DialogService.openDialog('请填写正确的网址!', 'error');
    return;
  }
  if (!comment.value.content) {
    DialogService.openDialog('请填写评论内容!', 'error');
    return;
  }
  canCommentSubmit.value = false;
  submitLoading.value = true;
  submitCommentApi(comment.value).then(res => {
    if (res.code === 200) {
      if(res.data.status === 1) {
        DialogService.openDialog('评论发表成功,正在等待审核', 'success');
      } else {
        DialogService.openDialog('评论发表成功', 'success');
      }

      comment.value = {
        content: '',
        articleId: props.articleId,
        pid: props.pid,
        topPid: props.topPid,
        website: null,
        email: null,
        userName: null
      };
      emit('commentSubmit', props.pid, props.topPid);
    }else {
      DialogService.openDialog(res.msg, 'error');
    }
    canCommentSubmit.value = true;
    submitLoading.value = false;
  }).catch(e => {
    canCommentSubmit.value = true;
    submitLoading.value = false;
  });
}

function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

function validateURL(url) {
  const urlPattern = /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d+)?(\/\S*)?$/;
  return urlPattern.test(url);
}

lS(() => {
  document.addEventListener('mousedown', handleCloseEmojiPicker);
});

lw(() => {
  document.removeEventListener('mousedown', handleCloseEmojiPicker);
});


return (_ctx, _cache) => {
  return (io(), id("div", _hoisted_1$1, [
    (!__props.userId)
      ? (io(), id("div", _hoisted_2$1, [
          ib("div", _hoisted_3$1, [
            _cache[5] || (_cache[5] = ib("label", null, [
              iE("名字"),
              ib("span", { class: "required" }, " *")
            ], -1)),
            nw(ib("input", {
              type: "text",
              placeholder: "姓名或昵称(必填)",
              class: "comment-name-input",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((t$(comment).userName) = $event)),
              required: ""
            }, null, 512), [
              [s7, t$(comment).userName]
            ])
          ]),
          ib("div", _hoisted_4$1, [
            _cache[6] || (_cache[6] = ib("label", null, [
              iE("邮箱"),
              ib("span", { class: "required" }, " *")
            ], -1)),
            nw(ib("input", {
              type: "email",
              placeholder: "接收回复和获取头像(必填,将保密)",
              class: "comment-email-input",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((t$(comment).email) = $event)),
              required: ""
            }, null, 512), [
              [s7, t$(comment).email]
            ])
          ]),
          ib("div", _hoisted_5$1, [
            _cache[7] || (_cache[7] = ib("label", null, "网站", -1)),
            nw(ib("input", {
              type: "text",
              placeholder: "个人网站(选填)",
              class: "comment-website-input",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((t$(comment).website) = $event))
            }, null, 512), [
              [s7, t$(comment).website]
            ])
          ])
        ]))
      : ik("", true),
    _cache[11] || (_cache[11] = ib("label", null, [
      iE("评论"),
      ib("span", { class: "required" }, " *")
    ], -1)),
    nw(ib("textarea", {
      placeholder: "评论内容",
      class: "comment-editor",
      ref_key: "editor",
      ref: editor,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((t$(comment).content) = $event)),
      required: ""
    }, null, 512), [
      [s7, t$(comment).content]
    ]),
    ib("div", _hoisted_6$1, [
      ib("div", _hoisted_7$1, [
        ib("a", {
          href: "javascript:;",
          class: "comment-emjoi-btn",
          onClick: _cache[4] || (_cache[4] = op($event => (tD(showEmojiPanel) ? showEmojiPanel.value = !t$(showEmojiPanel) : showEmojiPanel = !t$(showEmojiPanel)), ["stop"]))
        }, _cache[8] || (_cache[8] = [
          ib("svg", {
            t: "1726277716465",
            class: "icon",
            viewBox: "0 0 1024 1024",
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            "p-id": "24517",
            width: "20",
            height: "20"
          }, [
            ib("path", {
              d: "M754.4 185.6c0.4 0 0.8-0.3 0.8-0.8v-76c0-10.2 4.1-20 11.3-27.1s16.9-11.3 27.1-11.3 20 4.1 27.1 11.3c7.2 7.2 11.3 16.9 11.3 27.1v76c0 0.4 0.3 0.8 0.8 0.8h76c10.2 0 20 4.1 27.1 11.3 7.2 7.2 11.3 16.9 11.3 27.1s-4.1 20-11.3 27.1c-7.2 7.2-16.9 11.3-27.1 11.3h-76c-0.4 0-0.8 0.3-0.8 0.8v76c0 10.2-4.1 20-11.3 27.1-7.2 7.2-16.9 11.3-27.1 11.3s-20-4.1-27.1-11.3-11.3-16.9-11.3-27.1v-76c0-0.4-0.3-0.8-0.8-0.8h-76c-10.2 0-20-4.1-27.1-11.3-7.2-7.1-11.3-16.9-11.3-27.1s4.1-20 11.3-27.1c7.2-7.2 16.9-11.3 27.1-11.3h76zM819.2 544c0-35.4-5.5-69.4-15.7-101.4-0.2-0.5 0.2-1 0.7-1h78.3c0.4 0 0.7 0.2 0.8 0.6 13.8 54 16.9 112.4 6.8 172.6-28.3 169.3-160.8 302.9-329.9 332.4C276.4 996.6 34 754.2 83.3 470.4c29.4-169.1 163-301.7 332.3-330.1 60.3-10.1 118.6-7 172.7 6.8 0.3 0.1 0.6 0.4 0.6 0.8v78.3c0 0.5-0.5 0.9-1 0.7-32-10.2-66-15.7-101.4-15.7-194.7 0-350.4 167.2-331.2 365.9 15.2 157.5 140.6 283 298.1 298.1C652 894.4 819.2 738.7 819.2 544zM281.9 434.3c3.4-36.7 32.5-65.8 69.2-69.2 47.6-4.4 88.2 36.1 83.7 83.7-3.4 36.7-32.5 65.8-69.2 69.2-47.6 4.5-88.1-36-83.7-83.7z m325.2-69.2c-36.7 3.4-65.8 32.5-69.2 69.2-4.4 47.6 36.1 88.2 83.7 83.7 36.7-3.4 65.8-32.5 69.2-69.2 4.5-47.6-36-88.1-83.7-83.7zM486.4 800c54.3 0 106.5-21.5 144.9-59.9C669.5 701.9 691 650 691.2 596c0-0.4-0.3-0.8-0.8-0.8h-408c-0.4 0-0.8 0.4-0.8 0.8 0.2 54 21.7 105.9 59.9 144.1 38.4 38.4 90.6 59.9 144.9 59.9z",
              fill: "#555555",
              "p-id": "24518"
            })
          ], -1),
          iE("表情 ")
        ])),
        (t$(showEmojiPanel))
          ? (io(), id("emoji-picker", {
              key: 0,
              class: "emoji-picker",
              locale: "zh_CN",
              onEmojiClick: onEmojiClick,
              ref_key: "emojiPicker",
              ref: emojiPicker
            }, null, 544))
          : ik("", true)
      ]),
      (__props.pid && __props.pid !== -1)
        ? (io(), id("button", {
            key: 0,
            class: "comment-cancel-btn",
            onClick: closeReply
          }, "🗙 取消回复"))
        : ik("", true),
      ib("button", {
        class: "comment-submit-btn",
        onClick: submitComment,
        type: "submit"
      }, [
        (t$(submitLoading))
          ? (io(), id("svg", _hoisted_8$1, _cache[9] || (_cache[9] = [
              iw("<g><g transform=\"rotate(0 50 50)\"><rect fill=\"#ffffff\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.9166666666666666s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(30 50 50)\"><rect fill=\"#ffffff\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.8333333333333334s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(60 50 50)\"><rect fill=\"#ffffff\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.75s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(90 50 50)\"><rect fill=\"#ffffff\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.6666666666666666s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(120 50 50)\"><rect fill=\"#ffffff\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.5833333333333334s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(150 50 50)\"><rect fill=\"#ffffff\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.5s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(180 50 50)\"><rect fill=\"#ffffff\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.4166666666666667s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(210 50 50)\"><rect fill=\"#ffffff\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.3333333333333333s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(240 50 50)\"><rect fill=\"#ffffff\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.25s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(270 50 50)\"><rect fill=\"#ffffff\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.16666666666666666s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(300 50 50)\"><rect fill=\"#ffffff\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.08333333333333333s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(330 50 50)\"><rect fill=\"#ffffff\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"0s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g></g></g>", 1)
            ])))
          : (io(), id("span", _hoisted_9$1, "✔")),
        _cache[10] || (_cache[10] = iE(" 发表评论"))
      ])
    ])
  ]))
}
}

};

const _hoisted_1 = { class: "perfree-comment" };
const _hoisted_2 = {
  key: 0,
  class: "comment-list-box"
};
const _hoisted_3 = { class: "comment-list" };
const _hoisted_4 = {
  key: 0,
  class: "comment-list-loading"
};
const _hoisted_5 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 100 100",
  preserveAspectRatio: "xMidYMid",
  width: "20",
  height: "20",
  style: {"shape-rendering":"auto","display":"block","background":"rgba(255,255,255,0)"},
  "xmlns:xlink": "http://www.w3.org/1999/xlink"
};
const _hoisted_6 = {
  key: 1,
  class: "comment-not-list"
};
const _hoisted_7 = { class: "comment-detail-container" };
const _hoisted_8 = { class: "comment-detail-box" };
const _hoisted_9 = { class: "comment-detail-avatar-box" };
const _hoisted_10 = ["src"];
const _hoisted_11 = { key: 1 };
const _hoisted_12 = { class: "comment-detail-msg-box" };
const _hoisted_13 = { class: "comment-detail-info" };
const _hoisted_14 = { class: "comment-detail-name" };
const _hoisted_15 = { class: "comment-detail-time" };
const _hoisted_16 = ["onClick"];
const _hoisted_17 = { class: "comment-detail-content" };
const _hoisted_18 = { class: "comment-detail-container comment-child-detail-box" };
const _hoisted_19 = { class: "comment-detail-box" };
const _hoisted_20 = { class: "comment-detail-avatar-box" };
const _hoisted_21 = ["src"];
const _hoisted_22 = { key: 1 };
const _hoisted_23 = { class: "comment-detail-msg-box" };
const _hoisted_24 = { class: "comment-detail-info" };
const _hoisted_25 = { class: "comment-detail-name" };
const _hoisted_26 = { class: "comment-detail-time" };
const _hoisted_27 = ["onClick"];
const _hoisted_28 = { class: "comment-detail-content" };
const _hoisted_29 = { class: "comment-mention" };
const _hoisted_30 = {
  key: 1,
  class: "comment-show-more"
};
const _hoisted_31 = ["onClick"];
const _hoisted_32 = ["onClick"];
const _hoisted_33 = {
  key: 2,
  class: "comment-list-loading"
};
const _hoisted_34 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 100 100",
  preserveAspectRatio: "xMidYMid",
  width: "20",
  height: "20",
  style: {"shape-rendering":"auto","display":"block","background":"rgba(255,255,255,0)"},
  "xmlns:xlink": "http://www.w3.org/1999/xlink"
};
const _hoisted_35 = {
  key: 0,
  class: "comment-pagination"
};
const _hoisted_36 = { class: "comment-pagination-num" };

  
const _sfc_main = {
  __name: 'PerfreeComment',
  props: ['articleId', 'showCommentList'],
  emits: ['commentSubmitSuccess'],
  setup(__props, { emit: __emit }) {

  const props = __props;
  const emit = __emit;
  let commentList = tF([]);
  let pageNo = tF(1);
  let pageSize = tF(10);
  let total = tF(0);
  let user = tF({});
  let commentListLoading = tF(false);
  // 修复如果主题使用了jquery,导致jquery失效的问题
  if (window.jQuery) {
    $ = window.jQuery;
  }

  /**
   * 回复按钮点击事件
   */
  function replyClick(data) {
    data.showReply = true;
  }

  /**
   * 查询评论列表
   */
  function queryCommentList() {
    commentListLoading.value = true;
    pageByArticleIdApi({ articleId: props.articleId,pageNo: pageNo.value, pageSize: pageSize.value}).then(res => {
      commentListLoading.value = false;
      commentList.value = res.data.list;
      total.value = res.data.total;
    });
  }

  /**
   * 加载子级评论
   */
  function loadChildComment(d){
    if (!d.pageNo) {
      d.pageNo = 0;
    }
    d.pageNo += 1;
    queryChildComment(d);
  }

  function queryChildComment(d){
    d.childLoading = true;
    pageByTopPid({ topPid: d.id, pageNo: d.pageNo, pageSize: pageSize.value}).then(res => {
      if (!d.children) {
        d.children = [];
      }
      if (d.pageNo === 1) {
        d.children = res.data.list;
      } else {
        d.children.push(...res.data.list);
      }
      d.childNum = res.data.total;
      d.childLoading = false;
    });
  }

  /**
   * 下一页
   */
  function nextPage() {
    pageNo.value += 1;
    queryCommentList();
  }

  /**
   * 上一页
   */
  function prePage() {
    pageNo.value -= 1;
    queryCommentList();
  }

  /**
   * 关闭回复
   * @param pid
   * @param topPid
   */
  function closeReply(pid, topPid) {
    const result = commentList.value.find(item => item.id === topPid);
    if(pid === topPid) {
      result.showReply = false;
    } else {
      const childrenResult = result.children.find(item => item.id === pid);
      childrenResult.showReply = false;
    }
  }

  function commentSubmitSuccess(pid, topPid) {
    emit('commentSubmitSuccess', pid, topPid);
    if (topPid === -1) {
      pageNo.value = 1;
      queryCommentList();
      return;
    }
    const result = commentList.value.find(item => item.id === topPid);
    result.pageNo = 1;
    queryChildComment(result);
    closeReply(pid, topPid);
  }

  /**
   * 获取登录用户
   */
  function getLoginUser() {
    getLoginUserApi().then(res => {
      user.value = res.data;
    });
  }

  getLoginUser();
  queryCommentList();
  
return (_ctx, _cache) => {
  return (io(), id("div", null, [
    ib("div", _hoisted_1, [
      iS(_sfc_main$1, {
        "article-id": __props.articleId,
        "user-id": t$(user)?.id,
        pid: -1,
        "top-pid": -1,
        onCommentSubmit: commentSubmitSuccess
      }, null, 8, ["article-id", "user-id"]),
      (__props.showCommentList === 'true')
        ? (io(), id("div", _hoisted_2, [
            ib("div", _hoisted_3, [
              (t$(commentListLoading))
                ? (io(), id("div", _hoisted_4, [
                    (io(), id("svg", _hoisted_5, _cache[0] || (_cache[0] = [
                      iw("<g><g transform=\"rotate(0 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.9166666666666666s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(30 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.8333333333333334s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(60 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.75s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(90 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.6666666666666666s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(120 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.5833333333333334s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(150 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.5s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(180 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.4166666666666667s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(210 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.3333333333333333s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(240 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.25s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(270 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.16666666666666666s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(300 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.08333333333333333s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(330 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"0s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g></g></g>", 1)
                    ]))),
                    _cache[1] || (_cache[1] = iE(" 正在加载... "))
                  ]))
                : ik("", true),
              (t$(commentList).length <= 0 && !t$(commentListLoading))
                ? (io(), id("div", _hoisted_6, "暂无评论"))
                : ik("", true),
              (io(true), id(ie, null, lF(t$(commentList), (item) => {
                return (io(), id("div", _hoisted_7, [
                  ib("div", _hoisted_8, [
                    ib("div", _hoisted_9, [
                      (item.avatar || (item.userInfo &&  item.userInfo.avatar))
                        ? (io(), id("img", {
                            key: 0,
                            src: item.userInfo ? item.userInfo.avatar : item.avatar,
                            width: "35px",
                            height: "35px"
                          }, null, 8, _hoisted_10))
                        : (io(), id("span", _hoisted_11, ef(item.userInfo ? item.userInfo.userName[0] : item.userName[0]), 1))
                    ]),
                    ib("div", _hoisted_12, [
                      ib("div", _hoisted_13, [
                        ib("span", _hoisted_14, ef(item.userInfo ? item.userInfo.userName : item.userName), 1),
                        ib("span", _hoisted_15, ef(t$(displayTime)(item.createTime)), 1),
                        ib("span", {
                          class: "comment-detail-reply-btn",
                          onClick: $event => (replyClick(item))
                        }, "回复", 8, _hoisted_16)
                      ]),
                      ib("div", _hoisted_17, ef(item.content), 1),
                      (item.showReply)
                        ? (io(), ih(_sfc_main$1, {
                            key: 0,
                            onCloseReply: closeReply,
                            onCommentSubmit: commentSubmitSuccess,
                            "user-id": t$(user)?.id,
                            pid: item.id,
                            "top-pid": item.id,
                            "article-id": item.articleId
                          }, null, 8, ["user-id", "pid", "top-pid", "article-id"]))
                        : ik("", true)
                    ])
                  ]),
                  (item.children)
                    ? (io(true), id(ie, { key: 0 }, lF(item.children, (childItem) => {
                        return (io(), id("div", _hoisted_18, [
                          ib("div", _hoisted_19, [
                            ib("div", _hoisted_20, [
                              (childItem.avatar || (childItem.userInfo &&  childItem.userInfo.avatar))
                                ? (io(), id("img", {
                                    key: 0,
                                    src: childItem.userInfo ? childItem.userInfo.avatar : childItem.avatar,
                                    width: "35px",
                                    height: "35px"
                                  }, null, 8, _hoisted_21))
                                : (io(), id("span", _hoisted_22, ef(childItem.userInfo ? childItem.userInfo.userName[0] : childItem.userName[0]), 1))
                            ]),
                            ib("div", _hoisted_23, [
                              ib("div", _hoisted_24, [
                                ib("span", _hoisted_25, ef(childItem.userInfo ? childItem.userInfo.userName : childItem.userName), 1),
                                ib("span", _hoisted_26, ef(t$(displayTime)(childItem.createTime)), 1),
                                ib("span", {
                                  class: "comment-detail-reply-btn",
                                  onClick: $event => (replyClick(childItem))
                                }, "回复", 8, _hoisted_27)
                              ]),
                              ib("div", _hoisted_28, [
                                ib("span", _hoisted_29, "@" + ef(item.userInfo?item.userInfo.userName: item.userName), 1),
                                iE(" " + ef(childItem.content), 1)
                              ])
                            ])
                          ]),
                          (childItem.showReply)
                            ? (io(), ih(_sfc_main$1, {
                                key: 0,
                                onCloseReply: closeReply,
                                onCommentSubmit: commentSubmitSuccess,
                                "user-id": t$(user)?.id,
                                "article-id": item.articleId,
                                pid: childItem.id,
                                "top-pid": item.id
                              }, null, 8, ["user-id", "article-id", "pid", "top-pid"]))
                            : ik("", true)
                        ]))
                      }), 256))
                    : ik("", true),
                  (item.childNum > (item.children? item.children.length : 0))
                    ? (io(), id("div", _hoisted_30, [
                        (!item.childLoading && (!item.pageNo || item.pageNo < 1))
                          ? (io(), id("div", {
                              key: 0,
                              onClick: $event => (loadChildComment(item))
                            }, [
                              _cache[2] || (_cache[2] = ib("span", null, [
                                ib("svg", {
                                  t: "1726215212639",
                                  class: "icon",
                                  viewBox: "0 0 1024 1024",
                                  version: "1.1",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  "p-id": "4239",
                                  width: "10",
                                  height: "10"
                                }, [
                                  ib("path", {
                                    d: "M512 565.12a45.44 45.44 0 0 1-32.64-13.44l-448-451.84a45.44 45.44 0 0 1 64-64L512 454.4 931.84 35.2a46.08 46.08 0 0 1 64 0 45.44 45.44 0 0 1 0 64L545.28 551.68a45.44 45.44 0 0 1-33.28 13.44z",
                                    fill: "#323333",
                                    "p-id": "4240"
                                  }),
                                  ib("path", {
                                    d: "M512 1016.96a45.44 45.44 0 0 1-32.64-13.44l-448-451.84a45.44 45.44 0 0 1 64-64L512 906.24l419.2-419.2a46.08 46.08 0 0 1 64 0 45.44 45.44 0 0 1 0 64l-449.92 452.48a45.44 45.44 0 0 1-33.28 13.44z",
                                    fill: "#323333",
                                    "p-id": "4241"
                                  })
                                ])
                              ], -1)),
                              iE(" 展开" + ef(item.childNum) + "条回复 ", 1)
                            ], 8, _hoisted_31))
                          : ik("", true),
                        (!item.childLoading && item.pageNo && item.pageNo >= 1 && item.pageNo < Math.ceil(item.childNum / t$(pageSize)))
                          ? (io(), id("div", {
                              key: 1,
                              class: "comment-load-more",
                              onClick: $event => (loadChildComment(item))
                            }, _cache[3] || (_cache[3] = [
                              ib("span", null, [
                                ib("svg", {
                                  t: "1726215212639",
                                  class: "icon",
                                  viewBox: "0 0 1024 1024",
                                  version: "1.1",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  "p-id": "4239",
                                  width: "10",
                                  height: "10"
                                }, [
                                  ib("path", {
                                    d: "M512 565.12a45.44 45.44 0 0 1-32.64-13.44l-448-451.84a45.44 45.44 0 0 1 64-64L512 454.4 931.84 35.2a46.08 46.08 0 0 1 64 0 45.44 45.44 0 0 1 0 64L545.28 551.68a45.44 45.44 0 0 1-33.28 13.44z",
                                    fill: "#323333",
                                    "p-id": "4240"
                                  }),
                                  ib("path", {
                                    d: "M512 1016.96a45.44 45.44 0 0 1-32.64-13.44l-448-451.84a45.44 45.44 0 0 1 64-64L512 906.24l419.2-419.2a46.08 46.08 0 0 1 64 0 45.44 45.44 0 0 1 0 64l-449.92 452.48a45.44 45.44 0 0 1-33.28 13.44z",
                                    fill: "#323333",
                                    "p-id": "4241"
                                  })
                                ])
                              ], -1),
                              iE(" 加载更多 ")
                            ]), 8, _hoisted_32))
                          : ik("", true),
                        (item.childLoading)
                          ? (io(), id("div", _hoisted_33, [
                              (io(), id("svg", _hoisted_34, _cache[4] || (_cache[4] = [
                                iw("<g><g transform=\"rotate(0 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.9166666666666666s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(30 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.8333333333333334s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(60 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.75s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(90 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.6666666666666666s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(120 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.5833333333333334s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(150 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.5s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(180 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.4166666666666667s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(210 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.3333333333333333s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(240 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.25s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(270 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.16666666666666666s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(300 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"-0.08333333333333333s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g transform=\"rotate(330 50 50)\"><rect fill=\"#303133\" height=\"12\" width=\"6\" ry=\"6\" rx=\"3\" y=\"24\" x=\"47\"><animate repeatCount=\"indefinite\" begin=\"0s\" dur=\"1s\" keyTimes=\"0;1\" values=\"1;0\" attributeName=\"opacity\"></animate></rect></g><g></g></g>", 1)
                              ]))),
                              _cache[5] || (_cache[5] = iE(" 正在加载... "))
                            ]))
                          : ik("", true)
                      ]))
                    : ik("", true)
                ]))
              }), 256))
            ]),
            (t$(total) > 0 && Math.ceil(t$(total) / t$(pageSize)) > 1)
              ? (io(), id("ul", _hoisted_35, [
                  (t$(pageNo) > 1)
                    ? (io(), id("li", {
                        key: 0,
                        class: "comment-pagination-pre",
                        onClick: prePage
                      }, "上一页"))
                    : ik("", true),
                  ib("li", _hoisted_36, ef(t$(pageNo)) + "/ " + ef(Math.ceil(t$(total) / t$(pageSize))), 1),
                  (t$(pageNo) < Math.ceil(t$(total) / t$(pageSize)) )
                    ? (io(), id("li", {
                        key: 1,
                        class: "comment-pagination-next",
                        onClick: nextPage
                      }, "下一页"))
                    : ik("", true)
                ]))
              : ik("", true)
          ]))
        : ik("", true)
    ])
  ]))
}
}

};

const PerfreeCommentElement = sW(_sfc_main, {
    shadowRoot: false
});
// 注册自定义元素
window.customElements.define('perfree-comment', PerfreeCommentElement);
