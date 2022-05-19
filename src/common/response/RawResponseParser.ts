import EventEmitter from "../EventEmitter";
import { APIResponse, ResponseParser } from "../../interfaces/common";
import { JSONValue } from "../../types";

export default class RawResponseParser extends EventEmitter implements ResponseParser<string, string> {
    parse(apiResponse: APIResponse<string>) {
        const { response } = apiResponse;
        const data: string = apiResponse.data;
        return {
            response,
            data
        }
    }
}