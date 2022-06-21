import { IAPIResponseErrorValue } from "./interfaces/common";
export declare type TStringValueObject = {
    [index: string]: string;
};
export declare type TAPIResponseValue = JSONValue | IAPIResponseErrorValue;
export declare type JSONValue = string | number | boolean | {
    [x: string]: JSONValue;
} | Array<JSONValue>;
export interface JSONObject {
    [x: string]: JSONValue;
}
