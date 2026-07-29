import{o as Up,R as _a}from"./vendor-core-BEzioQYm.js";/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fp=()=>{};var Pu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eh=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Bp=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],c=n[t++],l=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},th={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,l=s+2<n.length,h=l?n[s+2]:0,f=i>>2,m=(i&3)<<4|c>>4;let w=(c&15)<<2|h>>6,S=h&63;l||(S=64,a||(w=64)),r.push(t[f],t[m],t[w],t[S])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(eh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Bp(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const m=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||m==null)throw new $p;const w=i<<2|c>>4;if(r.push(w),h!==64){const S=c<<4&240|h>>2;if(r.push(S),m!==64){const C=h<<6&192|m;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class $p extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const qp=function(n){const e=eh(n);return th.encodeByteArray(e,!0)},li=function(n){return qp(n).replace(/\./g,"")},nh=function(n){try{return th.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zp=()=>jp().__FIREBASE_DEFAULTS__,Hp=()=>{if(typeof process>"u"||typeof Pu>"u")return;const n=Pu.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Wp=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&nh(n[1]);return e&&JSON.parse(e)},xi=()=>{try{return Fp()||zp()||Hp()||Wp()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},rh=n=>{var e,t;return(t=(e=xi())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},Gp=n=>{const e=rh(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},sh=()=>{var n;return(n=xi())==null?void 0:n.config},ih=n=>{var e;return(e=xi())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kp(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[li(JSON.stringify(t)),li(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ve(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Qp(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ve())}function Yp(){var e;const n=(e=xi())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Jp(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Xp(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Zp(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function em(){const n=Ve();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function tm(){return!Yp()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function nm(){try{return typeof indexedDB=="object"}catch{return!1}}function rm(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sm="FirebaseError";class Tt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=sm,Object.setPrototypeOf(this,Tt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,fs.prototype.create)}}class fs{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?im(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new Tt(s,c,r)}}function im(n,e){return n.replace(om,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const om=/\{\$([^}]+)}/g;function am(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function bn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Su(i)&&Su(a)){if(!bn(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Su(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ps(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Lr(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Mr(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function cm(n,e){const t=new um(n,e);return t.subscribe.bind(t)}class um{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");lm(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Do),s.error===void 0&&(s.error=Do),s.complete===void 0&&(s.complete=Do);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function lm(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Do(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oe(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ln(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ya(n){return(await fetch(n,{credentials:"include"})).ok}class Zt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hm{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new oh;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(fm(e))try{this.getOrInitializeService({instanceIdentifier:Tn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Tn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Tn){return this.instances.has(e)}getOptions(e=Tn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:dm(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Tn){return this.component?this.component.multipleInstances?e:Tn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function dm(n){return n===Tn?void 0:n}function fm(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pm{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new hm(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Y;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Y||(Y={}));const mm={debug:Y.DEBUG,verbose:Y.VERBOSE,info:Y.INFO,warn:Y.WARN,error:Y.ERROR,silent:Y.SILENT},gm=Y.INFO,_m={[Y.DEBUG]:"log",[Y.VERBOSE]:"log",[Y.INFO]:"info",[Y.WARN]:"warn",[Y.ERROR]:"error"},ym=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=_m[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ea{constructor(e){this.name=e,this._logLevel=gm,this._logHandler=ym,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Y))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?mm[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Y.DEBUG,...e),this._logHandler(this,Y.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Y.VERBOSE,...e),this._logHandler(this,Y.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Y.INFO,...e),this._logHandler(this,Y.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Y.WARN,...e),this._logHandler(this,Y.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Y.ERROR,...e),this._logHandler(this,Y.ERROR,...e)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Em{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Tm(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Tm(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Wo="@firebase/app",bu="0.15.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ct=new Ea("@firebase/app"),wm="@firebase/app-compat",Im="@firebase/analytics-compat",vm="@firebase/analytics",Am="@firebase/app-check-compat",Rm="@firebase/app-check",Pm="@firebase/auth",Sm="@firebase/auth-compat",bm="@firebase/database",Cm="@firebase/data-connect",Vm="@firebase/database-compat",Nm="@firebase/functions",km="@firebase/functions-compat",Dm="@firebase/installations",xm="@firebase/installations-compat",Om="@firebase/messaging",Lm="@firebase/messaging-compat",Mm="@firebase/performance",Um="@firebase/performance-compat",Fm="@firebase/remote-config",Bm="@firebase/remote-config-compat",$m="@firebase/storage",qm="@firebase/storage-compat",jm="@firebase/firestore",zm="@firebase/ai",Hm="@firebase/firestore-compat",Wm="firebase",Gm="12.15.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Go="[DEFAULT]",Km={[Wo]:"fire-core",[wm]:"fire-core-compat",[vm]:"fire-analytics",[Im]:"fire-analytics-compat",[Rm]:"fire-app-check",[Am]:"fire-app-check-compat",[Pm]:"fire-auth",[Sm]:"fire-auth-compat",[bm]:"fire-rtdb",[Cm]:"fire-data-connect",[Vm]:"fire-rtdb-compat",[Nm]:"fire-fn",[km]:"fire-fn-compat",[Dm]:"fire-iid",[xm]:"fire-iid-compat",[Om]:"fire-fcm",[Lm]:"fire-fcm-compat",[Mm]:"fire-perf",[Um]:"fire-perf-compat",[Fm]:"fire-rc",[Bm]:"fire-rc-compat",[$m]:"fire-gcs",[qm]:"fire-gcs-compat",[jm]:"fire-fst",[Hm]:"fire-fst-compat",[zm]:"fire-vertex","fire-js":"fire-js",[Wm]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hi=new Map,Qm=new Map,Ko=new Map;function Cu(n,e){try{n.container.addComponent(e)}catch(t){Ct.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Cn(n){const e=n.name;if(Ko.has(e))return Ct.debug(`There were multiple attempts to register component ${e}.`),!1;Ko.set(e,n);for(const t of hi.values())Cu(t,n);for(const t of Qm.values())Cu(t,n);return!0}function Oi(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Be(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ym={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Kt=new fs("app","Firebase",Ym);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jm{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Zt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Kt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mn=Gm;function Xm(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Go,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Kt.create("bad-app-name",{appName:String(s)});if(t||(t=sh()),!t)throw Kt.create("no-options");const i=hi.get(s);if(i){if(bn(t,i.options)&&bn(r,i.config))return i;throw Kt.create("duplicate-app",{appName:s})}const a=new pm(s);for(const l of Ko.values())a.addComponent(l);const c=new Jm(t,r,a);return hi.set(s,c),c}function ah(n=Go){const e=hi.get(n);if(!e&&n===Go&&sh())return Xm();if(!e)throw Kt.create("no-app",{appName:n});return e}function ht(n,e,t){let r=Km[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ct.warn(a.join(" "));return}Cn(new Zt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zm="firebase-heartbeat-database",eg=1,Jr="firebase-heartbeat-store";let xo=null;function ch(){return xo||(xo=Up(Zm,eg,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Jr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Kt.create("idb-open",{originalErrorMessage:n.message})})),xo}async function tg(n){try{const t=(await ch()).transaction(Jr),r=await t.objectStore(Jr).get(uh(n));return await t.done,r}catch(e){if(e instanceof Tt)Ct.warn(e.message);else{const t=Kt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Ct.warn(t.message)}}}async function Vu(n,e){try{const r=(await ch()).transaction(Jr,"readwrite");await r.objectStore(Jr).put(e,uh(n)),await r.done}catch(t){if(t instanceof Tt)Ct.warn(t.message);else{const r=Kt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Ct.warn(r.message)}}}function uh(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ng=1024,rg=30;class sg{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new og(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Nu();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>rg){const a=ag(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Ct.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Nu(),{heartbeatsToSend:r,unsentEntries:s}=ig(this._heartbeatsCache.heartbeats),i=li(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return Ct.warn(t),""}}}function Nu(){return new Date().toISOString().substring(0,10)}function ig(n,e=ng){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),ku(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),ku(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class og{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return nm()?rm().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await tg(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Vu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Vu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function ku(n){return li(JSON.stringify({version:2,heartbeats:n})).length}function ag(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cg(n){Cn(new Zt("platform-logger",e=>new Em(e),"PRIVATE")),Cn(new Zt("heartbeat",e=>new sg(e),"PRIVATE")),ht(Wo,bu,n),ht(Wo,bu,"esm2020"),ht("fire-js","")}cg("");var ug="firebase",lg="12.15.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ht(ug,lg,"app");function lh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const hg=lh,hh=new fs("auth","Firebase",lh());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const di=new Ea("@firebase/auth");function dg(n,...e){di.logLevel<=Y.WARN&&di.warn(`Auth (${Mn}): ${n}`,...e)}function Zs(n,...e){di.logLevel<=Y.ERROR&&di.error(`Auth (${Mn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(n,...e){throw wa(n,...e)}function rt(n,...e){return wa(n,...e)}function Ta(n,e,t){const r={...hg(),[e]:t};return new fs("auth","Firebase",r).create(e,{appName:n.name})}function Pt(n){return Ta(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function fg(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&et(n,"argument-error"),Ta(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function wa(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return hh.create(n,...e)}function q(n,e,...t){if(!n)throw wa(e,...t)}function It(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Zs(e),new Error(e)}function Vt(n,e){n||It(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qo(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function pg(){return Du()==="http:"||Du()==="https:"}function Du(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mg(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(pg()||Xp()||"connection"in navigator)?navigator.onLine:!0}function gg(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{constructor(e,t){this.shortDelay=e,this.longDelay=t,Vt(t>e,"Short delay should be less than long delay!"),this.isMobile=Qp()||Zp()}get(){return mg()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ia(n,e){Vt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;It("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;It("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;It("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _g={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yg=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Eg=new ms(3e4,6e4);function Dt(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function wt(n,e,t,r,s={}){return fh(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=ps({...a,key:n.config.apiKey}).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const h={method:e,headers:l,...i};return Jp()||(h.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&Ln(n.emulatorConfig.host)&&(h.credentials="include"),dh.fetch()(await ph(n,n.config.apiHost,t,c),h)})}async function fh(n,e,t){n._canInitEmulator=!1;const r={..._g,...e};try{const s=new wg(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw zs(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[l,h]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw zs(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw zs(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw zs(n,"user-disabled",a);const f=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Ta(n,f,h);et(n,f)}}catch(s){if(s instanceof Tt)throw s;et(n,"network-request-failed",{message:String(s)})}}async function gs(n,e,t,r,s={}){const i=await wt(n,e,t,r,s);return"mfaPendingCredential"in i&&et(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function ph(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?Ia(n.config,s):`${n.config.apiScheme}://${s}`;return yg.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}function Tg(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class wg{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(rt(this.auth,"network-request-failed")),Eg.get())})}}function zs(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=rt(n,e,r);return s.customData._tokenResponse=t,s}function xu(n){return n!==void 0&&n.enterprise!==void 0}class Ig{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Tg(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function vg(n,e){return wt(n,"GET","/v2/recaptchaConfig",Dt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ag(n,e){return wt(n,"POST","/v1/accounts:delete",e)}async function fi(n,e){return wt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Rg(n,e=!1){const t=oe(n),r=await t.getIdToken(e),s=va(r);q(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:qr(Oo(s.auth_time)),issuedAtTime:qr(Oo(s.iat)),expirationTime:qr(Oo(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Oo(n){return Number(n)*1e3}function va(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Zs("JWT malformed, contained fewer than 3 sections"),null;try{const s=nh(t);return s?JSON.parse(s):(Zs("Failed to decode base64 JWT payload"),null)}catch(s){return Zs("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Ou(n){const e=va(n);return q(e,"internal-error"),q(typeof e.exp<"u","internal-error"),q(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function er(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Tt&&Pg(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Pg({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sg{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yo{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=qr(this.lastLoginAt),this.creationTime=qr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pi(n){var m;const e=n.auth,t=await n.getIdToken(),r=await er(n,fi(e,{idToken:t}));q(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(m=s.providerUserInfo)!=null&&m.length?mh(s.providerUserInfo):[],a=Cg(n.providerData,i),c=n.isAnonymous,l=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),h=c?l:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Yo(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,f)}async function bg(n){const e=oe(n);await pi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Cg(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function mh(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vg(n,e){const t=await fh(n,{},async()=>{const r=ps({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await ph(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:r};return n.emulatorConfig&&Ln(n.emulatorConfig.host)&&(l.credentials="include"),dh.fetch()(a,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Ng(n,e){return wt(n,"POST","/v2/accounts:revokeToken",Dt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){q(e.idToken,"internal-error"),q(typeof e.idToken<"u","internal-error"),q(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ou(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){q(e.length!==0,"internal-error");const t=Ou(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(q(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await Vg(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new Qn;return r&&(q(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(q(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(q(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Qn,this.toJSON())}_performRefresh(){return It("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bt(n,e){q(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class nt{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new Sg(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Yo(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await er(this,this.stsTokenManager.getToken(this.auth,e));return q(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Rg(this,e)}reload(){return bg(this)}_assign(e){this!==e&&(q(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new nt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await pi(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Be(this.auth.app))return Promise.reject(Pt(this.auth));const e=await this.getIdToken();return await er(this,Ag(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,l=t._redirectEventId??void 0,h=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:m,emailVerified:w,isAnonymous:S,providerData:C,stsTokenManager:M}=t;q(m&&M,e,"internal-error");const D=Qn.fromJSON(this.name,M);q(typeof m=="string",e,"internal-error"),Bt(r,e.name),Bt(s,e.name),q(typeof w=="boolean",e,"internal-error"),q(typeof S=="boolean",e,"internal-error"),Bt(i,e.name),Bt(a,e.name),Bt(c,e.name),Bt(l,e.name),Bt(h,e.name),Bt(f,e.name);const j=new nt({uid:m,auth:e,email:s,emailVerified:w,displayName:r,isAnonymous:S,photoURL:a,phoneNumber:i,tenantId:c,stsTokenManager:D,createdAt:h,lastLoginAt:f});return C&&Array.isArray(C)&&(j.providerData=C.map(G=>({...G}))),l&&(j._redirectEventId=l),j}static async _fromIdTokenResponse(e,t,r=!1){const s=new Qn;s.updateFromServerResponse(t);const i=new nt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await pi(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];q(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?mh(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new Qn;c.updateFromIdToken(r);const l=new nt({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Yo(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(l,h),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lu=new Map;function vt(n){Vt(n instanceof Function,"Expected a class definition");let e=Lu.get(n);return e?(Vt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Lu.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}gh.type="NONE";const Mu=gh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ei(n,e,t){return`firebase:${n}:${e}:${t}`}class Yn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=ei(this.userKey,s.apiKey,i),this.fullPersistenceKey=ei("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await fi(this.auth,{idToken:e}).catch(()=>{});return t?nt._fromGetAccountInfoResponse(this.auth,t,e):null}return nt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Yn(vt(Mu),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||vt(Mu);const a=ei(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(a);if(f){let m;if(typeof f=="string"){const w=await fi(e,{idToken:f}).catch(()=>{});if(!w)break;m=await nt._fromGetAccountInfoResponse(e,w,f)}else m=nt._fromJSON(e,f);h!==i&&(c=m),i=h;break}}catch{}const l=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new Yn(i,e,r):(i=l[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new Yn(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uu(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Th(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(_h(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ih(e))return"Blackberry";if(vh(e))return"Webos";if(yh(e))return"Safari";if((e.includes("chrome/")||Eh(e))&&!e.includes("edge/"))return"Chrome";if(wh(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function _h(n=Ve()){return/firefox\//i.test(n)}function yh(n=Ve()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Eh(n=Ve()){return/crios\//i.test(n)}function Th(n=Ve()){return/iemobile/i.test(n)}function wh(n=Ve()){return/android/i.test(n)}function Ih(n=Ve()){return/blackberry/i.test(n)}function vh(n=Ve()){return/webos/i.test(n)}function Aa(n=Ve()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function kg(n=Ve()){var e;return Aa(n)&&!!((e=window.navigator)!=null&&e.standalone)}function Dg(){return em()&&document.documentMode===10}function Ah(n=Ve()){return Aa(n)||wh(n)||vh(n)||Ih(n)||/windows phone/i.test(n)||Th(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rh(n,e=[]){let t;switch(n){case"Browser":t=Uu(Ve());break;case"Worker":t=`${Uu(Ve())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Mn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xg{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,c)=>{try{const l=e(i);a(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Og(n,e={}){return wt(n,"GET","/v2/passwordPolicy",Dt(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lg=6;class Mg{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Lg,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Fu(this),this.idTokenSubscription=new Fu(this),this.beforeStateQueue=new xg(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=hh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=vt(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Yn.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await fi(this,{idToken:e}),r=await nt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(Be(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=r==null?void 0:r._redirectEventId,l=await this.tryRedirectSignIn(e);(!a||a===c)&&(l!=null&&l.user)&&(r=l.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await pi(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=gg()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Be(this.app))return Promise.reject(Pt(this));const t=e?oe(e):null;return t&&q(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&q(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Be(this.app)?Promise.reject(Pt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Be(this.app)?Promise.reject(Pt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(vt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Og(this),t=new Mg(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new fs("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Ng(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&vt(e)||this._popupRedirectResolver;q(t,this,"argument-error"),this.redirectPersistenceManager=await Yn.create(this,[vt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(q(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,s);return()=>{a=!0,l()}}else{const l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Rh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(Be(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&dg(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function hn(n){return oe(n)}class Fu{constructor(e){this.auth=e,this.observer=null,this.addObserver=cm(t=>this.observer=t)}get next(){return q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Li={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Fg(n){Li=n}function Ph(n){return Li.loadJS(n)}function Bg(){return Li.recaptchaEnterpriseScript}function $g(){return Li.gapiScript}function qg(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class jg{constructor(){this.enterprise=new zg}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class zg{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Hg="recaptcha-enterprise",Sh="NO_RECAPTCHA",Bu="onFirebaseAuthREInstanceReady";class $t{constructor(e){this.type=Hg,this.auth=hn(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,c)=>{vg(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new Ig(l);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,a(h.siteKey)}}).catch(l=>{c(l)})})}function s(i,a,c){const l=window.grecaptcha;xu(l)?l.enterprise.ready(()=>{l.enterprise.execute(i,{action:e}).then(h=>{a(h)}).catch(()=>{a(Sh)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new jg().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{r(this.auth).then(async c=>{if(!t&&xu(window.grecaptcha)&&$t.scriptInjectionDeferred)await $t.scriptInjectionDeferred.promise,s(c,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let l=Bg();l.length!==0&&(l+=c+`&onload=${Bu}`),$t.scriptInjectionDeferred=new oh,window[Bu]=()=>{var h;(h=$t.scriptInjectionDeferred)==null||h.resolve()},Ph(l).then(()=>{var h;return(h=$t.scriptInjectionDeferred)==null?void 0:h.promise}).then(()=>{s(c,i,a)}).catch(h=>{a(h)})}}).catch(c=>{a(c)})})}}$t.scriptInjectionDeferred=null;async function $u(n,e,t,r=!1,s=!1){const i=new $t(n);let a;if(s)a=Sh;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const l=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:h,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Jo(n,e,t,r,s){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await $u(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await $u(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wg(n,e){const t=Oi(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(bn(i,e??{}))return s;et(s,"already-initialized")}return t.initialize({options:e})}function Gg(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(vt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Kg(n,e,t){const r=hn(n);q(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=bh(e),{host:a,port:c}=Qg(e),l=c===null?"":`:${c}`,h={url:`${i}//${a}${l}/`},f=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){q(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),q(bn(h,r.config.emulator)&&bn(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Ln(a)?ya(`${i}//${a}${l}`):Yg()}function bh(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Qg(n){const e=bh(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:qu(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:qu(a)}}}function qu(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Yg(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return It("not implemented")}_getIdTokenResponse(e){return It("not implemented")}_linkToIdToken(e,t){return It("not implemented")}_getReauthenticationResolver(e){return It("not implemented")}}async function Jg(n,e){return wt(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xg(n,e){return gs(n,"POST","/v1/accounts:signInWithPassword",Dt(n,e))}async function Zg(n,e){return wt(n,"POST","/v1/accounts:sendOobCode",Dt(n,e))}async function e_(n,e){return Zg(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function t_(n,e){return gs(n,"POST","/v1/accounts:signInWithEmailLink",Dt(n,e))}async function n_(n,e){return gs(n,"POST","/v1/accounts:signInWithEmailLink",Dt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr extends Ra{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Xr(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Xr(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Jo(e,t,"signInWithPassword",Xg);case"emailLink":return t_(e,{email:this._email,oobCode:this._password});default:et(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Jo(e,r,"signUpPassword",Jg);case"emailLink":return n_(e,{idToken:t,email:this._email,oobCode:this._password});default:et(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jn(n,e){return gs(n,"POST","/v1/accounts:signInWithIdp",Dt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r_="http://localhost";class Vn extends Ra{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Vn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):et("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new Vn(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Jn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Jn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Jn(e,t)}buildRequest(){const e={requestUri:r_,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ps(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function s_(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function i_(n){const e=Lr(Mr(n)).link,t=e?Lr(Mr(e)).deep_link_id:null,r=Lr(Mr(n)).deep_link_id;return(r?Lr(Mr(r)).link:null)||r||t||e||n}class Pa{constructor(e){const t=Lr(Mr(e)),r=t.apiKey??null,s=t.oobCode??null,i=s_(t.mode??null);q(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=i_(e);try{return new Pa(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar{constructor(){this.providerId=ar.PROVIDER_ID}static credential(e,t){return Xr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Pa.parseLink(t);return q(r,"argument-error"),Xr._fromEmailAndCode(e,r.code,r.tenantId)}}ar.PROVIDER_ID="password";ar.EMAIL_PASSWORD_SIGN_IN_METHOD="password";ar.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s extends Sa{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt extends _s{constructor(){super("facebook.com")}static credential(e){return Vn._fromParams({providerId:qt.PROVIDER_ID,signInMethod:qt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return qt.credentialFromTaggedObject(e)}static credentialFromError(e){return qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return qt.credential(e.oauthAccessToken)}catch{return null}}}qt.FACEBOOK_SIGN_IN_METHOD="facebook.com";qt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt extends _s{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Vn._fromParams({providerId:jt.PROVIDER_ID,signInMethod:jt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return jt.credentialFromTaggedObject(e)}static credentialFromError(e){return jt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return jt.credential(t,r)}catch{return null}}}jt.GOOGLE_SIGN_IN_METHOD="google.com";jt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt extends _s{constructor(){super("github.com")}static credential(e){return Vn._fromParams({providerId:zt.PROVIDER_ID,signInMethod:zt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return zt.credentialFromTaggedObject(e)}static credentialFromError(e){return zt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return zt.credential(e.oauthAccessToken)}catch{return null}}}zt.GITHUB_SIGN_IN_METHOD="github.com";zt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht extends _s{constructor(){super("twitter.com")}static credential(e,t){return Vn._fromParams({providerId:Ht.PROVIDER_ID,signInMethod:Ht.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ht.credentialFromTaggedObject(e)}static credentialFromError(e){return Ht.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Ht.credential(t,r)}catch{return null}}}Ht.TWITTER_SIGN_IN_METHOD="twitter.com";Ht.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function o_(n,e){return gs(n,"POST","/v1/accounts:signUp",Dt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await nt._fromIdTokenResponse(e,r,s),a=ju(r);return new Nn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=ju(r);return new Nn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function ju(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi extends Tt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,mi.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new mi(e,t,r,s)}}function Ch(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?mi._fromErrorAndOperation(n,i,e,r):i})}async function a_(n,e,t=!1){const r=await er(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Nn._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function c_(n,e,t=!1){const{auth:r}=n;if(Be(r.app))return Promise.reject(Pt(r));const s="reauthenticate";try{const i=await er(n,Ch(r,s,e,n),t);q(i.idToken,r,"internal-error");const a=va(i.idToken);q(a,r,"internal-error");const{sub:c}=a;return q(n.uid===c,r,"user-mismatch"),Nn._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&et(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vh(n,e,t=!1){if(Be(n.app))return Promise.reject(Pt(n));const r="signIn",s=await Ch(n,r,e),i=await Nn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function u_(n,e){return Vh(hn(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nh(n){const e=hn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function bA(n,e,t){if(Be(n.app))return Promise.reject(Pt(n));const r=hn(n),a=await Jo(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",o_).catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&Nh(n),l}),c=await Nn._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(c.user),c}function CA(n,e,t){return Be(n.app)?Promise.reject(Pt(n)):u_(oe(n),ar.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Nh(n),r})}async function VA(n,e){const t=oe(n),s={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()},{email:i}=await e_(t.auth,s);i!==n.email&&await n.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function l_(n,e){return wt(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function NA(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=oe(n),i={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},a=await er(r,l_(r.auth,i));r.displayName=a.displayName||null,r.photoURL=a.photoUrl||null;const c=r.providerData.find(({providerId:l})=>l==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(a)}function h_(n,e,t,r){return oe(n).onIdTokenChanged(e,t,r)}function d_(n,e,t){return oe(n).beforeAuthStateChanged(e,t)}function kA(n,e,t,r){return oe(n).onAuthStateChanged(e,t,r)}const gi="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kh{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(gi,"1"),this.storage.removeItem(gi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f_=1e3,p_=10;class Dh extends kh{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ah(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);Dg()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,p_):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},f_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Dh.type="LOCAL";const m_=Dh;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xh extends kh{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}xh.type="SESSION";const Oh=xh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g_(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Mi(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async h=>h(t.origin,i)),l=await g_(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Mi.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ba(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class __{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,l)=>{const h=ba("",20);s.port1.start();const f=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(m){const w=m;if(w.data.eventId===h)switch(w.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(w.data.response);break;default:clearTimeout(f),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dt(){return window}function y_(n){dt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lh(){return typeof dt().WorkerGlobalScope<"u"&&typeof dt().importScripts=="function"}async function E_(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function T_(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function w_(){return Lh()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mh="firebaseLocalStorageDb",I_=1,_i="firebaseLocalStorage",Uh="fbase_key";class ys{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ui(n,e){return n.transaction([_i],e?"readwrite":"readonly").objectStore(_i)}function v_(){const n=indexedDB.deleteDatabase(Mh);return new ys(n).toPromise()}function Fh(){const n=indexedDB.open(Mh,I_);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(_i,{keyPath:Uh})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(_i)?e(r):(r.close(),await v_(),e(await Fh()))})})}async function zu(n,e,t){const r=Ui(n,!0).put({[Uh]:e,value:t});return new ys(r).toPromise()}async function A_(n,e){const t=Ui(n,!1).get(e),r=await new ys(t).toPromise();return r===void 0?null:r.value}function Hu(n,e){const t=Ui(n,!0).delete(e);return new ys(t).toPromise()}const R_=800,P_=3;class Bh{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=Fh(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>P_)throw r;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return Lh()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Mi._getInstance(w_()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await E_(),!this.activeServiceWorker)return;this.sender=new __(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||T_()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await zu(e,gi,"1"),await Hu(e,gi)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>zu(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>A_(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Hu(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Ui(s,!1).getAll();return new ys(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),R_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Bh.type="LOCAL";const S_=Bh;new ms(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $h(n,e){return e?vt(e):(q(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca extends Ra{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Jn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Jn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Jn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function b_(n){return Vh(n.auth,new Ca(n),n.bypassAuthState)}function C_(n){const{auth:e,user:t}=n;return q(t,e,"internal-error"),c_(t,new Ca(n),n.bypassAuthState)}async function V_(n){const{auth:e,user:t}=n;return q(t,e,"internal-error"),a_(t,new Ca(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qh{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return b_;case"linkViaPopup":case"linkViaRedirect":return V_;case"reauthViaPopup":case"reauthViaRedirect":return C_;default:et(this.auth,"internal-error")}}resolve(e){Vt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Vt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N_=new ms(2e3,1e4);async function DA(n,e,t){if(Be(n.app))return Promise.reject(rt(n,"operation-not-supported-in-this-environment"));const r=hn(n);fg(n,e,Sa);const s=$h(r,t);return new In(r,"signInViaPopup",e,s).executeNotNull()}class In extends qh{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,In.currentPopupAction&&In.currentPopupAction.cancel(),In.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return q(e,this.auth,"internal-error"),e}async onExecution(){Vt(this.filter.length===1,"Popup operations only handle one event");const e=ba();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(rt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(rt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,In.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(rt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,N_.get())};e()}}In.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k_="pendingRedirect",ti=new Map;class D_ extends qh{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=ti.get(this.auth._key());if(!e){try{const r=await x_(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}ti.set(this.auth._key(),e)}return this.bypassAuthState||ti.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function x_(n,e){const t=M_(e),r=L_(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function O_(n,e){ti.set(n._key(),e)}function L_(n){return vt(n._redirectPersistence)}function M_(n){return ei(k_,n.config.apiKey,n.name)}async function U_(n,e,t=!1){if(Be(n.app))return Promise.reject(Pt(n));const r=hn(n),s=$h(r,e),a=await new D_(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F_=600*1e3;class B_{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!$_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!jh(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(rt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=F_&&this.cachedEventUids.clear(),this.cachedEventUids.has(Wu(e))}saveEventToCache(e){this.cachedEventUids.add(Wu(e)),this.lastProcessedEventTime=Date.now()}}function Wu(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function jh({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function $_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return jh(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function q_(n,e={}){return wt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,z_=/^https?/;async function H_(n){if(n.config.emulator)return;const{authorizedDomains:e}=await q_(n);for(const t of e)try{if(W_(t))return}catch{}et(n,"unauthorized-domain")}function W_(n){const e=Qo(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!z_.test(t))return!1;if(j_.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G_=new ms(3e4,6e4);function Gu(){const n=dt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function K_(n){return new Promise((e,t)=>{var s,i,a;function r(){Gu(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Gu(),t(rt(n,"network-request-failed"))},timeout:G_.get()})}if((i=(s=dt().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((a=dt().gapi)!=null&&a.load)r();else{const c=qg("iframefcb");return dt()[c]=()=>{gapi.load?r():t(rt(n,"network-request-failed"))},Ph(`${$g()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw ni=null,e})}let ni=null;function Q_(n){return ni=ni||K_(n),ni}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y_=new ms(5e3,15e3),J_="__/auth/iframe",X_="emulator/auth/iframe",Z_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ey=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function ty(n){const e=n.config;q(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Ia(e,X_):`https://${n.config.authDomain}/${J_}`,r={apiKey:e.apiKey,appName:n.name,v:Mn},s=ey.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${ps(r).slice(1)}`}async function ny(n){const e=await Q_(n),t=dt().gapi;return q(t,n,"internal-error"),e.open({where:document.body,url:ty(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Z_,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=rt(n,"network-request-failed"),c=dt().setTimeout(()=>{i(a)},Y_.get());function l(){dt().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ry={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},sy=500,iy=600,oy="_blank",ay="http://localhost";class Ku{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function cy(n,e,t,r=sy,s=iy){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l={...ry,width:r.toString(),height:s.toString(),top:i,left:a},h=Ve().toLowerCase();t&&(c=Eh(h)?oy:t),_h(h)&&(e=e||ay,l.scrollbars="yes");const f=Object.entries(l).reduce((w,[S,C])=>`${w}${S}=${C},`,"");if(kg(h)&&c!=="_self")return uy(e||"",c),new Ku(null);const m=window.open(e||"",c,f);q(m,n,"popup-blocked");try{m.focus()}catch{}return new Ku(m)}function uy(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ly="__/auth/handler",hy="emulator/auth/handler",dy=encodeURIComponent("fac");async function Qu(n,e,t,r,s,i){q(n.config.authDomain,n,"auth-domain-config-required"),q(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Mn,eventId:s};if(e instanceof Sa){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",am(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))a[f]=m}if(e instanceof _s){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const l=await n._getAppCheckToken(),h=l?`#${dy}=${encodeURIComponent(l)}`:"";return`${fy(n)}?${ps(c).slice(1)}${h}`}function fy({config:n}){return n.emulator?Ia(n,hy):`https://${n.authDomain}/${ly}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lo="webStorageSupport";class py{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Oh,this._completeRedirectFn=U_,this._overrideRedirectResult=O_}async _openPopup(e,t,r,s){var a;Vt((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const i=await Qu(e,t,r,Qo(),s);return cy(e,i,ba())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Qu(e,t,r,Qo(),s);return y_(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Vt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await ny(e),r=new B_(e);return t.register("authEvent",s=>(q(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Lo,{type:Lo},s=>{var a;const i=(a=s==null?void 0:s[0])==null?void 0:a[Lo];i!==void 0&&t(!!i),et(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=H_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Ah()||yh()||Aa()}}const my=py;var Yu="@firebase/auth",Ju="1.13.3";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gy{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _y(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function yy(n){Cn(new Zt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;q(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Rh(n)},h=new Ug(r,s,i,l);return Gg(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Cn(new Zt("auth-internal",e=>{const t=hn(e.getProvider("auth").getImmediate());return(r=>new gy(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ht(Yu,Ju,_y(n)),ht(Yu,Ju,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ey=300,Ty=ih("authIdTokenMaxAge")||Ey;let Xu=null;const wy=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Ty)return;const s=t==null?void 0:t.token;Xu!==s&&(Xu=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function xA(n=ah()){const e=Oi(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Wg(n,{popupRedirectResolver:my,persistence:[S_,m_,Oh]}),r=ih("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=wy(i.toString());d_(t,a,()=>a(t.currentUser)),h_(t,c=>a(c))}}const s=rh("auth");return s&&Kg(t,`http://${s}`),t}function Iy(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}Fg({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=rt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",Iy().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});yy("Browser");var Zu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Qt,zh;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,g){function y(){}y.prototype=g.prototype,I.F=g.prototype,I.prototype=new y,I.prototype.constructor=I,I.D=function(v,T,R){for(var _=Array(arguments.length-2),Me=2;Me<arguments.length;Me++)_[Me-2]=arguments[Me];return g.prototype[T].apply(v,_)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,g,y){y||(y=0);const v=Array(16);if(typeof g=="string")for(var T=0;T<16;++T)v[T]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(T=0;T<16;++T)v[T]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=I.g[0],y=I.g[1],T=I.g[2];let R=I.g[3],_;_=g+(R^y&(T^R))+v[0]+3614090360&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(T^g&(y^T))+v[1]+3905402710&4294967295,R=g+(_<<12&4294967295|_>>>20),_=T+(y^R&(g^y))+v[2]+606105819&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(g^T&(R^g))+v[3]+3250441966&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(R^y&(T^R))+v[4]+4118548399&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(T^g&(y^T))+v[5]+1200080426&4294967295,R=g+(_<<12&4294967295|_>>>20),_=T+(y^R&(g^y))+v[6]+2821735955&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(g^T&(R^g))+v[7]+4249261313&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(R^y&(T^R))+v[8]+1770035416&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(T^g&(y^T))+v[9]+2336552879&4294967295,R=g+(_<<12&4294967295|_>>>20),_=T+(y^R&(g^y))+v[10]+4294925233&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(g^T&(R^g))+v[11]+2304563134&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(R^y&(T^R))+v[12]+1804603682&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(T^g&(y^T))+v[13]+4254626195&4294967295,R=g+(_<<12&4294967295|_>>>20),_=T+(y^R&(g^y))+v[14]+2792965006&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(g^T&(R^g))+v[15]+1236535329&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(T^R&(y^T))+v[1]+4129170786&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(g^y))+v[6]+3225465664&4294967295,R=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(R^g))+v[11]+643717713&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(T^R))+v[0]+3921069994&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(T^R&(y^T))+v[5]+3593408605&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(g^y))+v[10]+38016083&4294967295,R=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(R^g))+v[15]+3634488961&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(T^R))+v[4]+3889429448&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(T^R&(y^T))+v[9]+568446438&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(g^y))+v[14]+3275163606&4294967295,R=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(R^g))+v[3]+4107603335&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(T^R))+v[8]+1163531501&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(T^R&(y^T))+v[13]+2850285829&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(g^y))+v[2]+4243563512&4294967295,R=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(R^g))+v[7]+1735328473&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(T^R))+v[12]+2368359562&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(y^T^R)+v[5]+4294588738&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^T)+v[8]+2272392833&4294967295,R=g+(_<<11&4294967295|_>>>21),_=T+(R^g^y)+v[11]+1839030562&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^g)+v[14]+4259657740&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(y^T^R)+v[1]+2763975236&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^T)+v[4]+1272893353&4294967295,R=g+(_<<11&4294967295|_>>>21),_=T+(R^g^y)+v[7]+4139469664&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^g)+v[10]+3200236656&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(y^T^R)+v[13]+681279174&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^T)+v[0]+3936430074&4294967295,R=g+(_<<11&4294967295|_>>>21),_=T+(R^g^y)+v[3]+3572445317&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^g)+v[6]+76029189&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(y^T^R)+v[9]+3654602809&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^T)+v[12]+3873151461&4294967295,R=g+(_<<11&4294967295|_>>>21),_=T+(R^g^y)+v[15]+530742520&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^g)+v[2]+3299628645&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(T^(y|~R))+v[0]+4096336452&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~T))+v[7]+1126891415&4294967295,R=g+(_<<10&4294967295|_>>>22),_=T+(g^(R|~y))+v[14]+2878612391&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~g))+v[5]+4237533241&4294967295,y=T+(_<<21&4294967295|_>>>11),_=g+(T^(y|~R))+v[12]+1700485571&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~T))+v[3]+2399980690&4294967295,R=g+(_<<10&4294967295|_>>>22),_=T+(g^(R|~y))+v[10]+4293915773&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~g))+v[1]+2240044497&4294967295,y=T+(_<<21&4294967295|_>>>11),_=g+(T^(y|~R))+v[8]+1873313359&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~T))+v[15]+4264355552&4294967295,R=g+(_<<10&4294967295|_>>>22),_=T+(g^(R|~y))+v[6]+2734768916&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~g))+v[13]+1309151649&4294967295,y=T+(_<<21&4294967295|_>>>11),_=g+(T^(y|~R))+v[4]+4149444226&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~T))+v[11]+3174756917&4294967295,R=g+(_<<10&4294967295|_>>>22),_=T+(g^(R|~y))+v[2]+718787259&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~g))+v[9]+3951481745&4294967295,I.g[0]=I.g[0]+g&4294967295,I.g[1]=I.g[1]+(T+(_<<21&4294967295|_>>>11))&4294967295,I.g[2]=I.g[2]+T&4294967295,I.g[3]=I.g[3]+R&4294967295}r.prototype.v=function(I,g){g===void 0&&(g=I.length);const y=g-this.blockSize,v=this.C;let T=this.h,R=0;for(;R<g;){if(T==0)for(;R<=y;)s(this,I,R),R+=this.blockSize;if(typeof I=="string"){for(;R<g;)if(v[T++]=I.charCodeAt(R++),T==this.blockSize){s(this,v),T=0;break}}else for(;R<g;)if(v[T++]=I[R++],T==this.blockSize){s(this,v),T=0;break}}this.h=T,this.o+=g},r.prototype.A=function(){var I=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);I[0]=128;for(var g=1;g<I.length-8;++g)I[g]=0;g=this.o*8;for(var y=I.length-8;y<I.length;++y)I[y]=g&255,g/=256;for(this.v(I),I=Array(16),g=0,y=0;y<4;++y)for(let v=0;v<32;v+=8)I[g++]=this.g[y]>>>v&255;return I};function i(I,g){var y=c;return Object.prototype.hasOwnProperty.call(y,I)?y[I]:y[I]=g(I)}function a(I,g){this.h=g;const y=[];let v=!0;for(let T=I.length-1;T>=0;T--){const R=I[T]|0;v&&R==g||(y[T]=R,v=!1)}this.g=y}var c={};function l(I){return-128<=I&&I<128?i(I,function(g){return new a([g|0],g<0?-1:0)}):new a([I|0],I<0?-1:0)}function h(I){if(isNaN(I)||!isFinite(I))return m;if(I<0)return D(h(-I));const g=[];let y=1;for(let v=0;I>=y;v++)g[v]=I/y|0,y*=4294967296;return new a(g,0)}function f(I,g){if(I.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(I.charAt(0)=="-")return D(f(I.substring(1),g));if(I.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=h(Math.pow(g,8));let v=m;for(let R=0;R<I.length;R+=8){var T=Math.min(8,I.length-R);const _=parseInt(I.substring(R,R+T),g);T<8?(T=h(Math.pow(g,T)),v=v.j(T).add(h(_))):(v=v.j(y),v=v.add(h(_)))}return v}var m=l(0),w=l(1),S=l(16777216);n=a.prototype,n.m=function(){if(M(this))return-D(this).m();let I=0,g=1;for(let y=0;y<this.g.length;y++){const v=this.i(y);I+=(v>=0?v:4294967296+v)*g,g*=4294967296}return I},n.toString=function(I){if(I=I||10,I<2||36<I)throw Error("radix out of range: "+I);if(C(this))return"0";if(M(this))return"-"+D(this).toString(I);const g=h(Math.pow(I,6));var y=this;let v="";for(;;){const T=ee(y,g).g;y=j(y,T.j(g));let R=((y.g.length>0?y.g[0]:y.h)>>>0).toString(I);if(y=T,C(y))return R+v;for(;R.length<6;)R="0"+R;v=R+v}},n.i=function(I){return I<0?0:I<this.g.length?this.g[I]:this.h};function C(I){if(I.h!=0)return!1;for(let g=0;g<I.g.length;g++)if(I.g[g]!=0)return!1;return!0}function M(I){return I.h==-1}n.l=function(I){return I=j(this,I),M(I)?-1:C(I)?0:1};function D(I){const g=I.g.length,y=[];for(let v=0;v<g;v++)y[v]=~I.g[v];return new a(y,~I.h).add(w)}n.abs=function(){return M(this)?D(this):this},n.add=function(I){const g=Math.max(this.g.length,I.g.length),y=[];let v=0;for(let T=0;T<=g;T++){let R=v+(this.i(T)&65535)+(I.i(T)&65535),_=(R>>>16)+(this.i(T)>>>16)+(I.i(T)>>>16);v=_>>>16,R&=65535,_&=65535,y[T]=_<<16|R}return new a(y,y[y.length-1]&-2147483648?-1:0)};function j(I,g){return I.add(D(g))}n.j=function(I){if(C(this)||C(I))return m;if(M(this))return M(I)?D(this).j(D(I)):D(D(this).j(I));if(M(I))return D(this.j(D(I)));if(this.l(S)<0&&I.l(S)<0)return h(this.m()*I.m());const g=this.g.length+I.g.length,y=[];for(var v=0;v<2*g;v++)y[v]=0;for(v=0;v<this.g.length;v++)for(let T=0;T<I.g.length;T++){const R=this.i(v)>>>16,_=this.i(v)&65535,Me=I.i(T)>>>16,pn=I.i(T)&65535;y[2*v+2*T]+=_*pn,G(y,2*v+2*T),y[2*v+2*T+1]+=R*pn,G(y,2*v+2*T+1),y[2*v+2*T+1]+=_*Me,G(y,2*v+2*T+1),y[2*v+2*T+2]+=R*Me,G(y,2*v+2*T+2)}for(I=0;I<g;I++)y[I]=y[2*I+1]<<16|y[2*I];for(I=g;I<2*g;I++)y[I]=0;return new a(y,0)};function G(I,g){for(;(I[g]&65535)!=I[g];)I[g+1]+=I[g]>>>16,I[g]&=65535,g++}function X(I,g){this.g=I,this.h=g}function ee(I,g){if(C(g))throw Error("division by zero");if(C(I))return new X(m,m);if(M(I))return g=ee(D(I),g),new X(D(g.g),D(g.h));if(M(g))return g=ee(I,D(g)),new X(D(g.g),g.h);if(I.g.length>30){if(M(I)||M(g))throw Error("slowDivide_ only works with positive integers.");for(var y=w,v=g;v.l(I)<=0;)y=he(y),v=he(v);var T=de(y,1),R=de(v,1);for(v=de(v,2),y=de(y,2);!C(v);){var _=R.add(v);_.l(I)<=0&&(T=T.add(y),R=_),v=de(v,1),y=de(y,1)}return g=j(I,T.j(g)),new X(T,g)}for(T=m;I.l(g)>=0;){for(y=Math.max(1,Math.floor(I.m()/g.m())),v=Math.ceil(Math.log(y)/Math.LN2),v=v<=48?1:Math.pow(2,v-48),R=h(y),_=R.j(g);M(_)||_.l(I)>0;)y-=v,R=h(y),_=R.j(g);C(R)&&(R=w),T=T.add(R),I=j(I,_)}return new X(T,I)}n.B=function(I){return ee(this,I).h},n.and=function(I){const g=Math.max(this.g.length,I.g.length),y=[];for(let v=0;v<g;v++)y[v]=this.i(v)&I.i(v);return new a(y,this.h&I.h)},n.or=function(I){const g=Math.max(this.g.length,I.g.length),y=[];for(let v=0;v<g;v++)y[v]=this.i(v)|I.i(v);return new a(y,this.h|I.h)},n.xor=function(I){const g=Math.max(this.g.length,I.g.length),y=[];for(let v=0;v<g;v++)y[v]=this.i(v)^I.i(v);return new a(y,this.h^I.h)};function he(I){const g=I.g.length+1,y=[];for(let v=0;v<g;v++)y[v]=I.i(v)<<1|I.i(v-1)>>>31;return new a(y,I.h)}function de(I,g){const y=g>>5;g%=32;const v=I.g.length-y,T=[];for(let R=0;R<v;R++)T[R]=g>0?I.i(R+y)>>>g|I.i(R+y+1)<<32-g:I.i(R+y);return new a(T,I.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,zh=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Qt=a}).apply(typeof Zu<"u"?Zu:typeof self<"u"?self:typeof window<"u"?window:{});var Hs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Hh,Ur,Wh,ri,Xo,Gh,Kh,Qh;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Hs=="object"&&Hs];for(var u=0;u<o.length;++u){var d=o[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(o,u){if(u)e:{var d=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var A=o[p];if(!(A in d))break e;d=d[A]}o=o[o.length-1],p=d[o],u=u(p),u!=p&&u!=null&&e(d,o,{configurable:!0,writable:!0,value:u})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(u){var d=[],p;for(p in u)Object.prototype.hasOwnProperty.call(u,p)&&d.push([p,u[p]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function c(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function l(o,u,d){return o.call.apply(o.bind,arguments)}function h(o,u,d){return h=l,h.apply(null,arguments)}function f(o,u){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function m(o,u){function d(){}d.prototype=u.prototype,o.Z=u.prototype,o.prototype=new d,o.prototype.constructor=o,o.Ob=function(p,A,P){for(var x=Array(arguments.length-2),W=2;W<arguments.length;W++)x[W-2]=arguments[W];return u.prototype[A].apply(p,x)}}var w=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function S(o){const u=o.length;if(u>0){const d=Array(u);for(let p=0;p<u;p++)d[p]=o[p];return d}return[]}function C(o,u){for(let p=1;p<arguments.length;p++){const A=arguments[p];var d=typeof A;if(d=d!="object"?d:A?Array.isArray(A)?"array":d:"null",d=="array"||d=="object"&&typeof A.length=="number"){d=o.length||0;const P=A.length||0;o.length=d+P;for(let x=0;x<P;x++)o[d+x]=A[x]}else o.push(A)}}class M{constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return this.h>0?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function D(o){a.setTimeout(()=>{throw o},0)}function j(){var o=I;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class G{constructor(){this.h=this.g=null}add(u,d){const p=X.get();p.set(u,d),this.h?this.h.next=p:this.g=p,this.h=p}}var X=new M(()=>new ee,o=>o.reset());class ee{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let he,de=!1,I=new G,g=()=>{const o=Promise.resolve(void 0);he=()=>{o.then(y)}};function y(){for(var o;o=j();){try{o.h.call(o.g)}catch(d){D(d)}var u=X;u.j(o),u.h<100&&(u.h++,o.next=u.g,u.g=o)}de=!1}function v(){this.u=this.u,this.C=this.C}v.prototype.u=!1,v.prototype.dispose=function(){this.u||(this.u=!0,this.N())},v.prototype[Symbol.dispose]=function(){this.dispose()},v.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var R=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};a.addEventListener("test",d,u),a.removeEventListener("test",d,u)}catch{}return o})();function _(o){return/^[\s\xa0]*$/.test(o)}function Me(o,u){T.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,u)}m(Me,T),Me.prototype.init=function(o,u){const d=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget,u||(d=="mouseover"?u=o.fromElement:d=="mouseout"&&(u=o.toElement)),this.relatedTarget=u,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&Me.Z.h.call(this)},Me.prototype.h=function(){Me.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var pn="closure_listenable_"+(Math.random()*1e6|0),op=0;function ap(o,u,d,p,A){this.listener=o,this.proxy=null,this.src=u,this.type=d,this.capture=!!p,this.ha=A,this.key=++op,this.da=this.fa=!1}function Cs(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Vs(o,u,d){for(const p in o)u.call(d,o[p],p,o)}function cp(o,u){for(const d in o)u.call(void 0,o[d],d,o)}function Rc(o){const u={};for(const d in o)u[d]=o[d];return u}const Pc="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Sc(o,u){let d,p;for(let A=1;A<arguments.length;A++){p=arguments[A];for(d in p)o[d]=p[d];for(let P=0;P<Pc.length;P++)d=Pc[P],Object.prototype.hasOwnProperty.call(p,d)&&(o[d]=p[d])}}function Ns(o){this.src=o,this.g={},this.h=0}Ns.prototype.add=function(o,u,d,p,A){const P=o.toString();o=this.g[P],o||(o=this.g[P]=[],this.h++);const x=uo(o,u,p,A);return x>-1?(u=o[x],d||(u.fa=!1)):(u=new ap(u,this.src,P,!!p,A),u.fa=d,o.push(u)),u};function co(o,u){const d=u.type;if(d in o.g){var p=o.g[d],A=Array.prototype.indexOf.call(p,u,void 0),P;(P=A>=0)&&Array.prototype.splice.call(p,A,1),P&&(Cs(u),o.g[d].length==0&&(delete o.g[d],o.h--))}}function uo(o,u,d,p){for(let A=0;A<o.length;++A){const P=o[A];if(!P.da&&P.listener==u&&P.capture==!!d&&P.ha==p)return A}return-1}var lo="closure_lm_"+(Math.random()*1e6|0),ho={};function bc(o,u,d,p,A){if(Array.isArray(u)){for(let P=0;P<u.length;P++)bc(o,u[P],d,p,A);return null}return d=Nc(d),o&&o[pn]?o.J(u,d,c(p)?!!p.capture:!1,A):up(o,u,d,!1,p,A)}function up(o,u,d,p,A,P){if(!u)throw Error("Invalid event type");const x=c(A)?!!A.capture:!!A;let W=po(o);if(W||(o[lo]=W=new Ns(o)),d=W.add(u,d,p,x,P),d.proxy)return d;if(p=lp(),d.proxy=p,p.src=o,p.listener=d,o.addEventListener)R||(A=x),A===void 0&&(A=!1),o.addEventListener(u.toString(),p,A);else if(o.attachEvent)o.attachEvent(Vc(u.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function lp(){function o(d){return u.call(o.src,o.listener,d)}const u=hp;return o}function Cc(o,u,d,p,A){if(Array.isArray(u))for(var P=0;P<u.length;P++)Cc(o,u[P],d,p,A);else p=c(p)?!!p.capture:!!p,d=Nc(d),o&&o[pn]?(o=o.i,P=String(u).toString(),P in o.g&&(u=o.g[P],d=uo(u,d,p,A),d>-1&&(Cs(u[d]),Array.prototype.splice.call(u,d,1),u.length==0&&(delete o.g[P],o.h--)))):o&&(o=po(o))&&(u=o.g[u.toString()],o=-1,u&&(o=uo(u,d,p,A)),(d=o>-1?u[o]:null)&&fo(d))}function fo(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[pn])co(u.i,o);else{var d=o.type,p=o.proxy;u.removeEventListener?u.removeEventListener(d,p,o.capture):u.detachEvent?u.detachEvent(Vc(d),p):u.addListener&&u.removeListener&&u.removeListener(p),(d=po(u))?(co(d,o),d.h==0&&(d.src=null,u[lo]=null)):Cs(o)}}}function Vc(o){return o in ho?ho[o]:ho[o]="on"+o}function hp(o,u){if(o.da)o=!0;else{u=new Me(u,this);const d=o.listener,p=o.ha||o.src;o.fa&&fo(o),o=d.call(p,u)}return o}function po(o){return o=o[lo],o instanceof Ns?o:null}var mo="__closure_events_fn_"+(Math.random()*1e9>>>0);function Nc(o){return typeof o=="function"?o:(o[mo]||(o[mo]=function(u){return o.handleEvent(u)}),o[mo])}function Se(){v.call(this),this.i=new Ns(this),this.M=this,this.G=null}m(Se,v),Se.prototype[pn]=!0,Se.prototype.removeEventListener=function(o,u,d,p){Cc(this,o,u,d,p)};function ke(o,u){var d,p=o.G;if(p)for(d=[];p;p=p.G)d.push(p);if(o=o.M,p=u.type||u,typeof u=="string")u=new T(u,o);else if(u instanceof T)u.target=u.target||o;else{var A=u;u=new T(p,o),Sc(u,A)}A=!0;let P,x;if(d)for(x=d.length-1;x>=0;x--)P=u.g=d[x],A=ks(P,p,!0,u)&&A;if(P=u.g=o,A=ks(P,p,!0,u)&&A,A=ks(P,p,!1,u)&&A,d)for(x=0;x<d.length;x++)P=u.g=d[x],A=ks(P,p,!1,u)&&A}Se.prototype.N=function(){if(Se.Z.N.call(this),this.i){var o=this.i;for(const u in o.g){const d=o.g[u];for(let p=0;p<d.length;p++)Cs(d[p]);delete o.g[u],o.h--}}this.G=null},Se.prototype.J=function(o,u,d,p){return this.i.add(String(o),u,!1,d,p)},Se.prototype.K=function(o,u,d,p){return this.i.add(String(o),u,!0,d,p)};function ks(o,u,d,p){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();let A=!0;for(let P=0;P<u.length;++P){const x=u[P];if(x&&!x.da&&x.capture==d){const W=x.listener,Ee=x.ha||x.src;x.fa&&co(o.i,x),A=W.call(Ee,p)!==!1&&A}}return A&&!p.defaultPrevented}function dp(o,u){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=h(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(u)>2147483647?-1:a.setTimeout(o,u||0)}function kc(o){o.g=dp(()=>{o.g=null,o.i&&(o.i=!1,kc(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class fp extends v{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:kc(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function _r(o){v.call(this),this.h=o,this.g={}}m(_r,v);var Dc=[];function xc(o){Vs(o.g,function(u,d){this.g.hasOwnProperty(d)&&fo(u)},o),o.g={}}_r.prototype.N=function(){_r.Z.N.call(this),xc(this)},_r.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var go=a.JSON.stringify,pp=a.JSON.parse,mp=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function Oc(){}function Lc(){}var yr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function _o(){T.call(this,"d")}m(_o,T);function yo(){T.call(this,"c")}m(yo,T);var mn={},Mc=null;function Ds(){return Mc=Mc||new Se}mn.Ia="serverreachability";function Uc(o){T.call(this,mn.Ia,o)}m(Uc,T);function Er(o){const u=Ds();ke(u,new Uc(u))}mn.STAT_EVENT="statevent";function Fc(o,u){T.call(this,mn.STAT_EVENT,o),this.stat=u}m(Fc,T);function De(o){const u=Ds();ke(u,new Fc(u,o))}mn.Ja="timingevent";function Bc(o,u){T.call(this,mn.Ja,o),this.size=u}m(Bc,T);function Tr(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},u)}function wr(){this.g=!0}wr.prototype.ua=function(){this.g=!1};function gp(o,u,d,p,A,P){o.info(function(){if(o.g)if(P){var x="",W=P.split("&");for(let te=0;te<W.length;te++){var Ee=W[te].split("=");if(Ee.length>1){const Ie=Ee[0];Ee=Ee[1];const ot=Ie.split("_");x=ot.length>=2&&ot[1]=="type"?x+(Ie+"="+Ee+"&"):x+(Ie+"=redacted&")}}}else x=null;else x=P;return"XMLHTTP REQ ("+p+") [attempt "+A+"]: "+u+`
`+d+`
`+x})}function _p(o,u,d,p,A,P,x){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+A+"]: "+u+`
`+d+`
`+P+" "+x})}function qn(o,u,d,p){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+Ep(o,d)+(p?" "+p:"")})}function yp(o,u){o.info(function(){return"TIMEOUT: "+u})}wr.prototype.info=function(){};function Ep(o,u){if(!o.g)return u;if(!u)return null;try{const P=JSON.parse(u);if(P){for(o=0;o<P.length;o++)if(Array.isArray(P[o])){var d=P[o];if(!(d.length<2)){var p=d[1];if(Array.isArray(p)&&!(p.length<1)){var A=p[0];if(A!="noop"&&A!="stop"&&A!="close")for(let x=1;x<p.length;x++)p[x]=""}}}}return go(P)}catch{return u}}var xs={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},$c={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},qc;function Eo(){}m(Eo,Oc),Eo.prototype.g=function(){return new XMLHttpRequest},qc=new Eo;function Ir(o){return encodeURIComponent(String(o))}function Tp(o){var u=1;o=o.split(":");const d=[];for(;u>0&&o.length;)d.push(o.shift()),u--;return o.length&&d.push(o.join(":")),d}function xt(o,u,d,p){this.j=o,this.i=u,this.l=d,this.S=p||1,this.V=new _r(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new jc}function jc(){this.i=null,this.g="",this.h=!1}var zc={},To={};function wo(o,u,d){o.M=1,o.A=Ls(it(u)),o.u=d,o.R=!0,Hc(o,null)}function Hc(o,u){o.F=Date.now(),Os(o),o.B=it(o.A);var d=o.B,p=o.S;Array.isArray(p)||(p=[String(p)]),su(d.i,"t",p),o.C=0,d=o.j.L,o.h=new jc,o.g=Iu(o.j,d?u:null,!o.u),o.P>0&&(o.O=new fp(h(o.Y,o,o.g),o.P)),u=o.V,d=o.g,p=o.ba;var A="readystatechange";Array.isArray(A)||(A&&(Dc[0]=A.toString()),A=Dc);for(let P=0;P<A.length;P++){const x=bc(d,A[P],p||u.handleEvent,!1,u.h||u);if(!x)break;u.g[x.key]=x}u=o.J?Rc(o.J):{},o.u?(o.v||(o.v="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,u)):(o.v="GET",o.g.ea(o.B,o.v,null,u)),Er(),gp(o.i,o.v,o.B,o.l,o.S,o.u)}xt.prototype.ba=function(o){o=o.target;const u=this.O;u&&Mt(o)==3?u.j():this.Y(o)},xt.prototype.Y=function(o){try{if(o==this.g)e:{const W=Mt(this.g),Ee=this.g.ya(),te=this.g.ca();if(!(W<3)&&(W!=3||this.g&&(this.h.h||this.g.la()||hu(this.g)))){this.K||W!=4||Ee==7||(Ee==8||te<=0?Er(3):Er(2)),Io(this);var u=this.g.ca();this.X=u;var d=wp(this);if(this.o=u==200,_p(this.i,this.v,this.B,this.l,this.S,W,u),this.o){if(this.U&&!this.L){t:{if(this.g){var p,A=this.g;if((p=A.g?A.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(p)){var P=p;break t}}P=null}if(o=P)qn(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,vo(this,o);else{this.o=!1,this.m=3,De(12),gn(this),vr(this);break e}}if(this.R){o=!0;let Ie;for(;!this.K&&this.C<d.length;)if(Ie=Ip(this,d),Ie==To){W==4&&(this.m=4,De(14),o=!1),qn(this.i,this.l,null,"[Incomplete Response]");break}else if(Ie==zc){this.m=4,De(15),qn(this.i,this.l,d,"[Invalid Chunk]"),o=!1;break}else qn(this.i,this.l,Ie,null),vo(this,Ie);if(Wc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),W!=4||d.length!=0||this.h.h||(this.m=1,De(16),o=!1),this.o=this.o&&o,!o)qn(this.i,this.l,d,"[Invalid Chunked Response]"),gn(this),vr(this);else if(d.length>0&&!this.W){this.W=!0;var x=this.j;x.g==this&&x.aa&&!x.P&&(x.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),No(x),x.P=!0,De(11))}}else qn(this.i,this.l,d,null),vo(this,d);W==4&&gn(this),this.o&&!this.K&&(W==4?yu(this.j,this):(this.o=!1,Os(this)))}else Lp(this.g),u==400&&d.indexOf("Unknown SID")>0?(this.m=3,De(12)):(this.m=0,De(13)),gn(this),vr(this)}}}catch{}finally{}};function wp(o){if(!Wc(o))return o.g.la();const u=hu(o.g);if(u==="")return"";let d="";const p=u.length,A=Mt(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return gn(o),vr(o),"";o.h.i=new a.TextDecoder}for(let P=0;P<p;P++)o.h.h=!0,d+=o.h.i.decode(u[P],{stream:!(A&&P==p-1)});return u.length=0,o.h.g+=d,o.C=0,o.h.g}function Wc(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function Ip(o,u){var d=o.C,p=u.indexOf(`
`,d);return p==-1?To:(d=Number(u.substring(d,p)),isNaN(d)?zc:(p+=1,p+d>u.length?To:(u=u.slice(p,p+d),o.C=p+d,u)))}xt.prototype.cancel=function(){this.K=!0,gn(this)};function Os(o){o.T=Date.now()+o.H,Gc(o,o.H)}function Gc(o,u){if(o.D!=null)throw Error("WatchDog timer not null");o.D=Tr(h(o.aa,o),u)}function Io(o){o.D&&(a.clearTimeout(o.D),o.D=null)}xt.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(yp(this.i,this.B),this.M!=2&&(Er(),De(17)),gn(this),this.m=2,vr(this)):Gc(this,this.T-o)};function vr(o){o.j.I==0||o.K||yu(o.j,o)}function gn(o){Io(o);var u=o.O;u&&typeof u.dispose=="function"&&u.dispose(),o.O=null,xc(o.V),o.g&&(u=o.g,o.g=null,u.abort(),u.dispose())}function vo(o,u){try{var d=o.j;if(d.I!=0&&(d.g==o||Ao(d.h,o))){if(!o.L&&Ao(d.h,o)&&d.I==3){try{var p=d.Ba.g.parse(u)}catch{p=null}if(Array.isArray(p)&&p.length==3){var A=p;if(A[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<o.F)$s(d),Fs(d);else break e;Vo(d),De(18)}}else d.xa=A[1],0<d.xa-d.K&&A[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=Tr(h(d.Va,d),6e3));Yc(d.h)<=1&&d.ta&&(d.ta=void 0)}else yn(d,11)}else if((o.L||d.g==o)&&$s(d),!_(u))for(A=d.Ba.g.parse(u),u=0;u<A.length;u++){let te=A[u];const Ie=te[0];if(!(Ie<=d.K))if(d.K=Ie,te=te[1],d.I==2)if(te[0]=="c"){d.M=te[1],d.ba=te[2];const ot=te[3];ot!=null&&(d.ka=ot,d.j.info("VER="+d.ka));const En=te[4];En!=null&&(d.za=En,d.j.info("SVER="+d.za));const Ut=te[5];Ut!=null&&typeof Ut=="number"&&Ut>0&&(p=1.5*Ut,d.O=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const Ft=o.g;if(Ft){const js=Ft.g?Ft.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(js){var P=p.h;P.g||js.indexOf("spdy")==-1&&js.indexOf("quic")==-1&&js.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(Ro(P,P.h),P.h=null))}if(p.G){const ko=Ft.g?Ft.g.getResponseHeader("X-HTTP-Session-Id"):null;ko&&(p.wa=ko,ne(p.J,p.G,ko))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-o.F,d.j.info("Handshake RTT: "+d.T+"ms")),p=d;var x=o;if(p.na=wu(p,p.L?p.ba:null,p.W),x.L){Jc(p.h,x);var W=x,Ee=p.O;Ee&&(W.H=Ee),W.D&&(Io(W),Os(W)),p.g=x}else gu(p);d.i.length>0&&Bs(d)}else te[0]!="stop"&&te[0]!="close"||yn(d,7);else d.I==3&&(te[0]=="stop"||te[0]=="close"?te[0]=="stop"?yn(d,7):Co(d):te[0]!="noop"&&d.l&&d.l.qa(te),d.A=0)}}Er(4)}catch{}}var vp=class{constructor(o,u){this.g=o,this.map=u}};function Kc(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Qc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Yc(o){return o.h?1:o.g?o.g.size:0}function Ao(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function Ro(o,u){o.g?o.g.add(u):o.h=u}function Jc(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}Kc.prototype.cancel=function(){if(this.i=Xc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Xc(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const d of o.g.values())u=u.concat(d.G);return u}return S(o.i)}var Zc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Ap(o,u){if(o){o=o.split("&");for(let d=0;d<o.length;d++){const p=o[d].indexOf("=");let A,P=null;p>=0?(A=o[d].substring(0,p),P=o[d].substring(p+1)):A=o[d],u(A,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function Ot(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let u;o instanceof Ot?(this.l=o.l,Ar(this,o.j),this.o=o.o,this.g=o.g,Rr(this,o.u),this.h=o.h,Po(this,iu(o.i)),this.m=o.m):o&&(u=String(o).match(Zc))?(this.l=!1,Ar(this,u[1]||"",!0),this.o=Pr(u[2]||""),this.g=Pr(u[3]||"",!0),Rr(this,u[4]),this.h=Pr(u[5]||"",!0),Po(this,u[6]||"",!0),this.m=Pr(u[7]||"")):(this.l=!1,this.i=new br(null,this.l))}Ot.prototype.toString=function(){const o=[];var u=this.j;u&&o.push(Sr(u,eu,!0),":");var d=this.g;return(d||u=="file")&&(o.push("//"),(u=this.o)&&o.push(Sr(u,eu,!0),"@"),o.push(Ir(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&o.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(Sr(d,d.charAt(0)=="/"?Sp:Pp,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",Sr(d,Cp)),o.join("")},Ot.prototype.resolve=function(o){const u=it(this);let d=!!o.j;d?Ar(u,o.j):d=!!o.o,d?u.o=o.o:d=!!o.g,d?u.g=o.g:d=o.u!=null;var p=o.h;if(d)Rr(u,o.u);else if(d=!!o.h){if(p.charAt(0)!="/")if(this.g&&!this.h)p="/"+p;else{var A=u.h.lastIndexOf("/");A!=-1&&(p=u.h.slice(0,A+1)+p)}if(A=p,A==".."||A==".")p="";else if(A.indexOf("./")!=-1||A.indexOf("/.")!=-1){p=A.lastIndexOf("/",0)==0,A=A.split("/");const P=[];for(let x=0;x<A.length;){const W=A[x++];W=="."?p&&x==A.length&&P.push(""):W==".."?((P.length>1||P.length==1&&P[0]!="")&&P.pop(),p&&x==A.length&&P.push("")):(P.push(W),p=!0)}p=P.join("/")}else p=A}return d?u.h=p:d=o.i.toString()!=="",d?Po(u,iu(o.i)):d=!!o.m,d&&(u.m=o.m),u};function it(o){return new Ot(o)}function Ar(o,u,d){o.j=d?Pr(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function Rr(o,u){if(u){if(u=Number(u),isNaN(u)||u<0)throw Error("Bad port number "+u);o.u=u}else o.u=null}function Po(o,u,d){u instanceof br?(o.i=u,Vp(o.i,o.l)):(d||(u=Sr(u,bp)),o.i=new br(u,o.l))}function ne(o,u,d){o.i.set(u,d)}function Ls(o){return ne(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function Pr(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Sr(o,u,d){return typeof o=="string"?(o=encodeURI(o).replace(u,Rp),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Rp(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var eu=/[#\/\?@]/g,Pp=/[#\?:]/g,Sp=/[#\?]/g,bp=/[#\?@]/g,Cp=/#/g;function br(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function _n(o){o.g||(o.g=new Map,o.h=0,o.i&&Ap(o.i,function(u,d){o.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}n=br.prototype,n.add=function(o,u){_n(this),this.i=null,o=jn(this,o);let d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(u),this.h+=1,this};function tu(o,u){_n(o),u=jn(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function nu(o,u){return _n(o),u=jn(o,u),o.g.has(u)}n.forEach=function(o,u){_n(this),this.g.forEach(function(d,p){d.forEach(function(A){o.call(u,A,p,this)},this)},this)};function ru(o,u){_n(o);let d=[];if(typeof u=="string")nu(o,u)&&(d=d.concat(o.g.get(jn(o,u))));else for(o=Array.from(o.g.values()),u=0;u<o.length;u++)d=d.concat(o[u]);return d}n.set=function(o,u){return _n(this),this.i=null,o=jn(this,o),nu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=ru(this,o),o.length>0?String(o[0]):u):u};function su(o,u,d){tu(o,u),d.length>0&&(o.i=null,o.g.set(jn(o,u),S(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(let p=0;p<u.length;p++){var d=u[p];const A=Ir(d);d=ru(this,d);for(let P=0;P<d.length;P++){let x=A;d[P]!==""&&(x+="="+Ir(d[P])),o.push(x)}}return this.i=o.join("&")};function iu(o){const u=new br;return u.i=o.i,o.g&&(u.g=new Map(o.g),u.h=o.h),u}function jn(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function Vp(o,u){u&&!o.j&&(_n(o),o.i=null,o.g.forEach(function(d,p){const A=p.toLowerCase();p!=A&&(tu(this,p),su(this,A,d))},o)),o.j=u}function Np(o,u){const d=new wr;if(a.Image){const p=new Image;p.onload=f(Lt,d,"TestLoadImage: loaded",!0,u,p),p.onerror=f(Lt,d,"TestLoadImage: error",!1,u,p),p.onabort=f(Lt,d,"TestLoadImage: abort",!1,u,p),p.ontimeout=f(Lt,d,"TestLoadImage: timeout",!1,u,p),a.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else u(!1)}function kp(o,u){const d=new wr,p=new AbortController,A=setTimeout(()=>{p.abort(),Lt(d,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:p.signal}).then(P=>{clearTimeout(A),P.ok?Lt(d,"TestPingServer: ok",!0,u):Lt(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(A),Lt(d,"TestPingServer: error",!1,u)})}function Lt(o,u,d,p,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),p(d)}catch{}}function Dp(){this.g=new mp}function So(o){this.i=o.Sb||null,this.h=o.ab||!1}m(So,Oc),So.prototype.g=function(){return new Ms(this.i,this.h)};function Ms(o,u){Se.call(this),this.H=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}m(Ms,Se),n=Ms.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=u,this.readyState=1,Vr(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const u={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(u.body=o),(this.H||a).fetch(new Request(this.D,u)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Cr(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Vr(this)),this.g&&(this.readyState=3,Vr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;ou(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function ou(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.B.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?Cr(this):Vr(this),this.readyState==3&&ou(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,Cr(this))},n.Na=function(o){this.g&&(this.response=o,Cr(this))},n.ga=function(){this.g&&Cr(this)};function Cr(o){o.readyState=4,o.l=null,o.j=null,o.B=null,Vr(o)}n.setRequestHeader=function(o,u){this.A.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=u.next();return o.join(`\r
`)};function Vr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Ms.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function au(o){let u="";return Vs(o,function(d,p){u+=p,u+=":",u+=d,u+=`\r
`}),u}function bo(o,u,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=au(d),typeof o=="string"?d!=null&&Ir(d):ne(o,u,d))}function ae(o){Se.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}m(ae,Se);var xp=/^https?$/i,Op=["POST","PUT"];n=ae.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,u,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():qc.g(),this.g.onreadystatechange=w(h(this.Ca,this));try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(P){cu(this,P);return}if(o=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var A in p)d.set(A,p[A]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const P of p.keys())d.set(P,p.get(P));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(P=>P.toLowerCase()=="content-type"),A=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(Op,u,void 0)>=0)||p||A||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,x]of d)this.g.setRequestHeader(P,x);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(P){cu(this,P)}};function cu(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.o=5,uu(o),Us(o)}function uu(o){o.A||(o.A=!0,ke(o,"complete"),ke(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,ke(this,"complete"),ke(this,"abort"),Us(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Us(this,!0)),ae.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?lu(this):this.Xa())},n.Xa=function(){lu(this)};function lu(o){if(o.h&&typeof i<"u"){if(o.v&&Mt(o)==4)setTimeout(o.Ca.bind(o),0);else if(ke(o,"readystatechange"),Mt(o)==4){o.h=!1;try{const P=o.ca();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var d;if(!(d=u)){var p;if(p=P===0){let x=String(o.D).match(Zc)[1]||null;!x&&a.self&&a.self.location&&(x=a.self.location.protocol.slice(0,-1)),p=!xp.test(x?x.toLowerCase():"")}d=p}if(d)ke(o,"complete"),ke(o,"success");else{o.o=6;try{var A=Mt(o)>2?o.g.statusText:""}catch{A=""}o.l=A+" ["+o.ca()+"]",uu(o)}}finally{Us(o)}}}}function Us(o,u){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const d=o.g;o.g=null,u||ke(o,"ready");try{d.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Mt(o){return o.g?o.g.readyState:0}n.ca=function(){try{return Mt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),pp(u)}};function hu(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Lp(o){const u={};o=(o.g&&Mt(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(_(o[p]))continue;var d=Tp(o[p]);const A=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const P=u[A]||[];u[A]=P,P.push(d)}cp(u,function(p){return p.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Nr(o,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||u}function du(o){this.za=0,this.i=[],this.j=new wr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Nr("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Nr("baseRetryDelayMs",5e3,o),this.Za=Nr("retryDelaySeedMs",1e4,o),this.Ta=Nr("forwardChannelMaxRetries",2,o),this.va=Nr("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new Kc(o&&o.concurrentRequestLimit),this.Ba=new Dp,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=du.prototype,n.ka=8,n.I=1,n.connect=function(o,u,d,p){De(0),this.W=o,this.H=u||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.J=wu(this,null,this.W),Bs(this)};function Co(o){if(fu(o),o.I==3){var u=o.V++,d=it(o.J);if(ne(d,"SID",o.M),ne(d,"RID",u),ne(d,"TYPE","terminate"),kr(o,d),u=new xt(o,o.j,u),u.M=2,u.A=Ls(it(d)),d=!1,a.navigator&&a.navigator.sendBeacon)try{d=a.navigator.sendBeacon(u.A.toString(),"")}catch{}!d&&a.Image&&(new Image().src=u.A,d=!0),d||(u.g=Iu(u.j,null),u.g.ea(u.A)),u.F=Date.now(),Os(u)}Tu(o)}function Fs(o){o.g&&(No(o),o.g.cancel(),o.g=null)}function fu(o){Fs(o),o.v&&(a.clearTimeout(o.v),o.v=null),$s(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function Bs(o){if(!Qc(o.h)&&!o.m){o.m=!0;var u=o.Ea;he||g(),de||(he(),de=!0),I.add(u,o),o.D=0}}function Mp(o,u){return Yc(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=u.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=Tr(h(o.Ea,o,u),Eu(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const A=new xt(this,this.j,o);let P=this.o;if(this.U&&(P?(P=Rc(P),Sc(P,this.U)):P=this.U),this.u!==null||this.R||(A.J=P,P=null),this.S)e:{for(var u=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(u+=p,u>4096){u=d;break e}if(u===4096||d===this.i.length-1){u=d+1;break e}}u=1e3}else u=1e3;u=mu(this,A,u),d=it(this.J),ne(d,"RID",o),ne(d,"CVER",22),this.G&&ne(d,"X-HTTP-Session-Id",this.G),kr(this,d),P&&(this.R?u="headers="+Ir(au(P))+"&"+u:this.u&&bo(d,this.u,P)),Ro(this.h,A),this.Ra&&ne(d,"TYPE","init"),this.S?(ne(d,"$req",u),ne(d,"SID","null"),A.U=!0,wo(A,d,null)):wo(A,d,u),this.I=2}}else this.I==3&&(o?pu(this,o):this.i.length==0||Qc(this.h)||pu(this))};function pu(o,u){var d;u?d=u.l:d=o.V++;const p=it(o.J);ne(p,"SID",o.M),ne(p,"RID",d),ne(p,"AID",o.K),kr(o,p),o.u&&o.o&&bo(p,o.u,o.o),d=new xt(o,o.j,d,o.D+1),o.u===null&&(d.J=o.o),u&&(o.i=u.G.concat(o.i)),u=mu(o,d,1e3),d.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),Ro(o.h,d),wo(d,p,u)}function kr(o,u){o.H&&Vs(o.H,function(d,p){ne(u,p,d)}),o.l&&Vs({},function(d,p){ne(u,p,d)})}function mu(o,u,d){d=Math.min(o.i.length,d);const p=o.l?h(o.l.Ka,o.l,o):null;e:{var A=o.i;let W=-1;for(;;){const Ee=["count="+d];W==-1?d>0?(W=A[0].g,Ee.push("ofs="+W)):W=0:Ee.push("ofs="+W);let te=!0;for(let Ie=0;Ie<d;Ie++){var P=A[Ie].g;const ot=A[Ie].map;if(P-=W,P<0)W=Math.max(0,A[Ie].g-100),te=!1;else try{P="req"+P+"_"||"";try{var x=ot instanceof Map?ot:Object.entries(ot);for(const[En,Ut]of x){let Ft=Ut;c(Ut)&&(Ft=go(Ut)),Ee.push(P+En+"="+encodeURIComponent(Ft))}}catch(En){throw Ee.push(P+"type="+encodeURIComponent("_badmap")),En}}catch{p&&p(ot)}}if(te){x=Ee.join("&");break e}}x=void 0}return o=o.i.splice(0,d),u.G=o,x}function gu(o){if(!o.g&&!o.v){o.Y=1;var u=o.Da;he||g(),de||(he(),de=!0),I.add(u,o),o.A=0}}function Vo(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=Tr(h(o.Da,o),Eu(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,_u(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=Tr(h(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,De(10),Fs(this),_u(this))};function No(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function _u(o){o.g=new xt(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var u=it(o.na);ne(u,"RID","rpc"),ne(u,"SID",o.M),ne(u,"AID",o.K),ne(u,"CI",o.F?"0":"1"),!o.F&&o.ia&&ne(u,"TO",o.ia),ne(u,"TYPE","xmlhttp"),kr(o,u),o.u&&o.o&&bo(u,o.u,o.o),o.O&&(o.g.H=o.O);var d=o.g;o=o.ba,d.M=1,d.A=Ls(it(u)),d.u=null,d.R=!0,Hc(d,o)}n.Va=function(){this.C!=null&&(this.C=null,Fs(this),Vo(this),De(19))};function $s(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function yu(o,u){var d=null;if(o.g==u){$s(o),No(o),o.g=null;var p=2}else if(Ao(o.h,u))d=u.G,Jc(o.h,u),p=1;else return;if(o.I!=0){if(u.o)if(p==1){d=u.u?u.u.length:0,u=Date.now()-u.F;var A=o.D;p=Ds(),ke(p,new Bc(p,d)),Bs(o)}else gu(o);else if(A=u.m,A==3||A==0&&u.X>0||!(p==1&&Mp(o,u)||p==2&&Vo(o)))switch(d&&d.length>0&&(u=o.h,u.i=u.i.concat(d)),A){case 1:yn(o,5);break;case 4:yn(o,10);break;case 3:yn(o,6);break;default:yn(o,2)}}}function Eu(o,u){let d=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(d*=2),d*u}function yn(o,u){if(o.j.info("Error code "+u),u==2){var d=h(o.bb,o),p=o.Ua;const A=!p;p=new Ot(p||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Ar(p,"https"),Ls(p),A?Np(p.toString(),d):kp(p.toString(),d)}else De(2);o.I=0,o.l&&o.l.pa(u),Tu(o),fu(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),De(2)):(this.j.info("Failed to ping google.com"),De(1))};function Tu(o){if(o.I=0,o.ja=[],o.l){const u=Xc(o.h);(u.length!=0||o.i.length!=0)&&(C(o.ja,u),C(o.ja,o.i),o.h.i.length=0,S(o.i),o.i.length=0),o.l.oa()}}function wu(o,u,d){var p=d instanceof Ot?it(d):new Ot(d);if(p.g!="")u&&(p.g=u+"."+p.g),Rr(p,p.u);else{var A=a.location;p=A.protocol,u=u?u+"."+A.hostname:A.hostname,A=+A.port;const P=new Ot(null);p&&Ar(P,p),u&&(P.g=u),A&&Rr(P,A),d&&(P.h=d),p=P}return d=o.G,u=o.wa,d&&u&&ne(p,d,u),ne(p,"VER",o.ka),kr(o,p),p}function Iu(o,u,d){if(u&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Aa&&!o.ma?new ae(new So({ab:d})):new ae(o.ma),u.Fa(o.L),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function vu(){}n=vu.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function qs(){}qs.prototype.g=function(o,u){return new We(o,u)};function We(o,u){Se.call(this),this.g=new du(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.sa&&(o?o["X-WebChannel-Client-Profile"]=u.sa:o={"X-WebChannel-Client-Profile":u.sa}),this.g.U=o,(o=u&&u.Qb)&&!_(o)&&(this.g.u=o),this.A=u&&u.supportsCrossDomainXhr||!1,this.v=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!_(u)&&(this.g.G=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new zn(this)}m(We,Se),We.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},We.prototype.close=function(){Co(this.g)},We.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.v&&(d={},d.__data__=go(o),o=d);u.i.push(new vp(u.Ya++,o)),u.I==3&&Bs(u)},We.prototype.N=function(){this.g.l=null,delete this.j,Co(this.g),delete this.g,We.Z.N.call(this)};function Au(o){_o.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(const d in u){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}m(Au,_o);function Ru(){yo.call(this),this.status=1}m(Ru,yo);function zn(o){this.g=o}m(zn,vu),zn.prototype.ra=function(){ke(this.g,"a")},zn.prototype.qa=function(o){ke(this.g,new Au(o))},zn.prototype.pa=function(o){ke(this.g,new Ru)},zn.prototype.oa=function(){ke(this.g,"b")},qs.prototype.createWebChannel=qs.prototype.g,We.prototype.send=We.prototype.o,We.prototype.open=We.prototype.m,We.prototype.close=We.prototype.close,Qh=function(){return new qs},Kh=function(){return Ds()},Gh=mn,Xo={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},xs.NO_ERROR=0,xs.TIMEOUT=8,xs.HTTP_ERROR=6,ri=xs,$c.COMPLETE="complete",Wh=$c,Lc.EventType=yr,yr.OPEN="a",yr.CLOSE="b",yr.ERROR="c",yr.MESSAGE="d",Se.prototype.listen=Se.prototype.J,Ur=Lc,ae.prototype.listenOnce=ae.prototype.K,ae.prototype.getLastError=ae.prototype.Ha,ae.prototype.getLastErrorCode=ae.prototype.ya,ae.prototype.getStatus=ae.prototype.ca,ae.prototype.getResponseJson=ae.prototype.La,ae.prototype.getResponseText=ae.prototype.la,ae.prototype.send=ae.prototype.ea,ae.prototype.setWithCredentials=ae.prototype.Fa,Hh=ae}).apply(typeof Hs<"u"?Hs:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ue.UNAUTHENTICATED=new Ue(null),Ue.GOOGLE_CREDENTIALS=new Ue("google-credentials-uid"),Ue.FIRST_PARTY=new Ue("first-party-uid"),Ue.MOCK_USER=new Ue("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cr="12.15.0";function vy(n){cr=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kn=new Ea("@firebase/firestore");function Hn(){return kn.logLevel}function L(n,...e){if(kn.logLevel<=Y.DEBUG){const t=e.map(Va);kn.debug(`Firestore (${cr}): ${n}`,...t)}}function Nt(n,...e){if(kn.logLevel<=Y.ERROR){const t=e.map(Va);kn.error(`Firestore (${cr}): ${n}`,...t)}}function gt(n,...e){if(kn.logLevel<=Y.WARN){const t=e.map(Va);kn.warn(`Firestore (${cr}): ${n}`,...t)}}function Va(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Yh(n,r,t)}function Yh(n,e,t){let r=`FIRESTORE (${cr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Nt(r),new Error(r)}function U(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||Yh(e,s,r)}function H(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class O extends Tt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ay{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Ry{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Ue.UNAUTHENTICATED)))}shutdown(){}}class Py{constructor(e){this.t=e,this.currentUser=Ue.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){U(this.o===void 0,42304);let r=this.i;const s=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let i=new St;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new St,e.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const l=i;e.enqueueRetryable((async()=>{await l.promise,await s(this.currentUser)}))},c=l=>{L("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((l=>c(l))),setTimeout((()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(L("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new St)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(L("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(U(typeof r.accessToken=="string",31837,{l:r}),new Ay(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return U(e===null||typeof e=="string",2055,{h:e}),new Ue(e)}}class Sy{constructor(e,t,r){this.T=e,this.P=t,this.R=r,this.type="FirstParty",this.user=Ue.FIRST_PARTY,this.I=new Map}A(){return this.R?this.R():null}get headers(){this.I.set("X-Goog-AuthUser",this.T);const e=this.A();return e&&this.I.set("Authorization",e),this.P&&this.I.set("X-Goog-Iam-Authorization-Token",this.P),this.I}}class by{constructor(e,t,r){this.T=e,this.P=t,this.R=r}getToken(){return Promise.resolve(new Sy(this.T,this.P,this.R))}start(e,t){e.enqueueRetryable((()=>t(Ue.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class el{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Cy{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Be(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){U(this.o===void 0,3512);const r=i=>{i.error!=null&&L("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,L("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{L("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):L("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new el(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(U(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new el(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vy(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Na{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=Vy(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function Q(n,e){return n<e?-1:n>e?1:0}function Zo(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Mo(s)===Mo(i)?Q(s,i):Mo(s)?1:-1}return Q(n.length,e.length)}const Ny=55296,ky=57343;function Mo(n){const e=n.charCodeAt(0);return e>=Ny&&e<=ky}function tr(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ct="__name__";class at{constructor(e,t,r){t===void 0?t=0:t>e.length&&B(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&B(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return at.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof at?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=at.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return Q(e.length,t.length)}static compareSegments(e,t){const r=at.isNumericId(e),s=at.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?at.extractNumericId(e).compare(at.extractNumericId(t)):Zo(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Qt.fromString(e.substring(4,e.length-2))}}class Z extends at{construct(e,t,r){return new Z(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new O(V.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new Z(t)}static emptyPath(){return new Z([])}}const Dy=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Te extends at{construct(e,t,r){return new Te(e,t,r)}static isValidIdentifier(e){return Dy.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Te.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===ct}static keyField(){return new Te([ct])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new O(V.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new O(V.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new O(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new O(V.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Te(t)}static emptyPath(){return new Te([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e){this.path=e}static fromPath(e){return new F(Z.fromString(e))}static fromName(e){return new F(Z.fromString(e).popFirst(5))}static empty(){return new F(Z.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Z.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Z.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new F(new Z(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jh(n,e,t){if(!t)throw new O(V.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function xy(n,e,t,r){if(e===!0&&r===!0)throw new O(V.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function tl(n){if(!F.isDocumentKey(n))throw new O(V.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function nl(n){if(F.isDocumentKey(n))throw new O(V.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Es(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Fi(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":B(12329,{type:typeof n})}function _t(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new O(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Fi(n);throw new O(V.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(n,e){const t={typeString:n};return e&&(t.value=e),t}function Ts(n,e){if(!Es(n))throw new O(V.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new O(V.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rl=-62135596800,sl=1e6;class re{static now(){return re.fromMillis(Date.now())}static fromDate(e){return re.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*sl);return new re(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new O(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new O(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<rl)throw new O(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new O(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/sl}_compareTo(e){return this.seconds===e.seconds?Q(this.nanoseconds,e.nanoseconds):Q(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:re._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Ts(e,re._jsonSchema))return new re(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-rl;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}re._jsonSchemaVersion="firestore/timestamp/1.0",re._jsonSchema={type:me("string",re._jsonSchemaVersion),seconds:me("number"),nanoseconds:me("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{static fromTimestamp(e){return new z(e)}static min(){return new z(new re(0,0))}static max(){return new z(new re(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zr=-1;function Oy(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=z.fromTimestamp(r===1e9?new re(t+1,0):new re(t,r));return new en(s,F.empty(),e)}function Ly(n){return new en(n.readTime,n.key,Zr)}class en{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new en(z.min(),F.empty(),Zr)}static max(){return new en(z.max(),F.empty(),Zr)}}function My(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=F.comparator(n.documentKey,e.documentKey),t!==0?t:Q(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uy="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Fy{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ur(n){if(n.code!==V.FAILED_PRECONDITION||n.message!==Uy)throw n;L("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&B(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new N(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof N?t:N.resolve(t)}catch(t){return N.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):N.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):N.reject(t)}static resolve(e){return new N(((t,r)=>{t(e)}))}static reject(e){return new N(((t,r)=>{r(e)}))}static waitFor(e){return new N(((t,r)=>{let s=0,i=0,a=!1;e.forEach((c=>{++s,c.next((()=>{++i,a&&i===s&&t()}),(l=>r(l)))})),a=!0,i===s&&t()}))}static or(e){let t=N.resolve(!1);for(const r of e)t=t.next((s=>s?N.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new N(((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let l=0;l<i;l++){const h=l;t(e[h]).next((f=>{a[h]=f,++c,c===i&&r(a)}),(f=>s(f)))}}))}static doWhile(e,t){return new N(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}function By(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function lr(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Bi.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ka=-1;function $i(n){return n==null}function es(n){return n===0&&1/n==-1/0}function $y(n){return typeof n=="number"&&Number.isInteger(n)&&!es(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}function qy(n){return typeof n=="string"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xh="";function jy(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=il(e)),e=zy(n.get(t),e);return il(e)}function zy(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Xh:t+="";break;default:t+=i}}return t}function il(n){return n+Xh+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e,t){this.comparator=e,this.root=t||Re.EMPTY}insert(e,t){return new se(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Re.BLACK,null,null))}remove(e){return new se(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Re.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ws(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ws(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ws(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ws(this.root,e,this.comparator,!0)}}class Ws{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Re{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Re.RED,this.left=s??Re.EMPTY,this.right=i??Re.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Re(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Re.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Re.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Re.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Re.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw B(43730,{key:this.key,value:this.value});if(this.right.isRed())throw B(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw B(27949);return e+(this.isRed()?0:1)}}Re.EMPTY=null,Re.RED=!0,Re.BLACK=!1;Re.EMPTY=new class{constructor(){this.size=0}get key(){throw B(57766)}get value(){throw B(16141)}get color(){throw B(16727)}get left(){throw B(29726)}get right(){throw B(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new Re(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e){this.comparator=e,this.data=new se(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new ol(this.data.getIterator())}getIteratorFrom(e){return new ol(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof ge)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new ge(this.comparator);return t.data=e,t}}class ol{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e){this.fields=e,e.sort(Te.comparator)}static empty(){return new Ke([])}unionWith(e){let t=new ge(Te.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ke(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return tr(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yi(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function dn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Hy(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function Zh(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ed extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new ed("Invalid base64 string: "+i):i}})(e);return new _e(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(e);return new _e(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Q(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}_e.EMPTY_BYTE_STRING=new _e("");const Wy=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function tn(n){if(U(!!n,39018),typeof n=="string"){let e=0;const t=Wy.exec(n);if(U(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ie(n.seconds),nanos:ie(n.nanos)}}function ie(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function nn(n){return typeof n=="string"?_e.fromBase64String(n):_e.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const td="server_timestamp",nd="__type__",rd="__previous_value__",sd="__local_write_time__";function qi(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[nd])==null?void 0:r.stringValue)===td}function ws(n){const e=n.mapValue.fields[rd];return qi(e)?ws(e):e}function nr(n){const e=tn(n.mapValue.fields[sd].timestampValue);return new re(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gy{constructor(e,t,r,s,i,a,c,l,h,f,m){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=h,this.isUsingEmulator=f,this.apiKey=m}}const Ei="(default)";class ts{constructor(e,t){this.projectId=e,this.database=t||Ei}static empty(){return new ts("","")}get isDefaultDatabase(){return this.database===Ei}isEqual(e){return e instanceof ts&&e.projectId===this.projectId&&e.database===this.database}}function Ky(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new O(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ts(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const id="__type__",Qy="__max__",Gs={mapValue:{}},od="__vector__",ns="value",rr={nullValue:"NULL_VALUE"},je={booleanValue:!0},Ae={booleanValue:!1};function ye(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?qi(n)?4:Yy(n)?9007199254740991:Ti(n)?10:11:B(28295,{value:n})}function tt(n,e,t){if(n===e)return!0;const r=ye(n);if(r!==ye(e))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return nr(n).isEqual(nr(e));case 3:return(function(i,a){if(typeof i.timestampValue=="string"&&typeof a.timestampValue=="string"&&i.timestampValue.length===a.timestampValue.length)return i.timestampValue===a.timestampValue;const c=tn(i.timestampValue),l=tn(a.timestampValue);return c.seconds===l.seconds&&c.nanos===l.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(i,a){return nn(i.bytesValue).isEqual(nn(a.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(i,a){return ie(i.geoPointValue.latitude)===ie(a.geoPointValue.latitude)&&ie(i.geoPointValue.longitude)===ie(a.geoPointValue.longitude)})(n,e);case 2:return(function(i,a,c){if("integerValue"in i&&"integerValue"in a)return ie(i.integerValue)===ie(a.integerValue);let l,h;if("doubleValue"in i&&"doubleValue"in a)l=ie(i.doubleValue),h=ie(a.doubleValue);else{if(!(c!=null&&c.Ee))return!1;l=ie(i.integerValue??i.doubleValue),h=ie(a.integerValue??a.doubleValue)}return l===h?!!(c!=null&&c.he)||es(l)===es(h):!!(c===void 0||c.Te)&&isNaN(l)&&isNaN(h)})(n,e,t);case 9:return tr(n.arrayValue.values||[],e.arrayValue.values||[],((s,i)=>tt(s,i,t)));case 10:case 11:return(function(i,a,c){const l=i.mapValue.fields||{},h=a.mapValue.fields||{};if(yi(l)!==yi(h))return!1;for(const f in l)if(l.hasOwnProperty(f)&&(h[f]===void 0||!tt(l[f],h[f],c)))return!1;return!0})(n,e,t);default:return B(52216,{left:n})}}function rs(n,e){return(n.values||[]).find((t=>tt(t,e)))!==void 0}function ze(n,e){if(n===e)return 0;const t=ye(n),r=ye(e);if(t!==r)return Q(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return Q(n.booleanValue,e.booleanValue);case 2:return(function(i,a){const c=ie(i.integerValue||i.doubleValue),l=ie(a.integerValue||a.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1})(n,e);case 3:return al(n.timestampValue,e.timestampValue);case 4:return al(nr(n),nr(e));case 5:return Zo(n.stringValue,e.stringValue);case 6:return(function(i,a){const c=nn(i),l=nn(a);return c.compareTo(l)})(n.bytesValue,e.bytesValue);case 7:return(function(i,a){const c=i.split("/"),l=a.split("/");for(let h=0;h<c.length&&h<l.length;h++){const f=Q(c[h],l[h]);if(f!==0)return f}return Q(c.length,l.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,a){const c=Q(ie(i.latitude),ie(a.latitude));return c!==0?c:Q(ie(i.longitude),ie(a.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return cl(n.arrayValue,e.arrayValue);case 10:return(function(i,a){var w,S,C,M;const c=i.fields||{},l=a.fields||{},h=(w=c[ns])==null?void 0:w.arrayValue,f=(S=l[ns])==null?void 0:S.arrayValue,m=Q(((C=h==null?void 0:h.values)==null?void 0:C.length)||0,((M=f==null?void 0:f.values)==null?void 0:M.length)||0);return m!==0?m:cl(h,f)})(n.mapValue,e.mapValue);case 11:return(function(i,a){if(i===Gs.mapValue&&a===Gs.mapValue)return 0;if(i===Gs.mapValue)return 1;if(a===Gs.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),h=a.fields||{},f=Object.keys(h);l.sort(),f.sort();for(let m=0;m<l.length&&m<f.length;++m){const w=Zo(l[m],f[m]);if(w!==0)return w;const S=ze(c[l[m]],h[f[m]]);if(S!==0)return S}return Q(l.length,f.length)})(n.mapValue,e.mapValue);default:throw B(23264,{Pe:t})}}function al(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Q(n,e);const t=tn(n),r=tn(e),s=Q(t.seconds,r.seconds);return s!==0?s:Q(t.nanos,r.nanos)}function cl(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=ze(t[s],r[s]);if(i!==void 0&&i!==0)return i}return Q(t.length,r.length)}function sr(n){return ea(n)}function ea(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=tn(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return nn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return F.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=ea(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${ea(t.fields[a])}`;return s+"}"})(n.mapValue):B(61005,{value:n})}function si(n){switch(ye(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=ws(n);return e?16+si(e):16;case 5:return 2*n.stringValue.length;case 6:return nn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+si(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return dn(r.fields,((i,a)=>{s+=i.length+si(a)})),s})(n.mapValue);default:throw B(13486,{value:n})}}function ul(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function ut(n){return!!n&&"integerValue"in n}function vn(n){return!!n&&"doubleValue"in n}function rn(n){return ut(n)||vn(n)}function ir(n){return!!n&&"arrayValue"in n}function Qe(n){return!!n&&"nullValue"in n}function He(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function An(n){return!!n&&"mapValue"in n}function Ti(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[id])==null?void 0:r.stringValue)===od}function ta(n){var e,t;return(t=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[ns])==null?void 0:t.arrayValue}function jr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return dn(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=jr(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=jr(n.arrayValue.values[t]);return e}return{...n}}function Yy(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Qy}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e){this.value=e}static empty(){return new Le({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!An(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=jr(t)}setAll(e){let t=Te.emptyPath(),r={},s=[];e.forEach(((a,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,s),r={},s=[],t=c.popLast()}a?r[c.lastSegment()]=jr(a):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());An(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return tt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];An(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){dn(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new Le(jr(this.value))}}function ad(n){const e=[];return dn(n.fields,((t,r)=>{const s=new Te([t]);if(An(r)){const i=ad(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)})),new Ke(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ji(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:es(e)?"-0":e}}function Da(n){return{integerValue:""+n}}function xa(n,e,t){return Number.isInteger(e)&&(t!=null&&t.preferIntegers)||$y(e)?Da(e):ji(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi{constructor(){this._=void 0}}function Jy(n,e,t){return n instanceof wi?(function(s,i){const a={fields:{[nd]:{stringValue:td},[sd]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&qi(i)&&(i=ws(i)),i&&(a.fields[rd]=i),{mapValue:a}})(t,e):n instanceof ss?ud(n,e):n instanceof is?ld(n,e):n instanceof os?(function(s,i){const a=cd(s,i),c=Ai(a)+Ai(s.Re);return ut(a)&&ut(s.Re)?Da(c):ji(s.serializer,c)})(n,e):n instanceof Ii?(function(s,i){return ll(s,i,Math.min)})(n,e):n instanceof vi?(function(s,i){return ll(s,i,Math.max)})(n,e):void 0}function Xy(n,e,t){return n instanceof ss?ud(n,e):n instanceof is?ld(n,e):t}function cd(n,e){return n instanceof os?rn(e)?e:{integerValue:0}:null}class wi extends zi{}class ss extends zi{constructor(e){super(),this.elements=e}}function ud(n,e){const t=hd(e);for(const r of n.elements)t.some((s=>tt(s,r)))||t.push(r);return{arrayValue:{values:t}}}class is extends zi{constructor(e){super(),this.elements=e}}function ld(n,e){let t=hd(e);for(const r of n.elements)t=t.filter((s=>!tt(s,r)));return{arrayValue:{values:t}}}class Oa extends zi{constructor(e,t){super(),this.serializer=e,this.Re=t}}class os extends Oa{}class Ii extends Oa{}class vi extends Oa{}function ll(n,e,t){if(!rn(e))return n.Re;const r=t(Ai(e),Ai(n.Re));return ut(e)&&ut(n.Re)?Da(r):ji(n.serializer,r)}function Ai(n){return ie(n.integerValue||n.doubleValue)}function hd(n){return ir(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Zy(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof ss&&s instanceof ss||r instanceof is&&s instanceof is?tr(r.elements,s.elements,tt):r instanceof os&&s instanceof os||r instanceof Ii&&s instanceof Ii||r instanceof vi&&s instanceof vi?tt(r.Re,s.Re):r instanceof wi&&s instanceof wi})(n.transform,e.transform)}class eE{constructor(e,t){this.version=e,this.transformResults=t}}class Ze{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ze}static exists(e){return new Ze(void 0,e)}static updateTime(e){return new Ze(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ii(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Hi{}function dd(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new La(n.key,Ze.none()):new Is(n.key,n.data,Ze.none());{const t=n.data,r=Le.empty();let s=new ge(Te.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new fn(n.key,r,new Ke(s.toArray()),Ze.none())}}function tE(n,e,t){n instanceof Is?(function(s,i,a){const c=s.value.clone(),l=dl(s.fieldTransforms,i,a.transformResults);c.setAll(l),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(n,e,t):n instanceof fn?(function(s,i,a){if(!ii(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=dl(s.fieldTransforms,i,a.transformResults),l=i.data;l.setAll(fd(s)),l.setAll(c),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()})(n,e,t):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function zr(n,e,t,r){return n instanceof Is?(function(i,a,c,l){if(!ii(i.precondition,a))return c;const h=i.value.clone(),f=fl(i.fieldTransforms,l,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null})(n,e,t,r):n instanceof fn?(function(i,a,c,l){if(!ii(i.precondition,a))return c;const h=fl(i.fieldTransforms,l,a),f=a.data;return f.setAll(fd(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((m=>m.field)))})(n,e,t,r):(function(i,a,c){return ii(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c})(n,e,t)}function nE(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=cd(r.transform,s||null);i!=null&&(t===null&&(t=Le.empty()),t.set(r.field,i))}return t||null}function hl(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&tr(r,s,((i,a)=>Zy(i,a)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Is extends Hi{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class fn extends Hi{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function fd(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function dl(n,e,t){const r=new Map;U(n.length===t.length,32656,{Ie:t.length,Ae:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,Xy(a,c,t[s]))}return r}function fl(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,Jy(i,a,e))}return r}class La extends Hi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class rE extends Hi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ri{constructor(e,t){this.position=e,this.inclusive=t}}function pl(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=F.comparator(F.fromName(a.referenceValue),t.key):r=ze(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function ml(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!tt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd{}class pe extends pd{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new iE(e,t,r):t==="array-contains"?new cE(e,r):t==="in"?new uE(e,r):t==="not-in"?new lE(e,r):t==="array-contains-any"?new hE(e,r):new pe(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new oE(e,r):new aE(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(ze(t,this.value)):t!==null&&ye(this.value)===ye(t)&&this.matchesComparison(ze(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return B(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class st extends pd{constructor(e,t){super(),this.filters=e,this.op=t,this.Ve=null}static create(e,t){return new st(e,t)}matches(e){return md(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Ve!==null||(this.Ve=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Ve}getFilters(){return Object.assign([],this.filters)}}function md(n){return n.op==="and"}function gd(n){return sE(n)&&md(n)}function sE(n){for(const e of n.filters)if(e instanceof st)return!1;return!0}function na(n){if(n instanceof pe)return n.field.canonicalString()+n.op.toString()+sr(n.value);if(gd(n))return n.filters.map((e=>na(e))).join(",");{const e=n.filters.map((t=>na(t))).join(",");return`${n.op}(${e})`}}function _d(n,e){return n instanceof pe?(function(r,s){return s instanceof pe&&r.op===s.op&&r.field.isEqual(s.field)&&tt(r.value,s.value)})(n,e):n instanceof st?(function(r,s){return s instanceof st&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,a,c)=>i&&_d(a,s.filters[c])),!0):!1})(n,e):void B(19439)}function yd(n){return n instanceof pe?(function(t){return`${t.field.canonicalString()} ${t.op} ${sr(t.value)}`})(n):n instanceof st?(function(t){return t.op.toString()+" {"+t.getFilters().map(yd).join(" ,")+"}"})(n):"Filter"}class iE extends pe{constructor(e,t,r){super(e,t,r),this.key=F.fromName(r.referenceValue)}matches(e){const t=F.comparator(e.key,this.key);return this.matchesComparison(t)}}class oE extends pe{constructor(e,t){super(e,"in",t),this.keys=Ed("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class aE extends pe{constructor(e,t){super(e,"not-in",t),this.keys=Ed("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Ed(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((r=>F.fromName(r.referenceValue)))}class cE extends pe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ir(t)&&rs(t.arrayValue,this.value)}}class uE extends pe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&rs(this.value.arrayValue,t)}}class lE extends pe{constructor(e,t){super(e,"not-in",t)}matches(e){if(rs(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!rs(this.value.arrayValue,t)}}class hE extends pe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ir(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>rs(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi{constructor(e,t="asc"){this.field=e,this.dir=t}}function dE(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e,t,r,s,i,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Ce(e,0,z.min(),z.min(),z.min(),Le.empty(),0)}static newFoundDocument(e,t,r,s){return new Ce(e,1,t,z.min(),r,s,0)}static newNoDocument(e,t){return new Ce(e,2,t,z.min(),z.min(),Le.empty(),0)}static newUnknownDocument(e,t){return new Ce(e,3,t,z.min(),z.min(),Le.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Le.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Le.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=z.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ce&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ce(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fE{constructor(e,t=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.de=null}}function gl(n,e=null,t=[],r=[],s=null,i=null,a=null){return new fE(n,e,t,r,s,i,a)}function Td(n){const e=H(n);if(e.de===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>na(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),$i(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>sr(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>sr(r))).join(",")),e.de=t}return e.de}function wd(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!dE(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!_d(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!ml(n.startAt,e.startAt)&&ml(n.endAt,e.endAt)}function wn(n){return!!n.isCorePipeline}function Id(n){return!!n.path&&F.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs{constructor(e,t=null,r=[],s=[],i=null,a="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=l,this.fe=null,this.me=null,this.pe=null,this.startAt,this.endAt}}function pE(n,e,t,r,s,i,a,c){return new vs(n,e,t,r,s,i,a,c)}function Ma(n){return new vs(n)}function _l(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function mE(n){return F.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function vd(n){return n.collectionGroup!==null}function Hr(n){const e=H(n);if(e.fe===null){e.fe=[];const t=new Set;for(const i of e.explicitOrderBy)e.fe.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new ge(Te.comparator);return a.filters.forEach((l=>{l.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.fe.push(new Pi(i,r))})),t.has(Te.keyField().canonicalString())||e.fe.push(new Pi(Te.keyField(),r))}return e.fe}function ft(n){const e=H(n);return e.me||(e.me=gE(e,Hr(n))),e.me}function gE(n,e){if(n.limitType==="F")return gl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Pi(s.field,i)}));const t=n.endAt?new Ri(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ri(n.startAt.position,n.startAt.inclusive):null;return gl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function ra(n,e){const t=n.filters.concat([e]);return new vs(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function sa(n,e,t){return new vs(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function _E(n,e){return wd(ft(n),ft(e))&&n.limitType===e.limitType}function Wr(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>yd(s))).join(", ")}]`),$i(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>sr(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>sr(s))).join(",")),`Target(${r})`})(ft(n))}; limitType=${n.limitType})`}function Wi(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):F.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of Hr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(a,c,l){const h=pl(a,c,l);return a.inclusive?h<=0:h<0})(r.startAt,Hr(r),s)||r.endAt&&!(function(a,c,l){const h=pl(a,c,l);return a.inclusive?h>=0:h>0})(r.endAt,Hr(r),s))})(n,e)}function Ua(n){return(e,t)=>{let r=!1;for(const s of Hr(n)){const i=yE(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function yE(n,e,t){const r=n.field.isKeyField()?F.comparator(e.key,t.key):(function(i,a,c){const l=a.data.field(i),h=c.data.field(i);return l!==null&&h!==null?ze(l,h):B(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return B(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EE{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var fe,J;function TE(n){switch(n){case V.OK:return B(64938);case V.CANCELLED:case V.UNKNOWN:case V.DEADLINE_EXCEEDED:case V.RESOURCE_EXHAUSTED:case V.INTERNAL:case V.UNAVAILABLE:case V.UNAUTHENTICATED:return!1;case V.INVALID_ARGUMENT:case V.NOT_FOUND:case V.ALREADY_EXISTS:case V.PERMISSION_DENIED:case V.FAILED_PRECONDITION:case V.ABORTED:case V.OUT_OF_RANGE:case V.UNIMPLEMENTED:case V.DATA_LOSS:return!0;default:return B(15467,{code:n})}}function Ad(n){if(n===void 0)return Nt("GRPC error has no .code"),V.UNKNOWN;switch(n){case fe.OK:return V.OK;case fe.CANCELLED:return V.CANCELLED;case fe.UNKNOWN:return V.UNKNOWN;case fe.DEADLINE_EXCEEDED:return V.DEADLINE_EXCEEDED;case fe.RESOURCE_EXHAUSTED:return V.RESOURCE_EXHAUSTED;case fe.INTERNAL:return V.INTERNAL;case fe.UNAVAILABLE:return V.UNAVAILABLE;case fe.UNAUTHENTICATED:return V.UNAUTHENTICATED;case fe.INVALID_ARGUMENT:return V.INVALID_ARGUMENT;case fe.NOT_FOUND:return V.NOT_FOUND;case fe.ALREADY_EXISTS:return V.ALREADY_EXISTS;case fe.PERMISSION_DENIED:return V.PERMISSION_DENIED;case fe.FAILED_PRECONDITION:return V.FAILED_PRECONDITION;case fe.ABORTED:return V.ABORTED;case fe.OUT_OF_RANGE:return V.OUT_OF_RANGE;case fe.UNIMPLEMENTED:return V.UNIMPLEMENTED;case fe.DATA_LOSS:return V.DATA_LOSS;default:return B(39323,{code:n})}}(J=fe||(fe={}))[J.OK=0]="OK",J[J.CANCELLED=1]="CANCELLED",J[J.UNKNOWN=2]="UNKNOWN",J[J.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",J[J.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",J[J.NOT_FOUND=5]="NOT_FOUND",J[J.ALREADY_EXISTS=6]="ALREADY_EXISTS",J[J.PERMISSION_DENIED=7]="PERMISSION_DENIED",J[J.UNAUTHENTICATED=16]="UNAUTHENTICATED",J[J.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",J[J.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",J[J.ABORTED=10]="ABORTED",J[J.OUT_OF_RANGE=11]="OUT_OF_RANGE",J[J.UNIMPLEMENTED=12]="UNIMPLEMENTED",J[J.INTERNAL=13]="INTERNAL",J[J.UNAVAILABLE=14]="UNAVAILABLE",J[J.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){dn(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return Zh(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wE=new se(F.comparator);function $e(){return wE}const Rd=new se(F.comparator);function Wn(...n){let e=Rd;for(const t of n)e=e.insert(t.key,t);return e}function Pd(n){let e=Rd;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function Wt(){return Gr()}function Sd(){return Gr()}function Gr(){return new Un((n=>n.toString()),((n,e)=>n.isEqual(e)))}const IE=new se(F.comparator),vE=new ge(F.comparator);function K(...n){let e=vE;for(const t of n)e=e.add(t);return e}const AE=new ge(Q);function RE(){return AE}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function PE(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SE=new Qt([4294967295,4294967295],0);function yl(n){const e=PE().encode(n),t=new zh;return t.update(e),new Uint8Array(t.digest())}function El(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Qt([t,r],0),new Qt([s,i],0)]}class Fa{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Fr(`Invalid padding: ${t}`);if(r<0)throw new Fr(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Fr(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Fr(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.ye=Qt.fromNumber(this.ge)}we(e,t,r){let s=e.add(t.multiply(Qt.fromNumber(r)));return s.compare(SE)===1&&(s=new Qt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ye).toNumber()}be(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=yl(e),[r,s]=El(t);for(let i=0;i<this.hashCount;i++){const a=this.we(r,s,i);if(!this.be(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Fa(i,s,t);return r.forEach((c=>a.insert(c))),a}insert(e){if(this.ge===0)return;const t=yl(e),[r,s]=El(t);for(let i=0;i<this.hashCount;i++){const a=this.we(r,s,i);this.ve(a)}}ve(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Fr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(e,t,r,s,i,a){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.augmentedDocumentUpdates=i,this.resolvedLimboDocuments=a}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Rs.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new As(z.min(),s,new se(Q),$e(),$e(),K())}}class Rs{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Rs(r,t,K(),K(),K())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi{constructor(e,t,r,s){this.Se=e,this.removedTargetIds=t,this.key=r,this.De=s}}class bd{constructor(e,t){this.targetId=e,this.xe=t}}class Cd{constructor(e,t,r=_e.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Tl{constructor(e){this.targetId=e,this.Ce=0,this.Fe=wl(),this.Oe=_e.EMPTY_BYTE_STRING,this.Me=!1,this.Ne=!0}get current(){return this.Me}get resumeToken(){return this.Oe}get Le(){return this.Ce!==0}get Be(){return this.Ne}Ue(e){e.approximateByteSize()>0&&(this.Ne=!0,this.Oe=e)}ke(){let e=K(),t=K(),r=K();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:B(38017,{changeType:i})}})),new Rs(this.Oe,this.Me,e,t,r)}qe(){this.Ne=!1,this.Fe=wl()}$e(e,t){this.Ne=!0,this.Fe=this.Fe.insert(e,t)}Ke(e){this.Ne=!0,this.Fe=this.Fe.remove(e)}We(){this.Ce+=1}Qe(){this.Ce-=1,U(this.Ce>=0,3241,{Ce:this.Ce,targetId:this.targetId})}Ge(){this.Ne=!0,this.Me=!0}}const Dr="WatchChangeAggregator";class bE{constructor(e){this.ze=e,this.je=new Map,this.He=$e(),this.Je=Ks(),this.Ye=$e(),this.Ze=Ks(),this.Xe=new se(Q)}et(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.tt(t,e.De):this.nt(t,e.key,e.De);for(const t of e.removedTargetIds)this.nt(t,e.key,e.De)}rt(e){this.forEachTarget(e,(t=>{const r=this.je.get(t);if(r)switch(e.state){case 0:this.it(t)&&r.Ue(e.resumeToken);break;case 1:r.Qe(),r.Le||r.qe(),r.Ue(e.resumeToken);break;case 2:r.Qe(),r.Le||this.removeTarget(t);break;case 3:this.it(t)&&(r.Ge(),r.Ue(e.resumeToken));break;case 4:this.it(t)&&(this.st(t),r.Ue(e.resumeToken));break;default:B(56790,{state:e.state})}else L(Dr,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.je.forEach(((r,s)=>{this.it(s)&&t(s)}))}_t(e){var t;return wn(e)?e.getPipelineSourceType()==="documents"&&((t=e.getPipelineDocuments())==null?void 0:t.length)===1:Id(e)}ot(e){const t=e.targetId,r=e.xe.count,s=this.ut(t);if(s){const i=s.target;if(this._t(i))if(r===0){const a=new F(wn(i)?Z.fromString(i.getPipelineDocuments()[0]):i.path);this.nt(t,a,Ce.newNoDocument(a,z.min()))}else U(r===1,20013,"Single document existence filter with count: "+r);else{const a=this.ct(t);if(a!==r){const c=this.lt(e),l=c?this.Et(c,e,a):1;if(l!==0){this.st(t);const h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Xe=this.Xe.insert(t,h)}}}}}lt(e){const t=e.xe.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,c;try{a=nn(r).toUint8Array()}catch(l){if(l instanceof ed)return gt("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new Fa(a,s,i)}catch(l){return gt(l instanceof Fr?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.ge===0?null:c}Et(e,t,r){return t.xe.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.ze.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const a=this.ze.Tt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.nt(t,i,null),s++)})),s}Rt(e){const t=new Map;this.je.forEach(((i,a)=>{const c=this.ut(a);if(c){if(i.current&&this._t(c.target)){const l=wn(c.target)?Z.fromString(c.target.getPipelineDocuments()[0]):c.target.path,h=new F(l);this.It(h).has(a)||this.At(a,h)||this.nt(a,h,Ce.newNoDocument(h,e))}i.Be&&(t.set(a,i.ke()),i.qe())}}));let r=K();this.Ze.forEach(((i,a)=>{let c=!0;a.forEachWhile((l=>{const h=this.ut(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.He.forEach(((i,a)=>a.setReadTime(e))),this.Ye.forEach(((i,a)=>a.setReadTime(e)));const s=new As(e,t,this.Xe,this.He,this.Ye,r);return this.He=$e(),this.Je=Ks(),this.Ye=$e(),this.Ze=Ks(),this.Xe=new se(Q),s}tt(e,t){const r=this.je.get(e);if(!r||!this.it(e))return void L(Dr,`addDocumentToTarget received document for unknown inactive target (${e})`);const s=this.At(e,t.key)?2:0;r.$e(t.key,s),wn(this.ut(e).target)&&this.ut(e).target.getPipelineFlavor()!=="exact"?this.Ye=this.Ye.insert(t.key,t):this.He=this.He.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.Ze=this.Ze.insert(t.key,this.Vt(t.key).add(e))}nt(e,t,r){const s=this.je.get(e);s&&this.it(e)?(this.At(e,t)?s.$e(t,1):s.Ke(t),this.Ze=this.Ze.insert(t,this.Vt(t).delete(e)),this.Ze=this.Ze.insert(t,this.Vt(t).add(e)),r&&(wn(this.ut(e).target)&&this.ut(e).target.getPipelineFlavor()!=="exact"?this.Ye=this.Ye.insert(t,r):this.He=this.He.insert(t,r))):L(Dr,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.je.delete(e)}ct(e){const t=this.je.get(e);if(!t)return 0;const r=t.ke();return this.ze.getRemoteKeysForTarget(e).size+r.addedDocuments.size-r.removedDocuments.size}We(e){let t=this.je.get(e);t||(L(Dr,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new Tl(e),this.je.set(e,t)),t.We()}Vt(e){let t=this.Ze.get(e);return t||(t=new ge(Q),this.Ze=this.Ze.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new ge(Q),this.Je=this.Je.insert(e,t)),t}it(e){const t=this.ut(e)!==null;return t||L(Dr,"Detected inactive target",e),t}ut(e){const t=this.je.get(e);return t===void 0||t.Le?null:this.ze.dt(e)}st(e){this.je.set(e,new Tl(e)),this.ze.getRemoteKeysForTarget(e).forEach((t=>{this.nt(e,t,null)}))}At(e,t){return this.ze.getRemoteKeysForTarget(e).has(t)}}function Ks(){return new se(F.comparator)}function wl(){return new se(F.comparator)}const CE={asc:"ASCENDING",desc:"DESCENDING"},VE={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},NE={and:"AND",or:"OR"};class kE{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ia(n,e){return n.useProto3Json||$i(e)?e:{value:e}}function Si(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Ba(n){const e=tn(n);return new re(e.seconds,e.nanos)}function Vd(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function ai(n,e){return Si(n,e.toTimestamp())}function pt(n){return U(!!n,49232),z.fromTimestamp(Ba(n))}function $a(n,e){return oa(n,e).canonicalString()}function oa(n,e){const t=(function(s){return new Z(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function Nd(n){const e=Z.fromString(n);return U(Ld(e),10190,{key:e.toString()}),e}function bi(n,e){return $a(n.databaseId,e.path)}function Uo(n,e){const t=Nd(e);if(t.get(1)!==n.databaseId.projectId)throw new O(V.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new O(V.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new F(Dd(t))}function kd(n,e){return $a(n.databaseId,e)}function DE(n){const e=Nd(n);return e.length===4?Z.emptyPath():Dd(e)}function aa(n){return new Z(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Dd(n){return U(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Il(n,e,t){return{name:bi(n,e),fields:t.value.mapValue.fields}}function xE(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:B(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(U(f===void 0||typeof f=="string",58123),_e.fromBase64String(f||"")):(U(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),_e.fromUint8Array(f||new Uint8Array))})(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&(function(h){const f=h.code===void 0?V.UNKNOWN:Ad(h.code);return new O(f,h.message||"")})(a);t=new Cd(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Uo(n,r.document.name),i=pt(r.document.updateTime),a=r.document.createTime?pt(r.document.createTime):z.min(),c=new Le({mapValue:{fields:r.document.fields}}),l=Ce.newFoundDocument(s,i,a,c),h=r.targetIds||[],f=r.removedTargetIds||[];t=new oi(h,f,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Uo(n,r.document),i=r.readTime?pt(r.readTime):z.min(),a=Ce.newNoDocument(s,i),c=r.removedTargetIds||[];t=new oi([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Uo(n,r.document),i=r.removedTargetIds||[];t=new oi([],i,s,null)}else{if(!("filter"in e))return B(11601,{ft:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new EE(s,i),c=r.targetId;t=new bd(c,a)}}return t}function OE(n,e){let t;if(e instanceof Is)t={update:Il(n,e.key,e.value)};else if(e instanceof La)t={delete:bi(n,e.key)};else if(e instanceof fn)t={update:Il(n,e.key,e.data),updateMask:HE(e.fieldMask)};else{if(!(e instanceof rE))return B(16599,{gt:e.type});t={verify:bi(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,a){const c=a.transform;if(c instanceof wi)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof ss)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof is)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof os)return{fieldPath:a.field.canonicalString(),increment:c.Re};if(c instanceof Ii)return{fieldPath:a.field.canonicalString(),minimum:c.Re};if(c instanceof vi)return{fieldPath:a.field.canonicalString(),maximum:c.Re};throw B(20930,{transform:a.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:ai(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:B(27497)})(n,e.precondition)),t}function LE(n,e){return n&&n.length>0?(U(e!==void 0,14353),n.map((t=>(function(s,i){let a=s.updateTime?pt(s.updateTime):pt(i);return a.isEqual(z.min())&&(a=pt(i)),new eE(a,s.transformResults||[])})(t,e)))):[]}function ME(n,e){return{documents:[kd(n,e.path)]}}function UE(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=kd(n,s);const i=(function(h){if(h.length!==0)return Od(st.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const a=(function(h){if(h.length!==0)return h.map((f=>(function(w){return{field:Gn(w.field),direction:qE(w.dir)}})(f)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=ia(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{yt:t,parent:s}}function FE(n){let e=DE(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){U(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(m){const w=xd(m);return w instanceof st&&gd(w)?w.getFilters():[w]})(t.where));let a=[];t.orderBy&&(a=(function(m){return m.map((w=>(function(C){return new Pi(Kn(C.field),(function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(C.direction))})(w)))})(t.orderBy));let c=null;t.limit&&(c=(function(m){let w;return w=typeof m=="object"?m.value:m,$i(w)?null:w})(t.limit));let l=null;t.startAt&&(l=(function(m){const w=!!m.before,S=m.values||[];return new Ri(S,w)})(t.startAt));let h=null;return t.endAt&&(h=(function(m){const w=!m.before,S=m.values||[];return new Ri(S,w)})(t.endAt)),pE(e,s,a,i,c,"F",l,h)}function BE(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return B(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function $E(n,e){return{structuredPipeline:{pipeline:{stages:e.stages.map((t=>t._toProto(n)))}}}}function xd(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Kn(t.unaryFilter.field);return pe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Kn(t.unaryFilter.field);return pe.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Kn(t.unaryFilter.field);return pe.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Kn(t.unaryFilter.field);return pe.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return B(61313);default:return B(60726)}})(n):n.fieldFilter!==void 0?(function(t){return pe.create(Kn(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return B(58110);default:return B(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return st.create(t.compositeFilter.filters.map((r=>xd(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return B(1026)}})(t.compositeFilter.op))})(n):B(30097,{filter:n})}function qE(n){return CE[n]}function jE(n){return VE[n]}function zE(n){return NE[n]}function Gn(n){return{fieldPath:n.canonicalString()}}function Kn(n){return Te.fromServerFormat(n.fieldPath)}function Od(n){return n instanceof pe?(function(t){if(t.op==="=="){if(He(t.value))return{unaryFilter:{field:Gn(t.field),op:"IS_NAN"}};if(Qe(t.value))return{unaryFilter:{field:Gn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(He(t.value))return{unaryFilter:{field:Gn(t.field),op:"IS_NOT_NAN"}};if(Qe(t.value))return{unaryFilter:{field:Gn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Gn(t.field),op:jE(t.op),value:t.value}}})(n):n instanceof st?(function(t){const r=t.getFilters().map((s=>Od(s)));return r.length===1?r[0]:{compositeFilter:{op:zE(t.op),filters:r}}})(n):B(54877,{filter:n})}function HE(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Ld(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Md(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}function as(n,e){const t={fields:{}};return e.forEach(((r,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);t.fields[s]=r._toProto(n)})),{mapValue:t}}function Ud(n){return{stringValue:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gi(n){return new kE(n,!0)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Xe(_e.fromBase64String(e))}catch(t){throw new O(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Xe(_e.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Xe._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Ts(e,Xe._jsonSchema))return Xe.fromBase64String(e.bytes)}}Xe._jsonSchemaVersion="firestore/bytes/1.0",Xe._jsonSchema={type:me("string",Xe._jsonSchemaVersion),bytes:me("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ki{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new O(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Te(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function WE(){return new Ki(ct)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qa{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new O(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new O(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Q(this._lat,e._lat)||Q(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:mt._jsonSchemaVersion}}static fromJSON(e){if(Ts(e,mt._jsonSchema))return new mt(e.latitude,e.longitude)}}function Fd(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */mt._jsonSchemaVersion="firestore/geoPoint/1.0",mt._jsonSchema={type:me("string",mt._jsonSchemaVersion),latitude:me("number"),longitude:me("number")};class GE{bt(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vl="ConnectivityMonitor";class Al{constructor(){this.vt=()=>this.St(),this.Dt=()=>this.xt(),this.Ct=[],this.Ft()}bt(e){this.Ct.push(e)}shutdown(){window.removeEventListener("online",this.vt),window.removeEventListener("offline",this.Dt)}Ft(){window.addEventListener("online",this.vt),window.addEventListener("offline",this.Dt)}St(){L(vl,"Network connectivity changed: AVAILABLE");for(const e of this.Ct)e(0)}xt(){L(vl,"Network connectivity changed: UNAVAILABLE");for(const e of this.Ct)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qs=null;function ca(){return Qs===null?Qs=(function(){return 268435456+Math.round(2147483648*Math.random())})():Qs++,"0x"+Qs.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fo="RestConnection",KE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class QE{get Ot(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Mt=t+"://"+e.host,this.Nt=`projects/${r}/databases/${s}`,this.Lt=this.databaseId.database===Ei?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Bt(e,t,r,s,i){const a=ca(),c=this.Ut(e,t.toUriEncodedString());L(Fo,`Sending RPC '${e}' ${a}:`,c,r);const l={"google-cloud-resource-prefix":this.Nt,"x-goog-request-params":this.Lt};this.kt(l,s,i);const{host:h}=new URL(c),f=Ln(h);return this.qt(e,c,l,r,f).then((m=>(L(Fo,`Received RPC '${e}' ${a}: `,m),m)),(m=>{throw gt(Fo,`RPC '${e}' ${a} failed with error: `,m,"url: ",c,"request:",r),m}))}$t(e,t,r,s,i,a){return this.Bt(e,t,r,s,i)}kt(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+cr})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}Ut(e,t){const r=KE[e];let s=`${this.Mt}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YE{constructor(e){this.Kt=e.Kt,this.Wt=e.Wt}Qt(e){this.Gt=e}zt(e){this.jt=e}Ht(e){this.Jt=e}onMessage(e){this.Yt=e}close(){this.Wt()}send(e){this.Kt(e)}Zt(){this.Gt()}Xt(){this.jt()}en(e){this.Jt(e)}tn(e){this.Yt(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const be="WebChannelConnection",xr=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class Xn extends QE{constructor(e){super(e),this.nn=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static rn(){if(!Xn.sn){const e=Kh();xr(e,Gh.STAT_EVENT,(t=>{t.stat===Xo.PROXY?L(be,"STAT_EVENT: detected buffering proxy"):t.stat===Xo.NOPROXY&&L(be,"STAT_EVENT: detected no buffering proxy")})),Xn.sn=!0}}qt(e,t,r,s,i){const a=ca();return new Promise(((c,l)=>{const h=new Hh;h.setWithCredentials(!0),h.listenOnce(Wh.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case ri.NO_ERROR:const m=h.getResponseJson();L(be,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(m)),c(m);break;case ri.TIMEOUT:L(be,`RPC '${e}' ${a} timed out`),l(new O(V.DEADLINE_EXCEEDED,"Request time out"));break;case ri.HTTP_ERROR:const w=h.getStatus();if(L(be,`RPC '${e}' ${a} failed with status:`,w,"response text:",h.getResponseText()),w>0){let S=h.getResponseJson();Array.isArray(S)&&(S=S[0]);const C=S==null?void 0:S.error;if(C&&C.status&&C.message){const M=(function(j){const G=j.toLowerCase().replace(/_/g,"-");return Object.values(V).indexOf(G)>=0?G:V.UNKNOWN})(C.status);l(new O(M,C.message))}else l(new O(V.UNKNOWN,"Server responded with status "+h.getStatus()))}else l(new O(V.UNAVAILABLE,"Connection failed."));break;default:B(9055,{_n:e,streamId:a,an:h.getLastErrorCode(),un:h.getLastError()})}}finally{L(be,`RPC '${e}' ${a} completed.`)}}));const f=JSON.stringify(s);L(be,`RPC '${e}' ${a} sending request:`,s),h.send(t,"POST",f,r,15)}))}cn(e,t,r){const s=ca(),i=[this.Mt,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(c.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(c.useFetchStreams=!0),this.kt(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const h=i.join("");L(be,`Creating RPC '${e}' stream ${s}: ${h}`,c);const f=a.createWebChannel(h,c);this.En(f);let m=!1,w=!1;const S=new YE({Kt:C=>{w?L(be,`Not sending because RPC '${e}' stream ${s} is closed:`,C):(m||(L(be,`Opening RPC '${e}' stream ${s} transport.`),f.open(),m=!0),L(be,`RPC '${e}' stream ${s} sending:`,C),f.send(C))},Wt:()=>f.close()});return xr(f,Ur.EventType.OPEN,(()=>{w||(L(be,`RPC '${e}' stream ${s} transport opened.`),S.Zt())})),xr(f,Ur.EventType.CLOSE,(()=>{w||(w=!0,L(be,`RPC '${e}' stream ${s} transport closed`),S.en(),this.hn(f))})),xr(f,Ur.EventType.ERROR,(C=>{w||(w=!0,gt(be,`RPC '${e}' stream ${s} transport errored. Name:`,C.name,"Message:",C.message),S.en(new O(V.UNAVAILABLE,"The operation could not be completed")))})),xr(f,Ur.EventType.MESSAGE,(C=>{var M;if(!w){const D=C.data[0];U(!!D,16349);const j=D,G=(j==null?void 0:j.error)||((M=j[0])==null?void 0:M.error);if(G){L(be,`RPC '${e}' stream ${s} received error:`,G);const X=G.status;let ee=(function(I){const g=fe[I];if(g!==void 0)return Ad(g)})(X),he=G.message;X==="NOT_FOUND"&&he.includes("database")&&he.includes("does not exist")&&he.includes(this.databaseId.database)&&gt(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),ee===void 0&&(ee=V.INTERNAL,he="Unknown error status: "+X+" with message "+G.message),w=!0,S.en(new O(ee,he)),f.close()}else L(be,`RPC '${e}' stream ${s} received:`,D),S.tn(D)}})),Xn.rn(),setTimeout((()=>{S.Xt()}),0),S}terminate(){this.nn.forEach((e=>e.close())),this.nn=[]}En(e){this.nn.push(e)}hn(e){this.nn=this.nn.filter((t=>t===e))}kt(e,t,r){super.kt(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Qh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JE(n){return new Xn(n)}Xn.sn=!1;class Bd{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Tn=e,this.timerId=t,this.Pn=r,this.Rn=s,this.In=i,this.An=0,this.Vn=null,this.dn=Date.now(),this.reset()}reset(){this.An=0}fn(){this.An=this.In}mn(e){this.cancel();const t=Math.floor(this.An+this.pn()),r=Math.max(0,Date.now()-this.dn),s=Math.max(0,t-r);s>0&&L("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.An} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Vn=this.Tn.enqueueAfterDelay(this.timerId,s,(()=>(this.dn=Date.now(),e()))),this.An*=this.Rn,this.An<this.Pn&&(this.An=this.Pn),this.An>this.In&&(this.An=this.In)}gn(){this.Vn!==null&&(this.Vn.skipDelay(),this.Vn=null)}cancel(){this.Vn!==null&&(this.Vn.cancel(),this.Vn=null)}pn(){return(Math.random()-.5)*this.An}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rl="PersistentStream";class $d{constructor(e,t,r,s,i,a,c,l){this.Tn=e,this.yn=r,this.wn=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.bn=0,this.vn=null,this.Sn=null,this.stream=null,this.Dn=0,this.xn=new Bd(e,t)}Cn(){return this.state===1||this.state===5||this.Fn()}Fn(){return this.state===2||this.state===3}start(){this.Dn=0,this.state!==4?this.auth():this.On()}async stop(){this.Cn()&&await this.close(0)}Mn(){this.state=0,this.xn.reset()}Nn(){this.Fn()&&this.vn===null&&(this.vn=this.Tn.enqueueAfterDelay(this.yn,6e4,(()=>this.Ln())))}Bn(e){this.Un(),this.stream.send(e)}async Ln(){if(this.Fn())return this.close(0)}Un(){this.vn&&(this.vn.cancel(),this.vn=null)}kn(){this.Sn&&(this.Sn.cancel(),this.Sn=null)}async close(e,t){this.Un(),this.kn(),this.xn.cancel(),this.bn++,e!==4?this.xn.reset():t&&t.code===V.RESOURCE_EXHAUSTED?(Nt(t.toString()),Nt("Using maximum backoff delay to prevent overloading the backend."),this.xn.fn()):t&&t.code===V.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.qn(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Ht(t)}qn(){}auth(){this.state=1;const e=this.$n(this.bn),t=this.bn;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.bn===t&&this.Kn(r,s)}),(r=>{e((()=>{const s=new O(V.UNKNOWN,"Fetching auth token failed: "+r.message);return this.Wn(s)}))}))}Kn(e,t){const r=this.$n(this.bn);this.stream=this.Qn(e,t),this.stream.Qt((()=>{r((()=>this.listener.Qt()))})),this.stream.zt((()=>{r((()=>(this.state=2,this.Sn=this.Tn.enqueueAfterDelay(this.wn,1e4,(()=>(this.Fn()&&(this.state=3),Promise.resolve()))),this.listener.zt())))})),this.stream.Ht((s=>{r((()=>this.Wn(s)))})),this.stream.onMessage((s=>{r((()=>++this.Dn==1?this.Gn(s):this.onNext(s)))}))}On(){this.state=5,this.xn.mn((async()=>{this.state=0,this.start()}))}Wn(e){return L(Rl,`close with error: ${e}`),this.stream=null,this.close(4,e)}$n(e){return t=>{this.Tn.enqueueAndForget((()=>this.bn===e?t():(L(Rl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class XE extends $d{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}Qn(e,t){return this.connection.cn("Listen",e,t)}Gn(e){return this.onNext(e)}onNext(e){this.xn.reset();const t=xE(this.serializer,e),r=(function(i){if(!("targetChange"in i))return z.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?z.min():a.readTime?pt(a.readTime):z.min()})(e);return this.listener.zn(t,r)}jn(e){const t={};t.database=aa(this.serializer),t.addTarget=(function(i,a){let c;const l=a.target;if(c=wn(l)?{pipelineQuery:$E(i,l)}:Id(l)?{documents:ME(i,l)}:{query:UE(i,l).yt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=Vd(i,a.resumeToken);const h=ia(i,a.expectedCount);h!==null&&(c.expectedCount=h)}else if(a.snapshotVersion.compareTo(z.min())>0){c.readTime=Si(i,a.snapshotVersion.toTimestamp());const h=ia(i,a.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,e);const r=BE(this.serializer,e);r&&(t.labels=r),this.Bn(t)}Hn(e){const t={};t.database=aa(this.serializer),t.removeTarget=e,this.Bn(t)}}class ZE extends $d{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get Jn(){return this.Dn>0}start(){this.lastStreamToken=void 0,super.start()}qn(){this.Jn&&this.Yn([])}Qn(e,t){return this.connection.cn("Write",e,t)}Gn(e){return U(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,U(!e.writeResults||e.writeResults.length===0,55816),this.listener.Zn()}onNext(e){U(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.xn.reset();const t=LE(e.writeResults,e.commitTime),r=pt(e.commitTime);return this.listener.Xn(r,t)}er(){const e={};e.database=aa(this.serializer),this.Bn(e)}Yn(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>OE(this.serializer,r)))};this.Bn(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eT{}class tT extends eT{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.tr=!1}nr(){if(this.tr)throw new O(V.FAILED_PRECONDITION,"The client has already been terminated.")}Bt(e,t,r,s){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.Bt(e,oa(t,r),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new O(V.UNKNOWN,i.toString())}))}$t(e,t,r,s,i){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,c])=>this.connection.$t(e,oa(t,r),s,a,c,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new O(V.UNKNOWN,a.toString())}))}terminate(){this.tr=!0,this.connection.terminate()}}function nT(n,e,t,r){return new tT(n,e,t,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rT="ComponentProvider",Pl=new Map;function sT(n,e,t,r,s){return new Gy(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Fd(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sl={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},qd=41943040;class Fe{static withCacheSize(e){return new Fe(e,Fe.DEFAULT_COLLECTION_PERCENTILE,Fe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}Fe.DEFAULT_COLLECTION_PERCENTILE=10,Fe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Fe.DEFAULT=new Fe(qd,Fe.DEFAULT_COLLECTION_PERCENTILE,Fe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Fe.DISABLED=new Fe(-1,0,0);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bl="LruGarbageCollector",jd=1048576;function Cl([n,e],[t,r]){const s=Q(n,t);return s===0?Q(e,r):s}class iT{constructor(e){this.rr=e,this.buffer=new ge(Cl),this.ir=0}sr(){return++this.ir}_r(e){const t=[e,this.sr()];if(this.buffer.size<this.rr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Cl(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class oT{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.ur(6e4)}stop(){this.ar&&(this.ar.cancel(),this.ar=null)}get started(){return this.ar!==null}ur(e){L(bl,`Garbage collection scheduled in ${e}ms`),this.ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){lr(t)?L(bl,"Ignoring IndexedDB error during garbage collection: ",t):await ur(t)}await this.ur(3e5)}))}}class aT{constructor(e,t){this.cr=e,this.params=t}calculateTargetCount(e,t){return this.cr.lr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return N.resolve(Bi.ce);const r=new iT(t);return this.cr.forEachTarget(e,(s=>r._r(s.sequenceNumber))).next((()=>this.cr.Er(e,(s=>r._r(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.cr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.cr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(L("LruGarbageCollector","Garbage collection skipped; disabled"),N.resolve(Sl)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(L("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Sl):this.hr(e,t)))}getCacheSize(e){return this.cr.getCacheSize(e)}hr(e,t){let r,s,i,a,c,l,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((m=>(m>this.params.maximumSequenceNumbersToCollect?(L("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,a=Date.now(),this.nthSequenceNumber(e,s)))).next((m=>(r=m,c=Date.now(),this.removeTargets(e,r,t)))).next((m=>(i=m,l=Date.now(),this.removeOrphanedDocuments(e,r)))).next((m=>(h=Date.now(),Hn()<=Y.DEBUG&&L("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${m} documents in `+(h-l)+`ms
Total Duration: ${h-f}ms`),N.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m}))))}}function cT(n,e){return new aT(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uT="firestore.googleapis.com",Vl=!0;class Nl{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new O(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=uT,this.ssl=Vl}else this.host=e.host,this.ssl=e.ssl??Vl;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=qd;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<jd)throw new O(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}xy("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Fd(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new O(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new O(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new O(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ja{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Nl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new O(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new O(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Nl(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new Ry;switch(r.type){case"firstParty":return new by(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new O(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=Pl.get(t);r&&(L(rT,"Removing Datastore"),Pl.delete(t),r.terminate())})(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new hr(this.firestore,e,this._query)}}class ce{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Yt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ce(this.firestore,e,this._key)}toJSON(){return{type:ce._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Ts(t,ce._jsonSchema))return new ce(e,r||null,new F(Z.fromString(t.referencePath)))}}ce._jsonSchemaVersion="firestore/documentReference/1.0",ce._jsonSchema={type:me("string",ce._jsonSchemaVersion),referencePath:me("string")};class Yt extends hr{constructor(e,t,r){super(e,t,Ma(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ce(this.firestore,null,new F(e))}withConverter(e){return new Yt(this.firestore,e,this._path)}}function LA(n,e,...t){if(n=oe(n),Jh("collection","path",e),n instanceof ja){const r=Z.fromString(e,...t);return nl(r),new Yt(n,null,r)}{if(!(n instanceof ce||n instanceof Yt))throw new O(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Z.fromString(e,...t));return nl(r),new Yt(n.firestore,null,r)}}function lT(n,e,...t){if(n=oe(n),arguments.length===1&&(e=Na.newId()),Jh("doc","path",e),n instanceof ja){const r=Z.fromString(e,...t);return tl(r),new ce(n,null,new F(r))}{if(!(n instanceof ce||n instanceof Yt))throw new O(V.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Z.fromString(e,...t));return tl(r),new ce(n.firestore,n instanceof Yt?n.converter:null,new F(r))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:qe._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Ts(e,qe._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new qe(e.vectorValues);throw new O(V.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}qe._jsonSchemaVersion="firestore/vectorValue/1.0",qe._jsonSchema={type:me("string",qe._jsonSchemaVersion),vectorValues:me("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hT=/^__.*__$/;class dT{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new fn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Is(e,this.data,t,this.fieldTransforms)}}class zd{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new fn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Hd(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw B(40011,{dataSource:n})}}class za{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new za({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Ci(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(Hd(this.dataSource)&&hT.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class fT{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Gi(e)}createContext(e,t,r,s=!1){return new za({dataSource:e,methodName:t,targetDoc:r,path:Te.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Qi(n){const e=n._freezeSettings(),t=Gi(n._databaseId);return new fT(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Wd(n,e,t,r,s,i={}){const a=n.createContext(i.merge||i.mergeFields?2:0,e,t,s);Ha("Data must be an object, but it was:",a,r);const c=Gd(r,a);let l,h;if(i.merge)l=new Ke(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const m of i.mergeFields){const w=Dn(e,m,t);if(!a.contains(w))throw new O(V.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);Yd(f,w)||f.push(w)}l=new Ke(f),h=a.fieldTransforms.filter((m=>l.covers(m.field)))}else l=null,h=a.fieldTransforms;return new dT(new Le(c),l,h)}class Yi extends qa{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Yi}}function pT(n,e,t,r){const s=n.createContext(1,e,t);Ha("Data must be an object, but it was:",s,r);const i=[],a=Le.empty();dn(r,((l,h)=>{const f=Qd(e,l,t);h=oe(h);const m=s.childContextForFieldPath(f);if(h instanceof Yi)i.push(f);else{const w=sn(h,m);w!=null&&(i.push(f),a.set(f,w))}}));const c=new Ke(i);return new zd(a,c,s.fieldTransforms)}function mT(n,e,t,r,s,i){const a=n.createContext(1,e,t),c=[Dn(e,r,t)],l=[s];if(i.length%2!=0)throw new O(V.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let w=0;w<i.length;w+=2)c.push(Dn(e,i[w])),l.push(i[w+1]);const h=[],f=Le.empty();for(let w=c.length-1;w>=0;--w)if(!Yd(h,c[w])){const S=c[w];let C=l[w];C=oe(C);const M=a.childContextForFieldPath(S);if(C instanceof Yi)h.push(S);else{const D=sn(C,M);D!=null&&(h.push(S),f.set(S,D))}}const m=new Ke(h);return new zd(f,m,a.fieldTransforms)}function gT(n,e,t,r=!1){return sn(t,n.createContext(r?4:3,e))}function sn(n,e,t){if(Kd(n=oe(n)))return Ha("Unsupported field value:",e,n),Gd(n,e);if(n instanceof qa)return(function(s,i){if(!Hd(i.dataSource))throw i.createError(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${s._methodName}() is not currently supported inside arrays`);const a=s._toFieldTransform(i);a&&i.fieldTransforms.push(a)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return(function(s,i){const a=[];let c=0;for(const l of s){let h=sn(l,i.childContextForArray(c));h==null&&(h={nullValue:"NULL_VALUE"}),a.push(h),c++}return{arrayValue:{values:a}}})(n,e)}return(function(s,i,a){if((s=oe(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return xa(i.serializer,s,a);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const c=re.fromDate(s);return{timestampValue:Si(i.serializer,c)}}if(s instanceof re){const c=new re(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:Si(i.serializer,c)}}if(s instanceof mt)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof Xe)return{bytesValue:Vd(i.serializer,s._byteString)};if(s instanceof ce){const c=i.databaseId,l=s.firestore._databaseId;if(!l.isEqual(c))throw i.createError(`Document reference is for database ${l.projectId}/${l.database} but should be for database ${c.projectId}/${c.database}`);return{referenceValue:$a(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof qe)return(function(l,h){const f=l instanceof qe?l.toArray():l;return{mapValue:{fields:{[id]:{stringValue:od},[ns]:{arrayValue:{values:f.map((w=>{if(typeof w!="number")throw h.createError("VectorValues must only contain numeric values.");return ji(h.serializer,w)}))}}}}}})(s,i);if(Md(s))return s._toProto(i.serializer);throw i.createError(`Unsupported field value: ${Fi(s)}`)})(n,e,t)}function Gd(n,e){const t={};return Zh(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):dn(n,((r,s)=>{const i=sn(s,e.childContextForField(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function Kd(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof re||n instanceof mt||n instanceof Xe||n instanceof ce||n instanceof qa||n instanceof qe||Md(n))}function Ha(n,e,t){if(!Kd(t)||!Es(t)){const r=Fi(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function Dn(n,e,t){if((e=oe(e))instanceof Ki)return e._internalPath;if(typeof e=="string")return Qd(n,e);throw Ci("Field path arguments must be of type string or ",n,!1,void 0,t)}const _T=new RegExp("[~\\*/\\[\\]]");function Qd(n,e,t){if(e.search(_T)>=0)throw Ci(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ki(...e.split("."))._internalPath}catch{throw Ci(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Ci(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${r}`),a&&(l+=` in document ${s}`),l+=")"),new O(V.INVALID_ARGUMENT,c+n+l)}function Yd(n,e){return n.some((t=>t.isEqual(e)))}function Jd(n){return typeof n._readUserData=="function"}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){const r=Le.empty();for(const s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){const i=this.optionDefinitions[s];if(s in e){const a=e[s];let c;i.nestedOptions&&Es(a)?c={mapValue:{fields:new Ne(i.nestedOptions).getOptionsProto(t,a)}}:a&&(c=sn(a,t)??void 0),c&&r.set(Te.fromServerFormat(i.serverName),c)}}return r}getOptionsProto(e,t,r){const s=this._getKnownOptions(t,e);if(r){const i=new Map(Hy(r,((a,c)=>[Te.fromServerFormat(c),a!==void 0?sn(a,e):null])));s.setAll(i)}return s.value.mapValue.fields??{}}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yT(n){return typeof n=="object"&&n!==null&&!!("nullValue"in n&&(n.nullValue===null||n.nullValue==="NULL_VALUE")||"booleanValue"in n&&(n.booleanValue===null||typeof n.booleanValue=="boolean")||"integerValue"in n&&(n.integerValue===null||typeof n.integerValue=="number"||typeof n.integerValue=="string")||"doubleValue"in n&&(n.doubleValue===null||typeof n.doubleValue=="number")||"timestampValue"in n&&(n.timestampValue===null||(function(t){return typeof t=="object"&&t!==null&&"seconds"in t&&(t.seconds===null||typeof t.seconds=="number"||typeof t.seconds=="string")&&"nanos"in t&&(t.nanos===null||typeof t.nanos=="number")})(n.timestampValue))||"stringValue"in n&&(n.stringValue===null||typeof n.stringValue=="string")||"bytesValue"in n&&(n.bytesValue===null||n.bytesValue instanceof Uint8Array)||"referenceValue"in n&&(n.referenceValue===null||typeof n.referenceValue=="string")||"geoPointValue"in n&&(n.geoPointValue===null||(function(t){return typeof t=="object"&&t!==null&&"latitude"in t&&(t.latitude===null||typeof t.latitude=="number")&&"longitude"in t&&(t.longitude===null||typeof t.longitude=="number")})(n.geoPointValue))||"arrayValue"in n&&(n.arrayValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("values"in t)||t.values!==null&&!Array.isArray(t.values))})(n.arrayValue))||"mapValue"in n&&(n.mapValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("fields"in t)||t.fields!==null&&!Es(t.fields))})(n.mapValue))||"fieldReferenceValue"in n&&(n.fieldReferenceValue===null||typeof n.fieldReferenceValue=="string")||"functionValue"in n&&(n.functionValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("name"in t)||t.name!==null&&typeof t.name!="string"||!("args"in t)||t.args!==null&&!Array.isArray(t.args))})(n.functionValue))||"pipelineValue"in n&&(n.pipelineValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("stages"in t)||t.stages!==null&&!Array.isArray(t.stages))})(n.pipelineValue)))}function ET(n){return new qe(n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k(n){let e;return n instanceof Fn?n:(e=Es(n)?AT(n):n instanceof Array?RT(n):Xd(n,void 0),e)}function Bo(n){if(n instanceof Fn)return n;if(n instanceof qe)return cs(n);if(Array.isArray(n))return cs(ET(n));throw new Error("Unsupported value: "+typeof n)}function Wa(n){return qy(n)?ci(n):k(n)}class Fn{constructor(){this._protoValueType="ProtoValue"}add(e){return new b("add",[this,k(e)],"add")}asBoolean(){if(this instanceof on)return this;if(this instanceof fr)return new ef(this);if(this instanceof dr)return new vT(this);if(this instanceof b)return new Zd(this);throw new O("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new b("subtract",[this,k(e)],"subtract")}multiply(e){return new b("multiply",[this,k(e)],"multiply")}divide(e){return new b("divide",[this,k(e)],"divide")}mod(e){return new b("mod",[this,k(e)],"mod")}equal(e){return new b("equal",[this,k(e)],"equal").asBoolean()}notEqual(e){return new b("not_equal",[this,k(e)],"notEqual").asBoolean()}lessThan(e){return new b("less_than",[this,k(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new b("less_than_or_equal",[this,k(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new b("greater_than",[this,k(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new b("greater_than_or_equal",[this,k(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){const r=[e,...t].map((s=>k(s)));return new b("array_concat",[this,...r],"arrayConcat")}arrayContains(e){return new b("array_contains",[this,k(e)],"arrayContains").asBoolean()}arrayContainsAll(e){const t=Array.isArray(e)?new Br(e.map(k),"arrayContainsAll"):e;return new b("array_contains_all",[this,t],"arrayContainsAll").asBoolean()}arrayContainsAny(e){const t=Array.isArray(e)?new Br(e.map(k),"arrayContainsAny"):e;return new b("array_contains_any",[this,t],"arrayContainsAny").asBoolean()}arrayReverse(){return new b("array_reverse",[this])}arrayLength(){return new b("array_length",[this],"arrayLength")}equalAny(e){const t=Array.isArray(e)?new Br(e.map(k),"equalAny"):e;return new b("equal_any",[this,t],"equalAny").asBoolean()}notEqualAny(e){const t=Array.isArray(e)?new Br(e.map(k),"notEqualAny"):e;return new b("not_equal_any",[this,t],"notEqualAny").asBoolean()}exists(){return new b("exists",[this],"exists").asBoolean()}charLength(){return new b("char_length",[this],"charLength")}like(e){return new b("like",[this,k(e)],"like").asBoolean()}regexContains(e){return new b("regex_contains",[this,k(e)],"regexContains").asBoolean()}regexFind(e){return new b("regex_find",[this,k(e)],"regexFind")}regexFindAll(e){return new b("regex_find_all",[this,k(e)],"regexFindAll")}regexMatch(e){return new b("regex_match",[this,k(e)],"regexMatch").asBoolean()}stringContains(e){return new b("string_contains",[this,k(e)],"stringContains").asBoolean()}startsWith(e){return new b("starts_with",[this,k(e)],"startsWith").asBoolean()}endsWith(e){return new b("ends_with",[this,k(e)],"endsWith").asBoolean()}toLower(){return new b("to_lower",[this],"toLower")}toUpper(){return new b("to_upper",[this],"toUpper")}trim(e){const t=[this];return e&&t.push(k(e)),new b("trim",t,"trim")}ltrim(e){const t=[this];return e&&t.push(k(e)),new b("ltrim",t,"ltrim")}rtrim(e){const t=[this];return e&&t.push(k(e)),new b("rtrim",t,"rtrim")}type(){return new b("type",[this])}isType(e){return new b("is_type",[this,cs(e)],"isType").asBoolean()}stringConcat(e,...t){const r=[e,...t].map(k);return new b("string_concat",[this,...r],"stringConcat")}stringIndexOf(e){return new b("string_index_of",[this,k(e)],"stringIndexOf")}stringRepeat(e){return new b("string_repeat",[this,k(e)],"stringRepeat")}stringReplaceAll(e,t){return new b("string_replace_all",[this,k(e),k(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new b("string_replace_one",[this,k(e),k(t)],"stringReplaceOne")}concat(e,...t){const r=[e,...t].map(k);return new b("concat",[this,...r],"concat")}reverse(){return new b("reverse",[this],"reverse")}arrayFilter(e,t){return new b("array_filter",[this,k(e),t],"arrayFilter")}arrayTransform(e,t){return new b("array_transform",[this,k(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,r){return new b("array_transform",[this,k(e),k(t),r],"arrayTransformWithIndex")}arraySlice(e,t){const r=[this,k(e)];return t!==void 0&&r.push(k(t)),new b("array_slice",r,"arraySlice")}arrayFirst(){return new b("array_first",[this],"arrayFirst")}arrayFirstN(e){return new b("array_first_n",[this,k(e)],"arrayFirstN")}arrayLast(){return new b("array_last",[this],"arrayLast")}arrayLastN(e){return new b("array_last_n",[this,k(e)],"arrayLastN")}arrayMaximum(){return new b("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new b("maximum_n",[this,k(e)],"arrayMaximumN")}arrayMinimum(){return new b("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new b("minimum_n",[this,k(e)],"arrayMinimumN")}arrayIndexOf(e){return new b("array_index_of",[this,k(e),k("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new b("array_index_of",[this,k(e),k("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new b("array_index_of_all",[this,k(e)],"arrayIndexOfAll")}byteLength(){return new b("byte_length",[this],"byteLength")}ceil(){return new b("ceil",[this])}floor(){return new b("floor",[this])}abs(){return new b("abs",[this])}exp(){return new b("exp",[this])}mapGet(e){return new b("map_get",[this,cs(e)],"mapGet")}mapSet(e,t,...r){const s=[this,k(e),k(t),...r.map(k)];return new b("map_set",s,"mapSet")}mapKeys(){return new b("map_keys",[this],"mapKeys")}mapValues(){return new b("map_values",[this],"mapValues")}mapEntries(){return new b("map_entries",[this],"mapEntries")}getField(e){return new b("get_field",[this,k(e)],"get_field")}count(){return Ge._create("count",[this],"count")}sum(){return Ge._create("sum",[this],"sum")}average(){return Ge._create("average",[this],"average")}minimum(){return Ge._create("minimum",[this],"minimum")}maximum(){return Ge._create("maximum",[this],"maximum")}first(){return Ge._create("first",[this],"first")}last(){return Ge._create("last",[this],"last")}arrayAgg(){return Ge._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return Ge._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return Ge._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){const r=[e,...t];return new b("maximum",[this,...r.map(k)],"logicalMaximum")}logicalMinimum(e,...t){const r=[e,...t];return new b("minimum",[this,...r.map(k)],"minimum")}vectorLength(){return new b("vector_length",[this],"vectorLength")}cosineDistance(e){return new b("cosine_distance",[this,Bo(e)],"cosineDistance")}dotProduct(e){return new b("dot_product",[this,Bo(e)],"dotProduct")}euclideanDistance(e){return new b("euclidean_distance",[this,Bo(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new b("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new b("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new b("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new b("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new b("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new b("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new b("timestamp_add",[this,k(e),k(t)],"timestampAdd")}timestampSubtract(e,t){return new b("timestamp_subtract",[this,k(e),k(t)],"timestampSubtract")}timestampDiff(e,t){return new b("timestamp_diff",[this,Wa(e),k(t)],"timestampDiff")}timestampExtract(e,t){const r=[this,k(e)];return t&&r.push(k(t)),new b("timestamp_extract",r,"timestampExtract")}documentId(){return new b("document_id",[this],"documentId")}parent(){return new b("parent",[this],"parent")}substring(e,t){const r=k(e);return new b("substring",t===void 0?[this,r]:[this,r,k(t)],"substring")}arrayGet(e){return new b("array_get",[this,k(e)],"arrayGet")}isError(){return new b("is_error",[this],"isError").asBoolean()}ifError(e){const t=new b("if_error",[this,k(e)],"ifError");return e instanceof on?t.asBoolean():t}isAbsent(){return new b("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new b("map_remove",[this,k(e)],"mapRemove")}mapMerge(e,...t){const r=k(e),s=t.map(k);return new b("map_merge",[this,r,...s],"mapMerge")}pow(e){return new b("pow",[this,k(e)])}trunc(e){return e===void 0?new b("trunc",[this]):new b("trunc",[this,k(e)],"trunc")}round(e){return e===void 0?new b("round",[this]):new b("round",[this,k(e)],"round")}collectionId(){return new b("collection_id",[this])}length(){return new b("length",[this])}ln(){return new b("ln",[this])}sqrt(){return new b("sqrt",[this])}stringReverse(){return new b("string_reverse",[this])}ifAbsent(e){return new b("if_absent",[this,k(e)],"ifAbsent")}ifNull(e){return new b("if_null",[this,k(e)],"ifNull")}coalesce(e,...t){return new b("coalesce",[this,k(e),...t.map(k)],"coalesce")}join(e){return new b("join",[this,k(e)],"join")}log10(){return new b("log10",[this])}arraySum(){return new b("sum",[this])}split(e){return new b("split",[this,k(e)])}timestampTruncate(e,t){const r=[this,k(e)];return t&&r.push(k(t)),new b("timestamp_trunc",r)}ascending(){return PT(this)}descending(){return ST(this)}as(e){return new wT(this,e,"as")}}class Ge{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,r){const s=new Ge(e,t);return s._methodName=r,s}as(e){return new TT(this,e,"as")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map((t=>t._toProto(e)))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e)))}}class TT{constructor(e,t,r){this.aggregate=e,this.alias=t,this._methodName=r}_readUserData(e){this.aggregate._readUserData(e)}}class wT{constructor(e,t,r){this.expr=e,this.alias=t,this._methodName=r,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}}class Br extends Fn{constructor(e,t){super(),this.Rr=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.Rr.map((t=>t._toProto(e)))}}}_readUserData(e){this.Rr.forEach((t=>t._readUserData(e)))}}class dr extends Fn{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new b("geo_distance",[this,k(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}}function ci(n){return IT(n,"field")}function IT(n,e){return new dr(typeof n=="string"?ct===n?WE()._internalPath:Dn("field",n):n._internalPath,e)}class fr extends Fn{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){const t=new fr(e,void 0);return t._protoValue=e,t}_toProto(e){return U(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,yT(this._protoValue)||(this._protoValue=sn(this.value,e))}}function cs(n,e){return Xd(n,"constant")}function Xd(n,e){const t=new fr(n,e);return typeof n=="boolean"?new ef(t):t}class b extends Fn{constructor(e,t,r,s){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,r!==void 0&&(this._methodName=r),s!==void 0&&(this._options=s)}get _optionsUtil(){return new Ne({})}_toProto(e){const t={functionValue:{name:this.name,args:this.params.map((r=>r._toProto(e)))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e))),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}}class on extends Fn{get _methodName(){return this._expr._methodName}countIf(){return Ge._create("count_if",[this],"countIf")}not(){return new b("not",[this],"not").asBoolean()}conditional(e,t){return new b("conditional",[this,e,t],"conditional")}ifError(e){const t=k(e),r=new b("if_error",[this,t],"ifError");return t instanceof on?r.asBoolean():r}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}}class Zd extends on{constructor(e){super(),this._expr=e,this.expressionType="Function"}}class ef extends on{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}}class vT extends on{constructor(e){super(),this._expr=e,this.expressionType="Field"}}function AT(n,e){const t=[];for(const r in n)if(Object.prototype.hasOwnProperty.call(n,r)){const s=n[r];t.push(cs(r)),t.push(k(s))}return new b("map",t,"map")}function RT(n){return(function(t,r){return new b("array",t.map((s=>k(s))),r)})(n,"array")}function PT(n){return new tf(Wa(n),"ascending","ascending")}function ST(n){return new tf(Wa(n),"descending","descending")}class tf{constructor(e,t,r){this.expr=e,this.direction=t,this._methodName=r,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:Ud(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=e}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}}class nf extends Je{get _name(){return"add_fields"}get _optionsUtil(){return new Ne({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[as(e,this.fields)]}}_readUserData(e){super._readUserData(e),an(this.fields,e)}}class rf extends Je{get _name(){return"aggregate"}get _optionsUtil(){return new Ne({})}constructor(e,t,r){super(r),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[as(e,this.accumulators),as(e,this.groups)]}}_readUserData(e){super._readUserData(e),an(this.groups,e),an(this.accumulators,e)}}class sf extends Je{get _name(){return"distinct"}get _optionsUtil(){return new Ne({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[as(e,this.groups)]}}_readUserData(e){super._readUserData(e),an(this.groups,e)}}class Ji extends Je{get _name(){return"collection"}get _optionsUtil(){return new Ne({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.Vr=e.startsWith("/")?e:"/"+e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.Vr}]}}_readUserData(e){super._readUserData(e)}}class Xi extends Je{get _name(){return"collection_group"}get _optionsUtil(){return new Ne({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}}class Ga extends Je{get _name(){return"database"}get _optionsUtil(){return new Ne({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}}class Ka extends Je{get _name(){return"documents"}get _optionsUtil(){return new Ne({})}constructor(e,t){if(super(t),!e||e.length===0)throw new O(V.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");const r=e.map((i=>i.startsWith("/")?i:"/"+i)),s=new Set(r);if(s.size!==r.length)throw new O(V.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.dr=r,this.mr=s}_toProto(e){return{...super._toProto(e),args:this.dr.map((t=>({referenceValue:t})))}}_readUserData(e){super._readUserData(e)}}class Zi extends Je{get _name(){return"where"}get _optionsUtil(){return new Ne({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),an(this.condition,e)}}class xn extends Je{get _name(){return"limit"}get _optionsUtil(){return new Ne({})}constructor(e,t){U(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[xa(e,this.limit)]}}}class kl extends Je{get _name(){return"offset"}get _optionsUtil(){return new Ne({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[xa(e,this.offset)]}}}class bT extends Je{get _name(){return"select"}get _optionsUtil(){return new Ne({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[as(e,this.selections)]}}_readUserData(e){super._readUserData(e),an(this.selections,e)}}class At extends Je{get _name(){return"sort"}get _optionsUtil(){return new Ne({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map((t=>t._toProto(e)))}}_readUserData(e){super._readUserData(e),an(this.orderings,e)}}class Qa extends Je{get _name(){return"replace_with"}get _optionsUtil(){return new Ne({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),Ud(Qa.pr)]}}_readUserData(e){super._readUserData(e),an(this.map,e)}}Qa.pr="full_replace";function an(n,e){return Jd(n)?n._readUserData(e):Array.isArray(n)?n.forEach((t=>t._readUserData(e))):n instanceof Map?n.forEach((t=>t._readUserData(e))):Object.values(n).forEach((t=>t._readUserData(e))),n}// Copyright 2024 Google LLC* @license
class Oe{constructor(e,t,r){this.serializer=e,this.stages=t,this.listenOptions=r,this.isCorePipeline=!0}getPipelineCollection(){return eo(this)}getPipelineCollectionGroup(){return Ya(this)}getPipelineCollectionId(){return CT(this)}getPipelineDocuments(){return ua(this)}getPipelineFlavor(){return(function(t){let r="exact";return t.stages.forEach(((s,i)=>{s._name!==sf.name&&s._name!==rf.name||(r="keyless"),s._name===bT.name&&r==="exact"&&(r="augmented"),s._name===nf.name&&i<t.stages.length-1&&r==="exact"&&(r="augmented")})),r})(this)}getPipelineSourceType(){return Jt(this)}}function Jt(n){const e=n.stages[0];return e instanceof Ji||e instanceof Xi||e instanceof Ga||e instanceof Ka?e._name:"unknown"}function eo(n){if(Jt(n)==="collection")return n.stages[0].Vr}function Ya(n){if(Jt(n)==="collection_group")return n.stages[0].collectionId}function CT(n){switch(Jt(n)){case"collection":return Z.fromString(eo(n)).lastSegment();case"collection_group":return Ya(n);default:return}}function ua(n){if(Jt(n)==="documents")return n.stages[0].dr}class Kr{constructor(e,t,r,s){this._db=e,this.userDataReader=t,this._userDataWriter=r,this.stages=s}wr(e,t){const r=this.userDataReader.createContext(3,e);return Jd(t)?t._readUserData(r):Array.isArray(t)?t.forEach((s=>s._readUserData(r))):t.forEach((s=>s._readUserData(r))),t}where(e){const t=this.stages.map((r=>r));return this.wr("where",e),t.push(new Zi(e,{})),new Kr(this._db,this.userDataReader,this._userDataWriter,t)}limit(e){const t=this.stages.map((r=>r));return t.push(new xn(e,{})),new Kr(this._db,this.userDataReader,this._userDataWriter,t)}sort(e,...t){const r=this.stages.map((s=>s));return"orderings"in e?r.push(new At(this.wr("sort",e.orderings),{})):r.push(new At(this.wr("sort",[e,...t]),{})),new Kr(this._db,this.userDataReader,this._userDataWriter,r)}br(e){return{pipeline:{stages:this.stages.map((t=>t._toProto(e)))}}}}// Copyright 2024 Google LLC* @license
class E{constructor(e,t){this.type=e,this.value=t}static vr(){return new E("ERROR",void 0)}static Sr(){return new E("UNSET",void 0)}static Dr(){return new E("NULL",rr)}static newValue(e){return Qe(e)?new E("NULL",rr):(function(r){return!!r&&"booleanValue"in r})(e)?new E("BOOLEAN",e):ut(e)?new E("INT",e):vn(e)?new E("DOUBLE",e):(function(r){return!!r&&"timestampValue"in r&&!!r.timestampValue})(e)?new E("TIMESTAMP",e):(function(r){return!!r&&"stringValue"in r})(e)?new E("STRING",e):(function(r){return!!r&&"bytesValue"in r})(e)?new E("BYTES",e):e.referenceValue?new E("REFERENCE",e):e.geoPointValue?new E("GEO_POINT",e):ir(e)?new E("ARRAY",e):Ti(e)?new E("VECTOR",e):An(e)?new E("MAP",e):new E("ERROR",void 0)}Cr(){return this.type==="ERROR"||this.type==="UNSET"}Fr(){return this.type==="NULL"}}function Qr(n){if(!n.Cr())return n.value}function of(n){return n instanceof on?n._expr:n}function $(n){if((n=of(n))instanceof dr)return new VT(n);if(n instanceof fr)return new NT(n);if(n instanceof Br)return new kT(n);if(n instanceof b){if(n.name==="add")return new OT(n);if(n.name==="subtract")return new LT(n);if(n.name==="multiply")return new MT(n);if(n.name==="divide")return new UT(n);if(n.name==="mod")return new FT(n);if(n.name==="and")return new BT(n);if(n.name==="equal")return new XT(n);if(n.name==="not_equal")return new ZT(n);if(n.name==="less_than")return new ew(n);if(n.name==="less_than_or_equal")return new tw(n);if(n.name==="greater_than")return new nw(n);if(n.name==="greater_than_or_equal")return new rw(n);if(n.name==="array_concat")return new sw(n);if(n.name==="array_reverse")return new iw(n);if(n.name==="array_contains")return new ow(n);if(n.name==="array_contains_all")return new aw(n);if(n.name==="array_contains_any")return new cw(n);if(n.name==="array_length")return new uw(n);if(n.name==="array_element")return new lw(n);if(n.name==="equal_any")return new af(n);if(n.name==="not_equal_any")return new qT(n);if(n.name==="is_nan")return new jT(n);if(n.name==="is_not_nan")return new zT(n);if(n.name==="is_null")return new HT(n);if(n.name==="is_not_null")return new WT(n);if(n.name==="is_error")return new GT(n);if(n.name==="exists")return new KT(n);if(n.name==="not")return new to(n);if(n.name==="or")return new $T(n);if(n.name==="xor")return new Ja(n);if(n.name==="conditional")return new QT(n);if(n.name==="maximum")return new YT(n);if(n.name==="minimum")return new JT(n);if(n.name==="reverse")return new hw(n);if(n.name==="replace_first")return new dw(n);if(n.name==="replace_all")return new fw(n);if(n.name==="char_length")return new pw(n);if(n.name==="byte_length")return new mw(n);if(n.name==="like")return new gw(n);if(n.name==="regex_contains")return new _w(n);if(n.name==="regex_match")return new yw(n);if(n.name==="string_contains")return new Ew(n);if(n.name==="starts_with")return new Tw(n);if(n.name==="ends_with")return new ww(n);if(n.name==="to_lower")return new Iw(n);if(n.name==="to_upper")return new vw(n);if(n.name==="trim")return new Aw(n);if(n.name==="string_concat")return new Rw(n);if(n.name==="map_get")return new Pw(n);if(n.name==="cosine_distance")return new Sw(n);if(n.name==="dot_product")return new bw(n);if(n.name==="euclidean_distance")return new Cw(n);if(n.name==="vector_length")return new Vw(n);if(n.name==="unix_micros_to_timestamp")return new Ow(n);if(n.name==="timestamp_to_unix_micros")return new Uw(n);if(n.name==="unix_millis_to_timestamp")return new Lw(n);if(n.name==="timestamp_to_unix_millis")return new Fw(n);if(n.name==="unix_seconds_to_timestamp")return new Mw(n);if(n.name==="timestamp_to_unix_seconds")return new Bw(n);if(n.name==="timestamp_add")return new $w(n);if(n.name==="timestamp_subtract")return new qw(n)}throw new Error(`Unknown Expr : ${n}`)}class VT{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===ct)return E.newValue({referenceValue:bi(e.serializer,t.key)});if(this.expr.fieldName==="__update_time__")return E.newValue({timestampValue:ai(e.serializer,t.version)});if(this.expr.fieldName==="__create_time__")return E.newValue({timestampValue:ai(e.serializer,t.createTime)});const r=t.data.field(this.expr._fieldPath);return r?qi(r)?E.newValue((function(i,a){if(i.serverTimestampBehavior==="estimate")return{timestampValue:ai(i.serializer,z.fromTimestamp(nr(a)))};if(i.serverTimestampBehavior==="previous"){const c=ws(a);if(c)return c}return{nullValue:"NULL_VALUE"}})(e,r)):E.newValue(r):E.Sr()}}class NT{constructor(e){this.expr=e}evaluate(e,t){return E.newValue(this.expr._getValue())}}class kT{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.Rr.map((s=>$(s).evaluate(e,t)));return r.some((s=>s.Cr()))?E.vr():E.newValue({arrayValue:{values:r.map((s=>s.value))}})}}function Pe(n){return vn(n)?Number(n.doubleValue):Number(n.integerValue)}function yt(n){return BigInt(n.integerValue)}const DT=BigInt("0x7fffffffffffffff"),xT=-BigInt("0x8000000000000000");class Ps{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length>=2,24778);const r=$(this.expr.params[0]).evaluate(e,t),s=$(this.expr.params[1]).evaluate(e,t);let i=this.Or(r,s);for(const a of this.expr.params.slice(2)){const c=$(a).evaluate(e,t);i=this.Or(i,c)}return i}Or(e,t){if(e.Cr()||t.Cr())return E.vr();if(e.Fr()||t.Fr())return E.Dr();const r=e.value,s=t.value;if(!vn(r)&&!ut(r)||!vn(s)&&!ut(s))return E.vr();if(vn(r)||vn(s)){const i=this.Mr(r,s);return i?E.newValue(i):E.vr()}if(ut(r)&&ut(s)){const i=this.Nr(r,s);return i===void 0?E.vr():typeof i=="number"?E.newValue({doubleValue:i}):i<xT||i>DT?E.vr():E.newValue({integerValue:`${i}`})}return E.vr()}}function kt(n,e){return ye(n)!==ye(e)?"TYPE_MISMATCH":He(n)||He(e)?"NOT_EQ":Qe(n)&&Qe(e)?"EQ":Qe(n)||Qe(e)?"NULL":ir(n)&&ir(e)?(function(r,s){var a,c,l;if(((a=r.values)==null?void 0:a.length)!==((c=s.values)==null?void 0:c.length))return"NOT_EQ";let i=!1;for(let h=0;h<(((l=r.values)==null?void 0:l.length)??0);h++){const f=r.values[h],m=s.values[h];switch(kt(f,m)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:B(44609,{Lr:f,Br:m})}}return i?"NULL":"EQ"})(n.arrayValue,e.arrayValue):Ti(n)&&Ti(e)||An(n)&&An(e)?(function(r,s){const i=r.fields||{},a=s.fields||{};if(yi(i)!==yi(a))return"NOT_EQ";let c=!1;for(const l in i)if(i.hasOwnProperty(l)){if(a[l]===void 0)return"NOT_EQ";switch(kt(i[l],a[l])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":c=!0}}return c?"NULL":"EQ"})(n.mapValue,e.mapValue):(function(r,s){return tt(r,s,{Te:!1,Ee:!0,he:!0})})(n,e)?"EQ":"NOT_EQ"}class OT extends Ps{Nr(e,t){return yt(e)+yt(t)}Mr(e,t){return{doubleValue:Pe(e)+Pe(t)}}}class LT extends Ps{constructor(e){super(e),this.expr=e}Nr(e,t){return yt(e)-yt(t)}Mr(e,t){return{doubleValue:Pe(e)-Pe(t)}}}class MT extends Ps{constructor(e){super(e),this.expr=e}Nr(e,t){return yt(e)*yt(t)}Mr(e,t){return{doubleValue:Pe(e)*Pe(t)}}}class UT extends Ps{constructor(e){super(e),this.expr=e}Nr(e,t){const r=yt(t);if(r!==BigInt(0))return yt(e)/r}Mr(e,t){const r=Pe(t);return r===0?{doubleValue:es(r)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:Pe(e)/r}}}class FT extends Ps{constructor(e){super(e),this.expr=e}Nr(e,t){const r=yt(t);if(r!==BigInt(0))return yt(e)%r}Mr(e,t){const r=Pe(t);if(r!==0)return{doubleValue:Pe(e)%r}}}class BT{constructor(e){this.expr=e}evaluate(e,t){var i;let r=!1,s=!1;for(const a of this.expr.params){const c=$(a).evaluate(e,t);switch(c.type){case"BOOLEAN":if(!((i=c.value)!=null&&i.booleanValue))return E.newValue(Ae);break;case"NULL":s=!0;break;default:r=!0}}return r?E.vr():s?E.Dr():E.newValue(je)}}class to{constructor(e){this.expr=e}evaluate(e,t){var s;U(this.expr.params.length===1,9634);const r=$(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return E.newValue({booleanValue:!((s=r.value)!=null&&s.booleanValue)});case"NULL":return E.Dr();default:return E.vr()}}}class $T{constructor(e){this.expr=e}evaluate(e,t){var i;let r=!1,s=!1;for(const a of this.expr.params){const c=$(a).evaluate(e,t);switch(c.type){case"BOOLEAN":if((i=c.value)!=null&&i.booleanValue)return E.newValue(je);break;case"NULL":s=!0;break;default:r=!0}}return r?E.vr():s?E.Dr():E.newValue(Ae)}}class Ja{constructor(e){this.expr=e}evaluate(e,t){var i;let r=!1,s=!1;for(const a of this.expr.params){const c=$(a).evaluate(e,t);switch(c.type){case"BOOLEAN":r=Ja.xor(r,!!((i=c.value)!=null&&i.booleanValue));break;case"NULL":s=!0;break;default:return E.vr()}}return s?E.Dr():E.newValue({booleanValue:r})}static xor(e,t){return(e||t)&&!(e&&t)}}class af{constructor(e){this.expr=e}evaluate(e,t){var a,c;U(this.expr.params.length===2,55094);let r=!1;const s=$(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":r=!0;break;case"ERROR":case"UNSET":return E.vr()}const i=$(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return E.vr()}if(r)return E.Dr();for(const l of((c=(a=i.value)==null?void 0:a.arrayValue)==null?void 0:c.values)??[])switch(Qe(s.value)&&Qe(l)?"EQ":kt(s.value,l)){case"EQ":return E.newValue(je);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:B(44608,{value:s.value,candidate:l})}return r?E.Dr():E.newValue(Ae)}}class qT{constructor(e){this.expr=e}evaluate(e,t){return new to(new b("not",[new b("equal_any",this.expr.params)])).evaluate(e,t)}}class jT{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,23322);const r=$(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return E.newValue(Ae);case"DOUBLE":return E.newValue({booleanValue:isNaN(Pe(r.value))});case"NULL":return E.Dr();default:return E.vr()}}}class zT{constructor(e){this.expr=e}evaluate(e,t){return U(this.expr.params.length===1,50406),new to(new b("not",[new b("is_nan",this.expr.params)])).evaluate(e,t)}}class HT{constructor(e){this.expr=e}evaluate(e,t){switch(U(this.expr.params.length===1,23123),$(this.expr.params[0]).evaluate(e,t).type){case"NULL":return E.newValue(je);case"UNSET":case"ERROR":return E.vr();default:return E.newValue(Ae)}}}class WT{constructor(e){this.expr=e}evaluate(e,t){return U(this.expr.params.length===1,23167),new to(new b("not",[new b("is_null",this.expr.params)])).evaluate(e,t)}}class GT{constructor(e){this.expr=e}evaluate(e,t){return U(this.expr.params.length===1,5228),$(this.expr.params[0]).evaluate(e,t).type==="ERROR"?E.newValue(je):E.newValue(Ae)}}class KT{constructor(e){this.expr=e}evaluate(e,t){switch(U(this.expr.params.length===1,6877),$(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return E.vr();case"UNSET":return E.newValue(Ae);default:return E.newValue(je)}}}class QT{constructor(e){this.expr=e}evaluate(e,t){var s;U(this.expr.params.length===3,11706);const r=$(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return(s=r.value)!=null&&s.booleanValue?$(this.expr.params[1]).evaluate(e,t):$(this.expr.params[2]).evaluate(e,t);case"NULL":return $(this.expr.params[2]).evaluate(e,t);default:return E.vr()}}}class YT{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map((i=>$(i).evaluate(e,t)));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||ze(i.value,s.value)>0?i:s}return s===void 0?E.Dr():s}}class JT{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map((i=>$(i).evaluate(e,t)));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||ze(i.value,s.value)<0?i:s}return s===void 0?E.Dr():s}}class pr{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);const r=$(this.expr.params[0]).evaluate(e,t);switch(r.type){case"ERROR":case"UNSET":return E.vr()}const s=$(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ERROR":case"UNSET":return E.vr()}return this.Ur(r,s)}}class XT extends pr{constructor(e){super(e),this.expr=e}Ur(e,t){if(e.Fr()&&t.Fr())return E.newValue(je);if(e.Fr()||t.Fr()||He(e.value)||He(t.value)||ye(e.value)!==ye(t.value))return E.newValue(Ae);switch(kt(e.value,t.value)){case"EQ":return E.newValue(je);case"NOT_EQ":return E.newValue(Ae);case"NULL":return E.Dr();default:B(44615,{left:e,right:t})}}}class ZT extends pr{constructor(e){super(e),this.expr=e}Ur(e,t){switch(kt(e.value,t.value)){case"EQ":return E.newValue(Ae);case"NOT_EQ":case"TYPE_MISMATCH":return E.newValue(je);case"NULL":return E.Dr();default:B(44614,{left:e,right:t})}}}class ew extends pr{constructor(e){super(e),this.expr=e}Ur(e,t){return ye(e.value)!==ye(t.value)||He(e.value)||He(t.value)?E.newValue(Ae):E.newValue({booleanValue:ze(e.value,t.value)<0})}}class tw extends pr{constructor(e){super(e),this.expr=e}Ur(e,t){return ye(e.value)!==ye(t.value)||He(e.value)||He(t.value)?E.newValue(Ae):kt(e.value,t.value)==="EQ"?E.newValue(je):E.newValue({booleanValue:ze(e.value,t.value)<0})}}class nw extends pr{constructor(e){super(e),this.expr=e}Ur(e,t){return ye(e.value)!==ye(t.value)||He(e.value)||He(t.value)?E.newValue(Ae):E.newValue({booleanValue:ze(e.value,t.value)>0})}}class rw extends pr{constructor(e){super(e),this.expr=e}Ur(e,t){return ye(e.value)!==ye(t.value)||He(e.value)||He(t.value)?E.newValue(Ae):kt(e.value,t.value)==="EQ"?E.newValue(je):E.newValue({booleanValue:ze(e.value,t.value)>0})}}class sw{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class iw{constructor(e){this.expr=e}evaluate(e,t){var s;U(this.expr.params.length===1,216);const r=$(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return E.Dr();case"ARRAY":{const i=((s=r.value.arrayValue)==null?void 0:s.values)??[];return E.newValue({arrayValue:{values:[...i].reverse()}})}default:return E.vr()}}}class ow{constructor(e){this.expr=e}evaluate(e,t){return U(this.expr.params.length===2,52884),new af(new b("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}}class aw{constructor(e){this.expr=e}evaluate(e,t){var l,h,f,m;U(this.expr.params.length===2,1392);let r=!1;const s=$(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return E.vr()}const i=$(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return E.vr()}if(r)return E.Dr();const a=((h=(l=i.value)==null?void 0:l.arrayValue)==null?void 0:h.values)??[],c=((m=(f=s.value)==null?void 0:f.arrayValue)==null?void 0:m.values)??[];for(const w of a){let S=!1;r=!1;for(const C of c){switch(Qe(w)&&Qe(C)?"EQ":kt(w,C)){case"EQ":S=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:B(44613,{value:C,search:w})}if(S)break}if(!S)return E.newValue(Ae)}return E.newValue(je)}}class cw{constructor(e){this.expr=e}evaluate(e,t){var l,h,f,m;U(this.expr.params.length===2,2680);let r=!1;const s=$(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return E.vr()}const i=$(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return E.vr()}if(r)return E.Dr();const a=((h=(l=i.value)==null?void 0:l.arrayValue)==null?void 0:h.values)??[],c=((m=(f=s.value)==null?void 0:f.arrayValue)==null?void 0:m.values)??[];for(const w of c)for(const S of a)switch(Qe(w)&&Qe(S)?"EQ":kt(w,S)){case"EQ":return E.newValue(je);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:B(44608,{value:w,search:S})}return r?E.Dr():E.newValue(Ae)}}class uw{constructor(e){this.expr=e}evaluate(e,t){var s,i,a;U(this.expr.params.length===1,38605);const r=$(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return E.Dr();case"ARRAY":return E.newValue({integerValue:`${((a=(i=(s=r.value)==null?void 0:s.arrayValue)==null?void 0:i.values)==null?void 0:a.length)??0}`});default:return E.vr()}}}class lw{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class hw{constructor(e){this.expr=e}evaluate(e,t){var s,i;U(this.expr.params.length===1,1508);const r=$(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return E.Dr();case"BYTES":{const a=(s=r.value)==null?void 0:s.bytesValue;if(typeof a=="string"){const c=_e.fromBase64String(a).toUint8Array();return c.reverse(),E.newValue({bytesValue:_e.fromUint8Array(c).toBase64()})}return E.newValue({bytesValue:new Uint8Array(a).reverse()})}case"STRING":{const a=(i=r.value)==null?void 0:i.stringValue,c=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(a),l=Array.from(c,(h=>h.segment)).reverse();return E.newValue({stringValue:l.join("")})}default:return E.vr()}}}class dw{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class fw{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class pw{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,19400);const r=$(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return E.Dr();case"STRING":{const s=(function(a){let c=0;for(let l=0;l<a.length;l++){const h=a.codePointAt(l);if(h===void 0)return;if(h<=65535)if(h>=55296&&h<=57343)if(h<=56319){const f=a.codePointAt(l+1);f!==void 0&&f>=56320&&f<=57343?(c+=1,l++):c+=1}else c+=1;else c+=1;else{if(!(h<=1114111))return;c+=1,l++}}return c})(r.value.stringValue);return s===void 0?E.vr():E.newValue({integerValue:s})}default:return E.vr()}}}class mw{constructor(e){this.expr=e}evaluate(e,t){var s,i;U(this.expr.params.length===1,8486);const r=$(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BYTES":{const a=(s=r.value)==null?void 0:s.bytesValue;return typeof a=="string"?E.newValue({integerValue:_e.fromBase64String(a).toUint8Array().length}):E.newValue({integerValue:new Uint8Array(a).length})}case"STRING":{const a=(function(l){let h=0;for(let f=0;f<l.length;f++){const m=l.codePointAt(f);if(m===void 0)return;if(m>=55296&&m<=57343){if(!(m<=56319))return;{const w=l.codePointAt(f+1);if(w===void 0||!(w>=56320&&w<=57343))return;h+=4,f++}}else if(m<=127)h+=1;else if(m<=2047)h+=2;else if(m<=65535)h+=3;else{if(!(m<=1114111))return;h+=4,f++}}return h})((i=r.value)==null?void 0:i.stringValue);return a===void 0?E.vr():E.newValue({integerValue:a})}case"NULL":return E.Dr();default:return E.vr()}}}class mr{constructor(e){this.expr=e}evaluate(e,t){var a,c;U(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let r=!1;const s=$(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":break;case"NULL":r=!0;break;default:return E.vr()}const i=$(this.expr.params[1]).evaluate(e,t);switch(i.type){case"STRING":break;case"NULL":r=!0;break;default:return E.vr()}return r?E.Dr():this.kr((a=s.value)==null?void 0:a.stringValue,(c=i.value)==null?void 0:c.stringValue)}}class gw extends mr{kr(e,t){try{const r=(function(a){let c="";for(let l=0;l<a.length;l++){const h=a.charAt(l);switch(h){case"_":c+=".";break;case"%":c+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":c+="\\"+h;break;default:c+=h}}return"^"+c+"$"})(t),s=_a.compile(r);return E.newValue({booleanValue:s.matches(e)})}catch(r){return gt(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${r}`),E.vr()}}}class _w extends mr{kr(e,t){try{const r=_a.compile(t);return E.newValue({booleanValue:r.matcher(e).find()})}catch{return gt(`Invalid regex pattern found in regex_contains: ${t}, returning error`),E.vr()}}}class yw extends mr{kr(e,t){try{return E.newValue({booleanValue:_a.compile(t).matches(e)})}catch{return gt(`Invalid regex pattern found in regex_match: ${t}, returning error`),E.vr()}}}class Ew extends mr{kr(e,t){return E.newValue({booleanValue:e.includes(t)})}}class Tw extends mr{kr(e,t){return E.newValue({booleanValue:e.startsWith(t)})}}class ww extends mr{kr(e,t){return E.newValue({booleanValue:e.endsWith(t)})}}class Iw{constructor(e){this.expr=e}evaluate(e,t){var s,i;U(this.expr.params.length===1,29079);const r=$(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return E.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.toLowerCase()});case"NULL":return E.Dr();default:return E.vr()}}}class vw{constructor(e){this.expr=e}evaluate(e,t){var s,i;U(this.expr.params.length===1,60487);const r=$(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return E.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.toUpperCase()});case"NULL":return E.Dr();default:return E.vr()}}}class Aw{constructor(e){this.expr=e}evaluate(e,t){var s,i;U(this.expr.params.length===1,28544);const r=$(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return E.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.trim()});case"NULL":return E.Dr();default:return E.vr()}}}class Rw{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map((a=>$(a).evaluate(e,t)));let s="",i=!1;for(const a of r)switch(a.type){case"STRING":s+=a.value.stringValue;break;case"NULL":i=!0;break;default:return E.vr()}return i?E.Dr():E.newValue({stringValue:s})}}class Pw{constructor(e){this.expr=e}evaluate(e,t){var a,c,l,h;U(this.expr.params.length===2,4483);const r=$(this.expr.params[0]).evaluate(e,t);switch(r.type){case"UNSET":return E.Sr();case"MAP":break;default:return E.vr()}const s=$(this.expr.params[1]).evaluate(e,t);if(s.type!=="STRING")return E.vr();const i=(h=(c=(a=r.value)==null?void 0:a.mapValue)==null?void 0:c.fields)==null?void 0:h[(l=s.value)==null?void 0:l.stringValue];return i===void 0?E.Sr():E.newValue(i)}}class Xa{constructor(e){this.expr=e}evaluate(e,t){var h,f;U(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let r=!1;const s=$(this.expr.params[0]).evaluate(e,t);switch(s.type){case"VECTOR":break;case"NULL":r=!0;break;default:return E.vr()}const i=$(this.expr.params[1]).evaluate(e,t);switch(i.type){case"VECTOR":break;case"NULL":r=!0;break;default:return E.vr()}if(r)return E.Dr();const a=ta(s.value),c=ta(i.value);if(a===void 0||c===void 0||((h=a.values)==null?void 0:h.length)!==((f=c.values)==null?void 0:f.length))return E.vr();const l=this.qr(a,c);return l===void 0||isNaN(l)?E.vr():E.newValue({doubleValue:l})}}class Sw extends Xa{qr(e,t){const r=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(r.length===0)return;let i=0,a=0,c=0;for(let h=0;h<r.length;h++){if(!rn(r[h])||!rn(s[h]))return;const f=Pe(r[h]),m=Pe(s[h]);i+=f*m,a+=f*f,c+=m*m}const l=Math.sqrt(a)*Math.sqrt(c);if(l!==0)return 1-Math.max(-1,Math.min(1,i/l))}}class bw extends Xa{qr(e,t){const r=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(r.length===0)return 0;let i=0;for(let a=0;a<r.length;a++){if(!rn(r[a])||!rn(s[a]))return;i+=Pe(r[a])*Pe(s[a])}return i}}class Cw extends Xa{qr(e,t){const r=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(r.length===0)return 0;let i=0;for(let a=0;a<r.length;a++){if(!rn(r[a])||!rn(s[a]))return;const c=Pe(r[a]),l=Pe(s[a]);i+=Math.pow(c-l,2)}return Math.sqrt(i)}}class Vw{constructor(e){this.expr=e}evaluate(e,t){var s;U(this.expr.params.length===1,39044);const r=$(this.expr.params[0]).evaluate(e,t);switch(r.type){case"VECTOR":{const i=ta(r.value);return E.newValue({integerValue:((s=i==null?void 0:i.values)==null?void 0:s.length)??0})}case"NULL":return E.Dr();default:return E.vr()}}}const us=BigInt(-62135596800),ls=BigInt(253402300799),Vi=BigInt(1e3),Xt=BigInt(1e6),Nw=us*Vi,kw=ls*Vi+BigInt(999),Dw=us*Xt,xw=ls*Xt+BigInt(999999);function Za(n){return n>=Dw&&n<=xw}function cf(n){return n>=us&&n<=ls}function hs(n,e){const t=BigInt(n);return!(t<us||t>ls)&&!(e<0||e>=1e9)&&(t!==us||e===0)&&!(t===ls&&e>999999999)}function uf(n,e){return e<0?{seconds:n-1,nanos:e+1e9}:{seconds:n,nanos:e}}function ec(n){return BigInt(n.seconds)*Xt+BigInt(Math.trunc(n.nanoseconds/1e3))}class tc{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);const r=$(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return this.toTimestamp(BigInt(r.value.integerValue));case"NULL":return E.Dr();default:return E.vr()}}}class Ow extends tc{toTimestamp(e){if(!Za(e))return E.vr();let t=Number(e/Xt),r=Number(e%Xt*BigInt(1e3));const s=uf(t,r);return t=s.seconds,r=s.nanos,hs(t,r)?E.newValue({timestampValue:{seconds:t,nanos:r}}):E.vr()}}class Lw extends tc{toTimestamp(e){if(!(function(a){return a>=Nw&&a<=kw})(e))return E.vr();let t=Number(e/Vi),r=Number(e%Vi*BigInt(1e6));const s=uf(t,r);return t=s.seconds,r=s.nanos,hs(t,r)?E.newValue({timestampValue:{seconds:t,nanos:r}}):E.vr()}}class Mw extends tc{toTimestamp(e){if(!cf(e))return E.vr();const t=Number(e);return E.newValue({timestampValue:{seconds:t,nanos:0}})}}class nc{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);const r=$(this.expr.params[0]).evaluate(e,t);switch(r.type){case"TIMESTAMP":break;case"NULL":return E.Dr();default:return E.vr()}const s=Ba(r.value.timestampValue);return hs(s.seconds,s.nanoseconds)?this.$r(s):E.vr()}}class Uw extends nc{$r(e){const t=ec(e);return Za(t)?E.newValue({integerValue:`${t.toString()}`}):E.vr()}}class Fw extends nc{$r(e){const t=ec(e),r=t/BigInt(1e3),s=t%BigInt(1e3);return r>BigInt(0)||s===BigInt(0)?E.newValue({integerValue:r.toString()}):E.newValue({integerValue:(r-BigInt(1)).toString()})}}class Bw extends nc{$r(e){const t=BigInt(e.seconds);return cf(t)?E.newValue({integerValue:t.toString()}):E.vr()}}class lf{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let r=!1;const s=$(this.expr.params[0]).evaluate(e,t);switch(s.type){case"TIMESTAMP":break;case"NULL":r=!0;break;default:return E.vr()}const i=$(this.expr.params[1]).evaluate(e,t);let a;switch(i.type){case"STRING":if(a=(function(G){switch(G){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}})(i.value.stringValue),a===void 0)return E.vr();break;case"NULL":r=!0;break;default:return E.vr()}const c=$(this.expr.params[2]).evaluate(e,t);switch(c.type){case"INT":break;case"NULL":r=!0;break;default:return E.vr()}if(r)return E.Dr();const l=BigInt(c.value.integerValue);let h;try{switch(a){case"microsecond":h=l;break;case"millisecond":h=l*BigInt(1e3);break;case"second":h=l*BigInt(1e6);break;case"minute":h=l*BigInt(6e7);break;case"hour":h=l*BigInt(36e8);break;case"day":h=l*BigInt(864e8);break;default:return E.vr()}if(a!=="microsecond"&&l!==BigInt(0)&&h/l!==BigInt(this.Kr(a)))return E.vr()}catch(j){return gt(`Error during timestamp arithmetic: ${j}`),E.vr()}const f=Ba(s.value.timestampValue);if(!hs(f.seconds,f.nanoseconds))return E.vr();const m=ec(f),w=this.Wr(m,h);if(!Za(w))return E.vr();const S=Number(w/Xt),C=w%Xt,M=Number((C<0?C+Xt:C)*BigInt(1e3)),D=C<0?S-1:S;return hs(D,M)?E.newValue({timestampValue:{seconds:D,nanos:M}}):E.vr()}Kr(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}}class $w extends lf{Wr(e,t){return e+t}}class qw extends lf{Wr(e,t){return e-t}}function ds(n){if((n=of(n))instanceof dr)return`fld(${n.fieldName})`;if(n instanceof fr)return`cst(${(function(t){return t===null?"null":typeof t=="number"?t.toString():typeof t=="string"?`"${t}"`:t instanceof ce?`ref(${t.path})`:t instanceof qe?`vec(${JSON.stringify(t)})`:JSON.stringify(t)})(n.value)})`;if(n instanceof b)return`fn(${n.name},[${n.params.map(ds).join(",")}])`;if(n.expressionType==="ListOfExpressions")return`list([${n.Rr.map(ds).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(n,null,2)}`)}function jw(n){if(n instanceof nf)return`${n._name}(${Ys(n.fields)})`;if(n instanceof rf){let e=`${n._name}(${Ys(n.accumulators)})`;return n.groups.size>0&&(e+=`grouping(${Ys(n.groups)})`),e}if(n instanceof sf)return`${n._name}(${Ys(n.groups)})`;if(n instanceof Ji)return`${n._name}(${n.Vr})`;if(n instanceof Xi)return`${n._name}(${n.collectionId})`;if(n instanceof Ga)return`${n._name}()`;if(n instanceof Ka)return`${n._name}(${n.dr.sort()})`;if(n instanceof Zi)return`${n._name}(${ds(n.condition)})`;if(n instanceof xn)return`${n._name}(${n.limit})`;if(n instanceof At)return`${n._name}(${(function(t){return t.map((r=>`${ds(r.expr)}${r.direction}`)).join(",")})(n.orderings)})`;throw new Error(`Unrecognized stage ${n._name}`)}function Ys(n){return`${Array.from(n.entries()).sort().map((([e,t])=>`${e}=${ds(t)}`)).join(",")}`}function bt(n){return n.stages.map((e=>jw(e))).join("|")}function hf(n,e){return bt(n)===bt(e)}function we(n){return n instanceof Oe}function Dl(n){return we(n)?bt(n):Wr(n)}function df(n){return we(n)?bt(n):(function(t){return`${Td(ft(t))}|lt:${t.limitType}`})(n)}function no(n,e){return n instanceof Oe&&e instanceof Oe?hf(n,e):!(n instanceof Oe&&!(e instanceof Oe)||!(n instanceof Oe)&&e instanceof Oe)&&_E(n,e)}function ff(n){return wn(n)?bt(n):Td(n)}function pf(n,e){return n instanceof Oe&&e instanceof Oe?hf(n,e):!(n instanceof Oe&&!(e instanceof Oe)||!(n instanceof Oe)&&e instanceof Oe)&&wd(n,e)}function zw(n,e){const t=(function(s){let i=!1;const a=[];for(const c of s)if(c instanceof At)if(i=!0,c.orderings.some((l=>l.expr instanceof dr&&l.expr.fieldName===ct)))a.push(c);else{const l=c.orderings.map((h=>h));l.push(ci(ct).ascending()),a.push(new At(l,{}))}else c instanceof xn&&(i||(a.push(new At([ci(ct).ascending()],{})),i=!0)),a.push(c);return i||a.push(new At([ci(ct).ascending()],{})),a})(n.stages);if(n.userDataReader){const r=n.userDataReader.createContext(3,"toCorePipeline");t.forEach((s=>s._readUserData(r)))}return new Oe(n.userDataReader.serializer,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hw{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&tE(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=zr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=zr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Sd();return this.mutations.forEach((s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(s.key)?null:c;const l=dd(a,c);l!==null&&r.set(s.key,l),a.isValidDocument()||a.convertToNoDocument(z.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),K())}isEqual(e){return this.batchId===e.batchId&&tr(this.mutations,e.mutations,((t,r)=>hl(t,r)))&&tr(this.baseMutations,e.baseMutations,((t,r)=>hl(t,r)))}}class rc{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){U(e.mutations.length===r.length,58842,{Qr:e.mutations.length,Gr:r.length});let s=(function(){return IE})();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new rc(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ww{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e,t,r,s,i=z.min(),a=z.min(),c=_e.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Rt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Rt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Rt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Rt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gw{constructor(e){this.zr=e}}function Kw(n){const e=FE({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?sa(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qw{constructor(){this.Hi=new Yw}addToCollectionParentIndex(e,t){return this.Hi.add(t),N.resolve()}getCollectionParents(e,t){return N.resolve(this.Hi.getEntries(t))}addFieldIndex(e,t){return N.resolve()}deleteFieldIndex(e,t){return N.resolve()}deleteAllFieldIndexes(e){return N.resolve()}createTargetIndexes(e,t){return N.resolve()}getDocumentsMatchingTarget(e,t){return N.resolve(null)}getIndexType(e,t){return N.resolve(0)}getFieldIndexes(e,t){return N.resolve([])}getNextCollectionGroupToUpdate(e){return N.resolve(null)}getMinOffset(e,t){return N.resolve(en.min())}getMinOffsetFromCollectionGroup(e,t){return N.resolve(en.min())}updateCollectionGroup(e,t,r){return N.resolve()}updateIndexEntries(e,t){return N.resolve()}}class Yw{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ge(Z.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ge(Z.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(e){this.Ds=e}next(){return this.Ds+=2,this.Ds}static xs(){return new cn(0)}static Cs(){return new cn(-1)}}// Copyright 2024 Google LLC* @license
function mf(n,e){var r;let t=e;for(const s of n.stages)t=Xw({serializer:n.serializer,serverTimestampBehavior:(r=n.listenOptions)==null?void 0:r.serverTimestampBehavior},s,t);return t}function ro(n,e){return mf(n,[e]).length>0}function Jw(n,e){return we(n)?ro(n,e):Wi(n,e)}function Xw(n,e,t){if(e instanceof Ji)return(function(s,i,a){return a.filter((c=>c.isFoundDocument()&&`/${c.key.getCollectionPath().canonicalString()}`===i.Vr))})(0,e,t);if(e instanceof Zi)return(function(s,i,a){return a.filter((c=>{const l=Qr($(i.condition).evaluate(s,c));return l!==void 0&&tt(l,je)}))})(n,e,t);if(e instanceof Xi)return(function(s,i,a){return a.filter((c=>c.isFoundDocument()&&c.key.getCollectionPath().lastSegment()===i.collectionId))})(0,e,t);if(e instanceof Ga)return(function(s,i,a){return a.filter((c=>c.isFoundDocument()))})(0,0,t);if(e instanceof Ka)return(function(s,i,a){return a.filter((c=>c.isFoundDocument()&&i.mr.has(c.key.path.toStringWithLeadingSlash())))})(0,e,t);if(e instanceof xn)return(function(s,i,a){return a.slice(0,i.limit)})(0,e,t);if(e instanceof At)return(function(s,i,a){const c=i.orderings.map((l=>({ks:$(l.expr),direction:l.direction})));return[...a].sort(((l,h)=>{for(const{ks:f,direction:m}of c){const w=Qr(f.evaluate(s,l)),S=Qr(f.evaluate(s,h)),C=ze(w??rr,S??rr);if(C!==0)return m==="ascending"?C:-C}return 0}))})(n,e,t);throw new Error(`Unknown stage: ${e._name}`)}function la(n){const e=(function(r){for(let s=r.stages.length-1;s>=0;s--){const i=r.stages[s];if(i instanceof At)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")})(n);return(t,r)=>{for(const s of e){const i=Qr($(s.expr).evaluate({serializer:n.serializer},t)),a=Qr($(s.expr).evaluate({serializer:n.serializer},r)),c=ze(i||rr,a||rr);if(c!==0)return s.direction==="ascending"?c:-c}return 0}}function $o(n){for(let e=n.stages.length-1;e>=0;e--){const t=n.stages[e];if(t instanceof xn)return{limit:t.limit}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zw{constructor(){this.changes=new Un((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ce.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?N.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eI{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tI{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&zr(r.mutation,s,Ke.empty(),re.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,K()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=K()){const s=Wt();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let a=Wn();return i.forEach(((c,l)=>{a=a.insert(c,l.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){const r=Wt();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,K())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((a,c)=>{t.set(a,c)}))}))}computeViews(e,t,r,s){let i=$e();const a=Gr(),c=(function(){return Gr()})();return t.forEach(((l,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof fn)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),zr(f.mutation,h,f.mutation.getFieldMask(),re.now())):a.set(h.key,Ke.empty())})),this.recalculateAndSaveOverlays(e,i).next((l=>(l.forEach(((h,f)=>a.set(h,f))),t.forEach(((h,f)=>c.set(h,new eI(f,a.get(h)??null)))),c)))}recalculateAndSaveOverlays(e,t){const r=Gr();let s=new se(((a,c)=>a-c)),i=K();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(const c of a)c.keys().forEach((l=>{const h=t.get(l);if(h===null)return;let f=r.get(l)||Ke.empty();f=c.applyToLocalView(h,f),r.set(l,f);const m=(s.get(c.batchId)||K()).add(l);s=s.insert(c.batchId,m)}))})).next((()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),h=l.key,f=l.value,m=Sd();f.forEach((w=>{if(!i.has(w)){const S=dd(t.get(w),r.get(w));S!==null&&m.set(w,S),i=i.add(w)}})),a.push(this.documentOverlayCache.saveOverlays(e,h,m))}return N.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return we(t)?this.getDocumentsMatchingPipeline(e,t,r,s):mE(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):vd(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):N.resolve(Wt());let c=Zr,l=i;return a.next((h=>N.forEach(h,((f,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),i.get(f)?N.resolve():this.remoteDocumentCache.getEntry(e,f).next((w=>{l=l.insert(f,w)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,l,h,K()))).next((f=>({batchId:c,changes:Pd(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new F(t)).next((r=>{let s=Wn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=Wn();return this.indexManager.getCollectionParents(e,i).next((c=>N.forEach(c,(l=>{const h=(function(m,w){return new vs(w,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)})(t,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next((f=>{f.forEach(((m,w)=>{a=a.insert(m,w)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((a=>this.retrieveMatchingLocalDocuments(i,a,(c=>Wi(t,c)))))}getDocumentsMatchingPipeline(e,t,r,s){if(Jt(t)==="collection_group"){const i=Ya(t);let a=Wn();return this.indexManager.getCollectionParents(e,i).next((c=>N.forEach(c,(l=>{const h=(function(m,w){const S=m.stages.map((C=>C instanceof Xi?new Ji(w.canonicalString(),{}):C));return new Oe(m.serializer,S)})(t,l.child(i));return this.getDocumentsMatchingPipeline(e,h,r,s).next((f=>{f.forEach(((m,w)=>{a=a.insert(m,w)}))}))})).next((()=>a))))}{let i;return this.getOverlaysForPipeline(e,t,r.largestBatchId).next((a=>{switch(i=a,Jt(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s);case"documents":let c=K();for(const l of ua(t))c=c.add(F.fromPath(l));return this.remoteDocumentCache.getEntries(e,c);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new O("invalid-argument",`Invalid pipeline source to execute offline: ${bt(t)}`)}})).next((a=>this.retrieveMatchingLocalDocuments(i,a,(c=>ro(t,c)))))}}retrieveMatchingLocalDocuments(e,t,r){e.forEach(((i,a)=>{const c=a.getKey();t.get(c)===null&&(t=t.insert(c,Ce.newInvalidDocument(c)))}));let s=Wn();return t.forEach(((i,a)=>{const c=e.get(i);c!==void 0&&zr(c.mutation,a,Ke.empty(),re.now()),r(a)&&(s=s.insert(i,a))})),s}getOverlaysForPipeline(e,t,r){switch(Jt(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,Z.fromString(eo(t)),r);case"collection_group":throw new O("invalid-argument",`Unexpected collection group pipeline: ${bt(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,ua(t).map((s=>F.fromPath(s))));case"database":return this.documentOverlayCache.getAllOverlays(e,r);default:throw new O("invalid-argument",`Failed to get overlays for pipeline: ${bt(t)}`)}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nI{constructor(e){this.serializer=e,this.Hs=new Map,this.Js=new Map}getBundleMetadata(e,t){return N.resolve(this.Hs.get(t))}saveBundleMetadata(e,t){return this.Hs.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:pt(s.createTime)}})(t)),N.resolve()}getNamedQuery(e,t){return N.resolve(this.Js.get(t))}saveNamedQuery(e,t){return this.Js.set(t.name,(function(s){return{name:s.name,query:Kw(s.bundledQuery),readTime:pt(s.readTime)}})(t)),N.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rI{constructor(){this.overlays=new se(F.comparator),this.Ys=new Map}getOverlay(e,t){return N.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Wt();return N.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}getAllOverlays(e,t){const r=Wt();return this.overlays.forEach(((s,i)=>{i.largestBatchId>t&&r.set(s,i)})),N.resolve(r)}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.Hr(e,t,i)})),N.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Ys.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Ys.delete(r)),N.resolve()}getOverlaysForCollection(e,t,r){const s=Wt(),i=t.length+1,a=new F(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const l=c.getNext().value,h=l.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return N.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new se(((h,f)=>h-f));const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=Wt(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=Wt(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return N.resolve(c)}Hr(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Ys.get(s.largestBatchId).delete(r.key);this.Ys.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Ww(t,r));let i=this.Ys.get(t);i===void 0&&(i=K(),this.Ys.set(t,i)),this.Ys.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sI{constructor(){this.sessionToken=_e.EMPTY_BYTE_STRING}getSessionToken(e){return N.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,N.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(){this.Zs=new ge(ve.Xs),this.e_=new ge(ve.t_)}isEmpty(){return this.Zs.isEmpty()}addReference(e,t){const r=new ve(e,t);this.Zs=this.Zs.add(r),this.e_=this.e_.add(r)}n_(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.r_(new ve(e,t))}i_(e,t){e.forEach((r=>this.removeReference(r,t)))}s_(e){const t=new F(new Z([])),r=new ve(t,e),s=new ve(t,e+1),i=[];return this.e_.forEachInRange([r,s],(a=>{this.r_(a),i.push(a.key)})),i}__(){this.Zs.forEach((e=>this.r_(e)))}r_(e){this.Zs=this.Zs.delete(e),this.e_=this.e_.delete(e)}o_(e){const t=new F(new Z([])),r=new ve(t,e),s=new ve(t,e+1);let i=K();return this.e_.forEachInRange([r,s],(a=>{i=i.add(a.key)})),i}containsKey(e){const t=new ve(e,0),r=this.Zs.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ve{constructor(e,t){this.key=e,this.a_=t}static Xs(e,t){return F.comparator(e.key,t.key)||Q(e.a_,t.a_)}static t_(e,t){return Q(e.a_,t.a_)||F.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iI{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.gs=1,this.u_=new ge(ve.Xs)}checkEmpty(e){return N.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.gs;this.gs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Hw(i,t,r,s);this.mutationQueue.push(a);for(const c of s)this.u_=this.u_.add(new ve(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return N.resolve(a)}lookupMutationBatch(e,t){return N.resolve(this.c_(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.l_(r),i=s<0?0:s;return N.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return N.resolve(this.mutationQueue.length===0?ka:this.gs-1)}getAllMutationBatches(e){return N.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ve(t,0),s=new ve(t,Number.POSITIVE_INFINITY),i=[];return this.u_.forEachInRange([r,s],(a=>{const c=this.c_(a.a_);i.push(c)})),N.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ge(Q);return t.forEach((s=>{const i=new ve(s,0),a=new ve(s,Number.POSITIVE_INFINITY);this.u_.forEachInRange([i,a],(c=>{r=r.add(c.a_)}))})),N.resolve(this.E_(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;F.isDocumentKey(i)||(i=i.child(""));const a=new ve(new F(i),0);let c=new ge(Q);return this.u_.forEachWhile((l=>{const h=l.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(l.a_)),!0)}),a),N.resolve(this.E_(c))}E_(e){const t=[];return e.forEach((r=>{const s=this.c_(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){U(this.h_(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.u_;return N.forEach(t.mutations,(s=>{const i=new ve(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.u_=r}))}bs(e){}containsKey(e,t){const r=new ve(t,0),s=this.u_.firstAfterOrEqual(r);return N.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,N.resolve()}h_(e,t){return this.l_(e)}l_(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}c_(e){const t=this.l_(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oI{constructor(e){this.T_=e,this.docs=(function(){return new se(F.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.T_(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return N.resolve(r?r.document.mutableCopy():Ce.newInvalidDocument(t))}getEntries(e,t){let r=$e();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Ce.newInvalidDocument(s))})),N.resolve(r)}getAllEntries(e){let t=$e();return this.docs.forEach(((r,s)=>{t=t.insert(r,s.document)})),N.resolve(t)}getDocumentsMatchingQuery(e,t,r,s){let i,a;we(t)?(i=Z.fromString(eo(t)),a=f=>ro(t,f)):(i=t.path,a=f=>Wi(t,f));let c=$e();const l=new F(i.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(l);for(;h.hasNext();){const{key:f,value:{document:m}}=h.getNext();if(!i.isPrefixOf(f.path))break;f.path.length>i.length+1||My(Ly(m),r)<=0||(s.has(m.key)||a(m))&&(c=c.insert(m.key,m.mutableCopy()))}return N.resolve(c)}getAllFromCollectionGroup(e,t,r,s){B(9500)}P_(e,t){return N.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new aI(this)}getSize(e){return N.resolve(this.size)}}class aI extends Zw{constructor(e){super(),this.zs=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.zs.addEntry(e,s)):this.zs.removeEntry(r)})),N.waitFor(t)}getFromCache(e,t){return this.zs.getEntry(e,t)}getAllFromCache(e,t){return this.zs.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cI{constructor(e){this.persistence=e,this.R_=new Un((t=>ff(t)),pf),this.lastRemoteSnapshotVersion=z.min(),this.highestTargetId=0,this.I_=0,this.A_=new sc,this.targetCount=0,this.V_=cn.xs()}forEachTarget(e,t){return this.R_.forEach(((r,s)=>t(s))),N.resolve()}getLastRemoteSnapshotVersion(e){return N.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return N.resolve(this.I_)}allocateTargetId(e){return this.highestTargetId=this.V_.next(),N.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.I_&&(this.I_=t),N.resolve()}Ms(e){this.R_.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.V_=new cn(t),this.highestTargetId=t),e.sequenceNumber>this.I_&&(this.I_=e.sequenceNumber)}addTargetData(e,t){return this.Ms(t),this.targetCount+=1,N.resolve()}updateTargetData(e,t){return this.Ms(t),N.resolve()}removeTargetData(e,t){return this.R_.delete(t.target),this.A_.s_(t.targetId),this.targetCount-=1,N.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.R_.forEach(((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.R_.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),N.waitFor(i).next((()=>s))}getTargetCount(e){return N.resolve(this.targetCount)}getTargetData(e,t){const r=this.R_.get(t)||null;return N.resolve(r)}addMatchingKeys(e,t,r){return this.A_.n_(t,r),N.resolve()}removeMatchingKeys(e,t,r){this.A_.i_(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((a=>{i.push(s.markPotentiallyOrphaned(e,a))})),N.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.A_.s_(t),N.resolve()}getMatchingKeysForTargetId(e,t){const r=this.A_.o_(t);return N.resolve(r)}containsKey(e,t){return N.resolve(this.A_.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gf{constructor(e,t){this.d_={},this.overlays={},this.f_=new Bi(0),this.m_=!1,this.m_=!0,this.p_=new sI,this.referenceDelegate=e(this),this.g_=new cI(this),this.indexManager=new Qw,this.remoteDocumentCache=(function(s){return new oI(s)})((r=>this.referenceDelegate.y_(r))),this.serializer=new Gw(t),this.w_=new nI(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.m_=!1,Promise.resolve()}get started(){return this.m_}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new rI,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.d_[e.toKey()];return r||(r=new iI(t,this.referenceDelegate),this.d_[e.toKey()]=r),r}getGlobalsCache(){return this.p_}getTargetCache(){return this.g_}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.w_}runTransaction(e,t,r){L("MemoryPersistence","Starting transaction:",e);const s=new uI(this.f_.next());return this.referenceDelegate.b_(),r(s).next((i=>this.referenceDelegate.v_(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}S_(e,t){return N.or(Object.values(this.d_).map((r=>()=>r.containsKey(e,t))))}}class uI extends Fy{constructor(e){super(),this.currentSequenceNumber=e}}class ic{constructor(e){this.persistence=e,this.D_=new sc,this.x_=null}static C_(e){return new ic(e)}get F_(){if(this.x_)return this.x_;throw B(60996)}addReference(e,t,r){return this.D_.addReference(r,t),this.F_.delete(r.toString()),N.resolve()}removeReference(e,t,r){return this.D_.removeReference(r,t),this.F_.add(r.toString()),N.resolve()}markPotentiallyOrphaned(e,t){return this.F_.add(t.toString()),N.resolve()}removeTarget(e,t){this.D_.s_(t.targetId).forEach((s=>this.F_.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.F_.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}b_(){this.x_=new Set}v_(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return N.forEach(this.F_,(r=>{const s=F.fromPath(r);return this.O_(e,s).next((i=>{i||t.removeEntry(s,z.min())}))})).next((()=>(this.x_=null,t.apply(e))))}updateLimboDocument(e,t){return this.O_(e,t).next((r=>{r?this.F_.delete(t.toString()):this.F_.add(t.toString())}))}y_(e){return 0}O_(e,t){return N.or([()=>N.resolve(this.D_.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.S_(e,t)])}}class Ni{constructor(e,t){this.persistence=e,this.M_=new Un((r=>jy(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=cT(this,t)}static C_(e,t){return new Ni(e,t)}b_(){}v_(e){return N.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}lr(e){const t=this.Ls(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}Ls(e){let t=0;return this.Er(e,(r=>{t++})).next((()=>t))}Er(e,t){return N.forEach(this.M_,((r,s)=>this.Us(e,r,s).next((i=>i?N.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.P_(e,(a=>this.Us(e,a,t).next((c=>{c||(r++,i.removeEntry(a,z.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.M_.set(t,e.currentSequenceNumber),N.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.M_.set(r,e.currentSequenceNumber),N.resolve()}removeReference(e,t,r){return this.M_.set(r,e.currentSequenceNumber),N.resolve()}updateLimboDocument(e,t){return this.M_.set(t,e.currentSequenceNumber),N.resolve()}y_(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=si(e.data.value)),t}Us(e,t,r){return N.or([()=>this.persistence.S_(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.M_.get(t);return N.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oc{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.wo=r,this.bo=s}static vo(e,t){let r=K(),s=K();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new oc(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lI(n,e){return F.comparator(n.key,e.key)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hI{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dI{constructor(){this.So=!1,this.Do=!1,this.xo=100,this.Co=(function(){return tm()?8:By(Ve())>0?6:4})()}initialize(e,t){this.Fo=e,this.indexManager=t,this.So=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.Oo(e,t).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.Mo(e,t,s,r).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new hI;return this.No(e,t,a).next((c=>{if(i.result=c,this.Do)return this.Lo(e,t,a,c.size)}))})).next((()=>i.result))}Lo(e,t,r,s){return we(t)?N.resolve():r.documentReadCount<this.xo?(Hn()<=Y.DEBUG&&L("QueryEngine","SDK will not create cache indexes for query:",Wr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.xo,"documents"),N.resolve()):(Hn()<=Y.DEBUG&&L("QueryEngine","Query:",Wr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Co*s?(Hn()<=Y.DEBUG&&L("QueryEngine","The SDK decides to create cache indexes for query:",Wr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ft(t))):N.resolve())}Oo(e,t){if(we(t))return N.resolve(null);let r=t;if(_l(r))return N.resolve(null);let s=ft(r);return this.indexManager.getIndexType(e,s).next((i=>i===0?null:(r.limit!==null&&i===1&&(r=sa(r,null,"F"),s=ft(r)),this.indexManager.getDocumentsMatchingTarget(e,s).next((a=>{const c=K(...a);return this.Fo.getDocuments(e,c).next((l=>this.indexManager.getMinOffset(e,s).next((h=>{const f=this.Bo(r,l);return this.Uo(r,f,c,h.readTime)?this.Oo(e,sa(r,null,"F")):this.ko(e,f,r,h)}))))})))))}Mo(e,t,r,s){return(we(t)?(function(a){for(const c of a.stages){if(c instanceof xn||c instanceof kl)return!1;if(c instanceof Zi){if(c.condition instanceof Zd&&c.condition._expr.name==="exists"&&c.condition._expr.params[0]instanceof dr&&c.condition._expr.params[0].fieldName===ct)continue;return!1}}return!0})(t):_l(t))||s.isEqual(z.min())?N.resolve(null):this.Fo.getDocuments(e,r).next((i=>{const a=this.Bo(t,i);return this.Uo(t,a,r,s)?N.resolve(null):(Hn()<=Y.DEBUG&&L("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Dl(t)),this.ko(e,a,t,Oy(s,Zr)).next((c=>c)))}))}Bo(e,t){let r,s;return we(e)?(r=new ge(lI),s=i=>ro(e,i)):(r=new ge(Ua(e)),s=i=>Wi(e,i)),t.forEach(((i,a)=>{s(a)&&(r=r.add(a))})),r}Uo(e,t,r,s){if(we(e))return(function(c){return c.stages.some((l=>l instanceof xn||l instanceof kl))})(e);if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}No(e,t,r){return Hn()<=Y.DEBUG&&L("QueryEngine","Using full collection scan to execute query:",Dl(t)),this.Fo.getDocumentsMatchingQuery(e,t,en.min(),r)}ko(e,t,r,s){return this.Fo.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ac="LocalStore",fI=3e8;class pI{constructor(e,t,r,s){this.persistence=e,this.qo=t,this.serializer=s,this.$o=new se(Q),this.Ko=new Un((i=>ff(i)),pf),this.Wo=new Map,this.Qo=e.getRemoteDocumentCache(),this.g_=e.getTargetCache(),this.w_=e.getBundleCache(),this.Go(r)}Go(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new tI(this.Qo,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Qo.setIndexManager(this.indexManager),this.qo.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.$o)))}}function mI(n,e,t,r){return new pI(n,e,t,r)}async function _f(n,e){const t=H(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.Go(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const a=[],c=[];let l=K();for(const h of s){a.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}return t.localDocuments.getDocuments(r,l).next((h=>({zo:h,removedBatchIds:a,addedBatchIds:c})))}))}))}function gI(n,e){const t=H(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=t.Qo.newChangeBuffer({trackRemovals:!0});return(function(c,l,h,f){const m=h.batch,w=m.keys();let S=N.resolve();return w.forEach((C=>{S=S.next((()=>f.getEntry(l,C))).next((M=>{const D=h.docVersions.get(C);U(D!==null,48541),M.version.compareTo(D)<0&&(m.applyToRemoteDocument(M,h),M.isValidDocument()&&(M.setReadTime(h.commitVersion),f.addEntry(M)))}))})),S.next((()=>c.mutationQueue.removeMutationBatch(l,m)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let l=K();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(l=l.add(c.batch.mutations[h].key));return l})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function yf(n){const e=H(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.g_.getLastRemoteSnapshotVersion(t)))}function _I(n,e){const t=H(n),r=e.snapshotVersion;let s=t.$o;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=t.Qo.newChangeBuffer({trackRemovals:!0});s=t.$o;const c=[];e.targetChanges.forEach(((f,m)=>{const w=s.get(m);if(!w)return;c.push(t.g_.removeMatchingKeys(i,f.removedDocuments,m).next((()=>t.g_.addMatchingKeys(i,f.addedDocuments,m))));let S=w.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?S=S.withResumeToken(_e.EMPTY_BYTE_STRING,z.min()).withLastLimboFreeSnapshotVersion(z.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,r)),s=s.insert(m,S),(function(M,D,j){return M.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-M.snapshotVersion.toMicroseconds()>=fI?!0:j.addedDocuments.size+j.modifiedDocuments.size+j.removedDocuments.size>0})(w,S,f)&&c.push(t.g_.updateTargetData(i,S))}));let l=$e(),h=K();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(yI(i,a,e.documentUpdates).next((f=>{l=f.jo,h=f.Ho}))),!r.isEqual(z.min())){const f=t.g_.getLastRemoteSnapshotVersion(i).next((m=>t.g_.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(f)}return N.waitFor(c).next((()=>a.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,l,h))).next((()=>l))})).then((i=>(t.$o=s,i)))}function yI(n,e,t){let r=K(),s=K();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let a=$e();return t.forEach(((c,l)=>{const h=i.get(c);l.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(z.min())?(e.removeEntry(c,l.readTime),a=a.insert(c,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(l),a=a.insert(c,l)):L(ac,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",l.version)})),{jo:a,Ho:s}}))}function EI(n,e){const t=H(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=ka),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function TI(n,e){const t=H(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.g_.getTargetData(r,e).next((i=>i?(s=i,N.resolve(s)):t.g_.allocateTargetId(r).next((a=>(s=new Rt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.g_.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.$o.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.$o=t.$o.insert(r.targetId,r),t.Ko.set(e,r.targetId)),r}))}async function ha(n,e,t){const r=H(n),s=r.$o.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!lr(a))throw a;L(ac,`Failed to update sequence numbers for target ${e}: ${a}`)}r.$o=r.$o.remove(e),r.Ko.delete(s.target)}function xl(n,e,t){const r=H(n);let s=z.min(),i=K();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(l,h,f){const m=H(l),w=m.Ko.get(f);return w!==void 0?N.resolve(m.$o.get(w)):m.g_.getTargetData(h,f)})(r,a,we(e)?e:ft(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.g_.getMatchingKeysForTargetId(a,c.targetId).next((l=>{i=l}))})).next((()=>r.qo.getDocumentsMatchingQuery(a,e,t?s:z.min(),t?i:K()))).next((c=>(wI(r,c),{documents:c,Jo:i})))))}function wI(n,e){e.forEach(((t,r)=>{const s=r.key.getCollectionGroup(),i=n.Wo.get(s)||z.min();r.readTime.compareTo(i)>0&&n.Wo.set(s,r.readTime)}))}class Ol{constructor(){this.activeTargetIds=RE()}na(e){this.activeTargetIds=this.activeTargetIds.add(e)}ra(e){this.activeTargetIds=this.activeTargetIds.delete(e)}ta(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class II{constructor(){this.Ua=new Ol,this.ka={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Ua.na(e),this.ka[e]||"not-current"}updateQueryState(e,t,r){this.ka[e]=t}removeLocalQueryTarget(e){this.Ua.ra(e)}isLocalQueryTarget(e){return this.Ua.activeTargetIds.has(e)}clearQueryState(e){delete this.ka[e]}getAllActiveQueryTargets(){return this.Ua.activeTargetIds}isActiveQueryTarget(e){return this.Ua.activeTargetIds.has(e)}start(){return this.Ua=new Ol,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}function qo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vI{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.qa=0,this.$a=null,this.Ka=!0}Wa(){this.qa===0&&(this.Qa("Unknown"),this.$a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.$a=null,this.Ga("Backend didn't respond within 10 seconds."),this.Qa("Offline"),Promise.resolve()))))}za(e){this.state==="Online"?this.Qa("Unknown"):(this.qa++,this.qa>=1&&(this.ja(),this.Ga(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.Qa("Offline")))}set(e){this.ja(),this.qa=0,e==="Online"&&(this.Ka=!1),this.Qa(e)}Qa(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}Ga(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Ka?(Nt(t),this.Ka=!1):L("OnlineStateTracker",t)}ja(){this.$a!==null&&(this.$a.cancel(),this.$a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Et="RemoteStore";class AI{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ha=[],this.Ja=new Map,this.Ya=new Map,this.Za=new Map,this.Xa=new cn(1e3),this.eu=new cn(1001),this.tu=new Set,this.nu=[],this.ru=i,this.ru.bt((a=>{r.enqueueAndForget((async()=>{Bn(this)&&(L(Et,"Restarting streams for network reachability change."),await(async function(l){const h=H(l);h.tu.add(4),await Ss(h),h.iu.set("Unknown"),h.tu.delete(4),await so(h)})(this))}))})),this.iu=new vI(r,s)}}async function so(n){if(Bn(n))for(const e of n.nu)await e(!0)}async function Ss(n){for(const e of n.nu)await e(!1)}function da(n,e){return n.Ya.get(e)||void 0}function Ef(n,e){const t=H(n),r=da(t,e.targetId);if(r!==void 0&&t.Ja.has(r))return;const s=(function(c,l){const h=da(c,l);h!==void 0&&c.Za.delete(h);const f=(function(w,S){return S%2!=0?w.eu.next():w.Xa.next()})(c,l);return c.Ya.set(l,f),c.Za.set(f,l),f})(t,e.targetId);L(Et,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new Rt(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.Ja.set(s,i),hc(t)?lc(t):gr(t).Fn()&&uc(t,i)}function cc(n,e){const t=H(n),r=gr(t),s=da(t,e);L(Et,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.Ja.delete(s),t.Ya.delete(e),t.Za.delete(s),r.Fn()&&Tf(t,s),t.Ja.size===0&&(r.Fn()?r.Nn():Bn(t)&&t.iu.set("Unknown"))}function uc(n,e){if(n.su.We(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(z.min())>0){const t=n.Za.get(e.targetId);if(t===void 0)return void L(Et,"SDK target ID not found for remote ID: "+e.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(r)}gr(n).jn(e)}function Tf(n,e){n.su.We(e),gr(n).Hn(e)}function lc(n){n.su=new bE({getRemoteKeysForTarget:e=>{const t=n.Za.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):K()},dt:e=>n.Ja.get(e)||null,Tt:()=>n.datastore.serializer.databaseId}),gr(n).start(),n.iu.Wa()}function hc(n){return Bn(n)&&!gr(n).Cn()&&n.Ja.size>0}function Bn(n){return H(n).tu.size===0}function wf(n){n.su=void 0}async function RI(n){n.iu.set("Online")}async function PI(n){n.Ja.forEach(((e,t)=>{uc(n,e)}))}async function SI(n,e){wf(n),hc(n)?(n.iu.za(e),lc(n)):n.iu.set("Unknown")}async function bI(n,e,t){if(n.iu.set("Online"),e instanceof Cd&&e.state===2&&e.cause)try{await(async function(s,i){const a=i.cause;for(const c of i.targetIds){if(s.Ja.has(c)){const l=s.Za.get(c);l!==void 0&&(await s.remoteSyncer.rejectListen(l,a),s.Ya.delete(l),s.Za.delete(c)),s.Ja.delete(c)}s.su.removeTarget(c)}})(n,e)}catch(r){L(Et,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await ki(n,r)}else if(e instanceof oi?n.su.et(e):e instanceof bd?n.su.ot(e):n.su.rt(e),!t.isEqual(z.min()))try{const r=await yf(n.localStore);t.compareTo(r)>=0&&await(function(i,a){const c=i.su.Rt(a);c.targetChanges.forEach(((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const m=i.Ja.get(f);m&&i.Ja.set(f,m.withResumeToken(h.resumeToken,a))}})),c.targetMismatches.forEach(((h,f)=>{const m=i.Ja.get(h);if(!m)return;i.Ja.set(h,m.withResumeToken(_e.EMPTY_BYTE_STRING,m.snapshotVersion)),Tf(i,h);const w=new Rt(m.target,h,f,m.sequenceNumber);uc(i,w)}));const l=(function(f,m){const w=new Map;m.targetChanges.forEach(((C,M)=>{const D=f.Za.get(M);D!==void 0&&w.set(D,C)}));let S=new se(Q);return m.targetMismatches.forEach(((C,M)=>{const D=f.Za.get(C);D!==void 0&&(S=S.insert(D,M))})),new As(m.snapshotVersion,w,S,m.documentUpdates,m.augmentedDocumentUpdates,m.resolvedLimboDocuments)})(i,c);return i.remoteSyncer.applyRemoteEvent(l)})(n,t)}catch(r){L(Et,"Failed to raise snapshot:",r),await ki(n,r)}}async function ki(n,e,t){if(!lr(e))throw e;n.tu.add(1),await Ss(n),n.iu.set("Offline"),t||(t=()=>yf(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{L(Et,"Retrying IndexedDB access"),await t(),n.tu.delete(1),await so(n)}))}function If(n,e){return e().catch((t=>ki(n,t,e)))}async function io(n){const e=H(n),t=un(e);let r=e.Ha.length>0?e.Ha[e.Ha.length-1].batchId:ka;for(;CI(e);)try{const s=await EI(e.localStore,r);if(s===null){e.Ha.length===0&&t.Nn();break}r=s.batchId,VI(e,s)}catch(s){await ki(e,s)}vf(e)&&Af(e)}function CI(n){return Bn(n)&&n.Ha.length<10}function VI(n,e){n.Ha.push(e);const t=un(n);t.Fn()&&t.Jn&&t.Yn(e.mutations)}function vf(n){return Bn(n)&&!un(n).Cn()&&n.Ha.length>0}function Af(n){un(n).start()}async function NI(n){un(n).er()}async function kI(n){const e=un(n);for(const t of n.Ha)e.Yn(t.mutations)}async function DI(n,e,t){const r=n.Ha.shift(),s=rc.from(r,e,t);await If(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await io(n)}async function xI(n,e){e&&un(n).Jn&&await(async function(r,s){if((function(a){return TE(a)&&a!==V.ABORTED})(s.code)){const i=r.Ha.shift();un(r).Mn(),await If(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await io(r)}})(n,e),vf(n)&&Af(n)}async function Ll(n,e){const t=H(n);t.asyncQueue.verifyOperationInProgress(),L(Et,"RemoteStore received new credentials");const r=Bn(t);t.tu.add(3),await Ss(t),r&&t.iu.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.tu.delete(3),await so(t)}async function OI(n,e){const t=H(n);e?(t.tu.delete(2),await so(t)):e||(t.tu.add(2),await Ss(t),t.iu.set("Unknown"))}function gr(n){return n._u||(n._u=(function(t,r,s){const i=H(t);return i.nr(),new XE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Qt:RI.bind(null,n),zt:PI.bind(null,n),Ht:SI.bind(null,n),zn:bI.bind(null,n)}),n.nu.push((async e=>{e?(n._u.Mn(),hc(n)?lc(n):n.iu.set("Unknown")):(await n._u.stop(),wf(n))}))),n._u}function un(n){return n.ou||(n.ou=(function(t,r,s){const i=H(t);return i.nr(),new ZE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Qt:()=>Promise.resolve(),zt:NI.bind(null,n),Ht:xI.bind(null,n),Zn:kI.bind(null,n),Xn:DI.bind(null,n)}),n.nu.push((async e=>{e?(n.ou.Mn(),await io(n)):(await n.ou.stop(),n.Ha.length>0&&(L(Et,`Stopping write stream with ${n.Ha.length} pending writes`),n.Ha=[]))}))),n.ou}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new St,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,c=new dc(e,t,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new O(V.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function fc(n,e){if(Nt("AsyncQueue",`${e}: ${n}`),lr(n))return new O(V.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{static emptySet(e){return new Rn(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||F.comparator(t.key,r.key):(t,r)=>F.comparator(t.key,r.key),this.keyedMap=Wn(),this.sortedSet=new se(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Rn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Rn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml{constructor(){this.au=new se(F.comparator)}track(e){const t=e.doc.key,r=this.au.get(t);r?e.type!==0&&r.type===3?this.au=this.au.insert(t,e):e.type===3&&r.type!==1?this.au=this.au.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.au=this.au.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.au=this.au.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.au=this.au.remove(t):e.type===1&&r.type===2?this.au=this.au.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.au=this.au.insert(t,{type:2,doc:e.doc}):B(63341,{ft:e,uu:r}):this.au=this.au.insert(t,e)}cu(){const e=[];return this.au.inorderTraversal(((t,r)=>{e.push(r)})),e}}class or{constructor(e,t,r,s,i,a,c,l,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach((c=>{a.push({type:0,doc:c})})),new or(e,t,Rn.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&no(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LI{constructor(){this.lu=void 0,this.Eu=[]}hu(){return this.Eu.some((e=>e.Tu()))}}class MI{constructor(){this.queries=Ul(),this.onlineState="Unknown",this.Pu=new Set}terminate(){(function(t,r){const s=H(t),i=s.queries;s.queries=Ul(),i.forEach(((a,c)=>{for(const l of c.Eu)l.onError(r)}))})(this,new O(V.ABORTED,"Firestore shutting down"))}}function Ul(){return new Un((n=>df(n)),no)}async function Rf(n,e){const t=H(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.hu()&&e.Tu()&&(r=2):(i=new LI,r=e.Tu()?0:1);try{switch(r){case 0:i.lu=await t.onListen(s,!0);break;case 1:i.lu=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=fc(a,`Initialization of query '${we(e.query)?bt(e.query):Wr(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Eu.push(e),e.Ru(t.onlineState),i.lu&&e.Iu(i.lu)&&pc(t)}async function Pf(n,e){const t=H(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.Eu.indexOf(e);a>=0&&(i.Eu.splice(a,1),i.Eu.length===0?s=e.Tu()?0:1:!i.hu()&&e.Tu()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function UI(n,e){const t=H(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const c of a.Eu)c.Iu(s)&&(r=!0);a.lu=s}}r&&pc(t)}function FI(n,e,t){const r=H(n),s=r.queries.get(e);if(s)for(const i of s.Eu)i.onError(t);r.queries.delete(e)}function pc(n){n.Pu.forEach((e=>{e.next()}))}var fa;(function(n){n.Default="default",n.Cache="cache"})(fa||(fa={}));class Sf{constructor(e,t,r){this.query=e,this.Au=t,this.Vu=!1,this.du=null,this.onlineState="Unknown",this.options=r||{}}Iu(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new or(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Vu?this.fu(e)&&(this.Au.next(e),t=!0):this.mu(e,this.onlineState)&&(this.pu(e),t=!0),this.du=e,t}onError(e){this.Au.error(e)}Ru(e){this.onlineState=e;let t=!1;return this.du&&!this.Vu&&this.mu(this.du,e)&&(this.pu(this.du),t=!0),t}mu(e,t){if(!e.fromCache||!this.Tu())return!0;const r=t!=="Offline";return(!this.options.waitForSyncWhenOnline||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}fu(e){if(e.docChanges.length>0)return!0;const t=this.du&&this.du.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}pu(e){e=or.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Vu=!0,this.Au.next(e)}Tu(){return this.options.source!==fa.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bf{constructor(e){this.key=e}}class Cf{constructor(e){this.key=e}}class BI{constructor(e,t){this.query=e,this.Ou=t,this.Mu=null,this.hasCachedResults=!1,this.current=!1,this.Nu=K(),this.mutatedKeys=K(),this.Lu=we(e)?la(e):Ua(e),this.Bu=new Rn(this.Lu)}get Uu(){return this.Ou}ku(e,t){const r=t?t.qu:new Ml,s=t?t.Bu:this.Bu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const[l,h]=this.$u(this.query,s);e.inorderTraversal(((m,w)=>{const S=s.get(m),C=Jw(this.query,w)?w:null,M=!!S&&this.mutatedKeys.has(S.key),D=!!C&&(C.hasLocalMutations||this.mutatedKeys.has(C.key)&&C.hasCommittedMutations);let j=!1;S&&C?S.data.isEqual(C.data)?M!==D&&(r.track({type:3,doc:C}),j=!0):this.Ku(S,C)||(r.track({type:2,doc:C}),j=!0,(l&&this.Lu(C,l)>0||h&&this.Lu(C,h)<0)&&(c=!0)):!S&&C?(r.track({type:0,doc:C}),j=!0):S&&!C&&(r.track({type:1,doc:S}),j=!0,(l||h)&&(c=!0)),j&&(C?(a=a.add(C),i=D?i.add(m):i.delete(m)):(a=a.delete(m),i=i.delete(m)))}));const f=this.Wu(this.query);if(f)if(we(this.query)){const m=[];a.forEach((C=>m.push(C)));const w=mf(this.query,m);let S=new Rn(la(this.query));for(const C of w)S=S.add(C);a.forEach((C=>{S.has(C.key)||(i=i.delete(C.key),r.track({type:1,doc:C}))})),a=S}else{const m=this.Qu(this.query);for(;a.size>f;){const w=m==="F"?a.last():a.first();a=a.delete(w.key),i=i.delete(w.key),r.track({type:1,doc:w})}}return{Bu:a,qu:r,Uo:c,mutatedKeys:i}}Wu(e){var t;return we(e)?(t=$o(e))==null?void 0:t.limit:e.limit||void 0}Qu(e){if(we(e)){const t=$o(e);return t&&t.limit<0?"L":"F"}return e.limitType}$u(e,t){var r;if(we(e)){const s=(r=$o(e))==null?void 0:r.limit;return[t.size===s?t.last():null,null]}return[e.limitType==="F"&&t.size===this.Wu(this.query)?t.last():null,e.limitType==="L"&&t.size===this.Wu(this.query)?t.first():null]}Ku(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.Bu;this.Bu=e.Bu,this.mutatedKeys=e.mutatedKeys;const a=e.qu.cu();a.sort(((f,m)=>(function(S,C){const M=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return B(20277,{ft:D})}};return M(S)-M(C)})(f.type,m.type)||this.Lu(f.doc,m.doc))),this.Gu(r),s=s??!1;const c=t&&!s?this.zu():[],l=this.Nu.size===0&&this.current&&!s?1:0,h=l!==this.Mu;return this.Mu=l,a.length!==0||h?{snapshot:new or(this.query,e.Bu,i,a,e.mutatedKeys,l===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),ju:c}:{ju:c}}Ru(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Bu:this.Bu,qu:new Ml,mutatedKeys:this.mutatedKeys,Uo:!1},!1)):{ju:[]}}Hu(e){return!this.Ou.has(e)&&!!this.Bu.has(e)&&!this.Bu.get(e).hasLocalMutations}Gu(e){e&&(e.addedDocuments.forEach((t=>this.Ou=this.Ou.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ou=this.Ou.delete(t))),this.current=e.current)}zu(){if(!this.current)return[];const e=this.Nu;this.Nu=K(),this.Bu.forEach((r=>{this.Hu(r.key)&&(this.Nu=this.Nu.add(r.key))}));const t=[];return e.forEach((r=>{this.Nu.has(r)||t.push(new Cf(r))})),this.Nu.forEach((r=>{e.has(r)||t.push(new bf(r))})),t}Ju(e){this.Ou=e.Jo,this.Nu=K();const t=this.ku(e.documents);return this.applyChanges(t,!0)}Yu(){return or.fromInitialDocuments(this.query,this.Bu,this.mutatedKeys,this.Mu===0,this.hasCachedResults)}}const mc="SyncEngine";class $I{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class qI{constructor(e){this.key=e,this.Zu=!1}}class jI{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Xu={},this.ec=new Un((c=>df(c)),no),this.tc=new Map,this.nc=new Set,this.rc=new se(F.comparator),this.sc=new Map,this._c=new sc,this.oc={},this.ac=new Map,this.uc=cn.Cs(),this.onlineState="Unknown",this.cc=void 0}get isPrimaryClient(){return this.cc===!0}}async function zI(n,e,t=!0){const r=Of(n);let s;const i=r.ec.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Yu()):s=await Vf(r,e,t,!0),s}async function HI(n,e){const t=Of(n);await Vf(t,e,!0,!1)}async function Vf(n,e,t,r){const s=await TI(n.localStore,we(e)?e:ft(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await WI(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&Ef(n.remoteStore,s),c}async function WI(n,e,t,r,s){n.lc=(m,w,S)=>(async function(M,D,j,G){let X=D.view.ku(j);X.Uo&&(X=await xl(M.localStore,D.query,!1).then((({documents:I})=>D.view.ku(I,X))));const ee=G&&G.targetChanges.get(D.targetId),he=G&&G.targetMismatches.get(D.targetId)!=null,de=D.view.applyChanges(X,M.isPrimaryClient,ee,he);return Bl(M,D.targetId,de.ju),de.snapshot})(n,m,w,S);const i=await xl(n.localStore,e,!0),a=new BI(e,i.Jo),c=a.ku(i.documents),l=Rs.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=a.applyChanges(c,n.isPrimaryClient,l);Bl(n,t,h.ju);const f=new $I(e,t,a);return n.ec.set(e,f),n.tc.has(t)?n.tc.get(t).push(e):n.tc.set(t,[e]),h.snapshot}async function GI(n,e,t){const r=H(n),s=r.ec.get(e),i=r.tc.get(s.targetId);if(i.length>1)return r.tc.set(s.targetId,i.filter((a=>!no(a,e)))),void r.ec.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await ha(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&cc(r.remoteStore,s.targetId),pa(r,s.targetId)})).catch(ur)):(pa(r,s.targetId),await ha(r.localStore,s.targetId,!0))}async function KI(n,e){const t=H(n),r=t.ec.get(e),s=t.tc.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),cc(t.remoteStore,r.targetId))}async function QI(n,e,t){const r=nv(n);try{const s=await(function(a,c){const l=H(a),h=re.now(),f=c.reduce(((S,C)=>S.add(C.key)),K());let m,w;return l.persistence.runTransaction("Locally write mutations","readwrite",(S=>{let C=$e(),M=K();return l.Qo.getEntries(S,f).next((D=>{C=D,C.forEach(((j,G)=>{G.isValidDocument()||(M=M.add(j))}))})).next((()=>l.localDocuments.getOverlayedDocuments(S,C))).next((D=>{m=D;const j=[];for(const G of c){const X=nE(G,m.get(G.key).overlayedDocument);X!=null&&j.push(new fn(G.key,X,ad(X.value.mapValue),Ze.exists(!0)))}return l.mutationQueue.addMutationBatch(S,h,j,c)})).next((D=>{w=D;const j=D.applyToLocalDocumentSet(m,M);return l.documentOverlayCache.saveOverlays(S,D.batchId,j)}))})).then((()=>({batchId:w.batchId,changes:Pd(m)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(a,c,l){let h=a.oc[a.currentUser.toKey()];h||(h=new se(Q)),h=h.insert(c,l),a.oc[a.currentUser.toKey()]=h})(r,s.batchId,t),await bs(r,s.changes),await io(r.remoteStore)}catch(s){const i=fc(s,"Failed to persist write");t.reject(i)}}async function Nf(n,e){const t=H(n);try{const r=await _I(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const a=t.sc.get(i);a&&(U(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.Zu=!0:s.modifiedDocuments.size>0?U(a.Zu,14607):s.removedDocuments.size>0&&(U(a.Zu,42227),a.Zu=!1))})),await bs(t,r,e)}catch(r){await ur(r)}}function Fl(n,e,t){const r=H(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.ec.forEach(((i,a)=>{const c=a.view.Ru(e);c.snapshot&&s.push(c.snapshot)})),(function(a,c){const l=H(a);l.onlineState=c;let h=!1;l.queries.forEach(((f,m)=>{for(const w of m.Eu)w.Ru(c)&&(h=!0)})),h&&pc(l)})(r.eventManager,e),s.length&&r.Xu.zn(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function YI(n,e,t){const r=H(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.sc.get(e),i=s&&s.key;if(i){let a=new se(F.comparator);a=a.insert(i,Ce.newNoDocument(i,z.min()));const c=K().add(i),l=new As(z.min(),new Map,new se(Q),a,$e(),c);await Nf(r,l),r.rc=r.rc.remove(i),r.sc.delete(e),gc(r)}else await ha(r.localStore,e,!1).then((()=>pa(r,e,t))).catch(ur)}async function JI(n,e){const t=H(n),r=e.batch.batchId;try{const s=await gI(t.localStore,e);Df(t,r,null),kf(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await bs(t,s)}catch(s){await ur(s)}}async function XI(n,e,t){const r=H(n);try{const s=await(function(a,c){const l=H(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return l.mutationQueue.lookupMutationBatch(h,c).next((m=>(U(m!==null,37113),f=m.keys(),l.mutationQueue.removeMutationBatch(h,m)))).next((()=>l.mutationQueue.performConsistencyCheck(h))).next((()=>l.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>l.localDocuments.getDocuments(h,f)))}))})(r.localStore,e);Df(r,e,t),kf(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await bs(r,s)}catch(s){await ur(s)}}function kf(n,e){(n.ac.get(e)||[]).forEach((t=>{t.resolve()})),n.ac.delete(e)}function Df(n,e,t){const r=H(n);let s=r.oc[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.oc[r.currentUser.toKey()]=s}}function pa(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.tc.get(e))n.ec.delete(r),t&&n.Xu.Ec(r,t);n.tc.delete(e),n.isPrimaryClient&&n._c.s_(e).forEach((r=>{n._c.containsKey(r)||xf(n,r)}))}function xf(n,e){n.nc.delete(e.path.canonicalString());const t=n.rc.get(e);t!==null&&(cc(n.remoteStore,t),n.rc=n.rc.remove(e),n.sc.delete(t),gc(n))}function Bl(n,e,t){for(const r of t)r instanceof bf?(n._c.addReference(r.key,e),ZI(n,r)):r instanceof Cf?(L(mc,"Document no longer in limbo: "+r.key),n._c.removeReference(r.key,e),n._c.containsKey(r.key)||xf(n,r.key)):B(19791,{hc:r})}function ZI(n,e){const t=e.key,r=t.path.canonicalString();n.rc.get(t)||n.nc.has(r)||(L(mc,"New document in limbo: "+t),n.nc.add(r),gc(n))}function gc(n){for(;n.nc.size>0&&n.rc.size<n.maxConcurrentLimboResolutions;){const e=n.nc.values().next().value;n.nc.delete(e);const t=new F(Z.fromString(e)),r=n.uc.next();n.sc.set(r,new qI(t)),n.rc=n.rc.insert(t,r),Ef(n.remoteStore,new Rt(ft(Ma(t.path)),r,"TargetPurposeLimboResolution",Bi.ce))}}async function bs(n,e,t){const r=H(n),s=[],i=[],a=[];r.ec.isEmpty()||(r.ec.forEach(((c,l)=>{a.push(r.lc(l,e,t).then((h=>{var f;if((h||t)&&r.isPrimaryClient){const m=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(l.targetId))==null?void 0:f.current;r.sharedClientState.updateQueryState(l.targetId,m?"current":"not-current")}if(h){s.push(h);const m=oc.vo(l.targetId,h);i.push(m)}})))})),await Promise.all(a),r.Xu.zn(s),await(async function(l,h){const f=H(l);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(m=>N.forEach(h,(w=>N.forEach(w.wo,(S=>f.persistence.referenceDelegate.addReference(m,w.targetId,S))).next((()=>N.forEach(w.bo,(S=>f.persistence.referenceDelegate.removeReference(m,w.targetId,S)))))))))}catch(m){if(!lr(m))throw m;L(ac,"Failed to update sequence numbers: "+m)}for(const m of h){const w=m.targetId;if(!m.fromCache){const S=f.$o.get(w),C=S.snapshotVersion,M=S.withLastLimboFreeSnapshotVersion(C);f.$o=f.$o.insert(w,M)}}})(r.localStore,i))}async function ev(n,e){const t=H(n);if(!t.currentUser.isEqual(e)){L(mc,"User change. New user:",e.toKey());const r=await _f(t.localStore,e);t.currentUser=e,(function(i,a){i.ac.forEach((c=>{c.forEach((l=>{l.reject(new O(V.CANCELLED,a))}))})),i.ac.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await bs(t,r.zo)}}function tv(n,e){const t=H(n),r=t.sc.get(e);if(r&&r.Zu)return K().add(r.key);{let s=K();const i=t.tc.get(e);if(!i)return s;for(const a of i??[]){const c=t.ec.get(a);s=s.unionWith(c.view.Uu)}return s}}function Of(n){const e=H(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Nf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=tv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=YI.bind(null,e),e.Xu.zn=UI.bind(null,e.eventManager),e.Xu.Ec=FI.bind(null,e.eventManager),e}function nv(n){const e=H(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=JI.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=XI.bind(null,e),e}class Di{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Gi(e.databaseInfo.databaseId),this.sharedClientState=this.Rc(e),this.persistence=this.Ic(e),await this.persistence.start(),this.localStore=this.Ac(e),this.gcScheduler=this.Vc(e,this.localStore),this.indexBackfillerScheduler=this.dc(e,this.localStore)}Vc(e,t){return null}dc(e,t){return null}Ac(e){return mI(this.persistence,new dI,e.initialUser,this.serializer)}Ic(e){return new gf(ic.C_,this.serializer)}Rc(e){return new II}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Di.provider={build:()=>new Di};class rv extends Di{constructor(e){super(),this.cacheSizeBytes=e}Vc(e,t){U(this.persistence.referenceDelegate instanceof Ni,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new oT(r,e.asyncQueue,t)}Ic(e){const t=this.cacheSizeBytes!==void 0?Fe.withCacheSize(this.cacheSizeBytes):Fe.DEFAULT;return new gf((r=>Ni.C_(r,t)),this.serializer)}}class ma{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Fl(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=ev.bind(null,this.syncEngine),await OI(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new MI})()}createDatastore(e){const t=Gi(e.databaseInfo.databaseId),r=JE(e.databaseInfo);return nT(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,a,c){return new AI(r,s,i,a,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>Fl(this.syncEngine,t,0)),(function(){return Al.C()?new Al:new GE})())}createSyncEngine(e,t){return(function(s,i,a,c,l,h,f){const m=new jI(s,i,a,c,l,h);return f&&(m.cc=!0),m})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(s){const i=H(s);L(Et,"RemoteStore shutting down."),i.tu.add(5),await Ss(i),i.ru.shutdown(),i.iu.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}ma.provider={build:()=>new ma};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lf{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.mc(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.mc(this.observer.error,e):Nt("Uncaught Error in snapshot listener:",e.toString()))}gc(){this.muted=!0}mc(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ln="FirestoreClient";class sv{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Ue.UNAUTHENTICATED,this.clientId=Na.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async a=>{L(ln,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(L(ln,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new St;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=fc(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function jo(n,e){n.asyncQueue.verifyOperationInProgress(),L(ln,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await _f(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function $l(n,e){n.asyncQueue.verifyOperationInProgress();const t=await iv(n);L(ln,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>Ll(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>Ll(e.remoteStore,s))),n._onlineComponents=e}async function iv(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){L(ln,"Using user provided OfflineComponentProvider");try{await jo(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===V.FAILED_PRECONDITION||s.code===V.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;gt("Error using user provided cache. Falling back to memory cache: "+t),await jo(n,new Di)}}else L(ln,"Using default OfflineComponentProvider"),await jo(n,new rv(void 0));return n._offlineComponents}async function Mf(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(L(ln,"Using user provided OnlineComponentProvider"),await $l(n,n._uninitializedComponentsProvider._online)):(L(ln,"Using default OnlineComponentProvider"),await $l(n,new ma))),n._onlineComponents}function ov(n){return Mf(n).then((e=>e.syncEngine))}async function Uf(n){const e=await Mf(n),t=e.eventManager;return t.onListen=zI.bind(null,e.syncEngine),t.onUnlisten=GI.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=HI.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=KI.bind(null,e.syncEngine),t}function av(n,e,t={}){const r=new St;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,c,l,h){const f=new Lf({next:w=>{f.gc(),a.enqueueAndForget((()=>Pf(i,m)));const S=w.docs.has(c);!S&&w.fromCache?h.reject(new O(V.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&w.fromCache&&l&&l.source==="server"?h.reject(new O(V.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(w)},error:w=>h.reject(w)}),m=new Sf(Ma(c.path),f,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return Rf(i,m)})(await Uf(n),n.asyncQueue,e,t,r))),r.promise}function cv(n,e,t={}){const r=new St;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,c,l,h){const f=new Lf({next:w=>{f.gc(),a.enqueueAndForget((()=>Pf(i,m))),w.fromCache&&l.source==="server"?h.reject(new O(V.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(w)},error:w=>h.reject(w)}),m=new Sf(c instanceof Kr?zw(c):c,f,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return Rf(i,m)})(await Uf(n),n.asyncQueue,e,t,r))),r.promise}function uv(n,e){const t=new St;return n.asyncQueue.enqueueAndForget((async()=>QI(await ov(n),e,t))),t.promise}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ql="AsyncQueue";class jl{constructor(e=Promise.resolve()){this.qc=[],this.$c=!1,this.Kc=[],this.Wc=null,this.Qc=!1,this.Gc=!1,this.zc=[],this.xn=new Bd(this,"async_queue_retry"),this.jc=()=>{const r=qo();r&&L(ql,"Visibility state changed to "+r.visibilityState),this.xn.gn()},this.Hc=e;const t=qo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.jc)}get isShuttingDown(){return this.$c}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Jc(),this.Yc(e)}enterRestrictedMode(e){if(!this.$c){this.$c=!0,this.Gc=e||!1;const t=qo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.jc)}}enqueue(e){if(this.Jc(),this.$c)return new Promise((()=>{}));const t=new St;return this.Yc((()=>this.$c&&this.Gc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.qc.push(e),this.Zc())))}async Zc(){if(this.qc.length!==0){try{await this.qc[0](),this.qc.shift(),this.xn.reset()}catch(e){if(!lr(e))throw e;L(ql,"Operation failed with retryable error: "+e)}this.qc.length>0&&this.xn.mn((()=>this.Zc()))}}Yc(e){const t=this.Hc.then((()=>(this.Qc=!0,e().catch((r=>{throw this.Wc=r,this.Qc=!1,Nt("INTERNAL UNHANDLED ERROR: ",zl(r)),r})).then((r=>(this.Qc=!1,r))))));return this.Hc=t,t}enqueueAfterDelay(e,t,r){this.Jc(),this.zc.indexOf(e)>-1&&(t=0);const s=dc.createAndSchedule(this,e,t,r,(i=>this.Xc(i)));return this.Kc.push(s),s}Jc(){this.Wc&&B(47125,{el:zl(this.Wc)})}verifyOperationInProgress(){}async tl(){let e;do e=this.Hc,await e;while(e!==this.Hc)}nl(e){for(const t of this.Kc)if(t.timerId===e)return!0;return!1}rl(e){return this.tl().then((()=>{this.Kc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.Kc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.tl()}))}il(e){this.zc.push(e)}Xc(e){const t=this.Kc.indexOf(e);this.Kc.splice(t,1)}}function zl(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class $n extends ja{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new jl,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new jl(e),this._firestoreClient=void 0,await e}}}function MA(n,e,t){t||(t=Ei);const r=Oi(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(bn(i,e))return s;throw new O(V.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new O(V.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<jd)throw new O(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&Ln(e.host)&&ya(e.host),r.initialize({options:e,instanceIdentifier:t})}function _c(n){if(n._terminated)throw new O(V.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||lv(n),n._firestoreClient}function lv(n){var r,s,i,a;const e=n._freezeSettings(),t=sT(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,e);n._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((a=e.localCache)!=null&&a._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new sv(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(l){const h=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(h),_online:h}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hv{convertValue(e,t="none"){switch(ye(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ie(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(nn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw B(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return dn(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){var r,s,i;const t=(i=(s=(r=e.fields)==null?void 0:r[ns].arrayValue)==null?void 0:s.values)==null?void 0:i.map((a=>ie(a.doubleValue)));return new qe(t)}convertGeoPoint(e){return new mt(ie(e.latitude),ie(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=ws(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(nr(e));default:return null}}convertTimestamp(e){const t=tn(e);return new re(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Z.fromString(e);U(Ld(r),9688,{name:e});const s=new ts(r.get(1),r.get(3)),i=new F(r.popFirst(5));return s.isEqual(t)||Nt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ff extends hv{constructor(e){super(),this.firestore=e}convertBytes(e){return new Xe(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ce(this.firestore,null,t)}}const Hl="@firebase/firestore",Wl="4.16.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bf{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ce(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new dv(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Dn("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class dv extends Bf{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fv(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new O(V.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class yc{}class pv extends yc{}function UA(n,e,...t){let r=[];e instanceof yc&&r.push(e),r=r.concat(t),(function(i){const a=i.filter((l=>l instanceof Ec)).length,c=i.filter((l=>l instanceof oo)).length;if(a>1||a>0&&c>0)throw new O(V.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class oo extends pv{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new oo(e,t,r)}_apply(e){const t=this._parse(e);return $f(e._query,t),new hr(e.firestore,e.converter,ra(e._query,t))}_parse(e){const t=Qi(e.firestore);return(function(i,a,c,l,h,f,m){let w;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new O(V.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Kl(m,f);const C=[];for(const M of m)C.push(Gl(l,i,M));w={arrayValue:{values:C}}}else w=Gl(l,i,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Kl(m,f),w=gT(c,a,m,f==="in"||f==="not-in");return pe.create(h,f,w)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function FA(n,e,t){const r=e,s=Dn("where",n);return oo._create(s,r,t)}class Ec extends yc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Ec(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:st.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let a=s;const c=i.getFlattenedFilters();for(const l of c)$f(a,l),a=ra(a,l)})(e._query,t),new hr(e.firestore,e.converter,ra(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Gl(n,e,t){if(typeof(t=oe(t))=="string"){if(t==="")throw new O(V.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!vd(e)&&t.indexOf("/")!==-1)throw new O(V.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Z.fromString(t));if(!F.isDocumentKey(r))throw new O(V.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return ul(n,new F(r))}if(t instanceof ce)return ul(n,t._key);throw new O(V.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Fi(t)}.`)}function Kl(n,e){if(!Array.isArray(n)||n.length===0)throw new O(V.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function $f(n,e){const t=(function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new O(V.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new O(V.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function qf(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class $r{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Pn extends Bf{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ui(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Dn("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new O(V.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Pn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Pn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Pn._jsonSchema={type:me("string",Pn._jsonSchemaVersion),bundleSource:me("string","DocumentSnapshot"),bundleName:me("string"),bundle:me("string")};class ui extends Pn{data(e={}){return super.data(e)}}class Zn{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new $r(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new ui(this._firestore,this._userDataWriter,r.key,r,new $r(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new O(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((c=>{we(s._snapshot.query)?la(s._snapshot.query):Ua(s.query._query);const l=new ui(s._firestore,s._userDataWriter,c.doc.key,c.doc,new $r(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const l=new ui(s._firestore,s._userDataWriter,c.doc.key,c.doc,new $r(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:mv(c.type),doc:l,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new O(V.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Zn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Na.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function mv(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return B(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Zn._jsonSchemaVersion="firestore/querySnapshot/1.0",Zn._jsonSchema={type:me("string",Zn._jsonSchemaVersion),bundleSource:me("string","QuerySnapshot"),bundleName:me("string"),bundle:me("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BA(n){n=_t(n,ce);const e=_t(n.firestore,$n),t=_c(e);return av(t,n._key).then((r=>gv(e,n,r)))}function $A(n){n=_t(n,hr);const e=_t(n.firestore,$n),t=_c(e),r=new Ff(e);return fv(n._query),cv(t,n._query).then((s=>new Zn(e,r,n,s)))}function qA(n,e,t){n=_t(n,ce);const r=_t(n.firestore,$n),s=qf(n.converter,e,t),i=Qi(r);return ao(r,[Wd(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,Ze.none())])}function jA(n,e,t,...r){n=_t(n,ce);const s=_t(n.firestore,$n),i=Qi(s);let a;return a=typeof(e=oe(e))=="string"||e instanceof Ki?mT(i,"updateDoc",n._key,e,t,r):pT(i,"updateDoc",n._key,e),ao(s,[a.toMutation(n._key,Ze.exists(!0))])}function zA(n){return ao(_t(n.firestore,$n),[new La(n._key,Ze.none())])}function HA(n,e){const t=_t(n.firestore,$n),r=lT(n),s=qf(n.converter,e),i=Qi(n.firestore);return ao(t,[Wd(i,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Ze.exists(!1))]).then((()=>r))}function ao(n,e){const t=_c(n);return uv(t,e)}function gv(n,e,t){const r=t.docs.get(e._key),s=new Ff(n);return new Pn(n,s,e._key,r,new $r(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){vy(Mn),Cn(new Zt("firestore",((r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new $n(new Py(r.getProvider("auth-internal")),new Cy(a,r.getProvider("app-check-internal")),Ky(a,s),a);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),ht(Hl,Wl,e),ht(Hl,Wl,"esm2020")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jf="firebasestorage.googleapis.com",zf="storageBucket",_v=120*1e3,yv=600*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le extends Tt{constructor(e,t,r=0){super(zo(e),`Firebase Storage: ${t} (${zo(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,le.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return zo(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var ue;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(ue||(ue={}));function zo(n){return"storage/"+n}function Tc(){const n="An unknown error occurred, please check the error payload for server response.";return new le(ue.UNKNOWN,n)}function Ev(n){return new le(ue.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function Tv(n){return new le(ue.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function wv(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new le(ue.UNAUTHENTICATED,n)}function Iv(){return new le(ue.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function vv(n){return new le(ue.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function Av(){return new le(ue.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Rv(){return new le(ue.CANCELED,"User canceled the upload/download.")}function Pv(n){return new le(ue.INVALID_URL,"Invalid URL '"+n+"'.")}function Sv(n){return new le(ue.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function bv(){return new le(ue.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+zf+"' property when initializing the app?")}function Cv(){return new le(ue.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function Vv(){return new le(ue.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function Nv(n){return new le(ue.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function ga(n){return new le(ue.INVALID_ARGUMENT,n)}function Hf(){return new le(ue.APP_DELETED,"The Firebase app was deleted.")}function kv(n){return new le(ue.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Yr(n,e){return new le(ue.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function Or(n){throw new le(ue.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=Ye.makeFromUrl(e,t)}catch{return new Ye(e,"")}if(r.path==="")return r;throw Sv(e)}static makeFromUrl(e,t){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(ee){ee.path.charAt(ee.path.length-1)==="/"&&(ee.path_=ee.path_.slice(0,-1))}const a="(/(.*))?$",c=new RegExp("^gs://"+s+a,"i"),l={bucket:1,path:3};function h(ee){ee.path_=decodeURIComponent(ee.path)}const f="v[A-Za-z0-9_]+",m=t.replace(/[.]/g,"\\."),w="(/([^?#]*).*)?$",S=new RegExp(`^https?://${m}/${f}/b/${s}/o${w}`,"i"),C={bucket:1,path:3},M=t===jf?"(?:storage.googleapis.com|storage.cloud.google.com)":t,D="([^?#]*)",j=new RegExp(`^https?://${M}/${s}/${D}`,"i"),X=[{regex:c,indices:l,postModify:i},{regex:S,indices:C,postModify:h},{regex:j,indices:{bucket:1,path:2},postModify:h}];for(let ee=0;ee<X.length;ee++){const he=X[ee],de=he.regex.exec(e);if(de){const I=de[he.indices.bucket];let g=de[he.indices.path];g||(g=""),r=new Ye(I,g),he.postModify(r);break}}if(r==null)throw Pv(e);return r}}class Dv{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xv(n,e,t){let r=1,s=null,i=null,a=!1,c=0;function l(){return c===2}let h=!1;function f(...D){h||(h=!0,e.apply(null,D))}function m(D){s=setTimeout(()=>{s=null,n(S,l())},D)}function w(){i&&clearTimeout(i)}function S(D,...j){if(h){w();return}if(D){w(),f.call(null,D,...j);return}if(l()||a){w(),f.call(null,D,...j);return}r<64&&(r*=2);let X;c===1?(c=2,X=0):X=(r+Math.random())*1e3,m(X)}let C=!1;function M(D){C||(C=!0,w(),!h&&(s!==null?(D||(c=2),clearTimeout(s),m(0)):D||(c=1)))}return m(0),i=setTimeout(()=>{a=!0,M(!0)},t),M}function Ov(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lv(n){return n!==void 0}function Mv(n){return typeof n=="object"&&!Array.isArray(n)}function wc(n){return typeof n=="string"||n instanceof String}function Ql(n){return Ic()&&n instanceof Blob}function Ic(){return typeof Blob<"u"}function Yl(n,e,t,r){if(r<e)throw ga(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw ga(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vc(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function Wf(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const s=e(r)+"="+e(n[r]);t=t+s+"&"}return t=t.slice(0,-1),t}var Sn;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(Sn||(Sn={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uv(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,i=e.indexOf(n)!==-1;return t||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fv{constructor(e,t,r,s,i,a,c,l,h,f,m,w=!0,S=!1){this.url_=e,this.method_=t,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=a,this.callback_=c,this.errorCallback_=l,this.timeout_=h,this.progressCallback_=f,this.connectionFactory_=m,this.retry=w,this.isUsingEmulator=S,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((C,M)=>{this.resolve_=C,this.reject_=M,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new Js(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const a=c=>{const l=c.loaded,h=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,h)};this.progressCallback_!==null&&i.addUploadProgressListener(a),i.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(a),this.pendingConnection_=null;const c=i.getErrorCode()===Sn.NO_ERROR,l=i.getStatus();if(!c||Uv(l,this.additionalRetryCodes_)&&this.retry){const f=i.getErrorCode()===Sn.ABORT;r(!1,new Js(!1,null,f));return}const h=this.successCodes_.indexOf(l)!==-1;r(!0,new Js(h,i))})},t=(r,s)=>{const i=this.resolve_,a=this.reject_,c=s.connection;if(s.wasSuccessCode)try{const l=this.callback_(c,c.getResponse());Lv(l)?i(l):i()}catch(l){a(l)}else if(c!==null){const l=Tc();l.serverResponse=c.getErrorText(),this.errorCallback_?a(this.errorCallback_(c,l)):a(l)}else if(s.canceled){const l=this.appDelete_?Hf():Rv();a(l)}else{const l=Av();a(l)}};this.canceled_?t(!1,new Js(!1,null,!0)):this.backoffId_=xv(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&Ov(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Js{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function Bv(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function $v(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function qv(n,e){e&&(n["X-Firebase-GMPID"]=e)}function jv(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function zv(n,e,t,r,s,i,a=!0,c=!1){const l=Wf(n.urlParams),h=n.url+l,f=Object.assign({},n.headers);return qv(f,e),Bv(f,t),$v(f,i),jv(f,r),new Fv(h,n.method,f,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,a,c)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hv(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Wv(...n){const e=Hv();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Ic())return new Blob(n);throw new le(ue.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function Gv(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kv(n){if(typeof atob>"u")throw Nv("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Ho{constructor(e,t){this.data=e,this.contentType=t||null}}function Qv(n,e){switch(n){case lt.RAW:return new Ho(Gf(e));case lt.BASE64:case lt.BASE64URL:return new Ho(Kf(n,e));case lt.DATA_URL:return new Ho(Jv(e),Xv(e))}throw Tc()}function Gf(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const i=r,a=n.charCodeAt(++t);r=65536|(i&1023)<<10|a&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function Yv(n){let e;try{e=decodeURIComponent(n)}catch{throw Yr(lt.DATA_URL,"Malformed data URL.")}return Gf(e)}function Kf(n,e){switch(n){case lt.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw Yr(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case lt.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw Yr(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=Kv(e)}catch(s){throw s.message.includes("polyfill")?s:Yr(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}class Qf{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw Yr(lt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=Zv(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function Jv(n){const e=new Qf(n);return e.base64?Kf(lt.BASE64,e.rest):Yv(e.rest)}function Xv(n){return new Qf(n).contentType}function Zv(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(e,t){let r=0,s="";Ql(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(Ql(this.data_)){const r=this.data_,s=Gv(r,e,t);return s===null?null:new Gt(s)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new Gt(r,!0)}}static getBlob(...e){if(Ic()){const t=e.map(r=>r instanceof Gt?r.data_:r);return new Gt(Wv.apply(null,t))}else{const t=e.map(a=>wc(a)?Qv(lt.RAW,a).data:a.data_);let r=0;t.forEach(a=>{r+=a.byteLength});const s=new Uint8Array(r);let i=0;return t.forEach(a=>{for(let c=0;c<a.length;c++)s[i++]=a[c]}),new Gt(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yf(n){let e;try{e=JSON.parse(n)}catch{return null}return Mv(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eA(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function tA(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function Jf(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nA(n,e){return e}class xe{constructor(e,t,r,s){this.server=e,this.local=t||e,this.writable=!!r,this.xform=s||nA}}let Xs=null;function rA(n){return!wc(n)||n.length<2?n:Jf(n)}function Xf(){if(Xs)return Xs;const n=[];n.push(new xe("bucket")),n.push(new xe("generation")),n.push(new xe("metageneration")),n.push(new xe("name","fullPath",!0));function e(i,a){return rA(a)}const t=new xe("name");t.xform=e,n.push(t);function r(i,a){return a!==void 0?Number(a):a}const s=new xe("size");return s.xform=r,n.push(s),n.push(new xe("timeCreated")),n.push(new xe("updated")),n.push(new xe("md5Hash",null,!0)),n.push(new xe("cacheControl",null,!0)),n.push(new xe("contentDisposition",null,!0)),n.push(new xe("contentEncoding",null,!0)),n.push(new xe("contentLanguage",null,!0)),n.push(new xe("contentType",null,!0)),n.push(new xe("metadata","customMetadata",!0)),Xs=n,Xs}function sA(n,e){function t(){const r=n.bucket,s=n.fullPath,i=new Ye(r,s);return e._makeStorageReference(i)}Object.defineProperty(n,"ref",{get:t})}function iA(n,e,t){const r={};r.type="file";const s=t.length;for(let i=0;i<s;i++){const a=t[i];r[a.local]=a.xform(r,e[a.server])}return sA(r,n),r}function Zf(n,e,t){const r=Yf(e);return r===null?null:iA(n,r,t)}function oA(n,e,t,r){const s=Yf(e);if(s===null||!wc(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const a=encodeURIComponent;return i.split(",").map(h=>{const f=n.bucket,m=n.fullPath,w="/b/"+a(f)+"/o/"+a(m),S=vc(w,t,r),C=Wf({alt:"media",token:h});return S+C})[0]}function aA(n,e){const t={},r=e.length;for(let s=0;s<r;s++){const i=e[s];i.writable&&(t[i.server]=n[i.local])}return JSON.stringify(t)}class ep{constructor(e,t,r,s){this.url=e,this.method=t,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tp(n){if(!n)throw Tc()}function cA(n,e){function t(r,s){const i=Zf(n,s,e);return tp(i!==null),i}return t}function uA(n,e){function t(r,s){const i=Zf(n,s,e);return tp(i!==null),oA(i,s,n.host,n._protocol)}return t}function np(n){function e(t,r){let s;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?s=Iv():s=wv():t.getStatus()===402?s=Tv(n.bucket):t.getStatus()===403?s=vv(n.path):s=r,s.status=t.getStatus(),s.serverResponse=r.serverResponse,s}return e}function lA(n){const e=np(n);function t(r,s){let i=e(r,s);return r.getStatus()===404&&(i=Ev(n.path)),i.serverResponse=s.serverResponse,i}return t}function hA(n,e,t){const r=e.fullServerUrl(),s=vc(r,n.host,n._protocol),i="GET",a=n.maxOperationRetryTime,c=new ep(s,i,uA(n,t),a);return c.errorHandler=lA(e),c}function dA(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function fA(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=dA(null,e)),r}function pA(n,e,t,r,s){const i=e.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};function c(){let X="";for(let ee=0;ee<2;ee++)X=X+Math.random().toString().slice(2);return X}const l=c();a["Content-Type"]="multipart/related; boundary="+l;const h=fA(e,r,s),f=aA(h,t),m="--"+l+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+f+`\r
--`+l+`\r
Content-Type: `+h.contentType+`\r
\r
`,w=`\r
--`+l+"--",S=Gt.getBlob(m,r,w);if(S===null)throw Cv();const C={name:h.fullPath},M=vc(i,n.host,n._protocol),D="POST",j=n.maxUploadRetryTime,G=new ep(M,D,cA(n,t),j);return G.urlParams=C,G.headers=a,G.body=S.uploadData(),G.errorHandler=np(e),G}class mA{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Sn.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Sn.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Sn.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,s,i){if(this.sent_)throw Or("cannot .send() more than once");if(Ln(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),i!==void 0)for(const a in i)i.hasOwnProperty(a)&&this.xhr_.setRequestHeader(a,i[a].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Or("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Or("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Or("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Or("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class gA extends mA{initXhr(){this.xhr_.responseType="text"}}function rp(){return new gA}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(e,t){this._service=e,t instanceof Ye?this._location=t:this._location=Ye.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new On(e,t)}get root(){const e=new Ye(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Jf(this._location.path)}get storage(){return this._service}get parent(){const e=eA(this._location.path);if(e===null)return null;const t=new Ye(this._location.bucket,e);return new On(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw kv(e)}}function _A(n,e,t){n._throwIfRoot("uploadBytes");const r=pA(n.storage,n._location,Xf(),new Gt(e,!0),t);return n.storage.makeRequestWithTokens(r,rp).then(s=>({metadata:s,ref:n}))}function yA(n){n._throwIfRoot("getDownloadURL");const e=hA(n.storage,n._location,Xf());return n.storage.makeRequestWithTokens(e,rp).then(t=>{if(t===null)throw Vv();return t})}function EA(n,e){const t=tA(n._location.path,e),r=new Ye(n._location.bucket,t);return new On(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TA(n){return/^[A-Za-z]+:\/\//.test(n)}function wA(n,e){return new On(n,e)}function sp(n,e){if(n instanceof Ac){const t=n;if(t._bucket==null)throw bv();const r=new On(t,t._bucket);return e!=null?sp(r,e):r}else return e!==void 0?EA(n,e):n}function IA(n,e){if(e&&TA(e)){if(n instanceof Ac)return wA(n,e);throw ga("To use ref(service, url), the first argument must be a Storage instance.")}else return sp(n,e)}function Jl(n,e){const t=e==null?void 0:e[zf];return t==null?null:Ye.makeFromBucketSpec(t,n)}function vA(n,e,t,r={}){n.host=`${e}:${t}`;const s=Ln(e);s&&ya(`https://${n.host}/b`),n._isUsingEmulator=!0,n._protocol=s?"https":"http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:Kp(i,n.app.options.projectId))}class Ac{constructor(e,t,r,s,i,a=!1){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._isUsingEmulator=a,this._bucket=null,this._host=jf,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=_v,this._maxUploadRetryTime=yv,this._requests=new Set,s!=null?this._bucket=Ye.makeFromBucketSpec(s,this._host):this._bucket=Jl(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Ye.makeFromBucketSpec(this._url,e):this._bucket=Jl(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Yl("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Yl("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(Be(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new On(this,e)}_makeRequest(e,t,r,s,i=!0){if(this._deleted)return new Dv(Hf());{const a=zv(e,this._appId,r,s,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(e,t){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,s).getPromise()}}const Xl="@firebase/storage",Zl="0.14.3";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ip="storage";function WA(n,e,t){return n=oe(n),_A(n,e,t)}function GA(n){return n=oe(n),yA(n)}function KA(n,e){return n=oe(n),IA(n,e)}function QA(n=ah(),e){n=oe(n);const r=Oi(n,ip).getImmediate({identifier:e}),s=Gp("storage");return s&&AA(r,...s),r}function AA(n,e,t,r={}){vA(n,e,t,r)}function RA(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new Ac(t,r,s,e,Mn)}function PA(){Cn(new Zt(ip,RA,"PUBLIC").setMultipleInstances(!0)),ht(Xl,Zl,""),ht(Xl,Zl,"esm2020")}PA();export{jt as G,re as T,MA as a,QA as b,BA as c,lT as d,CA as e,DA as f,xA as g,bA as h,Xm as i,VA as j,LA as k,$A as l,jA as m,zA as n,kA as o,HA as p,UA as q,KA as r,qA as s,WA as t,NA as u,GA as v,FA as w};
