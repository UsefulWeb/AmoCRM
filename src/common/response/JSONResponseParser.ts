import * as http from 'http';
import EventEmitter from "../EventEmitter";
import { APIResponse, ResponseParser } from "../../interfaces/common";
import { APIResponseValue, JSONValue } from "../../types";
import APIResponseError from "../APIResponseError";

export default class JSONResponseParser extends EventEmitter implements ResponseParser<string, APIResponseValue> {
    parse(apiResponse: APIResponse<string>) {
        const { response } = apiResponse;
        const data: APIResponseValue = JSON.parse(apiResponse.data);

        this.checkErrors(data, response);
        return {
            response,
            data
        };
    }
    checkErrors(data: APIResponseValue, response: http.IncomingMessage) {
        if (!data) {
            throw new Error('NO_JSON_RESPONSE');
        }
        if (typeof data !== 'object') {
            throw new Error('INVALID_JSON_RESPONSE');
        }
        if ('status' in data) {
            throw new APIResponseError('API_RESPONSE_ERROR', data, response);
        }
    }
}