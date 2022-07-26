import { IClientConstructors, IResourceEntity, IResourceFactory } from "./interfaces/api";

export type TStringValueObject = { [index: string]: string };

export type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>;

export interface JSONObject {
    [x: string]: JSONValue;
}

export type TClientPlugin = (constructors: IClientConstructors) => IClientConstructors;

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type TConstructor<T> = new (...args: any[]) => T;
export type TFactoryConstructor<T extends IResourceEntity<IResourceFactory<T>>> = TConstructor<IResourceFactory<T>>;
export type TEntityConstructor<T extends IResourceFactory<IResourceEntity<T>>> = TConstructor<IResourceEntity<T>>;