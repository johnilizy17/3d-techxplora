function Iy(i,e){for(var t=0;t<e.length;t++){const s=e[t];if(typeof s!="string"&&!Array.isArray(s)){for(const o in s)if(o!=="default"&&!(o in i)){const l=Object.getOwnPropertyDescriptor(s,o);l&&Object.defineProperty(i,o,l.get?l:{enumerable:!0,get:()=>s[o]})}}}return Object.freeze(Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();function xh(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var xd={exports:{}},na={},yd={exports:{}},_t={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pg;function Uy(){if(pg)return _t;pg=1;var i=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),u=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),f=Symbol.for("react.memo"),m=Symbol.for("react.lazy"),g=Symbol.iterator;function x(H){return H===null||typeof H!="object"?null:(H=g&&H[g]||H["@@iterator"],typeof H=="function"?H:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},M=Object.assign,E={};function y(H,ae,Ae){this.props=H,this.context=ae,this.refs=E,this.updater=Ae||S}y.prototype.isReactComponent={},y.prototype.setState=function(H,ae){if(typeof H!="object"&&typeof H!="function"&&H!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,H,ae,"setState")},y.prototype.forceUpdate=function(H){this.updater.enqueueForceUpdate(this,H,"forceUpdate")};function _(){}_.prototype=y.prototype;function N(H,ae,Ae){this.props=H,this.context=ae,this.refs=E,this.updater=Ae||S}var P=N.prototype=new _;P.constructor=N,M(P,y.prototype),P.isPureReactComponent=!0;var b=Array.isArray,k=Object.prototype.hasOwnProperty,B={current:null},I={key:!0,ref:!0,__self:!0,__source:!0};function z(H,ae,Ae){var Re,Fe={},ne=null,se=null;if(ae!=null)for(Re in ae.ref!==void 0&&(se=ae.ref),ae.key!==void 0&&(ne=""+ae.key),ae)k.call(ae,Re)&&!I.hasOwnProperty(Re)&&(Fe[Re]=ae[Re]);var ye=arguments.length-2;if(ye===1)Fe.children=Ae;else if(1<ye){for(var Ne=Array(ye),Ie=0;Ie<ye;Ie++)Ne[Ie]=arguments[Ie+2];Fe.children=Ne}if(H&&H.defaultProps)for(Re in ye=H.defaultProps,ye)Fe[Re]===void 0&&(Fe[Re]=ye[Re]);return{$$typeof:i,type:H,key:ne,ref:se,props:Fe,_owner:B.current}}function C(H,ae){return{$$typeof:i,type:H.type,key:ae,ref:H.ref,props:H.props,_owner:H._owner}}function R(H){return typeof H=="object"&&H!==null&&H.$$typeof===i}function G(H){var ae={"=":"=0",":":"=2"};return"$"+H.replace(/[=:]/g,function(Ae){return ae[Ae]})}var q=/\/+/g;function ie(H,ae){return typeof H=="object"&&H!==null&&H.key!=null?G(""+H.key):ae.toString(36)}function Q(H,ae,Ae,Re,Fe){var ne=typeof H;(ne==="undefined"||ne==="boolean")&&(H=null);var se=!1;if(H===null)se=!0;else switch(ne){case"string":case"number":se=!0;break;case"object":switch(H.$$typeof){case i:case e:se=!0}}if(se)return se=H,Fe=Fe(se),H=Re===""?"."+ie(se,0):Re,b(Fe)?(Ae="",H!=null&&(Ae=H.replace(q,"$&/")+"/"),Q(Fe,ae,Ae,"",function(Ie){return Ie})):Fe!=null&&(R(Fe)&&(Fe=C(Fe,Ae+(!Fe.key||se&&se.key===Fe.key?"":(""+Fe.key).replace(q,"$&/")+"/")+H)),ae.push(Fe)),1;if(se=0,Re=Re===""?".":Re+":",b(H))for(var ye=0;ye<H.length;ye++){ne=H[ye];var Ne=Re+ie(ne,ye);se+=Q(ne,ae,Ae,Ne,Fe)}else if(Ne=x(H),typeof Ne=="function")for(H=Ne.call(H),ye=0;!(ne=H.next()).done;)ne=ne.value,Ne=Re+ie(ne,ye++),se+=Q(ne,ae,Ae,Ne,Fe);else if(ne==="object")throw ae=String(H),Error("Objects are not valid as a React child (found: "+(ae==="[object Object]"?"object with keys {"+Object.keys(H).join(", ")+"}":ae)+"). If you meant to render a collection of children, use an array instead.");return se}function re(H,ae,Ae){if(H==null)return H;var Re=[],Fe=0;return Q(H,Re,"","",function(ne){return ae.call(Ae,ne,Fe++)}),Re}function te(H){if(H._status===-1){var ae=H._result;ae=ae(),ae.then(function(Ae){(H._status===0||H._status===-1)&&(H._status=1,H._result=Ae)},function(Ae){(H._status===0||H._status===-1)&&(H._status=2,H._result=Ae)}),H._status===-1&&(H._status=0,H._result=ae)}if(H._status===1)return H._result.default;throw H._result}var de={current:null},U={transition:null},fe={ReactCurrentDispatcher:de,ReactCurrentBatchConfig:U,ReactCurrentOwner:B};function ue(){throw Error("act(...) is not supported in production builds of React.")}return _t.Children={map:re,forEach:function(H,ae,Ae){re(H,function(){ae.apply(this,arguments)},Ae)},count:function(H){var ae=0;return re(H,function(){ae++}),ae},toArray:function(H){return re(H,function(ae){return ae})||[]},only:function(H){if(!R(H))throw Error("React.Children.only expected to receive a single React element child.");return H}},_t.Component=y,_t.Fragment=t,_t.Profiler=o,_t.PureComponent=N,_t.StrictMode=s,_t.Suspense=h,_t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=fe,_t.act=ue,_t.cloneElement=function(H,ae,Ae){if(H==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+H+".");var Re=M({},H.props),Fe=H.key,ne=H.ref,se=H._owner;if(ae!=null){if(ae.ref!==void 0&&(ne=ae.ref,se=B.current),ae.key!==void 0&&(Fe=""+ae.key),H.type&&H.type.defaultProps)var ye=H.type.defaultProps;for(Ne in ae)k.call(ae,Ne)&&!I.hasOwnProperty(Ne)&&(Re[Ne]=ae[Ne]===void 0&&ye!==void 0?ye[Ne]:ae[Ne])}var Ne=arguments.length-2;if(Ne===1)Re.children=Ae;else if(1<Ne){ye=Array(Ne);for(var Ie=0;Ie<Ne;Ie++)ye[Ie]=arguments[Ie+2];Re.children=ye}return{$$typeof:i,type:H.type,key:Fe,ref:ne,props:Re,_owner:se}},_t.createContext=function(H){return H={$$typeof:u,_currentValue:H,_currentValue2:H,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},H.Provider={$$typeof:l,_context:H},H.Consumer=H},_t.createElement=z,_t.createFactory=function(H){var ae=z.bind(null,H);return ae.type=H,ae},_t.createRef=function(){return{current:null}},_t.forwardRef=function(H){return{$$typeof:d,render:H}},_t.isValidElement=R,_t.lazy=function(H){return{$$typeof:m,_payload:{_status:-1,_result:H},_init:te}},_t.memo=function(H,ae){return{$$typeof:f,type:H,compare:ae===void 0?null:ae}},_t.startTransition=function(H){var ae=U.transition;U.transition={};try{H()}finally{U.transition=ae}},_t.unstable_act=ue,_t.useCallback=function(H,ae){return de.current.useCallback(H,ae)},_t.useContext=function(H){return de.current.useContext(H)},_t.useDebugValue=function(){},_t.useDeferredValue=function(H){return de.current.useDeferredValue(H)},_t.useEffect=function(H,ae){return de.current.useEffect(H,ae)},_t.useId=function(){return de.current.useId()},_t.useImperativeHandle=function(H,ae,Ae){return de.current.useImperativeHandle(H,ae,Ae)},_t.useInsertionEffect=function(H,ae){return de.current.useInsertionEffect(H,ae)},_t.useLayoutEffect=function(H,ae){return de.current.useLayoutEffect(H,ae)},_t.useMemo=function(H,ae){return de.current.useMemo(H,ae)},_t.useReducer=function(H,ae,Ae){return de.current.useReducer(H,ae,Ae)},_t.useRef=function(H){return de.current.useRef(H)},_t.useState=function(H){return de.current.useState(H)},_t.useSyncExternalStore=function(H,ae,Ae){return de.current.useSyncExternalStore(H,ae,Ae)},_t.useTransition=function(){return de.current.useTransition()},_t.version="18.3.1",_t}var mg;function yh(){return mg||(mg=1,yd.exports=Uy()),yd.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gg;function Fy(){if(gg)return na;gg=1;var i=yh(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,o=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function u(d,h,f){var m,g={},x=null,S=null;f!==void 0&&(x=""+f),h.key!==void 0&&(x=""+h.key),h.ref!==void 0&&(S=h.ref);for(m in h)s.call(h,m)&&!l.hasOwnProperty(m)&&(g[m]=h[m]);if(d&&d.defaultProps)for(m in h=d.defaultProps,h)g[m]===void 0&&(g[m]=h[m]);return{$$typeof:e,type:d,key:x,ref:S,props:g,_owner:o.current}}return na.Fragment=t,na.jsx=u,na.jsxs=u,na}var vg;function Oy(){return vg||(vg=1,xd.exports=Fy()),xd.exports}var O=Oy(),L=yh();const ky=xh(L),Kv=Iy({__proto__:null,default:ky},[L]);var Ol={},Sd={exports:{}},Un={},Ed={exports:{}},Md={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _g;function zy(){return _g||(_g=1,(function(i){function e(U,fe){var ue=U.length;U.push(fe);e:for(;0<ue;){var H=ue-1>>>1,ae=U[H];if(0<o(ae,fe))U[H]=fe,U[ue]=ae,ue=H;else break e}}function t(U){return U.length===0?null:U[0]}function s(U){if(U.length===0)return null;var fe=U[0],ue=U.pop();if(ue!==fe){U[0]=ue;e:for(var H=0,ae=U.length,Ae=ae>>>1;H<Ae;){var Re=2*(H+1)-1,Fe=U[Re],ne=Re+1,se=U[ne];if(0>o(Fe,ue))ne<ae&&0>o(se,Fe)?(U[H]=se,U[ne]=ue,H=ne):(U[H]=Fe,U[Re]=ue,H=Re);else if(ne<ae&&0>o(se,ue))U[H]=se,U[ne]=ue,H=ne;else break e}}return fe}function o(U,fe){var ue=U.sortIndex-fe.sortIndex;return ue!==0?ue:U.id-fe.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;i.unstable_now=function(){return l.now()}}else{var u=Date,d=u.now();i.unstable_now=function(){return u.now()-d}}var h=[],f=[],m=1,g=null,x=3,S=!1,M=!1,E=!1,y=typeof setTimeout=="function"?setTimeout:null,_=typeof clearTimeout=="function"?clearTimeout:null,N=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function P(U){for(var fe=t(f);fe!==null;){if(fe.callback===null)s(f);else if(fe.startTime<=U)s(f),fe.sortIndex=fe.expirationTime,e(h,fe);else break;fe=t(f)}}function b(U){if(E=!1,P(U),!M)if(t(h)!==null)M=!0,te(k);else{var fe=t(f);fe!==null&&de(b,fe.startTime-U)}}function k(U,fe){M=!1,E&&(E=!1,_(z),z=-1),S=!0;var ue=x;try{for(P(fe),g=t(h);g!==null&&(!(g.expirationTime>fe)||U&&!G());){var H=g.callback;if(typeof H=="function"){g.callback=null,x=g.priorityLevel;var ae=H(g.expirationTime<=fe);fe=i.unstable_now(),typeof ae=="function"?g.callback=ae:g===t(h)&&s(h),P(fe)}else s(h);g=t(h)}if(g!==null)var Ae=!0;else{var Re=t(f);Re!==null&&de(b,Re.startTime-fe),Ae=!1}return Ae}finally{g=null,x=ue,S=!1}}var B=!1,I=null,z=-1,C=5,R=-1;function G(){return!(i.unstable_now()-R<C)}function q(){if(I!==null){var U=i.unstable_now();R=U;var fe=!0;try{fe=I(!0,U)}finally{fe?ie():(B=!1,I=null)}}else B=!1}var ie;if(typeof N=="function")ie=function(){N(q)};else if(typeof MessageChannel<"u"){var Q=new MessageChannel,re=Q.port2;Q.port1.onmessage=q,ie=function(){re.postMessage(null)}}else ie=function(){y(q,0)};function te(U){I=U,B||(B=!0,ie())}function de(U,fe){z=y(function(){U(i.unstable_now())},fe)}i.unstable_IdlePriority=5,i.unstable_ImmediatePriority=1,i.unstable_LowPriority=4,i.unstable_NormalPriority=3,i.unstable_Profiling=null,i.unstable_UserBlockingPriority=2,i.unstable_cancelCallback=function(U){U.callback=null},i.unstable_continueExecution=function(){M||S||(M=!0,te(k))},i.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<U?Math.floor(1e3/U):5},i.unstable_getCurrentPriorityLevel=function(){return x},i.unstable_getFirstCallbackNode=function(){return t(h)},i.unstable_next=function(U){switch(x){case 1:case 2:case 3:var fe=3;break;default:fe=x}var ue=x;x=fe;try{return U()}finally{x=ue}},i.unstable_pauseExecution=function(){},i.unstable_requestPaint=function(){},i.unstable_runWithPriority=function(U,fe){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var ue=x;x=U;try{return fe()}finally{x=ue}},i.unstable_scheduleCallback=function(U,fe,ue){var H=i.unstable_now();switch(typeof ue=="object"&&ue!==null?(ue=ue.delay,ue=typeof ue=="number"&&0<ue?H+ue:H):ue=H,U){case 1:var ae=-1;break;case 2:ae=250;break;case 5:ae=1073741823;break;case 4:ae=1e4;break;default:ae=5e3}return ae=ue+ae,U={id:m++,callback:fe,priorityLevel:U,startTime:ue,expirationTime:ae,sortIndex:-1},ue>H?(U.sortIndex=ue,e(f,U),t(h)===null&&U===t(f)&&(E?(_(z),z=-1):E=!0,de(b,ue-H))):(U.sortIndex=ae,e(h,U),M||S||(M=!0,te(k))),U},i.unstable_shouldYield=G,i.unstable_wrapCallback=function(U){var fe=x;return function(){var ue=x;x=fe;try{return U.apply(this,arguments)}finally{x=ue}}}})(Md)),Md}var xg;function By(){return xg||(xg=1,Ed.exports=zy()),Ed.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yg;function Hy(){if(yg)return Un;yg=1;var i=yh(),e=By();function t(n){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+n,a=1;a<arguments.length;a++)r+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+n+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s=new Set,o={};function l(n,r){u(n,r),u(n+"Capture",r)}function u(n,r){for(o[n]=r,n=0;n<r.length;n++)s.add(r[n])}var d=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),h=Object.prototype.hasOwnProperty,f=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,m={},g={};function x(n){return h.call(g,n)?!0:h.call(m,n)?!1:f.test(n)?g[n]=!0:(m[n]=!0,!1)}function S(n,r,a,c){if(a!==null&&a.type===0)return!1;switch(typeof r){case"function":case"symbol":return!0;case"boolean":return c?!1:a!==null?!a.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function M(n,r,a,c){if(r===null||typeof r>"u"||S(n,r,a,c))return!0;if(c)return!1;if(a!==null)switch(a.type){case 3:return!r;case 4:return r===!1;case 5:return isNaN(r);case 6:return isNaN(r)||1>r}return!1}function E(n,r,a,c,p,v,w){this.acceptsBooleans=r===2||r===3||r===4,this.attributeName=c,this.attributeNamespace=p,this.mustUseProperty=a,this.propertyName=n,this.type=r,this.sanitizeURL=v,this.removeEmptyString=w}var y={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){y[n]=new E(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var r=n[0];y[r]=new E(r,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){y[n]=new E(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){y[n]=new E(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){y[n]=new E(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){y[n]=new E(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){y[n]=new E(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){y[n]=new E(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){y[n]=new E(n,5,!1,n.toLowerCase(),null,!1,!1)});var _=/[\-:]([a-z])/g;function N(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var r=n.replace(_,N);y[r]=new E(r,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var r=n.replace(_,N);y[r]=new E(r,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var r=n.replace(_,N);y[r]=new E(r,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){y[n]=new E(n,1,!1,n.toLowerCase(),null,!1,!1)}),y.xlinkHref=new E("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){y[n]=new E(n,1,!1,n.toLowerCase(),null,!0,!0)});function P(n,r,a,c){var p=y.hasOwnProperty(r)?y[r]:null;(p!==null?p.type!==0:c||!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(M(r,a,p,c)&&(a=null),c||p===null?x(r)&&(a===null?n.removeAttribute(r):n.setAttribute(r,""+a)):p.mustUseProperty?n[p.propertyName]=a===null?p.type===3?!1:"":a:(r=p.attributeName,c=p.attributeNamespace,a===null?n.removeAttribute(r):(p=p.type,a=p===3||p===4&&a===!0?"":""+a,c?n.setAttributeNS(c,r,a):n.setAttribute(r,a))))}var b=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,k=Symbol.for("react.element"),B=Symbol.for("react.portal"),I=Symbol.for("react.fragment"),z=Symbol.for("react.strict_mode"),C=Symbol.for("react.profiler"),R=Symbol.for("react.provider"),G=Symbol.for("react.context"),q=Symbol.for("react.forward_ref"),ie=Symbol.for("react.suspense"),Q=Symbol.for("react.suspense_list"),re=Symbol.for("react.memo"),te=Symbol.for("react.lazy"),de=Symbol.for("react.offscreen"),U=Symbol.iterator;function fe(n){return n===null||typeof n!="object"?null:(n=U&&n[U]||n["@@iterator"],typeof n=="function"?n:null)}var ue=Object.assign,H;function ae(n){if(H===void 0)try{throw Error()}catch(a){var r=a.stack.trim().match(/\n( *(at )?)/);H=r&&r[1]||""}return`
`+H+n}var Ae=!1;function Re(n,r){if(!n||Ae)return"";Ae=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(r)if(r=function(){throw Error()},Object.defineProperty(r.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(r,[])}catch(oe){var c=oe}Reflect.construct(n,[],r)}else{try{r.call()}catch(oe){c=oe}n.call(r.prototype)}else{try{throw Error()}catch(oe){c=oe}n()}}catch(oe){if(oe&&c&&typeof oe.stack=="string"){for(var p=oe.stack.split(`
`),v=c.stack.split(`
`),w=p.length-1,F=v.length-1;1<=w&&0<=F&&p[w]!==v[F];)F--;for(;1<=w&&0<=F;w--,F--)if(p[w]!==v[F]){if(w!==1||F!==1)do if(w--,F--,0>F||p[w]!==v[F]){var W=`
`+p[w].replace(" at new "," at ");return n.displayName&&W.includes("<anonymous>")&&(W=W.replace("<anonymous>",n.displayName)),W}while(1<=w&&0<=F);break}}}finally{Ae=!1,Error.prepareStackTrace=a}return(n=n?n.displayName||n.name:"")?ae(n):""}function Fe(n){switch(n.tag){case 5:return ae(n.type);case 16:return ae("Lazy");case 13:return ae("Suspense");case 19:return ae("SuspenseList");case 0:case 2:case 15:return n=Re(n.type,!1),n;case 11:return n=Re(n.type.render,!1),n;case 1:return n=Re(n.type,!0),n;default:return""}}function ne(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case I:return"Fragment";case B:return"Portal";case C:return"Profiler";case z:return"StrictMode";case ie:return"Suspense";case Q:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case G:return(n.displayName||"Context")+".Consumer";case R:return(n._context.displayName||"Context")+".Provider";case q:var r=n.render;return n=n.displayName,n||(n=r.displayName||r.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case re:return r=n.displayName||null,r!==null?r:ne(n.type)||"Memo";case te:r=n._payload,n=n._init;try{return ne(n(r))}catch{}}return null}function se(n){var r=n.type;switch(n.tag){case 24:return"Cache";case 9:return(r.displayName||"Context")+".Consumer";case 10:return(r._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=r.render,n=n.displayName||n.name||"",r.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return r;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ne(r);case 8:return r===z?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof r=="function")return r.displayName||r.name||null;if(typeof r=="string")return r}return null}function ye(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Ne(n){var r=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(r==="checkbox"||r==="radio")}function Ie(n){var r=Ne(n)?"checked":"value",a=Object.getOwnPropertyDescriptor(n.constructor.prototype,r),c=""+n[r];if(!n.hasOwnProperty(r)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var p=a.get,v=a.set;return Object.defineProperty(n,r,{configurable:!0,get:function(){return p.call(this)},set:function(w){c=""+w,v.call(this,w)}}),Object.defineProperty(n,r,{enumerable:a.enumerable}),{getValue:function(){return c},setValue:function(w){c=""+w},stopTracking:function(){n._valueTracker=null,delete n[r]}}}}function pt(n){n._valueTracker||(n._valueTracker=Ie(n))}function Wt(n){if(!n)return!1;var r=n._valueTracker;if(!r)return!0;var a=r.getValue(),c="";return n&&(c=Ne(n)?n.checked?"true":"false":n.value),n=c,n!==a?(r.setValue(n),!0):!1}function V(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function Nt(n,r){var a=r.checked;return ue({},r,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??n._wrapperState.initialChecked})}function ft(n,r){var a=r.defaultValue==null?"":r.defaultValue,c=r.checked!=null?r.checked:r.defaultChecked;a=ye(r.value!=null?r.value:a),n._wrapperState={initialChecked:c,initialValue:a,controlled:r.type==="checkbox"||r.type==="radio"?r.checked!=null:r.value!=null}}function st(n,r){r=r.checked,r!=null&&P(n,"checked",r,!1)}function Xe(n,r){st(n,r);var a=ye(r.value),c=r.type;if(a!=null)c==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+a):n.value!==""+a&&(n.value=""+a);else if(c==="submit"||c==="reset"){n.removeAttribute("value");return}r.hasOwnProperty("value")?$e(n,r.type,a):r.hasOwnProperty("defaultValue")&&$e(n,r.type,ye(r.defaultValue)),r.checked==null&&r.defaultChecked!=null&&(n.defaultChecked=!!r.defaultChecked)}function Ft(n,r,a){if(r.hasOwnProperty("value")||r.hasOwnProperty("defaultValue")){var c=r.type;if(!(c!=="submit"&&c!=="reset"||r.value!==void 0&&r.value!==null))return;r=""+n._wrapperState.initialValue,a||r===n.value||(n.value=r),n.defaultValue=r}a=n.name,a!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,a!==""&&(n.name=a)}function $e(n,r,a){(r!=="number"||V(n.ownerDocument)!==n)&&(a==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+a&&(n.defaultValue=""+a))}var ut=Array.isArray;function Bt(n,r,a,c){if(n=n.options,r){r={};for(var p=0;p<a.length;p++)r["$"+a[p]]=!0;for(a=0;a<n.length;a++)p=r.hasOwnProperty("$"+n[a].value),n[a].selected!==p&&(n[a].selected=p),p&&c&&(n[a].defaultSelected=!0)}else{for(a=""+ye(a),r=null,p=0;p<n.length;p++){if(n[p].value===a){n[p].selected=!0,c&&(n[p].defaultSelected=!0);return}r!==null||n[p].disabled||(r=n[p])}r!==null&&(r.selected=!0)}}function Ht(n,r){if(r.dangerouslySetInnerHTML!=null)throw Error(t(91));return ue({},r,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function D(n,r){var a=r.value;if(a==null){if(a=r.children,r=r.defaultValue,a!=null){if(r!=null)throw Error(t(92));if(ut(a)){if(1<a.length)throw Error(t(93));a=a[0]}r=a}r==null&&(r=""),a=r}n._wrapperState={initialValue:ye(a)}}function T(n,r){var a=ye(r.value),c=ye(r.defaultValue);a!=null&&(a=""+a,a!==n.value&&(n.value=a),r.defaultValue==null&&n.defaultValue!==a&&(n.defaultValue=a)),c!=null&&(n.defaultValue=""+c)}function J(n){var r=n.textContent;r===n._wrapperState.initialValue&&r!==""&&r!==null&&(n.value=r)}function pe(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ve(n,r){return n==null||n==="http://www.w3.org/1999/xhtml"?pe(r):n==="http://www.w3.org/2000/svg"&&r==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var he,Qe=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(r,a,c,p){MSApp.execUnsafeLocalFunction(function(){return n(r,a,c,p)})}:n})(function(n,r){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=r;else{for(he=he||document.createElement("div"),he.innerHTML="<svg>"+r.valueOf().toString()+"</svg>",r=he.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;r.firstChild;)n.appendChild(r.firstChild)}});function be(n,r){if(r){var a=n.firstChild;if(a&&a===n.lastChild&&a.nodeType===3){a.nodeValue=r;return}}n.textContent=r}var He={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Je=["Webkit","ms","Moz","O"];Object.keys(He).forEach(function(n){Je.forEach(function(r){r=r+n.charAt(0).toUpperCase()+n.substring(1),He[r]=He[n]})});function we(n,r,a){return r==null||typeof r=="boolean"||r===""?"":a||typeof r!="number"||r===0||He.hasOwnProperty(n)&&He[n]?(""+r).trim():r+"px"}function Ue(n,r){n=n.style;for(var a in r)if(r.hasOwnProperty(a)){var c=a.indexOf("--")===0,p=we(a,r[a],c);a==="float"&&(a="cssFloat"),c?n.setProperty(a,p):n[a]=p}}var ot=ue({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ke(n,r){if(r){if(ot[n]&&(r.children!=null||r.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(r.dangerouslySetInnerHTML!=null){if(r.children!=null)throw Error(t(60));if(typeof r.dangerouslySetInnerHTML!="object"||!("__html"in r.dangerouslySetInnerHTML))throw Error(t(61))}if(r.style!=null&&typeof r.style!="object")throw Error(t(62))}}function Pe(n,r){if(n.indexOf("-")===-1)return typeof r.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ht=null;function j(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var Ee=null,Ce=null,Oe=null;function Se(n){if(n=Ho(n)){if(typeof Ee!="function")throw Error(t(280));var r=n.stateNode;r&&(r=Qa(r),Ee(n.stateNode,n.type,r))}}function me(n){Ce?Oe?Oe.push(n):Oe=[n]:Ce=n}function Ye(){if(Ce){var n=Ce,r=Oe;if(Oe=Ce=null,Se(n),r)for(n=0;n<r.length;n++)Se(r[n])}}function dt(n,r){return n(r)}function Pt(){}var Mt=!1;function Yn(n,r,a){if(Mt)return n(r,a);Mt=!0;try{return dt(n,r,a)}finally{Mt=!1,(Ce!==null||Oe!==null)&&(Pt(),Ye())}}function gn(n,r){var a=n.stateNode;if(a===null)return null;var c=Qa(a);if(c===null)return null;a=c[r];e:switch(r){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(n=n.type,c=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!c;break e;default:n=!1}if(n)return null;if(a&&typeof a!="function")throw Error(t(231,r,typeof a));return a}var vs=!1;if(d)try{var Bn={};Object.defineProperty(Bn,"passive",{get:function(){vs=!0}}),window.addEventListener("test",Bn,Bn),window.removeEventListener("test",Bn,Bn)}catch{vs=!1}function wo(n,r,a,c,p,v,w,F,W){var oe=Array.prototype.slice.call(arguments,3);try{r.apply(a,oe)}catch(_e){this.onError(_e)}}var rr=!1,zr=null,Di=!1,_s=null,xs={onError:function(n){rr=!0,zr=n}};function La(n,r,a,c,p,v,w,F,W){rr=!1,zr=null,wo.apply(xs,arguments)}function Na(n,r,a,c,p,v,w,F,W){if(La.apply(this,arguments),rr){if(rr){var oe=zr;rr=!1,zr=null}else throw Error(t(198));Di||(Di=!0,_s=oe)}}function Ii(n){var r=n,a=n;if(n.alternate)for(;r.return;)r=r.return;else{n=r;do r=n,(r.flags&4098)!==0&&(a=r.return),n=r.return;while(n)}return r.tag===3?a:null}function Da(n){if(n.tag===13){var r=n.memoizedState;if(r===null&&(n=n.alternate,n!==null&&(r=n.memoizedState)),r!==null)return r.dehydrated}return null}function Ia(n){if(Ii(n)!==n)throw Error(t(188))}function Vc(n){var r=n.alternate;if(!r){if(r=Ii(n),r===null)throw Error(t(188));return r!==n?null:n}for(var a=n,c=r;;){var p=a.return;if(p===null)break;var v=p.alternate;if(v===null){if(c=p.return,c!==null){a=c;continue}break}if(p.child===v.child){for(v=p.child;v;){if(v===a)return Ia(p),n;if(v===c)return Ia(p),r;v=v.sibling}throw Error(t(188))}if(a.return!==c.return)a=p,c=v;else{for(var w=!1,F=p.child;F;){if(F===a){w=!0,a=p,c=v;break}if(F===c){w=!0,c=p,a=v;break}F=F.sibling}if(!w){for(F=v.child;F;){if(F===a){w=!0,a=v,c=p;break}if(F===c){w=!0,c=v,a=p;break}F=F.sibling}if(!w)throw Error(t(189))}}if(a.alternate!==c)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?n:r}function Ua(n){return n=Vc(n),n!==null?Fa(n):null}function Fa(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var r=Fa(n);if(r!==null)return r;n=n.sibling}return null}var A=e.unstable_scheduleCallback,Y=e.unstable_cancelCallback,le=e.unstable_shouldYield,ce=e.unstable_requestPaint,$=e.unstable_now,Me=e.unstable_getCurrentPriorityLevel,Le=e.unstable_ImmediatePriority,Ve=e.unstable_UserBlockingPriority,ke=e.unstable_NormalPriority,rt=e.unstable_LowPriority,at=e.unstable_IdlePriority,et=null,lt=null;function Rt(n){if(lt&&typeof lt.onCommitFiberRoot=="function")try{lt.onCommitFiberRoot(et,n,void 0,(n.current.flags&128)===128)}catch{}}var wt=Math.clz32?Math.clz32:tt,Ot=Math.log,Lt=Math.LN2;function tt(n){return n>>>=0,n===0?32:31-(Ot(n)/Lt|0)|0}var Dt=64,xt=4194304;function tn(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function ri(n,r){var a=n.pendingLanes;if(a===0)return 0;var c=0,p=n.suspendedLanes,v=n.pingedLanes,w=a&268435455;if(w!==0){var F=w&~p;F!==0?c=tn(F):(v&=w,v!==0&&(c=tn(v)))}else w=a&~p,w!==0?c=tn(w):v!==0&&(c=tn(v));if(c===0)return 0;if(r!==0&&r!==c&&(r&p)===0&&(p=c&-c,v=r&-r,p>=v||p===16&&(v&4194240)!==0))return r;if((c&4)!==0&&(c|=a&16),r=n.entangledLanes,r!==0)for(n=n.entanglements,r&=c;0<r;)a=31-wt(r),p=1<<a,c|=n[a],r&=~p;return c}function Tn(n,r){switch(n){case 1:case 2:case 4:return r+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return r+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Br(n,r){for(var a=n.suspendedLanes,c=n.pingedLanes,p=n.expirationTimes,v=n.pendingLanes;0<v;){var w=31-wt(v),F=1<<w,W=p[w];W===-1?((F&a)===0||(F&c)!==0)&&(p[w]=Tn(F,r)):W<=r&&(n.expiredLanes|=F),v&=~F}}function kt(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function bn(){var n=Dt;return Dt<<=1,(Dt&4194240)===0&&(Dt=64),n}function vn(n){for(var r=[],a=0;31>a;a++)r.push(n);return r}function Zt(n,r,a){n.pendingLanes|=r,r!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,r=31-wt(r),n[r]=a}function _n(n,r){var a=n.pendingLanes&~r;n.pendingLanes=r,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=r,n.mutableReadLanes&=r,n.entangledLanes&=r,r=n.entanglements;var c=n.eventTimes;for(n=n.expirationTimes;0<a;){var p=31-wt(a),v=1<<p;r[p]=0,c[p]=-1,n[p]=-1,a&=~v}}function Hr(n,r){var a=n.entangledLanes|=r;for(n=n.entanglements;a;){var c=31-wt(a),p=1<<c;p&r|n[c]&r&&(n[c]|=r),a&=~p}}var yt=0;function Xh(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var $h,Gc,Yh,qh,Kh,Wc=!1,Oa=[],sr=null,or=null,ar=null,To=new Map,bo=new Map,lr=[],nx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Zh(n,r){switch(n){case"focusin":case"focusout":sr=null;break;case"dragenter":case"dragleave":or=null;break;case"mouseover":case"mouseout":ar=null;break;case"pointerover":case"pointerout":To.delete(r.pointerId);break;case"gotpointercapture":case"lostpointercapture":bo.delete(r.pointerId)}}function Ao(n,r,a,c,p,v){return n===null||n.nativeEvent!==v?(n={blockedOn:r,domEventName:a,eventSystemFlags:c,nativeEvent:v,targetContainers:[p]},r!==null&&(r=Ho(r),r!==null&&Gc(r)),n):(n.eventSystemFlags|=c,r=n.targetContainers,p!==null&&r.indexOf(p)===-1&&r.push(p),n)}function ix(n,r,a,c,p){switch(r){case"focusin":return sr=Ao(sr,n,r,a,c,p),!0;case"dragenter":return or=Ao(or,n,r,a,c,p),!0;case"mouseover":return ar=Ao(ar,n,r,a,c,p),!0;case"pointerover":var v=p.pointerId;return To.set(v,Ao(To.get(v)||null,n,r,a,c,p)),!0;case"gotpointercapture":return v=p.pointerId,bo.set(v,Ao(bo.get(v)||null,n,r,a,c,p)),!0}return!1}function Qh(n){var r=Vr(n.target);if(r!==null){var a=Ii(r);if(a!==null){if(r=a.tag,r===13){if(r=Da(a),r!==null){n.blockedOn=r,Kh(n.priority,function(){Yh(a)});return}}else if(r===3&&a.stateNode.current.memoizedState.isDehydrated){n.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}n.blockedOn=null}function ka(n){if(n.blockedOn!==null)return!1;for(var r=n.targetContainers;0<r.length;){var a=Xc(n.domEventName,n.eventSystemFlags,r[0],n.nativeEvent);if(a===null){a=n.nativeEvent;var c=new a.constructor(a.type,a);ht=c,a.target.dispatchEvent(c),ht=null}else return r=Ho(a),r!==null&&Gc(r),n.blockedOn=a,!1;r.shift()}return!0}function Jh(n,r,a){ka(n)&&a.delete(r)}function rx(){Wc=!1,sr!==null&&ka(sr)&&(sr=null),or!==null&&ka(or)&&(or=null),ar!==null&&ka(ar)&&(ar=null),To.forEach(Jh),bo.forEach(Jh)}function Co(n,r){n.blockedOn===r&&(n.blockedOn=null,Wc||(Wc=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,rx)))}function Ro(n){function r(p){return Co(p,n)}if(0<Oa.length){Co(Oa[0],n);for(var a=1;a<Oa.length;a++){var c=Oa[a];c.blockedOn===n&&(c.blockedOn=null)}}for(sr!==null&&Co(sr,n),or!==null&&Co(or,n),ar!==null&&Co(ar,n),To.forEach(r),bo.forEach(r),a=0;a<lr.length;a++)c=lr[a],c.blockedOn===n&&(c.blockedOn=null);for(;0<lr.length&&(a=lr[0],a.blockedOn===null);)Qh(a),a.blockedOn===null&&lr.shift()}var ys=b.ReactCurrentBatchConfig,za=!0;function sx(n,r,a,c){var p=yt,v=ys.transition;ys.transition=null;try{yt=1,jc(n,r,a,c)}finally{yt=p,ys.transition=v}}function ox(n,r,a,c){var p=yt,v=ys.transition;ys.transition=null;try{yt=4,jc(n,r,a,c)}finally{yt=p,ys.transition=v}}function jc(n,r,a,c){if(za){var p=Xc(n,r,a,c);if(p===null)cu(n,r,c,Ba,a),Zh(n,c);else if(ix(p,n,r,a,c))c.stopPropagation();else if(Zh(n,c),r&4&&-1<nx.indexOf(n)){for(;p!==null;){var v=Ho(p);if(v!==null&&$h(v),v=Xc(n,r,a,c),v===null&&cu(n,r,c,Ba,a),v===p)break;p=v}p!==null&&c.stopPropagation()}else cu(n,r,c,null,a)}}var Ba=null;function Xc(n,r,a,c){if(Ba=null,n=j(c),n=Vr(n),n!==null)if(r=Ii(n),r===null)n=null;else if(a=r.tag,a===13){if(n=Da(r),n!==null)return n;n=null}else if(a===3){if(r.stateNode.current.memoizedState.isDehydrated)return r.tag===3?r.stateNode.containerInfo:null;n=null}else r!==n&&(n=null);return Ba=n,null}function ep(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Me()){case Le:return 1;case Ve:return 4;case ke:case rt:return 16;case at:return 536870912;default:return 16}default:return 16}}var cr=null,$c=null,Ha=null;function tp(){if(Ha)return Ha;var n,r=$c,a=r.length,c,p="value"in cr?cr.value:cr.textContent,v=p.length;for(n=0;n<a&&r[n]===p[n];n++);var w=a-n;for(c=1;c<=w&&r[a-c]===p[v-c];c++);return Ha=p.slice(n,1<c?1-c:void 0)}function Va(n){var r=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&r===13&&(n=13)):n=r,n===10&&(n=13),32<=n||n===13?n:0}function Ga(){return!0}function np(){return!1}function Hn(n){function r(a,c,p,v,w){this._reactName=a,this._targetInst=p,this.type=c,this.nativeEvent=v,this.target=w,this.currentTarget=null;for(var F in n)n.hasOwnProperty(F)&&(a=n[F],this[F]=a?a(v):v[F]);return this.isDefaultPrevented=(v.defaultPrevented!=null?v.defaultPrevented:v.returnValue===!1)?Ga:np,this.isPropagationStopped=np,this}return ue(r.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Ga)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Ga)},persist:function(){},isPersistent:Ga}),r}var Ss={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Yc=Hn(Ss),Po=ue({},Ss,{view:0,detail:0}),ax=Hn(Po),qc,Kc,Lo,Wa=ue({},Po,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Qc,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==Lo&&(Lo&&n.type==="mousemove"?(qc=n.screenX-Lo.screenX,Kc=n.screenY-Lo.screenY):Kc=qc=0,Lo=n),qc)},movementY:function(n){return"movementY"in n?n.movementY:Kc}}),ip=Hn(Wa),lx=ue({},Wa,{dataTransfer:0}),cx=Hn(lx),ux=ue({},Po,{relatedTarget:0}),Zc=Hn(ux),dx=ue({},Ss,{animationName:0,elapsedTime:0,pseudoElement:0}),fx=Hn(dx),hx=ue({},Ss,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),px=Hn(hx),mx=ue({},Ss,{data:0}),rp=Hn(mx),gx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},vx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},_x={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function xx(n){var r=this.nativeEvent;return r.getModifierState?r.getModifierState(n):(n=_x[n])?!!r[n]:!1}function Qc(){return xx}var yx=ue({},Po,{key:function(n){if(n.key){var r=gx[n.key]||n.key;if(r!=="Unidentified")return r}return n.type==="keypress"?(n=Va(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?vx[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Qc,charCode:function(n){return n.type==="keypress"?Va(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Va(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),Sx=Hn(yx),Ex=ue({},Wa,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),sp=Hn(Ex),Mx=ue({},Po,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Qc}),wx=Hn(Mx),Tx=ue({},Ss,{propertyName:0,elapsedTime:0,pseudoElement:0}),bx=Hn(Tx),Ax=ue({},Wa,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),Cx=Hn(Ax),Rx=[9,13,27,32],Jc=d&&"CompositionEvent"in window,No=null;d&&"documentMode"in document&&(No=document.documentMode);var Px=d&&"TextEvent"in window&&!No,op=d&&(!Jc||No&&8<No&&11>=No),ap=" ",lp=!1;function cp(n,r){switch(n){case"keyup":return Rx.indexOf(r.keyCode)!==-1;case"keydown":return r.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function up(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var Es=!1;function Lx(n,r){switch(n){case"compositionend":return up(r);case"keypress":return r.which!==32?null:(lp=!0,ap);case"textInput":return n=r.data,n===ap&&lp?null:n;default:return null}}function Nx(n,r){if(Es)return n==="compositionend"||!Jc&&cp(n,r)?(n=tp(),Ha=$c=cr=null,Es=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(r.ctrlKey||r.altKey||r.metaKey)||r.ctrlKey&&r.altKey){if(r.char&&1<r.char.length)return r.char;if(r.which)return String.fromCharCode(r.which)}return null;case"compositionend":return op&&r.locale!=="ko"?null:r.data;default:return null}}var Dx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function dp(n){var r=n&&n.nodeName&&n.nodeName.toLowerCase();return r==="input"?!!Dx[n.type]:r==="textarea"}function fp(n,r,a,c){me(c),r=qa(r,"onChange"),0<r.length&&(a=new Yc("onChange","change",null,a,c),n.push({event:a,listeners:r}))}var Do=null,Io=null;function Ix(n){Pp(n,0)}function ja(n){var r=As(n);if(Wt(r))return n}function Ux(n,r){if(n==="change")return r}var hp=!1;if(d){var eu;if(d){var tu="oninput"in document;if(!tu){var pp=document.createElement("div");pp.setAttribute("oninput","return;"),tu=typeof pp.oninput=="function"}eu=tu}else eu=!1;hp=eu&&(!document.documentMode||9<document.documentMode)}function mp(){Do&&(Do.detachEvent("onpropertychange",gp),Io=Do=null)}function gp(n){if(n.propertyName==="value"&&ja(Io)){var r=[];fp(r,Io,n,j(n)),Yn(Ix,r)}}function Fx(n,r,a){n==="focusin"?(mp(),Do=r,Io=a,Do.attachEvent("onpropertychange",gp)):n==="focusout"&&mp()}function Ox(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return ja(Io)}function kx(n,r){if(n==="click")return ja(r)}function zx(n,r){if(n==="input"||n==="change")return ja(r)}function Bx(n,r){return n===r&&(n!==0||1/n===1/r)||n!==n&&r!==r}var si=typeof Object.is=="function"?Object.is:Bx;function Uo(n,r){if(si(n,r))return!0;if(typeof n!="object"||n===null||typeof r!="object"||r===null)return!1;var a=Object.keys(n),c=Object.keys(r);if(a.length!==c.length)return!1;for(c=0;c<a.length;c++){var p=a[c];if(!h.call(r,p)||!si(n[p],r[p]))return!1}return!0}function vp(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function _p(n,r){var a=vp(n);n=0;for(var c;a;){if(a.nodeType===3){if(c=n+a.textContent.length,n<=r&&c>=r)return{node:a,offset:r-n};n=c}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=vp(a)}}function xp(n,r){return n&&r?n===r?!0:n&&n.nodeType===3?!1:r&&r.nodeType===3?xp(n,r.parentNode):"contains"in n?n.contains(r):n.compareDocumentPosition?!!(n.compareDocumentPosition(r)&16):!1:!1}function yp(){for(var n=window,r=V();r instanceof n.HTMLIFrameElement;){try{var a=typeof r.contentWindow.location.href=="string"}catch{a=!1}if(a)n=r.contentWindow;else break;r=V(n.document)}return r}function nu(n){var r=n&&n.nodeName&&n.nodeName.toLowerCase();return r&&(r==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||r==="textarea"||n.contentEditable==="true")}function Hx(n){var r=yp(),a=n.focusedElem,c=n.selectionRange;if(r!==a&&a&&a.ownerDocument&&xp(a.ownerDocument.documentElement,a)){if(c!==null&&nu(a)){if(r=c.start,n=c.end,n===void 0&&(n=r),"selectionStart"in a)a.selectionStart=r,a.selectionEnd=Math.min(n,a.value.length);else if(n=(r=a.ownerDocument||document)&&r.defaultView||window,n.getSelection){n=n.getSelection();var p=a.textContent.length,v=Math.min(c.start,p);c=c.end===void 0?v:Math.min(c.end,p),!n.extend&&v>c&&(p=c,c=v,v=p),p=_p(a,v);var w=_p(a,c);p&&w&&(n.rangeCount!==1||n.anchorNode!==p.node||n.anchorOffset!==p.offset||n.focusNode!==w.node||n.focusOffset!==w.offset)&&(r=r.createRange(),r.setStart(p.node,p.offset),n.removeAllRanges(),v>c?(n.addRange(r),n.extend(w.node,w.offset)):(r.setEnd(w.node,w.offset),n.addRange(r)))}}for(r=[],n=a;n=n.parentNode;)n.nodeType===1&&r.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<r.length;a++)n=r[a],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Vx=d&&"documentMode"in document&&11>=document.documentMode,Ms=null,iu=null,Fo=null,ru=!1;function Sp(n,r,a){var c=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;ru||Ms==null||Ms!==V(c)||(c=Ms,"selectionStart"in c&&nu(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),Fo&&Uo(Fo,c)||(Fo=c,c=qa(iu,"onSelect"),0<c.length&&(r=new Yc("onSelect","select",null,r,a),n.push({event:r,listeners:c}),r.target=Ms)))}function Xa(n,r){var a={};return a[n.toLowerCase()]=r.toLowerCase(),a["Webkit"+n]="webkit"+r,a["Moz"+n]="moz"+r,a}var ws={animationend:Xa("Animation","AnimationEnd"),animationiteration:Xa("Animation","AnimationIteration"),animationstart:Xa("Animation","AnimationStart"),transitionend:Xa("Transition","TransitionEnd")},su={},Ep={};d&&(Ep=document.createElement("div").style,"AnimationEvent"in window||(delete ws.animationend.animation,delete ws.animationiteration.animation,delete ws.animationstart.animation),"TransitionEvent"in window||delete ws.transitionend.transition);function $a(n){if(su[n])return su[n];if(!ws[n])return n;var r=ws[n],a;for(a in r)if(r.hasOwnProperty(a)&&a in Ep)return su[n]=r[a];return n}var Mp=$a("animationend"),wp=$a("animationiteration"),Tp=$a("animationstart"),bp=$a("transitionend"),Ap=new Map,Cp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ur(n,r){Ap.set(n,r),l(r,[n])}for(var ou=0;ou<Cp.length;ou++){var au=Cp[ou],Gx=au.toLowerCase(),Wx=au[0].toUpperCase()+au.slice(1);ur(Gx,"on"+Wx)}ur(Mp,"onAnimationEnd"),ur(wp,"onAnimationIteration"),ur(Tp,"onAnimationStart"),ur("dblclick","onDoubleClick"),ur("focusin","onFocus"),ur("focusout","onBlur"),ur(bp,"onTransitionEnd"),u("onMouseEnter",["mouseout","mouseover"]),u("onMouseLeave",["mouseout","mouseover"]),u("onPointerEnter",["pointerout","pointerover"]),u("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Oo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),jx=new Set("cancel close invalid load scroll toggle".split(" ").concat(Oo));function Rp(n,r,a){var c=n.type||"unknown-event";n.currentTarget=a,Na(c,r,void 0,n),n.currentTarget=null}function Pp(n,r){r=(r&4)!==0;for(var a=0;a<n.length;a++){var c=n[a],p=c.event;c=c.listeners;e:{var v=void 0;if(r)for(var w=c.length-1;0<=w;w--){var F=c[w],W=F.instance,oe=F.currentTarget;if(F=F.listener,W!==v&&p.isPropagationStopped())break e;Rp(p,F,oe),v=W}else for(w=0;w<c.length;w++){if(F=c[w],W=F.instance,oe=F.currentTarget,F=F.listener,W!==v&&p.isPropagationStopped())break e;Rp(p,F,oe),v=W}}}if(Di)throw n=_s,Di=!1,_s=null,n}function Vt(n,r){var a=r[mu];a===void 0&&(a=r[mu]=new Set);var c=n+"__bubble";a.has(c)||(Lp(r,n,2,!1),a.add(c))}function lu(n,r,a){var c=0;r&&(c|=4),Lp(a,n,c,r)}var Ya="_reactListening"+Math.random().toString(36).slice(2);function ko(n){if(!n[Ya]){n[Ya]=!0,s.forEach(function(a){a!=="selectionchange"&&(jx.has(a)||lu(a,!1,n),lu(a,!0,n))});var r=n.nodeType===9?n:n.ownerDocument;r===null||r[Ya]||(r[Ya]=!0,lu("selectionchange",!1,r))}}function Lp(n,r,a,c){switch(ep(r)){case 1:var p=sx;break;case 4:p=ox;break;default:p=jc}a=p.bind(null,r,a,n),p=void 0,!vs||r!=="touchstart"&&r!=="touchmove"&&r!=="wheel"||(p=!0),c?p!==void 0?n.addEventListener(r,a,{capture:!0,passive:p}):n.addEventListener(r,a,!0):p!==void 0?n.addEventListener(r,a,{passive:p}):n.addEventListener(r,a,!1)}function cu(n,r,a,c,p){var v=c;if((r&1)===0&&(r&2)===0&&c!==null)e:for(;;){if(c===null)return;var w=c.tag;if(w===3||w===4){var F=c.stateNode.containerInfo;if(F===p||F.nodeType===8&&F.parentNode===p)break;if(w===4)for(w=c.return;w!==null;){var W=w.tag;if((W===3||W===4)&&(W=w.stateNode.containerInfo,W===p||W.nodeType===8&&W.parentNode===p))return;w=w.return}for(;F!==null;){if(w=Vr(F),w===null)return;if(W=w.tag,W===5||W===6){c=v=w;continue e}F=F.parentNode}}c=c.return}Yn(function(){var oe=v,_e=j(a),xe=[];e:{var ge=Ap.get(n);if(ge!==void 0){var ze=Yc,Ge=n;switch(n){case"keypress":if(Va(a)===0)break e;case"keydown":case"keyup":ze=Sx;break;case"focusin":Ge="focus",ze=Zc;break;case"focusout":Ge="blur",ze=Zc;break;case"beforeblur":case"afterblur":ze=Zc;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ze=ip;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ze=cx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ze=wx;break;case Mp:case wp:case Tp:ze=fx;break;case bp:ze=bx;break;case"scroll":ze=ax;break;case"wheel":ze=Cx;break;case"copy":case"cut":case"paste":ze=px;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ze=sp}var qe=(r&4)!==0,Qt=!qe&&n==="scroll",K=qe?ge!==null?ge+"Capture":null:ge;qe=[];for(var X=oe,ee;X!==null;){ee=X;var Te=ee.stateNode;if(ee.tag===5&&Te!==null&&(ee=Te,K!==null&&(Te=gn(X,K),Te!=null&&qe.push(zo(X,Te,ee)))),Qt)break;X=X.return}0<qe.length&&(ge=new ze(ge,Ge,null,a,_e),xe.push({event:ge,listeners:qe}))}}if((r&7)===0){e:{if(ge=n==="mouseover"||n==="pointerover",ze=n==="mouseout"||n==="pointerout",ge&&a!==ht&&(Ge=a.relatedTarget||a.fromElement)&&(Vr(Ge)||Ge[Ui]))break e;if((ze||ge)&&(ge=_e.window===_e?_e:(ge=_e.ownerDocument)?ge.defaultView||ge.parentWindow:window,ze?(Ge=a.relatedTarget||a.toElement,ze=oe,Ge=Ge?Vr(Ge):null,Ge!==null&&(Qt=Ii(Ge),Ge!==Qt||Ge.tag!==5&&Ge.tag!==6)&&(Ge=null)):(ze=null,Ge=oe),ze!==Ge)){if(qe=ip,Te="onMouseLeave",K="onMouseEnter",X="mouse",(n==="pointerout"||n==="pointerover")&&(qe=sp,Te="onPointerLeave",K="onPointerEnter",X="pointer"),Qt=ze==null?ge:As(ze),ee=Ge==null?ge:As(Ge),ge=new qe(Te,X+"leave",ze,a,_e),ge.target=Qt,ge.relatedTarget=ee,Te=null,Vr(_e)===oe&&(qe=new qe(K,X+"enter",Ge,a,_e),qe.target=ee,qe.relatedTarget=Qt,Te=qe),Qt=Te,ze&&Ge)t:{for(qe=ze,K=Ge,X=0,ee=qe;ee;ee=Ts(ee))X++;for(ee=0,Te=K;Te;Te=Ts(Te))ee++;for(;0<X-ee;)qe=Ts(qe),X--;for(;0<ee-X;)K=Ts(K),ee--;for(;X--;){if(qe===K||K!==null&&qe===K.alternate)break t;qe=Ts(qe),K=Ts(K)}qe=null}else qe=null;ze!==null&&Np(xe,ge,ze,qe,!1),Ge!==null&&Qt!==null&&Np(xe,Qt,Ge,qe,!0)}}e:{if(ge=oe?As(oe):window,ze=ge.nodeName&&ge.nodeName.toLowerCase(),ze==="select"||ze==="input"&&ge.type==="file")var Ze=Ux;else if(dp(ge))if(hp)Ze=zx;else{Ze=Ox;var nt=Fx}else(ze=ge.nodeName)&&ze.toLowerCase()==="input"&&(ge.type==="checkbox"||ge.type==="radio")&&(Ze=kx);if(Ze&&(Ze=Ze(n,oe))){fp(xe,Ze,a,_e);break e}nt&&nt(n,ge,oe),n==="focusout"&&(nt=ge._wrapperState)&&nt.controlled&&ge.type==="number"&&$e(ge,"number",ge.value)}switch(nt=oe?As(oe):window,n){case"focusin":(dp(nt)||nt.contentEditable==="true")&&(Ms=nt,iu=oe,Fo=null);break;case"focusout":Fo=iu=Ms=null;break;case"mousedown":ru=!0;break;case"contextmenu":case"mouseup":case"dragend":ru=!1,Sp(xe,a,_e);break;case"selectionchange":if(Vx)break;case"keydown":case"keyup":Sp(xe,a,_e)}var it;if(Jc)e:{switch(n){case"compositionstart":var ct="onCompositionStart";break e;case"compositionend":ct="onCompositionEnd";break e;case"compositionupdate":ct="onCompositionUpdate";break e}ct=void 0}else Es?cp(n,a)&&(ct="onCompositionEnd"):n==="keydown"&&a.keyCode===229&&(ct="onCompositionStart");ct&&(op&&a.locale!=="ko"&&(Es||ct!=="onCompositionStart"?ct==="onCompositionEnd"&&Es&&(it=tp()):(cr=_e,$c="value"in cr?cr.value:cr.textContent,Es=!0)),nt=qa(oe,ct),0<nt.length&&(ct=new rp(ct,n,null,a,_e),xe.push({event:ct,listeners:nt}),it?ct.data=it:(it=up(a),it!==null&&(ct.data=it)))),(it=Px?Lx(n,a):Nx(n,a))&&(oe=qa(oe,"onBeforeInput"),0<oe.length&&(_e=new rp("onBeforeInput","beforeinput",null,a,_e),xe.push({event:_e,listeners:oe}),_e.data=it))}Pp(xe,r)})}function zo(n,r,a){return{instance:n,listener:r,currentTarget:a}}function qa(n,r){for(var a=r+"Capture",c=[];n!==null;){var p=n,v=p.stateNode;p.tag===5&&v!==null&&(p=v,v=gn(n,a),v!=null&&c.unshift(zo(n,v,p)),v=gn(n,r),v!=null&&c.push(zo(n,v,p))),n=n.return}return c}function Ts(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function Np(n,r,a,c,p){for(var v=r._reactName,w=[];a!==null&&a!==c;){var F=a,W=F.alternate,oe=F.stateNode;if(W!==null&&W===c)break;F.tag===5&&oe!==null&&(F=oe,p?(W=gn(a,v),W!=null&&w.unshift(zo(a,W,F))):p||(W=gn(a,v),W!=null&&w.push(zo(a,W,F)))),a=a.return}w.length!==0&&n.push({event:r,listeners:w})}var Xx=/\r\n?/g,$x=/\u0000|\uFFFD/g;function Dp(n){return(typeof n=="string"?n:""+n).replace(Xx,`
`).replace($x,"")}function Ka(n,r,a){if(r=Dp(r),Dp(n)!==r&&a)throw Error(t(425))}function Za(){}var uu=null,du=null;function fu(n,r){return n==="textarea"||n==="noscript"||typeof r.children=="string"||typeof r.children=="number"||typeof r.dangerouslySetInnerHTML=="object"&&r.dangerouslySetInnerHTML!==null&&r.dangerouslySetInnerHTML.__html!=null}var hu=typeof setTimeout=="function"?setTimeout:void 0,Yx=typeof clearTimeout=="function"?clearTimeout:void 0,Ip=typeof Promise=="function"?Promise:void 0,qx=typeof queueMicrotask=="function"?queueMicrotask:typeof Ip<"u"?function(n){return Ip.resolve(null).then(n).catch(Kx)}:hu;function Kx(n){setTimeout(function(){throw n})}function pu(n,r){var a=r,c=0;do{var p=a.nextSibling;if(n.removeChild(a),p&&p.nodeType===8)if(a=p.data,a==="/$"){if(c===0){n.removeChild(p),Ro(r);return}c--}else a!=="$"&&a!=="$?"&&a!=="$!"||c++;a=p}while(a);Ro(r)}function dr(n){for(;n!=null;n=n.nextSibling){var r=n.nodeType;if(r===1||r===3)break;if(r===8){if(r=n.data,r==="$"||r==="$!"||r==="$?")break;if(r==="/$")return null}}return n}function Up(n){n=n.previousSibling;for(var r=0;n;){if(n.nodeType===8){var a=n.data;if(a==="$"||a==="$!"||a==="$?"){if(r===0)return n;r--}else a==="/$"&&r++}n=n.previousSibling}return null}var bs=Math.random().toString(36).slice(2),Si="__reactFiber$"+bs,Bo="__reactProps$"+bs,Ui="__reactContainer$"+bs,mu="__reactEvents$"+bs,Zx="__reactListeners$"+bs,Qx="__reactHandles$"+bs;function Vr(n){var r=n[Si];if(r)return r;for(var a=n.parentNode;a;){if(r=a[Ui]||a[Si]){if(a=r.alternate,r.child!==null||a!==null&&a.child!==null)for(n=Up(n);n!==null;){if(a=n[Si])return a;n=Up(n)}return r}n=a,a=n.parentNode}return null}function Ho(n){return n=n[Si]||n[Ui],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function As(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function Qa(n){return n[Bo]||null}var gu=[],Cs=-1;function fr(n){return{current:n}}function Gt(n){0>Cs||(n.current=gu[Cs],gu[Cs]=null,Cs--)}function zt(n,r){Cs++,gu[Cs]=n.current,n.current=r}var hr={},xn=fr(hr),Pn=fr(!1),Gr=hr;function Rs(n,r){var a=n.type.contextTypes;if(!a)return hr;var c=n.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===r)return c.__reactInternalMemoizedMaskedChildContext;var p={},v;for(v in a)p[v]=r[v];return c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=r,n.__reactInternalMemoizedMaskedChildContext=p),p}function Ln(n){return n=n.childContextTypes,n!=null}function Ja(){Gt(Pn),Gt(xn)}function Fp(n,r,a){if(xn.current!==hr)throw Error(t(168));zt(xn,r),zt(Pn,a)}function Op(n,r,a){var c=n.stateNode;if(r=r.childContextTypes,typeof c.getChildContext!="function")return a;c=c.getChildContext();for(var p in c)if(!(p in r))throw Error(t(108,se(n)||"Unknown",p));return ue({},a,c)}function el(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||hr,Gr=xn.current,zt(xn,n),zt(Pn,Pn.current),!0}function kp(n,r,a){var c=n.stateNode;if(!c)throw Error(t(169));a?(n=Op(n,r,Gr),c.__reactInternalMemoizedMergedChildContext=n,Gt(Pn),Gt(xn),zt(xn,n)):Gt(Pn),zt(Pn,a)}var Fi=null,tl=!1,vu=!1;function zp(n){Fi===null?Fi=[n]:Fi.push(n)}function Jx(n){tl=!0,zp(n)}function pr(){if(!vu&&Fi!==null){vu=!0;var n=0,r=yt;try{var a=Fi;for(yt=1;n<a.length;n++){var c=a[n];do c=c(!0);while(c!==null)}Fi=null,tl=!1}catch(p){throw Fi!==null&&(Fi=Fi.slice(n+1)),A(Le,pr),p}finally{yt=r,vu=!1}}return null}var Ps=[],Ls=0,nl=null,il=0,qn=[],Kn=0,Wr=null,Oi=1,ki="";function jr(n,r){Ps[Ls++]=il,Ps[Ls++]=nl,nl=n,il=r}function Bp(n,r,a){qn[Kn++]=Oi,qn[Kn++]=ki,qn[Kn++]=Wr,Wr=n;var c=Oi;n=ki;var p=32-wt(c)-1;c&=~(1<<p),a+=1;var v=32-wt(r)+p;if(30<v){var w=p-p%5;v=(c&(1<<w)-1).toString(32),c>>=w,p-=w,Oi=1<<32-wt(r)+p|a<<p|c,ki=v+n}else Oi=1<<v|a<<p|c,ki=n}function _u(n){n.return!==null&&(jr(n,1),Bp(n,1,0))}function xu(n){for(;n===nl;)nl=Ps[--Ls],Ps[Ls]=null,il=Ps[--Ls],Ps[Ls]=null;for(;n===Wr;)Wr=qn[--Kn],qn[Kn]=null,ki=qn[--Kn],qn[Kn]=null,Oi=qn[--Kn],qn[Kn]=null}var Vn=null,Gn=null,jt=!1,oi=null;function Hp(n,r){var a=ei(5,null,null,0);a.elementType="DELETED",a.stateNode=r,a.return=n,r=n.deletions,r===null?(n.deletions=[a],n.flags|=16):r.push(a)}function Vp(n,r){switch(n.tag){case 5:var a=n.type;return r=r.nodeType!==1||a.toLowerCase()!==r.nodeName.toLowerCase()?null:r,r!==null?(n.stateNode=r,Vn=n,Gn=dr(r.firstChild),!0):!1;case 6:return r=n.pendingProps===""||r.nodeType!==3?null:r,r!==null?(n.stateNode=r,Vn=n,Gn=null,!0):!1;case 13:return r=r.nodeType!==8?null:r,r!==null?(a=Wr!==null?{id:Oi,overflow:ki}:null,n.memoizedState={dehydrated:r,treeContext:a,retryLane:1073741824},a=ei(18,null,null,0),a.stateNode=r,a.return=n,n.child=a,Vn=n,Gn=null,!0):!1;default:return!1}}function yu(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Su(n){if(jt){var r=Gn;if(r){var a=r;if(!Vp(n,r)){if(yu(n))throw Error(t(418));r=dr(a.nextSibling);var c=Vn;r&&Vp(n,r)?Hp(c,a):(n.flags=n.flags&-4097|2,jt=!1,Vn=n)}}else{if(yu(n))throw Error(t(418));n.flags=n.flags&-4097|2,jt=!1,Vn=n}}}function Gp(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Vn=n}function rl(n){if(n!==Vn)return!1;if(!jt)return Gp(n),jt=!0,!1;var r;if((r=n.tag!==3)&&!(r=n.tag!==5)&&(r=n.type,r=r!=="head"&&r!=="body"&&!fu(n.type,n.memoizedProps)),r&&(r=Gn)){if(yu(n))throw Wp(),Error(t(418));for(;r;)Hp(n,r),r=dr(r.nextSibling)}if(Gp(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,r=0;n;){if(n.nodeType===8){var a=n.data;if(a==="/$"){if(r===0){Gn=dr(n.nextSibling);break e}r--}else a!=="$"&&a!=="$!"&&a!=="$?"||r++}n=n.nextSibling}Gn=null}}else Gn=Vn?dr(n.stateNode.nextSibling):null;return!0}function Wp(){for(var n=Gn;n;)n=dr(n.nextSibling)}function Ns(){Gn=Vn=null,jt=!1}function Eu(n){oi===null?oi=[n]:oi.push(n)}var ey=b.ReactCurrentBatchConfig;function Vo(n,r,a){if(n=a.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var c=a.stateNode}if(!c)throw Error(t(147,n));var p=c,v=""+n;return r!==null&&r.ref!==null&&typeof r.ref=="function"&&r.ref._stringRef===v?r.ref:(r=function(w){var F=p.refs;w===null?delete F[v]:F[v]=w},r._stringRef=v,r)}if(typeof n!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,n))}return n}function sl(n,r){throw n=Object.prototype.toString.call(r),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(r).join(", ")+"}":n))}function jp(n){var r=n._init;return r(n._payload)}function Xp(n){function r(K,X){if(n){var ee=K.deletions;ee===null?(K.deletions=[X],K.flags|=16):ee.push(X)}}function a(K,X){if(!n)return null;for(;X!==null;)r(K,X),X=X.sibling;return null}function c(K,X){for(K=new Map;X!==null;)X.key!==null?K.set(X.key,X):K.set(X.index,X),X=X.sibling;return K}function p(K,X){return K=Er(K,X),K.index=0,K.sibling=null,K}function v(K,X,ee){return K.index=ee,n?(ee=K.alternate,ee!==null?(ee=ee.index,ee<X?(K.flags|=2,X):ee):(K.flags|=2,X)):(K.flags|=1048576,X)}function w(K){return n&&K.alternate===null&&(K.flags|=2),K}function F(K,X,ee,Te){return X===null||X.tag!==6?(X=hd(ee,K.mode,Te),X.return=K,X):(X=p(X,ee),X.return=K,X)}function W(K,X,ee,Te){var Ze=ee.type;return Ze===I?_e(K,X,ee.props.children,Te,ee.key):X!==null&&(X.elementType===Ze||typeof Ze=="object"&&Ze!==null&&Ze.$$typeof===te&&jp(Ze)===X.type)?(Te=p(X,ee.props),Te.ref=Vo(K,X,ee),Te.return=K,Te):(Te=Rl(ee.type,ee.key,ee.props,null,K.mode,Te),Te.ref=Vo(K,X,ee),Te.return=K,Te)}function oe(K,X,ee,Te){return X===null||X.tag!==4||X.stateNode.containerInfo!==ee.containerInfo||X.stateNode.implementation!==ee.implementation?(X=pd(ee,K.mode,Te),X.return=K,X):(X=p(X,ee.children||[]),X.return=K,X)}function _e(K,X,ee,Te,Ze){return X===null||X.tag!==7?(X=Jr(ee,K.mode,Te,Ze),X.return=K,X):(X=p(X,ee),X.return=K,X)}function xe(K,X,ee){if(typeof X=="string"&&X!==""||typeof X=="number")return X=hd(""+X,K.mode,ee),X.return=K,X;if(typeof X=="object"&&X!==null){switch(X.$$typeof){case k:return ee=Rl(X.type,X.key,X.props,null,K.mode,ee),ee.ref=Vo(K,null,X),ee.return=K,ee;case B:return X=pd(X,K.mode,ee),X.return=K,X;case te:var Te=X._init;return xe(K,Te(X._payload),ee)}if(ut(X)||fe(X))return X=Jr(X,K.mode,ee,null),X.return=K,X;sl(K,X)}return null}function ge(K,X,ee,Te){var Ze=X!==null?X.key:null;if(typeof ee=="string"&&ee!==""||typeof ee=="number")return Ze!==null?null:F(K,X,""+ee,Te);if(typeof ee=="object"&&ee!==null){switch(ee.$$typeof){case k:return ee.key===Ze?W(K,X,ee,Te):null;case B:return ee.key===Ze?oe(K,X,ee,Te):null;case te:return Ze=ee._init,ge(K,X,Ze(ee._payload),Te)}if(ut(ee)||fe(ee))return Ze!==null?null:_e(K,X,ee,Te,null);sl(K,ee)}return null}function ze(K,X,ee,Te,Ze){if(typeof Te=="string"&&Te!==""||typeof Te=="number")return K=K.get(ee)||null,F(X,K,""+Te,Ze);if(typeof Te=="object"&&Te!==null){switch(Te.$$typeof){case k:return K=K.get(Te.key===null?ee:Te.key)||null,W(X,K,Te,Ze);case B:return K=K.get(Te.key===null?ee:Te.key)||null,oe(X,K,Te,Ze);case te:var nt=Te._init;return ze(K,X,ee,nt(Te._payload),Ze)}if(ut(Te)||fe(Te))return K=K.get(ee)||null,_e(X,K,Te,Ze,null);sl(X,Te)}return null}function Ge(K,X,ee,Te){for(var Ze=null,nt=null,it=X,ct=X=0,fn=null;it!==null&&ct<ee.length;ct++){it.index>ct?(fn=it,it=null):fn=it.sibling;var At=ge(K,it,ee[ct],Te);if(At===null){it===null&&(it=fn);break}n&&it&&At.alternate===null&&r(K,it),X=v(At,X,ct),nt===null?Ze=At:nt.sibling=At,nt=At,it=fn}if(ct===ee.length)return a(K,it),jt&&jr(K,ct),Ze;if(it===null){for(;ct<ee.length;ct++)it=xe(K,ee[ct],Te),it!==null&&(X=v(it,X,ct),nt===null?Ze=it:nt.sibling=it,nt=it);return jt&&jr(K,ct),Ze}for(it=c(K,it);ct<ee.length;ct++)fn=ze(it,K,ct,ee[ct],Te),fn!==null&&(n&&fn.alternate!==null&&it.delete(fn.key===null?ct:fn.key),X=v(fn,X,ct),nt===null?Ze=fn:nt.sibling=fn,nt=fn);return n&&it.forEach(function(Mr){return r(K,Mr)}),jt&&jr(K,ct),Ze}function qe(K,X,ee,Te){var Ze=fe(ee);if(typeof Ze!="function")throw Error(t(150));if(ee=Ze.call(ee),ee==null)throw Error(t(151));for(var nt=Ze=null,it=X,ct=X=0,fn=null,At=ee.next();it!==null&&!At.done;ct++,At=ee.next()){it.index>ct?(fn=it,it=null):fn=it.sibling;var Mr=ge(K,it,At.value,Te);if(Mr===null){it===null&&(it=fn);break}n&&it&&Mr.alternate===null&&r(K,it),X=v(Mr,X,ct),nt===null?Ze=Mr:nt.sibling=Mr,nt=Mr,it=fn}if(At.done)return a(K,it),jt&&jr(K,ct),Ze;if(it===null){for(;!At.done;ct++,At=ee.next())At=xe(K,At.value,Te),At!==null&&(X=v(At,X,ct),nt===null?Ze=At:nt.sibling=At,nt=At);return jt&&jr(K,ct),Ze}for(it=c(K,it);!At.done;ct++,At=ee.next())At=ze(it,K,ct,At.value,Te),At!==null&&(n&&At.alternate!==null&&it.delete(At.key===null?ct:At.key),X=v(At,X,ct),nt===null?Ze=At:nt.sibling=At,nt=At);return n&&it.forEach(function(Dy){return r(K,Dy)}),jt&&jr(K,ct),Ze}function Qt(K,X,ee,Te){if(typeof ee=="object"&&ee!==null&&ee.type===I&&ee.key===null&&(ee=ee.props.children),typeof ee=="object"&&ee!==null){switch(ee.$$typeof){case k:e:{for(var Ze=ee.key,nt=X;nt!==null;){if(nt.key===Ze){if(Ze=ee.type,Ze===I){if(nt.tag===7){a(K,nt.sibling),X=p(nt,ee.props.children),X.return=K,K=X;break e}}else if(nt.elementType===Ze||typeof Ze=="object"&&Ze!==null&&Ze.$$typeof===te&&jp(Ze)===nt.type){a(K,nt.sibling),X=p(nt,ee.props),X.ref=Vo(K,nt,ee),X.return=K,K=X;break e}a(K,nt);break}else r(K,nt);nt=nt.sibling}ee.type===I?(X=Jr(ee.props.children,K.mode,Te,ee.key),X.return=K,K=X):(Te=Rl(ee.type,ee.key,ee.props,null,K.mode,Te),Te.ref=Vo(K,X,ee),Te.return=K,K=Te)}return w(K);case B:e:{for(nt=ee.key;X!==null;){if(X.key===nt)if(X.tag===4&&X.stateNode.containerInfo===ee.containerInfo&&X.stateNode.implementation===ee.implementation){a(K,X.sibling),X=p(X,ee.children||[]),X.return=K,K=X;break e}else{a(K,X);break}else r(K,X);X=X.sibling}X=pd(ee,K.mode,Te),X.return=K,K=X}return w(K);case te:return nt=ee._init,Qt(K,X,nt(ee._payload),Te)}if(ut(ee))return Ge(K,X,ee,Te);if(fe(ee))return qe(K,X,ee,Te);sl(K,ee)}return typeof ee=="string"&&ee!==""||typeof ee=="number"?(ee=""+ee,X!==null&&X.tag===6?(a(K,X.sibling),X=p(X,ee),X.return=K,K=X):(a(K,X),X=hd(ee,K.mode,Te),X.return=K,K=X),w(K)):a(K,X)}return Qt}var Ds=Xp(!0),$p=Xp(!1),ol=fr(null),al=null,Is=null,Mu=null;function wu(){Mu=Is=al=null}function Tu(n){var r=ol.current;Gt(ol),n._currentValue=r}function bu(n,r,a){for(;n!==null;){var c=n.alternate;if((n.childLanes&r)!==r?(n.childLanes|=r,c!==null&&(c.childLanes|=r)):c!==null&&(c.childLanes&r)!==r&&(c.childLanes|=r),n===a)break;n=n.return}}function Us(n,r){al=n,Mu=Is=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&r)!==0&&(Nn=!0),n.firstContext=null)}function Zn(n){var r=n._currentValue;if(Mu!==n)if(n={context:n,memoizedValue:r,next:null},Is===null){if(al===null)throw Error(t(308));Is=n,al.dependencies={lanes:0,firstContext:n}}else Is=Is.next=n;return r}var Xr=null;function Au(n){Xr===null?Xr=[n]:Xr.push(n)}function Yp(n,r,a,c){var p=r.interleaved;return p===null?(a.next=a,Au(r)):(a.next=p.next,p.next=a),r.interleaved=a,zi(n,c)}function zi(n,r){n.lanes|=r;var a=n.alternate;for(a!==null&&(a.lanes|=r),a=n,n=n.return;n!==null;)n.childLanes|=r,a=n.alternate,a!==null&&(a.childLanes|=r),a=n,n=n.return;return a.tag===3?a.stateNode:null}var mr=!1;function Cu(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function qp(n,r){n=n.updateQueue,r.updateQueue===n&&(r.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Bi(n,r){return{eventTime:n,lane:r,tag:0,payload:null,callback:null,next:null}}function gr(n,r,a){var c=n.updateQueue;if(c===null)return null;if(c=c.shared,(bt&2)!==0){var p=c.pending;return p===null?r.next=r:(r.next=p.next,p.next=r),c.pending=r,zi(n,a)}return p=c.interleaved,p===null?(r.next=r,Au(c)):(r.next=p.next,p.next=r),c.interleaved=r,zi(n,a)}function ll(n,r,a){if(r=r.updateQueue,r!==null&&(r=r.shared,(a&4194240)!==0)){var c=r.lanes;c&=n.pendingLanes,a|=c,r.lanes=a,Hr(n,a)}}function Kp(n,r){var a=n.updateQueue,c=n.alternate;if(c!==null&&(c=c.updateQueue,a===c)){var p=null,v=null;if(a=a.firstBaseUpdate,a!==null){do{var w={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};v===null?p=v=w:v=v.next=w,a=a.next}while(a!==null);v===null?p=v=r:v=v.next=r}else p=v=r;a={baseState:c.baseState,firstBaseUpdate:p,lastBaseUpdate:v,shared:c.shared,effects:c.effects},n.updateQueue=a;return}n=a.lastBaseUpdate,n===null?a.firstBaseUpdate=r:n.next=r,a.lastBaseUpdate=r}function cl(n,r,a,c){var p=n.updateQueue;mr=!1;var v=p.firstBaseUpdate,w=p.lastBaseUpdate,F=p.shared.pending;if(F!==null){p.shared.pending=null;var W=F,oe=W.next;W.next=null,w===null?v=oe:w.next=oe,w=W;var _e=n.alternate;_e!==null&&(_e=_e.updateQueue,F=_e.lastBaseUpdate,F!==w&&(F===null?_e.firstBaseUpdate=oe:F.next=oe,_e.lastBaseUpdate=W))}if(v!==null){var xe=p.baseState;w=0,_e=oe=W=null,F=v;do{var ge=F.lane,ze=F.eventTime;if((c&ge)===ge){_e!==null&&(_e=_e.next={eventTime:ze,lane:0,tag:F.tag,payload:F.payload,callback:F.callback,next:null});e:{var Ge=n,qe=F;switch(ge=r,ze=a,qe.tag){case 1:if(Ge=qe.payload,typeof Ge=="function"){xe=Ge.call(ze,xe,ge);break e}xe=Ge;break e;case 3:Ge.flags=Ge.flags&-65537|128;case 0:if(Ge=qe.payload,ge=typeof Ge=="function"?Ge.call(ze,xe,ge):Ge,ge==null)break e;xe=ue({},xe,ge);break e;case 2:mr=!0}}F.callback!==null&&F.lane!==0&&(n.flags|=64,ge=p.effects,ge===null?p.effects=[F]:ge.push(F))}else ze={eventTime:ze,lane:ge,tag:F.tag,payload:F.payload,callback:F.callback,next:null},_e===null?(oe=_e=ze,W=xe):_e=_e.next=ze,w|=ge;if(F=F.next,F===null){if(F=p.shared.pending,F===null)break;ge=F,F=ge.next,ge.next=null,p.lastBaseUpdate=ge,p.shared.pending=null}}while(!0);if(_e===null&&(W=xe),p.baseState=W,p.firstBaseUpdate=oe,p.lastBaseUpdate=_e,r=p.shared.interleaved,r!==null){p=r;do w|=p.lane,p=p.next;while(p!==r)}else v===null&&(p.shared.lanes=0);qr|=w,n.lanes=w,n.memoizedState=xe}}function Zp(n,r,a){if(n=r.effects,r.effects=null,n!==null)for(r=0;r<n.length;r++){var c=n[r],p=c.callback;if(p!==null){if(c.callback=null,c=a,typeof p!="function")throw Error(t(191,p));p.call(c)}}}var Go={},Ei=fr(Go),Wo=fr(Go),jo=fr(Go);function $r(n){if(n===Go)throw Error(t(174));return n}function Ru(n,r){switch(zt(jo,r),zt(Wo,n),zt(Ei,Go),n=r.nodeType,n){case 9:case 11:r=(r=r.documentElement)?r.namespaceURI:ve(null,"");break;default:n=n===8?r.parentNode:r,r=n.namespaceURI||null,n=n.tagName,r=ve(r,n)}Gt(Ei),zt(Ei,r)}function Fs(){Gt(Ei),Gt(Wo),Gt(jo)}function Qp(n){$r(jo.current);var r=$r(Ei.current),a=ve(r,n.type);r!==a&&(zt(Wo,n),zt(Ei,a))}function Pu(n){Wo.current===n&&(Gt(Ei),Gt(Wo))}var Xt=fr(0);function ul(n){for(var r=n;r!==null;){if(r.tag===13){var a=r.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return r}else if(r.tag===19&&r.memoizedProps.revealOrder!==void 0){if((r.flags&128)!==0)return r}else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===n)break;for(;r.sibling===null;){if(r.return===null||r.return===n)return null;r=r.return}r.sibling.return=r.return,r=r.sibling}return null}var Lu=[];function Nu(){for(var n=0;n<Lu.length;n++)Lu[n]._workInProgressVersionPrimary=null;Lu.length=0}var dl=b.ReactCurrentDispatcher,Du=b.ReactCurrentBatchConfig,Yr=0,$t=null,nn=null,un=null,fl=!1,Xo=!1,$o=0,ty=0;function yn(){throw Error(t(321))}function Iu(n,r){if(r===null)return!1;for(var a=0;a<r.length&&a<n.length;a++)if(!si(n[a],r[a]))return!1;return!0}function Uu(n,r,a,c,p,v){if(Yr=v,$t=r,r.memoizedState=null,r.updateQueue=null,r.lanes=0,dl.current=n===null||n.memoizedState===null?sy:oy,n=a(c,p),Xo){v=0;do{if(Xo=!1,$o=0,25<=v)throw Error(t(301));v+=1,un=nn=null,r.updateQueue=null,dl.current=ay,n=a(c,p)}while(Xo)}if(dl.current=ml,r=nn!==null&&nn.next!==null,Yr=0,un=nn=$t=null,fl=!1,r)throw Error(t(300));return n}function Fu(){var n=$o!==0;return $o=0,n}function Mi(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return un===null?$t.memoizedState=un=n:un=un.next=n,un}function Qn(){if(nn===null){var n=$t.alternate;n=n!==null?n.memoizedState:null}else n=nn.next;var r=un===null?$t.memoizedState:un.next;if(r!==null)un=r,nn=n;else{if(n===null)throw Error(t(310));nn=n,n={memoizedState:nn.memoizedState,baseState:nn.baseState,baseQueue:nn.baseQueue,queue:nn.queue,next:null},un===null?$t.memoizedState=un=n:un=un.next=n}return un}function Yo(n,r){return typeof r=="function"?r(n):r}function Ou(n){var r=Qn(),a=r.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=nn,p=c.baseQueue,v=a.pending;if(v!==null){if(p!==null){var w=p.next;p.next=v.next,v.next=w}c.baseQueue=p=v,a.pending=null}if(p!==null){v=p.next,c=c.baseState;var F=w=null,W=null,oe=v;do{var _e=oe.lane;if((Yr&_e)===_e)W!==null&&(W=W.next={lane:0,action:oe.action,hasEagerState:oe.hasEagerState,eagerState:oe.eagerState,next:null}),c=oe.hasEagerState?oe.eagerState:n(c,oe.action);else{var xe={lane:_e,action:oe.action,hasEagerState:oe.hasEagerState,eagerState:oe.eagerState,next:null};W===null?(F=W=xe,w=c):W=W.next=xe,$t.lanes|=_e,qr|=_e}oe=oe.next}while(oe!==null&&oe!==v);W===null?w=c:W.next=F,si(c,r.memoizedState)||(Nn=!0),r.memoizedState=c,r.baseState=w,r.baseQueue=W,a.lastRenderedState=c}if(n=a.interleaved,n!==null){p=n;do v=p.lane,$t.lanes|=v,qr|=v,p=p.next;while(p!==n)}else p===null&&(a.lanes=0);return[r.memoizedState,a.dispatch]}function ku(n){var r=Qn(),a=r.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=a.dispatch,p=a.pending,v=r.memoizedState;if(p!==null){a.pending=null;var w=p=p.next;do v=n(v,w.action),w=w.next;while(w!==p);si(v,r.memoizedState)||(Nn=!0),r.memoizedState=v,r.baseQueue===null&&(r.baseState=v),a.lastRenderedState=v}return[v,c]}function Jp(){}function em(n,r){var a=$t,c=Qn(),p=r(),v=!si(c.memoizedState,p);if(v&&(c.memoizedState=p,Nn=!0),c=c.queue,zu(im.bind(null,a,c,n),[n]),c.getSnapshot!==r||v||un!==null&&un.memoizedState.tag&1){if(a.flags|=2048,qo(9,nm.bind(null,a,c,p,r),void 0,null),dn===null)throw Error(t(349));(Yr&30)!==0||tm(a,r,p)}return p}function tm(n,r,a){n.flags|=16384,n={getSnapshot:r,value:a},r=$t.updateQueue,r===null?(r={lastEffect:null,stores:null},$t.updateQueue=r,r.stores=[n]):(a=r.stores,a===null?r.stores=[n]:a.push(n))}function nm(n,r,a,c){r.value=a,r.getSnapshot=c,rm(r)&&sm(n)}function im(n,r,a){return a(function(){rm(r)&&sm(n)})}function rm(n){var r=n.getSnapshot;n=n.value;try{var a=r();return!si(n,a)}catch{return!0}}function sm(n){var r=zi(n,1);r!==null&&ui(r,n,1,-1)}function om(n){var r=Mi();return typeof n=="function"&&(n=n()),r.memoizedState=r.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Yo,lastRenderedState:n},r.queue=n,n=n.dispatch=ry.bind(null,$t,n),[r.memoizedState,n]}function qo(n,r,a,c){return n={tag:n,create:r,destroy:a,deps:c,next:null},r=$t.updateQueue,r===null?(r={lastEffect:null,stores:null},$t.updateQueue=r,r.lastEffect=n.next=n):(a=r.lastEffect,a===null?r.lastEffect=n.next=n:(c=a.next,a.next=n,n.next=c,r.lastEffect=n)),n}function am(){return Qn().memoizedState}function hl(n,r,a,c){var p=Mi();$t.flags|=n,p.memoizedState=qo(1|r,a,void 0,c===void 0?null:c)}function pl(n,r,a,c){var p=Qn();c=c===void 0?null:c;var v=void 0;if(nn!==null){var w=nn.memoizedState;if(v=w.destroy,c!==null&&Iu(c,w.deps)){p.memoizedState=qo(r,a,v,c);return}}$t.flags|=n,p.memoizedState=qo(1|r,a,v,c)}function lm(n,r){return hl(8390656,8,n,r)}function zu(n,r){return pl(2048,8,n,r)}function cm(n,r){return pl(4,2,n,r)}function um(n,r){return pl(4,4,n,r)}function dm(n,r){if(typeof r=="function")return n=n(),r(n),function(){r(null)};if(r!=null)return n=n(),r.current=n,function(){r.current=null}}function fm(n,r,a){return a=a!=null?a.concat([n]):null,pl(4,4,dm.bind(null,r,n),a)}function Bu(){}function hm(n,r){var a=Qn();r=r===void 0?null:r;var c=a.memoizedState;return c!==null&&r!==null&&Iu(r,c[1])?c[0]:(a.memoizedState=[n,r],n)}function pm(n,r){var a=Qn();r=r===void 0?null:r;var c=a.memoizedState;return c!==null&&r!==null&&Iu(r,c[1])?c[0]:(n=n(),a.memoizedState=[n,r],n)}function mm(n,r,a){return(Yr&21)===0?(n.baseState&&(n.baseState=!1,Nn=!0),n.memoizedState=a):(si(a,r)||(a=bn(),$t.lanes|=a,qr|=a,n.baseState=!0),r)}function ny(n,r){var a=yt;yt=a!==0&&4>a?a:4,n(!0);var c=Du.transition;Du.transition={};try{n(!1),r()}finally{yt=a,Du.transition=c}}function gm(){return Qn().memoizedState}function iy(n,r,a){var c=yr(n);if(a={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null},vm(n))_m(r,a);else if(a=Yp(n,r,a,c),a!==null){var p=Cn();ui(a,n,c,p),xm(a,r,c)}}function ry(n,r,a){var c=yr(n),p={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null};if(vm(n))_m(r,p);else{var v=n.alternate;if(n.lanes===0&&(v===null||v.lanes===0)&&(v=r.lastRenderedReducer,v!==null))try{var w=r.lastRenderedState,F=v(w,a);if(p.hasEagerState=!0,p.eagerState=F,si(F,w)){var W=r.interleaved;W===null?(p.next=p,Au(r)):(p.next=W.next,W.next=p),r.interleaved=p;return}}catch{}finally{}a=Yp(n,r,p,c),a!==null&&(p=Cn(),ui(a,n,c,p),xm(a,r,c))}}function vm(n){var r=n.alternate;return n===$t||r!==null&&r===$t}function _m(n,r){Xo=fl=!0;var a=n.pending;a===null?r.next=r:(r.next=a.next,a.next=r),n.pending=r}function xm(n,r,a){if((a&4194240)!==0){var c=r.lanes;c&=n.pendingLanes,a|=c,r.lanes=a,Hr(n,a)}}var ml={readContext:Zn,useCallback:yn,useContext:yn,useEffect:yn,useImperativeHandle:yn,useInsertionEffect:yn,useLayoutEffect:yn,useMemo:yn,useReducer:yn,useRef:yn,useState:yn,useDebugValue:yn,useDeferredValue:yn,useTransition:yn,useMutableSource:yn,useSyncExternalStore:yn,useId:yn,unstable_isNewReconciler:!1},sy={readContext:Zn,useCallback:function(n,r){return Mi().memoizedState=[n,r===void 0?null:r],n},useContext:Zn,useEffect:lm,useImperativeHandle:function(n,r,a){return a=a!=null?a.concat([n]):null,hl(4194308,4,dm.bind(null,r,n),a)},useLayoutEffect:function(n,r){return hl(4194308,4,n,r)},useInsertionEffect:function(n,r){return hl(4,2,n,r)},useMemo:function(n,r){var a=Mi();return r=r===void 0?null:r,n=n(),a.memoizedState=[n,r],n},useReducer:function(n,r,a){var c=Mi();return r=a!==void 0?a(r):r,c.memoizedState=c.baseState=r,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:r},c.queue=n,n=n.dispatch=iy.bind(null,$t,n),[c.memoizedState,n]},useRef:function(n){var r=Mi();return n={current:n},r.memoizedState=n},useState:om,useDebugValue:Bu,useDeferredValue:function(n){return Mi().memoizedState=n},useTransition:function(){var n=om(!1),r=n[0];return n=ny.bind(null,n[1]),Mi().memoizedState=n,[r,n]},useMutableSource:function(){},useSyncExternalStore:function(n,r,a){var c=$t,p=Mi();if(jt){if(a===void 0)throw Error(t(407));a=a()}else{if(a=r(),dn===null)throw Error(t(349));(Yr&30)!==0||tm(c,r,a)}p.memoizedState=a;var v={value:a,getSnapshot:r};return p.queue=v,lm(im.bind(null,c,v,n),[n]),c.flags|=2048,qo(9,nm.bind(null,c,v,a,r),void 0,null),a},useId:function(){var n=Mi(),r=dn.identifierPrefix;if(jt){var a=ki,c=Oi;a=(c&~(1<<32-wt(c)-1)).toString(32)+a,r=":"+r+"R"+a,a=$o++,0<a&&(r+="H"+a.toString(32)),r+=":"}else a=ty++,r=":"+r+"r"+a.toString(32)+":";return n.memoizedState=r},unstable_isNewReconciler:!1},oy={readContext:Zn,useCallback:hm,useContext:Zn,useEffect:zu,useImperativeHandle:fm,useInsertionEffect:cm,useLayoutEffect:um,useMemo:pm,useReducer:Ou,useRef:am,useState:function(){return Ou(Yo)},useDebugValue:Bu,useDeferredValue:function(n){var r=Qn();return mm(r,nn.memoizedState,n)},useTransition:function(){var n=Ou(Yo)[0],r=Qn().memoizedState;return[n,r]},useMutableSource:Jp,useSyncExternalStore:em,useId:gm,unstable_isNewReconciler:!1},ay={readContext:Zn,useCallback:hm,useContext:Zn,useEffect:zu,useImperativeHandle:fm,useInsertionEffect:cm,useLayoutEffect:um,useMemo:pm,useReducer:ku,useRef:am,useState:function(){return ku(Yo)},useDebugValue:Bu,useDeferredValue:function(n){var r=Qn();return nn===null?r.memoizedState=n:mm(r,nn.memoizedState,n)},useTransition:function(){var n=ku(Yo)[0],r=Qn().memoizedState;return[n,r]},useMutableSource:Jp,useSyncExternalStore:em,useId:gm,unstable_isNewReconciler:!1};function ai(n,r){if(n&&n.defaultProps){r=ue({},r),n=n.defaultProps;for(var a in n)r[a]===void 0&&(r[a]=n[a]);return r}return r}function Hu(n,r,a,c){r=n.memoizedState,a=a(c,r),a=a==null?r:ue({},r,a),n.memoizedState=a,n.lanes===0&&(n.updateQueue.baseState=a)}var gl={isMounted:function(n){return(n=n._reactInternals)?Ii(n)===n:!1},enqueueSetState:function(n,r,a){n=n._reactInternals;var c=Cn(),p=yr(n),v=Bi(c,p);v.payload=r,a!=null&&(v.callback=a),r=gr(n,v,p),r!==null&&(ui(r,n,p,c),ll(r,n,p))},enqueueReplaceState:function(n,r,a){n=n._reactInternals;var c=Cn(),p=yr(n),v=Bi(c,p);v.tag=1,v.payload=r,a!=null&&(v.callback=a),r=gr(n,v,p),r!==null&&(ui(r,n,p,c),ll(r,n,p))},enqueueForceUpdate:function(n,r){n=n._reactInternals;var a=Cn(),c=yr(n),p=Bi(a,c);p.tag=2,r!=null&&(p.callback=r),r=gr(n,p,c),r!==null&&(ui(r,n,c,a),ll(r,n,c))}};function ym(n,r,a,c,p,v,w){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(c,v,w):r.prototype&&r.prototype.isPureReactComponent?!Uo(a,c)||!Uo(p,v):!0}function Sm(n,r,a){var c=!1,p=hr,v=r.contextType;return typeof v=="object"&&v!==null?v=Zn(v):(p=Ln(r)?Gr:xn.current,c=r.contextTypes,v=(c=c!=null)?Rs(n,p):hr),r=new r(a,v),n.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=gl,n.stateNode=r,r._reactInternals=n,c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=p,n.__reactInternalMemoizedMaskedChildContext=v),r}function Em(n,r,a,c){n=r.state,typeof r.componentWillReceiveProps=="function"&&r.componentWillReceiveProps(a,c),typeof r.UNSAFE_componentWillReceiveProps=="function"&&r.UNSAFE_componentWillReceiveProps(a,c),r.state!==n&&gl.enqueueReplaceState(r,r.state,null)}function Vu(n,r,a,c){var p=n.stateNode;p.props=a,p.state=n.memoizedState,p.refs={},Cu(n);var v=r.contextType;typeof v=="object"&&v!==null?p.context=Zn(v):(v=Ln(r)?Gr:xn.current,p.context=Rs(n,v)),p.state=n.memoizedState,v=r.getDerivedStateFromProps,typeof v=="function"&&(Hu(n,r,v,a),p.state=n.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof p.getSnapshotBeforeUpdate=="function"||typeof p.UNSAFE_componentWillMount!="function"&&typeof p.componentWillMount!="function"||(r=p.state,typeof p.componentWillMount=="function"&&p.componentWillMount(),typeof p.UNSAFE_componentWillMount=="function"&&p.UNSAFE_componentWillMount(),r!==p.state&&gl.enqueueReplaceState(p,p.state,null),cl(n,a,p,c),p.state=n.memoizedState),typeof p.componentDidMount=="function"&&(n.flags|=4194308)}function Os(n,r){try{var a="",c=r;do a+=Fe(c),c=c.return;while(c);var p=a}catch(v){p=`
Error generating stack: `+v.message+`
`+v.stack}return{value:n,source:r,stack:p,digest:null}}function Gu(n,r,a){return{value:n,source:null,stack:a??null,digest:r??null}}function Wu(n,r){try{console.error(r.value)}catch(a){setTimeout(function(){throw a})}}var ly=typeof WeakMap=="function"?WeakMap:Map;function Mm(n,r,a){a=Bi(-1,a),a.tag=3,a.payload={element:null};var c=r.value;return a.callback=function(){Ml||(Ml=!0,sd=c),Wu(n,r)},a}function wm(n,r,a){a=Bi(-1,a),a.tag=3;var c=n.type.getDerivedStateFromError;if(typeof c=="function"){var p=r.value;a.payload=function(){return c(p)},a.callback=function(){Wu(n,r)}}var v=n.stateNode;return v!==null&&typeof v.componentDidCatch=="function"&&(a.callback=function(){Wu(n,r),typeof c!="function"&&(_r===null?_r=new Set([this]):_r.add(this));var w=r.stack;this.componentDidCatch(r.value,{componentStack:w!==null?w:""})}),a}function Tm(n,r,a){var c=n.pingCache;if(c===null){c=n.pingCache=new ly;var p=new Set;c.set(r,p)}else p=c.get(r),p===void 0&&(p=new Set,c.set(r,p));p.has(a)||(p.add(a),n=Ey.bind(null,n,r,a),r.then(n,n))}function bm(n){do{var r;if((r=n.tag===13)&&(r=n.memoizedState,r=r!==null?r.dehydrated!==null:!0),r)return n;n=n.return}while(n!==null);return null}function Am(n,r,a,c,p){return(n.mode&1)===0?(n===r?n.flags|=65536:(n.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(r=Bi(-1,1),r.tag=2,gr(a,r,1))),a.lanes|=1),n):(n.flags|=65536,n.lanes=p,n)}var cy=b.ReactCurrentOwner,Nn=!1;function An(n,r,a,c){r.child=n===null?$p(r,null,a,c):Ds(r,n.child,a,c)}function Cm(n,r,a,c,p){a=a.render;var v=r.ref;return Us(r,p),c=Uu(n,r,a,c,v,p),a=Fu(),n!==null&&!Nn?(r.updateQueue=n.updateQueue,r.flags&=-2053,n.lanes&=~p,Hi(n,r,p)):(jt&&a&&_u(r),r.flags|=1,An(n,r,c,p),r.child)}function Rm(n,r,a,c,p){if(n===null){var v=a.type;return typeof v=="function"&&!fd(v)&&v.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(r.tag=15,r.type=v,Pm(n,r,v,c,p)):(n=Rl(a.type,null,c,r,r.mode,p),n.ref=r.ref,n.return=r,r.child=n)}if(v=n.child,(n.lanes&p)===0){var w=v.memoizedProps;if(a=a.compare,a=a!==null?a:Uo,a(w,c)&&n.ref===r.ref)return Hi(n,r,p)}return r.flags|=1,n=Er(v,c),n.ref=r.ref,n.return=r,r.child=n}function Pm(n,r,a,c,p){if(n!==null){var v=n.memoizedProps;if(Uo(v,c)&&n.ref===r.ref)if(Nn=!1,r.pendingProps=c=v,(n.lanes&p)!==0)(n.flags&131072)!==0&&(Nn=!0);else return r.lanes=n.lanes,Hi(n,r,p)}return ju(n,r,a,c,p)}function Lm(n,r,a){var c=r.pendingProps,p=c.children,v=n!==null?n.memoizedState:null;if(c.mode==="hidden")if((r.mode&1)===0)r.memoizedState={baseLanes:0,cachePool:null,transitions:null},zt(zs,Wn),Wn|=a;else{if((a&1073741824)===0)return n=v!==null?v.baseLanes|a:a,r.lanes=r.childLanes=1073741824,r.memoizedState={baseLanes:n,cachePool:null,transitions:null},r.updateQueue=null,zt(zs,Wn),Wn|=n,null;r.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=v!==null?v.baseLanes:a,zt(zs,Wn),Wn|=c}else v!==null?(c=v.baseLanes|a,r.memoizedState=null):c=a,zt(zs,Wn),Wn|=c;return An(n,r,p,a),r.child}function Nm(n,r){var a=r.ref;(n===null&&a!==null||n!==null&&n.ref!==a)&&(r.flags|=512,r.flags|=2097152)}function ju(n,r,a,c,p){var v=Ln(a)?Gr:xn.current;return v=Rs(r,v),Us(r,p),a=Uu(n,r,a,c,v,p),c=Fu(),n!==null&&!Nn?(r.updateQueue=n.updateQueue,r.flags&=-2053,n.lanes&=~p,Hi(n,r,p)):(jt&&c&&_u(r),r.flags|=1,An(n,r,a,p),r.child)}function Dm(n,r,a,c,p){if(Ln(a)){var v=!0;el(r)}else v=!1;if(Us(r,p),r.stateNode===null)_l(n,r),Sm(r,a,c),Vu(r,a,c,p),c=!0;else if(n===null){var w=r.stateNode,F=r.memoizedProps;w.props=F;var W=w.context,oe=a.contextType;typeof oe=="object"&&oe!==null?oe=Zn(oe):(oe=Ln(a)?Gr:xn.current,oe=Rs(r,oe));var _e=a.getDerivedStateFromProps,xe=typeof _e=="function"||typeof w.getSnapshotBeforeUpdate=="function";xe||typeof w.UNSAFE_componentWillReceiveProps!="function"&&typeof w.componentWillReceiveProps!="function"||(F!==c||W!==oe)&&Em(r,w,c,oe),mr=!1;var ge=r.memoizedState;w.state=ge,cl(r,c,w,p),W=r.memoizedState,F!==c||ge!==W||Pn.current||mr?(typeof _e=="function"&&(Hu(r,a,_e,c),W=r.memoizedState),(F=mr||ym(r,a,F,c,ge,W,oe))?(xe||typeof w.UNSAFE_componentWillMount!="function"&&typeof w.componentWillMount!="function"||(typeof w.componentWillMount=="function"&&w.componentWillMount(),typeof w.UNSAFE_componentWillMount=="function"&&w.UNSAFE_componentWillMount()),typeof w.componentDidMount=="function"&&(r.flags|=4194308)):(typeof w.componentDidMount=="function"&&(r.flags|=4194308),r.memoizedProps=c,r.memoizedState=W),w.props=c,w.state=W,w.context=oe,c=F):(typeof w.componentDidMount=="function"&&(r.flags|=4194308),c=!1)}else{w=r.stateNode,qp(n,r),F=r.memoizedProps,oe=r.type===r.elementType?F:ai(r.type,F),w.props=oe,xe=r.pendingProps,ge=w.context,W=a.contextType,typeof W=="object"&&W!==null?W=Zn(W):(W=Ln(a)?Gr:xn.current,W=Rs(r,W));var ze=a.getDerivedStateFromProps;(_e=typeof ze=="function"||typeof w.getSnapshotBeforeUpdate=="function")||typeof w.UNSAFE_componentWillReceiveProps!="function"&&typeof w.componentWillReceiveProps!="function"||(F!==xe||ge!==W)&&Em(r,w,c,W),mr=!1,ge=r.memoizedState,w.state=ge,cl(r,c,w,p);var Ge=r.memoizedState;F!==xe||ge!==Ge||Pn.current||mr?(typeof ze=="function"&&(Hu(r,a,ze,c),Ge=r.memoizedState),(oe=mr||ym(r,a,oe,c,ge,Ge,W)||!1)?(_e||typeof w.UNSAFE_componentWillUpdate!="function"&&typeof w.componentWillUpdate!="function"||(typeof w.componentWillUpdate=="function"&&w.componentWillUpdate(c,Ge,W),typeof w.UNSAFE_componentWillUpdate=="function"&&w.UNSAFE_componentWillUpdate(c,Ge,W)),typeof w.componentDidUpdate=="function"&&(r.flags|=4),typeof w.getSnapshotBeforeUpdate=="function"&&(r.flags|=1024)):(typeof w.componentDidUpdate!="function"||F===n.memoizedProps&&ge===n.memoizedState||(r.flags|=4),typeof w.getSnapshotBeforeUpdate!="function"||F===n.memoizedProps&&ge===n.memoizedState||(r.flags|=1024),r.memoizedProps=c,r.memoizedState=Ge),w.props=c,w.state=Ge,w.context=W,c=oe):(typeof w.componentDidUpdate!="function"||F===n.memoizedProps&&ge===n.memoizedState||(r.flags|=4),typeof w.getSnapshotBeforeUpdate!="function"||F===n.memoizedProps&&ge===n.memoizedState||(r.flags|=1024),c=!1)}return Xu(n,r,a,c,v,p)}function Xu(n,r,a,c,p,v){Nm(n,r);var w=(r.flags&128)!==0;if(!c&&!w)return p&&kp(r,a,!1),Hi(n,r,v);c=r.stateNode,cy.current=r;var F=w&&typeof a.getDerivedStateFromError!="function"?null:c.render();return r.flags|=1,n!==null&&w?(r.child=Ds(r,n.child,null,v),r.child=Ds(r,null,F,v)):An(n,r,F,v),r.memoizedState=c.state,p&&kp(r,a,!0),r.child}function Im(n){var r=n.stateNode;r.pendingContext?Fp(n,r.pendingContext,r.pendingContext!==r.context):r.context&&Fp(n,r.context,!1),Ru(n,r.containerInfo)}function Um(n,r,a,c,p){return Ns(),Eu(p),r.flags|=256,An(n,r,a,c),r.child}var $u={dehydrated:null,treeContext:null,retryLane:0};function Yu(n){return{baseLanes:n,cachePool:null,transitions:null}}function Fm(n,r,a){var c=r.pendingProps,p=Xt.current,v=!1,w=(r.flags&128)!==0,F;if((F=w)||(F=n!==null&&n.memoizedState===null?!1:(p&2)!==0),F?(v=!0,r.flags&=-129):(n===null||n.memoizedState!==null)&&(p|=1),zt(Xt,p&1),n===null)return Su(r),n=r.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((r.mode&1)===0?r.lanes=1:n.data==="$!"?r.lanes=8:r.lanes=1073741824,null):(w=c.children,n=c.fallback,v?(c=r.mode,v=r.child,w={mode:"hidden",children:w},(c&1)===0&&v!==null?(v.childLanes=0,v.pendingProps=w):v=Pl(w,c,0,null),n=Jr(n,c,a,null),v.return=r,n.return=r,v.sibling=n,r.child=v,r.child.memoizedState=Yu(a),r.memoizedState=$u,n):qu(r,w));if(p=n.memoizedState,p!==null&&(F=p.dehydrated,F!==null))return uy(n,r,w,c,F,p,a);if(v){v=c.fallback,w=r.mode,p=n.child,F=p.sibling;var W={mode:"hidden",children:c.children};return(w&1)===0&&r.child!==p?(c=r.child,c.childLanes=0,c.pendingProps=W,r.deletions=null):(c=Er(p,W),c.subtreeFlags=p.subtreeFlags&14680064),F!==null?v=Er(F,v):(v=Jr(v,w,a,null),v.flags|=2),v.return=r,c.return=r,c.sibling=v,r.child=c,c=v,v=r.child,w=n.child.memoizedState,w=w===null?Yu(a):{baseLanes:w.baseLanes|a,cachePool:null,transitions:w.transitions},v.memoizedState=w,v.childLanes=n.childLanes&~a,r.memoizedState=$u,c}return v=n.child,n=v.sibling,c=Er(v,{mode:"visible",children:c.children}),(r.mode&1)===0&&(c.lanes=a),c.return=r,c.sibling=null,n!==null&&(a=r.deletions,a===null?(r.deletions=[n],r.flags|=16):a.push(n)),r.child=c,r.memoizedState=null,c}function qu(n,r){return r=Pl({mode:"visible",children:r},n.mode,0,null),r.return=n,n.child=r}function vl(n,r,a,c){return c!==null&&Eu(c),Ds(r,n.child,null,a),n=qu(r,r.pendingProps.children),n.flags|=2,r.memoizedState=null,n}function uy(n,r,a,c,p,v,w){if(a)return r.flags&256?(r.flags&=-257,c=Gu(Error(t(422))),vl(n,r,w,c)):r.memoizedState!==null?(r.child=n.child,r.flags|=128,null):(v=c.fallback,p=r.mode,c=Pl({mode:"visible",children:c.children},p,0,null),v=Jr(v,p,w,null),v.flags|=2,c.return=r,v.return=r,c.sibling=v,r.child=c,(r.mode&1)!==0&&Ds(r,n.child,null,w),r.child.memoizedState=Yu(w),r.memoizedState=$u,v);if((r.mode&1)===0)return vl(n,r,w,null);if(p.data==="$!"){if(c=p.nextSibling&&p.nextSibling.dataset,c)var F=c.dgst;return c=F,v=Error(t(419)),c=Gu(v,c,void 0),vl(n,r,w,c)}if(F=(w&n.childLanes)!==0,Nn||F){if(c=dn,c!==null){switch(w&-w){case 4:p=2;break;case 16:p=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:p=32;break;case 536870912:p=268435456;break;default:p=0}p=(p&(c.suspendedLanes|w))!==0?0:p,p!==0&&p!==v.retryLane&&(v.retryLane=p,zi(n,p),ui(c,n,p,-1))}return dd(),c=Gu(Error(t(421))),vl(n,r,w,c)}return p.data==="$?"?(r.flags|=128,r.child=n.child,r=My.bind(null,n),p._reactRetry=r,null):(n=v.treeContext,Gn=dr(p.nextSibling),Vn=r,jt=!0,oi=null,n!==null&&(qn[Kn++]=Oi,qn[Kn++]=ki,qn[Kn++]=Wr,Oi=n.id,ki=n.overflow,Wr=r),r=qu(r,c.children),r.flags|=4096,r)}function Om(n,r,a){n.lanes|=r;var c=n.alternate;c!==null&&(c.lanes|=r),bu(n.return,r,a)}function Ku(n,r,a,c,p){var v=n.memoizedState;v===null?n.memoizedState={isBackwards:r,rendering:null,renderingStartTime:0,last:c,tail:a,tailMode:p}:(v.isBackwards=r,v.rendering=null,v.renderingStartTime=0,v.last=c,v.tail=a,v.tailMode=p)}function km(n,r,a){var c=r.pendingProps,p=c.revealOrder,v=c.tail;if(An(n,r,c.children,a),c=Xt.current,(c&2)!==0)c=c&1|2,r.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=r.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Om(n,a,r);else if(n.tag===19)Om(n,a,r);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===r)break e;for(;n.sibling===null;){if(n.return===null||n.return===r)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}c&=1}if(zt(Xt,c),(r.mode&1)===0)r.memoizedState=null;else switch(p){case"forwards":for(a=r.child,p=null;a!==null;)n=a.alternate,n!==null&&ul(n)===null&&(p=a),a=a.sibling;a=p,a===null?(p=r.child,r.child=null):(p=a.sibling,a.sibling=null),Ku(r,!1,p,a,v);break;case"backwards":for(a=null,p=r.child,r.child=null;p!==null;){if(n=p.alternate,n!==null&&ul(n)===null){r.child=p;break}n=p.sibling,p.sibling=a,a=p,p=n}Ku(r,!0,a,null,v);break;case"together":Ku(r,!1,null,null,void 0);break;default:r.memoizedState=null}return r.child}function _l(n,r){(r.mode&1)===0&&n!==null&&(n.alternate=null,r.alternate=null,r.flags|=2)}function Hi(n,r,a){if(n!==null&&(r.dependencies=n.dependencies),qr|=r.lanes,(a&r.childLanes)===0)return null;if(n!==null&&r.child!==n.child)throw Error(t(153));if(r.child!==null){for(n=r.child,a=Er(n,n.pendingProps),r.child=a,a.return=r;n.sibling!==null;)n=n.sibling,a=a.sibling=Er(n,n.pendingProps),a.return=r;a.sibling=null}return r.child}function dy(n,r,a){switch(r.tag){case 3:Im(r),Ns();break;case 5:Qp(r);break;case 1:Ln(r.type)&&el(r);break;case 4:Ru(r,r.stateNode.containerInfo);break;case 10:var c=r.type._context,p=r.memoizedProps.value;zt(ol,c._currentValue),c._currentValue=p;break;case 13:if(c=r.memoizedState,c!==null)return c.dehydrated!==null?(zt(Xt,Xt.current&1),r.flags|=128,null):(a&r.child.childLanes)!==0?Fm(n,r,a):(zt(Xt,Xt.current&1),n=Hi(n,r,a),n!==null?n.sibling:null);zt(Xt,Xt.current&1);break;case 19:if(c=(a&r.childLanes)!==0,(n.flags&128)!==0){if(c)return km(n,r,a);r.flags|=128}if(p=r.memoizedState,p!==null&&(p.rendering=null,p.tail=null,p.lastEffect=null),zt(Xt,Xt.current),c)break;return null;case 22:case 23:return r.lanes=0,Lm(n,r,a)}return Hi(n,r,a)}var zm,Zu,Bm,Hm;zm=function(n,r){for(var a=r.child;a!==null;){if(a.tag===5||a.tag===6)n.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===r)break;for(;a.sibling===null;){if(a.return===null||a.return===r)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},Zu=function(){},Bm=function(n,r,a,c){var p=n.memoizedProps;if(p!==c){n=r.stateNode,$r(Ei.current);var v=null;switch(a){case"input":p=Nt(n,p),c=Nt(n,c),v=[];break;case"select":p=ue({},p,{value:void 0}),c=ue({},c,{value:void 0}),v=[];break;case"textarea":p=Ht(n,p),c=Ht(n,c),v=[];break;default:typeof p.onClick!="function"&&typeof c.onClick=="function"&&(n.onclick=Za)}Ke(a,c);var w;a=null;for(oe in p)if(!c.hasOwnProperty(oe)&&p.hasOwnProperty(oe)&&p[oe]!=null)if(oe==="style"){var F=p[oe];for(w in F)F.hasOwnProperty(w)&&(a||(a={}),a[w]="")}else oe!=="dangerouslySetInnerHTML"&&oe!=="children"&&oe!=="suppressContentEditableWarning"&&oe!=="suppressHydrationWarning"&&oe!=="autoFocus"&&(o.hasOwnProperty(oe)?v||(v=[]):(v=v||[]).push(oe,null));for(oe in c){var W=c[oe];if(F=p!=null?p[oe]:void 0,c.hasOwnProperty(oe)&&W!==F&&(W!=null||F!=null))if(oe==="style")if(F){for(w in F)!F.hasOwnProperty(w)||W&&W.hasOwnProperty(w)||(a||(a={}),a[w]="");for(w in W)W.hasOwnProperty(w)&&F[w]!==W[w]&&(a||(a={}),a[w]=W[w])}else a||(v||(v=[]),v.push(oe,a)),a=W;else oe==="dangerouslySetInnerHTML"?(W=W?W.__html:void 0,F=F?F.__html:void 0,W!=null&&F!==W&&(v=v||[]).push(oe,W)):oe==="children"?typeof W!="string"&&typeof W!="number"||(v=v||[]).push(oe,""+W):oe!=="suppressContentEditableWarning"&&oe!=="suppressHydrationWarning"&&(o.hasOwnProperty(oe)?(W!=null&&oe==="onScroll"&&Vt("scroll",n),v||F===W||(v=[])):(v=v||[]).push(oe,W))}a&&(v=v||[]).push("style",a);var oe=v;(r.updateQueue=oe)&&(r.flags|=4)}},Hm=function(n,r,a,c){a!==c&&(r.flags|=4)};function Ko(n,r){if(!jt)switch(n.tailMode){case"hidden":r=n.tail;for(var a=null;r!==null;)r.alternate!==null&&(a=r),r=r.sibling;a===null?n.tail=null:a.sibling=null;break;case"collapsed":a=n.tail;for(var c=null;a!==null;)a.alternate!==null&&(c=a),a=a.sibling;c===null?r||n.tail===null?n.tail=null:n.tail.sibling=null:c.sibling=null}}function Sn(n){var r=n.alternate!==null&&n.alternate.child===n.child,a=0,c=0;if(r)for(var p=n.child;p!==null;)a|=p.lanes|p.childLanes,c|=p.subtreeFlags&14680064,c|=p.flags&14680064,p.return=n,p=p.sibling;else for(p=n.child;p!==null;)a|=p.lanes|p.childLanes,c|=p.subtreeFlags,c|=p.flags,p.return=n,p=p.sibling;return n.subtreeFlags|=c,n.childLanes=a,r}function fy(n,r,a){var c=r.pendingProps;switch(xu(r),r.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Sn(r),null;case 1:return Ln(r.type)&&Ja(),Sn(r),null;case 3:return c=r.stateNode,Fs(),Gt(Pn),Gt(xn),Nu(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(n===null||n.child===null)&&(rl(r)?r.flags|=4:n===null||n.memoizedState.isDehydrated&&(r.flags&256)===0||(r.flags|=1024,oi!==null&&(ld(oi),oi=null))),Zu(n,r),Sn(r),null;case 5:Pu(r);var p=$r(jo.current);if(a=r.type,n!==null&&r.stateNode!=null)Bm(n,r,a,c,p),n.ref!==r.ref&&(r.flags|=512,r.flags|=2097152);else{if(!c){if(r.stateNode===null)throw Error(t(166));return Sn(r),null}if(n=$r(Ei.current),rl(r)){c=r.stateNode,a=r.type;var v=r.memoizedProps;switch(c[Si]=r,c[Bo]=v,n=(r.mode&1)!==0,a){case"dialog":Vt("cancel",c),Vt("close",c);break;case"iframe":case"object":case"embed":Vt("load",c);break;case"video":case"audio":for(p=0;p<Oo.length;p++)Vt(Oo[p],c);break;case"source":Vt("error",c);break;case"img":case"image":case"link":Vt("error",c),Vt("load",c);break;case"details":Vt("toggle",c);break;case"input":ft(c,v),Vt("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!v.multiple},Vt("invalid",c);break;case"textarea":D(c,v),Vt("invalid",c)}Ke(a,v),p=null;for(var w in v)if(v.hasOwnProperty(w)){var F=v[w];w==="children"?typeof F=="string"?c.textContent!==F&&(v.suppressHydrationWarning!==!0&&Ka(c.textContent,F,n),p=["children",F]):typeof F=="number"&&c.textContent!==""+F&&(v.suppressHydrationWarning!==!0&&Ka(c.textContent,F,n),p=["children",""+F]):o.hasOwnProperty(w)&&F!=null&&w==="onScroll"&&Vt("scroll",c)}switch(a){case"input":pt(c),Ft(c,v,!0);break;case"textarea":pt(c),J(c);break;case"select":case"option":break;default:typeof v.onClick=="function"&&(c.onclick=Za)}c=p,r.updateQueue=c,c!==null&&(r.flags|=4)}else{w=p.nodeType===9?p:p.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=pe(a)),n==="http://www.w3.org/1999/xhtml"?a==="script"?(n=w.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof c.is=="string"?n=w.createElement(a,{is:c.is}):(n=w.createElement(a),a==="select"&&(w=n,c.multiple?w.multiple=!0:c.size&&(w.size=c.size))):n=w.createElementNS(n,a),n[Si]=r,n[Bo]=c,zm(n,r,!1,!1),r.stateNode=n;e:{switch(w=Pe(a,c),a){case"dialog":Vt("cancel",n),Vt("close",n),p=c;break;case"iframe":case"object":case"embed":Vt("load",n),p=c;break;case"video":case"audio":for(p=0;p<Oo.length;p++)Vt(Oo[p],n);p=c;break;case"source":Vt("error",n),p=c;break;case"img":case"image":case"link":Vt("error",n),Vt("load",n),p=c;break;case"details":Vt("toggle",n),p=c;break;case"input":ft(n,c),p=Nt(n,c),Vt("invalid",n);break;case"option":p=c;break;case"select":n._wrapperState={wasMultiple:!!c.multiple},p=ue({},c,{value:void 0}),Vt("invalid",n);break;case"textarea":D(n,c),p=Ht(n,c),Vt("invalid",n);break;default:p=c}Ke(a,p),F=p;for(v in F)if(F.hasOwnProperty(v)){var W=F[v];v==="style"?Ue(n,W):v==="dangerouslySetInnerHTML"?(W=W?W.__html:void 0,W!=null&&Qe(n,W)):v==="children"?typeof W=="string"?(a!=="textarea"||W!=="")&&be(n,W):typeof W=="number"&&be(n,""+W):v!=="suppressContentEditableWarning"&&v!=="suppressHydrationWarning"&&v!=="autoFocus"&&(o.hasOwnProperty(v)?W!=null&&v==="onScroll"&&Vt("scroll",n):W!=null&&P(n,v,W,w))}switch(a){case"input":pt(n),Ft(n,c,!1);break;case"textarea":pt(n),J(n);break;case"option":c.value!=null&&n.setAttribute("value",""+ye(c.value));break;case"select":n.multiple=!!c.multiple,v=c.value,v!=null?Bt(n,!!c.multiple,v,!1):c.defaultValue!=null&&Bt(n,!!c.multiple,c.defaultValue,!0);break;default:typeof p.onClick=="function"&&(n.onclick=Za)}switch(a){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(r.flags|=4)}r.ref!==null&&(r.flags|=512,r.flags|=2097152)}return Sn(r),null;case 6:if(n&&r.stateNode!=null)Hm(n,r,n.memoizedProps,c);else{if(typeof c!="string"&&r.stateNode===null)throw Error(t(166));if(a=$r(jo.current),$r(Ei.current),rl(r)){if(c=r.stateNode,a=r.memoizedProps,c[Si]=r,(v=c.nodeValue!==a)&&(n=Vn,n!==null))switch(n.tag){case 3:Ka(c.nodeValue,a,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Ka(c.nodeValue,a,(n.mode&1)!==0)}v&&(r.flags|=4)}else c=(a.nodeType===9?a:a.ownerDocument).createTextNode(c),c[Si]=r,r.stateNode=c}return Sn(r),null;case 13:if(Gt(Xt),c=r.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(jt&&Gn!==null&&(r.mode&1)!==0&&(r.flags&128)===0)Wp(),Ns(),r.flags|=98560,v=!1;else if(v=rl(r),c!==null&&c.dehydrated!==null){if(n===null){if(!v)throw Error(t(318));if(v=r.memoizedState,v=v!==null?v.dehydrated:null,!v)throw Error(t(317));v[Si]=r}else Ns(),(r.flags&128)===0&&(r.memoizedState=null),r.flags|=4;Sn(r),v=!1}else oi!==null&&(ld(oi),oi=null),v=!0;if(!v)return r.flags&65536?r:null}return(r.flags&128)!==0?(r.lanes=a,r):(c=c!==null,c!==(n!==null&&n.memoizedState!==null)&&c&&(r.child.flags|=8192,(r.mode&1)!==0&&(n===null||(Xt.current&1)!==0?rn===0&&(rn=3):dd())),r.updateQueue!==null&&(r.flags|=4),Sn(r),null);case 4:return Fs(),Zu(n,r),n===null&&ko(r.stateNode.containerInfo),Sn(r),null;case 10:return Tu(r.type._context),Sn(r),null;case 17:return Ln(r.type)&&Ja(),Sn(r),null;case 19:if(Gt(Xt),v=r.memoizedState,v===null)return Sn(r),null;if(c=(r.flags&128)!==0,w=v.rendering,w===null)if(c)Ko(v,!1);else{if(rn!==0||n!==null&&(n.flags&128)!==0)for(n=r.child;n!==null;){if(w=ul(n),w!==null){for(r.flags|=128,Ko(v,!1),c=w.updateQueue,c!==null&&(r.updateQueue=c,r.flags|=4),r.subtreeFlags=0,c=a,a=r.child;a!==null;)v=a,n=c,v.flags&=14680066,w=v.alternate,w===null?(v.childLanes=0,v.lanes=n,v.child=null,v.subtreeFlags=0,v.memoizedProps=null,v.memoizedState=null,v.updateQueue=null,v.dependencies=null,v.stateNode=null):(v.childLanes=w.childLanes,v.lanes=w.lanes,v.child=w.child,v.subtreeFlags=0,v.deletions=null,v.memoizedProps=w.memoizedProps,v.memoizedState=w.memoizedState,v.updateQueue=w.updateQueue,v.type=w.type,n=w.dependencies,v.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),a=a.sibling;return zt(Xt,Xt.current&1|2),r.child}n=n.sibling}v.tail!==null&&$()>Bs&&(r.flags|=128,c=!0,Ko(v,!1),r.lanes=4194304)}else{if(!c)if(n=ul(w),n!==null){if(r.flags|=128,c=!0,a=n.updateQueue,a!==null&&(r.updateQueue=a,r.flags|=4),Ko(v,!0),v.tail===null&&v.tailMode==="hidden"&&!w.alternate&&!jt)return Sn(r),null}else 2*$()-v.renderingStartTime>Bs&&a!==1073741824&&(r.flags|=128,c=!0,Ko(v,!1),r.lanes=4194304);v.isBackwards?(w.sibling=r.child,r.child=w):(a=v.last,a!==null?a.sibling=w:r.child=w,v.last=w)}return v.tail!==null?(r=v.tail,v.rendering=r,v.tail=r.sibling,v.renderingStartTime=$(),r.sibling=null,a=Xt.current,zt(Xt,c?a&1|2:a&1),r):(Sn(r),null);case 22:case 23:return ud(),c=r.memoizedState!==null,n!==null&&n.memoizedState!==null!==c&&(r.flags|=8192),c&&(r.mode&1)!==0?(Wn&1073741824)!==0&&(Sn(r),r.subtreeFlags&6&&(r.flags|=8192)):Sn(r),null;case 24:return null;case 25:return null}throw Error(t(156,r.tag))}function hy(n,r){switch(xu(r),r.tag){case 1:return Ln(r.type)&&Ja(),n=r.flags,n&65536?(r.flags=n&-65537|128,r):null;case 3:return Fs(),Gt(Pn),Gt(xn),Nu(),n=r.flags,(n&65536)!==0&&(n&128)===0?(r.flags=n&-65537|128,r):null;case 5:return Pu(r),null;case 13:if(Gt(Xt),n=r.memoizedState,n!==null&&n.dehydrated!==null){if(r.alternate===null)throw Error(t(340));Ns()}return n=r.flags,n&65536?(r.flags=n&-65537|128,r):null;case 19:return Gt(Xt),null;case 4:return Fs(),null;case 10:return Tu(r.type._context),null;case 22:case 23:return ud(),null;case 24:return null;default:return null}}var xl=!1,En=!1,py=typeof WeakSet=="function"?WeakSet:Set,Be=null;function ks(n,r){var a=n.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(c){Kt(n,r,c)}else a.current=null}function Qu(n,r,a){try{a()}catch(c){Kt(n,r,c)}}var Vm=!1;function my(n,r){if(uu=za,n=yp(),nu(n)){if("selectionStart"in n)var a={start:n.selectionStart,end:n.selectionEnd};else e:{a=(a=n.ownerDocument)&&a.defaultView||window;var c=a.getSelection&&a.getSelection();if(c&&c.rangeCount!==0){a=c.anchorNode;var p=c.anchorOffset,v=c.focusNode;c=c.focusOffset;try{a.nodeType,v.nodeType}catch{a=null;break e}var w=0,F=-1,W=-1,oe=0,_e=0,xe=n,ge=null;t:for(;;){for(var ze;xe!==a||p!==0&&xe.nodeType!==3||(F=w+p),xe!==v||c!==0&&xe.nodeType!==3||(W=w+c),xe.nodeType===3&&(w+=xe.nodeValue.length),(ze=xe.firstChild)!==null;)ge=xe,xe=ze;for(;;){if(xe===n)break t;if(ge===a&&++oe===p&&(F=w),ge===v&&++_e===c&&(W=w),(ze=xe.nextSibling)!==null)break;xe=ge,ge=xe.parentNode}xe=ze}a=F===-1||W===-1?null:{start:F,end:W}}else a=null}a=a||{start:0,end:0}}else a=null;for(du={focusedElem:n,selectionRange:a},za=!1,Be=r;Be!==null;)if(r=Be,n=r.child,(r.subtreeFlags&1028)!==0&&n!==null)n.return=r,Be=n;else for(;Be!==null;){r=Be;try{var Ge=r.alternate;if((r.flags&1024)!==0)switch(r.tag){case 0:case 11:case 15:break;case 1:if(Ge!==null){var qe=Ge.memoizedProps,Qt=Ge.memoizedState,K=r.stateNode,X=K.getSnapshotBeforeUpdate(r.elementType===r.type?qe:ai(r.type,qe),Qt);K.__reactInternalSnapshotBeforeUpdate=X}break;case 3:var ee=r.stateNode.containerInfo;ee.nodeType===1?ee.textContent="":ee.nodeType===9&&ee.documentElement&&ee.removeChild(ee.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(Te){Kt(r,r.return,Te)}if(n=r.sibling,n!==null){n.return=r.return,Be=n;break}Be=r.return}return Ge=Vm,Vm=!1,Ge}function Zo(n,r,a){var c=r.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var p=c=c.next;do{if((p.tag&n)===n){var v=p.destroy;p.destroy=void 0,v!==void 0&&Qu(r,a,v)}p=p.next}while(p!==c)}}function yl(n,r){if(r=r.updateQueue,r=r!==null?r.lastEffect:null,r!==null){var a=r=r.next;do{if((a.tag&n)===n){var c=a.create;a.destroy=c()}a=a.next}while(a!==r)}}function Ju(n){var r=n.ref;if(r!==null){var a=n.stateNode;switch(n.tag){case 5:n=a;break;default:n=a}typeof r=="function"?r(n):r.current=n}}function Gm(n){var r=n.alternate;r!==null&&(n.alternate=null,Gm(r)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(r=n.stateNode,r!==null&&(delete r[Si],delete r[Bo],delete r[mu],delete r[Zx],delete r[Qx])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Wm(n){return n.tag===5||n.tag===3||n.tag===4}function jm(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||Wm(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function ed(n,r,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,r?a.nodeType===8?a.parentNode.insertBefore(n,r):a.insertBefore(n,r):(a.nodeType===8?(r=a.parentNode,r.insertBefore(n,a)):(r=a,r.appendChild(n)),a=a._reactRootContainer,a!=null||r.onclick!==null||(r.onclick=Za));else if(c!==4&&(n=n.child,n!==null))for(ed(n,r,a),n=n.sibling;n!==null;)ed(n,r,a),n=n.sibling}function td(n,r,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,r?a.insertBefore(n,r):a.appendChild(n);else if(c!==4&&(n=n.child,n!==null))for(td(n,r,a),n=n.sibling;n!==null;)td(n,r,a),n=n.sibling}var pn=null,li=!1;function vr(n,r,a){for(a=a.child;a!==null;)Xm(n,r,a),a=a.sibling}function Xm(n,r,a){if(lt&&typeof lt.onCommitFiberUnmount=="function")try{lt.onCommitFiberUnmount(et,a)}catch{}switch(a.tag){case 5:En||ks(a,r);case 6:var c=pn,p=li;pn=null,vr(n,r,a),pn=c,li=p,pn!==null&&(li?(n=pn,a=a.stateNode,n.nodeType===8?n.parentNode.removeChild(a):n.removeChild(a)):pn.removeChild(a.stateNode));break;case 18:pn!==null&&(li?(n=pn,a=a.stateNode,n.nodeType===8?pu(n.parentNode,a):n.nodeType===1&&pu(n,a),Ro(n)):pu(pn,a.stateNode));break;case 4:c=pn,p=li,pn=a.stateNode.containerInfo,li=!0,vr(n,r,a),pn=c,li=p;break;case 0:case 11:case 14:case 15:if(!En&&(c=a.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){p=c=c.next;do{var v=p,w=v.destroy;v=v.tag,w!==void 0&&((v&2)!==0||(v&4)!==0)&&Qu(a,r,w),p=p.next}while(p!==c)}vr(n,r,a);break;case 1:if(!En&&(ks(a,r),c=a.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=a.memoizedProps,c.state=a.memoizedState,c.componentWillUnmount()}catch(F){Kt(a,r,F)}vr(n,r,a);break;case 21:vr(n,r,a);break;case 22:a.mode&1?(En=(c=En)||a.memoizedState!==null,vr(n,r,a),En=c):vr(n,r,a);break;default:vr(n,r,a)}}function $m(n){var r=n.updateQueue;if(r!==null){n.updateQueue=null;var a=n.stateNode;a===null&&(a=n.stateNode=new py),r.forEach(function(c){var p=wy.bind(null,n,c);a.has(c)||(a.add(c),c.then(p,p))})}}function ci(n,r){var a=r.deletions;if(a!==null)for(var c=0;c<a.length;c++){var p=a[c];try{var v=n,w=r,F=w;e:for(;F!==null;){switch(F.tag){case 5:pn=F.stateNode,li=!1;break e;case 3:pn=F.stateNode.containerInfo,li=!0;break e;case 4:pn=F.stateNode.containerInfo,li=!0;break e}F=F.return}if(pn===null)throw Error(t(160));Xm(v,w,p),pn=null,li=!1;var W=p.alternate;W!==null&&(W.return=null),p.return=null}catch(oe){Kt(p,r,oe)}}if(r.subtreeFlags&12854)for(r=r.child;r!==null;)Ym(r,n),r=r.sibling}function Ym(n,r){var a=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(ci(r,n),wi(n),c&4){try{Zo(3,n,n.return),yl(3,n)}catch(qe){Kt(n,n.return,qe)}try{Zo(5,n,n.return)}catch(qe){Kt(n,n.return,qe)}}break;case 1:ci(r,n),wi(n),c&512&&a!==null&&ks(a,a.return);break;case 5:if(ci(r,n),wi(n),c&512&&a!==null&&ks(a,a.return),n.flags&32){var p=n.stateNode;try{be(p,"")}catch(qe){Kt(n,n.return,qe)}}if(c&4&&(p=n.stateNode,p!=null)){var v=n.memoizedProps,w=a!==null?a.memoizedProps:v,F=n.type,W=n.updateQueue;if(n.updateQueue=null,W!==null)try{F==="input"&&v.type==="radio"&&v.name!=null&&st(p,v),Pe(F,w);var oe=Pe(F,v);for(w=0;w<W.length;w+=2){var _e=W[w],xe=W[w+1];_e==="style"?Ue(p,xe):_e==="dangerouslySetInnerHTML"?Qe(p,xe):_e==="children"?be(p,xe):P(p,_e,xe,oe)}switch(F){case"input":Xe(p,v);break;case"textarea":T(p,v);break;case"select":var ge=p._wrapperState.wasMultiple;p._wrapperState.wasMultiple=!!v.multiple;var ze=v.value;ze!=null?Bt(p,!!v.multiple,ze,!1):ge!==!!v.multiple&&(v.defaultValue!=null?Bt(p,!!v.multiple,v.defaultValue,!0):Bt(p,!!v.multiple,v.multiple?[]:"",!1))}p[Bo]=v}catch(qe){Kt(n,n.return,qe)}}break;case 6:if(ci(r,n),wi(n),c&4){if(n.stateNode===null)throw Error(t(162));p=n.stateNode,v=n.memoizedProps;try{p.nodeValue=v}catch(qe){Kt(n,n.return,qe)}}break;case 3:if(ci(r,n),wi(n),c&4&&a!==null&&a.memoizedState.isDehydrated)try{Ro(r.containerInfo)}catch(qe){Kt(n,n.return,qe)}break;case 4:ci(r,n),wi(n);break;case 13:ci(r,n),wi(n),p=n.child,p.flags&8192&&(v=p.memoizedState!==null,p.stateNode.isHidden=v,!v||p.alternate!==null&&p.alternate.memoizedState!==null||(rd=$())),c&4&&$m(n);break;case 22:if(_e=a!==null&&a.memoizedState!==null,n.mode&1?(En=(oe=En)||_e,ci(r,n),En=oe):ci(r,n),wi(n),c&8192){if(oe=n.memoizedState!==null,(n.stateNode.isHidden=oe)&&!_e&&(n.mode&1)!==0)for(Be=n,_e=n.child;_e!==null;){for(xe=Be=_e;Be!==null;){switch(ge=Be,ze=ge.child,ge.tag){case 0:case 11:case 14:case 15:Zo(4,ge,ge.return);break;case 1:ks(ge,ge.return);var Ge=ge.stateNode;if(typeof Ge.componentWillUnmount=="function"){c=ge,a=ge.return;try{r=c,Ge.props=r.memoizedProps,Ge.state=r.memoizedState,Ge.componentWillUnmount()}catch(qe){Kt(c,a,qe)}}break;case 5:ks(ge,ge.return);break;case 22:if(ge.memoizedState!==null){Zm(xe);continue}}ze!==null?(ze.return=ge,Be=ze):Zm(xe)}_e=_e.sibling}e:for(_e=null,xe=n;;){if(xe.tag===5){if(_e===null){_e=xe;try{p=xe.stateNode,oe?(v=p.style,typeof v.setProperty=="function"?v.setProperty("display","none","important"):v.display="none"):(F=xe.stateNode,W=xe.memoizedProps.style,w=W!=null&&W.hasOwnProperty("display")?W.display:null,F.style.display=we("display",w))}catch(qe){Kt(n,n.return,qe)}}}else if(xe.tag===6){if(_e===null)try{xe.stateNode.nodeValue=oe?"":xe.memoizedProps}catch(qe){Kt(n,n.return,qe)}}else if((xe.tag!==22&&xe.tag!==23||xe.memoizedState===null||xe===n)&&xe.child!==null){xe.child.return=xe,xe=xe.child;continue}if(xe===n)break e;for(;xe.sibling===null;){if(xe.return===null||xe.return===n)break e;_e===xe&&(_e=null),xe=xe.return}_e===xe&&(_e=null),xe.sibling.return=xe.return,xe=xe.sibling}}break;case 19:ci(r,n),wi(n),c&4&&$m(n);break;case 21:break;default:ci(r,n),wi(n)}}function wi(n){var r=n.flags;if(r&2){try{e:{for(var a=n.return;a!==null;){if(Wm(a)){var c=a;break e}a=a.return}throw Error(t(160))}switch(c.tag){case 5:var p=c.stateNode;c.flags&32&&(be(p,""),c.flags&=-33);var v=jm(n);td(n,v,p);break;case 3:case 4:var w=c.stateNode.containerInfo,F=jm(n);ed(n,F,w);break;default:throw Error(t(161))}}catch(W){Kt(n,n.return,W)}n.flags&=-3}r&4096&&(n.flags&=-4097)}function gy(n,r,a){Be=n,qm(n)}function qm(n,r,a){for(var c=(n.mode&1)!==0;Be!==null;){var p=Be,v=p.child;if(p.tag===22&&c){var w=p.memoizedState!==null||xl;if(!w){var F=p.alternate,W=F!==null&&F.memoizedState!==null||En;F=xl;var oe=En;if(xl=w,(En=W)&&!oe)for(Be=p;Be!==null;)w=Be,W=w.child,w.tag===22&&w.memoizedState!==null?Qm(p):W!==null?(W.return=w,Be=W):Qm(p);for(;v!==null;)Be=v,qm(v),v=v.sibling;Be=p,xl=F,En=oe}Km(n)}else(p.subtreeFlags&8772)!==0&&v!==null?(v.return=p,Be=v):Km(n)}}function Km(n){for(;Be!==null;){var r=Be;if((r.flags&8772)!==0){var a=r.alternate;try{if((r.flags&8772)!==0)switch(r.tag){case 0:case 11:case 15:En||yl(5,r);break;case 1:var c=r.stateNode;if(r.flags&4&&!En)if(a===null)c.componentDidMount();else{var p=r.elementType===r.type?a.memoizedProps:ai(r.type,a.memoizedProps);c.componentDidUpdate(p,a.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var v=r.updateQueue;v!==null&&Zp(r,v,c);break;case 3:var w=r.updateQueue;if(w!==null){if(a=null,r.child!==null)switch(r.child.tag){case 5:a=r.child.stateNode;break;case 1:a=r.child.stateNode}Zp(r,w,a)}break;case 5:var F=r.stateNode;if(a===null&&r.flags&4){a=F;var W=r.memoizedProps;switch(r.type){case"button":case"input":case"select":case"textarea":W.autoFocus&&a.focus();break;case"img":W.src&&(a.src=W.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(r.memoizedState===null){var oe=r.alternate;if(oe!==null){var _e=oe.memoizedState;if(_e!==null){var xe=_e.dehydrated;xe!==null&&Ro(xe)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}En||r.flags&512&&Ju(r)}catch(ge){Kt(r,r.return,ge)}}if(r===n){Be=null;break}if(a=r.sibling,a!==null){a.return=r.return,Be=a;break}Be=r.return}}function Zm(n){for(;Be!==null;){var r=Be;if(r===n){Be=null;break}var a=r.sibling;if(a!==null){a.return=r.return,Be=a;break}Be=r.return}}function Qm(n){for(;Be!==null;){var r=Be;try{switch(r.tag){case 0:case 11:case 15:var a=r.return;try{yl(4,r)}catch(W){Kt(r,a,W)}break;case 1:var c=r.stateNode;if(typeof c.componentDidMount=="function"){var p=r.return;try{c.componentDidMount()}catch(W){Kt(r,p,W)}}var v=r.return;try{Ju(r)}catch(W){Kt(r,v,W)}break;case 5:var w=r.return;try{Ju(r)}catch(W){Kt(r,w,W)}}}catch(W){Kt(r,r.return,W)}if(r===n){Be=null;break}var F=r.sibling;if(F!==null){F.return=r.return,Be=F;break}Be=r.return}}var vy=Math.ceil,Sl=b.ReactCurrentDispatcher,nd=b.ReactCurrentOwner,Jn=b.ReactCurrentBatchConfig,bt=0,dn=null,Jt=null,mn=0,Wn=0,zs=fr(0),rn=0,Qo=null,qr=0,El=0,id=0,Jo=null,Dn=null,rd=0,Bs=1/0,Vi=null,Ml=!1,sd=null,_r=null,wl=!1,xr=null,Tl=0,ea=0,od=null,bl=-1,Al=0;function Cn(){return(bt&6)!==0?$():bl!==-1?bl:bl=$()}function yr(n){return(n.mode&1)===0?1:(bt&2)!==0&&mn!==0?mn&-mn:ey.transition!==null?(Al===0&&(Al=bn()),Al):(n=yt,n!==0||(n=window.event,n=n===void 0?16:ep(n.type)),n)}function ui(n,r,a,c){if(50<ea)throw ea=0,od=null,Error(t(185));Zt(n,a,c),((bt&2)===0||n!==dn)&&(n===dn&&((bt&2)===0&&(El|=a),rn===4&&Sr(n,mn)),In(n,c),a===1&&bt===0&&(r.mode&1)===0&&(Bs=$()+500,tl&&pr()))}function In(n,r){var a=n.callbackNode;Br(n,r);var c=ri(n,n===dn?mn:0);if(c===0)a!==null&&Y(a),n.callbackNode=null,n.callbackPriority=0;else if(r=c&-c,n.callbackPriority!==r){if(a!=null&&Y(a),r===1)n.tag===0?Jx(eg.bind(null,n)):zp(eg.bind(null,n)),qx(function(){(bt&6)===0&&pr()}),a=null;else{switch(Xh(c)){case 1:a=Le;break;case 4:a=Ve;break;case 16:a=ke;break;case 536870912:a=at;break;default:a=ke}a=lg(a,Jm.bind(null,n))}n.callbackPriority=r,n.callbackNode=a}}function Jm(n,r){if(bl=-1,Al=0,(bt&6)!==0)throw Error(t(327));var a=n.callbackNode;if(Hs()&&n.callbackNode!==a)return null;var c=ri(n,n===dn?mn:0);if(c===0)return null;if((c&30)!==0||(c&n.expiredLanes)!==0||r)r=Cl(n,c);else{r=c;var p=bt;bt|=2;var v=ng();(dn!==n||mn!==r)&&(Vi=null,Bs=$()+500,Zr(n,r));do try{yy();break}catch(F){tg(n,F)}while(!0);wu(),Sl.current=v,bt=p,Jt!==null?r=0:(dn=null,mn=0,r=rn)}if(r!==0){if(r===2&&(p=kt(n),p!==0&&(c=p,r=ad(n,p))),r===1)throw a=Qo,Zr(n,0),Sr(n,c),In(n,$()),a;if(r===6)Sr(n,c);else{if(p=n.current.alternate,(c&30)===0&&!_y(p)&&(r=Cl(n,c),r===2&&(v=kt(n),v!==0&&(c=v,r=ad(n,v))),r===1))throw a=Qo,Zr(n,0),Sr(n,c),In(n,$()),a;switch(n.finishedWork=p,n.finishedLanes=c,r){case 0:case 1:throw Error(t(345));case 2:Qr(n,Dn,Vi);break;case 3:if(Sr(n,c),(c&130023424)===c&&(r=rd+500-$(),10<r)){if(ri(n,0)!==0)break;if(p=n.suspendedLanes,(p&c)!==c){Cn(),n.pingedLanes|=n.suspendedLanes&p;break}n.timeoutHandle=hu(Qr.bind(null,n,Dn,Vi),r);break}Qr(n,Dn,Vi);break;case 4:if(Sr(n,c),(c&4194240)===c)break;for(r=n.eventTimes,p=-1;0<c;){var w=31-wt(c);v=1<<w,w=r[w],w>p&&(p=w),c&=~v}if(c=p,c=$()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*vy(c/1960))-c,10<c){n.timeoutHandle=hu(Qr.bind(null,n,Dn,Vi),c);break}Qr(n,Dn,Vi);break;case 5:Qr(n,Dn,Vi);break;default:throw Error(t(329))}}}return In(n,$()),n.callbackNode===a?Jm.bind(null,n):null}function ad(n,r){var a=Jo;return n.current.memoizedState.isDehydrated&&(Zr(n,r).flags|=256),n=Cl(n,r),n!==2&&(r=Dn,Dn=a,r!==null&&ld(r)),n}function ld(n){Dn===null?Dn=n:Dn.push.apply(Dn,n)}function _y(n){for(var r=n;;){if(r.flags&16384){var a=r.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var c=0;c<a.length;c++){var p=a[c],v=p.getSnapshot;p=p.value;try{if(!si(v(),p))return!1}catch{return!1}}}if(a=r.child,r.subtreeFlags&16384&&a!==null)a.return=r,r=a;else{if(r===n)break;for(;r.sibling===null;){if(r.return===null||r.return===n)return!0;r=r.return}r.sibling.return=r.return,r=r.sibling}}return!0}function Sr(n,r){for(r&=~id,r&=~El,n.suspendedLanes|=r,n.pingedLanes&=~r,n=n.expirationTimes;0<r;){var a=31-wt(r),c=1<<a;n[a]=-1,r&=~c}}function eg(n){if((bt&6)!==0)throw Error(t(327));Hs();var r=ri(n,0);if((r&1)===0)return In(n,$()),null;var a=Cl(n,r);if(n.tag!==0&&a===2){var c=kt(n);c!==0&&(r=c,a=ad(n,c))}if(a===1)throw a=Qo,Zr(n,0),Sr(n,r),In(n,$()),a;if(a===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=r,Qr(n,Dn,Vi),In(n,$()),null}function cd(n,r){var a=bt;bt|=1;try{return n(r)}finally{bt=a,bt===0&&(Bs=$()+500,tl&&pr())}}function Kr(n){xr!==null&&xr.tag===0&&(bt&6)===0&&Hs();var r=bt;bt|=1;var a=Jn.transition,c=yt;try{if(Jn.transition=null,yt=1,n)return n()}finally{yt=c,Jn.transition=a,bt=r,(bt&6)===0&&pr()}}function ud(){Wn=zs.current,Gt(zs)}function Zr(n,r){n.finishedWork=null,n.finishedLanes=0;var a=n.timeoutHandle;if(a!==-1&&(n.timeoutHandle=-1,Yx(a)),Jt!==null)for(a=Jt.return;a!==null;){var c=a;switch(xu(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&Ja();break;case 3:Fs(),Gt(Pn),Gt(xn),Nu();break;case 5:Pu(c);break;case 4:Fs();break;case 13:Gt(Xt);break;case 19:Gt(Xt);break;case 10:Tu(c.type._context);break;case 22:case 23:ud()}a=a.return}if(dn=n,Jt=n=Er(n.current,null),mn=Wn=r,rn=0,Qo=null,id=El=qr=0,Dn=Jo=null,Xr!==null){for(r=0;r<Xr.length;r++)if(a=Xr[r],c=a.interleaved,c!==null){a.interleaved=null;var p=c.next,v=a.pending;if(v!==null){var w=v.next;v.next=p,c.next=w}a.pending=c}Xr=null}return n}function tg(n,r){do{var a=Jt;try{if(wu(),dl.current=ml,fl){for(var c=$t.memoizedState;c!==null;){var p=c.queue;p!==null&&(p.pending=null),c=c.next}fl=!1}if(Yr=0,un=nn=$t=null,Xo=!1,$o=0,nd.current=null,a===null||a.return===null){rn=1,Qo=r,Jt=null;break}e:{var v=n,w=a.return,F=a,W=r;if(r=mn,F.flags|=32768,W!==null&&typeof W=="object"&&typeof W.then=="function"){var oe=W,_e=F,xe=_e.tag;if((_e.mode&1)===0&&(xe===0||xe===11||xe===15)){var ge=_e.alternate;ge?(_e.updateQueue=ge.updateQueue,_e.memoizedState=ge.memoizedState,_e.lanes=ge.lanes):(_e.updateQueue=null,_e.memoizedState=null)}var ze=bm(w);if(ze!==null){ze.flags&=-257,Am(ze,w,F,v,r),ze.mode&1&&Tm(v,oe,r),r=ze,W=oe;var Ge=r.updateQueue;if(Ge===null){var qe=new Set;qe.add(W),r.updateQueue=qe}else Ge.add(W);break e}else{if((r&1)===0){Tm(v,oe,r),dd();break e}W=Error(t(426))}}else if(jt&&F.mode&1){var Qt=bm(w);if(Qt!==null){(Qt.flags&65536)===0&&(Qt.flags|=256),Am(Qt,w,F,v,r),Eu(Os(W,F));break e}}v=W=Os(W,F),rn!==4&&(rn=2),Jo===null?Jo=[v]:Jo.push(v),v=w;do{switch(v.tag){case 3:v.flags|=65536,r&=-r,v.lanes|=r;var K=Mm(v,W,r);Kp(v,K);break e;case 1:F=W;var X=v.type,ee=v.stateNode;if((v.flags&128)===0&&(typeof X.getDerivedStateFromError=="function"||ee!==null&&typeof ee.componentDidCatch=="function"&&(_r===null||!_r.has(ee)))){v.flags|=65536,r&=-r,v.lanes|=r;var Te=wm(v,F,r);Kp(v,Te);break e}}v=v.return}while(v!==null)}rg(a)}catch(Ze){r=Ze,Jt===a&&a!==null&&(Jt=a=a.return);continue}break}while(!0)}function ng(){var n=Sl.current;return Sl.current=ml,n===null?ml:n}function dd(){(rn===0||rn===3||rn===2)&&(rn=4),dn===null||(qr&268435455)===0&&(El&268435455)===0||Sr(dn,mn)}function Cl(n,r){var a=bt;bt|=2;var c=ng();(dn!==n||mn!==r)&&(Vi=null,Zr(n,r));do try{xy();break}catch(p){tg(n,p)}while(!0);if(wu(),bt=a,Sl.current=c,Jt!==null)throw Error(t(261));return dn=null,mn=0,rn}function xy(){for(;Jt!==null;)ig(Jt)}function yy(){for(;Jt!==null&&!le();)ig(Jt)}function ig(n){var r=ag(n.alternate,n,Wn);n.memoizedProps=n.pendingProps,r===null?rg(n):Jt=r,nd.current=null}function rg(n){var r=n;do{var a=r.alternate;if(n=r.return,(r.flags&32768)===0){if(a=fy(a,r,Wn),a!==null){Jt=a;return}}else{if(a=hy(a,r),a!==null){a.flags&=32767,Jt=a;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{rn=6,Jt=null;return}}if(r=r.sibling,r!==null){Jt=r;return}Jt=r=n}while(r!==null);rn===0&&(rn=5)}function Qr(n,r,a){var c=yt,p=Jn.transition;try{Jn.transition=null,yt=1,Sy(n,r,a,c)}finally{Jn.transition=p,yt=c}return null}function Sy(n,r,a,c){do Hs();while(xr!==null);if((bt&6)!==0)throw Error(t(327));a=n.finishedWork;var p=n.finishedLanes;if(a===null)return null;if(n.finishedWork=null,n.finishedLanes=0,a===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var v=a.lanes|a.childLanes;if(_n(n,v),n===dn&&(Jt=dn=null,mn=0),(a.subtreeFlags&2064)===0&&(a.flags&2064)===0||wl||(wl=!0,lg(ke,function(){return Hs(),null})),v=(a.flags&15990)!==0,(a.subtreeFlags&15990)!==0||v){v=Jn.transition,Jn.transition=null;var w=yt;yt=1;var F=bt;bt|=4,nd.current=null,my(n,a),Ym(a,n),Hx(du),za=!!uu,du=uu=null,n.current=a,gy(a),ce(),bt=F,yt=w,Jn.transition=v}else n.current=a;if(wl&&(wl=!1,xr=n,Tl=p),v=n.pendingLanes,v===0&&(_r=null),Rt(a.stateNode),In(n,$()),r!==null)for(c=n.onRecoverableError,a=0;a<r.length;a++)p=r[a],c(p.value,{componentStack:p.stack,digest:p.digest});if(Ml)throw Ml=!1,n=sd,sd=null,n;return(Tl&1)!==0&&n.tag!==0&&Hs(),v=n.pendingLanes,(v&1)!==0?n===od?ea++:(ea=0,od=n):ea=0,pr(),null}function Hs(){if(xr!==null){var n=Xh(Tl),r=Jn.transition,a=yt;try{if(Jn.transition=null,yt=16>n?16:n,xr===null)var c=!1;else{if(n=xr,xr=null,Tl=0,(bt&6)!==0)throw Error(t(331));var p=bt;for(bt|=4,Be=n.current;Be!==null;){var v=Be,w=v.child;if((Be.flags&16)!==0){var F=v.deletions;if(F!==null){for(var W=0;W<F.length;W++){var oe=F[W];for(Be=oe;Be!==null;){var _e=Be;switch(_e.tag){case 0:case 11:case 15:Zo(8,_e,v)}var xe=_e.child;if(xe!==null)xe.return=_e,Be=xe;else for(;Be!==null;){_e=Be;var ge=_e.sibling,ze=_e.return;if(Gm(_e),_e===oe){Be=null;break}if(ge!==null){ge.return=ze,Be=ge;break}Be=ze}}}var Ge=v.alternate;if(Ge!==null){var qe=Ge.child;if(qe!==null){Ge.child=null;do{var Qt=qe.sibling;qe.sibling=null,qe=Qt}while(qe!==null)}}Be=v}}if((v.subtreeFlags&2064)!==0&&w!==null)w.return=v,Be=w;else e:for(;Be!==null;){if(v=Be,(v.flags&2048)!==0)switch(v.tag){case 0:case 11:case 15:Zo(9,v,v.return)}var K=v.sibling;if(K!==null){K.return=v.return,Be=K;break e}Be=v.return}}var X=n.current;for(Be=X;Be!==null;){w=Be;var ee=w.child;if((w.subtreeFlags&2064)!==0&&ee!==null)ee.return=w,Be=ee;else e:for(w=X;Be!==null;){if(F=Be,(F.flags&2048)!==0)try{switch(F.tag){case 0:case 11:case 15:yl(9,F)}}catch(Ze){Kt(F,F.return,Ze)}if(F===w){Be=null;break e}var Te=F.sibling;if(Te!==null){Te.return=F.return,Be=Te;break e}Be=F.return}}if(bt=p,pr(),lt&&typeof lt.onPostCommitFiberRoot=="function")try{lt.onPostCommitFiberRoot(et,n)}catch{}c=!0}return c}finally{yt=a,Jn.transition=r}}return!1}function sg(n,r,a){r=Os(a,r),r=Mm(n,r,1),n=gr(n,r,1),r=Cn(),n!==null&&(Zt(n,1,r),In(n,r))}function Kt(n,r,a){if(n.tag===3)sg(n,n,a);else for(;r!==null;){if(r.tag===3){sg(r,n,a);break}else if(r.tag===1){var c=r.stateNode;if(typeof r.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(_r===null||!_r.has(c))){n=Os(a,n),n=wm(r,n,1),r=gr(r,n,1),n=Cn(),r!==null&&(Zt(r,1,n),In(r,n));break}}r=r.return}}function Ey(n,r,a){var c=n.pingCache;c!==null&&c.delete(r),r=Cn(),n.pingedLanes|=n.suspendedLanes&a,dn===n&&(mn&a)===a&&(rn===4||rn===3&&(mn&130023424)===mn&&500>$()-rd?Zr(n,0):id|=a),In(n,r)}function og(n,r){r===0&&((n.mode&1)===0?r=1:(r=xt,xt<<=1,(xt&130023424)===0&&(xt=4194304)));var a=Cn();n=zi(n,r),n!==null&&(Zt(n,r,a),In(n,a))}function My(n){var r=n.memoizedState,a=0;r!==null&&(a=r.retryLane),og(n,a)}function wy(n,r){var a=0;switch(n.tag){case 13:var c=n.stateNode,p=n.memoizedState;p!==null&&(a=p.retryLane);break;case 19:c=n.stateNode;break;default:throw Error(t(314))}c!==null&&c.delete(r),og(n,a)}var ag;ag=function(n,r,a){if(n!==null)if(n.memoizedProps!==r.pendingProps||Pn.current)Nn=!0;else{if((n.lanes&a)===0&&(r.flags&128)===0)return Nn=!1,dy(n,r,a);Nn=(n.flags&131072)!==0}else Nn=!1,jt&&(r.flags&1048576)!==0&&Bp(r,il,r.index);switch(r.lanes=0,r.tag){case 2:var c=r.type;_l(n,r),n=r.pendingProps;var p=Rs(r,xn.current);Us(r,a),p=Uu(null,r,c,n,p,a);var v=Fu();return r.flags|=1,typeof p=="object"&&p!==null&&typeof p.render=="function"&&p.$$typeof===void 0?(r.tag=1,r.memoizedState=null,r.updateQueue=null,Ln(c)?(v=!0,el(r)):v=!1,r.memoizedState=p.state!==null&&p.state!==void 0?p.state:null,Cu(r),p.updater=gl,r.stateNode=p,p._reactInternals=r,Vu(r,c,n,a),r=Xu(null,r,c,!0,v,a)):(r.tag=0,jt&&v&&_u(r),An(null,r,p,a),r=r.child),r;case 16:c=r.elementType;e:{switch(_l(n,r),n=r.pendingProps,p=c._init,c=p(c._payload),r.type=c,p=r.tag=by(c),n=ai(c,n),p){case 0:r=ju(null,r,c,n,a);break e;case 1:r=Dm(null,r,c,n,a);break e;case 11:r=Cm(null,r,c,n,a);break e;case 14:r=Rm(null,r,c,ai(c.type,n),a);break e}throw Error(t(306,c,""))}return r;case 0:return c=r.type,p=r.pendingProps,p=r.elementType===c?p:ai(c,p),ju(n,r,c,p,a);case 1:return c=r.type,p=r.pendingProps,p=r.elementType===c?p:ai(c,p),Dm(n,r,c,p,a);case 3:e:{if(Im(r),n===null)throw Error(t(387));c=r.pendingProps,v=r.memoizedState,p=v.element,qp(n,r),cl(r,c,null,a);var w=r.memoizedState;if(c=w.element,v.isDehydrated)if(v={element:c,isDehydrated:!1,cache:w.cache,pendingSuspenseBoundaries:w.pendingSuspenseBoundaries,transitions:w.transitions},r.updateQueue.baseState=v,r.memoizedState=v,r.flags&256){p=Os(Error(t(423)),r),r=Um(n,r,c,a,p);break e}else if(c!==p){p=Os(Error(t(424)),r),r=Um(n,r,c,a,p);break e}else for(Gn=dr(r.stateNode.containerInfo.firstChild),Vn=r,jt=!0,oi=null,a=$p(r,null,c,a),r.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Ns(),c===p){r=Hi(n,r,a);break e}An(n,r,c,a)}r=r.child}return r;case 5:return Qp(r),n===null&&Su(r),c=r.type,p=r.pendingProps,v=n!==null?n.memoizedProps:null,w=p.children,fu(c,p)?w=null:v!==null&&fu(c,v)&&(r.flags|=32),Nm(n,r),An(n,r,w,a),r.child;case 6:return n===null&&Su(r),null;case 13:return Fm(n,r,a);case 4:return Ru(r,r.stateNode.containerInfo),c=r.pendingProps,n===null?r.child=Ds(r,null,c,a):An(n,r,c,a),r.child;case 11:return c=r.type,p=r.pendingProps,p=r.elementType===c?p:ai(c,p),Cm(n,r,c,p,a);case 7:return An(n,r,r.pendingProps,a),r.child;case 8:return An(n,r,r.pendingProps.children,a),r.child;case 12:return An(n,r,r.pendingProps.children,a),r.child;case 10:e:{if(c=r.type._context,p=r.pendingProps,v=r.memoizedProps,w=p.value,zt(ol,c._currentValue),c._currentValue=w,v!==null)if(si(v.value,w)){if(v.children===p.children&&!Pn.current){r=Hi(n,r,a);break e}}else for(v=r.child,v!==null&&(v.return=r);v!==null;){var F=v.dependencies;if(F!==null){w=v.child;for(var W=F.firstContext;W!==null;){if(W.context===c){if(v.tag===1){W=Bi(-1,a&-a),W.tag=2;var oe=v.updateQueue;if(oe!==null){oe=oe.shared;var _e=oe.pending;_e===null?W.next=W:(W.next=_e.next,_e.next=W),oe.pending=W}}v.lanes|=a,W=v.alternate,W!==null&&(W.lanes|=a),bu(v.return,a,r),F.lanes|=a;break}W=W.next}}else if(v.tag===10)w=v.type===r.type?null:v.child;else if(v.tag===18){if(w=v.return,w===null)throw Error(t(341));w.lanes|=a,F=w.alternate,F!==null&&(F.lanes|=a),bu(w,a,r),w=v.sibling}else w=v.child;if(w!==null)w.return=v;else for(w=v;w!==null;){if(w===r){w=null;break}if(v=w.sibling,v!==null){v.return=w.return,w=v;break}w=w.return}v=w}An(n,r,p.children,a),r=r.child}return r;case 9:return p=r.type,c=r.pendingProps.children,Us(r,a),p=Zn(p),c=c(p),r.flags|=1,An(n,r,c,a),r.child;case 14:return c=r.type,p=ai(c,r.pendingProps),p=ai(c.type,p),Rm(n,r,c,p,a);case 15:return Pm(n,r,r.type,r.pendingProps,a);case 17:return c=r.type,p=r.pendingProps,p=r.elementType===c?p:ai(c,p),_l(n,r),r.tag=1,Ln(c)?(n=!0,el(r)):n=!1,Us(r,a),Sm(r,c,p),Vu(r,c,p,a),Xu(null,r,c,!0,n,a);case 19:return km(n,r,a);case 22:return Lm(n,r,a)}throw Error(t(156,r.tag))};function lg(n,r){return A(n,r)}function Ty(n,r,a,c){this.tag=n,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=r,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ei(n,r,a,c){return new Ty(n,r,a,c)}function fd(n){return n=n.prototype,!(!n||!n.isReactComponent)}function by(n){if(typeof n=="function")return fd(n)?1:0;if(n!=null){if(n=n.$$typeof,n===q)return 11;if(n===re)return 14}return 2}function Er(n,r){var a=n.alternate;return a===null?(a=ei(n.tag,r,n.key,n.mode),a.elementType=n.elementType,a.type=n.type,a.stateNode=n.stateNode,a.alternate=n,n.alternate=a):(a.pendingProps=r,a.type=n.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=n.flags&14680064,a.childLanes=n.childLanes,a.lanes=n.lanes,a.child=n.child,a.memoizedProps=n.memoizedProps,a.memoizedState=n.memoizedState,a.updateQueue=n.updateQueue,r=n.dependencies,a.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},a.sibling=n.sibling,a.index=n.index,a.ref=n.ref,a}function Rl(n,r,a,c,p,v){var w=2;if(c=n,typeof n=="function")fd(n)&&(w=1);else if(typeof n=="string")w=5;else e:switch(n){case I:return Jr(a.children,p,v,r);case z:w=8,p|=8;break;case C:return n=ei(12,a,r,p|2),n.elementType=C,n.lanes=v,n;case ie:return n=ei(13,a,r,p),n.elementType=ie,n.lanes=v,n;case Q:return n=ei(19,a,r,p),n.elementType=Q,n.lanes=v,n;case de:return Pl(a,p,v,r);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case R:w=10;break e;case G:w=9;break e;case q:w=11;break e;case re:w=14;break e;case te:w=16,c=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return r=ei(w,a,r,p),r.elementType=n,r.type=c,r.lanes=v,r}function Jr(n,r,a,c){return n=ei(7,n,c,r),n.lanes=a,n}function Pl(n,r,a,c){return n=ei(22,n,c,r),n.elementType=de,n.lanes=a,n.stateNode={isHidden:!1},n}function hd(n,r,a){return n=ei(6,n,null,r),n.lanes=a,n}function pd(n,r,a){return r=ei(4,n.children!==null?n.children:[],n.key,r),r.lanes=a,r.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},r}function Ay(n,r,a,c,p){this.tag=r,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=vn(0),this.expirationTimes=vn(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=vn(0),this.identifierPrefix=c,this.onRecoverableError=p,this.mutableSourceEagerHydrationData=null}function md(n,r,a,c,p,v,w,F,W){return n=new Ay(n,r,a,F,W),r===1?(r=1,v===!0&&(r|=8)):r=0,v=ei(3,null,null,r),n.current=v,v.stateNode=n,v.memoizedState={element:c,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},Cu(v),n}function Cy(n,r,a){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:B,key:c==null?null:""+c,children:n,containerInfo:r,implementation:a}}function cg(n){if(!n)return hr;n=n._reactInternals;e:{if(Ii(n)!==n||n.tag!==1)throw Error(t(170));var r=n;do{switch(r.tag){case 3:r=r.stateNode.context;break e;case 1:if(Ln(r.type)){r=r.stateNode.__reactInternalMemoizedMergedChildContext;break e}}r=r.return}while(r!==null);throw Error(t(171))}if(n.tag===1){var a=n.type;if(Ln(a))return Op(n,a,r)}return r}function ug(n,r,a,c,p,v,w,F,W){return n=md(a,c,!0,n,p,v,w,F,W),n.context=cg(null),a=n.current,c=Cn(),p=yr(a),v=Bi(c,p),v.callback=r??null,gr(a,v,p),n.current.lanes=p,Zt(n,p,c),In(n,c),n}function Ll(n,r,a,c){var p=r.current,v=Cn(),w=yr(p);return a=cg(a),r.context===null?r.context=a:r.pendingContext=a,r=Bi(v,w),r.payload={element:n},c=c===void 0?null:c,c!==null&&(r.callback=c),n=gr(p,r,w),n!==null&&(ui(n,p,w,v),ll(n,p,w)),w}function Nl(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function dg(n,r){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var a=n.retryLane;n.retryLane=a!==0&&a<r?a:r}}function gd(n,r){dg(n,r),(n=n.alternate)&&dg(n,r)}function Ry(){return null}var fg=typeof reportError=="function"?reportError:function(n){console.error(n)};function vd(n){this._internalRoot=n}Dl.prototype.render=vd.prototype.render=function(n){var r=this._internalRoot;if(r===null)throw Error(t(409));Ll(n,r,null,null)},Dl.prototype.unmount=vd.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var r=n.containerInfo;Kr(function(){Ll(null,n,null,null)}),r[Ui]=null}};function Dl(n){this._internalRoot=n}Dl.prototype.unstable_scheduleHydration=function(n){if(n){var r=qh();n={blockedOn:null,target:n,priority:r};for(var a=0;a<lr.length&&r!==0&&r<lr[a].priority;a++);lr.splice(a,0,n),a===0&&Qh(n)}};function _d(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function Il(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function hg(){}function Py(n,r,a,c,p){if(p){if(typeof c=="function"){var v=c;c=function(){var oe=Nl(w);v.call(oe)}}var w=ug(r,c,n,0,null,!1,!1,"",hg);return n._reactRootContainer=w,n[Ui]=w.current,ko(n.nodeType===8?n.parentNode:n),Kr(),w}for(;p=n.lastChild;)n.removeChild(p);if(typeof c=="function"){var F=c;c=function(){var oe=Nl(W);F.call(oe)}}var W=md(n,0,!1,null,null,!1,!1,"",hg);return n._reactRootContainer=W,n[Ui]=W.current,ko(n.nodeType===8?n.parentNode:n),Kr(function(){Ll(r,W,a,c)}),W}function Ul(n,r,a,c,p){var v=a._reactRootContainer;if(v){var w=v;if(typeof p=="function"){var F=p;p=function(){var W=Nl(w);F.call(W)}}Ll(r,w,n,p)}else w=Py(a,r,n,p,c);return Nl(w)}$h=function(n){switch(n.tag){case 3:var r=n.stateNode;if(r.current.memoizedState.isDehydrated){var a=tn(r.pendingLanes);a!==0&&(Hr(r,a|1),In(r,$()),(bt&6)===0&&(Bs=$()+500,pr()))}break;case 13:Kr(function(){var c=zi(n,1);if(c!==null){var p=Cn();ui(c,n,1,p)}}),gd(n,1)}},Gc=function(n){if(n.tag===13){var r=zi(n,134217728);if(r!==null){var a=Cn();ui(r,n,134217728,a)}gd(n,134217728)}},Yh=function(n){if(n.tag===13){var r=yr(n),a=zi(n,r);if(a!==null){var c=Cn();ui(a,n,r,c)}gd(n,r)}},qh=function(){return yt},Kh=function(n,r){var a=yt;try{return yt=n,r()}finally{yt=a}},Ee=function(n,r,a){switch(r){case"input":if(Xe(n,a),r=a.name,a.type==="radio"&&r!=null){for(a=n;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+r)+'][type="radio"]'),r=0;r<a.length;r++){var c=a[r];if(c!==n&&c.form===n.form){var p=Qa(c);if(!p)throw Error(t(90));Wt(c),Xe(c,p)}}}break;case"textarea":T(n,a);break;case"select":r=a.value,r!=null&&Bt(n,!!a.multiple,r,!1)}},dt=cd,Pt=Kr;var Ly={usingClientEntryPoint:!1,Events:[Ho,As,Qa,me,Ye,cd]},ta={findFiberByHostInstance:Vr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Ny={bundleType:ta.bundleType,version:ta.version,rendererPackageName:ta.rendererPackageName,rendererConfig:ta.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:b.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=Ua(n),n===null?null:n.stateNode},findFiberByHostInstance:ta.findFiberByHostInstance||Ry,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Fl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Fl.isDisabled&&Fl.supportsFiber)try{et=Fl.inject(Ny),lt=Fl}catch{}}return Un.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ly,Un.createPortal=function(n,r){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!_d(r))throw Error(t(200));return Cy(n,r,null,a)},Un.createRoot=function(n,r){if(!_d(n))throw Error(t(299));var a=!1,c="",p=fg;return r!=null&&(r.unstable_strictMode===!0&&(a=!0),r.identifierPrefix!==void 0&&(c=r.identifierPrefix),r.onRecoverableError!==void 0&&(p=r.onRecoverableError)),r=md(n,1,!1,null,null,a,!1,c,p),n[Ui]=r.current,ko(n.nodeType===8?n.parentNode:n),new vd(r)},Un.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var r=n._reactInternals;if(r===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=Ua(r),n=n===null?null:n.stateNode,n},Un.flushSync=function(n){return Kr(n)},Un.hydrate=function(n,r,a){if(!Il(r))throw Error(t(200));return Ul(null,n,r,!0,a)},Un.hydrateRoot=function(n,r,a){if(!_d(n))throw Error(t(405));var c=a!=null&&a.hydratedSources||null,p=!1,v="",w=fg;if(a!=null&&(a.unstable_strictMode===!0&&(p=!0),a.identifierPrefix!==void 0&&(v=a.identifierPrefix),a.onRecoverableError!==void 0&&(w=a.onRecoverableError)),r=ug(r,null,n,1,a??null,p,!1,v,w),n[Ui]=r.current,ko(n),c)for(n=0;n<c.length;n++)a=c[n],p=a._getVersion,p=p(a._source),r.mutableSourceEagerHydrationData==null?r.mutableSourceEagerHydrationData=[a,p]:r.mutableSourceEagerHydrationData.push(a,p);return new Dl(r)},Un.render=function(n,r,a){if(!Il(r))throw Error(t(200));return Ul(null,n,r,!1,a)},Un.unmountComponentAtNode=function(n){if(!Il(n))throw Error(t(40));return n._reactRootContainer?(Kr(function(){Ul(null,null,n,!1,function(){n._reactRootContainer=null,n[Ui]=null})}),!0):!1},Un.unstable_batchedUpdates=cd,Un.unstable_renderSubtreeIntoContainer=function(n,r,a,c){if(!Il(a))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return Ul(n,r,a,!1,c)},Un.version="18.3.1-next-f1338f8080-20240426",Un}var Sg;function Zv(){if(Sg)return Sd.exports;Sg=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(e){console.error(e)}}return i(),Sd.exports=Hy(),Sd.exports}var Eg;function Vy(){if(Eg)return Ol;Eg=1;var i=Zv();return Ol.createRoot=i.createRoot,Ol.hydrateRoot=i.hydrateRoot,Ol}var Gy=Vy();const Wy=xh(Gy);function jy({children:i}){return O.jsx("div",{children:i})}const Xy={async list(i="-created_date",e=20){const t=[{id:"1",name:"Dream Bear",description:"A soft collectible plush from the Dreamland series.",price:49.99,image:"/placeholders/dreambear.png",created_at:"2025-09-15"},{id:"2",name:"Cosmic Bunny",description:"A glowing bunny that brings dream energy.",price:59.99,image:"/placeholders/cosmicbunny.png",created_at:"2025-09-20"},{id:"3",name:"Star Whale",description:"Collector’s edition plush inspired by cosmic dreams.",price:69.99,image:"/placeholders/starwhale.png",created_at:"2025-09-25"}];return(i!=null&&i.startsWith("-")?[...t].sort((o,l)=>o.created_at<l.created_at?1:-1):t).slice(0,e)}};function Mg(i,e){if(typeof i=="function")return i(e);i!=null&&(i.current=e)}function Qv(...i){return e=>{let t=!1;const s=i.map(o=>{const l=Mg(o,e);return!t&&typeof l=="function"&&(t=!0),l});if(t)return()=>{for(let o=0;o<s.length;o++){const l=s[o];typeof l=="function"?l():Mg(i[o],null)}}}}function gs(...i){return L.useCallback(Qv(...i),i)}function Sh(i){const e=Yy(i),t=L.forwardRef((s,o)=>{const{children:l,...u}=s,d=L.Children.toArray(l),h=d.find(Ky);if(h){const f=h.props.children,m=d.map(g=>g===h?L.Children.count(f)>1?L.Children.only(null):L.isValidElement(f)?f.props.children:null:g);return O.jsx(e,{...u,ref:o,children:L.isValidElement(f)?L.cloneElement(f,void 0,m):null})}return O.jsx(e,{...u,ref:o,children:l})});return t.displayName=`${i}.Slot`,t}var $y=Sh("Slot");function Yy(i){const e=L.forwardRef((t,s)=>{const{children:o,...l}=t;if(L.isValidElement(o)){const u=Qy(o),d=Zy(l,o.props);return o.type!==L.Fragment&&(d.ref=s?Qv(s,u):u),L.cloneElement(o,d)}return L.Children.count(o)>1?L.Children.only(null):null});return e.displayName=`${i}.SlotClone`,e}var qy=Symbol("radix.slottable");function Ky(i){return L.isValidElement(i)&&typeof i.type=="function"&&"__radixId"in i.type&&i.type.__radixId===qy}function Zy(i,e){const t={...e};for(const s in e){const o=i[s],l=e[s];/^on[A-Z]/.test(s)?o&&l?t[s]=(...d)=>{const h=l(...d);return o(...d),h}:o&&(t[s]=o):s==="style"?t[s]={...o,...l}:s==="className"&&(t[s]=[o,l].filter(Boolean).join(" "))}return{...i,...t}}function Qy(i){var s,o;let e=(s=Object.getOwnPropertyDescriptor(i.props,"ref"))==null?void 0:s.get,t=e&&"isReactWarning"in e&&e.isReactWarning;return t?i.ref:(e=(o=Object.getOwnPropertyDescriptor(i,"ref"))==null?void 0:o.get,t=e&&"isReactWarning"in e&&e.isReactWarning,t?i.props.ref:i.props.ref||i.ref)}function Jv(i){var e,t,s="";if(typeof i=="string"||typeof i=="number")s+=i;else if(typeof i=="object")if(Array.isArray(i)){var o=i.length;for(e=0;e<o;e++)i[e]&&(t=Jv(i[e]))&&(s&&(s+=" "),s+=t)}else for(t in i)i[t]&&(s&&(s+=" "),s+=t);return s}function e0(){for(var i,e,t=0,s="",o=arguments.length;t<o;t++)(i=arguments[t])&&(e=Jv(i))&&(s&&(s+=" "),s+=e);return s}const wg=i=>typeof i=="boolean"?`${i}`:i===0?"0":i,Tg=e0,Eh=(i,e)=>t=>{var s;if((e==null?void 0:e.variants)==null)return Tg(i,t==null?void 0:t.class,t==null?void 0:t.className);const{variants:o,defaultVariants:l}=e,u=Object.keys(o).map(f=>{const m=t==null?void 0:t[f],g=l==null?void 0:l[f];if(m===null)return null;const x=wg(m)||wg(g);return o[f][x]}),d=t&&Object.entries(t).reduce((f,m)=>{let[g,x]=m;return x===void 0||(f[g]=x),f},{}),h=e==null||(s=e.compoundVariants)===null||s===void 0?void 0:s.reduce((f,m)=>{let{class:g,className:x,...S}=m;return Object.entries(S).every(M=>{let[E,y]=M;return Array.isArray(y)?y.includes({...l,...d}[E]):{...l,...d}[E]===y})?[...f,g,x]:f},[]);return Tg(i,u,h,t==null?void 0:t.class,t==null?void 0:t.className)},Mh="-",Jy=i=>{const e=tS(i),{conflictingClassGroups:t,conflictingClassGroupModifiers:s}=i;return{getClassGroupId:u=>{const d=u.split(Mh);return d[0]===""&&d.length!==1&&d.shift(),t0(d,e)||eS(u)},getConflictingClassGroupIds:(u,d)=>{const h=t[u]||[];return d&&s[u]?[...h,...s[u]]:h}}},t0=(i,e)=>{var u;if(i.length===0)return e.classGroupId;const t=i[0],s=e.nextPart.get(t),o=s?t0(i.slice(1),s):void 0;if(o)return o;if(e.validators.length===0)return;const l=i.join(Mh);return(u=e.validators.find(({validator:d})=>d(l)))==null?void 0:u.classGroupId},bg=/^\[(.+)\]$/,eS=i=>{if(bg.test(i)){const e=bg.exec(i)[1],t=e==null?void 0:e.substring(0,e.indexOf(":"));if(t)return"arbitrary.."+t}},tS=i=>{const{theme:e,classGroups:t}=i,s={nextPart:new Map,validators:[]};for(const o in t)xf(t[o],s,o,e);return s},xf=(i,e,t,s)=>{i.forEach(o=>{if(typeof o=="string"){const l=o===""?e:Ag(e,o);l.classGroupId=t;return}if(typeof o=="function"){if(nS(o)){xf(o(s),e,t,s);return}e.validators.push({validator:o,classGroupId:t});return}Object.entries(o).forEach(([l,u])=>{xf(u,Ag(e,l),t,s)})})},Ag=(i,e)=>{let t=i;return e.split(Mh).forEach(s=>{t.nextPart.has(s)||t.nextPart.set(s,{nextPart:new Map,validators:[]}),t=t.nextPart.get(s)}),t},nS=i=>i.isThemeGetter,iS=i=>{if(i<1)return{get:()=>{},set:()=>{}};let e=0,t=new Map,s=new Map;const o=(l,u)=>{t.set(l,u),e++,e>i&&(e=0,s=t,t=new Map)};return{get(l){let u=t.get(l);if(u!==void 0)return u;if((u=s.get(l))!==void 0)return o(l,u),u},set(l,u){t.has(l)?t.set(l,u):o(l,u)}}},yf="!",Sf=":",rS=Sf.length,sS=i=>{const{prefix:e,experimentalParseClassName:t}=i;let s=o=>{const l=[];let u=0,d=0,h=0,f;for(let M=0;M<o.length;M++){let E=o[M];if(u===0&&d===0){if(E===Sf){l.push(o.slice(h,M)),h=M+rS;continue}if(E==="/"){f=M;continue}}E==="["?u++:E==="]"?u--:E==="("?d++:E===")"&&d--}const m=l.length===0?o:o.substring(h),g=oS(m),x=g!==m,S=f&&f>h?f-h:void 0;return{modifiers:l,hasImportantModifier:x,baseClassName:g,maybePostfixModifierPosition:S}};if(e){const o=e+Sf,l=s;s=u=>u.startsWith(o)?l(u.substring(o.length)):{isExternal:!0,modifiers:[],hasImportantModifier:!1,baseClassName:u,maybePostfixModifierPosition:void 0}}if(t){const o=s;s=l=>t({className:l,parseClassName:o})}return s},oS=i=>i.endsWith(yf)?i.substring(0,i.length-1):i.startsWith(yf)?i.substring(1):i,aS=i=>{const e=Object.fromEntries(i.orderSensitiveModifiers.map(s=>[s,!0]));return s=>{if(s.length<=1)return s;const o=[];let l=[];return s.forEach(u=>{u[0]==="["||e[u]?(o.push(...l.sort(),u),l=[]):l.push(u)}),o.push(...l.sort()),o}},lS=i=>({cache:iS(i.cacheSize),parseClassName:sS(i),sortModifiers:aS(i),...Jy(i)}),cS=/\s+/,uS=(i,e)=>{const{parseClassName:t,getClassGroupId:s,getConflictingClassGroupIds:o,sortModifiers:l}=e,u=[],d=i.trim().split(cS);let h="";for(let f=d.length-1;f>=0;f-=1){const m=d[f],{isExternal:g,modifiers:x,hasImportantModifier:S,baseClassName:M,maybePostfixModifierPosition:E}=t(m);if(g){h=m+(h.length>0?" "+h:h);continue}let y=!!E,_=s(y?M.substring(0,E):M);if(!_){if(!y){h=m+(h.length>0?" "+h:h);continue}if(_=s(M),!_){h=m+(h.length>0?" "+h:h);continue}y=!1}const N=l(x).join(":"),P=S?N+yf:N,b=P+_;if(u.includes(b))continue;u.push(b);const k=o(_,y);for(let B=0;B<k.length;++B){const I=k[B];u.push(P+I)}h=m+(h.length>0?" "+h:h)}return h};function dS(){let i=0,e,t,s="";for(;i<arguments.length;)(e=arguments[i++])&&(t=n0(e))&&(s&&(s+=" "),s+=t);return s}const n0=i=>{if(typeof i=="string")return i;let e,t="";for(let s=0;s<i.length;s++)i[s]&&(e=n0(i[s]))&&(t&&(t+=" "),t+=e);return t};function fS(i,...e){let t,s,o,l=u;function u(h){const f=e.reduce((m,g)=>g(m),i());return t=lS(f),s=t.cache.get,o=t.cache.set,l=d,d(h)}function d(h){const f=s(h);if(f)return f;const m=uS(h,t);return o(h,m),m}return function(){return l(dS.apply(null,arguments))}}const sn=i=>{const e=t=>t[i]||[];return e.isThemeGetter=!0,e},i0=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,r0=/^\((?:(\w[\w-]*):)?(.+)\)$/i,hS=/^\d+\/\d+$/,pS=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,mS=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,gS=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,vS=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,_S=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,Vs=i=>hS.test(i),vt=i=>!!i&&!Number.isNaN(Number(i)),wr=i=>!!i&&Number.isInteger(Number(i)),wd=i=>i.endsWith("%")&&vt(i.slice(0,-1)),Gi=i=>pS.test(i),xS=()=>!0,yS=i=>mS.test(i)&&!gS.test(i),s0=()=>!1,SS=i=>vS.test(i),ES=i=>_S.test(i),MS=i=>!We(i)&&!je(i),wS=i=>go(i,l0,s0),We=i=>i0.test(i),es=i=>go(i,c0,yS),Td=i=>go(i,RS,vt),Cg=i=>go(i,o0,s0),TS=i=>go(i,a0,ES),kl=i=>go(i,u0,SS),je=i=>r0.test(i),ia=i=>vo(i,c0),bS=i=>vo(i,PS),Rg=i=>vo(i,o0),AS=i=>vo(i,l0),CS=i=>vo(i,a0),zl=i=>vo(i,u0,!0),go=(i,e,t)=>{const s=i0.exec(i);return s?s[1]?e(s[1]):t(s[2]):!1},vo=(i,e,t=!1)=>{const s=r0.exec(i);return s?s[1]?e(s[1]):t:!1},o0=i=>i==="position"||i==="percentage",a0=i=>i==="image"||i==="url",l0=i=>i==="length"||i==="size"||i==="bg-size",c0=i=>i==="length",RS=i=>i==="number",PS=i=>i==="family-name",u0=i=>i==="shadow",LS=()=>{const i=sn("color"),e=sn("font"),t=sn("text"),s=sn("font-weight"),o=sn("tracking"),l=sn("leading"),u=sn("breakpoint"),d=sn("container"),h=sn("spacing"),f=sn("radius"),m=sn("shadow"),g=sn("inset-shadow"),x=sn("text-shadow"),S=sn("drop-shadow"),M=sn("blur"),E=sn("perspective"),y=sn("aspect"),_=sn("ease"),N=sn("animate"),P=()=>["auto","avoid","all","avoid-page","page","left","right","column"],b=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],k=()=>[...b(),je,We],B=()=>["auto","hidden","clip","visible","scroll"],I=()=>["auto","contain","none"],z=()=>[je,We,h],C=()=>[Vs,"full","auto",...z()],R=()=>[wr,"none","subgrid",je,We],G=()=>["auto",{span:["full",wr,je,We]},wr,je,We],q=()=>[wr,"auto",je,We],ie=()=>["auto","min","max","fr",je,We],Q=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],re=()=>["start","end","center","stretch","center-safe","end-safe"],te=()=>["auto",...z()],de=()=>[Vs,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...z()],U=()=>[i,je,We],fe=()=>[...b(),Rg,Cg,{position:[je,We]}],ue=()=>["no-repeat",{repeat:["","x","y","space","round"]}],H=()=>["auto","cover","contain",AS,wS,{size:[je,We]}],ae=()=>[wd,ia,es],Ae=()=>["","none","full",f,je,We],Re=()=>["",vt,ia,es],Fe=()=>["solid","dashed","dotted","double"],ne=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],se=()=>[vt,wd,Rg,Cg],ye=()=>["","none",M,je,We],Ne=()=>["none",vt,je,We],Ie=()=>["none",vt,je,We],pt=()=>[vt,je,We],Wt=()=>[Vs,"full",...z()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[Gi],breakpoint:[Gi],color:[xS],container:[Gi],"drop-shadow":[Gi],ease:["in","out","in-out"],font:[MS],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[Gi],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[Gi],shadow:[Gi],spacing:["px",vt],text:[Gi],"text-shadow":[Gi],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",Vs,We,je,y]}],container:["container"],columns:[{columns:[vt,We,je,d]}],"break-after":[{"break-after":P()}],"break-before":[{"break-before":P()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:k()}],overflow:[{overflow:B()}],"overflow-x":[{"overflow-x":B()}],"overflow-y":[{"overflow-y":B()}],overscroll:[{overscroll:I()}],"overscroll-x":[{"overscroll-x":I()}],"overscroll-y":[{"overscroll-y":I()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:C()}],"inset-x":[{"inset-x":C()}],"inset-y":[{"inset-y":C()}],start:[{start:C()}],end:[{end:C()}],top:[{top:C()}],right:[{right:C()}],bottom:[{bottom:C()}],left:[{left:C()}],visibility:["visible","invisible","collapse"],z:[{z:[wr,"auto",je,We]}],basis:[{basis:[Vs,"full","auto",d,...z()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[vt,Vs,"auto","initial","none",We]}],grow:[{grow:["",vt,je,We]}],shrink:[{shrink:["",vt,je,We]}],order:[{order:[wr,"first","last","none",je,We]}],"grid-cols":[{"grid-cols":R()}],"col-start-end":[{col:G()}],"col-start":[{"col-start":q()}],"col-end":[{"col-end":q()}],"grid-rows":[{"grid-rows":R()}],"row-start-end":[{row:G()}],"row-start":[{"row-start":q()}],"row-end":[{"row-end":q()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":ie()}],"auto-rows":[{"auto-rows":ie()}],gap:[{gap:z()}],"gap-x":[{"gap-x":z()}],"gap-y":[{"gap-y":z()}],"justify-content":[{justify:[...Q(),"normal"]}],"justify-items":[{"justify-items":[...re(),"normal"]}],"justify-self":[{"justify-self":["auto",...re()]}],"align-content":[{content:["normal",...Q()]}],"align-items":[{items:[...re(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...re(),{baseline:["","last"]}]}],"place-content":[{"place-content":Q()}],"place-items":[{"place-items":[...re(),"baseline"]}],"place-self":[{"place-self":["auto",...re()]}],p:[{p:z()}],px:[{px:z()}],py:[{py:z()}],ps:[{ps:z()}],pe:[{pe:z()}],pt:[{pt:z()}],pr:[{pr:z()}],pb:[{pb:z()}],pl:[{pl:z()}],m:[{m:te()}],mx:[{mx:te()}],my:[{my:te()}],ms:[{ms:te()}],me:[{me:te()}],mt:[{mt:te()}],mr:[{mr:te()}],mb:[{mb:te()}],ml:[{ml:te()}],"space-x":[{"space-x":z()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":z()}],"space-y-reverse":["space-y-reverse"],size:[{size:de()}],w:[{w:[d,"screen",...de()]}],"min-w":[{"min-w":[d,"screen","none",...de()]}],"max-w":[{"max-w":[d,"screen","none","prose",{screen:[u]},...de()]}],h:[{h:["screen","lh",...de()]}],"min-h":[{"min-h":["screen","lh","none",...de()]}],"max-h":[{"max-h":["screen","lh",...de()]}],"font-size":[{text:["base",t,ia,es]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[s,je,Td]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",wd,We]}],"font-family":[{font:[bS,We,e]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[o,je,We]}],"line-clamp":[{"line-clamp":[vt,"none",je,Td]}],leading:[{leading:[l,...z()]}],"list-image":[{"list-image":["none",je,We]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",je,We]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:U()}],"text-color":[{text:U()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...Fe(),"wavy"]}],"text-decoration-thickness":[{decoration:[vt,"from-font","auto",je,es]}],"text-decoration-color":[{decoration:U()}],"underline-offset":[{"underline-offset":[vt,"auto",je,We]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:z()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",je,We]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",je,We]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:fe()}],"bg-repeat":[{bg:ue()}],"bg-size":[{bg:H()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},wr,je,We],radial:["",je,We],conic:[wr,je,We]},CS,TS]}],"bg-color":[{bg:U()}],"gradient-from-pos":[{from:ae()}],"gradient-via-pos":[{via:ae()}],"gradient-to-pos":[{to:ae()}],"gradient-from":[{from:U()}],"gradient-via":[{via:U()}],"gradient-to":[{to:U()}],rounded:[{rounded:Ae()}],"rounded-s":[{"rounded-s":Ae()}],"rounded-e":[{"rounded-e":Ae()}],"rounded-t":[{"rounded-t":Ae()}],"rounded-r":[{"rounded-r":Ae()}],"rounded-b":[{"rounded-b":Ae()}],"rounded-l":[{"rounded-l":Ae()}],"rounded-ss":[{"rounded-ss":Ae()}],"rounded-se":[{"rounded-se":Ae()}],"rounded-ee":[{"rounded-ee":Ae()}],"rounded-es":[{"rounded-es":Ae()}],"rounded-tl":[{"rounded-tl":Ae()}],"rounded-tr":[{"rounded-tr":Ae()}],"rounded-br":[{"rounded-br":Ae()}],"rounded-bl":[{"rounded-bl":Ae()}],"border-w":[{border:Re()}],"border-w-x":[{"border-x":Re()}],"border-w-y":[{"border-y":Re()}],"border-w-s":[{"border-s":Re()}],"border-w-e":[{"border-e":Re()}],"border-w-t":[{"border-t":Re()}],"border-w-r":[{"border-r":Re()}],"border-w-b":[{"border-b":Re()}],"border-w-l":[{"border-l":Re()}],"divide-x":[{"divide-x":Re()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":Re()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...Fe(),"hidden","none"]}],"divide-style":[{divide:[...Fe(),"hidden","none"]}],"border-color":[{border:U()}],"border-color-x":[{"border-x":U()}],"border-color-y":[{"border-y":U()}],"border-color-s":[{"border-s":U()}],"border-color-e":[{"border-e":U()}],"border-color-t":[{"border-t":U()}],"border-color-r":[{"border-r":U()}],"border-color-b":[{"border-b":U()}],"border-color-l":[{"border-l":U()}],"divide-color":[{divide:U()}],"outline-style":[{outline:[...Fe(),"none","hidden"]}],"outline-offset":[{"outline-offset":[vt,je,We]}],"outline-w":[{outline:["",vt,ia,es]}],"outline-color":[{outline:U()}],shadow:[{shadow:["","none",m,zl,kl]}],"shadow-color":[{shadow:U()}],"inset-shadow":[{"inset-shadow":["none",g,zl,kl]}],"inset-shadow-color":[{"inset-shadow":U()}],"ring-w":[{ring:Re()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:U()}],"ring-offset-w":[{"ring-offset":[vt,es]}],"ring-offset-color":[{"ring-offset":U()}],"inset-ring-w":[{"inset-ring":Re()}],"inset-ring-color":[{"inset-ring":U()}],"text-shadow":[{"text-shadow":["none",x,zl,kl]}],"text-shadow-color":[{"text-shadow":U()}],opacity:[{opacity:[vt,je,We]}],"mix-blend":[{"mix-blend":[...ne(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":ne()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[vt]}],"mask-image-linear-from-pos":[{"mask-linear-from":se()}],"mask-image-linear-to-pos":[{"mask-linear-to":se()}],"mask-image-linear-from-color":[{"mask-linear-from":U()}],"mask-image-linear-to-color":[{"mask-linear-to":U()}],"mask-image-t-from-pos":[{"mask-t-from":se()}],"mask-image-t-to-pos":[{"mask-t-to":se()}],"mask-image-t-from-color":[{"mask-t-from":U()}],"mask-image-t-to-color":[{"mask-t-to":U()}],"mask-image-r-from-pos":[{"mask-r-from":se()}],"mask-image-r-to-pos":[{"mask-r-to":se()}],"mask-image-r-from-color":[{"mask-r-from":U()}],"mask-image-r-to-color":[{"mask-r-to":U()}],"mask-image-b-from-pos":[{"mask-b-from":se()}],"mask-image-b-to-pos":[{"mask-b-to":se()}],"mask-image-b-from-color":[{"mask-b-from":U()}],"mask-image-b-to-color":[{"mask-b-to":U()}],"mask-image-l-from-pos":[{"mask-l-from":se()}],"mask-image-l-to-pos":[{"mask-l-to":se()}],"mask-image-l-from-color":[{"mask-l-from":U()}],"mask-image-l-to-color":[{"mask-l-to":U()}],"mask-image-x-from-pos":[{"mask-x-from":se()}],"mask-image-x-to-pos":[{"mask-x-to":se()}],"mask-image-x-from-color":[{"mask-x-from":U()}],"mask-image-x-to-color":[{"mask-x-to":U()}],"mask-image-y-from-pos":[{"mask-y-from":se()}],"mask-image-y-to-pos":[{"mask-y-to":se()}],"mask-image-y-from-color":[{"mask-y-from":U()}],"mask-image-y-to-color":[{"mask-y-to":U()}],"mask-image-radial":[{"mask-radial":[je,We]}],"mask-image-radial-from-pos":[{"mask-radial-from":se()}],"mask-image-radial-to-pos":[{"mask-radial-to":se()}],"mask-image-radial-from-color":[{"mask-radial-from":U()}],"mask-image-radial-to-color":[{"mask-radial-to":U()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":b()}],"mask-image-conic-pos":[{"mask-conic":[vt]}],"mask-image-conic-from-pos":[{"mask-conic-from":se()}],"mask-image-conic-to-pos":[{"mask-conic-to":se()}],"mask-image-conic-from-color":[{"mask-conic-from":U()}],"mask-image-conic-to-color":[{"mask-conic-to":U()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:fe()}],"mask-repeat":[{mask:ue()}],"mask-size":[{mask:H()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",je,We]}],filter:[{filter:["","none",je,We]}],blur:[{blur:ye()}],brightness:[{brightness:[vt,je,We]}],contrast:[{contrast:[vt,je,We]}],"drop-shadow":[{"drop-shadow":["","none",S,zl,kl]}],"drop-shadow-color":[{"drop-shadow":U()}],grayscale:[{grayscale:["",vt,je,We]}],"hue-rotate":[{"hue-rotate":[vt,je,We]}],invert:[{invert:["",vt,je,We]}],saturate:[{saturate:[vt,je,We]}],sepia:[{sepia:["",vt,je,We]}],"backdrop-filter":[{"backdrop-filter":["","none",je,We]}],"backdrop-blur":[{"backdrop-blur":ye()}],"backdrop-brightness":[{"backdrop-brightness":[vt,je,We]}],"backdrop-contrast":[{"backdrop-contrast":[vt,je,We]}],"backdrop-grayscale":[{"backdrop-grayscale":["",vt,je,We]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[vt,je,We]}],"backdrop-invert":[{"backdrop-invert":["",vt,je,We]}],"backdrop-opacity":[{"backdrop-opacity":[vt,je,We]}],"backdrop-saturate":[{"backdrop-saturate":[vt,je,We]}],"backdrop-sepia":[{"backdrop-sepia":["",vt,je,We]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":z()}],"border-spacing-x":[{"border-spacing-x":z()}],"border-spacing-y":[{"border-spacing-y":z()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",je,We]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[vt,"initial",je,We]}],ease:[{ease:["linear","initial",_,je,We]}],delay:[{delay:[vt,je,We]}],animate:[{animate:["none",N,je,We]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[E,je,We]}],"perspective-origin":[{"perspective-origin":k()}],rotate:[{rotate:Ne()}],"rotate-x":[{"rotate-x":Ne()}],"rotate-y":[{"rotate-y":Ne()}],"rotate-z":[{"rotate-z":Ne()}],scale:[{scale:Ie()}],"scale-x":[{"scale-x":Ie()}],"scale-y":[{"scale-y":Ie()}],"scale-z":[{"scale-z":Ie()}],"scale-3d":["scale-3d"],skew:[{skew:pt()}],"skew-x":[{"skew-x":pt()}],"skew-y":[{"skew-y":pt()}],transform:[{transform:[je,We,"","none","gpu","cpu"]}],"transform-origin":[{origin:k()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:Wt()}],"translate-x":[{"translate-x":Wt()}],"translate-y":[{"translate-y":Wt()}],"translate-z":[{"translate-z":Wt()}],"translate-none":["translate-none"],accent:[{accent:U()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:U()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",je,We]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":z()}],"scroll-mx":[{"scroll-mx":z()}],"scroll-my":[{"scroll-my":z()}],"scroll-ms":[{"scroll-ms":z()}],"scroll-me":[{"scroll-me":z()}],"scroll-mt":[{"scroll-mt":z()}],"scroll-mr":[{"scroll-mr":z()}],"scroll-mb":[{"scroll-mb":z()}],"scroll-ml":[{"scroll-ml":z()}],"scroll-p":[{"scroll-p":z()}],"scroll-px":[{"scroll-px":z()}],"scroll-py":[{"scroll-py":z()}],"scroll-ps":[{"scroll-ps":z()}],"scroll-pe":[{"scroll-pe":z()}],"scroll-pt":[{"scroll-pt":z()}],"scroll-pr":[{"scroll-pr":z()}],"scroll-pb":[{"scroll-pb":z()}],"scroll-pl":[{"scroll-pl":z()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",je,We]}],fill:[{fill:["none",...U()]}],"stroke-w":[{stroke:[vt,ia,es,Td]}],stroke:[{stroke:["none",...U()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}},NS=fS(LS);function cn(...i){return NS(e0(i))}const DS=Eh("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),pa=L.forwardRef(({className:i,variant:e,size:t,asChild:s=!1,...o},l)=>{const u=s?$y:"button";return O.jsx(u,{className:cn(DS({variant:e,size:t,className:i})),ref:l,...o})});pa.displayName="Button";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IS=i=>i.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),d0=(...i)=>i.filter((e,t,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===t).join(" ").trim();/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var US={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FS=L.forwardRef(({color:i="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:s,className:o="",children:l,iconNode:u,...d},h)=>L.createElement("svg",{ref:h,...US,width:e,height:e,stroke:i,strokeWidth:s?Number(t)*24/Number(e):t,className:d0("lucide",o),...d},[...u.map(([f,m])=>L.createElement(f,m)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _i=(i,e)=>{const t=L.forwardRef(({className:s,...o},l)=>L.createElement(FS,{ref:l,iconNode:e,className:d0(`lucide-${IS(i)}`,s),...o}));return t.displayName=`${i}`,t};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OS=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],kS=_i("ChevronDown",OS);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zS=[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]],BS=_i("Heart",zS);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HS=[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]],VS=_i("Mail",HS);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GS=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],WS=_i("Package",GS);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jS=[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]],XS=_i("Palette",jS);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $S=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],YS=_i("Search",$S);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qS=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],KS=_i("Send",qS);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZS=[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]],QS=_i("ShoppingCart",ZS);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JS=[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]],ma=_i("Sparkles",JS);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eE=[["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}],["path",{d:"m14 5 3-3 3 3",key:"1sorif"}],["path",{d:"m14 10 3-3 3 3",key:"1jyi9h"}],["path",{d:"M17 14V2",key:"8ymqnk"}],["path",{d:"M17 14H7l-5 8h20Z",key:"13ar7p"}],["path",{d:"M8 14v8",key:"1ghmqk"}],["path",{d:"m9 14 5 8",key:"13pgi6"}]],tE=_i("TentTree",eE);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nE=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],f0=_i("X",nE);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const wh="180",iE=0,Pg=1,rE=2,h0=1,sE=2,qi=3,Fr=0,kn=1,Ki=2,Dr=0,ao=1,Ef=2,Lg=3,Ng=4,oE=5,cs=100,aE=101,lE=102,cE=103,uE=104,dE=200,fE=201,hE=202,pE=203,Mf=204,wf=205,mE=206,gE=207,vE=208,_E=209,xE=210,yE=211,SE=212,EE=213,ME=214,Tf=0,bf=1,Af=2,uo=3,Cf=4,Rf=5,Pf=6,Lf=7,p0=0,wE=1,TE=2,Ir=0,bE=1,AE=2,CE=3,RE=4,PE=5,LE=6,NE=7,m0=300,fo=301,ho=302,Nf=303,Df=304,Nc=306,If=1e3,ds=1001,Uf=1002,gi=1003,DE=1004,Bl=1005,Ai=1006,bd=1007,fs=1008,Ri=1009,g0=1010,v0=1011,ga=1012,Th=1013,hs=1014,Zi=1015,wa=1016,bh=1017,Ah=1018,va=1020,_0=35902,x0=35899,y0=1021,S0=1022,mi=1023,_a=1026,xa=1027,E0=1028,Ch=1029,M0=1030,Rh=1031,Ph=1033,mc=33776,gc=33777,vc=33778,_c=33779,Ff=35840,Of=35841,kf=35842,zf=35843,Bf=36196,Hf=37492,Vf=37496,Gf=37808,Wf=37809,jf=37810,Xf=37811,$f=37812,Yf=37813,qf=37814,Kf=37815,Zf=37816,Qf=37817,Jf=37818,eh=37819,th=37820,nh=37821,ih=36492,rh=36494,sh=36495,oh=36283,ah=36284,lh=36285,ch=36286,IE=3200,UE=3201,w0=0,FE=1,Nr="",ni="srgb",po="srgb-linear",bc="linear",It="srgb",Gs=7680,Dg=519,OE=512,kE=513,zE=514,T0=515,BE=516,HE=517,VE=518,GE=519,Ig=35044,Ug="300 es",Ci=2e3,Ac=2001;class _o{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(t)===-1&&s[e].push(t)}hasEventListener(e,t){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(t)!==-1}removeEventListener(e,t){const s=this._listeners;if(s===void 0)return;const o=s[e];if(o!==void 0){const l=o.indexOf(t);l!==-1&&o.splice(l,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const s=t[e.type];if(s!==void 0){e.target=this;const o=s.slice(0);for(let l=0,u=o.length;l<u;l++)o[l].call(this,e);e.target=null}}}const Mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ad=Math.PI/180,Cc=180/Math.PI;function Ta(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Mn[i&255]+Mn[i>>8&255]+Mn[i>>16&255]+Mn[i>>24&255]+"-"+Mn[e&255]+Mn[e>>8&255]+"-"+Mn[e>>16&15|64]+Mn[e>>24&255]+"-"+Mn[t&63|128]+Mn[t>>8&255]+"-"+Mn[t>>16&255]+Mn[t>>24&255]+Mn[s&255]+Mn[s>>8&255]+Mn[s>>16&255]+Mn[s>>24&255]).toLowerCase()}function St(i,e,t){return Math.max(e,Math.min(t,i))}function WE(i,e){return(i%e+e)%e}function Cd(i,e,t){return(1-t)*i+t*e}function ra(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Fn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Tt{constructor(e=0,t=0){Tt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,s=this.y,o=e.elements;return this.x=o[0]*t+o[3]*s+o[6],this.y=o[1]*t+o[4]*s+o[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=St(this.x,e.x,t.x),this.y=St(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=St(this.x,e,t),this.y=St(this.y,e,t),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(St(s,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const s=this.dot(e)/t;return Math.acos(St(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,s=this.y-e.y;return t*t+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const s=Math.cos(t),o=Math.sin(t),l=this.x-e.x,u=this.y-e.y;return this.x=l*s-u*o+e.x,this.y=l*o+u*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ba{constructor(e=0,t=0,s=0,o=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=s,this._w=o}static slerpFlat(e,t,s,o,l,u,d){let h=s[o+0],f=s[o+1],m=s[o+2],g=s[o+3];const x=l[u+0],S=l[u+1],M=l[u+2],E=l[u+3];if(d===0){e[t+0]=h,e[t+1]=f,e[t+2]=m,e[t+3]=g;return}if(d===1){e[t+0]=x,e[t+1]=S,e[t+2]=M,e[t+3]=E;return}if(g!==E||h!==x||f!==S||m!==M){let y=1-d;const _=h*x+f*S+m*M+g*E,N=_>=0?1:-1,P=1-_*_;if(P>Number.EPSILON){const k=Math.sqrt(P),B=Math.atan2(k,_*N);y=Math.sin(y*B)/k,d=Math.sin(d*B)/k}const b=d*N;if(h=h*y+x*b,f=f*y+S*b,m=m*y+M*b,g=g*y+E*b,y===1-d){const k=1/Math.sqrt(h*h+f*f+m*m+g*g);h*=k,f*=k,m*=k,g*=k}}e[t]=h,e[t+1]=f,e[t+2]=m,e[t+3]=g}static multiplyQuaternionsFlat(e,t,s,o,l,u){const d=s[o],h=s[o+1],f=s[o+2],m=s[o+3],g=l[u],x=l[u+1],S=l[u+2],M=l[u+3];return e[t]=d*M+m*g+h*S-f*x,e[t+1]=h*M+m*x+f*g-d*S,e[t+2]=f*M+m*S+d*x-h*g,e[t+3]=m*M-d*g-h*x-f*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,s,o){return this._x=e,this._y=t,this._z=s,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const s=e._x,o=e._y,l=e._z,u=e._order,d=Math.cos,h=Math.sin,f=d(s/2),m=d(o/2),g=d(l/2),x=h(s/2),S=h(o/2),M=h(l/2);switch(u){case"XYZ":this._x=x*m*g+f*S*M,this._y=f*S*g-x*m*M,this._z=f*m*M+x*S*g,this._w=f*m*g-x*S*M;break;case"YXZ":this._x=x*m*g+f*S*M,this._y=f*S*g-x*m*M,this._z=f*m*M-x*S*g,this._w=f*m*g+x*S*M;break;case"ZXY":this._x=x*m*g-f*S*M,this._y=f*S*g+x*m*M,this._z=f*m*M+x*S*g,this._w=f*m*g-x*S*M;break;case"ZYX":this._x=x*m*g-f*S*M,this._y=f*S*g+x*m*M,this._z=f*m*M-x*S*g,this._w=f*m*g+x*S*M;break;case"YZX":this._x=x*m*g+f*S*M,this._y=f*S*g+x*m*M,this._z=f*m*M-x*S*g,this._w=f*m*g-x*S*M;break;case"XZY":this._x=x*m*g-f*S*M,this._y=f*S*g-x*m*M,this._z=f*m*M+x*S*g,this._w=f*m*g+x*S*M;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+u)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const s=t/2,o=Math.sin(s);return this._x=e.x*o,this._y=e.y*o,this._z=e.z*o,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,s=t[0],o=t[4],l=t[8],u=t[1],d=t[5],h=t[9],f=t[2],m=t[6],g=t[10],x=s+d+g;if(x>0){const S=.5/Math.sqrt(x+1);this._w=.25/S,this._x=(m-h)*S,this._y=(l-f)*S,this._z=(u-o)*S}else if(s>d&&s>g){const S=2*Math.sqrt(1+s-d-g);this._w=(m-h)/S,this._x=.25*S,this._y=(o+u)/S,this._z=(l+f)/S}else if(d>g){const S=2*Math.sqrt(1+d-s-g);this._w=(l-f)/S,this._x=(o+u)/S,this._y=.25*S,this._z=(h+m)/S}else{const S=2*Math.sqrt(1+g-s-d);this._w=(u-o)/S,this._x=(l+f)/S,this._y=(h+m)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let s=e.dot(t)+1;return s<1e-8?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(St(this.dot(e),-1,1)))}rotateTowards(e,t){const s=this.angleTo(e);if(s===0)return this;const o=Math.min(1,t/s);return this.slerp(e,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const s=e._x,o=e._y,l=e._z,u=e._w,d=t._x,h=t._y,f=t._z,m=t._w;return this._x=s*m+u*d+o*f-l*h,this._y=o*m+u*h+l*d-s*f,this._z=l*m+u*f+s*h-o*d,this._w=u*m-s*d-o*h-l*f,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const s=this._x,o=this._y,l=this._z,u=this._w;let d=u*e._w+s*e._x+o*e._y+l*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=u,this._x=s,this._y=o,this._z=l,this;const h=1-d*d;if(h<=Number.EPSILON){const S=1-t;return this._w=S*u+t*this._w,this._x=S*s+t*this._x,this._y=S*o+t*this._y,this._z=S*l+t*this._z,this.normalize(),this}const f=Math.sqrt(h),m=Math.atan2(f,d),g=Math.sin((1-t)*m)/f,x=Math.sin(t*m)/f;return this._w=u*g+this._w*x,this._x=s*g+this._x*x,this._y=o*g+this._y*x,this._z=l*g+this._z*x,this._onChangeCallback(),this}slerpQuaternions(e,t,s){return this.copy(e).slerp(t,s)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),s=Math.random(),o=Math.sqrt(1-s),l=Math.sqrt(s);return this.set(o*Math.sin(e),o*Math.cos(e),l*Math.sin(t),l*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Z{constructor(e=0,t=0,s=0){Z.prototype.isVector3=!0,this.x=e,this.y=t,this.z=s}set(e,t,s){return s===void 0&&(s=this.z),this.x=e,this.y=t,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Fg.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Fg.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,s=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[3]*s+l[6]*o,this.y=l[1]*t+l[4]*s+l[7]*o,this.z=l[2]*t+l[5]*s+l[8]*o,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,s=this.y,o=this.z,l=e.elements,u=1/(l[3]*t+l[7]*s+l[11]*o+l[15]);return this.x=(l[0]*t+l[4]*s+l[8]*o+l[12])*u,this.y=(l[1]*t+l[5]*s+l[9]*o+l[13])*u,this.z=(l[2]*t+l[6]*s+l[10]*o+l[14])*u,this}applyQuaternion(e){const t=this.x,s=this.y,o=this.z,l=e.x,u=e.y,d=e.z,h=e.w,f=2*(u*o-d*s),m=2*(d*t-l*o),g=2*(l*s-u*t);return this.x=t+h*f+u*g-d*m,this.y=s+h*m+d*f-l*g,this.z=o+h*g+l*m-u*f,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,s=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[4]*s+l[8]*o,this.y=l[1]*t+l[5]*s+l[9]*o,this.z=l[2]*t+l[6]*s+l[10]*o,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=St(this.x,e.x,t.x),this.y=St(this.y,e.y,t.y),this.z=St(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=St(this.x,e,t),this.y=St(this.y,e,t),this.z=St(this.z,e,t),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(St(s,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const s=e.x,o=e.y,l=e.z,u=t.x,d=t.y,h=t.z;return this.x=o*h-l*d,this.y=l*u-s*h,this.z=s*d-o*u,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const s=e.dot(this)/t;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return Rd.copy(this).projectOnVector(e),this.sub(Rd)}reflect(e){return this.sub(Rd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const s=this.dot(e)/t;return Math.acos(St(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,s=this.y-e.y,o=this.z-e.z;return t*t+s*s+o*o}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,s){const o=Math.sin(t)*e;return this.x=o*Math.sin(s),this.y=Math.cos(t)*e,this.z=o*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,s){return this.x=e*Math.sin(t),this.y=s,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),o=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=s,this.z=o,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,s=Math.sqrt(1-t*t);return this.x=s*Math.cos(e),this.y=t,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Rd=new Z,Fg=new ba;class mt{constructor(e,t,s,o,l,u,d,h,f){mt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,s,o,l,u,d,h,f)}set(e,t,s,o,l,u,d,h,f){const m=this.elements;return m[0]=e,m[1]=o,m[2]=d,m[3]=t,m[4]=l,m[5]=h,m[6]=s,m[7]=u,m[8]=f,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,s=e.elements;return t[0]=s[0],t[1]=s[1],t[2]=s[2],t[3]=s[3],t[4]=s[4],t[5]=s[5],t[6]=s[6],t[7]=s[7],t[8]=s[8],this}extractBasis(e,t,s){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const s=e.elements,o=t.elements,l=this.elements,u=s[0],d=s[3],h=s[6],f=s[1],m=s[4],g=s[7],x=s[2],S=s[5],M=s[8],E=o[0],y=o[3],_=o[6],N=o[1],P=o[4],b=o[7],k=o[2],B=o[5],I=o[8];return l[0]=u*E+d*N+h*k,l[3]=u*y+d*P+h*B,l[6]=u*_+d*b+h*I,l[1]=f*E+m*N+g*k,l[4]=f*y+m*P+g*B,l[7]=f*_+m*b+g*I,l[2]=x*E+S*N+M*k,l[5]=x*y+S*P+M*B,l[8]=x*_+S*b+M*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],s=e[1],o=e[2],l=e[3],u=e[4],d=e[5],h=e[6],f=e[7],m=e[8];return t*u*m-t*d*f-s*l*m+s*d*h+o*l*f-o*u*h}invert(){const e=this.elements,t=e[0],s=e[1],o=e[2],l=e[3],u=e[4],d=e[5],h=e[6],f=e[7],m=e[8],g=m*u-d*f,x=d*h-m*l,S=f*l-u*h,M=t*g+s*x+o*S;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/M;return e[0]=g*E,e[1]=(o*f-m*s)*E,e[2]=(d*s-o*u)*E,e[3]=x*E,e[4]=(m*t-o*h)*E,e[5]=(o*l-d*t)*E,e[6]=S*E,e[7]=(s*h-f*t)*E,e[8]=(u*t-s*l)*E,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,s,o,l,u,d){const h=Math.cos(l),f=Math.sin(l);return this.set(s*h,s*f,-s*(h*u+f*d)+u+e,-o*f,o*h,-o*(-f*u+h*d)+d+t,0,0,1),this}scale(e,t){return this.premultiply(Pd.makeScale(e,t)),this}rotate(e){return this.premultiply(Pd.makeRotation(-e)),this}translate(e,t){return this.premultiply(Pd.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,s,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,s=e.elements;for(let o=0;o<9;o++)if(t[o]!==s[o])return!1;return!0}fromArray(e,t=0){for(let s=0;s<9;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){const s=this.elements;return e[t]=s[0],e[t+1]=s[1],e[t+2]=s[2],e[t+3]=s[3],e[t+4]=s[4],e[t+5]=s[5],e[t+6]=s[6],e[t+7]=s[7],e[t+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Pd=new mt;function b0(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Rc(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function jE(){const i=Rc("canvas");return i.style.display="block",i}const Og={};function ya(i){i in Og||(Og[i]=!0,console.warn(i))}function XE(i,e,t){return new Promise(function(s,o){function l(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:o();break;case i.TIMEOUT_EXPIRED:setTimeout(l,t);break;default:s()}}setTimeout(l,t)})}const kg=new mt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zg=new mt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $E(){const i={enabled:!0,workingColorSpace:po,spaces:{},convert:function(o,l,u){return this.enabled===!1||l===u||!l||!u||(this.spaces[l].transfer===It&&(o.r=Ji(o.r),o.g=Ji(o.g),o.b=Ji(o.b)),this.spaces[l].primaries!==this.spaces[u].primaries&&(o.applyMatrix3(this.spaces[l].toXYZ),o.applyMatrix3(this.spaces[u].fromXYZ)),this.spaces[u].transfer===It&&(o.r=lo(o.r),o.g=lo(o.g),o.b=lo(o.b))),o},workingToColorSpace:function(o,l){return this.convert(o,this.workingColorSpace,l)},colorSpaceToWorking:function(o,l){return this.convert(o,l,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===Nr?bc:this.spaces[o].transfer},getToneMappingMode:function(o){return this.spaces[o].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(o,l=this.workingColorSpace){return o.fromArray(this.spaces[l].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,l,u){return o.copy(this.spaces[l].toXYZ).multiply(this.spaces[u].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(o,l){return ya("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(o,l)},toWorkingColorSpace:function(o,l){return ya("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(o,l)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],s=[.3127,.329];return i.define({[po]:{primaries:e,whitePoint:s,transfer:bc,toXYZ:kg,fromXYZ:zg,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ni},outputColorSpaceConfig:{drawingBufferColorSpace:ni}},[ni]:{primaries:e,whitePoint:s,transfer:It,toXYZ:kg,fromXYZ:zg,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ni}}}),i}const Ct=$E();function Ji(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function lo(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ws;class YE{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{Ws===void 0&&(Ws=Rc("canvas")),Ws.width=e.width,Ws.height=e.height;const o=Ws.getContext("2d");e instanceof ImageData?o.putImageData(e,0,0):o.drawImage(e,0,0,e.width,e.height),s=Ws}return s.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Rc("canvas");t.width=e.width,t.height=e.height;const s=t.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const o=s.getImageData(0,0,e.width,e.height),l=o.data;for(let u=0;u<l.length;u++)l[u]=Ji(l[u]/255)*255;return s.putImageData(o,0,0),t}else if(e.data){const t=e.data.slice(0);for(let s=0;s<t.length;s++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[s]=Math.floor(Ji(t[s]/255)*255):t[s]=Ji(t[s]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let qE=0;class Lh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qE++}),this.uuid=Ta(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},o=this.data;if(o!==null){let l;if(Array.isArray(o)){l=[];for(let u=0,d=o.length;u<d;u++)o[u].isDataTexture?l.push(Ld(o[u].image)):l.push(Ld(o[u]))}else l=Ld(o);s.url=l}return t||(e.images[this.uuid]=s),s}}function Ld(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?YE.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let KE=0;const Nd=new Z;class zn extends _o{constructor(e=zn.DEFAULT_IMAGE,t=zn.DEFAULT_MAPPING,s=ds,o=ds,l=Ai,u=fs,d=mi,h=Ri,f=zn.DEFAULT_ANISOTROPY,m=Nr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:KE++}),this.uuid=Ta(),this.name="",this.source=new Lh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=s,this.wrapT=o,this.magFilter=l,this.minFilter=u,this.anisotropy=f,this.format=d,this.internalFormat=null,this.type=h,this.offset=new Tt(0,0),this.repeat=new Tt(1,1),this.center=new Tt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new mt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Nd).x}get height(){return this.source.getSize(Nd).y}get depth(){return this.source.getSize(Nd).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const s=e[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}o&&s&&o.isVector2&&s.isVector2||o&&s&&o.isVector3&&s.isVector3||o&&s&&o.isMatrix3&&s.isMatrix3?o.copy(s):this[t]=s}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),t||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==m0)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case If:e.x=e.x-Math.floor(e.x);break;case ds:e.x=e.x<0?0:1;break;case Uf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case If:e.y=e.y-Math.floor(e.y);break;case ds:e.y=e.y<0?0:1;break;case Uf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}zn.DEFAULT_IMAGE=null;zn.DEFAULT_MAPPING=m0;zn.DEFAULT_ANISOTROPY=1;class Ut{constructor(e=0,t=0,s=0,o=1){Ut.prototype.isVector4=!0,this.x=e,this.y=t,this.z=s,this.w=o}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,s,o){return this.x=e,this.y=t,this.z=s,this.w=o,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,s=this.y,o=this.z,l=this.w,u=e.elements;return this.x=u[0]*t+u[4]*s+u[8]*o+u[12]*l,this.y=u[1]*t+u[5]*s+u[9]*o+u[13]*l,this.z=u[2]*t+u[6]*s+u[10]*o+u[14]*l,this.w=u[3]*t+u[7]*s+u[11]*o+u[15]*l,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,s,o,l;const h=e.elements,f=h[0],m=h[4],g=h[8],x=h[1],S=h[5],M=h[9],E=h[2],y=h[6],_=h[10];if(Math.abs(m-x)<.01&&Math.abs(g-E)<.01&&Math.abs(M-y)<.01){if(Math.abs(m+x)<.1&&Math.abs(g+E)<.1&&Math.abs(M+y)<.1&&Math.abs(f+S+_-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const P=(f+1)/2,b=(S+1)/2,k=(_+1)/2,B=(m+x)/4,I=(g+E)/4,z=(M+y)/4;return P>b&&P>k?P<.01?(s=0,o=.707106781,l=.707106781):(s=Math.sqrt(P),o=B/s,l=I/s):b>k?b<.01?(s=.707106781,o=0,l=.707106781):(o=Math.sqrt(b),s=B/o,l=z/o):k<.01?(s=.707106781,o=.707106781,l=0):(l=Math.sqrt(k),s=I/l,o=z/l),this.set(s,o,l,t),this}let N=Math.sqrt((y-M)*(y-M)+(g-E)*(g-E)+(x-m)*(x-m));return Math.abs(N)<.001&&(N=1),this.x=(y-M)/N,this.y=(g-E)/N,this.z=(x-m)/N,this.w=Math.acos((f+S+_-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=St(this.x,e.x,t.x),this.y=St(this.y,e.y,t.y),this.z=St(this.z,e.z,t.z),this.w=St(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=St(this.x,e,t),this.y=St(this.y,e,t),this.z=St(this.z,e,t),this.w=St(this.w,e,t),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(St(s,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this.w=e.w+(t.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ZE extends _o{constructor(e=1,t=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ai,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},s),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=s.depth,this.scissor=new Ut(0,0,e,t),this.scissorTest=!1,this.viewport=new Ut(0,0,e,t);const o={width:e,height:t,depth:s.depth},l=new zn(o);this.textures=[];const u=s.count;for(let d=0;d<u;d++)this.textures[d]=l.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview}_setTextureOptions(e={}){const t={minFilter:Ai,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,s=1){if(this.width!==e||this.height!==t||this.depth!==s){this.width=e,this.height=t,this.depth=s;for(let o=0,l=this.textures.length;o<l;o++)this.textures[o].image.width=e,this.textures[o].image.height=t,this.textures[o].image.depth=s,this.textures[o].isArrayTexture=this.textures[o].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,s=e.textures.length;t<s;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const o=Object.assign({},e.textures[t].image);this.textures[t].source=new Lh(o)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ps extends ZE{constructor(e=1,t=1,s={}){super(e,t,s),this.isWebGLRenderTarget=!0}}class A0 extends zn{constructor(e=null,t=1,s=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:s,depth:o},this.magFilter=gi,this.minFilter=gi,this.wrapR=ds,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class QE extends zn{constructor(e=null,t=1,s=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:s,depth:o},this.magFilter=gi,this.minFilter=gi,this.wrapR=ds,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Aa{constructor(e=new Z(1/0,1/0,1/0),t=new Z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,s=e.length;t<s;t+=3)this.expandByPoint(di.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,s=e.count;t<s;t++)this.expandByPoint(di.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,s=e.length;t<s;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const s=di.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const l=s.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let u=0,d=l.count;u<d;u++)e.isMesh===!0?e.getVertexPosition(u,di):di.fromBufferAttribute(l,u),di.applyMatrix4(e.matrixWorld),this.expandByPoint(di);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Hl.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),Hl.copy(s.boundingBox)),Hl.applyMatrix4(e.matrixWorld),this.union(Hl)}const o=e.children;for(let l=0,u=o.length;l<u;l++)this.expandByObject(o[l],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,di),di.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,s;return e.normal.x>0?(t=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),t<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(sa),Vl.subVectors(this.max,sa),js.subVectors(e.a,sa),Xs.subVectors(e.b,sa),$s.subVectors(e.c,sa),Tr.subVectors(Xs,js),br.subVectors($s,Xs),ts.subVectors(js,$s);let t=[0,-Tr.z,Tr.y,0,-br.z,br.y,0,-ts.z,ts.y,Tr.z,0,-Tr.x,br.z,0,-br.x,ts.z,0,-ts.x,-Tr.y,Tr.x,0,-br.y,br.x,0,-ts.y,ts.x,0];return!Dd(t,js,Xs,$s,Vl)||(t=[1,0,0,0,1,0,0,0,1],!Dd(t,js,Xs,$s,Vl))?!1:(Gl.crossVectors(Tr,br),t=[Gl.x,Gl.y,Gl.z],Dd(t,js,Xs,$s,Vl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,di).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(di).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Wi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Wi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Wi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Wi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Wi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Wi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Wi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Wi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Wi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Wi=[new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z],di=new Z,Hl=new Aa,js=new Z,Xs=new Z,$s=new Z,Tr=new Z,br=new Z,ts=new Z,sa=new Z,Vl=new Z,Gl=new Z,ns=new Z;function Dd(i,e,t,s,o){for(let l=0,u=i.length-3;l<=u;l+=3){ns.fromArray(i,l);const d=o.x*Math.abs(ns.x)+o.y*Math.abs(ns.y)+o.z*Math.abs(ns.z),h=e.dot(ns),f=t.dot(ns),m=s.dot(ns);if(Math.max(-Math.max(h,f,m),Math.min(h,f,m))>d)return!1}return!0}const JE=new Aa,oa=new Z,Id=new Z;class Dc{constructor(e=new Z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const s=this.center;t!==void 0?s.copy(t):JE.setFromPoints(e).getCenter(s);let o=0;for(let l=0,u=e.length;l<u;l++)o=Math.max(o,s.distanceToSquared(e[l]));return this.radius=Math.sqrt(o),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const s=this.center.distanceToSquared(e);return t.copy(e),s>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;oa.subVectors(e,this.center);const t=oa.lengthSq();if(t>this.radius*this.radius){const s=Math.sqrt(t),o=(s-this.radius)*.5;this.center.addScaledVector(oa,o/s),this.radius+=o}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Id.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(oa.copy(e.center).add(Id)),this.expandByPoint(oa.copy(e.center).sub(Id))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const ji=new Z,Ud=new Z,Wl=new Z,Ar=new Z,Fd=new Z,jl=new Z,Od=new Z;class C0{constructor(e=new Z,t=new Z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ji)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const s=t.dot(this.direction);return s<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ji.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ji.copy(this.origin).addScaledVector(this.direction,t),ji.distanceToSquared(e))}distanceSqToSegment(e,t,s,o){Ud.copy(e).add(t).multiplyScalar(.5),Wl.copy(t).sub(e).normalize(),Ar.copy(this.origin).sub(Ud);const l=e.distanceTo(t)*.5,u=-this.direction.dot(Wl),d=Ar.dot(this.direction),h=-Ar.dot(Wl),f=Ar.lengthSq(),m=Math.abs(1-u*u);let g,x,S,M;if(m>0)if(g=u*h-d,x=u*d-h,M=l*m,g>=0)if(x>=-M)if(x<=M){const E=1/m;g*=E,x*=E,S=g*(g+u*x+2*d)+x*(u*g+x+2*h)+f}else x=l,g=Math.max(0,-(u*x+d)),S=-g*g+x*(x+2*h)+f;else x=-l,g=Math.max(0,-(u*x+d)),S=-g*g+x*(x+2*h)+f;else x<=-M?(g=Math.max(0,-(-u*l+d)),x=g>0?-l:Math.min(Math.max(-l,-h),l),S=-g*g+x*(x+2*h)+f):x<=M?(g=0,x=Math.min(Math.max(-l,-h),l),S=x*(x+2*h)+f):(g=Math.max(0,-(u*l+d)),x=g>0?l:Math.min(Math.max(-l,-h),l),S=-g*g+x*(x+2*h)+f);else x=u>0?-l:l,g=Math.max(0,-(u*x+d)),S=-g*g+x*(x+2*h)+f;return s&&s.copy(this.origin).addScaledVector(this.direction,g),o&&o.copy(Ud).addScaledVector(Wl,x),S}intersectSphere(e,t){ji.subVectors(e.center,this.origin);const s=ji.dot(this.direction),o=ji.dot(ji)-s*s,l=e.radius*e.radius;if(o>l)return null;const u=Math.sqrt(l-o),d=s-u,h=s+u;return h<0?null:d<0?this.at(h,t):this.at(d,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/t;return s>=0?s:null}intersectPlane(e,t){const s=this.distanceToPlane(e);return s===null?null:this.at(s,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let s,o,l,u,d,h;const f=1/this.direction.x,m=1/this.direction.y,g=1/this.direction.z,x=this.origin;return f>=0?(s=(e.min.x-x.x)*f,o=(e.max.x-x.x)*f):(s=(e.max.x-x.x)*f,o=(e.min.x-x.x)*f),m>=0?(l=(e.min.y-x.y)*m,u=(e.max.y-x.y)*m):(l=(e.max.y-x.y)*m,u=(e.min.y-x.y)*m),s>u||l>o||((l>s||isNaN(s))&&(s=l),(u<o||isNaN(o))&&(o=u),g>=0?(d=(e.min.z-x.z)*g,h=(e.max.z-x.z)*g):(d=(e.max.z-x.z)*g,h=(e.min.z-x.z)*g),s>h||d>o)||((d>s||s!==s)&&(s=d),(h<o||o!==o)&&(o=h),o<0)?null:this.at(s>=0?s:o,t)}intersectsBox(e){return this.intersectBox(e,ji)!==null}intersectTriangle(e,t,s,o,l){Fd.subVectors(t,e),jl.subVectors(s,e),Od.crossVectors(Fd,jl);let u=this.direction.dot(Od),d;if(u>0){if(o)return null;d=1}else if(u<0)d=-1,u=-u;else return null;Ar.subVectors(this.origin,e);const h=d*this.direction.dot(jl.crossVectors(Ar,jl));if(h<0)return null;const f=d*this.direction.dot(Fd.cross(Ar));if(f<0||h+f>u)return null;const m=-d*Ar.dot(Od);return m<0?null:this.at(m/u,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Yt{constructor(e,t,s,o,l,u,d,h,f,m,g,x,S,M,E,y){Yt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,s,o,l,u,d,h,f,m,g,x,S,M,E,y)}set(e,t,s,o,l,u,d,h,f,m,g,x,S,M,E,y){const _=this.elements;return _[0]=e,_[4]=t,_[8]=s,_[12]=o,_[1]=l,_[5]=u,_[9]=d,_[13]=h,_[2]=f,_[6]=m,_[10]=g,_[14]=x,_[3]=S,_[7]=M,_[11]=E,_[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Yt().fromArray(this.elements)}copy(e){const t=this.elements,s=e.elements;return t[0]=s[0],t[1]=s[1],t[2]=s[2],t[3]=s[3],t[4]=s[4],t[5]=s[5],t[6]=s[6],t[7]=s[7],t[8]=s[8],t[9]=s[9],t[10]=s[10],t[11]=s[11],t[12]=s[12],t[13]=s[13],t[14]=s[14],t[15]=s[15],this}copyPosition(e){const t=this.elements,s=e.elements;return t[12]=s[12],t[13]=s[13],t[14]=s[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,s){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(e,t,s){return this.set(e.x,t.x,s.x,0,e.y,t.y,s.y,0,e.z,t.z,s.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,s=e.elements,o=1/Ys.setFromMatrixColumn(e,0).length(),l=1/Ys.setFromMatrixColumn(e,1).length(),u=1/Ys.setFromMatrixColumn(e,2).length();return t[0]=s[0]*o,t[1]=s[1]*o,t[2]=s[2]*o,t[3]=0,t[4]=s[4]*l,t[5]=s[5]*l,t[6]=s[6]*l,t[7]=0,t[8]=s[8]*u,t[9]=s[9]*u,t[10]=s[10]*u,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,s=e.x,o=e.y,l=e.z,u=Math.cos(s),d=Math.sin(s),h=Math.cos(o),f=Math.sin(o),m=Math.cos(l),g=Math.sin(l);if(e.order==="XYZ"){const x=u*m,S=u*g,M=d*m,E=d*g;t[0]=h*m,t[4]=-h*g,t[8]=f,t[1]=S+M*f,t[5]=x-E*f,t[9]=-d*h,t[2]=E-x*f,t[6]=M+S*f,t[10]=u*h}else if(e.order==="YXZ"){const x=h*m,S=h*g,M=f*m,E=f*g;t[0]=x+E*d,t[4]=M*d-S,t[8]=u*f,t[1]=u*g,t[5]=u*m,t[9]=-d,t[2]=S*d-M,t[6]=E+x*d,t[10]=u*h}else if(e.order==="ZXY"){const x=h*m,S=h*g,M=f*m,E=f*g;t[0]=x-E*d,t[4]=-u*g,t[8]=M+S*d,t[1]=S+M*d,t[5]=u*m,t[9]=E-x*d,t[2]=-u*f,t[6]=d,t[10]=u*h}else if(e.order==="ZYX"){const x=u*m,S=u*g,M=d*m,E=d*g;t[0]=h*m,t[4]=M*f-S,t[8]=x*f+E,t[1]=h*g,t[5]=E*f+x,t[9]=S*f-M,t[2]=-f,t[6]=d*h,t[10]=u*h}else if(e.order==="YZX"){const x=u*h,S=u*f,M=d*h,E=d*f;t[0]=h*m,t[4]=E-x*g,t[8]=M*g+S,t[1]=g,t[5]=u*m,t[9]=-d*m,t[2]=-f*m,t[6]=S*g+M,t[10]=x-E*g}else if(e.order==="XZY"){const x=u*h,S=u*f,M=d*h,E=d*f;t[0]=h*m,t[4]=-g,t[8]=f*m,t[1]=x*g+E,t[5]=u*m,t[9]=S*g-M,t[2]=M*g-S,t[6]=d*m,t[10]=E*g+x}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(eM,e,tM)}lookAt(e,t,s){const o=this.elements;return jn.subVectors(e,t),jn.lengthSq()===0&&(jn.z=1),jn.normalize(),Cr.crossVectors(s,jn),Cr.lengthSq()===0&&(Math.abs(s.z)===1?jn.x+=1e-4:jn.z+=1e-4,jn.normalize(),Cr.crossVectors(s,jn)),Cr.normalize(),Xl.crossVectors(jn,Cr),o[0]=Cr.x,o[4]=Xl.x,o[8]=jn.x,o[1]=Cr.y,o[5]=Xl.y,o[9]=jn.y,o[2]=Cr.z,o[6]=Xl.z,o[10]=jn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const s=e.elements,o=t.elements,l=this.elements,u=s[0],d=s[4],h=s[8],f=s[12],m=s[1],g=s[5],x=s[9],S=s[13],M=s[2],E=s[6],y=s[10],_=s[14],N=s[3],P=s[7],b=s[11],k=s[15],B=o[0],I=o[4],z=o[8],C=o[12],R=o[1],G=o[5],q=o[9],ie=o[13],Q=o[2],re=o[6],te=o[10],de=o[14],U=o[3],fe=o[7],ue=o[11],H=o[15];return l[0]=u*B+d*R+h*Q+f*U,l[4]=u*I+d*G+h*re+f*fe,l[8]=u*z+d*q+h*te+f*ue,l[12]=u*C+d*ie+h*de+f*H,l[1]=m*B+g*R+x*Q+S*U,l[5]=m*I+g*G+x*re+S*fe,l[9]=m*z+g*q+x*te+S*ue,l[13]=m*C+g*ie+x*de+S*H,l[2]=M*B+E*R+y*Q+_*U,l[6]=M*I+E*G+y*re+_*fe,l[10]=M*z+E*q+y*te+_*ue,l[14]=M*C+E*ie+y*de+_*H,l[3]=N*B+P*R+b*Q+k*U,l[7]=N*I+P*G+b*re+k*fe,l[11]=N*z+P*q+b*te+k*ue,l[15]=N*C+P*ie+b*de+k*H,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],s=e[4],o=e[8],l=e[12],u=e[1],d=e[5],h=e[9],f=e[13],m=e[2],g=e[6],x=e[10],S=e[14],M=e[3],E=e[7],y=e[11],_=e[15];return M*(+l*h*g-o*f*g-l*d*x+s*f*x+o*d*S-s*h*S)+E*(+t*h*S-t*f*x+l*u*x-o*u*S+o*f*m-l*h*m)+y*(+t*f*g-t*d*S-l*u*g+s*u*S+l*d*m-s*f*m)+_*(-o*d*m-t*h*g+t*d*x+o*u*g-s*u*x+s*h*m)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,s){const o=this.elements;return e.isVector3?(o[12]=e.x,o[13]=e.y,o[14]=e.z):(o[12]=e,o[13]=t,o[14]=s),this}invert(){const e=this.elements,t=e[0],s=e[1],o=e[2],l=e[3],u=e[4],d=e[5],h=e[6],f=e[7],m=e[8],g=e[9],x=e[10],S=e[11],M=e[12],E=e[13],y=e[14],_=e[15],N=g*y*f-E*x*f+E*h*S-d*y*S-g*h*_+d*x*_,P=M*x*f-m*y*f-M*h*S+u*y*S+m*h*_-u*x*_,b=m*E*f-M*g*f+M*d*S-u*E*S-m*d*_+u*g*_,k=M*g*h-m*E*h-M*d*x+u*E*x+m*d*y-u*g*y,B=t*N+s*P+o*b+l*k;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/B;return e[0]=N*I,e[1]=(E*x*l-g*y*l-E*o*S+s*y*S+g*o*_-s*x*_)*I,e[2]=(d*y*l-E*h*l+E*o*f-s*y*f-d*o*_+s*h*_)*I,e[3]=(g*h*l-d*x*l-g*o*f+s*x*f+d*o*S-s*h*S)*I,e[4]=P*I,e[5]=(m*y*l-M*x*l+M*o*S-t*y*S-m*o*_+t*x*_)*I,e[6]=(M*h*l-u*y*l-M*o*f+t*y*f+u*o*_-t*h*_)*I,e[7]=(u*x*l-m*h*l+m*o*f-t*x*f-u*o*S+t*h*S)*I,e[8]=b*I,e[9]=(M*g*l-m*E*l-M*s*S+t*E*S+m*s*_-t*g*_)*I,e[10]=(u*E*l-M*d*l+M*s*f-t*E*f-u*s*_+t*d*_)*I,e[11]=(m*d*l-u*g*l-m*s*f+t*g*f+u*s*S-t*d*S)*I,e[12]=k*I,e[13]=(m*E*o-M*g*o+M*s*x-t*E*x-m*s*y+t*g*y)*I,e[14]=(M*d*o-u*E*o-M*s*h+t*E*h+u*s*y-t*d*y)*I,e[15]=(u*g*o-m*d*o+m*s*h-t*g*h-u*s*x+t*d*x)*I,this}scale(e){const t=this.elements,s=e.x,o=e.y,l=e.z;return t[0]*=s,t[4]*=o,t[8]*=l,t[1]*=s,t[5]*=o,t[9]*=l,t[2]*=s,t[6]*=o,t[10]*=l,t[3]*=s,t[7]*=o,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],o=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,s,o))}makeTranslation(e,t,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,s,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,t,-s,0,0,s,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,0,s,0,0,1,0,0,-s,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,0,s,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const s=Math.cos(t),o=Math.sin(t),l=1-s,u=e.x,d=e.y,h=e.z,f=l*u,m=l*d;return this.set(f*u+s,f*d-o*h,f*h+o*d,0,f*d+o*h,m*d+s,m*h-o*u,0,f*h-o*d,m*h+o*u,l*h*h+s,0,0,0,0,1),this}makeScale(e,t,s){return this.set(e,0,0,0,0,t,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,t,s,o,l,u){return this.set(1,s,l,0,e,1,u,0,t,o,1,0,0,0,0,1),this}compose(e,t,s){const o=this.elements,l=t._x,u=t._y,d=t._z,h=t._w,f=l+l,m=u+u,g=d+d,x=l*f,S=l*m,M=l*g,E=u*m,y=u*g,_=d*g,N=h*f,P=h*m,b=h*g,k=s.x,B=s.y,I=s.z;return o[0]=(1-(E+_))*k,o[1]=(S+b)*k,o[2]=(M-P)*k,o[3]=0,o[4]=(S-b)*B,o[5]=(1-(x+_))*B,o[6]=(y+N)*B,o[7]=0,o[8]=(M+P)*I,o[9]=(y-N)*I,o[10]=(1-(x+E))*I,o[11]=0,o[12]=e.x,o[13]=e.y,o[14]=e.z,o[15]=1,this}decompose(e,t,s){const o=this.elements;let l=Ys.set(o[0],o[1],o[2]).length();const u=Ys.set(o[4],o[5],o[6]).length(),d=Ys.set(o[8],o[9],o[10]).length();this.determinant()<0&&(l=-l),e.x=o[12],e.y=o[13],e.z=o[14],fi.copy(this);const f=1/l,m=1/u,g=1/d;return fi.elements[0]*=f,fi.elements[1]*=f,fi.elements[2]*=f,fi.elements[4]*=m,fi.elements[5]*=m,fi.elements[6]*=m,fi.elements[8]*=g,fi.elements[9]*=g,fi.elements[10]*=g,t.setFromRotationMatrix(fi),s.x=l,s.y=u,s.z=d,this}makePerspective(e,t,s,o,l,u,d=Ci,h=!1){const f=this.elements,m=2*l/(t-e),g=2*l/(s-o),x=(t+e)/(t-e),S=(s+o)/(s-o);let M,E;if(h)M=l/(u-l),E=u*l/(u-l);else if(d===Ci)M=-(u+l)/(u-l),E=-2*u*l/(u-l);else if(d===Ac)M=-u/(u-l),E=-u*l/(u-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return f[0]=m,f[4]=0,f[8]=x,f[12]=0,f[1]=0,f[5]=g,f[9]=S,f[13]=0,f[2]=0,f[6]=0,f[10]=M,f[14]=E,f[3]=0,f[7]=0,f[11]=-1,f[15]=0,this}makeOrthographic(e,t,s,o,l,u,d=Ci,h=!1){const f=this.elements,m=2/(t-e),g=2/(s-o),x=-(t+e)/(t-e),S=-(s+o)/(s-o);let M,E;if(h)M=1/(u-l),E=u/(u-l);else if(d===Ci)M=-2/(u-l),E=-(u+l)/(u-l);else if(d===Ac)M=-1/(u-l),E=-l/(u-l);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return f[0]=m,f[4]=0,f[8]=0,f[12]=x,f[1]=0,f[5]=g,f[9]=0,f[13]=S,f[2]=0,f[6]=0,f[10]=M,f[14]=E,f[3]=0,f[7]=0,f[11]=0,f[15]=1,this}equals(e){const t=this.elements,s=e.elements;for(let o=0;o<16;o++)if(t[o]!==s[o])return!1;return!0}fromArray(e,t=0){for(let s=0;s<16;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){const s=this.elements;return e[t]=s[0],e[t+1]=s[1],e[t+2]=s[2],e[t+3]=s[3],e[t+4]=s[4],e[t+5]=s[5],e[t+6]=s[6],e[t+7]=s[7],e[t+8]=s[8],e[t+9]=s[9],e[t+10]=s[10],e[t+11]=s[11],e[t+12]=s[12],e[t+13]=s[13],e[t+14]=s[14],e[t+15]=s[15],e}}const Ys=new Z,fi=new Yt,eM=new Z(0,0,0),tM=new Z(1,1,1),Cr=new Z,Xl=new Z,jn=new Z,Bg=new Yt,Hg=new ba;class Pi{constructor(e=0,t=0,s=0,o=Pi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=s,this._order=o}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,s,o=this._order){return this._x=e,this._y=t,this._z=s,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,s=!0){const o=e.elements,l=o[0],u=o[4],d=o[8],h=o[1],f=o[5],m=o[9],g=o[2],x=o[6],S=o[10];switch(t){case"XYZ":this._y=Math.asin(St(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-m,S),this._z=Math.atan2(-u,l)):(this._x=Math.atan2(x,f),this._z=0);break;case"YXZ":this._x=Math.asin(-St(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(d,S),this._z=Math.atan2(h,f)):(this._y=Math.atan2(-g,l),this._z=0);break;case"ZXY":this._x=Math.asin(St(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-g,S),this._z=Math.atan2(-u,f)):(this._y=0,this._z=Math.atan2(h,l));break;case"ZYX":this._y=Math.asin(-St(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(x,S),this._z=Math.atan2(h,l)):(this._x=0,this._z=Math.atan2(-u,f));break;case"YZX":this._z=Math.asin(St(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-m,f),this._y=Math.atan2(-g,l)):(this._x=0,this._y=Math.atan2(d,S));break;case"XZY":this._z=Math.asin(-St(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(x,f),this._y=Math.atan2(d,l)):(this._x=Math.atan2(-m,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,s){return Bg.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bg,t,s)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Hg.setFromEuler(this),this.setFromQuaternion(Hg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Pi.DEFAULT_ORDER="XYZ";class R0{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let nM=0;const Vg=new Z,qs=new ba,Xi=new Yt,$l=new Z,aa=new Z,iM=new Z,rM=new ba,Gg=new Z(1,0,0),Wg=new Z(0,1,0),jg=new Z(0,0,1),Xg={type:"added"},sM={type:"removed"},Ks={type:"childadded",child:null},kd={type:"childremoved",child:null};class on extends _o{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nM++}),this.uuid=Ta(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=on.DEFAULT_UP.clone();const e=new Z,t=new Pi,s=new ba,o=new Z(1,1,1);function l(){s.setFromEuler(t,!1)}function u(){t.setFromQuaternion(s,void 0,!1)}t._onChange(l),s._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Yt},normalMatrix:{value:new mt}}),this.matrix=new Yt,this.matrixWorld=new Yt,this.matrixAutoUpdate=on.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=on.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new R0,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return qs.setFromAxisAngle(e,t),this.quaternion.multiply(qs),this}rotateOnWorldAxis(e,t){return qs.setFromAxisAngle(e,t),this.quaternion.premultiply(qs),this}rotateX(e){return this.rotateOnAxis(Gg,e)}rotateY(e){return this.rotateOnAxis(Wg,e)}rotateZ(e){return this.rotateOnAxis(jg,e)}translateOnAxis(e,t){return Vg.copy(e).applyQuaternion(this.quaternion),this.position.add(Vg.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gg,e)}translateY(e){return this.translateOnAxis(Wg,e)}translateZ(e){return this.translateOnAxis(jg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Xi.copy(this.matrixWorld).invert())}lookAt(e,t,s){e.isVector3?$l.copy(e):$l.set(e,t,s);const o=this.parent;this.updateWorldMatrix(!0,!1),aa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xi.lookAt(aa,$l,this.up):Xi.lookAt($l,aa,this.up),this.quaternion.setFromRotationMatrix(Xi),o&&(Xi.extractRotation(o.matrixWorld),qs.setFromRotationMatrix(Xi),this.quaternion.premultiply(qs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Xg),Ks.child=e,this.dispatchEvent(Ks),Ks.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(sM),kd.child=e,this.dispatchEvent(kd),kd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Xi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Xi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Xi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Xg),Ks.child=e,this.dispatchEvent(Ks),Ks.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let s=0,o=this.children.length;s<o;s++){const u=this.children[s].getObjectByProperty(e,t);if(u!==void 0)return u}}getObjectsByProperty(e,t,s=[]){this[e]===t&&s.push(this);const o=this.children;for(let l=0,u=o.length;l<u;l++)o[l].getObjectsByProperty(e,t,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(aa,e,iM),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(aa,rM,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let s=0,o=t.length;s<o;s++)t[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let s=0,o=t.length;s<o;s++)t[s].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let s=0,o=t.length;s<o;s++)t[s].updateMatrixWorld(e)}updateWorldMatrix(e,t){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const o=this.children;for(let l=0,u=o.length;l<u;l++)o[l].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",s={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),o.instanceInfo=this._instanceInfo.map(d=>({...d})),o.availableInstanceIds=this._availableInstanceIds.slice(),o.availableGeometryIds=this._availableGeometryIds.slice(),o.nextIndexStart=this._nextIndexStart,o.nextVertexStart=this._nextVertexStart,o.geometryCount=this._geometryCount,o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.matricesTexture=this._matricesTexture.toJSON(e),o.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(o.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(o.boundingBox=this.boundingBox.toJSON()));function l(d,h){return d[h.uuid]===void 0&&(d[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=l(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const h=d.shapes;if(Array.isArray(h))for(let f=0,m=h.length;f<m;f++){const g=h[f];l(e.shapes,g)}else l(e.shapes,h)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let h=0,f=this.material.length;h<f;h++)d.push(l(e.materials,this.material[h]));o.material=d}else o.material=l(e.materials,this.material);if(this.children.length>0){o.children=[];for(let d=0;d<this.children.length;d++)o.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){o.animations=[];for(let d=0;d<this.animations.length;d++){const h=this.animations[d];o.animations.push(l(e.animations,h))}}if(t){const d=u(e.geometries),h=u(e.materials),f=u(e.textures),m=u(e.images),g=u(e.shapes),x=u(e.skeletons),S=u(e.animations),M=u(e.nodes);d.length>0&&(s.geometries=d),h.length>0&&(s.materials=h),f.length>0&&(s.textures=f),m.length>0&&(s.images=m),g.length>0&&(s.shapes=g),x.length>0&&(s.skeletons=x),S.length>0&&(s.animations=S),M.length>0&&(s.nodes=M)}return s.object=o,s;function u(d){const h=[];for(const f in d){const m=d[f];delete m.metadata,h.push(m)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let s=0;s<e.children.length;s++){const o=e.children[s];this.add(o.clone())}return this}}on.DEFAULT_UP=new Z(0,1,0);on.DEFAULT_MATRIX_AUTO_UPDATE=!0;on.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const hi=new Z,$i=new Z,zd=new Z,Yi=new Z,Zs=new Z,Qs=new Z,$g=new Z,Bd=new Z,Hd=new Z,Vd=new Z,Gd=new Ut,Wd=new Ut,jd=new Ut;class pi{constructor(e=new Z,t=new Z,s=new Z){this.a=e,this.b=t,this.c=s}static getNormal(e,t,s,o){o.subVectors(s,t),hi.subVectors(e,t),o.cross(hi);const l=o.lengthSq();return l>0?o.multiplyScalar(1/Math.sqrt(l)):o.set(0,0,0)}static getBarycoord(e,t,s,o,l){hi.subVectors(o,t),$i.subVectors(s,t),zd.subVectors(e,t);const u=hi.dot(hi),d=hi.dot($i),h=hi.dot(zd),f=$i.dot($i),m=$i.dot(zd),g=u*f-d*d;if(g===0)return l.set(0,0,0),null;const x=1/g,S=(f*h-d*m)*x,M=(u*m-d*h)*x;return l.set(1-S-M,M,S)}static containsPoint(e,t,s,o){return this.getBarycoord(e,t,s,o,Yi)===null?!1:Yi.x>=0&&Yi.y>=0&&Yi.x+Yi.y<=1}static getInterpolation(e,t,s,o,l,u,d,h){return this.getBarycoord(e,t,s,o,Yi)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(l,Yi.x),h.addScaledVector(u,Yi.y),h.addScaledVector(d,Yi.z),h)}static getInterpolatedAttribute(e,t,s,o,l,u){return Gd.setScalar(0),Wd.setScalar(0),jd.setScalar(0),Gd.fromBufferAttribute(e,t),Wd.fromBufferAttribute(e,s),jd.fromBufferAttribute(e,o),u.setScalar(0),u.addScaledVector(Gd,l.x),u.addScaledVector(Wd,l.y),u.addScaledVector(jd,l.z),u}static isFrontFacing(e,t,s,o){return hi.subVectors(s,t),$i.subVectors(e,t),hi.cross($i).dot(o)<0}set(e,t,s){return this.a.copy(e),this.b.copy(t),this.c.copy(s),this}setFromPointsAndIndices(e,t,s,o){return this.a.copy(e[t]),this.b.copy(e[s]),this.c.copy(e[o]),this}setFromAttributeAndIndices(e,t,s,o){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,o),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return hi.subVectors(this.c,this.b),$i.subVectors(this.a,this.b),hi.cross($i).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return pi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return pi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,s,o,l){return pi.getInterpolation(e,this.a,this.b,this.c,t,s,o,l)}containsPoint(e){return pi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return pi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const s=this.a,o=this.b,l=this.c;let u,d;Zs.subVectors(o,s),Qs.subVectors(l,s),Bd.subVectors(e,s);const h=Zs.dot(Bd),f=Qs.dot(Bd);if(h<=0&&f<=0)return t.copy(s);Hd.subVectors(e,o);const m=Zs.dot(Hd),g=Qs.dot(Hd);if(m>=0&&g<=m)return t.copy(o);const x=h*g-m*f;if(x<=0&&h>=0&&m<=0)return u=h/(h-m),t.copy(s).addScaledVector(Zs,u);Vd.subVectors(e,l);const S=Zs.dot(Vd),M=Qs.dot(Vd);if(M>=0&&S<=M)return t.copy(l);const E=S*f-h*M;if(E<=0&&f>=0&&M<=0)return d=f/(f-M),t.copy(s).addScaledVector(Qs,d);const y=m*M-S*g;if(y<=0&&g-m>=0&&S-M>=0)return $g.subVectors(l,o),d=(g-m)/(g-m+(S-M)),t.copy(o).addScaledVector($g,d);const _=1/(y+E+x);return u=E*_,d=x*_,t.copy(s).addScaledVector(Zs,u).addScaledVector(Qs,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const P0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Rr={h:0,s:0,l:0},Yl={h:0,s:0,l:0};function Xd(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Et{constructor(e,t,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,s)}set(e,t,s){if(t===void 0&&s===void 0){const o=e;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(e,t,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ni){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ct.colorSpaceToWorking(this,t),this}setRGB(e,t,s,o=Ct.workingColorSpace){return this.r=e,this.g=t,this.b=s,Ct.colorSpaceToWorking(this,o),this}setHSL(e,t,s,o=Ct.workingColorSpace){if(e=WE(e,1),t=St(t,0,1),s=St(s,0,1),t===0)this.r=this.g=this.b=s;else{const l=s<=.5?s*(1+t):s+t-s*t,u=2*s-l;this.r=Xd(u,l,e+1/3),this.g=Xd(u,l,e),this.b=Xd(u,l,e-1/3)}return Ct.colorSpaceToWorking(this,o),this}setStyle(e,t=ni){function s(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const u=o[1],d=o[2];switch(u){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=o[1],u=l.length;if(u===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(u===6)return this.setHex(parseInt(l,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ni){const s=P0[e.toLowerCase()];return s!==void 0?this.setHex(s,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ji(e.r),this.g=Ji(e.g),this.b=Ji(e.b),this}copyLinearToSRGB(e){return this.r=lo(e.r),this.g=lo(e.g),this.b=lo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ni){return Ct.workingToColorSpace(wn.copy(this),e),Math.round(St(wn.r*255,0,255))*65536+Math.round(St(wn.g*255,0,255))*256+Math.round(St(wn.b*255,0,255))}getHexString(e=ni){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ct.workingColorSpace){Ct.workingToColorSpace(wn.copy(this),t);const s=wn.r,o=wn.g,l=wn.b,u=Math.max(s,o,l),d=Math.min(s,o,l);let h,f;const m=(d+u)/2;if(d===u)h=0,f=0;else{const g=u-d;switch(f=m<=.5?g/(u+d):g/(2-u-d),u){case s:h=(o-l)/g+(o<l?6:0);break;case o:h=(l-s)/g+2;break;case l:h=(s-o)/g+4;break}h/=6}return e.h=h,e.s=f,e.l=m,e}getRGB(e,t=Ct.workingColorSpace){return Ct.workingToColorSpace(wn.copy(this),t),e.r=wn.r,e.g=wn.g,e.b=wn.b,e}getStyle(e=ni){Ct.workingToColorSpace(wn.copy(this),e);const t=wn.r,s=wn.g,o=wn.b;return e!==ni?`color(${e} ${t.toFixed(3)} ${s.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(s*255)},${Math.round(o*255)})`}offsetHSL(e,t,s){return this.getHSL(Rr),this.setHSL(Rr.h+e,Rr.s+t,Rr.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,s){return this.r=e.r+(t.r-e.r)*s,this.g=e.g+(t.g-e.g)*s,this.b=e.b+(t.b-e.b)*s,this}lerpHSL(e,t){this.getHSL(Rr),e.getHSL(Yl);const s=Cd(Rr.h,Yl.h,t),o=Cd(Rr.s,Yl.s,t),l=Cd(Rr.l,Yl.l,t);return this.setHSL(s,o,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,s=this.g,o=this.b,l=e.elements;return this.r=l[0]*t+l[3]*s+l[6]*o,this.g=l[1]*t+l[4]*s+l[7]*o,this.b=l[2]*t+l[5]*s+l[8]*o,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const wn=new Et;Et.NAMES=P0;let oM=0;class xo extends _o{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:oM++}),this.uuid=Ta(),this.name="",this.type="Material",this.blending=ao,this.side=Fr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Mf,this.blendDst=wf,this.blendEquation=cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Et(0,0,0),this.blendAlpha=0,this.depthFunc=uo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Dg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gs,this.stencilZFail=Gs,this.stencilZPass=Gs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const s=e[t];if(s===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(s):o&&o.isVector3&&s&&s.isVector3?o.copy(s):this[t]=s}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==ao&&(s.blending=this.blending),this.side!==Fr&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==Mf&&(s.blendSrc=this.blendSrc),this.blendDst!==wf&&(s.blendDst=this.blendDst),this.blendEquation!==cs&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==uo&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Dg&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gs&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Gs&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Gs&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function o(l){const u=[];for(const d in l){const h=l[d];delete h.metadata,u.push(h)}return u}if(t){const l=o(e.textures),u=o(e.images);l.length>0&&(s.textures=l),u.length>0&&(s.images=u)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let s=null;if(t!==null){const o=t.length;s=new Array(o);for(let l=0;l!==o;++l)s[l]=t[l].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class L0 extends xo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pi,this.combine=p0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const en=new Z,ql=new Tt;let aM=0;class vi{constructor(e,t,s=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:aM++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=s,this.usage=Ig,this.updateRanges=[],this.gpuType=Zi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,s){e*=this.itemSize,s*=t.itemSize;for(let o=0,l=this.itemSize;o<l;o++)this.array[e+o]=t.array[s+o];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,s=this.count;t<s;t++)ql.fromBufferAttribute(this,t),ql.applyMatrix3(e),this.setXY(t,ql.x,ql.y);else if(this.itemSize===3)for(let t=0,s=this.count;t<s;t++)en.fromBufferAttribute(this,t),en.applyMatrix3(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyMatrix4(e){for(let t=0,s=this.count;t<s;t++)en.fromBufferAttribute(this,t),en.applyMatrix4(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyNormalMatrix(e){for(let t=0,s=this.count;t<s;t++)en.fromBufferAttribute(this,t),en.applyNormalMatrix(e),this.setXYZ(t,en.x,en.y,en.z);return this}transformDirection(e){for(let t=0,s=this.count;t<s;t++)en.fromBufferAttribute(this,t),en.transformDirection(e),this.setXYZ(t,en.x,en.y,en.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let s=this.array[e*this.itemSize+t];return this.normalized&&(s=ra(s,this.array)),s}setComponent(e,t,s){return this.normalized&&(s=Fn(s,this.array)),this.array[e*this.itemSize+t]=s,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ra(t,this.array)),t}setX(e,t){return this.normalized&&(t=Fn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ra(t,this.array)),t}setY(e,t){return this.normalized&&(t=Fn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ra(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Fn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ra(t,this.array)),t}setW(e,t){return this.normalized&&(t=Fn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,s){return e*=this.itemSize,this.normalized&&(t=Fn(t,this.array),s=Fn(s,this.array)),this.array[e+0]=t,this.array[e+1]=s,this}setXYZ(e,t,s,o){return e*=this.itemSize,this.normalized&&(t=Fn(t,this.array),s=Fn(s,this.array),o=Fn(o,this.array)),this.array[e+0]=t,this.array[e+1]=s,this.array[e+2]=o,this}setXYZW(e,t,s,o,l){return e*=this.itemSize,this.normalized&&(t=Fn(t,this.array),s=Fn(s,this.array),o=Fn(o,this.array),l=Fn(l,this.array)),this.array[e+0]=t,this.array[e+1]=s,this.array[e+2]=o,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ig&&(e.usage=this.usage),e}}class N0 extends vi{constructor(e,t,s){super(new Uint16Array(e),t,s)}}class D0 extends vi{constructor(e,t,s){super(new Uint32Array(e),t,s)}}class $n extends vi{constructor(e,t,s){super(new Float32Array(e),t,s)}}let lM=0;const ti=new Yt,$d=new on,Js=new Z,Xn=new Aa,la=new Aa,hn=new Z;class xi extends _o{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lM++}),this.uuid=Ta(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(b0(e)?D0:N0)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,s=0){this.groups.push({start:e,count:t,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const l=new mt().getNormalMatrix(e);s.applyNormalMatrix(l),s.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ti.makeRotationFromQuaternion(e),this.applyMatrix4(ti),this}rotateX(e){return ti.makeRotationX(e),this.applyMatrix4(ti),this}rotateY(e){return ti.makeRotationY(e),this.applyMatrix4(ti),this}rotateZ(e){return ti.makeRotationZ(e),this.applyMatrix4(ti),this}translate(e,t,s){return ti.makeTranslation(e,t,s),this.applyMatrix4(ti),this}scale(e,t,s){return ti.makeScale(e,t,s),this.applyMatrix4(ti),this}lookAt(e){return $d.lookAt(e),$d.updateMatrix(),this.applyMatrix4($d.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Js).negate(),this.translate(Js.x,Js.y,Js.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const s=[];for(let o=0,l=e.length;o<l;o++){const u=e[o];s.push(u.x,u.y,u.z||0)}this.setAttribute("position",new $n(s,3))}else{const s=Math.min(e.length,t.count);for(let o=0;o<s;o++){const l=e[o];t.setXYZ(o,l.x,l.y,l.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Aa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Z(-1/0,-1/0,-1/0),new Z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const l=t[s];Xn.setFromBufferAttribute(l),this.morphTargetsRelative?(hn.addVectors(this.boundingBox.min,Xn.min),this.boundingBox.expandByPoint(hn),hn.addVectors(this.boundingBox.max,Xn.max),this.boundingBox.expandByPoint(hn)):(this.boundingBox.expandByPoint(Xn.min),this.boundingBox.expandByPoint(Xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Dc);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Z,1/0);return}if(e){const s=this.boundingSphere.center;if(Xn.setFromBufferAttribute(e),t)for(let l=0,u=t.length;l<u;l++){const d=t[l];la.setFromBufferAttribute(d),this.morphTargetsRelative?(hn.addVectors(Xn.min,la.min),Xn.expandByPoint(hn),hn.addVectors(Xn.max,la.max),Xn.expandByPoint(hn)):(Xn.expandByPoint(la.min),Xn.expandByPoint(la.max))}Xn.getCenter(s);let o=0;for(let l=0,u=e.count;l<u;l++)hn.fromBufferAttribute(e,l),o=Math.max(o,s.distanceToSquared(hn));if(t)for(let l=0,u=t.length;l<u;l++){const d=t[l],h=this.morphTargetsRelative;for(let f=0,m=d.count;f<m;f++)hn.fromBufferAttribute(d,f),h&&(Js.fromBufferAttribute(e,f),hn.add(Js)),o=Math.max(o,s.distanceToSquared(hn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=t.position,o=t.normal,l=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new vi(new Float32Array(4*s.count),4));const u=this.getAttribute("tangent"),d=[],h=[];for(let z=0;z<s.count;z++)d[z]=new Z,h[z]=new Z;const f=new Z,m=new Z,g=new Z,x=new Tt,S=new Tt,M=new Tt,E=new Z,y=new Z;function _(z,C,R){f.fromBufferAttribute(s,z),m.fromBufferAttribute(s,C),g.fromBufferAttribute(s,R),x.fromBufferAttribute(l,z),S.fromBufferAttribute(l,C),M.fromBufferAttribute(l,R),m.sub(f),g.sub(f),S.sub(x),M.sub(x);const G=1/(S.x*M.y-M.x*S.y);isFinite(G)&&(E.copy(m).multiplyScalar(M.y).addScaledVector(g,-S.y).multiplyScalar(G),y.copy(g).multiplyScalar(S.x).addScaledVector(m,-M.x).multiplyScalar(G),d[z].add(E),d[C].add(E),d[R].add(E),h[z].add(y),h[C].add(y),h[R].add(y))}let N=this.groups;N.length===0&&(N=[{start:0,count:e.count}]);for(let z=0,C=N.length;z<C;++z){const R=N[z],G=R.start,q=R.count;for(let ie=G,Q=G+q;ie<Q;ie+=3)_(e.getX(ie+0),e.getX(ie+1),e.getX(ie+2))}const P=new Z,b=new Z,k=new Z,B=new Z;function I(z){k.fromBufferAttribute(o,z),B.copy(k);const C=d[z];P.copy(C),P.sub(k.multiplyScalar(k.dot(C))).normalize(),b.crossVectors(B,C);const G=b.dot(h[z])<0?-1:1;u.setXYZW(z,P.x,P.y,P.z,G)}for(let z=0,C=N.length;z<C;++z){const R=N[z],G=R.start,q=R.count;for(let ie=G,Q=G+q;ie<Q;ie+=3)I(e.getX(ie+0)),I(e.getX(ie+1)),I(e.getX(ie+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new vi(new Float32Array(t.count*3),3),this.setAttribute("normal",s);else for(let x=0,S=s.count;x<S;x++)s.setXYZ(x,0,0,0);const o=new Z,l=new Z,u=new Z,d=new Z,h=new Z,f=new Z,m=new Z,g=new Z;if(e)for(let x=0,S=e.count;x<S;x+=3){const M=e.getX(x+0),E=e.getX(x+1),y=e.getX(x+2);o.fromBufferAttribute(t,M),l.fromBufferAttribute(t,E),u.fromBufferAttribute(t,y),m.subVectors(u,l),g.subVectors(o,l),m.cross(g),d.fromBufferAttribute(s,M),h.fromBufferAttribute(s,E),f.fromBufferAttribute(s,y),d.add(m),h.add(m),f.add(m),s.setXYZ(M,d.x,d.y,d.z),s.setXYZ(E,h.x,h.y,h.z),s.setXYZ(y,f.x,f.y,f.z)}else for(let x=0,S=t.count;x<S;x+=3)o.fromBufferAttribute(t,x+0),l.fromBufferAttribute(t,x+1),u.fromBufferAttribute(t,x+2),m.subVectors(u,l),g.subVectors(o,l),m.cross(g),s.setXYZ(x+0,m.x,m.y,m.z),s.setXYZ(x+1,m.x,m.y,m.z),s.setXYZ(x+2,m.x,m.y,m.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,s=e.count;t<s;t++)hn.fromBufferAttribute(e,t),hn.normalize(),e.setXYZ(t,hn.x,hn.y,hn.z)}toNonIndexed(){function e(d,h){const f=d.array,m=d.itemSize,g=d.normalized,x=new f.constructor(h.length*m);let S=0,M=0;for(let E=0,y=h.length;E<y;E++){d.isInterleavedBufferAttribute?S=h[E]*d.data.stride+d.offset:S=h[E]*m;for(let _=0;_<m;_++)x[M++]=f[S++]}return new vi(x,m,g)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new xi,s=this.index.array,o=this.attributes;for(const d in o){const h=o[d],f=e(h,s);t.setAttribute(d,f)}const l=this.morphAttributes;for(const d in l){const h=[],f=l[d];for(let m=0,g=f.length;m<g;m++){const x=f[m],S=e(x,s);h.push(S)}t.morphAttributes[d]=h}t.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let d=0,h=u.length;d<h;d++){const f=u[d];t.addGroup(f.start,f.count,f.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const f in h)h[f]!==void 0&&(e[f]=h[f]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const s=this.attributes;for(const h in s){const f=s[h];e.data.attributes[h]=f.toJSON(e.data)}const o={};let l=!1;for(const h in this.morphAttributes){const f=this.morphAttributes[h],m=[];for(let g=0,x=f.length;g<x;g++){const S=f[g];m.push(S.toJSON(e.data))}m.length>0&&(o[h]=m,l=!0)}l&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere=d.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone());const o=e.attributes;for(const f in o){const m=o[f];this.setAttribute(f,m.clone(t))}const l=e.morphAttributes;for(const f in l){const m=[],g=l[f];for(let x=0,S=g.length;x<S;x++)m.push(g[x].clone(t));this.morphAttributes[f]=m}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let f=0,m=u.length;f<m;f++){const g=u[f];this.addGroup(g.start,g.count,g.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Yg=new Yt,is=new C0,Kl=new Dc,qg=new Z,Zl=new Z,Ql=new Z,Jl=new Z,Yd=new Z,ec=new Z,Kg=new Z,tc=new Z;class ii extends on{constructor(e=new xi,t=new L0){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,s=Object.keys(t);if(s.length>0){const o=t[s[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=o.length;l<u;l++){const d=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=l}}}}getVertexPosition(e,t){const s=this.geometry,o=s.attributes.position,l=s.morphAttributes.position,u=s.morphTargetsRelative;t.fromBufferAttribute(o,e);const d=this.morphTargetInfluences;if(l&&d){ec.set(0,0,0);for(let h=0,f=l.length;h<f;h++){const m=d[h],g=l[h];m!==0&&(Yd.fromBufferAttribute(g,e),u?ec.addScaledVector(Yd,m):ec.addScaledVector(Yd.sub(t),m))}t.add(ec)}return t}raycast(e,t){const s=this.geometry,o=this.material,l=this.matrixWorld;o!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Kl.copy(s.boundingSphere),Kl.applyMatrix4(l),is.copy(e.ray).recast(e.near),!(Kl.containsPoint(is.origin)===!1&&(is.intersectSphere(Kl,qg)===null||is.origin.distanceToSquared(qg)>(e.far-e.near)**2))&&(Yg.copy(l).invert(),is.copy(e.ray).applyMatrix4(Yg),!(s.boundingBox!==null&&is.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,t,is)))}_computeIntersections(e,t,s){let o;const l=this.geometry,u=this.material,d=l.index,h=l.attributes.position,f=l.attributes.uv,m=l.attributes.uv1,g=l.attributes.normal,x=l.groups,S=l.drawRange;if(d!==null)if(Array.isArray(u))for(let M=0,E=x.length;M<E;M++){const y=x[M],_=u[y.materialIndex],N=Math.max(y.start,S.start),P=Math.min(d.count,Math.min(y.start+y.count,S.start+S.count));for(let b=N,k=P;b<k;b+=3){const B=d.getX(b),I=d.getX(b+1),z=d.getX(b+2);o=nc(this,_,e,s,f,m,g,B,I,z),o&&(o.faceIndex=Math.floor(b/3),o.face.materialIndex=y.materialIndex,t.push(o))}}else{const M=Math.max(0,S.start),E=Math.min(d.count,S.start+S.count);for(let y=M,_=E;y<_;y+=3){const N=d.getX(y),P=d.getX(y+1),b=d.getX(y+2);o=nc(this,u,e,s,f,m,g,N,P,b),o&&(o.faceIndex=Math.floor(y/3),t.push(o))}}else if(h!==void 0)if(Array.isArray(u))for(let M=0,E=x.length;M<E;M++){const y=x[M],_=u[y.materialIndex],N=Math.max(y.start,S.start),P=Math.min(h.count,Math.min(y.start+y.count,S.start+S.count));for(let b=N,k=P;b<k;b+=3){const B=b,I=b+1,z=b+2;o=nc(this,_,e,s,f,m,g,B,I,z),o&&(o.faceIndex=Math.floor(b/3),o.face.materialIndex=y.materialIndex,t.push(o))}}else{const M=Math.max(0,S.start),E=Math.min(h.count,S.start+S.count);for(let y=M,_=E;y<_;y+=3){const N=y,P=y+1,b=y+2;o=nc(this,u,e,s,f,m,g,N,P,b),o&&(o.faceIndex=Math.floor(y/3),t.push(o))}}}}function cM(i,e,t,s,o,l,u,d){let h;if(e.side===kn?h=s.intersectTriangle(u,l,o,!0,d):h=s.intersectTriangle(o,l,u,e.side===Fr,d),h===null)return null;tc.copy(d),tc.applyMatrix4(i.matrixWorld);const f=t.ray.origin.distanceTo(tc);return f<t.near||f>t.far?null:{distance:f,point:tc.clone(),object:i}}function nc(i,e,t,s,o,l,u,d,h,f){i.getVertexPosition(d,Zl),i.getVertexPosition(h,Ql),i.getVertexPosition(f,Jl);const m=cM(i,e,t,s,Zl,Ql,Jl,Kg);if(m){const g=new Z;pi.getBarycoord(Kg,Zl,Ql,Jl,g),o&&(m.uv=pi.getInterpolatedAttribute(o,d,h,f,g,new Tt)),l&&(m.uv1=pi.getInterpolatedAttribute(l,d,h,f,g,new Tt)),u&&(m.normal=pi.getInterpolatedAttribute(u,d,h,f,g,new Z),m.normal.dot(s.direction)>0&&m.normal.multiplyScalar(-1));const x={a:d,b:h,c:f,normal:new Z,materialIndex:0};pi.getNormal(Zl,Ql,Jl,x.normal),m.face=x,m.barycoord=g}return m}class yo extends xi{constructor(e=1,t=1,s=1,o=1,l=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:s,widthSegments:o,heightSegments:l,depthSegments:u};const d=this;o=Math.floor(o),l=Math.floor(l),u=Math.floor(u);const h=[],f=[],m=[],g=[];let x=0,S=0;M("z","y","x",-1,-1,s,t,e,u,l,0),M("z","y","x",1,-1,s,t,-e,u,l,1),M("x","z","y",1,1,e,s,t,o,u,2),M("x","z","y",1,-1,e,s,-t,o,u,3),M("x","y","z",1,-1,e,t,s,o,l,4),M("x","y","z",-1,-1,e,t,-s,o,l,5),this.setIndex(h),this.setAttribute("position",new $n(f,3)),this.setAttribute("normal",new $n(m,3)),this.setAttribute("uv",new $n(g,2));function M(E,y,_,N,P,b,k,B,I,z,C){const R=b/I,G=k/z,q=b/2,ie=k/2,Q=B/2,re=I+1,te=z+1;let de=0,U=0;const fe=new Z;for(let ue=0;ue<te;ue++){const H=ue*G-ie;for(let ae=0;ae<re;ae++){const Ae=ae*R-q;fe[E]=Ae*N,fe[y]=H*P,fe[_]=Q,f.push(fe.x,fe.y,fe.z),fe[E]=0,fe[y]=0,fe[_]=B>0?1:-1,m.push(fe.x,fe.y,fe.z),g.push(ae/I),g.push(1-ue/z),de+=1}}for(let ue=0;ue<z;ue++)for(let H=0;H<I;H++){const ae=x+H+re*ue,Ae=x+H+re*(ue+1),Re=x+(H+1)+re*(ue+1),Fe=x+(H+1)+re*ue;h.push(ae,Ae,Fe),h.push(Ae,Re,Fe),U+=6}d.addGroup(S,U,C),S+=U,x+=de}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function mo(i){const e={};for(const t in i){e[t]={};for(const s in i[t]){const o=i[t][s];o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)?o.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][s]=null):e[t][s]=o.clone():Array.isArray(o)?e[t][s]=o.slice():e[t][s]=o}}return e}function Rn(i){const e={};for(let t=0;t<i.length;t++){const s=mo(i[t]);for(const o in s)e[o]=s[o]}return e}function uM(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function I0(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ct.workingColorSpace}const dM={clone:mo,merge:Rn};var fM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Or extends xo{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fM,this.fragmentShader=hM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=mo(e.uniforms),this.uniformsGroups=uM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const o in this.uniforms){const u=this.uniforms[o].value;u&&u.isTexture?t.uniforms[o]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?t.uniforms[o]={type:"c",value:u.getHex()}:u&&u.isVector2?t.uniforms[o]={type:"v2",value:u.toArray()}:u&&u.isVector3?t.uniforms[o]={type:"v3",value:u.toArray()}:u&&u.isVector4?t.uniforms[o]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?t.uniforms[o]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?t.uniforms[o]={type:"m4",value:u.toArray()}:t.uniforms[o]={value:u}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const s={};for(const o in this.extensions)this.extensions[o]===!0&&(s[o]=!0);return Object.keys(s).length>0&&(t.extensions=s),t}}class U0 extends on{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Yt,this.projectionMatrix=new Yt,this.projectionMatrixInverse=new Yt,this.coordinateSystem=Ci,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Pr=new Z,Zg=new Tt,Qg=new Tt;class On extends U0{constructor(e=50,t=1,s=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=o,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Cc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ad*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Cc*2*Math.atan(Math.tan(Ad*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,s){Pr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Pr.x,Pr.y).multiplyScalar(-e/Pr.z),Pr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(Pr.x,Pr.y).multiplyScalar(-e/Pr.z)}getViewSize(e,t){return this.getViewBounds(e,Zg,Qg),t.subVectors(Qg,Zg)}setViewOffset(e,t,s,o,l,u){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=s,this.view.offsetY=o,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ad*.5*this.fov)/this.zoom,s=2*t,o=this.aspect*s,l=-.5*o;const u=this.view;if(this.view!==null&&this.view.enabled){const h=u.fullWidth,f=u.fullHeight;l+=u.offsetX*o/h,t-=u.offsetY*s/f,o*=u.width/h,s*=u.height/f}const d=this.filmOffset;d!==0&&(l+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+o,t,t-s,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const eo=-90,to=1;class pM extends on{constructor(e,t,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new On(eo,to,e,t);o.layers=this.layers,this.add(o);const l=new On(eo,to,e,t);l.layers=this.layers,this.add(l);const u=new On(eo,to,e,t);u.layers=this.layers,this.add(u);const d=new On(eo,to,e,t);d.layers=this.layers,this.add(d);const h=new On(eo,to,e,t);h.layers=this.layers,this.add(h);const f=new On(eo,to,e,t);f.layers=this.layers,this.add(f)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[s,o,l,u,d,h]=t;for(const f of t)this.remove(f);if(e===Ci)s.up.set(0,1,0),s.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===Ac)s.up.set(0,-1,0),s.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const f of t)this.add(f),f.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:o}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,u,d,h,f,m]=this.children,g=e.getRenderTarget(),x=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const E=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,e.setRenderTarget(s,0,o),e.render(t,l),e.setRenderTarget(s,1,o),e.render(t,u),e.setRenderTarget(s,2,o),e.render(t,d),e.setRenderTarget(s,3,o),e.render(t,h),e.setRenderTarget(s,4,o),e.render(t,f),s.texture.generateMipmaps=E,e.setRenderTarget(s,5,o),e.render(t,m),e.setRenderTarget(g,x,S),e.xr.enabled=M,s.texture.needsPMREMUpdate=!0}}class F0 extends zn{constructor(e=[],t=fo,s,o,l,u,d,h,f,m){super(e,t,s,o,l,u,d,h,f,m),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class mM extends ps{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},o=[s,s,s,s,s,s];this.texture=new F0(o),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},o=new yo(5,5,5),l=new Or({name:"CubemapFromEquirect",uniforms:mo(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:kn,blending:Dr});l.uniforms.tEquirect.value=t;const u=new ii(o,l),d=t.minFilter;return t.minFilter===fs&&(t.minFilter=Ai),new pM(1,10,this).update(e,u),t.minFilter=d,u.geometry.dispose(),u.material.dispose(),this}clear(e,t=!0,s=!0,o=!0){const l=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(t,s,o);e.setRenderTarget(l)}}class da extends on{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gM={type:"move"};class qd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new da,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new da,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new da,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const s of e.hand.values())this._getHandJoint(t,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,s){let o=null,l=null,u=null;const d=this._targetRay,h=this._grip,f=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(f&&e.hand){u=!0;for(const E of e.hand.values()){const y=t.getJointPose(E,s),_=this._getHandJoint(f,E);y!==null&&(_.matrix.fromArray(y.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=y.radius),_.visible=y!==null}const m=f.joints["index-finger-tip"],g=f.joints["thumb-tip"],x=m.position.distanceTo(g.position),S=.02,M=.005;f.inputState.pinching&&x>S+M?(f.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!f.inputState.pinching&&x<=S-M&&(f.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,s),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1));d!==null&&(o=t.getPose(e.targetRaySpace,s),o===null&&l!==null&&(o=l),o!==null&&(d.matrix.fromArray(o.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,o.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(o.linearVelocity)):d.hasLinearVelocity=!1,o.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(o.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(gM)))}return d!==null&&(d.visible=o!==null),h!==null&&(h.visible=l!==null),f!==null&&(f.visible=u!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const s=new da;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[t.jointName]=s,e.add(s)}return e.joints[t.jointName]}}class Nh{constructor(e,t=1,s=1e3){this.isFog=!0,this.name="",this.color=new Et(e),this.near=t,this.far=s}clone(){return new Nh(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class vM extends on{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pi,this.environmentIntensity=1,this.environmentRotation=new Pi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Kd=new Z,_M=new Z,xM=new mt;class as{constructor(e=new Z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,s,o){return this.normal.set(e,t,s),this.constant=o,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,s){const o=Kd.subVectors(s,t).cross(_M.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(o,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const s=e.delta(Kd),o=this.normal.dot(s);if(o===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/o;return l<0||l>1?null:t.copy(e.start).addScaledVector(s,l)}intersectsLine(e){const t=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return t<0&&s>0||s<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const s=t||xM.getNormalMatrix(e),o=this.coplanarPoint(Kd).applyMatrix4(e),l=this.normal.applyMatrix3(s).normalize();return this.constant=-o.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const rs=new Dc,yM=new Tt(.5,.5),ic=new Z;class Dh{constructor(e=new as,t=new as,s=new as,o=new as,l=new as,u=new as){this.planes=[e,t,s,o,l,u]}set(e,t,s,o,l,u){const d=this.planes;return d[0].copy(e),d[1].copy(t),d[2].copy(s),d[3].copy(o),d[4].copy(l),d[5].copy(u),this}copy(e){const t=this.planes;for(let s=0;s<6;s++)t[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,t=Ci,s=!1){const o=this.planes,l=e.elements,u=l[0],d=l[1],h=l[2],f=l[3],m=l[4],g=l[5],x=l[6],S=l[7],M=l[8],E=l[9],y=l[10],_=l[11],N=l[12],P=l[13],b=l[14],k=l[15];if(o[0].setComponents(f-u,S-m,_-M,k-N).normalize(),o[1].setComponents(f+u,S+m,_+M,k+N).normalize(),o[2].setComponents(f+d,S+g,_+E,k+P).normalize(),o[3].setComponents(f-d,S-g,_-E,k-P).normalize(),s)o[4].setComponents(h,x,y,b).normalize(),o[5].setComponents(f-h,S-x,_-y,k-b).normalize();else if(o[4].setComponents(f-h,S-x,_-y,k-b).normalize(),t===Ci)o[5].setComponents(f+h,S+x,_+y,k+b).normalize();else if(t===Ac)o[5].setComponents(h,x,y,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),rs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),rs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(rs)}intersectsSprite(e){rs.center.set(0,0,0);const t=yM.distanceTo(e.center);return rs.radius=.7071067811865476+t,rs.applyMatrix4(e.matrixWorld),this.intersectsSphere(rs)}intersectsSphere(e){const t=this.planes,s=e.center,o=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(s)<o)return!1;return!0}intersectsBox(e){const t=this.planes;for(let s=0;s<6;s++){const o=t[s];if(ic.x=o.normal.x>0?e.max.x:e.min.x,ic.y=o.normal.y>0?e.max.y:e.min.y,ic.z=o.normal.z>0?e.max.z:e.min.z,o.distanceToPoint(ic)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let s=0;s<6;s++)if(t[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class O0 extends xo{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Et(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Jg=new Yt,uh=new C0,rc=new Dc,sc=new Z;class SM extends on{constructor(e=new xi,t=new O0){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const s=this.geometry,o=this.matrixWorld,l=e.params.Points.threshold,u=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),rc.copy(s.boundingSphere),rc.applyMatrix4(o),rc.radius+=l,e.ray.intersectsSphere(rc)===!1)return;Jg.copy(o).invert(),uh.copy(e.ray).applyMatrix4(Jg);const d=l/((this.scale.x+this.scale.y+this.scale.z)/3),h=d*d,f=s.index,g=s.attributes.position;if(f!==null){const x=Math.max(0,u.start),S=Math.min(f.count,u.start+u.count);for(let M=x,E=S;M<E;M++){const y=f.getX(M);sc.fromBufferAttribute(g,y),ev(sc,y,h,o,e,t,this)}}else{const x=Math.max(0,u.start),S=Math.min(g.count,u.start+u.count);for(let M=x,E=S;M<E;M++)sc.fromBufferAttribute(g,M),ev(sc,M,h,o,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,s=Object.keys(t);if(s.length>0){const o=t[s[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=o.length;l<u;l++){const d=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=l}}}}}function ev(i,e,t,s,o,l,u){const d=uh.distanceSqToPoint(i);if(d<t){const h=new Z;uh.closestPointToPoint(i,h),h.applyMatrix4(s);const f=o.ray.origin.distanceTo(h);if(f<o.near||f>o.far)return;l.push({distance:f,distanceToRay:Math.sqrt(d),point:h,index:e,face:null,faceIndex:null,barycoord:null,object:u})}}class k0 extends zn{constructor(e,t,s=hs,o,l,u,d=gi,h=gi,f,m=_a,g=1){if(m!==_a&&m!==xa)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const x={width:e,height:t,depth:g};super(x,o,l,u,d,h,m,s,f),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Lh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class z0 extends zn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ih extends xi{constructor(e=1,t=1,s=1,o=32,l=1,u=!1,d=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:s,radialSegments:o,heightSegments:l,openEnded:u,thetaStart:d,thetaLength:h};const f=this;o=Math.floor(o),l=Math.floor(l);const m=[],g=[],x=[],S=[];let M=0;const E=[],y=s/2;let _=0;N(),u===!1&&(e>0&&P(!0),t>0&&P(!1)),this.setIndex(m),this.setAttribute("position",new $n(g,3)),this.setAttribute("normal",new $n(x,3)),this.setAttribute("uv",new $n(S,2));function N(){const b=new Z,k=new Z;let B=0;const I=(t-e)/s;for(let z=0;z<=l;z++){const C=[],R=z/l,G=R*(t-e)+e;for(let q=0;q<=o;q++){const ie=q/o,Q=ie*h+d,re=Math.sin(Q),te=Math.cos(Q);k.x=G*re,k.y=-R*s+y,k.z=G*te,g.push(k.x,k.y,k.z),b.set(re,I,te).normalize(),x.push(b.x,b.y,b.z),S.push(ie,1-R),C.push(M++)}E.push(C)}for(let z=0;z<o;z++)for(let C=0;C<l;C++){const R=E[C][z],G=E[C+1][z],q=E[C+1][z+1],ie=E[C][z+1];(e>0||C!==0)&&(m.push(R,G,ie),B+=3),(t>0||C!==l-1)&&(m.push(G,q,ie),B+=3)}f.addGroup(_,B,0),_+=B}function P(b){const k=M,B=new Tt,I=new Z;let z=0;const C=b===!0?e:t,R=b===!0?1:-1;for(let q=1;q<=o;q++)g.push(0,y*R,0),x.push(0,R,0),S.push(.5,.5),M++;const G=M;for(let q=0;q<=o;q++){const Q=q/o*h+d,re=Math.cos(Q),te=Math.sin(Q);I.x=C*te,I.y=y*R,I.z=C*re,g.push(I.x,I.y,I.z),x.push(0,R,0),B.x=re*.5+.5,B.y=te*.5*R+.5,S.push(B.x,B.y),M++}for(let q=0;q<o;q++){const ie=k+q,Q=G+q;b===!0?m.push(Q,Q+1,ie):m.push(Q+1,Q,ie),z+=3}f.addGroup(_,z,b===!0?1:2),_+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ih(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ic extends xi{constructor(e=1,t=1,s=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:s,heightSegments:o};const l=e/2,u=t/2,d=Math.floor(s),h=Math.floor(o),f=d+1,m=h+1,g=e/d,x=t/h,S=[],M=[],E=[],y=[];for(let _=0;_<m;_++){const N=_*x-u;for(let P=0;P<f;P++){const b=P*g-l;M.push(b,-N,0),E.push(0,0,1),y.push(P/d),y.push(1-_/h)}}for(let _=0;_<h;_++)for(let N=0;N<d;N++){const P=N+f*_,b=N+f*(_+1),k=N+1+f*(_+1),B=N+1+f*_;S.push(P,b,B),S.push(b,k,B)}this.setIndex(S),this.setAttribute("position",new $n(M,3)),this.setAttribute("normal",new $n(E,3)),this.setAttribute("uv",new $n(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ic(e.width,e.height,e.widthSegments,e.heightSegments)}}class Uh extends xi{constructor(e=1,t=.4,s=12,o=48,l=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:s,tubularSegments:o,arc:l},s=Math.floor(s),o=Math.floor(o);const u=[],d=[],h=[],f=[],m=new Z,g=new Z,x=new Z;for(let S=0;S<=s;S++)for(let M=0;M<=o;M++){const E=M/o*l,y=S/s*Math.PI*2;g.x=(e+t*Math.cos(y))*Math.cos(E),g.y=(e+t*Math.cos(y))*Math.sin(E),g.z=t*Math.sin(y),d.push(g.x,g.y,g.z),m.x=e*Math.cos(E),m.y=e*Math.sin(E),x.subVectors(g,m).normalize(),h.push(x.x,x.y,x.z),f.push(M/o),f.push(S/s)}for(let S=1;S<=s;S++)for(let M=1;M<=o;M++){const E=(o+1)*S+M-1,y=(o+1)*(S-1)+M-1,_=(o+1)*(S-1)+M,N=(o+1)*S+M;u.push(E,y,N),u.push(y,_,N)}this.setIndex(u),this.setAttribute("position",new $n(d,3)),this.setAttribute("normal",new $n(h,3)),this.setAttribute("uv",new $n(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Uh(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class dh extends xo{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Et(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Et(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=w0,this.normalScale=new Tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class EM extends dh{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Tt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return St(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Et(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Et(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Et(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class MM extends xo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=IE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class wM extends xo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Uc extends on{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Et(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Zd=new Yt,tv=new Z,nv=new Z;class Fh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Tt(512,512),this.mapType=Ri,this.map=null,this.mapPass=null,this.matrix=new Yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Dh,this._frameExtents=new Tt(1,1),this._viewportCount=1,this._viewports=[new Ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,s=this.matrix;tv.setFromMatrixPosition(e.matrixWorld),t.position.copy(tv),nv.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(nv),t.updateMatrixWorld(),Zd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zd,t.coordinateSystem,t.reversedDepth),t.reversedDepth?s.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(Zd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class TM extends Fh{constructor(){super(new On(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,s=Cc*2*e.angle*this.focus,o=this.mapSize.width/this.mapSize.height*this.aspect,l=e.distance||t.far;(s!==t.fov||o!==t.aspect||l!==t.far)&&(t.fov=s,t.aspect=o,t.far=l,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class bM extends Uc{constructor(e,t,s=0,o=Math.PI/3,l=0,u=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(on.DEFAULT_UP),this.updateMatrix(),this.target=new on,this.distance=s,this.angle=o,this.penumbra=l,this.decay=u,this.map=null,this.shadow=new TM}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const iv=new Yt,ca=new Z,Qd=new Z;class AM extends Fh{constructor(){super(new On(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Tt(4,2),this._viewportCount=6,this._viewports=[new Ut(2,1,1,1),new Ut(0,1,1,1),new Ut(3,1,1,1),new Ut(1,1,1,1),new Ut(3,0,1,1),new Ut(1,0,1,1)],this._cubeDirections=[new Z(1,0,0),new Z(-1,0,0),new Z(0,0,1),new Z(0,0,-1),new Z(0,1,0),new Z(0,-1,0)],this._cubeUps=[new Z(0,1,0),new Z(0,1,0),new Z(0,1,0),new Z(0,1,0),new Z(0,0,1),new Z(0,0,-1)]}updateMatrices(e,t=0){const s=this.camera,o=this.matrix,l=e.distance||s.far;l!==s.far&&(s.far=l,s.updateProjectionMatrix()),ca.setFromMatrixPosition(e.matrixWorld),s.position.copy(ca),Qd.copy(s.position),Qd.add(this._cubeDirections[t]),s.up.copy(this._cubeUps[t]),s.lookAt(Qd),s.updateMatrixWorld(),o.makeTranslation(-ca.x,-ca.y,-ca.z),iv.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),this._frustum.setFromProjectionMatrix(iv,s.coordinateSystem,s.reversedDepth)}}class rv extends Uc{constructor(e,t,s=0,o=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=s,this.decay=o,this.shadow=new AM}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class B0 extends U0{constructor(e=-1,t=1,s=1,o=-1,l=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=s,this.bottom=o,this.near=l,this.far=u,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,s,o,l,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=s,this.view.offsetY=o,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let l=s-e,u=s+e,d=o+t,h=o-t;if(this.view!==null&&this.view.enabled){const f=(this.right-this.left)/this.view.fullWidth/this.zoom,m=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=f*this.view.offsetX,u=l+f*this.view.width,d-=m*this.view.offsetY,h=d-m*this.view.height}this.projectionMatrix.makeOrthographic(l,u,d,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class CM extends Fh{constructor(){super(new B0(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class RM extends Uc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(on.DEFAULT_UP),this.updateMatrix(),this.target=new on,this.shadow=new CM}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class PM extends Uc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class LM extends On{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}function sv(i,e,t,s){const o=NM(s);switch(t){case y0:return i*e;case E0:return i*e/o.components*o.byteLength;case Ch:return i*e/o.components*o.byteLength;case M0:return i*e*2/o.components*o.byteLength;case Rh:return i*e*2/o.components*o.byteLength;case S0:return i*e*3/o.components*o.byteLength;case mi:return i*e*4/o.components*o.byteLength;case Ph:return i*e*4/o.components*o.byteLength;case mc:case gc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case vc:case _c:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Of:case zf:return Math.max(i,16)*Math.max(e,8)/4;case Ff:case kf:return Math.max(i,8)*Math.max(e,8)/2;case Bf:case Hf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Vf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Gf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Wf:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case jf:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Xf:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case $f:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Yf:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case qf:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Kf:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Zf:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Qf:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Jf:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case eh:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case th:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case nh:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ih:case rh:case sh:return Math.ceil(i/4)*Math.ceil(e/4)*16;case oh:case ah:return Math.ceil(i/4)*Math.ceil(e/4)*8;case lh:case ch:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function NM(i){switch(i){case Ri:case g0:return{byteLength:1,components:1};case ga:case v0:case wa:return{byteLength:2,components:1};case bh:case Ah:return{byteLength:2,components:4};case hs:case Th:case Zi:return{byteLength:4,components:1};case _0:case x0:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wh);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function H0(){let i=null,e=!1,t=null,s=null;function o(l,u){t(l,u),s=i.requestAnimationFrame(o)}return{start:function(){e!==!0&&t!==null&&(s=i.requestAnimationFrame(o),e=!0)},stop:function(){i.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){i=l}}}function DM(i){const e=new WeakMap;function t(d,h){const f=d.array,m=d.usage,g=f.byteLength,x=i.createBuffer();i.bindBuffer(h,x),i.bufferData(h,f,m),d.onUploadCallback();let S;if(f instanceof Float32Array)S=i.FLOAT;else if(typeof Float16Array<"u"&&f instanceof Float16Array)S=i.HALF_FLOAT;else if(f instanceof Uint16Array)d.isFloat16BufferAttribute?S=i.HALF_FLOAT:S=i.UNSIGNED_SHORT;else if(f instanceof Int16Array)S=i.SHORT;else if(f instanceof Uint32Array)S=i.UNSIGNED_INT;else if(f instanceof Int32Array)S=i.INT;else if(f instanceof Int8Array)S=i.BYTE;else if(f instanceof Uint8Array)S=i.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)S=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:x,type:S,bytesPerElement:f.BYTES_PER_ELEMENT,version:d.version,size:g}}function s(d,h,f){const m=h.array,g=h.updateRanges;if(i.bindBuffer(f,d),g.length===0)i.bufferSubData(f,0,m);else{g.sort((S,M)=>S.start-M.start);let x=0;for(let S=1;S<g.length;S++){const M=g[x],E=g[S];E.start<=M.start+M.count+1?M.count=Math.max(M.count,E.start+E.count-M.start):(++x,g[x]=E)}g.length=x+1;for(let S=0,M=g.length;S<M;S++){const E=g[S];i.bufferSubData(f,E.start*m.BYTES_PER_ELEMENT,m,E.start,E.count)}h.clearUpdateRanges()}h.onUploadCallback()}function o(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function l(d){d.isInterleavedBufferAttribute&&(d=d.data);const h=e.get(d);h&&(i.deleteBuffer(h.buffer),e.delete(d))}function u(d,h){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const m=e.get(d);(!m||m.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const f=e.get(d);if(f===void 0)e.set(d,t(d,h));else if(f.version<d.version){if(f.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,d,h),f.version=d.version}}return{get:o,remove:l,update:u}}var IM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,UM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,FM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,OM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,BM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,HM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,VM=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,GM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,WM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,XM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,$M=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,YM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,qM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,KM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ZM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,QM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,JM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ew=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,tw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,nw=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,iw=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,rw=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,sw=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ow=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,aw=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lw=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cw=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,uw="gl_FragColor = linearToOutputTexel( gl_FragColor );",dw=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,hw=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,pw=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,mw=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,vw=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_w=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xw=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yw=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sw=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ew=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Mw=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ww=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tw=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,bw=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Aw=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Cw=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Rw=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pw=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lw=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Nw=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Dw=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Iw=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Uw=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ow=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Bw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Gw=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ww=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Xw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,$w=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Yw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qw=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Kw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Qw=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Jw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,e1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,t1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,n1=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,i1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,r1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,s1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,o1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,a1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,l1=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,c1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,u1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,d1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,f1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,h1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,p1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,m1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,g1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,v1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,_1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,x1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,y1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,S1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,E1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,M1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,w1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,T1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,b1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,A1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,C1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,R1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,P1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,L1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,N1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const D1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,I1=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,U1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,k1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,B1=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,H1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,V1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,G1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,W1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,j1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,X1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Y1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,q1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,K1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Z1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Q1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,eT=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,tT=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iT=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,rT=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sT=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,oT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,aT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,lT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,dT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,gt={alphahash_fragment:IM,alphahash_pars_fragment:UM,alphamap_fragment:FM,alphamap_pars_fragment:OM,alphatest_fragment:kM,alphatest_pars_fragment:zM,aomap_fragment:BM,aomap_pars_fragment:HM,batching_pars_vertex:VM,batching_vertex:GM,begin_vertex:WM,beginnormal_vertex:jM,bsdfs:XM,iridescence_fragment:$M,bumpmap_pars_fragment:YM,clipping_planes_fragment:qM,clipping_planes_pars_fragment:KM,clipping_planes_pars_vertex:ZM,clipping_planes_vertex:QM,color_fragment:JM,color_pars_fragment:ew,color_pars_vertex:tw,color_vertex:nw,common:iw,cube_uv_reflection_fragment:rw,defaultnormal_vertex:sw,displacementmap_pars_vertex:ow,displacementmap_vertex:aw,emissivemap_fragment:lw,emissivemap_pars_fragment:cw,colorspace_fragment:uw,colorspace_pars_fragment:dw,envmap_fragment:fw,envmap_common_pars_fragment:hw,envmap_pars_fragment:pw,envmap_pars_vertex:mw,envmap_physical_pars_fragment:bw,envmap_vertex:gw,fog_vertex:vw,fog_pars_vertex:_w,fog_fragment:xw,fog_pars_fragment:yw,gradientmap_pars_fragment:Sw,lightmap_pars_fragment:Ew,lights_lambert_fragment:Mw,lights_lambert_pars_fragment:ww,lights_pars_begin:Tw,lights_toon_fragment:Aw,lights_toon_pars_fragment:Cw,lights_phong_fragment:Rw,lights_phong_pars_fragment:Pw,lights_physical_fragment:Lw,lights_physical_pars_fragment:Nw,lights_fragment_begin:Dw,lights_fragment_maps:Iw,lights_fragment_end:Uw,logdepthbuf_fragment:Fw,logdepthbuf_pars_fragment:Ow,logdepthbuf_pars_vertex:kw,logdepthbuf_vertex:zw,map_fragment:Bw,map_pars_fragment:Hw,map_particle_fragment:Vw,map_particle_pars_fragment:Gw,metalnessmap_fragment:Ww,metalnessmap_pars_fragment:jw,morphinstance_vertex:Xw,morphcolor_vertex:$w,morphnormal_vertex:Yw,morphtarget_pars_vertex:qw,morphtarget_vertex:Kw,normal_fragment_begin:Zw,normal_fragment_maps:Qw,normal_pars_fragment:Jw,normal_pars_vertex:e1,normal_vertex:t1,normalmap_pars_fragment:n1,clearcoat_normal_fragment_begin:i1,clearcoat_normal_fragment_maps:r1,clearcoat_pars_fragment:s1,iridescence_pars_fragment:o1,opaque_fragment:a1,packing:l1,premultiplied_alpha_fragment:c1,project_vertex:u1,dithering_fragment:d1,dithering_pars_fragment:f1,roughnessmap_fragment:h1,roughnessmap_pars_fragment:p1,shadowmap_pars_fragment:m1,shadowmap_pars_vertex:g1,shadowmap_vertex:v1,shadowmask_pars_fragment:_1,skinbase_vertex:x1,skinning_pars_vertex:y1,skinning_vertex:S1,skinnormal_vertex:E1,specularmap_fragment:M1,specularmap_pars_fragment:w1,tonemapping_fragment:T1,tonemapping_pars_fragment:b1,transmission_fragment:A1,transmission_pars_fragment:C1,uv_pars_fragment:R1,uv_pars_vertex:P1,uv_vertex:L1,worldpos_vertex:N1,background_vert:D1,background_frag:I1,backgroundCube_vert:U1,backgroundCube_frag:F1,cube_vert:O1,cube_frag:k1,depth_vert:z1,depth_frag:B1,distanceRGBA_vert:H1,distanceRGBA_frag:V1,equirect_vert:G1,equirect_frag:W1,linedashed_vert:j1,linedashed_frag:X1,meshbasic_vert:$1,meshbasic_frag:Y1,meshlambert_vert:q1,meshlambert_frag:K1,meshmatcap_vert:Z1,meshmatcap_frag:Q1,meshnormal_vert:J1,meshnormal_frag:eT,meshphong_vert:tT,meshphong_frag:nT,meshphysical_vert:iT,meshphysical_frag:rT,meshtoon_vert:sT,meshtoon_frag:oT,points_vert:aT,points_frag:lT,shadow_vert:cT,shadow_frag:uT,sprite_vert:dT,sprite_frag:fT},De={common:{diffuse:{value:new Et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new mt},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new mt}},envmap:{envMap:{value:null},envMapRotation:{value:new mt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new mt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new mt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new mt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new mt},normalScale:{value:new Tt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new mt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new mt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new mt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new mt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0},uvTransform:{value:new mt}},sprite:{diffuse:{value:new Et(16777215)},opacity:{value:1},center:{value:new Tt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new mt},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0}}},Ti={basic:{uniforms:Rn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:gt.meshbasic_vert,fragmentShader:gt.meshbasic_frag},lambert:{uniforms:Rn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new Et(0)}}]),vertexShader:gt.meshlambert_vert,fragmentShader:gt.meshlambert_frag},phong:{uniforms:Rn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new Et(0)},specular:{value:new Et(1118481)},shininess:{value:30}}]),vertexShader:gt.meshphong_vert,fragmentShader:gt.meshphong_frag},standard:{uniforms:Rn([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new Et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:gt.meshphysical_vert,fragmentShader:gt.meshphysical_frag},toon:{uniforms:Rn([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new Et(0)}}]),vertexShader:gt.meshtoon_vert,fragmentShader:gt.meshtoon_frag},matcap:{uniforms:Rn([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:gt.meshmatcap_vert,fragmentShader:gt.meshmatcap_frag},points:{uniforms:Rn([De.points,De.fog]),vertexShader:gt.points_vert,fragmentShader:gt.points_frag},dashed:{uniforms:Rn([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:gt.linedashed_vert,fragmentShader:gt.linedashed_frag},depth:{uniforms:Rn([De.common,De.displacementmap]),vertexShader:gt.depth_vert,fragmentShader:gt.depth_frag},normal:{uniforms:Rn([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:gt.meshnormal_vert,fragmentShader:gt.meshnormal_frag},sprite:{uniforms:Rn([De.sprite,De.fog]),vertexShader:gt.sprite_vert,fragmentShader:gt.sprite_frag},background:{uniforms:{uvTransform:{value:new mt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:gt.background_vert,fragmentShader:gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new mt}},vertexShader:gt.backgroundCube_vert,fragmentShader:gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:gt.cube_vert,fragmentShader:gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:gt.equirect_vert,fragmentShader:gt.equirect_frag},distanceRGBA:{uniforms:Rn([De.common,De.displacementmap,{referencePosition:{value:new Z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:gt.distanceRGBA_vert,fragmentShader:gt.distanceRGBA_frag},shadow:{uniforms:Rn([De.lights,De.fog,{color:{value:new Et(0)},opacity:{value:1}}]),vertexShader:gt.shadow_vert,fragmentShader:gt.shadow_frag}};Ti.physical={uniforms:Rn([Ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new mt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new mt},clearcoatNormalScale:{value:new Tt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new mt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new mt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new mt},sheen:{value:0},sheenColor:{value:new Et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new mt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new mt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new mt},transmissionSamplerSize:{value:new Tt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new mt},attenuationDistance:{value:0},attenuationColor:{value:new Et(0)},specularColor:{value:new Et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new mt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new mt},anisotropyVector:{value:new Tt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new mt}}]),vertexShader:gt.meshphysical_vert,fragmentShader:gt.meshphysical_frag};const oc={r:0,b:0,g:0},ss=new Pi,hT=new Yt;function pT(i,e,t,s,o,l,u){const d=new Et(0);let h=l===!0?0:1,f,m,g=null,x=0,S=null;function M(P){let b=P.isScene===!0?P.background:null;return b&&b.isTexture&&(b=(P.backgroundBlurriness>0?t:e).get(b)),b}function E(P){let b=!1;const k=M(P);k===null?_(d,h):k&&k.isColor&&(_(k,1),b=!0);const B=i.xr.getEnvironmentBlendMode();B==="additive"?s.buffers.color.setClear(0,0,0,1,u):B==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,u),(i.autoClear||b)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(P,b){const k=M(b);k&&(k.isCubeTexture||k.mapping===Nc)?(m===void 0&&(m=new ii(new yo(1,1,1),new Or({name:"BackgroundCubeMaterial",uniforms:mo(Ti.backgroundCube.uniforms),vertexShader:Ti.backgroundCube.vertexShader,fragmentShader:Ti.backgroundCube.fragmentShader,side:kn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),m.geometry.deleteAttribute("uv"),m.onBeforeRender=function(B,I,z){this.matrixWorld.copyPosition(z.matrixWorld)},Object.defineProperty(m.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(m)),ss.copy(b.backgroundRotation),ss.x*=-1,ss.y*=-1,ss.z*=-1,k.isCubeTexture&&k.isRenderTargetTexture===!1&&(ss.y*=-1,ss.z*=-1),m.material.uniforms.envMap.value=k,m.material.uniforms.flipEnvMap.value=k.isCubeTexture&&k.isRenderTargetTexture===!1?-1:1,m.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,m.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,m.material.uniforms.backgroundRotation.value.setFromMatrix4(hT.makeRotationFromEuler(ss)),m.material.toneMapped=Ct.getTransfer(k.colorSpace)!==It,(g!==k||x!==k.version||S!==i.toneMapping)&&(m.material.needsUpdate=!0,g=k,x=k.version,S=i.toneMapping),m.layers.enableAll(),P.unshift(m,m.geometry,m.material,0,0,null)):k&&k.isTexture&&(f===void 0&&(f=new ii(new Ic(2,2),new Or({name:"BackgroundMaterial",uniforms:mo(Ti.background.uniforms),vertexShader:Ti.background.vertexShader,fragmentShader:Ti.background.fragmentShader,side:Fr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),Object.defineProperty(f.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(f)),f.material.uniforms.t2D.value=k,f.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,f.material.toneMapped=Ct.getTransfer(k.colorSpace)!==It,k.matrixAutoUpdate===!0&&k.updateMatrix(),f.material.uniforms.uvTransform.value.copy(k.matrix),(g!==k||x!==k.version||S!==i.toneMapping)&&(f.material.needsUpdate=!0,g=k,x=k.version,S=i.toneMapping),f.layers.enableAll(),P.unshift(f,f.geometry,f.material,0,0,null))}function _(P,b){P.getRGB(oc,I0(i)),s.buffers.color.setClear(oc.r,oc.g,oc.b,b,u)}function N(){m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0),f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0)}return{getClearColor:function(){return d},setClearColor:function(P,b=1){d.set(P),h=b,_(d,h)},getClearAlpha:function(){return h},setClearAlpha:function(P){h=P,_(d,h)},render:E,addToRenderList:y,dispose:N}}function mT(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),s={},o=x(null);let l=o,u=!1;function d(R,G,q,ie,Q){let re=!1;const te=g(ie,q,G);l!==te&&(l=te,f(l.object)),re=S(R,ie,q,Q),re&&M(R,ie,q,Q),Q!==null&&e.update(Q,i.ELEMENT_ARRAY_BUFFER),(re||u)&&(u=!1,b(R,G,q,ie),Q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(Q).buffer))}function h(){return i.createVertexArray()}function f(R){return i.bindVertexArray(R)}function m(R){return i.deleteVertexArray(R)}function g(R,G,q){const ie=q.wireframe===!0;let Q=s[R.id];Q===void 0&&(Q={},s[R.id]=Q);let re=Q[G.id];re===void 0&&(re={},Q[G.id]=re);let te=re[ie];return te===void 0&&(te=x(h()),re[ie]=te),te}function x(R){const G=[],q=[],ie=[];for(let Q=0;Q<t;Q++)G[Q]=0,q[Q]=0,ie[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:q,attributeDivisors:ie,object:R,attributes:{},index:null}}function S(R,G,q,ie){const Q=l.attributes,re=G.attributes;let te=0;const de=q.getAttributes();for(const U in de)if(de[U].location>=0){const ue=Q[U];let H=re[U];if(H===void 0&&(U==="instanceMatrix"&&R.instanceMatrix&&(H=R.instanceMatrix),U==="instanceColor"&&R.instanceColor&&(H=R.instanceColor)),ue===void 0||ue.attribute!==H||H&&ue.data!==H.data)return!0;te++}return l.attributesNum!==te||l.index!==ie}function M(R,G,q,ie){const Q={},re=G.attributes;let te=0;const de=q.getAttributes();for(const U in de)if(de[U].location>=0){let ue=re[U];ue===void 0&&(U==="instanceMatrix"&&R.instanceMatrix&&(ue=R.instanceMatrix),U==="instanceColor"&&R.instanceColor&&(ue=R.instanceColor));const H={};H.attribute=ue,ue&&ue.data&&(H.data=ue.data),Q[U]=H,te++}l.attributes=Q,l.attributesNum=te,l.index=ie}function E(){const R=l.newAttributes;for(let G=0,q=R.length;G<q;G++)R[G]=0}function y(R){_(R,0)}function _(R,G){const q=l.newAttributes,ie=l.enabledAttributes,Q=l.attributeDivisors;q[R]=1,ie[R]===0&&(i.enableVertexAttribArray(R),ie[R]=1),Q[R]!==G&&(i.vertexAttribDivisor(R,G),Q[R]=G)}function N(){const R=l.newAttributes,G=l.enabledAttributes;for(let q=0,ie=G.length;q<ie;q++)G[q]!==R[q]&&(i.disableVertexAttribArray(q),G[q]=0)}function P(R,G,q,ie,Q,re,te){te===!0?i.vertexAttribIPointer(R,G,q,Q,re):i.vertexAttribPointer(R,G,q,ie,Q,re)}function b(R,G,q,ie){E();const Q=ie.attributes,re=q.getAttributes(),te=G.defaultAttributeValues;for(const de in re){const U=re[de];if(U.location>=0){let fe=Q[de];if(fe===void 0&&(de==="instanceMatrix"&&R.instanceMatrix&&(fe=R.instanceMatrix),de==="instanceColor"&&R.instanceColor&&(fe=R.instanceColor)),fe!==void 0){const ue=fe.normalized,H=fe.itemSize,ae=e.get(fe);if(ae===void 0)continue;const Ae=ae.buffer,Re=ae.type,Fe=ae.bytesPerElement,ne=Re===i.INT||Re===i.UNSIGNED_INT||fe.gpuType===Th;if(fe.isInterleavedBufferAttribute){const se=fe.data,ye=se.stride,Ne=fe.offset;if(se.isInstancedInterleavedBuffer){for(let Ie=0;Ie<U.locationSize;Ie++)_(U.location+Ie,se.meshPerAttribute);R.isInstancedMesh!==!0&&ie._maxInstanceCount===void 0&&(ie._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Ie=0;Ie<U.locationSize;Ie++)y(U.location+Ie);i.bindBuffer(i.ARRAY_BUFFER,Ae);for(let Ie=0;Ie<U.locationSize;Ie++)P(U.location+Ie,H/U.locationSize,Re,ue,ye*Fe,(Ne+H/U.locationSize*Ie)*Fe,ne)}else{if(fe.isInstancedBufferAttribute){for(let se=0;se<U.locationSize;se++)_(U.location+se,fe.meshPerAttribute);R.isInstancedMesh!==!0&&ie._maxInstanceCount===void 0&&(ie._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let se=0;se<U.locationSize;se++)y(U.location+se);i.bindBuffer(i.ARRAY_BUFFER,Ae);for(let se=0;se<U.locationSize;se++)P(U.location+se,H/U.locationSize,Re,ue,H*Fe,H/U.locationSize*se*Fe,ne)}}else if(te!==void 0){const ue=te[de];if(ue!==void 0)switch(ue.length){case 2:i.vertexAttrib2fv(U.location,ue);break;case 3:i.vertexAttrib3fv(U.location,ue);break;case 4:i.vertexAttrib4fv(U.location,ue);break;default:i.vertexAttrib1fv(U.location,ue)}}}}N()}function k(){z();for(const R in s){const G=s[R];for(const q in G){const ie=G[q];for(const Q in ie)m(ie[Q].object),delete ie[Q];delete G[q]}delete s[R]}}function B(R){if(s[R.id]===void 0)return;const G=s[R.id];for(const q in G){const ie=G[q];for(const Q in ie)m(ie[Q].object),delete ie[Q];delete G[q]}delete s[R.id]}function I(R){for(const G in s){const q=s[G];if(q[R.id]===void 0)continue;const ie=q[R.id];for(const Q in ie)m(ie[Q].object),delete ie[Q];delete q[R.id]}}function z(){C(),u=!0,l!==o&&(l=o,f(l.object))}function C(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:d,reset:z,resetDefaultState:C,dispose:k,releaseStatesOfGeometry:B,releaseStatesOfProgram:I,initAttributes:E,enableAttribute:y,disableUnusedAttributes:N}}function gT(i,e,t){let s;function o(f){s=f}function l(f,m){i.drawArrays(s,f,m),t.update(m,s,1)}function u(f,m,g){g!==0&&(i.drawArraysInstanced(s,f,m,g),t.update(m,s,g))}function d(f,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,f,0,m,0,g);let S=0;for(let M=0;M<g;M++)S+=m[M];t.update(S,s,1)}function h(f,m,g,x){if(g===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let M=0;M<f.length;M++)u(f[M],m[M],x[M]);else{S.multiDrawArraysInstancedWEBGL(s,f,0,m,0,x,0,g);let M=0;for(let E=0;E<g;E++)M+=m[E]*x[E];t.update(M,s,1)}}this.setMode=o,this.render=l,this.renderInstances=u,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function vT(i,e,t,s){let o;function l(){if(o!==void 0)return o;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");o=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function u(I){return!(I!==mi&&s.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(I){const z=I===wa&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==Ri&&s.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==Zi&&!z)}function h(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let f=t.precision!==void 0?t.precision:"highp";const m=h(f);m!==f&&(console.warn("THREE.WebGLRenderer:",f,"not supported, using",m,"instead."),f=m);const g=t.logarithmicDepthBuffer===!0,x=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),S=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=i.getParameter(i.MAX_TEXTURE_SIZE),y=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),N=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),P=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),k=M>0,B=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:l,getMaxPrecision:h,textureFormatReadable:u,textureTypeReadable:d,precision:f,logarithmicDepthBuffer:g,reversedDepthBuffer:x,maxTextures:S,maxVertexTextures:M,maxTextureSize:E,maxCubemapSize:y,maxAttributes:_,maxVertexUniforms:N,maxVaryings:P,maxFragmentUniforms:b,vertexTextures:k,maxSamples:B}}function _T(i){const e=this;let t=null,s=0,o=!1,l=!1;const u=new as,d=new mt,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(g,x){const S=g.length!==0||x||s!==0||o;return o=x,s=g.length,S},this.beginShadows=function(){l=!0,m(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(g,x){t=m(g,x,0)},this.setState=function(g,x,S){const M=g.clippingPlanes,E=g.clipIntersection,y=g.clipShadows,_=i.get(g);if(!o||M===null||M.length===0||l&&!y)l?m(null):f();else{const N=l?0:s,P=N*4;let b=_.clippingState||null;h.value=b,b=m(M,x,P,S);for(let k=0;k!==P;++k)b[k]=t[k];_.clippingState=b,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=N}};function f(){h.value!==t&&(h.value=t,h.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function m(g,x,S,M){const E=g!==null?g.length:0;let y=null;if(E!==0){if(y=h.value,M!==!0||y===null){const _=S+E*4,N=x.matrixWorldInverse;d.getNormalMatrix(N),(y===null||y.length<_)&&(y=new Float32Array(_));for(let P=0,b=S;P!==E;++P,b+=4)u.copy(g[P]).applyMatrix4(N,d),u.normal.toArray(y,b),y[b+3]=u.constant}h.value=y,h.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,y}}function xT(i){let e=new WeakMap;function t(u,d){return d===Nf?u.mapping=fo:d===Df&&(u.mapping=ho),u}function s(u){if(u&&u.isTexture){const d=u.mapping;if(d===Nf||d===Df)if(e.has(u)){const h=e.get(u).texture;return t(h,u.mapping)}else{const h=u.image;if(h&&h.height>0){const f=new mM(h.height);return f.fromEquirectangularTexture(i,u),e.set(u,f),u.addEventListener("dispose",o),t(f.texture,u.mapping)}else return null}}return u}function o(u){const d=u.target;d.removeEventListener("dispose",o);const h=e.get(d);h!==void 0&&(e.delete(d),h.dispose())}function l(){e=new WeakMap}return{get:s,dispose:l}}const oo=4,ov=[.125,.215,.35,.446,.526,.582],us=20,Jd=new B0,av=new Et;let ef=null,tf=0,nf=0,rf=!1;const ls=(1+Math.sqrt(5))/2,no=1/ls,lv=[new Z(-ls,no,0),new Z(ls,no,0),new Z(-no,0,ls),new Z(no,0,ls),new Z(0,ls,-no),new Z(0,ls,no),new Z(-1,1,-1),new Z(1,1,-1),new Z(-1,1,1),new Z(1,1,1)],yT=new Z;class cv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,s=.1,o=100,l={}){const{size:u=256,position:d=yT}=l;ef=this._renderer.getRenderTarget(),tf=this._renderer.getActiveCubeFace(),nf=this._renderer.getActiveMipmapLevel(),rf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(u);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,s,o,h,d),t>0&&this._blur(h,0,0,t),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ef,tf,nf),this._renderer.xr.enabled=rf,e.scissorTest=!1,ac(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===fo||e.mapping===ho?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ef=this._renderer.getRenderTarget(),tf=this._renderer.getActiveCubeFace(),nf=this._renderer.getActiveMipmapLevel(),rf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=t||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,s={magFilter:Ai,minFilter:Ai,generateMipmaps:!1,type:wa,format:mi,colorSpace:po,depthBuffer:!1},o=uv(e,t,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=uv(e,t,s);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ST(l)),this._blurMaterial=ET(l,e,t)}return o}_compileMaterial(e){const t=new ii(this._lodPlanes[0],e);this._renderer.compile(t,Jd)}_sceneToCubeUV(e,t,s,o,l){const h=new On(90,1,t,s),f=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],g=this._renderer,x=g.autoClear,S=g.toneMapping;g.getClearColor(av),g.toneMapping=Ir,g.autoClear=!1,g.state.buffers.depth.getReversed()&&(g.setRenderTarget(o),g.clearDepth(),g.setRenderTarget(null));const E=new L0({name:"PMREM.Background",side:kn,depthWrite:!1,depthTest:!1}),y=new ii(new yo,E);let _=!1;const N=e.background;N?N.isColor&&(E.color.copy(N),e.background=null,_=!0):(E.color.copy(av),_=!0);for(let P=0;P<6;P++){const b=P%3;b===0?(h.up.set(0,f[P],0),h.position.set(l.x,l.y,l.z),h.lookAt(l.x+m[P],l.y,l.z)):b===1?(h.up.set(0,0,f[P]),h.position.set(l.x,l.y,l.z),h.lookAt(l.x,l.y+m[P],l.z)):(h.up.set(0,f[P],0),h.position.set(l.x,l.y,l.z),h.lookAt(l.x,l.y,l.z+m[P]));const k=this._cubeSize;ac(o,b*k,P>2?k:0,k,k),g.setRenderTarget(o),_&&g.render(y,h),g.render(e,h)}y.geometry.dispose(),y.material.dispose(),g.toneMapping=S,g.autoClear=x,e.background=N}_textureToCubeUV(e,t){const s=this._renderer,o=e.mapping===fo||e.mapping===ho;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=fv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dv());const l=o?this._cubemapMaterial:this._equirectMaterial,u=new ii(this._lodPlanes[0],l),d=l.uniforms;d.envMap.value=e;const h=this._cubeSize;ac(t,0,0,3*h,2*h),s.setRenderTarget(t),s.render(u,Jd)}_applyPMREM(e){const t=this._renderer,s=t.autoClear;t.autoClear=!1;const o=this._lodPlanes.length;for(let l=1;l<o;l++){const u=Math.sqrt(this._sigmas[l]*this._sigmas[l]-this._sigmas[l-1]*this._sigmas[l-1]),d=lv[(o-l-1)%lv.length];this._blur(e,l-1,l,u,d)}t.autoClear=s}_blur(e,t,s,o,l){const u=this._pingPongRenderTarget;this._halfBlur(e,u,t,s,o,"latitudinal",l),this._halfBlur(u,e,s,s,o,"longitudinal",l)}_halfBlur(e,t,s,o,l,u,d){const h=this._renderer,f=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const m=3,g=new ii(this._lodPlanes[o],f),x=f.uniforms,S=this._sizeLods[s]-1,M=isFinite(l)?Math.PI/(2*S):2*Math.PI/(2*us-1),E=l/M,y=isFinite(l)?1+Math.floor(m*E):us;y>us&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${us}`);const _=[];let N=0;for(let I=0;I<us;++I){const z=I/E,C=Math.exp(-z*z/2);_.push(C),I===0?N+=C:I<y&&(N+=2*C)}for(let I=0;I<_.length;I++)_[I]=_[I]/N;x.envMap.value=e.texture,x.samples.value=y,x.weights.value=_,x.latitudinal.value=u==="latitudinal",d&&(x.poleAxis.value=d);const{_lodMax:P}=this;x.dTheta.value=M,x.mipInt.value=P-s;const b=this._sizeLods[o],k=3*b*(o>P-oo?o-P+oo:0),B=4*(this._cubeSize-b);ac(t,k,B,3*b,2*b),h.setRenderTarget(t),h.render(g,Jd)}}function ST(i){const e=[],t=[],s=[];let o=i;const l=i-oo+1+ov.length;for(let u=0;u<l;u++){const d=Math.pow(2,o);t.push(d);let h=1/d;u>i-oo?h=ov[u-i+oo-1]:u===0&&(h=0),s.push(h);const f=1/(d-2),m=-f,g=1+f,x=[m,m,g,m,g,g,m,m,g,g,m,g],S=6,M=6,E=3,y=2,_=1,N=new Float32Array(E*M*S),P=new Float32Array(y*M*S),b=new Float32Array(_*M*S);for(let B=0;B<S;B++){const I=B%3*2/3-1,z=B>2?0:-1,C=[I,z,0,I+2/3,z,0,I+2/3,z+1,0,I,z,0,I+2/3,z+1,0,I,z+1,0];N.set(C,E*M*B),P.set(x,y*M*B);const R=[B,B,B,B,B,B];b.set(R,_*M*B)}const k=new xi;k.setAttribute("position",new vi(N,E)),k.setAttribute("uv",new vi(P,y)),k.setAttribute("faceIndex",new vi(b,_)),e.push(k),o>oo&&o--}return{lodPlanes:e,sizeLods:t,sigmas:s}}function uv(i,e,t){const s=new ps(i,e,t);return s.texture.mapping=Nc,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function ac(i,e,t,s,o){i.viewport.set(e,t,s,o),i.scissor.set(e,t,s,o)}function ET(i,e,t){const s=new Float32Array(us),o=new Z(0,1,0);return new Or({name:"SphericalGaussianBlur",defines:{n:us,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:Oh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Dr,depthTest:!1,depthWrite:!1})}function dv(){return new Or({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Oh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Dr,depthTest:!1,depthWrite:!1})}function fv(){return new Or({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Oh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Dr,depthTest:!1,depthWrite:!1})}function Oh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function MT(i){let e=new WeakMap,t=null;function s(d){if(d&&d.isTexture){const h=d.mapping,f=h===Nf||h===Df,m=h===fo||h===ho;if(f||m){let g=e.get(d);const x=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==x)return t===null&&(t=new cv(i)),g=f?t.fromEquirectangular(d,g):t.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),g.texture;if(g!==void 0)return g.texture;{const S=d.image;return f&&S&&S.height>0||m&&S&&o(S)?(t===null&&(t=new cv(i)),g=f?t.fromEquirectangular(d):t.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),d.addEventListener("dispose",l),g.texture):null}}}return d}function o(d){let h=0;const f=6;for(let m=0;m<f;m++)d[m]!==void 0&&h++;return h===f}function l(d){const h=d.target;h.removeEventListener("dispose",l);const f=e.get(h);f!==void 0&&(e.delete(h),f.dispose())}function u(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:s,dispose:u}}function wT(i){const e={};function t(s){if(e[s]!==void 0)return e[s];let o;switch(s){case"WEBGL_depth_texture":o=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":o=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":o=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":o=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:o=i.getExtension(s)}return e[s]=o,o}return{has:function(s){return t(s)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(s){const o=t(s);return o===null&&ya("THREE.WebGLRenderer: "+s+" extension not supported."),o}}}function TT(i,e,t,s){const o={},l=new WeakMap;function u(g){const x=g.target;x.index!==null&&e.remove(x.index);for(const M in x.attributes)e.remove(x.attributes[M]);x.removeEventListener("dispose",u),delete o[x.id];const S=l.get(x);S&&(e.remove(S),l.delete(x)),s.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,t.memory.geometries--}function d(g,x){return o[x.id]===!0||(x.addEventListener("dispose",u),o[x.id]=!0,t.memory.geometries++),x}function h(g){const x=g.attributes;for(const S in x)e.update(x[S],i.ARRAY_BUFFER)}function f(g){const x=[],S=g.index,M=g.attributes.position;let E=0;if(S!==null){const N=S.array;E=S.version;for(let P=0,b=N.length;P<b;P+=3){const k=N[P+0],B=N[P+1],I=N[P+2];x.push(k,B,B,I,I,k)}}else if(M!==void 0){const N=M.array;E=M.version;for(let P=0,b=N.length/3-1;P<b;P+=3){const k=P+0,B=P+1,I=P+2;x.push(k,B,B,I,I,k)}}else return;const y=new(b0(x)?D0:N0)(x,1);y.version=E;const _=l.get(g);_&&e.remove(_),l.set(g,y)}function m(g){const x=l.get(g);if(x){const S=g.index;S!==null&&x.version<S.version&&f(g)}else f(g);return l.get(g)}return{get:d,update:h,getWireframeAttribute:m}}function bT(i,e,t){let s;function o(x){s=x}let l,u;function d(x){l=x.type,u=x.bytesPerElement}function h(x,S){i.drawElements(s,S,l,x*u),t.update(S,s,1)}function f(x,S,M){M!==0&&(i.drawElementsInstanced(s,S,l,x*u,M),t.update(S,s,M))}function m(x,S,M){if(M===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,S,0,l,x,0,M);let y=0;for(let _=0;_<M;_++)y+=S[_];t.update(y,s,1)}function g(x,S,M,E){if(M===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let _=0;_<x.length;_++)f(x[_]/u,S[_],E[_]);else{y.multiDrawElementsInstancedWEBGL(s,S,0,l,x,0,E,0,M);let _=0;for(let N=0;N<M;N++)_+=S[N]*E[N];t.update(_,s,1)}}this.setMode=o,this.setIndex=d,this.render=h,this.renderInstances=f,this.renderMultiDraw=m,this.renderMultiDrawInstances=g}function AT(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function s(l,u,d){switch(t.calls++,u){case i.TRIANGLES:t.triangles+=d*(l/3);break;case i.LINES:t.lines+=d*(l/2);break;case i.LINE_STRIP:t.lines+=d*(l-1);break;case i.LINE_LOOP:t.lines+=d*l;break;case i.POINTS:t.points+=d*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",u);break}}function o(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:o,update:s}}function CT(i,e,t){const s=new WeakMap,o=new Ut;function l(u,d,h){const f=u.morphTargetInfluences,m=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,g=m!==void 0?m.length:0;let x=s.get(d);if(x===void 0||x.count!==g){let R=function(){z.dispose(),s.delete(d),d.removeEventListener("dispose",R)};var S=R;x!==void 0&&x.texture.dispose();const M=d.morphAttributes.position!==void 0,E=d.morphAttributes.normal!==void 0,y=d.morphAttributes.color!==void 0,_=d.morphAttributes.position||[],N=d.morphAttributes.normal||[],P=d.morphAttributes.color||[];let b=0;M===!0&&(b=1),E===!0&&(b=2),y===!0&&(b=3);let k=d.attributes.position.count*b,B=1;k>e.maxTextureSize&&(B=Math.ceil(k/e.maxTextureSize),k=e.maxTextureSize);const I=new Float32Array(k*B*4*g),z=new A0(I,k,B,g);z.type=Zi,z.needsUpdate=!0;const C=b*4;for(let G=0;G<g;G++){const q=_[G],ie=N[G],Q=P[G],re=k*B*4*G;for(let te=0;te<q.count;te++){const de=te*C;M===!0&&(o.fromBufferAttribute(q,te),I[re+de+0]=o.x,I[re+de+1]=o.y,I[re+de+2]=o.z,I[re+de+3]=0),E===!0&&(o.fromBufferAttribute(ie,te),I[re+de+4]=o.x,I[re+de+5]=o.y,I[re+de+6]=o.z,I[re+de+7]=0),y===!0&&(o.fromBufferAttribute(Q,te),I[re+de+8]=o.x,I[re+de+9]=o.y,I[re+de+10]=o.z,I[re+de+11]=Q.itemSize===4?o.w:1)}}x={count:g,texture:z,size:new Tt(k,B)},s.set(d,x),d.addEventListener("dispose",R)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)h.getUniforms().setValue(i,"morphTexture",u.morphTexture,t);else{let M=0;for(let y=0;y<f.length;y++)M+=f[y];const E=d.morphTargetsRelative?1:1-M;h.getUniforms().setValue(i,"morphTargetBaseInfluence",E),h.getUniforms().setValue(i,"morphTargetInfluences",f)}h.getUniforms().setValue(i,"morphTargetsTexture",x.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",x.size)}return{update:l}}function RT(i,e,t,s){let o=new WeakMap;function l(h){const f=s.render.frame,m=h.geometry,g=e.get(h,m);if(o.get(g)!==f&&(e.update(g),o.set(g,f)),h.isInstancedMesh&&(h.hasEventListener("dispose",d)===!1&&h.addEventListener("dispose",d),o.get(h)!==f&&(t.update(h.instanceMatrix,i.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,i.ARRAY_BUFFER),o.set(h,f))),h.isSkinnedMesh){const x=h.skeleton;o.get(x)!==f&&(x.update(),o.set(x,f))}return g}function u(){o=new WeakMap}function d(h){const f=h.target;f.removeEventListener("dispose",d),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:l,dispose:u}}const V0=new zn,hv=new k0(1,1),G0=new A0,W0=new QE,j0=new F0,pv=[],mv=[],gv=new Float32Array(16),vv=new Float32Array(9),_v=new Float32Array(4);function So(i,e,t){const s=i[0];if(s<=0||s>0)return i;const o=e*t;let l=pv[o];if(l===void 0&&(l=new Float32Array(o),pv[o]=l),e!==0){s.toArray(l,0);for(let u=1,d=0;u!==e;++u)d+=t,i[u].toArray(l,d)}return l}function an(i,e){if(i.length!==e.length)return!1;for(let t=0,s=i.length;t<s;t++)if(i[t]!==e[t])return!1;return!0}function ln(i,e){for(let t=0,s=e.length;t<s;t++)i[t]=e[t]}function Fc(i,e){let t=mv[e];t===void 0&&(t=new Int32Array(e),mv[e]=t);for(let s=0;s!==e;++s)t[s]=i.allocateTextureUnit();return t}function PT(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function LT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2fv(this.addr,e),ln(t,e)}}function NT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(an(t,e))return;i.uniform3fv(this.addr,e),ln(t,e)}}function DT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4fv(this.addr,e),ln(t,e)}}function IT(i,e){const t=this.cache,s=e.elements;if(s===void 0){if(an(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),ln(t,e)}else{if(an(t,s))return;_v.set(s),i.uniformMatrix2fv(this.addr,!1,_v),ln(t,s)}}function UT(i,e){const t=this.cache,s=e.elements;if(s===void 0){if(an(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),ln(t,e)}else{if(an(t,s))return;vv.set(s),i.uniformMatrix3fv(this.addr,!1,vv),ln(t,s)}}function FT(i,e){const t=this.cache,s=e.elements;if(s===void 0){if(an(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),ln(t,e)}else{if(an(t,s))return;gv.set(s),i.uniformMatrix4fv(this.addr,!1,gv),ln(t,s)}}function OT(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function kT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2iv(this.addr,e),ln(t,e)}}function zT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;i.uniform3iv(this.addr,e),ln(t,e)}}function BT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4iv(this.addr,e),ln(t,e)}}function HT(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function VT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2uiv(this.addr,e),ln(t,e)}}function GT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;i.uniform3uiv(this.addr,e),ln(t,e)}}function WT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4uiv(this.addr,e),ln(t,e)}}function jT(i,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(i.uniform1i(this.addr,o),s[0]=o);let l;this.type===i.SAMPLER_2D_SHADOW?(hv.compareFunction=T0,l=hv):l=V0,t.setTexture2D(e||l,o)}function XT(i,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(i.uniform1i(this.addr,o),s[0]=o),t.setTexture3D(e||W0,o)}function $T(i,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(i.uniform1i(this.addr,o),s[0]=o),t.setTextureCube(e||j0,o)}function YT(i,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(i.uniform1i(this.addr,o),s[0]=o),t.setTexture2DArray(e||G0,o)}function qT(i){switch(i){case 5126:return PT;case 35664:return LT;case 35665:return NT;case 35666:return DT;case 35674:return IT;case 35675:return UT;case 35676:return FT;case 5124:case 35670:return OT;case 35667:case 35671:return kT;case 35668:case 35672:return zT;case 35669:case 35673:return BT;case 5125:return HT;case 36294:return VT;case 36295:return GT;case 36296:return WT;case 35678:case 36198:case 36298:case 36306:case 35682:return jT;case 35679:case 36299:case 36307:return XT;case 35680:case 36300:case 36308:case 36293:return $T;case 36289:case 36303:case 36311:case 36292:return YT}}function KT(i,e){i.uniform1fv(this.addr,e)}function ZT(i,e){const t=So(e,this.size,2);i.uniform2fv(this.addr,t)}function QT(i,e){const t=So(e,this.size,3);i.uniform3fv(this.addr,t)}function JT(i,e){const t=So(e,this.size,4);i.uniform4fv(this.addr,t)}function eb(i,e){const t=So(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function tb(i,e){const t=So(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function nb(i,e){const t=So(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function ib(i,e){i.uniform1iv(this.addr,e)}function rb(i,e){i.uniform2iv(this.addr,e)}function sb(i,e){i.uniform3iv(this.addr,e)}function ob(i,e){i.uniform4iv(this.addr,e)}function ab(i,e){i.uniform1uiv(this.addr,e)}function lb(i,e){i.uniform2uiv(this.addr,e)}function cb(i,e){i.uniform3uiv(this.addr,e)}function ub(i,e){i.uniform4uiv(this.addr,e)}function db(i,e,t){const s=this.cache,o=e.length,l=Fc(t,o);an(s,l)||(i.uniform1iv(this.addr,l),ln(s,l));for(let u=0;u!==o;++u)t.setTexture2D(e[u]||V0,l[u])}function fb(i,e,t){const s=this.cache,o=e.length,l=Fc(t,o);an(s,l)||(i.uniform1iv(this.addr,l),ln(s,l));for(let u=0;u!==o;++u)t.setTexture3D(e[u]||W0,l[u])}function hb(i,e,t){const s=this.cache,o=e.length,l=Fc(t,o);an(s,l)||(i.uniform1iv(this.addr,l),ln(s,l));for(let u=0;u!==o;++u)t.setTextureCube(e[u]||j0,l[u])}function pb(i,e,t){const s=this.cache,o=e.length,l=Fc(t,o);an(s,l)||(i.uniform1iv(this.addr,l),ln(s,l));for(let u=0;u!==o;++u)t.setTexture2DArray(e[u]||G0,l[u])}function mb(i){switch(i){case 5126:return KT;case 35664:return ZT;case 35665:return QT;case 35666:return JT;case 35674:return eb;case 35675:return tb;case 35676:return nb;case 5124:case 35670:return ib;case 35667:case 35671:return rb;case 35668:case 35672:return sb;case 35669:case 35673:return ob;case 5125:return ab;case 36294:return lb;case 36295:return cb;case 36296:return ub;case 35678:case 36198:case 36298:case 36306:case 35682:return db;case 35679:case 36299:case 36307:return fb;case 35680:case 36300:case 36308:case 36293:return hb;case 36289:case 36303:case 36311:case 36292:return pb}}class gb{constructor(e,t,s){this.id=e,this.addr=s,this.cache=[],this.type=t.type,this.setValue=qT(t.type)}}class vb{constructor(e,t,s){this.id=e,this.addr=s,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mb(t.type)}}class _b{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,s){const o=this.seq;for(let l=0,u=o.length;l!==u;++l){const d=o[l];d.setValue(e,t[d.id],s)}}}const sf=/(\w+)(\])?(\[|\.)?/g;function xv(i,e){i.seq.push(e),i.map[e.id]=e}function xb(i,e,t){const s=i.name,o=s.length;for(sf.lastIndex=0;;){const l=sf.exec(s),u=sf.lastIndex;let d=l[1];const h=l[2]==="]",f=l[3];if(h&&(d=d|0),f===void 0||f==="["&&u+2===o){xv(t,f===void 0?new gb(d,i,e):new vb(d,i,e));break}else{let g=t.map[d];g===void 0&&(g=new _b(d),xv(t,g)),t=g}}}class xc{constructor(e,t){this.seq=[],this.map={};const s=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<s;++o){const l=e.getActiveUniform(t,o),u=e.getUniformLocation(t,l.name);xb(l,u,this)}}setValue(e,t,s,o){const l=this.map[t];l!==void 0&&l.setValue(e,s,o)}setOptional(e,t,s){const o=t[s];o!==void 0&&this.setValue(e,s,o)}static upload(e,t,s,o){for(let l=0,u=t.length;l!==u;++l){const d=t[l],h=s[d.id];h.needsUpdate!==!1&&d.setValue(e,h.value,o)}}static seqWithValue(e,t){const s=[];for(let o=0,l=e.length;o!==l;++o){const u=e[o];u.id in t&&s.push(u)}return s}}function yv(i,e,t){const s=i.createShader(e);return i.shaderSource(s,t),i.compileShader(s),s}const yb=37297;let Sb=0;function Eb(i,e){const t=i.split(`
`),s=[],o=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let u=o;u<l;u++){const d=u+1;s.push(`${d===e?">":" "} ${d}: ${t[u]}`)}return s.join(`
`)}const Sv=new mt;function Mb(i){Ct._getMatrix(Sv,Ct.workingColorSpace,i);const e=`mat3( ${Sv.elements.map(t=>t.toFixed(4))} )`;switch(Ct.getTransfer(i)){case bc:return[e,"LinearTransferOETF"];case It:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Ev(i,e,t){const s=i.getShaderParameter(e,i.COMPILE_STATUS),l=(i.getShaderInfoLog(e)||"").trim();if(s&&l==="")return"";const u=/ERROR: 0:(\d+)/.exec(l);if(u){const d=parseInt(u[1]);return t.toUpperCase()+`

`+l+`

`+Eb(i.getShaderSource(e),d)}else return l}function wb(i,e){const t=Mb(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Tb(i,e){let t;switch(e){case bE:t="Linear";break;case AE:t="Reinhard";break;case CE:t="Cineon";break;case RE:t="ACESFilmic";break;case LE:t="AgX";break;case NE:t="Neutral";break;case PE:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const lc=new Z;function bb(){Ct.getLuminanceCoefficients(lc);const i=lc.x.toFixed(4),e=lc.y.toFixed(4),t=lc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ab(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fa).join(`
`)}function Cb(i){const e=[];for(const t in i){const s=i[t];s!==!1&&e.push("#define "+t+" "+s)}return e.join(`
`)}function Rb(i,e){const t={},s=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let o=0;o<s;o++){const l=i.getActiveAttrib(e,o),u=l.name;let d=1;l.type===i.FLOAT_MAT2&&(d=2),l.type===i.FLOAT_MAT3&&(d=3),l.type===i.FLOAT_MAT4&&(d=4),t[u]={type:l.type,location:i.getAttribLocation(e,u),locationSize:d}}return t}function fa(i){return i!==""}function Mv(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function wv(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Pb=/^[ \t]*#include +<([\w\d./]+)>/gm;function fh(i){return i.replace(Pb,Nb)}const Lb=new Map;function Nb(i,e){let t=gt[e];if(t===void 0){const s=Lb.get(e);if(s!==void 0)t=gt[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return fh(t)}const Db=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tv(i){return i.replace(Db,Ib)}function Ib(i,e,t,s){let o="";for(let l=parseInt(e);l<parseInt(t);l++)o+=s.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return o}function bv(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Ub(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===h0?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===sE?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===qi&&(e="SHADOWMAP_TYPE_VSM"),e}function Fb(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case fo:case ho:e="ENVMAP_TYPE_CUBE";break;case Nc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Ob(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ho:e="ENVMAP_MODE_REFRACTION";break}return e}function kb(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case p0:e="ENVMAP_BLENDING_MULTIPLY";break;case wE:e="ENVMAP_BLENDING_MIX";break;case TE:e="ENVMAP_BLENDING_ADD";break}return e}function zb(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:s,maxMip:t}}function Bb(i,e,t,s){const o=i.getContext(),l=t.defines;let u=t.vertexShader,d=t.fragmentShader;const h=Ub(t),f=Fb(t),m=Ob(t),g=kb(t),x=zb(t),S=Ab(t),M=Cb(l),E=o.createProgram();let y,_,N=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(fa).join(`
`),y.length>0&&(y+=`
`),_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(fa).join(`
`),_.length>0&&(_+=`
`)):(y=[bv(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+m:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fa).join(`
`),_=[bv(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.envMap?"#define "+m:"",t.envMap?"#define "+g:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ir?"#define TONE_MAPPING":"",t.toneMapping!==Ir?gt.tonemapping_pars_fragment:"",t.toneMapping!==Ir?Tb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",gt.colorspace_pars_fragment,wb("linearToOutputTexel",t.outputColorSpace),bb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(fa).join(`
`)),u=fh(u),u=Mv(u,t),u=wv(u,t),d=fh(d),d=Mv(d,t),d=wv(d,t),u=Tv(u),d=Tv(d),t.isRawShaderMaterial!==!0&&(N=`#version 300 es
`,y=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,_=["#define varying in",t.glslVersion===Ug?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ug?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const P=N+y+u,b=N+_+d,k=yv(o,o.VERTEX_SHADER,P),B=yv(o,o.FRAGMENT_SHADER,b);o.attachShader(E,k),o.attachShader(E,B),t.index0AttributeName!==void 0?o.bindAttribLocation(E,0,t.index0AttributeName):t.morphTargets===!0&&o.bindAttribLocation(E,0,"position"),o.linkProgram(E);function I(G){if(i.debug.checkShaderErrors){const q=o.getProgramInfoLog(E)||"",ie=o.getShaderInfoLog(k)||"",Q=o.getShaderInfoLog(B)||"",re=q.trim(),te=ie.trim(),de=Q.trim();let U=!0,fe=!0;if(o.getProgramParameter(E,o.LINK_STATUS)===!1)if(U=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(o,E,k,B);else{const ue=Ev(o,k,"vertex"),H=Ev(o,B,"fragment");console.error("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(E,o.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+re+`
`+ue+`
`+H)}else re!==""?console.warn("THREE.WebGLProgram: Program Info Log:",re):(te===""||de==="")&&(fe=!1);fe&&(G.diagnostics={runnable:U,programLog:re,vertexShader:{log:te,prefix:y},fragmentShader:{log:de,prefix:_}})}o.deleteShader(k),o.deleteShader(B),z=new xc(o,E),C=Rb(o,E)}let z;this.getUniforms=function(){return z===void 0&&I(this),z};let C;this.getAttributes=function(){return C===void 0&&I(this),C};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=o.getProgramParameter(E,yb)),R},this.destroy=function(){s.releaseStatesOfProgram(this),o.deleteProgram(E),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Sb++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=k,this.fragmentShader=B,this}let Hb=0;class Vb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,s=e.fragmentShader,o=this._getShaderStage(t),l=this._getShaderStage(s),u=this._getShaderCacheForMaterial(e);return u.has(o)===!1&&(u.add(o),o.usedTimes++),u.has(l)===!1&&(u.add(l),l.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const s of t)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let s=t.get(e);return s===void 0&&(s=new Set,t.set(e,s)),s}_getShaderStage(e){const t=this.shaderCache;let s=t.get(e);return s===void 0&&(s=new Gb(e),t.set(e,s)),s}}class Gb{constructor(e){this.id=Hb++,this.code=e,this.usedTimes=0}}function Wb(i,e,t,s,o,l,u){const d=new R0,h=new Vb,f=new Set,m=[],g=o.logarithmicDepthBuffer,x=o.vertexTextures;let S=o.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(C){return f.add(C),C===0?"uv":`uv${C}`}function y(C,R,G,q,ie){const Q=q.fog,re=ie.geometry,te=C.isMeshStandardMaterial?q.environment:null,de=(C.isMeshStandardMaterial?t:e).get(C.envMap||te),U=de&&de.mapping===Nc?de.image.height:null,fe=M[C.type];C.precision!==null&&(S=o.getMaxPrecision(C.precision),S!==C.precision&&console.warn("THREE.WebGLProgram.getParameters:",C.precision,"not supported, using",S,"instead."));const ue=re.morphAttributes.position||re.morphAttributes.normal||re.morphAttributes.color,H=ue!==void 0?ue.length:0;let ae=0;re.morphAttributes.position!==void 0&&(ae=1),re.morphAttributes.normal!==void 0&&(ae=2),re.morphAttributes.color!==void 0&&(ae=3);let Ae,Re,Fe,ne;if(fe){const Mt=Ti[fe];Ae=Mt.vertexShader,Re=Mt.fragmentShader}else Ae=C.vertexShader,Re=C.fragmentShader,h.update(C),Fe=h.getVertexShaderID(C),ne=h.getFragmentShaderID(C);const se=i.getRenderTarget(),ye=i.state.buffers.depth.getReversed(),Ne=ie.isInstancedMesh===!0,Ie=ie.isBatchedMesh===!0,pt=!!C.map,Wt=!!C.matcap,V=!!de,Nt=!!C.aoMap,ft=!!C.lightMap,st=!!C.bumpMap,Xe=!!C.normalMap,Ft=!!C.displacementMap,$e=!!C.emissiveMap,ut=!!C.metalnessMap,Bt=!!C.roughnessMap,Ht=C.anisotropy>0,D=C.clearcoat>0,T=C.dispersion>0,J=C.iridescence>0,pe=C.sheen>0,ve=C.transmission>0,he=Ht&&!!C.anisotropyMap,Qe=D&&!!C.clearcoatMap,be=D&&!!C.clearcoatNormalMap,He=D&&!!C.clearcoatRoughnessMap,Je=J&&!!C.iridescenceMap,we=J&&!!C.iridescenceThicknessMap,Ue=pe&&!!C.sheenColorMap,ot=pe&&!!C.sheenRoughnessMap,Ke=!!C.specularMap,Pe=!!C.specularColorMap,ht=!!C.specularIntensityMap,j=ve&&!!C.transmissionMap,Ee=ve&&!!C.thicknessMap,Ce=!!C.gradientMap,Oe=!!C.alphaMap,Se=C.alphaTest>0,me=!!C.alphaHash,Ye=!!C.extensions;let dt=Ir;C.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(dt=i.toneMapping);const Pt={shaderID:fe,shaderType:C.type,shaderName:C.name,vertexShader:Ae,fragmentShader:Re,defines:C.defines,customVertexShaderID:Fe,customFragmentShaderID:ne,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:S,batching:Ie,batchingColor:Ie&&ie._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&ie.instanceColor!==null,instancingMorph:Ne&&ie.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:se===null?i.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:po,alphaToCoverage:!!C.alphaToCoverage,map:pt,matcap:Wt,envMap:V,envMapMode:V&&de.mapping,envMapCubeUVHeight:U,aoMap:Nt,lightMap:ft,bumpMap:st,normalMap:Xe,displacementMap:x&&Ft,emissiveMap:$e,normalMapObjectSpace:Xe&&C.normalMapType===FE,normalMapTangentSpace:Xe&&C.normalMapType===w0,metalnessMap:ut,roughnessMap:Bt,anisotropy:Ht,anisotropyMap:he,clearcoat:D,clearcoatMap:Qe,clearcoatNormalMap:be,clearcoatRoughnessMap:He,dispersion:T,iridescence:J,iridescenceMap:Je,iridescenceThicknessMap:we,sheen:pe,sheenColorMap:Ue,sheenRoughnessMap:ot,specularMap:Ke,specularColorMap:Pe,specularIntensityMap:ht,transmission:ve,transmissionMap:j,thicknessMap:Ee,gradientMap:Ce,opaque:C.transparent===!1&&C.blending===ao&&C.alphaToCoverage===!1,alphaMap:Oe,alphaTest:Se,alphaHash:me,combine:C.combine,mapUv:pt&&E(C.map.channel),aoMapUv:Nt&&E(C.aoMap.channel),lightMapUv:ft&&E(C.lightMap.channel),bumpMapUv:st&&E(C.bumpMap.channel),normalMapUv:Xe&&E(C.normalMap.channel),displacementMapUv:Ft&&E(C.displacementMap.channel),emissiveMapUv:$e&&E(C.emissiveMap.channel),metalnessMapUv:ut&&E(C.metalnessMap.channel),roughnessMapUv:Bt&&E(C.roughnessMap.channel),anisotropyMapUv:he&&E(C.anisotropyMap.channel),clearcoatMapUv:Qe&&E(C.clearcoatMap.channel),clearcoatNormalMapUv:be&&E(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:He&&E(C.clearcoatRoughnessMap.channel),iridescenceMapUv:Je&&E(C.iridescenceMap.channel),iridescenceThicknessMapUv:we&&E(C.iridescenceThicknessMap.channel),sheenColorMapUv:Ue&&E(C.sheenColorMap.channel),sheenRoughnessMapUv:ot&&E(C.sheenRoughnessMap.channel),specularMapUv:Ke&&E(C.specularMap.channel),specularColorMapUv:Pe&&E(C.specularColorMap.channel),specularIntensityMapUv:ht&&E(C.specularIntensityMap.channel),transmissionMapUv:j&&E(C.transmissionMap.channel),thicknessMapUv:Ee&&E(C.thicknessMap.channel),alphaMapUv:Oe&&E(C.alphaMap.channel),vertexTangents:!!re.attributes.tangent&&(Xe||Ht),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!re.attributes.color&&re.attributes.color.itemSize===4,pointsUvs:ie.isPoints===!0&&!!re.attributes.uv&&(pt||Oe),fog:!!Q,useFog:C.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:C.flatShading===!0&&C.wireframe===!1,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:g,reversedDepthBuffer:ye,skinning:ie.isSkinnedMesh===!0,morphTargets:re.morphAttributes.position!==void 0,morphNormals:re.morphAttributes.normal!==void 0,morphColors:re.morphAttributes.color!==void 0,morphTargetsCount:H,morphTextureStride:ae,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:C.dithering,shadowMapEnabled:i.shadowMap.enabled&&G.length>0,shadowMapType:i.shadowMap.type,toneMapping:dt,decodeVideoTexture:pt&&C.map.isVideoTexture===!0&&Ct.getTransfer(C.map.colorSpace)===It,decodeVideoTextureEmissive:$e&&C.emissiveMap.isVideoTexture===!0&&Ct.getTransfer(C.emissiveMap.colorSpace)===It,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===Ki,flipSided:C.side===kn,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionClipCullDistance:Ye&&C.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ye&&C.extensions.multiDraw===!0||Ie)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()};return Pt.vertexUv1s=f.has(1),Pt.vertexUv2s=f.has(2),Pt.vertexUv3s=f.has(3),f.clear(),Pt}function _(C){const R=[];if(C.shaderID?R.push(C.shaderID):(R.push(C.customVertexShaderID),R.push(C.customFragmentShaderID)),C.defines!==void 0)for(const G in C.defines)R.push(G),R.push(C.defines[G]);return C.isRawShaderMaterial===!1&&(N(R,C),P(R,C),R.push(i.outputColorSpace)),R.push(C.customProgramCacheKey),R.join()}function N(C,R){C.push(R.precision),C.push(R.outputColorSpace),C.push(R.envMapMode),C.push(R.envMapCubeUVHeight),C.push(R.mapUv),C.push(R.alphaMapUv),C.push(R.lightMapUv),C.push(R.aoMapUv),C.push(R.bumpMapUv),C.push(R.normalMapUv),C.push(R.displacementMapUv),C.push(R.emissiveMapUv),C.push(R.metalnessMapUv),C.push(R.roughnessMapUv),C.push(R.anisotropyMapUv),C.push(R.clearcoatMapUv),C.push(R.clearcoatNormalMapUv),C.push(R.clearcoatRoughnessMapUv),C.push(R.iridescenceMapUv),C.push(R.iridescenceThicknessMapUv),C.push(R.sheenColorMapUv),C.push(R.sheenRoughnessMapUv),C.push(R.specularMapUv),C.push(R.specularColorMapUv),C.push(R.specularIntensityMapUv),C.push(R.transmissionMapUv),C.push(R.thicknessMapUv),C.push(R.combine),C.push(R.fogExp2),C.push(R.sizeAttenuation),C.push(R.morphTargetsCount),C.push(R.morphAttributeCount),C.push(R.numDirLights),C.push(R.numPointLights),C.push(R.numSpotLights),C.push(R.numSpotLightMaps),C.push(R.numHemiLights),C.push(R.numRectAreaLights),C.push(R.numDirLightShadows),C.push(R.numPointLightShadows),C.push(R.numSpotLightShadows),C.push(R.numSpotLightShadowsWithMaps),C.push(R.numLightProbes),C.push(R.shadowMapType),C.push(R.toneMapping),C.push(R.numClippingPlanes),C.push(R.numClipIntersection),C.push(R.depthPacking)}function P(C,R){d.disableAll(),R.supportsVertexTextures&&d.enable(0),R.instancing&&d.enable(1),R.instancingColor&&d.enable(2),R.instancingMorph&&d.enable(3),R.matcap&&d.enable(4),R.envMap&&d.enable(5),R.normalMapObjectSpace&&d.enable(6),R.normalMapTangentSpace&&d.enable(7),R.clearcoat&&d.enable(8),R.iridescence&&d.enable(9),R.alphaTest&&d.enable(10),R.vertexColors&&d.enable(11),R.vertexAlphas&&d.enable(12),R.vertexUv1s&&d.enable(13),R.vertexUv2s&&d.enable(14),R.vertexUv3s&&d.enable(15),R.vertexTangents&&d.enable(16),R.anisotropy&&d.enable(17),R.alphaHash&&d.enable(18),R.batching&&d.enable(19),R.dispersion&&d.enable(20),R.batchingColor&&d.enable(21),R.gradientMap&&d.enable(22),C.push(d.mask),d.disableAll(),R.fog&&d.enable(0),R.useFog&&d.enable(1),R.flatShading&&d.enable(2),R.logarithmicDepthBuffer&&d.enable(3),R.reversedDepthBuffer&&d.enable(4),R.skinning&&d.enable(5),R.morphTargets&&d.enable(6),R.morphNormals&&d.enable(7),R.morphColors&&d.enable(8),R.premultipliedAlpha&&d.enable(9),R.shadowMapEnabled&&d.enable(10),R.doubleSided&&d.enable(11),R.flipSided&&d.enable(12),R.useDepthPacking&&d.enable(13),R.dithering&&d.enable(14),R.transmission&&d.enable(15),R.sheen&&d.enable(16),R.opaque&&d.enable(17),R.pointsUvs&&d.enable(18),R.decodeVideoTexture&&d.enable(19),R.decodeVideoTextureEmissive&&d.enable(20),R.alphaToCoverage&&d.enable(21),C.push(d.mask)}function b(C){const R=M[C.type];let G;if(R){const q=Ti[R];G=dM.clone(q.uniforms)}else G=C.uniforms;return G}function k(C,R){let G;for(let q=0,ie=m.length;q<ie;q++){const Q=m[q];if(Q.cacheKey===R){G=Q,++G.usedTimes;break}}return G===void 0&&(G=new Bb(i,R,C,l),m.push(G)),G}function B(C){if(--C.usedTimes===0){const R=m.indexOf(C);m[R]=m[m.length-1],m.pop(),C.destroy()}}function I(C){h.remove(C)}function z(){h.dispose()}return{getParameters:y,getProgramCacheKey:_,getUniforms:b,acquireProgram:k,releaseProgram:B,releaseShaderCache:I,programs:m,dispose:z}}function jb(){let i=new WeakMap;function e(u){return i.has(u)}function t(u){let d=i.get(u);return d===void 0&&(d={},i.set(u,d)),d}function s(u){i.delete(u)}function o(u,d,h){i.get(u)[d]=h}function l(){i=new WeakMap}return{has:e,get:t,remove:s,update:o,dispose:l}}function Xb(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Av(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Cv(){const i=[];let e=0;const t=[],s=[],o=[];function l(){e=0,t.length=0,s.length=0,o.length=0}function u(g,x,S,M,E,y){let _=i[e];return _===void 0?(_={id:g.id,object:g,geometry:x,material:S,groupOrder:M,renderOrder:g.renderOrder,z:E,group:y},i[e]=_):(_.id=g.id,_.object=g,_.geometry=x,_.material=S,_.groupOrder=M,_.renderOrder=g.renderOrder,_.z=E,_.group=y),e++,_}function d(g,x,S,M,E,y){const _=u(g,x,S,M,E,y);S.transmission>0?s.push(_):S.transparent===!0?o.push(_):t.push(_)}function h(g,x,S,M,E,y){const _=u(g,x,S,M,E,y);S.transmission>0?s.unshift(_):S.transparent===!0?o.unshift(_):t.unshift(_)}function f(g,x){t.length>1&&t.sort(g||Xb),s.length>1&&s.sort(x||Av),o.length>1&&o.sort(x||Av)}function m(){for(let g=e,x=i.length;g<x;g++){const S=i[g];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:t,transmissive:s,transparent:o,init:l,push:d,unshift:h,finish:m,sort:f}}function $b(){let i=new WeakMap;function e(s,o){const l=i.get(s);let u;return l===void 0?(u=new Cv,i.set(s,[u])):o>=l.length?(u=new Cv,l.push(u)):u=l[o],u}function t(){i=new WeakMap}return{get:e,dispose:t}}function Yb(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Z,color:new Et};break;case"SpotLight":t={position:new Z,direction:new Z,color:new Et,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Z,color:new Et,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Z,skyColor:new Et,groundColor:new Et};break;case"RectAreaLight":t={color:new Et,position:new Z,halfWidth:new Z,halfHeight:new Z};break}return i[e.id]=t,t}}}function qb(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Kb=0;function Zb(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Qb(i){const e=new Yb,t=qb(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let f=0;f<9;f++)s.probe.push(new Z);const o=new Z,l=new Yt,u=new Yt;function d(f){let m=0,g=0,x=0;for(let C=0;C<9;C++)s.probe[C].set(0,0,0);let S=0,M=0,E=0,y=0,_=0,N=0,P=0,b=0,k=0,B=0,I=0;f.sort(Zb);for(let C=0,R=f.length;C<R;C++){const G=f[C],q=G.color,ie=G.intensity,Q=G.distance,re=G.shadow&&G.shadow.map?G.shadow.map.texture:null;if(G.isAmbientLight)m+=q.r*ie,g+=q.g*ie,x+=q.b*ie;else if(G.isLightProbe){for(let te=0;te<9;te++)s.probe[te].addScaledVector(G.sh.coefficients[te],ie);I++}else if(G.isDirectionalLight){const te=e.get(G);if(te.color.copy(G.color).multiplyScalar(G.intensity),G.castShadow){const de=G.shadow,U=t.get(G);U.shadowIntensity=de.intensity,U.shadowBias=de.bias,U.shadowNormalBias=de.normalBias,U.shadowRadius=de.radius,U.shadowMapSize=de.mapSize,s.directionalShadow[S]=U,s.directionalShadowMap[S]=re,s.directionalShadowMatrix[S]=G.shadow.matrix,N++}s.directional[S]=te,S++}else if(G.isSpotLight){const te=e.get(G);te.position.setFromMatrixPosition(G.matrixWorld),te.color.copy(q).multiplyScalar(ie),te.distance=Q,te.coneCos=Math.cos(G.angle),te.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),te.decay=G.decay,s.spot[E]=te;const de=G.shadow;if(G.map&&(s.spotLightMap[k]=G.map,k++,de.updateMatrices(G),G.castShadow&&B++),s.spotLightMatrix[E]=de.matrix,G.castShadow){const U=t.get(G);U.shadowIntensity=de.intensity,U.shadowBias=de.bias,U.shadowNormalBias=de.normalBias,U.shadowRadius=de.radius,U.shadowMapSize=de.mapSize,s.spotShadow[E]=U,s.spotShadowMap[E]=re,b++}E++}else if(G.isRectAreaLight){const te=e.get(G);te.color.copy(q).multiplyScalar(ie),te.halfWidth.set(G.width*.5,0,0),te.halfHeight.set(0,G.height*.5,0),s.rectArea[y]=te,y++}else if(G.isPointLight){const te=e.get(G);if(te.color.copy(G.color).multiplyScalar(G.intensity),te.distance=G.distance,te.decay=G.decay,G.castShadow){const de=G.shadow,U=t.get(G);U.shadowIntensity=de.intensity,U.shadowBias=de.bias,U.shadowNormalBias=de.normalBias,U.shadowRadius=de.radius,U.shadowMapSize=de.mapSize,U.shadowCameraNear=de.camera.near,U.shadowCameraFar=de.camera.far,s.pointShadow[M]=U,s.pointShadowMap[M]=re,s.pointShadowMatrix[M]=G.shadow.matrix,P++}s.point[M]=te,M++}else if(G.isHemisphereLight){const te=e.get(G);te.skyColor.copy(G.color).multiplyScalar(ie),te.groundColor.copy(G.groundColor).multiplyScalar(ie),s.hemi[_]=te,_++}}y>0&&(i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=De.LTC_FLOAT_1,s.rectAreaLTC2=De.LTC_FLOAT_2):(s.rectAreaLTC1=De.LTC_HALF_1,s.rectAreaLTC2=De.LTC_HALF_2)),s.ambient[0]=m,s.ambient[1]=g,s.ambient[2]=x;const z=s.hash;(z.directionalLength!==S||z.pointLength!==M||z.spotLength!==E||z.rectAreaLength!==y||z.hemiLength!==_||z.numDirectionalShadows!==N||z.numPointShadows!==P||z.numSpotShadows!==b||z.numSpotMaps!==k||z.numLightProbes!==I)&&(s.directional.length=S,s.spot.length=E,s.rectArea.length=y,s.point.length=M,s.hemi.length=_,s.directionalShadow.length=N,s.directionalShadowMap.length=N,s.pointShadow.length=P,s.pointShadowMap.length=P,s.spotShadow.length=b,s.spotShadowMap.length=b,s.directionalShadowMatrix.length=N,s.pointShadowMatrix.length=P,s.spotLightMatrix.length=b+k-B,s.spotLightMap.length=k,s.numSpotLightShadowsWithMaps=B,s.numLightProbes=I,z.directionalLength=S,z.pointLength=M,z.spotLength=E,z.rectAreaLength=y,z.hemiLength=_,z.numDirectionalShadows=N,z.numPointShadows=P,z.numSpotShadows=b,z.numSpotMaps=k,z.numLightProbes=I,s.version=Kb++)}function h(f,m){let g=0,x=0,S=0,M=0,E=0;const y=m.matrixWorldInverse;for(let _=0,N=f.length;_<N;_++){const P=f[_];if(P.isDirectionalLight){const b=s.directional[g];b.direction.setFromMatrixPosition(P.matrixWorld),o.setFromMatrixPosition(P.target.matrixWorld),b.direction.sub(o),b.direction.transformDirection(y),g++}else if(P.isSpotLight){const b=s.spot[S];b.position.setFromMatrixPosition(P.matrixWorld),b.position.applyMatrix4(y),b.direction.setFromMatrixPosition(P.matrixWorld),o.setFromMatrixPosition(P.target.matrixWorld),b.direction.sub(o),b.direction.transformDirection(y),S++}else if(P.isRectAreaLight){const b=s.rectArea[M];b.position.setFromMatrixPosition(P.matrixWorld),b.position.applyMatrix4(y),u.identity(),l.copy(P.matrixWorld),l.premultiply(y),u.extractRotation(l),b.halfWidth.set(P.width*.5,0,0),b.halfHeight.set(0,P.height*.5,0),b.halfWidth.applyMatrix4(u),b.halfHeight.applyMatrix4(u),M++}else if(P.isPointLight){const b=s.point[x];b.position.setFromMatrixPosition(P.matrixWorld),b.position.applyMatrix4(y),x++}else if(P.isHemisphereLight){const b=s.hemi[E];b.direction.setFromMatrixPosition(P.matrixWorld),b.direction.transformDirection(y),E++}}}return{setup:d,setupView:h,state:s}}function Rv(i){const e=new Qb(i),t=[],s=[];function o(m){f.camera=m,t.length=0,s.length=0}function l(m){t.push(m)}function u(m){s.push(m)}function d(){e.setup(t)}function h(m){e.setupView(t,m)}const f={lightsArray:t,shadowsArray:s,camera:null,lights:e,transmissionRenderTarget:{}};return{init:o,state:f,setupLights:d,setupLightsView:h,pushLight:l,pushShadow:u}}function Jb(i){let e=new WeakMap;function t(o,l=0){const u=e.get(o);let d;return u===void 0?(d=new Rv(i),e.set(o,[d])):l>=u.length?(d=new Rv(i),u.push(d)):d=u[l],d}function s(){e=new WeakMap}return{get:t,dispose:s}}const eA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function nA(i,e,t){let s=new Dh;const o=new Tt,l=new Tt,u=new Ut,d=new MM({depthPacking:UE}),h=new wM,f={},m=t.maxTextureSize,g={[Fr]:kn,[kn]:Fr,[Ki]:Ki},x=new Or({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Tt},radius:{value:4}},vertexShader:eA,fragmentShader:tA}),S=x.clone();S.defines.HORIZONTAL_PASS=1;const M=new xi;M.setAttribute("position",new vi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new ii(M,x),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=h0;let _=this.type;this.render=function(B,I,z){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||B.length===0)return;const C=i.getRenderTarget(),R=i.getActiveCubeFace(),G=i.getActiveMipmapLevel(),q=i.state;q.setBlending(Dr),q.buffers.depth.getReversed()===!0?q.buffers.color.setClear(0,0,0,0):q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const ie=_!==qi&&this.type===qi,Q=_===qi&&this.type!==qi;for(let re=0,te=B.length;re<te;re++){const de=B[re],U=de.shadow;if(U===void 0){console.warn("THREE.WebGLShadowMap:",de,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;o.copy(U.mapSize);const fe=U.getFrameExtents();if(o.multiply(fe),l.copy(U.mapSize),(o.x>m||o.y>m)&&(o.x>m&&(l.x=Math.floor(m/fe.x),o.x=l.x*fe.x,U.mapSize.x=l.x),o.y>m&&(l.y=Math.floor(m/fe.y),o.y=l.y*fe.y,U.mapSize.y=l.y)),U.map===null||ie===!0||Q===!0){const H=this.type!==qi?{minFilter:gi,magFilter:gi}:{};U.map!==null&&U.map.dispose(),U.map=new ps(o.x,o.y,H),U.map.texture.name=de.name+".shadowMap",U.camera.updateProjectionMatrix()}i.setRenderTarget(U.map),i.clear();const ue=U.getViewportCount();for(let H=0;H<ue;H++){const ae=U.getViewport(H);u.set(l.x*ae.x,l.y*ae.y,l.x*ae.z,l.y*ae.w),q.viewport(u),U.updateMatrices(de,H),s=U.getFrustum(),b(I,z,U.camera,de,this.type)}U.isPointLightShadow!==!0&&this.type===qi&&N(U,z),U.needsUpdate=!1}_=this.type,y.needsUpdate=!1,i.setRenderTarget(C,R,G)};function N(B,I){const z=e.update(E);x.defines.VSM_SAMPLES!==B.blurSamples&&(x.defines.VSM_SAMPLES=B.blurSamples,S.defines.VSM_SAMPLES=B.blurSamples,x.needsUpdate=!0,S.needsUpdate=!0),B.mapPass===null&&(B.mapPass=new ps(o.x,o.y)),x.uniforms.shadow_pass.value=B.map.texture,x.uniforms.resolution.value=B.mapSize,x.uniforms.radius.value=B.radius,i.setRenderTarget(B.mapPass),i.clear(),i.renderBufferDirect(I,null,z,x,E,null),S.uniforms.shadow_pass.value=B.mapPass.texture,S.uniforms.resolution.value=B.mapSize,S.uniforms.radius.value=B.radius,i.setRenderTarget(B.map),i.clear(),i.renderBufferDirect(I,null,z,S,E,null)}function P(B,I,z,C){let R=null;const G=z.isPointLight===!0?B.customDistanceMaterial:B.customDepthMaterial;if(G!==void 0)R=G;else if(R=z.isPointLight===!0?h:d,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const q=R.uuid,ie=I.uuid;let Q=f[q];Q===void 0&&(Q={},f[q]=Q);let re=Q[ie];re===void 0&&(re=R.clone(),Q[ie]=re,I.addEventListener("dispose",k)),R=re}if(R.visible=I.visible,R.wireframe=I.wireframe,C===qi?R.side=I.shadowSide!==null?I.shadowSide:I.side:R.side=I.shadowSide!==null?I.shadowSide:g[I.side],R.alphaMap=I.alphaMap,R.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,R.map=I.map,R.clipShadows=I.clipShadows,R.clippingPlanes=I.clippingPlanes,R.clipIntersection=I.clipIntersection,R.displacementMap=I.displacementMap,R.displacementScale=I.displacementScale,R.displacementBias=I.displacementBias,R.wireframeLinewidth=I.wireframeLinewidth,R.linewidth=I.linewidth,z.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const q=i.properties.get(R);q.light=z}return R}function b(B,I,z,C,R){if(B.visible===!1)return;if(B.layers.test(I.layers)&&(B.isMesh||B.isLine||B.isPoints)&&(B.castShadow||B.receiveShadow&&R===qi)&&(!B.frustumCulled||s.intersectsObject(B))){B.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,B.matrixWorld);const ie=e.update(B),Q=B.material;if(Array.isArray(Q)){const re=ie.groups;for(let te=0,de=re.length;te<de;te++){const U=re[te],fe=Q[U.materialIndex];if(fe&&fe.visible){const ue=P(B,fe,C,R);B.onBeforeShadow(i,B,I,z,ie,ue,U),i.renderBufferDirect(z,null,ie,ue,B,U),B.onAfterShadow(i,B,I,z,ie,ue,U)}}}else if(Q.visible){const re=P(B,Q,C,R);B.onBeforeShadow(i,B,I,z,ie,re,null),i.renderBufferDirect(z,null,ie,re,B,null),B.onAfterShadow(i,B,I,z,ie,re,null)}}const q=B.children;for(let ie=0,Q=q.length;ie<Q;ie++)b(q[ie],I,z,C,R)}function k(B){B.target.removeEventListener("dispose",k);for(const z in f){const C=f[z],R=B.target.uuid;R in C&&(C[R].dispose(),delete C[R])}}}const iA={[Tf]:bf,[Af]:Pf,[Cf]:Lf,[uo]:Rf,[bf]:Tf,[Pf]:Af,[Lf]:Cf,[Rf]:uo};function rA(i,e){function t(){let j=!1;const Ee=new Ut;let Ce=null;const Oe=new Ut(0,0,0,0);return{setMask:function(Se){Ce!==Se&&!j&&(i.colorMask(Se,Se,Se,Se),Ce=Se)},setLocked:function(Se){j=Se},setClear:function(Se,me,Ye,dt,Pt){Pt===!0&&(Se*=dt,me*=dt,Ye*=dt),Ee.set(Se,me,Ye,dt),Oe.equals(Ee)===!1&&(i.clearColor(Se,me,Ye,dt),Oe.copy(Ee))},reset:function(){j=!1,Ce=null,Oe.set(-1,0,0,0)}}}function s(){let j=!1,Ee=!1,Ce=null,Oe=null,Se=null;return{setReversed:function(me){if(Ee!==me){const Ye=e.get("EXT_clip_control");me?Ye.clipControlEXT(Ye.LOWER_LEFT_EXT,Ye.ZERO_TO_ONE_EXT):Ye.clipControlEXT(Ye.LOWER_LEFT_EXT,Ye.NEGATIVE_ONE_TO_ONE_EXT),Ee=me;const dt=Se;Se=null,this.setClear(dt)}},getReversed:function(){return Ee},setTest:function(me){me?se(i.DEPTH_TEST):ye(i.DEPTH_TEST)},setMask:function(me){Ce!==me&&!j&&(i.depthMask(me),Ce=me)},setFunc:function(me){if(Ee&&(me=iA[me]),Oe!==me){switch(me){case Tf:i.depthFunc(i.NEVER);break;case bf:i.depthFunc(i.ALWAYS);break;case Af:i.depthFunc(i.LESS);break;case uo:i.depthFunc(i.LEQUAL);break;case Cf:i.depthFunc(i.EQUAL);break;case Rf:i.depthFunc(i.GEQUAL);break;case Pf:i.depthFunc(i.GREATER);break;case Lf:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Oe=me}},setLocked:function(me){j=me},setClear:function(me){Se!==me&&(Ee&&(me=1-me),i.clearDepth(me),Se=me)},reset:function(){j=!1,Ce=null,Oe=null,Se=null,Ee=!1}}}function o(){let j=!1,Ee=null,Ce=null,Oe=null,Se=null,me=null,Ye=null,dt=null,Pt=null;return{setTest:function(Mt){j||(Mt?se(i.STENCIL_TEST):ye(i.STENCIL_TEST))},setMask:function(Mt){Ee!==Mt&&!j&&(i.stencilMask(Mt),Ee=Mt)},setFunc:function(Mt,Yn,gn){(Ce!==Mt||Oe!==Yn||Se!==gn)&&(i.stencilFunc(Mt,Yn,gn),Ce=Mt,Oe=Yn,Se=gn)},setOp:function(Mt,Yn,gn){(me!==Mt||Ye!==Yn||dt!==gn)&&(i.stencilOp(Mt,Yn,gn),me=Mt,Ye=Yn,dt=gn)},setLocked:function(Mt){j=Mt},setClear:function(Mt){Pt!==Mt&&(i.clearStencil(Mt),Pt=Mt)},reset:function(){j=!1,Ee=null,Ce=null,Oe=null,Se=null,me=null,Ye=null,dt=null,Pt=null}}}const l=new t,u=new s,d=new o,h=new WeakMap,f=new WeakMap;let m={},g={},x=new WeakMap,S=[],M=null,E=!1,y=null,_=null,N=null,P=null,b=null,k=null,B=null,I=new Et(0,0,0),z=0,C=!1,R=null,G=null,q=null,ie=null,Q=null;const re=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let te=!1,de=0;const U=i.getParameter(i.VERSION);U.indexOf("WebGL")!==-1?(de=parseFloat(/^WebGL (\d)/.exec(U)[1]),te=de>=1):U.indexOf("OpenGL ES")!==-1&&(de=parseFloat(/^OpenGL ES (\d)/.exec(U)[1]),te=de>=2);let fe=null,ue={};const H=i.getParameter(i.SCISSOR_BOX),ae=i.getParameter(i.VIEWPORT),Ae=new Ut().fromArray(H),Re=new Ut().fromArray(ae);function Fe(j,Ee,Ce,Oe){const Se=new Uint8Array(4),me=i.createTexture();i.bindTexture(j,me),i.texParameteri(j,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(j,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ye=0;Ye<Ce;Ye++)j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?i.texImage3D(Ee,0,i.RGBA,1,1,Oe,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(Ee+Ye,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return me}const ne={};ne[i.TEXTURE_2D]=Fe(i.TEXTURE_2D,i.TEXTURE_2D,1),ne[i.TEXTURE_CUBE_MAP]=Fe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ne[i.TEXTURE_2D_ARRAY]=Fe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ne[i.TEXTURE_3D]=Fe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),l.setClear(0,0,0,1),u.setClear(1),d.setClear(0),se(i.DEPTH_TEST),u.setFunc(uo),st(!1),Xe(Pg),se(i.CULL_FACE),Nt(Dr);function se(j){m[j]!==!0&&(i.enable(j),m[j]=!0)}function ye(j){m[j]!==!1&&(i.disable(j),m[j]=!1)}function Ne(j,Ee){return g[j]!==Ee?(i.bindFramebuffer(j,Ee),g[j]=Ee,j===i.DRAW_FRAMEBUFFER&&(g[i.FRAMEBUFFER]=Ee),j===i.FRAMEBUFFER&&(g[i.DRAW_FRAMEBUFFER]=Ee),!0):!1}function Ie(j,Ee){let Ce=S,Oe=!1;if(j){Ce=x.get(Ee),Ce===void 0&&(Ce=[],x.set(Ee,Ce));const Se=j.textures;if(Ce.length!==Se.length||Ce[0]!==i.COLOR_ATTACHMENT0){for(let me=0,Ye=Se.length;me<Ye;me++)Ce[me]=i.COLOR_ATTACHMENT0+me;Ce.length=Se.length,Oe=!0}}else Ce[0]!==i.BACK&&(Ce[0]=i.BACK,Oe=!0);Oe&&i.drawBuffers(Ce)}function pt(j){return M!==j?(i.useProgram(j),M=j,!0):!1}const Wt={[cs]:i.FUNC_ADD,[aE]:i.FUNC_SUBTRACT,[lE]:i.FUNC_REVERSE_SUBTRACT};Wt[cE]=i.MIN,Wt[uE]=i.MAX;const V={[dE]:i.ZERO,[fE]:i.ONE,[hE]:i.SRC_COLOR,[Mf]:i.SRC_ALPHA,[xE]:i.SRC_ALPHA_SATURATE,[vE]:i.DST_COLOR,[mE]:i.DST_ALPHA,[pE]:i.ONE_MINUS_SRC_COLOR,[wf]:i.ONE_MINUS_SRC_ALPHA,[_E]:i.ONE_MINUS_DST_COLOR,[gE]:i.ONE_MINUS_DST_ALPHA,[yE]:i.CONSTANT_COLOR,[SE]:i.ONE_MINUS_CONSTANT_COLOR,[EE]:i.CONSTANT_ALPHA,[ME]:i.ONE_MINUS_CONSTANT_ALPHA};function Nt(j,Ee,Ce,Oe,Se,me,Ye,dt,Pt,Mt){if(j===Dr){E===!0&&(ye(i.BLEND),E=!1);return}if(E===!1&&(se(i.BLEND),E=!0),j!==oE){if(j!==y||Mt!==C){if((_!==cs||b!==cs)&&(i.blendEquation(i.FUNC_ADD),_=cs,b=cs),Mt)switch(j){case ao:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ef:i.blendFunc(i.ONE,i.ONE);break;case Lg:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ng:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",j);break}else switch(j){case ao:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ef:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Lg:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ng:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",j);break}N=null,P=null,k=null,B=null,I.set(0,0,0),z=0,y=j,C=Mt}return}Se=Se||Ee,me=me||Ce,Ye=Ye||Oe,(Ee!==_||Se!==b)&&(i.blendEquationSeparate(Wt[Ee],Wt[Se]),_=Ee,b=Se),(Ce!==N||Oe!==P||me!==k||Ye!==B)&&(i.blendFuncSeparate(V[Ce],V[Oe],V[me],V[Ye]),N=Ce,P=Oe,k=me,B=Ye),(dt.equals(I)===!1||Pt!==z)&&(i.blendColor(dt.r,dt.g,dt.b,Pt),I.copy(dt),z=Pt),y=j,C=!1}function ft(j,Ee){j.side===Ki?ye(i.CULL_FACE):se(i.CULL_FACE);let Ce=j.side===kn;Ee&&(Ce=!Ce),st(Ce),j.blending===ao&&j.transparent===!1?Nt(Dr):Nt(j.blending,j.blendEquation,j.blendSrc,j.blendDst,j.blendEquationAlpha,j.blendSrcAlpha,j.blendDstAlpha,j.blendColor,j.blendAlpha,j.premultipliedAlpha),u.setFunc(j.depthFunc),u.setTest(j.depthTest),u.setMask(j.depthWrite),l.setMask(j.colorWrite);const Oe=j.stencilWrite;d.setTest(Oe),Oe&&(d.setMask(j.stencilWriteMask),d.setFunc(j.stencilFunc,j.stencilRef,j.stencilFuncMask),d.setOp(j.stencilFail,j.stencilZFail,j.stencilZPass)),$e(j.polygonOffset,j.polygonOffsetFactor,j.polygonOffsetUnits),j.alphaToCoverage===!0?se(i.SAMPLE_ALPHA_TO_COVERAGE):ye(i.SAMPLE_ALPHA_TO_COVERAGE)}function st(j){R!==j&&(j?i.frontFace(i.CW):i.frontFace(i.CCW),R=j)}function Xe(j){j!==iE?(se(i.CULL_FACE),j!==G&&(j===Pg?i.cullFace(i.BACK):j===rE?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ye(i.CULL_FACE),G=j}function Ft(j){j!==q&&(te&&i.lineWidth(j),q=j)}function $e(j,Ee,Ce){j?(se(i.POLYGON_OFFSET_FILL),(ie!==Ee||Q!==Ce)&&(i.polygonOffset(Ee,Ce),ie=Ee,Q=Ce)):ye(i.POLYGON_OFFSET_FILL)}function ut(j){j?se(i.SCISSOR_TEST):ye(i.SCISSOR_TEST)}function Bt(j){j===void 0&&(j=i.TEXTURE0+re-1),fe!==j&&(i.activeTexture(j),fe=j)}function Ht(j,Ee,Ce){Ce===void 0&&(fe===null?Ce=i.TEXTURE0+re-1:Ce=fe);let Oe=ue[Ce];Oe===void 0&&(Oe={type:void 0,texture:void 0},ue[Ce]=Oe),(Oe.type!==j||Oe.texture!==Ee)&&(fe!==Ce&&(i.activeTexture(Ce),fe=Ce),i.bindTexture(j,Ee||ne[j]),Oe.type=j,Oe.texture=Ee)}function D(){const j=ue[fe];j!==void 0&&j.type!==void 0&&(i.bindTexture(j.type,null),j.type=void 0,j.texture=void 0)}function T(){try{i.compressedTexImage2D(...arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function J(){try{i.compressedTexImage3D(...arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function pe(){try{i.texSubImage2D(...arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function ve(){try{i.texSubImage3D(...arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function he(){try{i.compressedTexSubImage2D(...arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Qe(){try{i.compressedTexSubImage3D(...arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function be(){try{i.texStorage2D(...arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function He(){try{i.texStorage3D(...arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Je(){try{i.texImage2D(...arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function we(){try{i.texImage3D(...arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Ue(j){Ae.equals(j)===!1&&(i.scissor(j.x,j.y,j.z,j.w),Ae.copy(j))}function ot(j){Re.equals(j)===!1&&(i.viewport(j.x,j.y,j.z,j.w),Re.copy(j))}function Ke(j,Ee){let Ce=f.get(Ee);Ce===void 0&&(Ce=new WeakMap,f.set(Ee,Ce));let Oe=Ce.get(j);Oe===void 0&&(Oe=i.getUniformBlockIndex(Ee,j.name),Ce.set(j,Oe))}function Pe(j,Ee){const Oe=f.get(Ee).get(j);h.get(Ee)!==Oe&&(i.uniformBlockBinding(Ee,Oe,j.__bindingPointIndex),h.set(Ee,Oe))}function ht(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),u.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),m={},fe=null,ue={},g={},x=new WeakMap,S=[],M=null,E=!1,y=null,_=null,N=null,P=null,b=null,k=null,B=null,I=new Et(0,0,0),z=0,C=!1,R=null,G=null,q=null,ie=null,Q=null,Ae.set(0,0,i.canvas.width,i.canvas.height),Re.set(0,0,i.canvas.width,i.canvas.height),l.reset(),u.reset(),d.reset()}return{buffers:{color:l,depth:u,stencil:d},enable:se,disable:ye,bindFramebuffer:Ne,drawBuffers:Ie,useProgram:pt,setBlending:Nt,setMaterial:ft,setFlipSided:st,setCullFace:Xe,setLineWidth:Ft,setPolygonOffset:$e,setScissorTest:ut,activeTexture:Bt,bindTexture:Ht,unbindTexture:D,compressedTexImage2D:T,compressedTexImage3D:J,texImage2D:Je,texImage3D:we,updateUBOMapping:Ke,uniformBlockBinding:Pe,texStorage2D:be,texStorage3D:He,texSubImage2D:pe,texSubImage3D:ve,compressedTexSubImage2D:he,compressedTexSubImage3D:Qe,scissor:Ue,viewport:ot,reset:ht}}function sA(i,e,t,s,o,l,u){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),f=new Tt,m=new WeakMap;let g;const x=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(D,T){return S?new OffscreenCanvas(D,T):Rc("canvas")}function E(D,T,J){let pe=1;const ve=Ht(D);if((ve.width>J||ve.height>J)&&(pe=J/Math.max(ve.width,ve.height)),pe<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const he=Math.floor(pe*ve.width),Qe=Math.floor(pe*ve.height);g===void 0&&(g=M(he,Qe));const be=T?M(he,Qe):g;return be.width=he,be.height=Qe,be.getContext("2d").drawImage(D,0,0,he,Qe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ve.width+"x"+ve.height+") to ("+he+"x"+Qe+")."),be}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ve.width+"x"+ve.height+")."),D;return D}function y(D){return D.generateMipmaps}function _(D){i.generateMipmap(D)}function N(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function P(D,T,J,pe,ve=!1){if(D!==null){if(i[D]!==void 0)return i[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let he=T;if(T===i.RED&&(J===i.FLOAT&&(he=i.R32F),J===i.HALF_FLOAT&&(he=i.R16F),J===i.UNSIGNED_BYTE&&(he=i.R8)),T===i.RED_INTEGER&&(J===i.UNSIGNED_BYTE&&(he=i.R8UI),J===i.UNSIGNED_SHORT&&(he=i.R16UI),J===i.UNSIGNED_INT&&(he=i.R32UI),J===i.BYTE&&(he=i.R8I),J===i.SHORT&&(he=i.R16I),J===i.INT&&(he=i.R32I)),T===i.RG&&(J===i.FLOAT&&(he=i.RG32F),J===i.HALF_FLOAT&&(he=i.RG16F),J===i.UNSIGNED_BYTE&&(he=i.RG8)),T===i.RG_INTEGER&&(J===i.UNSIGNED_BYTE&&(he=i.RG8UI),J===i.UNSIGNED_SHORT&&(he=i.RG16UI),J===i.UNSIGNED_INT&&(he=i.RG32UI),J===i.BYTE&&(he=i.RG8I),J===i.SHORT&&(he=i.RG16I),J===i.INT&&(he=i.RG32I)),T===i.RGB_INTEGER&&(J===i.UNSIGNED_BYTE&&(he=i.RGB8UI),J===i.UNSIGNED_SHORT&&(he=i.RGB16UI),J===i.UNSIGNED_INT&&(he=i.RGB32UI),J===i.BYTE&&(he=i.RGB8I),J===i.SHORT&&(he=i.RGB16I),J===i.INT&&(he=i.RGB32I)),T===i.RGBA_INTEGER&&(J===i.UNSIGNED_BYTE&&(he=i.RGBA8UI),J===i.UNSIGNED_SHORT&&(he=i.RGBA16UI),J===i.UNSIGNED_INT&&(he=i.RGBA32UI),J===i.BYTE&&(he=i.RGBA8I),J===i.SHORT&&(he=i.RGBA16I),J===i.INT&&(he=i.RGBA32I)),T===i.RGB&&(J===i.UNSIGNED_INT_5_9_9_9_REV&&(he=i.RGB9_E5),J===i.UNSIGNED_INT_10F_11F_11F_REV&&(he=i.R11F_G11F_B10F)),T===i.RGBA){const Qe=ve?bc:Ct.getTransfer(pe);J===i.FLOAT&&(he=i.RGBA32F),J===i.HALF_FLOAT&&(he=i.RGBA16F),J===i.UNSIGNED_BYTE&&(he=Qe===It?i.SRGB8_ALPHA8:i.RGBA8),J===i.UNSIGNED_SHORT_4_4_4_4&&(he=i.RGBA4),J===i.UNSIGNED_SHORT_5_5_5_1&&(he=i.RGB5_A1)}return(he===i.R16F||he===i.R32F||he===i.RG16F||he===i.RG32F||he===i.RGBA16F||he===i.RGBA32F)&&e.get("EXT_color_buffer_float"),he}function b(D,T){let J;return D?T===null||T===hs||T===va?J=i.DEPTH24_STENCIL8:T===Zi?J=i.DEPTH32F_STENCIL8:T===ga&&(J=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===hs||T===va?J=i.DEPTH_COMPONENT24:T===Zi?J=i.DEPTH_COMPONENT32F:T===ga&&(J=i.DEPTH_COMPONENT16),J}function k(D,T){return y(D)===!0||D.isFramebufferTexture&&D.minFilter!==gi&&D.minFilter!==Ai?Math.log2(Math.max(T.width,T.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?T.mipmaps.length:1}function B(D){const T=D.target;T.removeEventListener("dispose",B),z(T),T.isVideoTexture&&m.delete(T)}function I(D){const T=D.target;T.removeEventListener("dispose",I),R(T)}function z(D){const T=s.get(D);if(T.__webglInit===void 0)return;const J=D.source,pe=x.get(J);if(pe){const ve=pe[T.__cacheKey];ve.usedTimes--,ve.usedTimes===0&&C(D),Object.keys(pe).length===0&&x.delete(J)}s.remove(D)}function C(D){const T=s.get(D);i.deleteTexture(T.__webglTexture);const J=D.source,pe=x.get(J);delete pe[T.__cacheKey],u.memory.textures--}function R(D){const T=s.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),s.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let pe=0;pe<6;pe++){if(Array.isArray(T.__webglFramebuffer[pe]))for(let ve=0;ve<T.__webglFramebuffer[pe].length;ve++)i.deleteFramebuffer(T.__webglFramebuffer[pe][ve]);else i.deleteFramebuffer(T.__webglFramebuffer[pe]);T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer[pe])}else{if(Array.isArray(T.__webglFramebuffer))for(let pe=0;pe<T.__webglFramebuffer.length;pe++)i.deleteFramebuffer(T.__webglFramebuffer[pe]);else i.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&i.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let pe=0;pe<T.__webglColorRenderbuffer.length;pe++)T.__webglColorRenderbuffer[pe]&&i.deleteRenderbuffer(T.__webglColorRenderbuffer[pe]);T.__webglDepthRenderbuffer&&i.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const J=D.textures;for(let pe=0,ve=J.length;pe<ve;pe++){const he=s.get(J[pe]);he.__webglTexture&&(i.deleteTexture(he.__webglTexture),u.memory.textures--),s.remove(J[pe])}s.remove(D)}let G=0;function q(){G=0}function ie(){const D=G;return D>=o.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+o.maxTextures),G+=1,D}function Q(D){const T=[];return T.push(D.wrapS),T.push(D.wrapT),T.push(D.wrapR||0),T.push(D.magFilter),T.push(D.minFilter),T.push(D.anisotropy),T.push(D.internalFormat),T.push(D.format),T.push(D.type),T.push(D.generateMipmaps),T.push(D.premultiplyAlpha),T.push(D.flipY),T.push(D.unpackAlignment),T.push(D.colorSpace),T.join()}function re(D,T){const J=s.get(D);if(D.isVideoTexture&&ut(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&J.__version!==D.version){const pe=D.image;if(pe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(pe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ne(J,D,T);return}}else D.isExternalTexture&&(J.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,J.__webglTexture,i.TEXTURE0+T)}function te(D,T){const J=s.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&J.__version!==D.version){ne(J,D,T);return}t.bindTexture(i.TEXTURE_2D_ARRAY,J.__webglTexture,i.TEXTURE0+T)}function de(D,T){const J=s.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&J.__version!==D.version){ne(J,D,T);return}t.bindTexture(i.TEXTURE_3D,J.__webglTexture,i.TEXTURE0+T)}function U(D,T){const J=s.get(D);if(D.version>0&&J.__version!==D.version){se(J,D,T);return}t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture,i.TEXTURE0+T)}const fe={[If]:i.REPEAT,[ds]:i.CLAMP_TO_EDGE,[Uf]:i.MIRRORED_REPEAT},ue={[gi]:i.NEAREST,[DE]:i.NEAREST_MIPMAP_NEAREST,[Bl]:i.NEAREST_MIPMAP_LINEAR,[Ai]:i.LINEAR,[bd]:i.LINEAR_MIPMAP_NEAREST,[fs]:i.LINEAR_MIPMAP_LINEAR},H={[OE]:i.NEVER,[GE]:i.ALWAYS,[kE]:i.LESS,[T0]:i.LEQUAL,[zE]:i.EQUAL,[VE]:i.GEQUAL,[BE]:i.GREATER,[HE]:i.NOTEQUAL};function ae(D,T){if(T.type===Zi&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===Ai||T.magFilter===bd||T.magFilter===Bl||T.magFilter===fs||T.minFilter===Ai||T.minFilter===bd||T.minFilter===Bl||T.minFilter===fs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,fe[T.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,fe[T.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,fe[T.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,ue[T.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,ue[T.minFilter]),T.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,H[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===gi||T.minFilter!==Bl&&T.minFilter!==fs||T.type===Zi&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||s.get(T).__currentAnisotropy){const J=e.get("EXT_texture_filter_anisotropic");i.texParameterf(D,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,o.getMaxAnisotropy())),s.get(T).__currentAnisotropy=T.anisotropy}}}function Ae(D,T){let J=!1;D.__webglInit===void 0&&(D.__webglInit=!0,T.addEventListener("dispose",B));const pe=T.source;let ve=x.get(pe);ve===void 0&&(ve={},x.set(pe,ve));const he=Q(T);if(he!==D.__cacheKey){ve[he]===void 0&&(ve[he]={texture:i.createTexture(),usedTimes:0},u.memory.textures++,J=!0),ve[he].usedTimes++;const Qe=ve[D.__cacheKey];Qe!==void 0&&(ve[D.__cacheKey].usedTimes--,Qe.usedTimes===0&&C(T)),D.__cacheKey=he,D.__webglTexture=ve[he].texture}return J}function Re(D,T,J){return Math.floor(Math.floor(D/J)/T)}function Fe(D,T,J,pe){const he=D.updateRanges;if(he.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,T.width,T.height,J,pe,T.data);else{he.sort((we,Ue)=>we.start-Ue.start);let Qe=0;for(let we=1;we<he.length;we++){const Ue=he[Qe],ot=he[we],Ke=Ue.start+Ue.count,Pe=Re(ot.start,T.width,4),ht=Re(Ue.start,T.width,4);ot.start<=Ke+1&&Pe===ht&&Re(ot.start+ot.count-1,T.width,4)===Pe?Ue.count=Math.max(Ue.count,ot.start+ot.count-Ue.start):(++Qe,he[Qe]=ot)}he.length=Qe+1;const be=i.getParameter(i.UNPACK_ROW_LENGTH),He=i.getParameter(i.UNPACK_SKIP_PIXELS),Je=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,T.width);for(let we=0,Ue=he.length;we<Ue;we++){const ot=he[we],Ke=Math.floor(ot.start/4),Pe=Math.ceil(ot.count/4),ht=Ke%T.width,j=Math.floor(Ke/T.width),Ee=Pe,Ce=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,ht),i.pixelStorei(i.UNPACK_SKIP_ROWS,j),t.texSubImage2D(i.TEXTURE_2D,0,ht,j,Ee,Ce,J,pe,T.data)}D.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,be),i.pixelStorei(i.UNPACK_SKIP_PIXELS,He),i.pixelStorei(i.UNPACK_SKIP_ROWS,Je)}}function ne(D,T,J){let pe=i.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(pe=i.TEXTURE_2D_ARRAY),T.isData3DTexture&&(pe=i.TEXTURE_3D);const ve=Ae(D,T),he=T.source;t.bindTexture(pe,D.__webglTexture,i.TEXTURE0+J);const Qe=s.get(he);if(he.version!==Qe.__version||ve===!0){t.activeTexture(i.TEXTURE0+J);const be=Ct.getPrimaries(Ct.workingColorSpace),He=T.colorSpace===Nr?null:Ct.getPrimaries(T.colorSpace),Je=T.colorSpace===Nr||be===He?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Je);let we=E(T.image,!1,o.maxTextureSize);we=Bt(T,we);const Ue=l.convert(T.format,T.colorSpace),ot=l.convert(T.type);let Ke=P(T.internalFormat,Ue,ot,T.colorSpace,T.isVideoTexture);ae(pe,T);let Pe;const ht=T.mipmaps,j=T.isVideoTexture!==!0,Ee=Qe.__version===void 0||ve===!0,Ce=he.dataReady,Oe=k(T,we);if(T.isDepthTexture)Ke=b(T.format===xa,T.type),Ee&&(j?t.texStorage2D(i.TEXTURE_2D,1,Ke,we.width,we.height):t.texImage2D(i.TEXTURE_2D,0,Ke,we.width,we.height,0,Ue,ot,null));else if(T.isDataTexture)if(ht.length>0){j&&Ee&&t.texStorage2D(i.TEXTURE_2D,Oe,Ke,ht[0].width,ht[0].height);for(let Se=0,me=ht.length;Se<me;Se++)Pe=ht[Se],j?Ce&&t.texSubImage2D(i.TEXTURE_2D,Se,0,0,Pe.width,Pe.height,Ue,ot,Pe.data):t.texImage2D(i.TEXTURE_2D,Se,Ke,Pe.width,Pe.height,0,Ue,ot,Pe.data);T.generateMipmaps=!1}else j?(Ee&&t.texStorage2D(i.TEXTURE_2D,Oe,Ke,we.width,we.height),Ce&&Fe(T,we,Ue,ot)):t.texImage2D(i.TEXTURE_2D,0,Ke,we.width,we.height,0,Ue,ot,we.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){j&&Ee&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Oe,Ke,ht[0].width,ht[0].height,we.depth);for(let Se=0,me=ht.length;Se<me;Se++)if(Pe=ht[Se],T.format!==mi)if(Ue!==null)if(j){if(Ce)if(T.layerUpdates.size>0){const Ye=sv(Pe.width,Pe.height,T.format,T.type);for(const dt of T.layerUpdates){const Pt=Pe.data.subarray(dt*Ye/Pe.data.BYTES_PER_ELEMENT,(dt+1)*Ye/Pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Se,0,0,dt,Pe.width,Pe.height,1,Ue,Pt)}T.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Se,0,0,0,Pe.width,Pe.height,we.depth,Ue,Pe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Se,Ke,Pe.width,Pe.height,we.depth,0,Pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else j?Ce&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Se,0,0,0,Pe.width,Pe.height,we.depth,Ue,ot,Pe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Se,Ke,Pe.width,Pe.height,we.depth,0,Ue,ot,Pe.data)}else{j&&Ee&&t.texStorage2D(i.TEXTURE_2D,Oe,Ke,ht[0].width,ht[0].height);for(let Se=0,me=ht.length;Se<me;Se++)Pe=ht[Se],T.format!==mi?Ue!==null?j?Ce&&t.compressedTexSubImage2D(i.TEXTURE_2D,Se,0,0,Pe.width,Pe.height,Ue,Pe.data):t.compressedTexImage2D(i.TEXTURE_2D,Se,Ke,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):j?Ce&&t.texSubImage2D(i.TEXTURE_2D,Se,0,0,Pe.width,Pe.height,Ue,ot,Pe.data):t.texImage2D(i.TEXTURE_2D,Se,Ke,Pe.width,Pe.height,0,Ue,ot,Pe.data)}else if(T.isDataArrayTexture)if(j){if(Ee&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Oe,Ke,we.width,we.height,we.depth),Ce)if(T.layerUpdates.size>0){const Se=sv(we.width,we.height,T.format,T.type);for(const me of T.layerUpdates){const Ye=we.data.subarray(me*Se/we.data.BYTES_PER_ELEMENT,(me+1)*Se/we.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,me,we.width,we.height,1,Ue,ot,Ye)}T.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,we.width,we.height,we.depth,Ue,ot,we.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ke,we.width,we.height,we.depth,0,Ue,ot,we.data);else if(T.isData3DTexture)j?(Ee&&t.texStorage3D(i.TEXTURE_3D,Oe,Ke,we.width,we.height,we.depth),Ce&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,we.width,we.height,we.depth,Ue,ot,we.data)):t.texImage3D(i.TEXTURE_3D,0,Ke,we.width,we.height,we.depth,0,Ue,ot,we.data);else if(T.isFramebufferTexture){if(Ee)if(j)t.texStorage2D(i.TEXTURE_2D,Oe,Ke,we.width,we.height);else{let Se=we.width,me=we.height;for(let Ye=0;Ye<Oe;Ye++)t.texImage2D(i.TEXTURE_2D,Ye,Ke,Se,me,0,Ue,ot,null),Se>>=1,me>>=1}}else if(ht.length>0){if(j&&Ee){const Se=Ht(ht[0]);t.texStorage2D(i.TEXTURE_2D,Oe,Ke,Se.width,Se.height)}for(let Se=0,me=ht.length;Se<me;Se++)Pe=ht[Se],j?Ce&&t.texSubImage2D(i.TEXTURE_2D,Se,0,0,Ue,ot,Pe):t.texImage2D(i.TEXTURE_2D,Se,Ke,Ue,ot,Pe);T.generateMipmaps=!1}else if(j){if(Ee){const Se=Ht(we);t.texStorage2D(i.TEXTURE_2D,Oe,Ke,Se.width,Se.height)}Ce&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ue,ot,we)}else t.texImage2D(i.TEXTURE_2D,0,Ke,Ue,ot,we);y(T)&&_(pe),Qe.__version=he.version,T.onUpdate&&T.onUpdate(T)}D.__version=T.version}function se(D,T,J){if(T.image.length!==6)return;const pe=Ae(D,T),ve=T.source;t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+J);const he=s.get(ve);if(ve.version!==he.__version||pe===!0){t.activeTexture(i.TEXTURE0+J);const Qe=Ct.getPrimaries(Ct.workingColorSpace),be=T.colorSpace===Nr?null:Ct.getPrimaries(T.colorSpace),He=T.colorSpace===Nr||Qe===be?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,He);const Je=T.isCompressedTexture||T.image[0].isCompressedTexture,we=T.image[0]&&T.image[0].isDataTexture,Ue=[];for(let me=0;me<6;me++)!Je&&!we?Ue[me]=E(T.image[me],!0,o.maxCubemapSize):Ue[me]=we?T.image[me].image:T.image[me],Ue[me]=Bt(T,Ue[me]);const ot=Ue[0],Ke=l.convert(T.format,T.colorSpace),Pe=l.convert(T.type),ht=P(T.internalFormat,Ke,Pe,T.colorSpace),j=T.isVideoTexture!==!0,Ee=he.__version===void 0||pe===!0,Ce=ve.dataReady;let Oe=k(T,ot);ae(i.TEXTURE_CUBE_MAP,T);let Se;if(Je){j&&Ee&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Oe,ht,ot.width,ot.height);for(let me=0;me<6;me++){Se=Ue[me].mipmaps;for(let Ye=0;Ye<Se.length;Ye++){const dt=Se[Ye];T.format!==mi?Ke!==null?j?Ce&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ye,0,0,dt.width,dt.height,Ke,dt.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ye,ht,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):j?Ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ye,0,0,dt.width,dt.height,Ke,Pe,dt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ye,ht,dt.width,dt.height,0,Ke,Pe,dt.data)}}}else{if(Se=T.mipmaps,j&&Ee){Se.length>0&&Oe++;const me=Ht(Ue[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Oe,ht,me.width,me.height)}for(let me=0;me<6;me++)if(we){j?Ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,Ue[me].width,Ue[me].height,Ke,Pe,Ue[me].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,ht,Ue[me].width,Ue[me].height,0,Ke,Pe,Ue[me].data);for(let Ye=0;Ye<Se.length;Ye++){const Pt=Se[Ye].image[me].image;j?Ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ye+1,0,0,Pt.width,Pt.height,Ke,Pe,Pt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ye+1,ht,Pt.width,Pt.height,0,Ke,Pe,Pt.data)}}else{j?Ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,Ke,Pe,Ue[me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,ht,Ke,Pe,Ue[me]);for(let Ye=0;Ye<Se.length;Ye++){const dt=Se[Ye];j?Ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ye+1,0,0,Ke,Pe,dt.image[me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ye+1,ht,Ke,Pe,dt.image[me])}}}y(T)&&_(i.TEXTURE_CUBE_MAP),he.__version=ve.version,T.onUpdate&&T.onUpdate(T)}D.__version=T.version}function ye(D,T,J,pe,ve,he){const Qe=l.convert(J.format,J.colorSpace),be=l.convert(J.type),He=P(J.internalFormat,Qe,be,J.colorSpace),Je=s.get(T),we=s.get(J);if(we.__renderTarget=T,!Je.__hasExternalTextures){const Ue=Math.max(1,T.width>>he),ot=Math.max(1,T.height>>he);ve===i.TEXTURE_3D||ve===i.TEXTURE_2D_ARRAY?t.texImage3D(ve,he,He,Ue,ot,T.depth,0,Qe,be,null):t.texImage2D(ve,he,He,Ue,ot,0,Qe,be,null)}t.bindFramebuffer(i.FRAMEBUFFER,D),$e(T)?d.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,pe,ve,we.__webglTexture,0,Ft(T)):(ve===i.TEXTURE_2D||ve>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ve<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,pe,ve,we.__webglTexture,he),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ne(D,T,J){if(i.bindRenderbuffer(i.RENDERBUFFER,D),T.depthBuffer){const pe=T.depthTexture,ve=pe&&pe.isDepthTexture?pe.type:null,he=b(T.stencilBuffer,ve),Qe=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,be=Ft(T);$e(T)?d.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,be,he,T.width,T.height):J?i.renderbufferStorageMultisample(i.RENDERBUFFER,be,he,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,he,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Qe,i.RENDERBUFFER,D)}else{const pe=T.textures;for(let ve=0;ve<pe.length;ve++){const he=pe[ve],Qe=l.convert(he.format,he.colorSpace),be=l.convert(he.type),He=P(he.internalFormat,Qe,be,he.colorSpace),Je=Ft(T);J&&$e(T)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Je,He,T.width,T.height):$e(T)?d.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Je,He,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,He,T.width,T.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ie(D,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,D),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const pe=s.get(T.depthTexture);pe.__renderTarget=T,(!pe.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),re(T.depthTexture,0);const ve=pe.__webglTexture,he=Ft(T);if(T.depthTexture.format===_a)$e(T)?d.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ve,0,he):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ve,0);else if(T.depthTexture.format===xa)$e(T)?d.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ve,0,he):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ve,0);else throw new Error("Unknown depthTexture format")}function pt(D){const T=s.get(D),J=D.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==D.depthTexture){const pe=D.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),pe){const ve=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,pe.removeEventListener("dispose",ve)};pe.addEventListener("dispose",ve),T.__depthDisposeCallback=ve}T.__boundDepthTexture=pe}if(D.depthTexture&&!T.__autoAllocateDepthBuffer){if(J)throw new Error("target.depthTexture not supported in Cube render targets");const pe=D.texture.mipmaps;pe&&pe.length>0?Ie(T.__webglFramebuffer[0],D):Ie(T.__webglFramebuffer,D)}else if(J){T.__webglDepthbuffer=[];for(let pe=0;pe<6;pe++)if(t.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[pe]),T.__webglDepthbuffer[pe]===void 0)T.__webglDepthbuffer[pe]=i.createRenderbuffer(),Ne(T.__webglDepthbuffer[pe],D,!1);else{const ve=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=T.__webglDepthbuffer[pe];i.bindRenderbuffer(i.RENDERBUFFER,he),i.framebufferRenderbuffer(i.FRAMEBUFFER,ve,i.RENDERBUFFER,he)}}else{const pe=D.texture.mipmaps;if(pe&&pe.length>0?t.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=i.createRenderbuffer(),Ne(T.__webglDepthbuffer,D,!1);else{const ve=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=T.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,he),i.framebufferRenderbuffer(i.FRAMEBUFFER,ve,i.RENDERBUFFER,he)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Wt(D,T,J){const pe=s.get(D);T!==void 0&&ye(pe.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),J!==void 0&&pt(D)}function V(D){const T=D.texture,J=s.get(D),pe=s.get(T);D.addEventListener("dispose",I);const ve=D.textures,he=D.isWebGLCubeRenderTarget===!0,Qe=ve.length>1;if(Qe||(pe.__webglTexture===void 0&&(pe.__webglTexture=i.createTexture()),pe.__version=T.version,u.memory.textures++),he){J.__webglFramebuffer=[];for(let be=0;be<6;be++)if(T.mipmaps&&T.mipmaps.length>0){J.__webglFramebuffer[be]=[];for(let He=0;He<T.mipmaps.length;He++)J.__webglFramebuffer[be][He]=i.createFramebuffer()}else J.__webglFramebuffer[be]=i.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){J.__webglFramebuffer=[];for(let be=0;be<T.mipmaps.length;be++)J.__webglFramebuffer[be]=i.createFramebuffer()}else J.__webglFramebuffer=i.createFramebuffer();if(Qe)for(let be=0,He=ve.length;be<He;be++){const Je=s.get(ve[be]);Je.__webglTexture===void 0&&(Je.__webglTexture=i.createTexture(),u.memory.textures++)}if(D.samples>0&&$e(D)===!1){J.__webglMultisampledFramebuffer=i.createFramebuffer(),J.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let be=0;be<ve.length;be++){const He=ve[be];J.__webglColorRenderbuffer[be]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,J.__webglColorRenderbuffer[be]);const Je=l.convert(He.format,He.colorSpace),we=l.convert(He.type),Ue=P(He.internalFormat,Je,we,He.colorSpace,D.isXRRenderTarget===!0),ot=Ft(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,ot,Ue,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,J.__webglColorRenderbuffer[be])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(J.__webglDepthRenderbuffer=i.createRenderbuffer(),Ne(J.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(he){t.bindTexture(i.TEXTURE_CUBE_MAP,pe.__webglTexture),ae(i.TEXTURE_CUBE_MAP,T);for(let be=0;be<6;be++)if(T.mipmaps&&T.mipmaps.length>0)for(let He=0;He<T.mipmaps.length;He++)ye(J.__webglFramebuffer[be][He],D,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+be,He);else ye(J.__webglFramebuffer[be],D,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0);y(T)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Qe){for(let be=0,He=ve.length;be<He;be++){const Je=ve[be],we=s.get(Je);let Ue=i.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Ue=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Ue,we.__webglTexture),ae(Ue,Je),ye(J.__webglFramebuffer,D,Je,i.COLOR_ATTACHMENT0+be,Ue,0),y(Je)&&_(Ue)}t.unbindTexture()}else{let be=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(be=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(be,pe.__webglTexture),ae(be,T),T.mipmaps&&T.mipmaps.length>0)for(let He=0;He<T.mipmaps.length;He++)ye(J.__webglFramebuffer[He],D,T,i.COLOR_ATTACHMENT0,be,He);else ye(J.__webglFramebuffer,D,T,i.COLOR_ATTACHMENT0,be,0);y(T)&&_(be),t.unbindTexture()}D.depthBuffer&&pt(D)}function Nt(D){const T=D.textures;for(let J=0,pe=T.length;J<pe;J++){const ve=T[J];if(y(ve)){const he=N(D),Qe=s.get(ve).__webglTexture;t.bindTexture(he,Qe),_(he),t.unbindTexture()}}}const ft=[],st=[];function Xe(D){if(D.samples>0){if($e(D)===!1){const T=D.textures,J=D.width,pe=D.height;let ve=i.COLOR_BUFFER_BIT;const he=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Qe=s.get(D),be=T.length>1;if(be)for(let Je=0;Je<T.length;Je++)t.bindFramebuffer(i.FRAMEBUFFER,Qe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Je,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Qe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Je,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Qe.__webglMultisampledFramebuffer);const He=D.texture.mipmaps;He&&He.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Qe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Qe.__webglFramebuffer);for(let Je=0;Je<T.length;Je++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(ve|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(ve|=i.STENCIL_BUFFER_BIT)),be){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Qe.__webglColorRenderbuffer[Je]);const we=s.get(T[Je]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,we,0)}i.blitFramebuffer(0,0,J,pe,0,0,J,pe,ve,i.NEAREST),h===!0&&(ft.length=0,st.length=0,ft.push(i.COLOR_ATTACHMENT0+Je),D.depthBuffer&&D.resolveDepthBuffer===!1&&(ft.push(he),st.push(he),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,st)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ft))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),be)for(let Je=0;Je<T.length;Je++){t.bindFramebuffer(i.FRAMEBUFFER,Qe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Je,i.RENDERBUFFER,Qe.__webglColorRenderbuffer[Je]);const we=s.get(T[Je]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Qe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Je,i.TEXTURE_2D,we,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Qe.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&h){const T=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[T])}}}function Ft(D){return Math.min(o.maxSamples,D.samples)}function $e(D){const T=s.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function ut(D){const T=u.render.frame;m.get(D)!==T&&(m.set(D,T),D.update())}function Bt(D,T){const J=D.colorSpace,pe=D.format,ve=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||J!==po&&J!==Nr&&(Ct.getTransfer(J)===It?(pe!==mi||ve!==Ri)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",J)),T}function Ht(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(f.width=D.naturalWidth||D.width,f.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(f.width=D.displayWidth,f.height=D.displayHeight):(f.width=D.width,f.height=D.height),f}this.allocateTextureUnit=ie,this.resetTextureUnits=q,this.setTexture2D=re,this.setTexture2DArray=te,this.setTexture3D=de,this.setTextureCube=U,this.rebindTextures=Wt,this.setupRenderTarget=V,this.updateRenderTargetMipmap=Nt,this.updateMultisampleRenderTarget=Xe,this.setupDepthRenderbuffer=pt,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=$e}function oA(i,e){function t(s,o=Nr){let l;const u=Ct.getTransfer(o);if(s===Ri)return i.UNSIGNED_BYTE;if(s===bh)return i.UNSIGNED_SHORT_4_4_4_4;if(s===Ah)return i.UNSIGNED_SHORT_5_5_5_1;if(s===_0)return i.UNSIGNED_INT_5_9_9_9_REV;if(s===x0)return i.UNSIGNED_INT_10F_11F_11F_REV;if(s===g0)return i.BYTE;if(s===v0)return i.SHORT;if(s===ga)return i.UNSIGNED_SHORT;if(s===Th)return i.INT;if(s===hs)return i.UNSIGNED_INT;if(s===Zi)return i.FLOAT;if(s===wa)return i.HALF_FLOAT;if(s===y0)return i.ALPHA;if(s===S0)return i.RGB;if(s===mi)return i.RGBA;if(s===_a)return i.DEPTH_COMPONENT;if(s===xa)return i.DEPTH_STENCIL;if(s===E0)return i.RED;if(s===Ch)return i.RED_INTEGER;if(s===M0)return i.RG;if(s===Rh)return i.RG_INTEGER;if(s===Ph)return i.RGBA_INTEGER;if(s===mc||s===gc||s===vc||s===_c)if(u===It)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(s===mc)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===gc)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===vc)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===_c)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(s===mc)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===gc)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===vc)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===_c)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Ff||s===Of||s===kf||s===zf)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(s===Ff)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Of)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===kf)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===zf)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Bf||s===Hf||s===Vf)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(s===Bf||s===Hf)return u===It?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(s===Vf)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Gf||s===Wf||s===jf||s===Xf||s===$f||s===Yf||s===qf||s===Kf||s===Zf||s===Qf||s===Jf||s===eh||s===th||s===nh)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(s===Gf)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Wf)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===jf)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Xf)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===$f)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Yf)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===qf)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Kf)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Zf)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Qf)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Jf)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===eh)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===th)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===nh)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===ih||s===rh||s===sh)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(s===ih)return u===It?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===rh)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===sh)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===oh||s===ah||s===lh||s===ch)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(s===oh)return l.COMPRESSED_RED_RGTC1_EXT;if(s===ah)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===lh)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===ch)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===va?i.UNSIGNED_INT_24_8:i[s]!==void 0?i[s]:null}return{convert:t}}const aA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,lA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class cA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const s=new z0(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,s=new Or({vertexShader:aA,fragmentShader:lA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ii(new Ic(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class uA extends _o{constructor(e,t){super();const s=this;let o=null,l=1,u=null,d="local-floor",h=1,f=null,m=null,g=null,x=null,S=null,M=null;const E=typeof XRWebGLBinding<"u",y=new cA,_={},N=t.getContextAttributes();let P=null,b=null;const k=[],B=[],I=new Tt;let z=null;const C=new On;C.viewport=new Ut;const R=new On;R.viewport=new Ut;const G=[C,R],q=new LM;let ie=null,Q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ne){let se=k[ne];return se===void 0&&(se=new qd,k[ne]=se),se.getTargetRaySpace()},this.getControllerGrip=function(ne){let se=k[ne];return se===void 0&&(se=new qd,k[ne]=se),se.getGripSpace()},this.getHand=function(ne){let se=k[ne];return se===void 0&&(se=new qd,k[ne]=se),se.getHandSpace()};function re(ne){const se=B.indexOf(ne.inputSource);if(se===-1)return;const ye=k[se];ye!==void 0&&(ye.update(ne.inputSource,ne.frame,f||u),ye.dispatchEvent({type:ne.type,data:ne.inputSource}))}function te(){o.removeEventListener("select",re),o.removeEventListener("selectstart",re),o.removeEventListener("selectend",re),o.removeEventListener("squeeze",re),o.removeEventListener("squeezestart",re),o.removeEventListener("squeezeend",re),o.removeEventListener("end",te),o.removeEventListener("inputsourceschange",de);for(let ne=0;ne<k.length;ne++){const se=B[ne];se!==null&&(B[ne]=null,k[ne].disconnect(se))}ie=null,Q=null,y.reset();for(const ne in _)delete _[ne];e.setRenderTarget(P),S=null,x=null,g=null,o=null,b=null,Fe.stop(),s.isPresenting=!1,e.setPixelRatio(z),e.setSize(I.width,I.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ne){l=ne,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ne){d=ne,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return f||u},this.setReferenceSpace=function(ne){f=ne},this.getBaseLayer=function(){return x!==null?x:S},this.getBinding=function(){return g===null&&E&&(g=new XRWebGLBinding(o,t)),g},this.getFrame=function(){return M},this.getSession=function(){return o},this.setSession=async function(ne){if(o=ne,o!==null){if(P=e.getRenderTarget(),o.addEventListener("select",re),o.addEventListener("selectstart",re),o.addEventListener("selectend",re),o.addEventListener("squeeze",re),o.addEventListener("squeezestart",re),o.addEventListener("squeezeend",re),o.addEventListener("end",te),o.addEventListener("inputsourceschange",de),N.xrCompatible!==!0&&await t.makeXRCompatible(),z=e.getPixelRatio(),e.getSize(I),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,Ne=null,Ie=null;N.depth&&(Ie=N.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=N.stencil?xa:_a,Ne=N.stencil?va:hs);const pt={colorFormat:t.RGBA8,depthFormat:Ie,scaleFactor:l};g=this.getBinding(),x=g.createProjectionLayer(pt),o.updateRenderState({layers:[x]}),e.setPixelRatio(1),e.setSize(x.textureWidth,x.textureHeight,!1),b=new ps(x.textureWidth,x.textureHeight,{format:mi,type:Ri,depthTexture:new k0(x.textureWidth,x.textureHeight,Ne,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:N.stencil,colorSpace:e.outputColorSpace,samples:N.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}else{const ye={antialias:N.antialias,alpha:!0,depth:N.depth,stencil:N.stencil,framebufferScaleFactor:l};S=new XRWebGLLayer(o,t,ye),o.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),b=new ps(S.framebufferWidth,S.framebufferHeight,{format:mi,type:Ri,colorSpace:e.outputColorSpace,stencilBuffer:N.stencil,resolveDepthBuffer:S.ignoreDepthValues===!1,resolveStencilBuffer:S.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(h),f=null,u=await o.requestReferenceSpace(d),Fe.setContext(o),Fe.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function de(ne){for(let se=0;se<ne.removed.length;se++){const ye=ne.removed[se],Ne=B.indexOf(ye);Ne>=0&&(B[Ne]=null,k[Ne].disconnect(ye))}for(let se=0;se<ne.added.length;se++){const ye=ne.added[se];let Ne=B.indexOf(ye);if(Ne===-1){for(let pt=0;pt<k.length;pt++)if(pt>=B.length){B.push(ye),Ne=pt;break}else if(B[pt]===null){B[pt]=ye,Ne=pt;break}if(Ne===-1)break}const Ie=k[Ne];Ie&&Ie.connect(ye)}}const U=new Z,fe=new Z;function ue(ne,se,ye){U.setFromMatrixPosition(se.matrixWorld),fe.setFromMatrixPosition(ye.matrixWorld);const Ne=U.distanceTo(fe),Ie=se.projectionMatrix.elements,pt=ye.projectionMatrix.elements,Wt=Ie[14]/(Ie[10]-1),V=Ie[14]/(Ie[10]+1),Nt=(Ie[9]+1)/Ie[5],ft=(Ie[9]-1)/Ie[5],st=(Ie[8]-1)/Ie[0],Xe=(pt[8]+1)/pt[0],Ft=Wt*st,$e=Wt*Xe,ut=Ne/(-st+Xe),Bt=ut*-st;if(se.matrixWorld.decompose(ne.position,ne.quaternion,ne.scale),ne.translateX(Bt),ne.translateZ(ut),ne.matrixWorld.compose(ne.position,ne.quaternion,ne.scale),ne.matrixWorldInverse.copy(ne.matrixWorld).invert(),Ie[10]===-1)ne.projectionMatrix.copy(se.projectionMatrix),ne.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const Ht=Wt+ut,D=V+ut,T=Ft-Bt,J=$e+(Ne-Bt),pe=Nt*V/D*Ht,ve=ft*V/D*Ht;ne.projectionMatrix.makePerspective(T,J,pe,ve,Ht,D),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert()}}function H(ne,se){se===null?ne.matrixWorld.copy(ne.matrix):ne.matrixWorld.multiplyMatrices(se.matrixWorld,ne.matrix),ne.matrixWorldInverse.copy(ne.matrixWorld).invert()}this.updateCamera=function(ne){if(o===null)return;let se=ne.near,ye=ne.far;y.texture!==null&&(y.depthNear>0&&(se=y.depthNear),y.depthFar>0&&(ye=y.depthFar)),q.near=R.near=C.near=se,q.far=R.far=C.far=ye,(ie!==q.near||Q!==q.far)&&(o.updateRenderState({depthNear:q.near,depthFar:q.far}),ie=q.near,Q=q.far),q.layers.mask=ne.layers.mask|6,C.layers.mask=q.layers.mask&3,R.layers.mask=q.layers.mask&5;const Ne=ne.parent,Ie=q.cameras;H(q,Ne);for(let pt=0;pt<Ie.length;pt++)H(Ie[pt],Ne);Ie.length===2?ue(q,C,R):q.projectionMatrix.copy(C.projectionMatrix),ae(ne,q,Ne)};function ae(ne,se,ye){ye===null?ne.matrix.copy(se.matrixWorld):(ne.matrix.copy(ye.matrixWorld),ne.matrix.invert(),ne.matrix.multiply(se.matrixWorld)),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.updateMatrixWorld(!0),ne.projectionMatrix.copy(se.projectionMatrix),ne.projectionMatrixInverse.copy(se.projectionMatrixInverse),ne.isPerspectiveCamera&&(ne.fov=Cc*2*Math.atan(1/ne.projectionMatrix.elements[5]),ne.zoom=1)}this.getCamera=function(){return q},this.getFoveation=function(){if(!(x===null&&S===null))return h},this.setFoveation=function(ne){h=ne,x!==null&&(x.fixedFoveation=ne),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=ne)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(q)},this.getCameraTexture=function(ne){return _[ne]};let Ae=null;function Re(ne,se){if(m=se.getViewerPose(f||u),M=se,m!==null){const ye=m.views;S!==null&&(e.setRenderTargetFramebuffer(b,S.framebuffer),e.setRenderTarget(b));let Ne=!1;ye.length!==q.cameras.length&&(q.cameras.length=0,Ne=!0);for(let V=0;V<ye.length;V++){const Nt=ye[V];let ft=null;if(S!==null)ft=S.getViewport(Nt);else{const Xe=g.getViewSubImage(x,Nt);ft=Xe.viewport,V===0&&(e.setRenderTargetTextures(b,Xe.colorTexture,Xe.depthStencilTexture),e.setRenderTarget(b))}let st=G[V];st===void 0&&(st=new On,st.layers.enable(V),st.viewport=new Ut,G[V]=st),st.matrix.fromArray(Nt.transform.matrix),st.matrix.decompose(st.position,st.quaternion,st.scale),st.projectionMatrix.fromArray(Nt.projectionMatrix),st.projectionMatrixInverse.copy(st.projectionMatrix).invert(),st.viewport.set(ft.x,ft.y,ft.width,ft.height),V===0&&(q.matrix.copy(st.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale)),Ne===!0&&q.cameras.push(st)}const Ie=o.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&E){g=s.getBinding();const V=g.getDepthInformation(ye[0]);V&&V.isValid&&V.texture&&y.init(V,o.renderState)}if(Ie&&Ie.includes("camera-access")&&E){e.state.unbindTexture(),g=s.getBinding();for(let V=0;V<ye.length;V++){const Nt=ye[V].camera;if(Nt){let ft=_[Nt];ft||(ft=new z0,_[Nt]=ft);const st=g.getCameraImage(Nt);ft.sourceTexture=st}}}}for(let ye=0;ye<k.length;ye++){const Ne=B[ye],Ie=k[ye];Ne!==null&&Ie!==void 0&&Ie.update(Ne,se,f||u)}Ae&&Ae(ne,se),se.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:se}),M=null}const Fe=new H0;Fe.setAnimationLoop(Re),this.setAnimationLoop=function(ne){Ae=ne},this.dispose=function(){}}}const os=new Pi,dA=new Yt;function fA(i,e){function t(y,_){y.matrixAutoUpdate===!0&&y.updateMatrix(),_.value.copy(y.matrix)}function s(y,_){_.color.getRGB(y.fogColor.value,I0(i)),_.isFog?(y.fogNear.value=_.near,y.fogFar.value=_.far):_.isFogExp2&&(y.fogDensity.value=_.density)}function o(y,_,N,P,b){_.isMeshBasicMaterial||_.isMeshLambertMaterial?l(y,_):_.isMeshToonMaterial?(l(y,_),g(y,_)):_.isMeshPhongMaterial?(l(y,_),m(y,_)):_.isMeshStandardMaterial?(l(y,_),x(y,_),_.isMeshPhysicalMaterial&&S(y,_,b)):_.isMeshMatcapMaterial?(l(y,_),M(y,_)):_.isMeshDepthMaterial?l(y,_):_.isMeshDistanceMaterial?(l(y,_),E(y,_)):_.isMeshNormalMaterial?l(y,_):_.isLineBasicMaterial?(u(y,_),_.isLineDashedMaterial&&d(y,_)):_.isPointsMaterial?h(y,_,N,P):_.isSpriteMaterial?f(y,_):_.isShadowMaterial?(y.color.value.copy(_.color),y.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function l(y,_){y.opacity.value=_.opacity,_.color&&y.diffuse.value.copy(_.color),_.emissive&&y.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(y.map.value=_.map,t(_.map,y.mapTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,t(_.alphaMap,y.alphaMapTransform)),_.bumpMap&&(y.bumpMap.value=_.bumpMap,t(_.bumpMap,y.bumpMapTransform),y.bumpScale.value=_.bumpScale,_.side===kn&&(y.bumpScale.value*=-1)),_.normalMap&&(y.normalMap.value=_.normalMap,t(_.normalMap,y.normalMapTransform),y.normalScale.value.copy(_.normalScale),_.side===kn&&y.normalScale.value.negate()),_.displacementMap&&(y.displacementMap.value=_.displacementMap,t(_.displacementMap,y.displacementMapTransform),y.displacementScale.value=_.displacementScale,y.displacementBias.value=_.displacementBias),_.emissiveMap&&(y.emissiveMap.value=_.emissiveMap,t(_.emissiveMap,y.emissiveMapTransform)),_.specularMap&&(y.specularMap.value=_.specularMap,t(_.specularMap,y.specularMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest);const N=e.get(_),P=N.envMap,b=N.envMapRotation;P&&(y.envMap.value=P,os.copy(b),os.x*=-1,os.y*=-1,os.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(os.y*=-1,os.z*=-1),y.envMapRotation.value.setFromMatrix4(dA.makeRotationFromEuler(os)),y.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=_.reflectivity,y.ior.value=_.ior,y.refractionRatio.value=_.refractionRatio),_.lightMap&&(y.lightMap.value=_.lightMap,y.lightMapIntensity.value=_.lightMapIntensity,t(_.lightMap,y.lightMapTransform)),_.aoMap&&(y.aoMap.value=_.aoMap,y.aoMapIntensity.value=_.aoMapIntensity,t(_.aoMap,y.aoMapTransform))}function u(y,_){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,_.map&&(y.map.value=_.map,t(_.map,y.mapTransform))}function d(y,_){y.dashSize.value=_.dashSize,y.totalSize.value=_.dashSize+_.gapSize,y.scale.value=_.scale}function h(y,_,N,P){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,y.size.value=_.size*N,y.scale.value=P*.5,_.map&&(y.map.value=_.map,t(_.map,y.uvTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,t(_.alphaMap,y.alphaMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest)}function f(y,_){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,y.rotation.value=_.rotation,_.map&&(y.map.value=_.map,t(_.map,y.mapTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,t(_.alphaMap,y.alphaMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest)}function m(y,_){y.specular.value.copy(_.specular),y.shininess.value=Math.max(_.shininess,1e-4)}function g(y,_){_.gradientMap&&(y.gradientMap.value=_.gradientMap)}function x(y,_){y.metalness.value=_.metalness,_.metalnessMap&&(y.metalnessMap.value=_.metalnessMap,t(_.metalnessMap,y.metalnessMapTransform)),y.roughness.value=_.roughness,_.roughnessMap&&(y.roughnessMap.value=_.roughnessMap,t(_.roughnessMap,y.roughnessMapTransform)),_.envMap&&(y.envMapIntensity.value=_.envMapIntensity)}function S(y,_,N){y.ior.value=_.ior,_.sheen>0&&(y.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),y.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(y.sheenColorMap.value=_.sheenColorMap,t(_.sheenColorMap,y.sheenColorMapTransform)),_.sheenRoughnessMap&&(y.sheenRoughnessMap.value=_.sheenRoughnessMap,t(_.sheenRoughnessMap,y.sheenRoughnessMapTransform))),_.clearcoat>0&&(y.clearcoat.value=_.clearcoat,y.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(y.clearcoatMap.value=_.clearcoatMap,t(_.clearcoatMap,y.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,t(_.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(y.clearcoatNormalMap.value=_.clearcoatNormalMap,t(_.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===kn&&y.clearcoatNormalScale.value.negate())),_.dispersion>0&&(y.dispersion.value=_.dispersion),_.iridescence>0&&(y.iridescence.value=_.iridescence,y.iridescenceIOR.value=_.iridescenceIOR,y.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(y.iridescenceMap.value=_.iridescenceMap,t(_.iridescenceMap,y.iridescenceMapTransform)),_.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=_.iridescenceThicknessMap,t(_.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),_.transmission>0&&(y.transmission.value=_.transmission,y.transmissionSamplerMap.value=N.texture,y.transmissionSamplerSize.value.set(N.width,N.height),_.transmissionMap&&(y.transmissionMap.value=_.transmissionMap,t(_.transmissionMap,y.transmissionMapTransform)),y.thickness.value=_.thickness,_.thicknessMap&&(y.thicknessMap.value=_.thicknessMap,t(_.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=_.attenuationDistance,y.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(y.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(y.anisotropyMap.value=_.anisotropyMap,t(_.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=_.specularIntensity,y.specularColor.value.copy(_.specularColor),_.specularColorMap&&(y.specularColorMap.value=_.specularColorMap,t(_.specularColorMap,y.specularColorMapTransform)),_.specularIntensityMap&&(y.specularIntensityMap.value=_.specularIntensityMap,t(_.specularIntensityMap,y.specularIntensityMapTransform))}function M(y,_){_.matcap&&(y.matcap.value=_.matcap)}function E(y,_){const N=e.get(_).light;y.referencePosition.value.setFromMatrixPosition(N.matrixWorld),y.nearDistance.value=N.shadow.camera.near,y.farDistance.value=N.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:o}}function hA(i,e,t,s){let o={},l={},u=[];const d=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function h(N,P){const b=P.program;s.uniformBlockBinding(N,b)}function f(N,P){let b=o[N.id];b===void 0&&(M(N),b=m(N),o[N.id]=b,N.addEventListener("dispose",y));const k=P.program;s.updateUBOMapping(N,k);const B=e.render.frame;l[N.id]!==B&&(x(N),l[N.id]=B)}function m(N){const P=g();N.__bindingPointIndex=P;const b=i.createBuffer(),k=N.__size,B=N.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,k,B),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,P,b),b}function g(){for(let N=0;N<d;N++)if(u.indexOf(N)===-1)return u.push(N),N;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(N){const P=o[N.id],b=N.uniforms,k=N.__cache;i.bindBuffer(i.UNIFORM_BUFFER,P);for(let B=0,I=b.length;B<I;B++){const z=Array.isArray(b[B])?b[B]:[b[B]];for(let C=0,R=z.length;C<R;C++){const G=z[C];if(S(G,B,C,k)===!0){const q=G.__offset,ie=Array.isArray(G.value)?G.value:[G.value];let Q=0;for(let re=0;re<ie.length;re++){const te=ie[re],de=E(te);typeof te=="number"||typeof te=="boolean"?(G.__data[0]=te,i.bufferSubData(i.UNIFORM_BUFFER,q+Q,G.__data)):te.isMatrix3?(G.__data[0]=te.elements[0],G.__data[1]=te.elements[1],G.__data[2]=te.elements[2],G.__data[3]=0,G.__data[4]=te.elements[3],G.__data[5]=te.elements[4],G.__data[6]=te.elements[5],G.__data[7]=0,G.__data[8]=te.elements[6],G.__data[9]=te.elements[7],G.__data[10]=te.elements[8],G.__data[11]=0):(te.toArray(G.__data,Q),Q+=de.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,q,G.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function S(N,P,b,k){const B=N.value,I=P+"_"+b;if(k[I]===void 0)return typeof B=="number"||typeof B=="boolean"?k[I]=B:k[I]=B.clone(),!0;{const z=k[I];if(typeof B=="number"||typeof B=="boolean"){if(z!==B)return k[I]=B,!0}else if(z.equals(B)===!1)return z.copy(B),!0}return!1}function M(N){const P=N.uniforms;let b=0;const k=16;for(let I=0,z=P.length;I<z;I++){const C=Array.isArray(P[I])?P[I]:[P[I]];for(let R=0,G=C.length;R<G;R++){const q=C[R],ie=Array.isArray(q.value)?q.value:[q.value];for(let Q=0,re=ie.length;Q<re;Q++){const te=ie[Q],de=E(te),U=b%k,fe=U%de.boundary,ue=U+fe;b+=fe,ue!==0&&k-ue<de.storage&&(b+=k-ue),q.__data=new Float32Array(de.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=b,b+=de.storage}}}const B=b%k;return B>0&&(b+=k-B),N.__size=b,N.__cache={},this}function E(N){const P={boundary:0,storage:0};return typeof N=="number"||typeof N=="boolean"?(P.boundary=4,P.storage=4):N.isVector2?(P.boundary=8,P.storage=8):N.isVector3||N.isColor?(P.boundary=16,P.storage=12):N.isVector4?(P.boundary=16,P.storage=16):N.isMatrix3?(P.boundary=48,P.storage=48):N.isMatrix4?(P.boundary=64,P.storage=64):N.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",N),P}function y(N){const P=N.target;P.removeEventListener("dispose",y);const b=u.indexOf(P.__bindingPointIndex);u.splice(b,1),i.deleteBuffer(o[P.id]),delete o[P.id],delete l[P.id]}function _(){for(const N in o)i.deleteBuffer(o[N]);u=[],o={},l={}}return{bind:h,update:f,dispose:_}}class pA{constructor(e={}){const{canvas:t=jE(),context:s=null,depth:o=!0,stencil:l=!1,alpha:u=!1,antialias:d=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:f=!1,powerPreference:m="default",failIfMajorPerformanceCaveat:g=!1,reversedDepthBuffer:x=!1}=e;this.isWebGLRenderer=!0;let S;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=s.getContextAttributes().alpha}else S=u;const M=new Uint32Array(4),E=new Int32Array(4);let y=null,_=null;const N=[],P=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ir,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let k=!1;this._outputColorSpace=ni;let B=0,I=0,z=null,C=-1,R=null;const G=new Ut,q=new Ut;let ie=null;const Q=new Et(0);let re=0,te=t.width,de=t.height,U=1,fe=null,ue=null;const H=new Ut(0,0,te,de),ae=new Ut(0,0,te,de);let Ae=!1;const Re=new Dh;let Fe=!1,ne=!1;const se=new Yt,ye=new Z,Ne=new Ut,Ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pt=!1;function Wt(){return z===null?U:1}let V=s;function Nt(A,Y){return t.getContext(A,Y)}try{const A={alpha:!0,depth:o,stencil:l,antialias:d,premultipliedAlpha:h,preserveDrawingBuffer:f,powerPreference:m,failIfMajorPerformanceCaveat:g};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${wh}`),t.addEventListener("webglcontextlost",Ce,!1),t.addEventListener("webglcontextrestored",Oe,!1),t.addEventListener("webglcontextcreationerror",Se,!1),V===null){const Y="webgl2";if(V=Nt(Y,A),V===null)throw Nt(Y)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let ft,st,Xe,Ft,$e,ut,Bt,Ht,D,T,J,pe,ve,he,Qe,be,He,Je,we,Ue,ot,Ke,Pe,ht;function j(){ft=new wT(V),ft.init(),Ke=new oA(V,ft),st=new vT(V,ft,e,Ke),Xe=new rA(V,ft),st.reversedDepthBuffer&&x&&Xe.buffers.depth.setReversed(!0),Ft=new AT(V),$e=new jb,ut=new sA(V,ft,Xe,$e,st,Ke,Ft),Bt=new xT(b),Ht=new MT(b),D=new DM(V),Pe=new mT(V,D),T=new TT(V,D,Ft,Pe),J=new RT(V,T,D,Ft),we=new CT(V,st,ut),be=new _T($e),pe=new Wb(b,Bt,Ht,ft,st,Pe,be),ve=new fA(b,$e),he=new $b,Qe=new Jb(ft),Je=new pT(b,Bt,Ht,Xe,J,S,h),He=new nA(b,J,st),ht=new hA(V,Ft,st,Xe),Ue=new gT(V,ft,Ft),ot=new bT(V,ft,Ft),Ft.programs=pe.programs,b.capabilities=st,b.extensions=ft,b.properties=$e,b.renderLists=he,b.shadowMap=He,b.state=Xe,b.info=Ft}j();const Ee=new uA(b,V);this.xr=Ee,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const A=ft.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=ft.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return U},this.setPixelRatio=function(A){A!==void 0&&(U=A,this.setSize(te,de,!1))},this.getSize=function(A){return A.set(te,de)},this.setSize=function(A,Y,le=!0){if(Ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}te=A,de=Y,t.width=Math.floor(A*U),t.height=Math.floor(Y*U),le===!0&&(t.style.width=A+"px",t.style.height=Y+"px"),this.setViewport(0,0,A,Y)},this.getDrawingBufferSize=function(A){return A.set(te*U,de*U).floor()},this.setDrawingBufferSize=function(A,Y,le){te=A,de=Y,U=le,t.width=Math.floor(A*le),t.height=Math.floor(Y*le),this.setViewport(0,0,A,Y)},this.getCurrentViewport=function(A){return A.copy(G)},this.getViewport=function(A){return A.copy(H)},this.setViewport=function(A,Y,le,ce){A.isVector4?H.set(A.x,A.y,A.z,A.w):H.set(A,Y,le,ce),Xe.viewport(G.copy(H).multiplyScalar(U).round())},this.getScissor=function(A){return A.copy(ae)},this.setScissor=function(A,Y,le,ce){A.isVector4?ae.set(A.x,A.y,A.z,A.w):ae.set(A,Y,le,ce),Xe.scissor(q.copy(ae).multiplyScalar(U).round())},this.getScissorTest=function(){return Ae},this.setScissorTest=function(A){Xe.setScissorTest(Ae=A)},this.setOpaqueSort=function(A){fe=A},this.setTransparentSort=function(A){ue=A},this.getClearColor=function(A){return A.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor(...arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha(...arguments)},this.clear=function(A=!0,Y=!0,le=!0){let ce=0;if(A){let $=!1;if(z!==null){const Me=z.texture.format;$=Me===Ph||Me===Rh||Me===Ch}if($){const Me=z.texture.type,Le=Me===Ri||Me===hs||Me===ga||Me===va||Me===bh||Me===Ah,Ve=Je.getClearColor(),ke=Je.getClearAlpha(),rt=Ve.r,at=Ve.g,et=Ve.b;Le?(M[0]=rt,M[1]=at,M[2]=et,M[3]=ke,V.clearBufferuiv(V.COLOR,0,M)):(E[0]=rt,E[1]=at,E[2]=et,E[3]=ke,V.clearBufferiv(V.COLOR,0,E))}else ce|=V.COLOR_BUFFER_BIT}Y&&(ce|=V.DEPTH_BUFFER_BIT),le&&(ce|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V.clear(ce)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ce,!1),t.removeEventListener("webglcontextrestored",Oe,!1),t.removeEventListener("webglcontextcreationerror",Se,!1),Je.dispose(),he.dispose(),Qe.dispose(),$e.dispose(),Bt.dispose(),Ht.dispose(),J.dispose(),Pe.dispose(),ht.dispose(),pe.dispose(),Ee.dispose(),Ee.removeEventListener("sessionstart",gn),Ee.removeEventListener("sessionend",vs),Bn.stop()};function Ce(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),k=!0}function Oe(){console.log("THREE.WebGLRenderer: Context Restored."),k=!1;const A=Ft.autoReset,Y=He.enabled,le=He.autoUpdate,ce=He.needsUpdate,$=He.type;j(),Ft.autoReset=A,He.enabled=Y,He.autoUpdate=le,He.needsUpdate=ce,He.type=$}function Se(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function me(A){const Y=A.target;Y.removeEventListener("dispose",me),Ye(Y)}function Ye(A){dt(A),$e.remove(A)}function dt(A){const Y=$e.get(A).programs;Y!==void 0&&(Y.forEach(function(le){pe.releaseProgram(le)}),A.isShaderMaterial&&pe.releaseShaderCache(A))}this.renderBufferDirect=function(A,Y,le,ce,$,Me){Y===null&&(Y=Ie);const Le=$.isMesh&&$.matrixWorld.determinant()<0,Ve=Ii(A,Y,le,ce,$);Xe.setMaterial(ce,Le);let ke=le.index,rt=1;if(ce.wireframe===!0){if(ke=T.getWireframeAttribute(le),ke===void 0)return;rt=2}const at=le.drawRange,et=le.attributes.position;let lt=at.start*rt,Rt=(at.start+at.count)*rt;Me!==null&&(lt=Math.max(lt,Me.start*rt),Rt=Math.min(Rt,(Me.start+Me.count)*rt)),ke!==null?(lt=Math.max(lt,0),Rt=Math.min(Rt,ke.count)):et!=null&&(lt=Math.max(lt,0),Rt=Math.min(Rt,et.count));const wt=Rt-lt;if(wt<0||wt===1/0)return;Pe.setup($,ce,Ve,le,ke);let Ot,Lt=Ue;if(ke!==null&&(Ot=D.get(ke),Lt=ot,Lt.setIndex(Ot)),$.isMesh)ce.wireframe===!0?(Xe.setLineWidth(ce.wireframeLinewidth*Wt()),Lt.setMode(V.LINES)):Lt.setMode(V.TRIANGLES);else if($.isLine){let tt=ce.linewidth;tt===void 0&&(tt=1),Xe.setLineWidth(tt*Wt()),$.isLineSegments?Lt.setMode(V.LINES):$.isLineLoop?Lt.setMode(V.LINE_LOOP):Lt.setMode(V.LINE_STRIP)}else $.isPoints?Lt.setMode(V.POINTS):$.isSprite&&Lt.setMode(V.TRIANGLES);if($.isBatchedMesh)if($._multiDrawInstances!==null)ya("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Lt.renderMultiDrawInstances($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount,$._multiDrawInstances);else if(ft.get("WEBGL_multi_draw"))Lt.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const tt=$._multiDrawStarts,Dt=$._multiDrawCounts,xt=$._multiDrawCount,tn=ke?D.get(ke).bytesPerElement:1,ri=$e.get(ce).currentProgram.getUniforms();for(let Tn=0;Tn<xt;Tn++)ri.setValue(V,"_gl_DrawID",Tn),Lt.render(tt[Tn]/tn,Dt[Tn])}else if($.isInstancedMesh)Lt.renderInstances(lt,wt,$.count);else if(le.isInstancedBufferGeometry){const tt=le._maxInstanceCount!==void 0?le._maxInstanceCount:1/0,Dt=Math.min(le.instanceCount,tt);Lt.renderInstances(lt,wt,Dt)}else Lt.render(lt,wt)};function Pt(A,Y,le){A.transparent===!0&&A.side===Ki&&A.forceSinglePass===!1?(A.side=kn,A.needsUpdate=!0,xs(A,Y,le),A.side=Fr,A.needsUpdate=!0,xs(A,Y,le),A.side=Ki):xs(A,Y,le)}this.compile=function(A,Y,le=null){le===null&&(le=A),_=Qe.get(le),_.init(Y),P.push(_),le.traverseVisible(function($){$.isLight&&$.layers.test(Y.layers)&&(_.pushLight($),$.castShadow&&_.pushShadow($))}),A!==le&&A.traverseVisible(function($){$.isLight&&$.layers.test(Y.layers)&&(_.pushLight($),$.castShadow&&_.pushShadow($))}),_.setupLights();const ce=new Set;return A.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const Me=$.material;if(Me)if(Array.isArray(Me))for(let Le=0;Le<Me.length;Le++){const Ve=Me[Le];Pt(Ve,le,$),ce.add(Ve)}else Pt(Me,le,$),ce.add(Me)}),_=P.pop(),ce},this.compileAsync=function(A,Y,le=null){const ce=this.compile(A,Y,le);return new Promise($=>{function Me(){if(ce.forEach(function(Le){$e.get(Le).currentProgram.isReady()&&ce.delete(Le)}),ce.size===0){$(A);return}setTimeout(Me,10)}ft.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let Mt=null;function Yn(A){Mt&&Mt(A)}function gn(){Bn.stop()}function vs(){Bn.start()}const Bn=new H0;Bn.setAnimationLoop(Yn),typeof self<"u"&&Bn.setContext(self),this.setAnimationLoop=function(A){Mt=A,Ee.setAnimationLoop(A),A===null?Bn.stop():Bn.start()},Ee.addEventListener("sessionstart",gn),Ee.addEventListener("sessionend",vs),this.render=function(A,Y){if(Y!==void 0&&Y.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),Ee.enabled===!0&&Ee.isPresenting===!0&&(Ee.cameraAutoUpdate===!0&&Ee.updateCamera(Y),Y=Ee.getCamera()),A.isScene===!0&&A.onBeforeRender(b,A,Y,z),_=Qe.get(A,P.length),_.init(Y),P.push(_),se.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),Re.setFromProjectionMatrix(se,Ci,Y.reversedDepth),ne=this.localClippingEnabled,Fe=be.init(this.clippingPlanes,ne),y=he.get(A,N.length),y.init(),N.push(y),Ee.enabled===!0&&Ee.isPresenting===!0){const Me=b.xr.getDepthSensingMesh();Me!==null&&wo(Me,Y,-1/0,b.sortObjects)}wo(A,Y,0,b.sortObjects),y.finish(),b.sortObjects===!0&&y.sort(fe,ue),pt=Ee.enabled===!1||Ee.isPresenting===!1||Ee.hasDepthSensing()===!1,pt&&Je.addToRenderList(y,A),this.info.render.frame++,Fe===!0&&be.beginShadows();const le=_.state.shadowsArray;He.render(le,A,Y),Fe===!0&&be.endShadows(),this.info.autoReset===!0&&this.info.reset();const ce=y.opaque,$=y.transmissive;if(_.setupLights(),Y.isArrayCamera){const Me=Y.cameras;if($.length>0)for(let Le=0,Ve=Me.length;Le<Ve;Le++){const ke=Me[Le];zr(ce,$,A,ke)}pt&&Je.render(A);for(let Le=0,Ve=Me.length;Le<Ve;Le++){const ke=Me[Le];rr(y,A,ke,ke.viewport)}}else $.length>0&&zr(ce,$,A,Y),pt&&Je.render(A),rr(y,A,Y);z!==null&&I===0&&(ut.updateMultisampleRenderTarget(z),ut.updateRenderTargetMipmap(z)),A.isScene===!0&&A.onAfterRender(b,A,Y),Pe.resetDefaultState(),C=-1,R=null,P.pop(),P.length>0?(_=P[P.length-1],Fe===!0&&be.setGlobalState(b.clippingPlanes,_.state.camera)):_=null,N.pop(),N.length>0?y=N[N.length-1]:y=null};function wo(A,Y,le,ce){if(A.visible===!1)return;if(A.layers.test(Y.layers)){if(A.isGroup)le=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(Y);else if(A.isLight)_.pushLight(A),A.castShadow&&_.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Re.intersectsSprite(A)){ce&&Ne.setFromMatrixPosition(A.matrixWorld).applyMatrix4(se);const Le=J.update(A),Ve=A.material;Ve.visible&&y.push(A,Le,Ve,le,Ne.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Re.intersectsObject(A))){const Le=J.update(A),Ve=A.material;if(ce&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ne.copy(A.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),Ne.copy(Le.boundingSphere.center)),Ne.applyMatrix4(A.matrixWorld).applyMatrix4(se)),Array.isArray(Ve)){const ke=Le.groups;for(let rt=0,at=ke.length;rt<at;rt++){const et=ke[rt],lt=Ve[et.materialIndex];lt&&lt.visible&&y.push(A,Le,lt,le,Ne.z,et)}}else Ve.visible&&y.push(A,Le,Ve,le,Ne.z,null)}}const Me=A.children;for(let Le=0,Ve=Me.length;Le<Ve;Le++)wo(Me[Le],Y,le,ce)}function rr(A,Y,le,ce){const $=A.opaque,Me=A.transmissive,Le=A.transparent;_.setupLightsView(le),Fe===!0&&be.setGlobalState(b.clippingPlanes,le),ce&&Xe.viewport(G.copy(ce)),$.length>0&&Di($,Y,le),Me.length>0&&Di(Me,Y,le),Le.length>0&&Di(Le,Y,le),Xe.buffers.depth.setTest(!0),Xe.buffers.depth.setMask(!0),Xe.buffers.color.setMask(!0),Xe.setPolygonOffset(!1)}function zr(A,Y,le,ce){if((le.isScene===!0?le.overrideMaterial:null)!==null)return;_.state.transmissionRenderTarget[ce.id]===void 0&&(_.state.transmissionRenderTarget[ce.id]=new ps(1,1,{generateMipmaps:!0,type:ft.has("EXT_color_buffer_half_float")||ft.has("EXT_color_buffer_float")?wa:Ri,minFilter:fs,samples:4,stencilBuffer:l,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ct.workingColorSpace}));const Me=_.state.transmissionRenderTarget[ce.id],Le=ce.viewport||G;Me.setSize(Le.z*b.transmissionResolutionScale,Le.w*b.transmissionResolutionScale);const Ve=b.getRenderTarget(),ke=b.getActiveCubeFace(),rt=b.getActiveMipmapLevel();b.setRenderTarget(Me),b.getClearColor(Q),re=b.getClearAlpha(),re<1&&b.setClearColor(16777215,.5),b.clear(),pt&&Je.render(le);const at=b.toneMapping;b.toneMapping=Ir;const et=ce.viewport;if(ce.viewport!==void 0&&(ce.viewport=void 0),_.setupLightsView(ce),Fe===!0&&be.setGlobalState(b.clippingPlanes,ce),Di(A,le,ce),ut.updateMultisampleRenderTarget(Me),ut.updateRenderTargetMipmap(Me),ft.has("WEBGL_multisampled_render_to_texture")===!1){let lt=!1;for(let Rt=0,wt=Y.length;Rt<wt;Rt++){const Ot=Y[Rt],Lt=Ot.object,tt=Ot.geometry,Dt=Ot.material,xt=Ot.group;if(Dt.side===Ki&&Lt.layers.test(ce.layers)){const tn=Dt.side;Dt.side=kn,Dt.needsUpdate=!0,_s(Lt,le,ce,tt,Dt,xt),Dt.side=tn,Dt.needsUpdate=!0,lt=!0}}lt===!0&&(ut.updateMultisampleRenderTarget(Me),ut.updateRenderTargetMipmap(Me))}b.setRenderTarget(Ve,ke,rt),b.setClearColor(Q,re),et!==void 0&&(ce.viewport=et),b.toneMapping=at}function Di(A,Y,le){const ce=Y.isScene===!0?Y.overrideMaterial:null;for(let $=0,Me=A.length;$<Me;$++){const Le=A[$],Ve=Le.object,ke=Le.geometry,rt=Le.group;let at=Le.material;at.allowOverride===!0&&ce!==null&&(at=ce),Ve.layers.test(le.layers)&&_s(Ve,Y,le,ke,at,rt)}}function _s(A,Y,le,ce,$,Me){A.onBeforeRender(b,Y,le,ce,$,Me),A.modelViewMatrix.multiplyMatrices(le.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),$.onBeforeRender(b,Y,le,ce,A,Me),$.transparent===!0&&$.side===Ki&&$.forceSinglePass===!1?($.side=kn,$.needsUpdate=!0,b.renderBufferDirect(le,Y,ce,$,A,Me),$.side=Fr,$.needsUpdate=!0,b.renderBufferDirect(le,Y,ce,$,A,Me),$.side=Ki):b.renderBufferDirect(le,Y,ce,$,A,Me),A.onAfterRender(b,Y,le,ce,$,Me)}function xs(A,Y,le){Y.isScene!==!0&&(Y=Ie);const ce=$e.get(A),$=_.state.lights,Me=_.state.shadowsArray,Le=$.state.version,Ve=pe.getParameters(A,$.state,Me,Y,le),ke=pe.getProgramCacheKey(Ve);let rt=ce.programs;ce.environment=A.isMeshStandardMaterial?Y.environment:null,ce.fog=Y.fog,ce.envMap=(A.isMeshStandardMaterial?Ht:Bt).get(A.envMap||ce.environment),ce.envMapRotation=ce.environment!==null&&A.envMap===null?Y.environmentRotation:A.envMapRotation,rt===void 0&&(A.addEventListener("dispose",me),rt=new Map,ce.programs=rt);let at=rt.get(ke);if(at!==void 0){if(ce.currentProgram===at&&ce.lightsStateVersion===Le)return Na(A,Ve),at}else Ve.uniforms=pe.getUniforms(A),A.onBeforeCompile(Ve,b),at=pe.acquireProgram(Ve,ke),rt.set(ke,at),ce.uniforms=Ve.uniforms;const et=ce.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(et.clippingPlanes=be.uniform),Na(A,Ve),ce.needsLights=Ia(A),ce.lightsStateVersion=Le,ce.needsLights&&(et.ambientLightColor.value=$.state.ambient,et.lightProbe.value=$.state.probe,et.directionalLights.value=$.state.directional,et.directionalLightShadows.value=$.state.directionalShadow,et.spotLights.value=$.state.spot,et.spotLightShadows.value=$.state.spotShadow,et.rectAreaLights.value=$.state.rectArea,et.ltc_1.value=$.state.rectAreaLTC1,et.ltc_2.value=$.state.rectAreaLTC2,et.pointLights.value=$.state.point,et.pointLightShadows.value=$.state.pointShadow,et.hemisphereLights.value=$.state.hemi,et.directionalShadowMap.value=$.state.directionalShadowMap,et.directionalShadowMatrix.value=$.state.directionalShadowMatrix,et.spotShadowMap.value=$.state.spotShadowMap,et.spotLightMatrix.value=$.state.spotLightMatrix,et.spotLightMap.value=$.state.spotLightMap,et.pointShadowMap.value=$.state.pointShadowMap,et.pointShadowMatrix.value=$.state.pointShadowMatrix),ce.currentProgram=at,ce.uniformsList=null,at}function La(A){if(A.uniformsList===null){const Y=A.currentProgram.getUniforms();A.uniformsList=xc.seqWithValue(Y.seq,A.uniforms)}return A.uniformsList}function Na(A,Y){const le=$e.get(A);le.outputColorSpace=Y.outputColorSpace,le.batching=Y.batching,le.batchingColor=Y.batchingColor,le.instancing=Y.instancing,le.instancingColor=Y.instancingColor,le.instancingMorph=Y.instancingMorph,le.skinning=Y.skinning,le.morphTargets=Y.morphTargets,le.morphNormals=Y.morphNormals,le.morphColors=Y.morphColors,le.morphTargetsCount=Y.morphTargetsCount,le.numClippingPlanes=Y.numClippingPlanes,le.numIntersection=Y.numClipIntersection,le.vertexAlphas=Y.vertexAlphas,le.vertexTangents=Y.vertexTangents,le.toneMapping=Y.toneMapping}function Ii(A,Y,le,ce,$){Y.isScene!==!0&&(Y=Ie),ut.resetTextureUnits();const Me=Y.fog,Le=ce.isMeshStandardMaterial?Y.environment:null,Ve=z===null?b.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:po,ke=(ce.isMeshStandardMaterial?Ht:Bt).get(ce.envMap||Le),rt=ce.vertexColors===!0&&!!le.attributes.color&&le.attributes.color.itemSize===4,at=!!le.attributes.tangent&&(!!ce.normalMap||ce.anisotropy>0),et=!!le.morphAttributes.position,lt=!!le.morphAttributes.normal,Rt=!!le.morphAttributes.color;let wt=Ir;ce.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(wt=b.toneMapping);const Ot=le.morphAttributes.position||le.morphAttributes.normal||le.morphAttributes.color,Lt=Ot!==void 0?Ot.length:0,tt=$e.get(ce),Dt=_.state.lights;if(Fe===!0&&(ne===!0||A!==R)){const Zt=A===R&&ce.id===C;be.setState(ce,A,Zt)}let xt=!1;ce.version===tt.__version?(tt.needsLights&&tt.lightsStateVersion!==Dt.state.version||tt.outputColorSpace!==Ve||$.isBatchedMesh&&tt.batching===!1||!$.isBatchedMesh&&tt.batching===!0||$.isBatchedMesh&&tt.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&tt.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&tt.instancing===!1||!$.isInstancedMesh&&tt.instancing===!0||$.isSkinnedMesh&&tt.skinning===!1||!$.isSkinnedMesh&&tt.skinning===!0||$.isInstancedMesh&&tt.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&tt.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&tt.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&tt.instancingMorph===!1&&$.morphTexture!==null||tt.envMap!==ke||ce.fog===!0&&tt.fog!==Me||tt.numClippingPlanes!==void 0&&(tt.numClippingPlanes!==be.numPlanes||tt.numIntersection!==be.numIntersection)||tt.vertexAlphas!==rt||tt.vertexTangents!==at||tt.morphTargets!==et||tt.morphNormals!==lt||tt.morphColors!==Rt||tt.toneMapping!==wt||tt.morphTargetsCount!==Lt)&&(xt=!0):(xt=!0,tt.__version=ce.version);let tn=tt.currentProgram;xt===!0&&(tn=xs(ce,Y,$));let ri=!1,Tn=!1,Br=!1;const kt=tn.getUniforms(),bn=tt.uniforms;if(Xe.useProgram(tn.program)&&(ri=!0,Tn=!0,Br=!0),ce.id!==C&&(C=ce.id,Tn=!0),ri||R!==A){Xe.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),kt.setValue(V,"projectionMatrix",A.projectionMatrix),kt.setValue(V,"viewMatrix",A.matrixWorldInverse);const _n=kt.map.cameraPosition;_n!==void 0&&_n.setValue(V,ye.setFromMatrixPosition(A.matrixWorld)),st.logarithmicDepthBuffer&&kt.setValue(V,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(ce.isMeshPhongMaterial||ce.isMeshToonMaterial||ce.isMeshLambertMaterial||ce.isMeshBasicMaterial||ce.isMeshStandardMaterial||ce.isShaderMaterial)&&kt.setValue(V,"isOrthographic",A.isOrthographicCamera===!0),R!==A&&(R=A,Tn=!0,Br=!0)}if($.isSkinnedMesh){kt.setOptional(V,$,"bindMatrix"),kt.setOptional(V,$,"bindMatrixInverse");const Zt=$.skeleton;Zt&&(Zt.boneTexture===null&&Zt.computeBoneTexture(),kt.setValue(V,"boneTexture",Zt.boneTexture,ut))}$.isBatchedMesh&&(kt.setOptional(V,$,"batchingTexture"),kt.setValue(V,"batchingTexture",$._matricesTexture,ut),kt.setOptional(V,$,"batchingIdTexture"),kt.setValue(V,"batchingIdTexture",$._indirectTexture,ut),kt.setOptional(V,$,"batchingColorTexture"),$._colorsTexture!==null&&kt.setValue(V,"batchingColorTexture",$._colorsTexture,ut));const vn=le.morphAttributes;if((vn.position!==void 0||vn.normal!==void 0||vn.color!==void 0)&&we.update($,le,tn),(Tn||tt.receiveShadow!==$.receiveShadow)&&(tt.receiveShadow=$.receiveShadow,kt.setValue(V,"receiveShadow",$.receiveShadow)),ce.isMeshGouraudMaterial&&ce.envMap!==null&&(bn.envMap.value=ke,bn.flipEnvMap.value=ke.isCubeTexture&&ke.isRenderTargetTexture===!1?-1:1),ce.isMeshStandardMaterial&&ce.envMap===null&&Y.environment!==null&&(bn.envMapIntensity.value=Y.environmentIntensity),Tn&&(kt.setValue(V,"toneMappingExposure",b.toneMappingExposure),tt.needsLights&&Da(bn,Br),Me&&ce.fog===!0&&ve.refreshFogUniforms(bn,Me),ve.refreshMaterialUniforms(bn,ce,U,de,_.state.transmissionRenderTarget[A.id]),xc.upload(V,La(tt),bn,ut)),ce.isShaderMaterial&&ce.uniformsNeedUpdate===!0&&(xc.upload(V,La(tt),bn,ut),ce.uniformsNeedUpdate=!1),ce.isSpriteMaterial&&kt.setValue(V,"center",$.center),kt.setValue(V,"modelViewMatrix",$.modelViewMatrix),kt.setValue(V,"normalMatrix",$.normalMatrix),kt.setValue(V,"modelMatrix",$.matrixWorld),ce.isShaderMaterial||ce.isRawShaderMaterial){const Zt=ce.uniformsGroups;for(let _n=0,Hr=Zt.length;_n<Hr;_n++){const yt=Zt[_n];ht.update(yt,tn),ht.bind(yt,tn)}}return tn}function Da(A,Y){A.ambientLightColor.needsUpdate=Y,A.lightProbe.needsUpdate=Y,A.directionalLights.needsUpdate=Y,A.directionalLightShadows.needsUpdate=Y,A.pointLights.needsUpdate=Y,A.pointLightShadows.needsUpdate=Y,A.spotLights.needsUpdate=Y,A.spotLightShadows.needsUpdate=Y,A.rectAreaLights.needsUpdate=Y,A.hemisphereLights.needsUpdate=Y}function Ia(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(A,Y,le){const ce=$e.get(A);ce.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,ce.__autoAllocateDepthBuffer===!1&&(ce.__useRenderToTexture=!1),$e.get(A.texture).__webglTexture=Y,$e.get(A.depthTexture).__webglTexture=ce.__autoAllocateDepthBuffer?void 0:le,ce.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,Y){const le=$e.get(A);le.__webglFramebuffer=Y,le.__useDefaultFramebuffer=Y===void 0};const Vc=V.createFramebuffer();this.setRenderTarget=function(A,Y=0,le=0){z=A,B=Y,I=le;let ce=!0,$=null,Me=!1,Le=!1;if(A){const ke=$e.get(A);if(ke.__useDefaultFramebuffer!==void 0)Xe.bindFramebuffer(V.FRAMEBUFFER,null),ce=!1;else if(ke.__webglFramebuffer===void 0)ut.setupRenderTarget(A);else if(ke.__hasExternalTextures)ut.rebindTextures(A,$e.get(A.texture).__webglTexture,$e.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const et=A.depthTexture;if(ke.__boundDepthTexture!==et){if(et!==null&&$e.has(et)&&(A.width!==et.image.width||A.height!==et.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ut.setupDepthRenderbuffer(A)}}const rt=A.texture;(rt.isData3DTexture||rt.isDataArrayTexture||rt.isCompressedArrayTexture)&&(Le=!0);const at=$e.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(at[Y])?$=at[Y][le]:$=at[Y],Me=!0):A.samples>0&&ut.useMultisampledRTT(A)===!1?$=$e.get(A).__webglMultisampledFramebuffer:Array.isArray(at)?$=at[le]:$=at,G.copy(A.viewport),q.copy(A.scissor),ie=A.scissorTest}else G.copy(H).multiplyScalar(U).floor(),q.copy(ae).multiplyScalar(U).floor(),ie=Ae;if(le!==0&&($=Vc),Xe.bindFramebuffer(V.FRAMEBUFFER,$)&&ce&&Xe.drawBuffers(A,$),Xe.viewport(G),Xe.scissor(q),Xe.setScissorTest(ie),Me){const ke=$e.get(A.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ke.__webglTexture,le)}else if(Le){const ke=Y;for(let rt=0;rt<A.textures.length;rt++){const at=$e.get(A.textures[rt]);V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0+rt,at.__webglTexture,le,ke)}}else if(A!==null&&le!==0){const ke=$e.get(A.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,ke.__webglTexture,le)}C=-1},this.readRenderTargetPixels=function(A,Y,le,ce,$,Me,Le,Ve=0){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=$e.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Le!==void 0&&(ke=ke[Le]),ke){Xe.bindFramebuffer(V.FRAMEBUFFER,ke);try{const rt=A.textures[Ve],at=rt.format,et=rt.type;if(!st.textureFormatReadable(at)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!st.textureTypeReadable(et)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=A.width-ce&&le>=0&&le<=A.height-$&&(A.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+Ve),V.readPixels(Y,le,ce,$,Ke.convert(at),Ke.convert(et),Me))}finally{const rt=z!==null?$e.get(z).__webglFramebuffer:null;Xe.bindFramebuffer(V.FRAMEBUFFER,rt)}}},this.readRenderTargetPixelsAsync=async function(A,Y,le,ce,$,Me,Le,Ve=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=$e.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Le!==void 0&&(ke=ke[Le]),ke)if(Y>=0&&Y<=A.width-ce&&le>=0&&le<=A.height-$){Xe.bindFramebuffer(V.FRAMEBUFFER,ke);const rt=A.textures[Ve],at=rt.format,et=rt.type;if(!st.textureFormatReadable(at))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!st.textureTypeReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const lt=V.createBuffer();V.bindBuffer(V.PIXEL_PACK_BUFFER,lt),V.bufferData(V.PIXEL_PACK_BUFFER,Me.byteLength,V.STREAM_READ),A.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+Ve),V.readPixels(Y,le,ce,$,Ke.convert(at),Ke.convert(et),0);const Rt=z!==null?$e.get(z).__webglFramebuffer:null;Xe.bindFramebuffer(V.FRAMEBUFFER,Rt);const wt=V.fenceSync(V.SYNC_GPU_COMMANDS_COMPLETE,0);return V.flush(),await XE(V,wt,4),V.bindBuffer(V.PIXEL_PACK_BUFFER,lt),V.getBufferSubData(V.PIXEL_PACK_BUFFER,0,Me),V.deleteBuffer(lt),V.deleteSync(wt),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,Y=null,le=0){const ce=Math.pow(2,-le),$=Math.floor(A.image.width*ce),Me=Math.floor(A.image.height*ce),Le=Y!==null?Y.x:0,Ve=Y!==null?Y.y:0;ut.setTexture2D(A,0),V.copyTexSubImage2D(V.TEXTURE_2D,le,0,0,Le,Ve,$,Me),Xe.unbindTexture()};const Ua=V.createFramebuffer(),Fa=V.createFramebuffer();this.copyTextureToTexture=function(A,Y,le=null,ce=null,$=0,Me=null){Me===null&&($!==0?(ya("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Me=$,$=0):Me=0);let Le,Ve,ke,rt,at,et,lt,Rt,wt;const Ot=A.isCompressedTexture?A.mipmaps[Me]:A.image;if(le!==null)Le=le.max.x-le.min.x,Ve=le.max.y-le.min.y,ke=le.isBox3?le.max.z-le.min.z:1,rt=le.min.x,at=le.min.y,et=le.isBox3?le.min.z:0;else{const vn=Math.pow(2,-$);Le=Math.floor(Ot.width*vn),Ve=Math.floor(Ot.height*vn),A.isDataArrayTexture?ke=Ot.depth:A.isData3DTexture?ke=Math.floor(Ot.depth*vn):ke=1,rt=0,at=0,et=0}ce!==null?(lt=ce.x,Rt=ce.y,wt=ce.z):(lt=0,Rt=0,wt=0);const Lt=Ke.convert(Y.format),tt=Ke.convert(Y.type);let Dt;Y.isData3DTexture?(ut.setTexture3D(Y,0),Dt=V.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(ut.setTexture2DArray(Y,0),Dt=V.TEXTURE_2D_ARRAY):(ut.setTexture2D(Y,0),Dt=V.TEXTURE_2D),V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,Y.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,Y.unpackAlignment);const xt=V.getParameter(V.UNPACK_ROW_LENGTH),tn=V.getParameter(V.UNPACK_IMAGE_HEIGHT),ri=V.getParameter(V.UNPACK_SKIP_PIXELS),Tn=V.getParameter(V.UNPACK_SKIP_ROWS),Br=V.getParameter(V.UNPACK_SKIP_IMAGES);V.pixelStorei(V.UNPACK_ROW_LENGTH,Ot.width),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,Ot.height),V.pixelStorei(V.UNPACK_SKIP_PIXELS,rt),V.pixelStorei(V.UNPACK_SKIP_ROWS,at),V.pixelStorei(V.UNPACK_SKIP_IMAGES,et);const kt=A.isDataArrayTexture||A.isData3DTexture,bn=Y.isDataArrayTexture||Y.isData3DTexture;if(A.isDepthTexture){const vn=$e.get(A),Zt=$e.get(Y),_n=$e.get(vn.__renderTarget),Hr=$e.get(Zt.__renderTarget);Xe.bindFramebuffer(V.READ_FRAMEBUFFER,_n.__webglFramebuffer),Xe.bindFramebuffer(V.DRAW_FRAMEBUFFER,Hr.__webglFramebuffer);for(let yt=0;yt<ke;yt++)kt&&(V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,$e.get(A).__webglTexture,$,et+yt),V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,$e.get(Y).__webglTexture,Me,wt+yt)),V.blitFramebuffer(rt,at,Le,Ve,lt,Rt,Le,Ve,V.DEPTH_BUFFER_BIT,V.NEAREST);Xe.bindFramebuffer(V.READ_FRAMEBUFFER,null),Xe.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else if($!==0||A.isRenderTargetTexture||$e.has(A)){const vn=$e.get(A),Zt=$e.get(Y);Xe.bindFramebuffer(V.READ_FRAMEBUFFER,Ua),Xe.bindFramebuffer(V.DRAW_FRAMEBUFFER,Fa);for(let _n=0;_n<ke;_n++)kt?V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,vn.__webglTexture,$,et+_n):V.framebufferTexture2D(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,vn.__webglTexture,$),bn?V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,Zt.__webglTexture,Me,wt+_n):V.framebufferTexture2D(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,Zt.__webglTexture,Me),$!==0?V.blitFramebuffer(rt,at,Le,Ve,lt,Rt,Le,Ve,V.COLOR_BUFFER_BIT,V.NEAREST):bn?V.copyTexSubImage3D(Dt,Me,lt,Rt,wt+_n,rt,at,Le,Ve):V.copyTexSubImage2D(Dt,Me,lt,Rt,rt,at,Le,Ve);Xe.bindFramebuffer(V.READ_FRAMEBUFFER,null),Xe.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else bn?A.isDataTexture||A.isData3DTexture?V.texSubImage3D(Dt,Me,lt,Rt,wt,Le,Ve,ke,Lt,tt,Ot.data):Y.isCompressedArrayTexture?V.compressedTexSubImage3D(Dt,Me,lt,Rt,wt,Le,Ve,ke,Lt,Ot.data):V.texSubImage3D(Dt,Me,lt,Rt,wt,Le,Ve,ke,Lt,tt,Ot):A.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,Me,lt,Rt,Le,Ve,Lt,tt,Ot.data):A.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,Me,lt,Rt,Ot.width,Ot.height,Lt,Ot.data):V.texSubImage2D(V.TEXTURE_2D,Me,lt,Rt,Le,Ve,Lt,tt,Ot);V.pixelStorei(V.UNPACK_ROW_LENGTH,xt),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,tn),V.pixelStorei(V.UNPACK_SKIP_PIXELS,ri),V.pixelStorei(V.UNPACK_SKIP_ROWS,Tn),V.pixelStorei(V.UNPACK_SKIP_IMAGES,Br),Me===0&&Y.generateMipmaps&&V.generateMipmap(Dt),Xe.unbindTexture()},this.initRenderTarget=function(A){$e.get(A).__webglFramebuffer===void 0&&ut.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?ut.setTextureCube(A,0):A.isData3DTexture?ut.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?ut.setTexture2DArray(A,0):ut.setTexture2D(A,0),Xe.unbindTexture()},this.resetState=function(){B=0,I=0,z=null,Xe.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ct._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ct._getUnpackColorSpace()}}function mA(){const[i,e]=L.useState(0),[t,s]=L.useState({x:0,y:0}),o=L.useRef(null),l=L.useRef(null),u=L.useRef(null),d=L.useRef(null),h=L.useRef([]),f=L.useRef(null);L.useEffect(()=>{const g=()=>e(window.scrollY),x=S=>{s({x:(S.clientX/window.innerWidth-.5)*2,y:(S.clientY/window.innerHeight-.5)*2})};return window.addEventListener("scroll",g),window.addEventListener("mousemove",x),()=>{window.removeEventListener("scroll",g),window.removeEventListener("mousemove",x)}},[]),L.useEffect(()=>{if(!o.current)return;const g=new vM;g.fog=new Nh(657930,5,15),l.current=g;const x=new On(50,o.current.clientWidth/o.current.clientHeight,.1,1e3);x.position.set(0,0,6),d.current=x;const S=new pA({canvas:o.current,alpha:!0,antialias:!0});S.setSize(o.current.clientWidth,o.current.clientHeight),S.setPixelRatio(Math.min(window.devicePixelRatio,2)),S.shadowMap.enabled=!0,u.current=S;const M=new PM(16777215,.4);g.add(M);const E=new RM(10924543,1.2);E.position.set(5,5,5),E.castShadow=!0,g.add(E);const y=new rv(13086712,.8,20);y.position.set(-5,0,3),g.add(y);const _=new rv(16758149,.6,15);_.position.set(0,-3,-3),g.add(_);const N=(Q,re,te=1)=>{const de=new da,U=new Ih(.4*te,.4*te,1.8*te,32),fe=new EM({color:16777215,transparent:!0,opacity:.15,roughness:0,metalness:.1,transmission:.9,thickness:.5,clearcoat:1,clearcoatRoughness:.1}),ue=new ii(U,fe);ue.castShadow=!0,ue.receiveShadow=!0,de.add(ue);const H=new yo(.5*te,.7*te,.5*te,2,2,2),ae=new dh({color:re,emissive:re,emissiveIntensity:.4,metalness:.7,roughness:.3}),Ae=new ii(H,ae);Ae.castShadow=!0,de.add(Ae);const Re=new Uh(.45*te,.08*te,16,32),Fe=new dh({color:16758149,emissive:16758149,emissiveIntensity:.6,metalness:.9,roughness:.1}),ne=new ii(Re,Fe);ne.rotation.x=Math.PI/2,ne.position.y=-1*te,de.add(ne);const se=new bM(re,.5,10,Math.PI/6,.5);return se.position.set(0,2*te,0),se.target=Ae,de.add(se),de.position.set(Q.x,Q.y,Q.z),de.userData={baseY:Q.y,rotationSpeed:.002+Math.random()*.001,floatOffset:Math.random()*Math.PI*2},de},P=[{x:-2.5,y:.5,z:-1,color:10924543,size:1},{x:2.5,y:-.5,z:-2,color:13086712,size:.9},{x:0,y:1,z:0,color:16758149,size:1.1},{x:-1.5,y:-1,z:1,color:10924543,size:.8},{x:3,y:.8,z:.5,color:13086712,size:.85},{x:-3,y:0,z:-.5,color:16758149,size:.95},{x:1.2,y:-.8,z:-1.5,color:10924543,size:.9},{x:-.8,y:.3,z:2,color:13086712,size:.8}],b=window.innerWidth<768;(b?P.slice(0,4):P).forEach(Q=>{const re=N(Q,Q.color,Q.size);g.add(re),h.current.push(re)});const B=150,I=new Float32Array(B*3);for(let Q=0;Q<B;Q++)I[Q*3]=(Math.random()-.5)*15,I[Q*3+1]=(Math.random()-.5)*15,I[Q*3+2]=(Math.random()-.5)*15;const z=new xi;z.setAttribute("position",new vi(I,3));const C=new O0({size:.04,color:10924543,transparent:!0,opacity:.12,blending:Ef}),R=new SM(z,C);g.add(R);let G=0;const q=()=>{G+=.01,h.current.forEach((Q,re)=>{const te=Q.userData;Q.rotation.y+=te.rotationSpeed;const de=Math.sin(G*.8+te.floatOffset)*.18;Q.position.y=te.baseY+de,b||(Q.position.x+=(t.x*.1-Q.position.x)*.02,Q.rotation.x=t.y*.05)}),R.rotation.y=G*.02,b||(x.position.x+=(t.x*.3-x.position.x)*.05,x.position.y+=(-t.y*.2-x.position.y)*.05,x.lookAt(0,0,0)),S.render(g,x),f.current=requestAnimationFrame(q)};q();const ie=()=>{if(!o.current)return;const Q=o.current.clientWidth,re=o.current.clientHeight;x.aspect=Q/re,x.updateProjectionMatrix(),S.setSize(Q,re)};return window.addEventListener("resize",ie),()=>{window.removeEventListener("resize",ie),f.current&&cancelAnimationFrame(f.current),g.traverse(Q=>{Q.geometry&&Q.geometry.dispose(),Q.material&&(Array.isArray(Q.material)?Q.material.forEach(re=>re.dispose()):Q.material.dispose())}),S.dispose()}},[t]);const m=()=>{window.scrollTo({top:window.innerHeight,behavior:"smooth"})};return O.jsxs("div",{className:"relative h-screen w-full overflow-hidden",children:[O.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1520] to-[#0a0a0a]"}),O.jsx("div",{className:"absolute inset-0",style:{transform:`translateY(${i*.5}px)`},children:O.jsx("canvas",{ref:o,className:"w-full h-full"})}),O.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/40 to-[#0a0a0a] pointer-events-none"}),O.jsxs("div",{className:"relative z-10 h-full flex flex-col items-center justify-center text-center px-6",style:{transform:`translateY(${i*.3}px)`,opacity:Math.max(0,1-i/500)},children:[O.jsxs("div",{className:"mb-8 inline-flex items-center gap-2 glass-morphism px-6 py-3 rounded-full animate-in fade-in slide-in-from-top duration-700",children:[O.jsx(ma,{className:"w-4 h-4 text-[#a6b1ff]"}),O.jsx("span",{className:"text-sm text-gray-300 tracking-[0.2em] uppercase font-medium",children:"Play Smart"})]}),O.jsx("h1",{className:"text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom duration-1000",children:O.jsx("span",{className:"gradient-text-shine block mb-2",children:"Join the Challenge"})}),O.jsx("p",{className:"text-xl md:text-3xl text-gray-400/90 mb-14 max-w-3xl font-light tracking-wide leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-200",children:"Quiz. Play. Win."}),O.jsxs("div",{style:{display:"flex",flexDirection:"row",gap:5},children:[O.jsxs(pa,{onClick:m,className:"interactive halo-click relative px-10 py-7 text-lg font-semibold bg-gradient-to-r from-[#a6b1ff] via-[#c7aff8] to-[#ffb585] text-[#0a0a0a] rounded-full overflow-hidden group hover:scale-105 hover:shadow-[0_0_40px_rgba(166,177,255,0.5)] transition-all duration-500 animate-in fade-in zoom-in duration-1000 delay-300",children:[O.jsx("span",{className:"relative z-10 tracking-wide",children:"For Teacher"}),O.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-[#c7aff8] via-[#ffb585] to-[#a6b1ff] opacity-0 group-hover:opacity-100 transition-opacity duration-700"})]}),O.jsxs(pa,{onClick:m,className:"interactive halo-click relative px-10 py-7 text-lg font-semibold bg-gradient-to-r from-[#a6b1ff] via-[#c7aff8] to-[#ffb585] text-[#0a0a0a] rounded-full overflow-hidden group hover:scale-105 hover:shadow-[0_0_40px_rgba(166,177,255,0.5)] transition-all duration-500 animate-in fade-in zoom-in duration-1000 delay-300",children:[O.jsx("span",{className:"relative z-10 tracking-wide",children:"For Student"}),O.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-[#c7aff8] via-[#ffb585] to-[#a6b1ff] opacity-0 group-hover:opacity-100 transition-opacity duration-700"})]})]}),O.jsx("div",{className:"absolute bottom-16 animate-bounce",children:O.jsx(kS,{className:"w-8 h-8 text-[#a6b1ff] drop-shadow-[0_0_12px_rgba(166,177,255,0.6)]"})})]})]})}const X0=L.forwardRef(({className:i,...e},t)=>O.jsx("div",{ref:t,className:cn("rounded-xl border bg-card text-card-foreground shadow",i),...e}));X0.displayName="Card";const gA=L.forwardRef(({className:i,...e},t)=>O.jsx("div",{ref:t,className:cn("flex flex-col space-y-1.5 p-6",i),...e}));gA.displayName="CardHeader";const vA=L.forwardRef(({className:i,...e},t)=>O.jsx("div",{ref:t,className:cn("font-semibold leading-none tracking-tight",i),...e}));vA.displayName="CardTitle";const _A=L.forwardRef(({className:i,...e},t)=>O.jsx("div",{ref:t,className:cn("text-sm text-muted-foreground",i),...e}));_A.displayName="CardDescription";const xA=L.forwardRef(({className:i,...e},t)=>O.jsx("div",{ref:t,className:cn("p-6 pt-0",i),...e}));xA.displayName="CardContent";const yA=L.forwardRef(({className:i,...e},t)=>O.jsx("div",{ref:t,className:cn("flex items-center p-6 pt-0",i),...e}));yA.displayName="CardFooter";const SA=Eh("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function Pv({className:i,variant:e,...t}){return O.jsx("div",{className:cn(SA({variant:e}),i),...t})}function Ur(i,e,{checkForDefaultPrevented:t=!0}={}){return function(o){if(i==null||i(o),t===!1||!o.defaultPrevented)return e==null?void 0:e(o)}}function EA(i,e){const t=L.createContext(e),s=l=>{const{children:u,...d}=l,h=L.useMemo(()=>d,Object.values(d));return O.jsx(t.Provider,{value:h,children:u})};s.displayName=i+"Provider";function o(l){const u=L.useContext(t);if(u)return u;if(e!==void 0)return e;throw new Error(`\`${l}\` must be used within \`${i}\``)}return[s,o]}function MA(i,e=[]){let t=[];function s(l,u){const d=L.createContext(u),h=t.length;t=[...t,u];const f=g=>{var _;const{scope:x,children:S,...M}=g,E=((_=x==null?void 0:x[i])==null?void 0:_[h])||d,y=L.useMemo(()=>M,Object.values(M));return O.jsx(E.Provider,{value:y,children:S})};f.displayName=l+"Provider";function m(g,x){var E;const S=((E=x==null?void 0:x[i])==null?void 0:E[h])||d,M=L.useContext(S);if(M)return M;if(u!==void 0)return u;throw new Error(`\`${g}\` must be used within \`${l}\``)}return[f,m]}const o=()=>{const l=t.map(u=>L.createContext(u));return function(d){const h=(d==null?void 0:d[i])||l;return L.useMemo(()=>({[`__scope${i}`]:{...d,[i]:h}}),[d,h])}};return o.scopeName=i,[s,wA(o,...e)]}function wA(...i){const e=i[0];if(i.length===1)return e;const t=()=>{const s=i.map(o=>({useScope:o(),scopeName:o.scopeName}));return function(l){const u=s.reduce((d,{useScope:h,scopeName:f})=>{const g=h(l)[`__scope${f}`];return{...d,...g}},{});return L.useMemo(()=>({[`__scope${e.scopeName}`]:u}),[u])}};return t.scopeName=e.scopeName,t}var Sa=globalThis!=null&&globalThis.document?L.useLayoutEffect:()=>{},TA=Kv[" useId ".trim().toString()]||(()=>{}),bA=0;function of(i){const[e,t]=L.useState(TA());return Sa(()=>{t(s=>s??String(bA++))},[i]),i||(e?`radix-${e}`:"")}var AA=Kv[" useInsertionEffect ".trim().toString()]||Sa;function CA({prop:i,defaultProp:e,onChange:t=()=>{},caller:s}){const[o,l,u]=RA({defaultProp:e,onChange:t}),d=i!==void 0,h=d?i:o;{const m=L.useRef(i!==void 0);L.useEffect(()=>{const g=m.current;g!==d&&console.warn(`${s} is changing from ${g?"controlled":"uncontrolled"} to ${d?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),m.current=d},[d,s])}const f=L.useCallback(m=>{var g;if(d){const x=PA(m)?m(i):m;x!==i&&((g=u.current)==null||g.call(u,x))}else l(m)},[d,i,l,u]);return[h,f]}function RA({defaultProp:i,onChange:e}){const[t,s]=L.useState(i),o=L.useRef(t),l=L.useRef(e);return AA(()=>{l.current=e},[e]),L.useEffect(()=>{var u;o.current!==t&&((u=l.current)==null||u.call(l,t),o.current=t)},[t,o]),[t,s,l]}function PA(i){return typeof i=="function"}var $0=Zv();const LA=xh($0);var NA=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],nr=NA.reduce((i,e)=>{const t=Sh(`Primitive.${e}`),s=L.forwardRef((o,l)=>{const{asChild:u,...d}=o,h=u?t:e;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),O.jsx(h,{...d,ref:l})});return s.displayName=`Primitive.${e}`,{...i,[e]:s}},{});function DA(i,e){i&&$0.flushSync(()=>i.dispatchEvent(e))}function Ea(i){const e=L.useRef(i);return L.useEffect(()=>{e.current=i}),L.useMemo(()=>(...t)=>{var s;return(s=e.current)==null?void 0:s.call(e,...t)},[])}function IA(i,e=globalThis==null?void 0:globalThis.document){const t=Ea(i);L.useEffect(()=>{const s=o=>{o.key==="Escape"&&t(o)};return e.addEventListener("keydown",s,{capture:!0}),()=>e.removeEventListener("keydown",s,{capture:!0})},[t,e])}var UA="DismissableLayer",hh="dismissableLayer.update",FA="dismissableLayer.pointerDownOutside",OA="dismissableLayer.focusOutside",Lv,Y0=L.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),q0=L.forwardRef((i,e)=>{const{disableOutsidePointerEvents:t=!1,onEscapeKeyDown:s,onPointerDownOutside:o,onFocusOutside:l,onInteractOutside:u,onDismiss:d,...h}=i,f=L.useContext(Y0),[m,g]=L.useState(null),x=(m==null?void 0:m.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,S]=L.useState({}),M=gs(e,I=>g(I)),E=Array.from(f.layers),[y]=[...f.layersWithOutsidePointerEventsDisabled].slice(-1),_=E.indexOf(y),N=m?E.indexOf(m):-1,P=f.layersWithOutsidePointerEventsDisabled.size>0,b=N>=_,k=BA(I=>{const z=I.target,C=[...f.branches].some(R=>R.contains(z));!b||C||(o==null||o(I),u==null||u(I),I.defaultPrevented||d==null||d())},x),B=HA(I=>{const z=I.target;[...f.branches].some(R=>R.contains(z))||(l==null||l(I),u==null||u(I),I.defaultPrevented||d==null||d())},x);return IA(I=>{N===f.layers.size-1&&(s==null||s(I),!I.defaultPrevented&&d&&(I.preventDefault(),d()))},x),L.useEffect(()=>{if(m)return t&&(f.layersWithOutsidePointerEventsDisabled.size===0&&(Lv=x.body.style.pointerEvents,x.body.style.pointerEvents="none"),f.layersWithOutsidePointerEventsDisabled.add(m)),f.layers.add(m),Nv(),()=>{t&&f.layersWithOutsidePointerEventsDisabled.size===1&&(x.body.style.pointerEvents=Lv)}},[m,x,t,f]),L.useEffect(()=>()=>{m&&(f.layers.delete(m),f.layersWithOutsidePointerEventsDisabled.delete(m),Nv())},[m,f]),L.useEffect(()=>{const I=()=>S({});return document.addEventListener(hh,I),()=>document.removeEventListener(hh,I)},[]),O.jsx(nr.div,{...h,ref:M,style:{pointerEvents:P?b?"auto":"none":void 0,...i.style},onFocusCapture:Ur(i.onFocusCapture,B.onFocusCapture),onBlurCapture:Ur(i.onBlurCapture,B.onBlurCapture),onPointerDownCapture:Ur(i.onPointerDownCapture,k.onPointerDownCapture)})});q0.displayName=UA;var kA="DismissableLayerBranch",zA=L.forwardRef((i,e)=>{const t=L.useContext(Y0),s=L.useRef(null),o=gs(e,s);return L.useEffect(()=>{const l=s.current;if(l)return t.branches.add(l),()=>{t.branches.delete(l)}},[t.branches]),O.jsx(nr.div,{...i,ref:o})});zA.displayName=kA;function BA(i,e=globalThis==null?void 0:globalThis.document){const t=Ea(i),s=L.useRef(!1),o=L.useRef(()=>{});return L.useEffect(()=>{const l=d=>{if(d.target&&!s.current){let h=function(){K0(FA,t,f,{discrete:!0})};const f={originalEvent:d};d.pointerType==="touch"?(e.removeEventListener("click",o.current),o.current=h,e.addEventListener("click",o.current,{once:!0})):h()}else e.removeEventListener("click",o.current);s.current=!1},u=window.setTimeout(()=>{e.addEventListener("pointerdown",l)},0);return()=>{window.clearTimeout(u),e.removeEventListener("pointerdown",l),e.removeEventListener("click",o.current)}},[e,t]),{onPointerDownCapture:()=>s.current=!0}}function HA(i,e=globalThis==null?void 0:globalThis.document){const t=Ea(i),s=L.useRef(!1);return L.useEffect(()=>{const o=l=>{l.target&&!s.current&&K0(OA,t,{originalEvent:l},{discrete:!1})};return e.addEventListener("focusin",o),()=>e.removeEventListener("focusin",o)},[e,t]),{onFocusCapture:()=>s.current=!0,onBlurCapture:()=>s.current=!1}}function Nv(){const i=new CustomEvent(hh);document.dispatchEvent(i)}function K0(i,e,t,{discrete:s}){const o=t.originalEvent.target,l=new CustomEvent(i,{bubbles:!1,cancelable:!0,detail:t});e&&o.addEventListener(i,e,{once:!0}),s?DA(o,l):o.dispatchEvent(l)}var af="focusScope.autoFocusOnMount",lf="focusScope.autoFocusOnUnmount",Dv={bubbles:!1,cancelable:!0},VA="FocusScope",Z0=L.forwardRef((i,e)=>{const{loop:t=!1,trapped:s=!1,onMountAutoFocus:o,onUnmountAutoFocus:l,...u}=i,[d,h]=L.useState(null),f=Ea(o),m=Ea(l),g=L.useRef(null),x=gs(e,E=>h(E)),S=L.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;L.useEffect(()=>{if(s){let E=function(P){if(S.paused||!d)return;const b=P.target;d.contains(b)?g.current=b:Lr(g.current,{select:!0})},y=function(P){if(S.paused||!d)return;const b=P.relatedTarget;b!==null&&(d.contains(b)||Lr(g.current,{select:!0}))},_=function(P){if(document.activeElement===document.body)for(const k of P)k.removedNodes.length>0&&Lr(d)};document.addEventListener("focusin",E),document.addEventListener("focusout",y);const N=new MutationObserver(_);return d&&N.observe(d,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",E),document.removeEventListener("focusout",y),N.disconnect()}}},[s,d,S.paused]),L.useEffect(()=>{if(d){Uv.add(S);const E=document.activeElement;if(!d.contains(E)){const _=new CustomEvent(af,Dv);d.addEventListener(af,f),d.dispatchEvent(_),_.defaultPrevented||(GA(YA(Q0(d)),{select:!0}),document.activeElement===E&&Lr(d))}return()=>{d.removeEventListener(af,f),setTimeout(()=>{const _=new CustomEvent(lf,Dv);d.addEventListener(lf,m),d.dispatchEvent(_),_.defaultPrevented||Lr(E??document.body,{select:!0}),d.removeEventListener(lf,m),Uv.remove(S)},0)}}},[d,f,m,S]);const M=L.useCallback(E=>{if(!t&&!s||S.paused)return;const y=E.key==="Tab"&&!E.altKey&&!E.ctrlKey&&!E.metaKey,_=document.activeElement;if(y&&_){const N=E.currentTarget,[P,b]=WA(N);P&&b?!E.shiftKey&&_===b?(E.preventDefault(),t&&Lr(P,{select:!0})):E.shiftKey&&_===P&&(E.preventDefault(),t&&Lr(b,{select:!0})):_===N&&E.preventDefault()}},[t,s,S.paused]);return O.jsx(nr.div,{tabIndex:-1,...u,ref:x,onKeyDown:M})});Z0.displayName=VA;function GA(i,{select:e=!1}={}){const t=document.activeElement;for(const s of i)if(Lr(s,{select:e}),document.activeElement!==t)return}function WA(i){const e=Q0(i),t=Iv(e,i),s=Iv(e.reverse(),i);return[t,s]}function Q0(i){const e=[],t=document.createTreeWalker(i,NodeFilter.SHOW_ELEMENT,{acceptNode:s=>{const o=s.tagName==="INPUT"&&s.type==="hidden";return s.disabled||s.hidden||o?NodeFilter.FILTER_SKIP:s.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;t.nextNode();)e.push(t.currentNode);return e}function Iv(i,e){for(const t of i)if(!jA(t,{upTo:e}))return t}function jA(i,{upTo:e}){if(getComputedStyle(i).visibility==="hidden")return!0;for(;i;){if(e!==void 0&&i===e)return!1;if(getComputedStyle(i).display==="none")return!0;i=i.parentElement}return!1}function XA(i){return i instanceof HTMLInputElement&&"select"in i}function Lr(i,{select:e=!1}={}){if(i&&i.focus){const t=document.activeElement;i.focus({preventScroll:!0}),i!==t&&XA(i)&&e&&i.select()}}var Uv=$A();function $A(){let i=[];return{add(e){const t=i[0];e!==t&&(t==null||t.pause()),i=Fv(i,e),i.unshift(e)},remove(e){var t;i=Fv(i,e),(t=i[0])==null||t.resume()}}}function Fv(i,e){const t=[...i],s=t.indexOf(e);return s!==-1&&t.splice(s,1),t}function YA(i){return i.filter(e=>e.tagName!=="A")}var qA="Portal",J0=L.forwardRef((i,e)=>{var d;const{container:t,...s}=i,[o,l]=L.useState(!1);Sa(()=>l(!0),[]);const u=t||o&&((d=globalThis==null?void 0:globalThis.document)==null?void 0:d.body);return u?LA.createPortal(O.jsx(nr.div,{...s,ref:e}),u):null});J0.displayName=qA;function KA(i,e){return L.useReducer((t,s)=>e[t][s]??t,i)}var Oc=i=>{const{present:e,children:t}=i,s=ZA(e),o=typeof t=="function"?t({present:s.isPresent}):L.Children.only(t),l=gs(s.ref,QA(o));return typeof t=="function"||s.isPresent?L.cloneElement(o,{ref:l}):null};Oc.displayName="Presence";function ZA(i){const[e,t]=L.useState(),s=L.useRef(null),o=L.useRef(i),l=L.useRef("none"),u=i?"mounted":"unmounted",[d,h]=KA(u,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return L.useEffect(()=>{const f=cc(s.current);l.current=d==="mounted"?f:"none"},[d]),Sa(()=>{const f=s.current,m=o.current;if(m!==i){const x=l.current,S=cc(f);i?h("MOUNT"):S==="none"||(f==null?void 0:f.display)==="none"?h("UNMOUNT"):h(m&&x!==S?"ANIMATION_OUT":"UNMOUNT"),o.current=i}},[i,h]),Sa(()=>{if(e){let f;const m=e.ownerDocument.defaultView??window,g=S=>{const E=cc(s.current).includes(CSS.escape(S.animationName));if(S.target===e&&E&&(h("ANIMATION_END"),!o.current)){const y=e.style.animationFillMode;e.style.animationFillMode="forwards",f=m.setTimeout(()=>{e.style.animationFillMode==="forwards"&&(e.style.animationFillMode=y)})}},x=S=>{S.target===e&&(l.current=cc(s.current))};return e.addEventListener("animationstart",x),e.addEventListener("animationcancel",g),e.addEventListener("animationend",g),()=>{m.clearTimeout(f),e.removeEventListener("animationstart",x),e.removeEventListener("animationcancel",g),e.removeEventListener("animationend",g)}}else h("ANIMATION_END")},[e,h]),{isPresent:["mounted","unmountSuspended"].includes(d),ref:L.useCallback(f=>{s.current=f?getComputedStyle(f):null,t(f)},[])}}function cc(i){return(i==null?void 0:i.animationName)||"none"}function QA(i){var s,o;let e=(s=Object.getOwnPropertyDescriptor(i.props,"ref"))==null?void 0:s.get,t=e&&"isReactWarning"in e&&e.isReactWarning;return t?i.ref:(e=(o=Object.getOwnPropertyDescriptor(i,"ref"))==null?void 0:o.get,t=e&&"isReactWarning"in e&&e.isReactWarning,t?i.props.ref:i.props.ref||i.ref)}var cf=0;function JA(){L.useEffect(()=>{const i=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",i[0]??Ov()),document.body.insertAdjacentElement("beforeend",i[1]??Ov()),cf++,()=>{cf===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(e=>e.remove()),cf--}},[])}function Ov(){const i=document.createElement("span");return i.setAttribute("data-radix-focus-guard",""),i.tabIndex=0,i.style.outline="none",i.style.opacity="0",i.style.position="fixed",i.style.pointerEvents="none",i}var bi=function(){return bi=Object.assign||function(e){for(var t,s=1,o=arguments.length;s<o;s++){t=arguments[s];for(var l in t)Object.prototype.hasOwnProperty.call(t,l)&&(e[l]=t[l])}return e},bi.apply(this,arguments)};function e_(i,e){var t={};for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&e.indexOf(s)<0&&(t[s]=i[s]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,s=Object.getOwnPropertySymbols(i);o<s.length;o++)e.indexOf(s[o])<0&&Object.prototype.propertyIsEnumerable.call(i,s[o])&&(t[s[o]]=i[s[o]]);return t}function eC(i,e,t){if(t||arguments.length===2)for(var s=0,o=e.length,l;s<o;s++)(l||!(s in e))&&(l||(l=Array.prototype.slice.call(e,0,s)),l[s]=e[s]);return i.concat(l||Array.prototype.slice.call(e))}var yc="right-scroll-bar-position",Sc="width-before-scroll-bar",tC="with-scroll-bars-hidden",nC="--removed-body-scroll-bar-size";function uf(i,e){return typeof i=="function"?i(e):i&&(i.current=e),i}function iC(i,e){var t=L.useState(function(){return{value:i,callback:e,facade:{get current(){return t.value},set current(s){var o=t.value;o!==s&&(t.value=s,t.callback(s,o))}}}})[0];return t.callback=e,t.facade}var rC=typeof window<"u"?L.useLayoutEffect:L.useEffect,kv=new WeakMap;function sC(i,e){var t=iC(null,function(s){return i.forEach(function(o){return uf(o,s)})});return rC(function(){var s=kv.get(t);if(s){var o=new Set(s),l=new Set(i),u=t.current;o.forEach(function(d){l.has(d)||uf(d,null)}),l.forEach(function(d){o.has(d)||uf(d,u)})}kv.set(t,i)},[i]),t}function oC(i){return i}function aC(i,e){e===void 0&&(e=oC);var t=[],s=!1,o={read:function(){if(s)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return t.length?t[t.length-1]:i},useMedium:function(l){var u=e(l,s);return t.push(u),function(){t=t.filter(function(d){return d!==u})}},assignSyncMedium:function(l){for(s=!0;t.length;){var u=t;t=[],u.forEach(l)}t={push:function(d){return l(d)},filter:function(){return t}}},assignMedium:function(l){s=!0;var u=[];if(t.length){var d=t;t=[],d.forEach(l),u=t}var h=function(){var m=u;u=[],m.forEach(l)},f=function(){return Promise.resolve().then(h)};f(),t={push:function(m){u.push(m),f()},filter:function(m){return u=u.filter(m),t}}}};return o}function lC(i){i===void 0&&(i={});var e=aC(null);return e.options=bi({async:!0,ssr:!1},i),e}var t_=function(i){var e=i.sideCar,t=e_(i,["sideCar"]);if(!e)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var s=e.read();if(!s)throw new Error("Sidecar medium not found");return L.createElement(s,bi({},t))};t_.isSideCarExport=!0;function cC(i,e){return i.useMedium(e),t_}var n_=lC(),df=function(){},kc=L.forwardRef(function(i,e){var t=L.useRef(null),s=L.useState({onScrollCapture:df,onWheelCapture:df,onTouchMoveCapture:df}),o=s[0],l=s[1],u=i.forwardProps,d=i.children,h=i.className,f=i.removeScrollBar,m=i.enabled,g=i.shards,x=i.sideCar,S=i.noRelative,M=i.noIsolation,E=i.inert,y=i.allowPinchZoom,_=i.as,N=_===void 0?"div":_,P=i.gapMode,b=e_(i,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),k=x,B=sC([t,e]),I=bi(bi({},b),o);return L.createElement(L.Fragment,null,m&&L.createElement(k,{sideCar:n_,removeScrollBar:f,shards:g,noRelative:S,noIsolation:M,inert:E,setCallbacks:l,allowPinchZoom:!!y,lockRef:t,gapMode:P}),u?L.cloneElement(L.Children.only(d),bi(bi({},I),{ref:B})):L.createElement(N,bi({},I,{className:h,ref:B}),d))});kc.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};kc.classNames={fullWidth:Sc,zeroRight:yc};var uC=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function dC(){if(!document)return null;var i=document.createElement("style");i.type="text/css";var e=uC();return e&&i.setAttribute("nonce",e),i}function fC(i,e){i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}function hC(i){var e=document.head||document.getElementsByTagName("head")[0];e.appendChild(i)}var pC=function(){var i=0,e=null;return{add:function(t){i==0&&(e=dC())&&(fC(e,t),hC(e)),i++},remove:function(){i--,!i&&e&&(e.parentNode&&e.parentNode.removeChild(e),e=null)}}},mC=function(){var i=pC();return function(e,t){L.useEffect(function(){return i.add(e),function(){i.remove()}},[e&&t])}},i_=function(){var i=mC(),e=function(t){var s=t.styles,o=t.dynamic;return i(s,o),null};return e},gC={left:0,top:0,right:0,gap:0},ff=function(i){return parseInt(i||"",10)||0},vC=function(i){var e=window.getComputedStyle(document.body),t=e[i==="padding"?"paddingLeft":"marginLeft"],s=e[i==="padding"?"paddingTop":"marginTop"],o=e[i==="padding"?"paddingRight":"marginRight"];return[ff(t),ff(s),ff(o)]},_C=function(i){if(i===void 0&&(i="margin"),typeof window>"u")return gC;var e=vC(i),t=document.documentElement.clientWidth,s=window.innerWidth;return{left:e[0],top:e[1],right:e[2],gap:Math.max(0,s-t+e[2]-e[0])}},xC=i_(),co="data-scroll-locked",yC=function(i,e,t,s){var o=i.left,l=i.top,u=i.right,d=i.gap;return t===void 0&&(t="margin"),`
  .`.concat(tC,` {
   overflow: hidden `).concat(s,`;
   padding-right: `).concat(d,"px ").concat(s,`;
  }
  body[`).concat(co,`] {
    overflow: hidden `).concat(s,`;
    overscroll-behavior: contain;
    `).concat([e&&"position: relative ".concat(s,";"),t==="margin"&&`
    padding-left: `.concat(o,`px;
    padding-top: `).concat(l,`px;
    padding-right: `).concat(u,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(d,"px ").concat(s,`;
    `),t==="padding"&&"padding-right: ".concat(d,"px ").concat(s,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(yc,` {
    right: `).concat(d,"px ").concat(s,`;
  }
  
  .`).concat(Sc,` {
    margin-right: `).concat(d,"px ").concat(s,`;
  }
  
  .`).concat(yc," .").concat(yc,` {
    right: 0 `).concat(s,`;
  }
  
  .`).concat(Sc," .").concat(Sc,` {
    margin-right: 0 `).concat(s,`;
  }
  
  body[`).concat(co,`] {
    `).concat(nC,": ").concat(d,`px;
  }
`)},zv=function(){var i=parseInt(document.body.getAttribute(co)||"0",10);return isFinite(i)?i:0},SC=function(){L.useEffect(function(){return document.body.setAttribute(co,(zv()+1).toString()),function(){var i=zv()-1;i<=0?document.body.removeAttribute(co):document.body.setAttribute(co,i.toString())}},[])},EC=function(i){var e=i.noRelative,t=i.noImportant,s=i.gapMode,o=s===void 0?"margin":s;SC();var l=L.useMemo(function(){return _C(o)},[o]);return L.createElement(xC,{styles:yC(l,!e,o,t?"":"!important")})},ph=!1;if(typeof window<"u")try{var uc=Object.defineProperty({},"passive",{get:function(){return ph=!0,!0}});window.addEventListener("test",uc,uc),window.removeEventListener("test",uc,uc)}catch{ph=!1}var io=ph?{passive:!1}:!1,MC=function(i){return i.tagName==="TEXTAREA"},r_=function(i,e){if(!(i instanceof Element))return!1;var t=window.getComputedStyle(i);return t[e]!=="hidden"&&!(t.overflowY===t.overflowX&&!MC(i)&&t[e]==="visible")},wC=function(i){return r_(i,"overflowY")},TC=function(i){return r_(i,"overflowX")},Bv=function(i,e){var t=e.ownerDocument,s=e;do{typeof ShadowRoot<"u"&&s instanceof ShadowRoot&&(s=s.host);var o=s_(i,s);if(o){var l=o_(i,s),u=l[1],d=l[2];if(u>d)return!0}s=s.parentNode}while(s&&s!==t.body);return!1},bC=function(i){var e=i.scrollTop,t=i.scrollHeight,s=i.clientHeight;return[e,t,s]},AC=function(i){var e=i.scrollLeft,t=i.scrollWidth,s=i.clientWidth;return[e,t,s]},s_=function(i,e){return i==="v"?wC(e):TC(e)},o_=function(i,e){return i==="v"?bC(e):AC(e)},CC=function(i,e){return i==="h"&&e==="rtl"?-1:1},RC=function(i,e,t,s,o){var l=CC(i,window.getComputedStyle(e).direction),u=l*s,d=t.target,h=e.contains(d),f=!1,m=u>0,g=0,x=0;do{if(!d)break;var S=o_(i,d),M=S[0],E=S[1],y=S[2],_=E-y-l*M;(M||_)&&s_(i,d)&&(g+=_,x+=M);var N=d.parentNode;d=N&&N.nodeType===Node.DOCUMENT_FRAGMENT_NODE?N.host:N}while(!h&&d!==document.body||h&&(e.contains(d)||e===d));return(m&&Math.abs(g)<1||!m&&Math.abs(x)<1)&&(f=!0),f},dc=function(i){return"changedTouches"in i?[i.changedTouches[0].clientX,i.changedTouches[0].clientY]:[0,0]},Hv=function(i){return[i.deltaX,i.deltaY]},Vv=function(i){return i&&"current"in i?i.current:i},PC=function(i,e){return i[0]===e[0]&&i[1]===e[1]},LC=function(i){return`
  .block-interactivity-`.concat(i,` {pointer-events: none;}
  .allow-interactivity-`).concat(i,` {pointer-events: all;}
`)},NC=0,ro=[];function DC(i){var e=L.useRef([]),t=L.useRef([0,0]),s=L.useRef(),o=L.useState(NC++)[0],l=L.useState(i_)[0],u=L.useRef(i);L.useEffect(function(){u.current=i},[i]),L.useEffect(function(){if(i.inert){document.body.classList.add("block-interactivity-".concat(o));var E=eC([i.lockRef.current],(i.shards||[]).map(Vv),!0).filter(Boolean);return E.forEach(function(y){return y.classList.add("allow-interactivity-".concat(o))}),function(){document.body.classList.remove("block-interactivity-".concat(o)),E.forEach(function(y){return y.classList.remove("allow-interactivity-".concat(o))})}}},[i.inert,i.lockRef.current,i.shards]);var d=L.useCallback(function(E,y){if("touches"in E&&E.touches.length===2||E.type==="wheel"&&E.ctrlKey)return!u.current.allowPinchZoom;var _=dc(E),N=t.current,P="deltaX"in E?E.deltaX:N[0]-_[0],b="deltaY"in E?E.deltaY:N[1]-_[1],k,B=E.target,I=Math.abs(P)>Math.abs(b)?"h":"v";if("touches"in E&&I==="h"&&B.type==="range")return!1;var z=Bv(I,B);if(!z)return!0;if(z?k=I:(k=I==="v"?"h":"v",z=Bv(I,B)),!z)return!1;if(!s.current&&"changedTouches"in E&&(P||b)&&(s.current=k),!k)return!0;var C=s.current||k;return RC(C,y,E,C==="h"?P:b)},[]),h=L.useCallback(function(E){var y=E;if(!(!ro.length||ro[ro.length-1]!==l)){var _="deltaY"in y?Hv(y):dc(y),N=e.current.filter(function(k){return k.name===y.type&&(k.target===y.target||y.target===k.shadowParent)&&PC(k.delta,_)})[0];if(N&&N.should){y.cancelable&&y.preventDefault();return}if(!N){var P=(u.current.shards||[]).map(Vv).filter(Boolean).filter(function(k){return k.contains(y.target)}),b=P.length>0?d(y,P[0]):!u.current.noIsolation;b&&y.cancelable&&y.preventDefault()}}},[]),f=L.useCallback(function(E,y,_,N){var P={name:E,delta:y,target:_,should:N,shadowParent:IC(_)};e.current.push(P),setTimeout(function(){e.current=e.current.filter(function(b){return b!==P})},1)},[]),m=L.useCallback(function(E){t.current=dc(E),s.current=void 0},[]),g=L.useCallback(function(E){f(E.type,Hv(E),E.target,d(E,i.lockRef.current))},[]),x=L.useCallback(function(E){f(E.type,dc(E),E.target,d(E,i.lockRef.current))},[]);L.useEffect(function(){return ro.push(l),i.setCallbacks({onScrollCapture:g,onWheelCapture:g,onTouchMoveCapture:x}),document.addEventListener("wheel",h,io),document.addEventListener("touchmove",h,io),document.addEventListener("touchstart",m,io),function(){ro=ro.filter(function(E){return E!==l}),document.removeEventListener("wheel",h,io),document.removeEventListener("touchmove",h,io),document.removeEventListener("touchstart",m,io)}},[]);var S=i.removeScrollBar,M=i.inert;return L.createElement(L.Fragment,null,M?L.createElement(l,{styles:LC(o)}):null,S?L.createElement(EC,{noRelative:i.noRelative,gapMode:i.gapMode}):null)}function IC(i){for(var e=null;i!==null;)i instanceof ShadowRoot&&(e=i.host,i=i.host),i=i.parentNode;return e}const UC=cC(n_,DC);var a_=L.forwardRef(function(i,e){return L.createElement(kc,bi({},i,{ref:e,sideCar:UC}))});a_.classNames=kc.classNames;var FC=function(i){if(typeof document>"u")return null;var e=Array.isArray(i)?i[0]:i;return e.ownerDocument.body},so=new WeakMap,fc=new WeakMap,hc={},hf=0,l_=function(i){return i&&(i.host||l_(i.parentNode))},OC=function(i,e){return e.map(function(t){if(i.contains(t))return t;var s=l_(t);return s&&i.contains(s)?s:(console.error("aria-hidden",t,"in not contained inside",i,". Doing nothing"),null)}).filter(function(t){return!!t})},kC=function(i,e,t,s){var o=OC(e,Array.isArray(i)?i:[i]);hc[t]||(hc[t]=new WeakMap);var l=hc[t],u=[],d=new Set,h=new Set(o),f=function(g){!g||d.has(g)||(d.add(g),f(g.parentNode))};o.forEach(f);var m=function(g){!g||h.has(g)||Array.prototype.forEach.call(g.children,function(x){if(d.has(x))m(x);else try{var S=x.getAttribute(s),M=S!==null&&S!=="false",E=(so.get(x)||0)+1,y=(l.get(x)||0)+1;so.set(x,E),l.set(x,y),u.push(x),E===1&&M&&fc.set(x,!0),y===1&&x.setAttribute(t,"true"),M||x.setAttribute(s,"true")}catch(_){console.error("aria-hidden: cannot operate on ",x,_)}})};return m(e),d.clear(),hf++,function(){u.forEach(function(g){var x=so.get(g)-1,S=l.get(g)-1;so.set(g,x),l.set(g,S),x||(fc.has(g)||g.removeAttribute(s),fc.delete(g)),S||g.removeAttribute(t)}),hf--,hf||(so=new WeakMap,so=new WeakMap,fc=new WeakMap,hc={})}},zC=function(i,e,t){t===void 0&&(t="data-aria-hidden");var s=Array.from(Array.isArray(i)?i:[i]),o=FC(i);return o?(s.push.apply(s,Array.from(o.querySelectorAll("[aria-live], script"))),kC(s,o,t,"aria-hidden")):function(){return null}},zc="Dialog",[c_]=MA(zc),[BC,yi]=c_(zc),u_=i=>{const{__scopeDialog:e,children:t,open:s,defaultOpen:o,onOpenChange:l,modal:u=!0}=i,d=L.useRef(null),h=L.useRef(null),[f,m]=CA({prop:s,defaultProp:o??!1,onChange:l,caller:zc});return O.jsx(BC,{scope:e,triggerRef:d,contentRef:h,contentId:of(),titleId:of(),descriptionId:of(),open:f,onOpenChange:m,onOpenToggle:L.useCallback(()=>m(g=>!g),[m]),modal:u,children:t})};u_.displayName=zc;var d_="DialogTrigger",HC=L.forwardRef((i,e)=>{const{__scopeDialog:t,...s}=i,o=yi(d_,t),l=gs(e,o.triggerRef);return O.jsx(nr.button,{type:"button","aria-haspopup":"dialog","aria-expanded":o.open,"aria-controls":o.contentId,"data-state":Bh(o.open),...s,ref:l,onClick:Ur(i.onClick,o.onOpenToggle)})});HC.displayName=d_;var kh="DialogPortal",[VC,f_]=c_(kh,{forceMount:void 0}),h_=i=>{const{__scopeDialog:e,forceMount:t,children:s,container:o}=i,l=yi(kh,e);return O.jsx(VC,{scope:e,forceMount:t,children:L.Children.map(s,u=>O.jsx(Oc,{present:t||l.open,children:O.jsx(J0,{asChild:!0,container:o,children:u})}))})};h_.displayName=kh;var Pc="DialogOverlay",p_=L.forwardRef((i,e)=>{const t=f_(Pc,i.__scopeDialog),{forceMount:s=t.forceMount,...o}=i,l=yi(Pc,i.__scopeDialog);return l.modal?O.jsx(Oc,{present:s||l.open,children:O.jsx(WC,{...o,ref:e})}):null});p_.displayName=Pc;var GC=Sh("DialogOverlay.RemoveScroll"),WC=L.forwardRef((i,e)=>{const{__scopeDialog:t,...s}=i,o=yi(Pc,t);return O.jsx(a_,{as:GC,allowPinchZoom:!0,shards:[o.contentRef],children:O.jsx(nr.div,{"data-state":Bh(o.open),...s,ref:e,style:{pointerEvents:"auto",...s.style}})})}),ms="DialogContent",m_=L.forwardRef((i,e)=>{const t=f_(ms,i.__scopeDialog),{forceMount:s=t.forceMount,...o}=i,l=yi(ms,i.__scopeDialog);return O.jsx(Oc,{present:s||l.open,children:l.modal?O.jsx(jC,{...o,ref:e}):O.jsx(XC,{...o,ref:e})})});m_.displayName=ms;var jC=L.forwardRef((i,e)=>{const t=yi(ms,i.__scopeDialog),s=L.useRef(null),o=gs(e,t.contentRef,s);return L.useEffect(()=>{const l=s.current;if(l)return zC(l)},[]),O.jsx(g_,{...i,ref:o,trapFocus:t.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:Ur(i.onCloseAutoFocus,l=>{var u;l.preventDefault(),(u=t.triggerRef.current)==null||u.focus()}),onPointerDownOutside:Ur(i.onPointerDownOutside,l=>{const u=l.detail.originalEvent,d=u.button===0&&u.ctrlKey===!0;(u.button===2||d)&&l.preventDefault()}),onFocusOutside:Ur(i.onFocusOutside,l=>l.preventDefault())})}),XC=L.forwardRef((i,e)=>{const t=yi(ms,i.__scopeDialog),s=L.useRef(!1),o=L.useRef(!1);return O.jsx(g_,{...i,ref:e,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:l=>{var u,d;(u=i.onCloseAutoFocus)==null||u.call(i,l),l.defaultPrevented||(s.current||(d=t.triggerRef.current)==null||d.focus(),l.preventDefault()),s.current=!1,o.current=!1},onInteractOutside:l=>{var h,f;(h=i.onInteractOutside)==null||h.call(i,l),l.defaultPrevented||(s.current=!0,l.detail.originalEvent.type==="pointerdown"&&(o.current=!0));const u=l.target;((f=t.triggerRef.current)==null?void 0:f.contains(u))&&l.preventDefault(),l.detail.originalEvent.type==="focusin"&&o.current&&l.preventDefault()}})}),g_=L.forwardRef((i,e)=>{const{__scopeDialog:t,trapFocus:s,onOpenAutoFocus:o,onCloseAutoFocus:l,...u}=i,d=yi(ms,t),h=L.useRef(null),f=gs(e,h);return JA(),O.jsxs(O.Fragment,{children:[O.jsx(Z0,{asChild:!0,loop:!0,trapped:s,onMountAutoFocus:o,onUnmountAutoFocus:l,children:O.jsx(q0,{role:"dialog",id:d.contentId,"aria-describedby":d.descriptionId,"aria-labelledby":d.titleId,"data-state":Bh(d.open),...u,ref:f,onDismiss:()=>d.onOpenChange(!1)})}),O.jsxs(O.Fragment,{children:[O.jsx($C,{titleId:d.titleId}),O.jsx(qC,{contentRef:h,descriptionId:d.descriptionId})]})]})}),zh="DialogTitle",v_=L.forwardRef((i,e)=>{const{__scopeDialog:t,...s}=i,o=yi(zh,t);return O.jsx(nr.h2,{id:o.titleId,...s,ref:e})});v_.displayName=zh;var __="DialogDescription",x_=L.forwardRef((i,e)=>{const{__scopeDialog:t,...s}=i,o=yi(__,t);return O.jsx(nr.p,{id:o.descriptionId,...s,ref:e})});x_.displayName=__;var y_="DialogClose",S_=L.forwardRef((i,e)=>{const{__scopeDialog:t,...s}=i,o=yi(y_,t);return O.jsx(nr.button,{type:"button",...s,ref:e,onClick:Ur(i.onClick,()=>o.onOpenChange(!1))})});S_.displayName=y_;function Bh(i){return i?"open":"closed"}var E_="DialogTitleWarning",[XP,M_]=EA(E_,{contentName:ms,titleName:zh,docsSlug:"dialog"}),$C=({titleId:i})=>{const e=M_(E_),t=`\`${e.contentName}\` requires a \`${e.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${e.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${e.docsSlug}`;return L.useEffect(()=>{i&&(document.getElementById(i)||console.error(t))},[t,i]),null},YC="DialogDescriptionWarning",qC=({contentRef:i,descriptionId:e})=>{const s=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${M_(YC).contentName}}.`;return L.useEffect(()=>{var l;const o=(l=i.current)==null?void 0:l.getAttribute("aria-describedby");e&&o&&(document.getElementById(e)||console.warn(s))},[s,i,e]),null},KC=u_,ZC=h_,w_=p_,T_=m_,b_=v_,A_=x_,QC=S_;const JC=KC,eR=ZC,C_=L.forwardRef(({className:i,...e},t)=>O.jsx(w_,{ref:t,className:cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",i),...e}));C_.displayName=w_.displayName;const R_=L.forwardRef(({className:i,children:e,...t},s)=>O.jsxs(eR,{children:[O.jsx(C_,{}),O.jsxs(T_,{ref:s,className:cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",i),...t,children:[e,O.jsxs(QC,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[O.jsx(f0,{className:"h-4 w-4"}),O.jsx("span",{className:"sr-only",children:"Close"})]})]})]}));R_.displayName=T_.displayName;const P_=({className:i,...e})=>O.jsx("div",{className:cn("flex flex-col space-y-1.5 text-center sm:text-left",i),...e});P_.displayName="DialogHeader";const L_=L.forwardRef(({className:i,...e},t)=>O.jsx(b_,{ref:t,className:cn("text-lg font-semibold leading-none tracking-tight",i),...e}));L_.displayName=b_.displayName;const tR=L.forwardRef(({className:i,...e},t)=>O.jsx(A_,{ref:t,className:cn("text-sm text-muted-foreground",i),...e}));tR.displayName=A_.displayName;function nR({index:i=0,name:e="Assitant",imageUrl:t=null,size:s="default"}){const[o,l]=L.useState(!1),[u,d]=L.useState({x:0,y:0}),[h,f]=L.useState(!1),m=L.useRef(),g={small:"w-48 h-48",default:"w-64 h-64",large:"w-80 h-80"};L.useEffect(()=>{const _=new IntersectionObserver(([N])=>{N.isIntersecting&&setTimeout(()=>l(!0),i*100)},{threshold:.2});return m.current&&_.observe(m.current),()=>_.disconnect()},[i]);const x=_=>{if(!m.current)return;const N=m.current.getBoundingClientRect(),P=(_.clientX-N.left)/N.width-.5,b=(_.clientY-N.top)/N.height-.5;d({x:b*12,y:-P*12})},S=()=>{d({x:0,y:0}),f(!1)},M=()=>{f(!0)},E=["from-pink-300 via-purple-300 to-blue-300","from-yellow-300 via-orange-300 to-pink-300","from-green-300 via-teal-300 to-cyan-300","from-purple-300 via-pink-300 to-rose-300","from-blue-300 via-indigo-300 to-purple-300","from-amber-300 via-orange-300 to-red-300"],y=E[i%E.length];return O.jsxs("div",{ref:m,className:`relative ${g[s]} mx-auto transition-all duration-700 ${o?"opacity-100 translate-y-0":"opacity-0 translate-y-20"}`,style:{transitionDelay:`${i*80}ms`},children:[O.jsx("div",{className:"absolute -top-2 -right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500",children:O.jsx(ma,{className:"w-5 h-5 text-[#ffb585] animate-pulse"})}),O.jsx("div",{className:"absolute -bottom-2 -left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100",children:O.jsx(ma,{className:"w-4 h-4 text-[#c7aff8] animate-pulse"})}),O.jsxs("div",{className:"group relative w-full h-full",style:{transform:`perspective(1000px) rotateX(${u.x}deg) rotateY(${u.y}deg) scale(${h?1.05:1})`,transition:h?"transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)":"transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)"},onMouseMove:x,onMouseLeave:S,onMouseEnter:M,children:[O.jsx("div",{className:"absolute inset-0 rounded-3xl bg-gradient-to-br from-[#a6b1ff]/20 via-[#c7aff8]/20 to-[#ffb585]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"}),O.jsxs("div",{className:"relative w-full h-full glass-morphism-strong rounded-3xl p-6 overflow-hidden",children:[O.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-[#c7aff8]/10 via-transparent to-transparent opacity-50"}),O.jsx("div",{className:"absolute top-0 left-1/4 right-1/4 h-20 bg-gradient-to-b from-white/20 to-transparent rounded-full blur-xl"}),O.jsx("div",{className:"relative w-full h-full flex items-center justify-center breath-float",children:t?O.jsx("img",{src:t,alt:`${e} - Assitant`,className:"w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110",loading:"lazy"}):O.jsxs("div",{className:`w-full h-full bg-gradient-to-br ${y} rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl`,children:[O.jsx("div",{className:"absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-50"}),O.jsx("div",{className:"relative z-10 w-3/4 h-3/4 bg-white/90 rounded-full flex items-center justify-center shadow-inner",children:O.jsx("div",{className:"w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full shadow-lg"})}),O.jsx("div",{className:"absolute top-1/4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white/80 rounded-full shadow-md"}),O.jsx("div",{className:"absolute top-1/3 left-1/3 w-4 h-4 bg-pink-400 rounded-full shadow-sm"}),O.jsx("div",{className:"absolute top-1/3 right-1/3 w-4 h-4 bg-pink-400 rounded-full shadow-sm"})]})}),O.jsx("div",{className:"absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/5 to-transparent backdrop-blur-sm"}),O.jsx("div",{className:"absolute bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-gradient-to-r from-[#a6b1ff] via-[#c7aff8] to-[#ffb585] rounded-full blur-md opacity-60 group-hover:opacity-100 group-hover:w-24 transition-all duration-500"})]}),O.jsx("div",{className:"absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/30 rounded-tl-lg"}),O.jsx("div",{className:"absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/30 rounded-tr-lg"}),O.jsx("div",{className:"absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/30 rounded-bl-lg"}),O.jsx("div",{className:"absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/30 rounded-br-lg"})]}),O.jsxs("div",{className:"mt-4 text-center",children:[O.jsx("p",{className:"text-xs text-gray-400/70 tracking-wide uppercase",children:"Assitant"}),O.jsx("p",{className:"text-sm text-white/80 font-medium mt-1",children:e})]})]})}function iR({products:i}){var u;const[e,t]=L.useState(null),[s,o]=L.useState(!1),l=L.useRef();return L.useEffect(()=>{const d=new IntersectionObserver(([h])=>{h.isIntersecting&&o(!0)},{threshold:.1});return l.current&&d.observe(l.current),()=>d.disconnect()},[]),O.jsxs(O.Fragment,{children:[O.jsxs("div",{ref:l,className:"relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#12091a] to-[#0a0a0a] overflow-hidden",children:[O.jsx("div",{className:"absolute inset-0 aurora-glow opacity-30"}),O.jsx("div",{className:"absolute inset-0 overflow-hidden pointer-events-none",children:[...Array(20)].map((d,h)=>O.jsx("div",{className:"absolute w-1 h-1 bg-white/20 rounded-full animate-pulse",style:{left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,animationDelay:`${Math.random()*3}s`,animationDuration:`${2+Math.random()*2}s`}},h))}),O.jsxs("div",{className:"relative max-w-7xl mx-auto",children:[O.jsxs("div",{className:`text-center mb-20 transition-all duration-1000 ${s?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`,children:[O.jsxs("div",{className:"mb-6 inline-flex items-center gap-2 glass-morphism px-5 py-2 rounded-full",children:[O.jsx(ma,{className:"w-4 h-4 text-[#ffb585]"}),O.jsx("span",{className:"text-sm text-gray-300 tracking-[0.15em] uppercase font-medium",children:"Curated Selection"})]}),O.jsx("h2",{className:"text-4xl md:text-6xl font-bold mb-6 gradient-text-shine",children:"Featured Collection"}),O.jsx("p",{className:"text-xl text-gray-400/90 max-w-2xl mx-auto font-light leading-relaxed",children:"Discover our handpicked selection of premium collectible figures"})]}),O.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-12 mb-20",children:[0,1,2].map(d=>O.jsx(nR,{index:d,name:d===0?"Dewode":d===1?"Grace":"Fola",size:"default"},d))})]})]}),O.jsx(JC,{open:!!e,onOpenChange:()=>t(null),children:O.jsxs(R_,{className:"glass-morphism-strong border-white/20 text-white max-w-3xl",children:[O.jsx(P_,{children:O.jsx(L_,{className:"text-3xl font-bold gradient-text-shine",children:e==null?void 0:e.name})}),e&&O.jsxs("div",{className:"space-y-6",children:[O.jsx("div",{className:"aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1520] to-[#0a0a0a] flex items-center justify-center",children:e.image_url?O.jsx("img",{src:e.image_url,alt:e.name,className:"w-full h-full object-cover"}):O.jsx("div",{className:"w-64 h-64 bg-gradient-to-br from-[#a6b1ff] to-[#c7aff8] rounded-lg"})}),O.jsxs("div",{className:"space-y-4",children:[O.jsxs("div",{className:"flex items-center gap-3 flex-wrap",children:[e.rarity&&O.jsx(Pv,{className:"bg-purple-500/20 text-purple-300 border-purple-500/30",children:e.rarity}),e.category&&O.jsx(Pv,{className:"glass-morphism border-white/20",children:e.category})]}),O.jsx("p",{className:"text-gray-300/90 leading-relaxed text-lg",children:e.description||"Premium collectible figure from our exclusive collection. Each piece is crafted with meticulous attention to detail and comes with a certificate of authenticity."}),O.jsxs("div",{className:"flex items-center justify-between pt-6 border-t border-white/10",children:[O.jsxs("span",{className:"text-4xl font-bold gradient-text-shine",children:["$",(u=e.price)==null?void 0:u.toFixed(2)]}),O.jsxs(pa,{className:"halo-click bg-gradient-to-r from-[#a6b1ff] to-[#c7aff8] text-[#0a0a0a] hover:scale-105 hover:shadow-[0_0_30px_rgba(166,177,255,0.5)] transition-all duration-300",disabled:!e.in_stock,children:[O.jsx(QS,{className:"w-5 h-5 mr-2"}),e.in_stock?"Add to Cart":"Out of Stock"]})]})]})]})]})})]})}const pf=[{icon:YS,title:"Register",description:"Click the get Start Button to start",color:"#1175c7ff",delay:0},{icon:XS,title:"Start a Quiz",description:"start a quiz by a quiz code",color:"#5f2fdaff",delay:200},{icon:tE,title:"Manage Teachers",description:"add the teachers and quiz with ea",color:"#ffb366",delay:400},{icon:WS,title:"Full Access",description:"Start a zero cost",color:"#a8d8ff",delay:600}];function rR(){const[i,e]=L.useState([]),t=L.useRef();return L.useEffect(()=>{const s=new IntersectionObserver(([o])=>{o.isIntersecting&&pf.forEach((l,u)=>{setTimeout(()=>{e(d=>[...d,u])},u*150)})},{threshold:.2});return t.current&&s.observe(t.current),()=>s.disconnect()},[]),O.jsx("div",{ref:t,className:"relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]",children:O.jsxs("div",{className:"max-w-7xl mx-auto",children:[O.jsxs("div",{className:"text-center mb-20",children:[O.jsx("h2",{className:"text-4xl md:text-6xl font-bold mb-6 text-white",children:"How It Works"}),O.jsx("p",{className:"text-xl text-gray-400 max-w-2xl mx-auto font-light",children:"Four simple steps to start your collection"})]}),O.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",children:pf.map((s,o)=>{const l=s.icon,u=i.includes(o),d=o%2===0;return O.jsx("div",{className:`transform transition-all duration-1000 ${u?"opacity-100 translate-y-0":d?"opacity-0 -translate-y-20":"opacity-0 translate-y-20"}`,children:O.jsxs(X0,{className:"interactive relative h-full glass-effect border-white/10 p-8 group hover:border-[#a8d8ff]/50 transition-all duration-300 hover:scale-105",children:[O.jsx("div",{className:"absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg",style:{background:`linear-gradient(135deg, ${s.color}, transparent)`}}),O.jsxs("div",{className:"relative space-y-6",children:[O.jsx("div",{className:"w-16 h-16 rounded-2xl flex items-center justify-center glass-effect border border-white/20 group-hover:scale-110 transition-transform duration-300",style:{boxShadow:`0 0 30px ${s.color}40`},children:O.jsx(l,{className:"w-8 h-8",style:{color:s.color}})}),O.jsxs("div",{className:"space-y-3",children:[O.jsx("div",{className:"flex items-center gap-3",children:O.jsxs("span",{className:"text-sm font-bold px-3 py-1 rounded-full glass-effect",style:{color:s.color},children:["Step ",o+1]})}),O.jsx("h3",{className:"text-2xl font-bold text-white group-hover:text-[#a8d8ff] transition-colors",children:s.title}),O.jsx("p",{className:"text-gray-400 leading-relaxed",children:s.description})]})]}),o<pf.length-1&&O.jsx("div",{className:"hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2",children:O.jsx("div",{className:"w-8 h-0.5 bg-gradient-to-r from-[#a8d8ff] to-transparent"})})]})},o)})})]})})}const N_=L.forwardRef(({className:i,type:e,...t},s)=>O.jsx("input",{type:e,className:cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",i),ref:s,...t}));N_.displayName="Input";function sR(){const[i,e]=L.useState(""),[t,s]=L.useState({x:0,y:0}),o=L.useRef();L.useEffect(()=>{const u=h=>{if(o.current){const f=o.current.getBoundingClientRect();s({x:(h.clientX-f.left)/f.width,y:(h.clientY-f.top)/f.height})}},d=o.current;if(d)return d.addEventListener("mousemove",u),()=>d.removeEventListener("mousemove",u)},[]);const l=u=>{u.preventDefault(),console.log("Newsletter signup:",i),e("")};return O.jsxs("div",{ref:o,className:"relative py-32 px-6 overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]",children:[O.jsxs("div",{className:"absolute inset-0 overflow-hidden",children:[O.jsx("div",{className:"absolute w-[600px] h-[600px] bg-[#a8d8ff] rounded-full blur-[150px] opacity-20 transition-transform duration-1000 ease-out",style:{left:`${t.x*100}%`,top:`${t.y*100}%`,transform:"translate(-50%, -50%)"}}),O.jsx("div",{className:"absolute w-[400px] h-[400px] bg-[#c9b3ff] rounded-full blur-[150px] opacity-20 transition-transform duration-1000 ease-out delay-100",style:{left:`${(1-t.x)*100}%`,top:`${(1-t.y)*100}%`,transform:"translate(-50%, -50%)"}})]}),O.jsxs("div",{className:"relative max-w-4xl mx-auto text-center",children:[O.jsxs("div",{className:"mb-8 inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full",children:[O.jsx(ma,{className:"w-4 h-4 text-[#ffb366]"}),O.jsx("span",{className:"text-sm text-gray-300 tracking-wider",children:"Stay Connected"})]}),O.jsxs("h2",{className:"text-4xl md:text-6xl font-bold mb-6 text-white",children:["Join the",O.jsx("span",{className:"block mt-2 bg-gradient-to-r from-[#a8d8ff] via-[#c9b3ff] to-[#ffb366] bg-clip-text text-transparent",children:"Challenger's Circle"})]}),O.jsx("p",{className:"text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed",children:"Be the first to know about new quiz, exclusive drops xp, and rewards"}),O.jsx("form",{onSubmit:l,className:"max-w-md mx-auto",children:O.jsxs("div",{className:"relative group",children:[O.jsx(VS,{className:"absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#a8d8ff] transition-colors"}),O.jsx(N_,{type:"email",value:i,onChange:u=>e(u.target.value),placeholder:"Enter your email",className:"interactive w-full pl-12 pr-32 py-6 glass-effect border-white/20 text-white placeholder:text-gray-500 rounded-full focus:border-[#a8d8ff] focus:ring-2 focus:ring-[#a8d8ff]/50 transition-all",required:!0}),O.jsxs(pa,{type:"submit",className:"interactive absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#a8d8ff] to-[#c9b3ff] text-[#1a1a1a] hover:scale-105 transition-transform rounded-full",children:[O.jsx(KS,{className:"w-4 h-4 mr-2"}),"Subscribe"]})]})}),O.jsx("div",{className:"mt-16 grid grid-cols-1 md:grid-cols-3 gap-8",children:[{label:"Collectors",value:"10K+"},{label:"Products",value:"500+"},{label:"Countries",value:"50+"}].map((u,d)=>O.jsxs("div",{className:"glass-effect rounded-2xl p-6 border border-white/10",children:[O.jsx("div",{className:"text-4xl font-bold bg-gradient-to-r from-[#a8d8ff] to-[#c9b3ff] bg-clip-text text-transparent mb-2",children:u.value}),O.jsx("div",{className:"text-gray-400 font-light",children:u.label})]},d))})]})]})}function oR(){return O.jsx("footer",{className:"relative py-20 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#000000] border-t border-white/5",children:O.jsxs("div",{className:"max-w-7xl mx-auto",children:[O.jsx("div",{className:"w-full h-px bg-gradient-to-r from-transparent via-[#a6b1ff] to-transparent mb-16"}),O.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-between gap-8",children:[O.jsxs("div",{className:"text-center md:text-left",children:[O.jsx("h3",{className:"text-2xl font-bold mb-3 gradient-text-shine",children:"Expand your experience"}),O.jsx("p",{className:"text-gray-400/90 text-sm font-light tracking-wide",children:"beyond your school class room"})]}),O.jsxs("div",{className:"flex items-center gap-4 text-gray-400",children:[O.jsx("div",{className:"h-px w-12 bg-gradient-to-r from-transparent to-white/20"}),O.jsx("div",{className:"flex flex-col items-center md:items-end gap-2 group",children:O.jsx("p",{className:"text-xs text-gray-500 tracking-wide",children:"Beyond now"})}),O.jsx("div",{className:"h-px w-12 bg-gradient-to-l from-transparent to-white/20"})]})]}),O.jsxs("div",{className:"mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500",children:[O.jsxs("div",{className:"flex items-center gap-3",children:[O.jsx("span",{children:"© 2024 Techxplora"}),O.jsx("span",{className:"text-white/20",children:"•"}),O.jsx("span",{children:"All rights reserved"})]}),O.jsxs("div",{className:"flex items-center gap-2",children:[O.jsx("span",{children:"Crafted Quizs"}),O.jsx(BS,{className:"w-4 h-4 text-[#ffb585] fill-current glow-pulse"}),O.jsx("span",{children:"for worldwide experience"})]})]})]})})}function aR(){const[i,e]=L.useState({x:0,y:0}),[t,s]=L.useState(!1),[o,l]=L.useState(!1);return L.useEffect(()=>{const u=f=>{e({x:f.clientX,y:f.clientY}),o||l(!0)},d=f=>{f.target.closest('button, a, .interactive, [role="button"]')?s(!0):s(!1)},h=()=>{l(!1)};return window.addEventListener("mousemove",u),window.addEventListener("mouseover",d),document.addEventListener("mouseleave",h),()=>{window.removeEventListener("mousemove",u),window.removeEventListener("mouseover",d),document.removeEventListener("mouseleave",h)}},[o]),o?O.jsxs(O.Fragment,{children:[O.jsx("div",{className:"fixed pointer-events-none z-[9999] mix-blend-screen transition-all duration-200 ease-out hidden md:block",style:{left:`${i.x}px`,top:`${i.y}px`,transform:`translate(-50%, -50%) scale(${t?1.8:1})`},children:O.jsx("div",{className:`rounded-full border-2 transition-all duration-300 ${t?"w-12 h-12 border-[#c7aff8] bg-[#c7aff8]/20":"w-8 h-8 border-[#a6b1ff] bg-[#a6b1ff]/10"}`,style:{boxShadow:t?"0 0 20px rgba(199, 175, 248, 0.6)":"0 0 12px rgba(166, 177, 255, 0.4)"}})}),O.jsx("div",{className:"fixed pointer-events-none z-[9998] hidden md:block",style:{left:`${i.x}px`,top:`${i.y}px`,transform:"translate(-50%, -50%)"},children:O.jsx("div",{className:"w-1.5 h-1.5 rounded-full bg-white"})})]}):null}function lR({progress:i}){return O.jsxs("div",{className:"fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-2",children:[O.jsx("div",{className:"relative w-0.5 h-64 bg-white/10 rounded-full overflow-hidden",children:O.jsx("div",{className:"absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#a6b1ff] via-[#c7aff8] to-[#ffb585] transition-all duration-300 ease-out",style:{height:`${i*100}%`}})}),O.jsx("div",{className:"absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#a6b1ff] transition-all duration-300 ease-out",style:{top:`${i*100}%`,boxShadow:"0 0 12px rgba(166, 177, 255, 0.8), 0 0 24px rgba(199, 175, 248, 0.4)"}})]})}function cR(){const i=L.useRef(null);return L.useEffect(()=>{const e=i.current;if(!e)return;const t=e.getContext("2d");e.width=window.innerWidth,e.height=window.innerHeight;const s=[],o=40;class l{constructor(){this.reset()}reset(){this.x=Math.random()*e.width,this.y=Math.random()*e.height,this.vx=(Math.random()-.5)*.3,this.vy=(Math.random()-.5)*.3,this.size=Math.random()*2+1,this.opacity=Math.random()*.15}update(){this.x+=this.vx,this.y+=this.vy,(this.x<0||this.x>e.width)&&(this.vx*=-1),(this.y<0||this.y>e.height)&&(this.vy*=-1)}draw(){t.beginPath(),t.arc(this.x,this.y,this.size,0,Math.PI*2),t.fillStyle=`rgba(166, 177, 255, ${this.opacity})`,t.fill()}}for(let f=0;f<o;f++)s.push(new l);let u;const d=()=>{t.clearRect(0,0,e.width,e.height),s.forEach(f=>{f.update(),f.draw()}),u=requestAnimationFrame(d)};d();const h=()=>{e.width=window.innerWidth,e.height=window.innerHeight};return window.addEventListener("resize",h),()=>{cancelAnimationFrame(u),window.removeEventListener("resize",h)}},[]),O.jsx("canvas",{ref:i,className:"fixed inset-0 pointer-events-none z-0",style:{opacity:.5}})}function mh(){const[i,e]=L.useState([]),[t,s]=L.useState(0);L.useEffect(()=>{o();const l=()=>{const u=document.documentElement.scrollHeight-window.innerHeight,d=window.scrollY;s(d/u)};return window.addEventListener("scroll",l),()=>window.removeEventListener("scroll",l)},[]);const o=async()=>{const l=await Xy.list("-created_date",20);e(l)};return O.jsxs("div",{className:"relative bg-[#0a0a0a] overflow-hidden",children:[O.jsx(aR,{}),O.jsx(lR,{progress:t}),O.jsx(cR,{}),O.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Bricolage Grotesque', sans-serif;
        }
        
        body {
          background: #0a0a0a;
          overflow-x: hidden;
        }
        
        @supports (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #a6b1ff 0%, #c7aff8 50%, #ffb585 100%);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #b8c0ff 0%, #d6bfff 50%, #ffc599 100%);
        }
        
        .glass-morphism {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            inset 0 1px 1px rgba(255, 255, 255, 0.1),
            0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        .glass-morphism-strong {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            inset 0 1px 2px rgba(255, 255, 255, 0.15),
            0 12px 40px rgba(0, 0, 0, 0.4);
        }
        
        .aurora-glow {
          background: radial-gradient(ellipse at center, rgba(166, 177, 255, 0.15) 0%, transparent 60%);
        }
        
        .gradient-text-shine {
          background: linear-gradient(
            135deg,
            #c7aff8 0%,
            #a6b1ff 25%,
            #ffb585 50%,
            #a6b1ff 75%,
            #c7aff8 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 8s ease-in-out infinite;
        }
        
        @keyframes shine {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .magnetic-hover {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .spring-bounce {
          transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .breath-float {
          animation: breathFloat 4s ease-in-out infinite;
        }
        
        @keyframes breathFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        
        .glow-pulse {
          animation: glowPulse 3s ease-in-out infinite;
        }
        
        @keyframes glowPulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(166, 177, 255, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(199, 175, 248, 0.6);
          }
        }
        
        .halo-click {
          position: relative;
        }
        
        .halo-click::after {
          content: '';
          position: absolute;
          inset: -20px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(166, 177, 255, 0.4) 0%, transparent 70%);
          opacity: 0;
          pointer-events: none;
        }
        
        .halo-click:active::after {
          animation: haloExpand 0.6s ease-out;
        }
        
        @keyframes haloExpand {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: scale(1.5); }
        }
      `}),O.jsx(mA,{}),O.jsx(iR,{products:i}),O.jsx(rR,{}),O.jsx(sR,{}),O.jsx(oR,{})]})}/**
 * react-router v7.9.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Gv="popstate";function uR(i={}){function e(s,o){let{pathname:l,search:u,hash:d}=s.location;return gh("",{pathname:l,search:u,hash:d},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function t(s,o){return typeof o=="string"?o:Ma(o)}return fR(e,t,null,i)}function qt(i,e){if(i===!1||i===null||typeof i>"u")throw new Error(e)}function Li(i,e){if(!i){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function dR(){return Math.random().toString(36).substring(2,10)}function Wv(i,e){return{usr:i.state,key:i.key,idx:e}}function gh(i,e,t=null,s){return{pathname:typeof i=="string"?i:i.pathname,search:"",hash:"",...typeof e=="string"?Eo(e):e,state:t,key:e&&e.key||s||dR()}}function Ma({pathname:i="/",search:e="",hash:t=""}){return e&&e!=="?"&&(i+=e.charAt(0)==="?"?e:"?"+e),t&&t!=="#"&&(i+=t.charAt(0)==="#"?t:"#"+t),i}function Eo(i){let e={};if(i){let t=i.indexOf("#");t>=0&&(e.hash=i.substring(t),i=i.substring(0,t));let s=i.indexOf("?");s>=0&&(e.search=i.substring(s),i=i.substring(0,s)),i&&(e.pathname=i)}return e}function fR(i,e,t,s={}){let{window:o=document.defaultView,v5Compat:l=!1}=s,u=o.history,d="POP",h=null,f=m();f==null&&(f=0,u.replaceState({...u.state,idx:f},""));function m(){return(u.state||{idx:null}).idx}function g(){d="POP";let y=m(),_=y==null?null:y-f;f=y,h&&h({action:d,location:E.location,delta:_})}function x(y,_){d="PUSH";let N=gh(E.location,y,_);f=m()+1;let P=Wv(N,f),b=E.createHref(N);try{u.pushState(P,"",b)}catch(k){if(k instanceof DOMException&&k.name==="DataCloneError")throw k;o.location.assign(b)}l&&h&&h({action:d,location:E.location,delta:1})}function S(y,_){d="REPLACE";let N=gh(E.location,y,_);f=m();let P=Wv(N,f),b=E.createHref(N);u.replaceState(P,"",b),l&&h&&h({action:d,location:E.location,delta:0})}function M(y){return hR(y)}let E={get action(){return d},get location(){return i(o,u)},listen(y){if(h)throw new Error("A history only accepts one active listener");return o.addEventListener(Gv,g),h=y,()=>{o.removeEventListener(Gv,g),h=null}},createHref(y){return e(o,y)},createURL:M,encodeLocation(y){let _=M(y);return{pathname:_.pathname,search:_.search,hash:_.hash}},push:x,replace:S,go(y){return u.go(y)}};return E}function hR(i,e=!1){let t="http://localhost";typeof window<"u"&&(t=window.location.origin!=="null"?window.location.origin:window.location.href),qt(t,"No window.location.(origin|href) available to create URL");let s=typeof i=="string"?i:Ma(i);return s=s.replace(/ $/,"%20"),!e&&s.startsWith("//")&&(s=t+s),new URL(s,t)}function D_(i,e,t="/"){return pR(i,e,t,!1)}function pR(i,e,t,s){let o=typeof e=="string"?Eo(e):e,l=tr(o.pathname||"/",t);if(l==null)return null;let u=I_(i);mR(u);let d=null;for(let h=0;d==null&&h<u.length;++h){let f=bR(l);d=wR(u[h],f,s)}return d}function I_(i,e=[],t=[],s="",o=!1){let l=(u,d,h=o,f)=>{let m={relativePath:f===void 0?u.path||"":f,caseSensitive:u.caseSensitive===!0,childrenIndex:d,route:u};if(m.relativePath.startsWith("/")){if(!m.relativePath.startsWith(s)&&h)return;qt(m.relativePath.startsWith(s),`Absolute route path "${m.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),m.relativePath=m.relativePath.slice(s.length)}let g=er([s,m.relativePath]),x=t.concat(m);u.children&&u.children.length>0&&(qt(u.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${g}".`),I_(u.children,e,x,g,h)),!(u.path==null&&!u.index)&&e.push({path:g,score:ER(g,u.index),routesMeta:x})};return i.forEach((u,d)=>{var h;if(u.path===""||!((h=u.path)!=null&&h.includes("?")))l(u,d);else for(let f of U_(u.path))l(u,d,!0,f)}),e}function U_(i){let e=i.split("/");if(e.length===0)return[];let[t,...s]=e,o=t.endsWith("?"),l=t.replace(/\?$/,"");if(s.length===0)return o?[l,""]:[l];let u=U_(s.join("/")),d=[];return d.push(...u.map(h=>h===""?l:[l,h].join("/"))),o&&d.push(...u),d.map(h=>i.startsWith("/")&&h===""?"/":h)}function mR(i){i.sort((e,t)=>e.score!==t.score?t.score-e.score:MR(e.routesMeta.map(s=>s.childrenIndex),t.routesMeta.map(s=>s.childrenIndex)))}var gR=/^:[\w-]+$/,vR=3,_R=2,xR=1,yR=10,SR=-2,jv=i=>i==="*";function ER(i,e){let t=i.split("/"),s=t.length;return t.some(jv)&&(s+=SR),e&&(s+=_R),t.filter(o=>!jv(o)).reduce((o,l)=>o+(gR.test(l)?vR:l===""?xR:yR),s)}function MR(i,e){return i.length===e.length&&i.slice(0,-1).every((s,o)=>s===e[o])?i[i.length-1]-e[e.length-1]:0}function wR(i,e,t=!1){let{routesMeta:s}=i,o={},l="/",u=[];for(let d=0;d<s.length;++d){let h=s[d],f=d===s.length-1,m=l==="/"?e:e.slice(l.length)||"/",g=Lc({path:h.relativePath,caseSensitive:h.caseSensitive,end:f},m),x=h.route;if(!g&&f&&t&&!s[s.length-1].route.index&&(g=Lc({path:h.relativePath,caseSensitive:h.caseSensitive,end:!1},m)),!g)return null;Object.assign(o,g.params),u.push({params:o,pathname:er([l,g.pathname]),pathnameBase:PR(er([l,g.pathnameBase])),route:x}),g.pathnameBase!=="/"&&(l=er([l,g.pathnameBase]))}return u}function Lc(i,e){typeof i=="string"&&(i={path:i,caseSensitive:!1,end:!0});let[t,s]=TR(i.path,i.caseSensitive,i.end),o=e.match(t);if(!o)return null;let l=o[0],u=l.replace(/(.)\/+$/,"$1"),d=o.slice(1);return{params:s.reduce((f,{paramName:m,isOptional:g},x)=>{if(m==="*"){let M=d[x]||"";u=l.slice(0,l.length-M.length).replace(/(.)\/+$/,"$1")}const S=d[x];return g&&!S?f[m]=void 0:f[m]=(S||"").replace(/%2F/g,"/"),f},{}),pathname:l,pathnameBase:u,pattern:i}}function TR(i,e=!1,t=!0){Li(i==="*"||!i.endsWith("*")||i.endsWith("/*"),`Route path "${i}" will be treated as if it were "${i.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${i.replace(/\*$/,"/*")}".`);let s=[],o="^"+i.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(u,d,h)=>(s.push({paramName:d,isOptional:h!=null}),h?"/?([^\\/]+)?":"/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return i.endsWith("*")?(s.push({paramName:"*"}),o+=i==="*"||i==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):t?o+="\\/*$":i!==""&&i!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,e?void 0:"i"),s]}function bR(i){try{return i.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Li(!1,`The URL path "${i}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${e}).`),i}}function tr(i,e){if(e==="/")return i;if(!i.toLowerCase().startsWith(e.toLowerCase()))return null;let t=e.endsWith("/")?e.length-1:e.length,s=i.charAt(t);return s&&s!=="/"?null:i.slice(t)||"/"}function AR(i,e="/"){let{pathname:t,search:s="",hash:o=""}=typeof i=="string"?Eo(i):i;return{pathname:t?t.startsWith("/")?t:CR(t,e):e,search:LR(s),hash:NR(o)}}function CR(i,e){let t=e.replace(/\/+$/,"").split("/");return i.split("/").forEach(o=>{o===".."?t.length>1&&t.pop():o!=="."&&t.push(o)}),t.length>1?t.join("/"):"/"}function mf(i,e,t,s){return`Cannot include a '${i}' character in a manually specified \`to.${e}\` field [${JSON.stringify(s)}].  Please separate it out to the \`to.${t}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function RR(i){return i.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function F_(i){let e=RR(i);return e.map((t,s)=>s===e.length-1?t.pathname:t.pathnameBase)}function O_(i,e,t,s=!1){let o;typeof i=="string"?o=Eo(i):(o={...i},qt(!o.pathname||!o.pathname.includes("?"),mf("?","pathname","search",o)),qt(!o.pathname||!o.pathname.includes("#"),mf("#","pathname","hash",o)),qt(!o.search||!o.search.includes("#"),mf("#","search","hash",o)));let l=i===""||o.pathname==="",u=l?"/":o.pathname,d;if(u==null)d=t;else{let g=e.length-1;if(!s&&u.startsWith("..")){let x=u.split("/");for(;x[0]==="..";)x.shift(),g-=1;o.pathname=x.join("/")}d=g>=0?e[g]:"/"}let h=AR(o,d),f=u&&u!=="/"&&u.endsWith("/"),m=(l||u===".")&&t.endsWith("/");return!h.pathname.endsWith("/")&&(f||m)&&(h.pathname+="/"),h}var er=i=>i.join("/").replace(/\/\/+/g,"/"),PR=i=>i.replace(/\/+$/,"").replace(/^\/*/,"/"),LR=i=>!i||i==="?"?"":i.startsWith("?")?i:"?"+i,NR=i=>!i||i==="#"?"":i.startsWith("#")?i:"#"+i;function DR(i){return i!=null&&typeof i.status=="number"&&typeof i.statusText=="string"&&typeof i.internal=="boolean"&&"data"in i}var k_=["POST","PUT","PATCH","DELETE"];new Set(k_);var IR=["GET",...k_];new Set(IR);var Mo=L.createContext(null);Mo.displayName="DataRouter";var Bc=L.createContext(null);Bc.displayName="DataRouterState";L.createContext(!1);var z_=L.createContext({isTransitioning:!1});z_.displayName="ViewTransition";var UR=L.createContext(new Map);UR.displayName="Fetchers";var FR=L.createContext(null);FR.displayName="Await";var Ni=L.createContext(null);Ni.displayName="Navigation";var Ca=L.createContext(null);Ca.displayName="Location";var ir=L.createContext({outlet:null,matches:[],isDataRoute:!1});ir.displayName="Route";var Hh=L.createContext(null);Hh.displayName="RouteError";function OR(i,{relative:e}={}){qt(Ra(),"useHref() may be used only in the context of a <Router> component.");let{basename:t,navigator:s}=L.useContext(Ni),{hash:o,pathname:l,search:u}=Pa(i,{relative:e}),d=l;return t!=="/"&&(d=l==="/"?t:er([t,l])),s.createHref({pathname:d,search:u,hash:o})}function Ra(){return L.useContext(Ca)!=null}function kr(){return qt(Ra(),"useLocation() may be used only in the context of a <Router> component."),L.useContext(Ca).location}var B_="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function H_(i){L.useContext(Ni).static||L.useLayoutEffect(i)}function kR(){let{isDataRoute:i}=L.useContext(ir);return i?ZR():zR()}function zR(){qt(Ra(),"useNavigate() may be used only in the context of a <Router> component.");let i=L.useContext(Mo),{basename:e,navigator:t}=L.useContext(Ni),{matches:s}=L.useContext(ir),{pathname:o}=kr(),l=JSON.stringify(F_(s)),u=L.useRef(!1);return H_(()=>{u.current=!0}),L.useCallback((h,f={})=>{if(Li(u.current,B_),!u.current)return;if(typeof h=="number"){t.go(h);return}let m=O_(h,JSON.parse(l),o,f.relative==="path");i==null&&e!=="/"&&(m.pathname=m.pathname==="/"?e:er([e,m.pathname])),(f.replace?t.replace:t.push)(m,f.state,f)},[e,t,l,o,i])}L.createContext(null);function Pa(i,{relative:e}={}){let{matches:t}=L.useContext(ir),{pathname:s}=kr(),o=JSON.stringify(F_(t));return L.useMemo(()=>O_(i,JSON.parse(o),s,e==="path"),[i,o,s,e])}function BR(i,e){return V_(i,e)}function V_(i,e,t,s,o){var N;qt(Ra(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:l}=L.useContext(Ni),{matches:u}=L.useContext(ir),d=u[u.length-1],h=d?d.params:{},f=d?d.pathname:"/",m=d?d.pathnameBase:"/",g=d&&d.route;{let P=g&&g.path||"";G_(f,!g||P.endsWith("*")||P.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${f}" (under <Route path="${P}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${P}"> to <Route path="${P==="/"?"*":`${P}/*`}">.`)}let x=kr(),S;if(e){let P=typeof e=="string"?Eo(e):e;qt(m==="/"||((N=P.pathname)==null?void 0:N.startsWith(m)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${m}" but pathname "${P.pathname}" was given in the \`location\` prop.`),S=P}else S=x;let M=S.pathname||"/",E=M;if(m!=="/"){let P=m.replace(/^\//,"").split("/");E="/"+M.replace(/^\//,"").split("/").slice(P.length).join("/")}let y=D_(i,{pathname:E});Li(g||y!=null,`No routes matched location "${S.pathname}${S.search}${S.hash}" `),Li(y==null||y[y.length-1].route.element!==void 0||y[y.length-1].route.Component!==void 0||y[y.length-1].route.lazy!==void 0,`Matched leaf route at location "${S.pathname}${S.search}${S.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let _=jR(y&&y.map(P=>Object.assign({},P,{params:Object.assign({},h,P.params),pathname:er([m,l.encodeLocation?l.encodeLocation(P.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:P.pathname]),pathnameBase:P.pathnameBase==="/"?m:er([m,l.encodeLocation?l.encodeLocation(P.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:P.pathnameBase])})),u,t,s,o);return e&&_?L.createElement(Ca.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...S},navigationType:"POP"}},_):_}function HR(){let i=KR(),e=DR(i)?`${i.status} ${i.statusText}`:i instanceof Error?i.message:JSON.stringify(i),t=i instanceof Error?i.stack:null,s="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:s},l={padding:"2px 4px",backgroundColor:s},u=null;return console.error("Error handled by React Router default ErrorBoundary:",i),u=L.createElement(L.Fragment,null,L.createElement("p",null,"💿 Hey developer 👋"),L.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",L.createElement("code",{style:l},"ErrorBoundary")," or"," ",L.createElement("code",{style:l},"errorElement")," prop on your route.")),L.createElement(L.Fragment,null,L.createElement("h2",null,"Unexpected Application Error!"),L.createElement("h3",{style:{fontStyle:"italic"}},e),t?L.createElement("pre",{style:o},t):null,u)}var VR=L.createElement(HR,null),GR=class extends L.Component{constructor(i){super(i),this.state={location:i.location,revalidation:i.revalidation,error:i.error}}static getDerivedStateFromError(i){return{error:i}}static getDerivedStateFromProps(i,e){return e.location!==i.location||e.revalidation!=="idle"&&i.revalidation==="idle"?{error:i.error,location:i.location,revalidation:i.revalidation}:{error:i.error!==void 0?i.error:e.error,location:e.location,revalidation:i.revalidation||e.revalidation}}componentDidCatch(i,e){this.props.unstable_onError?this.props.unstable_onError(i,e):console.error("React Router caught the following error during render",i)}render(){return this.state.error!==void 0?L.createElement(ir.Provider,{value:this.props.routeContext},L.createElement(Hh.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function WR({routeContext:i,match:e,children:t}){let s=L.useContext(Mo);return s&&s.static&&s.staticContext&&(e.route.errorElement||e.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=e.route.id),L.createElement(ir.Provider,{value:i},t)}function jR(i,e=[],t=null,s=null,o=null){if(i==null){if(!t)return null;if(t.errors)i=t.matches;else if(e.length===0&&!t.initialized&&t.matches.length>0)i=t.matches;else return null}let l=i,u=t==null?void 0:t.errors;if(u!=null){let f=l.findIndex(m=>m.route.id&&(u==null?void 0:u[m.route.id])!==void 0);qt(f>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(u).join(",")}`),l=l.slice(0,Math.min(l.length,f+1))}let d=!1,h=-1;if(t)for(let f=0;f<l.length;f++){let m=l[f];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(h=f),m.route.id){let{loaderData:g,errors:x}=t,S=m.route.loader&&!g.hasOwnProperty(m.route.id)&&(!x||x[m.route.id]===void 0);if(m.route.lazy||S){d=!0,h>=0?l=l.slice(0,h+1):l=[l[0]];break}}}return l.reduceRight((f,m,g)=>{let x,S=!1,M=null,E=null;t&&(x=u&&m.route.id?u[m.route.id]:void 0,M=m.route.errorElement||VR,d&&(h<0&&g===0?(G_("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),S=!0,E=null):h===g&&(S=!0,E=m.route.hydrateFallbackElement||null)));let y=e.concat(l.slice(0,g+1)),_=()=>{let N;return x?N=M:S?N=E:m.route.Component?N=L.createElement(m.route.Component,null):m.route.element?N=m.route.element:N=f,L.createElement(WR,{match:m,routeContext:{outlet:f,matches:y,isDataRoute:t!=null},children:N})};return t&&(m.route.ErrorBoundary||m.route.errorElement||g===0)?L.createElement(GR,{location:t.location,revalidation:t.revalidation,component:M,error:x,children:_(),routeContext:{outlet:null,matches:y,isDataRoute:!0},unstable_onError:s}):_()},null)}function Vh(i){return`${i} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function XR(i){let e=L.useContext(Mo);return qt(e,Vh(i)),e}function $R(i){let e=L.useContext(Bc);return qt(e,Vh(i)),e}function YR(i){let e=L.useContext(ir);return qt(e,Vh(i)),e}function Gh(i){let e=YR(i),t=e.matches[e.matches.length-1];return qt(t.route.id,`${i} can only be used on routes that contain a unique "id"`),t.route.id}function qR(){return Gh("useRouteId")}function KR(){var s;let i=L.useContext(Hh),e=$R("useRouteError"),t=Gh("useRouteError");return i!==void 0?i:(s=e.errors)==null?void 0:s[t]}function ZR(){let{router:i}=XR("useNavigate"),e=Gh("useNavigate"),t=L.useRef(!1);return H_(()=>{t.current=!0}),L.useCallback(async(o,l={})=>{Li(t.current,B_),t.current&&(typeof o=="number"?i.navigate(o):await i.navigate(o,{fromRouteId:e,...l}))},[i,e])}var Xv={};function G_(i,e,t){!e&&!Xv[i]&&(Xv[i]=!0,Li(!1,t))}L.memo(QR);function QR({routes:i,future:e,state:t,unstable_onError:s}){return V_(i,void 0,t,s,e)}function vh(i){qt(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function JR({basename:i="/",children:e=null,location:t,navigationType:s="POP",navigator:o,static:l=!1}){qt(!Ra(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let u=i.replace(/^\/*/,"/"),d=L.useMemo(()=>({basename:u,navigator:o,static:l,future:{}}),[u,o,l]);typeof t=="string"&&(t=Eo(t));let{pathname:h="/",search:f="",hash:m="",state:g=null,key:x="default"}=t,S=L.useMemo(()=>{let M=tr(h,u);return M==null?null:{location:{pathname:M,search:f,hash:m,state:g,key:x},navigationType:s}},[u,h,f,m,g,x,s]);return Li(S!=null,`<Router basename="${u}"> is not able to match the URL "${h}${f}${m}" because it does not start with the basename, so the <Router> won't render anything.`),S==null?null:L.createElement(Ni.Provider,{value:d},L.createElement(Ca.Provider,{children:e,value:S}))}function eP({children:i,location:e}){return BR(_h(i),e)}function _h(i,e=[]){let t=[];return L.Children.forEach(i,(s,o)=>{if(!L.isValidElement(s))return;let l=[...e,o];if(s.type===L.Fragment){t.push.apply(t,_h(s.props.children,l));return}qt(s.type===vh,`[${typeof s.type=="string"?s.type:s.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),qt(!s.props.index||!s.props.children,"An index route cannot have child routes.");let u={id:s.props.id||l.join("-"),caseSensitive:s.props.caseSensitive,element:s.props.element,Component:s.props.Component,index:s.props.index,path:s.props.path,middleware:s.props.middleware,loader:s.props.loader,action:s.props.action,hydrateFallbackElement:s.props.hydrateFallbackElement,HydrateFallback:s.props.HydrateFallback,errorElement:s.props.errorElement,ErrorBoundary:s.props.ErrorBoundary,hasErrorBoundary:s.props.hasErrorBoundary===!0||s.props.ErrorBoundary!=null||s.props.errorElement!=null,shouldRevalidate:s.props.shouldRevalidate,handle:s.props.handle,lazy:s.props.lazy};s.props.children&&(u.children=_h(s.props.children,l)),t.push(u)}),t}var Ec="get",Mc="application/x-www-form-urlencoded";function Hc(i){return i!=null&&typeof i.tagName=="string"}function tP(i){return Hc(i)&&i.tagName.toLowerCase()==="button"}function nP(i){return Hc(i)&&i.tagName.toLowerCase()==="form"}function iP(i){return Hc(i)&&i.tagName.toLowerCase()==="input"}function rP(i){return!!(i.metaKey||i.altKey||i.ctrlKey||i.shiftKey)}function sP(i,e){return i.button===0&&(!e||e==="_self")&&!rP(i)}var pc=null;function oP(){if(pc===null)try{new FormData(document.createElement("form"),0),pc=!1}catch{pc=!0}return pc}var aP=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function gf(i){return i!=null&&!aP.has(i)?(Li(!1,`"${i}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Mc}"`),null):i}function lP(i,e){let t,s,o,l,u;if(nP(i)){let d=i.getAttribute("action");s=d?tr(d,e):null,t=i.getAttribute("method")||Ec,o=gf(i.getAttribute("enctype"))||Mc,l=new FormData(i)}else if(tP(i)||iP(i)&&(i.type==="submit"||i.type==="image")){let d=i.form;if(d==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let h=i.getAttribute("formaction")||d.getAttribute("action");if(s=h?tr(h,e):null,t=i.getAttribute("formmethod")||d.getAttribute("method")||Ec,o=gf(i.getAttribute("formenctype"))||gf(d.getAttribute("enctype"))||Mc,l=new FormData(d,i),!oP()){let{name:f,type:m,value:g}=i;if(m==="image"){let x=f?`${f}.`:"";l.append(`${x}x`,"0"),l.append(`${x}y`,"0")}else f&&l.append(f,g)}}else{if(Hc(i))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');t=Ec,s=null,o=Mc,u=i}return l&&o==="text/plain"&&(u=l,l=void 0),{action:s,method:t.toLowerCase(),encType:o,formData:l,body:u}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Wh(i,e){if(i===!1||i===null||typeof i>"u")throw new Error(e)}function cP(i,e,t){let s=typeof i=="string"?new URL(i,typeof window>"u"?"server://singlefetch/":window.location.origin):i;return s.pathname==="/"?s.pathname=`_root.${t}`:e&&tr(s.pathname,e)==="/"?s.pathname=`${e.replace(/\/$/,"")}/_root.${t}`:s.pathname=`${s.pathname.replace(/\/$/,"")}.${t}`,s}async function uP(i,e){if(i.id in e)return e[i.id];try{let t=await import(i.module);return e[i.id]=t,t}catch(t){return console.error(`Error loading route module \`${i.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function dP(i){return i==null?!1:i.href==null?i.rel==="preload"&&typeof i.imageSrcSet=="string"&&typeof i.imageSizes=="string":typeof i.rel=="string"&&typeof i.href=="string"}async function fP(i,e,t){let s=await Promise.all(i.map(async o=>{let l=e.routes[o.route.id];if(l){let u=await uP(l,t);return u.links?u.links():[]}return[]}));return gP(s.flat(1).filter(dP).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function $v(i,e,t,s,o,l){let u=(h,f)=>t[f]?h.route.id!==t[f].route.id:!0,d=(h,f)=>{var m;return t[f].pathname!==h.pathname||((m=t[f].route.path)==null?void 0:m.endsWith("*"))&&t[f].params["*"]!==h.params["*"]};return l==="assets"?e.filter((h,f)=>u(h,f)||d(h,f)):l==="data"?e.filter((h,f)=>{var g;let m=s.routes[h.route.id];if(!m||!m.hasLoader)return!1;if(u(h,f)||d(h,f))return!0;if(h.route.shouldRevalidate){let x=h.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:((g=t[0])==null?void 0:g.params)||{},nextUrl:new URL(i,window.origin),nextParams:h.params,defaultShouldRevalidate:!0});if(typeof x=="boolean")return x}return!0}):[]}function hP(i,e,{includeHydrateFallback:t}={}){return pP(i.map(s=>{let o=e.routes[s.route.id];if(!o)return[];let l=[o.module];return o.clientActionModule&&(l=l.concat(o.clientActionModule)),o.clientLoaderModule&&(l=l.concat(o.clientLoaderModule)),t&&o.hydrateFallbackModule&&(l=l.concat(o.hydrateFallbackModule)),o.imports&&(l=l.concat(o.imports)),l}).flat(1))}function pP(i){return[...new Set(i)]}function mP(i){let e={},t=Object.keys(i).sort();for(let s of t)e[s]=i[s];return e}function gP(i,e){let t=new Set;return new Set(e),i.reduce((s,o)=>{let l=JSON.stringify(mP(o));return t.has(l)||(t.add(l),s.push({key:l,link:o})),s},[])}function W_(){let i=L.useContext(Mo);return Wh(i,"You must render this element inside a <DataRouterContext.Provider> element"),i}function vP(){let i=L.useContext(Bc);return Wh(i,"You must render this element inside a <DataRouterStateContext.Provider> element"),i}var jh=L.createContext(void 0);jh.displayName="FrameworkContext";function j_(){let i=L.useContext(jh);return Wh(i,"You must render this element inside a <HydratedRouter> element"),i}function _P(i,e){let t=L.useContext(jh),[s,o]=L.useState(!1),[l,u]=L.useState(!1),{onFocus:d,onBlur:h,onMouseEnter:f,onMouseLeave:m,onTouchStart:g}=e,x=L.useRef(null);L.useEffect(()=>{if(i==="render"&&u(!0),i==="viewport"){let E=_=>{_.forEach(N=>{u(N.isIntersecting)})},y=new IntersectionObserver(E,{threshold:.5});return x.current&&y.observe(x.current),()=>{y.disconnect()}}},[i]),L.useEffect(()=>{if(s){let E=setTimeout(()=>{u(!0)},100);return()=>{clearTimeout(E)}}},[s]);let S=()=>{o(!0)},M=()=>{o(!1),u(!1)};return t?i!=="intent"?[l,x,{}]:[l,x,{onFocus:ua(d,S),onBlur:ua(h,M),onMouseEnter:ua(f,S),onMouseLeave:ua(m,M),onTouchStart:ua(g,S)}]:[!1,x,{}]}function ua(i,e){return t=>{i&&i(t),t.defaultPrevented||e(t)}}function xP({page:i,...e}){let{router:t}=W_(),s=L.useMemo(()=>D_(t.routes,i,t.basename),[t.routes,i,t.basename]);return s?L.createElement(SP,{page:i,matches:s,...e}):null}function yP(i){let{manifest:e,routeModules:t}=j_(),[s,o]=L.useState([]);return L.useEffect(()=>{let l=!1;return fP(i,e,t).then(u=>{l||o(u)}),()=>{l=!0}},[i,e,t]),s}function SP({page:i,matches:e,...t}){let s=kr(),{manifest:o,routeModules:l}=j_(),{basename:u}=W_(),{loaderData:d,matches:h}=vP(),f=L.useMemo(()=>$v(i,e,h,o,s,"data"),[i,e,h,o,s]),m=L.useMemo(()=>$v(i,e,h,o,s,"assets"),[i,e,h,o,s]),g=L.useMemo(()=>{if(i===s.pathname+s.search+s.hash)return[];let M=new Set,E=!1;if(e.forEach(_=>{var P;let N=o.routes[_.route.id];!N||!N.hasLoader||(!f.some(b=>b.route.id===_.route.id)&&_.route.id in d&&((P=l[_.route.id])!=null&&P.shouldRevalidate)||N.hasClientLoader?E=!0:M.add(_.route.id))}),M.size===0)return[];let y=cP(i,u,"data");return E&&M.size>0&&y.searchParams.set("_routes",e.filter(_=>M.has(_.route.id)).map(_=>_.route.id).join(",")),[y.pathname+y.search]},[u,d,s,o,f,e,i,l]),x=L.useMemo(()=>hP(m,o),[m,o]),S=yP(m);return L.createElement(L.Fragment,null,g.map(M=>L.createElement("link",{key:M,rel:"prefetch",as:"fetch",href:M,...t})),x.map(M=>L.createElement("link",{key:M,rel:"modulepreload",href:M,...t})),S.map(({key:M,link:E})=>L.createElement("link",{key:M,nonce:t.nonce,...E})))}function EP(...i){return e=>{i.forEach(t=>{typeof t=="function"?t(e):t!=null&&(t.current=e)})}}var X_=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{X_&&(window.__reactRouterVersion="7.9.3")}catch{}function MP({basename:i,children:e,window:t}){let s=L.useRef();s.current==null&&(s.current=uR({window:t,v5Compat:!0}));let o=s.current,[l,u]=L.useState({action:o.action,location:o.location}),d=L.useCallback(h=>{L.startTransition(()=>u(h))},[u]);return L.useLayoutEffect(()=>o.listen(d),[o,d]),L.createElement(JR,{basename:i,children:e,location:l.location,navigationType:l.action,navigator:o})}var $_=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Y_=L.forwardRef(function({onClick:e,discover:t="render",prefetch:s="none",relative:o,reloadDocument:l,replace:u,state:d,target:h,to:f,preventScrollReset:m,viewTransition:g,...x},S){let{basename:M}=L.useContext(Ni),E=typeof f=="string"&&$_.test(f),y,_=!1;if(typeof f=="string"&&E&&(y=f,X_))try{let C=new URL(window.location.href),R=f.startsWith("//")?new URL(C.protocol+f):new URL(f),G=tr(R.pathname,M);R.origin===C.origin&&G!=null?f=G+R.search+R.hash:_=!0}catch{Li(!1,`<Link to="${f}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let N=OR(f,{relative:o}),[P,b,k]=_P(s,x),B=AP(f,{replace:u,state:d,target:h,preventScrollReset:m,relative:o,viewTransition:g});function I(C){e&&e(C),C.defaultPrevented||B(C)}let z=L.createElement("a",{...x,...k,href:y||N,onClick:_||l?e:I,ref:EP(S,b),target:h,"data-discover":!E&&t==="render"?"true":void 0});return P&&!E?L.createElement(L.Fragment,null,z,L.createElement(xP,{page:N})):z});Y_.displayName="Link";var wP=L.forwardRef(function({"aria-current":e="page",caseSensitive:t=!1,className:s="",end:o=!1,style:l,to:u,viewTransition:d,children:h,...f},m){let g=Pa(u,{relative:f.relative}),x=kr(),S=L.useContext(Bc),{navigator:M,basename:E}=L.useContext(Ni),y=S!=null&&NP(g)&&d===!0,_=M.encodeLocation?M.encodeLocation(g).pathname:g.pathname,N=x.pathname,P=S&&S.navigation&&S.navigation.location?S.navigation.location.pathname:null;t||(N=N.toLowerCase(),P=P?P.toLowerCase():null,_=_.toLowerCase()),P&&E&&(P=tr(P,E)||P);const b=_!=="/"&&_.endsWith("/")?_.length-1:_.length;let k=N===_||!o&&N.startsWith(_)&&N.charAt(b)==="/",B=P!=null&&(P===_||!o&&P.startsWith(_)&&P.charAt(_.length)==="/"),I={isActive:k,isPending:B,isTransitioning:y},z=k?e:void 0,C;typeof s=="function"?C=s(I):C=[s,k?"active":null,B?"pending":null,y?"transitioning":null].filter(Boolean).join(" ");let R=typeof l=="function"?l(I):l;return L.createElement(Y_,{...f,"aria-current":z,className:C,ref:m,style:R,to:u,viewTransition:d},typeof h=="function"?h(I):h)});wP.displayName="NavLink";var TP=L.forwardRef(({discover:i="render",fetcherKey:e,navigate:t,reloadDocument:s,replace:o,state:l,method:u=Ec,action:d,onSubmit:h,relative:f,preventScrollReset:m,viewTransition:g,...x},S)=>{let M=PP(),E=LP(d,{relative:f}),y=u.toLowerCase()==="get"?"get":"post",_=typeof d=="string"&&$_.test(d),N=P=>{if(h&&h(P),P.defaultPrevented)return;P.preventDefault();let b=P.nativeEvent.submitter,k=(b==null?void 0:b.getAttribute("formmethod"))||u;M(b||P.currentTarget,{fetcherKey:e,method:k,navigate:t,replace:o,state:l,relative:f,preventScrollReset:m,viewTransition:g})};return L.createElement("form",{ref:S,method:y,action:E,onSubmit:s?h:N,...x,"data-discover":!_&&i==="render"?"true":void 0})});TP.displayName="Form";function bP(i){return`${i} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function q_(i){let e=L.useContext(Mo);return qt(e,bP(i)),e}function AP(i,{target:e,replace:t,state:s,preventScrollReset:o,relative:l,viewTransition:u}={}){let d=kR(),h=kr(),f=Pa(i,{relative:l});return L.useCallback(m=>{if(sP(m,e)){m.preventDefault();let g=t!==void 0?t:Ma(h)===Ma(f);d(i,{replace:g,state:s,preventScrollReset:o,relative:l,viewTransition:u})}},[h,d,f,t,s,e,i,o,l,u])}var CP=0,RP=()=>`__${String(++CP)}__`;function PP(){let{router:i}=q_("useSubmit"),{basename:e}=L.useContext(Ni),t=qR();return L.useCallback(async(s,o={})=>{let{action:l,method:u,encType:d,formData:h,body:f}=lP(s,e);if(o.navigate===!1){let m=o.fetcherKey||RP();await i.fetch(m,t,o.action||l,{preventScrollReset:o.preventScrollReset,formData:h,body:f,formMethod:o.method||u,formEncType:o.encType||d,flushSync:o.flushSync})}else await i.navigate(o.action||l,{preventScrollReset:o.preventScrollReset,formData:h,body:f,formMethod:o.method||u,formEncType:o.encType||d,replace:o.replace,state:o.state,fromRouteId:t,flushSync:o.flushSync,viewTransition:o.viewTransition})},[i,e,t])}function LP(i,{relative:e}={}){let{basename:t}=L.useContext(Ni),s=L.useContext(ir);qt(s,"useFormAction must be used inside a RouteContext");let[o]=s.matches.slice(-1),l={...Pa(i||".",{relative:e})},u=kr();if(i==null){l.search=u.search;let d=new URLSearchParams(l.search),h=d.getAll("index");if(h.some(m=>m==="")){d.delete("index"),h.filter(g=>g).forEach(g=>d.append("index",g));let m=d.toString();l.search=m?`?${m}`:""}}return(!i||i===".")&&o.route.index&&(l.search=l.search?l.search.replace(/^\?/,"?index&"):"?index"),t!=="/"&&(l.pathname=l.pathname==="/"?t:er([t,l.pathname])),Ma(l)}function NP(i,{relative:e}={}){let t=L.useContext(z_);qt(t!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:s}=q_("useViewTransitionState"),o=Pa(i,{relative:e});if(!t.isTransitioning)return!1;let l=tr(t.currentLocation.pathname,s)||t.currentLocation.pathname,u=tr(t.nextLocation.pathname,s)||t.nextLocation.pathname;return Lc(o.pathname,u)!=null||Lc(o.pathname,l)!=null}const Yv={Home:mh};function DP(i){i.endsWith("/")&&(i=i.slice(0,-1));let e=i.split("/").pop();return e.includes("?")&&(e=e.split("?")[0]),Object.keys(Yv).find(s=>s.toLowerCase()===e.toLowerCase())||Object.keys(Yv)[0]}function IP(){const i=kr(),e=DP(i.pathname);return O.jsx(jy,{currentPageName:e,children:O.jsxs(eP,{children:[O.jsx(vh,{path:"/",element:O.jsx(mh,{})}),O.jsx(vh,{path:"/Home",element:O.jsx(mh,{})})]})})}function UP(){return O.jsx(MP,{children:O.jsx(IP,{})})}const FP=20,OP=1e6,Qi={ADD_TOAST:"ADD_TOAST",UPDATE_TOAST:"UPDATE_TOAST",DISMISS_TOAST:"DISMISS_TOAST",REMOVE_TOAST:"REMOVE_TOAST"};let vf=0;function kP(){return vf=(vf+1)%Number.MAX_VALUE,vf.toString()}const _f=new Map,qv=i=>{if(_f.has(i))return;const e=setTimeout(()=>{_f.delete(i),ha({type:Qi.REMOVE_TOAST,toastId:i})},OP);_f.set(i,e)},zP=(i,e)=>{switch(e.type){case Qi.ADD_TOAST:return{...i,toasts:[e.toast,...i.toasts].slice(0,FP)};case Qi.UPDATE_TOAST:return{...i,toasts:i.toasts.map(t=>t.id===e.toast.id?{...t,...e.toast}:t)};case Qi.DISMISS_TOAST:{const{toastId:t}=e;return t?qv(t):i.toasts.forEach(s=>{qv(s.id)}),{...i,toasts:i.toasts.map(s=>s.id===t||t===void 0?{...s,open:!1}:s)}}case Qi.REMOVE_TOAST:return e.toastId===void 0?{...i,toasts:[]}:{...i,toasts:i.toasts.filter(t=>t.id!==e.toastId)}}},wc=[];let Tc={toasts:[]};function ha(i){Tc=zP(Tc,i),wc.forEach(e=>{e(Tc)})}function BP({...i}){const e=kP(),t=o=>ha({type:Qi.UPDATE_TOAST,toast:{...o,id:e}}),s=()=>ha({type:Qi.DISMISS_TOAST,toastId:e});return ha({type:Qi.ADD_TOAST,toast:{...i,id:e,open:!0,onOpenChange:o=>{o||s()}}}),{id:e,dismiss:s,update:t}}function HP(){const[i,e]=L.useState(Tc);return L.useEffect(()=>(wc.push(e),()=>{const t=wc.indexOf(e);t>-1&&wc.splice(t,1)}),[i]),{...i,toast:BP,dismiss:t=>ha({type:Qi.DISMISS_TOAST,toastId:t})}}const K_=L.forwardRef(({...i},e)=>O.jsx("div",{ref:e,className:"fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",...i}));K_.displayName="ToastProvider";const Z_=L.forwardRef(({...i},e)=>O.jsx("div",{ref:e,className:"fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",...i}));Z_.displayName="ToastViewport";const VP=Eh("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",{variants:{variant:{default:"border bg-background text-foreground",destructive:"destructive group border-destructive bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}}),Q_=L.forwardRef(({className:i,variant:e,...t},s)=>O.jsx("div",{ref:s,className:cn(VP({variant:e}),i),...t}));Q_.displayName="Toast";const GP=L.forwardRef(({className:i,...e},t)=>O.jsx("div",{ref:t,className:cn("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",i),...e}));GP.displayName="ToastAction";const J_=L.forwardRef(({className:i,...e},t)=>O.jsx("button",{ref:t,className:cn("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",i),"toast-close":"",...e,children:O.jsx(f0,{className:"h-4 w-4"})}));J_.displayName="ToastClose";const ex=L.forwardRef(({className:i,...e},t)=>O.jsx("div",{ref:t,className:cn("text-sm font-semibold",i),...e}));ex.displayName="ToastTitle";const tx=L.forwardRef(({className:i,...e},t)=>O.jsx("div",{ref:t,className:cn("text-sm opacity-90",i),...e}));tx.displayName="ToastDescription";function WP(){const{toasts:i}=HP();return O.jsxs(K_,{children:[i.map(function({id:e,title:t,description:s,action:o,...l}){return O.jsxs(Q_,{...l,children:[O.jsxs("div",{className:"grid gap-1",children:[t&&O.jsx(ex,{children:t}),s&&O.jsx(tx,{children:s})]}),o,O.jsx(J_,{})]},e)}),O.jsx(Z_,{})]})}function jP(){return O.jsxs(O.Fragment,{children:[O.jsx(UP,{}),O.jsx(WP,{})]})}Wy.createRoot(document.getElementById("root")).render(O.jsx(jP,{}));
