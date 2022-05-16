import EventEmitterBase from "events";
import {EventEmittersOptions} from "./interfaces/common";

export default class EventEmitter extends EventEmitterBase {
    protected subscribers: EventEmitterBase[] = [];

    public constructor(options?: EventEmittersOptions) {
        super(options);
    }

    subscribe(subscriber: EventEmitterBase) {
        this.subscribers.push(subscriber);
    }

    unsubsscribe(subscriber: EventEmitterBase) {
        this.subscribers = this.subscribers.filter(s => s !== subscriber);
    }

    emit(eventName: string | symbol, ...args: any[]): boolean {
        const result = super.emit(eventName, ...args);
        const id = this.constructor.name.toLowerCase();
        const subscriberEventName = id+':'+eventName.toString();
        this.subscribers.forEach(
            subscriber => subscriber.emit(subscriberEventName, ...args)
        );
        return result;
    }
}