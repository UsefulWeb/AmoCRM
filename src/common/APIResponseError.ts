import { IAPIResponse } from "../interfaces/common";

/**
 * Класс ошибки API портала
 * */
export default class APIResponseError<T> extends Error {
    public readonly data: T|null;
    public readonly apiResponse: IAPIResponse<string>;
    constructor(message: string, data: T|null, apiResponse: IAPIResponse<string>) {
        super(message);
        this.data = data;
        this.apiResponse = apiResponse;
    }
}