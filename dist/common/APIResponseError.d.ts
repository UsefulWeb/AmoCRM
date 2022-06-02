/// <reference types="node" />
import * as http from "http";
export default class APIResponseError extends Error {
    readonly apiResponse: object;
    readonly response: http.IncomingMessage;
    constructor(message: string, apiResponse: object, response: http.IncomingMessage);
}
