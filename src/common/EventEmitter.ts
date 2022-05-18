import { EventEmitter as EventEmitterBase } from "events";
import {injectable} from "inversify";

@injectable()
export default class EventEmitter extends EventEmitterBase {
    protected subscribers: EventEmitter[] = [];

    subscribe(subscriber: EventEmitter) {
        this.subscribers.push(subscriber);
    }

    unsubsscribe(subscriber: EventEmitter) {
        this.subscribers = this.subscribers.filter(s => s !== subscriber);
    }

    emit(eventName: string | number, ...args: any[]): boolean {
        const result = super.emit(eventName, ...args);
        const id = this.constructor.name.toLowerCase();
        const subscriberEventName = id+':'+eventName.toString();
        this.subscribers.forEach(
            subscriber => subscriber.emit(subscriberEventName, this, ...args)
        );
        return result;
    }
}