(()=>{var e={320:(e,r,t)=>{var n=t(366),o=t(120);function s(){return(new Date).getTime()}var i,a=Array.prototype.slice,u={};i="undefined"!=typeof global&&global.console?global.console:"undefined"!=typeof window&&window.console?window.console:{};for(var c=[[function(){},"log"],[function(){i.log.apply(i,arguments)},"info"],[function(){i.log.apply(i,arguments)},"warn"],[function(){i.warn.apply(i,arguments)},"error"],[function(e){u[e]=s()},"time"],[function(e){var r=u[e];if(!r)throw new Error("No such label: "+e);delete u[e];var t=s()-r;i.log(e+": "+t+"ms")},"timeEnd"],[function(){var e=new Error;e.name="Trace",e.message=n.format.apply(null,arguments),i.error(e.stack)},"trace"],[function(e){i.log(n.inspect(e)+"\n")},"dir"],[function(e){if(!e){var r=a.call(arguments,1);o.ok(!1,n.format.apply(null,r))}},"assert"]],d=0;d<c.length;d++){var l=c[d],p=l[0],f=l[1];i[f]||(i[f]=p)}e.exports=i},512:e=>{var r,t,n=e.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function i(e){if(r===setTimeout)return setTimeout(e,0);if((r===o||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:o}catch(e){r=o}try{t="function"==typeof clearTimeout?clearTimeout:s}catch(e){t=s}}();var a,u=[],c=!1,d=-1;function l(){c&&a&&(c=!1,a.length?u=a.concat(u):d=-1,u.length&&p())}function p(){if(!c){var e=i(l);c=!0;for(var r=u.length;r;){for(a=u,u=[];++d<r;)a&&a[d].run();d=-1,r=u.length}a=null,c=!1,function(e){if(t===clearTimeout)return clearTimeout(e);if((t===s||!t)&&clearTimeout)return t=clearTimeout,clearTimeout(e);try{return t(e)}catch(r){try{return t.call(null,e)}catch(r){return t.call(this,e)}}}(e)}}function f(e,r){this.fun=e,this.array=r}function y(){}n.nextTick=function(e){var r=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)r[t-1]=arguments[t];u.push(new f(e,r)),1!==u.length||c||i(p)},f.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.browser=!0,n.env={},n.argv=[],n.version="",n.versions={},n.on=y,n.addListener=y,n.once=y,n.off=y,n.removeListener=y,n.removeAllListeners=y,n.emit=y,n.prependListener=y,n.prependOnceListener=y,n.listeners=function(e){return[]},n.binding=function(e){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(e){throw new Error("process.chdir is not supported")},n.umask=function(){return 0}},291:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.users=void 0;const n=t(968);r.users=[{userId:(0,n.randomUUID)(),username:"John",age:22,hobbies:["swimming","playing football"]},{userId:(0,n.randomUUID)(),username:"Peter",age:32,hobbies:["Boxing","Videogames"]}]},664:(e,r,t)=>{"use strict";var n=t(320);Object.defineProperty(r,"__esModule",{value:!0}),r.serveDelete=void 0;const o=t(844),s=t(291);r.serveDelete=function(e,r,t){if(!(0,o.isValidUUID)(t))return r.statusCode=400,r.setHeader("Content-Type","application/json"),r.end(JSON.stringify({message:"Error: not valid User ID!"}));{let e=s.users.find((e=>e.userId===t));if(!e)return r.statusCode=404,r.setHeader("Content-Type","application/json"),r.end(JSON.stringify({message:'Error: User Id doesn"t exist!'}));try{let t=s.users.findIndex((r=>r.userId===e.userId));return s.users.splice(t,1),r.statusCode=204,r.setHeader("Content-Type","application/json"),r.end()}catch(e){n.error(e)}}}},944:(e,r,t)=>{"use strict";var n=t(320);Object.defineProperty(r,"__esModule",{value:!0}),r.serveGetRequest=void 0;const o=t(844);r.serveGetRequest=function(e,r,t,s){if("/"===e.url)r.writeHead(200,{"Content-Type":"text/plain"}),r.end("HOME");else{if("/api/users"!==e.url){if(e.url===`/api/users/${t}`){if(!(0,o.isValidUUID)(t))return r.writeHead(400,{"Content-Type":"application/json"}),r.end(JSON.stringify({error:"User is invalid UUId"}));let e=s.find((e=>e.userId===t));return n.log(e,"user"),e?(r.writeHead(200,{"Content-Type":"application/json"}),r.end(JSON.stringify(e))):(r.writeHead(404,{"Content-Type":"application/json"}),r.end(JSON.stringify({error:"User not found"})))}return r.writeHead(404),r.end("Page not found")}r.writeHead(200,{"Content-Type":"application/json"}),r.end(JSON.stringify(s))}}},935:(e,r,t)=>{"use strict";var n=t(320);Object.defineProperty(r,"__esModule",{value:!0}),r.servePostRequest=void 0;const o=t(291),s=t(188),i=t(316);r.servePostRequest=function(e,r){let t="";e.on("data",(e=>{t+=e.toString()})),e.on("end",(()=>{try{const e=JSON.parse(t);let a={userId:"",username:"",age:0,hobbies:[]};if(n.log("Request body:",e),(0,s.isCorrectUserBodyFormat)(e)){let t=(0,i.createNewUSer)(a,e);return o.users.unshift(t),n.log(o.users),r.statusCode=200,r.setHeader("Content-Type","application/json"),r.end(JSON.stringify({message:"User added successfully"}))}return r.statusCode=400,r.setHeader("Content-Type","application/json"),r.end(JSON.stringify({error:"Invalid JSON data"}))}catch(e){n.error("Error parsing request body:",e),r.statusCode=400,r.setHeader("Content-Type","application/json"),r.end(JSON.stringify({error:"Error"}))}}))}},540:(e,r,t)=>{"use strict";var n=t(320);Object.defineProperty(r,"__esModule",{value:!0}),r.servePut=void 0;const o=t(291),s=t(844),i=t(32);r.servePut=function(e,r,t){if(!(0,s.isValidUUID)(t))return r.statusCode=400,r.setHeader("Content-Type","application/json"),r.end(JSON.stringify({error:"User Id is invalid!"}));{let s=o.users.find((e=>e.userId===t)),a="";e.on("data",(e=>{a+=e.toString()})),e.on("end",(()=>{const e=JSON.parse(a);if(!s)return r.statusCode=404,r.setHeader("Content-Type","application/json"),r.end(JSON.stringify({error:"User Id record doesnt exist!"}));try{return r.statusCode=200,(0,i.updateUser)(s,e),r.setHeader("Content-Type","application/json"),r.end(JSON.stringify({message:"User updated successfully"}))}catch(e){n.log("error: ",e)}}))}}},316:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.createNewUSer=void 0;const n=t(60);r.createNewUSer=function(e,r){return e.userId=(0,n.randomUUID)(),e.username=r.username,e.age=parseInt(r.age),e.hobbies=r.hobbies,e}},188:(e,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.isCorrectUserBodyFormat=void 0,r.isCorrectUserBodyFormat=function(e){if("string"==typeof e.username&&"string"==typeof e.age&&Array.isArray(e.hobbies)&&3===Object.keys(e).length)return!0}},844:(e,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.isValidUUID=void 0,r.isValidUUID=e=>/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)},32:(e,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.updateUser=void 0,r.updateUser=function(e,r){return e.username=r.username,e.age=parseInt(r.age),e.hobbies=r.hobbies,e}},120:e=>{"use strict";e.exports=require("assert")},192:e=>{"use strict";e.exports=require("dotenv/config")},366:e=>{"use strict";e.exports=require("util")},968:e=>{"use strict";e.exports=require("crypto")},60:e=>{"use strict";e.exports=require("node:crypto")},736:e=>{"use strict";e.exports=require("node:http")}},r={};function t(n){var o=r[n];if(void 0!==o)return o.exports;var s=r[n]={exports:{}};return e[n](s,s.exports,t),s.exports}(()=>{"use strict";var e=t(320),r=t(512);t(192);const n=t(736),o=t(291),s=t(944),i=t(935),a=t(540),u=t(664);(0,n.createServer)(((e,r)=>{const t=null==e?void 0:e.url.split("/"),n=t[t.length-1];if("GET"===e.method)try{(0,s.serveGetRequest)(e,r,n,o.users)}catch(e){return r.writeHead(500,{"Content-Type":"application/json"}),r.end(JSON.stringify({error:"Sorry for inconvenience, please try again"}))}else if("POST"===e.method&&"/api/users"===e.url)try{(0,i.servePostRequest)(e,r)}catch(e){return r.writeHead(500,{"Content-Type":"application/json"}),r.end(JSON.stringify({error:"Sorry for inconvenience, please try again"}))}else if("PUT"===e.method&&e.url===`/api/users/${n}`)try{(0,a.servePut)(e,r,n)}catch(e){return r.writeHead(500,{"Content-Type":"application/json"}),r.end(JSON.stringify({error:"Sorry for inconvenience, please try again"}))}else if("DELETE"===e.method&&e.url===`/api/users/${n}`)try{(0,u.serveDelete)(e,r,n)}catch(e){return r.writeHead(500,{"Content-Type":"application/json"}),r.end(JSON.stringify({error:"Sorry for inconvenience, please try again!"}))}})).listen("3000",(()=>e.log("server running on 3000"))),e.log(`HEY ${r.env.HELLO}`)})()})();