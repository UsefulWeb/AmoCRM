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
export declare type TFactoryConstructor<T extends IResourceEntity<IResourceFactory<T>>> = TConstructor<IResourceFactory<T>>;
export declare type TEntityConstructor<T extends IResourceFactory<IResourceEntity<T>>> = TConstructor<IResourceEntity<T>>;
