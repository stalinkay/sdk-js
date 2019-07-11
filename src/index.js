const axios = require("axios");
const base64 = require("base-64");
const qs = require("qs");
const AV = require("argument-validator");

/**
 * Retrieves the payload from a JWT
 * @param  {String} token The JWT to retrieve the payload from
 * @return {Object}       The JWT payload
 */
function getPayload(token) {
  const payloadBase64 = token
    .split(".")[1]
    .replace("-", "+")
    .replace("_", "/");
  const payloadDecoded = base64.decode(payloadBase64);
  const payloadObject = JSON.parse(payloadDecoded);

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
function SDK(options = {}) {
  let token;
  let url;
  let project = "_";
  let localExp;
  let tokenExpiryTime = 5;

  if (options.storage) {
    let storedInfo = options.storage.getItem("directus-sdk-js");

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

  const SDK = {
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
      if (
        AV.isString(this.token) &&
        AV.isString(this.url) &&
        AV.isString(this.project) &&
        AV.isObject(this.payload)
      ) {
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
    request(
      method,
      endpoint,
      params = {},
      data = {},
      noEnv = false,
      headers = {},
      ignoreJson = false
    ) {
      AV.string(method, "method");
      AV.string(endpoint, "endpoint");
      AV.objectOrEmpty(params, "params");
      Array.isArray(data)
        ? AV.arrayOrEmpty(data, "data")
        : AV.objectOrEmpty(data, "data");

      AV.string(this.url, "this.url");

      let baseURL = `${this.url}/`;

      if (noEnv === false) {
        baseURL += `${this.project}/`;
      }

      const requestOptions = {
        url: endpoint,
        method,
        baseURL,
        params,
        data
      };

      if (
        this.token &&
        typeof this.token === "string" &&
        this.token.length > 0
      ) {
        requestOptions.headers = headers;
        requestOptions.headers.Authorization = `Bearer ${this.token}`;
      }

      return this.axios
        .request(requestOptions)
        .then(res => res.data)
        .then(data => {
          if (!data || data.length === 0) return data;

          if (ignoreJson) return data;

          if (typeof data !== "object") {
            try {
              return JSON.parse(data);
            } catch (error) {
              throw {
                json: true,
                error,
                data
              };
            }
          }

          return data;
        })
        .catch(error => {
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
              error
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
    get(endpoint, params = {}) {
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
    post(endpoint, body = {}, params = {}) {
      AV.string(endpoint, "endpoint");
      Array.isArray(body)
        ? AV.arrayOrEmpty(body, "body")
        : AV.objectOrEmpty(body, "body");

      return this.request("post", endpoint, params, body);
    },

    /**
     * PATCH convenience method. Calls the request method for you
     * @param  {string} endpoint  The endpoint to get
     * @param  {Object} [body={}] The HTTP request body
     * @return {RequestPromise}
     */
    patch(endpoint, body = {}, params = {}) {
      AV.string(endpoint, "endpoint");
      Array.isArray(body)
        ? AV.arrayOrEmpty(body, "body")
        : AV.objectOrEmpty(body, "body");

      return this.request("patch", endpoint, params, body);
    },

    /**
     * PATCH convenience method. Calls the request method for you
     * @param  {string} endpoint  The endpoint to get
     * @param  {Object} [body={}] The HTTP request body
     * @return {RequestPromise}
     */
    put(endpoint, body = {}, params = {}) {
      AV.string(endpoint, "endpoint");
      Array.isArray(body)
        ? AV.arrayOrEmpty(body, "body")
        : AV.objectOrEmpty(body, "body");

      return this.request("put", endpoint, params, body);
    },

    /**
     * PATCH convenience method. Calls the request method for you
     * @param  {string} endpoint  The endpoint to get
     * @return {RequestPromise}
     */
    delete(endpoint) {
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
    login(credentials, options = { persist: true }) {
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

      return new Promise((resolve, reject) => {
        this.post("/auth/authenticate", {
          email: credentials.email,
          password: credentials.password,
          otp: credentials.otp
        })
          .then(res => res.data.token)
          .then(token => {
            this.token = token;

            // Expiry date is the moment we got the token + 5 minutes
            this.localExp = new Date(Date.now() + this.tokenExpiryTime * 60000).getTime();

            if (this.storage) {
              this.storage.setItem(
                "directus-sdk-js",
                JSON.stringify({
                  token: this.token,
                  url: this.url,
                  project: this.project,
                  localExp: this.localExp
                })
              );
            }

            resolve({
              url: this.url,
              project: this.project,
              token: this.token,
              localExp: this.localExp
            });
          })
          .catch(reject);
      });
    },

    /**
     * Logs the user out by "forgetting" the token, and clearing the refresh interval
     */
    logout() {
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
    reset() {
      this.logout();
      this.url = null;
      this.project = null;
    },

    /**
     * Starts an interval of 10 seconds that will check if the token needs refreshing
     * @param {Boolean} fireImmediately Fire the refreshIfNeeded method directly
     */
    startInterval(fireImmediately) {
      if (fireImmediately) this.refreshIfNeeded();
      this.refreshInterval = setInterval(
        this.refreshIfNeeded.bind(this),
        10000
      );
    },

    /**
     * Clears and nullifies the token refreshing interval
     */
    stopInterval() {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    },

    /**
     * Refresh the token if it is about to expire (within 30 seconds of expiry date)
     *
     * Calls onAutoRefreshSuccess with the new token if the refreshing is successful
     * Calls onAutoRefreshError if refreshing the token fails for some reason
     */
    refreshIfNeeded() {
      if (!AV.hasStringKeys(this, ["token", "url", "project"])) return;
      if (!this.payload || !this.payload.exp) return;

      const timeDiff = this.localExp - Date.now();

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
        this.refresh(this.token)
          .then(res => {
            this.token = res.data.token;
            this.localExp = new Date(Date.now() + this.tokenExpiryTime * 60000).getTime();

            if (AV.isFunction(this.onAutoRefreshSuccess)) {
              this.onAutoRefreshSuccess({
                url: this.url,
                project: this.project,
                token: this.token,
                localExp: this.localExp
              });
            }

            if (this.storage) {
              this.storage.setItem(
                "directus-sdk-js",
                JSON.stringify({
                  token: this.token,
                  url: this.url,
                  project: this.project,
                  localExp: this.localExp
                })
              );
            }
          })
          .catch(error => {
            if (AV.isFunction(this.onAutoRefreshError)) {
              this.onAutoRefreshError(error);
            }
          });
      }
    },

    /**
     * Use the passed token to request a new one
     * @param  {String} token Active & Valid token
     * @return {RequestPromise}
     */
    refresh(token) {
      AV.string(token, "token");
      return this.post("/auth/refresh", { token });
    },

    /**
     * Request to reset the password of the user with the given email address
     *
     * The API will send an email to the given email address with a link to generate a new
     * temporary password.
     * @param {String} email The user's email
     */
    requestPasswordReset(email) {
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
    getActivity(params = {}) {
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
    getMyBookmarks(params = {}) {
      AV.string(this.token, "this.token");
      AV.objectOrEmpty(params);
      return Promise.all([
        this.get("/collection_presets", {
          "filter[title][nnull]": 1,
          "filter[user][eq]": this.payload.id
        }),
        this.get("/collection_presets", {
          "filter[title][nnull]": 1,
          "filter[role][eq]": this.payload.role,
          "filter[user][null]": 1
        })
      ]).then(values => {
        const [user, role] = values; // eslint-disable-line no-shadow
        return [...user.data, ...role.data];
      });
    },

    // COLLECTIONS
    // -------------------------------------------------------------------------

    /**
     * Get all available collections
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getCollections(params = {}) {
      AV.objectOrEmpty(params, "params");
      return this.get("/collections", params);
    },

    /**
     * Get collection info by name
     * @param  {String} collection  Collection name
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getCollection(collection, params = {}) {
      AV.string(collection, "collection");
      AV.objectOrEmpty(params, "params");
      return this.get(`/collections/${collection}`, params);
    },

    /**
     * Create a collection
     * @param {Object} data Collection information
     * @return {RequestPromise}
     */
    createCollection(data) {
      AV.object(data, "data");
      return this.post("/collections", data);
    },

    /**
     * @param  {String} The collection to update
     * @param  {Object} The fields to update
     * @return {RequestPromise}
     */
    updateCollection(collection, data) {
      AV.string(collection, "collection");
      AV.object(data, "data");
      return this.patch(`/collections/${collection}`, data);
    },

    /**
     * @param  {String} collection The primary key of the collection to remove
     * @return {RequestPromise}
     */
    deleteCollection(collection) {
      AV.string(collection, "collection");
      return this.delete(`/collections/${collection}`);
    },

    // COLLECTION PRESETS
    // -------------------------------------------------------------------------

    /**
     * Create a new collection preset (bookmark / listing preferences)
     * @param  {Object} data The bookmark info
     * @return {RequestPromise}
     */
    createCollectionPreset(data) {
      AV.object(data);
      return this.post("/collection_presets", data);
    },

    /**
     * Update collection preset (bookmark / listing preference)
     * @param {String|Number} primaryKey
     * @param {RequestPromise} data
     */
    updateCollectionPreset(primaryKey, data) {
      AV.notNull(primaryKey, "primaryKey");
      AV.object(data, "data");

      return this.patch(`/collection_presets/${primaryKey}`, data);
    },

    /**
     * Delete collection preset by primarykey
     * @param {String|Number} primaryKey The primaryKey of the preset to delete
     */
    deleteCollectionPreset(primaryKey) {
      AV.notNull(primaryKey, "primaryKey");
      return this.delete(`/collection_presets/${primaryKey}`);
    },

    // DATABASE
    // ------------------------------------------------------------------------

    /**
     * This will update the database of the API instance to the latest version
     * using the migrations in the API
     * @return {RequestPromise}
     */
    updateDatabase() {
      return this.post("/update");
    },

    // EXTENSIONS
    // -------------------------------------------------------------------------

    /**
     * Get the meta information of all installed interfaces
     * @return {RequestPromise}
     */
    getInterfaces() {
      return this.request("get", "/interfaces", {}, {}, true);
    },

    /**
     * Get the meta information of all installed layouts
     * @return {RequestPromise}
     */
    getLayouts() {
      return this.request("get", "/layouts", {}, {}, true);
    },

    /**
     * Get the meta information of all installed pages
     * @return {RequestPromise}
     */
    getPages() {
      return this.request("get", "/pages", {}, {}, true);
    },

    // FIELDS
    // ------------------------------------------------------------------------

    /**
     * Get all fields that are in Directus
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getAllFields(params = {}) {
      AV.objectOrEmpty(params, "params");
      return this.get("/fields", params);
    },

    /**
     * Get the fields that have been setup for a given collection
     * @param  {String} collection  Collection name
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getFields(collection, params = {}) {
      AV.string(collection, "collection");
      AV.objectOrEmpty(params, "params");
      return this.get(`/fields/${collection}`, params);
    },

    /**
     * Get the field information for a single given field
     * @param  {String} collection  Collection name
     * @param  {String} fieldName   Field name
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getField(collection, fieldName, params = {}) {
      AV.string(collection, "collection");
      AV.string(fieldName, "fieldName");
      AV.objectOrEmpty(params, "params");
      return this.get(`/fields/${collection}/${fieldName}`, params);
    },

    /**
     * Create a field in the given collection
     * @param  {String} collection Collection to add the field in
     * @param  {Object} fieldInfo  The fields info to save
     * @return {RequestPromise}
     */
    createField(collection, fieldInfo) {
      AV.string(collection, "collection");
      AV.object(fieldInfo, "fieldInfo");
      return this.post(`/fields/${collection}`, fieldInfo);
    },

    /**
     * Update a given field in a given collection
     * @param  {String} collection Field's parent collection
     * @param  {String} fieldName  Name of the field to update
     * @param  {Object} fieldInfo  Fields to update
     * @return {RequestPromise}
     */
    updateField(collection, fieldName, fieldInfo) {
      AV.string(collection, "collection");
      AV.string(fieldName, "fieldName");
      AV.object(fieldInfo, "fieldInfo");
      return this.patch(`/fields/${collection}/${fieldName}`, fieldInfo);
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
    updateFields(collection, fieldsInfoOrFieldNames, fieldInfo = null) {
      AV.string(collection, "collection");
      AV.array(fieldsInfoOrFieldNames, "fieldsInfoOrFieldNames");

      if (fieldInfo) {
        AV.object(fieldInfo);
      }

      if (fieldInfo) {
        return this.patch(
          `/fields/${collection}/${fieldsInfoOrFieldNames.join(",")}`,
          fieldInfo
        );
      }

      return this.patch(`/fields/${collection}`, fieldsInfoOrFieldNames);
    },

    /**
     * Delete a field from a collection
     * @param  {String} collection Name of the collection
     * @param  {String} fieldName  The name of the field to delete
     * @return {RequestPromise}
     */
    deleteField(collection, fieldName) {
      AV.string(collection, "collection");
      AV.string(fieldName, "fieldName");
      return this.delete(`/fields/${collection}/${fieldName}`);
    },

    // FILES
    // ------------------------------------------------------------------------
    
    /**
     * Get a list of available files in Directus
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getFiles(params = {}) {
      AV.objectOrEmpty(params, "params");
      return this.get("/files", params);
    },
    
    /**
     * Upload multipart files in multipart/form-data
     * @param  {Object} data FormData object containing files
     * @return {RequestPromise}
     */
    uploadFiles(data, onUploadProgress = () => {}) {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${this.token}`
      };

      return this.axios
        .post(`${this.url}/${this.project}/files`, data, {
          headers,
          onUploadProgress
        })
        .then(res => res.data)
        .catch(error => {
          if (error.response) {
            throw error.response.data.error;
          } else {
            throw {
              // eslint-disable-line
              code: -1,
              message: "Network Error",
              error
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
    updateItem(collection, primaryKey, body, params = {}) {
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");
      AV.object(body, "body");

      if (collection.startsWith("directus_")) {
        return this.patch(
          `/${collection.substring(9)}/${primaryKey}`,
          body,
          params
        );
      }

      return this.patch(`/items/${collection}/${primaryKey}`, body, params);
    },

    /**
     * Update multiple items
     * @param  {String} collection The collection to add the item to
     * @param  {Array} body        The item's field values
     * @param  {Object} params     Query Parameters
     * @return {RequestPromise}
     */
    updateItems(collection, body, params = {}) {
      AV.string(collection, "collection");
      AV.array(body, "body");

      if (collection.startsWith("directus_")) {
        return this.patch(`/${collection.substring(9)}`, body, params);
      }

      return this.patch(`/items/${collection}`, body, params);
    },

    /**
     * Create a new item
     * @param  {String} collection The collection to add the item to
     * @param  {Object} body       The item's field values
     * @return {RequestPromise}
     */
    createItem(collection, body) {
      AV.string(collection, "collection");
      AV.object(body, "body");

      if (collection.startsWith("directus_")) {
        return this.post(`/${collection.substring(9)}`, body);
      }

      return this.post(`/items/${collection}`, body);
    },

    /**
     * Create multiple items
     * @param  {String} collection The collection to add the item to
     * @param  {Array} body        The item's field values
     * @return {RequestPromise}
     */
    createItems(collection, body) {
      AV.string(collection, "collection");
      AV.array(body, "body");

      if (collection.startsWith("directus_")) {
        return this.post(`/${collection.substring(9)}`, body);
      }

      return this.post(`/items/${collection}`, body);
    },

    /**
     * Get items from a given collection
     * @param  {String} collection The collection to add the item to
     * @param  {Object} [params={}]   Query parameters
     * @return {RequestPromise}
     */
    getItems(collection, params = {}) {
      AV.string(collection, "collection");
      AV.objectOrEmpty(params, "params");

      if (collection.startsWith("directus_")) {
        return this.get(`/${collection.substring(9)}`, params);
      }

      return this.get(`/items/${collection}`, params);
    },

    /**
     * Get a single item by primary key
     * @param  {String} collection  The collection to add the item to
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getItem(collection, primaryKey, params = {}) {
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");
      AV.objectOrEmpty(params, "params");

      if (collection.startsWith("directus_")) {
        return this.get(`/${collection.substring(9)}/${primaryKey}`, params);
      }

      return this.get(`/items/${collection}/${primaryKey}`, params);
    },

    /**
     * Delete a single item by primary key
     * @param  {String} collection  The collection to delete the item from
     * @param  {String|Number} primaryKey Primary key of the item
     * @return {RequestPromise}
     */
    deleteItem(collection, primaryKey) {
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");

      if (collection.startsWith("directus_")) {
        return this.delete(`/${collection.substring(9)}/${primaryKey}`);
      }

      return this.delete(`/items/${collection}/${primaryKey}`);
    },

    /**
     * Delete multiple items by primary key
     * @param  {String} collection  The collection to delete the item from
     * @param  {Array} primaryKey Primary key of the item
     * @return {RequestPromise}
     */
    deleteItems(collection, primaryKeys) {
      AV.string(collection, "collection");
      AV.array(primaryKeys, "primaryKeys");

      if (collection.startsWith("directus_")) {
        return this.delete(`/${collection.substring(9)}/${primaryKeys.join()}`);
      }

      return this.delete(`/items/${collection}/${primaryKeys.join()}`);
    },

    // LISTING PREFERENCES
    // -------------------------------------------------------------------------

    /**
     * Get the collection presets of the current user for a single collection
     * @param  {String} collection  Collection to fetch the preferences for
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getMyListingPreferences(collection, params = {}) {
      AV.string(this.token, "this.token");
      AV.objectOrEmpty(params, "params");
      return Promise.all([
        this.get("/collection_presets", {
          limit: 1,
          "filter[title][null]": 1,
          "filter[collection][eq]": collection,
          "filter[role][null]": 1,
          "filter[user][null]": 1,
          sort: "-id"
        }),
        this.get("/collection_presets", {
          limit: 1,
          "filter[title][null]": 1,
          "filter[collection][eq]": collection,
          "filter[role][eq]": this.payload.role,
          "filter[user][null]": 1,
          sort: "-id"
        }),
        this.get("/collection_presets", {
          limit: 1,
          "filter[title][null]": 1,
          "filter[collection][eq]": collection,
          "filter[role][eq]": this.payload.role,
          "filter[user][eq]": this.payload.id,
          sort: "-id"
        })
      ]).then(values => {
        const [collection, role, user] = values; // eslint-disable-line no-shadow
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
    getPermissions(params = {}) {
      AV.objectOrEmpty(params, "params");
      return this.getItems("directus_permissions", params);
    },

    /**
     * Get the currently logged in user's permissions
     * @param  {Object} params Query parameters
     * @return {RequestPromise}
     */
    getMyPermissions(params = {}) {
      AV.objectOrEmpty(params, "params");
      return this.get("/permissions/me", params);
    },

    /**
     * Create multiple new permissions
     * @param  {Array} data  Permission records to save
     * @return {RequestPromise}
     */
    createPermissions(data) {
      AV.array(data);
      return this.post("/permissions", data);
    },

    /**
     * Update multiple permission records
     * @param  {Array} data  Permission records to update
     * @return {RequestPromise}
     */
    updatePermissions(data) {
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
    getRelations(params = {}) {
      AV.objectOrEmpty(params);
      return this.get("/relations", params);
    },

    createRelation(data) {
      return this.post("/relations", data);
    },

    updateRelation(primaryKey, data) {
      return this.patch(`/relations/${primaryKey}`, data);
    },

    /**
     * Get the relationship information for the given collection
     * @param  {String} collection The collection name
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getCollectionRelations(collection, params = {}) {
      AV.string(collection, "collection");
      AV.objectOrEmpty(params);

      return Promise.all([
        this.get("/relations", { "filter[collection_a][eq]": collection }),
        this.get("/relations", { "filter[collection_b][eq]": collection })
      ]);
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
    getItemRevisions(collection, primaryKey, params = {}) {
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");
      AV.objectOrEmpty(params, "params");

      if (collection.startsWith("directus_")) {
        return this.get(
          `/${collection.substring(9)}/${primaryKey}/revisions`,
          params
        );
      }

      return this.get(`/items/${collection}/${primaryKey}/revisions`, params);
    },

    /**
     * revert an item to a previous state
     * @param  {String} collection  The collection to fetch the revisions from
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Number} revisionID The ID of the revision to revert to
     * @return {RequestPromise}
     */
    revert(collection, primaryKey, revisionID) {
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");
      AV.number(revisionID, "revisionID");

      if (collection.startsWith("directus_")) {
        return this.patch(
          `/${collection.substring(9)}/${primaryKey}/revert/${revisionID}`
        );
      }

      return this.patch(
        `/items/${collection}/${primaryKey}/revert/${revisionID}`
      );
    },

    // ROLES
    // -------------------------------------------------------------------------

    /**
     * Get a single user role
     * @param  {Number} primaryKey  The id of the user rol to get
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getRole(primaryKey, params = {}) {
      AV.number(primaryKey, "primaryKey");
      AV.objectOrEmpty(params, "params");
      return this.get(`/roles/${primaryKey}`, params);
    },

    /**
     * Get the user roles
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getRoles(params = {}) {
      AV.objectOrEmpty(params, "params");
      return this.get("/roles", params);
    },

    /**
     * Update a user role
     * @param  {Number} primaryKey The ID of the role
     * @param  {Object} body       The fields to update
     * @return {RequestPromise}
     */
    updateRole(primaryKey, body) {
      AV.notNull(primaryKey, "primaryKey");
      AV.object(body, "body");
      return this.updateItem("directus_roles", primaryKey, body);
    },

    /**
     * Create a new user role
     * @param  {Object} body The role information
     * @return {RequestPromise}
     */
    createRole(body) {
      AV.object(body, "body");
      return this.createItem("directus_roles", body);
    },

    /**
     * Delete a user rol by primary key
     * @param  {Number | String} primaryKey Primary key of the user role
     * @return {RequestPromise}
     */
    deleteRole(primaryKey) {
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
    getSettings(params = {}) {
      AV.objectOrEmpty(params, "params");
      return this.get("/settings", params);
    },

    /**
     * Get the "fields" for directus_settings
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getSettingsFields(params = {}) {
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
    getUsers(params = {}) {
      AV.objectOrEmpty(params, "params");
      return this.get("/users", params);
    },

    /**
     * Get a single Directus user
     * @param  {String} primaryKey  The unique identifier of the user
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getUser(primaryKey, params = {}) {
      AV.notNull(primaryKey, "primaryKey");
      AV.objectOrEmpty(params, "params");
      return this.get(`/users/${primaryKey}`, params);
    },

    /**
     * Get the user info of the currently logged in user
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getMe(params = {}) {
      AV.objectOrEmpty(params, "params");
      return this.get("/users/me", params);
    },

    /**
     * Update a single user based on primaryKey
     * @param  {String|Number} primaryKey The primary key of the user
     * @param  {Object} body              The fields to update
     * @return {RequestPromise}
     */
    updateUser(primaryKey, body) {
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
    ping() {
      return this.request("get", "/server/ping", {}, {}, true, true);
    },

    /**
     * Get the server info from the API
     * @return {RequestPromise}
     */
    serverInfo() {
      return this.request("get", "/", {}, {}, true);
    },

    /**
     * Get the server info from the project
     * @return {RequestPromise}
     */
    projectInfo() {
      return this.request("get", "/");
    },

    /**
     * Get all the setup third party auth providers
     * @return {RequestPromise}
     */
    getThirdPartyAuthProviders() {
      return this.get("/auth/sso");
    }
  };

  // Only start the auto refresh interval if the token exists and it's a JWT
  if (SDK.token && SDK.token.includes(".")) {
    SDK.startInterval(true);
  }

  return SDK;
}

// CONVENIENCE METHODS
// -------------------------------------------------------------------------------------------------

SDK.getPayload = getPayload;
module.exports = SDK;
