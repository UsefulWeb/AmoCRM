export type StringValueObject = { [name: string]: string };
export type RequestData = StringValueObject | FormData;

export const IoC = {
    Environment: Symbol.for('Environment'),
    ClientRequest: Symbol.for('ClientRequest'),
    Connection: Symbol.for('Connection'),
    Token: Symbol.for('Token'),
}

export type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>;