import { APIResponseErrorValue } from "./interfaces/common";

export type StringValueObject = { [name: string]: string };
export type RequestData = StringValueObject | FormData;
export type APIResponseValue = JSONValue | APIResponseErrorValue;

export type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>;