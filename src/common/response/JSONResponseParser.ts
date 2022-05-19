import EventEmitter from "../EventEmitter";
import { APIResponse, ResponseParser } from "../../interfaces/common";
import { JSONValue } from "../../types";

export default class JSONResponseParser extends EventEmitter implements ResponseParser<string, JSONValue> {
    parse(apiResponse: APIResponse<string>) {
        const { response } = apiResponse;
        const data: JSONValue = JSON.stringify(apiResponse.data);

        return {
            response,
            data
        };
    }
}