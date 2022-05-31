import EventEmitter from "../EventEmitter";
import { IAPIResponse, IResponseParser } from "../../interfaces/common";
import { JSONValue } from "../../types";

export default class RawResponseParser extends EventEmitter implements IResponseParser<string, string> {
    parse(apiResponse: IAPIResponse<string>) {
        const { response } = apiResponse;
        const data: string = apiResponse.data;
        return {
            response,
            data
        }
    }
}