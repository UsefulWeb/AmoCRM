import { IResourceEntity, IResourceFactory } from "./interfaces/api";
export declare type TStringValueObject = {
    [index: string]: string;
};
export declare type JSONValue = string | number | boolean | {
    [x: string]: JSONValue;
} | Array<JSONValue>;
export interface JSONObject {
    [x: string]: JSONValue;
}
export declare type TConstructor<T> = new (...args: any[]) => T;
export declare type TFactoryConstructor<T extends IResourceEntity> = TConstructor<IResourceFactory<T>>;
