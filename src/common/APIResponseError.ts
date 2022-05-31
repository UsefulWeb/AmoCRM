import * as http from "http";

export default class APIResponseError extends Error {
    public readonly apiResponse: object;
    public readonly response: http.IncomingMessage;
    constructor(message: string, apiResponse: object, response: http.IncomingMessage) {
        super(message);
        this.apiResponse = apiResponse;
        this.response = response;
    }
}