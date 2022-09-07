import { IAPIResponse } from "../interfaces/common";
/**
 * Класс ошибки API портала
 * */
export default class APIResponseError<T> extends Error {
    readonly data: T;
    readonly response: IAPIResponse<string>;
    constructor(message: string, data: T, response: IAPIResponse<string>);
}
