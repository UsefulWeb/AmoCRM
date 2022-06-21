import { IAPIResponseErrorValue } from "./interfaces/common";

export type TStringValueObject = { [index: string]: string };
export type TAPIResponseValue = JSONValue | IAPIResponseErrorValue;

export type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>;

export interface JSONObject {
    [x: string]: JSONValue;
}
// export type JSONObject = { [x: string]: JSONValue };

