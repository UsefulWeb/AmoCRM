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
// export type TFactoryConstructor<T extends IResourceEntity<IResourceFactory<T>>> = TConstructor<IResourceFactory<T>>;
export type TFactoryConstructor<T extends IResourceEntity<IResourceFactory<T>>> = TConstructor<IResourceFactory<T>>;
// export type TEntityConstructor<F extends IResourceFactory<E>, E extends IResourceEntity<F>> = TConstructor<E>;
// export type TEntityConstructor<T extends IResourceEntity<IResourceFactory<T>>> = TConstructor<T>;
export type TEntityConstructor<T extends IResourceFactory<IResourceEntity<T>>> = TConstructor<IResourceEntity<T>>;
// export type TFactoryConstructor = new <T extends IResourceEntity, F extends IResourceFactory<T>>(...args: any[]) => F;