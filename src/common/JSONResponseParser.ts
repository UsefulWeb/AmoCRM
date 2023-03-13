import * as http from 'http';
import { EventEmitter } from "./EventEmitter";
import { IAPIResponse, IResponseParser } from "../interfaces/common";
import APIResponseError from "./APIResponseError";

/**
 * Преобразует ответ портала в JSON-объект
 * */
export default class JSONResponseParser extends EventEmitter implements IResponseParser<string> {
    parse<T>(apiResponse: IAPIResponse<string>): IAPIResponse<T> {
        const { response } = apiResponse;
        if (!apiResponse.data) {
            const data = <T>{};
            return {
                response,
                data
            };
        }
        let data: T;

        try {
            data = <T>JSON.parse(apiResponse.data);
        }
        catch (e) {
            throw new APIResponseError<T>('JSON_PARSE_ERROR', null, apiResponse);
        }

        this.checkErrors(data, apiResponse);
        return {
            response,
            data
        };
    }
    checkErrors<T>(data: T, apiResponse: IAPIResponse<string>) {
        if (!data) {
            throw new Error('NO_JSON_RESPONSE');
        }
        if (typeof data !== 'object') {
            throw new Error('INVALID_JSON_RESPONSE');
        }
        if ('status' in data) {
            console.error(data);
            throw new APIResponseError<T>('API_RESPONSE_ERROR', data, apiResponse);
        }
    }
}