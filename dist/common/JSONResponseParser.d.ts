import { EventEmitter } from "./EventEmitter";
import { IAPIResponse, IResponseParser } from "../interfaces/common";
/**
 * Преобразует ответ портала в JSON-объект
 * */
export default class JSONResponseParser extends EventEmitter implements IResponseParser<string> {
    parse<T>(apiResponse: IAPIResponse<string>): IAPIResponse<T>;
    checkErrors<T>(data: T, apiResponse: IAPIResponse<string>): void;
}
