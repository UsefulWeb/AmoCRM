import { APIResponseValue } from "../types";

export default class APIResponseError extends Error {
    public readonly response?: APIResponseValue;
    constructor(message: string, response?: APIResponseValue) {
        super(message);
        this.response = response;
    }
}