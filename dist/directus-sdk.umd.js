(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("DirectusSDK", [], factory);
	else if(typeof exports === 'object')
		exports["DirectusSDK"] = factory();
	else
		root["DirectusSDK"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/argument-validator/argument-validator.js":
/*!***************************************************************!*\
  !*** ./node_modules/argument-validator/argument-validator.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function () {
    /*
     * We only define the is/has* functions and use the
     * demand() function to build the demands, also the
     * getDemandMethodNameByValidatorKey() (yeh, I know it's an ugly name :()
     * build the demand method based in the .is/has methods
     */

    var v = { };

    if ( true && module.exports) {
        module.exports = v;
    } else {
        this.ArgumentValidator = v;
    }

    var demand = function (demandMethodName, validator) {
        return function (value /* ... more args, name */) {
            if (validator.apply(v, arguments)) {
                return true;
            }

            var name = null;
            if (arguments.length > 1) {
                var name = Array.prototype.slice.call(arguments, -1)[0];
            }

            if (v.isJson(value)) {
                value = JSON.stringify(value);
            }

            var msg = "Invalid " + demandMethodName + " value: " + value;
            if (v.isString(name)) {
                msg += "\nArgument Name: " + name;
            }

            if (v.isArray(arguments[1])) {
                msg += "\nKeys: " + arguments[1].join(", ");
            }

            throw new Error(msg);
        }
    };

    var getDemandMethodNameByValidatorKey = function (key) {
        var prefix = [ 'is', 'has' ];
        var prefixLength = null;

        for (var i = 0; i < prefix.length; i++) {
            prefixLength = prefix[i].length;

            if (key.slice(0, prefixLength) === prefix[i]) {
                break;
            }
        }

        var demandMethodName = key.slice(prefixLength + 1);
        var firstLetter = key.slice(prefixLength, prefixLength + 1).toLowerCase();
        var name = firstLetter + demandMethodName;

        return name;
    };

    var hasKeysWith = function (validator, obj, keys) {
        if (!v.isObjectOrEmpty(obj) || !v.isArrayOrEmpty(keys)) {
            return false;
        }

        var length = keys.length;
        for (var i = 0; i < length; i++) {
            if (!Object.prototype.hasOwnProperty.call(obj, keys[i])) {
                return false;
            }

            if (!validator(obj[keys[i]])) {
                return false;
            }
        }

        return true;
    };

    var isArrayOf = function (validator, arr) {
        if (!v.isArray(arr)) {
            return false;
        }

        var length = arr.length;
        for (var i = 0; i < length; i++) {
            if (!validator(arr[i])) {
                return false;
            }
        }

        return true;
    };

    v.isNotNull = function (value) {
        return value !== null && value !== undefined;
    };

    v.isInstanceOf = function(type, value) {
        return value instanceof type;
    };

    v.isType = function (type, value) {
        return Object.prototype.toString.call(value) === "[object " + type + "]";
    };

    v.isBoolean = function (value) {
        return ([ 1, 0, true, false ].indexOf(value) > -1);
    };

    v.isStringOrEmpty = function (value) {
        return v.isType("String", value);
    };

    v.isString = function (value) {
        if (!v.isStringOrEmpty(value)) {
            return false;
        }
        return /\S/.test(value);
    };

    v.isNumber = function (value) {
        if (!v.isType('Number', value)) {
            return false;
        }

        return isFinite(value) && !isNaN(parseFloat(value));
    };

    v.isArrayOrEmpty = function (arr) {
        return v.isType("Array", arr);
    };

    v.isArray = function (arr) {
        if (!v.isArrayOrEmpty(arr)) {
            return false;
        }

        return arr.length > 0;
    };

    v.isArrayOfNumbers = function (arr) {
        return isArrayOf(v.isNumber, arr);
    };

    v.isArrayOfObjects = function (arr) {
        return isArrayOf(v.isObject, arr);
    };

    v.isObjectOrEmpty = function (obj) {
        return v.isType("Object", obj);
    };

    v.isObject = function (obj) {
        if (!v.isObjectOrEmpty(obj)) {
            return false;
        }

        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                return true;
            }
        }

        return false;
    };

    v.isJson = function (value) {
        if (!v.isObjectOrEmpty(value)) {
            return false;
        }

        try {
            JSON.stringify(value);
        } catch (err) {
            return false;
        }

        return true;
    };

    v.isJsonString = function (value) {
        if (!v.isString(value)) {
            return false;
        }

        try {
            JSON.parse(value);
        } catch (err) {
            return false;
        }

        return true;
    };

    v.hasKeys = function (obj, keys) {
        return hasKeysWith(v.isNotNull, obj, keys);
    };

    v.hasKeysWithNumber = v.hasNumberKeys = function (obj, keys) {
        return hasKeysWith(v.isNumber, obj, keys);
    };

    v.hasKeysWithString = v.hasStringKeys = function (obj, keys) {
        return hasKeysWith(v.isString, obj, keys);
    };

    v.hasKeysWithObject = v.hasObjectKeys = function (obj, keys) {
        return hasKeysWith(v.isObject, obj, keys);
    };

    v.hasKeysWithStringOrEmpty = v.hasStringOrEmptyKeys = function (obj, keys) {
        return hasKeysWith(v.isStringOrEmpty, obj, keys);
    };

    v.hasKeysWithObjectOrEmpty = v.hasObjectOrEmptyKeys = function (obj, keys) {
        return hasKeysWith(v.isObjectOrEmpty, obj, keys);
    };

    v.isFunction = function (value) {
        return v.isInstanceOf(Function, value);
    };

    // build demand functions
    for (var key in v) {
        var demandMethodName = getDemandMethodNameByValidatorKey(key);
        v[demandMethodName] = demand(demandMethodName, v[key]);
    }

}).call(this);


/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "./node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ( true &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/base-64/base64.js":
/*!****************************************!*\
  !*** ./node_modules/base-64/base64.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */
;(function(root) {

	// Detect free variables `exports`.
	var freeExports =  true && exports;

	// Detect free variable `module`.
	var freeModule =  true && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code, and use
	// it as `root`.
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var InvalidCharacterError = function(message) {
		this.message = message;
	};
	InvalidCharacterError.prototype = new Error;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	var error = function(message) {
		// Note: the error messages used throughout this file match those used by
		// the native `atob`/`btoa` implementation in Chromium.
		throw new InvalidCharacterError(message);
	};

	var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	// http://whatwg.org/html/common-microsyntaxes.html#space-character
	var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

	// `decode` is designed to be fully compatible with `atob` as described in the
	// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
	// The optimized base64-decoding algorithm used is based on @atk’s excellent
	// implementation. https://gist.github.com/atk/1020396
	var decode = function(input) {
		input = String(input)
			.replace(REGEX_SPACE_CHARACTERS, '');
		var length = input.length;
		if (length % 4 == 0) {
			input = input.replace(/==?$/, '');
			length = input.length;
		}
		if (
			length % 4 == 1 ||
			// http://whatwg.org/C#alphanumeric-ascii-characters
			/[^+a-zA-Z0-9/]/.test(input)
		) {
			error(
				'Invalid character: the string to be decoded is not correctly encoded.'
			);
		}
		var bitCounter = 0;
		var bitStorage;
		var buffer;
		var output = '';
		var position = -1;
		while (++position < length) {
			buffer = TABLE.indexOf(input.charAt(position));
			bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
			// Unless this is the first of a group of 4 characters…
			if (bitCounter++ % 4) {
				// …convert the first 8 bits to a single ASCII character.
				output += String.fromCharCode(
					0xFF & bitStorage >> (-2 * bitCounter & 6)
				);
			}
		}
		return output;
	};

	// `encode` is designed to be fully compatible with `btoa` as described in the
	// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
	var encode = function(input) {
		input = String(input);
		if (/[^\0-\xFF]/.test(input)) {
			// Note: no need to special-case astral symbols here, as surrogates are
			// matched, and the input is supposed to only contain ASCII anyway.
			error(
				'The string to be encoded contains characters outside of the ' +
				'Latin1 range.'
			);
		}
		var padding = input.length % 3;
		var output = '';
		var position = -1;
		var a;
		var b;
		var c;
		var d;
		var buffer;
		// Make sure any padding is handled outside of the loop.
		var length = input.length - padding;

		while (++position < length) {
			// Read three bytes, i.e. 24 bits.
			a = input.charCodeAt(position) << 16;
			b = input.charCodeAt(++position) << 8;
			c = input.charCodeAt(++position);
			buffer = a + b + c;
			// Turn the 24 bits into four chunks of 6 bits each, and append the
			// matching character for each of them to the output.
			output += (
				TABLE.charAt(buffer >> 18 & 0x3F) +
				TABLE.charAt(buffer >> 12 & 0x3F) +
				TABLE.charAt(buffer >> 6 & 0x3F) +
				TABLE.charAt(buffer & 0x3F)
			);
		}

		if (padding == 2) {
			a = input.charCodeAt(position) << 8;
			b = input.charCodeAt(++position);
			buffer = a + b;
			output += (
				TABLE.charAt(buffer >> 10) +
				TABLE.charAt((buffer >> 4) & 0x3F) +
				TABLE.charAt((buffer << 2) & 0x3F) +
				'='
			);
		} else if (padding == 1) {
			buffer = input.charCodeAt(position);
			output += (
				TABLE.charAt(buffer >> 2) +
				TABLE.charAt((buffer << 4) & 0x3F) +
				'=='
			);
		}

		return output;
	};

	var base64 = {
		'encode': encode,
		'decode': decode,
		'version': '0.1.0'
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return base64;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else { var key; }

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/qs/lib/formats.js":
/*!****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),

/***/ "./node_modules/qs/lib/index.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ "./node_modules/qs/lib/stringify.js");
var parse = __webpack_require__(/*! ./parse */ "./node_modules/qs/lib/parse.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ "./node_modules/qs/lib/parse.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/parse.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder);
            val = options.decoder(part.slice(pos + 1), defaults.decoder);
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]') {
            obj = [];
            obj = obj.concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts ? utils.assign({}, opts) : {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),

/***/ "./node_modules/qs/lib/stringify.js":
/*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts ? utils.assign({}, opts) : {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats['default'];
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ "./node_modules/qs/lib/utils.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    var obj;

    while (queue.length) {
        var item = queue.pop();
        obj = item.obj[item.prop];

        if (Array.isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }

    return obj;
};

exports.arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function encode(str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

exports.compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    return compactQueue(queue);
};

exports.isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function isBuffer(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var base64 = __webpack_require__(/*! base-64 */ "./node_modules/base-64/base64.js");

var qs = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");

var AV = __webpack_require__(/*! argument-validator */ "./node_modules/argument-validator/argument-validator.js");
/**
 * Retrieves the payload from a JWT
 * @param  {String} token The JWT to retrieve the payload from
 * @return {Object}       The JWT payload
 */


function getPayload(token) {
  var payloadBase64 = token.split(".")[1].replace("-", "+").replace("_", "/");
  var payloadDecoded = base64.decode(payloadBase64);
  var payloadObject = JSON.parse(payloadDecoded);

  if (AV.isNumber(payloadObject.exp)) {
    payloadObject.exp = new Date(payloadObject.exp * 1000);
  }

  return payloadObject;
}
/**
 * Create a new SDK instance
 * @param       {object} [options]
 * @param       {string} [options.url]   The API url to connect to
 * @param       {string} [options.env]   The API environment to connect to
 * @param       {string} [options.token] The access token to use for requests
 * @constructor
 */


function SDK() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    url: options.url,
    token: options.token,
    env: options.env || "_",
    axios: axios.create({
      paramsSerializer: qs.stringify,
      timeout: 10 * 60 * 1000 // 10 min

    }),
    refreshInterval: null,
    onAutoRefreshError: null,
    onAutoRefreshSuccess: null,

    get payload() {
      if (!AV.isString(this.token)) return null;
      return getPayload(this.token);
    },

    get loggedIn() {
      if (AV.isString(this.token) && AV.isString(this.url) && AV.isString(this.env) && AV.isObject(this.payload)) {
        if (this.payload.exp.getTime() > Date.now()) {
          return true;
        }
      }

      return false;
    },

    // REQUEST METHODS
    // -------------------------------------------------------------------------

    /**
     * Directus API request promise
     * @promise RequestPromise
     * @fulfill {object} Directus data
     * @reject {Error} Network error (if no connection to API)
     * @reject {Error} Directus error (eg not logged in or 404)
     */

    /**
     * Perform an API request to the Directus API
     * @param  {string} method      The HTTP method to use
     * @param  {string} endpoint    The API endpoint to request
     * @param  {Object} [params={}] The HTTP query parameters (GET only)
     * @param  {Object} [data={}]   The HTTP request body (non-GET only)
     * @param  {Boolean} noEnv      Don't use the env in the path
     * @return {RequestPromise}
     */
    request: function request(method, endpoint) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var noEnv = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var headers = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      AV.string(method, "method");
      AV.string(endpoint, "endpoint");
      AV.objectOrEmpty(params, "params");
      Array.isArray(data) ? AV.arrayOrEmpty(data, "data") : AV.objectOrEmpty(data, "data");
      AV.string(this.url, "this.url");
      var baseURL = "".concat(this.url, "/");

      if (noEnv === false) {
        baseURL += "".concat(this.env, "/");
      }

      var requestOptions = {
        url: endpoint,
        method: method,
        baseURL: baseURL,
        params: params,
        data: data
      };

      if (this.token && typeof this.token === "string" && this.token.length > 0) {
        requestOptions.headers = headers;
        requestOptions.headers.Authorization = "Bearer ".concat(this.token);
      }

      return this.axios.request(requestOptions).then(function (res) {
        return res.data;
      }).then(function (data) {
        if (!data || data.length === 0) return data;

        if (_typeof(data) !== "object") {
          try {
            return JSON.parse(data);
          } catch (error) {
            throw {
              json: true,
              error: error,
              data: data
            };
          }
        }

        return data;
      }).catch(function (error) {
        if (error.response) {
          throw error.response.data.error;
        } else if (error.json === true) {
          throw {
            // eslint-disable-line
            code: -2,
            message: "API returned invalid JSON",
            error: error.error,
            data: error.data
          };
        } else {
          throw {
            // eslint-disable-line
            code: -1,
            message: "Network Error",
            error: error
          };
        }
      });
    },

    /**
     * GET convenience method. Calls the request method for you
     * @param  {string} endpoint    The endpoint to get
     * @param  {Object} [params={}] The HTTP query parameters (GET only)
     * @return {RequestPromise}
     */
    get: function get(endpoint) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.string(endpoint, "endpoint");
      AV.objectOrEmpty(params, "params");
      return this.request("get", endpoint, params);
    },

    /**
     * POST convenience method. Calls the request method for you
     * @param  {string} endpoint  The endpoint to get
     * @param  {Object} [body={}] The HTTP request body
     * @return {RequestPromise}
     */
    post: function post(endpoint) {
      var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(endpoint, "endpoint");
      Array.isArray(body) ? AV.arrayOrEmpty(body, "body") : AV.objectOrEmpty(body, "body");
      return this.request("post", endpoint, params, body);
    },

    /**
     * PATCH convenience method. Calls the request method for you
     * @param  {string} endpoint  The endpoint to get
     * @param  {Object} [body={}] The HTTP request body
     * @return {RequestPromise}
     */
    patch: function patch(endpoint) {
      var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(endpoint, "endpoint");
      Array.isArray(body) ? AV.arrayOrEmpty(body, "body") : AV.objectOrEmpty(body, "body");
      return this.request("patch", endpoint, params, body);
    },

    /**
     * PATCH convenience method. Calls the request method for you
     * @param  {string} endpoint  The endpoint to get
     * @param  {Object} [body={}] The HTTP request body
     * @return {RequestPromise}
     */
    put: function put(endpoint) {
      var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(endpoint, "endpoint");
      Array.isArray(body) ? AV.arrayOrEmpty(body, "body") : AV.objectOrEmpty(body, "body");
      return this.request("put", endpoint, params, body);
    },

    /**
     * PATCH convenience method. Calls the request method for you
     * @param  {string} endpoint  The endpoint to get
     * @return {RequestPromise}
     */
    delete: function _delete(endpoint) {
      AV.string(endpoint, "endpoint");
      return this.request("delete", endpoint);
    },
    // AUTHENTICATION
    // -------------------------------------------------------------------------

    /**
     * Logging in promise
     * @promise LoginPromise
     * @fulfill {Object} Object containing URL, ENV, and TOKEN
     * @reject {Error}   Network error (if no connection to API)
     * @reject {Error}   Directus error (eg not logged in or 404)
     */

    /**
     * Login to the API.
     *
     * Gets a new token from the API and stores it in this.token
     * @param  {Object} credentials
     * @param  {String} credentials.email    The user's email address
     * @param  {String} credentials.password The user's password
     * @param  {String} [credentials.url]    The API to login to (overwrites this.url)
     * @param  {String} [credentials.env]    The API env to login to (overwrites this.env)
     * @return {LoginPromise}
     */
    login: function login(credentials) {
      var _this = this;

      AV.object(credentials, "credentials");
      AV.keysWithString(credentials, ["email", "password"], "credentials");
      this.token = null;

      if (AV.hasKeysWithString(credentials, ["url"])) {
        this.url = credentials.url;
      }

      if (AV.hasKeysWithString(credentials, ["env"])) {
        this.env = credentials.env;
      }

      if (credentials.persist) {
        this.startInterval();
      }

      return new Promise(function (resolve, reject) {
        _this.post("/auth/authenticate", {
          email: credentials.email,
          password: credentials.password
        }).then(function (res) {
          return res.data.token;
        }).then(function (token) {
          _this.token = token;
          resolve({
            url: _this.url,
            env: _this.env,
            token: _this.token
          });
        }).catch(reject);
      });
    },

    /**
     * Logs the user out by "forgetting" the URL, ENV, and token, and clearing the refresh interval
     */
    logout: function logout() {
      this.token = null;
      this.env = "_";
      this.url = null;

      if (this.refreshInterval) {
        this.stopInterval();
      }
    },

    /**
     * Starts an interval of 10 seconds that will check if the token needs refreshing
     * @param {Boolean} fireImmediately Fire the refreshIfNeeded method directly
     */
    startInterval: function startInterval(fireImmediately) {
      if (fireImmediately) this.refreshIfNeeded();
      this.refreshInterval = setInterval(this.refreshIfNeeded.bind(this), 10000);
    },

    /**
     * Clears and nullifies the token refreshing interval
     */
    stopInterval: function stopInterval() {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    },

    /**
     * Refresh the token if it is about to expire (within 30 seconds of expiry date)
     *
     * Calls onAutoRefreshSuccess with the new token if the refreshing is successful
     * Calls onAutoRefreshError if refreshing the token fails for some reason
     */
    refreshIfNeeded: function refreshIfNeeded() {
      var _this2 = this;

      if (!AV.hasStringKeys(this, ["token", "url", "env"])) return;
      if (!this.payload || !this.payload.exp) return;
      var timeDiff = this.payload.exp.getTime() - Date.now();

      if (timeDiff <= 0) {
        if (AV.isFunction(this.onAutoRefreshError)) {
          this.onAutoRefreshError({
            message: "auth_expired_token",
            code: 102
          });
        }

        return;
      }

      if (timeDiff < 30000) {
        this.refresh(this.token).then(function (res) {
          _this2.token = res.data.token;

          if (AV.isFunction(_this2.onAutoRefreshSuccess)) {
            _this2.onAutoRefreshSuccess({
              url: _this2.url,
              env: _this2.env,
              token: _this2.token
            });
          }
        }).catch(function (error) {
          if (AV.isFunction(_this2.onAutoRefreshError)) {
            _this2.onAutoRefreshError(error);
          }
        });
      }
    },

    /**
     * Use the passed token to request a new one
     * @param  {String} token Active & Valid token
     * @return {RequestPromise}
     */
    refresh: function refresh(token) {
      AV.string(token, "token");
      return this.post("/auth/refresh", {
        token: token
      });
    },

    /**
     * Request to reset the password of the user with the given email address
     *
     * The API will send an email to the given email address with a link to generate a new
     * temporary password.
     * @param {String} email The user's email
     */
    requestPasswordReset: function requestPasswordReset(email) {
      AV.string(email, "email");
      return this.post("/auth/reset-request", {
        email: email,
        instance: this.url
      });
    },
    // ACTIVITY
    // -------------------------------------------------------------------------

    /**
     * Get activity
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getActivity: function getActivity() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/activity", params);
    },
    // BOOKMARKS
    // -------------------------------------------------------------------------

    /**
     * Get the bookmarks of the current user
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getMyBookmarks: function getMyBookmarks() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.string(this.token, "this.token");
      AV.objectOrEmpty(params);
      return Promise.all([this.get("/collection_presets", {
        "filter[title][nnull]": 1,
        "filter[user][eq]": this.payload.id
      }), this.get("/collection_presets", {
        "filter[title][nnull]": 1,
        "filter[role][eq]": this.payload.role,
        "filter[user][null]": 1
      })]).then(function (values) {
        var _values = _slicedToArray(values, 2),
            user = _values[0],
            role = _values[1]; // eslint-disable-line no-shadow


        return _toConsumableArray(user.data).concat(_toConsumableArray(role.data));
      });
    },
    // COLLECTIONS
    // -------------------------------------------------------------------------

    /**
     * Get all available collections
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getCollections: function getCollections() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/collections", params);
    },

    /**
     * Get collection info by name
     * @param  {String} collection  Collection name
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getCollection: function getCollection(collection) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.string(collection, "collection");
      AV.objectOrEmpty(params, "params");
      return this.get("/collections/".concat(collection), params);
    },

    /**
     * Create a collection
     * @param {Object} data Collection information
     * @return {RequestPromise}
     */
    createCollection: function createCollection(data) {
      AV.object(data, "data");
      return this.post("/collections", data);
    },

    /**
     * @param  {String} The collection to update
     * @param  {Object} The fields to update
     * @return {RequestPromise}
     */
    updateCollection: function updateCollection(collection, data) {
      AV.string(collection, "collection");
      AV.object(data, "data");
      return this.patch("/collections/".concat(collection), data);
    },

    /**
     * @param  {String} collection The primary key of the collection to remove
     * @return {RequestPromise}
     */
    deleteCollection: function deleteCollection(collection) {
      AV.string(collection, "collection");
      return this.delete("/collections/".concat(collection));
    },
    // COLLECTION PRESETS
    // -------------------------------------------------------------------------

    /**
     * Create a new collection preset (bookmark / listing preferences)
     * @param  {Object} data The bookmark info
     * @return {RequestPromise}
     */
    createCollectionPreset: function createCollectionPreset(data) {
      AV.object(data);
      return this.post("/collection_presets", data);
    },

    /**
     * Update collection preset (bookmark / listing preference)
     * @param {String|Number} primaryKey
     * @param {RequestPromise} data
     */
    updateCollectionPreset: function updateCollectionPreset(primaryKey, data) {
      AV.notNull(primaryKey, "primaryKey");
      AV.object(data, "data");
      return this.patch("/collection_presets/".concat(primaryKey), data);
    },

    /**
     * Delete collection preset by primarykey
     * @param {String|Number} primaryKey The primaryKey of the preset to delete
     */
    deleteCollectionPreset: function deleteCollectionPreset(primaryKey) {
      AV.notNull(primaryKey, "primaryKey");
      return this.delete("/collection_presets/".concat(primaryKey));
    },
    // DATABASE
    // ------------------------------------------------------------------------

    /**
     * This will update the database of the API instance to the latest version
     * using the migrations in the API
     * @return {RequestPromise}
     */
    updateDatabase: function updateDatabase() {
      return this.post("/update");
    },
    // EXTENSIONS
    // -------------------------------------------------------------------------

    /**
     * Get the meta information of all installed interfaces
     * @return {RequestPromise}
     */
    getInterfaces: function getInterfaces() {
      return this.request("get", "/interfaces", {}, {}, true);
    },

    /**
     * Get the meta information of all installed layouts
     * @return {RequestPromise}
     */
    getLayouts: function getLayouts() {
      return this.request("get", "/layouts", {}, {}, true);
    },

    /**
     * Get the meta information of all installed pages
     * @return {RequestPromise}
     */
    getPages: function getPages() {
      return this.request("get", "/pages", {}, {}, true);
    },
    // FIELDS
    // ------------------------------------------------------------------------

    /**
     * Get all fields that are in Directus
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getAllFields: function getAllFields() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/fields", params);
    },

    /**
     * Get the fields that have been setup for a given collection
     * @param  {String} collection  Collection name
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getFields: function getFields(collection) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.string(collection, "collection");
      AV.objectOrEmpty(params, "params");
      return this.get("/fields/".concat(collection), params);
    },

    /**
     * Get the field information for a single given field
     * @param  {String} collection  Collection name
     * @param  {String} fieldName   Field name
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getField: function getField(collection, fieldName) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(collection, "collection");
      AV.string(fieldName, "fieldName");
      AV.objectOrEmpty(params, "params");
      return this.get("/fields/".concat(collection, "/").concat(fieldName), params);
    },

    /**
     * Create a field in the given collection
     * @param  {String} collection Collection to add the field in
     * @param  {Object} fieldInfo  The fields info to save
     * @return {RequestPromise}
     */
    createField: function createField(collection, fieldInfo) {
      AV.string(collection, "collection");
      AV.object(fieldInfo, "fieldInfo");
      return this.post("/fields/".concat(collection), fieldInfo);
    },

    /**
     * Update a given field in a given collection
     * @param  {String} collection Field's parent collection
     * @param  {String} fieldName  Name of the field to update
     * @param  {Object} fieldInfo  Fields to update
     * @return {RequestPromise}
     */
    updateField: function updateField(collection, fieldName, fieldInfo) {
      AV.string(collection, "collection");
      AV.string(fieldName, "fieldName");
      AV.object(fieldInfo, "fieldInfo");
      return this.patch("/fields/".concat(collection, "/").concat(fieldName), fieldInfo);
    },

    /**
     * Update multiple fields at once
     * @param  {String} collection             Fields' parent collection
     * @param  {Array} fieldsInfoOrFieldNames  Array of field objects or array of field names
     * @param  {Object} [fieldInfo]            In case fieldsInfoOrFieldNames is an array of fieldNames, you need to provide the fields to update
     * @return {RequestPromise}
     *
     * @example
     *
     * // Set multiple fields to the same value
     * updateFields("projects", ["first_name", "last_name", "email"], {
     *   default_value: ""
     * })
     *
     * // Set multiple fields to different values
     * updateFields("projects", [
     *   {
     *     id: 14,
     *     sort: 1
     *   },
     *   {
     *     id: 17,
     *     sort: 2
     *   },
     *   {
     *     id: 912,
     *     sort: 3
     *   }
     * ])
     */
    updateFields: function updateFields(collection, fieldsInfoOrFieldNames) {
      var fieldInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      AV.string(collection, "collection");
      AV.array(fieldsInfoOrFieldNames, "fieldsInfoOrFieldNames");

      if (fieldInfo) {
        AV.object(fieldInfo);
      }

      if (fieldInfo) {
        return this.patch("/fields/".concat(collection, "/").concat(fieldsInfoOrFieldNames.join(",")), fieldInfo);
      }

      return this.patch("/fields/".concat(collection), fieldsInfoOrFieldNames);
    },

    /**
     * Delete a field from a collection
     * @param  {String} collection Name of the collection
     * @param  {String} fieldName  The name of the field to delete
     * @return {RequestPromise}
     */
    deleteField: function deleteField(collection, fieldName) {
      AV.string(collection, "collection");
      AV.string(fieldName, "fieldName");
      return this.delete("/fields/".concat(collection, "/").concat(fieldName));
    },
    // FILES
    // ------------------------------------------------------------------------

    /**
     * Upload multipart files in multipart/form-data
     * @param  {Object} data FormData object containing files
     * @return {RequestPromise}
     */
    uploadFiles: function uploadFiles(data) {
      var onUploadProgress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var headers = {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer ".concat(this.token)
      };
      return this.axios.post("".concat(this.url, "/").concat(this.env, "/files"), data, {
        headers: headers,
        onUploadProgress: onUploadProgress
      }).then(function (res) {
        return res.data;
      }).catch(function (error) {
        if (error.response) {
          throw error.response.data.error;
        } else {
          throw {
            // eslint-disable-line
            code: -1,
            message: "Network Error",
            error: error
          };
        }
      });
    },
    // ITEMS
    // -------------------------------------------------------------------------

    /**
     * Update an existing item
     * @param  {String} collection The collection to add the item to
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Object} body       The item's field values
     * @return {RequestPromise}
     */
    updateItem: function updateItem(collection, primaryKey, body) {
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");
      AV.object(body, "body");

      if (collection.startsWith("directus_")) {
        return this.patch("/".concat(collection.substring(9), "/").concat(primaryKey), body);
      }

      return this.patch("/items/".concat(collection, "/").concat(primaryKey), body);
    },

    /**
     * Update multiple items
     * @param  {String} collection The collection to add the item to
     * @param  {Array} body        The item's field values
     * @return {RequestPromise}
     */
    updateItems: function updateItems(collection, body) {
      AV.string(collection, "collection");
      AV.array(body, "body");

      if (collection.startsWith("directus_")) {
        return this.patch("/".concat(collection.substring(9)), body);
      }

      return this.patch("/items/".concat(collection), body);
    },

    /**
     * Create a new item
     * @param  {String} collection The collection to add the item to
     * @param  {Object} body       The item's field values
     * @return {RequestPromise}
     */
    createItem: function createItem(collection, body) {
      AV.string(collection, "collection");
      AV.object(body, "body");

      if (collection.startsWith("directus_")) {
        return this.post("/".concat(collection.substring(9)), body);
      }

      return this.post("/items/".concat(collection), body);
    },

    /**
     * Create multiple items
     * @param  {String} collection The collection to add the item to
     * @param  {Array} body        The item's field values
     * @return {RequestPromise}
     */
    createItems: function createItems(collection, body) {
      AV.string(collection, "collection");
      AV.array(body, "body");

      if (collection.startsWith("directus_")) {
        return this.post("/".concat(collection.substring(9)), body);
      }

      return this.post("/items/".concat(collection), body);
    },

    /**
     * Get items from a given collection
     * @param  {String} collection The collection to add the item to
     * @param  {Object} [params={}]   Query parameters
     * @return {RequestPromise}
     */
    getItems: function getItems(collection) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.string(collection, "collection");
      AV.objectOrEmpty(params, "params");

      if (collection.startsWith("directus_")) {
        return this.get("/".concat(collection.substring(9)), params);
      }

      return this.get("/items/".concat(collection), params);
    },

    /**
     * Get a single item by primary key
     * @param  {String} collection  The collection to add the item to
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getItem: function getItem(collection, primaryKey) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");
      AV.objectOrEmpty(params, "params");

      if (collection.startsWith("directus_")) {
        return this.get("/".concat(collection.substring(9), "/").concat(primaryKey), params);
      }

      return this.get("/items/".concat(collection, "/").concat(primaryKey), params);
    },

    /**
     * Delete a single item by primary key
     * @param  {String} collection  The collection to delete the item from
     * @param  {String|Number} primaryKey Primary key of the item
     * @return {RequestPromise}
     */
    deleteItem: function deleteItem(collection, primaryKey) {
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");

      if (collection.startsWith("directus_")) {
        return this.delete("/".concat(collection.substring(9), "/").concat(primaryKey));
      }

      return this.delete("/items/".concat(collection, "/").concat(primaryKey));
    },

    /**
     * Delete multiple items by primary key
     * @param  {String} collection  The collection to delete the item from
     * @param  {Array} primaryKey Primary key of the item
     * @return {RequestPromise}
     */
    deleteItems: function deleteItems(collection, primaryKeys) {
      AV.string(collection, "collection");
      AV.array(primaryKeys, "primaryKeys");

      if (collection.startsWith("directus_")) {
        return this.delete("/".concat(collection.substring(9), "/").concat(primaryKeys.join()));
      }

      return this.delete("/items/".concat(collection, "/").concat(primaryKeys.join()));
    },
    // LISTING PREFERENCES
    // -------------------------------------------------------------------------

    /**
     * Get the collection presets of the current user for a single collection
     * @param  {String} collection  Collection to fetch the preferences for
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getMyListingPreferences: function getMyListingPreferences(collection) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.string(this.token, "this.token");
      AV.objectOrEmpty(params, "params");
      return Promise.all([this.get("/collection_presets", {
        limit: 1,
        "filter[title][null]": 1,
        "filter[collection][eq]": collection,
        "filter[role][null]": 1,
        "filter[user][null]": 1,
        sort: "-id"
      }), this.get("/collection_presets", {
        limit: 1,
        "filter[title][null]": 1,
        "filter[collection][eq]": collection,
        "filter[role][eq]": this.payload.role,
        "filter[user][null]": 1,
        sort: "-id"
      }), this.get("/collection_presets", {
        limit: 1,
        "filter[title][null]": 1,
        "filter[collection][eq]": collection,
        "filter[role][eq]": this.payload.role,
        "filter[user][eq]": this.payload.id,
        sort: "-id"
      })]).then(function (values) {
        var _values2 = _slicedToArray(values, 3),
            collection = _values2[0],
            role = _values2[1],
            user = _values2[2]; // eslint-disable-line no-shadow


        if (user.data && user.data.length > 0) {
          return user.data[0];
        }

        if (role.data && role.data.length > 0) {
          return role.data[0];
        }

        if (collection.data && collection.data.length > 0) {
          return collection.data[0];
        }

        return {};
      });
    },
    // PERMISSIONS
    // -------------------------------------------------------------------------

    /**
     * Get permissions
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getPermissions: function getPermissions() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.getItems("directus_permissions", params);
    },

    /**
     * Get the currently logged in user's permissions
     * @param  {Object} params Query parameters
     * @return {RequestPromise}
     */
    getMyPermissions: function getMyPermissions() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/permissions/me", params);
    },

    /**
     * Create multiple new permissions
     * @param  {Array} data  Permission records to save
     * @return {RequestPromise}
     */
    createPermissions: function createPermissions(data) {
      AV.array(data);
      return this.post("/permissions", data);
    },

    /**
     * Update multiple permission records
     * @param  {Array} data  Permission records to update
     * @return {RequestPromise}
     */
    updatePermissions: function updatePermissions(data) {
      AV.array(data);
      return this.patch("/permissions", data);
    },
    // RELATIONS
    // -------------------------------------------------------------------------

    /**
     * Get all relationships
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getRelations: function getRelations() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params);
      return this.get("/relations", params);
    },
    createRelation: function createRelation(data) {
      return this.post("/relations", data);
    },
    updateRelation: function updateRelation(primaryKey, data) {
      return this.patch("/relations/".concat(primaryKey), data);
    },

    /**
     * Get the relationship information for the given collection
     * @param  {String} collection The collection name
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getCollectionRelations: function getCollectionRelations(collection) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.string(collection, "collection");
      AV.objectOrEmpty(params);
      return Promise.all([this.get("/relations", {
        "filter[collection_a][eq]": collection
      }), this.get("/relations", {
        "filter[collection_b][eq]": collection
      })]);
    },
    // REVISIONS
    // -------------------------------------------------------------------------

    /**
     * Get a single item's revisions by primary key
     * @param  {String} collection  The collection to fetch the revisions from
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getItemRevisions: function getItemRevisions(collection, primaryKey) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");
      AV.objectOrEmpty(params, "params");

      if (collection.startsWith("directus_")) {
        return this.get("/".concat(collection.substring(9), "/").concat(primaryKey, "/revisions"), params);
      }

      return this.get("/items/".concat(collection, "/").concat(primaryKey, "/revisions"), params);
    },

    /**
     * revert an item to a previous state
     * @param  {String} collection  The collection to fetch the revisions from
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Number} revisionID The ID of the revision to revert to
     * @return {RequestPromise}
     */
    revert: function revert(collection, primaryKey, revisionID) {
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");
      AV.number(revisionID, "revisionID");

      if (collection.startsWith("directus_")) {
        return this.patch("/".concat(collection.substring(9), "/").concat(primaryKey, "/revert/").concat(revisionID));
      }

      return this.patch("/items/".concat(collection, "/").concat(primaryKey, "/revert/").concat(revisionID));
    },
    // ROLES
    // -------------------------------------------------------------------------

    /**
     * Get a single user role
     * @param  {Number} primaryKey  The id of the user rol to get
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getRole: function getRole(primaryKey) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.number(primaryKey, "primaryKey");
      AV.objectOrEmpty(params, "params");
      return this.get("/roles/".concat(primaryKey), params);
    },

    /**
     * Get the user roles
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getRoles: function getRoles() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/roles", params);
    },

    /**
     * Update a user role
     * @param  {Number} primaryKey The ID of the role
     * @param  {Object} body       The fields to update
     * @return {RequestPromise}
     */
    updateRole: function updateRole(primaryKey, body) {
      AV.notNull(primaryKey, "primaryKey");
      AV.object(body, "body");
      return this.updateItem("directus_roles", primaryKey, body);
    },

    /**
     * Create a new user role
     * @param  {Object} body The role information
     * @return {RequestPromise}
     */
    createRole: function createRole(body) {
      AV.object(body, "body");
      return this.createItem("directus_roles", body);
    },

    /**
     * Delete a user rol by primary key
     * @param  {Number | String} primaryKey Primary key of the user role
     * @return {RequestPromise}
     */
    deleteRole: function deleteRole(primaryKey) {
      AV.notNull(primaryKey, "primaryKey");
      return this.deleteItem("directus_roles", primaryKey);
    },
    // SETTINGS
    // -------------------------------------------------------------------------

    /**
     * Get Directus' global settings
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getSettings: function getSettings() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/settings", params);
    },

    /**
     * Get the "fields" for directus_settings
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getSettingsFields: function getSettingsFields() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/settings/fields", params);
    },
    // USERS
    // -------------------------------------------------------------------------

    /**
     * Get a list of available users in Directus
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getUsers: function getUsers() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/users", params);
    },

    /**
     * Get a single Directus user
     * @param  {String} primaryKey  The unique identifier of the user
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getUser: function getUser(primaryKey) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.notNull(primaryKey, "primaryKey");
      AV.objectOrEmpty(params, "params");
      return this.get("/users/".concat(primaryKey), params);
    },

    /**
     * Get the user info of the currently logged in user
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getMe: function getMe() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/users/me", params);
    },

    /**
     * Update a single user based on primaryKey
     * @param  {String|Number} primaryKey The primary key of the user
     * @param  {Object} body              The fields to update
     * @return {RequestPromise}
     */
    updateUser: function updateUser(primaryKey, body) {
      AV.notNull(primaryKey, "primaryKey");
      AV.object(body, "body");
      return this.updateItem("directus_users", primaryKey, body);
    },
    // UTILS
    // -------------------------------------------------------------------------

    /**
     * Ping the API to check if it exists / is up and running
     * @return {RequestPromise}
     */
    ping: function ping() {
      return this.request("get", "/server/ping", {}, {}, true);
    },

    /**
     * Get the server info from the API
     * @return {RequestPromise}
     */
    serverInfo: function serverInfo() {
      return this.request("get", "/", {}, {}, true);
    },

    /**
     * Get all the setup third party auth providers
     * @return {RequestPromise}
     */
    getThirdPartyAuthProviders: function getThirdPartyAuthProviders() {
      return this.get("/auth/sso");
    }
  };
} // CONVENIENCE METHODS
// -------------------------------------------------------------------------------------------------


