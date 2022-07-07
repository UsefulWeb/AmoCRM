import { IClientRequest } from "./common/ClientRequest";
import { IResourceEntity, IResourceFactory } from "./interfaces/api";

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

export type TConstructor<T> = new (...args: any[]) => T;
export type TFactoryConstructor<T extends IResourceEntity> = TConstructor<IResourceFactory<T>>;
// export type TFactoryConstructor = new <T extends IResourceEntity, F extends IResourceFactory<T>>(...args: any[]) => F;