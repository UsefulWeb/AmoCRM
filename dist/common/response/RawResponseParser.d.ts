/// <reference types="node" />
import EventEmitter from "../EventEmitter";
import { IAPIResponse, IResponseParser } from "../../interfaces/common";
export default class RawResponseParser extends EventEmitter implements IResponseParser<string, string> {
    parse(apiResponse: IAPIResponse<string>): {
        response: import("http").IncomingMessage;
        data: string;
    };
}
