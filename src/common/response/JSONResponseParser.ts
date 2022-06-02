import * as http from 'http';
import EventEmitter from "../EventEmitter";
import { IAPIResponse, IResponseParser } from "../../interfaces/common";
import APIResponseError from "../APIResponseError";
import { JSONObject } from "../../types";

export default class JSONResponseParser extends EventEmitter implements IResponseParser<string, JSONObject | null> {
    parse(apiResponse: IAPIResponse<string>) {
        const { response } = apiResponse;
        if (!apiResponse.data) {
            return {
                response,
                data: null
            }
        }
        const data: JSONObject = JSON.parse(apiResponse.data);

        this.checkErrors(data, response);
        return {
            response,
            data
        };
    }
    checkErrors(data: object, response: http.IncomingMessage) {
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