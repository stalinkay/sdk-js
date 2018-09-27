import { AxiosError } from 'axios';
export interface Options {
    url: string;
    accessToken?: string;
    headers?: any;
    accessTokenType?: string;
    version?: string;
}
export interface DirectusMeta {
    type?: string;
    table?: string;
    Active?: number;
    Draft?: number;
    Delete?: number;
    total?: number;
    total_entries?: number;
}
export interface DirectusResponseArray {
    meta: DirectusMeta;
    data: any[];
}
export interface DirectusResponseSingle {
    meta: DirectusMeta;
    data: any;
}
export interface DirectusResponseOperation {
    meta: DirectusMeta;
    success: boolean;
}
export declare class RemoteInstance {
    accessToken: undefined | string;
    accessTokenType: string;
    headers: any;
    version: string;
    base: string;
    api: string;
    url: string;
    constructor(options?: Options);
    readonly _requestHeaders: any;
    static _onCaughtError(err: AxiosError): any;
    _get(endpoint: string, params?: {}, isAPI?: boolean): Promise<any>;
    _post(endpoint: string, data?: {}, isAPI?: boolean, params?: {}): Promise<any>;
    _put(endpoint: string, data?: {}, isAPI?: boolean, params?: {}): Promise<any>;
    _delete(endpoint: string, data?: {}, isAPI?: boolean, params?: {}): Promise<any>;
    authenticate(email: string, password: string): Promise<{}>;
    createItem(table: string, data?: {}, params?: {}): Promise<DirectusResponseSingle>;
    getItems(table: string, params?: {}): Promise<DirectusResponseArray>;
    getItem(table: string, id: string | number, params?: {}): Promise<DirectusResponseSingle>;
    updateItem(table: string, id: string | number, data: string, params?: {}): Promise<DirectusResponseSingle>;
    deleteItem(table: string, id: string | number, params?: {}): Promise<DirectusResponseOperation>;
    createBulk(table: string, data: any[]): Promise<DirectusResponseArray>;
    updateBulk(table: string, data: any[]): Promise<DirectusResponseArray>;
    deleteBulk(table: string, data: any[]): Promise<DirectusResponseOperation>;
    createFile(data?: {}): Promise<DirectusResponseSingle>;
    getFiles(params?: {}): Promise<DirectusResponseArray>;
    getFile(id: string | number): Promise<DirectusResponseSingle>;
    updateFile(id: string | number, data: any): Promise<DirectusResponseSingle>;
    deleteFile(id: string | number): Promise<DirectusResponseOperation>;
    createTable(name: string): Promise<DirectusResponseSingle>;
    getTables(params?: {}): Promise<DirectusResponseArray>;
    getTable(table: string, params?: {}): Promise<DirectusResponseSingle>;
    createColumn(table: string, data?: {}): Promise<DirectusResponseSingle>;
    getColumns(table: string, params?: {}): Promise<DirectusResponseArray>;
    getColumn(table: string, column: string): Promise<DirectusResponseSingle>;
    updateColumn(table: string, column: string, data?: {}): Promise<DirectusResponseSingle>;
    deleteColumn(table: string, column: string): Promise<DirectusResponseOperation>;
    createGroup(name: string): Promise<DirectusResponseSingle>;
    getGroups(): Promise<DirectusResponseArray>;
    getGroup(id: string | number): Promise<DirectusResponseSingle>;
    createPrivileges(id: string | number, data?: {}): Promise<DirectusResponseSingle>;
    getPrivileges(id: string | number): Promise<DirectusResponseSingle>;
    getTablePrivileges(id: string | number, table: string): Promise<DirectusResponseSingle>;
    updatePrivileges(id: string | number, table: any): Promise<DirectusResponseSingle>;
    getPreferences(table: string): Promise<DirectusResponseSingle>;
    updatePreference(table: string, data?: {}): Promise<DirectusResponseSingle>;
    getMessages(params?: {}): Promise<DirectusResponseArray>;
    getMessage(id: string | number): Promise<DirectusResponseSingle>;
    sendMessage(data: string): Promise<DirectusResponseOperation>;
    getActivity(params?: {}): Promise<DirectusResponseArray>;
    getBookmarks(): Promise<DirectusResponseArray>;
    getUserBookmarks(): Promise<DirectusResponseArray>;
    getBookmark(id: string | number): Promise<DirectusResponseSingle>;
    createBookmark(data: string): Promise<DirectusResponseSingle>;
    deleteBookmark(id: string | number): Promise<DirectusResponseOperation>;
    getSettings(): Promise<DirectusResponseArray>;
    getSettingsByCollection(name: string): Promise<DirectusResponseArray>;
    updateSettings(name: string, data?: {}): Promise<DirectusResponseArray>;
    getUsers(params?: {}): Promise<DirectusResponseArray>;
    getUser(id: string | number): Promise<DirectusResponseSingle>;
    getMe(): Promise<DirectusResponseSingle>;
    createUser(user: any): Promise<DirectusResponseSingle>;
    updateUser(id: string | number, data: any): Promise<DirectusResponseSingle>;
    updateMe(data: string): Promise<DirectusResponseSingle>;
    updatePassword(password: string): Promise<DirectusResponseSingle>;
    getApi(api_endpoint: string, params?: {}): Promise<any>;
    postApi(api_endpoint: string, data: string): Promise<any>;
    putApi(api_endpoint: string, data: string): Promise<any>;
    deleteApi(api_endpoint: string, data: string): Promise<any>;
    getHash(string: string, data?: {}): Promise<any>;
    getRandom(params?: {}): Promise<any>;
    setAccessTokenParam(params: any): void;
}
