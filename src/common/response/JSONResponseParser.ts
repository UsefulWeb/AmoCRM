import * as http from 'http';
import EventEmitter from "../EventEmitter";
import { IAPIResponse, IResponseParser } from "../../interfaces/common";
import APIResponseError from "../APIResponseError";
import { JSONValue } from "../../types";

/**
 * Преобразует ответ портала в JSON-объект
 * */
export default class JSONResponseParser extends EventEmitter implements IResponseParser<string, JSONValue | null> {
    parse<T>(apiResponse: IAPIResponse<string>): IAPIResponse<T> {
        const { response } = apiResponse;
        if (!apiResponse.data) {
            const data = <T>{};
            return {
                response,
                data
            };
        }
        const data: T = JSON.parse(apiResponse.data);

        this.checkErrors(data, response);
        return {
            response,
            data
        };
    }
    checkErrors<T>(data: T, response: http.IncomingMessage) {
        if (!data) {
            throw new Error('NO_JSON_RESPONSE');
        }
        if (typeof data !== 'object') {
            throw new Error('INVALID_JSON_RESPONSE');
        }
        if ('status' in data) {
            console.error(data);
            throw new APIResponseError<T>('API_RESPONSE_ERROR', data, response);
        }
    }
}