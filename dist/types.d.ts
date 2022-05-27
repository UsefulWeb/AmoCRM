import { APIResponseErrorValue } from "./interfaces/common";
export declare type StringValueObject = {
    [name: string]: string;
};
export declare type RequestData = StringValueObject | FormData;
export declare type APIResponseValue = JSONValue | APIResponseErrorValue;
export declare type JSONValue = string | number | boolean | {
    [x: string]: JSONValue;
} | Array<JSONValue>;
