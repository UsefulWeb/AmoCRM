/// <reference types="node" />
import { EventEmitter as EventEmitterBase } from "events";
export default class EventEmitter extends EventEmitterBase {
    protected subscribers: EventEmitter[];
    subscribe(subscriber: EventEmitter): void;
    unsubsscribe(subscriber: EventEmitter): void;
    emit(eventName: string | symbol, ...args: any[]): boolean;
}