SDK.getPayload = getPayload;
module.exports = SDK;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EaXJlY3R1c1NESy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXJndW1lbnQtdmFsaWRhdG9yL2FyZ3VtZW50LXZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnRvYS5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYmFzZS02NC9iYXNlNjQuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9xcy9saWIvZm9ybWF0cy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9xcy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvcXMvbGliL3BhcnNlLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvcXMvbGliL3V0aWxzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiYXhpb3MiLCJyZXF1aXJlIiwiYmFzZTY0IiwicXMiLCJBViIsImdldFBheWxvYWQiLCJ0b2tlbiIsInBheWxvYWRCYXNlNjQiLCJzcGxpdCIsInJlcGxhY2UiLCJwYXlsb2FkRGVjb2RlZCIsImRlY29kZSIsInBheWxvYWRPYmplY3QiLCJKU09OIiwicGFyc2UiLCJpc051bWJlciIsImV4cCIsIkRhdGUiLCJTREsiLCJvcHRpb25zIiwidXJsIiwiZW52IiwiY3JlYXRlIiwicGFyYW1zU2VyaWFsaXplciIsInN0cmluZ2lmeSIsInRpbWVvdXQiLCJyZWZyZXNoSW50ZXJ2YWwiLCJvbkF1dG9SZWZyZXNoRXJyb3IiLCJvbkF1dG9SZWZyZXNoU3VjY2VzcyIsInBheWxvYWQiLCJpc1N0cmluZyIsImxvZ2dlZEluIiwiaXNPYmplY3QiLCJnZXRUaW1lIiwibm93IiwicmVxdWVzdCIsIm1ldGhvZCIsImVuZHBvaW50IiwicGFyYW1zIiwiZGF0YSIsIm5vRW52IiwiaGVhZGVycyIsInN0cmluZyIsIm9iamVjdE9yRW1wdHkiLCJBcnJheSIsImlzQXJyYXkiLCJhcnJheU9yRW1wdHkiLCJiYXNlVVJMIiwicmVxdWVzdE9wdGlvbnMiLCJsZW5ndGgiLCJBdXRob3JpemF0aW9uIiwidGhlbiIsInJlcyIsImVycm9yIiwianNvbiIsImNhdGNoIiwicmVzcG9uc2UiLCJjb2RlIiwibWVzc2FnZSIsImdldCIsInBvc3QiLCJib2R5IiwicGF0Y2giLCJwdXQiLCJkZWxldGUiLCJsb2dpbiIsImNyZWRlbnRpYWxzIiwib2JqZWN0Iiwia2V5c1dpdGhTdHJpbmciLCJoYXNLZXlzV2l0aFN0cmluZyIsInBlcnNpc3QiLCJzdGFydEludGVydmFsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJlbWFpbCIsInBhc3N3b3JkIiwibG9nb3V0Iiwic3RvcEludGVydmFsIiwiZmlyZUltbWVkaWF0ZWx5IiwicmVmcmVzaElmTmVlZGVkIiwic2V0SW50ZXJ2YWwiLCJiaW5kIiwiY2xlYXJJbnRlcnZhbCIsImhhc1N0cmluZ0tleXMiLCJ0aW1lRGlmZiIsImlzRnVuY3Rpb24iLCJyZWZyZXNoIiwicmVxdWVzdFBhc3N3b3JkUmVzZXQiLCJpbnN0YW5jZSIsImdldEFjdGl2aXR5IiwiZ2V0TXlCb29rbWFya3MiLCJhbGwiLCJpZCIsInJvbGUiLCJ2YWx1ZXMiLCJ1c2VyIiwiZ2V0Q29sbGVjdGlvbnMiLCJnZXRDb2xsZWN0aW9uIiwiY29sbGVjdGlvbiIsImNyZWF0ZUNvbGxlY3Rpb24iLCJ1cGRhdGVDb2xsZWN0aW9uIiwiZGVsZXRlQ29sbGVjdGlvbiIsImNyZWF0ZUNvbGxlY3Rpb25QcmVzZXQiLCJ1cGRhdGVDb2xsZWN0aW9uUHJlc2V0IiwicHJpbWFyeUtleSIsIm5vdE51bGwiLCJkZWxldGVDb2xsZWN0aW9uUHJlc2V0IiwidXBkYXRlRGF0YWJhc2UiLCJnZXRJbnRlcmZhY2VzIiwiZ2V0TGF5b3V0cyIsImdldFBhZ2VzIiwiZ2V0QWxsRmllbGRzIiwiZ2V0RmllbGRzIiwiZ2V0RmllbGQiLCJmaWVsZE5hbWUiLCJjcmVhdGVGaWVsZCIsImZpZWxkSW5mbyIsInVwZGF0ZUZpZWxkIiwidXBkYXRlRmllbGRzIiwiZmllbGRzSW5mb09yRmllbGROYW1lcyIsImFycmF5Iiwiam9pbiIsImRlbGV0ZUZpZWxkIiwidXBsb2FkRmlsZXMiLCJvblVwbG9hZFByb2dyZXNzIiwidXBkYXRlSXRlbSIsInN0YXJ0c1dpdGgiLCJzdWJzdHJpbmciLCJ1cGRhdGVJdGVtcyIsImNyZWF0ZUl0ZW0iLCJjcmVhdGVJdGVtcyIsImdldEl0ZW1zIiwiZ2V0SXRlbSIsImRlbGV0ZUl0ZW0iLCJkZWxldGVJdGVtcyIsInByaW1hcnlLZXlzIiwiZ2V0TXlMaXN0aW5nUHJlZmVyZW5jZXMiLCJsaW1pdCIsInNvcnQiLCJnZXRQZXJtaXNzaW9ucyIsImdldE15UGVybWlzc2lvbnMiLCJjcmVhdGVQZXJtaXNzaW9ucyIsInVwZGF0ZVBlcm1pc3Npb25zIiwiZ2V0UmVsYXRpb25zIiwiY3JlYXRlUmVsYXRpb24iLCJ1cGRhdGVSZWxhdGlvbiIsImdldENvbGxlY3Rpb25SZWxhdGlvbnMiLCJnZXRJdGVtUmV2aXNpb25zIiwicmV2ZXJ0IiwicmV2aXNpb25JRCIsIm51bWJlciIsImdldFJvbGUiLCJnZXRSb2xlcyIsInVwZGF0ZVJvbGUiLCJjcmVhdGVSb2xlIiwiZGVsZXRlUm9sZSIsImdldFNldHRpbmdzIiwiZ2V0U2V0dGluZ3NGaWVsZHMiLCJnZXRVc2VycyIsImdldFVzZXIiLCJnZXRNZSIsInVwZGF0ZVVzZXIiLCJwaW5nIiwic2VydmVySW5mbyIsImdldFRoaXJkUGFydHlBdXRoUHJvdmlkZXJzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhOztBQUViLFFBQVEsS0FBNkI7QUFDckM7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsbUJBQW1CO0FBQzFDOztBQUVB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QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTLEdBQUcsU0FBUztBQUM1QywyQkFBMkI7QUFDM0I7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMsT0FBTztBQUM5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlTQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSxtQkFBbUIsS0FBMEI7O0FBRTdDO0FBQ0Esa0JBQWtCLEtBQXlCO0FBQzNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsSUFFVTtBQUNaO0FBQ0EsRUFBRSxtQ0FBTztBQUNUO0FBQ0EsR0FBRztBQUFBLG9HQUFDO0FBQ0osRUFBRSxNQUFNLFlBVU47O0FBRUYsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3BLRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7O0FDdkx6Qjs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2pCYTs7QUFFYixnQkFBZ0IsbUJBQU8sQ0FBQyx1REFBYTtBQUNyQyxZQUFZLG1CQUFPLENBQUMsK0NBQVM7QUFDN0IsY0FBYyxtQkFBTyxDQUFDLG1EQUFXOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDVmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLCtDQUFTOztBQUU3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGtCQUFrQjtBQUNyQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxrQ0FBa0MsUUFBUTtBQUMxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDQUF3Qzs7QUFFeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3S2E7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLCtDQUFTO0FBQzdCLGNBQWMsbUJBQU8sQ0FBQyxtREFBVzs7QUFFakM7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQSxLQUFLO0FBQ0wsNENBQTRDO0FBQzVDO0FBQ0EsS0FBSztBQUNMLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDOztBQUV4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLG9CQUFvQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2pOYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwyQkFBMkIsZ0JBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsT0FBTyxXQUFXLGFBQWE7QUFDakQ7O0FBRUEsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLGlCQUFpQjtBQUN4QztBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsc0JBQXNCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pNQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCQSxJQUFNQSxLQUFLLEdBQUdDLG1CQUFPLENBQUMsNENBQUQsQ0FBckI7O0FBQ0EsSUFBTUMsTUFBTSxHQUFHRCxtQkFBTyxDQUFDLGlEQUFELENBQXRCOztBQUNBLElBQU1FLEVBQUUsR0FBR0YsbUJBQU8sQ0FBQywwQ0FBRCxDQUFsQjs7QUFDQSxJQUFNRyxFQUFFLEdBQUdILG1CQUFPLENBQUMsbUZBQUQsQ0FBbEI7QUFFQTs7Ozs7OztBQUtBLFNBQVNJLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQTJCO0FBQ3pCLE1BQU1DLGFBQWEsR0FBR0QsS0FBSyxDQUN4QkUsS0FEbUIsQ0FDYixHQURhLEVBQ1IsQ0FEUSxFQUVuQkMsT0FGbUIsQ0FFWCxHQUZXLEVBRU4sR0FGTSxFQUduQkEsT0FIbUIsQ0FHWCxHQUhXLEVBR04sR0FITSxDQUF0QjtBQUlBLE1BQU1DLGNBQWMsR0FBR1IsTUFBTSxDQUFDUyxNQUFQLENBQWNKLGFBQWQsQ0FBdkI7QUFDQSxNQUFNSyxhQUFhLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXSixjQUFYLENBQXRCOztBQUVBLE1BQUlOLEVBQUUsQ0FBQ1csUUFBSCxDQUFZSCxhQUFhLENBQUNJLEdBQTFCLENBQUosRUFBb0M7QUFDbENKLGlCQUFhLENBQUNJLEdBQWQsR0FBb0IsSUFBSUMsSUFBSixDQUFTTCxhQUFhLENBQUNJLEdBQWQsR0FBb0IsSUFBN0IsQ0FBcEI7QUFDRDs7QUFFRCxTQUFPSixhQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7OztBQVFBLFNBQVNNLEdBQVQsR0FBMkI7QUFBQSxNQUFkQyxPQUFjLHVFQUFKLEVBQUk7QUFDekIsU0FBTztBQUNMQyxPQUFHLEVBQUVELE9BQU8sQ0FBQ0MsR0FEUjtBQUVMZCxTQUFLLEVBQUVhLE9BQU8sQ0FBQ2IsS0FGVjtBQUdMZSxPQUFHLEVBQUVGLE9BQU8sQ0FBQ0UsR0FBUixJQUFlLEdBSGY7QUFJTHJCLFNBQUssRUFBRUEsS0FBSyxDQUFDc0IsTUFBTixDQUFhO0FBQ2xCQyxzQkFBZ0IsRUFBRXBCLEVBQUUsQ0FBQ3FCLFNBREg7QUFFbEJDLGFBQU8sRUFBRSxLQUFLLEVBQUwsR0FBVSxJQUZELENBRU07O0FBRk4sS0FBYixDQUpGO0FBUUxDLG1CQUFlLEVBQUUsSUFSWjtBQVNMQyxzQkFBa0IsRUFBRSxJQVRmO0FBVUxDLHdCQUFvQixFQUFFLElBVmpCOztBQVlMLFFBQUlDLE9BQUosR0FBYztBQUNaLFVBQUksQ0FBQ3pCLEVBQUUsQ0FBQzBCLFFBQUgsQ0FBWSxLQUFLeEIsS0FBakIsQ0FBTCxFQUE4QixPQUFPLElBQVA7QUFDOUIsYUFBT0QsVUFBVSxDQUFDLEtBQUtDLEtBQU4sQ0FBakI7QUFDRCxLQWZJOztBQWlCTCxRQUFJeUIsUUFBSixHQUFlO0FBQ2IsVUFDRTNCLEVBQUUsQ0FBQzBCLFFBQUgsQ0FBWSxLQUFLeEIsS0FBakIsS0FDQUYsRUFBRSxDQUFDMEIsUUFBSCxDQUFZLEtBQUtWLEdBQWpCLENBREEsSUFFQWhCLEVBQUUsQ0FBQzBCLFFBQUgsQ0FBWSxLQUFLVCxHQUFqQixDQUZBLElBR0FqQixFQUFFLENBQUM0QixRQUFILENBQVksS0FBS0gsT0FBakIsQ0FKRixFQUtFO0FBQ0EsWUFBSSxLQUFLQSxPQUFMLENBQWFiLEdBQWIsQ0FBaUJpQixPQUFqQixLQUE2QmhCLElBQUksQ0FBQ2lCLEdBQUwsRUFBakMsRUFBNkM7QUFDM0MsaUJBQU8sSUFBUDtBQUNEO0FBQ0Y7O0FBQ0QsYUFBTyxLQUFQO0FBQ0QsS0E3Qkk7O0FBK0JMO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FBUUE7Ozs7Ozs7OztBQVNBQyxXQW5ESyxtQkFvREhDLE1BcERHLEVBcURIQyxRQXJERyxFQTBESDtBQUFBLFVBSkFDLE1BSUEsdUVBSlMsRUFJVDtBQUFBLFVBSEFDLElBR0EsdUVBSE8sRUFHUDtBQUFBLFVBRkFDLEtBRUEsdUVBRlEsS0FFUjtBQUFBLFVBREFDLE9BQ0EsdUVBRFUsRUFDVjtBQUNBckMsUUFBRSxDQUFDc0MsTUFBSCxDQUFVTixNQUFWLEVBQWtCLFFBQWxCO0FBQ0FoQyxRQUFFLENBQUNzQyxNQUFILENBQVVMLFFBQVYsRUFBb0IsVUFBcEI7QUFDQWpDLFFBQUUsQ0FBQ3VDLGFBQUgsQ0FBaUJMLE1BQWpCLEVBQXlCLFFBQXpCO0FBQ0FNLFdBQUssQ0FBQ0MsT0FBTixDQUFjTixJQUFkLElBQ0luQyxFQUFFLENBQUMwQyxZQUFILENBQWdCUCxJQUFoQixFQUFzQixNQUF0QixDQURKLEdBRUluQyxFQUFFLENBQUN1QyxhQUFILENBQWlCSixJQUFqQixFQUF1QixNQUF2QixDQUZKO0FBSUFuQyxRQUFFLENBQUNzQyxNQUFILENBQVUsS0FBS3RCLEdBQWYsRUFBb0IsVUFBcEI7QUFFQSxVQUFJMkIsT0FBTyxhQUFNLEtBQUszQixHQUFYLE1BQVg7O0FBRUEsVUFBSW9CLEtBQUssS0FBSyxLQUFkLEVBQXFCO0FBQ25CTyxlQUFPLGNBQU8sS0FBSzFCLEdBQVosTUFBUDtBQUNEOztBQUVELFVBQU0yQixjQUFjLEdBQUc7QUFDckI1QixXQUFHLEVBQUVpQixRQURnQjtBQUVyQkQsY0FBTSxFQUFOQSxNQUZxQjtBQUdyQlcsZUFBTyxFQUFQQSxPQUhxQjtBQUlyQlQsY0FBTSxFQUFOQSxNQUpxQjtBQUtyQkMsWUFBSSxFQUFKQTtBQUxxQixPQUF2Qjs7QUFRQSxVQUNFLEtBQUtqQyxLQUFMLElBQ0EsT0FBTyxLQUFLQSxLQUFaLEtBQXNCLFFBRHRCLElBRUEsS0FBS0EsS0FBTCxDQUFXMkMsTUFBWCxHQUFvQixDQUh0QixFQUlFO0FBQ0FELHNCQUFjLENBQUNQLE9BQWYsR0FBeUJBLE9BQXpCO0FBQ0FPLHNCQUFjLENBQUNQLE9BQWYsQ0FBdUJTLGFBQXZCLG9CQUFpRCxLQUFLNUMsS0FBdEQ7QUFDRDs7QUFFRCxhQUFPLEtBQUtOLEtBQUwsQ0FDSm1DLE9BREksQ0FDSWEsY0FESixFQUVKRyxJQUZJLENBRUMsVUFBQUMsR0FBRztBQUFBLGVBQUlBLEdBQUcsQ0FBQ2IsSUFBUjtBQUFBLE9BRkosRUFHSlksSUFISSxDQUdDLFVBQUFaLElBQUksRUFBSTtBQUNaLFlBQUksQ0FBQ0EsSUFBRCxJQUFTQSxJQUFJLENBQUNVLE1BQUwsS0FBZ0IsQ0FBN0IsRUFBZ0MsT0FBT1YsSUFBUDs7QUFFaEMsWUFBSSxRQUFPQSxJQUFQLE1BQWdCLFFBQXBCLEVBQThCO0FBQzVCLGNBQUk7QUFDRixtQkFBTzFCLElBQUksQ0FBQ0MsS0FBTCxDQUFXeUIsSUFBWCxDQUFQO0FBQ0QsV0FGRCxDQUVFLE9BQU9jLEtBQVAsRUFBYztBQUNkLGtCQUFNO0FBQ0pDLGtCQUFJLEVBQUUsSUFERjtBQUVKRCxtQkFBSyxFQUFMQSxLQUZJO0FBR0pkLGtCQUFJLEVBQUpBO0FBSEksYUFBTjtBQUtEO0FBQ0Y7O0FBRUQsZUFBT0EsSUFBUDtBQUNELE9BbkJJLEVBb0JKZ0IsS0FwQkksQ0FvQkUsVUFBQUYsS0FBSyxFQUFJO0FBQ2QsWUFBSUEsS0FBSyxDQUFDRyxRQUFWLEVBQW9CO0FBQ2xCLGdCQUFNSCxLQUFLLENBQUNHLFFBQU4sQ0FBZWpCLElBQWYsQ0FBb0JjLEtBQTFCO0FBQ0QsU0FGRCxNQUVPLElBQUlBLEtBQUssQ0FBQ0MsSUFBTixLQUFlLElBQW5CLEVBQXlCO0FBQzlCLGdCQUFNO0FBQ0o7QUFDQUcsZ0JBQUksRUFBRSxDQUFDLENBRkg7QUFHSkMsbUJBQU8sRUFBRSwyQkFITDtBQUlKTCxpQkFBSyxFQUFFQSxLQUFLLENBQUNBLEtBSlQ7QUFLSmQsZ0JBQUksRUFBRWMsS0FBSyxDQUFDZDtBQUxSLFdBQU47QUFPRCxTQVJNLE1BUUE7QUFDTCxnQkFBTTtBQUNKO0FBQ0FrQixnQkFBSSxFQUFFLENBQUMsQ0FGSDtBQUdKQyxtQkFBTyxFQUFFLGVBSEw7QUFJSkwsaUJBQUssRUFBTEE7QUFKSSxXQUFOO0FBTUQ7QUFDRixPQXZDSSxDQUFQO0FBd0NELEtBbklJOztBQXFJTDs7Ozs7O0FBTUFNLE9BM0lLLGVBMklEdEIsUUEzSUMsRUEySXNCO0FBQUEsVUFBYkMsTUFBYSx1RUFBSixFQUFJO0FBQ3pCbEMsUUFBRSxDQUFDc0MsTUFBSCxDQUFVTCxRQUFWLEVBQW9CLFVBQXBCO0FBQ0FqQyxRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUVBLGFBQU8sS0FBS0gsT0FBTCxDQUFhLEtBQWIsRUFBb0JFLFFBQXBCLEVBQThCQyxNQUE5QixDQUFQO0FBQ0QsS0FoSkk7O0FBa0pMOzs7Ozs7QUFNQXNCLFFBeEpLLGdCQXdKQXZCLFFBeEpBLEVBd0prQztBQUFBLFVBQXhCd0IsSUFBd0IsdUVBQWpCLEVBQWlCO0FBQUEsVUFBYnZCLE1BQWEsdUVBQUosRUFBSTtBQUNyQ2xDLFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVUwsUUFBVixFQUFvQixVQUFwQjtBQUNBTyxXQUFLLENBQUNDLE9BQU4sQ0FBY2dCLElBQWQsSUFDSXpELEVBQUUsQ0FBQzBDLFlBQUgsQ0FBZ0JlLElBQWhCLEVBQXNCLE1BQXRCLENBREosR0FFSXpELEVBQUUsQ0FBQ3VDLGFBQUgsQ0FBaUJrQixJQUFqQixFQUF1QixNQUF2QixDQUZKO0FBSUEsYUFBTyxLQUFLMUIsT0FBTCxDQUFhLE1BQWIsRUFBcUJFLFFBQXJCLEVBQStCQyxNQUEvQixFQUF1Q3VCLElBQXZDLENBQVA7QUFDRCxLQS9KSTs7QUFpS0w7Ozs7OztBQU1BQyxTQXZLSyxpQkF1S0N6QixRQXZLRCxFQXVLbUM7QUFBQSxVQUF4QndCLElBQXdCLHVFQUFqQixFQUFpQjtBQUFBLFVBQWJ2QixNQUFhLHVFQUFKLEVBQUk7QUFDdENsQyxRQUFFLENBQUNzQyxNQUFILENBQVVMLFFBQVYsRUFBb0IsVUFBcEI7QUFDQU8sV0FBSyxDQUFDQyxPQUFOLENBQWNnQixJQUFkLElBQ0l6RCxFQUFFLENBQUMwQyxZQUFILENBQWdCZSxJQUFoQixFQUFzQixNQUF0QixDQURKLEdBRUl6RCxFQUFFLENBQUN1QyxhQUFILENBQWlCa0IsSUFBakIsRUFBdUIsTUFBdkIsQ0FGSjtBQUlBLGFBQU8sS0FBSzFCLE9BQUwsQ0FBYSxPQUFiLEVBQXNCRSxRQUF0QixFQUFnQ0MsTUFBaEMsRUFBd0N1QixJQUF4QyxDQUFQO0FBQ0QsS0E5S0k7O0FBZ0xMOzs7Ozs7QUFNQUUsT0F0TEssZUFzTEQxQixRQXRMQyxFQXNMaUM7QUFBQSxVQUF4QndCLElBQXdCLHVFQUFqQixFQUFpQjtBQUFBLFVBQWJ2QixNQUFhLHVFQUFKLEVBQUk7QUFDcENsQyxRQUFFLENBQUNzQyxNQUFILENBQVVMLFFBQVYsRUFBb0IsVUFBcEI7QUFDQU8sV0FBSyxDQUFDQyxPQUFOLENBQWNnQixJQUFkLElBQ0l6RCxFQUFFLENBQUMwQyxZQUFILENBQWdCZSxJQUFoQixFQUFzQixNQUF0QixDQURKLEdBRUl6RCxFQUFFLENBQUN1QyxhQUFILENBQWlCa0IsSUFBakIsRUFBdUIsTUFBdkIsQ0FGSjtBQUlBLGFBQU8sS0FBSzFCLE9BQUwsQ0FBYSxLQUFiLEVBQW9CRSxRQUFwQixFQUE4QkMsTUFBOUIsRUFBc0N1QixJQUF0QyxDQUFQO0FBQ0QsS0E3TEk7O0FBK0xMOzs7OztBQUtBRyxVQXBNSyxtQkFvTUUzQixRQXBNRixFQW9NWTtBQUNmakMsUUFBRSxDQUFDc0MsTUFBSCxDQUFVTCxRQUFWLEVBQW9CLFVBQXBCO0FBRUEsYUFBTyxLQUFLRixPQUFMLENBQWEsUUFBYixFQUF1QkUsUUFBdkIsQ0FBUDtBQUNELEtBeE1JO0FBME1MO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FBUUE7Ozs7Ozs7Ozs7O0FBV0E0QixTQWhPSyxpQkFnT0NDLFdBaE9ELEVBZ09jO0FBQUE7O0FBQ2pCOUQsUUFBRSxDQUFDK0QsTUFBSCxDQUFVRCxXQUFWLEVBQXVCLGFBQXZCO0FBQ0E5RCxRQUFFLENBQUNnRSxjQUFILENBQWtCRixXQUFsQixFQUErQixDQUFDLE9BQUQsRUFBVSxVQUFWLENBQS9CLEVBQXNELGFBQXREO0FBRUEsV0FBSzVELEtBQUwsR0FBYSxJQUFiOztBQUVBLFVBQUlGLEVBQUUsQ0FBQ2lFLGlCQUFILENBQXFCSCxXQUFyQixFQUFrQyxDQUFDLEtBQUQsQ0FBbEMsQ0FBSixFQUFnRDtBQUM5QyxhQUFLOUMsR0FBTCxHQUFXOEMsV0FBVyxDQUFDOUMsR0FBdkI7QUFDRDs7QUFFRCxVQUFJaEIsRUFBRSxDQUFDaUUsaUJBQUgsQ0FBcUJILFdBQXJCLEVBQWtDLENBQUMsS0FBRCxDQUFsQyxDQUFKLEVBQWdEO0FBQzlDLGFBQUs3QyxHQUFMLEdBQVc2QyxXQUFXLENBQUM3QyxHQUF2QjtBQUNEOztBQUVELFVBQUk2QyxXQUFXLENBQUNJLE9BQWhCLEVBQXlCO0FBQ3ZCLGFBQUtDLGFBQUw7QUFDRDs7QUFFRCxhQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsYUFBSSxDQUFDZCxJQUFMLENBQVUsb0JBQVYsRUFBZ0M7QUFDOUJlLGVBQUssRUFBRVQsV0FBVyxDQUFDUyxLQURXO0FBRTlCQyxrQkFBUSxFQUFFVixXQUFXLENBQUNVO0FBRlEsU0FBaEMsRUFJR3pCLElBSkgsQ0FJUSxVQUFBQyxHQUFHO0FBQUEsaUJBQUlBLEdBQUcsQ0FBQ2IsSUFBSixDQUFTakMsS0FBYjtBQUFBLFNBSlgsRUFLRzZDLElBTEgsQ0FLUSxVQUFBN0MsS0FBSyxFQUFJO0FBQ2IsZUFBSSxDQUFDQSxLQUFMLEdBQWFBLEtBQWI7QUFDQW1FLGlCQUFPLENBQUM7QUFDTnJELGVBQUcsRUFBRSxLQUFJLENBQUNBLEdBREo7QUFFTkMsZUFBRyxFQUFFLEtBQUksQ0FBQ0EsR0FGSjtBQUdOZixpQkFBSyxFQUFFLEtBQUksQ0FBQ0E7QUFITixXQUFELENBQVA7QUFLRCxTQVpILEVBYUdpRCxLQWJILENBYVNtQixNQWJUO0FBY0QsT0FmTSxDQUFQO0FBZ0JELEtBbFFJOztBQW9RTDs7O0FBR0FHLFVBdlFLLG9CQXVRSTtBQUNQLFdBQUt2RSxLQUFMLEdBQWEsSUFBYjtBQUNBLFdBQUtlLEdBQUwsR0FBVyxHQUFYO0FBQ0EsV0FBS0QsR0FBTCxHQUFXLElBQVg7O0FBRUEsVUFBSSxLQUFLTSxlQUFULEVBQTBCO0FBQ3hCLGFBQUtvRCxZQUFMO0FBQ0Q7QUFDRixLQS9RSTs7QUFpUkw7Ozs7QUFJQVAsaUJBclJLLHlCQXFSU1EsZUFyUlQsRUFxUjBCO0FBQzdCLFVBQUlBLGVBQUosRUFBcUIsS0FBS0MsZUFBTDtBQUNyQixXQUFLdEQsZUFBTCxHQUF1QnVELFdBQVcsQ0FDaEMsS0FBS0QsZUFBTCxDQUFxQkUsSUFBckIsQ0FBMEIsSUFBMUIsQ0FEZ0MsRUFFaEMsS0FGZ0MsQ0FBbEM7QUFJRCxLQTNSSTs7QUE2Ukw7OztBQUdBSixnQkFoU0ssMEJBZ1NVO0FBQ2JLLG1CQUFhLENBQUMsS0FBS3pELGVBQU4sQ0FBYjtBQUNBLFdBQUtBLGVBQUwsR0FBdUIsSUFBdkI7QUFDRCxLQW5TSTs7QUFxU0w7Ozs7OztBQU1Bc0QsbUJBM1NLLDZCQTJTYTtBQUFBOztBQUNoQixVQUFJLENBQUM1RSxFQUFFLENBQUNnRixhQUFILENBQWlCLElBQWpCLEVBQXVCLENBQUMsT0FBRCxFQUFVLEtBQVYsRUFBaUIsS0FBakIsQ0FBdkIsQ0FBTCxFQUFzRDtBQUN0RCxVQUFJLENBQUMsS0FBS3ZELE9BQU4sSUFBaUIsQ0FBQyxLQUFLQSxPQUFMLENBQWFiLEdBQW5DLEVBQXdDO0FBRXhDLFVBQU1xRSxRQUFRLEdBQUcsS0FBS3hELE9BQUwsQ0FBYWIsR0FBYixDQUFpQmlCLE9BQWpCLEtBQTZCaEIsSUFBSSxDQUFDaUIsR0FBTCxFQUE5Qzs7QUFFQSxVQUFJbUQsUUFBUSxJQUFJLENBQWhCLEVBQW1CO0FBQ2pCLFlBQUlqRixFQUFFLENBQUNrRixVQUFILENBQWMsS0FBSzNELGtCQUFuQixDQUFKLEVBQTRDO0FBQzFDLGVBQUtBLGtCQUFMLENBQXdCO0FBQ3RCK0IsbUJBQU8sRUFBRSxvQkFEYTtBQUV0QkQsZ0JBQUksRUFBRTtBQUZnQixXQUF4QjtBQUlEOztBQUNEO0FBQ0Q7O0FBRUQsVUFBSTRCLFFBQVEsR0FBRyxLQUFmLEVBQXNCO0FBQ3BCLGFBQUtFLE9BQUwsQ0FBYSxLQUFLakYsS0FBbEIsRUFDRzZDLElBREgsQ0FDUSxVQUFBQyxHQUFHLEVBQUk7QUFDWCxnQkFBSSxDQUFDOUMsS0FBTCxHQUFhOEMsR0FBRyxDQUFDYixJQUFKLENBQVNqQyxLQUF0Qjs7QUFDQSxjQUFJRixFQUFFLENBQUNrRixVQUFILENBQWMsTUFBSSxDQUFDMUQsb0JBQW5CLENBQUosRUFBOEM7QUFDNUMsa0JBQUksQ0FBQ0Esb0JBQUwsQ0FBMEI7QUFDeEJSLGlCQUFHLEVBQUUsTUFBSSxDQUFDQSxHQURjO0FBRXhCQyxpQkFBRyxFQUFFLE1BQUksQ0FBQ0EsR0FGYztBQUd4QmYsbUJBQUssRUFBRSxNQUFJLENBQUNBO0FBSFksYUFBMUI7QUFLRDtBQUNGLFNBVkgsRUFXR2lELEtBWEgsQ0FXUyxVQUFBRixLQUFLLEVBQUk7QUFDZCxjQUFJakQsRUFBRSxDQUFDa0YsVUFBSCxDQUFjLE1BQUksQ0FBQzNELGtCQUFuQixDQUFKLEVBQTRDO0FBQzFDLGtCQUFJLENBQUNBLGtCQUFMLENBQXdCMEIsS0FBeEI7QUFDRDtBQUNGLFNBZkg7QUFnQkQ7QUFDRixLQTdVSTs7QUErVUw7Ozs7O0FBS0FrQyxXQXBWSyxtQkFvVkdqRixLQXBWSCxFQW9WVTtBQUNiRixRQUFFLENBQUNzQyxNQUFILENBQVVwQyxLQUFWLEVBQWlCLE9BQWpCO0FBQ0EsYUFBTyxLQUFLc0QsSUFBTCxDQUFVLGVBQVYsRUFBMkI7QUFBRXRELGFBQUssRUFBTEE7QUFBRixPQUEzQixDQUFQO0FBQ0QsS0F2Vkk7O0FBeVZMOzs7Ozs7O0FBT0FrRix3QkFoV0ssZ0NBZ1dnQmIsS0FoV2hCLEVBZ1d1QjtBQUMxQnZFLFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVWlDLEtBQVYsRUFBaUIsT0FBakI7QUFDQSxhQUFPLEtBQUtmLElBQUwsQ0FBVSxxQkFBVixFQUFpQztBQUN0Q2UsYUFBSyxFQUFMQSxLQURzQztBQUV0Q2MsZ0JBQVEsRUFBRSxLQUFLckU7QUFGdUIsT0FBakMsQ0FBUDtBQUlELEtBdFdJO0FBd1dMO0FBQ0E7O0FBRUE7Ozs7O0FBS0FzRSxlQWhYSyx5QkFnWG9CO0FBQUEsVUFBYnBELE1BQWEsdUVBQUosRUFBSTtBQUN2QmxDLFFBQUUsQ0FBQ3VDLGFBQUgsQ0FBaUJMLE1BQWpCLEVBQXlCLFFBQXpCO0FBQ0EsYUFBTyxLQUFLcUIsR0FBTCxDQUFTLFdBQVQsRUFBc0JyQixNQUF0QixDQUFQO0FBQ0QsS0FuWEk7QUFxWEw7QUFDQTs7QUFFQTs7Ozs7QUFLQXFELGtCQTdYSyw0QkE2WHVCO0FBQUEsVUFBYnJELE1BQWEsdUVBQUosRUFBSTtBQUMxQmxDLFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVSxLQUFLcEMsS0FBZixFQUFzQixZQUF0QjtBQUNBRixRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQjtBQUNBLGFBQU9rQyxPQUFPLENBQUNvQixHQUFSLENBQVksQ0FDakIsS0FBS2pDLEdBQUwsQ0FBUyxxQkFBVCxFQUFnQztBQUM5QixnQ0FBd0IsQ0FETTtBQUU5Qiw0QkFBb0IsS0FBSzlCLE9BQUwsQ0FBYWdFO0FBRkgsT0FBaEMsQ0FEaUIsRUFLakIsS0FBS2xDLEdBQUwsQ0FBUyxxQkFBVCxFQUFnQztBQUM5QixnQ0FBd0IsQ0FETTtBQUU5Qiw0QkFBb0IsS0FBSzlCLE9BQUwsQ0FBYWlFLElBRkg7QUFHOUIsOEJBQXNCO0FBSFEsT0FBaEMsQ0FMaUIsQ0FBWixFQVVKM0MsSUFWSSxDQVVDLFVBQUE0QyxNQUFNLEVBQUk7QUFBQSxxQ0FDS0EsTUFETDtBQUFBLFlBQ1RDLElBRFM7QUFBQSxZQUNIRixJQURHLGVBQ2E7OztBQUM3QixrQ0FBV0UsSUFBSSxDQUFDekQsSUFBaEIsNEJBQXlCdUQsSUFBSSxDQUFDdkQsSUFBOUI7QUFDRCxPQWJNLENBQVA7QUFjRCxLQTlZSTtBQWdaTDtBQUNBOztBQUVBOzs7OztBQUtBMEQsa0JBeFpLLDRCQXdadUI7QUFBQSxVQUFiM0QsTUFBYSx1RUFBSixFQUFJO0FBQzFCbEMsUUFBRSxDQUFDdUMsYUFBSCxDQUFpQkwsTUFBakIsRUFBeUIsUUFBekI7QUFDQSxhQUFPLEtBQUtxQixHQUFMLENBQVMsY0FBVCxFQUF5QnJCLE1BQXpCLENBQVA7QUFDRCxLQTNaSTs7QUE2Wkw7Ozs7OztBQU1BNEQsaUJBbmFLLHlCQW1hU0MsVUFuYVQsRUFtYWtDO0FBQUEsVUFBYjdELE1BQWEsdUVBQUosRUFBSTtBQUNyQ2xDLFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVXlELFVBQVYsRUFBc0IsWUFBdEI7QUFDQS9GLFFBQUUsQ0FBQ3VDLGFBQUgsQ0FBaUJMLE1BQWpCLEVBQXlCLFFBQXpCO0FBQ0EsYUFBTyxLQUFLcUIsR0FBTCx3QkFBeUJ3QyxVQUF6QixHQUF1QzdELE1BQXZDLENBQVA7QUFDRCxLQXZhSTs7QUF5YUw7Ozs7O0FBS0E4RCxvQkE5YUssNEJBOGFZN0QsSUE5YVosRUE4YWtCO0FBQ3JCbkMsUUFBRSxDQUFDK0QsTUFBSCxDQUFVNUIsSUFBVixFQUFnQixNQUFoQjtBQUNBLGFBQU8sS0FBS3FCLElBQUwsQ0FBVSxjQUFWLEVBQTBCckIsSUFBMUIsQ0FBUDtBQUNELEtBamJJOztBQW1iTDs7Ozs7QUFLQThELG9CQXhiSyw0QkF3YllGLFVBeGJaLEVBd2J3QjVELElBeGJ4QixFQXdiOEI7QUFDakNuQyxRQUFFLENBQUNzQyxNQUFILENBQVV5RCxVQUFWLEVBQXNCLFlBQXRCO0FBQ0EvRixRQUFFLENBQUMrRCxNQUFILENBQVU1QixJQUFWLEVBQWdCLE1BQWhCO0FBQ0EsYUFBTyxLQUFLdUIsS0FBTCx3QkFBMkJxQyxVQUEzQixHQUF5QzVELElBQXpDLENBQVA7QUFDRCxLQTViSTs7QUE4Ykw7Ozs7QUFJQStELG9CQWxjSyw0QkFrY1lILFVBbGNaLEVBa2N3QjtBQUMzQi9GLFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVXlELFVBQVYsRUFBc0IsWUFBdEI7QUFDQSxhQUFPLEtBQUtuQyxNQUFMLHdCQUE0Qm1DLFVBQTVCLEVBQVA7QUFDRCxLQXJjSTtBQXVjTDtBQUNBOztBQUVBOzs7OztBQUtBSSwwQkEvY0ssa0NBK2NrQmhFLElBL2NsQixFQStjd0I7QUFDM0JuQyxRQUFFLENBQUMrRCxNQUFILENBQVU1QixJQUFWO0FBQ0EsYUFBTyxLQUFLcUIsSUFBTCxDQUFVLHFCQUFWLEVBQWlDckIsSUFBakMsQ0FBUDtBQUNELEtBbGRJOztBQW9kTDs7Ozs7QUFLQWlFLDBCQXpkSyxrQ0F5ZGtCQyxVQXpkbEIsRUF5ZDhCbEUsSUF6ZDlCLEVBeWRvQztBQUN2Q25DLFFBQUUsQ0FBQ3NHLE9BQUgsQ0FBV0QsVUFBWCxFQUF1QixZQUF2QjtBQUNBckcsUUFBRSxDQUFDK0QsTUFBSCxDQUFVNUIsSUFBVixFQUFnQixNQUFoQjtBQUVBLGFBQU8sS0FBS3VCLEtBQUwsK0JBQWtDMkMsVUFBbEMsR0FBZ0RsRSxJQUFoRCxDQUFQO0FBQ0QsS0E5ZEk7O0FBZ2VMOzs7O0FBSUFvRSwwQkFwZUssa0NBb2VrQkYsVUFwZWxCLEVBb2U4QjtBQUNqQ3JHLFFBQUUsQ0FBQ3NHLE9BQUgsQ0FBV0QsVUFBWCxFQUF1QixZQUF2QjtBQUNBLGFBQU8sS0FBS3pDLE1BQUwsK0JBQW1DeUMsVUFBbkMsRUFBUDtBQUNELEtBdmVJO0FBeWVMO0FBQ0E7O0FBRUE7Ozs7O0FBS0FHLGtCQWpmSyw0QkFpZlk7QUFDZixhQUFPLEtBQUtoRCxJQUFMLENBQVUsU0FBVixDQUFQO0FBQ0QsS0FuZkk7QUFxZkw7QUFDQTs7QUFFQTs7OztBQUlBaUQsaUJBNWZLLDJCQTRmVztBQUNkLGFBQU8sS0FBSzFFLE9BQUwsQ0FBYSxLQUFiLEVBQW9CLGFBQXBCLEVBQW1DLEVBQW5DLEVBQXVDLEVBQXZDLEVBQTJDLElBQTNDLENBQVA7QUFDRCxLQTlmSTs7QUFnZ0JMOzs7O0FBSUEyRSxjQXBnQkssd0JBb2dCUTtBQUNYLGFBQU8sS0FBSzNFLE9BQUwsQ0FBYSxLQUFiLEVBQW9CLFVBQXBCLEVBQWdDLEVBQWhDLEVBQW9DLEVBQXBDLEVBQXdDLElBQXhDLENBQVA7QUFDRCxLQXRnQkk7O0FBd2dCTDs7OztBQUlBNEUsWUE1Z0JLLHNCQTRnQk07QUFDVCxhQUFPLEtBQUs1RSxPQUFMLENBQWEsS0FBYixFQUFvQixRQUFwQixFQUE4QixFQUE5QixFQUFrQyxFQUFsQyxFQUFzQyxJQUF0QyxDQUFQO0FBQ0QsS0E5Z0JJO0FBZ2hCTDtBQUNBOztBQUVBOzs7OztBQUtBNkUsZ0JBeGhCSywwQkF3aEJxQjtBQUFBLFVBQWIxRSxNQUFhLHVFQUFKLEVBQUk7QUFDeEJsQyxRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsQ0FBUyxTQUFULEVBQW9CckIsTUFBcEIsQ0FBUDtBQUNELEtBM2hCSTs7QUE2aEJMOzs7Ozs7QUFNQTJFLGFBbmlCSyxxQkFtaUJLZCxVQW5pQkwsRUFtaUI4QjtBQUFBLFVBQWI3RCxNQUFhLHVFQUFKLEVBQUk7QUFDakNsQyxRQUFFLENBQUNzQyxNQUFILENBQVV5RCxVQUFWLEVBQXNCLFlBQXRCO0FBQ0EvRixRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsbUJBQW9Cd0MsVUFBcEIsR0FBa0M3RCxNQUFsQyxDQUFQO0FBQ0QsS0F2aUJJOztBQXlpQkw7Ozs7Ozs7QUFPQTRFLFlBaGpCSyxvQkFnakJJZixVQWhqQkosRUFnakJnQmdCLFNBaGpCaEIsRUFnakJ3QztBQUFBLFVBQWI3RSxNQUFhLHVFQUFKLEVBQUk7QUFDM0NsQyxRQUFFLENBQUNzQyxNQUFILENBQVV5RCxVQUFWLEVBQXNCLFlBQXRCO0FBQ0EvRixRQUFFLENBQUNzQyxNQUFILENBQVV5RSxTQUFWLEVBQXFCLFdBQXJCO0FBQ0EvRyxRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsbUJBQW9Cd0MsVUFBcEIsY0FBa0NnQixTQUFsQyxHQUErQzdFLE1BQS9DLENBQVA7QUFDRCxLQXJqQkk7O0FBdWpCTDs7Ozs7O0FBTUE4RSxlQTdqQkssdUJBNmpCT2pCLFVBN2pCUCxFQTZqQm1Ca0IsU0E3akJuQixFQTZqQjhCO0FBQ2pDakgsUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUQsVUFBVixFQUFzQixZQUF0QjtBQUNBL0YsUUFBRSxDQUFDK0QsTUFBSCxDQUFVa0QsU0FBVixFQUFxQixXQUFyQjtBQUNBLGFBQU8sS0FBS3pELElBQUwsbUJBQXFCdUMsVUFBckIsR0FBbUNrQixTQUFuQyxDQUFQO0FBQ0QsS0Fqa0JJOztBQW1rQkw7Ozs7Ozs7QUFPQUMsZUExa0JLLHVCQTBrQk9uQixVQTFrQlAsRUEwa0JtQmdCLFNBMWtCbkIsRUEwa0I4QkUsU0Exa0I5QixFQTBrQnlDO0FBQzVDakgsUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUQsVUFBVixFQUFzQixZQUF0QjtBQUNBL0YsUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUUsU0FBVixFQUFxQixXQUFyQjtBQUNBL0csUUFBRSxDQUFDK0QsTUFBSCxDQUFVa0QsU0FBVixFQUFxQixXQUFyQjtBQUNBLGFBQU8sS0FBS3ZELEtBQUwsbUJBQXNCcUMsVUFBdEIsY0FBb0NnQixTQUFwQyxHQUFpREUsU0FBakQsQ0FBUDtBQUNELEtBL2tCSTs7QUFpbEJMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4QkFFLGdCQS9tQkssd0JBK21CUXBCLFVBL21CUixFQSttQm9CcUIsc0JBL21CcEIsRUErbUI4RDtBQUFBLFVBQWxCSCxTQUFrQix1RUFBTixJQUFNO0FBQ2pFakgsUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUQsVUFBVixFQUFzQixZQUF0QjtBQUNBL0YsUUFBRSxDQUFDcUgsS0FBSCxDQUFTRCxzQkFBVCxFQUFpQyx3QkFBakM7O0FBRUEsVUFBSUgsU0FBSixFQUFlO0FBQ2JqSCxVQUFFLENBQUMrRCxNQUFILENBQVVrRCxTQUFWO0FBQ0Q7O0FBRUQsVUFBSUEsU0FBSixFQUFlO0FBQ2IsZUFBTyxLQUFLdkQsS0FBTCxtQkFDTXFDLFVBRE4sY0FDb0JxQixzQkFBc0IsQ0FBQ0UsSUFBdkIsQ0FBNEIsR0FBNUIsQ0FEcEIsR0FFTEwsU0FGSyxDQUFQO0FBSUQ7O0FBRUQsYUFBTyxLQUFLdkQsS0FBTCxtQkFBc0JxQyxVQUF0QixHQUFvQ3FCLHNCQUFwQyxDQUFQO0FBQ0QsS0EvbkJJOztBQWlvQkw7Ozs7OztBQU1BRyxlQXZvQkssdUJBdW9CT3hCLFVBdm9CUCxFQXVvQm1CZ0IsU0F2b0JuQixFQXVvQjhCO0FBQ2pDL0csUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUQsVUFBVixFQUFzQixZQUF0QjtBQUNBL0YsUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUUsU0FBVixFQUFxQixXQUFyQjtBQUNBLGFBQU8sS0FBS25ELE1BQUwsbUJBQXVCbUMsVUFBdkIsY0FBcUNnQixTQUFyQyxFQUFQO0FBQ0QsS0Ezb0JJO0FBNm9CTDtBQUNBOztBQUVBOzs7OztBQUtBUyxlQXJwQkssdUJBcXBCT3JGLElBcnBCUCxFQXFwQjBDO0FBQUEsVUFBN0JzRixnQkFBNkIsdUVBQVYsWUFBTSxDQUFFLENBQUU7QUFDN0MsVUFBTXBGLE9BQU8sR0FBRztBQUNkLHdCQUFnQixxQkFERjtBQUVkUyxxQkFBYSxtQkFBWSxLQUFLNUMsS0FBakI7QUFGQyxPQUFoQjtBQUtBLGFBQU8sS0FBS04sS0FBTCxDQUNKNEQsSUFESSxXQUNJLEtBQUt4QyxHQURULGNBQ2dCLEtBQUtDLEdBRHJCLGFBQ2tDa0IsSUFEbEMsRUFDd0M7QUFDM0NFLGVBQU8sRUFBUEEsT0FEMkM7QUFFM0NvRix3QkFBZ0IsRUFBaEJBO0FBRjJDLE9BRHhDLEVBS0oxRSxJQUxJLENBS0MsVUFBQUMsR0FBRztBQUFBLGVBQUlBLEdBQUcsQ0FBQ2IsSUFBUjtBQUFBLE9BTEosRUFNSmdCLEtBTkksQ0FNRSxVQUFBRixLQUFLLEVBQUk7QUFDZCxZQUFJQSxLQUFLLENBQUNHLFFBQVYsRUFBb0I7QUFDbEIsZ0JBQU1ILEtBQUssQ0FBQ0csUUFBTixDQUFlakIsSUFBZixDQUFvQmMsS0FBMUI7QUFDRCxTQUZELE1BRU87QUFDTCxnQkFBTTtBQUNKO0FBQ0FJLGdCQUFJLEVBQUUsQ0FBQyxDQUZIO0FBR0pDLG1CQUFPLEVBQUUsZUFITDtBQUlKTCxpQkFBSyxFQUFMQTtBQUpJLFdBQU47QUFNRDtBQUNGLE9BakJJLENBQVA7QUFrQkQsS0E3cUJJO0FBK3FCTDtBQUNBOztBQUVBOzs7Ozs7O0FBT0F5RSxjQXpyQkssc0JBeXJCTTNCLFVBenJCTixFQXlyQmtCTSxVQXpyQmxCLEVBeXJCOEI1QyxJQXpyQjlCLEVBeXJCb0M7QUFDdkN6RCxRQUFFLENBQUNzQyxNQUFILENBQVV5RCxVQUFWLEVBQXNCLFlBQXRCO0FBQ0EvRixRQUFFLENBQUNzRyxPQUFILENBQVdELFVBQVgsRUFBdUIsWUFBdkI7QUFDQXJHLFFBQUUsQ0FBQytELE1BQUgsQ0FBVU4sSUFBVixFQUFnQixNQUFoQjs7QUFFQSxVQUFJc0MsVUFBVSxDQUFDNEIsVUFBWCxDQUFzQixXQUF0QixDQUFKLEVBQXdDO0FBQ3RDLGVBQU8sS0FBS2pFLEtBQUwsWUFBZXFDLFVBQVUsQ0FBQzZCLFNBQVgsQ0FBcUIsQ0FBckIsQ0FBZixjQUEwQ3ZCLFVBQTFDLEdBQXdENUMsSUFBeEQsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBS0MsS0FBTCxrQkFBcUJxQyxVQUFyQixjQUFtQ00sVUFBbkMsR0FBaUQ1QyxJQUFqRCxDQUFQO0FBQ0QsS0Fuc0JJOztBQXFzQkw7Ozs7OztBQU1Bb0UsZUEzc0JLLHVCQTJzQk85QixVQTNzQlAsRUEyc0JtQnRDLElBM3NCbkIsRUEyc0J5QjtBQUM1QnpELFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVXlELFVBQVYsRUFBc0IsWUFBdEI7QUFDQS9GLFFBQUUsQ0FBQ3FILEtBQUgsQ0FBUzVELElBQVQsRUFBZSxNQUFmOztBQUVBLFVBQUlzQyxVQUFVLENBQUM0QixVQUFYLENBQXNCLFdBQXRCLENBQUosRUFBd0M7QUFDdEMsZUFBTyxLQUFLakUsS0FBTCxZQUFlcUMsVUFBVSxDQUFDNkIsU0FBWCxDQUFxQixDQUFyQixDQUFmLEdBQTBDbkUsSUFBMUMsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBS0MsS0FBTCxrQkFBcUJxQyxVQUFyQixHQUFtQ3RDLElBQW5DLENBQVA7QUFDRCxLQXB0Qkk7O0FBc3RCTDs7Ozs7O0FBTUFxRSxjQTV0Qkssc0JBNHRCTS9CLFVBNXRCTixFQTR0QmtCdEMsSUE1dEJsQixFQTR0QndCO0FBQzNCekQsUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUQsVUFBVixFQUFzQixZQUF0QjtBQUNBL0YsUUFBRSxDQUFDK0QsTUFBSCxDQUFVTixJQUFWLEVBQWdCLE1BQWhCOztBQUVBLFVBQUlzQyxVQUFVLENBQUM0QixVQUFYLENBQXNCLFdBQXRCLENBQUosRUFBd0M7QUFDdEMsZUFBTyxLQUFLbkUsSUFBTCxZQUFjdUMsVUFBVSxDQUFDNkIsU0FBWCxDQUFxQixDQUFyQixDQUFkLEdBQXlDbkUsSUFBekMsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBS0QsSUFBTCxrQkFBb0J1QyxVQUFwQixHQUFrQ3RDLElBQWxDLENBQVA7QUFDRCxLQXJ1Qkk7O0FBdXVCTDs7Ozs7O0FBTUFzRSxlQTd1QkssdUJBNnVCT2hDLFVBN3VCUCxFQTZ1Qm1CdEMsSUE3dUJuQixFQTZ1QnlCO0FBQzVCekQsUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUQsVUFBVixFQUFzQixZQUF0QjtBQUNBL0YsUUFBRSxDQUFDcUgsS0FBSCxDQUFTNUQsSUFBVCxFQUFlLE1BQWY7O0FBRUEsVUFBSXNDLFVBQVUsQ0FBQzRCLFVBQVgsQ0FBc0IsV0FBdEIsQ0FBSixFQUF3QztBQUN0QyxlQUFPLEtBQUtuRSxJQUFMLFlBQWN1QyxVQUFVLENBQUM2QixTQUFYLENBQXFCLENBQXJCLENBQWQsR0FBeUNuRSxJQUF6QyxDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLRCxJQUFMLGtCQUFvQnVDLFVBQXBCLEdBQWtDdEMsSUFBbEMsQ0FBUDtBQUNELEtBdHZCSTs7QUF3dkJMOzs7Ozs7QUFNQXVFLFlBOXZCSyxvQkE4dkJJakMsVUE5dkJKLEVBOHZCNkI7QUFBQSxVQUFiN0QsTUFBYSx1RUFBSixFQUFJO0FBQ2hDbEMsUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUQsVUFBVixFQUFzQixZQUF0QjtBQUNBL0YsUUFBRSxDQUFDdUMsYUFBSCxDQUFpQkwsTUFBakIsRUFBeUIsUUFBekI7O0FBRUEsVUFBSTZELFVBQVUsQ0FBQzRCLFVBQVgsQ0FBc0IsV0FBdEIsQ0FBSixFQUF3QztBQUN0QyxlQUFPLEtBQUtwRSxHQUFMLFlBQWF3QyxVQUFVLENBQUM2QixTQUFYLENBQXFCLENBQXJCLENBQWIsR0FBd0MxRixNQUF4QyxDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLcUIsR0FBTCxrQkFBbUJ3QyxVQUFuQixHQUFpQzdELE1BQWpDLENBQVA7QUFDRCxLQXZ3Qkk7O0FBeXdCTDs7Ozs7OztBQU9BK0YsV0FoeEJLLG1CQWd4QkdsQyxVQWh4QkgsRUFneEJlTSxVQWh4QmYsRUFneEJ3QztBQUFBLFVBQWJuRSxNQUFhLHVFQUFKLEVBQUk7QUFDM0NsQyxRQUFFLENBQUNzQyxNQUFILENBQVV5RCxVQUFWLEVBQXNCLFlBQXRCO0FBQ0EvRixRQUFFLENBQUNzRyxPQUFILENBQVdELFVBQVgsRUFBdUIsWUFBdkI7QUFDQXJHLFFBQUUsQ0FBQ3VDLGFBQUgsQ0FBaUJMLE1BQWpCLEVBQXlCLFFBQXpCOztBQUVBLFVBQUk2RCxVQUFVLENBQUM0QixVQUFYLENBQXNCLFdBQXRCLENBQUosRUFBd0M7QUFDdEMsZUFBTyxLQUFLcEUsR0FBTCxZQUFhd0MsVUFBVSxDQUFDNkIsU0FBWCxDQUFxQixDQUFyQixDQUFiLGNBQXdDdkIsVUFBeEMsR0FBc0RuRSxNQUF0RCxDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLcUIsR0FBTCxrQkFBbUJ3QyxVQUFuQixjQUFpQ00sVUFBakMsR0FBK0NuRSxNQUEvQyxDQUFQO0FBQ0QsS0ExeEJJOztBQTR4Qkw7Ozs7OztBQU1BZ0csY0FseUJLLHNCQWt5Qk1uQyxVQWx5Qk4sRUFreUJrQk0sVUFseUJsQixFQWt5QjhCO0FBQ2pDckcsUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUQsVUFBVixFQUFzQixZQUF0QjtBQUNBL0YsUUFBRSxDQUFDc0csT0FBSCxDQUFXRCxVQUFYLEVBQXVCLFlBQXZCOztBQUVBLFVBQUlOLFVBQVUsQ0FBQzRCLFVBQVgsQ0FBc0IsV0FBdEIsQ0FBSixFQUF3QztBQUN0QyxlQUFPLEtBQUsvRCxNQUFMLFlBQWdCbUMsVUFBVSxDQUFDNkIsU0FBWCxDQUFxQixDQUFyQixDQUFoQixjQUEyQ3ZCLFVBQTNDLEVBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUt6QyxNQUFMLGtCQUFzQm1DLFVBQXRCLGNBQW9DTSxVQUFwQyxFQUFQO0FBQ0QsS0EzeUJJOztBQTZ5Qkw7Ozs7OztBQU1BOEIsZUFuekJLLHVCQW16Qk9wQyxVQW56QlAsRUFtekJtQnFDLFdBbnpCbkIsRUFtekJnQztBQUNuQ3BJLFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVXlELFVBQVYsRUFBc0IsWUFBdEI7QUFDQS9GLFFBQUUsQ0FBQ3FILEtBQUgsQ0FBU2UsV0FBVCxFQUFzQixhQUF0Qjs7QUFFQSxVQUFJckMsVUFBVSxDQUFDNEIsVUFBWCxDQUFzQixXQUF0QixDQUFKLEVBQXdDO0FBQ3RDLGVBQU8sS0FBSy9ELE1BQUwsWUFBZ0JtQyxVQUFVLENBQUM2QixTQUFYLENBQXFCLENBQXJCLENBQWhCLGNBQTJDUSxXQUFXLENBQUNkLElBQVosRUFBM0MsRUFBUDtBQUNEOztBQUVELGFBQU8sS0FBSzFELE1BQUwsa0JBQXNCbUMsVUFBdEIsY0FBb0NxQyxXQUFXLENBQUNkLElBQVosRUFBcEMsRUFBUDtBQUNELEtBNXpCSTtBQTh6Qkw7QUFDQTs7QUFFQTs7Ozs7O0FBTUFlLDJCQXYwQkssbUNBdTBCbUJ0QyxVQXYwQm5CLEVBdTBCNEM7QUFBQSxVQUFiN0QsTUFBYSx1RUFBSixFQUFJO0FBQy9DbEMsUUFBRSxDQUFDc0MsTUFBSCxDQUFVLEtBQUtwQyxLQUFmLEVBQXNCLFlBQXRCO0FBQ0FGLFFBQUUsQ0FBQ3VDLGFBQUgsQ0FBaUJMLE1BQWpCLEVBQXlCLFFBQXpCO0FBQ0EsYUFBT2tDLE9BQU8sQ0FBQ29CLEdBQVIsQ0FBWSxDQUNqQixLQUFLakMsR0FBTCxDQUFTLHFCQUFULEVBQWdDO0FBQzlCK0UsYUFBSyxFQUFFLENBRHVCO0FBRTlCLCtCQUF1QixDQUZPO0FBRzlCLGtDQUEwQnZDLFVBSEk7QUFJOUIsOEJBQXNCLENBSlE7QUFLOUIsOEJBQXNCLENBTFE7QUFNOUJ3QyxZQUFJLEVBQUU7QUFOd0IsT0FBaEMsQ0FEaUIsRUFTakIsS0FBS2hGLEdBQUwsQ0FBUyxxQkFBVCxFQUFnQztBQUM5QitFLGFBQUssRUFBRSxDQUR1QjtBQUU5QiwrQkFBdUIsQ0FGTztBQUc5QixrQ0FBMEJ2QyxVQUhJO0FBSTlCLDRCQUFvQixLQUFLdEUsT0FBTCxDQUFhaUUsSUFKSDtBQUs5Qiw4QkFBc0IsQ0FMUTtBQU05QjZDLFlBQUksRUFBRTtBQU53QixPQUFoQyxDQVRpQixFQWlCakIsS0FBS2hGLEdBQUwsQ0FBUyxxQkFBVCxFQUFnQztBQUM5QitFLGFBQUssRUFBRSxDQUR1QjtBQUU5QiwrQkFBdUIsQ0FGTztBQUc5QixrQ0FBMEJ2QyxVQUhJO0FBSTlCLDRCQUFvQixLQUFLdEUsT0FBTCxDQUFhaUUsSUFKSDtBQUs5Qiw0QkFBb0IsS0FBS2pFLE9BQUwsQ0FBYWdFLEVBTEg7QUFNOUI4QyxZQUFJLEVBQUU7QUFOd0IsT0FBaEMsQ0FqQmlCLENBQVosRUF5Qkp4RixJQXpCSSxDQXlCQyxVQUFBNEMsTUFBTSxFQUFJO0FBQUEsc0NBQ2lCQSxNQURqQjtBQUFBLFlBQ1RJLFVBRFM7QUFBQSxZQUNHTCxJQURIO0FBQUEsWUFDU0UsSUFEVCxnQkFDeUI7OztBQUN6QyxZQUFJQSxJQUFJLENBQUN6RCxJQUFMLElBQWF5RCxJQUFJLENBQUN6RCxJQUFMLENBQVVVLE1BQVYsR0FBbUIsQ0FBcEMsRUFBdUM7QUFDckMsaUJBQU8rQyxJQUFJLENBQUN6RCxJQUFMLENBQVUsQ0FBVixDQUFQO0FBQ0Q7O0FBQ0QsWUFBSXVELElBQUksQ0FBQ3ZELElBQUwsSUFBYXVELElBQUksQ0FBQ3ZELElBQUwsQ0FBVVUsTUFBVixHQUFtQixDQUFwQyxFQUF1QztBQUNyQyxpQkFBTzZDLElBQUksQ0FBQ3ZELElBQUwsQ0FBVSxDQUFWLENBQVA7QUFDRDs7QUFDRCxZQUFJNEQsVUFBVSxDQUFDNUQsSUFBWCxJQUFtQjRELFVBQVUsQ0FBQzVELElBQVgsQ0FBZ0JVLE1BQWhCLEdBQXlCLENBQWhELEVBQW1EO0FBQ2pELGlCQUFPa0QsVUFBVSxDQUFDNUQsSUFBWCxDQUFnQixDQUFoQixDQUFQO0FBQ0Q7O0FBQ0QsZUFBTyxFQUFQO0FBQ0QsT0FyQ00sQ0FBUDtBQXNDRCxLQWgzQkk7QUFrM0JMO0FBQ0E7O0FBRUE7Ozs7O0FBS0FxRyxrQkExM0JLLDRCQTAzQnVCO0FBQUEsVUFBYnRHLE1BQWEsdUVBQUosRUFBSTtBQUMxQmxDLFFBQUUsQ0FBQ3VDLGFBQUgsQ0FBaUJMLE1BQWpCLEVBQXlCLFFBQXpCO0FBQ0EsYUFBTyxLQUFLOEYsUUFBTCxDQUFjLHNCQUFkLEVBQXNDOUYsTUFBdEMsQ0FBUDtBQUNELEtBNzNCSTs7QUErM0JMOzs7OztBQUtBdUcsb0JBcDRCSyw4QkFvNEJ5QjtBQUFBLFVBQWJ2RyxNQUFhLHVFQUFKLEVBQUk7QUFDNUJsQyxRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsQ0FBUyxpQkFBVCxFQUE0QnJCLE1BQTVCLENBQVA7QUFDRCxLQXY0Qkk7O0FBeTRCTDs7Ozs7QUFLQXdHLHFCQTk0QkssNkJBODRCYXZHLElBOTRCYixFQTg0Qm1CO0FBQ3RCbkMsUUFBRSxDQUFDcUgsS0FBSCxDQUFTbEYsSUFBVDtBQUNBLGFBQU8sS0FBS3FCLElBQUwsQ0FBVSxjQUFWLEVBQTBCckIsSUFBMUIsQ0FBUDtBQUNELEtBajVCSTs7QUFtNUJMOzs7OztBQUtBd0cscUJBeDVCSyw2QkF3NUJheEcsSUF4NUJiLEVBdzVCbUI7QUFDdEJuQyxRQUFFLENBQUNxSCxLQUFILENBQVNsRixJQUFUO0FBQ0EsYUFBTyxLQUFLdUIsS0FBTCxDQUFXLGNBQVgsRUFBMkJ2QixJQUEzQixDQUFQO0FBQ0QsS0EzNUJJO0FBNjVCTDtBQUNBOztBQUVBOzs7OztBQUtBeUcsZ0JBcjZCSywwQkFxNkJxQjtBQUFBLFVBQWIxRyxNQUFhLHVFQUFKLEVBQUk7QUFDeEJsQyxRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsQ0FBUyxZQUFULEVBQXVCckIsTUFBdkIsQ0FBUDtBQUNELEtBeDZCSTtBQTA2QkwyRyxrQkExNkJLLDBCQTA2QlUxRyxJQTE2QlYsRUEwNkJnQjtBQUNuQixhQUFPLEtBQUtxQixJQUFMLENBQVUsWUFBVixFQUF3QnJCLElBQXhCLENBQVA7QUFDRCxLQTU2Qkk7QUE4NkJMMkcsa0JBOTZCSywwQkE4NkJVekMsVUE5NkJWLEVBODZCc0JsRSxJQTk2QnRCLEVBODZCNEI7QUFDL0IsYUFBTyxLQUFLdUIsS0FBTCxzQkFBeUIyQyxVQUF6QixHQUF1Q2xFLElBQXZDLENBQVA7QUFDRCxLQWg3Qkk7O0FBazdCTDs7Ozs7O0FBTUE0RywwQkF4N0JLLGtDQXc3QmtCaEQsVUF4N0JsQixFQXc3QjJDO0FBQUEsVUFBYjdELE1BQWEsdUVBQUosRUFBSTtBQUM5Q2xDLFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVXlELFVBQVYsRUFBc0IsWUFBdEI7QUFDQS9GLFFBQUUsQ0FBQ3VDLGFBQUgsQ0FBaUJMLE1BQWpCO0FBRUEsYUFBT2tDLE9BQU8sQ0FBQ29CLEdBQVIsQ0FBWSxDQUNqQixLQUFLakMsR0FBTCxDQUFTLFlBQVQsRUFBdUI7QUFBRSxvQ0FBNEJ3QztBQUE5QixPQUF2QixDQURpQixFQUVqQixLQUFLeEMsR0FBTCxDQUFTLFlBQVQsRUFBdUI7QUFBRSxvQ0FBNEJ3QztBQUE5QixPQUF2QixDQUZpQixDQUFaLENBQVA7QUFJRCxLQWg4Qkk7QUFrOEJMO0FBQ0E7O0FBRUE7Ozs7Ozs7QUFPQWlELG9CQTU4QkssNEJBNDhCWWpELFVBNThCWixFQTQ4QndCTSxVQTU4QnhCLEVBNDhCaUQ7QUFBQSxVQUFibkUsTUFBYSx1RUFBSixFQUFJO0FBQ3BEbEMsUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUQsVUFBVixFQUFzQixZQUF0QjtBQUNBL0YsUUFBRSxDQUFDc0csT0FBSCxDQUFXRCxVQUFYLEVBQXVCLFlBQXZCO0FBQ0FyRyxRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6Qjs7QUFFQSxVQUFJNkQsVUFBVSxDQUFDNEIsVUFBWCxDQUFzQixXQUF0QixDQUFKLEVBQXdDO0FBQ3RDLGVBQU8sS0FBS3BFLEdBQUwsWUFDRHdDLFVBQVUsQ0FBQzZCLFNBQVgsQ0FBcUIsQ0FBckIsQ0FEQyxjQUMwQnZCLFVBRDFCLGlCQUVMbkUsTUFGSyxDQUFQO0FBSUQ7O0FBRUQsYUFBTyxLQUFLcUIsR0FBTCxrQkFBbUJ3QyxVQUFuQixjQUFpQ00sVUFBakMsaUJBQXlEbkUsTUFBekQsQ0FBUDtBQUNELEtBejlCSTs7QUEyOUJMOzs7Ozs7O0FBT0ErRyxVQWwrQkssa0JBaytCRWxELFVBbCtCRixFQWsrQmNNLFVBbCtCZCxFQWsrQjBCNkMsVUFsK0IxQixFQWsrQnNDO0FBQ3pDbEosUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUQsVUFBVixFQUFzQixZQUF0QjtBQUNBL0YsUUFBRSxDQUFDc0csT0FBSCxDQUFXRCxVQUFYLEVBQXVCLFlBQXZCO0FBQ0FyRyxRQUFFLENBQUNtSixNQUFILENBQVVELFVBQVYsRUFBc0IsWUFBdEI7O0FBRUEsVUFBSW5ELFVBQVUsQ0FBQzRCLFVBQVgsQ0FBc0IsV0FBdEIsQ0FBSixFQUF3QztBQUN0QyxlQUFPLEtBQUtqRSxLQUFMLFlBQ0RxQyxVQUFVLENBQUM2QixTQUFYLENBQXFCLENBQXJCLENBREMsY0FDMEJ2QixVQUQxQixxQkFDK0M2QyxVQUQvQyxFQUFQO0FBR0Q7O0FBRUQsYUFBTyxLQUFLeEYsS0FBTCxrQkFDS3FDLFVBREwsY0FDbUJNLFVBRG5CLHFCQUN3QzZDLFVBRHhDLEVBQVA7QUFHRCxLQWgvQkk7QUFrL0JMO0FBQ0E7O0FBRUE7Ozs7OztBQU1BRSxXQTMvQkssbUJBMi9CRy9DLFVBMy9CSCxFQTIvQjRCO0FBQUEsVUFBYm5FLE1BQWEsdUVBQUosRUFBSTtBQUMvQmxDLFFBQUUsQ0FBQ21KLE1BQUgsQ0FBVTlDLFVBQVYsRUFBc0IsWUFBdEI7QUFDQXJHLFFBQUUsQ0FBQ3VDLGFBQUgsQ0FBaUJMLE1BQWpCLEVBQXlCLFFBQXpCO0FBQ0EsYUFBTyxLQUFLcUIsR0FBTCxrQkFBbUI4QyxVQUFuQixHQUFpQ25FLE1BQWpDLENBQVA7QUFDRCxLQS8vQkk7O0FBaWdDTDs7Ozs7QUFLQW1ILFlBdGdDSyxzQkFzZ0NpQjtBQUFBLFVBQWJuSCxNQUFhLHVFQUFKLEVBQUk7QUFDcEJsQyxRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsQ0FBUyxRQUFULEVBQW1CckIsTUFBbkIsQ0FBUDtBQUNELEtBemdDSTs7QUEyZ0NMOzs7Ozs7QUFNQW9ILGNBamhDSyxzQkFpaENNakQsVUFqaENOLEVBaWhDa0I1QyxJQWpoQ2xCLEVBaWhDd0I7QUFDM0J6RCxRQUFFLENBQUNzRyxPQUFILENBQVdELFVBQVgsRUFBdUIsWUFBdkI7QUFDQXJHLFFBQUUsQ0FBQytELE1BQUgsQ0FBVU4sSUFBVixFQUFnQixNQUFoQjtBQUNBLGFBQU8sS0FBS2lFLFVBQUwsQ0FBZ0IsZ0JBQWhCLEVBQWtDckIsVUFBbEMsRUFBOEM1QyxJQUE5QyxDQUFQO0FBQ0QsS0FyaENJOztBQXVoQ0w7Ozs7O0FBS0E4RixjQTVoQ0ssc0JBNGhDTTlGLElBNWhDTixFQTRoQ1k7QUFDZnpELFFBQUUsQ0FBQytELE1BQUgsQ0FBVU4sSUFBVixFQUFnQixNQUFoQjtBQUNBLGFBQU8sS0FBS3FFLFVBQUwsQ0FBZ0IsZ0JBQWhCLEVBQWtDckUsSUFBbEMsQ0FBUDtBQUNELEtBL2hDSTs7QUFpaUNMOzs7OztBQUtBK0YsY0F0aUNLLHNCQXNpQ01uRCxVQXRpQ04sRUFzaUNrQjtBQUNyQnJHLFFBQUUsQ0FBQ3NHLE9BQUgsQ0FBV0QsVUFBWCxFQUF1QixZQUF2QjtBQUNBLGFBQU8sS0FBSzZCLFVBQUwsQ0FBZ0IsZ0JBQWhCLEVBQWtDN0IsVUFBbEMsQ0FBUDtBQUNELEtBemlDSTtBQTJpQ0w7QUFDQTs7QUFFQTs7Ozs7QUFLQW9ELGVBbmpDSyx5QkFtakNvQjtBQUFBLFVBQWJ2SCxNQUFhLHVFQUFKLEVBQUk7QUFDdkJsQyxRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsQ0FBUyxXQUFULEVBQXNCckIsTUFBdEIsQ0FBUDtBQUNELEtBdGpDSTs7QUF3akNMOzs7OztBQUtBd0gscUJBN2pDSywrQkE2akMwQjtBQUFBLFVBQWJ4SCxNQUFhLHVFQUFKLEVBQUk7QUFDN0JsQyxRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsQ0FBUyxrQkFBVCxFQUE2QnJCLE1BQTdCLENBQVA7QUFDRCxLQWhrQ0k7QUFra0NMO0FBQ0E7O0FBRUE7Ozs7O0FBS0F5SCxZQTFrQ0ssc0JBMGtDaUI7QUFBQSxVQUFiekgsTUFBYSx1RUFBSixFQUFJO0FBQ3BCbEMsUUFBRSxDQUFDdUMsYUFBSCxDQUFpQkwsTUFBakIsRUFBeUIsUUFBekI7QUFDQSxhQUFPLEtBQUtxQixHQUFMLENBQVMsUUFBVCxFQUFtQnJCLE1BQW5CLENBQVA7QUFDRCxLQTdrQ0k7O0FBK2tDTDs7Ozs7O0FBTUEwSCxXQXJsQ0ssbUJBcWxDR3ZELFVBcmxDSCxFQXFsQzRCO0FBQUEsVUFBYm5FLE1BQWEsdUVBQUosRUFBSTtBQUMvQmxDLFFBQUUsQ0FBQ3NHLE9BQUgsQ0FBV0QsVUFBWCxFQUF1QixZQUF2QjtBQUNBckcsUUFBRSxDQUFDdUMsYUFBSCxDQUFpQkwsTUFBakIsRUFBeUIsUUFBekI7QUFDQSxhQUFPLEtBQUtxQixHQUFMLGtCQUFtQjhDLFVBQW5CLEdBQWlDbkUsTUFBakMsQ0FBUDtBQUNELEtBemxDSTs7QUEybENMOzs7OztBQUtBMkgsU0FobUNLLG1CQWdtQ2M7QUFBQSxVQUFiM0gsTUFBYSx1RUFBSixFQUFJO0FBQ2pCbEMsUUFBRSxDQUFDdUMsYUFBSCxDQUFpQkwsTUFBakIsRUFBeUIsUUFBekI7QUFDQSxhQUFPLEtBQUtxQixHQUFMLENBQVMsV0FBVCxFQUFzQnJCLE1BQXRCLENBQVA7QUFDRCxLQW5tQ0k7O0FBcW1DTDs7Ozs7O0FBTUE0SCxjQTNtQ0ssc0JBMm1DTXpELFVBM21DTixFQTJtQ2tCNUMsSUEzbUNsQixFQTJtQ3dCO0FBQzNCekQsUUFBRSxDQUFDc0csT0FBSCxDQUFXRCxVQUFYLEVBQXVCLFlBQXZCO0FBQ0FyRyxRQUFFLENBQUMrRCxNQUFILENBQVVOLElBQVYsRUFBZ0IsTUFBaEI7QUFDQSxhQUFPLEtBQUtpRSxVQUFMLENBQWdCLGdCQUFoQixFQUFrQ3JCLFVBQWxDLEVBQThDNUMsSUFBOUMsQ0FBUDtBQUNELEtBL21DSTtBQWluQ0w7QUFDQTs7QUFFQTs7OztBQUlBc0csUUF4bkNLLGtCQXduQ0U7QUFDTCxhQUFPLEtBQUtoSSxPQUFMLENBQWEsS0FBYixFQUFvQixjQUFwQixFQUFvQyxFQUFwQyxFQUF3QyxFQUF4QyxFQUE0QyxJQUE1QyxDQUFQO0FBQ0QsS0ExbkNJOztBQTRuQ0w7Ozs7QUFJQWlJLGNBaG9DSyx3QkFnb0NRO0FBQ1gsYUFBTyxLQUFLakksT0FBTCxDQUFhLEtBQWIsRUFBb0IsR0FBcEIsRUFBeUIsRUFBekIsRUFBNkIsRUFBN0IsRUFBaUMsSUFBakMsQ0FBUDtBQUNELEtBbG9DSTs7QUFvb0NMOzs7O0FBSUFrSSw4QkF4b0NLLHdDQXdvQ3dCO0FBQzNCLGFBQU8sS0FBSzFHLEdBQUwsQ0FBUyxXQUFULENBQVA7QUFDRDtBQTFvQ0ksR0FBUDtBQTRvQ0QsQyxDQUVEO0FBQ0E7OztBQUVBekMsR0FBRyxDQUFDYixVQUFKLEdBQWlCQSxVQUFqQjtBQUNBaUssTUFBTSxDQUFDQyxPQUFQLEdBQWlCckosR0FBakIsQyIsImZpbGUiOiJkaXJlY3R1cy1zZGsudW1kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJEaXJlY3R1c1NES1wiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEaXJlY3R1c1NES1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEaXJlY3R1c1NES1wiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gICAgLypcbiAgICAgKiBXZSBvbmx5IGRlZmluZSB0aGUgaXMvaGFzKiBmdW5jdGlvbnMgYW5kIHVzZSB0aGVcbiAgICAgKiBkZW1hbmQoKSBmdW5jdGlvbiB0byBidWlsZCB0aGUgZGVtYW5kcywgYWxzbyB0aGVcbiAgICAgKiBnZXREZW1hbmRNZXRob2ROYW1lQnlWYWxpZGF0b3JLZXkoKSAoeWVoLCBJIGtub3cgaXQncyBhbiB1Z2x5IG5hbWUgOigpXG4gICAgICogYnVpbGQgdGhlIGRlbWFuZCBtZXRob2QgYmFzZWQgaW4gdGhlIC5pcy9oYXMgbWV0aG9kc1xuICAgICAqL1xuXG4gICAgdmFyIHYgPSB7IH07XG5cbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuQXJndW1lbnRWYWxpZGF0b3IgPSB2O1xuICAgIH1cblxuICAgIHZhciBkZW1hbmQgPSBmdW5jdGlvbiAoZGVtYW5kTWV0aG9kTmFtZSwgdmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUgLyogLi4uIG1vcmUgYXJncywgbmFtZSAqLykge1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRvci5hcHBseSh2LCBhcmd1bWVudHMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBuYW1lID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAtMSlbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2LmlzSnNvbih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG1zZyA9IFwiSW52YWxpZCBcIiArIGRlbWFuZE1ldGhvZE5hbWUgKyBcIiB2YWx1ZTogXCIgKyB2YWx1ZTtcbiAgICAgICAgICAgIGlmICh2LmlzU3RyaW5nKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgbXNnICs9IFwiXFxuQXJndW1lbnQgTmFtZTogXCIgKyBuYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodi5pc0FycmF5KGFyZ3VtZW50c1sxXSkpIHtcbiAgICAgICAgICAgICAgICBtc2cgKz0gXCJcXG5LZXlzOiBcIiArIGFyZ3VtZW50c1sxXS5qb2luKFwiLCBcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBnZXREZW1hbmRNZXRob2ROYW1lQnlWYWxpZGF0b3JLZXkgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciBwcmVmaXggPSBbICdpcycsICdoYXMnIF07XG4gICAgICAgIHZhciBwcmVmaXhMZW5ndGggPSBudWxsO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJlZml4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwcmVmaXhMZW5ndGggPSBwcmVmaXhbaV0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAoa2V5LnNsaWNlKDAsIHByZWZpeExlbmd0aCkgPT09IHByZWZpeFtpXSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRlbWFuZE1ldGhvZE5hbWUgPSBrZXkuc2xpY2UocHJlZml4TGVuZ3RoICsgMSk7XG4gICAgICAgIHZhciBmaXJzdExldHRlciA9IGtleS5zbGljZShwcmVmaXhMZW5ndGgsIHByZWZpeExlbmd0aCArIDEpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciBuYW1lID0gZmlyc3RMZXR0ZXIgKyBkZW1hbmRNZXRob2ROYW1lO1xuXG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH07XG5cbiAgICB2YXIgaGFzS2V5c1dpdGggPSBmdW5jdGlvbiAodmFsaWRhdG9yLCBvYmosIGtleXMpIHtcbiAgICAgICAgaWYgKCF2LmlzT2JqZWN0T3JFbXB0eShvYmopIHx8ICF2LmlzQXJyYXlPckVtcHR5KGtleXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5c1tpXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdmFsaWRhdG9yKG9ialtrZXlzW2ldXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdmFyIGlzQXJyYXlPZiA9IGZ1bmN0aW9uICh2YWxpZGF0b3IsIGFycikge1xuICAgICAgICBpZiAoIXYuaXNBcnJheShhcnIpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCF2YWxpZGF0b3IoYXJyW2ldKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICB2LmlzTm90TnVsbCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZDtcbiAgICB9O1xuXG4gICAgdi5pc0luc3RhbmNlT2YgPSBmdW5jdGlvbih0eXBlLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiB0eXBlO1xuICAgIH07XG5cbiAgICB2LmlzVHlwZSA9IGZ1bmN0aW9uICh0eXBlLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IFwiICsgdHlwZSArIFwiXVwiO1xuICAgIH07XG5cbiAgICB2LmlzQm9vbGVhbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gKFsgMSwgMCwgdHJ1ZSwgZmFsc2UgXS5pbmRleE9mKHZhbHVlKSA+IC0xKTtcbiAgICB9O1xuXG4gICAgdi5pc1N0cmluZ09yRW1wdHkgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHYuaXNUeXBlKFwiU3RyaW5nXCIsIHZhbHVlKTtcbiAgICB9O1xuXG4gICAgdi5pc1N0cmluZyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXYuaXNTdHJpbmdPckVtcHR5KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAvXFxTLy50ZXN0KHZhbHVlKTtcbiAgICB9O1xuXG4gICAgdi5pc051bWJlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXYuaXNUeXBlKCdOdW1iZXInLCB2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpc0Zpbml0ZSh2YWx1ZSkgJiYgIWlzTmFOKHBhcnNlRmxvYXQodmFsdWUpKTtcbiAgICB9O1xuXG4gICAgdi5pc0FycmF5T3JFbXB0eSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgcmV0dXJuIHYuaXNUeXBlKFwiQXJyYXlcIiwgYXJyKTtcbiAgICB9O1xuXG4gICAgdi5pc0FycmF5ID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgICBpZiAoIXYuaXNBcnJheU9yRW1wdHkoYXJyKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFyci5sZW5ndGggPiAwO1xuICAgIH07XG5cbiAgICB2LmlzQXJyYXlPZk51bWJlcnMgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgIHJldHVybiBpc0FycmF5T2Yodi5pc051bWJlciwgYXJyKTtcbiAgICB9O1xuXG4gICAgdi5pc0FycmF5T2ZPYmplY3RzID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgICByZXR1cm4gaXNBcnJheU9mKHYuaXNPYmplY3QsIGFycik7XG4gICAgfTtcblxuICAgIHYuaXNPYmplY3RPckVtcHR5ID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gdi5pc1R5cGUoXCJPYmplY3RcIiwgb2JqKTtcbiAgICB9O1xuXG4gICAgdi5pc09iamVjdCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgaWYgKCF2LmlzT2JqZWN0T3JFbXB0eShvYmopKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICB2LmlzSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXYuaXNPYmplY3RPckVtcHR5KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdi5pc0pzb25TdHJpbmcgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF2LmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICB2Lmhhc0tleXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gICAgICAgIHJldHVybiBoYXNLZXlzV2l0aCh2LmlzTm90TnVsbCwgb2JqLCBrZXlzKTtcbiAgICB9O1xuXG4gICAgdi5oYXNLZXlzV2l0aE51bWJlciA9IHYuaGFzTnVtYmVyS2V5cyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgICAgICAgcmV0dXJuIGhhc0tleXNXaXRoKHYuaXNOdW1iZXIsIG9iaiwga2V5cyk7XG4gICAgfTtcblxuICAgIHYuaGFzS2V5c1dpdGhTdHJpbmcgPSB2Lmhhc1N0cmluZ0tleXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gICAgICAgIHJldHVybiBoYXNLZXlzV2l0aCh2LmlzU3RyaW5nLCBvYmosIGtleXMpO1xuICAgIH07XG5cbiAgICB2Lmhhc0tleXNXaXRoT2JqZWN0ID0gdi5oYXNPYmplY3RLZXlzID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICAgICAgICByZXR1cm4gaGFzS2V5c1dpdGgodi5pc09iamVjdCwgb2JqLCBrZXlzKTtcbiAgICB9O1xuXG4gICAgdi5oYXNLZXlzV2l0aFN0cmluZ09yRW1wdHkgPSB2Lmhhc1N0cmluZ09yRW1wdHlLZXlzID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICAgICAgICByZXR1cm4gaGFzS2V5c1dpdGgodi5pc1N0cmluZ09yRW1wdHksIG9iaiwga2V5cyk7XG4gICAgfTtcblxuICAgIHYuaGFzS2V5c1dpdGhPYmplY3RPckVtcHR5ID0gdi5oYXNPYmplY3RPckVtcHR5S2V5cyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgICAgICAgcmV0dXJuIGhhc0tleXNXaXRoKHYuaXNPYmplY3RPckVtcHR5LCBvYmosIGtleXMpO1xuICAgIH07XG5cbiAgICB2LmlzRnVuY3Rpb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHYuaXNJbnN0YW5jZU9mKEZ1bmN0aW9uLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIC8vIGJ1aWxkIGRlbWFuZCBmdW5jdGlvbnNcbiAgICBmb3IgKHZhciBrZXkgaW4gdikge1xuICAgICAgICB2YXIgZGVtYW5kTWV0aG9kTmFtZSA9IGdldERlbWFuZE1ldGhvZE5hbWVCeVZhbGlkYXRvcktleShrZXkpO1xuICAgICAgICB2W2RlbWFuZE1ldGhvZE5hbWVdID0gZGVtYW5kKGRlbWFuZE1ldGhvZE5hbWUsIHZba2V5XSk7XG4gICAgfVxuXG59KS5jYWxsKHRoaXMpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG52YXIgYnRvYSA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuYnRvYSAmJiB3aW5kb3cuYnRvYS5iaW5kKHdpbmRvdykpIHx8IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idG9hJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgdmFyIGxvYWRFdmVudCA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xuICAgIHZhciB4RG9tYWluID0gZmFsc2U7XG5cbiAgICAvLyBGb3IgSUUgOC85IENPUlMgc3VwcG9ydFxuICAgIC8vIE9ubHkgc3VwcG9ydHMgUE9TVCBhbmQgR0VUIGNhbGxzIGFuZCBkb2Vzbid0IHJldHVybnMgdGhlIHJlc3BvbnNlIGhlYWRlcnMuXG4gICAgLy8gRE9OJ1QgZG8gdGhpcyBmb3IgdGVzdGluZyBiL2MgWE1MSHR0cFJlcXVlc3QgaXMgbW9ja2VkLCBub3QgWERvbWFpblJlcXVlc3QuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAndGVzdCcgJiZcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgd2luZG93LlhEb21haW5SZXF1ZXN0ICYmICEoJ3dpdGhDcmVkZW50aWFscycgaW4gcmVxdWVzdCkgJiZcbiAgICAgICAgIWlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkge1xuICAgICAgcmVxdWVzdCA9IG5ldyB3aW5kb3cuWERvbWFpblJlcXVlc3QoKTtcbiAgICAgIGxvYWRFdmVudCA9ICdvbmxvYWQnO1xuICAgICAgeERvbWFpbiA9IHRydWU7XG4gICAgICByZXF1ZXN0Lm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiBoYW5kbGVQcm9ncmVzcygpIHt9O1xuICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge307XG4gICAgfVxuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdFtsb2FkRXZlbnRdID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0ICYmICF4RG9tYWluKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAvLyBJRSBzZW5kcyAxMjIzIGluc3RlYWQgb2YgMjA0IChodHRwczovL2dpdGh1Yi5jb20vYXhpb3MvYXhpb3MvaXNzdWVzLzIwMSlcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/ICdObyBDb250ZW50JyA6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgdmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xuXG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/XG4gICAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpO1xuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UodXRpbHMubWVyZ2UoZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLy4uL2RlZmF1bHRzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gdXRpbHMubWVyZ2Uoe1xuICAgICAgdXJsOiBhcmd1bWVudHNbMF1cbiAgICB9LCBhcmd1bWVudHNbMV0pO1xuICB9XG5cbiAgY29uZmlnID0gdXRpbHMubWVyZ2UoZGVmYXVsdHMsIHttZXRob2Q6ICdnZXQnfSwgdGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gU3VwcG9ydCBiYXNlVVJMIGNvbmZpZ1xuICBpZiAoY29uZmlnLmJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwoY29uZmlnLnVybCkpIHtcbiAgICBjb25maWcudXJsID0gY29tYmluZVVSTHMoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICB9XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVycyB8fCB7fVxuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICAvLyBOb3RlOiBzdGF0dXMgaXMgbm90IGV4cG9zZWQgYnkgWERvbWFpblJlcXVlc3RcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIGJ0b2EgcG9seWZpbGwgZm9yIElFPDEwIGNvdXJ0ZXN5IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXZpZGNoYW1iZXJzL0Jhc2U2NC5qc1xuXG52YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xuXG5mdW5jdGlvbiBFKCkge1xuICB0aGlzLm1lc3NhZ2UgPSAnU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyJztcbn1cbkUucHJvdG90eXBlID0gbmV3IEVycm9yO1xuRS5wcm90b3R5cGUuY29kZSA9IDU7XG5FLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cbmZ1bmN0aW9uIGJ0b2EoaW5wdXQpIHtcbiAgdmFyIHN0ciA9IFN0cmluZyhpbnB1dCk7XG4gIHZhciBvdXRwdXQgPSAnJztcbiAgZm9yIChcbiAgICAvLyBpbml0aWFsaXplIHJlc3VsdCBhbmQgY291bnRlclxuICAgIHZhciBibG9jaywgY2hhckNvZGUsIGlkeCA9IDAsIG1hcCA9IGNoYXJzO1xuICAgIC8vIGlmIHRoZSBuZXh0IHN0ciBpbmRleCBkb2VzIG5vdCBleGlzdDpcbiAgICAvLyAgIGNoYW5nZSB0aGUgbWFwcGluZyB0YWJsZSB0byBcIj1cIlxuICAgIC8vICAgY2hlY2sgaWYgZCBoYXMgbm8gZnJhY3Rpb25hbCBkaWdpdHNcbiAgICBzdHIuY2hhckF0KGlkeCB8IDApIHx8IChtYXAgPSAnPScsIGlkeCAlIDEpO1xuICAgIC8vIFwiOCAtIGlkeCAlIDEgKiA4XCIgZ2VuZXJhdGVzIHRoZSBzZXF1ZW5jZSAyLCA0LCA2LCA4XG4gICAgb3V0cHV0ICs9IG1hcC5jaGFyQXQoNjMgJiBibG9jayA+PiA4IC0gaWR4ICUgMSAqIDgpXG4gICkge1xuICAgIGNoYXJDb2RlID0gc3RyLmNoYXJDb2RlQXQoaWR4ICs9IDMgLyA0KTtcbiAgICBpZiAoY2hhckNvZGUgPiAweEZGKSB7XG4gICAgICB0aHJvdyBuZXcgRSgpO1xuICAgIH1cbiAgICBibG9jayA9IGJsb2NrIDw8IDggfCBjaGFyQ29kZTtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ0b2E7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTQwL2dpLCAnQCcpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICB9LFxuXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgIH1cblxuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpO1xuXG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcpICYmICh2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltXG59O1xuIiwiLyohIGh0dHA6Ly9tdGhzLmJlL2Jhc2U2NCB2MC4xLjAgYnkgQG1hdGhpYXMgfCBNSVQgbGljZW5zZSAqL1xuOyhmdW5jdGlvbihyb290KSB7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGVzIGBleHBvcnRzYC5cblx0dmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cztcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC5cblx0dmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJlxuXHRcdG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzICYmIG1vZHVsZTtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCwgZnJvbSBOb2RlLmpzIG9yIEJyb3dzZXJpZmllZCBjb2RlLCBhbmQgdXNlXG5cdC8vIGl0IGFzIGByb290YC5cblx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0aWYgKGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8IGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsKSB7XG5cdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR2YXIgSW52YWxpZENoYXJhY3RlckVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuXHRcdHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cdH07XG5cdEludmFsaWRDaGFyYWN0ZXJFcnJvci5wcm90b3R5cGUgPSBuZXcgRXJyb3I7XG5cdEludmFsaWRDaGFyYWN0ZXJFcnJvci5wcm90b3R5cGUubmFtZSA9ICdJbnZhbGlkQ2hhcmFjdGVyRXJyb3InO1xuXG5cdHZhciBlcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHQvLyBOb3RlOiB0aGUgZXJyb3IgbWVzc2FnZXMgdXNlZCB0aHJvdWdob3V0IHRoaXMgZmlsZSBtYXRjaCB0aG9zZSB1c2VkIGJ5XG5cdFx0Ly8gdGhlIG5hdGl2ZSBgYXRvYmAvYGJ0b2FgIGltcGxlbWVudGF0aW9uIGluIENocm9taXVtLlxuXHRcdHRocm93IG5ldyBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IobWVzc2FnZSk7XG5cdH07XG5cblx0dmFyIFRBQkxFID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuXHQvLyBodHRwOi8vd2hhdHdnLm9yZy9odG1sL2NvbW1vbi1taWNyb3N5bnRheGVzLmh0bWwjc3BhY2UtY2hhcmFjdGVyXG5cdHZhciBSRUdFWF9TUEFDRV9DSEFSQUNURVJTID0gL1tcXHRcXG5cXGZcXHIgXS9nO1xuXG5cdC8vIGBkZWNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYXRvYmAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkLiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWF0b2Jcblx0Ly8gVGhlIG9wdGltaXplZCBiYXNlNjQtZGVjb2RpbmcgYWxnb3JpdGhtIHVzZWQgaXMgYmFzZWQgb24gQGF0a+KAmXMgZXhjZWxsZW50XG5cdC8vIGltcGxlbWVudGF0aW9uLiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9hdGsvMTAyMDM5NlxuXHR2YXIgZGVjb2RlID0gZnVuY3Rpb24oaW5wdXQpIHtcblx0XHRpbnB1dCA9IFN0cmluZyhpbnB1dClcblx0XHRcdC5yZXBsYWNlKFJFR0VYX1NQQUNFX0NIQVJBQ1RFUlMsICcnKTtcblx0XHR2YXIgbGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHRcdGlmIChsZW5ndGggJSA0ID09IDApIHtcblx0XHRcdGlucHV0ID0gaW5wdXQucmVwbGFjZSgvPT0/JC8sICcnKTtcblx0XHRcdGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHR9XG5cdFx0aWYgKFxuXHRcdFx0bGVuZ3RoICUgNCA9PSAxIHx8XG5cdFx0XHQvLyBodHRwOi8vd2hhdHdnLm9yZy9DI2FscGhhbnVtZXJpYy1hc2NpaS1jaGFyYWN0ZXJzXG5cdFx0XHQvW14rYS16QS1aMC05L10vLnRlc3QoaW5wdXQpXG5cdFx0KSB7XG5cdFx0XHRlcnJvcihcblx0XHRcdFx0J0ludmFsaWQgY2hhcmFjdGVyOiB0aGUgc3RyaW5nIHRvIGJlIGRlY29kZWQgaXMgbm90IGNvcnJlY3RseSBlbmNvZGVkLidcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHZhciBiaXRDb3VudGVyID0gMDtcblx0XHR2YXIgYml0U3RvcmFnZTtcblx0XHR2YXIgYnVmZmVyO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0YnVmZmVyID0gVEFCTEUuaW5kZXhPZihpbnB1dC5jaGFyQXQocG9zaXRpb24pKTtcblx0XHRcdGJpdFN0b3JhZ2UgPSBiaXRDb3VudGVyICUgNCA/IGJpdFN0b3JhZ2UgKiA2NCArIGJ1ZmZlciA6IGJ1ZmZlcjtcblx0XHRcdC8vIFVubGVzcyB0aGlzIGlzIHRoZSBmaXJzdCBvZiBhIGdyb3VwIG9mIDQgY2hhcmFjdGVyc+KAplxuXHRcdFx0aWYgKGJpdENvdW50ZXIrKyAlIDQpIHtcblx0XHRcdFx0Ly8g4oCmY29udmVydCB0aGUgZmlyc3QgOCBiaXRzIHRvIGEgc2luZ2xlIEFTQ0lJIGNoYXJhY3Rlci5cblx0XHRcdFx0b3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoXG5cdFx0XHRcdFx0MHhGRiAmIGJpdFN0b3JhZ2UgPj4gKC0yICogYml0Q291bnRlciAmIDYpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0Ly8gYGVuY29kZWAgaXMgZGVzaWduZWQgdG8gYmUgZnVsbHkgY29tcGF0aWJsZSB3aXRoIGBidG9hYCBhcyBkZXNjcmliZWQgaW4gdGhlXG5cdC8vIEhUTUwgU3RhbmRhcmQ6IGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvd2ViYXBwYXBpcy5odG1sI2RvbS13aW5kb3diYXNlNjQtYnRvYVxuXHR2YXIgZW5jb2RlID0gZnVuY3Rpb24oaW5wdXQpIHtcblx0XHRpbnB1dCA9IFN0cmluZyhpbnB1dCk7XG5cdFx0aWYgKC9bXlxcMC1cXHhGRl0vLnRlc3QoaW5wdXQpKSB7XG5cdFx0XHQvLyBOb3RlOiBubyBuZWVkIHRvIHNwZWNpYWwtY2FzZSBhc3RyYWwgc3ltYm9scyBoZXJlLCBhcyBzdXJyb2dhdGVzIGFyZVxuXHRcdFx0Ly8gbWF0Y2hlZCwgYW5kIHRoZSBpbnB1dCBpcyBzdXBwb3NlZCB0byBvbmx5IGNvbnRhaW4gQVNDSUkgYW55d2F5LlxuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdUaGUgc3RyaW5nIHRvIGJlIGVuY29kZWQgY29udGFpbnMgY2hhcmFjdGVycyBvdXRzaWRlIG9mIHRoZSAnICtcblx0XHRcdFx0J0xhdGluMSByYW5nZS4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgcGFkZGluZyA9IGlucHV0Lmxlbmd0aCAlIDM7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHZhciBwb3NpdGlvbiA9IC0xO1xuXHRcdHZhciBhO1xuXHRcdHZhciBiO1xuXHRcdHZhciBjO1xuXHRcdHZhciBkO1xuXHRcdHZhciBidWZmZXI7XG5cdFx0Ly8gTWFrZSBzdXJlIGFueSBwYWRkaW5nIGlzIGhhbmRsZWQgb3V0c2lkZSBvZiB0aGUgbG9vcC5cblx0XHR2YXIgbGVuZ3RoID0gaW5wdXQubGVuZ3RoIC0gcGFkZGluZztcblxuXHRcdHdoaWxlICgrK3Bvc2l0aW9uIDwgbGVuZ3RoKSB7XG5cdFx0XHQvLyBSZWFkIHRocmVlIGJ5dGVzLCBpLmUuIDI0IGJpdHMuXG5cdFx0XHRhID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbikgPDwgMTY7XG5cdFx0XHRiID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YyA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYiArIGM7XG5cdFx0XHQvLyBUdXJuIHRoZSAyNCBiaXRzIGludG8gZm91ciBjaHVua3Mgb2YgNiBiaXRzIGVhY2gsIGFuZCBhcHBlbmQgdGhlXG5cdFx0XHQvLyBtYXRjaGluZyBjaGFyYWN0ZXIgZm9yIGVhY2ggb2YgdGhlbSB0byB0aGUgb3V0cHV0LlxuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxOCAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxMiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiA2ICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyICYgMHgzRilcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKHBhZGRpbmcgPT0gMikge1xuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDg7XG5cdFx0XHRiID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKTtcblx0XHRcdGJ1ZmZlciA9IGEgKyBiO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxMCkgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA+PiA0KSAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPDwgMikgJiAweDNGKSArXG5cdFx0XHRcdCc9J1xuXHRcdFx0KTtcblx0XHR9IGVsc2UgaWYgKHBhZGRpbmcgPT0gMSkge1xuXHRcdFx0YnVmZmVyID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbik7XG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDIpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPDwgNCkgJiAweDNGKSArXG5cdFx0XHRcdCc9PSdcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fTtcblxuXHR2YXIgYmFzZTY0ID0ge1xuXHRcdCdlbmNvZGUnOiBlbmNvZGUsXG5cdFx0J2RlY29kZSc6IGRlY29kZSxcblx0XHQndmVyc2lvbic6ICcwLjEuMCdcblx0fTtcblxuXHQvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnNcblx0Ly8gbGlrZSB0aGUgZm9sbG93aW5nOlxuXHRpZiAoXG5cdFx0dHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcgJiZcblx0XHRkZWZpbmUuYW1kXG5cdCkge1xuXHRcdGRlZmluZShmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBiYXNlNjQ7XG5cdFx0fSk7XG5cdH1cdGVsc2UgaWYgKGZyZWVFeHBvcnRzICYmICFmcmVlRXhwb3J0cy5ub2RlVHlwZSkge1xuXHRcdGlmIChmcmVlTW9kdWxlKSB7IC8vIGluIE5vZGUuanMgb3IgUmluZ29KUyB2MC44LjArXG5cdFx0XHRmcmVlTW9kdWxlLmV4cG9ydHMgPSBiYXNlNjQ7XG5cdFx0fSBlbHNlIHsgLy8gaW4gTmFyd2hhbCBvciBSaW5nb0pTIHYwLjcuMC1cblx0XHRcdGZvciAodmFyIGtleSBpbiBiYXNlNjQpIHtcblx0XHRcdFx0YmFzZTY0Lmhhc093blByb3BlcnR5KGtleSkgJiYgKGZyZWVFeHBvcnRzW2tleV0gPSBiYXNlNjRba2V5XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgeyAvLyBpbiBSaGlubyBvciBhIHdlYiBicm93c2VyXG5cdFx0cm9vdC5iYXNlNjQgPSBiYXNlNjQ7XG5cdH1cblxufSh0aGlzKSk7XG4iLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyIHBlcmNlbnRUd2VudGllcyA9IC8lMjAvZztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ2RlZmF1bHQnOiAnUkZDMzk4NicsXG4gICAgZm9ybWF0dGVyczoge1xuICAgICAgICBSRkMxNzM4OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlLmNhbGwodmFsdWUsIHBlcmNlbnRUd2VudGllcywgJysnKTtcbiAgICAgICAgfSxcbiAgICAgICAgUkZDMzk4NjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFJGQzE3Mzg6ICdSRkMxNzM4JyxcbiAgICBSRkMzOTg2OiAnUkZDMzk4Nidcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xudmFyIHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm9ybWF0czogZm9ybWF0cyxcbiAgICBwYXJzZTogcGFyc2UsXG4gICAgc3RyaW5naWZ5OiBzdHJpbmdpZnlcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgICBhbGxvd0RvdHM6IGZhbHNlLFxuICAgIGFsbG93UHJvdG90eXBlczogZmFsc2UsXG4gICAgYXJyYXlMaW1pdDogMjAsXG4gICAgZGVjb2RlcjogdXRpbHMuZGVjb2RlLFxuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGRlcHRoOiA1LFxuICAgIHBhcmFtZXRlckxpbWl0OiAxMDAwLFxuICAgIHBsYWluT2JqZWN0czogZmFsc2UsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nOiBmYWxzZVxufTtcblxudmFyIHBhcnNlVmFsdWVzID0gZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZ1ZhbHVlcyhzdHIsIG9wdGlvbnMpIHtcbiAgICB2YXIgb2JqID0ge307XG4gICAgdmFyIGNsZWFuU3RyID0gb3B0aW9ucy5pZ25vcmVRdWVyeVByZWZpeCA/IHN0ci5yZXBsYWNlKC9eXFw/LywgJycpIDogc3RyO1xuICAgIHZhciBsaW1pdCA9IG9wdGlvbnMucGFyYW1ldGVyTGltaXQgPT09IEluZmluaXR5ID8gdW5kZWZpbmVkIDogb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdDtcbiAgICB2YXIgcGFydHMgPSBjbGVhblN0ci5zcGxpdChvcHRpb25zLmRlbGltaXRlciwgbGltaXQpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgcGFydCA9IHBhcnRzW2ldO1xuXG4gICAgICAgIHZhciBicmFja2V0RXF1YWxzUG9zID0gcGFydC5pbmRleE9mKCddPScpO1xuICAgICAgICB2YXIgcG9zID0gYnJhY2tldEVxdWFsc1BvcyA9PT0gLTEgPyBwYXJ0LmluZGV4T2YoJz0nKSA6IGJyYWNrZXRFcXVhbHNQb3MgKyAxO1xuXG4gICAgICAgIHZhciBrZXksIHZhbDtcbiAgICAgICAgaWYgKHBvcyA9PT0gLTEpIHtcbiAgICAgICAgICAgIGtleSA9IG9wdGlvbnMuZGVjb2RlcihwYXJ0LCBkZWZhdWx0cy5kZWNvZGVyKTtcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nID8gbnVsbCA6ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAga2V5ID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQuc2xpY2UoMCwgcG9zKSwgZGVmYXVsdHMuZGVjb2Rlcik7XG4gICAgICAgICAgICB2YWwgPSBvcHRpb25zLmRlY29kZXIocGFydC5zbGljZShwb3MgKyAxKSwgZGVmYXVsdHMuZGVjb2Rlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhcy5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgb2JqW2tleV0gPSBbXS5jb25jYXQob2JqW2tleV0pLmNvbmNhdCh2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqW2tleV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxudmFyIHBhcnNlT2JqZWN0ID0gZnVuY3Rpb24gKGNoYWluLCB2YWwsIG9wdGlvbnMpIHtcbiAgICB2YXIgbGVhZiA9IHZhbDtcblxuICAgIGZvciAodmFyIGkgPSBjaGFpbi5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgb2JqO1xuICAgICAgICB2YXIgcm9vdCA9IGNoYWluW2ldO1xuXG4gICAgICAgIGlmIChyb290ID09PSAnW10nKSB7XG4gICAgICAgICAgICBvYmogPSBbXTtcbiAgICAgICAgICAgIG9iaiA9IG9iai5jb25jYXQobGVhZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmogPSBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICAgICAgICAgIHZhciBjbGVhblJvb3QgPSByb290LmNoYXJBdCgwKSA9PT0gJ1snICYmIHJvb3QuY2hhckF0KHJvb3QubGVuZ3RoIC0gMSkgPT09ICddJyA/IHJvb3Quc2xpY2UoMSwgLTEpIDogcm9vdDtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KGNsZWFuUm9vdCwgMTApO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICFpc05hTihpbmRleClcbiAgICAgICAgICAgICAgICAmJiByb290ICE9PSBjbGVhblJvb3RcbiAgICAgICAgICAgICAgICAmJiBTdHJpbmcoaW5kZXgpID09PSBjbGVhblJvb3RcbiAgICAgICAgICAgICAgICAmJiBpbmRleCA+PSAwXG4gICAgICAgICAgICAgICAgJiYgKG9wdGlvbnMucGFyc2VBcnJheXMgJiYgaW5kZXggPD0gb3B0aW9ucy5hcnJheUxpbWl0KVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgb2JqID0gW107XG4gICAgICAgICAgICAgICAgb2JqW2luZGV4XSA9IGxlYWY7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ialtjbGVhblJvb3RdID0gbGVhZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxlYWYgPSBvYmo7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxlYWY7XG59O1xuXG52YXIgcGFyc2VLZXlzID0gZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZ0tleXMoZ2l2ZW5LZXksIHZhbCwgb3B0aW9ucykge1xuICAgIGlmICghZ2l2ZW5LZXkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFRyYW5zZm9ybSBkb3Qgbm90YXRpb24gdG8gYnJhY2tldCBub3RhdGlvblxuICAgIHZhciBrZXkgPSBvcHRpb25zLmFsbG93RG90cyA/IGdpdmVuS2V5LnJlcGxhY2UoL1xcLihbXi5bXSspL2csICdbJDFdJykgOiBnaXZlbktleTtcblxuICAgIC8vIFRoZSByZWdleCBjaHVua3NcblxuICAgIHZhciBicmFja2V0cyA9IC8oXFxbW15bXFxdXSpdKS87XG4gICAgdmFyIGNoaWxkID0gLyhcXFtbXltcXF1dKl0pL2c7XG5cbiAgICAvLyBHZXQgdGhlIHBhcmVudFxuXG4gICAgdmFyIHNlZ21lbnQgPSBicmFja2V0cy5leGVjKGtleSk7XG4gICAgdmFyIHBhcmVudCA9IHNlZ21lbnQgPyBrZXkuc2xpY2UoMCwgc2VnbWVudC5pbmRleCkgOiBrZXk7XG5cbiAgICAvLyBTdGFzaCB0aGUgcGFyZW50IGlmIGl0IGV4aXN0c1xuXG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIC8vIElmIHdlIGFyZW4ndCB1c2luZyBwbGFpbiBvYmplY3RzLCBvcHRpb25hbGx5IHByZWZpeCBrZXlzXG4gICAgICAgIC8vIHRoYXQgd291bGQgb3ZlcndyaXRlIG9iamVjdCBwcm90b3R5cGUgcHJvcGVydGllc1xuICAgICAgICBpZiAoIW9wdGlvbnMucGxhaW5PYmplY3RzICYmIGhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHBhcmVudCkpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBrZXlzLnB1c2gocGFyZW50KTtcbiAgICB9XG5cbiAgICAvLyBMb29wIHRocm91Z2ggY2hpbGRyZW4gYXBwZW5kaW5nIHRvIHRoZSBhcnJheSB1bnRpbCB3ZSBoaXQgZGVwdGhcblxuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoKHNlZ21lbnQgPSBjaGlsZC5leGVjKGtleSkpICE9PSBudWxsICYmIGkgPCBvcHRpb25zLmRlcHRoKSB7XG4gICAgICAgIGkgKz0gMTtcbiAgICAgICAgaWYgKCFvcHRpb25zLnBsYWluT2JqZWN0cyAmJiBoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBzZWdtZW50WzFdLnNsaWNlKDEsIC0xKSkpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAga2V5cy5wdXNoKHNlZ21lbnRbMV0pO1xuICAgIH1cblxuICAgIC8vIElmIHRoZXJlJ3MgYSByZW1haW5kZXIsIGp1c3QgYWRkIHdoYXRldmVyIGlzIGxlZnRcblxuICAgIGlmIChzZWdtZW50KSB7XG4gICAgICAgIGtleXMucHVzaCgnWycgKyBrZXkuc2xpY2Uoc2VnbWVudC5pbmRleCkgKyAnXScpO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJzZU9iamVjdChrZXlzLCB2YWwsIG9wdGlvbnMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyLCBvcHRzKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBvcHRzID8gdXRpbHMuYXNzaWduKHt9LCBvcHRzKSA6IHt9O1xuXG4gICAgaWYgKG9wdGlvbnMuZGVjb2RlciAhPT0gbnVsbCAmJiBvcHRpb25zLmRlY29kZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0aW9ucy5kZWNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0RlY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgb3B0aW9ucy5pZ25vcmVRdWVyeVByZWZpeCA9IG9wdGlvbnMuaWdub3JlUXVlcnlQcmVmaXggPT09IHRydWU7XG4gICAgb3B0aW9ucy5kZWxpbWl0ZXIgPSB0eXBlb2Ygb3B0aW9ucy5kZWxpbWl0ZXIgPT09ICdzdHJpbmcnIHx8IHV0aWxzLmlzUmVnRXhwKG9wdGlvbnMuZGVsaW1pdGVyKSA/IG9wdGlvbnMuZGVsaW1pdGVyIDogZGVmYXVsdHMuZGVsaW1pdGVyO1xuICAgIG9wdGlvbnMuZGVwdGggPSB0eXBlb2Ygb3B0aW9ucy5kZXB0aCA9PT0gJ251bWJlcicgPyBvcHRpb25zLmRlcHRoIDogZGVmYXVsdHMuZGVwdGg7XG4gICAgb3B0aW9ucy5hcnJheUxpbWl0ID0gdHlwZW9mIG9wdGlvbnMuYXJyYXlMaW1pdCA9PT0gJ251bWJlcicgPyBvcHRpb25zLmFycmF5TGltaXQgOiBkZWZhdWx0cy5hcnJheUxpbWl0O1xuICAgIG9wdGlvbnMucGFyc2VBcnJheXMgPSBvcHRpb25zLnBhcnNlQXJyYXlzICE9PSBmYWxzZTtcbiAgICBvcHRpb25zLmRlY29kZXIgPSB0eXBlb2Ygb3B0aW9ucy5kZWNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5kZWNvZGVyIDogZGVmYXVsdHMuZGVjb2RlcjtcbiAgICBvcHRpb25zLmFsbG93RG90cyA9IHR5cGVvZiBvcHRpb25zLmFsbG93RG90cyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5hbGxvd0RvdHMgOiBkZWZhdWx0cy5hbGxvd0RvdHM7XG4gICAgb3B0aW9ucy5wbGFpbk9iamVjdHMgPSB0eXBlb2Ygb3B0aW9ucy5wbGFpbk9iamVjdHMgPT09ICdib29sZWFuJyA/IG9wdGlvbnMucGxhaW5PYmplY3RzIDogZGVmYXVsdHMucGxhaW5PYmplY3RzO1xuICAgIG9wdGlvbnMuYWxsb3dQcm90b3R5cGVzID0gdHlwZW9mIG9wdGlvbnMuYWxsb3dQcm90b3R5cGVzID09PSAnYm9vbGVhbicgPyBvcHRpb25zLmFsbG93UHJvdG90eXBlcyA6IGRlZmF1bHRzLmFsbG93UHJvdG90eXBlcztcbiAgICBvcHRpb25zLnBhcmFtZXRlckxpbWl0ID0gdHlwZW9mIG9wdGlvbnMucGFyYW1ldGVyTGltaXQgPT09ICdudW1iZXInID8gb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA6IGRlZmF1bHRzLnBhcmFtZXRlckxpbWl0O1xuICAgIG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nID0gdHlwZW9mIG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZztcblxuICAgIGlmIChzdHIgPT09ICcnIHx8IHN0ciA9PT0gbnVsbCB8fCB0eXBlb2Ygc3RyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgfVxuXG4gICAgdmFyIHRlbXBPYmogPSB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyA/IHBhcnNlVmFsdWVzKHN0ciwgb3B0aW9ucykgOiBzdHI7XG4gICAgdmFyIG9iaiA9IG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuXG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBrZXlzIGFuZCBzZXR1cCB0aGUgbmV3IG9iamVjdFxuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0ZW1wT2JqKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgIHZhciBuZXdPYmogPSBwYXJzZUtleXMoa2V5LCB0ZW1wT2JqW2tleV0sIG9wdGlvbnMpO1xuICAgICAgICBvYmogPSB1dGlscy5tZXJnZShvYmosIG5ld09iaiwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHV0aWxzLmNvbXBhY3Qob2JqKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBmb3JtYXRzID0gcmVxdWlyZSgnLi9mb3JtYXRzJyk7XG5cbnZhciBhcnJheVByZWZpeEdlbmVyYXRvcnMgPSB7XG4gICAgYnJhY2tldHM6IGZ1bmN0aW9uIGJyYWNrZXRzKHByZWZpeCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gcHJlZml4ICsgJ1tdJztcbiAgICB9LFxuICAgIGluZGljZXM6IGZ1bmN0aW9uIGluZGljZXMocHJlZml4LCBrZXkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbJyArIGtleSArICddJztcbiAgICB9LFxuICAgIHJlcGVhdDogZnVuY3Rpb24gcmVwZWF0KHByZWZpeCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gcHJlZml4O1xuICAgIH1cbn07XG5cbnZhciB0b0lTTyA9IERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nO1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZW5jb2RlOiB0cnVlLFxuICAgIGVuY29kZXI6IHV0aWxzLmVuY29kZSxcbiAgICBlbmNvZGVWYWx1ZXNPbmx5OiBmYWxzZSxcbiAgICBzZXJpYWxpemVEYXRlOiBmdW5jdGlvbiBzZXJpYWxpemVEYXRlKGRhdGUpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHRvSVNPLmNhbGwoZGF0ZSk7XG4gICAgfSxcbiAgICBza2lwTnVsbHM6IGZhbHNlLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBzdHJpbmdpZnkgPSBmdW5jdGlvbiBzdHJpbmdpZnkoIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgb2JqZWN0LFxuICAgIHByZWZpeCxcbiAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICBza2lwTnVsbHMsXG4gICAgZW5jb2RlcixcbiAgICBmaWx0ZXIsXG4gICAgc29ydCxcbiAgICBhbGxvd0RvdHMsXG4gICAgc2VyaWFsaXplRGF0ZSxcbiAgICBmb3JtYXR0ZXIsXG4gICAgZW5jb2RlVmFsdWVzT25seVxuKSB7XG4gICAgdmFyIG9iaiA9IG9iamVjdDtcbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvYmogPSBmaWx0ZXIocHJlZml4LCBvYmopO1xuICAgIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICBvYmogPSBzZXJpYWxpemVEYXRlKG9iaik7XG4gICAgfSBlbHNlIGlmIChvYmogPT09IG51bGwpIHtcbiAgICAgICAgaWYgKHN0cmljdE51bGxIYW5kbGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZXIgJiYgIWVuY29kZVZhbHVlc09ubHkgPyBlbmNvZGVyKHByZWZpeCwgZGVmYXVsdHMuZW5jb2RlcikgOiBwcmVmaXg7XG4gICAgICAgIH1cblxuICAgICAgICBvYmogPSAnJztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8IHV0aWxzLmlzQnVmZmVyKG9iaikpIHtcbiAgICAgICAgaWYgKGVuY29kZXIpIHtcbiAgICAgICAgICAgIHZhciBrZXlWYWx1ZSA9IGVuY29kZVZhbHVlc09ubHkgPyBwcmVmaXggOiBlbmNvZGVyKHByZWZpeCwgZGVmYXVsdHMuZW5jb2Rlcik7XG4gICAgICAgICAgICByZXR1cm4gW2Zvcm1hdHRlcihrZXlWYWx1ZSkgKyAnPScgKyBmb3JtYXR0ZXIoZW5jb2RlcihvYmosIGRlZmF1bHRzLmVuY29kZXIpKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIocHJlZml4KSArICc9JyArIGZvcm1hdHRlcihTdHJpbmcob2JqKSldO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHZhciBvYmpLZXlzO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGZpbHRlcikpIHtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIG9iaktleXMgPSBzb3J0ID8ga2V5cy5zb3J0KHNvcnQpIDoga2V5cztcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICAgICAgaWYgKHNraXBOdWxscyAmJiBvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KHN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4KHByZWZpeCwga2V5KSxcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgICAgICBza2lwTnVsbHMsXG4gICAgICAgICAgICAgICAgZW5jb2RlcixcbiAgICAgICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgICAgICBhbGxvd0RvdHMsXG4gICAgICAgICAgICAgICAgc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgZW5jb2RlVmFsdWVzT25seVxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KHN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgICAgICBwcmVmaXggKyAoYWxsb3dEb3RzID8gJy4nICsga2V5IDogJ1snICsga2V5ICsgJ10nKSxcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgICAgICBza2lwTnVsbHMsXG4gICAgICAgICAgICAgICAgZW5jb2RlcixcbiAgICAgICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgICAgICBhbGxvd0RvdHMsXG4gICAgICAgICAgICAgICAgc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgZW5jb2RlVmFsdWVzT25seVxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBvcHRzKSB7XG4gICAgdmFyIG9iaiA9IG9iamVjdDtcbiAgICB2YXIgb3B0aW9ucyA9IG9wdHMgPyB1dGlscy5hc3NpZ24oe30sIG9wdHMpIDoge307XG5cbiAgICBpZiAob3B0aW9ucy5lbmNvZGVyICE9PSBudWxsICYmIG9wdGlvbnMuZW5jb2RlciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRpb25zLmVuY29kZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRW5jb2RlciBoYXMgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgZGVsaW1pdGVyID0gdHlwZW9mIG9wdGlvbnMuZGVsaW1pdGVyID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmRlbGltaXRlciA6IG9wdGlvbnMuZGVsaW1pdGVyO1xuICAgIHZhciBzdHJpY3ROdWxsSGFuZGxpbmcgPSB0eXBlb2Ygb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nIDogZGVmYXVsdHMuc3RyaWN0TnVsbEhhbmRsaW5nO1xuICAgIHZhciBza2lwTnVsbHMgPSB0eXBlb2Ygb3B0aW9ucy5za2lwTnVsbHMgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuc2tpcE51bGxzIDogZGVmYXVsdHMuc2tpcE51bGxzO1xuICAgIHZhciBlbmNvZGUgPSB0eXBlb2Ygb3B0aW9ucy5lbmNvZGUgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuZW5jb2RlIDogZGVmYXVsdHMuZW5jb2RlO1xuICAgIHZhciBlbmNvZGVyID0gdHlwZW9mIG9wdGlvbnMuZW5jb2RlciA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuZW5jb2RlciA6IGRlZmF1bHRzLmVuY29kZXI7XG4gICAgdmFyIHNvcnQgPSB0eXBlb2Ygb3B0aW9ucy5zb3J0ID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5zb3J0IDogbnVsbDtcbiAgICB2YXIgYWxsb3dEb3RzID0gdHlwZW9mIG9wdGlvbnMuYWxsb3dEb3RzID09PSAndW5kZWZpbmVkJyA/IGZhbHNlIDogb3B0aW9ucy5hbGxvd0RvdHM7XG4gICAgdmFyIHNlcmlhbGl6ZURhdGUgPSB0eXBlb2Ygb3B0aW9ucy5zZXJpYWxpemVEYXRlID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5zZXJpYWxpemVEYXRlIDogZGVmYXVsdHMuc2VyaWFsaXplRGF0ZTtcbiAgICB2YXIgZW5jb2RlVmFsdWVzT25seSA9IHR5cGVvZiBvcHRpb25zLmVuY29kZVZhbHVlc09ubHkgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuZW5jb2RlVmFsdWVzT25seSA6IGRlZmF1bHRzLmVuY29kZVZhbHVlc09ubHk7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmZvcm1hdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgb3B0aW9ucy5mb3JtYXQgPSBmb3JtYXRzWydkZWZhdWx0J107XG4gICAgfSBlbHNlIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGZvcm1hdHMuZm9ybWF0dGVycywgb3B0aW9ucy5mb3JtYXQpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZm9ybWF0IG9wdGlvbiBwcm92aWRlZC4nKTtcbiAgICB9XG4gICAgdmFyIGZvcm1hdHRlciA9IGZvcm1hdHMuZm9ybWF0dGVyc1tvcHRpb25zLmZvcm1hdF07XG4gICAgdmFyIG9iaktleXM7XG4gICAgdmFyIGZpbHRlcjtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5maWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XG4gICAgICAgIG9iaiA9IGZpbHRlcignJywgb2JqKTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucy5maWx0ZXIpKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmpLZXlzID0gZmlsdGVyO1xuICAgIH1cblxuICAgIHZhciBrZXlzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgb2JqID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB2YXIgYXJyYXlGb3JtYXQ7XG4gICAgaWYgKG9wdGlvbnMuYXJyYXlGb3JtYXQgaW4gYXJyYXlQcmVmaXhHZW5lcmF0b3JzKSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gb3B0aW9ucy5hcnJheUZvcm1hdDtcbiAgICB9IGVsc2UgaWYgKCdpbmRpY2VzJyBpbiBvcHRpb25zKSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gb3B0aW9ucy5pbmRpY2VzID8gJ2luZGljZXMnIDogJ3JlcGVhdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSAnaW5kaWNlcyc7XG4gICAgfVxuXG4gICAgdmFyIGdlbmVyYXRlQXJyYXlQcmVmaXggPSBhcnJheVByZWZpeEdlbmVyYXRvcnNbYXJyYXlGb3JtYXRdO1xuXG4gICAgaWYgKCFvYmpLZXlzKSB7XG4gICAgICAgIG9iaktleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIH1cblxuICAgIGlmIChzb3J0KSB7XG4gICAgICAgIG9iaktleXMuc29ydChzb3J0KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICAgICAgaWYgKHNraXBOdWxscyAmJiBvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQoc3RyaW5naWZ5KFxuICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgZW5jb2RlID8gZW5jb2RlciA6IG51bGwsXG4gICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgIGZvcm1hdHRlcixcbiAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHlcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgdmFyIGpvaW5lZCA9IGtleXMuam9pbihkZWxpbWl0ZXIpO1xuICAgIHZhciBwcmVmaXggPSBvcHRpb25zLmFkZFF1ZXJ5UHJlZml4ID09PSB0cnVlID8gJz8nIDogJyc7XG5cbiAgICByZXR1cm4gam9pbmVkLmxlbmd0aCA+IDAgPyBwcmVmaXggKyBqb2luZWQgOiAnJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgaGV4VGFibGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgICAgICAgYXJyYXkucHVzaCgnJScgKyAoKGkgPCAxNiA/ICcwJyA6ICcnKSArIGkudG9TdHJpbmcoMTYpKS50b1VwcGVyQ2FzZSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXk7XG59KCkpO1xuXG52YXIgY29tcGFjdFF1ZXVlID0gZnVuY3Rpb24gY29tcGFjdFF1ZXVlKHF1ZXVlKSB7XG4gICAgdmFyIG9iajtcblxuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiAgICAgICAgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICB2YXIgY29tcGFjdGVkID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgb2JqLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbal0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhY3RlZC5wdXNoKG9ialtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVtLm9ialtpdGVtLnByb3BdID0gY29tcGFjdGVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cbmV4cG9ydHMuYXJyYXlUb09iamVjdCA9IGZ1bmN0aW9uIGFycmF5VG9PYmplY3Qoc291cmNlLCBvcHRpb25zKSB7XG4gICAgdmFyIG9iaiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBvYmpbaV0gPSBzb3VyY2VbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICAgICAgdGFyZ2V0LnB1c2goc291cmNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGxhaW5PYmplY3RzIHx8IG9wdGlvbnMuYWxsb3dQcm90b3R5cGVzIHx8ICFoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3NvdXJjZV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFt0YXJnZXQsIHNvdXJjZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gW3RhcmdldF0uY29uY2F0KHNvdXJjZSk7XG4gICAgfVxuXG4gICAgdmFyIG1lcmdlVGFyZ2V0ID0gdGFyZ2V0O1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgIUFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBtZXJnZVRhcmdldCA9IGV4cG9ydHMuYXJyYXlUb09iamVjdCh0YXJnZXQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIHNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgICAgICAgICBpZiAoaGFzLmNhbGwodGFyZ2V0LCBpKSkge1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRbaV0gJiYgdHlwZW9mIHRhcmdldFtpXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gZXhwb3J0cy5tZXJnZSh0YXJnZXRbaV0sIGl0ZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICAgICAgICBpZiAoaGFzLmNhbGwoYWNjLCBrZXkpKSB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IGV4cG9ydHMubWVyZ2UoYWNjW2tleV0sIHZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBtZXJnZVRhcmdldCk7XG59O1xuXG5leHBvcnRzLmFzc2lnbiA9IGZ1bmN0aW9uIGFzc2lnblNpbmdsZVNvdXJjZSh0YXJnZXQsIHNvdXJjZSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgYWNjW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB0YXJnZXQpO1xufTtcblxuZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHIucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG59O1xuXG5leHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShzdHIpIHtcbiAgICAvLyBUaGlzIGNvZGUgd2FzIG9yaWdpbmFsbHkgd3JpdHRlbiBieSBCcmlhbiBXaGl0ZSAobXNjZGV4KSBmb3IgdGhlIGlvLmpzIGNvcmUgcXVlcnlzdHJpbmcgbGlicmFyeS5cbiAgICAvLyBJdCBoYXMgYmVlbiBhZGFwdGVkIGhlcmUgZm9yIHN0cmljdGVyIGFkaGVyZW5jZSB0byBSRkMgMzk4NlxuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgdmFyIHN0cmluZyA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gc3RyIDogU3RyaW5nKHN0cik7XG5cbiAgICB2YXIgb3V0ID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGMgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjID09PSAweDJEIC8vIC1cbiAgICAgICAgICAgIHx8IGMgPT09IDB4MkUgLy8gLlxuICAgICAgICAgICAgfHwgYyA9PT0gMHg1RiAvLyBfXG4gICAgICAgICAgICB8fCBjID09PSAweDdFIC8vIH5cbiAgICAgICAgICAgIHx8IChjID49IDB4MzAgJiYgYyA8PSAweDM5KSAvLyAwLTlcbiAgICAgICAgICAgIHx8IChjID49IDB4NDEgJiYgYyA8PSAweDVBKSAvLyBhLXpcbiAgICAgICAgICAgIHx8IChjID49IDB4NjEgJiYgYyA8PSAweDdBKSAvLyBBLVpcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBvdXQgKz0gc3RyaW5nLmNoYXJBdChpKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweDgwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyBoZXhUYWJsZVtjXTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweDgwMCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgKGhleFRhYmxlWzB4QzAgfCAoYyA+PiA2KV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4RDgwMCB8fCBjID49IDB4RTAwMCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgKGhleFRhYmxlWzB4RTAgfCAoYyA+PiAxMildICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiA2KSAmIDB4M0YpXSArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGkgKz0gMTtcbiAgICAgICAgYyA9IDB4MTAwMDAgKyAoKChjICYgMHgzRkYpIDw8IDEwKSB8IChzdHJpbmcuY2hhckNvZGVBdChpKSAmIDB4M0ZGKSk7XG4gICAgICAgIG91dCArPSBoZXhUYWJsZVsweEYwIHwgKGMgPj4gMTgpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDEyKSAmIDB4M0YpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuZXhwb3J0cy5jb21wYWN0ID0gZnVuY3Rpb24gY29tcGFjdCh2YWx1ZSkge1xuICAgIHZhciBxdWV1ZSA9IFt7IG9iajogeyBvOiB2YWx1ZSB9LCBwcm9wOiAnbycgfV07XG4gICAgdmFyIHJlZnMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBxdWV1ZVtpXTtcbiAgICAgICAgdmFyIG9iaiA9IGl0ZW0ub2JqW2l0ZW0ucHJvcF07XG5cbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGtleXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2pdO1xuICAgICAgICAgICAgdmFyIHZhbCA9IG9ialtrZXldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbCAmJiByZWZzLmluZGV4T2YodmFsKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKHsgb2JqOiBvYmosIHByb3A6IGtleSB9KTtcbiAgICAgICAgICAgICAgICByZWZzLnB1c2godmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb21wYWN0UXVldWUocXVldWUpO1xufTtcblxuZXhwb3J0cy5pc1JlZ0V4cCA9IGZ1bmN0aW9uIGlzUmVnRXhwKG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59O1xuXG5leHBvcnRzLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIob2JqKSB7XG4gICAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhKG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iaikpO1xufTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufTtcclxuIiwiY29uc3QgYXhpb3MgPSByZXF1aXJlKFwiYXhpb3NcIik7XG5jb25zdCBiYXNlNjQgPSByZXF1aXJlKFwiYmFzZS02NFwiKTtcbmNvbnN0IHFzID0gcmVxdWlyZShcInFzXCIpO1xuY29uc3QgQVYgPSByZXF1aXJlKFwiYXJndW1lbnQtdmFsaWRhdG9yXCIpO1xuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgcGF5bG9hZCBmcm9tIGEgSldUXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHRva2VuIFRoZSBKV1QgdG8gcmV0cmlldmUgdGhlIHBheWxvYWQgZnJvbVxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICBUaGUgSldUIHBheWxvYWRcbiAqL1xuZnVuY3Rpb24gZ2V0UGF5bG9hZCh0b2tlbikge1xuICBjb25zdCBwYXlsb2FkQmFzZTY0ID0gdG9rZW5cbiAgICAuc3BsaXQoXCIuXCIpWzFdXG4gICAgLnJlcGxhY2UoXCItXCIsIFwiK1wiKVxuICAgIC5yZXBsYWNlKFwiX1wiLCBcIi9cIik7XG4gIGNvbnN0IHBheWxvYWREZWNvZGVkID0gYmFzZTY0LmRlY29kZShwYXlsb2FkQmFzZTY0KTtcbiAgY29uc3QgcGF5bG9hZE9iamVjdCA9IEpTT04ucGFyc2UocGF5bG9hZERlY29kZWQpO1xuXG4gIGlmIChBVi5pc051bWJlcihwYXlsb2FkT2JqZWN0LmV4cCkpIHtcbiAgICBwYXlsb2FkT2JqZWN0LmV4cCA9IG5ldyBEYXRlKHBheWxvYWRPYmplY3QuZXhwICogMTAwMCk7XG4gIH1cblxuICByZXR1cm4gcGF5bG9hZE9iamVjdDtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgU0RLIGluc3RhbmNlXG4gKiBAcGFyYW0gICAgICAge29iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0gICAgICAge3N0cmluZ30gW29wdGlvbnMudXJsXSAgIFRoZSBBUEkgdXJsIHRvIGNvbm5lY3QgdG9cbiAqIEBwYXJhbSAgICAgICB7c3RyaW5nfSBbb3B0aW9ucy5lbnZdICAgVGhlIEFQSSBlbnZpcm9ubWVudCB0byBjb25uZWN0IHRvXG4gKiBAcGFyYW0gICAgICAge3N0cmluZ30gW29wdGlvbnMudG9rZW5dIFRoZSBhY2Nlc3MgdG9rZW4gdG8gdXNlIGZvciByZXF1ZXN0c1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFNESyhvcHRpb25zID0ge30pIHtcbiAgcmV0dXJuIHtcbiAgICB1cmw6IG9wdGlvbnMudXJsLFxuICAgIHRva2VuOiBvcHRpb25zLnRva2VuLFxuICAgIGVudjogb3B0aW9ucy5lbnYgfHwgXCJfXCIsXG4gICAgYXhpb3M6IGF4aW9zLmNyZWF0ZSh7XG4gICAgICBwYXJhbXNTZXJpYWxpemVyOiBxcy5zdHJpbmdpZnksXG4gICAgICB0aW1lb3V0OiAxMCAqIDYwICogMTAwMCAvLyAxMCBtaW5cbiAgICB9KSxcbiAgICByZWZyZXNoSW50ZXJ2YWw6IG51bGwsXG4gICAgb25BdXRvUmVmcmVzaEVycm9yOiBudWxsLFxuICAgIG9uQXV0b1JlZnJlc2hTdWNjZXNzOiBudWxsLFxuXG4gICAgZ2V0IHBheWxvYWQoKSB7XG4gICAgICBpZiAoIUFWLmlzU3RyaW5nKHRoaXMudG9rZW4pKSByZXR1cm4gbnVsbDtcbiAgICAgIHJldHVybiBnZXRQYXlsb2FkKHRoaXMudG9rZW4pO1xuICAgIH0sXG5cbiAgICBnZXQgbG9nZ2VkSW4oKSB7XG4gICAgICBpZiAoXG4gICAgICAgIEFWLmlzU3RyaW5nKHRoaXMudG9rZW4pICYmXG4gICAgICAgIEFWLmlzU3RyaW5nKHRoaXMudXJsKSAmJlxuICAgICAgICBBVi5pc1N0cmluZyh0aGlzLmVudikgJiZcbiAgICAgICAgQVYuaXNPYmplY3QodGhpcy5wYXlsb2FkKVxuICAgICAgKSB7XG4gICAgICAgIGlmICh0aGlzLnBheWxvYWQuZXhwLmdldFRpbWUoKSA+IERhdGUubm93KCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICAvLyBSRVFVRVNUIE1FVEhPRFNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBEaXJlY3R1cyBBUEkgcmVxdWVzdCBwcm9taXNlXG4gICAgICogQHByb21pc2UgUmVxdWVzdFByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7b2JqZWN0fSBEaXJlY3R1cyBkYXRhXG4gICAgICogQHJlamVjdCB7RXJyb3J9IE5ldHdvcmsgZXJyb3IgKGlmIG5vIGNvbm5lY3Rpb24gdG8gQVBJKVxuICAgICAqIEByZWplY3Qge0Vycm9yfSBEaXJlY3R1cyBlcnJvciAoZWcgbm90IGxvZ2dlZCBpbiBvciA0MDQpXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFuIEFQSSByZXF1ZXN0IHRvIHRoZSBEaXJlY3R1cyBBUElcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IG1ldGhvZCAgICAgIFRoZSBIVFRQIG1ldGhvZCB0byB1c2VcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGVuZHBvaW50ICAgIFRoZSBBUEkgZW5kcG9pbnQgdG8gcmVxdWVzdFxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gVGhlIEhUVFAgcXVlcnkgcGFyYW1ldGVycyAoR0VUIG9ubHkpXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbZGF0YT17fV0gICBUaGUgSFRUUCByZXF1ZXN0IGJvZHkgKG5vbi1HRVQgb25seSlcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBub0VudiAgICAgIERvbid0IHVzZSB0aGUgZW52IGluIHRoZSBwYXRoXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgcmVxdWVzdChcbiAgICAgIG1ldGhvZCxcbiAgICAgIGVuZHBvaW50LFxuICAgICAgcGFyYW1zID0ge30sXG4gICAgICBkYXRhID0ge30sXG4gICAgICBub0VudiA9IGZhbHNlLFxuICAgICAgaGVhZGVycyA9IHt9XG4gICAgKSB7XG4gICAgICBBVi5zdHJpbmcobWV0aG9kLCBcIm1ldGhvZFwiKTtcbiAgICAgIEFWLnN0cmluZyhlbmRwb2ludCwgXCJlbmRwb2ludFwiKTtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIEFycmF5LmlzQXJyYXkoZGF0YSlcbiAgICAgICAgPyBBVi5hcnJheU9yRW1wdHkoZGF0YSwgXCJkYXRhXCIpXG4gICAgICAgIDogQVYub2JqZWN0T3JFbXB0eShkYXRhLCBcImRhdGFcIik7XG5cbiAgICAgIEFWLnN0cmluZyh0aGlzLnVybCwgXCJ0aGlzLnVybFwiKTtcblxuICAgICAgbGV0IGJhc2VVUkwgPSBgJHt0aGlzLnVybH0vYDtcblxuICAgICAgaWYgKG5vRW52ID09PSBmYWxzZSkge1xuICAgICAgICBiYXNlVVJMICs9IGAke3RoaXMuZW52fS9gO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgICAgdXJsOiBlbmRwb2ludCxcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBiYXNlVVJMLFxuICAgICAgICBwYXJhbXMsXG4gICAgICAgIGRhdGFcbiAgICAgIH07XG5cbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy50b2tlbiAmJlxuICAgICAgICB0eXBlb2YgdGhpcy50b2tlbiA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICB0aGlzLnRva2VuLmxlbmd0aCA+IDBcbiAgICAgICkge1xuICAgICAgICByZXF1ZXN0T3B0aW9ucy5oZWFkZXJzID0gaGVhZGVycztcbiAgICAgICAgcmVxdWVzdE9wdGlvbnMuaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3RoaXMudG9rZW59YDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuYXhpb3NcbiAgICAgICAgLnJlcXVlc3QocmVxdWVzdE9wdGlvbnMpXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgaWYgKCFkYXRhIHx8IGRhdGEubGVuZ3RoID09PSAwKSByZXR1cm4gZGF0YTtcblxuICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICB0aHJvdyB7XG4gICAgICAgICAgICAgICAganNvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgICAgICBkYXRhXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvci5yZXNwb25zZS5kYXRhLmVycm9yO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3IuanNvbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhyb3cge1xuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICAgIGNvZGU6IC0yLFxuICAgICAgICAgICAgICBtZXNzYWdlOiBcIkFQSSByZXR1cm5lZCBpbnZhbGlkIEpTT05cIixcbiAgICAgICAgICAgICAgZXJyb3I6IGVycm9yLmVycm9yLFxuICAgICAgICAgICAgICBkYXRhOiBlcnJvci5kYXRhXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyB7XG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgY29kZTogLTEsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IFwiTmV0d29yayBFcnJvclwiLFxuICAgICAgICAgICAgICBlcnJvclxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHRVQgY29udmVuaWVuY2UgbWV0aG9kLiBDYWxscyB0aGUgcmVxdWVzdCBtZXRob2QgZm9yIHlvdVxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gZW5kcG9pbnQgICAgVGhlIGVuZHBvaW50IHRvIGdldFxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gVGhlIEhUVFAgcXVlcnkgcGFyYW1ldGVycyAoR0VUIG9ubHkpXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0KGVuZHBvaW50LCBwYXJhbXMgPSB7fSkge1xuICAgICAgQVYuc3RyaW5nKGVuZHBvaW50LCBcImVuZHBvaW50XCIpO1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuXG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZ2V0XCIsIGVuZHBvaW50LCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQT1NUIGNvbnZlbmllbmNlIG1ldGhvZC4gQ2FsbHMgdGhlIHJlcXVlc3QgbWV0aG9kIGZvciB5b3VcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGVuZHBvaW50ICBUaGUgZW5kcG9pbnQgdG8gZ2V0XG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbYm9keT17fV0gVGhlIEhUVFAgcmVxdWVzdCBib2R5XG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgcG9zdChlbmRwb2ludCwgYm9keSA9IHt9LCBwYXJhbXMgPSB7fSkge1xuICAgICAgQVYuc3RyaW5nKGVuZHBvaW50LCBcImVuZHBvaW50XCIpO1xuICAgICAgQXJyYXkuaXNBcnJheShib2R5KVxuICAgICAgICA/IEFWLmFycmF5T3JFbXB0eShib2R5LCBcImJvZHlcIilcbiAgICAgICAgOiBBVi5vYmplY3RPckVtcHR5KGJvZHksIFwiYm9keVwiKTtcblxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcInBvc3RcIiwgZW5kcG9pbnQsIHBhcmFtcywgYm9keSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBBVENIIGNvbnZlbmllbmNlIG1ldGhvZC4gQ2FsbHMgdGhlIHJlcXVlc3QgbWV0aG9kIGZvciB5b3VcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGVuZHBvaW50ICBUaGUgZW5kcG9pbnQgdG8gZ2V0XG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbYm9keT17fV0gVGhlIEhUVFAgcmVxdWVzdCBib2R5XG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgcGF0Y2goZW5kcG9pbnQsIGJvZHkgPSB7fSwgcGFyYW1zID0ge30pIHtcbiAgICAgIEFWLnN0cmluZyhlbmRwb2ludCwgXCJlbmRwb2ludFwiKTtcbiAgICAgIEFycmF5LmlzQXJyYXkoYm9keSlcbiAgICAgICAgPyBBVi5hcnJheU9yRW1wdHkoYm9keSwgXCJib2R5XCIpXG4gICAgICAgIDogQVYub2JqZWN0T3JFbXB0eShib2R5LCBcImJvZHlcIik7XG5cbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXCJwYXRjaFwiLCBlbmRwb2ludCwgcGFyYW1zLCBib2R5KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUEFUQ0ggY29udmVuaWVuY2UgbWV0aG9kLiBDYWxscyB0aGUgcmVxdWVzdCBtZXRob2QgZm9yIHlvdVxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gZW5kcG9pbnQgIFRoZSBlbmRwb2ludCB0byBnZXRcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtib2R5PXt9XSBUaGUgSFRUUCByZXF1ZXN0IGJvZHlcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBwdXQoZW5kcG9pbnQsIGJvZHkgPSB7fSwgcGFyYW1zID0ge30pIHtcbiAgICAgIEFWLnN0cmluZyhlbmRwb2ludCwgXCJlbmRwb2ludFwiKTtcbiAgICAgIEFycmF5LmlzQXJyYXkoYm9keSlcbiAgICAgICAgPyBBVi5hcnJheU9yRW1wdHkoYm9keSwgXCJib2R5XCIpXG4gICAgICAgIDogQVYub2JqZWN0T3JFbXB0eShib2R5LCBcImJvZHlcIik7XG5cbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXCJwdXRcIiwgZW5kcG9pbnQsIHBhcmFtcywgYm9keSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBBVENIIGNvbnZlbmllbmNlIG1ldGhvZC4gQ2FsbHMgdGhlIHJlcXVlc3QgbWV0aG9kIGZvciB5b3VcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGVuZHBvaW50ICBUaGUgZW5kcG9pbnQgdG8gZ2V0XG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZGVsZXRlKGVuZHBvaW50KSB7XG4gICAgICBBVi5zdHJpbmcoZW5kcG9pbnQsIFwiZW5kcG9pbnRcIik7XG5cbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXCJkZWxldGVcIiwgZW5kcG9pbnQpO1xuICAgIH0sXG5cbiAgICAvLyBBVVRIRU5USUNBVElPTlxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIExvZ2dpbmcgaW4gcHJvbWlzZVxuICAgICAqIEBwcm9taXNlIExvZ2luUHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtPYmplY3R9IE9iamVjdCBjb250YWluaW5nIFVSTCwgRU5WLCBhbmQgVE9LRU5cbiAgICAgKiBAcmVqZWN0IHtFcnJvcn0gICBOZXR3b3JrIGVycm9yIChpZiBubyBjb25uZWN0aW9uIHRvIEFQSSlcbiAgICAgKiBAcmVqZWN0IHtFcnJvcn0gICBEaXJlY3R1cyBlcnJvciAoZWcgbm90IGxvZ2dlZCBpbiBvciA0MDQpXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBMb2dpbiB0byB0aGUgQVBJLlxuICAgICAqXG4gICAgICogR2V0cyBhIG5ldyB0b2tlbiBmcm9tIHRoZSBBUEkgYW5kIHN0b3JlcyBpdCBpbiB0aGlzLnRva2VuXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBjcmVkZW50aWFsc1xuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY3JlZGVudGlhbHMuZW1haWwgICAgVGhlIHVzZXIncyBlbWFpbCBhZGRyZXNzXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjcmVkZW50aWFscy5wYXNzd29yZCBUaGUgdXNlcidzIHBhc3N3b3JkXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBbY3JlZGVudGlhbHMudXJsXSAgICBUaGUgQVBJIHRvIGxvZ2luIHRvIChvdmVyd3JpdGVzIHRoaXMudXJsKVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gW2NyZWRlbnRpYWxzLmVudl0gICAgVGhlIEFQSSBlbnYgdG8gbG9naW4gdG8gKG92ZXJ3cml0ZXMgdGhpcy5lbnYpXG4gICAgICogQHJldHVybiB7TG9naW5Qcm9taXNlfVxuICAgICAqL1xuICAgIGxvZ2luKGNyZWRlbnRpYWxzKSB7XG4gICAgICBBVi5vYmplY3QoY3JlZGVudGlhbHMsIFwiY3JlZGVudGlhbHNcIik7XG4gICAgICBBVi5rZXlzV2l0aFN0cmluZyhjcmVkZW50aWFscywgW1wiZW1haWxcIiwgXCJwYXNzd29yZFwiXSwgXCJjcmVkZW50aWFsc1wiKTtcblxuICAgICAgdGhpcy50b2tlbiA9IG51bGw7XG5cbiAgICAgIGlmIChBVi5oYXNLZXlzV2l0aFN0cmluZyhjcmVkZW50aWFscywgW1widXJsXCJdKSkge1xuICAgICAgICB0aGlzLnVybCA9IGNyZWRlbnRpYWxzLnVybDtcbiAgICAgIH1cblxuICAgICAgaWYgKEFWLmhhc0tleXNXaXRoU3RyaW5nKGNyZWRlbnRpYWxzLCBbXCJlbnZcIl0pKSB7XG4gICAgICAgIHRoaXMuZW52ID0gY3JlZGVudGlhbHMuZW52O1xuICAgICAgfVxuXG4gICAgICBpZiAoY3JlZGVudGlhbHMucGVyc2lzdCkge1xuICAgICAgICB0aGlzLnN0YXJ0SW50ZXJ2YWwoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdGhpcy5wb3N0KFwiL2F1dGgvYXV0aGVudGljYXRlXCIsIHtcbiAgICAgICAgICBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwsXG4gICAgICAgICAgcGFzc3dvcmQ6IGNyZWRlbnRpYWxzLnBhc3N3b3JkXG4gICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhLnRva2VuKVxuICAgICAgICAgIC50aGVuKHRva2VuID0+IHtcbiAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICAgICAgICBlbnY6IHRoaXMuZW52LFxuICAgICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBMb2dzIHRoZSB1c2VyIG91dCBieSBcImZvcmdldHRpbmdcIiB0aGUgVVJMLCBFTlYsIGFuZCB0b2tlbiwgYW5kIGNsZWFyaW5nIHRoZSByZWZyZXNoIGludGVydmFsXG4gICAgICovXG4gICAgbG9nb3V0KCkge1xuICAgICAgdGhpcy50b2tlbiA9IG51bGw7XG4gICAgICB0aGlzLmVudiA9IFwiX1wiO1xuICAgICAgdGhpcy51cmwgPSBudWxsO1xuXG4gICAgICBpZiAodGhpcy5yZWZyZXNoSW50ZXJ2YWwpIHtcbiAgICAgICAgdGhpcy5zdG9wSW50ZXJ2YWwoKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RhcnRzIGFuIGludGVydmFsIG9mIDEwIHNlY29uZHMgdGhhdCB3aWxsIGNoZWNrIGlmIHRoZSB0b2tlbiBuZWVkcyByZWZyZXNoaW5nXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBmaXJlSW1tZWRpYXRlbHkgRmlyZSB0aGUgcmVmcmVzaElmTmVlZGVkIG1ldGhvZCBkaXJlY3RseVxuICAgICAqL1xuICAgIHN0YXJ0SW50ZXJ2YWwoZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgICBpZiAoZmlyZUltbWVkaWF0ZWx5KSB0aGlzLnJlZnJlc2hJZk5lZWRlZCgpO1xuICAgICAgdGhpcy5yZWZyZXNoSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChcbiAgICAgICAgdGhpcy5yZWZyZXNoSWZOZWVkZWQuYmluZCh0aGlzKSxcbiAgICAgICAgMTAwMDBcbiAgICAgICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENsZWFycyBhbmQgbnVsbGlmaWVzIHRoZSB0b2tlbiByZWZyZXNoaW5nIGludGVydmFsXG4gICAgICovXG4gICAgc3RvcEludGVydmFsKCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnJlZnJlc2hJbnRlcnZhbCk7XG4gICAgICB0aGlzLnJlZnJlc2hJbnRlcnZhbCA9IG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlZnJlc2ggdGhlIHRva2VuIGlmIGl0IGlzIGFib3V0IHRvIGV4cGlyZSAod2l0aGluIDMwIHNlY29uZHMgb2YgZXhwaXJ5IGRhdGUpXG4gICAgICpcbiAgICAgKiBDYWxscyBvbkF1dG9SZWZyZXNoU3VjY2VzcyB3aXRoIHRoZSBuZXcgdG9rZW4gaWYgdGhlIHJlZnJlc2hpbmcgaXMgc3VjY2Vzc2Z1bFxuICAgICAqIENhbGxzIG9uQXV0b1JlZnJlc2hFcnJvciBpZiByZWZyZXNoaW5nIHRoZSB0b2tlbiBmYWlscyBmb3Igc29tZSByZWFzb25cbiAgICAgKi9cbiAgICByZWZyZXNoSWZOZWVkZWQoKSB7XG4gICAgICBpZiAoIUFWLmhhc1N0cmluZ0tleXModGhpcywgW1widG9rZW5cIiwgXCJ1cmxcIiwgXCJlbnZcIl0pKSByZXR1cm47XG4gICAgICBpZiAoIXRoaXMucGF5bG9hZCB8fCAhdGhpcy5wYXlsb2FkLmV4cCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCB0aW1lRGlmZiA9IHRoaXMucGF5bG9hZC5leHAuZ2V0VGltZSgpIC0gRGF0ZS5ub3coKTtcblxuICAgICAgaWYgKHRpbWVEaWZmIDw9IDApIHtcbiAgICAgICAgaWYgKEFWLmlzRnVuY3Rpb24odGhpcy5vbkF1dG9SZWZyZXNoRXJyb3IpKSB7XG4gICAgICAgICAgdGhpcy5vbkF1dG9SZWZyZXNoRXJyb3Ioe1xuICAgICAgICAgICAgbWVzc2FnZTogXCJhdXRoX2V4cGlyZWRfdG9rZW5cIixcbiAgICAgICAgICAgIGNvZGU6IDEwMlxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRpbWVEaWZmIDwgMzAwMDApIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoKHRoaXMudG9rZW4pXG4gICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMudG9rZW4gPSByZXMuZGF0YS50b2tlbjtcbiAgICAgICAgICAgIGlmIChBVi5pc0Z1bmN0aW9uKHRoaXMub25BdXRvUmVmcmVzaFN1Y2Nlc3MpKSB7XG4gICAgICAgICAgICAgIHRoaXMub25BdXRvUmVmcmVzaFN1Y2Nlc3Moe1xuICAgICAgICAgICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgICAgICAgICAgZW52OiB0aGlzLmVudixcbiAgICAgICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBpZiAoQVYuaXNGdW5jdGlvbih0aGlzLm9uQXV0b1JlZnJlc2hFcnJvcikpIHtcbiAgICAgICAgICAgICAgdGhpcy5vbkF1dG9SZWZyZXNoRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVc2UgdGhlIHBhc3NlZCB0b2tlbiB0byByZXF1ZXN0IGEgbmV3IG9uZVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdG9rZW4gQWN0aXZlICYgVmFsaWQgdG9rZW5cbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICByZWZyZXNoKHRva2VuKSB7XG4gICAgICBBVi5zdHJpbmcodG9rZW4sIFwidG9rZW5cIik7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KFwiL2F1dGgvcmVmcmVzaFwiLCB7IHRva2VuIH0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IHRvIHJlc2V0IHRoZSBwYXNzd29yZCBvZiB0aGUgdXNlciB3aXRoIHRoZSBnaXZlbiBlbWFpbCBhZGRyZXNzXG4gICAgICpcbiAgICAgKiBUaGUgQVBJIHdpbGwgc2VuZCBhbiBlbWFpbCB0byB0aGUgZ2l2ZW4gZW1haWwgYWRkcmVzcyB3aXRoIGEgbGluayB0byBnZW5lcmF0ZSBhIG5ld1xuICAgICAqIHRlbXBvcmFyeSBwYXNzd29yZC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZW1haWwgVGhlIHVzZXIncyBlbWFpbFxuICAgICAqL1xuICAgIHJlcXVlc3RQYXNzd29yZFJlc2V0KGVtYWlsKSB7XG4gICAgICBBVi5zdHJpbmcoZW1haWwsIFwiZW1haWxcIik7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KFwiL2F1dGgvcmVzZXQtcmVxdWVzdFwiLCB7XG4gICAgICAgIGVtYWlsLFxuICAgICAgICBpbnN0YW5jZTogdGhpcy51cmxcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvLyBBQ1RJVklUWVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEdldCBhY3Rpdml0eVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldEFjdGl2aXR5KHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoXCIvYWN0aXZpdHlcIiwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLy8gQk9PS01BUktTXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBib29rbWFya3Mgb2YgdGhlIGN1cnJlbnQgdXNlclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldE15Qm9va21hcmtzKHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5zdHJpbmcodGhpcy50b2tlbiwgXCJ0aGlzLnRva2VuXCIpO1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMpO1xuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgdGhpcy5nZXQoXCIvY29sbGVjdGlvbl9wcmVzZXRzXCIsIHtcbiAgICAgICAgICBcImZpbHRlclt0aXRsZV1bbm51bGxdXCI6IDEsXG4gICAgICAgICAgXCJmaWx0ZXJbdXNlcl1bZXFdXCI6IHRoaXMucGF5bG9hZC5pZFxuICAgICAgICB9KSxcbiAgICAgICAgdGhpcy5nZXQoXCIvY29sbGVjdGlvbl9wcmVzZXRzXCIsIHtcbiAgICAgICAgICBcImZpbHRlclt0aXRsZV1bbm51bGxdXCI6IDEsXG4gICAgICAgICAgXCJmaWx0ZXJbcm9sZV1bZXFdXCI6IHRoaXMucGF5bG9hZC5yb2xlLFxuICAgICAgICAgIFwiZmlsdGVyW3VzZXJdW251bGxdXCI6IDFcbiAgICAgICAgfSlcbiAgICAgIF0pLnRoZW4odmFsdWVzID0+IHtcbiAgICAgICAgY29uc3QgW3VzZXIsIHJvbGVdID0gdmFsdWVzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNoYWRvd1xuICAgICAgICByZXR1cm4gWy4uLnVzZXIuZGF0YSwgLi4ucm9sZS5kYXRhXTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvLyBDT0xMRUNUSU9OU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgYXZhaWxhYmxlIGNvbGxlY3Rpb25zXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0Q29sbGVjdGlvbnMocGFyYW1zID0ge30pIHtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChcIi9jb2xsZWN0aW9uc1wiLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgY29sbGVjdGlvbiBpbmZvIGJ5IG5hbWVcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIENvbGxlY3Rpb24gbmFtZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldENvbGxlY3Rpb24oY29sbGVjdGlvbiwgcGFyYW1zID0ge30pIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoYC9jb2xsZWN0aW9ucy8ke2NvbGxlY3Rpb259YCwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgY29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIENvbGxlY3Rpb24gaW5mb3JtYXRpb25cbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBjcmVhdGVDb2xsZWN0aW9uKGRhdGEpIHtcbiAgICAgIEFWLm9iamVjdChkYXRhLCBcImRhdGFcIik7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KFwiL2NvbGxlY3Rpb25zXCIsIGRhdGEpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IFRoZSBjb2xsZWN0aW9uIHRvIHVwZGF0ZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gVGhlIGZpZWxkcyB0byB1cGRhdGVcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICB1cGRhdGVDb2xsZWN0aW9uKGNvbGxlY3Rpb24sIGRhdGEpIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5vYmplY3QoZGF0YSwgXCJkYXRhXCIpO1xuICAgICAgcmV0dXJuIHRoaXMucGF0Y2goYC9jb2xsZWN0aW9ucy8ke2NvbGxlY3Rpb259YCwgZGF0YSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiBUaGUgcHJpbWFyeSBrZXkgb2YgdGhlIGNvbGxlY3Rpb24gdG8gcmVtb3ZlXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZGVsZXRlQ29sbGVjdGlvbihjb2xsZWN0aW9uKSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlKGAvY29sbGVjdGlvbnMvJHtjb2xsZWN0aW9ufWApO1xuICAgIH0sXG5cbiAgICAvLyBDT0xMRUNUSU9OIFBSRVNFVFNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgY29sbGVjdGlvbiBwcmVzZXQgKGJvb2ttYXJrIC8gbGlzdGluZyBwcmVmZXJlbmNlcylcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgVGhlIGJvb2ttYXJrIGluZm9cbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBjcmVhdGVDb2xsZWN0aW9uUHJlc2V0KGRhdGEpIHtcbiAgICAgIEFWLm9iamVjdChkYXRhKTtcbiAgICAgIHJldHVybiB0aGlzLnBvc3QoXCIvY29sbGVjdGlvbl9wcmVzZXRzXCIsIGRhdGEpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgY29sbGVjdGlvbiBwcmVzZXQgKGJvb2ttYXJrIC8gbGlzdGluZyBwcmVmZXJlbmNlKVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gcHJpbWFyeUtleVxuICAgICAqIEBwYXJhbSB7UmVxdWVzdFByb21pc2V9IGRhdGFcbiAgICAgKi9cbiAgICB1cGRhdGVDb2xsZWN0aW9uUHJlc2V0KHByaW1hcnlLZXksIGRhdGEpIHtcbiAgICAgIEFWLm5vdE51bGwocHJpbWFyeUtleSwgXCJwcmltYXJ5S2V5XCIpO1xuICAgICAgQVYub2JqZWN0KGRhdGEsIFwiZGF0YVwiKTtcblxuICAgICAgcmV0dXJuIHRoaXMucGF0Y2goYC9jb2xsZWN0aW9uX3ByZXNldHMvJHtwcmltYXJ5S2V5fWAsIGRhdGEpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgY29sbGVjdGlvbiBwcmVzZXQgYnkgcHJpbWFyeWtleVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gcHJpbWFyeUtleSBUaGUgcHJpbWFyeUtleSBvZiB0aGUgcHJlc2V0IHRvIGRlbGV0ZVxuICAgICAqL1xuICAgIGRlbGV0ZUNvbGxlY3Rpb25QcmVzZXQocHJpbWFyeUtleSkge1xuICAgICAgQVYubm90TnVsbChwcmltYXJ5S2V5LCBcInByaW1hcnlLZXlcIik7XG4gICAgICByZXR1cm4gdGhpcy5kZWxldGUoYC9jb2xsZWN0aW9uX3ByZXNldHMvJHtwcmltYXJ5S2V5fWApO1xuICAgIH0sXG5cbiAgICAvLyBEQVRBQkFTRVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogVGhpcyB3aWxsIHVwZGF0ZSB0aGUgZGF0YWJhc2Ugb2YgdGhlIEFQSSBpbnN0YW5jZSB0byB0aGUgbGF0ZXN0IHZlcnNpb25cbiAgICAgKiB1c2luZyB0aGUgbWlncmF0aW9ucyBpbiB0aGUgQVBJXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgdXBkYXRlRGF0YWJhc2UoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KFwiL3VwZGF0ZVwiKTtcbiAgICB9LFxuXG4gICAgLy8gRVhURU5TSU9OU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbWV0YSBpbmZvcm1hdGlvbiBvZiBhbGwgaW5zdGFsbGVkIGludGVyZmFjZXNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRJbnRlcmZhY2VzKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcImdldFwiLCBcIi9pbnRlcmZhY2VzXCIsIHt9LCB7fSwgdHJ1ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbWV0YSBpbmZvcm1hdGlvbiBvZiBhbGwgaW5zdGFsbGVkIGxheW91dHNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRMYXlvdXRzKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcImdldFwiLCBcIi9sYXlvdXRzXCIsIHt9LCB7fSwgdHJ1ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbWV0YSBpbmZvcm1hdGlvbiBvZiBhbGwgaW5zdGFsbGVkIHBhZ2VzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0UGFnZXMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZ2V0XCIsIFwiL3BhZ2VzXCIsIHt9LCB7fSwgdHJ1ZSk7XG4gICAgfSxcblxuICAgIC8vIEZJRUxEU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBmaWVsZHMgdGhhdCBhcmUgaW4gRGlyZWN0dXNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRBbGxGaWVsZHMocGFyYW1zID0ge30pIHtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChcIi9maWVsZHNcIiwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBmaWVsZHMgdGhhdCBoYXZlIGJlZW4gc2V0dXAgZm9yIGEgZ2l2ZW4gY29sbGVjdGlvblxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiAgQ29sbGVjdGlvbiBuYW1lXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0RmllbGRzKGNvbGxlY3Rpb24sIHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KGAvZmllbGRzLyR7Y29sbGVjdGlvbn1gLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGZpZWxkIGluZm9ybWF0aW9uIGZvciBhIHNpbmdsZSBnaXZlbiBmaWVsZFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiAgQ29sbGVjdGlvbiBuYW1lXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBmaWVsZE5hbWUgICBGaWVsZCBuYW1lXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0RmllbGQoY29sbGVjdGlvbiwgZmllbGROYW1lLCBwYXJhbXMgPSB7fSkge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLnN0cmluZyhmaWVsZE5hbWUsIFwiZmllbGROYW1lXCIpO1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KGAvZmllbGRzLyR7Y29sbGVjdGlvbn0vJHtmaWVsZE5hbWV9YCwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgZmllbGQgaW4gdGhlIGdpdmVuIGNvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gQ29sbGVjdGlvbiB0byBhZGQgdGhlIGZpZWxkIGluXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBmaWVsZEluZm8gIFRoZSBmaWVsZHMgaW5mbyB0byBzYXZlXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgY3JlYXRlRmllbGQoY29sbGVjdGlvbiwgZmllbGRJbmZvKSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYub2JqZWN0KGZpZWxkSW5mbywgXCJmaWVsZEluZm9cIik7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KGAvZmllbGRzLyR7Y29sbGVjdGlvbn1gLCBmaWVsZEluZm8pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYSBnaXZlbiBmaWVsZCBpbiBhIGdpdmVuIGNvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gRmllbGQncyBwYXJlbnQgY29sbGVjdGlvblxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZmllbGROYW1lICBOYW1lIG9mIHRoZSBmaWVsZCB0byB1cGRhdGVcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGZpZWxkSW5mbyAgRmllbGRzIHRvIHVwZGF0ZVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHVwZGF0ZUZpZWxkKGNvbGxlY3Rpb24sIGZpZWxkTmFtZSwgZmllbGRJbmZvKSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYuc3RyaW5nKGZpZWxkTmFtZSwgXCJmaWVsZE5hbWVcIik7XG4gICAgICBBVi5vYmplY3QoZmllbGRJbmZvLCBcImZpZWxkSW5mb1wiKTtcbiAgICAgIHJldHVybiB0aGlzLnBhdGNoKGAvZmllbGRzLyR7Y29sbGVjdGlvbn0vJHtmaWVsZE5hbWV9YCwgZmllbGRJbmZvKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIG11bHRpcGxlIGZpZWxkcyBhdCBvbmNlXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uICAgICAgICAgICAgIEZpZWxkcycgcGFyZW50IGNvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gZmllbGRzSW5mb09yRmllbGROYW1lcyAgQXJyYXkgb2YgZmllbGQgb2JqZWN0cyBvciBhcnJheSBvZiBmaWVsZCBuYW1lc1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gW2ZpZWxkSW5mb10gICAgICAgICAgICBJbiBjYXNlIGZpZWxkc0luZm9PckZpZWxkTmFtZXMgaXMgYW4gYXJyYXkgb2YgZmllbGROYW1lcywgeW91IG5lZWQgdG8gcHJvdmlkZSB0aGUgZmllbGRzIHRvIHVwZGF0ZVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIC8vIFNldCBtdWx0aXBsZSBmaWVsZHMgdG8gdGhlIHNhbWUgdmFsdWVcbiAgICAgKiB1cGRhdGVGaWVsZHMoXCJwcm9qZWN0c1wiLCBbXCJmaXJzdF9uYW1lXCIsIFwibGFzdF9uYW1lXCIsIFwiZW1haWxcIl0sIHtcbiAgICAgKiAgIGRlZmF1bHRfdmFsdWU6IFwiXCJcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogLy8gU2V0IG11bHRpcGxlIGZpZWxkcyB0byBkaWZmZXJlbnQgdmFsdWVzXG4gICAgICogdXBkYXRlRmllbGRzKFwicHJvamVjdHNcIiwgW1xuICAgICAqICAge1xuICAgICAqICAgICBpZDogMTQsXG4gICAgICogICAgIHNvcnQ6IDFcbiAgICAgKiAgIH0sXG4gICAgICogICB7XG4gICAgICogICAgIGlkOiAxNyxcbiAgICAgKiAgICAgc29ydDogMlxuICAgICAqICAgfSxcbiAgICAgKiAgIHtcbiAgICAgKiAgICAgaWQ6IDkxMixcbiAgICAgKiAgICAgc29ydDogM1xuICAgICAqICAgfVxuICAgICAqIF0pXG4gICAgICovXG4gICAgdXBkYXRlRmllbGRzKGNvbGxlY3Rpb24sIGZpZWxkc0luZm9PckZpZWxkTmFtZXMsIGZpZWxkSW5mbyA9IG51bGwpIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5hcnJheShmaWVsZHNJbmZvT3JGaWVsZE5hbWVzLCBcImZpZWxkc0luZm9PckZpZWxkTmFtZXNcIik7XG5cbiAgICAgIGlmIChmaWVsZEluZm8pIHtcbiAgICAgICAgQVYub2JqZWN0KGZpZWxkSW5mbyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWVsZEluZm8pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0Y2goXG4gICAgICAgICAgYC9maWVsZHMvJHtjb2xsZWN0aW9ufS8ke2ZpZWxkc0luZm9PckZpZWxkTmFtZXMuam9pbihcIixcIil9YCxcbiAgICAgICAgICBmaWVsZEluZm9cbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucGF0Y2goYC9maWVsZHMvJHtjb2xsZWN0aW9ufWAsIGZpZWxkc0luZm9PckZpZWxkTmFtZXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgYSBmaWVsZCBmcm9tIGEgY29sbGVjdGlvblxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiBOYW1lIG9mIHRoZSBjb2xsZWN0aW9uXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBmaWVsZE5hbWUgIFRoZSBuYW1lIG9mIHRoZSBmaWVsZCB0byBkZWxldGVcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBkZWxldGVGaWVsZChjb2xsZWN0aW9uLCBmaWVsZE5hbWUpIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5zdHJpbmcoZmllbGROYW1lLCBcImZpZWxkTmFtZVwiKTtcbiAgICAgIHJldHVybiB0aGlzLmRlbGV0ZShgL2ZpZWxkcy8ke2NvbGxlY3Rpb259LyR7ZmllbGROYW1lfWApO1xuICAgIH0sXG5cbiAgICAvLyBGSUxFU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogVXBsb2FkIG11bHRpcGFydCBmaWxlcyBpbiBtdWx0aXBhcnQvZm9ybS1kYXRhXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIEZvcm1EYXRhIG9iamVjdCBjb250YWluaW5nIGZpbGVzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgdXBsb2FkRmlsZXMoZGF0YSwgb25VcGxvYWRQcm9ncmVzcyA9ICgpID0+IHt9KSB7XG4gICAgICBjb25zdCBoZWFkZXJzID0ge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIixcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMudG9rZW59YFxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHRoaXMuYXhpb3NcbiAgICAgICAgLnBvc3QoYCR7dGhpcy51cmx9LyR7dGhpcy5lbnZ9L2ZpbGVzYCwgZGF0YSwge1xuICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgb25VcGxvYWRQcm9ncmVzc1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvci5yZXNwb25zZS5kYXRhLmVycm9yO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyB7XG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgY29kZTogLTEsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IFwiTmV0d29yayBFcnJvclwiLFxuICAgICAgICAgICAgICBlcnJvclxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvLyBJVEVNU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBhbiBleGlzdGluZyBpdGVtXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGFkZCB0aGUgaXRlbSB0b1xuICAgICAqIEBwYXJhbSAge1N0cmluZ3xOdW1iZXJ9IHByaW1hcnlLZXkgUHJpbWFyeSBrZXkgb2YgdGhlIGl0ZW1cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGJvZHkgICAgICAgVGhlIGl0ZW0ncyBmaWVsZCB2YWx1ZXNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICB1cGRhdGVJdGVtKGNvbGxlY3Rpb24sIHByaW1hcnlLZXksIGJvZHkpIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcbiAgICAgIEFWLm9iamVjdChib2R5LCBcImJvZHlcIik7XG5cbiAgICAgIGlmIChjb2xsZWN0aW9uLnN0YXJ0c1dpdGgoXCJkaXJlY3R1c19cIikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0Y2goYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfS8ke3ByaW1hcnlLZXl9YCwgYm9keSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnBhdGNoKGAvaXRlbXMvJHtjb2xsZWN0aW9ufS8ke3ByaW1hcnlLZXl9YCwgYm9keSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBtdWx0aXBsZSBpdGVtc1xuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBhZGQgdGhlIGl0ZW0gdG9cbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gYm9keSAgICAgICAgVGhlIGl0ZW0ncyBmaWVsZCB2YWx1ZXNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICB1cGRhdGVJdGVtcyhjb2xsZWN0aW9uLCBib2R5KSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYuYXJyYXkoYm9keSwgXCJib2R5XCIpO1xuXG4gICAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKFwiZGlyZWN0dXNfXCIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGNoKGAvJHtjb2xsZWN0aW9uLnN1YnN0cmluZyg5KX1gLCBib2R5KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucGF0Y2goYC9pdGVtcy8ke2NvbGxlY3Rpb259YCwgYm9keSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpdGVtXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGFkZCB0aGUgaXRlbSB0b1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gYm9keSAgICAgICBUaGUgaXRlbSdzIGZpZWxkIHZhbHVlc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGNyZWF0ZUl0ZW0oY29sbGVjdGlvbiwgYm9keSkge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLm9iamVjdChib2R5LCBcImJvZHlcIik7XG5cbiAgICAgIGlmIChjb2xsZWN0aW9uLnN0YXJ0c1dpdGgoXCJkaXJlY3R1c19cIikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdChgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9YCwgYm9keSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnBvc3QoYC9pdGVtcy8ke2NvbGxlY3Rpb259YCwgYm9keSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBtdWx0aXBsZSBpdGVtc1xuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBhZGQgdGhlIGl0ZW0gdG9cbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gYm9keSAgICAgICAgVGhlIGl0ZW0ncyBmaWVsZCB2YWx1ZXNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBjcmVhdGVJdGVtcyhjb2xsZWN0aW9uLCBib2R5KSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYuYXJyYXkoYm9keSwgXCJib2R5XCIpO1xuXG4gICAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKFwiZGlyZWN0dXNfXCIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3QoYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfWAsIGJvZHkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5wb3N0KGAvaXRlbXMvJHtjb2xsZWN0aW9ufWAsIGJvZHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgaXRlbXMgZnJvbSBhIGdpdmVuIGNvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gYWRkIHRoZSBpdGVtIHRvXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSAgIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRJdGVtcyhjb2xsZWN0aW9uLCBwYXJhbXMgPSB7fSkge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcblxuICAgICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChcImRpcmVjdHVzX1wiKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfWAsIHBhcmFtcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmdldChgL2l0ZW1zLyR7Y29sbGVjdGlvbn1gLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBzaW5nbGUgaXRlbSBieSBwcmltYXJ5IGtleVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiAgVGhlIGNvbGxlY3Rpb24gdG8gYWRkIHRoZSBpdGVtIHRvXG4gICAgICogQHBhcmFtICB7U3RyaW5nfE51bWJlcn0gcHJpbWFyeUtleSBQcmltYXJ5IGtleSBvZiB0aGUgaXRlbVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldEl0ZW0oY29sbGVjdGlvbiwgcHJpbWFyeUtleSwgcGFyYW1zID0ge30pIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcblxuICAgICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChcImRpcmVjdHVzX1wiKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfS8ke3ByaW1hcnlLZXl9YCwgcGFyYW1zKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuZ2V0KGAvaXRlbXMvJHtjb2xsZWN0aW9ufS8ke3ByaW1hcnlLZXl9YCwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIGEgc2luZ2xlIGl0ZW0gYnkgcHJpbWFyeSBrZXlcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIFRoZSBjb2xsZWN0aW9uIHRvIGRlbGV0ZSB0aGUgaXRlbSBmcm9tXG4gICAgICogQHBhcmFtICB7U3RyaW5nfE51bWJlcn0gcHJpbWFyeUtleSBQcmltYXJ5IGtleSBvZiB0aGUgaXRlbVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGRlbGV0ZUl0ZW0oY29sbGVjdGlvbiwgcHJpbWFyeUtleSkge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLm5vdE51bGwocHJpbWFyeUtleSwgXCJwcmltYXJ5S2V5XCIpO1xuXG4gICAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKFwiZGlyZWN0dXNfXCIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZShgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9LyR7cHJpbWFyeUtleX1gKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlKGAvaXRlbXMvJHtjb2xsZWN0aW9ufS8ke3ByaW1hcnlLZXl9YCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSBtdWx0aXBsZSBpdGVtcyBieSBwcmltYXJ5IGtleVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiAgVGhlIGNvbGxlY3Rpb24gdG8gZGVsZXRlIHRoZSBpdGVtIGZyb21cbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gcHJpbWFyeUtleSBQcmltYXJ5IGtleSBvZiB0aGUgaXRlbVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGRlbGV0ZUl0ZW1zKGNvbGxlY3Rpb24sIHByaW1hcnlLZXlzKSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYuYXJyYXkocHJpbWFyeUtleXMsIFwicHJpbWFyeUtleXNcIik7XG5cbiAgICAgIGlmIChjb2xsZWN0aW9uLnN0YXJ0c1dpdGgoXCJkaXJlY3R1c19cIikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlKGAvJHtjb2xsZWN0aW9uLnN1YnN0cmluZyg5KX0vJHtwcmltYXJ5S2V5cy5qb2luKCl9YCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmRlbGV0ZShgL2l0ZW1zLyR7Y29sbGVjdGlvbn0vJHtwcmltYXJ5S2V5cy5qb2luKCl9YCk7XG4gICAgfSxcblxuICAgIC8vIExJU1RJTkcgUFJFRkVSRU5DRVNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGNvbGxlY3Rpb24gcHJlc2V0cyBvZiB0aGUgY3VycmVudCB1c2VyIGZvciBhIHNpbmdsZSBjb2xsZWN0aW9uXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uICBDb2xsZWN0aW9uIHRvIGZldGNoIHRoZSBwcmVmZXJlbmNlcyBmb3JcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRNeUxpc3RpbmdQcmVmZXJlbmNlcyhjb2xsZWN0aW9uLCBwYXJhbXMgPSB7fSkge1xuICAgICAgQVYuc3RyaW5nKHRoaXMudG9rZW4sIFwidGhpcy50b2tlblwiKTtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgIHRoaXMuZ2V0KFwiL2NvbGxlY3Rpb25fcHJlc2V0c1wiLCB7XG4gICAgICAgICAgbGltaXQ6IDEsXG4gICAgICAgICAgXCJmaWx0ZXJbdGl0bGVdW251bGxdXCI6IDEsXG4gICAgICAgICAgXCJmaWx0ZXJbY29sbGVjdGlvbl1bZXFdXCI6IGNvbGxlY3Rpb24sXG4gICAgICAgICAgXCJmaWx0ZXJbcm9sZV1bbnVsbF1cIjogMSxcbiAgICAgICAgICBcImZpbHRlclt1c2VyXVtudWxsXVwiOiAxLFxuICAgICAgICAgIHNvcnQ6IFwiLWlkXCJcbiAgICAgICAgfSksXG4gICAgICAgIHRoaXMuZ2V0KFwiL2NvbGxlY3Rpb25fcHJlc2V0c1wiLCB7XG4gICAgICAgICAgbGltaXQ6IDEsXG4gICAgICAgICAgXCJmaWx0ZXJbdGl0bGVdW251bGxdXCI6IDEsXG4gICAgICAgICAgXCJmaWx0ZXJbY29sbGVjdGlvbl1bZXFdXCI6IGNvbGxlY3Rpb24sXG4gICAgICAgICAgXCJmaWx0ZXJbcm9sZV1bZXFdXCI6IHRoaXMucGF5bG9hZC5yb2xlLFxuICAgICAgICAgIFwiZmlsdGVyW3VzZXJdW251bGxdXCI6IDEsXG4gICAgICAgICAgc29ydDogXCItaWRcIlxuICAgICAgICB9KSxcbiAgICAgICAgdGhpcy5nZXQoXCIvY29sbGVjdGlvbl9wcmVzZXRzXCIsIHtcbiAgICAgICAgICBsaW1pdDogMSxcbiAgICAgICAgICBcImZpbHRlclt0aXRsZV1bbnVsbF1cIjogMSxcbiAgICAgICAgICBcImZpbHRlcltjb2xsZWN0aW9uXVtlcV1cIjogY29sbGVjdGlvbixcbiAgICAgICAgICBcImZpbHRlcltyb2xlXVtlcV1cIjogdGhpcy5wYXlsb2FkLnJvbGUsXG4gICAgICAgICAgXCJmaWx0ZXJbdXNlcl1bZXFdXCI6IHRoaXMucGF5bG9hZC5pZCxcbiAgICAgICAgICBzb3J0OiBcIi1pZFwiXG4gICAgICAgIH0pXG4gICAgICBdKS50aGVuKHZhbHVlcyA9PiB7XG4gICAgICAgIGNvbnN0IFtjb2xsZWN0aW9uLCByb2xlLCB1c2VyXSA9IHZhbHVlczsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zaGFkb3dcbiAgICAgICAgaWYgKHVzZXIuZGF0YSAmJiB1c2VyLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiB1c2VyLmRhdGFbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJvbGUuZGF0YSAmJiByb2xlLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiByb2xlLmRhdGFbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbGxlY3Rpb24uZGF0YSAmJiBjb2xsZWN0aW9uLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiBjb2xsZWN0aW9uLmRhdGFbMF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8vIFBFUk1JU1NJT05TXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogR2V0IHBlcm1pc3Npb25zXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0UGVybWlzc2lvbnMocGFyYW1zID0ge30pIHtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1zKFwiZGlyZWN0dXNfcGVybWlzc2lvbnNcIiwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50bHkgbG9nZ2VkIGluIHVzZXIncyBwZXJtaXNzaW9uc1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gcGFyYW1zIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRNeVBlcm1pc3Npb25zKHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoXCIvcGVybWlzc2lvbnMvbWVcIiwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG11bHRpcGxlIG5ldyBwZXJtaXNzaW9uc1xuICAgICAqIEBwYXJhbSAge0FycmF5fSBkYXRhICBQZXJtaXNzaW9uIHJlY29yZHMgdG8gc2F2ZVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGNyZWF0ZVBlcm1pc3Npb25zKGRhdGEpIHtcbiAgICAgIEFWLmFycmF5KGRhdGEpO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChcIi9wZXJtaXNzaW9uc1wiLCBkYXRhKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIG11bHRpcGxlIHBlcm1pc3Npb24gcmVjb3Jkc1xuICAgICAqIEBwYXJhbSAge0FycmF5fSBkYXRhICBQZXJtaXNzaW9uIHJlY29yZHMgdG8gdXBkYXRlXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgdXBkYXRlUGVybWlzc2lvbnMoZGF0YSkge1xuICAgICAgQVYuYXJyYXkoZGF0YSk7XG4gICAgICByZXR1cm4gdGhpcy5wYXRjaChcIi9wZXJtaXNzaW9uc1wiLCBkYXRhKTtcbiAgICB9LFxuXG4gICAgLy8gUkVMQVRJT05TXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCByZWxhdGlvbnNoaXBzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0UmVsYXRpb25zKHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcyk7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoXCIvcmVsYXRpb25zXCIsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIGNyZWF0ZVJlbGF0aW9uKGRhdGEpIHtcbiAgICAgIHJldHVybiB0aGlzLnBvc3QoXCIvcmVsYXRpb25zXCIsIGRhdGEpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVSZWxhdGlvbihwcmltYXJ5S2V5LCBkYXRhKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXRjaChgL3JlbGF0aW9ucy8ke3ByaW1hcnlLZXl9YCwgZGF0YSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcmVsYXRpb25zaGlwIGluZm9ybWF0aW9uIGZvciB0aGUgZ2l2ZW4gY29sbGVjdGlvblxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiBuYW1lXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0Q29sbGVjdGlvblJlbGF0aW9ucyhjb2xsZWN0aW9uLCBwYXJhbXMgPSB7fSkge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zKTtcblxuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgdGhpcy5nZXQoXCIvcmVsYXRpb25zXCIsIHsgXCJmaWx0ZXJbY29sbGVjdGlvbl9hXVtlcV1cIjogY29sbGVjdGlvbiB9KSxcbiAgICAgICAgdGhpcy5nZXQoXCIvcmVsYXRpb25zXCIsIHsgXCJmaWx0ZXJbY29sbGVjdGlvbl9iXVtlcV1cIjogY29sbGVjdGlvbiB9KVxuICAgICAgXSk7XG4gICAgfSxcblxuICAgIC8vIFJFVklTSU9OU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIHNpbmdsZSBpdGVtJ3MgcmV2aXNpb25zIGJ5IHByaW1hcnkga2V5XG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uICBUaGUgY29sbGVjdGlvbiB0byBmZXRjaCB0aGUgcmV2aXNpb25zIGZyb21cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd8TnVtYmVyfSBwcmltYXJ5S2V5IFByaW1hcnkga2V5IG9mIHRoZSBpdGVtXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0SXRlbVJldmlzaW9ucyhjb2xsZWN0aW9uLCBwcmltYXJ5S2V5LCBwYXJhbXMgPSB7fSkge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLm5vdE51bGwocHJpbWFyeUtleSwgXCJwcmltYXJ5S2V5XCIpO1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuXG4gICAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKFwiZGlyZWN0dXNfXCIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldChcbiAgICAgICAgICBgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9LyR7cHJpbWFyeUtleX0vcmV2aXNpb25zYCxcbiAgICAgICAgICBwYXJhbXNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuZ2V0KGAvaXRlbXMvJHtjb2xsZWN0aW9ufS8ke3ByaW1hcnlLZXl9L3JldmlzaW9uc2AsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJldmVydCBhbiBpdGVtIHRvIGEgcHJldmlvdXMgc3RhdGVcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIFRoZSBjb2xsZWN0aW9uIHRvIGZldGNoIHRoZSByZXZpc2lvbnMgZnJvbVxuICAgICAqIEBwYXJhbSAge1N0cmluZ3xOdW1iZXJ9IHByaW1hcnlLZXkgUHJpbWFyeSBrZXkgb2YgdGhlIGl0ZW1cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHJldmlzaW9uSUQgVGhlIElEIG9mIHRoZSByZXZpc2lvbiB0byByZXZlcnQgdG9cbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICByZXZlcnQoY29sbGVjdGlvbiwgcHJpbWFyeUtleSwgcmV2aXNpb25JRCkge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLm5vdE51bGwocHJpbWFyeUtleSwgXCJwcmltYXJ5S2V5XCIpO1xuICAgICAgQVYubnVtYmVyKHJldmlzaW9uSUQsIFwicmV2aXNpb25JRFwiKTtcblxuICAgICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChcImRpcmVjdHVzX1wiKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRjaChcbiAgICAgICAgICBgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9LyR7cHJpbWFyeUtleX0vcmV2ZXJ0LyR7cmV2aXNpb25JRH1gXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnBhdGNoKFxuICAgICAgICBgL2l0ZW1zLyR7Y29sbGVjdGlvbn0vJHtwcmltYXJ5S2V5fS9yZXZlcnQvJHtyZXZpc2lvbklEfWBcbiAgICAgICk7XG4gICAgfSxcblxuICAgIC8vIFJPTEVTXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgc2luZ2xlIHVzZXIgcm9sZVxuICAgICAqIEBwYXJhbSAge051bWJlcn0gcHJpbWFyeUtleSAgVGhlIGlkIG9mIHRoZSB1c2VyIHJvbCB0byBnZXRcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRSb2xlKHByaW1hcnlLZXksIHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5udW1iZXIocHJpbWFyeUtleSwgXCJwcmltYXJ5S2V5XCIpO1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KGAvcm9sZXMvJHtwcmltYXJ5S2V5fWAsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdXNlciByb2xlc1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldFJvbGVzKHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoXCIvcm9sZXNcIiwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGEgdXNlciByb2xlXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBwcmltYXJ5S2V5IFRoZSBJRCBvZiB0aGUgcm9sZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gYm9keSAgICAgICBUaGUgZmllbGRzIHRvIHVwZGF0ZVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHVwZGF0ZVJvbGUocHJpbWFyeUtleSwgYm9keSkge1xuICAgICAgQVYubm90TnVsbChwcmltYXJ5S2V5LCBcInByaW1hcnlLZXlcIik7XG4gICAgICBBVi5vYmplY3QoYm9keSwgXCJib2R5XCIpO1xuICAgICAgcmV0dXJuIHRoaXMudXBkYXRlSXRlbShcImRpcmVjdHVzX3JvbGVzXCIsIHByaW1hcnlLZXksIGJvZHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgdXNlciByb2xlXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBib2R5IFRoZSByb2xlIGluZm9ybWF0aW9uXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgY3JlYXRlUm9sZShib2R5KSB7XG4gICAgICBBVi5vYmplY3QoYm9keSwgXCJib2R5XCIpO1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlSXRlbShcImRpcmVjdHVzX3JvbGVzXCIsIGJvZHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgYSB1c2VyIHJvbCBieSBwcmltYXJ5IGtleVxuICAgICAqIEBwYXJhbSAge051bWJlciB8IFN0cmluZ30gcHJpbWFyeUtleSBQcmltYXJ5IGtleSBvZiB0aGUgdXNlciByb2xlXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZGVsZXRlUm9sZShwcmltYXJ5S2V5KSB7XG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcbiAgICAgIHJldHVybiB0aGlzLmRlbGV0ZUl0ZW0oXCJkaXJlY3R1c19yb2xlc1wiLCBwcmltYXJ5S2V5KTtcbiAgICB9LFxuXG4gICAgLy8gU0VUVElOR1NcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBHZXQgRGlyZWN0dXMnIGdsb2JhbCBzZXR0aW5nc1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldFNldHRpbmdzKHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoXCIvc2V0dGluZ3NcIiwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBcImZpZWxkc1wiIGZvciBkaXJlY3R1c19zZXR0aW5nc1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldFNldHRpbmdzRmllbGRzKHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoXCIvc2V0dGluZ3MvZmllbGRzXCIsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8vIFVTRVJTXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgbGlzdCBvZiBhdmFpbGFibGUgdXNlcnMgaW4gRGlyZWN0dXNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRVc2VycyhwYXJhbXMgPSB7fSkge1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiL3VzZXJzXCIsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBhIHNpbmdsZSBEaXJlY3R1cyB1c2VyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBwcmltYXJ5S2V5ICBUaGUgdW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIHVzZXJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRVc2VyKHByaW1hcnlLZXksIHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChgL3VzZXJzLyR7cHJpbWFyeUtleX1gLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHVzZXIgaW5mbyBvZiB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0TWUocGFyYW1zID0ge30pIHtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChcIi91c2Vycy9tZVwiLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYSBzaW5nbGUgdXNlciBiYXNlZCBvbiBwcmltYXJ5S2V5XG4gICAgICogQHBhcmFtICB7U3RyaW5nfE51bWJlcn0gcHJpbWFyeUtleSBUaGUgcHJpbWFyeSBrZXkgb2YgdGhlIHVzZXJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGJvZHkgICAgICAgICAgICAgIFRoZSBmaWVsZHMgdG8gdXBkYXRlXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgdXBkYXRlVXNlcihwcmltYXJ5S2V5LCBib2R5KSB7XG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcbiAgICAgIEFWLm9iamVjdChib2R5LCBcImJvZHlcIik7XG4gICAgICByZXR1cm4gdGhpcy51cGRhdGVJdGVtKFwiZGlyZWN0dXNfdXNlcnNcIiwgcHJpbWFyeUtleSwgYm9keSk7XG4gICAgfSxcblxuICAgIC8vIFVUSUxTXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogUGluZyB0aGUgQVBJIHRvIGNoZWNrIGlmIGl0IGV4aXN0cyAvIGlzIHVwIGFuZCBydW5uaW5nXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgcGluZygpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXCJnZXRcIiwgXCIvc2VydmVyL3BpbmdcIiwge30sIHt9LCB0cnVlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBzZXJ2ZXIgaW5mbyBmcm9tIHRoZSBBUElcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBzZXJ2ZXJJbmZvKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcImdldFwiLCBcIi9cIiwge30sIHt9LCB0cnVlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCB0aGUgc2V0dXAgdGhpcmQgcGFydHkgYXV0aCBwcm92aWRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRUaGlyZFBhcnR5QXV0aFByb3ZpZGVycygpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldChcIi9hdXRoL3Nzb1wiKTtcbiAgICB9XG4gIH07XG59XG5cbi8vIENPTlZFTklFTkNFIE1FVEhPRFNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuU0RLLmdldFBheWxvYWQgPSBnZXRQYXlsb2FkO1xubW9kdWxlLmV4cG9ydHMgPSBTREs7XG4iXSwic291cmNlUm9vdCI6IiJ9