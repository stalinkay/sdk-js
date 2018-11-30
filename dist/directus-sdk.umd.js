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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EaXJlY3R1c1NESy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXJndW1lbnQtdmFsaWRhdG9yL2FyZ3VtZW50LXZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnRvYS5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYmFzZS02NC9iYXNlNjQuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9xcy9saWIvZm9ybWF0cy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9xcy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvcXMvbGliL3BhcnNlLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvcXMvbGliL3V0aWxzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiYXhpb3MiLCJyZXF1aXJlIiwiYmFzZTY0IiwicXMiLCJBViIsImdldFBheWxvYWQiLCJ0b2tlbiIsInBheWxvYWRCYXNlNjQiLCJzcGxpdCIsInJlcGxhY2UiLCJwYXlsb2FkRGVjb2RlZCIsImRlY29kZSIsInBheWxvYWRPYmplY3QiLCJKU09OIiwicGFyc2UiLCJpc051bWJlciIsImV4cCIsIkRhdGUiLCJTREsiLCJvcHRpb25zIiwidXJsIiwiZW52IiwiY3JlYXRlIiwicGFyYW1zU2VyaWFsaXplciIsInN0cmluZ2lmeSIsInRpbWVvdXQiLCJyZWZyZXNoSW50ZXJ2YWwiLCJvbkF1dG9SZWZyZXNoRXJyb3IiLCJvbkF1dG9SZWZyZXNoU3VjY2VzcyIsInBheWxvYWQiLCJpc1N0cmluZyIsImxvZ2dlZEluIiwiaXNPYmplY3QiLCJnZXRUaW1lIiwibm93IiwicmVxdWVzdCIsIm1ldGhvZCIsImVuZHBvaW50IiwicGFyYW1zIiwiZGF0YSIsIm5vRW52IiwiaGVhZGVycyIsInN0cmluZyIsIm9iamVjdE9yRW1wdHkiLCJBcnJheSIsImlzQXJyYXkiLCJhcnJheU9yRW1wdHkiLCJiYXNlVVJMIiwicmVxdWVzdE9wdGlvbnMiLCJsZW5ndGgiLCJBdXRob3JpemF0aW9uIiwidGhlbiIsInJlcyIsImVycm9yIiwianNvbiIsImNhdGNoIiwicmVzcG9uc2UiLCJjb2RlIiwibWVzc2FnZSIsImdldCIsInBvc3QiLCJib2R5IiwicGF0Y2giLCJwdXQiLCJkZWxldGUiLCJsb2dpbiIsImNyZWRlbnRpYWxzIiwib2JqZWN0Iiwia2V5c1dpdGhTdHJpbmciLCJoYXNLZXlzV2l0aFN0cmluZyIsInBlcnNpc3QiLCJzdGFydEludGVydmFsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJlbWFpbCIsInBhc3N3b3JkIiwibG9nb3V0Iiwic3RvcEludGVydmFsIiwiZmlyZUltbWVkaWF0ZWx5IiwicmVmcmVzaElmTmVlZGVkIiwic2V0SW50ZXJ2YWwiLCJiaW5kIiwiY2xlYXJJbnRlcnZhbCIsImhhc1N0cmluZ0tleXMiLCJ0aW1lRGlmZiIsImlzRnVuY3Rpb24iLCJyZWZyZXNoIiwicmVxdWVzdFBhc3N3b3JkUmVzZXQiLCJpbnN0YW5jZSIsImdldEFjdGl2aXR5IiwiZ2V0TXlCb29rbWFya3MiLCJhbGwiLCJpZCIsInJvbGUiLCJ2YWx1ZXMiLCJ1c2VyIiwiZ2V0Q29sbGVjdGlvbnMiLCJnZXRDb2xsZWN0aW9uIiwiY29sbGVjdGlvbiIsImNyZWF0ZUNvbGxlY3Rpb24iLCJ1cGRhdGVDb2xsZWN0aW9uIiwiZGVsZXRlQ29sbGVjdGlvbiIsImNyZWF0ZUNvbGxlY3Rpb25QcmVzZXQiLCJ1cGRhdGVDb2xsZWN0aW9uUHJlc2V0IiwicHJpbWFyeUtleSIsIm5vdE51bGwiLCJkZWxldGVDb2xsZWN0aW9uUHJlc2V0IiwiZ2V0SW50ZXJmYWNlcyIsImdldExheW91dHMiLCJnZXRQYWdlcyIsImdldEFsbEZpZWxkcyIsImdldEZpZWxkcyIsImdldEZpZWxkIiwiZmllbGROYW1lIiwiY3JlYXRlRmllbGQiLCJmaWVsZEluZm8iLCJ1cGRhdGVGaWVsZCIsInVwZGF0ZUZpZWxkcyIsImZpZWxkc0luZm9PckZpZWxkTmFtZXMiLCJhcnJheSIsImpvaW4iLCJkZWxldGVGaWVsZCIsInVwbG9hZEZpbGVzIiwib25VcGxvYWRQcm9ncmVzcyIsInVwZGF0ZUl0ZW0iLCJzdGFydHNXaXRoIiwic3Vic3RyaW5nIiwidXBkYXRlSXRlbXMiLCJjcmVhdGVJdGVtIiwiY3JlYXRlSXRlbXMiLCJnZXRJdGVtcyIsImdldEl0ZW0iLCJkZWxldGVJdGVtIiwiZGVsZXRlSXRlbXMiLCJwcmltYXJ5S2V5cyIsImdldE15TGlzdGluZ1ByZWZlcmVuY2VzIiwibGltaXQiLCJzb3J0IiwiZ2V0UGVybWlzc2lvbnMiLCJnZXRNeVBlcm1pc3Npb25zIiwiY3JlYXRlUGVybWlzc2lvbnMiLCJ1cGRhdGVQZXJtaXNzaW9ucyIsImdldFJlbGF0aW9ucyIsImNyZWF0ZVJlbGF0aW9uIiwidXBkYXRlUmVsYXRpb24iLCJnZXRDb2xsZWN0aW9uUmVsYXRpb25zIiwiZ2V0SXRlbVJldmlzaW9ucyIsInJldmVydCIsInJldmlzaW9uSUQiLCJudW1iZXIiLCJnZXRSb2xlIiwiZ2V0Um9sZXMiLCJ1cGRhdGVSb2xlIiwiY3JlYXRlUm9sZSIsImRlbGV0ZVJvbGUiLCJnZXRTZXR0aW5ncyIsImdldFVzZXJzIiwiZ2V0VXNlciIsImdldE1lIiwidXBkYXRlVXNlciIsInBpbmciLCJzZXJ2ZXJJbmZvIiwi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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRSxJQUVVO0FBQ1o7QUFDQSxFQUFFLG1DQUFPO0FBQ1Q7QUFDQSxHQUFHO0FBQUEsb0dBQUM7QUFDSixFQUFFLE1BQU0sWUFVTjs7QUFFRixDQUFDOzs7Ozs7Ozs7Ozs7O0FDcEtEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcEJBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7Ozs7QUN2THpCOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDakJhOztBQUViLGdCQUFnQixtQkFBTyxDQUFDLHVEQUFhO0FBQ3JDLFlBQVksbUJBQU8sQ0FBQywrQ0FBUztBQUM3QixjQUFjLG1CQUFPLENBQUMsbURBQVc7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNWYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsK0NBQVM7O0FBRTdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsa0JBQWtCO0FBQ3JDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtDQUFrQyxRQUFRO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0NBQXdDOztBQUV4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdLYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsK0NBQVM7QUFDN0IsY0FBYyxtQkFBTyxDQUFDLG1EQUFXOztBQUVqQztBQUNBLHlDQUF5QztBQUN6QztBQUNBLEtBQUs7QUFDTCw0Q0FBNEM7QUFDNUM7QUFDQSxLQUFLO0FBQ0wscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixvQkFBb0I7QUFDdkM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0M7O0FBRXhDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDak5hOztBQUViOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJCQUEyQixnQkFBZ0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixPQUFPLFdBQVcsYUFBYTtBQUNqRDs7QUFFQSxtQkFBbUIsa0JBQWtCO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsaUJBQWlCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixzQkFBc0I7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDek1BOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJBLElBQU1BLEtBQUssR0FBR0MsbUJBQU8sQ0FBQyw0Q0FBRCxDQUFyQjs7QUFDQSxJQUFNQyxNQUFNLEdBQUdELG1CQUFPLENBQUMsaURBQUQsQ0FBdEI7O0FBQ0EsSUFBTUUsRUFBRSxHQUFHRixtQkFBTyxDQUFDLDBDQUFELENBQWxCOztBQUNBLElBQU1HLEVBQUUsR0FBR0gsbUJBQU8sQ0FBQyxtRkFBRCxDQUFsQjtBQUVBOzs7Ozs7O0FBS0EsU0FBU0ksVUFBVCxDQUFvQkMsS0FBcEIsRUFBMkI7QUFDekIsTUFBTUMsYUFBYSxHQUFHRCxLQUFLLENBQ3hCRSxLQURtQixDQUNiLEdBRGEsRUFDUixDQURRLEVBRW5CQyxPQUZtQixDQUVYLEdBRlcsRUFFTixHQUZNLEVBR25CQSxPQUhtQixDQUdYLEdBSFcsRUFHTixHQUhNLENBQXRCO0FBSUEsTUFBTUMsY0FBYyxHQUFHUixNQUFNLENBQUNTLE1BQVAsQ0FBY0osYUFBZCxDQUF2QjtBQUNBLE1BQU1LLGFBQWEsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdKLGNBQVgsQ0FBdEI7O0FBRUEsTUFBSU4sRUFBRSxDQUFDVyxRQUFILENBQVlILGFBQWEsQ0FBQ0ksR0FBMUIsQ0FBSixFQUFvQztBQUNsQ0osaUJBQWEsQ0FBQ0ksR0FBZCxHQUFvQixJQUFJQyxJQUFKLENBQVNMLGFBQWEsQ0FBQ0ksR0FBZCxHQUFvQixJQUE3QixDQUFwQjtBQUNEOztBQUVELFNBQU9KLGFBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7O0FBUUEsU0FBU00sR0FBVCxHQUEyQjtBQUFBLE1BQWRDLE9BQWMsdUVBQUosRUFBSTtBQUN6QixTQUFPO0FBQ0xDLE9BQUcsRUFBRUQsT0FBTyxDQUFDQyxHQURSO0FBRUxkLFNBQUssRUFBRWEsT0FBTyxDQUFDYixLQUZWO0FBR0xlLE9BQUcsRUFBRUYsT0FBTyxDQUFDRSxHQUFSLElBQWUsR0FIZjtBQUlMckIsU0FBSyxFQUFFQSxLQUFLLENBQUNzQixNQUFOLENBQWE7QUFDbEJDLHNCQUFnQixFQUFFcEIsRUFBRSxDQUFDcUIsU0FESDtBQUVsQkMsYUFBTyxFQUFFLEtBQUssRUFBTCxHQUFVLElBRkQsQ0FFTTs7QUFGTixLQUFiLENBSkY7QUFRTEMsbUJBQWUsRUFBRSxJQVJaO0FBU0xDLHNCQUFrQixFQUFFLElBVGY7QUFVTEMsd0JBQW9CLEVBQUUsSUFWakI7O0FBWUwsUUFBSUMsT0FBSixHQUFjO0FBQ1osVUFBSSxDQUFDekIsRUFBRSxDQUFDMEIsUUFBSCxDQUFZLEtBQUt4QixLQUFqQixDQUFMLEVBQThCLE9BQU8sSUFBUDtBQUM5QixhQUFPRCxVQUFVLENBQUMsS0FBS0MsS0FBTixDQUFqQjtBQUNELEtBZkk7O0FBaUJMLFFBQUl5QixRQUFKLEdBQWU7QUFDYixVQUNFM0IsRUFBRSxDQUFDMEIsUUFBSCxDQUFZLEtBQUt4QixLQUFqQixLQUNBRixFQUFFLENBQUMwQixRQUFILENBQVksS0FBS1YsR0FBakIsQ0FEQSxJQUVBaEIsRUFBRSxDQUFDMEIsUUFBSCxDQUFZLEtBQUtULEdBQWpCLENBRkEsSUFHQWpCLEVBQUUsQ0FBQzRCLFFBQUgsQ0FBWSxLQUFLSCxPQUFqQixDQUpGLEVBS0U7QUFDQSxZQUFJLEtBQUtBLE9BQUwsQ0FBYWIsR0FBYixDQUFpQmlCLE9BQWpCLEtBQTZCaEIsSUFBSSxDQUFDaUIsR0FBTCxFQUFqQyxFQUE2QztBQUMzQyxpQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7QUFDRCxhQUFPLEtBQVA7QUFDRCxLQTdCSTs7QUErQkw7QUFDQTs7QUFFQTs7Ozs7Ozs7QUFRQTs7Ozs7Ozs7O0FBU0FDLFdBbkRLLG1CQW9ESEMsTUFwREcsRUFxREhDLFFBckRHLEVBMERIO0FBQUEsVUFKQUMsTUFJQSx1RUFKUyxFQUlUO0FBQUEsVUFIQUMsSUFHQSx1RUFITyxFQUdQO0FBQUEsVUFGQUMsS0FFQSx1RUFGUSxLQUVSO0FBQUEsVUFEQUMsT0FDQSx1RUFEVSxFQUNWO0FBQ0FyQyxRQUFFLENBQUNzQyxNQUFILENBQVVOLE1BQVYsRUFBa0IsUUFBbEI7QUFDQWhDLFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVUwsUUFBVixFQUFvQixVQUFwQjtBQUNBakMsUUFBRSxDQUFDdUMsYUFBSCxDQUFpQkwsTUFBakIsRUFBeUIsUUFBekI7QUFDQU0sV0FBSyxDQUFDQyxPQUFOLENBQWNOLElBQWQsSUFDSW5DLEVBQUUsQ0FBQzBDLFlBQUgsQ0FBZ0JQLElBQWhCLEVBQXNCLE1BQXRCLENBREosR0FFSW5DLEVBQUUsQ0FBQ3VDLGFBQUgsQ0FBaUJKLElBQWpCLEVBQXVCLE1BQXZCLENBRko7QUFJQW5DLFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVSxLQUFLdEIsR0FBZixFQUFvQixVQUFwQjtBQUVBLFVBQUkyQixPQUFPLGFBQU0sS0FBSzNCLEdBQVgsTUFBWDs7QUFFQSxVQUFJb0IsS0FBSyxLQUFLLEtBQWQsRUFBcUI7QUFDbkJPLGVBQU8sY0FBTyxLQUFLMUIsR0FBWixNQUFQO0FBQ0Q7O0FBRUQsVUFBTTJCLGNBQWMsR0FBRztBQUNyQjVCLFdBQUcsRUFBRWlCLFFBRGdCO0FBRXJCRCxjQUFNLEVBQU5BLE1BRnFCO0FBR3JCVyxlQUFPLEVBQVBBLE9BSHFCO0FBSXJCVCxjQUFNLEVBQU5BLE1BSnFCO0FBS3JCQyxZQUFJLEVBQUpBO0FBTHFCLE9BQXZCOztBQVFBLFVBQ0UsS0FBS2pDLEtBQUwsSUFDQSxPQUFPLEtBQUtBLEtBQVosS0FBc0IsUUFEdEIsSUFFQSxLQUFLQSxLQUFMLENBQVcyQyxNQUFYLEdBQW9CLENBSHRCLEVBSUU7QUFDQUQsc0JBQWMsQ0FBQ1AsT0FBZixHQUF5QkEsT0FBekI7QUFDQU8sc0JBQWMsQ0FBQ1AsT0FBZixDQUF1QlMsYUFBdkIsb0JBQWlELEtBQUs1QyxLQUF0RDtBQUNEOztBQUVELGFBQU8sS0FBS04sS0FBTCxDQUNKbUMsT0FESSxDQUNJYSxjQURKLEVBRUpHLElBRkksQ0FFQyxVQUFBQyxHQUFHO0FBQUEsZUFBSUEsR0FBRyxDQUFDYixJQUFSO0FBQUEsT0FGSixFQUdKWSxJQUhJLENBR0MsVUFBQVosSUFBSSxFQUFJO0FBQ1osWUFBSSxDQUFDQSxJQUFELElBQVNBLElBQUksQ0FBQ1UsTUFBTCxLQUFnQixDQUE3QixFQUFnQyxPQUFPVixJQUFQOztBQUVoQyxZQUFJLFFBQU9BLElBQVAsTUFBZ0IsUUFBcEIsRUFBOEI7QUFDNUIsY0FBSTtBQUNGLG1CQUFPMUIsSUFBSSxDQUFDQyxLQUFMLENBQVd5QixJQUFYLENBQVA7QUFDRCxXQUZELENBRUUsT0FBT2MsS0FBUCxFQUFjO0FBQ2Qsa0JBQU07QUFDSkMsa0JBQUksRUFBRSxJQURGO0FBRUpELG1CQUFLLEVBQUxBLEtBRkk7QUFHSmQsa0JBQUksRUFBSkE7QUFISSxhQUFOO0FBS0Q7QUFDRjs7QUFFRCxlQUFPQSxJQUFQO0FBQ0QsT0FuQkksRUFvQkpnQixLQXBCSSxDQW9CRSxVQUFBRixLQUFLLEVBQUk7QUFDZCxZQUFJQSxLQUFLLENBQUNHLFFBQVYsRUFBb0I7QUFDbEIsZ0JBQU1ILEtBQUssQ0FBQ0csUUFBTixDQUFlakIsSUFBZixDQUFvQmMsS0FBMUI7QUFDRCxTQUZELE1BRU8sSUFBSUEsS0FBSyxDQUFDQyxJQUFOLEtBQWUsSUFBbkIsRUFBeUI7QUFDOUIsZ0JBQU07QUFDSjtBQUNBRyxnQkFBSSxFQUFFLENBQUMsQ0FGSDtBQUdKQyxtQkFBTyxFQUFFLDJCQUhMO0FBSUpMLGlCQUFLLEVBQUVBLEtBQUssQ0FBQ0EsS0FKVDtBQUtKZCxnQkFBSSxFQUFFYyxLQUFLLENBQUNkO0FBTFIsV0FBTjtBQU9ELFNBUk0sTUFRQTtBQUNMLGdCQUFNO0FBQ0o7QUFDQWtCLGdCQUFJLEVBQUUsQ0FBQyxDQUZIO0FBR0pDLG1CQUFPLEVBQUUsZUFITDtBQUlKTCxpQkFBSyxFQUFMQTtBQUpJLFdBQU47QUFNRDtBQUNGLE9BdkNJLENBQVA7QUF3Q0QsS0FuSUk7O0FBcUlMOzs7Ozs7QUFNQU0sT0EzSUssZUEySUR0QixRQTNJQyxFQTJJc0I7QUFBQSxVQUFiQyxNQUFhLHVFQUFKLEVBQUk7QUFDekJsQyxRQUFFLENBQUNzQyxNQUFILENBQVVMLFFBQVYsRUFBb0IsVUFBcEI7QUFDQWpDLFFBQUUsQ0FBQ3VDLGFBQUgsQ0FBaUJMLE1BQWpCLEVBQXlCLFFBQXpCO0FBRUEsYUFBTyxLQUFLSCxPQUFMLENBQWEsS0FBYixFQUFvQkUsUUFBcEIsRUFBOEJDLE1BQTlCLENBQVA7QUFDRCxLQWhKSTs7QUFrSkw7Ozs7OztBQU1Bc0IsUUF4SkssZ0JBd0pBdkIsUUF4SkEsRUF3SmtDO0FBQUEsVUFBeEJ3QixJQUF3Qix1RUFBakIsRUFBaUI7QUFBQSxVQUFidkIsTUFBYSx1RUFBSixFQUFJO0FBQ3JDbEMsUUFBRSxDQUFDc0MsTUFBSCxDQUFVTCxRQUFWLEVBQW9CLFVBQXBCO0FBQ0FPLFdBQUssQ0FBQ0MsT0FBTixDQUFjZ0IsSUFBZCxJQUNJekQsRUFBRSxDQUFDMEMsWUFBSCxDQUFnQmUsSUFBaEIsRUFBc0IsTUFBdEIsQ0FESixHQUVJekQsRUFBRSxDQUFDdUMsYUFBSCxDQUFpQmtCLElBQWpCLEVBQXVCLE1BQXZCLENBRko7QUFJQSxhQUFPLEtBQUsxQixPQUFMLENBQWEsTUFBYixFQUFxQkUsUUFBckIsRUFBK0JDLE1BQS9CLEVBQXVDdUIsSUFBdkMsQ0FBUDtBQUNELEtBL0pJOztBQWlLTDs7Ozs7O0FBTUFDLFNBdktLLGlCQXVLQ3pCLFFBdktELEVBdUttQztBQUFBLFVBQXhCd0IsSUFBd0IsdUVBQWpCLEVBQWlCO0FBQUEsVUFBYnZCLE1BQWEsdUVBQUosRUFBSTtBQUN0Q2xDLFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVUwsUUFBVixFQUFvQixVQUFwQjtBQUNBTyxXQUFLLENBQUNDLE9BQU4sQ0FBY2dCLElBQWQsSUFDSXpELEVBQUUsQ0FBQzBDLFlBQUgsQ0FBZ0JlLElBQWhCLEVBQXNCLE1BQXRCLENBREosR0FFSXpELEVBQUUsQ0FBQ3VDLGFBQUgsQ0FBaUJrQixJQUFqQixFQUF1QixNQUF2QixDQUZKO0FBSUEsYUFBTyxLQUFLMUIsT0FBTCxDQUFhLE9BQWIsRUFBc0JFLFFBQXRCLEVBQWdDQyxNQUFoQyxFQUF3Q3VCLElBQXhDLENBQVA7QUFDRCxLQTlLSTs7QUFnTEw7Ozs7OztBQU1BRSxPQXRMSyxlQXNMRDFCLFFBdExDLEVBc0xpQztBQUFBLFVBQXhCd0IsSUFBd0IsdUVBQWpCLEVBQWlCO0FBQUEsVUFBYnZCLE1BQWEsdUVBQUosRUFBSTtBQUNwQ2xDLFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVUwsUUFBVixFQUFvQixVQUFwQjtBQUNBTyxXQUFLLENBQUNDLE9BQU4sQ0FBY2dCLElBQWQsSUFDSXpELEVBQUUsQ0FBQzBDLFlBQUgsQ0FBZ0JlLElBQWhCLEVBQXNCLE1BQXRCLENBREosR0FFSXpELEVBQUUsQ0FBQ3VDLGFBQUgsQ0FBaUJrQixJQUFqQixFQUF1QixNQUF2QixDQUZKO0FBSUEsYUFBTyxLQUFLMUIsT0FBTCxDQUFhLEtBQWIsRUFBb0JFLFFBQXBCLEVBQThCQyxNQUE5QixFQUFzQ3VCLElBQXRDLENBQVA7QUFDRCxLQTdMSTs7QUErTEw7Ozs7O0FBS0FHLFVBcE1LLG1CQW9NRTNCLFFBcE1GLEVBb01ZO0FBQ2ZqQyxRQUFFLENBQUNzQyxNQUFILENBQVVMLFFBQVYsRUFBb0IsVUFBcEI7QUFFQSxhQUFPLEtBQUtGLE9BQUwsQ0FBYSxRQUFiLEVBQXVCRSxRQUF2QixDQUFQO0FBQ0QsS0F4TUk7QUEwTUw7QUFDQTs7QUFFQTs7Ozs7Ozs7QUFRQTs7Ozs7Ozs7Ozs7QUFXQTRCLFNBaE9LLGlCQWdPQ0MsV0FoT0QsRUFnT2M7QUFBQTs7QUFDakI5RCxRQUFFLENBQUMrRCxNQUFILENBQVVELFdBQVYsRUFBdUIsYUFBdkI7QUFDQTlELFFBQUUsQ0FBQ2dFLGNBQUgsQ0FBa0JGLFdBQWxCLEVBQStCLENBQUMsT0FBRCxFQUFVLFVBQVYsQ0FBL0IsRUFBc0QsYUFBdEQ7QUFFQSxXQUFLNUQsS0FBTCxHQUFhLElBQWI7O0FBRUEsVUFBSUYsRUFBRSxDQUFDaUUsaUJBQUgsQ0FBcUJILFdBQXJCLEVBQWtDLENBQUMsS0FBRCxDQUFsQyxDQUFKLEVBQWdEO0FBQzlDLGFBQUs5QyxHQUFMLEdBQVc4QyxXQUFXLENBQUM5QyxHQUF2QjtBQUNEOztBQUVELFVBQUloQixFQUFFLENBQUNpRSxpQkFBSCxDQUFxQkgsV0FBckIsRUFBa0MsQ0FBQyxLQUFELENBQWxDLENBQUosRUFBZ0Q7QUFDOUMsYUFBSzdDLEdBQUwsR0FBVzZDLFdBQVcsQ0FBQzdDLEdBQXZCO0FBQ0Q7O0FBRUQsVUFBSTZDLFdBQVcsQ0FBQ0ksT0FBaEIsRUFBeUI7QUFDdkIsYUFBS0MsYUFBTDtBQUNEOztBQUVELGFBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxhQUFJLENBQUNkLElBQUwsQ0FBVSxvQkFBVixFQUFnQztBQUM5QmUsZUFBSyxFQUFFVCxXQUFXLENBQUNTLEtBRFc7QUFFOUJDLGtCQUFRLEVBQUVWLFdBQVcsQ0FBQ1U7QUFGUSxTQUFoQyxFQUlHekIsSUFKSCxDQUlRLFVBQUFDLEdBQUc7QUFBQSxpQkFBSUEsR0FBRyxDQUFDYixJQUFKLENBQVNqQyxLQUFiO0FBQUEsU0FKWCxFQUtHNkMsSUFMSCxDQUtRLFVBQUE3QyxLQUFLLEVBQUk7QUFDYixlQUFJLENBQUNBLEtBQUwsR0FBYUEsS0FBYjtBQUNBbUUsaUJBQU8sQ0FBQztBQUNOckQsZUFBRyxFQUFFLEtBQUksQ0FBQ0EsR0FESjtBQUVOQyxlQUFHLEVBQUUsS0FBSSxDQUFDQSxHQUZKO0FBR05mLGlCQUFLLEVBQUUsS0FBSSxDQUFDQTtBQUhOLFdBQUQsQ0FBUDtBQUtELFNBWkgsRUFhR2lELEtBYkgsQ0FhU21CLE1BYlQ7QUFjRCxPQWZNLENBQVA7QUFnQkQsS0FsUUk7O0FBb1FMOzs7QUFHQUcsVUF2UUssb0JBdVFJO0FBQ1AsV0FBS3ZFLEtBQUwsR0FBYSxJQUFiO0FBQ0EsV0FBS2UsR0FBTCxHQUFXLEdBQVg7QUFDQSxXQUFLRCxHQUFMLEdBQVcsSUFBWDs7QUFFQSxVQUFJLEtBQUtNLGVBQVQsRUFBMEI7QUFDeEIsYUFBS29ELFlBQUw7QUFDRDtBQUNGLEtBL1FJOztBQWlSTDs7OztBQUlBUCxpQkFyUksseUJBcVJTUSxlQXJSVCxFQXFSMEI7QUFDN0IsVUFBSUEsZUFBSixFQUFxQixLQUFLQyxlQUFMO0FBQ3JCLFdBQUt0RCxlQUFMLEdBQXVCdUQsV0FBVyxDQUNoQyxLQUFLRCxlQUFMLENBQXFCRSxJQUFyQixDQUEwQixJQUExQixDQURnQyxFQUVoQyxLQUZnQyxDQUFsQztBQUlELEtBM1JJOztBQTZSTDs7O0FBR0FKLGdCQWhTSywwQkFnU1U7QUFDYkssbUJBQWEsQ0FBQyxLQUFLekQsZUFBTixDQUFiO0FBQ0EsV0FBS0EsZUFBTCxHQUF1QixJQUF2QjtBQUNELEtBblNJOztBQXFTTDs7Ozs7O0FBTUFzRCxtQkEzU0ssNkJBMlNhO0FBQUE7O0FBQ2hCLFVBQUksQ0FBQzVFLEVBQUUsQ0FBQ2dGLGFBQUgsQ0FBaUIsSUFBakIsRUFBdUIsQ0FBQyxPQUFELEVBQVUsS0FBVixFQUFpQixLQUFqQixDQUF2QixDQUFMLEVBQXNEO0FBQ3RELFVBQUksQ0FBQyxLQUFLdkQsT0FBTixJQUFpQixDQUFDLEtBQUtBLE9BQUwsQ0FBYWIsR0FBbkMsRUFBd0M7QUFFeEMsVUFBTXFFLFFBQVEsR0FBRyxLQUFLeEQsT0FBTCxDQUFhYixHQUFiLENBQWlCaUIsT0FBakIsS0FBNkJoQixJQUFJLENBQUNpQixHQUFMLEVBQTlDOztBQUVBLFVBQUltRCxRQUFRLElBQUksQ0FBaEIsRUFBbUI7QUFDakIsWUFBSWpGLEVBQUUsQ0FBQ2tGLFVBQUgsQ0FBYyxLQUFLM0Qsa0JBQW5CLENBQUosRUFBNEM7QUFDMUMsZUFBS0Esa0JBQUwsQ0FBd0I7QUFDdEIrQixtQkFBTyxFQUFFLG9CQURhO0FBRXRCRCxnQkFBSSxFQUFFO0FBRmdCLFdBQXhCO0FBSUQ7O0FBQ0Q7QUFDRDs7QUFFRCxVQUFJNEIsUUFBUSxHQUFHLEtBQWYsRUFBc0I7QUFDcEIsYUFBS0UsT0FBTCxDQUFhLEtBQUtqRixLQUFsQixFQUNHNkMsSUFESCxDQUNRLFVBQUFDLEdBQUcsRUFBSTtBQUNYLGdCQUFJLENBQUM5QyxLQUFMLEdBQWE4QyxHQUFHLENBQUNiLElBQUosQ0FBU2pDLEtBQXRCOztBQUNBLGNBQUlGLEVBQUUsQ0FBQ2tGLFVBQUgsQ0FBYyxNQUFJLENBQUMxRCxvQkFBbkIsQ0FBSixFQUE4QztBQUM1QyxrQkFBSSxDQUFDQSxvQkFBTCxDQUEwQjtBQUN4QlIsaUJBQUcsRUFBRSxNQUFJLENBQUNBLEdBRGM7QUFFeEJDLGlCQUFHLEVBQUUsTUFBSSxDQUFDQSxHQUZjO0FBR3hCZixtQkFBSyxFQUFFLE1BQUksQ0FBQ0E7QUFIWSxhQUExQjtBQUtEO0FBQ0YsU0FWSCxFQVdHaUQsS0FYSCxDQVdTLFVBQUFGLEtBQUssRUFBSTtBQUNkLGNBQUlqRCxFQUFFLENBQUNrRixVQUFILENBQWMsTUFBSSxDQUFDM0Qsa0JBQW5CLENBQUosRUFBNEM7QUFDMUMsa0JBQUksQ0FBQ0Esa0JBQUwsQ0FBd0IwQixLQUF4QjtBQUNEO0FBQ0YsU0FmSDtBQWdCRDtBQUNGLEtBN1VJOztBQStVTDs7Ozs7QUFLQWtDLFdBcFZLLG1CQW9WR2pGLEtBcFZILEVBb1ZVO0FBQ2JGLFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVXBDLEtBQVYsRUFBaUIsT0FBakI7QUFDQSxhQUFPLEtBQUtzRCxJQUFMLENBQVUsZUFBVixFQUEyQjtBQUFFdEQsYUFBSyxFQUFMQTtBQUFGLE9BQTNCLENBQVA7QUFDRCxLQXZWSTs7QUF5Vkw7Ozs7Ozs7QUFPQWtGLHdCQWhXSyxnQ0FnV2dCYixLQWhXaEIsRUFnV3VCO0FBQzFCdkUsUUFBRSxDQUFDc0MsTUFBSCxDQUFVaUMsS0FBVixFQUFpQixPQUFqQjtBQUNBLGFBQU8sS0FBS2YsSUFBTCxDQUFVLHFCQUFWLEVBQWlDO0FBQ3RDZSxhQUFLLEVBQUxBLEtBRHNDO0FBRXRDYyxnQkFBUSxFQUFFLEtBQUtyRTtBQUZ1QixPQUFqQyxDQUFQO0FBSUQsS0F0V0k7QUF3V0w7QUFDQTs7QUFFQTs7Ozs7QUFLQXNFLGVBaFhLLHlCQWdYb0I7QUFBQSxVQUFicEQsTUFBYSx1RUFBSixFQUFJO0FBQ3ZCbEMsUUFBRSxDQUFDdUMsYUFBSCxDQUFpQkwsTUFBakIsRUFBeUIsUUFBekI7QUFDQSxhQUFPLEtBQUtxQixHQUFMLENBQVMsV0FBVCxFQUFzQnJCLE1BQXRCLENBQVA7QUFDRCxLQW5YSTtBQXFYTDtBQUNBOztBQUVBOzs7OztBQUtBcUQsa0JBN1hLLDRCQTZYdUI7QUFBQSxVQUFickQsTUFBYSx1RUFBSixFQUFJO0FBQzFCbEMsUUFBRSxDQUFDc0MsTUFBSCxDQUFVLEtBQUtwQyxLQUFmLEVBQXNCLFlBQXRCO0FBQ0FGLFFBQUUsQ0FBQ3VDLGFBQUgsQ0FBaUJMLE1BQWpCO0FBQ0EsYUFBT2tDLE9BQU8sQ0FBQ29CLEdBQVIsQ0FBWSxDQUNqQixLQUFLakMsR0FBTCxDQUFTLHFCQUFULEVBQWdDO0FBQzlCLGdDQUF3QixDQURNO0FBRTlCLDRCQUFvQixLQUFLOUIsT0FBTCxDQUFhZ0U7QUFGSCxPQUFoQyxDQURpQixFQUtqQixLQUFLbEMsR0FBTCxDQUFTLHFCQUFULEVBQWdDO0FBQzlCLGdDQUF3QixDQURNO0FBRTlCLDRCQUFvQixLQUFLOUIsT0FBTCxDQUFhaUUsSUFGSDtBQUc5Qiw4QkFBc0I7QUFIUSxPQUFoQyxDQUxpQixDQUFaLEVBVUozQyxJQVZJLENBVUMsVUFBQTRDLE1BQU0sRUFBSTtBQUFBLHFDQUNLQSxNQURMO0FBQUEsWUFDVEMsSUFEUztBQUFBLFlBQ0hGLElBREcsZUFDYTs7O0FBQzdCLGtDQUFXRSxJQUFJLENBQUN6RCxJQUFoQiw0QkFBeUJ1RCxJQUFJLENBQUN2RCxJQUE5QjtBQUNELE9BYk0sQ0FBUDtBQWNELEtBOVlJO0FBZ1pMO0FBQ0E7O0FBRUE7Ozs7O0FBS0EwRCxrQkF4WkssNEJBd1p1QjtBQUFBLFVBQWIzRCxNQUFhLHVFQUFKLEVBQUk7QUFDMUJsQyxRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsQ0FBUyxjQUFULEVBQXlCckIsTUFBekIsQ0FBUDtBQUNELEtBM1pJOztBQTZaTDs7Ozs7O0FBTUE0RCxpQkFuYUsseUJBbWFTQyxVQW5hVCxFQW1ha0M7QUFBQSxVQUFiN0QsTUFBYSx1RUFBSixFQUFJO0FBQ3JDbEMsUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUQsVUFBVixFQUFzQixZQUF0QjtBQUNBL0YsUUFBRSxDQUFDdUMsYUFBSCxDQUFpQkwsTUFBakIsRUFBeUIsUUFBekI7QUFDQSxhQUFPLEtBQUtxQixHQUFMLHdCQUF5QndDLFVBQXpCLEdBQXVDN0QsTUFBdkMsQ0FBUDtBQUNELEtBdmFJOztBQXlhTDs7Ozs7QUFLQThELG9CQTlhSyw0QkE4YVk3RCxJQTlhWixFQThha0I7QUFDckJuQyxRQUFFLENBQUMrRCxNQUFILENBQVU1QixJQUFWLEVBQWdCLE1BQWhCO0FBQ0EsYUFBTyxLQUFLcUIsSUFBTCxDQUFVLGNBQVYsRUFBMEJyQixJQUExQixDQUFQO0FBQ0QsS0FqYkk7O0FBbWJMOzs7OztBQUtBOEQsb0JBeGJLLDRCQXdiWUYsVUF4YlosRUF3YndCNUQsSUF4YnhCLEVBd2I4QjtBQUNqQ25DLFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVXlELFVBQVYsRUFBc0IsWUFBdEI7QUFDQS9GLFFBQUUsQ0FBQytELE1BQUgsQ0FBVTVCLElBQVYsRUFBZ0IsTUFBaEI7QUFDQSxhQUFPLEtBQUt1QixLQUFMLHdCQUEyQnFDLFVBQTNCLEdBQXlDNUQsSUFBekMsQ0FBUDtBQUNELEtBNWJJOztBQThiTDs7OztBQUlBK0Qsb0JBbGNLLDRCQWtjWUgsVUFsY1osRUFrY3dCO0FBQzNCL0YsUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUQsVUFBVixFQUFzQixZQUF0QjtBQUNBLGFBQU8sS0FBS25DLE1BQUwsd0JBQTRCbUMsVUFBNUIsRUFBUDtBQUNELEtBcmNJO0FBdWNMO0FBQ0E7O0FBRUE7Ozs7O0FBS0FJLDBCQS9jSyxrQ0ErY2tCaEUsSUEvY2xCLEVBK2N3QjtBQUMzQm5DLFFBQUUsQ0FBQytELE1BQUgsQ0FBVTVCLElBQVY7QUFDQSxhQUFPLEtBQUtxQixJQUFMLENBQVUscUJBQVYsRUFBaUNyQixJQUFqQyxDQUFQO0FBQ0QsS0FsZEk7O0FBb2RMOzs7OztBQUtBaUUsMEJBemRLLGtDQXlka0JDLFVBemRsQixFQXlkOEJsRSxJQXpkOUIsRUF5ZG9DO0FBQ3ZDbkMsUUFBRSxDQUFDc0csT0FBSCxDQUFXRCxVQUFYLEVBQXVCLFlBQXZCO0FBQ0FyRyxRQUFFLENBQUMrRCxNQUFILENBQVU1QixJQUFWLEVBQWdCLE1BQWhCO0FBRUEsYUFBTyxLQUFLdUIsS0FBTCwrQkFBa0MyQyxVQUFsQyxHQUFnRGxFLElBQWhELENBQVA7QUFDRCxLQTlkSTs7QUFnZUw7Ozs7QUFJQW9FLDBCQXBlSyxrQ0FvZWtCRixVQXBlbEIsRUFvZThCO0FBQ2pDckcsUUFBRSxDQUFDc0csT0FBSCxDQUFXRCxVQUFYLEVBQXVCLFlBQXZCO0FBQ0EsYUFBTyxLQUFLekMsTUFBTCwrQkFBbUN5QyxVQUFuQyxFQUFQO0FBQ0QsS0F2ZUk7QUF5ZUw7QUFDQTs7QUFFQTs7OztBQUlBRyxpQkFoZkssMkJBZ2ZXO0FBQ2QsYUFBTyxLQUFLekUsT0FBTCxDQUFhLEtBQWIsRUFBb0IsYUFBcEIsRUFBbUMsRUFBbkMsRUFBdUMsRUFBdkMsRUFBMkMsSUFBM0MsQ0FBUDtBQUNELEtBbGZJOztBQW9mTDs7OztBQUlBMEUsY0F4Zkssd0JBd2ZRO0FBQ1gsYUFBTyxLQUFLMUUsT0FBTCxDQUFhLEtBQWIsRUFBb0IsVUFBcEIsRUFBZ0MsRUFBaEMsRUFBb0MsRUFBcEMsRUFBd0MsSUFBeEMsQ0FBUDtBQUNELEtBMWZJOztBQTRmTDs7OztBQUlBMkUsWUFoZ0JLLHNCQWdnQk07QUFDVCxhQUFPLEtBQUszRSxPQUFMLENBQWEsS0FBYixFQUFvQixRQUFwQixFQUE4QixFQUE5QixFQUFrQyxFQUFsQyxFQUFzQyxJQUF0QyxDQUFQO0FBQ0QsS0FsZ0JJO0FBb2dCTDtBQUNBOztBQUVBOzs7OztBQUtBNEUsZ0JBNWdCSywwQkE0Z0JxQjtBQUFBLFVBQWJ6RSxNQUFhLHVFQUFKLEVBQUk7QUFDeEJsQyxRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsQ0FBUyxTQUFULEVBQW9CckIsTUFBcEIsQ0FBUDtBQUNELEtBL2dCSTs7QUFpaEJMOzs7Ozs7QUFNQTBFLGFBdmhCSyxxQkF1aEJLYixVQXZoQkwsRUF1aEI4QjtBQUFBLFVBQWI3RCxNQUFhLHVFQUFKLEVBQUk7QUFDakNsQyxRQUFFLENBQUNzQyxNQUFILENBQVV5RCxVQUFWLEVBQXNCLFlBQXRCO0FBQ0EvRixRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsbUJBQW9Cd0MsVUFBcEIsR0FBa0M3RCxNQUFsQyxDQUFQO0FBQ0QsS0EzaEJJOztBQTZoQkw7Ozs7Ozs7QUFPQTJFLFlBcGlCSyxvQkFvaUJJZCxVQXBpQkosRUFvaUJnQmUsU0FwaUJoQixFQW9pQndDO0FBQUEsVUFBYjVFLE1BQWEsdUVBQUosRUFBSTtBQUMzQ2xDLFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVXlELFVBQVYsRUFBc0IsWUFBdEI7QUFDQS9GLFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVXdFLFNBQVYsRUFBcUIsV0FBckI7QUFDQTlHLFFBQUUsQ0FBQ3VDLGFBQUgsQ0FBaUJMLE1BQWpCLEVBQXlCLFFBQXpCO0FBQ0EsYUFBTyxLQUFLcUIsR0FBTCxtQkFBb0J3QyxVQUFwQixjQUFrQ2UsU0FBbEMsR0FBK0M1RSxNQUEvQyxDQUFQO0FBQ0QsS0F6aUJJOztBQTJpQkw7Ozs7OztBQU1BNkUsZUFqakJLLHVCQWlqQk9oQixVQWpqQlAsRUFpakJtQmlCLFNBampCbkIsRUFpakI4QjtBQUNqQ2hILFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVXlELFVBQVYsRUFBc0IsWUFBdEI7QUFDQS9GLFFBQUUsQ0FBQytELE1BQUgsQ0FBVWlELFNBQVYsRUFBcUIsV0FBckI7QUFDQSxhQUFPLEtBQUt4RCxJQUFMLG1CQUFxQnVDLFVBQXJCLEdBQW1DaUIsU0FBbkMsQ0FBUDtBQUNELEtBcmpCSTs7QUF1akJMOzs7Ozs7O0FBT0FDLGVBOWpCSyx1QkE4akJPbEIsVUE5akJQLEVBOGpCbUJlLFNBOWpCbkIsRUE4akI4QkUsU0E5akI5QixFQThqQnlDO0FBQzVDaEgsUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUQsVUFBVixFQUFzQixZQUF0QjtBQUNBL0YsUUFBRSxDQUFDc0MsTUFBSCxDQUFVd0UsU0FBVixFQUFxQixXQUFyQjtBQUNBOUcsUUFBRSxDQUFDK0QsTUFBSCxDQUFVaUQsU0FBVixFQUFxQixXQUFyQjtBQUNBLGFBQU8sS0FBS3RELEtBQUwsbUJBQXNCcUMsVUFBdEIsY0FBb0NlLFNBQXBDLEdBQWlERSxTQUFqRCxDQUFQO0FBQ0QsS0Fua0JJOztBQXFrQkw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThCQUUsZ0JBbm1CSyx3QkFtbUJRbkIsVUFubUJSLEVBbW1Cb0JvQixzQkFubUJwQixFQW1tQjhEO0FBQUEsVUFBbEJILFNBQWtCLHVFQUFOLElBQU07QUFDakVoSCxRQUFFLENBQUNzQyxNQUFILENBQVV5RCxVQUFWLEVBQXNCLFlBQXRCO0FBQ0EvRixRQUFFLENBQUNvSCxLQUFILENBQVNELHNCQUFULEVBQWlDLHdCQUFqQzs7QUFFQSxVQUFJSCxTQUFKLEVBQWU7QUFDYmhILFVBQUUsQ0FBQytELE1BQUgsQ0FBVWlELFNBQVY7QUFDRDs7QUFFRCxVQUFJQSxTQUFKLEVBQWU7QUFDYixlQUFPLEtBQUt0RCxLQUFMLG1CQUNNcUMsVUFETixjQUNvQm9CLHNCQUFzQixDQUFDRSxJQUF2QixDQUE0QixHQUE1QixDQURwQixHQUVMTCxTQUZLLENBQVA7QUFJRDs7QUFFRCxhQUFPLEtBQUt0RCxLQUFMLG1CQUFzQnFDLFVBQXRCLEdBQW9Db0Isc0JBQXBDLENBQVA7QUFDRCxLQW5uQkk7O0FBcW5CTDs7Ozs7O0FBTUFHLGVBM25CSyx1QkEybkJPdkIsVUEzbkJQLEVBMm5CbUJlLFNBM25CbkIsRUEybkI4QjtBQUNqQzlHLFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVXlELFVBQVYsRUFBc0IsWUFBdEI7QUFDQS9GLFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVXdFLFNBQVYsRUFBcUIsV0FBckI7QUFDQSxhQUFPLEtBQUtsRCxNQUFMLG1CQUF1Qm1DLFVBQXZCLGNBQXFDZSxTQUFyQyxFQUFQO0FBQ0QsS0EvbkJJO0FBaW9CTDtBQUNBOztBQUVBOzs7OztBQUtBUyxlQXpvQkssdUJBeW9CT3BGLElBem9CUCxFQXlvQjBDO0FBQUEsVUFBN0JxRixnQkFBNkIsdUVBQVYsWUFBTSxDQUFFLENBQUU7QUFDN0MsVUFBTW5GLE9BQU8sR0FBRztBQUNkLHdCQUFnQixxQkFERjtBQUVkUyxxQkFBYSxtQkFBWSxLQUFLNUMsS0FBakI7QUFGQyxPQUFoQjtBQUtBLGFBQU8sS0FBS04sS0FBTCxDQUNKNEQsSUFESSxXQUNJLEtBQUt4QyxHQURULGNBQ2dCLEtBQUtDLEdBRHJCLGFBQ2tDa0IsSUFEbEMsRUFDd0M7QUFDM0NFLGVBQU8sRUFBUEEsT0FEMkM7QUFFM0NtRix3QkFBZ0IsRUFBaEJBO0FBRjJDLE9BRHhDLEVBS0p6RSxJQUxJLENBS0MsVUFBQUMsR0FBRztBQUFBLGVBQUlBLEdBQUcsQ0FBQ2IsSUFBUjtBQUFBLE9BTEosRUFNSmdCLEtBTkksQ0FNRSxVQUFBRixLQUFLLEVBQUk7QUFDZCxZQUFJQSxLQUFLLENBQUNHLFFBQVYsRUFBb0I7QUFDbEIsZ0JBQU1ILEtBQUssQ0FBQ0csUUFBTixDQUFlakIsSUFBZixDQUFvQmMsS0FBMUI7QUFDRCxTQUZELE1BRU87QUFDTCxnQkFBTTtBQUNKO0FBQ0FJLGdCQUFJLEVBQUUsQ0FBQyxDQUZIO0FBR0pDLG1CQUFPLEVBQUUsZUFITDtBQUlKTCxpQkFBSyxFQUFMQTtBQUpJLFdBQU47QUFNRDtBQUNGLE9BakJJLENBQVA7QUFrQkQsS0FqcUJJO0FBbXFCTDtBQUNBOztBQUVBOzs7Ozs7O0FBT0F3RSxjQTdxQkssc0JBNnFCTTFCLFVBN3FCTixFQTZxQmtCTSxVQTdxQmxCLEVBNnFCOEI1QyxJQTdxQjlCLEVBNnFCb0M7QUFDdkN6RCxRQUFFLENBQUNzQyxNQUFILENBQVV5RCxVQUFWLEVBQXNCLFlBQXRCO0FBQ0EvRixRQUFFLENBQUNzRyxPQUFILENBQVdELFVBQVgsRUFBdUIsWUFBdkI7QUFDQXJHLFFBQUUsQ0FBQytELE1BQUgsQ0FBVU4sSUFBVixFQUFnQixNQUFoQjs7QUFFQSxVQUFJc0MsVUFBVSxDQUFDMkIsVUFBWCxDQUFzQixXQUF0QixDQUFKLEVBQXdDO0FBQ3RDLGVBQU8sS0FBS2hFLEtBQUwsWUFBZXFDLFVBQVUsQ0FBQzRCLFNBQVgsQ0FBcUIsQ0FBckIsQ0FBZixjQUEwQ3RCLFVBQTFDLEdBQXdENUMsSUFBeEQsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBS0MsS0FBTCxrQkFBcUJxQyxVQUFyQixjQUFtQ00sVUFBbkMsR0FBaUQ1QyxJQUFqRCxDQUFQO0FBQ0QsS0F2ckJJOztBQXlyQkw7Ozs7OztBQU1BbUUsZUEvckJLLHVCQStyQk83QixVQS9yQlAsRUErckJtQnRDLElBL3JCbkIsRUErckJ5QjtBQUM1QnpELFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVXlELFVBQVYsRUFBc0IsWUFBdEI7QUFDQS9GLFFBQUUsQ0FBQ29ILEtBQUgsQ0FBUzNELElBQVQsRUFBZSxNQUFmOztBQUVBLFVBQUlzQyxVQUFVLENBQUMyQixVQUFYLENBQXNCLFdBQXRCLENBQUosRUFBd0M7QUFDdEMsZUFBTyxLQUFLaEUsS0FBTCxZQUFlcUMsVUFBVSxDQUFDNEIsU0FBWCxDQUFxQixDQUFyQixDQUFmLEdBQTBDbEUsSUFBMUMsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBS0MsS0FBTCxrQkFBcUJxQyxVQUFyQixHQUFtQ3RDLElBQW5DLENBQVA7QUFDRCxLQXhzQkk7O0FBMHNCTDs7Ozs7O0FBTUFvRSxjQWh0Qkssc0JBZ3RCTTlCLFVBaHRCTixFQWd0QmtCdEMsSUFodEJsQixFQWd0QndCO0FBQzNCekQsUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUQsVUFBVixFQUFzQixZQUF0QjtBQUNBL0YsUUFBRSxDQUFDK0QsTUFBSCxDQUFVTixJQUFWLEVBQWdCLE1BQWhCOztBQUVBLFVBQUlzQyxVQUFVLENBQUMyQixVQUFYLENBQXNCLFdBQXRCLENBQUosRUFBd0M7QUFDdEMsZUFBTyxLQUFLbEUsSUFBTCxZQUFjdUMsVUFBVSxDQUFDNEIsU0FBWCxDQUFxQixDQUFyQixDQUFkLEdBQXlDbEUsSUFBekMsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBS0QsSUFBTCxrQkFBb0J1QyxVQUFwQixHQUFrQ3RDLElBQWxDLENBQVA7QUFDRCxLQXp0Qkk7O0FBMnRCTDs7Ozs7O0FBTUFxRSxlQWp1QkssdUJBaXVCTy9CLFVBanVCUCxFQWl1Qm1CdEMsSUFqdUJuQixFQWl1QnlCO0FBQzVCekQsUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUQsVUFBVixFQUFzQixZQUF0QjtBQUNBL0YsUUFBRSxDQUFDb0gsS0FBSCxDQUFTM0QsSUFBVCxFQUFlLE1BQWY7O0FBRUEsVUFBSXNDLFVBQVUsQ0FBQzJCLFVBQVgsQ0FBc0IsV0FBdEIsQ0FBSixFQUF3QztBQUN0QyxlQUFPLEtBQUtsRSxJQUFMLFlBQWN1QyxVQUFVLENBQUM0QixTQUFYLENBQXFCLENBQXJCLENBQWQsR0FBeUNsRSxJQUF6QyxDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLRCxJQUFMLGtCQUFvQnVDLFVBQXBCLEdBQWtDdEMsSUFBbEMsQ0FBUDtBQUNELEtBMXVCSTs7QUE0dUJMOzs7Ozs7QUFNQXNFLFlBbHZCSyxvQkFrdkJJaEMsVUFsdkJKLEVBa3ZCNkI7QUFBQSxVQUFiN0QsTUFBYSx1RUFBSixFQUFJO0FBQ2hDbEMsUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUQsVUFBVixFQUFzQixZQUF0QjtBQUNBL0YsUUFBRSxDQUFDdUMsYUFBSCxDQUFpQkwsTUFBakIsRUFBeUIsUUFBekI7O0FBRUEsVUFBSTZELFVBQVUsQ0FBQzJCLFVBQVgsQ0FBc0IsV0FBdEIsQ0FBSixFQUF3QztBQUN0QyxlQUFPLEtBQUtuRSxHQUFMLFlBQWF3QyxVQUFVLENBQUM0QixTQUFYLENBQXFCLENBQXJCLENBQWIsR0FBd0N6RixNQUF4QyxDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLcUIsR0FBTCxrQkFBbUJ3QyxVQUFuQixHQUFpQzdELE1BQWpDLENBQVA7QUFDRCxLQTN2Qkk7O0FBNnZCTDs7Ozs7OztBQU9BOEYsV0Fwd0JLLG1CQW93QkdqQyxVQXB3QkgsRUFvd0JlTSxVQXB3QmYsRUFvd0J3QztBQUFBLFVBQWJuRSxNQUFhLHVFQUFKLEVBQUk7QUFDM0NsQyxRQUFFLENBQUNzQyxNQUFILENBQVV5RCxVQUFWLEVBQXNCLFlBQXRCO0FBQ0EvRixRQUFFLENBQUNzRyxPQUFILENBQVdELFVBQVgsRUFBdUIsWUFBdkI7QUFDQXJHLFFBQUUsQ0FBQ3VDLGFBQUgsQ0FBaUJMLE1BQWpCLEVBQXlCLFFBQXpCOztBQUVBLFVBQUk2RCxVQUFVLENBQUMyQixVQUFYLENBQXNCLFdBQXRCLENBQUosRUFBd0M7QUFDdEMsZUFBTyxLQUFLbkUsR0FBTCxZQUFhd0MsVUFBVSxDQUFDNEIsU0FBWCxDQUFxQixDQUFyQixDQUFiLGNBQXdDdEIsVUFBeEMsR0FBc0RuRSxNQUF0RCxDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLcUIsR0FBTCxrQkFBbUJ3QyxVQUFuQixjQUFpQ00sVUFBakMsR0FBK0NuRSxNQUEvQyxDQUFQO0FBQ0QsS0E5d0JJOztBQWd4Qkw7Ozs7OztBQU1BK0YsY0F0eEJLLHNCQXN4Qk1sQyxVQXR4Qk4sRUFzeEJrQk0sVUF0eEJsQixFQXN4QjhCO0FBQ2pDckcsUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUQsVUFBVixFQUFzQixZQUF0QjtBQUNBL0YsUUFBRSxDQUFDc0csT0FBSCxDQUFXRCxVQUFYLEVBQXVCLFlBQXZCOztBQUVBLFVBQUlOLFVBQVUsQ0FBQzJCLFVBQVgsQ0FBc0IsV0FBdEIsQ0FBSixFQUF3QztBQUN0QyxlQUFPLEtBQUs5RCxNQUFMLFlBQWdCbUMsVUFBVSxDQUFDNEIsU0FBWCxDQUFxQixDQUFyQixDQUFoQixjQUEyQ3RCLFVBQTNDLEVBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUt6QyxNQUFMLGtCQUFzQm1DLFVBQXRCLGNBQW9DTSxVQUFwQyxFQUFQO0FBQ0QsS0EveEJJOztBQWl5Qkw7Ozs7OztBQU1BNkIsZUF2eUJLLHVCQXV5Qk9uQyxVQXZ5QlAsRUF1eUJtQm9DLFdBdnlCbkIsRUF1eUJnQztBQUNuQ25JLFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVXlELFVBQVYsRUFBc0IsWUFBdEI7QUFDQS9GLFFBQUUsQ0FBQ29ILEtBQUgsQ0FBU2UsV0FBVCxFQUFzQixhQUF0Qjs7QUFFQSxVQUFJcEMsVUFBVSxDQUFDMkIsVUFBWCxDQUFzQixXQUF0QixDQUFKLEVBQXdDO0FBQ3RDLGVBQU8sS0FBSzlELE1BQUwsWUFBZ0JtQyxVQUFVLENBQUM0QixTQUFYLENBQXFCLENBQXJCLENBQWhCLGNBQTJDUSxXQUFXLENBQUNkLElBQVosRUFBM0MsRUFBUDtBQUNEOztBQUVELGFBQU8sS0FBS3pELE1BQUwsa0JBQXNCbUMsVUFBdEIsY0FBb0NvQyxXQUFXLENBQUNkLElBQVosRUFBcEMsRUFBUDtBQUNELEtBaHpCSTtBQWt6Qkw7QUFDQTs7QUFFQTs7Ozs7O0FBTUFlLDJCQTN6QkssbUNBMnpCbUJyQyxVQTN6Qm5CLEVBMnpCNEM7QUFBQSxVQUFiN0QsTUFBYSx1RUFBSixFQUFJO0FBQy9DbEMsUUFBRSxDQUFDc0MsTUFBSCxDQUFVLEtBQUtwQyxLQUFmLEVBQXNCLFlBQXRCO0FBQ0FGLFFBQUUsQ0FBQ3VDLGFBQUgsQ0FBaUJMLE1BQWpCLEVBQXlCLFFBQXpCO0FBQ0EsYUFBT2tDLE9BQU8sQ0FBQ29CLEdBQVIsQ0FBWSxDQUNqQixLQUFLakMsR0FBTCxDQUFTLHFCQUFULEVBQWdDO0FBQzlCOEUsYUFBSyxFQUFFLENBRHVCO0FBRTlCLCtCQUF1QixDQUZPO0FBRzlCLGtDQUEwQnRDLFVBSEk7QUFJOUIsOEJBQXNCLENBSlE7QUFLOUIsOEJBQXNCLENBTFE7QUFNOUJ1QyxZQUFJLEVBQUU7QUFOd0IsT0FBaEMsQ0FEaUIsRUFTakIsS0FBSy9FLEdBQUwsQ0FBUyxxQkFBVCxFQUFnQztBQUM5QjhFLGFBQUssRUFBRSxDQUR1QjtBQUU5QiwrQkFBdUIsQ0FGTztBQUc5QixrQ0FBMEJ0QyxVQUhJO0FBSTlCLDRCQUFvQixLQUFLdEUsT0FBTCxDQUFhaUUsSUFKSDtBQUs5Qiw4QkFBc0IsQ0FMUTtBQU05QjRDLFlBQUksRUFBRTtBQU53QixPQUFoQyxDQVRpQixFQWlCakIsS0FBSy9FLEdBQUwsQ0FBUyxxQkFBVCxFQUFnQztBQUM5QjhFLGFBQUssRUFBRSxDQUR1QjtBQUU5QiwrQkFBdUIsQ0FGTztBQUc5QixrQ0FBMEJ0QyxVQUhJO0FBSTlCLDRCQUFvQixLQUFLdEUsT0FBTCxDQUFhaUUsSUFKSDtBQUs5Qiw0QkFBb0IsS0FBS2pFLE9BQUwsQ0FBYWdFLEVBTEg7QUFNOUI2QyxZQUFJLEVBQUU7QUFOd0IsT0FBaEMsQ0FqQmlCLENBQVosRUF5Qkp2RixJQXpCSSxDQXlCQyxVQUFBNEMsTUFBTSxFQUFJO0FBQUEsc0NBQ2lCQSxNQURqQjtBQUFBLFlBQ1RJLFVBRFM7QUFBQSxZQUNHTCxJQURIO0FBQUEsWUFDU0UsSUFEVCxnQkFDeUI7OztBQUN6QyxZQUFJQSxJQUFJLENBQUN6RCxJQUFMLElBQWF5RCxJQUFJLENBQUN6RCxJQUFMLENBQVVVLE1BQVYsR0FBbUIsQ0FBcEMsRUFBdUM7QUFDckMsaUJBQU8rQyxJQUFJLENBQUN6RCxJQUFMLENBQVUsQ0FBVixDQUFQO0FBQ0Q7O0FBQ0QsWUFBSXVELElBQUksQ0FBQ3ZELElBQUwsSUFBYXVELElBQUksQ0FBQ3ZELElBQUwsQ0FBVVUsTUFBVixHQUFtQixDQUFwQyxFQUF1QztBQUNyQyxpQkFBTzZDLElBQUksQ0FBQ3ZELElBQUwsQ0FBVSxDQUFWLENBQVA7QUFDRDs7QUFDRCxZQUFJNEQsVUFBVSxDQUFDNUQsSUFBWCxJQUFtQjRELFVBQVUsQ0FBQzVELElBQVgsQ0FBZ0JVLE1BQWhCLEdBQXlCLENBQWhELEVBQW1EO0FBQ2pELGlCQUFPa0QsVUFBVSxDQUFDNUQsSUFBWCxDQUFnQixDQUFoQixDQUFQO0FBQ0Q7O0FBQ0QsZUFBTyxFQUFQO0FBQ0QsT0FyQ00sQ0FBUDtBQXNDRCxLQXAyQkk7QUFzMkJMO0FBQ0E7O0FBRUE7Ozs7O0FBS0FvRyxrQkE5MkJLLDRCQTgyQnVCO0FBQUEsVUFBYnJHLE1BQWEsdUVBQUosRUFBSTtBQUMxQmxDLFFBQUUsQ0FBQ3VDLGFBQUgsQ0FBaUJMLE1BQWpCLEVBQXlCLFFBQXpCO0FBQ0EsYUFBTyxLQUFLNkYsUUFBTCxDQUFjLHNCQUFkLEVBQXNDN0YsTUFBdEMsQ0FBUDtBQUNELEtBajNCSTs7QUFtM0JMOzs7OztBQUtBc0csb0JBeDNCSyw4QkF3M0J5QjtBQUFBLFVBQWJ0RyxNQUFhLHVFQUFKLEVBQUk7QUFDNUJsQyxRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsQ0FBUyxpQkFBVCxFQUE0QnJCLE1BQTVCLENBQVA7QUFDRCxLQTMzQkk7O0FBNjNCTDs7Ozs7QUFLQXVHLHFCQWw0QkssNkJBazRCYXRHLElBbDRCYixFQWs0Qm1CO0FBQ3RCbkMsUUFBRSxDQUFDb0gsS0FBSCxDQUFTakYsSUFBVDtBQUNBLGFBQU8sS0FBS3FCLElBQUwsQ0FBVSxjQUFWLEVBQTBCckIsSUFBMUIsQ0FBUDtBQUNELEtBcjRCSTs7QUF1NEJMOzs7OztBQUtBdUcscUJBNTRCSyw2QkE0NEJhdkcsSUE1NEJiLEVBNDRCbUI7QUFDdEJuQyxRQUFFLENBQUNvSCxLQUFILENBQVNqRixJQUFUO0FBQ0EsYUFBTyxLQUFLdUIsS0FBTCxDQUFXLGNBQVgsRUFBMkJ2QixJQUEzQixDQUFQO0FBQ0QsS0EvNEJJO0FBaTVCTDtBQUNBOztBQUVBOzs7OztBQUtBd0csZ0JBejVCSywwQkF5NUJxQjtBQUFBLFVBQWJ6RyxNQUFhLHVFQUFKLEVBQUk7QUFDeEJsQyxRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsQ0FBUyxZQUFULEVBQXVCckIsTUFBdkIsQ0FBUDtBQUNELEtBNTVCSTtBQTg1QkwwRyxrQkE5NUJLLDBCQTg1QlV6RyxJQTk1QlYsRUE4NUJnQjtBQUNuQixhQUFPLEtBQUtxQixJQUFMLENBQVUsWUFBVixFQUF3QnJCLElBQXhCLENBQVA7QUFDRCxLQWg2Qkk7QUFrNkJMMEcsa0JBbDZCSywwQkFrNkJVeEMsVUFsNkJWLEVBazZCc0JsRSxJQWw2QnRCLEVBazZCNEI7QUFDL0IsYUFBTyxLQUFLdUIsS0FBTCxzQkFBeUIyQyxVQUF6QixHQUF1Q2xFLElBQXZDLENBQVA7QUFDRCxLQXA2Qkk7O0FBczZCTDs7Ozs7O0FBTUEyRywwQkE1NkJLLGtDQTQ2QmtCL0MsVUE1NkJsQixFQTQ2QjJDO0FBQUEsVUFBYjdELE1BQWEsdUVBQUosRUFBSTtBQUM5Q2xDLFFBQUUsQ0FBQ3NDLE1BQUgsQ0FBVXlELFVBQVYsRUFBc0IsWUFBdEI7QUFDQS9GLFFBQUUsQ0FBQ3VDLGFBQUgsQ0FBaUJMLE1BQWpCO0FBRUEsYUFBT2tDLE9BQU8sQ0FBQ29CLEdBQVIsQ0FBWSxDQUNqQixLQUFLakMsR0FBTCxDQUFTLFlBQVQsRUFBdUI7QUFBRSxvQ0FBNEJ3QztBQUE5QixPQUF2QixDQURpQixFQUVqQixLQUFLeEMsR0FBTCxDQUFTLFlBQVQsRUFBdUI7QUFBRSxvQ0FBNEJ3QztBQUE5QixPQUF2QixDQUZpQixDQUFaLENBQVA7QUFJRCxLQXA3Qkk7QUFzN0JMO0FBQ0E7O0FBRUE7Ozs7Ozs7QUFPQWdELG9CQWg4QkssNEJBZzhCWWhELFVBaDhCWixFQWc4QndCTSxVQWg4QnhCLEVBZzhCaUQ7QUFBQSxVQUFibkUsTUFBYSx1RUFBSixFQUFJO0FBQ3BEbEMsUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUQsVUFBVixFQUFzQixZQUF0QjtBQUNBL0YsUUFBRSxDQUFDc0csT0FBSCxDQUFXRCxVQUFYLEVBQXVCLFlBQXZCO0FBQ0FyRyxRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6Qjs7QUFFQSxVQUFJNkQsVUFBVSxDQUFDMkIsVUFBWCxDQUFzQixXQUF0QixDQUFKLEVBQXdDO0FBQ3RDLGVBQU8sS0FBS25FLEdBQUwsWUFDRHdDLFVBQVUsQ0FBQzRCLFNBQVgsQ0FBcUIsQ0FBckIsQ0FEQyxjQUMwQnRCLFVBRDFCLGlCQUVMbkUsTUFGSyxDQUFQO0FBSUQ7O0FBRUQsYUFBTyxLQUFLcUIsR0FBTCxrQkFBbUJ3QyxVQUFuQixjQUFpQ00sVUFBakMsaUJBQXlEbkUsTUFBekQsQ0FBUDtBQUNELEtBNzhCSTs7QUErOEJMOzs7Ozs7O0FBT0E4RyxVQXQ5Qkssa0JBczlCRWpELFVBdDlCRixFQXM5QmNNLFVBdDlCZCxFQXM5QjBCNEMsVUF0OUIxQixFQXM5QnNDO0FBQ3pDakosUUFBRSxDQUFDc0MsTUFBSCxDQUFVeUQsVUFBVixFQUFzQixZQUF0QjtBQUNBL0YsUUFBRSxDQUFDc0csT0FBSCxDQUFXRCxVQUFYLEVBQXVCLFlBQXZCO0FBQ0FyRyxRQUFFLENBQUNrSixNQUFILENBQVVELFVBQVYsRUFBc0IsWUFBdEI7O0FBRUEsVUFBSWxELFVBQVUsQ0FBQzJCLFVBQVgsQ0FBc0IsV0FBdEIsQ0FBSixFQUF3QztBQUN0QyxlQUFPLEtBQUtoRSxLQUFMLFlBQ0RxQyxVQUFVLENBQUM0QixTQUFYLENBQXFCLENBQXJCLENBREMsY0FDMEJ0QixVQUQxQixxQkFDK0M0QyxVQUQvQyxFQUFQO0FBR0Q7O0FBRUQsYUFBTyxLQUFLdkYsS0FBTCxrQkFDS3FDLFVBREwsY0FDbUJNLFVBRG5CLHFCQUN3QzRDLFVBRHhDLEVBQVA7QUFHRCxLQXArQkk7QUFzK0JMO0FBQ0E7O0FBRUE7Ozs7OztBQU1BRSxXQS8rQkssbUJBKytCRzlDLFVBLytCSCxFQSsrQjRCO0FBQUEsVUFBYm5FLE1BQWEsdUVBQUosRUFBSTtBQUMvQmxDLFFBQUUsQ0FBQ2tKLE1BQUgsQ0FBVTdDLFVBQVYsRUFBc0IsWUFBdEI7QUFDQXJHLFFBQUUsQ0FBQ3VDLGFBQUgsQ0FBaUJMLE1BQWpCLEVBQXlCLFFBQXpCO0FBQ0EsYUFBTyxLQUFLcUIsR0FBTCxrQkFBbUI4QyxVQUFuQixHQUFpQ25FLE1BQWpDLENBQVA7QUFDRCxLQW4vQkk7O0FBcS9CTDs7Ozs7QUFLQWtILFlBMS9CSyxzQkEwL0JpQjtBQUFBLFVBQWJsSCxNQUFhLHVFQUFKLEVBQUk7QUFDcEJsQyxRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsQ0FBUyxRQUFULEVBQW1CckIsTUFBbkIsQ0FBUDtBQUNELEtBNy9CSTs7QUErL0JMOzs7Ozs7QUFNQW1ILGNBcmdDSyxzQkFxZ0NNaEQsVUFyZ0NOLEVBcWdDa0I1QyxJQXJnQ2xCLEVBcWdDd0I7QUFDM0J6RCxRQUFFLENBQUNzRyxPQUFILENBQVdELFVBQVgsRUFBdUIsWUFBdkI7QUFDQXJHLFFBQUUsQ0FBQytELE1BQUgsQ0FBVU4sSUFBVixFQUFnQixNQUFoQjtBQUNBLGFBQU8sS0FBS2dFLFVBQUwsQ0FBZ0IsZ0JBQWhCLEVBQWtDcEIsVUFBbEMsRUFBOEM1QyxJQUE5QyxDQUFQO0FBQ0QsS0F6Z0NJOztBQTJnQ0w7Ozs7O0FBS0E2RixjQWhoQ0ssc0JBZ2hDTTdGLElBaGhDTixFQWdoQ1k7QUFDZnpELFFBQUUsQ0FBQytELE1BQUgsQ0FBVU4sSUFBVixFQUFnQixNQUFoQjtBQUNBLGFBQU8sS0FBS29FLFVBQUwsQ0FBZ0IsZ0JBQWhCLEVBQWtDcEUsSUFBbEMsQ0FBUDtBQUNELEtBbmhDSTs7QUFxaENMOzs7OztBQUtBOEYsY0ExaENLLHNCQTBoQ01sRCxVQTFoQ04sRUEwaENrQjtBQUNyQnJHLFFBQUUsQ0FBQ3NHLE9BQUgsQ0FBV0QsVUFBWCxFQUF1QixZQUF2QjtBQUNBLGFBQU8sS0FBSzRCLFVBQUwsQ0FBZ0IsZ0JBQWhCLEVBQWtDNUIsVUFBbEMsQ0FBUDtBQUNELEtBN2hDSTtBQStoQ0w7QUFDQTs7QUFFQTs7Ozs7QUFLQW1ELGVBdmlDSyx5QkF1aUNvQjtBQUFBLFVBQWJ0SCxNQUFhLHVFQUFKLEVBQUk7QUFDdkJsQyxRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsQ0FBUyxXQUFULEVBQXNCckIsTUFBdEIsQ0FBUDtBQUNELEtBMWlDSTtBQTRpQ0w7QUFDQTs7QUFFQTs7Ozs7QUFLQXVILFlBcGpDSyxzQkFvakNpQjtBQUFBLFVBQWJ2SCxNQUFhLHVFQUFKLEVBQUk7QUFDcEJsQyxRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsQ0FBUyxRQUFULEVBQW1CckIsTUFBbkIsQ0FBUDtBQUNELEtBdmpDSTs7QUF5akNMOzs7Ozs7QUFNQXdILFdBL2pDSyxtQkErakNHckQsVUEvakNILEVBK2pDNEI7QUFBQSxVQUFibkUsTUFBYSx1RUFBSixFQUFJO0FBQy9CbEMsUUFBRSxDQUFDc0csT0FBSCxDQUFXRCxVQUFYLEVBQXVCLFlBQXZCO0FBQ0FyRyxRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsa0JBQW1COEMsVUFBbkIsR0FBaUNuRSxNQUFqQyxDQUFQO0FBQ0QsS0Fua0NJOztBQXFrQ0w7Ozs7O0FBS0F5SCxTQTFrQ0ssbUJBMGtDYztBQUFBLFVBQWJ6SCxNQUFhLHVFQUFKLEVBQUk7QUFDakJsQyxRQUFFLENBQUN1QyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsQ0FBUyxXQUFULEVBQXNCckIsTUFBdEIsQ0FBUDtBQUNELEtBN2tDSTs7QUEra0NMOzs7Ozs7QUFNQTBILGNBcmxDSyxzQkFxbENNdkQsVUFybENOLEVBcWxDa0I1QyxJQXJsQ2xCLEVBcWxDd0I7QUFDM0J6RCxRQUFFLENBQUNzRyxPQUFILENBQVdELFVBQVgsRUFBdUIsWUFBdkI7QUFDQXJHLFFBQUUsQ0FBQytELE1BQUgsQ0FBVU4sSUFBVixFQUFnQixNQUFoQjtBQUNBLGFBQU8sS0FBS2dFLFVBQUwsQ0FBZ0IsZ0JBQWhCLEVBQWtDcEIsVUFBbEMsRUFBOEM1QyxJQUE5QyxDQUFQO0FBQ0QsS0F6bENJO0FBMmxDTDtBQUNBOztBQUVBOzs7O0FBSUFvRyxRQWxtQ0ssa0JBa21DRTtBQUNMLGFBQU8sS0FBSzlILE9BQUwsQ0FBYSxLQUFiLEVBQW9CLGNBQXBCLEVBQW9DLEVBQXBDLEVBQXdDLEVBQXhDLEVBQTRDLElBQTVDLENBQVA7QUFDRCxLQXBtQ0k7O0FBc21DTDs7OztBQUlBK0gsY0ExbUNLLHdCQTBtQ1E7QUFDWCxhQUFPLEtBQUsvSCxPQUFMLENBQWEsS0FBYixFQUFvQixHQUFwQixFQUF5QixFQUF6QixFQUE2QixFQUE3QixFQUFpQyxJQUFqQyxDQUFQO0FBQ0QsS0E1bUNJOztBQThtQ0w7Ozs7QUFJQWdJLDhCQWxuQ0ssd0NBa25Dd0I7QUFDM0IsYUFBTyxLQUFLeEcsR0FBTCxDQUFTLFdBQVQsQ0FBUDtBQUNEO0FBcG5DSSxHQUFQO0FBc25DRCxDLENBRUQ7QUFDQTs7O0FBRUF6QyxHQUFHLENBQUNiLFVBQUosR0FBaUJBLFVBQWpCO0FBQ0ErSixNQUFNLENBQUNDLE9BQVAsR0FBaUJuSixHQUFqQixDIiwiZmlsZSI6ImRpcmVjdHVzLXNkay51bWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIkRpcmVjdHVzU0RLXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRpcmVjdHVzU0RLXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkRpcmVjdHVzU0RLXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiKGZ1bmN0aW9uICgpIHtcbiAgICAvKlxuICAgICAqIFdlIG9ubHkgZGVmaW5lIHRoZSBpcy9oYXMqIGZ1bmN0aW9ucyBhbmQgdXNlIHRoZVxuICAgICAqIGRlbWFuZCgpIGZ1bmN0aW9uIHRvIGJ1aWxkIHRoZSBkZW1hbmRzLCBhbHNvIHRoZVxuICAgICAqIGdldERlbWFuZE1ldGhvZE5hbWVCeVZhbGlkYXRvcktleSgpICh5ZWgsIEkga25vdyBpdCdzIGFuIHVnbHkgbmFtZSA6KClcbiAgICAgKiBidWlsZCB0aGUgZGVtYW5kIG1ldGhvZCBiYXNlZCBpbiB0aGUgLmlzL2hhcyBtZXRob2RzXG4gICAgICovXG5cbiAgICB2YXIgdiA9IHsgfTtcblxuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5Bcmd1bWVudFZhbGlkYXRvciA9IHY7XG4gICAgfVxuXG4gICAgdmFyIGRlbWFuZCA9IGZ1bmN0aW9uIChkZW1hbmRNZXRob2ROYW1lLCB2YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSAvKiAuLi4gbW9yZSBhcmdzLCBuYW1lICovKSB7XG4gICAgICAgICAgICBpZiAodmFsaWRhdG9yLmFwcGx5KHYsIGFyZ3VtZW50cykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG5hbWUgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIC0xKVswXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHYuaXNKc29uKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbXNnID0gXCJJbnZhbGlkIFwiICsgZGVtYW5kTWV0aG9kTmFtZSArIFwiIHZhbHVlOiBcIiArIHZhbHVlO1xuICAgICAgICAgICAgaWYgKHYuaXNTdHJpbmcobmFtZSkpIHtcbiAgICAgICAgICAgICAgICBtc2cgKz0gXCJcXG5Bcmd1bWVudCBOYW1lOiBcIiArIG5hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2LmlzQXJyYXkoYXJndW1lbnRzWzFdKSkge1xuICAgICAgICAgICAgICAgIG1zZyArPSBcIlxcbktleXM6IFwiICsgYXJndW1lbnRzWzFdLmpvaW4oXCIsIFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGdldERlbWFuZE1ldGhvZE5hbWVCeVZhbGlkYXRvcktleSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIHByZWZpeCA9IFsgJ2lzJywgJ2hhcycgXTtcbiAgICAgICAgdmFyIHByZWZpeExlbmd0aCA9IG51bGw7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmVmaXgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHByZWZpeExlbmd0aCA9IHByZWZpeFtpXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChrZXkuc2xpY2UoMCwgcHJlZml4TGVuZ3RoKSA9PT0gcHJlZml4W2ldKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGVtYW5kTWV0aG9kTmFtZSA9IGtleS5zbGljZShwcmVmaXhMZW5ndGggKyAxKTtcbiAgICAgICAgdmFyIGZpcnN0TGV0dGVyID0ga2V5LnNsaWNlKHByZWZpeExlbmd0aCwgcHJlZml4TGVuZ3RoICsgMSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIG5hbWUgPSBmaXJzdExldHRlciArIGRlbWFuZE1ldGhvZE5hbWU7XG5cbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfTtcblxuICAgIHZhciBoYXNLZXlzV2l0aCA9IGZ1bmN0aW9uICh2YWxpZGF0b3IsIG9iaiwga2V5cykge1xuICAgICAgICBpZiAoIXYuaXNPYmplY3RPckVtcHR5KG9iaikgfHwgIXYuaXNBcnJheU9yRW1wdHkoa2V5cykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXlzW2ldKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF2YWxpZGF0b3Iob2JqW2tleXNbaV1dKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICB2YXIgaXNBcnJheU9mID0gZnVuY3Rpb24gKHZhbGlkYXRvciwgYXJyKSB7XG4gICAgICAgIGlmICghdi5pc0FycmF5KGFycikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsZW5ndGggPSBhcnIubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIXZhbGlkYXRvcihhcnJbaV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIHYuaXNOb3ROdWxsID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkO1xuICAgIH07XG5cbiAgICB2LmlzSW5zdGFuY2VPZiA9IGZ1bmN0aW9uKHR5cGUsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIHR5cGU7XG4gICAgfTtcblxuICAgIHYuaXNUeXBlID0gZnVuY3Rpb24gKHR5cGUsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSBcIltvYmplY3QgXCIgKyB0eXBlICsgXCJdXCI7XG4gICAgfTtcblxuICAgIHYuaXNCb29sZWFuID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiAoWyAxLCAwLCB0cnVlLCBmYWxzZSBdLmluZGV4T2YodmFsdWUpID4gLTEpO1xuICAgIH07XG5cbiAgICB2LmlzU3RyaW5nT3JFbXB0eSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdi5pc1R5cGUoXCJTdHJpbmdcIiwgdmFsdWUpO1xuICAgIH07XG5cbiAgICB2LmlzU3RyaW5nID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdi5pc1N0cmluZ09yRW1wdHkodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC9cXFMvLnRlc3QodmFsdWUpO1xuICAgIH07XG5cbiAgICB2LmlzTnVtYmVyID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdi5pc1R5cGUoJ051bWJlcicsIHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlzRmluaXRlKHZhbHVlKSAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSkpO1xuICAgIH07XG5cbiAgICB2LmlzQXJyYXlPckVtcHR5ID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgICByZXR1cm4gdi5pc1R5cGUoXCJBcnJheVwiLCBhcnIpO1xuICAgIH07XG5cbiAgICB2LmlzQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgIGlmICghdi5pc0FycmF5T3JFbXB0eShhcnIpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXJyLmxlbmd0aCA+IDA7XG4gICAgfTtcblxuICAgIHYuaXNBcnJheU9mTnVtYmVycyA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgcmV0dXJuIGlzQXJyYXlPZih2LmlzTnVtYmVyLCBhcnIpO1xuICAgIH07XG5cbiAgICB2LmlzQXJyYXlPZk9iamVjdHMgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgIHJldHVybiBpc0FycmF5T2Yodi5pc09iamVjdCwgYXJyKTtcbiAgICB9O1xuXG4gICAgdi5pc09iamVjdE9yRW1wdHkgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiB2LmlzVHlwZShcIk9iamVjdFwiLCBvYmopO1xuICAgIH07XG5cbiAgICB2LmlzT2JqZWN0ID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICBpZiAoIXYuaXNPYmplY3RPckVtcHR5KG9iaikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIHYuaXNKc29uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdi5pc09iamVjdE9yRW1wdHkodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICB2LmlzSnNvblN0cmluZyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXYuaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIHYuaGFzS2V5cyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgICAgICAgcmV0dXJuIGhhc0tleXNXaXRoKHYuaXNOb3ROdWxsLCBvYmosIGtleXMpO1xuICAgIH07XG5cbiAgICB2Lmhhc0tleXNXaXRoTnVtYmVyID0gdi5oYXNOdW1iZXJLZXlzID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICAgICAgICByZXR1cm4gaGFzS2V5c1dpdGgodi5pc051bWJlciwgb2JqLCBrZXlzKTtcbiAgICB9O1xuXG4gICAgdi5oYXNLZXlzV2l0aFN0cmluZyA9IHYuaGFzU3RyaW5nS2V5cyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgICAgICAgcmV0dXJuIGhhc0tleXNXaXRoKHYuaXNTdHJpbmcsIG9iaiwga2V5cyk7XG4gICAgfTtcblxuICAgIHYuaGFzS2V5c1dpdGhPYmplY3QgPSB2Lmhhc09iamVjdEtleXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gICAgICAgIHJldHVybiBoYXNLZXlzV2l0aCh2LmlzT2JqZWN0LCBvYmosIGtleXMpO1xuICAgIH07XG5cbiAgICB2Lmhhc0tleXNXaXRoU3RyaW5nT3JFbXB0eSA9IHYuaGFzU3RyaW5nT3JFbXB0eUtleXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gICAgICAgIHJldHVybiBoYXNLZXlzV2l0aCh2LmlzU3RyaW5nT3JFbXB0eSwgb2JqLCBrZXlzKTtcbiAgICB9O1xuXG4gICAgdi5oYXNLZXlzV2l0aE9iamVjdE9yRW1wdHkgPSB2Lmhhc09iamVjdE9yRW1wdHlLZXlzID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICAgICAgICByZXR1cm4gaGFzS2V5c1dpdGgodi5pc09iamVjdE9yRW1wdHksIG9iaiwga2V5cyk7XG4gICAgfTtcblxuICAgIHYuaXNGdW5jdGlvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdi5pc0luc3RhbmNlT2YoRnVuY3Rpb24sIHZhbHVlKTtcbiAgICB9O1xuXG4gICAgLy8gYnVpbGQgZGVtYW5kIGZ1bmN0aW9uc1xuICAgIGZvciAodmFyIGtleSBpbiB2KSB7XG4gICAgICAgIHZhciBkZW1hbmRNZXRob2ROYW1lID0gZ2V0RGVtYW5kTWV0aG9kTmFtZUJ5VmFsaWRhdG9yS2V5KGtleSk7XG4gICAgICAgIHZbZGVtYW5kTWV0aG9kTmFtZV0gPSBkZW1hbmQoZGVtYW5kTWV0aG9kTmFtZSwgdltrZXldKTtcbiAgICB9XG5cbn0pLmNhbGwodGhpcyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcbnZhciBidG9hID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5idG9hICYmIHdpbmRvdy5idG9hLmJpbmQod2luZG93KSkgfHwgcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J0b2EnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB2YXIgbG9hZEV2ZW50ID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG4gICAgdmFyIHhEb21haW4gPSBmYWxzZTtcblxuICAgIC8vIEZvciBJRSA4LzkgQ09SUyBzdXBwb3J0XG4gICAgLy8gT25seSBzdXBwb3J0cyBQT1NUIGFuZCBHRVQgY2FsbHMgYW5kIGRvZXNuJ3QgcmV0dXJucyB0aGUgcmVzcG9uc2UgaGVhZGVycy5cbiAgICAvLyBET04nVCBkbyB0aGlzIGZvciB0ZXN0aW5nIGIvYyBYTUxIdHRwUmVxdWVzdCBpcyBtb2NrZWQsIG5vdCBYRG9tYWluUmVxdWVzdC5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICd0ZXN0JyAmJlxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB3aW5kb3cuWERvbWFpblJlcXVlc3QgJiYgISgnd2l0aENyZWRlbnRpYWxzJyBpbiByZXF1ZXN0KSAmJlxuICAgICAgICAhaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSB7XG4gICAgICByZXF1ZXN0ID0gbmV3IHdpbmRvdy5YRG9tYWluUmVxdWVzdCgpO1xuICAgICAgbG9hZEV2ZW50ID0gJ29ubG9hZCc7XG4gICAgICB4RG9tYWluID0gdHJ1ZTtcbiAgICAgIHJlcXVlc3Qub25wcm9ncmVzcyA9IGZ1bmN0aW9uIGhhbmRsZVByb2dyZXNzKCkge307XG4gICAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7fTtcbiAgICB9XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0W2xvYWRFdmVudF0gPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQgJiYgIXhEb21haW4pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIC8vIElFIHNlbmRzIDEyMjMgaW5zdGVhZCBvZiAyMDQgKGh0dHBzOi8vZ2l0aHViLmNvbS9heGlvcy9heGlvcy9pc3N1ZXMvMjAxKVxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gMjA0IDogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gJ05vIENvbnRlbnQnIDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcigndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICB2YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7XG5cbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZSh1dGlscy5tZXJnZShkZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vLi4vZGVmYXVsdHMnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSB1dGlscy5tZXJnZSh7XG4gICAgICB1cmw6IGFyZ3VtZW50c1swXVxuICAgIH0sIGFyZ3VtZW50c1sxXSk7XG4gIH1cblxuICBjb25maWcgPSB1dGlscy5tZXJnZShkZWZhdWx0cywge21ldGhvZDogJ2dldCd9LCB0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmxcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBTdXBwb3J0IGJhc2VVUkwgY29uZmlnXG4gIGlmIChjb25maWcuYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChjb25maWcudXJsKSkge1xuICAgIGNvbmZpZy51cmwgPSBjb21iaW5lVVJMcyhjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIH1cblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzIHx8IHt9XG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIHJldHVybiBlcnJvcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIC8vIE5vdGU6IHN0YXR1cyBpcyBub3QgZXhwb3NlZCBieSBYRG9tYWluUmVxdWVzdFxuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gYnRvYSBwb2x5ZmlsbCBmb3IgSUU8MTAgY291cnRlc3kgaHR0cHM6Ly9naXRodWIuY29tL2RhdmlkY2hhbWJlcnMvQmFzZTY0LmpzXG5cbnZhciBjaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSc7XG5cbmZ1bmN0aW9uIEUoKSB7XG4gIHRoaXMubWVzc2FnZSA9ICdTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXInO1xufVxuRS5wcm90b3R5cGUgPSBuZXcgRXJyb3I7XG5FLnByb3RvdHlwZS5jb2RlID0gNTtcbkUucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuZnVuY3Rpb24gYnRvYShpbnB1dCkge1xuICB2YXIgc3RyID0gU3RyaW5nKGlucHV0KTtcbiAgdmFyIG91dHB1dCA9ICcnO1xuICBmb3IgKFxuICAgIC8vIGluaXRpYWxpemUgcmVzdWx0IGFuZCBjb3VudGVyXG4gICAgdmFyIGJsb2NrLCBjaGFyQ29kZSwgaWR4ID0gMCwgbWFwID0gY2hhcnM7XG4gICAgLy8gaWYgdGhlIG5leHQgc3RyIGluZGV4IGRvZXMgbm90IGV4aXN0OlxuICAgIC8vICAgY2hhbmdlIHRoZSBtYXBwaW5nIHRhYmxlIHRvIFwiPVwiXG4gICAgLy8gICBjaGVjayBpZiBkIGhhcyBubyBmcmFjdGlvbmFsIGRpZ2l0c1xuICAgIHN0ci5jaGFyQXQoaWR4IHwgMCkgfHwgKG1hcCA9ICc9JywgaWR4ICUgMSk7XG4gICAgLy8gXCI4IC0gaWR4ICUgMSAqIDhcIiBnZW5lcmF0ZXMgdGhlIHNlcXVlbmNlIDIsIDQsIDYsIDhcbiAgICBvdXRwdXQgKz0gbWFwLmNoYXJBdCg2MyAmIGJsb2NrID4+IDggLSBpZHggJSAxICogOClcbiAgKSB7XG4gICAgY2hhckNvZGUgPSBzdHIuY2hhckNvZGVBdChpZHggKz0gMyAvIDQpO1xuICAgIGlmIChjaGFyQ29kZSA+IDB4RkYpIHtcbiAgICAgIHRocm93IG5ldyBFKCk7XG4gICAgfVxuICAgIGJsb2NrID0gYmxvY2sgPDwgOCB8IGNoYXJDb2RlO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnRvYTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgfSxcblxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuICAvLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgfVxuXG4gICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICB9O1xuICAgIH1cblxuICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG52YXIgaWdub3JlRHVwbGljYXRlT2YgPSBbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrZXk7XG4gIHZhciB2YWw7XG4gIHZhciBpO1xuXG4gIGlmICghaGVhZGVycykgeyByZXR1cm4gcGFyc2VkOyB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIGlzQnVmZmVyID0gcmVxdWlyZSgnaXMtYnVmZmVyJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07XG4iLCIvKiEgaHR0cDovL210aHMuYmUvYmFzZTY0IHYwLjEuMCBieSBAbWF0aGlhcyB8IE1JVCBsaWNlbnNlICovXG47KGZ1bmN0aW9uKHJvb3QpIHtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgYGV4cG9ydHNgLlxuXHR2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLlxuXHR2YXIgZnJlZU1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmXG5cdFx0bW9kdWxlLmV4cG9ydHMgPT0gZnJlZUV4cG9ydHMgJiYgbW9kdWxlO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgLCBmcm9tIE5vZGUuanMgb3IgQnJvd3NlcmlmaWVkIGNvZGUsIGFuZCB1c2Vcblx0Ly8gaXQgYXMgYHJvb3RgLlxuXHR2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuXHRpZiAoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwpIHtcblx0XHRyb290ID0gZnJlZUdsb2JhbDtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHZhciBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0dGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblx0fTtcblx0SW52YWxpZENoYXJhY3RlckVycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcjtcblx0SW52YWxpZENoYXJhY3RlckVycm9yLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cblx0dmFyIGVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuXHRcdC8vIE5vdGU6IHRoZSBlcnJvciBtZXNzYWdlcyB1c2VkIHRocm91Z2hvdXQgdGhpcyBmaWxlIG1hdGNoIHRob3NlIHVzZWQgYnlcblx0XHQvLyB0aGUgbmF0aXZlIGBhdG9iYC9gYnRvYWAgaW1wbGVtZW50YXRpb24gaW4gQ2hyb21pdW0uXG5cdFx0dGhyb3cgbmV3IEludmFsaWRDaGFyYWN0ZXJFcnJvcihtZXNzYWdlKTtcblx0fTtcblxuXHR2YXIgVEFCTEUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cdC8vIGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvY29tbW9uLW1pY3Jvc3ludGF4ZXMuaHRtbCNzcGFjZS1jaGFyYWN0ZXJcblx0dmFyIFJFR0VYX1NQQUNFX0NIQVJBQ1RFUlMgPSAvW1xcdFxcblxcZlxcciBdL2c7XG5cblx0Ly8gYGRlY29kZWAgaXMgZGVzaWduZWQgdG8gYmUgZnVsbHkgY29tcGF0aWJsZSB3aXRoIGBhdG9iYCBhcyBkZXNjcmliZWQgaW4gdGhlXG5cdC8vIEhUTUwgU3RhbmRhcmQuIGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvd2ViYXBwYXBpcy5odG1sI2RvbS13aW5kb3diYXNlNjQtYXRvYlxuXHQvLyBUaGUgb3B0aW1pemVkIGJhc2U2NC1kZWNvZGluZyBhbGdvcml0aG0gdXNlZCBpcyBiYXNlZCBvbiBAYXRr4oCZcyBleGNlbGxlbnRcblx0Ly8gaW1wbGVtZW50YXRpb24uIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2F0ay8xMDIwMzk2XG5cdHZhciBkZWNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlucHV0ID0gU3RyaW5nKGlucHV0KVxuXHRcdFx0LnJlcGxhY2UoUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUywgJycpO1xuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0aWYgKGxlbmd0aCAlIDQgPT0gMCkge1xuXHRcdFx0aW5wdXQgPSBpbnB1dC5yZXBsYWNlKC89PT8kLywgJycpO1xuXHRcdFx0bGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHRcdH1cblx0XHRpZiAoXG5cdFx0XHRsZW5ndGggJSA0ID09IDEgfHxcblx0XHRcdC8vIGh0dHA6Ly93aGF0d2cub3JnL0MjYWxwaGFudW1lcmljLWFzY2lpLWNoYXJhY3RlcnNcblx0XHRcdC9bXithLXpBLVowLTkvXS8udGVzdChpbnB1dClcblx0XHQpIHtcblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnSW52YWxpZCBjaGFyYWN0ZXI6IHRoZSBzdHJpbmcgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIGJpdENvdW50ZXIgPSAwO1xuXHRcdHZhciBiaXRTdG9yYWdlO1xuXHRcdHZhciBidWZmZXI7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHZhciBwb3NpdGlvbiA9IC0xO1xuXHRcdHdoaWxlICgrK3Bvc2l0aW9uIDwgbGVuZ3RoKSB7XG5cdFx0XHRidWZmZXIgPSBUQUJMRS5pbmRleE9mKGlucHV0LmNoYXJBdChwb3NpdGlvbikpO1xuXHRcdFx0Yml0U3RvcmFnZSA9IGJpdENvdW50ZXIgJSA0ID8gYml0U3RvcmFnZSAqIDY0ICsgYnVmZmVyIDogYnVmZmVyO1xuXHRcdFx0Ly8gVW5sZXNzIHRoaXMgaXMgdGhlIGZpcnN0IG9mIGEgZ3JvdXAgb2YgNCBjaGFyYWN0ZXJz4oCmXG5cdFx0XHRpZiAoYml0Q291bnRlcisrICUgNCkge1xuXHRcdFx0XHQvLyDigKZjb252ZXJ0IHRoZSBmaXJzdCA4IGJpdHMgdG8gYSBzaW5nbGUgQVNDSUkgY2hhcmFjdGVyLlxuXHRcdFx0XHRvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShcblx0XHRcdFx0XHQweEZGICYgYml0U3RvcmFnZSA+PiAoLTIgKiBiaXRDb3VudGVyICYgNilcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fTtcblxuXHQvLyBgZW5jb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGJ0b2FgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZDogaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1idG9hXG5cdHZhciBlbmNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlucHV0ID0gU3RyaW5nKGlucHV0KTtcblx0XHRpZiAoL1teXFwwLVxceEZGXS8udGVzdChpbnB1dCkpIHtcblx0XHRcdC8vIE5vdGU6IG5vIG5lZWQgdG8gc3BlY2lhbC1jYXNlIGFzdHJhbCBzeW1ib2xzIGhlcmUsIGFzIHN1cnJvZ2F0ZXMgYXJlXG5cdFx0XHQvLyBtYXRjaGVkLCBhbmQgdGhlIGlucHV0IGlzIHN1cHBvc2VkIHRvIG9ubHkgY29udGFpbiBBU0NJSSBhbnl3YXkuXG5cdFx0XHRlcnJvcihcblx0XHRcdFx0J1RoZSBzdHJpbmcgdG8gYmUgZW5jb2RlZCBjb250YWlucyBjaGFyYWN0ZXJzIG91dHNpZGUgb2YgdGhlICcgK1xuXHRcdFx0XHQnTGF0aW4xIHJhbmdlLidcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHZhciBwYWRkaW5nID0gaW5wdXQubGVuZ3RoICUgMztcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0dmFyIGE7XG5cdFx0dmFyIGI7XG5cdFx0dmFyIGM7XG5cdFx0dmFyIGQ7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHQvLyBNYWtlIHN1cmUgYW55IHBhZGRpbmcgaXMgaGFuZGxlZCBvdXRzaWRlIG9mIHRoZSBsb29wLlxuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGggLSBwYWRkaW5nO1xuXG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdC8vIFJlYWQgdGhyZWUgYnl0ZXMsIGkuZS4gMjQgYml0cy5cblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCAxNjtcblx0XHRcdGIgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pIDw8IDg7XG5cdFx0XHRjID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKTtcblx0XHRcdGJ1ZmZlciA9IGEgKyBiICsgYztcblx0XHRcdC8vIFR1cm4gdGhlIDI0IGJpdHMgaW50byBmb3VyIGNodW5rcyBvZiA2IGJpdHMgZWFjaCwgYW5kIGFwcGVuZCB0aGVcblx0XHRcdC8vIG1hdGNoaW5nIGNoYXJhY3RlciBmb3IgZWFjaCBvZiB0aGVtIHRvIHRoZSBvdXRwdXQuXG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDE4ICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDEyICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDYgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgJiAweDNGKVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAocGFkZGluZyA9PSAyKSB7XG5cdFx0XHRhID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbikgPDwgODtcblx0XHRcdGIgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGI7XG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDEwKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyID4+IDQpICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA8PCAyKSAmIDB4M0YpICtcblx0XHRcdFx0Jz0nXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSBpZiAocGFkZGluZyA9PSAxKSB7XG5cdFx0XHRidWZmZXIgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA8PCA0KSAmIDB4M0YpICtcblx0XHRcdFx0Jz09J1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdHZhciBiYXNlNjQgPSB7XG5cdFx0J2VuY29kZSc6IGVuY29kZSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCd2ZXJzaW9uJzogJzAuMS4wJ1xuXHR9O1xuXG5cdC8vIFNvbWUgQU1EIGJ1aWxkIG9wdGltaXplcnMsIGxpa2Ugci5qcywgY2hlY2sgZm9yIHNwZWNpZmljIGNvbmRpdGlvbiBwYXR0ZXJuc1xuXHQvLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG5cdGlmIChcblx0XHR0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJlxuXHRcdGRlZmluZS5hbWRcblx0KSB7XG5cdFx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGJhc2U2NDtcblx0XHR9KTtcblx0fVx0ZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgIWZyZWVFeHBvcnRzLm5vZGVUeXBlKSB7XG5cdFx0aWYgKGZyZWVNb2R1bGUpIHsgLy8gaW4gTm9kZS5qcyBvciBSaW5nb0pTIHYwLjguMCtcblx0XHRcdGZyZWVNb2R1bGUuZXhwb3J0cyA9IGJhc2U2NDtcblx0XHR9IGVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0Zm9yICh2YXIga2V5IGluIGJhc2U2NCkge1xuXHRcdFx0XHRiYXNlNjQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IGJhc2U2NFtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LmJhc2U2NCA9IGJhc2U2NDtcblx0fVxuXG59KHRoaXMpKTtcbiIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxuLy8gVGhlIF9pc0J1ZmZlciBjaGVjayBpcyBmb3IgU2FmYXJpIDUtNyBzdXBwb3J0LCBiZWNhdXNlIGl0J3MgbWlzc2luZ1xuLy8gT2JqZWN0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiAoaXNCdWZmZXIob2JqKSB8fCBpc1Nsb3dCdWZmZXIob2JqKSB8fCAhIW9iai5faXNCdWZmZXIpXG59XG5cbmZ1bmN0aW9uIGlzQnVmZmVyIChvYmopIHtcbiAgcmV0dXJuICEhb2JqLmNvbnN0cnVjdG9yICYmIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iailcbn1cblxuLy8gRm9yIE5vZGUgdjAuMTAgc3VwcG9ydC4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseS5cbmZ1bmN0aW9uIGlzU2xvd0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqLnJlYWRGbG9hdExFID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmouc2xpY2UgPT09ICdmdW5jdGlvbicgJiYgaXNCdWZmZXIob2JqLnNsaWNlKDAsIDApKVxufVxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG52YXIgcGVyY2VudFR3ZW50aWVzID0gLyUyMC9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAnZGVmYXVsdCc6ICdSRkMzOTg2JyxcbiAgICBmb3JtYXR0ZXJzOiB7XG4gICAgICAgIFJGQzE3Mzg6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2UuY2FsbCh2YWx1ZSwgcGVyY2VudFR3ZW50aWVzLCAnKycpO1xuICAgICAgICB9LFxuICAgICAgICBSRkMzOTg2OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgUkZDMTczODogJ1JGQzE3MzgnLFxuICAgIFJGQzM5ODY6ICdSRkMzOTg2J1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vc3RyaW5naWZ5Jyk7XG52YXIgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJyk7XG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBmb3JtYXRzOiBmb3JtYXRzLFxuICAgIHBhcnNlOiBwYXJzZSxcbiAgICBzdHJpbmdpZnk6IHN0cmluZ2lmeVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIGRlZmF1bHRzID0ge1xuICAgIGFsbG93RG90czogZmFsc2UsXG4gICAgYWxsb3dQcm90b3R5cGVzOiBmYWxzZSxcbiAgICBhcnJheUxpbWl0OiAyMCxcbiAgICBkZWNvZGVyOiB1dGlscy5kZWNvZGUsXG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZGVwdGg6IDUsXG4gICAgcGFyYW1ldGVyTGltaXQ6IDEwMDAsXG4gICAgcGxhaW5PYmplY3RzOiBmYWxzZSxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgcGFyc2VWYWx1ZXMgPSBmdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nVmFsdWVzKHN0ciwgb3B0aW9ucykge1xuICAgIHZhciBvYmogPSB7fTtcbiAgICB2YXIgY2xlYW5TdHIgPSBvcHRpb25zLmlnbm9yZVF1ZXJ5UHJlZml4ID8gc3RyLnJlcGxhY2UoL15cXD8vLCAnJykgOiBzdHI7XG4gICAgdmFyIGxpbWl0ID0gb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9PT0gSW5maW5pdHkgPyB1bmRlZmluZWQgOiBvcHRpb25zLnBhcmFtZXRlckxpbWl0O1xuICAgIHZhciBwYXJ0cyA9IGNsZWFuU3RyLnNwbGl0KG9wdGlvbnMuZGVsaW1pdGVyLCBsaW1pdCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBwYXJ0ID0gcGFydHNbaV07XG5cbiAgICAgICAgdmFyIGJyYWNrZXRFcXVhbHNQb3MgPSBwYXJ0LmluZGV4T2YoJ109Jyk7XG4gICAgICAgIHZhciBwb3MgPSBicmFja2V0RXF1YWxzUG9zID09PSAtMSA/IHBhcnQuaW5kZXhPZignPScpIDogYnJhY2tldEVxdWFsc1BvcyArIDE7XG5cbiAgICAgICAgdmFyIGtleSwgdmFsO1xuICAgICAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgICAgICAga2V5ID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQsIGRlZmF1bHRzLmRlY29kZXIpO1xuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPyBudWxsIDogJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZXkgPSBvcHRpb25zLmRlY29kZXIocGFydC5zbGljZSgwLCBwb3MpLCBkZWZhdWx0cy5kZWNvZGVyKTtcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuZGVjb2RlcihwYXJ0LnNsaWNlKHBvcyArIDEpLCBkZWZhdWx0cy5kZWNvZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzLmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IFtdLmNvbmNhdChvYmpba2V5XSkuY29uY2F0KHZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IHZhbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG52YXIgcGFyc2VPYmplY3QgPSBmdW5jdGlvbiAoY2hhaW4sIHZhbCwgb3B0aW9ucykge1xuICAgIHZhciBsZWFmID0gdmFsO1xuXG4gICAgZm9yICh2YXIgaSA9IGNoYWluLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBvYmo7XG4gICAgICAgIHZhciByb290ID0gY2hhaW5baV07XG5cbiAgICAgICAgaWYgKHJvb3QgPT09ICdbXScpIHtcbiAgICAgICAgICAgIG9iaiA9IFtdO1xuICAgICAgICAgICAgb2JqID0gb2JqLmNvbmNhdChsZWFmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9iaiA9IG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgICAgICAgICAgdmFyIGNsZWFuUm9vdCA9IHJvb3QuY2hhckF0KDApID09PSAnWycgJiYgcm9vdC5jaGFyQXQocm9vdC5sZW5ndGggLSAxKSA9PT0gJ10nID8gcm9vdC5zbGljZSgxLCAtMSkgOiByb290O1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoY2xlYW5Sb290LCAxMCk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgIWlzTmFOKGluZGV4KVxuICAgICAgICAgICAgICAgICYmIHJvb3QgIT09IGNsZWFuUm9vdFxuICAgICAgICAgICAgICAgICYmIFN0cmluZyhpbmRleCkgPT09IGNsZWFuUm9vdFxuICAgICAgICAgICAgICAgICYmIGluZGV4ID49IDBcbiAgICAgICAgICAgICAgICAmJiAob3B0aW9ucy5wYXJzZUFycmF5cyAmJiBpbmRleCA8PSBvcHRpb25zLmFycmF5TGltaXQpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBvYmogPSBbXTtcbiAgICAgICAgICAgICAgICBvYmpbaW5kZXhdID0gbGVhZjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqW2NsZWFuUm9vdF0gPSBsZWFmO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGVhZiA9IG9iajtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVhZjtcbn07XG5cbnZhciBwYXJzZUtleXMgPSBmdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nS2V5cyhnaXZlbktleSwgdmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKCFnaXZlbktleSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVHJhbnNmb3JtIGRvdCBub3RhdGlvbiB0byBicmFja2V0IG5vdGF0aW9uXG4gICAgdmFyIGtleSA9IG9wdGlvbnMuYWxsb3dEb3RzID8gZ2l2ZW5LZXkucmVwbGFjZSgvXFwuKFteLltdKykvZywgJ1skMV0nKSA6IGdpdmVuS2V5O1xuXG4gICAgLy8gVGhlIHJlZ2V4IGNodW5rc1xuXG4gICAgdmFyIGJyYWNrZXRzID0gLyhcXFtbXltcXF1dKl0pLztcbiAgICB2YXIgY2hpbGQgPSAvKFxcW1teW1xcXV0qXSkvZztcblxuICAgIC8vIEdldCB0aGUgcGFyZW50XG5cbiAgICB2YXIgc2VnbWVudCA9IGJyYWNrZXRzLmV4ZWMoa2V5KTtcbiAgICB2YXIgcGFyZW50ID0gc2VnbWVudCA/IGtleS5zbGljZSgwLCBzZWdtZW50LmluZGV4KSA6IGtleTtcblxuICAgIC8vIFN0YXNoIHRoZSBwYXJlbnQgaWYgaXQgZXhpc3RzXG5cbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlbid0IHVzaW5nIHBsYWluIG9iamVjdHMsIG9wdGlvbmFsbHkgcHJlZml4IGtleXNcbiAgICAgICAgLy8gdGhhdCB3b3VsZCBvdmVyd3JpdGUgb2JqZWN0IHByb3RvdHlwZSBwcm9wZXJ0aWVzXG4gICAgICAgIGlmICghb3B0aW9ucy5wbGFpbk9iamVjdHMgJiYgaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgcGFyZW50KSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGtleXMucHVzaChwYXJlbnQpO1xuICAgIH1cblxuICAgIC8vIExvb3AgdGhyb3VnaCBjaGlsZHJlbiBhcHBlbmRpbmcgdG8gdGhlIGFycmF5IHVudGlsIHdlIGhpdCBkZXB0aFxuXG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlICgoc2VnbWVudCA9IGNoaWxkLmV4ZWMoa2V5KSkgIT09IG51bGwgJiYgaSA8IG9wdGlvbnMuZGVwdGgpIHtcbiAgICAgICAgaSArPSAxO1xuICAgICAgICBpZiAoIW9wdGlvbnMucGxhaW5PYmplY3RzICYmIGhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHNlZ21lbnRbMV0uc2xpY2UoMSwgLTEpKSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBrZXlzLnB1c2goc2VnbWVudFsxXSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUncyBhIHJlbWFpbmRlciwganVzdCBhZGQgd2hhdGV2ZXIgaXMgbGVmdFxuXG4gICAgaWYgKHNlZ21lbnQpIHtcbiAgICAgICAga2V5cy5wdXNoKCdbJyArIGtleS5zbGljZShzZWdtZW50LmluZGV4KSArICddJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlT2JqZWN0KGtleXMsIHZhbCwgb3B0aW9ucyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIsIG9wdHMpIHtcbiAgICB2YXIgb3B0aW9ucyA9IG9wdHMgPyB1dGlscy5hc3NpZ24oe30sIG9wdHMpIDoge307XG5cbiAgICBpZiAob3B0aW9ucy5kZWNvZGVyICE9PSBudWxsICYmIG9wdGlvbnMuZGVjb2RlciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRpb25zLmRlY29kZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRGVjb2RlciBoYXMgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBvcHRpb25zLmlnbm9yZVF1ZXJ5UHJlZml4ID0gb3B0aW9ucy5pZ25vcmVRdWVyeVByZWZpeCA9PT0gdHJ1ZTtcbiAgICBvcHRpb25zLmRlbGltaXRlciA9IHR5cGVvZiBvcHRpb25zLmRlbGltaXRlciA9PT0gJ3N0cmluZycgfHwgdXRpbHMuaXNSZWdFeHAob3B0aW9ucy5kZWxpbWl0ZXIpID8gb3B0aW9ucy5kZWxpbWl0ZXIgOiBkZWZhdWx0cy5kZWxpbWl0ZXI7XG4gICAgb3B0aW9ucy5kZXB0aCA9IHR5cGVvZiBvcHRpb25zLmRlcHRoID09PSAnbnVtYmVyJyA/IG9wdGlvbnMuZGVwdGggOiBkZWZhdWx0cy5kZXB0aDtcbiAgICBvcHRpb25zLmFycmF5TGltaXQgPSB0eXBlb2Ygb3B0aW9ucy5hcnJheUxpbWl0ID09PSAnbnVtYmVyJyA/IG9wdGlvbnMuYXJyYXlMaW1pdCA6IGRlZmF1bHRzLmFycmF5TGltaXQ7XG4gICAgb3B0aW9ucy5wYXJzZUFycmF5cyA9IG9wdGlvbnMucGFyc2VBcnJheXMgIT09IGZhbHNlO1xuICAgIG9wdGlvbnMuZGVjb2RlciA9IHR5cGVvZiBvcHRpb25zLmRlY29kZXIgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLmRlY29kZXIgOiBkZWZhdWx0cy5kZWNvZGVyO1xuICAgIG9wdGlvbnMuYWxsb3dEb3RzID0gdHlwZW9mIG9wdGlvbnMuYWxsb3dEb3RzID09PSAnYm9vbGVhbicgPyBvcHRpb25zLmFsbG93RG90cyA6IGRlZmF1bHRzLmFsbG93RG90cztcbiAgICBvcHRpb25zLnBsYWluT2JqZWN0cyA9IHR5cGVvZiBvcHRpb25zLnBsYWluT2JqZWN0cyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5wbGFpbk9iamVjdHMgOiBkZWZhdWx0cy5wbGFpbk9iamVjdHM7XG4gICAgb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMgPSB0eXBlb2Ygb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuYWxsb3dQcm90b3R5cGVzIDogZGVmYXVsdHMuYWxsb3dQcm90b3R5cGVzO1xuICAgIG9wdGlvbnMucGFyYW1ldGVyTGltaXQgPSB0eXBlb2Ygb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9PT0gJ251bWJlcicgPyBvcHRpb25zLnBhcmFtZXRlckxpbWl0IDogZGVmYXVsdHMucGFyYW1ldGVyTGltaXQ7XG4gICAgb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPSB0eXBlb2Ygb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nIDogZGVmYXVsdHMuc3RyaWN0TnVsbEhhbmRsaW5nO1xuXG4gICAgaWYgKHN0ciA9PT0gJycgfHwgc3RyID09PSBudWxsIHx8IHR5cGVvZiBzdHIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICB9XG5cbiAgICB2YXIgdGVtcE9iaiA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gcGFyc2VWYWx1ZXMoc3RyLCBvcHRpb25zKSA6IHN0cjtcbiAgICB2YXIgb2JqID0gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIGtleXMgYW5kIHNldHVwIHRoZSBuZXcgb2JqZWN0XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRlbXBPYmopO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgdmFyIG5ld09iaiA9IHBhcnNlS2V5cyhrZXksIHRlbXBPYmpba2V5XSwgb3B0aW9ucyk7XG4gICAgICAgIG9iaiA9IHV0aWxzLm1lcmdlKG9iaiwgbmV3T2JqLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdXRpbHMuY29tcGFjdChvYmopO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxudmFyIGFycmF5UHJlZml4R2VuZXJhdG9ycyA9IHtcbiAgICBicmFja2V0czogZnVuY3Rpb24gYnJhY2tldHMocHJlZml4KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnW10nO1xuICAgIH0sXG4gICAgaW5kaWNlczogZnVuY3Rpb24gaW5kaWNlcyhwcmVmaXgsIGtleSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gcHJlZml4ICsgJ1snICsga2V5ICsgJ10nO1xuICAgIH0sXG4gICAgcmVwZWF0OiBmdW5jdGlvbiByZXBlYXQocHJlZml4KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiBwcmVmaXg7XG4gICAgfVxufTtcblxudmFyIHRvSVNPID0gRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmc7XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBlbmNvZGU6IHRydWUsXG4gICAgZW5jb2RlcjogdXRpbHMuZW5jb2RlLFxuICAgIGVuY29kZVZhbHVlc09ubHk6IGZhbHNlLFxuICAgIHNlcmlhbGl6ZURhdGU6IGZ1bmN0aW9uIHNlcmlhbGl6ZURhdGUoZGF0ZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gdG9JU08uY2FsbChkYXRlKTtcbiAgICB9LFxuICAgIHNraXBOdWxsczogZmFsc2UsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nOiBmYWxzZVxufTtcblxudmFyIHN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeSggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICBvYmplY3QsXG4gICAgcHJlZml4LFxuICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgIHNraXBOdWxscyxcbiAgICBlbmNvZGVyLFxuICAgIGZpbHRlcixcbiAgICBzb3J0LFxuICAgIGFsbG93RG90cyxcbiAgICBzZXJpYWxpemVEYXRlLFxuICAgIGZvcm1hdHRlcixcbiAgICBlbmNvZGVWYWx1ZXNPbmx5XG4pIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuICAgIGlmICh0eXBlb2YgZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG9iaiA9IGZpbHRlcihwcmVmaXgsIG9iaik7XG4gICAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIG9iaiA9IHNlcmlhbGl6ZURhdGUob2JqKTtcbiAgICB9IGVsc2UgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoc3RyaWN0TnVsbEhhbmRsaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlciAmJiAhZW5jb2RlVmFsdWVzT25seSA/IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyKSA6IHByZWZpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iaiA9ICcnO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fCB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgdXRpbHMuaXNCdWZmZXIob2JqKSkge1xuICAgICAgICBpZiAoZW5jb2Rlcikge1xuICAgICAgICAgICAgdmFyIGtleVZhbHVlID0gZW5jb2RlVmFsdWVzT25seSA/IHByZWZpeCA6IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyKTtcbiAgICAgICAgICAgIHJldHVybiBbZm9ybWF0dGVyKGtleVZhbHVlKSArICc9JyArIGZvcm1hdHRlcihlbmNvZGVyKG9iaiwgZGVmYXVsdHMuZW5jb2RlcikpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2Zvcm1hdHRlcihwcmVmaXgpICsgJz0nICsgZm9ybWF0dGVyKFN0cmluZyhvYmopKV07XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuXG4gICAgdmFyIG9iaktleXM7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyKSkge1xuICAgICAgICBvYmpLZXlzID0gZmlsdGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgb2JqS2V5cyA9IHNvcnQgPyBrZXlzLnNvcnQoc29ydCkgOiBrZXlzO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqS2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcblxuICAgICAgICBpZiAoc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQoc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgocHJlZml4LCBrZXkpLFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgICAgICBlbmNvZGVyLFxuICAgICAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5XG4gICAgICAgICAgICApKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQoc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAgICAgIHByZWZpeCArIChhbGxvd0RvdHMgPyAnLicgKyBrZXkgOiAnWycgKyBrZXkgKyAnXScpLFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgICAgICBlbmNvZGVyLFxuICAgICAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5XG4gICAgICAgICAgICApKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG9wdHMpIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuICAgIHZhciBvcHRpb25zID0gb3B0cyA/IHV0aWxzLmFzc2lnbih7fSwgb3B0cykgOiB7fTtcblxuICAgIGlmIChvcHRpb25zLmVuY29kZXIgIT09IG51bGwgJiYgb3B0aW9ucy5lbmNvZGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdGlvbnMuZW5jb2RlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFbmNvZGVyIGhhcyB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHZhciBkZWxpbWl0ZXIgPSB0eXBlb2Ygb3B0aW9ucy5kZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuZGVsaW1pdGVyIDogb3B0aW9ucy5kZWxpbWl0ZXI7XG4gICAgdmFyIHN0cmljdE51bGxIYW5kbGluZyA9IHR5cGVvZiBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgOiBkZWZhdWx0cy5zdHJpY3ROdWxsSGFuZGxpbmc7XG4gICAgdmFyIHNraXBOdWxscyA9IHR5cGVvZiBvcHRpb25zLnNraXBOdWxscyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5za2lwTnVsbHMgOiBkZWZhdWx0cy5za2lwTnVsbHM7XG4gICAgdmFyIGVuY29kZSA9IHR5cGVvZiBvcHRpb25zLmVuY29kZSA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5lbmNvZGUgOiBkZWZhdWx0cy5lbmNvZGU7XG4gICAgdmFyIGVuY29kZXIgPSB0eXBlb2Ygb3B0aW9ucy5lbmNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5lbmNvZGVyIDogZGVmYXVsdHMuZW5jb2RlcjtcbiAgICB2YXIgc29ydCA9IHR5cGVvZiBvcHRpb25zLnNvcnQgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLnNvcnQgOiBudWxsO1xuICAgIHZhciBhbGxvd0RvdHMgPSB0eXBlb2Ygb3B0aW9ucy5hbGxvd0RvdHMgPT09ICd1bmRlZmluZWQnID8gZmFsc2UgOiBvcHRpb25zLmFsbG93RG90cztcbiAgICB2YXIgc2VyaWFsaXplRGF0ZSA9IHR5cGVvZiBvcHRpb25zLnNlcmlhbGl6ZURhdGUgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLnNlcmlhbGl6ZURhdGUgOiBkZWZhdWx0cy5zZXJpYWxpemVEYXRlO1xuICAgIHZhciBlbmNvZGVWYWx1ZXNPbmx5ID0gdHlwZW9mIG9wdGlvbnMuZW5jb2RlVmFsdWVzT25seSA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5lbmNvZGVWYWx1ZXNPbmx5IDogZGVmYXVsdHMuZW5jb2RlVmFsdWVzT25seTtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZm9ybWF0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBvcHRpb25zLmZvcm1hdCA9IGZvcm1hdHNbJ2RlZmF1bHQnXTtcbiAgICB9IGVsc2UgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZm9ybWF0cy5mb3JtYXR0ZXJzLCBvcHRpb25zLmZvcm1hdCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBmb3JtYXQgb3B0aW9uIHByb3ZpZGVkLicpO1xuICAgIH1cbiAgICB2YXIgZm9ybWF0dGVyID0gZm9ybWF0cy5mb3JtYXR0ZXJzW29wdGlvbnMuZm9ybWF0XTtcbiAgICB2YXIgb2JqS2V5cztcbiAgICB2YXIgZmlsdGVyO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqID0gZmlsdGVyKCcnLCBvYmopO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zLmZpbHRlcikpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XG4gICAgICAgIG9iaktleXMgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgdmFyIGtleXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCBvYmogPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHZhciBhcnJheUZvcm1hdDtcbiAgICBpZiAob3B0aW9ucy5hcnJheUZvcm1hdCBpbiBhcnJheVByZWZpeEdlbmVyYXRvcnMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRpb25zLmFycmF5Rm9ybWF0O1xuICAgIH0gZWxzZSBpZiAoJ2luZGljZXMnIGluIG9wdGlvbnMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRpb25zLmluZGljZXMgPyAnaW5kaWNlcycgOiAncmVwZWF0JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheUZvcm1hdCA9ICdpbmRpY2VzJztcbiAgICB9XG5cbiAgICB2YXIgZ2VuZXJhdGVBcnJheVByZWZpeCA9IGFycmF5UHJlZml4R2VuZXJhdG9yc1thcnJheUZvcm1hdF07XG5cbiAgICBpZiAoIW9iaktleXMpIHtcbiAgICAgICAgb2JqS2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgfVxuXG4gICAgaWYgKHNvcnQpIHtcbiAgICAgICAgb2JqS2V5cy5zb3J0KHNvcnQpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqS2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcblxuICAgICAgICBpZiAoc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChzdHJpbmdpZnkoXG4gICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICBza2lwTnVsbHMsXG4gICAgICAgICAgICBlbmNvZGUgPyBlbmNvZGVyIDogbnVsbCxcbiAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICBhbGxvd0RvdHMsXG4gICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgZW5jb2RlVmFsdWVzT25seVxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICB2YXIgam9pbmVkID0ga2V5cy5qb2luKGRlbGltaXRlcik7XG4gICAgdmFyIHByZWZpeCA9IG9wdGlvbnMuYWRkUXVlcnlQcmVmaXggPT09IHRydWUgPyAnPycgOiAnJztcblxuICAgIHJldHVybiBqb2luZWQubGVuZ3RoID4gMCA/IHByZWZpeCArIGpvaW5lZCA6ICcnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBoZXhUYWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFycmF5ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICAgICAgICBhcnJheS5wdXNoKCclJyArICgoaSA8IDE2ID8gJzAnIDogJycpICsgaS50b1N0cmluZygxNikpLnRvVXBwZXJDYXNlKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBhcnJheTtcbn0oKSk7XG5cbnZhciBjb21wYWN0UXVldWUgPSBmdW5jdGlvbiBjb21wYWN0UXVldWUocXVldWUpIHtcbiAgICB2YXIgb2JqO1xuXG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlLnBvcCgpO1xuICAgICAgICBvYmogPSBpdGVtLm9ialtpdGVtLnByb3BdO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHZhciBjb21wYWN0ZWQgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBvYmoubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ialtqXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFjdGVkLnB1c2gob2JqW2pdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0ub2JqW2l0ZW0ucHJvcF0gPSBjb21wYWN0ZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxuZXhwb3J0cy5hcnJheVRvT2JqZWN0ID0gZnVuY3Rpb24gYXJyYXlUb09iamVjdChzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICB2YXIgb2JqID0gb3B0aW9ucyAmJiBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZVtpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIG9ialtpXSA9IHNvdXJjZVtpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24gbWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICAgICAgICB0YXJnZXQucHVzaChzb3VyY2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5wbGFpbk9iamVjdHMgfHwgb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMgfHwgIWhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHNvdXJjZSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbc291cmNlXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW3RhcmdldCwgc291cmNlXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBbdGFyZ2V0XS5jb25jYXQoc291cmNlKTtcbiAgICB9XG5cbiAgICB2YXIgbWVyZ2VUYXJnZXQgPSB0YXJnZXQ7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSAmJiAhQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIG1lcmdlVGFyZ2V0ID0gZXhwb3J0cy5hcnJheVRvT2JqZWN0KHRhcmdldCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSAmJiBBcnJheS5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgICAgc291cmNlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbiAgICAgICAgICAgIGlmIChoYXMuY2FsbCh0YXJnZXQsIGkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldFtpXSAmJiB0eXBlb2YgdGFyZ2V0W2ldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRbaV0gPSBleHBvcnRzLm1lcmdlKHRhcmdldFtpXSwgaXRlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbaV0gPSBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG4gICAgICAgIGlmIChoYXMuY2FsbChhY2MsIGtleSkpIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gZXhwb3J0cy5tZXJnZShhY2Nba2V5XSwgdmFsdWUsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWNjW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIG1lcmdlVGFyZ2V0KTtcbn07XG5cbmV4cG9ydHMuYXNzaWduID0gZnVuY3Rpb24gYXNzaWduU2luZ2xlU291cmNlKHRhcmdldCwgc291cmNlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICBhY2Nba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHRhcmdldCk7XG59O1xuXG5leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0ci5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbn07XG5cbmV4cG9ydHMuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKHN0cikge1xuICAgIC8vIFRoaXMgY29kZSB3YXMgb3JpZ2luYWxseSB3cml0dGVuIGJ5IEJyaWFuIFdoaXRlIChtc2NkZXgpIGZvciB0aGUgaW8uanMgY29yZSBxdWVyeXN0cmluZyBsaWJyYXJ5LlxuICAgIC8vIEl0IGhhcyBiZWVuIGFkYXB0ZWQgaGVyZSBmb3Igc3RyaWN0ZXIgYWRoZXJlbmNlIHRvIFJGQyAzOTg2XG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICB2YXIgc3RyaW5nID0gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyBzdHIgOiBTdHJpbmcoc3RyKTtcblxuICAgIHZhciBvdXQgPSAnJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgYyA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGMgPT09IDB4MkQgLy8gLVxuICAgICAgICAgICAgfHwgYyA9PT0gMHgyRSAvLyAuXG4gICAgICAgICAgICB8fCBjID09PSAweDVGIC8vIF9cbiAgICAgICAgICAgIHx8IGMgPT09IDB4N0UgLy8gflxuICAgICAgICAgICAgfHwgKGMgPj0gMHgzMCAmJiBjIDw9IDB4MzkpIC8vIDAtOVxuICAgICAgICAgICAgfHwgKGMgPj0gMHg0MSAmJiBjIDw9IDB4NUEpIC8vIGEtelxuICAgICAgICAgICAgfHwgKGMgPj0gMHg2MSAmJiBjIDw9IDB4N0EpIC8vIEEtWlxuICAgICAgICApIHtcbiAgICAgICAgICAgIG91dCArPSBzdHJpbmcuY2hhckF0KGkpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4ODApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIGhleFRhYmxlW2NdO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4ODAwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyAoaGV4VGFibGVbMHhDMCB8IChjID4+IDYpXSArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHhEODAwIHx8IGMgPj0gMHhFMDAwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyAoaGV4VGFibGVbMHhFMCB8IChjID4+IDEyKV0gKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaSArPSAxO1xuICAgICAgICBjID0gMHgxMDAwMCArICgoKGMgJiAweDNGRikgPDwgMTApIHwgKHN0cmluZy5jaGFyQ29kZUF0KGkpICYgMHgzRkYpKTtcbiAgICAgICAgb3V0ICs9IGhleFRhYmxlWzB4RjAgfCAoYyA+PiAxOCldXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gMTIpICYgMHgzRildXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gNikgJiAweDNGKV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG5leHBvcnRzLmNvbXBhY3QgPSBmdW5jdGlvbiBjb21wYWN0KHZhbHVlKSB7XG4gICAgdmFyIHF1ZXVlID0gW3sgb2JqOiB7IG86IHZhbHVlIH0sIHByb3A6ICdvJyB9XTtcbiAgICB2YXIgcmVmcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlW2ldO1xuICAgICAgICB2YXIgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwga2V5cy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbal07XG4gICAgICAgICAgICB2YXIgdmFsID0gb2JqW2tleV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsICE9PSBudWxsICYmIHJlZnMuaW5kZXhPZih2YWwpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goeyBvYmo6IG9iaiwgcHJvcDoga2V5IH0pO1xuICAgICAgICAgICAgICAgIHJlZnMucHVzaCh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXBhY3RRdWV1ZShxdWV1ZSk7XG59O1xuXG5leHBvcnRzLmlzUmVnRXhwID0gZnVuY3Rpb24gaXNSZWdFeHAob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBSZWdFeHBdJztcbn07XG5cbmV4cG9ydHMuaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlcihvYmopIHtcbiAgICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gISEob2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKSk7XG59O1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59O1xyXG4iLCJjb25zdCBheGlvcyA9IHJlcXVpcmUoXCJheGlvc1wiKTtcbmNvbnN0IGJhc2U2NCA9IHJlcXVpcmUoXCJiYXNlLTY0XCIpO1xuY29uc3QgcXMgPSByZXF1aXJlKFwicXNcIik7XG5jb25zdCBBViA9IHJlcXVpcmUoXCJhcmd1bWVudC12YWxpZGF0b3JcIik7XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSBwYXlsb2FkIGZyb20gYSBKV1RcbiAqIEBwYXJhbSAge1N0cmluZ30gdG9rZW4gVGhlIEpXVCB0byByZXRyaWV2ZSB0aGUgcGF5bG9hZCBmcm9tXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgIFRoZSBKV1QgcGF5bG9hZFxuICovXG5mdW5jdGlvbiBnZXRQYXlsb2FkKHRva2VuKSB7XG4gIGNvbnN0IHBheWxvYWRCYXNlNjQgPSB0b2tlblxuICAgIC5zcGxpdChcIi5cIilbMV1cbiAgICAucmVwbGFjZShcIi1cIiwgXCIrXCIpXG4gICAgLnJlcGxhY2UoXCJfXCIsIFwiL1wiKTtcbiAgY29uc3QgcGF5bG9hZERlY29kZWQgPSBiYXNlNjQuZGVjb2RlKHBheWxvYWRCYXNlNjQpO1xuICBjb25zdCBwYXlsb2FkT2JqZWN0ID0gSlNPTi5wYXJzZShwYXlsb2FkRGVjb2RlZCk7XG5cbiAgaWYgKEFWLmlzTnVtYmVyKHBheWxvYWRPYmplY3QuZXhwKSkge1xuICAgIHBheWxvYWRPYmplY3QuZXhwID0gbmV3IERhdGUocGF5bG9hZE9iamVjdC5leHAgKiAxMDAwKTtcbiAgfVxuXG4gIHJldHVybiBwYXlsb2FkT2JqZWN0O1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBTREsgaW5zdGFuY2VcbiAqIEBwYXJhbSAgICAgICB7b2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSAgICAgICB7c3RyaW5nfSBbb3B0aW9ucy51cmxdICAgVGhlIEFQSSB1cmwgdG8gY29ubmVjdCB0b1xuICogQHBhcmFtICAgICAgIHtzdHJpbmd9IFtvcHRpb25zLmVudl0gICBUaGUgQVBJIGVudmlyb25tZW50IHRvIGNvbm5lY3QgdG9cbiAqIEBwYXJhbSAgICAgICB7c3RyaW5nfSBbb3B0aW9ucy50b2tlbl0gVGhlIGFjY2VzcyB0b2tlbiB0byB1c2UgZm9yIHJlcXVlc3RzXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gU0RLKG9wdGlvbnMgPSB7fSkge1xuICByZXR1cm4ge1xuICAgIHVybDogb3B0aW9ucy51cmwsXG4gICAgdG9rZW46IG9wdGlvbnMudG9rZW4sXG4gICAgZW52OiBvcHRpb25zLmVudiB8fCBcIl9cIixcbiAgICBheGlvczogYXhpb3MuY3JlYXRlKHtcbiAgICAgIHBhcmFtc1NlcmlhbGl6ZXI6IHFzLnN0cmluZ2lmeSxcbiAgICAgIHRpbWVvdXQ6IDEwICogNjAgKiAxMDAwIC8vIDEwIG1pblxuICAgIH0pLFxuICAgIHJlZnJlc2hJbnRlcnZhbDogbnVsbCxcbiAgICBvbkF1dG9SZWZyZXNoRXJyb3I6IG51bGwsXG4gICAgb25BdXRvUmVmcmVzaFN1Y2Nlc3M6IG51bGwsXG5cbiAgICBnZXQgcGF5bG9hZCgpIHtcbiAgICAgIGlmICghQVYuaXNTdHJpbmcodGhpcy50b2tlbikpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIGdldFBheWxvYWQodGhpcy50b2tlbik7XG4gICAgfSxcblxuICAgIGdldCBsb2dnZWRJbigpIHtcbiAgICAgIGlmIChcbiAgICAgICAgQVYuaXNTdHJpbmcodGhpcy50b2tlbikgJiZcbiAgICAgICAgQVYuaXNTdHJpbmcodGhpcy51cmwpICYmXG4gICAgICAgIEFWLmlzU3RyaW5nKHRoaXMuZW52KSAmJlxuICAgICAgICBBVi5pc09iamVjdCh0aGlzLnBheWxvYWQpXG4gICAgICApIHtcbiAgICAgICAgaWYgKHRoaXMucGF5bG9hZC5leHAuZ2V0VGltZSgpID4gRGF0ZS5ub3coKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIC8vIFJFUVVFU1QgTUVUSE9EU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIERpcmVjdHVzIEFQSSByZXF1ZXN0IHByb21pc2VcbiAgICAgKiBAcHJvbWlzZSBSZXF1ZXN0UHJvbWlzZVxuICAgICAqIEBmdWxmaWxsIHtvYmplY3R9IERpcmVjdHVzIGRhdGFcbiAgICAgKiBAcmVqZWN0IHtFcnJvcn0gTmV0d29yayBlcnJvciAoaWYgbm8gY29ubmVjdGlvbiB0byBBUEkpXG4gICAgICogQHJlamVjdCB7RXJyb3J9IERpcmVjdHVzIGVycm9yIChlZyBub3QgbG9nZ2VkIGluIG9yIDQwNClcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYW4gQVBJIHJlcXVlc3QgdG8gdGhlIERpcmVjdHVzIEFQSVxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gbWV0aG9kICAgICAgVGhlIEhUVFAgbWV0aG9kIHRvIHVzZVxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gZW5kcG9pbnQgICAgVGhlIEFQSSBlbmRwb2ludCB0byByZXF1ZXN0XG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBUaGUgSFRUUCBxdWVyeSBwYXJhbWV0ZXJzIChHRVQgb25seSlcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtkYXRhPXt9XSAgIFRoZSBIVFRQIHJlcXVlc3QgYm9keSAobm9uLUdFVCBvbmx5KVxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IG5vRW52ICAgICAgRG9uJ3QgdXNlIHRoZSBlbnYgaW4gdGhlIHBhdGhcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICByZXF1ZXN0KFxuICAgICAgbWV0aG9kLFxuICAgICAgZW5kcG9pbnQsXG4gICAgICBwYXJhbXMgPSB7fSxcbiAgICAgIGRhdGEgPSB7fSxcbiAgICAgIG5vRW52ID0gZmFsc2UsXG4gICAgICBoZWFkZXJzID0ge31cbiAgICApIHtcbiAgICAgIEFWLnN0cmluZyhtZXRob2QsIFwibWV0aG9kXCIpO1xuICAgICAgQVYuc3RyaW5nKGVuZHBvaW50LCBcImVuZHBvaW50XCIpO1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgQXJyYXkuaXNBcnJheShkYXRhKVxuICAgICAgICA/IEFWLmFycmF5T3JFbXB0eShkYXRhLCBcImRhdGFcIilcbiAgICAgICAgOiBBVi5vYmplY3RPckVtcHR5KGRhdGEsIFwiZGF0YVwiKTtcblxuICAgICAgQVYuc3RyaW5nKHRoaXMudXJsLCBcInRoaXMudXJsXCIpO1xuXG4gICAgICBsZXQgYmFzZVVSTCA9IGAke3RoaXMudXJsfS9gO1xuXG4gICAgICBpZiAobm9FbnYgPT09IGZhbHNlKSB7XG4gICAgICAgIGJhc2VVUkwgKz0gYCR7dGhpcy5lbnZ9L2A7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgICB1cmw6IGVuZHBvaW50LFxuICAgICAgICBtZXRob2QsXG4gICAgICAgIGJhc2VVUkwsXG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgZGF0YVxuICAgICAgfTtcblxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnRva2VuICYmXG4gICAgICAgIHR5cGVvZiB0aGlzLnRva2VuID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgIHRoaXMudG9rZW4ubGVuZ3RoID4gMFxuICAgICAgKSB7XG4gICAgICAgIHJlcXVlc3RPcHRpb25zLmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgICAgICByZXF1ZXN0T3B0aW9ucy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dGhpcy50b2tlbn1gO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5heGlvc1xuICAgICAgICAucmVxdWVzdChyZXF1ZXN0T3B0aW9ucylcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICBpZiAoIWRhdGEgfHwgZGF0YS5sZW5ndGggPT09IDApIHJldHVybiBkYXRhO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBkYXRhICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgIHRocm93IHtcbiAgICAgICAgICAgICAgICBqc29uOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgICAgIGRhdGFcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yLnJlc3BvbnNlLmRhdGEuZXJyb3I7XG4gICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5qc29uID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aHJvdyB7XG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgY29kZTogLTIsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IFwiQVBJIHJldHVybmVkIGludmFsaWQgSlNPTlwiLFxuICAgICAgICAgICAgICBlcnJvcjogZXJyb3IuZXJyb3IsXG4gICAgICAgICAgICAgIGRhdGE6IGVycm9yLmRhdGFcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IHtcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICBjb2RlOiAtMSxcbiAgICAgICAgICAgICAgbWVzc2FnZTogXCJOZXR3b3JrIEVycm9yXCIsXG4gICAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdFVCBjb252ZW5pZW5jZSBtZXRob2QuIENhbGxzIHRoZSByZXF1ZXN0IG1ldGhvZCBmb3IgeW91XG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBlbmRwb2ludCAgICBUaGUgZW5kcG9pbnQgdG8gZ2V0XG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBUaGUgSFRUUCBxdWVyeSBwYXJhbWV0ZXJzIChHRVQgb25seSlcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXQoZW5kcG9pbnQsIHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5zdHJpbmcoZW5kcG9pbnQsIFwiZW5kcG9pbnRcIik7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG5cbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXCJnZXRcIiwgZW5kcG9pbnQsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBPU1QgY29udmVuaWVuY2UgbWV0aG9kLiBDYWxscyB0aGUgcmVxdWVzdCBtZXRob2QgZm9yIHlvdVxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gZW5kcG9pbnQgIFRoZSBlbmRwb2ludCB0byBnZXRcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtib2R5PXt9XSBUaGUgSFRUUCByZXF1ZXN0IGJvZHlcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBwb3N0KGVuZHBvaW50LCBib2R5ID0ge30sIHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5zdHJpbmcoZW5kcG9pbnQsIFwiZW5kcG9pbnRcIik7XG4gICAgICBBcnJheS5pc0FycmF5KGJvZHkpXG4gICAgICAgID8gQVYuYXJyYXlPckVtcHR5KGJvZHksIFwiYm9keVwiKVxuICAgICAgICA6IEFWLm9iamVjdE9yRW1wdHkoYm9keSwgXCJib2R5XCIpO1xuXG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwicG9zdFwiLCBlbmRwb2ludCwgcGFyYW1zLCBib2R5KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUEFUQ0ggY29udmVuaWVuY2UgbWV0aG9kLiBDYWxscyB0aGUgcmVxdWVzdCBtZXRob2QgZm9yIHlvdVxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gZW5kcG9pbnQgIFRoZSBlbmRwb2ludCB0byBnZXRcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtib2R5PXt9XSBUaGUgSFRUUCByZXF1ZXN0IGJvZHlcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBwYXRjaChlbmRwb2ludCwgYm9keSA9IHt9LCBwYXJhbXMgPSB7fSkge1xuICAgICAgQVYuc3RyaW5nKGVuZHBvaW50LCBcImVuZHBvaW50XCIpO1xuICAgICAgQXJyYXkuaXNBcnJheShib2R5KVxuICAgICAgICA/IEFWLmFycmF5T3JFbXB0eShib2R5LCBcImJvZHlcIilcbiAgICAgICAgOiBBVi5vYmplY3RPckVtcHR5KGJvZHksIFwiYm9keVwiKTtcblxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcInBhdGNoXCIsIGVuZHBvaW50LCBwYXJhbXMsIGJvZHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQQVRDSCBjb252ZW5pZW5jZSBtZXRob2QuIENhbGxzIHRoZSByZXF1ZXN0IG1ldGhvZCBmb3IgeW91XG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBlbmRwb2ludCAgVGhlIGVuZHBvaW50IHRvIGdldFxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW2JvZHk9e31dIFRoZSBIVFRQIHJlcXVlc3QgYm9keVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHB1dChlbmRwb2ludCwgYm9keSA9IHt9LCBwYXJhbXMgPSB7fSkge1xuICAgICAgQVYuc3RyaW5nKGVuZHBvaW50LCBcImVuZHBvaW50XCIpO1xuICAgICAgQXJyYXkuaXNBcnJheShib2R5KVxuICAgICAgICA/IEFWLmFycmF5T3JFbXB0eShib2R5LCBcImJvZHlcIilcbiAgICAgICAgOiBBVi5vYmplY3RPckVtcHR5KGJvZHksIFwiYm9keVwiKTtcblxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcInB1dFwiLCBlbmRwb2ludCwgcGFyYW1zLCBib2R5KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUEFUQ0ggY29udmVuaWVuY2UgbWV0aG9kLiBDYWxscyB0aGUgcmVxdWVzdCBtZXRob2QgZm9yIHlvdVxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gZW5kcG9pbnQgIFRoZSBlbmRwb2ludCB0byBnZXRcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBkZWxldGUoZW5kcG9pbnQpIHtcbiAgICAgIEFWLnN0cmluZyhlbmRwb2ludCwgXCJlbmRwb2ludFwiKTtcblxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcImRlbGV0ZVwiLCBlbmRwb2ludCk7XG4gICAgfSxcblxuICAgIC8vIEFVVEhFTlRJQ0FUSU9OXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogTG9nZ2luZyBpbiBwcm9taXNlXG4gICAgICogQHByb21pc2UgTG9naW5Qcm9taXNlXG4gICAgICogQGZ1bGZpbGwge09iamVjdH0gT2JqZWN0IGNvbnRhaW5pbmcgVVJMLCBFTlYsIGFuZCBUT0tFTlxuICAgICAqIEByZWplY3Qge0Vycm9yfSAgIE5ldHdvcmsgZXJyb3IgKGlmIG5vIGNvbm5lY3Rpb24gdG8gQVBJKVxuICAgICAqIEByZWplY3Qge0Vycm9yfSAgIERpcmVjdHVzIGVycm9yIChlZyBub3QgbG9nZ2VkIGluIG9yIDQwNClcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIExvZ2luIHRvIHRoZSBBUEkuXG4gICAgICpcbiAgICAgKiBHZXRzIGEgbmV3IHRva2VuIGZyb20gdGhlIEFQSSBhbmQgc3RvcmVzIGl0IGluIHRoaXMudG9rZW5cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGNyZWRlbnRpYWxzXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjcmVkZW50aWFscy5lbWFpbCAgICBUaGUgdXNlcidzIGVtYWlsIGFkZHJlc3NcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNyZWRlbnRpYWxzLnBhc3N3b3JkIFRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IFtjcmVkZW50aWFscy51cmxdICAgIFRoZSBBUEkgdG8gbG9naW4gdG8gKG92ZXJ3cml0ZXMgdGhpcy51cmwpXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBbY3JlZGVudGlhbHMuZW52XSAgICBUaGUgQVBJIGVudiB0byBsb2dpbiB0byAob3ZlcndyaXRlcyB0aGlzLmVudilcbiAgICAgKiBAcmV0dXJuIHtMb2dpblByb21pc2V9XG4gICAgICovXG4gICAgbG9naW4oY3JlZGVudGlhbHMpIHtcbiAgICAgIEFWLm9iamVjdChjcmVkZW50aWFscywgXCJjcmVkZW50aWFsc1wiKTtcbiAgICAgIEFWLmtleXNXaXRoU3RyaW5nKGNyZWRlbnRpYWxzLCBbXCJlbWFpbFwiLCBcInBhc3N3b3JkXCJdLCBcImNyZWRlbnRpYWxzXCIpO1xuXG4gICAgICB0aGlzLnRva2VuID0gbnVsbDtcblxuICAgICAgaWYgKEFWLmhhc0tleXNXaXRoU3RyaW5nKGNyZWRlbnRpYWxzLCBbXCJ1cmxcIl0pKSB7XG4gICAgICAgIHRoaXMudXJsID0gY3JlZGVudGlhbHMudXJsO1xuICAgICAgfVxuXG4gICAgICBpZiAoQVYuaGFzS2V5c1dpdGhTdHJpbmcoY3JlZGVudGlhbHMsIFtcImVudlwiXSkpIHtcbiAgICAgICAgdGhpcy5lbnYgPSBjcmVkZW50aWFscy5lbnY7XG4gICAgICB9XG5cbiAgICAgIGlmIChjcmVkZW50aWFscy5wZXJzaXN0KSB7XG4gICAgICAgIHRoaXMuc3RhcnRJbnRlcnZhbCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0aGlzLnBvc3QoXCIvYXV0aC9hdXRoZW50aWNhdGVcIiwge1xuICAgICAgICAgIGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCxcbiAgICAgICAgICBwYXNzd29yZDogY3JlZGVudGlhbHMucGFzc3dvcmRcbiAgICAgICAgfSlcbiAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEudG9rZW4pXG4gICAgICAgICAgLnRoZW4odG9rZW4gPT4ge1xuICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuO1xuICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgICAgICAgIGVudjogdGhpcy5lbnYsXG4gICAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIExvZ3MgdGhlIHVzZXIgb3V0IGJ5IFwiZm9yZ2V0dGluZ1wiIHRoZSBVUkwsIEVOViwgYW5kIHRva2VuLCBhbmQgY2xlYXJpbmcgdGhlIHJlZnJlc2ggaW50ZXJ2YWxcbiAgICAgKi9cbiAgICBsb2dvdXQoKSB7XG4gICAgICB0aGlzLnRva2VuID0gbnVsbDtcbiAgICAgIHRoaXMuZW52ID0gXCJfXCI7XG4gICAgICB0aGlzLnVybCA9IG51bGw7XG5cbiAgICAgIGlmICh0aGlzLnJlZnJlc2hJbnRlcnZhbCkge1xuICAgICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdGFydHMgYW4gaW50ZXJ2YWwgb2YgMTAgc2Vjb25kcyB0aGF0IHdpbGwgY2hlY2sgaWYgdGhlIHRva2VuIG5lZWRzIHJlZnJlc2hpbmdcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZpcmVJbW1lZGlhdGVseSBGaXJlIHRoZSByZWZyZXNoSWZOZWVkZWQgbWV0aG9kIGRpcmVjdGx5XG4gICAgICovXG4gICAgc3RhcnRJbnRlcnZhbChmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgIGlmIChmaXJlSW1tZWRpYXRlbHkpIHRoaXMucmVmcmVzaElmTmVlZGVkKCk7XG4gICAgICB0aGlzLnJlZnJlc2hJbnRlcnZhbCA9IHNldEludGVydmFsKFxuICAgICAgICB0aGlzLnJlZnJlc2hJZk5lZWRlZC5iaW5kKHRoaXMpLFxuICAgICAgICAxMDAwMFxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIGFuZCBudWxsaWZpZXMgdGhlIHRva2VuIHJlZnJlc2hpbmcgaW50ZXJ2YWxcbiAgICAgKi9cbiAgICBzdG9wSW50ZXJ2YWwoKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMucmVmcmVzaEludGVydmFsKTtcbiAgICAgIHRoaXMucmVmcmVzaEludGVydmFsID0gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVmcmVzaCB0aGUgdG9rZW4gaWYgaXQgaXMgYWJvdXQgdG8gZXhwaXJlICh3aXRoaW4gMzAgc2Vjb25kcyBvZiBleHBpcnkgZGF0ZSlcbiAgICAgKlxuICAgICAqIENhbGxzIG9uQXV0b1JlZnJlc2hTdWNjZXNzIHdpdGggdGhlIG5ldyB0b2tlbiBpZiB0aGUgcmVmcmVzaGluZyBpcyBzdWNjZXNzZnVsXG4gICAgICogQ2FsbHMgb25BdXRvUmVmcmVzaEVycm9yIGlmIHJlZnJlc2hpbmcgdGhlIHRva2VuIGZhaWxzIGZvciBzb21lIHJlYXNvblxuICAgICAqL1xuICAgIHJlZnJlc2hJZk5lZWRlZCgpIHtcbiAgICAgIGlmICghQVYuaGFzU3RyaW5nS2V5cyh0aGlzLCBbXCJ0b2tlblwiLCBcInVybFwiLCBcImVudlwiXSkpIHJldHVybjtcbiAgICAgIGlmICghdGhpcy5wYXlsb2FkIHx8ICF0aGlzLnBheWxvYWQuZXhwKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHRpbWVEaWZmID0gdGhpcy5wYXlsb2FkLmV4cC5nZXRUaW1lKCkgLSBEYXRlLm5vdygpO1xuXG4gICAgICBpZiAodGltZURpZmYgPD0gMCkge1xuICAgICAgICBpZiAoQVYuaXNGdW5jdGlvbih0aGlzLm9uQXV0b1JlZnJlc2hFcnJvcikpIHtcbiAgICAgICAgICB0aGlzLm9uQXV0b1JlZnJlc2hFcnJvcih7XG4gICAgICAgICAgICBtZXNzYWdlOiBcImF1dGhfZXhwaXJlZF90b2tlblwiLFxuICAgICAgICAgICAgY29kZTogMTAyXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGltZURpZmYgPCAzMDAwMCkge1xuICAgICAgICB0aGlzLnJlZnJlc2godGhpcy50b2tlbilcbiAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy50b2tlbiA9IHJlcy5kYXRhLnRva2VuO1xuICAgICAgICAgICAgaWYgKEFWLmlzRnVuY3Rpb24odGhpcy5vbkF1dG9SZWZyZXNoU3VjY2VzcykpIHtcbiAgICAgICAgICAgICAgdGhpcy5vbkF1dG9SZWZyZXNoU3VjY2Vzcyh7XG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgICAgICAgICAgICBlbnY6IHRoaXMuZW52LFxuICAgICAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGlmIChBVi5pc0Z1bmN0aW9uKHRoaXMub25BdXRvUmVmcmVzaEVycm9yKSkge1xuICAgICAgICAgICAgICB0aGlzLm9uQXV0b1JlZnJlc2hFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVzZSB0aGUgcGFzc2VkIHRva2VuIHRvIHJlcXVlc3QgYSBuZXcgb25lXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB0b2tlbiBBY3RpdmUgJiBWYWxpZCB0b2tlblxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHJlZnJlc2godG9rZW4pIHtcbiAgICAgIEFWLnN0cmluZyh0b2tlbiwgXCJ0b2tlblwiKTtcbiAgICAgIHJldHVybiB0aGlzLnBvc3QoXCIvYXV0aC9yZWZyZXNoXCIsIHsgdG9rZW4gfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3QgdG8gcmVzZXQgdGhlIHBhc3N3b3JkIG9mIHRoZSB1c2VyIHdpdGggdGhlIGdpdmVuIGVtYWlsIGFkZHJlc3NcbiAgICAgKlxuICAgICAqIFRoZSBBUEkgd2lsbCBzZW5kIGFuIGVtYWlsIHRvIHRoZSBnaXZlbiBlbWFpbCBhZGRyZXNzIHdpdGggYSBsaW5rIHRvIGdlbmVyYXRlIGEgbmV3XG4gICAgICogdGVtcG9yYXJ5IHBhc3N3b3JkLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbWFpbCBUaGUgdXNlcidzIGVtYWlsXG4gICAgICovXG4gICAgcmVxdWVzdFBhc3N3b3JkUmVzZXQoZW1haWwpIHtcbiAgICAgIEFWLnN0cmluZyhlbWFpbCwgXCJlbWFpbFwiKTtcbiAgICAgIHJldHVybiB0aGlzLnBvc3QoXCIvYXV0aC9yZXNldC1yZXF1ZXN0XCIsIHtcbiAgICAgICAgZW1haWwsXG4gICAgICAgIGluc3RhbmNlOiB0aGlzLnVybFxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8vIEFDVElWSVRZXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFjdGl2aXR5XG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0QWN0aXZpdHkocGFyYW1zID0ge30pIHtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChcIi9hY3Rpdml0eVwiLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvLyBCT09LTUFSS1NcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGJvb2ttYXJrcyBvZiB0aGUgY3VycmVudCB1c2VyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0TXlCb29rbWFya3MocGFyYW1zID0ge30pIHtcbiAgICAgIEFWLnN0cmluZyh0aGlzLnRva2VuLCBcInRoaXMudG9rZW5cIik7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcyk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICB0aGlzLmdldChcIi9jb2xsZWN0aW9uX3ByZXNldHNcIiwge1xuICAgICAgICAgIFwiZmlsdGVyW3RpdGxlXVtubnVsbF1cIjogMSxcbiAgICAgICAgICBcImZpbHRlclt1c2VyXVtlcV1cIjogdGhpcy5wYXlsb2FkLmlkXG4gICAgICAgIH0pLFxuICAgICAgICB0aGlzLmdldChcIi9jb2xsZWN0aW9uX3ByZXNldHNcIiwge1xuICAgICAgICAgIFwiZmlsdGVyW3RpdGxlXVtubnVsbF1cIjogMSxcbiAgICAgICAgICBcImZpbHRlcltyb2xlXVtlcV1cIjogdGhpcy5wYXlsb2FkLnJvbGUsXG4gICAgICAgICAgXCJmaWx0ZXJbdXNlcl1bbnVsbF1cIjogMVxuICAgICAgICB9KVxuICAgICAgXSkudGhlbih2YWx1ZXMgPT4ge1xuICAgICAgICBjb25zdCBbdXNlciwgcm9sZV0gPSB2YWx1ZXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2hhZG93XG4gICAgICAgIHJldHVybiBbLi4udXNlci5kYXRhLCAuLi5yb2xlLmRhdGFdO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8vIENPTExFQ1RJT05TXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgY29sbGVjdGlvbnNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRDb2xsZWN0aW9ucyhwYXJhbXMgPSB7fSkge1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiL2NvbGxlY3Rpb25zXCIsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBjb2xsZWN0aW9uIGluZm8gYnkgbmFtZVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiAgQ29sbGVjdGlvbiBuYW1lXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0Q29sbGVjdGlvbihjb2xsZWN0aW9uLCBwYXJhbXMgPSB7fSkge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChgL2NvbGxlY3Rpb25zLyR7Y29sbGVjdGlvbn1gLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBjb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgQ29sbGVjdGlvbiBpbmZvcm1hdGlvblxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGNyZWF0ZUNvbGxlY3Rpb24oZGF0YSkge1xuICAgICAgQVYub2JqZWN0KGRhdGEsIFwiZGF0YVwiKTtcbiAgICAgIHJldHVybiB0aGlzLnBvc3QoXCIvY29sbGVjdGlvbnNcIiwgZGF0YSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gVGhlIGNvbGxlY3Rpb24gdG8gdXBkYXRlXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZmllbGRzIHRvIHVwZGF0ZVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHVwZGF0ZUNvbGxlY3Rpb24oY29sbGVjdGlvbiwgZGF0YSkge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLm9iamVjdChkYXRhLCBcImRhdGFcIik7XG4gICAgICByZXR1cm4gdGhpcy5wYXRjaChgL2NvbGxlY3Rpb25zLyR7Y29sbGVjdGlvbn1gLCBkYXRhKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBwcmltYXJ5IGtleSBvZiB0aGUgY29sbGVjdGlvbiB0byByZW1vdmVcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBkZWxldGVDb2xsZWN0aW9uKGNvbGxlY3Rpb24pIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICByZXR1cm4gdGhpcy5kZWxldGUoYC9jb2xsZWN0aW9ucy8ke2NvbGxlY3Rpb259YCk7XG4gICAgfSxcblxuICAgIC8vIENPTExFQ1RJT04gUFJFU0VUU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBjb2xsZWN0aW9uIHByZXNldCAoYm9va21hcmsgLyBsaXN0aW5nIHByZWZlcmVuY2VzKVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZGF0YSBUaGUgYm9va21hcmsgaW5mb1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGNyZWF0ZUNvbGxlY3Rpb25QcmVzZXQoZGF0YSkge1xuICAgICAgQVYub2JqZWN0KGRhdGEpO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChcIi9jb2xsZWN0aW9uX3ByZXNldHNcIiwgZGF0YSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBjb2xsZWN0aW9uIHByZXNldCAoYm9va21hcmsgLyBsaXN0aW5nIHByZWZlcmVuY2UpXG4gICAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBwcmltYXJ5S2V5XG4gICAgICogQHBhcmFtIHtSZXF1ZXN0UHJvbWlzZX0gZGF0YVxuICAgICAqL1xuICAgIHVwZGF0ZUNvbGxlY3Rpb25QcmVzZXQocHJpbWFyeUtleSwgZGF0YSkge1xuICAgICAgQVYubm90TnVsbChwcmltYXJ5S2V5LCBcInByaW1hcnlLZXlcIik7XG4gICAgICBBVi5vYmplY3QoZGF0YSwgXCJkYXRhXCIpO1xuXG4gICAgICByZXR1cm4gdGhpcy5wYXRjaChgL2NvbGxlY3Rpb25fcHJlc2V0cy8ke3ByaW1hcnlLZXl9YCwgZGF0YSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSBjb2xsZWN0aW9uIHByZXNldCBieSBwcmltYXJ5a2V5XG4gICAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBwcmltYXJ5S2V5IFRoZSBwcmltYXJ5S2V5IG9mIHRoZSBwcmVzZXQgdG8gZGVsZXRlXG4gICAgICovXG4gICAgZGVsZXRlQ29sbGVjdGlvblByZXNldChwcmltYXJ5S2V5KSB7XG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcbiAgICAgIHJldHVybiB0aGlzLmRlbGV0ZShgL2NvbGxlY3Rpb25fcHJlc2V0cy8ke3ByaW1hcnlLZXl9YCk7XG4gICAgfSxcblxuICAgIC8vIEVYVEVOU0lPTlNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1ldGEgaW5mb3JtYXRpb24gb2YgYWxsIGluc3RhbGxlZCBpbnRlcmZhY2VzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0SW50ZXJmYWNlcygpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXCJnZXRcIiwgXCIvaW50ZXJmYWNlc1wiLCB7fSwge30sIHRydWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1ldGEgaW5mb3JtYXRpb24gb2YgYWxsIGluc3RhbGxlZCBsYXlvdXRzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0TGF5b3V0cygpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXCJnZXRcIiwgXCIvbGF5b3V0c1wiLCB7fSwge30sIHRydWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1ldGEgaW5mb3JtYXRpb24gb2YgYWxsIGluc3RhbGxlZCBwYWdlc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldFBhZ2VzKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcImdldFwiLCBcIi9wYWdlc1wiLCB7fSwge30sIHRydWUpO1xuICAgIH0sXG5cbiAgICAvLyBGSUVMRFNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgZmllbGRzIHRoYXQgYXJlIGluIERpcmVjdHVzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0QWxsRmllbGRzKHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoXCIvZmllbGRzXCIsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZmllbGRzIHRoYXQgaGF2ZSBiZWVuIHNldHVwIGZvciBhIGdpdmVuIGNvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIENvbGxlY3Rpb24gbmFtZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldEZpZWxkcyhjb2xsZWN0aW9uLCBwYXJhbXMgPSB7fSkge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChgL2ZpZWxkcy8ke2NvbGxlY3Rpb259YCwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBmaWVsZCBpbmZvcm1hdGlvbiBmb3IgYSBzaW5nbGUgZ2l2ZW4gZmllbGRcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIENvbGxlY3Rpb24gbmFtZVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZmllbGROYW1lICAgRmllbGQgbmFtZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldEZpZWxkKGNvbGxlY3Rpb24sIGZpZWxkTmFtZSwgcGFyYW1zID0ge30pIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5zdHJpbmcoZmllbGROYW1lLCBcImZpZWxkTmFtZVwiKTtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChgL2ZpZWxkcy8ke2NvbGxlY3Rpb259LyR7ZmllbGROYW1lfWAsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGZpZWxkIGluIHRoZSBnaXZlbiBjb2xsZWN0aW9uXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uIENvbGxlY3Rpb24gdG8gYWRkIHRoZSBmaWVsZCBpblxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZmllbGRJbmZvICBUaGUgZmllbGRzIGluZm8gdG8gc2F2ZVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGNyZWF0ZUZpZWxkKGNvbGxlY3Rpb24sIGZpZWxkSW5mbykge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLm9iamVjdChmaWVsZEluZm8sIFwiZmllbGRJbmZvXCIpO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChgL2ZpZWxkcy8ke2NvbGxlY3Rpb259YCwgZmllbGRJbmZvKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGEgZ2l2ZW4gZmllbGQgaW4gYSBnaXZlbiBjb2xsZWN0aW9uXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uIEZpZWxkJ3MgcGFyZW50IGNvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGZpZWxkTmFtZSAgTmFtZSBvZiB0aGUgZmllbGQgdG8gdXBkYXRlXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBmaWVsZEluZm8gIEZpZWxkcyB0byB1cGRhdGVcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICB1cGRhdGVGaWVsZChjb2xsZWN0aW9uLCBmaWVsZE5hbWUsIGZpZWxkSW5mbykge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLnN0cmluZyhmaWVsZE5hbWUsIFwiZmllbGROYW1lXCIpO1xuICAgICAgQVYub2JqZWN0KGZpZWxkSW5mbywgXCJmaWVsZEluZm9cIik7XG4gICAgICByZXR1cm4gdGhpcy5wYXRjaChgL2ZpZWxkcy8ke2NvbGxlY3Rpb259LyR7ZmllbGROYW1lfWAsIGZpZWxkSW5mbyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBtdWx0aXBsZSBmaWVsZHMgYXQgb25jZVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiAgICAgICAgICAgICBGaWVsZHMnIHBhcmVudCBjb2xsZWN0aW9uXG4gICAgICogQHBhcmFtICB7QXJyYXl9IGZpZWxkc0luZm9PckZpZWxkTmFtZXMgIEFycmF5IG9mIGZpZWxkIG9iamVjdHMgb3IgYXJyYXkgb2YgZmllbGQgbmFtZXNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtmaWVsZEluZm9dICAgICAgICAgICAgSW4gY2FzZSBmaWVsZHNJbmZvT3JGaWVsZE5hbWVzIGlzIGFuIGFycmF5IG9mIGZpZWxkTmFtZXMsIHlvdSBuZWVkIHRvIHByb3ZpZGUgdGhlIGZpZWxkcyB0byB1cGRhdGVcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAvLyBTZXQgbXVsdGlwbGUgZmllbGRzIHRvIHRoZSBzYW1lIHZhbHVlXG4gICAgICogdXBkYXRlRmllbGRzKFwicHJvamVjdHNcIiwgW1wiZmlyc3RfbmFtZVwiLCBcImxhc3RfbmFtZVwiLCBcImVtYWlsXCJdLCB7XG4gICAgICogICBkZWZhdWx0X3ZhbHVlOiBcIlwiXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIC8vIFNldCBtdWx0aXBsZSBmaWVsZHMgdG8gZGlmZmVyZW50IHZhbHVlc1xuICAgICAqIHVwZGF0ZUZpZWxkcyhcInByb2plY3RzXCIsIFtcbiAgICAgKiAgIHtcbiAgICAgKiAgICAgaWQ6IDE0LFxuICAgICAqICAgICBzb3J0OiAxXG4gICAgICogICB9LFxuICAgICAqICAge1xuICAgICAqICAgICBpZDogMTcsXG4gICAgICogICAgIHNvcnQ6IDJcbiAgICAgKiAgIH0sXG4gICAgICogICB7XG4gICAgICogICAgIGlkOiA5MTIsXG4gICAgICogICAgIHNvcnQ6IDNcbiAgICAgKiAgIH1cbiAgICAgKiBdKVxuICAgICAqL1xuICAgIHVwZGF0ZUZpZWxkcyhjb2xsZWN0aW9uLCBmaWVsZHNJbmZvT3JGaWVsZE5hbWVzLCBmaWVsZEluZm8gPSBudWxsKSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYuYXJyYXkoZmllbGRzSW5mb09yRmllbGROYW1lcywgXCJmaWVsZHNJbmZvT3JGaWVsZE5hbWVzXCIpO1xuXG4gICAgICBpZiAoZmllbGRJbmZvKSB7XG4gICAgICAgIEFWLm9iamVjdChmaWVsZEluZm8pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmllbGRJbmZvKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGNoKFxuICAgICAgICAgIGAvZmllbGRzLyR7Y29sbGVjdGlvbn0vJHtmaWVsZHNJbmZvT3JGaWVsZE5hbWVzLmpvaW4oXCIsXCIpfWAsXG4gICAgICAgICAgZmllbGRJbmZvXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnBhdGNoKGAvZmllbGRzLyR7Y29sbGVjdGlvbn1gLCBmaWVsZHNJbmZvT3JGaWVsZE5hbWVzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIGEgZmllbGQgZnJvbSBhIGNvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gTmFtZSBvZiB0aGUgY29sbGVjdGlvblxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZmllbGROYW1lICBUaGUgbmFtZSBvZiB0aGUgZmllbGQgdG8gZGVsZXRlXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZGVsZXRlRmllbGQoY29sbGVjdGlvbiwgZmllbGROYW1lKSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYuc3RyaW5nKGZpZWxkTmFtZSwgXCJmaWVsZE5hbWVcIik7XG4gICAgICByZXR1cm4gdGhpcy5kZWxldGUoYC9maWVsZHMvJHtjb2xsZWN0aW9ufS8ke2ZpZWxkTmFtZX1gKTtcbiAgICB9LFxuXG4gICAgLy8gRklMRVNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFVwbG9hZCBtdWx0aXBhcnQgZmlsZXMgaW4gbXVsdGlwYXJ0L2Zvcm0tZGF0YVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZGF0YSBGb3JtRGF0YSBvYmplY3QgY29udGFpbmluZyBmaWxlc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHVwbG9hZEZpbGVzKGRhdGEsIG9uVXBsb2FkUHJvZ3Jlc3MgPSAoKSA9PiB7fSkge1xuICAgICAgY29uc3QgaGVhZGVycyA9IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLnRva2VufWBcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiB0aGlzLmF4aW9zXG4gICAgICAgIC5wb3N0KGAke3RoaXMudXJsfS8ke3RoaXMuZW52fS9maWxlc2AsIGRhdGEsIHtcbiAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgIG9uVXBsb2FkUHJvZ3Jlc3NcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGlmIChlcnJvci5yZXNwb25zZSkge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvcjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cge1xuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICAgIGNvZGU6IC0xLFxuICAgICAgICAgICAgICBtZXNzYWdlOiBcIk5ldHdvcmsgRXJyb3JcIixcbiAgICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy8gSVRFTVNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgaXRlbVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBhZGQgdGhlIGl0ZW0gdG9cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd8TnVtYmVyfSBwcmltYXJ5S2V5IFByaW1hcnkga2V5IG9mIHRoZSBpdGVtXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBib2R5ICAgICAgIFRoZSBpdGVtJ3MgZmllbGQgdmFsdWVzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgdXBkYXRlSXRlbShjb2xsZWN0aW9uLCBwcmltYXJ5S2V5LCBib2R5KSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYubm90TnVsbChwcmltYXJ5S2V5LCBcInByaW1hcnlLZXlcIik7XG4gICAgICBBVi5vYmplY3QoYm9keSwgXCJib2R5XCIpO1xuXG4gICAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKFwiZGlyZWN0dXNfXCIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGNoKGAvJHtjb2xsZWN0aW9uLnN1YnN0cmluZyg5KX0vJHtwcmltYXJ5S2V5fWAsIGJvZHkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5wYXRjaChgL2l0ZW1zLyR7Y29sbGVjdGlvbn0vJHtwcmltYXJ5S2V5fWAsIGJvZHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgbXVsdGlwbGUgaXRlbXNcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gYWRkIHRoZSBpdGVtIHRvXG4gICAgICogQHBhcmFtICB7QXJyYXl9IGJvZHkgICAgICAgIFRoZSBpdGVtJ3MgZmllbGQgdmFsdWVzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgdXBkYXRlSXRlbXMoY29sbGVjdGlvbiwgYm9keSkge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLmFycmF5KGJvZHksIFwiYm9keVwiKTtcblxuICAgICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChcImRpcmVjdHVzX1wiKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRjaChgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9YCwgYm9keSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnBhdGNoKGAvaXRlbXMvJHtjb2xsZWN0aW9ufWAsIGJvZHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgaXRlbVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBhZGQgdGhlIGl0ZW0gdG9cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGJvZHkgICAgICAgVGhlIGl0ZW0ncyBmaWVsZCB2YWx1ZXNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBjcmVhdGVJdGVtKGNvbGxlY3Rpb24sIGJvZHkpIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5vYmplY3QoYm9keSwgXCJib2R5XCIpO1xuXG4gICAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKFwiZGlyZWN0dXNfXCIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3QoYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfWAsIGJvZHkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5wb3N0KGAvaXRlbXMvJHtjb2xsZWN0aW9ufWAsIGJvZHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbXVsdGlwbGUgaXRlbXNcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gYWRkIHRoZSBpdGVtIHRvXG4gICAgICogQHBhcmFtICB7QXJyYXl9IGJvZHkgICAgICAgIFRoZSBpdGVtJ3MgZmllbGQgdmFsdWVzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgY3JlYXRlSXRlbXMoY29sbGVjdGlvbiwgYm9keSkge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLmFycmF5KGJvZHksIFwiYm9keVwiKTtcblxuICAgICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChcImRpcmVjdHVzX1wiKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0KGAvJHtjb2xsZWN0aW9uLnN1YnN0cmluZyg5KX1gLCBib2R5KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucG9zdChgL2l0ZW1zLyR7Y29sbGVjdGlvbn1gLCBib2R5KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGl0ZW1zIGZyb20gYSBnaXZlbiBjb2xsZWN0aW9uXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGFkZCB0aGUgaXRlbSB0b1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gICBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0SXRlbXMoY29sbGVjdGlvbiwgcGFyYW1zID0ge30pIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG5cbiAgICAgIGlmIChjb2xsZWN0aW9uLnN0YXJ0c1dpdGgoXCJkaXJlY3R1c19cIikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGAvJHtjb2xsZWN0aW9uLnN1YnN0cmluZyg5KX1gLCBwYXJhbXMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5nZXQoYC9pdGVtcy8ke2NvbGxlY3Rpb259YCwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgc2luZ2xlIGl0ZW0gYnkgcHJpbWFyeSBrZXlcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIFRoZSBjb2xsZWN0aW9uIHRvIGFkZCB0aGUgaXRlbSB0b1xuICAgICAqIEBwYXJhbSAge1N0cmluZ3xOdW1iZXJ9IHByaW1hcnlLZXkgUHJpbWFyeSBrZXkgb2YgdGhlIGl0ZW1cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRJdGVtKGNvbGxlY3Rpb24sIHByaW1hcnlLZXksIHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYubm90TnVsbChwcmltYXJ5S2V5LCBcInByaW1hcnlLZXlcIik7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG5cbiAgICAgIGlmIChjb2xsZWN0aW9uLnN0YXJ0c1dpdGgoXCJkaXJlY3R1c19cIikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGAvJHtjb2xsZWN0aW9uLnN1YnN0cmluZyg5KX0vJHtwcmltYXJ5S2V5fWAsIHBhcmFtcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmdldChgL2l0ZW1zLyR7Y29sbGVjdGlvbn0vJHtwcmltYXJ5S2V5fWAsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSBhIHNpbmdsZSBpdGVtIGJ5IHByaW1hcnkga2V5XG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uICBUaGUgY29sbGVjdGlvbiB0byBkZWxldGUgdGhlIGl0ZW0gZnJvbVxuICAgICAqIEBwYXJhbSAge1N0cmluZ3xOdW1iZXJ9IHByaW1hcnlLZXkgUHJpbWFyeSBrZXkgb2YgdGhlIGl0ZW1cbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBkZWxldGVJdGVtKGNvbGxlY3Rpb24sIHByaW1hcnlLZXkpIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcblxuICAgICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChcImRpcmVjdHVzX1wiKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWxldGUoYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfS8ke3ByaW1hcnlLZXl9YCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmRlbGV0ZShgL2l0ZW1zLyR7Y29sbGVjdGlvbn0vJHtwcmltYXJ5S2V5fWApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgbXVsdGlwbGUgaXRlbXMgYnkgcHJpbWFyeSBrZXlcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIFRoZSBjb2xsZWN0aW9uIHRvIGRlbGV0ZSB0aGUgaXRlbSBmcm9tXG4gICAgICogQHBhcmFtICB7QXJyYXl9IHByaW1hcnlLZXkgUHJpbWFyeSBrZXkgb2YgdGhlIGl0ZW1cbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBkZWxldGVJdGVtcyhjb2xsZWN0aW9uLCBwcmltYXJ5S2V5cykge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLmFycmF5KHByaW1hcnlLZXlzLCBcInByaW1hcnlLZXlzXCIpO1xuXG4gICAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKFwiZGlyZWN0dXNfXCIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZShgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9LyR7cHJpbWFyeUtleXMuam9pbigpfWApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5kZWxldGUoYC9pdGVtcy8ke2NvbGxlY3Rpb259LyR7cHJpbWFyeUtleXMuam9pbigpfWApO1xuICAgIH0sXG5cbiAgICAvLyBMSVNUSU5HIFBSRUZFUkVOQ0VTXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjb2xsZWN0aW9uIHByZXNldHMgb2YgdGhlIGN1cnJlbnQgdXNlciBmb3IgYSBzaW5nbGUgY29sbGVjdGlvblxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiAgQ29sbGVjdGlvbiB0byBmZXRjaCB0aGUgcHJlZmVyZW5jZXMgZm9yXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0TXlMaXN0aW5nUHJlZmVyZW5jZXMoY29sbGVjdGlvbiwgcGFyYW1zID0ge30pIHtcbiAgICAgIEFWLnN0cmluZyh0aGlzLnRva2VuLCBcInRoaXMudG9rZW5cIik7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICB0aGlzLmdldChcIi9jb2xsZWN0aW9uX3ByZXNldHNcIiwge1xuICAgICAgICAgIGxpbWl0OiAxLFxuICAgICAgICAgIFwiZmlsdGVyW3RpdGxlXVtudWxsXVwiOiAxLFxuICAgICAgICAgIFwiZmlsdGVyW2NvbGxlY3Rpb25dW2VxXVwiOiBjb2xsZWN0aW9uLFxuICAgICAgICAgIFwiZmlsdGVyW3JvbGVdW251bGxdXCI6IDEsXG4gICAgICAgICAgXCJmaWx0ZXJbdXNlcl1bbnVsbF1cIjogMSxcbiAgICAgICAgICBzb3J0OiBcIi1pZFwiXG4gICAgICAgIH0pLFxuICAgICAgICB0aGlzLmdldChcIi9jb2xsZWN0aW9uX3ByZXNldHNcIiwge1xuICAgICAgICAgIGxpbWl0OiAxLFxuICAgICAgICAgIFwiZmlsdGVyW3RpdGxlXVtudWxsXVwiOiAxLFxuICAgICAgICAgIFwiZmlsdGVyW2NvbGxlY3Rpb25dW2VxXVwiOiBjb2xsZWN0aW9uLFxuICAgICAgICAgIFwiZmlsdGVyW3JvbGVdW2VxXVwiOiB0aGlzLnBheWxvYWQucm9sZSxcbiAgICAgICAgICBcImZpbHRlclt1c2VyXVtudWxsXVwiOiAxLFxuICAgICAgICAgIHNvcnQ6IFwiLWlkXCJcbiAgICAgICAgfSksXG4gICAgICAgIHRoaXMuZ2V0KFwiL2NvbGxlY3Rpb25fcHJlc2V0c1wiLCB7XG4gICAgICAgICAgbGltaXQ6IDEsXG4gICAgICAgICAgXCJmaWx0ZXJbdGl0bGVdW251bGxdXCI6IDEsXG4gICAgICAgICAgXCJmaWx0ZXJbY29sbGVjdGlvbl1bZXFdXCI6IGNvbGxlY3Rpb24sXG4gICAgICAgICAgXCJmaWx0ZXJbcm9sZV1bZXFdXCI6IHRoaXMucGF5bG9hZC5yb2xlLFxuICAgICAgICAgIFwiZmlsdGVyW3VzZXJdW2VxXVwiOiB0aGlzLnBheWxvYWQuaWQsXG4gICAgICAgICAgc29ydDogXCItaWRcIlxuICAgICAgICB9KVxuICAgICAgXSkudGhlbih2YWx1ZXMgPT4ge1xuICAgICAgICBjb25zdCBbY29sbGVjdGlvbiwgcm9sZSwgdXNlcl0gPSB2YWx1ZXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2hhZG93XG4gICAgICAgIGlmICh1c2VyLmRhdGEgJiYgdXNlci5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gdXNlci5kYXRhWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyb2xlLmRhdGEgJiYgcm9sZS5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gcm9sZS5kYXRhWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2xsZWN0aW9uLmRhdGEgJiYgY29sbGVjdGlvbi5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5kYXRhWzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvLyBQRVJNSVNTSU9OU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEdldCBwZXJtaXNzaW9uc1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldFBlcm1pc3Npb25zKHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG4gICAgICByZXR1cm4gdGhpcy5nZXRJdGVtcyhcImRpcmVjdHVzX3Blcm1pc3Npb25zXCIsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyJ3MgcGVybWlzc2lvbnNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IHBhcmFtcyBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0TXlQZXJtaXNzaW9ucyhwYXJhbXMgPSB7fSkge1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiL3Blcm1pc3Npb25zL21lXCIsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBtdWx0aXBsZSBuZXcgcGVybWlzc2lvbnNcbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gZGF0YSAgUGVybWlzc2lvbiByZWNvcmRzIHRvIHNhdmVcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBjcmVhdGVQZXJtaXNzaW9ucyhkYXRhKSB7XG4gICAgICBBVi5hcnJheShkYXRhKTtcbiAgICAgIHJldHVybiB0aGlzLnBvc3QoXCIvcGVybWlzc2lvbnNcIiwgZGF0YSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBtdWx0aXBsZSBwZXJtaXNzaW9uIHJlY29yZHNcbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gZGF0YSAgUGVybWlzc2lvbiByZWNvcmRzIHRvIHVwZGF0ZVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHVwZGF0ZVBlcm1pc3Npb25zKGRhdGEpIHtcbiAgICAgIEFWLmFycmF5KGRhdGEpO1xuICAgICAgcmV0dXJuIHRoaXMucGF0Y2goXCIvcGVybWlzc2lvbnNcIiwgZGF0YSk7XG4gICAgfSxcblxuICAgIC8vIFJFTEFUSU9OU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgcmVsYXRpb25zaGlwc1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldFJlbGF0aW9ucyhwYXJhbXMgPSB7fSkge1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiL3JlbGF0aW9uc1wiLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICBjcmVhdGVSZWxhdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KFwiL3JlbGF0aW9uc1wiLCBkYXRhKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlUmVsYXRpb24ocHJpbWFyeUtleSwgZGF0YSkge1xuICAgICAgcmV0dXJuIHRoaXMucGF0Y2goYC9yZWxhdGlvbnMvJHtwcmltYXJ5S2V5fWAsIGRhdGEpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHJlbGF0aW9uc2hpcCBpbmZvcm1hdGlvbiBmb3IgdGhlIGdpdmVuIGNvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gbmFtZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldENvbGxlY3Rpb25SZWxhdGlvbnMoY29sbGVjdGlvbiwgcGFyYW1zID0ge30pIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcyk7XG5cbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgIHRoaXMuZ2V0KFwiL3JlbGF0aW9uc1wiLCB7IFwiZmlsdGVyW2NvbGxlY3Rpb25fYV1bZXFdXCI6IGNvbGxlY3Rpb24gfSksXG4gICAgICAgIHRoaXMuZ2V0KFwiL3JlbGF0aW9uc1wiLCB7IFwiZmlsdGVyW2NvbGxlY3Rpb25fYl1bZXFdXCI6IGNvbGxlY3Rpb24gfSlcbiAgICAgIF0pO1xuICAgIH0sXG5cbiAgICAvLyBSRVZJU0lPTlNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBzaW5nbGUgaXRlbSdzIHJldmlzaW9ucyBieSBwcmltYXJ5IGtleVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiAgVGhlIGNvbGxlY3Rpb24gdG8gZmV0Y2ggdGhlIHJldmlzaW9ucyBmcm9tXG4gICAgICogQHBhcmFtICB7U3RyaW5nfE51bWJlcn0gcHJpbWFyeUtleSBQcmltYXJ5IGtleSBvZiB0aGUgaXRlbVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldEl0ZW1SZXZpc2lvbnMoY29sbGVjdGlvbiwgcHJpbWFyeUtleSwgcGFyYW1zID0ge30pIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcblxuICAgICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChcImRpcmVjdHVzX1wiKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoXG4gICAgICAgICAgYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfS8ke3ByaW1hcnlLZXl9L3JldmlzaW9uc2AsXG4gICAgICAgICAgcGFyYW1zXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmdldChgL2l0ZW1zLyR7Y29sbGVjdGlvbn0vJHtwcmltYXJ5S2V5fS9yZXZpc2lvbnNgLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZXZlcnQgYW4gaXRlbSB0byBhIHByZXZpb3VzIHN0YXRlXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uICBUaGUgY29sbGVjdGlvbiB0byBmZXRjaCB0aGUgcmV2aXNpb25zIGZyb21cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd8TnVtYmVyfSBwcmltYXJ5S2V5IFByaW1hcnkga2V5IG9mIHRoZSBpdGVtXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSByZXZpc2lvbklEIFRoZSBJRCBvZiB0aGUgcmV2aXNpb24gdG8gcmV2ZXJ0IHRvXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgcmV2ZXJ0KGNvbGxlY3Rpb24sIHByaW1hcnlLZXksIHJldmlzaW9uSUQpIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcbiAgICAgIEFWLm51bWJlcihyZXZpc2lvbklELCBcInJldmlzaW9uSURcIik7XG5cbiAgICAgIGlmIChjb2xsZWN0aW9uLnN0YXJ0c1dpdGgoXCJkaXJlY3R1c19cIikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0Y2goXG4gICAgICAgICAgYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfS8ke3ByaW1hcnlLZXl9L3JldmVydC8ke3JldmlzaW9uSUR9YFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5wYXRjaChcbiAgICAgICAgYC9pdGVtcy8ke2NvbGxlY3Rpb259LyR7cHJpbWFyeUtleX0vcmV2ZXJ0LyR7cmV2aXNpb25JRH1gXG4gICAgICApO1xuICAgIH0sXG5cbiAgICAvLyBST0xFU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIHNpbmdsZSB1c2VyIHJvbGVcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHByaW1hcnlLZXkgIFRoZSBpZCBvZiB0aGUgdXNlciByb2wgdG8gZ2V0XG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0Um9sZShwcmltYXJ5S2V5LCBwYXJhbXMgPSB7fSkge1xuICAgICAgQVYubnVtYmVyKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChgL3JvbGVzLyR7cHJpbWFyeUtleX1gLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHVzZXIgcm9sZXNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRSb2xlcyhwYXJhbXMgPSB7fSkge1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiL3JvbGVzXCIsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBhIHVzZXIgcm9sZVxuICAgICAqIEBwYXJhbSAge051bWJlcn0gcHJpbWFyeUtleSBUaGUgSUQgb2YgdGhlIHJvbGVcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGJvZHkgICAgICAgVGhlIGZpZWxkcyB0byB1cGRhdGVcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICB1cGRhdGVSb2xlKHByaW1hcnlLZXksIGJvZHkpIHtcbiAgICAgIEFWLm5vdE51bGwocHJpbWFyeUtleSwgXCJwcmltYXJ5S2V5XCIpO1xuICAgICAgQVYub2JqZWN0KGJvZHksIFwiYm9keVwiKTtcbiAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUl0ZW0oXCJkaXJlY3R1c19yb2xlc1wiLCBwcmltYXJ5S2V5LCBib2R5KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHVzZXIgcm9sZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gYm9keSBUaGUgcm9sZSBpbmZvcm1hdGlvblxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGNyZWF0ZVJvbGUoYm9keSkge1xuICAgICAgQVYub2JqZWN0KGJvZHksIFwiYm9keVwiKTtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUl0ZW0oXCJkaXJlY3R1c19yb2xlc1wiLCBib2R5KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIGEgdXNlciByb2wgYnkgcHJpbWFyeSBrZXlcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXIgfCBTdHJpbmd9IHByaW1hcnlLZXkgUHJpbWFyeSBrZXkgb2YgdGhlIHVzZXIgcm9sZVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGRlbGV0ZVJvbGUocHJpbWFyeUtleSkge1xuICAgICAgQVYubm90TnVsbChwcmltYXJ5S2V5LCBcInByaW1hcnlLZXlcIik7XG4gICAgICByZXR1cm4gdGhpcy5kZWxldGVJdGVtKFwiZGlyZWN0dXNfcm9sZXNcIiwgcHJpbWFyeUtleSk7XG4gICAgfSxcblxuICAgIC8vIFNFVFRJTkdTXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogR2V0IERpcmVjdHVzJyBnbG9iYWwgc2V0dGluZ3NcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRTZXR0aW5ncyhwYXJhbXMgPSB7fSkge1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiL3NldHRpbmdzXCIsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8vIFVTRVJTXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgbGlzdCBvZiBhdmFpbGFibGUgdXNlcnMgaW4gRGlyZWN0dXNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRVc2VycyhwYXJhbXMgPSB7fSkge1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiL3VzZXJzXCIsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBhIHNpbmdsZSBEaXJlY3R1cyB1c2VyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBwcmltYXJ5S2V5ICBUaGUgdW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIHVzZXJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRVc2VyKHByaW1hcnlLZXksIHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChgL3VzZXJzLyR7cHJpbWFyeUtleX1gLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHVzZXIgaW5mbyBvZiB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0TWUocGFyYW1zID0ge30pIHtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChcIi91c2Vycy9tZVwiLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYSBzaW5nbGUgdXNlciBiYXNlZCBvbiBwcmltYXJ5S2V5XG4gICAgICogQHBhcmFtICB7U3RyaW5nfE51bWJlcn0gcHJpbWFyeUtleSBUaGUgcHJpbWFyeSBrZXkgb2YgdGhlIHVzZXJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGJvZHkgICAgICAgICAgICAgIFRoZSBmaWVsZHMgdG8gdXBkYXRlXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgdXBkYXRlVXNlcihwcmltYXJ5S2V5LCBib2R5KSB7XG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcbiAgICAgIEFWLm9iamVjdChib2R5LCBcImJvZHlcIik7XG4gICAgICByZXR1cm4gdGhpcy51cGRhdGVJdGVtKFwiZGlyZWN0dXNfdXNlcnNcIiwgcHJpbWFyeUtleSwgYm9keSk7XG4gICAgfSxcblxuICAgIC8vIFVUSUxTXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogUGluZyB0aGUgQVBJIHRvIGNoZWNrIGlmIGl0IGV4aXN0cyAvIGlzIHVwIGFuZCBydW5uaW5nXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgcGluZygpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXCJnZXRcIiwgXCIvc2VydmVyL3BpbmdcIiwge30sIHt9LCB0cnVlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBzZXJ2ZXIgaW5mbyBmcm9tIHRoZSBBUElcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBzZXJ2ZXJJbmZvKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcImdldFwiLCBcIi9cIiwge30sIHt9LCB0cnVlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCB0aGUgc2V0dXAgdGhpcmQgcGFydHkgYXV0aCBwcm92aWRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRUaGlyZFBhcnR5QXV0aFByb3ZpZGVycygpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldChcIi9hdXRoL3Nzb1wiKTtcbiAgICB9XG4gIH07XG59XG5cbi8vIENPTlZFTklFTkNFIE1FVEhPRFNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuU0RLLmdldFBheWxvYWQgPSBnZXRQYXlsb2FkO1xubW9kdWxlLmV4cG9ydHMgPSBTREs7XG4iXSwic291cmNlUm9vdCI6IiJ9