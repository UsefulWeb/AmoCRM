/// <reference types="node" />
import EventEmitter from "../EventEmitter";
import { APIResponse, ResponseParser } from "../../interfaces/common";
export default class RawResponseParser extends EventEmitter implements ResponseParser<string, string> {
    parse(apiResponse: APIResponse<string>): {
        response: import("http").IncomingMessage;
        data: string;
    };
}
