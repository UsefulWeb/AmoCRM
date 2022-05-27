/// <reference types="node" />
import * as http from 'http';
import EventEmitter from "../EventEmitter";
import { APIResponse, ResponseParser } from "../../interfaces/common";
import { APIResponseValue } from "../../types";
export default class JSONResponseParser extends EventEmitter implements ResponseParser<string, APIResponseValue> {
    parse(apiResponse: APIResponse<string>): {
        response: http.IncomingMessage;
        data: APIResponseValue;
    };
    checkErrors(data: APIResponseValue, response: http.IncomingMessage): void;
}
