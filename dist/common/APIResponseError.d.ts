/// <reference types="node" />
import * as http from "http";
/**
 * Класс ошибки API портала
 * */
export default class APIResponseError<T> extends Error {
    readonly apiResponse: T;
    readonly response: http.IncomingMessage;
    constructor(message: string, apiResponse: T, response: http.IncomingMessage);
}
