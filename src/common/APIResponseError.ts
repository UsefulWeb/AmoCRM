import * as http from "http";
import { IAPIResponse } from "../interfaces/common";

/**
 * Класс ошибки API портала
 * */
export default class APIResponseError<T> extends Error {
    public readonly data: T|null;
    public readonly response: IAPIResponse<string>;
    constructor(message: string, data: T|null, response: IAPIResponse<string>) {
        super(message);
        this.data = data;
        this.response = response;
    }
}