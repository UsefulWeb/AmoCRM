import EventEmitter from "../EventEmitter";
import { IAPIResponse, IResponseParser } from "../../interfaces/common";
/**
 * Передаёт ответ сервера без преобразования
 * */
export default class RawResponseParser extends EventEmitter implements IResponseParser<string> {
    parse(apiResponse: IAPIResponse<string>): IAPIResponse<string>;
}
