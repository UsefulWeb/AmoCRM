import { IAPIResponse } from "../interfaces/common";
/**
 * Класс ошибки API портала
 * */
export default class APIResponseError<T> extends Error {
    readonly apiResponse: T;
    readonly response: IAPIResponse<string>;
    constructor(message: string, apiResponse: T, response: IAPIResponse<string>);
}
