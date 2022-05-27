/// <reference types="node" />
import * as http from "http";
import { APIResponseValue } from "../types";
export default class APIResponseError extends Error {
    readonly apiResponse: APIResponseValue;
    readonly response: http.IncomingMessage;
    constructor(message: string, apiResponse: APIResponseValue, response: http.IncomingMessage);
}
