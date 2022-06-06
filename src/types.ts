import { IAPIResponseErrorValue } from "./interfaces/common";

export type TStringValueObject = { [name: string]: string };
export type TAPIResponseValue = JSONValue | IAPIResponseErrorValue;

export type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>;

export type JSONObject = { [x: string]: any };