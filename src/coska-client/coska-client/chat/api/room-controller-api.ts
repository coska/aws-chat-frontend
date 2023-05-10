/* tslint:disable */
/* eslint-disable */
/**
 * Coska Chat API
 * This API exposes endpoints to manage Coska Chat.
 *
 * The version of the OpenAPI document: 1.0
 * Contact: admin@coska.chat.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../../../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../../../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../../../base';
// @ts-ignore
import { RoomDto } from '../../../coska-client/chat/model';
/**
 * RoomControllerApi - axios parameter creator
 * @export
 */
export const RoomControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {RoomDto} roomDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        create1: async (roomDto: RoomDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'roomDto' is not null or undefined
            assertParamExists('create1', 'roomDto', roomDto)
            const localVarPath = `/v1/chat/rooms`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication jwt required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(roomDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        delete1: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('delete1', 'id', id)
            const localVarPath = `/v1/chat/rooms/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication jwt required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAll1: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/chat/rooms`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication jwt required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findById1: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('findById1', 'id', id)
            const localVarPath = `/v1/chat/rooms/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication jwt required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {RoomDto} roomDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        update1: async (roomDto: RoomDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'roomDto' is not null or undefined
            assertParamExists('update1', 'roomDto', roomDto)
            const localVarPath = `/v1/chat/rooms`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication jwt required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(roomDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * RoomControllerApi - functional programming interface
 * @export
 */
export const RoomControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = RoomControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {RoomDto} roomDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async create1(roomDto: RoomDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RoomDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.create1(roomDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async delete1(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.delete1(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findAll1(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<RoomDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findAll1(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findById1(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RoomDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findById1(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {RoomDto} roomDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async update1(roomDto: RoomDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RoomDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.update1(roomDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * RoomControllerApi - factory interface
 * @export
 */
export const RoomControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = RoomControllerApiFp(configuration)
    return {
        /**
         * 
         * @param {RoomDto} roomDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        create1(roomDto: RoomDto, options?: any): AxiosPromise<RoomDto> {
            return localVarFp.create1(roomDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        delete1(id: string, options?: any): AxiosPromise<void> {
            return localVarFp.delete1(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAll1(options?: any): AxiosPromise<Array<RoomDto>> {
            return localVarFp.findAll1(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findById1(id: string, options?: any): AxiosPromise<RoomDto> {
            return localVarFp.findById1(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {RoomDto} roomDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        update1(roomDto: RoomDto, options?: any): AxiosPromise<RoomDto> {
            return localVarFp.update1(roomDto, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * RoomControllerApi - object-oriented interface
 * @export
 * @class RoomControllerApi
 * @extends {BaseAPI}
 */
export class RoomControllerApi extends BaseAPI {
    /**
     * 
     * @param {RoomDto} roomDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RoomControllerApi
     */
    public create1(roomDto: RoomDto, options?: AxiosRequestConfig) {
        return RoomControllerApiFp(this.configuration).create1(roomDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RoomControllerApi
     */
    public delete1(id: string, options?: AxiosRequestConfig) {
        return RoomControllerApiFp(this.configuration).delete1(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RoomControllerApi
     */
    public findAll1(options?: AxiosRequestConfig) {
        return RoomControllerApiFp(this.configuration).findAll1(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RoomControllerApi
     */
    public findById1(id: string, options?: AxiosRequestConfig) {
        return RoomControllerApiFp(this.configuration).findById1(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {RoomDto} roomDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RoomControllerApi
     */
    public update1(roomDto: RoomDto, options?: AxiosRequestConfig) {
        return RoomControllerApiFp(this.configuration).update1(roomDto, options).then((request) => request(this.axios, this.basePath));
    }
}