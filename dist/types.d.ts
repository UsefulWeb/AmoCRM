import { IAPIResponseErrorValue } from "./interfaces/common";
export declare type TStringValueObject = {
    [name: string]: string;
};
export declare type TAPIResponseValue = JSONValue | IAPIResponseErrorValue;
export declare type JSONValue = string | number | boolean | {
    [x: string]: JSONValue;
} | Array<JSONValue>;
export declare type JSONObject = {
    [x: string]: any;
};
