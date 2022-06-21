/// <reference types="node" />
import * as http from 'http';
import EventEmitter from "../EventEmitter";
import { IAPIResponse, IResponseParser } from "../../interfaces/common";
import { JSONValue } from "../../types";
/**
 * Преобразует ответ портала в JSON-объект
 * */
export default class JSONResponseParser extends EventEmitter implements IResponseParser<string, JSONValue | null> {
    parse<T>(apiResponse: IAPIResponse<string>): IAPIResponse<T>;
    checkErrors<T>(data: T, response: http.IncomingMessage): void;
}
