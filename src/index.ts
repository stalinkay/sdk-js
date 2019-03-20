import Axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import * as qs from "qs"
import * as base64 from "base-64"

export interface Storage {
    getItem(key: string): any
    setItem(key: string, value: any): void
    removeItem(key: string): void
}

export interface ClientOptions {
    url: string
    project?: string
    token?: string
    localExp?: number
    storage?: Storage
}

export interface RequestError {
    json: boolean
    code: number
    message: string
    error: any
    data?: any
}

export interface RequestResponse {
    object: any
    error?: any
}

export interface LoginCredentials {
    email: string // The user's email address
    password: string // The user's password
}

export interface LoginOptions {
    persist: boolean // Auto-fetch a new token when it's about to expire
    storage: boolean // Where to store the token (survive refreshes)
}

export interface LoginResponse {
    url: string
    project: string
    token: string
    localExp: number
}

interface Payload {
    id: number
    role: string
    exp: Date
}

export interface Field {
    collection: string
    id: number
    field: string
    type: string
}

export interface Collection {
    collection: string
    fields: { string: Field }
    hidden: boolean
    icon?: string
    managed: boolean
    note?: string
    single: boolean
    translation?: string
}

export interface Item {
    id: number
}

export type BodyType = object | any[]
export type PrimaryKeyType = string | number
export type RequestPromise = Promise<any>
export type HashAlgorithm = "core" | "bcrypt" | "sha1" | "sha224" | "sha256" | "sha384" | "sha512"

class Keys {
    static StorageKey = "directus-sdk-js"
    static DefaultProject = "_"
}

export class DirectusSDK {
    private _url: string
    private _project: string

    get url(): string {
        return this._url
    }

    get project(): string {
        return this._project
    }

    onAutoRefreshError?: (msg: object) => void
    onAutoRefreshSuccess?: (msg: ClientOptions) => void

    private token?: string
    private localExp?: number
    private storage?: Storage
    private refreshInterval?: NodeJS.Timeout

    private axios: AxiosInstance

    private get payload(): Payload | undefined {
        if (this.token == null) {
            return undefined
        }

        const payloadBase64 = this.token
            .split(".")[1]
            .replace("-", "+")
            .replace("_", "/")

        const payloadDecoded = base64.decode(payloadBase64)
        const payloadObject = JSON.parse(payloadDecoded)

        const exp = payloadObject.exp

        if (typeof exp == "number") {
            payloadObject.exp = new Date(exp * 1000)
        }

        return payloadObject
    }

    get loggedIn(): boolean {
        if (this.token && this.localExp) {
            return this.localExp > Date.now()
        }

        return false
    }

    constructor(options: ClientOptions) {
        this._url = options.url
        this._project = Keys.DefaultProject

        const storage = options.storage

        if (storage) {
            this.storage = storage

            const storedInfo = storage.getItem(Keys.StorageKey)

            if (storedInfo) {
                const json: ClientOptions = JSON.parse(storedInfo)

                this.token = json.token
                this._url = json.url
                this._project = json.project || Keys.DefaultProject
                this.localExp = json.localExp
            }
        }

        // Overrides provided by the options parameter

        if (options.token) {
            this.token = options.token
        }

        if (options.project) {
            this._project = options.project
        }

        if (options.localExp) {
            this.localExp = options.localExp
        }

        this.axios = Axios.create({ paramsSerializer: qs.stringify, timeout: 10 * 60 * 1000 }) // 10 min

        if (this.token) {
            this.startInterval(true)
        }
    }

    // REQUEST METHODS
    // -------------------------------------------------------------------------

