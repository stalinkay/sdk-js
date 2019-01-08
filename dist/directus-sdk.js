!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.DirectusSDK=e():t.DirectusSDK=e()}(global,function(){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){function n(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=[],n=!0,o=!1,i=void 0;try{for(var s,c=t[Symbol.iterator]();!(n=(s=c.next()).done)&&(r.push(s.value),!e||r.length!==e);n=!0);}catch(t){o=!0,i=t}finally{try{n||null==c.return||c.return()}finally{if(o)throw i}}return r}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var s=r(1),c=r(2),a=r(3),l=r(4);function u(t){var e=t.split(".")[1].replace("-","+").replace("_","/"),r=c.decode(e),n=JSON.parse(r);return l.isNumber(n.exp)&&(n.exp=new Date(1e3*n.exp)),n}function h(){var t,e,r,c=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},h="_";if(c.storage){var p=c.storage.getItem("directus-sdk-js");p&&(t=(p=JSON.parse(p)).token,e=p.url,h=p.project,r=p.localExp)}c.token&&(t=c.token),c.url&&(e=c.url),c.project&&(h=c.project),c.localExp&&(r=c.localExp);var d={url:e,token:t,project:h,localExp:r,axios:s.create({paramsSerializer:a.stringify,timeout:6e5}),refreshInterval:null,onAutoRefreshError:null,onAutoRefreshSuccess:null,storage:c.storage||null,get payload(){return l.isString(this.token)?u(this.token):null},get loggedIn(){return!!(l.isString(this.token)&&l.isString(this.url)&&l.isString(this.project)&&l.isObject(this.payload)&&this.localExp>Date.now())},request:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=arguments.length>4&&void 0!==arguments[4]&&arguments[4],s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};l.string(t,"method"),l.string(e,"endpoint"),l.objectOrEmpty(r,"params"),Array.isArray(n)?l.arrayOrEmpty(n,"data"):l.objectOrEmpty(n,"data"),l.string(this.url,"this.url");var c="".concat(this.url,"/");!1===o&&(c+="".concat(this.project,"/"));var a={url:e,method:t,baseURL:c,params:r,data:n};return this.token&&"string"==typeof this.token&&this.token.length>0&&(a.headers=s,a.headers.Authorization="Bearer ".concat(this.token)),this.axios.request(a).then(function(t){return t.data}).then(function(t){if(!t||0===t.length)return t;if("object"!==i(t))try{return JSON.parse(t)}catch(e){throw{json:!0,error:e,data:t}}return t}).catch(function(t){throw t.response?t.response.data.error:!0===t.json?{code:-2,message:"API returned invalid JSON",error:t.error,data:t.data}:{code:-1,message:"Network Error",error:t}})},get:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return l.string(t,"endpoint"),l.objectOrEmpty(e,"params"),this.request("get",t,e)},post:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return l.string(t,"endpoint"),Array.isArray(e)?l.arrayOrEmpty(e,"body"):l.objectOrEmpty(e,"body"),this.request("post",t,r,e)},patch:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return l.string(t,"endpoint"),Array.isArray(e)?l.arrayOrEmpty(e,"body"):l.objectOrEmpty(e,"body"),this.request("patch",t,r,e)},put:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return l.string(t,"endpoint"),Array.isArray(e)?l.arrayOrEmpty(e,"body"):l.objectOrEmpty(e,"body"),this.request("put",t,r,e)},delete:function(t){return l.string(t,"endpoint"),this.request("delete",t)},login:function(t){var e=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{persist:!0};return l.object(t,"credentials"),l.keysWithString(t,["email","password"],"credentials"),this.token=null,l.hasKeysWithString(t,["url"])&&(this.url=t.url),l.hasKeysWithString(t,["project"])&&(this.project=t.project),(t.persist||r.persist)&&this.startInterval(),new Promise(function(r,n){e.post("/auth/authenticate",{email:t.email,password:t.password}).then(function(t){return t.data.token}).then(function(t){e.token=t,e.localExp=new Date(Date.now()+3e5).getTime(),e.storage&&e.storage.setItem("directus-sdk-js",JSON.stringify({token:e.token,url:e.url,project:e.project,localExp:e.localExp})),r({url:e.url,project:e.project,token:e.token,localExp:e.localExp})}).catch(n)})},logout:function(){this.token=null,this.refreshInterval&&this.stopInterval(),this.storage&&this.storage.removeItem("directus-sdk-js")},reset:function(){this.logout(),this.url=null,this.project=null},startInterval:function(t){t&&this.refreshIfNeeded(),this.refreshInterval=setInterval(this.refreshIfNeeded.bind(this),1e4)},stopInterval:function(){clearInterval(this.refreshInterval),this.refreshInterval=null},refreshIfNeeded:function(){var t=this;if(l.hasStringKeys(this,["token","url","project"])&&this.payload&&this.payload.exp){var e=this.localExp-Date.now();e<=0?l.isFunction(this.onAutoRefreshError)&&this.onAutoRefreshError({message:"auth_expired_token",code:102}):e<3e4&&this.refresh(this.token).then(function(e){t.token=e.data.token,t.localExp=new Date(Date.now()+3e5).getTime(),l.isFunction(t.onAutoRefreshSuccess)&&t.onAutoRefreshSuccess({url:t.url,project:t.project,token:t.token,localExp:t.localExp}),t.storage&&t.storage.setItem("directus-sdk-js",JSON.stringify({token:t.token,url:t.url,project:t.project,localExp:t.localExp}))}).catch(function(e){l.isFunction(t.onAutoRefreshError)&&t.onAutoRefreshError(e)})}},refresh:function(t){return l.string(t,"token"),this.post("/auth/refresh",{token:t})},requestPasswordReset:function(t){return l.string(t,"email"),this.post("/auth/reset-request",{email:t,instance:this.url})},getActivity:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return l.objectOrEmpty(t,"params"),this.get("/activity",t)},getMyBookmarks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return l.string(this.token,"this.token"),l.objectOrEmpty(t),Promise.all([this.get("/collection_presets",{"filter[title][nnull]":1,"filter[user][eq]":this.payload.id}),this.get("/collection_presets",{"filter[title][nnull]":1,"filter[role][eq]":this.payload.role,"filter[user][null]":1})]).then(function(t){var e=o(t,2),r=e[0],i=e[1];return n(r.data).concat(n(i.data))})},getCollections:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return l.objectOrEmpty(t,"params"),this.get("/collections",t)},getCollection:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return l.string(t,"collection"),l.objectOrEmpty(e,"params"),this.get("/collections/".concat(t),e)},createCollection:function(t){return l.object(t,"data"),this.post("/collections",t)},updateCollection:function(t,e){return l.string(t,"collection"),l.object(e,"data"),this.patch("/collections/".concat(t),e)},deleteCollection:function(t){return l.string(t,"collection"),this.delete("/collections/".concat(t))},createCollectionPreset:function(t){return l.object(t),this.post("/collection_presets",t)},updateCollectionPreset:function(t,e){return l.notNull(t,"primaryKey"),l.object(e,"data"),this.patch("/collection_presets/".concat(t),e)},deleteCollectionPreset:function(t){return l.notNull(t,"primaryKey"),this.delete("/collection_presets/".concat(t))},updateDatabase:function(){return this.post("/update")},getInterfaces:function(){return this.request("get","/interfaces",{},{},!0)},getLayouts:function(){return this.request("get","/layouts",{},{},!0)},getPages:function(){return this.request("get","/pages",{},{},!0)},getAllFields:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return l.objectOrEmpty(t,"params"),this.get("/fields",t)},getFields:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return l.string(t,"collection"),l.objectOrEmpty(e,"params"),this.get("/fields/".concat(t),e)},getField:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return l.string(t,"collection"),l.string(e,"fieldName"),l.objectOrEmpty(r,"params"),this.get("/fields/".concat(t,"/").concat(e),r)},createField:function(t,e){return l.string(t,"collection"),l.object(e,"fieldInfo"),this.post("/fields/".concat(t),e)},updateField:function(t,e,r){return l.string(t,"collection"),l.string(e,"fieldName"),l.object(r,"fieldInfo"),this.patch("/fields/".concat(t,"/").concat(e),r)},updateFields:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return l.string(t,"collection"),l.array(e,"fieldsInfoOrFieldNames"),r&&l.object(r),r?this.patch("/fields/".concat(t,"/").concat(e.join(",")),r):this.patch("/fields/".concat(t),e)},deleteField:function(t,e){return l.string(t,"collection"),l.string(e,"fieldName"),this.delete("/fields/".concat(t,"/").concat(e))},uploadFiles:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},r={"Content-Type":"multipart/form-data",Authorization:"Bearer ".concat(this.token)};return this.axios.post("".concat(this.url,"/").concat(this.project,"/files"),t,{headers:r,onUploadProgress:e}).then(function(t){return t.data}).catch(function(t){throw t.response?t.response.data.error:{code:-1,message:"Network Error",error:t}})},updateItem:function(t,e,r){return l.string(t,"collection"),l.notNull(e,"primaryKey"),l.object(r,"body"),t.startsWith("directus_")?this.patch("/".concat(t.substring(9),"/").concat(e),r):this.patch("/items/".concat(t,"/").concat(e),r)},updateItems:function(t,e){return l.string(t,"collection"),l.array(e,"body"),t.startsWith("directus_")?this.patch("/".concat(t.substring(9)),e):this.patch("/items/".concat(t),e)},createItem:function(t,e){return l.string(t,"collection"),l.object(e,"body"),t.startsWith("directus_")?this.post("/".concat(t.substring(9)),e):this.post("/items/".concat(t),e)},createItems:function(t,e){return l.string(t,"collection"),l.array(e,"body"),t.startsWith("directus_")?this.post("/".concat(t.substring(9)),e):this.post("/items/".concat(t),e)},getItems:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return l.string(t,"collection"),l.objectOrEmpty(e,"params"),t.startsWith("directus_")?this.get("/".concat(t.substring(9)),e):this.get("/items/".concat(t),e)},getItem:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return l.string(t,"collection"),l.notNull(e,"primaryKey"),l.objectOrEmpty(r,"params"),t.startsWith("directus_")?this.get("/".concat(t.substring(9),"/").concat(e),r):this.get("/items/".concat(t,"/").concat(e),r)},deleteItem:function(t,e){return l.string(t,"collection"),l.notNull(e,"primaryKey"),t.startsWith("directus_")?this.delete("/".concat(t.substring(9),"/").concat(e)):this.delete("/items/".concat(t,"/").concat(e))},deleteItems:function(t,e){return l.string(t,"collection"),l.array(e,"primaryKeys"),t.startsWith("directus_")?this.delete("/".concat(t.substring(9),"/").concat(e.join())):this.delete("/items/".concat(t,"/").concat(e.join()))},getMyListingPreferences:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return l.string(this.token,"this.token"),l.objectOrEmpty(e,"params"),Promise.all([this.get("/collection_presets",{limit:1,"filter[title][null]":1,"filter[collection][eq]":t,"filter[role][null]":1,"filter[user][null]":1,sort:"-id"}),this.get("/collection_presets",{limit:1,"filter[title][null]":1,"filter[collection][eq]":t,"filter[role][eq]":this.payload.role,"filter[user][null]":1,sort:"-id"}),this.get("/collection_presets",{limit:1,"filter[title][null]":1,"filter[collection][eq]":t,"filter[role][eq]":this.payload.role,"filter[user][eq]":this.payload.id,sort:"-id"})]).then(function(t){var e=o(t,3),r=e[0],n=e[1],i=e[2];return i.data&&i.data.length>0?i.data[0]:n.data&&n.data.length>0?n.data[0]:r.data&&r.data.length>0?r.data[0]:{}})},getPermissions:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return l.objectOrEmpty(t,"params"),this.getItems("directus_permissions",t)},getMyPermissions:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return l.objectOrEmpty(t,"params"),this.get("/permissions/me",t)},createPermissions:function(t){return l.array(t),this.post("/permissions",t)},updatePermissions:function(t){return l.array(t),this.patch("/permissions",t)},getRelations:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return l.objectOrEmpty(t),this.get("/relations",t)},createRelation:function(t){return this.post("/relations",t)},updateRelation:function(t,e){return this.patch("/relations/".concat(t),e)},getCollectionRelations:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return l.string(t,"collection"),l.objectOrEmpty(e),Promise.all([this.get("/relations",{"filter[collection_a][eq]":t}),this.get("/relations",{"filter[collection_b][eq]":t})])},getItemRevisions:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return l.string(t,"collection"),l.notNull(e,"primaryKey"),l.objectOrEmpty(r,"params"),t.startsWith("directus_")?this.get("/".concat(t.substring(9),"/").concat(e,"/revisions"),r):this.get("/items/".concat(t,"/").concat(e,"/revisions"),r)},revert:function(t,e,r){return l.string(t,"collection"),l.notNull(e,"primaryKey"),l.number(r,"revisionID"),t.startsWith("directus_")?this.patch("/".concat(t.substring(9),"/").concat(e,"/revert/").concat(r)):this.patch("/items/".concat(t,"/").concat(e,"/revert/").concat(r))},getRole:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return l.number(t,"primaryKey"),l.objectOrEmpty(e,"params"),this.get("/roles/".concat(t),e)},getRoles:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return l.objectOrEmpty(t,"params"),this.get("/roles",t)},updateRole:function(t,e){return l.notNull(t,"primaryKey"),l.object(e,"body"),this.updateItem("directus_roles",t,e)},createRole:function(t){return l.object(t,"body"),this.createItem("directus_roles",t)},deleteRole:function(t){return l.notNull(t,"primaryKey"),this.deleteItem("directus_roles",t)},getSettings:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return l.objectOrEmpty(t,"params"),this.get("/settings",t)},getSettingsFields:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return l.objectOrEmpty(t,"params"),this.get("/settings/fields",t)},getUsers:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return l.objectOrEmpty(t,"params"),this.get("/users",t)},getUser:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return l.notNull(t,"primaryKey"),l.objectOrEmpty(e,"params"),this.get("/users/".concat(t),e)},getMe:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return l.objectOrEmpty(t,"params"),this.get("/users/me",t)},updateUser:function(t,e){return l.notNull(t,"primaryKey"),l.object(e,"body"),this.updateItem("directus_users",t,e)},ping:function(){return this.request("get","/server/ping",{},{},!0)},serverInfo:function(){return this.request("get","/",{},{},!0)},getThirdPartyAuthProviders:function(){return this.get("/auth/sso")}};return d.token&&d.startInterval(!0),d}h.getPayload=u,t.exports=h},function(t,e){t.exports=require("axios")},function(t,e){t.exports=require("base-64")},function(t,e){t.exports=require("qs")},function(t,e){t.exports=require("argument-validator")}])});