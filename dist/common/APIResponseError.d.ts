import { IAPIResponse } from "../interfaces/common";
/**
 * Класс ошибки API портала
 * */
export default class APIResponseError<T> extends Error {
    readonly data: T | null;
    readonly apiResponse: IAPIResponse<string>;
    constructor(message: string, data: T | null, apiResponse: IAPIResponse<string>);
}