    async request(
        method: "get" | "post" | "put" | "patch" | "delete",
        endpoint: string,
        params: object = {},
        data?: any,
        noEnv: boolean = false,
        headers: object = {}
    ) {
        let baseUrl = `${this.url}/`

        if (noEnv == false) {
            baseUrl += `${this.project}/`
        }

        const options: AxiosRequestConfig = {
            url: endpoint,
            method: method,
            baseURL: baseUrl,
            params: params,
            data: data
        }

        if (this.token) {
            options.headers = headers
            options.headers["Authorization"] = `Bearer ${this.token}`
        }

        try {
            const response = await this.axios.request(options)

            const responseData = response.data

            if (!responseData || responseData.length == 0) {
                return responseData
            }

            if (typeof responseData !== "object") {
                try {
                    return JSON.parse(responseData)
                } catch (err) {
                    const error: RequestError = {
                        json: true,
                        error: err,
                        data: responseData,
                        message: "Error from request",
                        code: 0
                    }

                    throw error
                }
            }

            return responseData
        } catch (err) {
            if (err.response) {
                throw err.response.data.error
            } else if (err.json == true) {
                const error: RequestError = {
                    json: false,
                    error: err.error,
                    data: err.data,
                    message: "API returned invalid JSON",
                    code: -2
                }

                throw error
            } else {
                const error: RequestError = { json: false, error: err, data: null, message: "Network Error", code: -1 }

                throw error
            }
        }
    }

    async get(endpoint: string, params: object = {}) {
        return this.request("get", endpoint, params)
    }

    async post(endpoint: string, body: BodyType = {}, params: object = {}) {
        return this.request("post", endpoint, params, body)
    }

    async patch(endpoint: string, body: BodyType = {}, params: object = {}) {
        return this.request("patch", endpoint, params, body)
    }

    async put(endpoint: string, body: BodyType = {}, params: object = {}) {
        return this.request("put", endpoint, params, body)
    }

    async delete(endpoint: string) {
        return this.request("delete", endpoint)
    }

    // AUTHENTICATION
    // -------------------------------------------------------------------------

    async login(credentials: LoginCredentials, options?: LoginOptions) {
        this.token = undefined

        if (this.url == null) {
            const e: RequestError = { json: false, code: -1, message: "url property should not be null.", error: null }

            throw e
        }

        const persist = options ? options.persist : false
        if (persist) {
            this.startInterval()
        }

        const res = await this.post("/auth/authenticate", {
            email: credentials.email,
            password: credentials.password
        })

        this.token = res.data.token

        if (this.token == null) {
            const e: RequestError = { json: false, code: -1, message: "API Error. Please try again.", error: null }

            throw e
        }

        // Expiry date is the moment we got the token + 5 minutes
        this.localExp = new Date(Date.now() + 5 * 60000).getTime()

        if (this.storage) {
            const value: ClientOptions = {
                token: this.token,
                url: this.url,
                project: this.project,
                localExp: this.localExp
            }

            this.storage.setItem(Keys.StorageKey, JSON.stringify(value))
        }

        const result: LoginResponse = {
            url: this.url,
            project: this.project,
            token: this.token,
            localExp: this.localExp
        }

        return result
    }

    logout() {
        this.token = undefined

        if (this.refreshInterval) {
            this.stopInterval()
        }

        if (this.storage) {
            this.storage.removeItem("directus-sdk-js")
        }
    }

    /**
     * Get all the setup third party auth providers
     * @return {RequestPromise}
     */
    async getThirdPartyAuthProviders(): RequestPromise {
        return this.get("/auth/sso")
    }

    startInterval(fireImmediately: boolean = false) {
        if (fireImmediately) {
            this.refreshIfNeeded()
        } else {
            this.refreshInterval = setInterval(this.refreshIfNeeded, 10000)
        }
    }

