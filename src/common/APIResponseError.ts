import * as http from "http";

/**
 * Класс ошибки API портала
 * */
export default class APIResponseError<T> extends Error {
    public readonly apiResponse: T;
    public readonly response: http.IncomingMessage;
    constructor(message: string, apiResponse: T, response: http.IncomingMessage) {
        super(message);
        this.apiResponse = apiResponse;
        this.response = response;
    }
}