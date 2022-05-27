import * as http from "http";
import { APIResponseValue } from "../types";

export default class APIResponseError extends Error {
    public readonly apiResponse: APIResponseValue;
    public readonly response: http.IncomingMessage;
    constructor(message: string, apiResponse: APIResponseValue, response: http.IncomingMessage) {
        super(message);
        this.apiResponse = apiResponse;
        this.response = response;
    }
}