    stopInterval() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval)

            this.refreshInterval = undefined
        }
    }

    async refreshIfNeeded() {
        if (this.token == null || this.localExp == null) {
            return
        }

        if (this.payload && this.payload.exp != null) {
            return
        }

        const timeDiff = this.localExp - Date.now()

        if (timeDiff <= 0) {
            if (this.onAutoRefreshError) {
                this.onAutoRefreshError({ message: "auth_expired_token", code: 102 })
            }

            return
        }

        if (timeDiff < 30000) {
            try {
                const response = await this.refresh(this.token)

                this.token = response.data.token
                this.localExp = new Date(Date.now() + 5 * 60000).getTime()

                const value: ClientOptions = {
                    url: this.url,
                    project: this.project,
                    token: this.token,
                    localExp: this.localExp
                }

                if (this.onAutoRefreshSuccess) {
                    this.onAutoRefreshSuccess(value)
                }

                if (this.storage) {
                    this.storage.setItem(Keys.StorageKey, JSON.stringify(value))
                }
            } catch (error) {
                if (this.onAutoRefreshError) {
                    this.onAutoRefreshError(error)
                }
            }
        }
    }

    /**
     * Use the passed token to request a new one
     * @param  {String} token Active & Valid token
     * @return {RequestPromise}
     */
    async refresh(token: string): RequestPromise {
        return this.post("/auth/refresh", { token })
    }

    /**
     * Request to reset the password of the user with the given email address
     *
     * The API will send an email to the given email address with a link to generate a new
     * temporary password.
     * @param {String} email The user's email
     * @return {RequestPromise}
     */
    async requestPasswordReset(email: string): RequestPromise {
        return this.post("/auth/reset-request", { email, instance: this.url })
    }

    // ACTIVITY
    // -------------------------------------------------------------------------

    /**
     * Get activity
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    async getActivity(params: object = {}): RequestPromise {
        return this.get("/activity", params)
    }

    // BOOKMARKS
    // -------------------------------------------------------------------------

    /**
     * Get the bookmarks of the current user
     * @return {Promise<any[]>}
     */
    async getMyBookmarks(): Promise<any[]> {
        if (this.token == null || this.payload == null) {
            throw "Not Logged In"
        }

        const promises = [
            this.get("/collection_presets", {
                "filter[title][nnull]": 1,
                "filter[user][eq]": this.payload.id
            }),
            this.get("/collection_presets", {
                "filter[title][nnull]": 1,
                "filter[role][eq]": this.payload.role,
                "filter[user][null]": 1
            })
        ]

        const values = await Promise.all(promises)

        const [user, role] = values

        return [...user.data, ...role.data]
    }

    // COLLECTIONS
    // -------------------------------------------------------------------------

    /**
     * Get all available collections
     * @param  {Object} [params={}] Query parameters
     * @return {Promise<Collection[]>}
     */
    async getCollections(params: object = {}): Promise<Collection[]> {
        const res = await this.get("/collections", params)

        return res.data
    }

    /**
     * Get collection info by name
     * @param  {String} collection  Collection name
     * @param  {Object} [params={}] Query parameters
     * @return {Promise<Collection>}
     */
    async getCollection(name: string, params: object = {}): Promise<Collection> {
        const res = await this.get(`/collections/${name}`, params)

        return res.data
    }

    /**
     * Create a collection
     * @param {Object} data Collection information
     * @return {RequestPromise}
     */
    async createCollection(data: object): RequestPromise {
        return this.post("/collections", data)
    }

    /**
     * Update a collection
     * @param  {String} The collection to update
     * @param  {Object} The fields to update
     * @return {RequestPromise}
     */
    async updateCollection(name: string, data: object = {}): RequestPromise {
        return this.patch(`/collections/${name}`, data)
    }

    /**
     * Delete a collection
     * @param  {String} collection The primary key of the collection to remove
     * @return {RequestPromise}
     */
    async deleteCollection(name: string): RequestPromise {
        return this.delete(`/collections/${name}`)
    }

    // COLLECTION PRESETS
    // -------------------------------------------------------------------------

    /**
     * Create a new collection preset (bookmark / listing preferences)
     * @param  {Object} data The bookmark info
     * @return {RequestPromise}
     */
    async createCollectionPreset(data: object): RequestPromise {
        return this.post("/collection_presets", data)
    }

    /**
     * Update collection preset (bookmark / listing preference)
     * @param {String|Number} primaryKey
     * @param {Object} data The bookmark info
     * @return {RequestPromise}
     */
    async updateCollectionPreset(primaryKey: PrimaryKeyType, data: object): RequestPromise {
        return this.patch(`/collection_presets/${primaryKey}`, data)
    }

    /**
     * Delete collection preset by primarykey
     * @param {String|Number} primaryKey The primaryKey of the preset to delete
     * @return {RequestPromise}
     */
    async deleteCollectionPreset(primaryKey: PrimaryKeyType): RequestPromise {
        return this.delete(`/collection_presets/${primaryKey}`)
    }

    // DATABASE
    // ------------------------------------------------------------------------

    /**
     * This will update the database of the API instance to the latest version
     * using the migrations in the API
     * @return {RequestPromise}
     */
    async updateDatabase(): RequestPromise {
        return this.post("/update")
    }

    // EXTENSIONS
    // -------------------------------------------------------------------------

    /**
     * Get the meta information of all installed interfaces
     * @return {RequestPromise}
     */
    async getInterfaces(): RequestPromise {
        return this.request("get", "/interfaces", {}, {}, true)
    }

    /**
     * Get the meta information of all installed layouts
     * @return {RequestPromise}
     */
    async getLayouts(): RequestPromise {
        return this.request("get", "/layouts", {}, {}, true)
    }

    /**
     * Get the meta information of all installed pages
     * @return {RequestPromise}
     */
    async getPages(): RequestPromise {
        return this.request("get", "/pages", {}, {}, true)
    }

    // FIELDS
    // ------------------------------------------------------------------------

    /**
     * Get all fields that are in Directus
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    async getAllFields(params: object = {}): RequestPromise {
        return this.get("/fields", params)
    }

    /**
     * Get the fields that have been setup for a given collection
     * @param  {String} collection  Collection name
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    async getFields(collection: string, params: object = {}): RequestPromise {
        return this.get(`/fields/${collection}`, params)
    }

    /**
     * Get the field information for a single given field
     * @param  {String} collection  Collection name
     * @param  {String} fieldName   Field name
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    async getField(collection: string, fieldName: string, params: object = {}): RequestPromise {
        return this.get(`/fields/${collection}/${fieldName}`, params)
    }

    /**
     * Create a field in the given collection
     * @param  {String} collection Collection to add the field in
     * @param  {Object} fieldInfo  The fields info to save
     * @return {RequestPromise}
     */
    async createField(collection: string, fieldInfo: object): RequestPromise {
        return this.post(`/fields/${collection}`, fieldInfo)
    }

    /**
     * Update a given field in a given collection
     * @param  {String} collection Field's parent collection
     * @param  {String} fieldName  Name of the field to update
     * @param  {Object} fieldInfo  Fields to update
     * @return {RequestPromise}
     */
    async updateField(collection: string, fieldName: string, fieldInfo: object): RequestPromise {
        return this.patch(`/fields/${collection}/${fieldName}`, fieldInfo)
    }

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
    async updateFields(
        collection: string,
        fieldsInfoOrFieldNames: object[] | string[],
        fieldInfo?: object
    ): RequestPromise {
        if (fieldInfo) {
            return this.patch(`/fields/${collection}/${fieldsInfoOrFieldNames.join(",")}`, fieldInfo)
        }

        return this.patch(`/fields/${collection}`, fieldsInfoOrFieldNames)
    }

    /**
     * Delete a field from a collection
     * @param  {String} collection Name of the collection
     * @param  {String} fieldName  The name of the field to delete
     * @return {RequestPromise}
     */
    async deleteField(collection: string, fieldName: string): RequestPromise {
        return this.delete(`/fields/${collection}/${fieldName}`)
    }

    // FILES
    // ------------------------------------------------------------------------

    async uploadFiles(data: object, onUploadProgress: () => object) {
        const headers = { "Content-Type": "multipart/form-data", Authorization: `Bearer ${this.token}` }

        try {
            const config: AxiosRequestConfig = { headers: headers, onUploadProgress: onUploadProgress }

            const res = await this.axios.post(`${this.url}/${this.project}/files`, data, config)

            const resData = res.data

            return resData
        } catch (error) {
            if (error.response) {
                throw error.response.data.error
            } else {
                const e: RequestError = { json: false, code: -1, message: "Network Error", error: error }

                throw e
            }
        }
    }

    // ITEMS
    // -------------------------------------------------------------------------

    /**
     * Update an existing item
     * @param  {String} collection The collection to add the item to
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Object} body       The item's field values
     * @return {RequestPromise}
     */
    async updateItem(collection: string, primaryKey: PrimaryKeyType, body: object): RequestPromise {
        if (collection.startsWith("directus_")) {
            return this.patch(`/${collection.substring(9)}/${primaryKey}`, body)
        }

        return this.patch(`/items/${collection}/${primaryKey}`, body)
    }

    /**
     * Update multiple items
     * @param  {String} collection The collection to add the item to
     * @param  {Array} body        The item's field values
     * @return {RequestPromise}
     */
    async updateItems(collection: string, body: object[]): RequestPromise {
        if (collection.startsWith("directus_")) {
            return this.patch(`/${collection.substring(9)}`, body)
        }

        return this.patch(`/items/${collection}`, body)
    }

    /**
     * Create a new item
     * @param  {String} collection The collection to add the item to
     * @param  {Object} body       The item's field values
     * @return {RequestPromise}
     */
    async createItem(collection: string, body: object): RequestPromise {
        if (collection.startsWith("directus_")) {
            return this.post(`/${collection.substring(9)}`, body)
        }

        return this.post(`/items/${collection}`, body)
    }

    /**
     * Create multiple items
     * @param  {String} collection The collection to add the item to
     * @param  {Array} body        The item's field values
     * @return {RequestPromise}
     */
    async createItems(collection: string, body: object[]): RequestPromise {
        if (collection.startsWith("directus_")) {
            return this.post(`/${collection.substring(9)}`, body)
        }

        return this.post(`/items/${collection}`, body)
    }

    /**
     * Get items from a given collection
     * @param  {String} collection The collection to add the item to
     * @param  {Object} [params={}]   Query parameters
     * @return {Promise<T[]>}
     */
    async getItems<T extends Item>(collection: string, params: object = {}): Promise<T[]> {
        let res: any

        if (collection.startsWith("directus_")) {
            res = await this.get(`/${collection.substring(9)}`, params)
        }

        res = await this.get(`/items/${collection}`, params)

        return res.data
    }

    /**
     * Get a single item by primary key
     * @param  {String} collection  The collection to add the item to
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Object} [params={}] Query parameters
     * @return {Promise<T>}
     */
    async getItem<T extends Item>(collection: string, primaryKey: PrimaryKeyType, params: object = {}): Promise<T> {
        let res: any

        if (collection.startsWith("directus_")) {
            res = await this.get(`/${collection.substring(9)}/${primaryKey}`, params)
        }

        res = await this.get(`/items/${collection}/${primaryKey}`, params)

        return res.data
    }

    /**
     * Delete a single item by primary key
     * @param  {String} collection  The collection to delete the item from
     * @param  {String|Number} primaryKey Primary key of the item
     * @return {RequestPromise}
     */
    async deleteItem(collection: string, primaryKey: PrimaryKeyType): RequestPromise {
        if (collection.startsWith("directus_")) {
            return this.delete(`/${collection.substring(9)}/${primaryKey}`)
        }

        return this.delete(`/items/${collection}/${primaryKey}`)
    }

    /**
     * Delete multiple items by primary key
     * @param  {String} collection  The collection to delete the item from
     * @param  {Array} primaryKey Primary key of the item
     * @return {RequestPromise}
     */
    async deleteItems(collection: string, primaryKeys: PrimaryKeyType[]): RequestPromise {
        if (collection.startsWith("directus_")) {
            return this.delete(`/${collection.substring(9)}/${primaryKeys.join(",")}`)
        }

        return this.delete(`/items/${collection}/${primaryKeys.join(",")}`)
    }

    // LISTING PREFERENCES
    // -------------------------------------------------------------------------

    /**
     * Get the collection presets of the current user for a single collection
     * @param collection Collection to fetch the preferences for
     */
    async getMyListingPreferences(collection: string): Promise<object> {
        if (this.token == null || this.payload == null) {
            throw "Not logged in"
        }

        const promises = [
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
        ]

        const values = await Promise.all(promises)

        const [collectionItem, role, user] = values

        if (user.data && user.data.length > 0) {
            return user.data[0]
        }

        if (role.data && role.data.length > 0) {
            return role.data[0]
        }

        if (collectionItem.data && collectionItem.data.length > 0) {
            return collectionItem.data[0]
        }

        return {}
    }

    // PERMISSIONS
    // -------------------------------------------------------------------------

    /**
     * Get permissions
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    async getPermissions(params: object = {}): RequestPromise {
        return this.getItems("directus_permissions", params)
    }

    /**
     * Get the currently logged in user's permissions
     * @param  {Object} params Query parameters
     * @return {RequestPromise}
     */
    async getMyPermissions(params: object = {}): RequestPromise {
        return this.get("/permissions/me", params)
    }

    /**
     * Create multiple new permissions
     * @param  {Array} data  Permission records to save
     * @return {RequestPromise}
     */
    async createPermissions(data: any[]): RequestPromise {
        return this.post("/permissions", data)
    }

    /**
     * Update multiple permission records
     * @param  {Array} data  Permission records to update
     * @return {RequestPromise}
     */
    async updatePermissions(data: any[]): RequestPromise {
        return this.patch("/permissions", data)
    }

    // RELATIONS
    // -------------------------------------------------------------------------

    /**
     * Get all relationships
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    async getRelations(params: object = {}): RequestPromise {
        return this.get("/relations", params)
    }

    async createRelation(data: BodyType): RequestPromise {
        return this.post("/relations", data)
    }

    async updateRelation(primaryKey: PrimaryKeyType, data: BodyType): RequestPromise {
        return this.patch(`/relations/${primaryKey}`, data)
    }

    /**
     * Get the relationship information for the given collection
     * @param  {String} collection The collection name
     * @return {RequestPromise}
     */
    async getCollectionRelations(collection: string): RequestPromise {
        return Promise.all([
            this.get("/relations", {
                "filter[collection_a][eq]": collection
            }),
            this.get("/relations", {
                "filter[collection_b][eq]": collection
            })
        ])
    }

    // REVISIONS
    // -------------------------------------------------------------------------

    /**
     * Get a single item's revisions by primary key
     * @param  {String} collection  The collection to fetch the revisions from
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    async getItemRevisions(collection: string, primaryKey: PrimaryKeyType, params: object = {}): RequestPromise {
        if (collection.startsWith("directus_")) {
            return this.get(`/${collection.substring(9)}/${primaryKey}/revisions`, params)
        }

        return this.get(`/items/${collection}/${primaryKey}/revisions`, params)
    }

    /**
     * revert an item to a previous state
     * @param  {String} collection  The collection to fetch the revisions from
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Number} revisionID The ID of the revision to revert to
     * @return {RequestPromise}
     */
    async revert(collection: string, primaryKey: PrimaryKeyType, revisionID: number): RequestPromise {
        if (collection.startsWith("directus_")) {
            return this.patch(`/${collection.substring(9)}/${primaryKey}/revert/${revisionID}`)
        }

        return this.patch(`/items/${collection}/${primaryKey}/revert/${revisionID}`)
    }

    // ROLES
    // -------------------------------------------------------------------------

    /**
     * Get a single user role
     * @param  {Number} primaryKey  The id of the user rol to get
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    async getRole(primaryKey: PrimaryKeyType, params: object = {}): RequestPromise {
        return this.get(`/roles/${primaryKey}`, params)
    }

    /**
     * Get the user roles
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    async getRoles(params: object = {}): RequestPromise {
        return this.get("/roles", params)
    }

    /**
     * Update a user role
     * @param  {Number} primaryKey The ID of the role
     * @param  {Object} body       The fields to update
     * @return {RequestPromise}
     */
    async updateRole(primaryKey: PrimaryKeyType, body: BodyType): RequestPromise {
        return this.updateItem("directus_roles", primaryKey, body)
    }

    /**
     * Create a new user role
     * @param  {Object} body The role information
     * @return {RequestPromise}
     */
    createRole(body: object): RequestPromise {
        return this.createItem("directus_roles", body)
    }

    /**
     * Delete a user role by primary key
     * @param  {Number | String} primaryKey Primary key of the user role
     * @return {RequestPromise}
     */
    deleteRole(primaryKey: PrimaryKeyType): RequestPromise {
        return this.deleteItem("directus_roles", primaryKey)
    }

    // SETTINGS
    // -------------------------------------------------------------------------

    /**
     * Get Directus' global settings
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    async getSettings(params: object = {}): RequestPromise {
        return this.get("/settings", params)
    }

    /**
     * Get the "fields" for directus_settings
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    async getSettingsFields(params: object = {}): RequestPromise {
        return this.get("/settings/fields", params)
    }

    // USERS
    // -------------------------------------------------------------------------

    /**
     * Get a list of available users in Directus
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    async getUsers(params: object = {}): RequestPromise {
        return this.get("/users", params)
    }

    /**
     * Get a single Directus user
     * @param  {String} primaryKey  The unique identifier of the user
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    async getUser(primaryKey: PrimaryKeyType, params: object = {}): RequestPromise {
        return this.get(`/users/${primaryKey}`, params)
    }

    /**
     * Get the user info of the currently logged in user
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    async getMe(params: object = {}): RequestPromise {
        return this.get("/users/me", params)
    }

    /**
     * Update a single user based on primaryKey
     * @param  {String|Number} primaryKey The primary key of the user
     * @param  {Object} body              The fields to update
     * @return {RequestPromise}
     */
    async updateUser(primaryKey: PrimaryKeyType, body: object): RequestPromise {
        return this.updateItem("directus_users", primaryKey, body)
    }

    // Server
    // -------------------------------------------------------------------------

    /**
     * Ping the API to check if it exists / is up and running
     * @return {RequestPromise}
     */
    async ping(): RequestPromise {
        return this.request("get", "/server/ping", {}, {}, true)
    }

    /**
     * Get the server info from the API
     * @return {RequestPromise}
     */
    async serverInfo(): RequestPromise {
        return this.request("get", "/", {}, {}, true)
    }

    // Utilties
    // -------------------------------------------------------------------------

    /**
     * Hashes a submitted string using the chosen algorithm.
     * @param string string to convert to a hash
     * @param hashAlgo hashing algorithm to use
     * @returns {Promise<string>} the hashed string
     */
    async hashString(string: string, hashAlgo: HashAlgorithm): Promise<string> {
        const body = { hasher: hashAlgo, string: string }

        const res = await this.post("/utils/hash", body)

        const hash: string = res.data.hash

        return hash
    }

    /**
     * Verifies that a string hashed with a given algorithm matches a hashed string.
     * @param hashedString  the already hashed string to check
     * @param string        the plain string to check against
     * @param hashAlgo      hashing algorithm to use
     * @returns if the hash and string match
     */
    async matchHashedString(hashedString: string, string: string, hashAlgo: HashAlgorithm): Promise<boolean> {
        const body = { hasher: hashAlgo, string: string, hash: hashedString }

        const res = await this.post("/utils/hash/match", body)

        const valid: boolean = res.data.valid

        return valid
    }

    /**
     * Returns a randomly generated alphanumeric string.
     * @param {number} length length of string to generate
     * @returns {Promise<string>} the randomly created string
     */
    async generateRandomString(length?: number): Promise<string> {
        let body: object | undefined

        if (length) {
            body = { length: length }
        }

        const res = await this.post("/utils/random/string", body)

        const value: string = res.data.random

        return value
    }
}
