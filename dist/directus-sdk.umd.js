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

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

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
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
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
        status: request.status,
        statusText: request.statusText,
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

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
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
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset);
            val = options.decoder(part.slice(pos + 1), defaults.decoder, charset);
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (val && options.comma && val.indexOf(',') > -1) {
            val = val.split(',');
        }

        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
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

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
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
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
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

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new Error('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        depth: typeof opts.depth === 'number' ? opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (str, opts) {
    var options = normalizeParseOptions(opts);

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
var has = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    formatter: formats.formatters[formats['default']],
    // deprecated
    indices: false,
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
    encodeValuesOnly,
    charset
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = obj.join(',');
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (isArray(filter)) {
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

        if (isArray(obj)) {
            pushToArray(values, stringify(
                obj[key],
                typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix,
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        } else {
            pushToArray(values, stringify(
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
                encodeValuesOnly,
                charset
            ));
        }
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.formatter,
            options.encodeValuesOnly,
            options.charset
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

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
var isArray = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
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
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

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

var compact = function compact(value) {
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

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
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
 * @param       {string} [options.project]   The API project to connect to
 * @param       {string} [options.token] The access token to use for requests
 * @param       {number} [options.tokenExpiryTime] The time it takes for the API token to expire
 * @constructor
 */


function SDK() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var token;
  var url;
  var project = "_";
  var localExp;
  var tokenExpiryTime = 5;

  if (options.storage) {
    var storedInfo = options.storage.getItem("directus-sdk-js");

    if (storedInfo) {
      storedInfo = JSON.parse(storedInfo);
      token = storedInfo.token;
      url = storedInfo.url;
      project = storedInfo.project;
      localExp = storedInfo.localExp;
    }
  }

  if (options.token) {
    token = options.token;
  }

  if (options.url) {
    url = options.url;
  }

  if (options.project) {
    project = options.project;
  }

  if (options.localExp) {
    localExp = options.localExp;
  }

  if (options.tokenExpiryTime) {
    tokenExpiryTime = options.tokenExpiryTime;
  }

  var SDK = {
    url: url,
    token: token,
    project: project,
    // The token will contain an expiry time based on the server time
    // In order to make sure we check the right expiry date, we need to
    // keep a version that's based on the browser time
    localExp: localExp,
    axios: axios.create({
      paramsSerializer: qs.stringify,
      timeout: 10 * 60 * 1000 // 10 min

    }),
    refreshInterval: null,
    onAutoRefreshError: null,
    onAutoRefreshSuccess: null,
    // The storage method to use. Has to support getItem and setItem to store and
    // retrieve the token
    storage: options.storage || null,
    // Defaults to 5 minutes. Once the API supports a custom, this option can be used to reflect that
    tokenExpiryTime: tokenExpiryTime,

    get payload() {
      if (!AV.isString(this.token)) return null;
      return getPayload(this.token);
    },

    get loggedIn() {
      if (AV.isString(this.token) && AV.isString(this.url) && AV.isString(this.project) && AV.isObject(this.payload)) {
        if (this.localExp > Date.now()) {
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
     * @param  {Boolean} noEnv      Don't use the project in the path
     * @param  {Boolean} ignoreJson Don't parse the API result into JSON
     * @return {RequestPromise}
     */
    request: function request(method, endpoint) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var noEnv = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var headers = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      var ignoreJson = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      AV.string(method, "method");
      AV.string(endpoint, "endpoint");
      AV.objectOrEmpty(params, "params");
      Array.isArray(data) ? AV.arrayOrEmpty(data, "data") : AV.objectOrEmpty(data, "data");
      AV.string(this.url, "this.url");
      var baseURL = "".concat(this.url, "/");

      if (noEnv === false) {
        baseURL += "".concat(this.project, "/");
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
        if (ignoreJson) return data;

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
      })["catch"](function (error) {
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
    "delete": function _delete(endpoint) {
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
     * @param  {String} credentials.email     The user's email address
     * @param  {String} credentials.password  The user's password
     * @param  {String} [credentials.otp]     The user's 2FA OTP
     * @param  {String} [credentials.url]     The API to login to (overwrites this.url)
     * @param  {String} [credentials.project] The API project to login to (overwrites this.project)
     * @param  {String} [options.persist]     Auto-fetch a new token when it's about to expire
     * @param  {Boolean} [options.storage]    Where to store the token (survive refreshes)
     * @return {LoginPromise}
     */
    login: function login(credentials) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        persist: true
      };
      AV.object(credentials, "credentials");
      AV.keysWithString(credentials, ["email", "password"], "credentials");
      this.token = null;

      if (AV.hasKeysWithString(credentials, ["url"])) {
        this.url = credentials.url;
      }

      if (AV.hasKeysWithString(credentials, ["project"])) {
        this.project = credentials.project;
      }

      if (credentials.persist || options.persist) {
        this.startInterval();
      }

      return new Promise(function (resolve, reject) {
        _this.post("/auth/authenticate", {
          email: credentials.email,
          password: credentials.password,
          otp: credentials.otp
        }).then(function (res) {
          return res.data.token;
        }).then(function (token) {
          _this.token = token; // Expiry date is the moment we got the token + 5 minutes

          _this.localExp = new Date(Date.now() + _this.tokenExpiryTime * 60000).getTime();

          if (_this.storage) {
            _this.storage.setItem("directus-sdk-js", JSON.stringify({
              token: _this.token,
              url: _this.url,
              project: _this.project,
              localExp: _this.localExp
            }));
          }

          resolve({
            url: _this.url,
            project: _this.project,
            token: _this.token,
            localExp: _this.localExp
          });
        })["catch"](reject);
      });
    },

    /**
     * Logs the user out by "forgetting" the token, and clearing the refresh interval
     */
    logout: function logout() {
      this.token = null;

      if (this.refreshInterval) {
        this.stopInterval();
      }

      if (this.storage) {
        this.storage.removeItem("directus-sdk-js");
      }
    },

    /**
     * Resets the client instance by logging out and removing the URL and project
     */
    reset: function reset() {
      this.logout();
      this.url = null;
      this.project = null;
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

      if (!AV.hasStringKeys(this, ["token", "url", "project"])) return;
      if (!this.payload || !this.payload.exp) return;
      var timeDiff = this.localExp - Date.now();

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
          _this2.localExp = new Date(Date.now() + _this2.tokenExpiryTime * 60000).getTime();

          if (AV.isFunction(_this2.onAutoRefreshSuccess)) {
            _this2.onAutoRefreshSuccess({
              url: _this2.url,
              project: _this2.project,
              token: _this2.token,
              localExp: _this2.localExp
            });
          }

          if (_this2.storage) {
            _this2.storage.setItem("directus-sdk-js", JSON.stringify({
              token: _this2.token,
              url: _this2.url,
              project: _this2.project,
              localExp: _this2.localExp
            }));
          }
        })["catch"](function (error) {
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
      return this.post("/auth/password/request", {
        email: email
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


        return [].concat(_toConsumableArray(user.data), _toConsumableArray(role.data));
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
      return this["delete"]("/collections/".concat(collection));
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
      return this["delete"]("/collection_presets/".concat(primaryKey));
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
      return this["delete"]("/fields/".concat(collection, "/").concat(fieldName));
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
      return this.axios.post("".concat(this.url, "/").concat(this.project, "/files"), data, {
        headers: headers,
        onUploadProgress: onUploadProgress
      }).then(function (res) {
        return res.data;
      })["catch"](function (error) {
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
     * @param  {Object} params     Query parameters
     * @return {RequestPromise}
     */
    updateItem: function updateItem(collection, primaryKey, body) {
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");
      AV.object(body, "body");

      if (collection.startsWith("directus_")) {
        return this.patch("/".concat(collection.substring(9), "/").concat(primaryKey), body, params);
      }

      return this.patch("/items/".concat(collection, "/").concat(primaryKey), body, params);
    },

    /**
     * Update multiple items
     * @param  {String} collection The collection to add the item to
     * @param  {Array} body        The item's field values
     * @param  {Object} params     Query Parameters
     * @return {RequestPromise}
     */
    updateItems: function updateItems(collection, body) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(collection, "collection");
      AV.array(body, "body");

      if (collection.startsWith("directus_")) {
        return this.patch("/".concat(collection.substring(9)), body, params);
      }

      return this.patch("/items/".concat(collection), body, params);
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
        return this["delete"]("/".concat(collection.substring(9), "/").concat(primaryKey));
      }

      return this["delete"]("/items/".concat(collection, "/").concat(primaryKey));
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
        return this["delete"]("/".concat(collection.substring(9), "/").concat(primaryKeys.join()));
      }

      return this["delete"]("/items/".concat(collection, "/").concat(primaryKeys.join()));
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
      return this.request("get", "/server/ping", {}, {}, true, true);
    },

    /**
     * Get the server info from the API
     * @return {RequestPromise}
     */
    serverInfo: function serverInfo() {
      return this.request("get", "/", {}, {}, true);
    },

    /**
     * Get the server info from the project
     * @return {RequestPromise}
     */
    projectInfo: function projectInfo() {
      return this.request("get", "/");
    },

    /**
     * Get all the setup third party auth providers
     * @return {RequestPromise}
     */
    getThirdPartyAuthProviders: function getThirdPartyAuthProviders() {
      return this.get("/auth/sso");
    }
  }; // Only start the auto refresh interval if the token exists and it's a JWT

  if (SDK.token && SDK.token.includes(".")) {
    SDK.startInterval(true);
  }

  return SDK;
} // CONVENIENCE METHODS
// -------------------------------------------------------------------------------------------------


SDK.getPayload = getPayload;
module.exports = SDK;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EaXJlY3R1c1NESy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXJndW1lbnQtdmFsaWRhdG9yL2FyZ3VtZW50LXZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2Jhc2UtNjQvYmFzZTY0LmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvcXMvbGliL2Zvcm1hdHMuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvcXMvbGliL2luZGV4LmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi9wYXJzZS5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9xcy9saWIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImF4aW9zIiwicmVxdWlyZSIsImJhc2U2NCIsInFzIiwiQVYiLCJnZXRQYXlsb2FkIiwidG9rZW4iLCJwYXlsb2FkQmFzZTY0Iiwic3BsaXQiLCJyZXBsYWNlIiwicGF5bG9hZERlY29kZWQiLCJkZWNvZGUiLCJwYXlsb2FkT2JqZWN0IiwiSlNPTiIsInBhcnNlIiwiaXNOdW1iZXIiLCJleHAiLCJEYXRlIiwiU0RLIiwib3B0aW9ucyIsInVybCIsInByb2plY3QiLCJsb2NhbEV4cCIsInRva2VuRXhwaXJ5VGltZSIsInN0b3JhZ2UiLCJzdG9yZWRJbmZvIiwiZ2V0SXRlbSIsImNyZWF0ZSIsInBhcmFtc1NlcmlhbGl6ZXIiLCJzdHJpbmdpZnkiLCJ0aW1lb3V0IiwicmVmcmVzaEludGVydmFsIiwib25BdXRvUmVmcmVzaEVycm9yIiwib25BdXRvUmVmcmVzaFN1Y2Nlc3MiLCJwYXlsb2FkIiwiaXNTdHJpbmciLCJsb2dnZWRJbiIsImlzT2JqZWN0Iiwibm93IiwicmVxdWVzdCIsIm1ldGhvZCIsImVuZHBvaW50IiwicGFyYW1zIiwiZGF0YSIsIm5vRW52IiwiaGVhZGVycyIsImlnbm9yZUpzb24iLCJzdHJpbmciLCJvYmplY3RPckVtcHR5IiwiQXJyYXkiLCJpc0FycmF5IiwiYXJyYXlPckVtcHR5IiwiYmFzZVVSTCIsInJlcXVlc3RPcHRpb25zIiwibGVuZ3RoIiwiQXV0aG9yaXphdGlvbiIsInRoZW4iLCJyZXMiLCJlcnJvciIsImpzb24iLCJyZXNwb25zZSIsImNvZGUiLCJtZXNzYWdlIiwiZ2V0IiwicG9zdCIsImJvZHkiLCJwYXRjaCIsInB1dCIsImxvZ2luIiwiY3JlZGVudGlhbHMiLCJwZXJzaXN0Iiwib2JqZWN0Iiwia2V5c1dpdGhTdHJpbmciLCJoYXNLZXlzV2l0aFN0cmluZyIsInN0YXJ0SW50ZXJ2YWwiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImVtYWlsIiwicGFzc3dvcmQiLCJvdHAiLCJnZXRUaW1lIiwic2V0SXRlbSIsImxvZ291dCIsInN0b3BJbnRlcnZhbCIsInJlbW92ZUl0ZW0iLCJyZXNldCIsImZpcmVJbW1lZGlhdGVseSIsInJlZnJlc2hJZk5lZWRlZCIsInNldEludGVydmFsIiwiYmluZCIsImNsZWFySW50ZXJ2YWwiLCJoYXNTdHJpbmdLZXlzIiwidGltZURpZmYiLCJpc0Z1bmN0aW9uIiwicmVmcmVzaCIsInJlcXVlc3RQYXNzd29yZFJlc2V0IiwiZ2V0QWN0aXZpdHkiLCJnZXRNeUJvb2ttYXJrcyIsImFsbCIsImlkIiwicm9sZSIsInZhbHVlcyIsInVzZXIiLCJnZXRDb2xsZWN0aW9ucyIsImdldENvbGxlY3Rpb24iLCJjb2xsZWN0aW9uIiwiY3JlYXRlQ29sbGVjdGlvbiIsInVwZGF0ZUNvbGxlY3Rpb24iLCJkZWxldGVDb2xsZWN0aW9uIiwiY3JlYXRlQ29sbGVjdGlvblByZXNldCIsInVwZGF0ZUNvbGxlY3Rpb25QcmVzZXQiLCJwcmltYXJ5S2V5Iiwibm90TnVsbCIsImRlbGV0ZUNvbGxlY3Rpb25QcmVzZXQiLCJ1cGRhdGVEYXRhYmFzZSIsImdldEludGVyZmFjZXMiLCJnZXRMYXlvdXRzIiwiZ2V0UGFnZXMiLCJnZXRBbGxGaWVsZHMiLCJnZXRGaWVsZHMiLCJnZXRGaWVsZCIsImZpZWxkTmFtZSIsImNyZWF0ZUZpZWxkIiwiZmllbGRJbmZvIiwidXBkYXRlRmllbGQiLCJ1cGRhdGVGaWVsZHMiLCJmaWVsZHNJbmZvT3JGaWVsZE5hbWVzIiwiYXJyYXkiLCJqb2luIiwiZGVsZXRlRmllbGQiLCJ1cGxvYWRGaWxlcyIsIm9uVXBsb2FkUHJvZ3Jlc3MiLCJ1cGRhdGVJdGVtIiwic3RhcnRzV2l0aCIsInN1YnN0cmluZyIsInVwZGF0ZUl0ZW1zIiwiY3JlYXRlSXRlbSIsImNyZWF0ZUl0ZW1zIiwiZ2V0SXRlbXMiLCJkZWxldGVJdGVtIiwiZGVsZXRlSXRlbXMiLCJwcmltYXJ5S2V5cyIsImdldE15TGlzdGluZ1ByZWZlcmVuY2VzIiwibGltaXQiLCJzb3J0IiwiZ2V0UGVybWlzc2lvbnMiLCJnZXRNeVBlcm1pc3Npb25zIiwiY3JlYXRlUGVybWlzc2lvbnMiLCJ1cGRhdGVQZXJtaXNzaW9ucyIsImdldFJlbGF0aW9ucyIsImNyZWF0ZVJlbGF0aW9uIiwidXBkYXRlUmVsYXRpb24iLCJnZXRDb2xsZWN0aW9uUmVsYXRpb25zIiwiZ2V0SXRlbVJldmlzaW9ucyIsInJldmVydCIsInJldmlzaW9uSUQiLCJudW1iZXIiLCJnZXRSb2xlIiwiZ2V0Um9sZXMiLCJ1cGRhdGVSb2xlIiwiY3JlYXRlUm9sZSIsImRlbGV0ZVJvbGUiLCJnZXRTZXR0aW5ncyIsImdldFNldHRpbmdzRmllbGRzIiwiZ2V0VXNlcnMiLCJnZXRVc2VyIiwiZ2V0TWUiLCJ1cGRhdGVVc2VyIiwicGluZyIsInNlcnZlckluZm8iLCJwcm9qZWN0SW5mbyIsImdldFRoaXJkUGFydHlBdXRoUHJvdmlkZXJzIiwiaW5jbHVkZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7O0FBRWIsUUFBUSxLQUE2QjtBQUNyQztBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixtQkFBbUI7QUFDMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsWUFBWTtBQUNuQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixZQUFZO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7O0FDeE9ELGlCQUFpQixtQkFBTyxDQUFDLHNEQUFhLEU7Ozs7Ozs7Ozs7OztBQ0F6Qjs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7QUFDaEMsYUFBYSxtQkFBTyxDQUFDLGlFQUFrQjtBQUN2QyxlQUFlLG1CQUFPLENBQUMsMkVBQXVCO0FBQzlDLG1CQUFtQixtQkFBTyxDQUFDLG1GQUEyQjtBQUN0RCxzQkFBc0IsbUJBQU8sQ0FBQyx5RkFBOEI7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMseUVBQXFCOztBQUUvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUE0QztBQUM1Qzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtQkFBTyxDQUFDLHlFQUFzQjs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7QUNqS2E7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLGtEQUFTO0FBQzdCLFdBQVcsbUJBQU8sQ0FBQyxnRUFBZ0I7QUFDbkMsWUFBWSxtQkFBTyxDQUFDLDREQUFjO0FBQ2xDLGVBQWUsbUJBQU8sQ0FBQyx3REFBWTs7QUFFbkM7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksTUFBTTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLG1CQUFPLENBQUMsa0VBQWlCO0FBQ3hDLG9CQUFvQixtQkFBTyxDQUFDLDRFQUFzQjtBQUNsRCxpQkFBaUIsbUJBQU8sQ0FBQyxzRUFBbUI7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxtQkFBTyxDQUFDLG9FQUFrQjs7QUFFekM7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ25EYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNsQmE7O0FBRWIsYUFBYSxtQkFBTyxDQUFDLDJEQUFVOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUN4RGE7O0FBRWI7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDSmE7O0FBRWIsZUFBZSxtQkFBTyxDQUFDLDJEQUFlO0FBQ3RDLFlBQVksbUJBQU8sQ0FBQyxxREFBWTtBQUNoQyx5QkFBeUIsbUJBQU8sQ0FBQyxpRkFBc0I7QUFDdkQsc0JBQXNCLG1CQUFPLENBQUMsMkVBQW1COztBQUVqRDtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUEsa0NBQWtDLGNBQWM7QUFDaEQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7O0FDOUVhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTs7QUFFaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLFNBQVM7QUFDcEI7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ25EYTs7QUFFYixtQkFBbUIsbUJBQU8sQ0FBQyxxRUFBZ0I7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxNQUFNO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqQmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZO0FBQ2hDLG9CQUFvQixtQkFBTyxDQUFDLHVFQUFpQjtBQUM3QyxlQUFlLG1CQUFPLENBQUMsdUVBQW9CO0FBQzNDLGVBQWUsbUJBQU8sQ0FBQyx5REFBYTtBQUNwQyxvQkFBb0IsbUJBQU8sQ0FBQyxxRkFBNEI7QUFDeEQsa0JBQWtCLG1CQUFPLENBQUMsaUZBQTBCOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0IsdUNBQXVDO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7O0FDckZhOztBQUViO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxNQUFNO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDcEJhOztBQUViLGtCQUFrQixtQkFBTyxDQUFDLG1FQUFlOztBQUV6QztBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDekJhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTs7QUFFaEM7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsTUFBTTtBQUNqQixXQUFXLGVBQWU7QUFDMUIsYUFBYSxFQUFFO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7Ozs7Ozs7Ozs7OztBQ25CQSwrQ0FBYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsa0RBQVM7QUFDN0IsMEJBQTBCLG1CQUFPLENBQUMsOEZBQStCOztBQUVqRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxnRUFBZ0I7QUFDdEMsR0FBRztBQUNIO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLGlFQUFpQjtBQUN2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0U7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sWUFBWTtBQUNuQjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7QUMvRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDVmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2pFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNiYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7O0FBRWhDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0M7QUFDeEMsT0FBTzs7QUFFUDtBQUNBLDBEQUEwRCx3QkFBd0I7QUFDbEY7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEMsNkJBQTZCLGFBQWEsRUFBRTtBQUM1QztBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7O0FDcERhOztBQUViO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNiYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7O0FBRWhDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckIsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7O0FDbkVhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxtREFBVTs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7O0FDWGE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLGVBQWU7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNwRGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMxQmE7O0FBRWIsV0FBVyxtQkFBTyxDQUFDLGdFQUFnQjtBQUNuQyxlQUFlLG1CQUFPLENBQUMsb0RBQVc7O0FBRWxDOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVMsR0FBRyxTQUFTO0FBQzVDLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLHVDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDOVNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLG1CQUFtQixLQUEwQjs7QUFFN0M7QUFDQSxrQkFBa0IsS0FBeUI7QUFDM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRSxJQUVVO0FBQ1o7QUFDQSxFQUFFLG1DQUFPO0FBQ1Q7QUFDQSxHQUFHO0FBQUEsb0dBQUM7QUFDSixFQUFFLE1BQU0sWUFVTjs7QUFFRixDQUFDOzs7Ozs7Ozs7Ozs7O0FDcEtEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDNVFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsMkJBQTJCLGdCQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7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dENTLEdBQVosQ0F4Q3lCLENBaXdDekI7O0FBQ0EsTUFBSTdDLEdBQUcsQ0FBQ1osS0FBSixJQUFhWSxHQUFHLENBQUNaLEtBQUosQ0FBVXVLLFFBQVYsQ0FBbUIsR0FBbkIsQ0FBakIsRUFBMEM7QUFDeEMzSixPQUFHLENBQUN3RCxhQUFKLENBQWtCLElBQWxCO0FBQ0Q7O0FBRUQsU0FBT3hELEdBQVA7QUFDRCxDLENBRUQ7QUFDQTs7O0FBRUFBLEdBQUcsQ0FBQ2IsVUFBSixHQUFpQkEsVUFBakI7QUFDQXlLLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjdKLEdBQWpCLEMiLCJmaWxlIjoiZGlyZWN0dXMtc2RrLnVtZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiRGlyZWN0dXNTREtcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGlyZWN0dXNTREtcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGlyZWN0dXNTREtcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIoZnVuY3Rpb24gKCkge1xuICAgIC8qXG4gICAgICogV2Ugb25seSBkZWZpbmUgdGhlIGlzL2hhcyogZnVuY3Rpb25zIGFuZCB1c2UgdGhlXG4gICAgICogZGVtYW5kKCkgZnVuY3Rpb24gdG8gYnVpbGQgdGhlIGRlbWFuZHMsIGFsc28gdGhlXG4gICAgICogZ2V0RGVtYW5kTWV0aG9kTmFtZUJ5VmFsaWRhdG9yS2V5KCkgKHllaCwgSSBrbm93IGl0J3MgYW4gdWdseSBuYW1lIDooKVxuICAgICAqIGJ1aWxkIHRoZSBkZW1hbmQgbWV0aG9kIGJhc2VkIGluIHRoZSAuaXMvaGFzIG1ldGhvZHNcbiAgICAgKi9cblxuICAgIHZhciB2ID0geyB9O1xuXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLkFyZ3VtZW50VmFsaWRhdG9yID0gdjtcbiAgICB9XG5cbiAgICB2YXIgZGVtYW5kID0gZnVuY3Rpb24gKGRlbWFuZE1ldGhvZE5hbWUsIHZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlIC8qIC4uLiBtb3JlIGFyZ3MsIG5hbWUgKi8pIHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0b3IuYXBwbHkodiwgYXJndW1lbnRzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbmFtZSA9IG51bGw7XG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgLTEpWzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodi5pc0pzb24odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBtc2cgPSBcIkludmFsaWQgXCIgKyBkZW1hbmRNZXRob2ROYW1lICsgXCIgdmFsdWU6IFwiICsgdmFsdWU7XG4gICAgICAgICAgICBpZiAodi5pc1N0cmluZyhuYW1lKSkge1xuICAgICAgICAgICAgICAgIG1zZyArPSBcIlxcbkFyZ3VtZW50IE5hbWU6IFwiICsgbmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHYuaXNBcnJheShhcmd1bWVudHNbMV0pKSB7XG4gICAgICAgICAgICAgICAgbXNnICs9IFwiXFxuS2V5czogXCIgKyBhcmd1bWVudHNbMV0uam9pbihcIiwgXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgZ2V0RGVtYW5kTWV0aG9kTmFtZUJ5VmFsaWRhdG9yS2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgcHJlZml4ID0gWyAnaXMnLCAnaGFzJyBdO1xuICAgICAgICB2YXIgcHJlZml4TGVuZ3RoID0gbnVsbDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWZpeC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcHJlZml4TGVuZ3RoID0gcHJlZml4W2ldLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKGtleS5zbGljZSgwLCBwcmVmaXhMZW5ndGgpID09PSBwcmVmaXhbaV0pIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkZW1hbmRNZXRob2ROYW1lID0ga2V5LnNsaWNlKHByZWZpeExlbmd0aCArIDEpO1xuICAgICAgICB2YXIgZmlyc3RMZXR0ZXIgPSBrZXkuc2xpY2UocHJlZml4TGVuZ3RoLCBwcmVmaXhMZW5ndGggKyAxKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YXIgbmFtZSA9IGZpcnN0TGV0dGVyICsgZGVtYW5kTWV0aG9kTmFtZTtcblxuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICB9O1xuXG4gICAgdmFyIGhhc0tleXNXaXRoID0gZnVuY3Rpb24gKHZhbGlkYXRvciwgb2JqLCBrZXlzKSB7XG4gICAgICAgIGlmICghdi5pc09iamVjdE9yRW1wdHkob2JqKSB8fCAhdi5pc0FycmF5T3JFbXB0eShrZXlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleXNbaV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXZhbGlkYXRvcihvYmpba2V5c1tpXV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIHZhciBpc0FycmF5T2YgPSBmdW5jdGlvbiAodmFsaWRhdG9yLCBhcnIpIHtcbiAgICAgICAgaWYgKCF2LmlzQXJyYXkoYXJyKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxlbmd0aCA9IGFyci5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghdmFsaWRhdG9yKGFycltpXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdi5pc05vdE51bGwgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQ7XG4gICAgfTtcblxuICAgIHYuaXNJbnN0YW5jZU9mID0gZnVuY3Rpb24odHlwZSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgdHlwZTtcbiAgICB9O1xuXG4gICAgdi5pc1R5cGUgPSBmdW5jdGlvbiAodHlwZSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IFwiW29iamVjdCBcIiArIHR5cGUgKyBcIl1cIjtcbiAgICB9O1xuXG4gICAgdi5pc0Jvb2xlYW4gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIChbIDEsIDAsIHRydWUsIGZhbHNlIF0uaW5kZXhPZih2YWx1ZSkgPiAtMSk7XG4gICAgfTtcblxuICAgIHYuaXNTdHJpbmdPckVtcHR5ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2LmlzVHlwZShcIlN0cmluZ1wiLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIHYuaXNTdHJpbmcgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF2LmlzU3RyaW5nT3JFbXB0eSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gL1xcUy8udGVzdCh2YWx1ZSk7XG4gICAgfTtcblxuICAgIHYuaXNOdW1iZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF2LmlzVHlwZSgnTnVtYmVyJywgdmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaXNGaW5pdGUodmFsdWUpICYmICFpc05hTihwYXJzZUZsb2F0KHZhbHVlKSk7XG4gICAgfTtcblxuICAgIHYuaXNBcnJheU9yRW1wdHkgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgIHJldHVybiB2LmlzVHlwZShcIkFycmF5XCIsIGFycik7XG4gICAgfTtcblxuICAgIHYuaXNBcnJheSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgaWYgKCF2LmlzQXJyYXlPckVtcHR5KGFycikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhcnIubGVuZ3RoID4gMDtcbiAgICB9O1xuXG4gICAgdi5pc0FycmF5T2ZOdW1iZXJzID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgICByZXR1cm4gaXNBcnJheU9mKHYuaXNOdW1iZXIsIGFycik7XG4gICAgfTtcblxuICAgIHYuaXNBcnJheU9mT2JqZWN0cyA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgcmV0dXJuIGlzQXJyYXlPZih2LmlzT2JqZWN0LCBhcnIpO1xuICAgIH07XG5cbiAgICB2LmlzT2JqZWN0T3JFbXB0eSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIHYuaXNUeXBlKFwiT2JqZWN0XCIsIG9iaik7XG4gICAgfTtcblxuICAgIHYuaXNPYmplY3QgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIGlmICghdi5pc09iamVjdE9yRW1wdHkob2JqKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgdi5pc0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF2LmlzT2JqZWN0T3JFbXB0eSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIHYuaXNKc29uU3RyaW5nID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdi5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdi5oYXNLZXlzID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICAgICAgICByZXR1cm4gaGFzS2V5c1dpdGgodi5pc05vdE51bGwsIG9iaiwga2V5cyk7XG4gICAgfTtcblxuICAgIHYuaGFzS2V5c1dpdGhOdW1iZXIgPSB2Lmhhc051bWJlcktleXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gICAgICAgIHJldHVybiBoYXNLZXlzV2l0aCh2LmlzTnVtYmVyLCBvYmosIGtleXMpO1xuICAgIH07XG5cbiAgICB2Lmhhc0tleXNXaXRoU3RyaW5nID0gdi5oYXNTdHJpbmdLZXlzID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICAgICAgICByZXR1cm4gaGFzS2V5c1dpdGgodi5pc1N0cmluZywgb2JqLCBrZXlzKTtcbiAgICB9O1xuXG4gICAgdi5oYXNLZXlzV2l0aE9iamVjdCA9IHYuaGFzT2JqZWN0S2V5cyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgICAgICAgcmV0dXJuIGhhc0tleXNXaXRoKHYuaXNPYmplY3QsIG9iaiwga2V5cyk7XG4gICAgfTtcblxuICAgIHYuaGFzS2V5c1dpdGhTdHJpbmdPckVtcHR5ID0gdi5oYXNTdHJpbmdPckVtcHR5S2V5cyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgICAgICAgcmV0dXJuIGhhc0tleXNXaXRoKHYuaXNTdHJpbmdPckVtcHR5LCBvYmosIGtleXMpO1xuICAgIH07XG5cbiAgICB2Lmhhc0tleXNXaXRoT2JqZWN0T3JFbXB0eSA9IHYuaGFzT2JqZWN0T3JFbXB0eUtleXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gICAgICAgIHJldHVybiBoYXNLZXlzV2l0aCh2LmlzT2JqZWN0T3JFbXB0eSwgb2JqLCBrZXlzKTtcbiAgICB9O1xuXG4gICAgdi5pc0Z1bmN0aW9uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2LmlzSW5zdGFuY2VPZihGdW5jdGlvbiwgdmFsdWUpO1xuICAgIH07XG5cbiAgICAvLyBidWlsZCBkZW1hbmQgZnVuY3Rpb25zXG4gICAgZm9yICh2YXIga2V5IGluIHYpIHtcbiAgICAgICAgdmFyIGRlbWFuZE1ldGhvZE5hbWUgPSBnZXREZW1hbmRNZXRob2ROYW1lQnlWYWxpZGF0b3JLZXkoa2V5KTtcbiAgICAgICAgdltkZW1hbmRNZXRob2ROYW1lXSA9IGRlbWFuZChkZW1hbmRNZXRob2ROYW1lLCB2W2tleV0pO1xuICAgIH1cblxufSkuY2FsbCh0aGlzKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDpcbiAgICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKHV0aWxzLm1lcmdlKGRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTtcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi8uLi9kZWZhdWx0cycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IHV0aWxzLm1lcmdlKHtcbiAgICAgIHVybDogYXJndW1lbnRzWzBdXG4gICAgfSwgYXJndW1lbnRzWzFdKTtcbiAgfVxuXG4gIGNvbmZpZyA9IHV0aWxzLm1lcmdlKGRlZmF1bHRzLCB7bWV0aG9kOiAnZ2V0J30sIHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybFxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIFN1cHBvcnQgYmFzZVVSTCBjb25maWdcbiAgaWYgKGNvbmZpZy5iYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKGNvbmZpZy51cmwpKSB7XG4gICAgY29uZmlnLnVybCA9IGNvbWJpbmVVUkxzKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgfVxuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnMgfHwge31cbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgcmV0dXJuIGVycm9yO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgLy8gTm90ZTogc3RhdHVzIGlzIG5vdCBleHBvc2VkIGJ5IFhEb21haW5SZXF1ZXN0XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgLyogSWdub3JlICovIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH1cbn07XG5cbmRlZmF1bHRzLmhlYWRlcnMgPSB7XG4gIGNvbW1vbjoge1xuICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ1xuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyU0MC9naSwgJ0AnKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgfSxcblxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgdmFyIG9yaWdpblVSTDtcblxuICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICB2YXIgaHJlZiA9IHVybDtcblxuICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICB9XG5cbiAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICByZXR1cm4ge1xuICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgIHZhciBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTtcbiIsIi8qISBodHRwOi8vbXRocy5iZS9iYXNlNjQgdjAuMS4wIGJ5IEBtYXRoaWFzIHwgTUlUIGxpY2Vuc2UgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlcyBgZXhwb3J0c2AuXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHM7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuXG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHRtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cyAmJiBtb2R1bGU7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAsIGZyb20gTm9kZS5qcyBvciBCcm93c2VyaWZpZWQgY29kZSwgYW5kIHVzZVxuXHQvLyBpdCBhcyBgcm9vdGAuXG5cdHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG5cdGlmIChmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCkge1xuXHRcdHJvb3QgPSBmcmVlR2xvYmFsO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dmFyIEludmFsaWRDaGFyYWN0ZXJFcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHR9O1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yO1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuXHR2YXIgZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0Ly8gTm90ZTogdGhlIGVycm9yIG1lc3NhZ2VzIHVzZWQgdGhyb3VnaG91dCB0aGlzIGZpbGUgbWF0Y2ggdGhvc2UgdXNlZCBieVxuXHRcdC8vIHRoZSBuYXRpdmUgYGF0b2JgL2BidG9hYCBpbXBsZW1lbnRhdGlvbiBpbiBDaHJvbWl1bS5cblx0XHR0aHJvdyBuZXcgSW52YWxpZENoYXJhY3RlckVycm9yKG1lc3NhZ2UpO1xuXHR9O1xuXG5cdHZhciBUQUJMRSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC9jb21tb24tbWljcm9zeW50YXhlcy5odG1sI3NwYWNlLWNoYXJhY3RlclxuXHR2YXIgUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUyA9IC9bXFx0XFxuXFxmXFxyIF0vZztcblxuXHQvLyBgZGVjb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGF0b2JgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZC4gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1hdG9iXG5cdC8vIFRoZSBvcHRpbWl6ZWQgYmFzZTY0LWRlY29kaW5nIGFsZ29yaXRobSB1c2VkIGlzIGJhc2VkIG9uIEBhdGvigJlzIGV4Y2VsbGVudFxuXHQvLyBpbXBsZW1lbnRhdGlvbi4gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vYXRrLzEwMjAzOTZcblx0dmFyIGRlY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpXG5cdFx0XHQucmVwbGFjZShSRUdFWF9TUEFDRV9DSEFSQUNURVJTLCAnJyk7XG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHRpZiAobGVuZ3RoICUgNCA9PSAwKSB7XG5cdFx0XHRpbnB1dCA9IGlucHV0LnJlcGxhY2UoLz09PyQvLCAnJyk7XG5cdFx0XHRsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdGxlbmd0aCAlIDQgPT0gMSB8fFxuXHRcdFx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvQyNhbHBoYW51bWVyaWMtYXNjaWktY2hhcmFjdGVyc1xuXHRcdFx0L1teK2EtekEtWjAtOS9dLy50ZXN0KGlucHV0KVxuXHRcdCkge1xuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdJbnZhbGlkIGNoYXJhY3RlcjogdGhlIHN0cmluZyB0byBiZSBkZWNvZGVkIGlzIG5vdCBjb3JyZWN0bHkgZW5jb2RlZC4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgYml0Q291bnRlciA9IDA7XG5cdFx0dmFyIGJpdFN0b3JhZ2U7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdGJ1ZmZlciA9IFRBQkxFLmluZGV4T2YoaW5wdXQuY2hhckF0KHBvc2l0aW9uKSk7XG5cdFx0XHRiaXRTdG9yYWdlID0gYml0Q291bnRlciAlIDQgPyBiaXRTdG9yYWdlICogNjQgKyBidWZmZXIgOiBidWZmZXI7XG5cdFx0XHQvLyBVbmxlc3MgdGhpcyBpcyB0aGUgZmlyc3Qgb2YgYSBncm91cCBvZiA0IGNoYXJhY3RlcnPigKZcblx0XHRcdGlmIChiaXRDb3VudGVyKysgJSA0KSB7XG5cdFx0XHRcdC8vIOKApmNvbnZlcnQgdGhlIGZpcnN0IDggYml0cyB0byBhIHNpbmdsZSBBU0NJSSBjaGFyYWN0ZXIuXG5cdFx0XHRcdG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuXHRcdFx0XHRcdDB4RkYgJiBiaXRTdG9yYWdlID4+ICgtMiAqIGJpdENvdW50ZXIgJiA2KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdC8vIGBlbmNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYnRvYWAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkOiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWJ0b2Fcblx0dmFyIGVuY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpO1xuXHRcdGlmICgvW15cXDAtXFx4RkZdLy50ZXN0KGlucHV0KSkge1xuXHRcdFx0Ly8gTm90ZTogbm8gbmVlZCB0byBzcGVjaWFsLWNhc2UgYXN0cmFsIHN5bWJvbHMgaGVyZSwgYXMgc3Vycm9nYXRlcyBhcmVcblx0XHRcdC8vIG1hdGNoZWQsIGFuZCB0aGUgaW5wdXQgaXMgc3VwcG9zZWQgdG8gb25seSBjb250YWluIEFTQ0lJIGFueXdheS5cblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnVGhlIHN0cmluZyB0byBiZSBlbmNvZGVkIGNvbnRhaW5zIGNoYXJhY3RlcnMgb3V0c2lkZSBvZiB0aGUgJyArXG5cdFx0XHRcdCdMYXRpbjEgcmFuZ2UuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIHBhZGRpbmcgPSBpbnB1dC5sZW5ndGggJSAzO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR2YXIgYTtcblx0XHR2YXIgYjtcblx0XHR2YXIgYztcblx0XHR2YXIgZDtcblx0XHR2YXIgYnVmZmVyO1xuXHRcdC8vIE1ha2Ugc3VyZSBhbnkgcGFkZGluZyBpcyBoYW5kbGVkIG91dHNpZGUgb2YgdGhlIGxvb3AuXG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aCAtIHBhZGRpbmc7XG5cblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0Ly8gUmVhZCB0aHJlZSBieXRlcywgaS5lLiAyNCBiaXRzLlxuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDE2O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbikgPDwgODtcblx0XHRcdGMgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGIgKyBjO1xuXHRcdFx0Ly8gVHVybiB0aGUgMjQgYml0cyBpbnRvIGZvdXIgY2h1bmtzIG9mIDYgYml0cyBlYWNoLCBhbmQgYXBwZW5kIHRoZVxuXHRcdFx0Ly8gbWF0Y2hpbmcgY2hhcmFjdGVyIGZvciBlYWNoIG9mIHRoZW0gdG8gdGhlIG91dHB1dC5cblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTggJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTIgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gNiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciAmIDB4M0YpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChwYWRkaW5nID09IDIpIHtcblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYjtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTApICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPj4gNCkgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDIpICYgMHgzRikgK1xuXHRcdFx0XHQnPSdcblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChwYWRkaW5nID09IDEpIHtcblx0XHRcdGJ1ZmZlciA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAyKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDQpICYgMHgzRikgK1xuXHRcdFx0XHQnPT0nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0dmFyIGJhc2U2NCA9IHtcblx0XHQnZW5jb2RlJzogZW5jb2RlLFxuXHRcdCdkZWNvZGUnOiBkZWNvZGUsXG5cdFx0J3ZlcnNpb24nOiAnMC4xLjAnXG5cdH07XG5cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gYmFzZTY0O1xuXHRcdH0pO1xuXHR9XHRlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiAhZnJlZUV4cG9ydHMubm9kZVR5cGUpIHtcblx0XHRpZiAoZnJlZU1vZHVsZSkgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gYmFzZTY0O1xuXHRcdH0gZWxzZSB7IC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYmFzZTY0KSB7XG5cdFx0XHRcdGJhc2U2NC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gYmFzZTY0W2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QuYmFzZTY0ID0gYmFzZTY0O1xuXHR9XG5cbn0odGhpcykpO1xuIiwiLyohXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgQnVmZmVyXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQnVmZmVyIChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIG9iai5jb25zdHJ1Y3RvciAhPSBudWxsICYmXG4gICAgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKVxufVxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG52YXIgcGVyY2VudFR3ZW50aWVzID0gLyUyMC9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAnZGVmYXVsdCc6ICdSRkMzOTg2JyxcbiAgICBmb3JtYXR0ZXJzOiB7XG4gICAgICAgIFJGQzE3Mzg6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2UuY2FsbCh2YWx1ZSwgcGVyY2VudFR3ZW50aWVzLCAnKycpO1xuICAgICAgICB9LFxuICAgICAgICBSRkMzOTg2OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgUkZDMTczODogJ1JGQzE3MzgnLFxuICAgIFJGQzM5ODY6ICdSRkMzOTg2J1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vc3RyaW5naWZ5Jyk7XG52YXIgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJyk7XG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBmb3JtYXRzOiBmb3JtYXRzLFxuICAgIHBhcnNlOiBwYXJzZSxcbiAgICBzdHJpbmdpZnk6IHN0cmluZ2lmeVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIGRlZmF1bHRzID0ge1xuICAgIGFsbG93RG90czogZmFsc2UsXG4gICAgYWxsb3dQcm90b3R5cGVzOiBmYWxzZSxcbiAgICBhcnJheUxpbWl0OiAyMCxcbiAgICBjaGFyc2V0OiAndXRmLTgnLFxuICAgIGNoYXJzZXRTZW50aW5lbDogZmFsc2UsXG4gICAgY29tbWE6IGZhbHNlLFxuICAgIGRlY29kZXI6IHV0aWxzLmRlY29kZSxcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBkZXB0aDogNSxcbiAgICBpZ25vcmVRdWVyeVByZWZpeDogZmFsc2UsXG4gICAgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzOiBmYWxzZSxcbiAgICBwYXJhbWV0ZXJMaW1pdDogMTAwMCxcbiAgICBwYXJzZUFycmF5czogdHJ1ZSxcbiAgICBwbGFpbk9iamVjdHM6IGZhbHNlLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBpbnRlcnByZXROdW1lcmljRW50aXRpZXMgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mIyhcXGQrKTsvZywgZnVuY3Rpb24gKCQwLCBudW1iZXJTdHIpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQobnVtYmVyU3RyLCAxMCkpO1xuICAgIH0pO1xufTtcblxuLy8gVGhpcyBpcyB3aGF0IGJyb3dzZXJzIHdpbGwgc3VibWl0IHdoZW4gdGhlIOKckyBjaGFyYWN0ZXIgb2NjdXJzIGluIGFuXG4vLyBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQgYm9keSBhbmQgdGhlIGVuY29kaW5nIG9mIHRoZSBwYWdlIGNvbnRhaW5pbmdcbi8vIHRoZSBmb3JtIGlzIGlzby04ODU5LTEsIG9yIHdoZW4gdGhlIHN1Ym1pdHRlZCBmb3JtIGhhcyBhbiBhY2NlcHQtY2hhcnNldFxuLy8gYXR0cmlidXRlIG9mIGlzby04ODU5LTEuIFByZXN1bWFibHkgYWxzbyB3aXRoIG90aGVyIGNoYXJzZXRzIHRoYXQgZG8gbm90IGNvbnRhaW5cbi8vIHRoZSDinJMgY2hhcmFjdGVyLCBzdWNoIGFzIHVzLWFzY2lpLlxudmFyIGlzb1NlbnRpbmVsID0gJ3V0Zjg9JTI2JTIzMTAwMDMlM0InOyAvLyBlbmNvZGVVUklDb21wb25lbnQoJyYjMTAwMDM7JylcblxuLy8gVGhlc2UgYXJlIHRoZSBwZXJjZW50LWVuY29kZWQgdXRmLTggb2N0ZXRzIHJlcHJlc2VudGluZyBhIGNoZWNrbWFyaywgaW5kaWNhdGluZyB0aGF0IHRoZSByZXF1ZXN0IGFjdHVhbGx5IGlzIHV0Zi04IGVuY29kZWQuXG52YXIgY2hhcnNldFNlbnRpbmVsID0gJ3V0Zjg9JUUyJTlDJTkzJzsgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCfinJMnKVxuXG52YXIgcGFyc2VWYWx1ZXMgPSBmdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nVmFsdWVzKHN0ciwgb3B0aW9ucykge1xuICAgIHZhciBvYmogPSB7fTtcbiAgICB2YXIgY2xlYW5TdHIgPSBvcHRpb25zLmlnbm9yZVF1ZXJ5UHJlZml4ID8gc3RyLnJlcGxhY2UoL15cXD8vLCAnJykgOiBzdHI7XG4gICAgdmFyIGxpbWl0ID0gb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9PT0gSW5maW5pdHkgPyB1bmRlZmluZWQgOiBvcHRpb25zLnBhcmFtZXRlckxpbWl0O1xuICAgIHZhciBwYXJ0cyA9IGNsZWFuU3RyLnNwbGl0KG9wdGlvbnMuZGVsaW1pdGVyLCBsaW1pdCk7XG4gICAgdmFyIHNraXBJbmRleCA9IC0xOyAvLyBLZWVwIHRyYWNrIG9mIHdoZXJlIHRoZSB1dGY4IHNlbnRpbmVsIHdhcyBmb3VuZFxuICAgIHZhciBpO1xuXG4gICAgdmFyIGNoYXJzZXQgPSBvcHRpb25zLmNoYXJzZXQ7XG4gICAgaWYgKG9wdGlvbnMuY2hhcnNldFNlbnRpbmVsKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKHBhcnRzW2ldLmluZGV4T2YoJ3V0Zjg9JykgPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAocGFydHNbaV0gPT09IGNoYXJzZXRTZW50aW5lbCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFyc2V0ID0gJ3V0Zi04JztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnRzW2ldID09PSBpc29TZW50aW5lbCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFyc2V0ID0gJ2lzby04ODU5LTEnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBza2lwSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGkgPSBwYXJ0cy5sZW5ndGg7IC8vIFRoZSBlc2xpbnQgc2V0dGluZ3MgZG8gbm90IGFsbG93IGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChpID09PSBza2lwSW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwYXJ0ID0gcGFydHNbaV07XG5cbiAgICAgICAgdmFyIGJyYWNrZXRFcXVhbHNQb3MgPSBwYXJ0LmluZGV4T2YoJ109Jyk7XG4gICAgICAgIHZhciBwb3MgPSBicmFja2V0RXF1YWxzUG9zID09PSAtMSA/IHBhcnQuaW5kZXhPZignPScpIDogYnJhY2tldEVxdWFsc1BvcyArIDE7XG5cbiAgICAgICAgdmFyIGtleSwgdmFsO1xuICAgICAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgICAgICAga2V5ID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQsIGRlZmF1bHRzLmRlY29kZXIsIGNoYXJzZXQpO1xuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPyBudWxsIDogJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZXkgPSBvcHRpb25zLmRlY29kZXIocGFydC5zbGljZSgwLCBwb3MpLCBkZWZhdWx0cy5kZWNvZGVyLCBjaGFyc2V0KTtcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuZGVjb2RlcihwYXJ0LnNsaWNlKHBvcyArIDEpLCBkZWZhdWx0cy5kZWNvZGVyLCBjaGFyc2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWwgJiYgb3B0aW9ucy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMgJiYgY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgICAgICB2YWwgPSBpbnRlcnByZXROdW1lcmljRW50aXRpZXModmFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWwgJiYgb3B0aW9ucy5jb21tYSAmJiB2YWwuaW5kZXhPZignLCcpID4gLTEpIHtcbiAgICAgICAgICAgIHZhbCA9IHZhbC5zcGxpdCgnLCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhcy5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgb2JqW2tleV0gPSB1dGlscy5jb21iaW5lKG9ialtrZXldLCB2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqW2tleV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxudmFyIHBhcnNlT2JqZWN0ID0gZnVuY3Rpb24gKGNoYWluLCB2YWwsIG9wdGlvbnMpIHtcbiAgICB2YXIgbGVhZiA9IHZhbDtcblxuICAgIGZvciAodmFyIGkgPSBjaGFpbi5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgb2JqO1xuICAgICAgICB2YXIgcm9vdCA9IGNoYWluW2ldO1xuXG4gICAgICAgIGlmIChyb290ID09PSAnW10nICYmIG9wdGlvbnMucGFyc2VBcnJheXMpIHtcbiAgICAgICAgICAgIG9iaiA9IFtdLmNvbmNhdChsZWFmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9iaiA9IG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgICAgICAgICAgdmFyIGNsZWFuUm9vdCA9IHJvb3QuY2hhckF0KDApID09PSAnWycgJiYgcm9vdC5jaGFyQXQocm9vdC5sZW5ndGggLSAxKSA9PT0gJ10nID8gcm9vdC5zbGljZSgxLCAtMSkgOiByb290O1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoY2xlYW5Sb290LCAxMCk7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMucGFyc2VBcnJheXMgJiYgY2xlYW5Sb290ID09PSAnJykge1xuICAgICAgICAgICAgICAgIG9iaiA9IHsgMDogbGVhZiB9O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAhaXNOYU4oaW5kZXgpXG4gICAgICAgICAgICAgICAgJiYgcm9vdCAhPT0gY2xlYW5Sb290XG4gICAgICAgICAgICAgICAgJiYgU3RyaW5nKGluZGV4KSA9PT0gY2xlYW5Sb290XG4gICAgICAgICAgICAgICAgJiYgaW5kZXggPj0gMFxuICAgICAgICAgICAgICAgICYmIChvcHRpb25zLnBhcnNlQXJyYXlzICYmIGluZGV4IDw9IG9wdGlvbnMuYXJyYXlMaW1pdClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG9iaiA9IFtdO1xuICAgICAgICAgICAgICAgIG9ialtpbmRleF0gPSBsZWFmO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmpbY2xlYW5Sb290XSA9IGxlYWY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZWFmID0gb2JqO1xuICAgIH1cblxuICAgIHJldHVybiBsZWFmO1xufTtcblxudmFyIHBhcnNlS2V5cyA9IGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmdLZXlzKGdpdmVuS2V5LCB2YWwsIG9wdGlvbnMpIHtcbiAgICBpZiAoIWdpdmVuS2V5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUcmFuc2Zvcm0gZG90IG5vdGF0aW9uIHRvIGJyYWNrZXQgbm90YXRpb25cbiAgICB2YXIga2V5ID0gb3B0aW9ucy5hbGxvd0RvdHMgPyBnaXZlbktleS5yZXBsYWNlKC9cXC4oW14uW10rKS9nLCAnWyQxXScpIDogZ2l2ZW5LZXk7XG5cbiAgICAvLyBUaGUgcmVnZXggY2h1bmtzXG5cbiAgICB2YXIgYnJhY2tldHMgPSAvKFxcW1teW1xcXV0qXSkvO1xuICAgIHZhciBjaGlsZCA9IC8oXFxbW15bXFxdXSpdKS9nO1xuXG4gICAgLy8gR2V0IHRoZSBwYXJlbnRcblxuICAgIHZhciBzZWdtZW50ID0gYnJhY2tldHMuZXhlYyhrZXkpO1xuICAgIHZhciBwYXJlbnQgPSBzZWdtZW50ID8ga2V5LnNsaWNlKDAsIHNlZ21lbnQuaW5kZXgpIDoga2V5O1xuXG4gICAgLy8gU3Rhc2ggdGhlIHBhcmVudCBpZiBpdCBleGlzdHNcblxuICAgIHZhciBrZXlzID0gW107XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgICAvLyBJZiB3ZSBhcmVuJ3QgdXNpbmcgcGxhaW4gb2JqZWN0cywgb3B0aW9uYWxseSBwcmVmaXgga2V5cyB0aGF0IHdvdWxkIG92ZXJ3cml0ZSBvYmplY3QgcHJvdG90eXBlIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKCFvcHRpb25zLnBsYWluT2JqZWN0cyAmJiBoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBwYXJlbnQpKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAga2V5cy5wdXNoKHBhcmVudCk7XG4gICAgfVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGNoaWxkcmVuIGFwcGVuZGluZyB0byB0aGUgYXJyYXkgdW50aWwgd2UgaGl0IGRlcHRoXG5cbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKChzZWdtZW50ID0gY2hpbGQuZXhlYyhrZXkpKSAhPT0gbnVsbCAmJiBpIDwgb3B0aW9ucy5kZXB0aCkge1xuICAgICAgICBpICs9IDE7XG4gICAgICAgIGlmICghb3B0aW9ucy5wbGFpbk9iamVjdHMgJiYgaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgc2VnbWVudFsxXS5zbGljZSgxLCAtMSkpKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGtleXMucHVzaChzZWdtZW50WzFdKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSdzIGEgcmVtYWluZGVyLCBqdXN0IGFkZCB3aGF0ZXZlciBpcyBsZWZ0XG5cbiAgICBpZiAoc2VnbWVudCkge1xuICAgICAgICBrZXlzLnB1c2goJ1snICsga2V5LnNsaWNlKHNlZ21lbnQuaW5kZXgpICsgJ10nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2VPYmplY3Qoa2V5cywgdmFsLCBvcHRpb25zKTtcbn07XG5cbnZhciBub3JtYWxpemVQYXJzZU9wdGlvbnMgPSBmdW5jdGlvbiBub3JtYWxpemVQYXJzZU9wdGlvbnMob3B0cykge1xuICAgIGlmICghb3B0cykge1xuICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuZGVjb2RlciAhPT0gbnVsbCAmJiBvcHRzLmRlY29kZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0cy5kZWNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0RlY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcHRzLmNoYXJzZXQgIT09ICd1bmRlZmluZWQnICYmIG9wdHMuY2hhcnNldCAhPT0gJ3V0Zi04JyAmJiBvcHRzLmNoYXJzZXQgIT09ICdpc28tODg1OS0xJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjaGFyc2V0IG9wdGlvbiBtdXN0IGJlIGVpdGhlciB1dGYtOCwgaXNvLTg4NTktMSwgb3IgdW5kZWZpbmVkJyk7XG4gICAgfVxuICAgIHZhciBjaGFyc2V0ID0gdHlwZW9mIG9wdHMuY2hhcnNldCA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5jaGFyc2V0IDogb3B0cy5jaGFyc2V0O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWxsb3dEb3RzOiB0eXBlb2Ygb3B0cy5hbGxvd0RvdHMgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuYWxsb3dEb3RzIDogISFvcHRzLmFsbG93RG90cyxcbiAgICAgICAgYWxsb3dQcm90b3R5cGVzOiB0eXBlb2Ygb3B0cy5hbGxvd1Byb3RvdHlwZXMgPT09ICdib29sZWFuJyA/IG9wdHMuYWxsb3dQcm90b3R5cGVzIDogZGVmYXVsdHMuYWxsb3dQcm90b3R5cGVzLFxuICAgICAgICBhcnJheUxpbWl0OiB0eXBlb2Ygb3B0cy5hcnJheUxpbWl0ID09PSAnbnVtYmVyJyA/IG9wdHMuYXJyYXlMaW1pdCA6IGRlZmF1bHRzLmFycmF5TGltaXQsXG4gICAgICAgIGNoYXJzZXQ6IGNoYXJzZXQsXG4gICAgICAgIGNoYXJzZXRTZW50aW5lbDogdHlwZW9mIG9wdHMuY2hhcnNldFNlbnRpbmVsID09PSAnYm9vbGVhbicgPyBvcHRzLmNoYXJzZXRTZW50aW5lbCA6IGRlZmF1bHRzLmNoYXJzZXRTZW50aW5lbCxcbiAgICAgICAgY29tbWE6IHR5cGVvZiBvcHRzLmNvbW1hID09PSAnYm9vbGVhbicgPyBvcHRzLmNvbW1hIDogZGVmYXVsdHMuY29tbWEsXG4gICAgICAgIGRlY29kZXI6IHR5cGVvZiBvcHRzLmRlY29kZXIgPT09ICdmdW5jdGlvbicgPyBvcHRzLmRlY29kZXIgOiBkZWZhdWx0cy5kZWNvZGVyLFxuICAgICAgICBkZWxpbWl0ZXI6IHR5cGVvZiBvcHRzLmRlbGltaXRlciA9PT0gJ3N0cmluZycgfHwgdXRpbHMuaXNSZWdFeHAob3B0cy5kZWxpbWl0ZXIpID8gb3B0cy5kZWxpbWl0ZXIgOiBkZWZhdWx0cy5kZWxpbWl0ZXIsXG4gICAgICAgIGRlcHRoOiB0eXBlb2Ygb3B0cy5kZXB0aCA9PT0gJ251bWJlcicgPyBvcHRzLmRlcHRoIDogZGVmYXVsdHMuZGVwdGgsXG4gICAgICAgIGlnbm9yZVF1ZXJ5UHJlZml4OiBvcHRzLmlnbm9yZVF1ZXJ5UHJlZml4ID09PSB0cnVlLFxuICAgICAgICBpbnRlcnByZXROdW1lcmljRW50aXRpZXM6IHR5cGVvZiBvcHRzLmludGVycHJldE51bWVyaWNFbnRpdGllcyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMgOiBkZWZhdWx0cy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMsXG4gICAgICAgIHBhcmFtZXRlckxpbWl0OiB0eXBlb2Ygb3B0cy5wYXJhbWV0ZXJMaW1pdCA9PT0gJ251bWJlcicgPyBvcHRzLnBhcmFtZXRlckxpbWl0IDogZGVmYXVsdHMucGFyYW1ldGVyTGltaXQsXG4gICAgICAgIHBhcnNlQXJyYXlzOiBvcHRzLnBhcnNlQXJyYXlzICE9PSBmYWxzZSxcbiAgICAgICAgcGxhaW5PYmplY3RzOiB0eXBlb2Ygb3B0cy5wbGFpbk9iamVjdHMgPT09ICdib29sZWFuJyA/IG9wdHMucGxhaW5PYmplY3RzIDogZGVmYXVsdHMucGxhaW5PYmplY3RzLFxuICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IHR5cGVvZiBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgOiBkZWZhdWx0cy5zdHJpY3ROdWxsSGFuZGxpbmdcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyLCBvcHRzKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBub3JtYWxpemVQYXJzZU9wdGlvbnMob3B0cyk7XG5cbiAgICBpZiAoc3RyID09PSAnJyB8fCBzdHIgPT09IG51bGwgfHwgdHlwZW9mIHN0ciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgIH1cblxuICAgIHZhciB0ZW1wT2JqID0gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyBwYXJzZVZhbHVlcyhzdHIsIG9wdGlvbnMpIDogc3RyO1xuICAgIHZhciBvYmogPSBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcblxuICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUga2V5cyBhbmQgc2V0dXAgdGhlIG5ldyBvYmplY3RcblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModGVtcE9iaik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICB2YXIgbmV3T2JqID0gcGFyc2VLZXlzKGtleSwgdGVtcE9ialtrZXldLCBvcHRpb25zKTtcbiAgICAgICAgb2JqID0gdXRpbHMubWVyZ2Uob2JqLCBuZXdPYmosIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiB1dGlscy5jb21wYWN0KG9iaik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBhcnJheVByZWZpeEdlbmVyYXRvcnMgPSB7XG4gICAgYnJhY2tldHM6IGZ1bmN0aW9uIGJyYWNrZXRzKHByZWZpeCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gcHJlZml4ICsgJ1tdJztcbiAgICB9LFxuICAgIGNvbW1hOiAnY29tbWEnLFxuICAgIGluZGljZXM6IGZ1bmN0aW9uIGluZGljZXMocHJlZml4LCBrZXkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbJyArIGtleSArICddJztcbiAgICB9LFxuICAgIHJlcGVhdDogZnVuY3Rpb24gcmVwZWF0KHByZWZpeCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gcHJlZml4O1xuICAgIH1cbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbnZhciBwdXNoID0gQXJyYXkucHJvdG90eXBlLnB1c2g7XG52YXIgcHVzaFRvQXJyYXkgPSBmdW5jdGlvbiAoYXJyLCB2YWx1ZU9yQXJyYXkpIHtcbiAgICBwdXNoLmFwcGx5KGFyciwgaXNBcnJheSh2YWx1ZU9yQXJyYXkpID8gdmFsdWVPckFycmF5IDogW3ZhbHVlT3JBcnJheV0pO1xufTtcblxudmFyIHRvSVNPID0gRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmc7XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgICBhZGRRdWVyeVByZWZpeDogZmFsc2UsXG4gICAgYWxsb3dEb3RzOiBmYWxzZSxcbiAgICBjaGFyc2V0OiAndXRmLTgnLFxuICAgIGNoYXJzZXRTZW50aW5lbDogZmFsc2UsXG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZW5jb2RlOiB0cnVlLFxuICAgIGVuY29kZXI6IHV0aWxzLmVuY29kZSxcbiAgICBlbmNvZGVWYWx1ZXNPbmx5OiBmYWxzZSxcbiAgICBmb3JtYXR0ZXI6IGZvcm1hdHMuZm9ybWF0dGVyc1tmb3JtYXRzWydkZWZhdWx0J11dLFxuICAgIC8vIGRlcHJlY2F0ZWRcbiAgICBpbmRpY2VzOiBmYWxzZSxcbiAgICBzZXJpYWxpemVEYXRlOiBmdW5jdGlvbiBzZXJpYWxpemVEYXRlKGRhdGUpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHRvSVNPLmNhbGwoZGF0ZSk7XG4gICAgfSxcbiAgICBza2lwTnVsbHM6IGZhbHNlLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBzdHJpbmdpZnkgPSBmdW5jdGlvbiBzdHJpbmdpZnkoIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgb2JqZWN0LFxuICAgIHByZWZpeCxcbiAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICBza2lwTnVsbHMsXG4gICAgZW5jb2RlcixcbiAgICBmaWx0ZXIsXG4gICAgc29ydCxcbiAgICBhbGxvd0RvdHMsXG4gICAgc2VyaWFsaXplRGF0ZSxcbiAgICBmb3JtYXR0ZXIsXG4gICAgZW5jb2RlVmFsdWVzT25seSxcbiAgICBjaGFyc2V0XG4pIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuICAgIGlmICh0eXBlb2YgZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG9iaiA9IGZpbHRlcihwcmVmaXgsIG9iaik7XG4gICAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIG9iaiA9IHNlcmlhbGl6ZURhdGUob2JqKTtcbiAgICB9IGVsc2UgaWYgKGdlbmVyYXRlQXJyYXlQcmVmaXggPT09ICdjb21tYScgJiYgaXNBcnJheShvYmopKSB7XG4gICAgICAgIG9iaiA9IG9iai5qb2luKCcsJyk7XG4gICAgfVxuXG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoc3RyaWN0TnVsbEhhbmRsaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlciAmJiAhZW5jb2RlVmFsdWVzT25seSA/IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0KSA6IHByZWZpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iaiA9ICcnO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fCB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgdXRpbHMuaXNCdWZmZXIob2JqKSkge1xuICAgICAgICBpZiAoZW5jb2Rlcikge1xuICAgICAgICAgICAgdmFyIGtleVZhbHVlID0gZW5jb2RlVmFsdWVzT25seSA/IHByZWZpeCA6IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0KTtcbiAgICAgICAgICAgIHJldHVybiBbZm9ybWF0dGVyKGtleVZhbHVlKSArICc9JyArIGZvcm1hdHRlcihlbmNvZGVyKG9iaiwgZGVmYXVsdHMuZW5jb2RlciwgY2hhcnNldCkpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2Zvcm1hdHRlcihwcmVmaXgpICsgJz0nICsgZm9ybWF0dGVyKFN0cmluZyhvYmopKV07XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuXG4gICAgdmFyIG9iaktleXM7XG4gICAgaWYgKGlzQXJyYXkoZmlsdGVyKSkge1xuICAgICAgICBvYmpLZXlzID0gZmlsdGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgb2JqS2V5cyA9IHNvcnQgPyBrZXlzLnNvcnQoc29ydCkgOiBrZXlzO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqS2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcblxuICAgICAgICBpZiAoc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHB1c2hUb0FycmF5KHZhbHVlcywgc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAgICAgIHR5cGVvZiBnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnZnVuY3Rpb24nID8gZ2VuZXJhdGVBcnJheVByZWZpeChwcmVmaXgsIGtleSkgOiBwcmVmaXgsXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHksXG4gICAgICAgICAgICAgICAgY2hhcnNldFxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwdXNoVG9BcnJheSh2YWx1ZXMsIHN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgICAgICBwcmVmaXggKyAoYWxsb3dEb3RzID8gJy4nICsga2V5IDogJ1snICsga2V5ICsgJ10nKSxcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgICAgICBza2lwTnVsbHMsXG4gICAgICAgICAgICAgICAgZW5jb2RlcixcbiAgICAgICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgICAgICBhbGxvd0RvdHMsXG4gICAgICAgICAgICAgICAgc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgICAgICAgICBjaGFyc2V0XG4gICAgICAgICAgICApKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXM7XG59O1xuXG52YXIgbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMob3B0cykge1xuICAgIGlmICghb3B0cykge1xuICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuZW5jb2RlciAhPT0gbnVsbCAmJiBvcHRzLmVuY29kZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0cy5lbmNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0VuY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGNoYXJzZXQgPSBvcHRzLmNoYXJzZXQgfHwgZGVmYXVsdHMuY2hhcnNldDtcbiAgICBpZiAodHlwZW9mIG9wdHMuY2hhcnNldCAhPT0gJ3VuZGVmaW5lZCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAndXRmLTgnICYmIG9wdHMuY2hhcnNldCAhPT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBjaGFyc2V0IG9wdGlvbiBtdXN0IGJlIGVpdGhlciB1dGYtOCwgaXNvLTg4NTktMSwgb3IgdW5kZWZpbmVkJyk7XG4gICAgfVxuXG4gICAgdmFyIGZvcm1hdCA9IGZvcm1hdHNbJ2RlZmF1bHQnXTtcbiAgICBpZiAodHlwZW9mIG9wdHMuZm9ybWF0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAoIWhhcy5jYWxsKGZvcm1hdHMuZm9ybWF0dGVycywgb3B0cy5mb3JtYXQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGZvcm1hdCBvcHRpb24gcHJvdmlkZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybWF0ID0gb3B0cy5mb3JtYXQ7XG4gICAgfVxuICAgIHZhciBmb3JtYXR0ZXIgPSBmb3JtYXRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcblxuICAgIHZhciBmaWx0ZXIgPSBkZWZhdWx0cy5maWx0ZXI7XG4gICAgaWYgKHR5cGVvZiBvcHRzLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJyB8fCBpc0FycmF5KG9wdHMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRzLmZpbHRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRRdWVyeVByZWZpeDogdHlwZW9mIG9wdHMuYWRkUXVlcnlQcmVmaXggPT09ICdib29sZWFuJyA/IG9wdHMuYWRkUXVlcnlQcmVmaXggOiBkZWZhdWx0cy5hZGRRdWVyeVByZWZpeCxcbiAgICAgICAgYWxsb3dEb3RzOiB0eXBlb2Ygb3B0cy5hbGxvd0RvdHMgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuYWxsb3dEb3RzIDogISFvcHRzLmFsbG93RG90cyxcbiAgICAgICAgY2hhcnNldDogY2hhcnNldCxcbiAgICAgICAgY2hhcnNldFNlbnRpbmVsOiB0eXBlb2Ygb3B0cy5jaGFyc2V0U2VudGluZWwgPT09ICdib29sZWFuJyA/IG9wdHMuY2hhcnNldFNlbnRpbmVsIDogZGVmYXVsdHMuY2hhcnNldFNlbnRpbmVsLFxuICAgICAgICBkZWxpbWl0ZXI6IHR5cGVvZiBvcHRzLmRlbGltaXRlciA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5kZWxpbWl0ZXIgOiBvcHRzLmRlbGltaXRlcixcbiAgICAgICAgZW5jb2RlOiB0eXBlb2Ygb3B0cy5lbmNvZGUgPT09ICdib29sZWFuJyA/IG9wdHMuZW5jb2RlIDogZGVmYXVsdHMuZW5jb2RlLFxuICAgICAgICBlbmNvZGVyOiB0eXBlb2Ygb3B0cy5lbmNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0cy5lbmNvZGVyIDogZGVmYXVsdHMuZW5jb2RlcixcbiAgICAgICAgZW5jb2RlVmFsdWVzT25seTogdHlwZW9mIG9wdHMuZW5jb2RlVmFsdWVzT25seSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5lbmNvZGVWYWx1ZXNPbmx5IDogZGVmYXVsdHMuZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgZmlsdGVyOiBmaWx0ZXIsXG4gICAgICAgIGZvcm1hdHRlcjogZm9ybWF0dGVyLFxuICAgICAgICBzZXJpYWxpemVEYXRlOiB0eXBlb2Ygb3B0cy5zZXJpYWxpemVEYXRlID09PSAnZnVuY3Rpb24nID8gb3B0cy5zZXJpYWxpemVEYXRlIDogZGVmYXVsdHMuc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgc2tpcE51bGxzOiB0eXBlb2Ygb3B0cy5za2lwTnVsbHMgPT09ICdib29sZWFuJyA/IG9wdHMuc2tpcE51bGxzIDogZGVmYXVsdHMuc2tpcE51bGxzLFxuICAgICAgICBzb3J0OiB0eXBlb2Ygb3B0cy5zb3J0ID09PSAnZnVuY3Rpb24nID8gb3B0cy5zb3J0IDogbnVsbCxcbiAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nOiB0eXBlb2Ygb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgPT09ICdib29sZWFuJyA/IG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nIDogZGVmYXVsdHMuc3RyaWN0TnVsbEhhbmRsaW5nXG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgb3B0cykge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgdmFyIG9wdGlvbnMgPSBub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zKG9wdHMpO1xuXG4gICAgdmFyIG9iaktleXM7XG4gICAgdmFyIGZpbHRlcjtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5maWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XG4gICAgICAgIG9iaiA9IGZpbHRlcignJywgb2JqKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkob3B0aW9ucy5maWx0ZXIpKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmpLZXlzID0gZmlsdGVyO1xuICAgIH1cblxuICAgIHZhciBrZXlzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgb2JqID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB2YXIgYXJyYXlGb3JtYXQ7XG4gICAgaWYgKG9wdHMgJiYgb3B0cy5hcnJheUZvcm1hdCBpbiBhcnJheVByZWZpeEdlbmVyYXRvcnMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRzLmFycmF5Rm9ybWF0O1xuICAgIH0gZWxzZSBpZiAob3B0cyAmJiAnaW5kaWNlcycgaW4gb3B0cykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdHMuaW5kaWNlcyA/ICdpbmRpY2VzJyA6ICdyZXBlYXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gJ2luZGljZXMnO1xuICAgIH1cblxuICAgIHZhciBnZW5lcmF0ZUFycmF5UHJlZml4ID0gYXJyYXlQcmVmaXhHZW5lcmF0b3JzW2FycmF5Rm9ybWF0XTtcblxuICAgIGlmICghb2JqS2V5cykge1xuICAgICAgICBvYmpLZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5zb3J0KSB7XG4gICAgICAgIG9iaktleXMuc29ydChvcHRpb25zLnNvcnQpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqS2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcblxuICAgICAgICBpZiAob3B0aW9ucy5za2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHB1c2hUb0FycmF5KGtleXMsIHN0cmluZ2lmeShcbiAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgIG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgb3B0aW9ucy5za2lwTnVsbHMsXG4gICAgICAgICAgICBvcHRpb25zLmVuY29kZSA/IG9wdGlvbnMuZW5jb2RlciA6IG51bGwsXG4gICAgICAgICAgICBvcHRpb25zLmZpbHRlcixcbiAgICAgICAgICAgIG9wdGlvbnMuc29ydCxcbiAgICAgICAgICAgIG9wdGlvbnMuYWxsb3dEb3RzLFxuICAgICAgICAgICAgb3B0aW9ucy5zZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgb3B0aW9ucy5mb3JtYXR0ZXIsXG4gICAgICAgICAgICBvcHRpb25zLmVuY29kZVZhbHVlc09ubHksXG4gICAgICAgICAgICBvcHRpb25zLmNoYXJzZXRcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgdmFyIGpvaW5lZCA9IGtleXMuam9pbihvcHRpb25zLmRlbGltaXRlcik7XG4gICAgdmFyIHByZWZpeCA9IG9wdGlvbnMuYWRkUXVlcnlQcmVmaXggPT09IHRydWUgPyAnPycgOiAnJztcblxuICAgIGlmIChvcHRpb25zLmNoYXJzZXRTZW50aW5lbCkge1xuICAgICAgICBpZiAob3B0aW9ucy5jaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgICAgIC8vIGVuY29kZVVSSUNvbXBvbmVudCgnJiMxMDAwMzsnKSwgdGhlIFwibnVtZXJpYyBlbnRpdHlcIiByZXByZXNlbnRhdGlvbiBvZiBhIGNoZWNrbWFya1xuICAgICAgICAgICAgcHJlZml4ICs9ICd1dGY4PSUyNiUyMzEwMDAzJTNCJic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBlbmNvZGVVUklDb21wb25lbnQoJ+KckycpXG4gICAgICAgICAgICBwcmVmaXggKz0gJ3V0Zjg9JUUyJTlDJTkzJic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gam9pbmVkLmxlbmd0aCA+IDAgPyBwcmVmaXggKyBqb2luZWQgOiAnJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG52YXIgaGV4VGFibGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgICAgICAgYXJyYXkucHVzaCgnJScgKyAoKGkgPCAxNiA/ICcwJyA6ICcnKSArIGkudG9TdHJpbmcoMTYpKS50b1VwcGVyQ2FzZSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXk7XG59KCkpO1xuXG52YXIgY29tcGFjdFF1ZXVlID0gZnVuY3Rpb24gY29tcGFjdFF1ZXVlKHF1ZXVlKSB7XG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiAgICAgICAgdmFyIG9iaiA9IGl0ZW0ub2JqW2l0ZW0ucHJvcF07XG5cbiAgICAgICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgdmFyIGNvbXBhY3RlZCA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG9iai5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW2pdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBjb21wYWN0ZWQucHVzaChvYmpbal0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXRlbS5vYmpbaXRlbS5wcm9wXSA9IGNvbXBhY3RlZDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBhcnJheVRvT2JqZWN0ID0gZnVuY3Rpb24gYXJyYXlUb09iamVjdChzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICB2YXIgb2JqID0gb3B0aW9ucyAmJiBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZVtpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIG9ialtpXSA9IHNvdXJjZVtpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG52YXIgbWVyZ2UgPSBmdW5jdGlvbiBtZXJnZSh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuICAgIGlmICghc291cmNlKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChpc0FycmF5KHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRhcmdldC5wdXNoKHNvdXJjZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0ICYmIHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAoKG9wdGlvbnMgJiYgKG9wdGlvbnMucGxhaW5PYmplY3RzIHx8IG9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSkgfHwgIWhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHNvdXJjZSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbc291cmNlXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW3RhcmdldCwgc291cmNlXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXQgfHwgdHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIFt0YXJnZXRdLmNvbmNhdChzb3VyY2UpO1xuICAgIH1cblxuICAgIHZhciBtZXJnZVRhcmdldCA9IHRhcmdldDtcbiAgICBpZiAoaXNBcnJheSh0YXJnZXQpICYmICFpc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgICAgbWVyZ2VUYXJnZXQgPSBhcnJheVRvT2JqZWN0KHRhcmdldCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKGlzQXJyYXkodGFyZ2V0KSAmJiBpc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgICAgc291cmNlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbiAgICAgICAgICAgIGlmIChoYXMuY2FsbCh0YXJnZXQsIGkpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldEl0ZW0gPSB0YXJnZXRbaV07XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldEl0ZW0gJiYgdHlwZW9mIHRhcmdldEl0ZW0gPT09ICdvYmplY3QnICYmIGl0ZW0gJiYgdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtpXSA9IG1lcmdlKHRhcmdldEl0ZW0sIGl0ZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICAgICAgICBpZiAoaGFzLmNhbGwoYWNjLCBrZXkpKSB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IG1lcmdlKGFjY1trZXldLCB2YWx1ZSwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgbWVyZ2VUYXJnZXQpO1xufTtcblxudmFyIGFzc2lnbiA9IGZ1bmN0aW9uIGFzc2lnblNpbmdsZVNvdXJjZSh0YXJnZXQsIHNvdXJjZSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgYWNjW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB0YXJnZXQpO1xufTtcblxudmFyIGRlY29kZSA9IGZ1bmN0aW9uIChzdHIsIGRlY29kZXIsIGNoYXJzZXQpIHtcbiAgICB2YXIgc3RyV2l0aG91dFBsdXMgPSBzdHIucmVwbGFjZSgvXFwrL2csICcgJyk7XG4gICAgaWYgKGNoYXJzZXQgPT09ICdpc28tODg1OS0xJykge1xuICAgICAgICAvLyB1bmVzY2FwZSBuZXZlciB0aHJvd3MsIG5vIHRyeS4uLmNhdGNoIG5lZWRlZDpcbiAgICAgICAgcmV0dXJuIHN0cldpdGhvdXRQbHVzLnJlcGxhY2UoLyVbMC05YS1mXXsyfS9naSwgdW5lc2NhcGUpO1xuICAgIH1cbiAgICAvLyB1dGYtOFxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyV2l0aG91dFBsdXMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHN0cldpdGhvdXRQbHVzO1xuICAgIH1cbn07XG5cbnZhciBlbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUoc3RyLCBkZWZhdWx0RW5jb2RlciwgY2hhcnNldCkge1xuICAgIC8vIFRoaXMgY29kZSB3YXMgb3JpZ2luYWxseSB3cml0dGVuIGJ5IEJyaWFuIFdoaXRlIChtc2NkZXgpIGZvciB0aGUgaW8uanMgY29yZSBxdWVyeXN0cmluZyBsaWJyYXJ5LlxuICAgIC8vIEl0IGhhcyBiZWVuIGFkYXB0ZWQgaGVyZSBmb3Igc3RyaWN0ZXIgYWRoZXJlbmNlIHRvIFJGQyAzOTg2XG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICB2YXIgc3RyaW5nID0gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyBzdHIgOiBTdHJpbmcoc3RyKTtcblxuICAgIGlmIChjaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgcmV0dXJuIGVzY2FwZShzdHJpbmcpLnJlcGxhY2UoLyV1WzAtOWEtZl17NH0vZ2ksIGZ1bmN0aW9uICgkMCkge1xuICAgICAgICAgICAgcmV0dXJuICclMjYlMjMnICsgcGFyc2VJbnQoJDAuc2xpY2UoMiksIDE2KSArICclM0InO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgb3V0ID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGMgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjID09PSAweDJEIC8vIC1cbiAgICAgICAgICAgIHx8IGMgPT09IDB4MkUgLy8gLlxuICAgICAgICAgICAgfHwgYyA9PT0gMHg1RiAvLyBfXG4gICAgICAgICAgICB8fCBjID09PSAweDdFIC8vIH5cbiAgICAgICAgICAgIHx8IChjID49IDB4MzAgJiYgYyA8PSAweDM5KSAvLyAwLTlcbiAgICAgICAgICAgIHx8IChjID49IDB4NDEgJiYgYyA8PSAweDVBKSAvLyBhLXpcbiAgICAgICAgICAgIHx8IChjID49IDB4NjEgJiYgYyA8PSAweDdBKSAvLyBBLVpcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBvdXQgKz0gc3RyaW5nLmNoYXJBdChpKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweDgwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyBoZXhUYWJsZVtjXTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweDgwMCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgKGhleFRhYmxlWzB4QzAgfCAoYyA+PiA2KV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4RDgwMCB8fCBjID49IDB4RTAwMCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgKGhleFRhYmxlWzB4RTAgfCAoYyA+PiAxMildICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiA2KSAmIDB4M0YpXSArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGkgKz0gMTtcbiAgICAgICAgYyA9IDB4MTAwMDAgKyAoKChjICYgMHgzRkYpIDw8IDEwKSB8IChzdHJpbmcuY2hhckNvZGVBdChpKSAmIDB4M0ZGKSk7XG4gICAgICAgIG91dCArPSBoZXhUYWJsZVsweEYwIHwgKGMgPj4gMTgpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDEyKSAmIDB4M0YpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxudmFyIGNvbXBhY3QgPSBmdW5jdGlvbiBjb21wYWN0KHZhbHVlKSB7XG4gICAgdmFyIHF1ZXVlID0gW3sgb2JqOiB7IG86IHZhbHVlIH0sIHByb3A6ICdvJyB9XTtcbiAgICB2YXIgcmVmcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlW2ldO1xuICAgICAgICB2YXIgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwga2V5cy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbal07XG4gICAgICAgICAgICB2YXIgdmFsID0gb2JqW2tleV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsICE9PSBudWxsICYmIHJlZnMuaW5kZXhPZih2YWwpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goeyBvYmo6IG9iaiwgcHJvcDoga2V5IH0pO1xuICAgICAgICAgICAgICAgIHJlZnMucHVzaCh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcGFjdFF1ZXVlKHF1ZXVlKTtcblxuICAgIHJldHVybiB2YWx1ZTtcbn07XG5cbnZhciBpc1JlZ0V4cCA9IGZ1bmN0aW9uIGlzUmVnRXhwKG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59O1xuXG52YXIgaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlcihvYmopIHtcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhKG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iaikpO1xufTtcblxudmFyIGNvbWJpbmUgPSBmdW5jdGlvbiBjb21iaW5lKGEsIGIpIHtcbiAgICByZXR1cm4gW10uY29uY2F0KGEsIGIpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXJyYXlUb09iamVjdDogYXJyYXlUb09iamVjdCxcbiAgICBhc3NpZ246IGFzc2lnbixcbiAgICBjb21iaW5lOiBjb21iaW5lLFxuICAgIGNvbXBhY3Q6IGNvbXBhY3QsXG4gICAgZGVjb2RlOiBkZWNvZGUsXG4gICAgZW5jb2RlOiBlbmNvZGUsXG4gICAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICAgIGlzUmVnRXhwOiBpc1JlZ0V4cCxcbiAgICBtZXJnZTogbWVyZ2Vcbn07XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJjb25zdCBheGlvcyA9IHJlcXVpcmUoXCJheGlvc1wiKTtcbmNvbnN0IGJhc2U2NCA9IHJlcXVpcmUoXCJiYXNlLTY0XCIpO1xuY29uc3QgcXMgPSByZXF1aXJlKFwicXNcIik7XG5jb25zdCBBViA9IHJlcXVpcmUoXCJhcmd1bWVudC12YWxpZGF0b3JcIik7XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSBwYXlsb2FkIGZyb20gYSBKV1RcbiAqIEBwYXJhbSAge1N0cmluZ30gdG9rZW4gVGhlIEpXVCB0byByZXRyaWV2ZSB0aGUgcGF5bG9hZCBmcm9tXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgIFRoZSBKV1QgcGF5bG9hZFxuICovXG5mdW5jdGlvbiBnZXRQYXlsb2FkKHRva2VuKSB7XG4gIGNvbnN0IHBheWxvYWRCYXNlNjQgPSB0b2tlblxuICAgIC5zcGxpdChcIi5cIilbMV1cbiAgICAucmVwbGFjZShcIi1cIiwgXCIrXCIpXG4gICAgLnJlcGxhY2UoXCJfXCIsIFwiL1wiKTtcbiAgY29uc3QgcGF5bG9hZERlY29kZWQgPSBiYXNlNjQuZGVjb2RlKHBheWxvYWRCYXNlNjQpO1xuICBjb25zdCBwYXlsb2FkT2JqZWN0ID0gSlNPTi5wYXJzZShwYXlsb2FkRGVjb2RlZCk7XG5cbiAgaWYgKEFWLmlzTnVtYmVyKHBheWxvYWRPYmplY3QuZXhwKSkge1xuICAgIHBheWxvYWRPYmplY3QuZXhwID0gbmV3IERhdGUocGF5bG9hZE9iamVjdC5leHAgKiAxMDAwKTtcbiAgfVxuXG4gIHJldHVybiBwYXlsb2FkT2JqZWN0O1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBTREsgaW5zdGFuY2VcbiAqIEBwYXJhbSAgICAgICB7b2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSAgICAgICB7c3RyaW5nfSBbb3B0aW9ucy51cmxdICAgVGhlIEFQSSB1cmwgdG8gY29ubmVjdCB0b1xuICogQHBhcmFtICAgICAgIHtzdHJpbmd9IFtvcHRpb25zLnByb2plY3RdICAgVGhlIEFQSSBwcm9qZWN0IHRvIGNvbm5lY3QgdG9cbiAqIEBwYXJhbSAgICAgICB7c3RyaW5nfSBbb3B0aW9ucy50b2tlbl0gVGhlIGFjY2VzcyB0b2tlbiB0byB1c2UgZm9yIHJlcXVlc3RzXG4gKiBAcGFyYW0gICAgICAge251bWJlcn0gW29wdGlvbnMudG9rZW5FeHBpcnlUaW1lXSBUaGUgdGltZSBpdCB0YWtlcyBmb3IgdGhlIEFQSSB0b2tlbiB0byBleHBpcmVcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBTREsob3B0aW9ucyA9IHt9KSB7XG4gIGxldCB0b2tlbjtcbiAgbGV0IHVybDtcbiAgbGV0IHByb2plY3QgPSBcIl9cIjtcbiAgbGV0IGxvY2FsRXhwO1xuICBsZXQgdG9rZW5FeHBpcnlUaW1lID0gNTtcblxuICBpZiAob3B0aW9ucy5zdG9yYWdlKSB7XG4gICAgbGV0IHN0b3JlZEluZm8gPSBvcHRpb25zLnN0b3JhZ2UuZ2V0SXRlbShcImRpcmVjdHVzLXNkay1qc1wiKTtcblxuICAgIGlmIChzdG9yZWRJbmZvKSB7XG4gICAgICBzdG9yZWRJbmZvID0gSlNPTi5wYXJzZShzdG9yZWRJbmZvKTtcblxuICAgICAgdG9rZW4gPSBzdG9yZWRJbmZvLnRva2VuO1xuICAgICAgdXJsID0gc3RvcmVkSW5mby51cmw7XG4gICAgICBwcm9qZWN0ID0gc3RvcmVkSW5mby5wcm9qZWN0O1xuICAgICAgbG9jYWxFeHAgPSBzdG9yZWRJbmZvLmxvY2FsRXhwO1xuICAgIH1cbiAgfVxuXG4gIGlmIChvcHRpb25zLnRva2VuKSB7XG4gICAgdG9rZW4gPSBvcHRpb25zLnRva2VuO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMudXJsKSB7XG4gICAgdXJsID0gb3B0aW9ucy51cmw7XG4gIH1cblxuICBpZiAob3B0aW9ucy5wcm9qZWN0KSB7XG4gICAgcHJvamVjdCA9IG9wdGlvbnMucHJvamVjdDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmxvY2FsRXhwKSB7XG4gICAgbG9jYWxFeHAgPSBvcHRpb25zLmxvY2FsRXhwO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMudG9rZW5FeHBpcnlUaW1lKSB7XG4gICAgdG9rZW5FeHBpcnlUaW1lID0gb3B0aW9ucy50b2tlbkV4cGlyeVRpbWU7XG4gIH1cblxuICBjb25zdCBTREsgPSB7XG4gICAgdXJsOiB1cmwsXG4gICAgdG9rZW46IHRva2VuLFxuICAgIHByb2plY3Q6IHByb2plY3QsXG5cbiAgICAvLyBUaGUgdG9rZW4gd2lsbCBjb250YWluIGFuIGV4cGlyeSB0aW1lIGJhc2VkIG9uIHRoZSBzZXJ2ZXIgdGltZVxuICAgIC8vIEluIG9yZGVyIHRvIG1ha2Ugc3VyZSB3ZSBjaGVjayB0aGUgcmlnaHQgZXhwaXJ5IGRhdGUsIHdlIG5lZWQgdG9cbiAgICAvLyBrZWVwIGEgdmVyc2lvbiB0aGF0J3MgYmFzZWQgb24gdGhlIGJyb3dzZXIgdGltZVxuICAgIGxvY2FsRXhwOiBsb2NhbEV4cCxcbiAgICBheGlvczogYXhpb3MuY3JlYXRlKHtcbiAgICAgIHBhcmFtc1NlcmlhbGl6ZXI6IHFzLnN0cmluZ2lmeSxcbiAgICAgIHRpbWVvdXQ6IDEwICogNjAgKiAxMDAwIC8vIDEwIG1pblxuICAgIH0pLFxuICAgIHJlZnJlc2hJbnRlcnZhbDogbnVsbCxcbiAgICBvbkF1dG9SZWZyZXNoRXJyb3I6IG51bGwsXG4gICAgb25BdXRvUmVmcmVzaFN1Y2Nlc3M6IG51bGwsXG5cbiAgICAvLyBUaGUgc3RvcmFnZSBtZXRob2QgdG8gdXNlLiBIYXMgdG8gc3VwcG9ydCBnZXRJdGVtIGFuZCBzZXRJdGVtIHRvIHN0b3JlIGFuZFxuICAgIC8vIHJldHJpZXZlIHRoZSB0b2tlblxuICAgIHN0b3JhZ2U6IG9wdGlvbnMuc3RvcmFnZSB8fCBudWxsLFxuXG4gICAgLy8gRGVmYXVsdHMgdG8gNSBtaW51dGVzLiBPbmNlIHRoZSBBUEkgc3VwcG9ydHMgYSBjdXN0b20sIHRoaXMgb3B0aW9uIGNhbiBiZSB1c2VkIHRvIHJlZmxlY3QgdGhhdFxuICAgIHRva2VuRXhwaXJ5VGltZTogdG9rZW5FeHBpcnlUaW1lLFxuXG4gICAgZ2V0IHBheWxvYWQoKSB7XG4gICAgICBpZiAoIUFWLmlzU3RyaW5nKHRoaXMudG9rZW4pKSByZXR1cm4gbnVsbDtcbiAgICAgIHJldHVybiBnZXRQYXlsb2FkKHRoaXMudG9rZW4pO1xuICAgIH0sXG5cbiAgICBnZXQgbG9nZ2VkSW4oKSB7XG4gICAgICBpZiAoXG4gICAgICAgIEFWLmlzU3RyaW5nKHRoaXMudG9rZW4pICYmXG4gICAgICAgIEFWLmlzU3RyaW5nKHRoaXMudXJsKSAmJlxuICAgICAgICBBVi5pc1N0cmluZyh0aGlzLnByb2plY3QpICYmXG4gICAgICAgIEFWLmlzT2JqZWN0KHRoaXMucGF5bG9hZClcbiAgICAgICkge1xuICAgICAgICBpZiAodGhpcy5sb2NhbEV4cCA+IERhdGUubm93KCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICAvLyBSRVFVRVNUIE1FVEhPRFNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBEaXJlY3R1cyBBUEkgcmVxdWVzdCBwcm9taXNlXG4gICAgICogQHByb21pc2UgUmVxdWVzdFByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7b2JqZWN0fSBEaXJlY3R1cyBkYXRhXG4gICAgICogQHJlamVjdCB7RXJyb3J9IE5ldHdvcmsgZXJyb3IgKGlmIG5vIGNvbm5lY3Rpb24gdG8gQVBJKVxuICAgICAqIEByZWplY3Qge0Vycm9yfSBEaXJlY3R1cyBlcnJvciAoZWcgbm90IGxvZ2dlZCBpbiBvciA0MDQpXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFuIEFQSSByZXF1ZXN0IHRvIHRoZSBEaXJlY3R1cyBBUElcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IG1ldGhvZCAgICAgIFRoZSBIVFRQIG1ldGhvZCB0byB1c2VcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGVuZHBvaW50ICAgIFRoZSBBUEkgZW5kcG9pbnQgdG8gcmVxdWVzdFxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gVGhlIEhUVFAgcXVlcnkgcGFyYW1ldGVycyAoR0VUIG9ubHkpXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbZGF0YT17fV0gICBUaGUgSFRUUCByZXF1ZXN0IGJvZHkgKG5vbi1HRVQgb25seSlcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBub0VudiAgICAgIERvbid0IHVzZSB0aGUgcHJvamVjdCBpbiB0aGUgcGF0aFxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IGlnbm9yZUpzb24gRG9uJ3QgcGFyc2UgdGhlIEFQSSByZXN1bHQgaW50byBKU09OXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgcmVxdWVzdChcbiAgICAgIG1ldGhvZCxcbiAgICAgIGVuZHBvaW50LFxuICAgICAgcGFyYW1zID0ge30sXG4gICAgICBkYXRhID0ge30sXG4gICAgICBub0VudiA9IGZhbHNlLFxuICAgICAgaGVhZGVycyA9IHt9LFxuICAgICAgaWdub3JlSnNvbiA9IGZhbHNlXG4gICAgKSB7XG4gICAgICBBVi5zdHJpbmcobWV0aG9kLCBcIm1ldGhvZFwiKTtcbiAgICAgIEFWLnN0cmluZyhlbmRwb2ludCwgXCJlbmRwb2ludFwiKTtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIEFycmF5LmlzQXJyYXkoZGF0YSlcbiAgICAgICAgPyBBVi5hcnJheU9yRW1wdHkoZGF0YSwgXCJkYXRhXCIpXG4gICAgICAgIDogQVYub2JqZWN0T3JFbXB0eShkYXRhLCBcImRhdGFcIik7XG5cbiAgICAgIEFWLnN0cmluZyh0aGlzLnVybCwgXCJ0aGlzLnVybFwiKTtcblxuICAgICAgbGV0IGJhc2VVUkwgPSBgJHt0aGlzLnVybH0vYDtcblxuICAgICAgaWYgKG5vRW52ID09PSBmYWxzZSkge1xuICAgICAgICBiYXNlVVJMICs9IGAke3RoaXMucHJvamVjdH0vYDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAgIHVybDogZW5kcG9pbnQsXG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgYmFzZVVSTCxcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICBkYXRhXG4gICAgICB9O1xuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMudG9rZW4gJiZcbiAgICAgICAgdHlwZW9mIHRoaXMudG9rZW4gPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgdGhpcy50b2tlbi5sZW5ndGggPiAwXG4gICAgICApIHtcbiAgICAgICAgcmVxdWVzdE9wdGlvbnMuaGVhZGVycyA9IGhlYWRlcnM7XG4gICAgICAgIHJlcXVlc3RPcHRpb25zLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0aGlzLnRva2VufWA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmF4aW9zXG4gICAgICAgIC5yZXF1ZXN0KHJlcXVlc3RPcHRpb25zKVxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgIGlmICghZGF0YSB8fCBkYXRhLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGRhdGE7XG5cbiAgICAgICAgICBpZiAoaWdub3JlSnNvbikgcmV0dXJuIGRhdGE7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgdGhyb3cge1xuICAgICAgICAgICAgICAgIGpzb246IHRydWUsXG4gICAgICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICAgICAgZGF0YVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGlmIChlcnJvci5yZXNwb25zZSkge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvcjtcbiAgICAgICAgICB9IGVsc2UgaWYgKGVycm9yLmpzb24gPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRocm93IHtcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICBjb2RlOiAtMixcbiAgICAgICAgICAgICAgbWVzc2FnZTogXCJBUEkgcmV0dXJuZWQgaW52YWxpZCBKU09OXCIsXG4gICAgICAgICAgICAgIGVycm9yOiBlcnJvci5lcnJvcixcbiAgICAgICAgICAgICAgZGF0YTogZXJyb3IuZGF0YVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cge1xuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICAgIGNvZGU6IC0xLFxuICAgICAgICAgICAgICBtZXNzYWdlOiBcIk5ldHdvcmsgRXJyb3JcIixcbiAgICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR0VUIGNvbnZlbmllbmNlIG1ldGhvZC4gQ2FsbHMgdGhlIHJlcXVlc3QgbWV0aG9kIGZvciB5b3VcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGVuZHBvaW50ICAgIFRoZSBlbmRwb2ludCB0byBnZXRcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFRoZSBIVFRQIHF1ZXJ5IHBhcmFtZXRlcnMgKEdFVCBvbmx5KVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldChlbmRwb2ludCwgcGFyYW1zID0ge30pIHtcbiAgICAgIEFWLnN0cmluZyhlbmRwb2ludCwgXCJlbmRwb2ludFwiKTtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcblxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcImdldFwiLCBlbmRwb2ludCwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUE9TVCBjb252ZW5pZW5jZSBtZXRob2QuIENhbGxzIHRoZSByZXF1ZXN0IG1ldGhvZCBmb3IgeW91XG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBlbmRwb2ludCAgVGhlIGVuZHBvaW50IHRvIGdldFxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW2JvZHk9e31dIFRoZSBIVFRQIHJlcXVlc3QgYm9keVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHBvc3QoZW5kcG9pbnQsIGJvZHkgPSB7fSwgcGFyYW1zID0ge30pIHtcbiAgICAgIEFWLnN0cmluZyhlbmRwb2ludCwgXCJlbmRwb2ludFwiKTtcbiAgICAgIEFycmF5LmlzQXJyYXkoYm9keSlcbiAgICAgICAgPyBBVi5hcnJheU9yRW1wdHkoYm9keSwgXCJib2R5XCIpXG4gICAgICAgIDogQVYub2JqZWN0T3JFbXB0eShib2R5LCBcImJvZHlcIik7XG5cbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXCJwb3N0XCIsIGVuZHBvaW50LCBwYXJhbXMsIGJvZHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQQVRDSCBjb252ZW5pZW5jZSBtZXRob2QuIENhbGxzIHRoZSByZXF1ZXN0IG1ldGhvZCBmb3IgeW91XG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBlbmRwb2ludCAgVGhlIGVuZHBvaW50IHRvIGdldFxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW2JvZHk9e31dIFRoZSBIVFRQIHJlcXVlc3QgYm9keVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHBhdGNoKGVuZHBvaW50LCBib2R5ID0ge30sIHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5zdHJpbmcoZW5kcG9pbnQsIFwiZW5kcG9pbnRcIik7XG4gICAgICBBcnJheS5pc0FycmF5KGJvZHkpXG4gICAgICAgID8gQVYuYXJyYXlPckVtcHR5KGJvZHksIFwiYm9keVwiKVxuICAgICAgICA6IEFWLm9iamVjdE9yRW1wdHkoYm9keSwgXCJib2R5XCIpO1xuXG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwicGF0Y2hcIiwgZW5kcG9pbnQsIHBhcmFtcywgYm9keSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBBVENIIGNvbnZlbmllbmNlIG1ldGhvZC4gQ2FsbHMgdGhlIHJlcXVlc3QgbWV0aG9kIGZvciB5b3VcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGVuZHBvaW50ICBUaGUgZW5kcG9pbnQgdG8gZ2V0XG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbYm9keT17fV0gVGhlIEhUVFAgcmVxdWVzdCBib2R5XG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgcHV0KGVuZHBvaW50LCBib2R5ID0ge30sIHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5zdHJpbmcoZW5kcG9pbnQsIFwiZW5kcG9pbnRcIik7XG4gICAgICBBcnJheS5pc0FycmF5KGJvZHkpXG4gICAgICAgID8gQVYuYXJyYXlPckVtcHR5KGJvZHksIFwiYm9keVwiKVxuICAgICAgICA6IEFWLm9iamVjdE9yRW1wdHkoYm9keSwgXCJib2R5XCIpO1xuXG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwicHV0XCIsIGVuZHBvaW50LCBwYXJhbXMsIGJvZHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQQVRDSCBjb252ZW5pZW5jZSBtZXRob2QuIENhbGxzIHRoZSByZXF1ZXN0IG1ldGhvZCBmb3IgeW91XG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBlbmRwb2ludCAgVGhlIGVuZHBvaW50IHRvIGdldFxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGRlbGV0ZShlbmRwb2ludCkge1xuICAgICAgQVYuc3RyaW5nKGVuZHBvaW50LCBcImVuZHBvaW50XCIpO1xuXG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZGVsZXRlXCIsIGVuZHBvaW50KTtcbiAgICB9LFxuXG4gICAgLy8gQVVUSEVOVElDQVRJT05cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBMb2dnaW5nIGluIHByb21pc2VcbiAgICAgKiBAcHJvbWlzZSBMb2dpblByb21pc2VcbiAgICAgKiBAZnVsZmlsbCB7T2JqZWN0fSBPYmplY3QgY29udGFpbmluZyBVUkwsIEVOViwgYW5kIFRPS0VOXG4gICAgICogQHJlamVjdCB7RXJyb3J9ICAgTmV0d29yayBlcnJvciAoaWYgbm8gY29ubmVjdGlvbiB0byBBUEkpXG4gICAgICogQHJlamVjdCB7RXJyb3J9ICAgRGlyZWN0dXMgZXJyb3IgKGVnIG5vdCBsb2dnZWQgaW4gb3IgNDA0KVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogTG9naW4gdG8gdGhlIEFQSS5cbiAgICAgKlxuICAgICAqIEdldHMgYSBuZXcgdG9rZW4gZnJvbSB0aGUgQVBJIGFuZCBzdG9yZXMgaXQgaW4gdGhpcy50b2tlblxuICAgICAqIEBwYXJhbSAge09iamVjdH0gY3JlZGVudGlhbHNcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNyZWRlbnRpYWxzLmVtYWlsICAgICBUaGUgdXNlcidzIGVtYWlsIGFkZHJlc3NcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNyZWRlbnRpYWxzLnBhc3N3b3JkICBUaGUgdXNlcidzIHBhc3N3b3JkXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBbY3JlZGVudGlhbHMub3RwXSAgICAgVGhlIHVzZXIncyAyRkEgT1RQXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBbY3JlZGVudGlhbHMudXJsXSAgICAgVGhlIEFQSSB0byBsb2dpbiB0byAob3ZlcndyaXRlcyB0aGlzLnVybClcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IFtjcmVkZW50aWFscy5wcm9qZWN0XSBUaGUgQVBJIHByb2plY3QgdG8gbG9naW4gdG8gKG92ZXJ3cml0ZXMgdGhpcy5wcm9qZWN0KVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gW29wdGlvbnMucGVyc2lzdF0gICAgIEF1dG8tZmV0Y2ggYSBuZXcgdG9rZW4gd2hlbiBpdCdzIGFib3V0IHRvIGV4cGlyZVxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IFtvcHRpb25zLnN0b3JhZ2VdICAgIFdoZXJlIHRvIHN0b3JlIHRoZSB0b2tlbiAoc3Vydml2ZSByZWZyZXNoZXMpXG4gICAgICogQHJldHVybiB7TG9naW5Qcm9taXNlfVxuICAgICAqL1xuICAgIGxvZ2luKGNyZWRlbnRpYWxzLCBvcHRpb25zID0geyBwZXJzaXN0OiB0cnVlIH0pIHtcbiAgICAgIEFWLm9iamVjdChjcmVkZW50aWFscywgXCJjcmVkZW50aWFsc1wiKTtcbiAgICAgIEFWLmtleXNXaXRoU3RyaW5nKGNyZWRlbnRpYWxzLCBbXCJlbWFpbFwiLCBcInBhc3N3b3JkXCJdLCBcImNyZWRlbnRpYWxzXCIpO1xuXG4gICAgICB0aGlzLnRva2VuID0gbnVsbDtcblxuICAgICAgaWYgKEFWLmhhc0tleXNXaXRoU3RyaW5nKGNyZWRlbnRpYWxzLCBbXCJ1cmxcIl0pKSB7XG4gICAgICAgIHRoaXMudXJsID0gY3JlZGVudGlhbHMudXJsO1xuICAgICAgfVxuXG4gICAgICBpZiAoQVYuaGFzS2V5c1dpdGhTdHJpbmcoY3JlZGVudGlhbHMsIFtcInByb2plY3RcIl0pKSB7XG4gICAgICAgIHRoaXMucHJvamVjdCA9IGNyZWRlbnRpYWxzLnByb2plY3Q7XG4gICAgICB9XG5cbiAgICAgIGlmIChjcmVkZW50aWFscy5wZXJzaXN0IHx8IG9wdGlvbnMucGVyc2lzdCkge1xuICAgICAgICB0aGlzLnN0YXJ0SW50ZXJ2YWwoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdGhpcy5wb3N0KFwiL2F1dGgvYXV0aGVudGljYXRlXCIsIHtcbiAgICAgICAgICBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwsXG4gICAgICAgICAgcGFzc3dvcmQ6IGNyZWRlbnRpYWxzLnBhc3N3b3JkLFxuICAgICAgICAgIG90cDogY3JlZGVudGlhbHMub3RwXG4gICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhLnRva2VuKVxuICAgICAgICAgIC50aGVuKHRva2VuID0+IHtcbiAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcblxuICAgICAgICAgICAgLy8gRXhwaXJ5IGRhdGUgaXMgdGhlIG1vbWVudCB3ZSBnb3QgdGhlIHRva2VuICsgNSBtaW51dGVzXG4gICAgICAgICAgICB0aGlzLmxvY2FsRXhwID0gbmV3IERhdGUoRGF0ZS5ub3coKSArIHRoaXMudG9rZW5FeHBpcnlUaW1lICogNjAwMDApLmdldFRpbWUoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc3RvcmFnZSkge1xuICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgICAgICAgICBcImRpcmVjdHVzLXNkay1qc1wiLFxuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgICAgICAgICAgICAgIHByb2plY3Q6IHRoaXMucHJvamVjdCxcbiAgICAgICAgICAgICAgICAgIGxvY2FsRXhwOiB0aGlzLmxvY2FsRXhwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgICAgICAgIHByb2plY3Q6IHRoaXMucHJvamVjdCxcbiAgICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICAgIGxvY2FsRXhwOiB0aGlzLmxvY2FsRXhwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIExvZ3MgdGhlIHVzZXIgb3V0IGJ5IFwiZm9yZ2V0dGluZ1wiIHRoZSB0b2tlbiwgYW5kIGNsZWFyaW5nIHRoZSByZWZyZXNoIGludGVydmFsXG4gICAgICovXG4gICAgbG9nb3V0KCkge1xuICAgICAgdGhpcy50b2tlbiA9IG51bGw7XG5cbiAgICAgIGlmICh0aGlzLnJlZnJlc2hJbnRlcnZhbCkge1xuICAgICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5zdG9yYWdlKSB7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmVJdGVtKFwiZGlyZWN0dXMtc2RrLWpzXCIpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIGNsaWVudCBpbnN0YW5jZSBieSBsb2dnaW5nIG91dCBhbmQgcmVtb3ZpbmcgdGhlIFVSTCBhbmQgcHJvamVjdFxuICAgICAqL1xuICAgIHJlc2V0KCkge1xuICAgICAgdGhpcy5sb2dvdXQoKTtcbiAgICAgIHRoaXMudXJsID0gbnVsbDtcbiAgICAgIHRoaXMucHJvamVjdCA9IG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyBhbiBpbnRlcnZhbCBvZiAxMCBzZWNvbmRzIHRoYXQgd2lsbCBjaGVjayBpZiB0aGUgdG9rZW4gbmVlZHMgcmVmcmVzaGluZ1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZmlyZUltbWVkaWF0ZWx5IEZpcmUgdGhlIHJlZnJlc2hJZk5lZWRlZCBtZXRob2QgZGlyZWN0bHlcbiAgICAgKi9cbiAgICBzdGFydEludGVydmFsKGZpcmVJbW1lZGlhdGVseSkge1xuICAgICAgaWYgKGZpcmVJbW1lZGlhdGVseSkgdGhpcy5yZWZyZXNoSWZOZWVkZWQoKTtcbiAgICAgIHRoaXMucmVmcmVzaEludGVydmFsID0gc2V0SW50ZXJ2YWwoXG4gICAgICAgIHRoaXMucmVmcmVzaElmTmVlZGVkLmJpbmQodGhpcyksXG4gICAgICAgIDEwMDAwXG4gICAgICApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgYW5kIG51bGxpZmllcyB0aGUgdG9rZW4gcmVmcmVzaGluZyBpbnRlcnZhbFxuICAgICAqL1xuICAgIHN0b3BJbnRlcnZhbCgpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5yZWZyZXNoSW50ZXJ2YWwpO1xuICAgICAgdGhpcy5yZWZyZXNoSW50ZXJ2YWwgPSBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZWZyZXNoIHRoZSB0b2tlbiBpZiBpdCBpcyBhYm91dCB0byBleHBpcmUgKHdpdGhpbiAzMCBzZWNvbmRzIG9mIGV4cGlyeSBkYXRlKVxuICAgICAqXG4gICAgICogQ2FsbHMgb25BdXRvUmVmcmVzaFN1Y2Nlc3Mgd2l0aCB0aGUgbmV3IHRva2VuIGlmIHRoZSByZWZyZXNoaW5nIGlzIHN1Y2Nlc3NmdWxcbiAgICAgKiBDYWxscyBvbkF1dG9SZWZyZXNoRXJyb3IgaWYgcmVmcmVzaGluZyB0aGUgdG9rZW4gZmFpbHMgZm9yIHNvbWUgcmVhc29uXG4gICAgICovXG4gICAgcmVmcmVzaElmTmVlZGVkKCkge1xuICAgICAgaWYgKCFBVi5oYXNTdHJpbmdLZXlzKHRoaXMsIFtcInRva2VuXCIsIFwidXJsXCIsIFwicHJvamVjdFwiXSkpIHJldHVybjtcbiAgICAgIGlmICghdGhpcy5wYXlsb2FkIHx8ICF0aGlzLnBheWxvYWQuZXhwKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHRpbWVEaWZmID0gdGhpcy5sb2NhbEV4cCAtIERhdGUubm93KCk7XG5cbiAgICAgIGlmICh0aW1lRGlmZiA8PSAwKSB7XG4gICAgICAgIGlmIChBVi5pc0Z1bmN0aW9uKHRoaXMub25BdXRvUmVmcmVzaEVycm9yKSkge1xuICAgICAgICAgIHRoaXMub25BdXRvUmVmcmVzaEVycm9yKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiYXV0aF9leHBpcmVkX3Rva2VuXCIsXG4gICAgICAgICAgICBjb2RlOiAxMDJcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aW1lRGlmZiA8IDMwMDAwKSB7XG4gICAgICAgIHRoaXMucmVmcmVzaCh0aGlzLnRva2VuKVxuICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnRva2VuID0gcmVzLmRhdGEudG9rZW47XG4gICAgICAgICAgICB0aGlzLmxvY2FsRXhwID0gbmV3IERhdGUoRGF0ZS5ub3coKSArIHRoaXMudG9rZW5FeHBpcnlUaW1lICogNjAwMDApLmdldFRpbWUoKTtcblxuICAgICAgICAgICAgaWYgKEFWLmlzRnVuY3Rpb24odGhpcy5vbkF1dG9SZWZyZXNoU3VjY2VzcykpIHtcbiAgICAgICAgICAgICAgdGhpcy5vbkF1dG9SZWZyZXNoU3VjY2Vzcyh7XG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgICAgICAgICAgICBwcm9qZWN0OiB0aGlzLnByb2plY3QsXG4gICAgICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICAgICAgbG9jYWxFeHA6IHRoaXMubG9jYWxFeHBcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN0b3JhZ2UpIHtcbiAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICAgICAgXCJkaXJlY3R1cy1zZGstanNcIixcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICAgICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgICAgICAgICAgICBwcm9qZWN0OiB0aGlzLnByb2plY3QsXG4gICAgICAgICAgICAgICAgICBsb2NhbEV4cDogdGhpcy5sb2NhbEV4cFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgaWYgKEFWLmlzRnVuY3Rpb24odGhpcy5vbkF1dG9SZWZyZXNoRXJyb3IpKSB7XG4gICAgICAgICAgICAgIHRoaXMub25BdXRvUmVmcmVzaEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXNlIHRoZSBwYXNzZWQgdG9rZW4gdG8gcmVxdWVzdCBhIG5ldyBvbmVcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHRva2VuIEFjdGl2ZSAmIFZhbGlkIHRva2VuXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgcmVmcmVzaCh0b2tlbikge1xuICAgICAgQVYuc3RyaW5nKHRva2VuLCBcInRva2VuXCIpO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChcIi9hdXRoL3JlZnJlc2hcIiwgeyB0b2tlbiB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdCB0byByZXNldCB0aGUgcGFzc3dvcmQgb2YgdGhlIHVzZXIgd2l0aCB0aGUgZ2l2ZW4gZW1haWwgYWRkcmVzc1xuICAgICAqXG4gICAgICogVGhlIEFQSSB3aWxsIHNlbmQgYW4gZW1haWwgdG8gdGhlIGdpdmVuIGVtYWlsIGFkZHJlc3Mgd2l0aCBhIGxpbmsgdG8gZ2VuZXJhdGUgYSBuZXdcbiAgICAgKiB0ZW1wb3JhcnkgcGFzc3dvcmQuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGVtYWlsIFRoZSB1c2VyJ3MgZW1haWxcbiAgICAgKi9cbiAgICByZXF1ZXN0UGFzc3dvcmRSZXNldChlbWFpbCkge1xuICAgICAgQVYuc3RyaW5nKGVtYWlsLCBcImVtYWlsXCIpO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChcIi9hdXRoL3Bhc3N3b3JkL3JlcXVlc3RcIiwge1xuICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvLyBBQ1RJVklUWVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEdldCBhY3Rpdml0eVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldEFjdGl2aXR5KHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoXCIvYWN0aXZpdHlcIiwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLy8gQk9PS01BUktTXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBib29rbWFya3Mgb2YgdGhlIGN1cnJlbnQgdXNlclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldE15Qm9va21hcmtzKHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5zdHJpbmcodGhpcy50b2tlbiwgXCJ0aGlzLnRva2VuXCIpO1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMpO1xuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgdGhpcy5nZXQoXCIvY29sbGVjdGlvbl9wcmVzZXRzXCIsIHtcbiAgICAgICAgICBcImZpbHRlclt0aXRsZV1bbm51bGxdXCI6IDEsXG4gICAgICAgICAgXCJmaWx0ZXJbdXNlcl1bZXFdXCI6IHRoaXMucGF5bG9hZC5pZFxuICAgICAgICB9KSxcbiAgICAgICAgdGhpcy5nZXQoXCIvY29sbGVjdGlvbl9wcmVzZXRzXCIsIHtcbiAgICAgICAgICBcImZpbHRlclt0aXRsZV1bbm51bGxdXCI6IDEsXG4gICAgICAgICAgXCJmaWx0ZXJbcm9sZV1bZXFdXCI6IHRoaXMucGF5bG9hZC5yb2xlLFxuICAgICAgICAgIFwiZmlsdGVyW3VzZXJdW251bGxdXCI6IDFcbiAgICAgICAgfSlcbiAgICAgIF0pLnRoZW4odmFsdWVzID0+IHtcbiAgICAgICAgY29uc3QgW3VzZXIsIHJvbGVdID0gdmFsdWVzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNoYWRvd1xuICAgICAgICByZXR1cm4gWy4uLnVzZXIuZGF0YSwgLi4ucm9sZS5kYXRhXTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvLyBDT0xMRUNUSU9OU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgYXZhaWxhYmxlIGNvbGxlY3Rpb25zXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0Q29sbGVjdGlvbnMocGFyYW1zID0ge30pIHtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChcIi9jb2xsZWN0aW9uc1wiLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgY29sbGVjdGlvbiBpbmZvIGJ5IG5hbWVcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIENvbGxlY3Rpb24gbmFtZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldENvbGxlY3Rpb24oY29sbGVjdGlvbiwgcGFyYW1zID0ge30pIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoYC9jb2xsZWN0aW9ucy8ke2NvbGxlY3Rpb259YCwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgY29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIENvbGxlY3Rpb24gaW5mb3JtYXRpb25cbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBjcmVhdGVDb2xsZWN0aW9uKGRhdGEpIHtcbiAgICAgIEFWLm9iamVjdChkYXRhLCBcImRhdGFcIik7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KFwiL2NvbGxlY3Rpb25zXCIsIGRhdGEpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IFRoZSBjb2xsZWN0aW9uIHRvIHVwZGF0ZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gVGhlIGZpZWxkcyB0byB1cGRhdGVcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICB1cGRhdGVDb2xsZWN0aW9uKGNvbGxlY3Rpb24sIGRhdGEpIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5vYmplY3QoZGF0YSwgXCJkYXRhXCIpO1xuICAgICAgcmV0dXJuIHRoaXMucGF0Y2goYC9jb2xsZWN0aW9ucy8ke2NvbGxlY3Rpb259YCwgZGF0YSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiBUaGUgcHJpbWFyeSBrZXkgb2YgdGhlIGNvbGxlY3Rpb24gdG8gcmVtb3ZlXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZGVsZXRlQ29sbGVjdGlvbihjb2xsZWN0aW9uKSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlKGAvY29sbGVjdGlvbnMvJHtjb2xsZWN0aW9ufWApO1xuICAgIH0sXG5cbiAgICAvLyBDT0xMRUNUSU9OIFBSRVNFVFNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgY29sbGVjdGlvbiBwcmVzZXQgKGJvb2ttYXJrIC8gbGlzdGluZyBwcmVmZXJlbmNlcylcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgVGhlIGJvb2ttYXJrIGluZm9cbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBjcmVhdGVDb2xsZWN0aW9uUHJlc2V0KGRhdGEpIHtcbiAgICAgIEFWLm9iamVjdChkYXRhKTtcbiAgICAgIHJldHVybiB0aGlzLnBvc3QoXCIvY29sbGVjdGlvbl9wcmVzZXRzXCIsIGRhdGEpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgY29sbGVjdGlvbiBwcmVzZXQgKGJvb2ttYXJrIC8gbGlzdGluZyBwcmVmZXJlbmNlKVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gcHJpbWFyeUtleVxuICAgICAqIEBwYXJhbSB7UmVxdWVzdFByb21pc2V9IGRhdGFcbiAgICAgKi9cbiAgICB1cGRhdGVDb2xsZWN0aW9uUHJlc2V0KHByaW1hcnlLZXksIGRhdGEpIHtcbiAgICAgIEFWLm5vdE51bGwocHJpbWFyeUtleSwgXCJwcmltYXJ5S2V5XCIpO1xuICAgICAgQVYub2JqZWN0KGRhdGEsIFwiZGF0YVwiKTtcblxuICAgICAgcmV0dXJuIHRoaXMucGF0Y2goYC9jb2xsZWN0aW9uX3ByZXNldHMvJHtwcmltYXJ5S2V5fWAsIGRhdGEpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgY29sbGVjdGlvbiBwcmVzZXQgYnkgcHJpbWFyeWtleVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gcHJpbWFyeUtleSBUaGUgcHJpbWFyeUtleSBvZiB0aGUgcHJlc2V0IHRvIGRlbGV0ZVxuICAgICAqL1xuICAgIGRlbGV0ZUNvbGxlY3Rpb25QcmVzZXQocHJpbWFyeUtleSkge1xuICAgICAgQVYubm90TnVsbChwcmltYXJ5S2V5LCBcInByaW1hcnlLZXlcIik7XG4gICAgICByZXR1cm4gdGhpcy5kZWxldGUoYC9jb2xsZWN0aW9uX3ByZXNldHMvJHtwcmltYXJ5S2V5fWApO1xuICAgIH0sXG5cbiAgICAvLyBEQVRBQkFTRVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogVGhpcyB3aWxsIHVwZGF0ZSB0aGUgZGF0YWJhc2Ugb2YgdGhlIEFQSSBpbnN0YW5jZSB0byB0aGUgbGF0ZXN0IHZlcnNpb25cbiAgICAgKiB1c2luZyB0aGUgbWlncmF0aW9ucyBpbiB0aGUgQVBJXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgdXBkYXRlRGF0YWJhc2UoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KFwiL3VwZGF0ZVwiKTtcbiAgICB9LFxuXG4gICAgLy8gRVhURU5TSU9OU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbWV0YSBpbmZvcm1hdGlvbiBvZiBhbGwgaW5zdGFsbGVkIGludGVyZmFjZXNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRJbnRlcmZhY2VzKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcImdldFwiLCBcIi9pbnRlcmZhY2VzXCIsIHt9LCB7fSwgdHJ1ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbWV0YSBpbmZvcm1hdGlvbiBvZiBhbGwgaW5zdGFsbGVkIGxheW91dHNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRMYXlvdXRzKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcImdldFwiLCBcIi9sYXlvdXRzXCIsIHt9LCB7fSwgdHJ1ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbWV0YSBpbmZvcm1hdGlvbiBvZiBhbGwgaW5zdGFsbGVkIHBhZ2VzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0UGFnZXMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZ2V0XCIsIFwiL3BhZ2VzXCIsIHt9LCB7fSwgdHJ1ZSk7XG4gICAgfSxcblxuICAgIC8vIEZJRUxEU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBmaWVsZHMgdGhhdCBhcmUgaW4gRGlyZWN0dXNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRBbGxGaWVsZHMocGFyYW1zID0ge30pIHtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChcIi9maWVsZHNcIiwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBmaWVsZHMgdGhhdCBoYXZlIGJlZW4gc2V0dXAgZm9yIGEgZ2l2ZW4gY29sbGVjdGlvblxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiAgQ29sbGVjdGlvbiBuYW1lXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0RmllbGRzKGNvbGxlY3Rpb24sIHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KGAvZmllbGRzLyR7Y29sbGVjdGlvbn1gLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGZpZWxkIGluZm9ybWF0aW9uIGZvciBhIHNpbmdsZSBnaXZlbiBmaWVsZFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiAgQ29sbGVjdGlvbiBuYW1lXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBmaWVsZE5hbWUgICBGaWVsZCBuYW1lXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0RmllbGQoY29sbGVjdGlvbiwgZmllbGROYW1lLCBwYXJhbXMgPSB7fSkge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLnN0cmluZyhmaWVsZE5hbWUsIFwiZmllbGROYW1lXCIpO1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KGAvZmllbGRzLyR7Y29sbGVjdGlvbn0vJHtmaWVsZE5hbWV9YCwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgZmllbGQgaW4gdGhlIGdpdmVuIGNvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gQ29sbGVjdGlvbiB0byBhZGQgdGhlIGZpZWxkIGluXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBmaWVsZEluZm8gIFRoZSBmaWVsZHMgaW5mbyB0byBzYXZlXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgY3JlYXRlRmllbGQoY29sbGVjdGlvbiwgZmllbGRJbmZvKSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYub2JqZWN0KGZpZWxkSW5mbywgXCJmaWVsZEluZm9cIik7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KGAvZmllbGRzLyR7Y29sbGVjdGlvbn1gLCBmaWVsZEluZm8pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYSBnaXZlbiBmaWVsZCBpbiBhIGdpdmVuIGNvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gRmllbGQncyBwYXJlbnQgY29sbGVjdGlvblxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZmllbGROYW1lICBOYW1lIG9mIHRoZSBmaWVsZCB0byB1cGRhdGVcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGZpZWxkSW5mbyAgRmllbGRzIHRvIHVwZGF0ZVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHVwZGF0ZUZpZWxkKGNvbGxlY3Rpb24sIGZpZWxkTmFtZSwgZmllbGRJbmZvKSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYuc3RyaW5nKGZpZWxkTmFtZSwgXCJmaWVsZE5hbWVcIik7XG4gICAgICBBVi5vYmplY3QoZmllbGRJbmZvLCBcImZpZWxkSW5mb1wiKTtcbiAgICAgIHJldHVybiB0aGlzLnBhdGNoKGAvZmllbGRzLyR7Y29sbGVjdGlvbn0vJHtmaWVsZE5hbWV9YCwgZmllbGRJbmZvKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIG11bHRpcGxlIGZpZWxkcyBhdCBvbmNlXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uICAgICAgICAgICAgIEZpZWxkcycgcGFyZW50IGNvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gZmllbGRzSW5mb09yRmllbGROYW1lcyAgQXJyYXkgb2YgZmllbGQgb2JqZWN0cyBvciBhcnJheSBvZiBmaWVsZCBuYW1lc1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gW2ZpZWxkSW5mb10gICAgICAgICAgICBJbiBjYXNlIGZpZWxkc0luZm9PckZpZWxkTmFtZXMgaXMgYW4gYXJyYXkgb2YgZmllbGROYW1lcywgeW91IG5lZWQgdG8gcHJvdmlkZSB0aGUgZmllbGRzIHRvIHVwZGF0ZVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIC8vIFNldCBtdWx0aXBsZSBmaWVsZHMgdG8gdGhlIHNhbWUgdmFsdWVcbiAgICAgKiB1cGRhdGVGaWVsZHMoXCJwcm9qZWN0c1wiLCBbXCJmaXJzdF9uYW1lXCIsIFwibGFzdF9uYW1lXCIsIFwiZW1haWxcIl0sIHtcbiAgICAgKiAgIGRlZmF1bHRfdmFsdWU6IFwiXCJcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogLy8gU2V0IG11bHRpcGxlIGZpZWxkcyB0byBkaWZmZXJlbnQgdmFsdWVzXG4gICAgICogdXBkYXRlRmllbGRzKFwicHJvamVjdHNcIiwgW1xuICAgICAqICAge1xuICAgICAqICAgICBpZDogMTQsXG4gICAgICogICAgIHNvcnQ6IDFcbiAgICAgKiAgIH0sXG4gICAgICogICB7XG4gICAgICogICAgIGlkOiAxNyxcbiAgICAgKiAgICAgc29ydDogMlxuICAgICAqICAgfSxcbiAgICAgKiAgIHtcbiAgICAgKiAgICAgaWQ6IDkxMixcbiAgICAgKiAgICAgc29ydDogM1xuICAgICAqICAgfVxuICAgICAqIF0pXG4gICAgICovXG4gICAgdXBkYXRlRmllbGRzKGNvbGxlY3Rpb24sIGZpZWxkc0luZm9PckZpZWxkTmFtZXMsIGZpZWxkSW5mbyA9IG51bGwpIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5hcnJheShmaWVsZHNJbmZvT3JGaWVsZE5hbWVzLCBcImZpZWxkc0luZm9PckZpZWxkTmFtZXNcIik7XG5cbiAgICAgIGlmIChmaWVsZEluZm8pIHtcbiAgICAgICAgQVYub2JqZWN0KGZpZWxkSW5mbyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWVsZEluZm8pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0Y2goXG4gICAgICAgICAgYC9maWVsZHMvJHtjb2xsZWN0aW9ufS8ke2ZpZWxkc0luZm9PckZpZWxkTmFtZXMuam9pbihcIixcIil9YCxcbiAgICAgICAgICBmaWVsZEluZm9cbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucGF0Y2goYC9maWVsZHMvJHtjb2xsZWN0aW9ufWAsIGZpZWxkc0luZm9PckZpZWxkTmFtZXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgYSBmaWVsZCBmcm9tIGEgY29sbGVjdGlvblxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiBOYW1lIG9mIHRoZSBjb2xsZWN0aW9uXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBmaWVsZE5hbWUgIFRoZSBuYW1lIG9mIHRoZSBmaWVsZCB0byBkZWxldGVcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBkZWxldGVGaWVsZChjb2xsZWN0aW9uLCBmaWVsZE5hbWUpIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5zdHJpbmcoZmllbGROYW1lLCBcImZpZWxkTmFtZVwiKTtcbiAgICAgIHJldHVybiB0aGlzLmRlbGV0ZShgL2ZpZWxkcy8ke2NvbGxlY3Rpb259LyR7ZmllbGROYW1lfWApO1xuICAgIH0sXG5cbiAgICAvLyBGSUxFU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogVXBsb2FkIG11bHRpcGFydCBmaWxlcyBpbiBtdWx0aXBhcnQvZm9ybS1kYXRhXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIEZvcm1EYXRhIG9iamVjdCBjb250YWluaW5nIGZpbGVzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgdXBsb2FkRmlsZXMoZGF0YSwgb25VcGxvYWRQcm9ncmVzcyA9ICgpID0+IHt9KSB7XG4gICAgICBjb25zdCBoZWFkZXJzID0ge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIixcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMudG9rZW59YFxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHRoaXMuYXhpb3NcbiAgICAgICAgLnBvc3QoYCR7dGhpcy51cmx9LyR7dGhpcy5wcm9qZWN0fS9maWxlc2AsIGRhdGEsIHtcbiAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgIG9uVXBsb2FkUHJvZ3Jlc3NcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGlmIChlcnJvci5yZXNwb25zZSkge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvcjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cge1xuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICAgIGNvZGU6IC0xLFxuICAgICAgICAgICAgICBtZXNzYWdlOiBcIk5ldHdvcmsgRXJyb3JcIixcbiAgICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy8gSVRFTVNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgaXRlbVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBhZGQgdGhlIGl0ZW0gdG9cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd8TnVtYmVyfSBwcmltYXJ5S2V5IFByaW1hcnkga2V5IG9mIHRoZSBpdGVtXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBib2R5ICAgICAgIFRoZSBpdGVtJ3MgZmllbGQgdmFsdWVzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBwYXJhbXMgICAgIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICB1cGRhdGVJdGVtKGNvbGxlY3Rpb24sIHByaW1hcnlLZXksIGJvZHksIHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYubm90TnVsbChwcmltYXJ5S2V5LCBcInByaW1hcnlLZXlcIik7XG4gICAgICBBVi5vYmplY3QoYm9keSwgXCJib2R5XCIpO1xuXG4gICAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKFwiZGlyZWN0dXNfXCIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGNoKFxuICAgICAgICAgIGAvJHtjb2xsZWN0aW9uLnN1YnN0cmluZyg5KX0vJHtwcmltYXJ5S2V5fWAsXG4gICAgICAgICAgYm9keSxcbiAgICAgICAgICBwYXJhbXNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucGF0Y2goYC9pdGVtcy8ke2NvbGxlY3Rpb259LyR7cHJpbWFyeUtleX1gLCBib2R5LCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgbXVsdGlwbGUgaXRlbXNcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gYWRkIHRoZSBpdGVtIHRvXG4gICAgICogQHBhcmFtICB7QXJyYXl9IGJvZHkgICAgICAgIFRoZSBpdGVtJ3MgZmllbGQgdmFsdWVzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBwYXJhbXMgICAgIFF1ZXJ5IFBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICB1cGRhdGVJdGVtcyhjb2xsZWN0aW9uLCBib2R5LCBwYXJhbXMgPSB7fSkge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLmFycmF5KGJvZHksIFwiYm9keVwiKTtcblxuICAgICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChcImRpcmVjdHVzX1wiKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRjaChgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9YCwgYm9keSwgcGFyYW1zKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucGF0Y2goYC9pdGVtcy8ke2NvbGxlY3Rpb259YCwgYm9keSwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGl0ZW1cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gYWRkIHRoZSBpdGVtIHRvXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBib2R5ICAgICAgIFRoZSBpdGVtJ3MgZmllbGQgdmFsdWVzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgY3JlYXRlSXRlbShjb2xsZWN0aW9uLCBib2R5KSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYub2JqZWN0KGJvZHksIFwiYm9keVwiKTtcblxuICAgICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChcImRpcmVjdHVzX1wiKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0KGAvJHtjb2xsZWN0aW9uLnN1YnN0cmluZyg5KX1gLCBib2R5KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucG9zdChgL2l0ZW1zLyR7Y29sbGVjdGlvbn1gLCBib2R5KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG11bHRpcGxlIGl0ZW1zXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGFkZCB0aGUgaXRlbSB0b1xuICAgICAqIEBwYXJhbSAge0FycmF5fSBib2R5ICAgICAgICBUaGUgaXRlbSdzIGZpZWxkIHZhbHVlc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGNyZWF0ZUl0ZW1zKGNvbGxlY3Rpb24sIGJvZHkpIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5hcnJheShib2R5LCBcImJvZHlcIik7XG5cbiAgICAgIGlmIChjb2xsZWN0aW9uLnN0YXJ0c1dpdGgoXCJkaXJlY3R1c19cIikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdChgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9YCwgYm9keSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnBvc3QoYC9pdGVtcy8ke2NvbGxlY3Rpb259YCwgYm9keSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBpdGVtcyBmcm9tIGEgZ2l2ZW4gY29sbGVjdGlvblxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBhZGQgdGhlIGl0ZW0gdG9cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dICAgUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldEl0ZW1zKGNvbGxlY3Rpb24sIHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuXG4gICAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKFwiZGlyZWN0dXNfXCIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldChgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9YCwgcGFyYW1zKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuZ2V0KGAvaXRlbXMvJHtjb2xsZWN0aW9ufWAsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBhIHNpbmdsZSBpdGVtIGJ5IHByaW1hcnkga2V5XG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uICBUaGUgY29sbGVjdGlvbiB0byBhZGQgdGhlIGl0ZW0gdG9cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd8TnVtYmVyfSBwcmltYXJ5S2V5IFByaW1hcnkga2V5IG9mIHRoZSBpdGVtXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0SXRlbShjb2xsZWN0aW9uLCBwcmltYXJ5S2V5LCBwYXJhbXMgPSB7fSkge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLm5vdE51bGwocHJpbWFyeUtleSwgXCJwcmltYXJ5S2V5XCIpO1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuXG4gICAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKFwiZGlyZWN0dXNfXCIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldChgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9LyR7cHJpbWFyeUtleX1gLCBwYXJhbXMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5nZXQoYC9pdGVtcy8ke2NvbGxlY3Rpb259LyR7cHJpbWFyeUtleX1gLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgYSBzaW5nbGUgaXRlbSBieSBwcmltYXJ5IGtleVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiAgVGhlIGNvbGxlY3Rpb24gdG8gZGVsZXRlIHRoZSBpdGVtIGZyb21cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd8TnVtYmVyfSBwcmltYXJ5S2V5IFByaW1hcnkga2V5IG9mIHRoZSBpdGVtXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZGVsZXRlSXRlbShjb2xsZWN0aW9uLCBwcmltYXJ5S2V5KSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYubm90TnVsbChwcmltYXJ5S2V5LCBcInByaW1hcnlLZXlcIik7XG5cbiAgICAgIGlmIChjb2xsZWN0aW9uLnN0YXJ0c1dpdGgoXCJkaXJlY3R1c19cIikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlKGAvJHtjb2xsZWN0aW9uLnN1YnN0cmluZyg5KX0vJHtwcmltYXJ5S2V5fWApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5kZWxldGUoYC9pdGVtcy8ke2NvbGxlY3Rpb259LyR7cHJpbWFyeUtleX1gKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIG11bHRpcGxlIGl0ZW1zIGJ5IHByaW1hcnkga2V5XG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uICBUaGUgY29sbGVjdGlvbiB0byBkZWxldGUgdGhlIGl0ZW0gZnJvbVxuICAgICAqIEBwYXJhbSAge0FycmF5fSBwcmltYXJ5S2V5IFByaW1hcnkga2V5IG9mIHRoZSBpdGVtXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZGVsZXRlSXRlbXMoY29sbGVjdGlvbiwgcHJpbWFyeUtleXMpIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5hcnJheShwcmltYXJ5S2V5cywgXCJwcmltYXJ5S2V5c1wiKTtcblxuICAgICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChcImRpcmVjdHVzX1wiKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWxldGUoYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfS8ke3ByaW1hcnlLZXlzLmpvaW4oKX1gKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlKGAvaXRlbXMvJHtjb2xsZWN0aW9ufS8ke3ByaW1hcnlLZXlzLmpvaW4oKX1gKTtcbiAgICB9LFxuXG4gICAgLy8gTElTVElORyBQUkVGRVJFTkNFU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY29sbGVjdGlvbiBwcmVzZXRzIG9mIHRoZSBjdXJyZW50IHVzZXIgZm9yIGEgc2luZ2xlIGNvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIENvbGxlY3Rpb24gdG8gZmV0Y2ggdGhlIHByZWZlcmVuY2VzIGZvclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldE15TGlzdGluZ1ByZWZlcmVuY2VzKGNvbGxlY3Rpb24sIHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5zdHJpbmcodGhpcy50b2tlbiwgXCJ0aGlzLnRva2VuXCIpO1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgdGhpcy5nZXQoXCIvY29sbGVjdGlvbl9wcmVzZXRzXCIsIHtcbiAgICAgICAgICBsaW1pdDogMSxcbiAgICAgICAgICBcImZpbHRlclt0aXRsZV1bbnVsbF1cIjogMSxcbiAgICAgICAgICBcImZpbHRlcltjb2xsZWN0aW9uXVtlcV1cIjogY29sbGVjdGlvbixcbiAgICAgICAgICBcImZpbHRlcltyb2xlXVtudWxsXVwiOiAxLFxuICAgICAgICAgIFwiZmlsdGVyW3VzZXJdW251bGxdXCI6IDEsXG4gICAgICAgICAgc29ydDogXCItaWRcIlxuICAgICAgICB9KSxcbiAgICAgICAgdGhpcy5nZXQoXCIvY29sbGVjdGlvbl9wcmVzZXRzXCIsIHtcbiAgICAgICAgICBsaW1pdDogMSxcbiAgICAgICAgICBcImZpbHRlclt0aXRsZV1bbnVsbF1cIjogMSxcbiAgICAgICAgICBcImZpbHRlcltjb2xsZWN0aW9uXVtlcV1cIjogY29sbGVjdGlvbixcbiAgICAgICAgICBcImZpbHRlcltyb2xlXVtlcV1cIjogdGhpcy5wYXlsb2FkLnJvbGUsXG4gICAgICAgICAgXCJmaWx0ZXJbdXNlcl1bbnVsbF1cIjogMSxcbiAgICAgICAgICBzb3J0OiBcIi1pZFwiXG4gICAgICAgIH0pLFxuICAgICAgICB0aGlzLmdldChcIi9jb2xsZWN0aW9uX3ByZXNldHNcIiwge1xuICAgICAgICAgIGxpbWl0OiAxLFxuICAgICAgICAgIFwiZmlsdGVyW3RpdGxlXVtudWxsXVwiOiAxLFxuICAgICAgICAgIFwiZmlsdGVyW2NvbGxlY3Rpb25dW2VxXVwiOiBjb2xsZWN0aW9uLFxuICAgICAgICAgIFwiZmlsdGVyW3JvbGVdW2VxXVwiOiB0aGlzLnBheWxvYWQucm9sZSxcbiAgICAgICAgICBcImZpbHRlclt1c2VyXVtlcV1cIjogdGhpcy5wYXlsb2FkLmlkLFxuICAgICAgICAgIHNvcnQ6IFwiLWlkXCJcbiAgICAgICAgfSlcbiAgICAgIF0pLnRoZW4odmFsdWVzID0+IHtcbiAgICAgICAgY29uc3QgW2NvbGxlY3Rpb24sIHJvbGUsIHVzZXJdID0gdmFsdWVzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNoYWRvd1xuICAgICAgICBpZiAodXNlci5kYXRhICYmIHVzZXIuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIHVzZXIuZGF0YVswXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocm9sZS5kYXRhICYmIHJvbGUuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIHJvbGUuZGF0YVswXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sbGVjdGlvbi5kYXRhICYmIGNvbGxlY3Rpb24uZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24uZGF0YVswXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge307XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy8gUEVSTUlTU0lPTlNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBHZXQgcGVybWlzc2lvbnNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRQZXJtaXNzaW9ucyhwYXJhbXMgPSB7fSkge1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMoXCJkaXJlY3R1c19wZXJtaXNzaW9uc1wiLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnRseSBsb2dnZWQgaW4gdXNlcidzIHBlcm1pc3Npb25zXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBwYXJhbXMgUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldE15UGVybWlzc2lvbnMocGFyYW1zID0ge30pIHtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChcIi9wZXJtaXNzaW9ucy9tZVwiLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbXVsdGlwbGUgbmV3IHBlcm1pc3Npb25zXG4gICAgICogQHBhcmFtICB7QXJyYXl9IGRhdGEgIFBlcm1pc3Npb24gcmVjb3JkcyB0byBzYXZlXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgY3JlYXRlUGVybWlzc2lvbnMoZGF0YSkge1xuICAgICAgQVYuYXJyYXkoZGF0YSk7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KFwiL3Blcm1pc3Npb25zXCIsIGRhdGEpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgbXVsdGlwbGUgcGVybWlzc2lvbiByZWNvcmRzXG4gICAgICogQHBhcmFtICB7QXJyYXl9IGRhdGEgIFBlcm1pc3Npb24gcmVjb3JkcyB0byB1cGRhdGVcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICB1cGRhdGVQZXJtaXNzaW9ucyhkYXRhKSB7XG4gICAgICBBVi5hcnJheShkYXRhKTtcbiAgICAgIHJldHVybiB0aGlzLnBhdGNoKFwiL3Blcm1pc3Npb25zXCIsIGRhdGEpO1xuICAgIH0sXG5cbiAgICAvLyBSRUxBVElPTlNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIHJlbGF0aW9uc2hpcHNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRSZWxhdGlvbnMocGFyYW1zID0ge30pIHtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChcIi9yZWxhdGlvbnNcIiwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgY3JlYXRlUmVsYXRpb24oZGF0YSkge1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChcIi9yZWxhdGlvbnNcIiwgZGF0YSk7XG4gICAgfSxcblxuICAgIHVwZGF0ZVJlbGF0aW9uKHByaW1hcnlLZXksIGRhdGEpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhdGNoKGAvcmVsYXRpb25zLyR7cHJpbWFyeUtleX1gLCBkYXRhKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSByZWxhdGlvbnNoaXAgaW5mb3JtYXRpb24gZm9yIHRoZSBnaXZlbiBjb2xsZWN0aW9uXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIG5hbWVcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRDb2xsZWN0aW9uUmVsYXRpb25zKGNvbGxlY3Rpb24sIHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMpO1xuXG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICB0aGlzLmdldChcIi9yZWxhdGlvbnNcIiwgeyBcImZpbHRlcltjb2xsZWN0aW9uX2FdW2VxXVwiOiBjb2xsZWN0aW9uIH0pLFxuICAgICAgICB0aGlzLmdldChcIi9yZWxhdGlvbnNcIiwgeyBcImZpbHRlcltjb2xsZWN0aW9uX2JdW2VxXVwiOiBjb2xsZWN0aW9uIH0pXG4gICAgICBdKTtcbiAgICB9LFxuXG4gICAgLy8gUkVWSVNJT05TXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgc2luZ2xlIGl0ZW0ncyByZXZpc2lvbnMgYnkgcHJpbWFyeSBrZXlcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIFRoZSBjb2xsZWN0aW9uIHRvIGZldGNoIHRoZSByZXZpc2lvbnMgZnJvbVxuICAgICAqIEBwYXJhbSAge1N0cmluZ3xOdW1iZXJ9IHByaW1hcnlLZXkgUHJpbWFyeSBrZXkgb2YgdGhlIGl0ZW1cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRJdGVtUmV2aXNpb25zKGNvbGxlY3Rpb24sIHByaW1hcnlLZXksIHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYubm90TnVsbChwcmltYXJ5S2V5LCBcInByaW1hcnlLZXlcIik7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG5cbiAgICAgIGlmIChjb2xsZWN0aW9uLnN0YXJ0c1dpdGgoXCJkaXJlY3R1c19cIikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KFxuICAgICAgICAgIGAvJHtjb2xsZWN0aW9uLnN1YnN0cmluZyg5KX0vJHtwcmltYXJ5S2V5fS9yZXZpc2lvbnNgLFxuICAgICAgICAgIHBhcmFtc1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5nZXQoYC9pdGVtcy8ke2NvbGxlY3Rpb259LyR7cHJpbWFyeUtleX0vcmV2aXNpb25zYCwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmV2ZXJ0IGFuIGl0ZW0gdG8gYSBwcmV2aW91cyBzdGF0ZVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiAgVGhlIGNvbGxlY3Rpb24gdG8gZmV0Y2ggdGhlIHJldmlzaW9ucyBmcm9tXG4gICAgICogQHBhcmFtICB7U3RyaW5nfE51bWJlcn0gcHJpbWFyeUtleSBQcmltYXJ5IGtleSBvZiB0aGUgaXRlbVxuICAgICAqIEBwYXJhbSAge051bWJlcn0gcmV2aXNpb25JRCBUaGUgSUQgb2YgdGhlIHJldmlzaW9uIHRvIHJldmVydCB0b1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHJldmVydChjb2xsZWN0aW9uLCBwcmltYXJ5S2V5LCByZXZpc2lvbklEKSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYubm90TnVsbChwcmltYXJ5S2V5LCBcInByaW1hcnlLZXlcIik7XG4gICAgICBBVi5udW1iZXIocmV2aXNpb25JRCwgXCJyZXZpc2lvbklEXCIpO1xuXG4gICAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKFwiZGlyZWN0dXNfXCIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGNoKFxuICAgICAgICAgIGAvJHtjb2xsZWN0aW9uLnN1YnN0cmluZyg5KX0vJHtwcmltYXJ5S2V5fS9yZXZlcnQvJHtyZXZpc2lvbklEfWBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucGF0Y2goXG4gICAgICAgIGAvaXRlbXMvJHtjb2xsZWN0aW9ufS8ke3ByaW1hcnlLZXl9L3JldmVydC8ke3JldmlzaW9uSUR9YFxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgLy8gUk9MRVNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBzaW5nbGUgdXNlciByb2xlXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBwcmltYXJ5S2V5ICBUaGUgaWQgb2YgdGhlIHVzZXIgcm9sIHRvIGdldFxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldFJvbGUocHJpbWFyeUtleSwgcGFyYW1zID0ge30pIHtcbiAgICAgIEFWLm51bWJlcihwcmltYXJ5S2V5LCBcInByaW1hcnlLZXlcIik7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoYC9yb2xlcy8ke3ByaW1hcnlLZXl9YCwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB1c2VyIHJvbGVzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0Um9sZXMocGFyYW1zID0ge30pIHtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChcIi9yb2xlc1wiLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYSB1c2VyIHJvbGVcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHByaW1hcnlLZXkgVGhlIElEIG9mIHRoZSByb2xlXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBib2R5ICAgICAgIFRoZSBmaWVsZHMgdG8gdXBkYXRlXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgdXBkYXRlUm9sZShwcmltYXJ5S2V5LCBib2R5KSB7XG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcbiAgICAgIEFWLm9iamVjdChib2R5LCBcImJvZHlcIik7XG4gICAgICByZXR1cm4gdGhpcy51cGRhdGVJdGVtKFwiZGlyZWN0dXNfcm9sZXNcIiwgcHJpbWFyeUtleSwgYm9keSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyB1c2VyIHJvbGVcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGJvZHkgVGhlIHJvbGUgaW5mb3JtYXRpb25cbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBjcmVhdGVSb2xlKGJvZHkpIHtcbiAgICAgIEFWLm9iamVjdChib2R5LCBcImJvZHlcIik7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVJdGVtKFwiZGlyZWN0dXNfcm9sZXNcIiwgYm9keSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSBhIHVzZXIgcm9sIGJ5IHByaW1hcnkga2V5XG4gICAgICogQHBhcmFtICB7TnVtYmVyIHwgU3RyaW5nfSBwcmltYXJ5S2V5IFByaW1hcnkga2V5IG9mIHRoZSB1c2VyIHJvbGVcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBkZWxldGVSb2xlKHByaW1hcnlLZXkpIHtcbiAgICAgIEFWLm5vdE51bGwocHJpbWFyeUtleSwgXCJwcmltYXJ5S2V5XCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlSXRlbShcImRpcmVjdHVzX3JvbGVzXCIsIHByaW1hcnlLZXkpO1xuICAgIH0sXG5cbiAgICAvLyBTRVRUSU5HU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEdldCBEaXJlY3R1cycgZ2xvYmFsIHNldHRpbmdzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0U2V0dGluZ3MocGFyYW1zID0ge30pIHtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChcIi9zZXR0aW5nc1wiLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIFwiZmllbGRzXCIgZm9yIGRpcmVjdHVzX3NldHRpbmdzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0U2V0dGluZ3NGaWVsZHMocGFyYW1zID0ge30pIHtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChcIi9zZXR0aW5ncy9maWVsZHNcIiwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLy8gVVNFUlNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBsaXN0IG9mIGF2YWlsYWJsZSB1c2VycyBpbiBEaXJlY3R1c1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldFVzZXJzKHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoXCIvdXNlcnNcIiwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgc2luZ2xlIERpcmVjdHVzIHVzZXJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHByaW1hcnlLZXkgIFRoZSB1bmlxdWUgaWRlbnRpZmllciBvZiB0aGUgdXNlclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldFVzZXIocHJpbWFyeUtleSwgcGFyYW1zID0ge30pIHtcbiAgICAgIEFWLm5vdE51bGwocHJpbWFyeUtleSwgXCJwcmltYXJ5S2V5XCIpO1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KGAvdXNlcnMvJHtwcmltYXJ5S2V5fWAsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdXNlciBpbmZvIG9mIHRoZSBjdXJyZW50bHkgbG9nZ2VkIGluIHVzZXJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRNZShwYXJhbXMgPSB7fSkge1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiL3VzZXJzL21lXCIsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBhIHNpbmdsZSB1c2VyIGJhc2VkIG9uIHByaW1hcnlLZXlcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd8TnVtYmVyfSBwcmltYXJ5S2V5IFRoZSBwcmltYXJ5IGtleSBvZiB0aGUgdXNlclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gYm9keSAgICAgICAgICAgICAgVGhlIGZpZWxkcyB0byB1cGRhdGVcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICB1cGRhdGVVc2VyKHByaW1hcnlLZXksIGJvZHkpIHtcbiAgICAgIEFWLm5vdE51bGwocHJpbWFyeUtleSwgXCJwcmltYXJ5S2V5XCIpO1xuICAgICAgQVYub2JqZWN0KGJvZHksIFwiYm9keVwiKTtcbiAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUl0ZW0oXCJkaXJlY3R1c191c2Vyc1wiLCBwcmltYXJ5S2V5LCBib2R5KTtcbiAgICB9LFxuXG4gICAgLy8gVVRJTFNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBQaW5nIHRoZSBBUEkgdG8gY2hlY2sgaWYgaXQgZXhpc3RzIC8gaXMgdXAgYW5kIHJ1bm5pbmdcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBwaW5nKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcImdldFwiLCBcIi9zZXJ2ZXIvcGluZ1wiLCB7fSwge30sIHRydWUsIHRydWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHNlcnZlciBpbmZvIGZyb20gdGhlIEFQSVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHNlcnZlckluZm8oKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZ2V0XCIsIFwiL1wiLCB7fSwge30sIHRydWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHNlcnZlciBpbmZvIGZyb20gdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBwcm9qZWN0SW5mbygpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXCJnZXRcIiwgXCIvXCIpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIHRoZSBzZXR1cCB0aGlyZCBwYXJ0eSBhdXRoIHByb3ZpZGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldFRoaXJkUGFydHlBdXRoUHJvdmlkZXJzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiL2F1dGgvc3NvXCIpO1xuICAgIH1cbiAgfTtcblxuICAvLyBPbmx5IHN0YXJ0IHRoZSBhdXRvIHJlZnJlc2ggaW50ZXJ2YWwgaWYgdGhlIHRva2VuIGV4aXN0cyBhbmQgaXQncyBhIEpXVFxuICBpZiAoU0RLLnRva2VuICYmIFNESy50b2tlbi5pbmNsdWRlcyhcIi5cIikpIHtcbiAgICBTREsuc3RhcnRJbnRlcnZhbCh0cnVlKTtcbiAgfVxuXG4gIHJldHVybiBTREs7XG59XG5cbi8vIENPTlZFTklFTkNFIE1FVEhPRFNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuU0RLLmdldFBheWxvYWQgPSBnZXRQYXlsb2FkO1xubW9kdWxlLmV4cG9ydHMgPSBTREs7XG4iXSwic291cmNlUm9vdCI6IiJ9