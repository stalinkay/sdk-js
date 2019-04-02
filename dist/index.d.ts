export interface Storage {
    getItem(key: string): any;
    setItem(key: string, value: any): void;
    removeItem(key: string): void;
}
export interface ClientOptions {
    url: string;
    project?: string;
    token?: string;
    localExp?: number;
    storage?: Storage;
}
export interface RequestError {
    json: boolean;
    code: number;
    message: string;
    error: any;
    data?: any;
}
export interface RequestResponse {
    object: any;
    error?: any;
}
export interface LoginCredentials {
    email: string;
    password: string;
}
export interface LoginOptions {
    persist: boolean;
    storage: boolean;
}
export interface LoginResponse {
    url: string;
    project: string;
    token: string;
    localExp: number;
}
export interface Field {
    collection: string;
    id: number;
    field: string;
    type: string;
}
export interface Collection {
    collection: string;
    fields: {
        string: Field;
    };
    hidden: boolean;
    icon?: string;
    managed: boolean;
    note?: string;
    single: boolean;
    translation?: string;
}
export interface Item {
    id: number;
}
export declare type BodyType = object | any[];
export declare type PrimaryKeyType = string | number;
export declare type RequestPromise = Promise<any>;
export declare type HashAlgorithm = "core" | "bcrypt" | "sha1" | "sha224" | "sha256" | "sha384" | "sha512";
export default class DirectusSDK {
    private _url;
    private _project;
    readonly url: string;
    readonly project: string;
    onAutoRefreshError?: (msg: object) => void;
    onAutoRefreshSuccess?: (msg: ClientOptions) => void;
    private token?;
    private localExp?;
    private storage?;
    private refreshInterval?;
    private axios;
    private readonly payload;
    readonly loggedIn: boolean;
    constructor(options: ClientOptions);
    request(method: "get" | "post" | "put" | "patch" | "delete", endpoint: string, params?: object, data?: any, noEnv?: boolean, headers?: object): Promise<any>;
    get(endpoint: string, params?: object): Promise<any>;
    post(endpoint: string, body?: BodyType, params?: object): Promise<any>;
    patch(endpoint: string, body?: BodyType, params?: object): Promise<any>;
    put(endpoint: string, body?: BodyType, params?: object): Promise<any>;
    delete(endpoint: string): Promise<any>;
    login(credentials: LoginCredentials, options?: LoginOptions): Promise<LoginResponse>;
    logout(): void;
    /**
     * Get all the setup third party auth providers
     * @return {RequestPromise}
     */
    getThirdPartyAuthProviders(): RequestPromise;
    startInterval(fireImmediately?: boolean): void;
    stopInterval(): void;
    refreshIfNeeded(): Promise<void>;
    /**
     * Use the passed token to request a new one
     * @param  {String} token Active & Valid token
     * @return {RequestPromise}
     */
    refresh(token: string): RequestPromise;
    /**
     * Request to reset the password of the user with the given email address
     *
     * The API will send an email to the given email address with a link to generate a new
     * temporary password.
     * @param {String} email The user's email
     * @return {RequestPromise}
     */
    requestPasswordReset(email: string): RequestPromise;
    /**
     * Get activity
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getActivity(params?: object): RequestPromise;
    /**
     * Get the bookmarks of the current user
     * @return {Promise<any[]>}
     */
    getMyBookmarks(): Promise<any[]>;
    /**
     * Get all available collections
     * @param  {Object} [params={}] Query parameters
     * @return {Promise<Collection[]>}
     */
    getCollections(params?: object): Promise<Collection[]>;
    /**
     * Get collection info by name
     * @param  {String} collection  Collection name
     * @param  {Object} [params={}] Query parameters
     * @return {Promise<Collection>}
     */
    getCollection(name: string, params?: object): Promise<Collection>;
    /**
     * Create a collection
     * @param {Object} data Collection information
     * @return {RequestPromise}
     */
    createCollection(data: object): RequestPromise;
    /**
     * Update a collection
     * @param  {String} The collection to update
     * @param  {Object} The fields to update
     * @return {RequestPromise}
     */
    updateCollection(name: string, data?: object): RequestPromise;
    /**
     * Delete a collection
     * @param  {String} collection The primary key of the collection to remove
     * @return {RequestPromise}
     */
    deleteCollection(name: string): RequestPromise;
    /**
     * Create a new collection preset (bookmark / listing preferences)
     * @param  {Object} data The bookmark info
     * @return {RequestPromise}
     */
    createCollectionPreset(data: object): RequestPromise;
    /**
     * Update collection preset (bookmark / listing preference)
     * @param {String|Number} primaryKey
     * @param {Object} data The bookmark info
     * @return {RequestPromise}
     */
    updateCollectionPreset(primaryKey: PrimaryKeyType, data: object): RequestPromise;
    /**
     * Delete collection preset by primarykey
     * @param {String|Number} primaryKey The primaryKey of the preset to delete
     * @return {RequestPromise}
     */
    deleteCollectionPreset(primaryKey: PrimaryKeyType): RequestPromise;
    /**
     * This will update the database of the API instance to the latest version
     * using the migrations in the API
     * @return {RequestPromise}
     */
    updateDatabase(): RequestPromise;
    /**
     * Get the meta information of all installed interfaces
     * @return {RequestPromise}
     */
    getInterfaces(): RequestPromise;
    /**
     * Get the meta information of all installed layouts
     * @return {RequestPromise}
     */
    getLayouts(): RequestPromise;
    /**
     * Get the meta information of all installed pages
     * @return {RequestPromise}
     */
    getPages(): RequestPromise;
    /**
     * Get all fields that are in Directus
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getAllFields(params?: object): RequestPromise;
    /**
     * Get the fields that have been setup for a given collection
     * @param  {String} collection  Collection name
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getFields(collection: string, params?: object): RequestPromise;
    /**
     * Get the field information for a single given field
     * @param  {String} collection  Collection name
     * @param  {String} fieldName   Field name
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getField(collection: string, fieldName: string, params?: object): RequestPromise;
    /**
     * Create a field in the given collection
     * @param  {String} collection Collection to add the field in
     * @param  {Object} fieldInfo  The fields info to save
     * @return {RequestPromise}
     */
    createField(collection: string, fieldInfo: object): RequestPromise;
    /**
     * Update a given field in a given collection
     * @param  {String} collection Field's parent collection
     * @param  {String} fieldName  Name of the field to update
     * @param  {Object} fieldInfo  Fields to update
     * @return {RequestPromise}
     */
    updateField(collection: string, fieldName: string, fieldInfo: object): RequestPromise;
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
    updateFields(collection: string, fieldsInfoOrFieldNames: object[] | string[], fieldInfo?: object): RequestPromise;
    /**
     * Delete a field from a collection
     * @param  {String} collection Name of the collection
     * @param  {String} fieldName  The name of the field to delete
     * @return {RequestPromise}
     */
    deleteField(collection: string, fieldName: string): RequestPromise;
    uploadFiles(data: object, onUploadProgress: () => object): Promise<any>;
    /**
     * Update an existing item
     * @param  {String} collection The collection to add the item to
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Object} body       The item's field values
     * @return {RequestPromise}
     */
    updateItem(collection: string, primaryKey: PrimaryKeyType, body: object): RequestPromise;
    /**
     * Update multiple items
     * @param  {String} collection The collection to add the item to
     * @param  {Array} body        The item's field values
     * @return {RequestPromise}
     */
    updateItems(collection: string, body: object[]): RequestPromise;
    /**
     * Create a new item
     * @param  {String} collection The collection to add the item to
     * @param  {Object} body       The item's field values
     * @return {RequestPromise}
     */
    createItem(collection: string, body: object): RequestPromise;
    /**
     * Create multiple items
     * @param  {String} collection The collection to add the item to
     * @param  {Array} body        The item's field values
     * @return {RequestPromise}
     */
    createItems(collection: string, body: object[]): RequestPromise;
    /**
     * Get items from a given collection
     * @param  {String} collection The collection to add the item to
     * @param  {Object} [params={}]   Query parameters
     * @return {Promise<T[]>}
     */
    getItems<T extends Item>(collection: string, params?: object): Promise<T[]>;
    /**
     * Get a single item by primary key
     * @param  {String} collection  The collection to add the item to
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Object} [params={}] Query parameters
     * @return {Promise<T>}
     */
    getItem<T extends Item>(collection: string, primaryKey: PrimaryKeyType, params?: object): Promise<T>;
    /**
     * Delete a single item by primary key
     * @param  {String} collection  The collection to delete the item from
     * @param  {String|Number} primaryKey Primary key of the item
     * @return {RequestPromise}
     */
    deleteItem(collection: string, primaryKey: PrimaryKeyType): RequestPromise;
    /**
     * Delete multiple items by primary key
     * @param  {String} collection  The collection to delete the item from
     * @param  {Array} primaryKey Primary key of the item
     * @return {RequestPromise}
     */
    deleteItems(collection: string, primaryKeys: PrimaryKeyType[]): RequestPromise;
    /**
     * Get the collection presets of the current user for a single collection
     * @param collection Collection to fetch the preferences for
     */
    getMyListingPreferences(collection: string): Promise<object>;
    /**
     * Get permissions
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getPermissions(params?: object): RequestPromise;
    /**
     * Get the currently logged in user's permissions
     * @param  {Object} params Query parameters
     * @return {RequestPromise}
     */
    getMyPermissions(params?: object): RequestPromise;
    /**
     * Create multiple new permissions
     * @param  {Array} data  Permission records to save
     * @return {RequestPromise}
     */
    createPermissions(data: any[]): RequestPromise;
    /**
     * Update multiple permission records
     * @param  {Array} data  Permission records to update
     * @return {RequestPromise}
     */
    updatePermissions(data: any[]): RequestPromise;
    /**
     * Get all relationships
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getRelations(params?: object): RequestPromise;
    createRelation(data: BodyType): RequestPromise;
    updateRelation(primaryKey: PrimaryKeyType, data: BodyType): RequestPromise;
    /**
     * Get the relationship information for the given collection
     * @param  {String} collection The collection name
     * @return {RequestPromise}
     */
    getCollectionRelations(collection: string): RequestPromise;
    /**
     * Get a single item's revisions by primary key
     * @param  {String} collection  The collection to fetch the revisions from
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getItemRevisions(collection: string, primaryKey: PrimaryKeyType, params?: object): RequestPromise;
    /**
     * revert an item to a previous state
     * @param  {String} collection  The collection to fetch the revisions from
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Number} revisionID The ID of the revision to revert to
     * @return {RequestPromise}
     */
    revert(collection: string, primaryKey: PrimaryKeyType, revisionID: number): RequestPromise;
    /**
     * Get a single user role
     * @param  {Number} primaryKey  The id of the user rol to get
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getRole(primaryKey: PrimaryKeyType, params?: object): RequestPromise;
    /**
     * Get the user roles
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getRoles(params?: object): RequestPromise;
    /**
     * Update a user role
     * @param  {Number} primaryKey The ID of the role
     * @param  {Object} body       The fields to update
     * @return {RequestPromise}
     */
    updateRole(primaryKey: PrimaryKeyType, body: BodyType): RequestPromise;
    /**
     * Create a new user role
     * @param  {Object} body The role information
     * @return {RequestPromise}
     */
    createRole(body: object): RequestPromise;
    /**
     * Delete a user role by primary key
     * @param  {Number | String} primaryKey Primary key of the user role
     * @return {RequestPromise}
     */
    deleteRole(primaryKey: PrimaryKeyType): RequestPromise;
    /**
     * Get Directus' global settings
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getSettings(params?: object): RequestPromise;
    /**
     * Get the "fields" for directus_settings
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getSettingsFields(params?: object): RequestPromise;
    /**
     * Get a list of available users in Directus
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getUsers(params?: object): RequestPromise;
    /**
     * Get a single Directus user
     * @param  {String} primaryKey  The unique identifier of the user
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getUser(primaryKey: PrimaryKeyType, params?: object): RequestPromise;
    /**
     * Get the user info of the currently logged in user
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getMe(params?: object): RequestPromise;
    /**
     * Update a single user based on primaryKey
     * @param  {String|Number} primaryKey The primary key of the user
     * @param  {Object} body              The fields to update
     * @return {RequestPromise}
     */
    updateUser(primaryKey: PrimaryKeyType, body: object): RequestPromise;
    /**
     * Ping the API to check if it exists / is up and running
     * @return {RequestPromise}
     */
    ping(): RequestPromise;
    /**
     * Get the server info from the API
     * @return {RequestPromise}
     */
    serverInfo(): RequestPromise;
    /**
     * Hashes a submitted string using the chosen algorithm.
     * @param string string to convert to a hash
     * @param hashAlgo hashing algorithm to use
     * @returns {Promise<string>} the hashed string
     */
    hashString(string: string, hashAlgo: HashAlgorithm): Promise<string>;
    /**
     * Verifies that a string hashed with a given algorithm matches a hashed string.
     * @param hashedString  the already hashed string to check
     * @param string        the plain string to check against
     * @param hashAlgo      hashing algorithm to use
     * @returns if the hash and string match
     */
    matchHashedString(hashedString: string, string: string, hashAlgo: HashAlgorithm): Promise<boolean>;
    /**
     * Returns a randomly generated alphanumeric string.
     * @param {number} length length of string to generate
     * @returns {Promise<string>} the randomly created string
     */
    generateRandomString(length?: number): Promise<string>;
}
