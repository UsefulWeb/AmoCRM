import { IAPIResponse } from "../interfaces/common";
/**
 * Класс ошибки API портала
 * */
export default class APIResponseError<T> extends Error {
    readonly data: T | null;
    readonly response: IAPIResponse<string>;
    constructor(message: string, data: T | null, response: IAPIResponse<string>);
}
