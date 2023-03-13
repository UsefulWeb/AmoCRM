import { EventEmitter as EventEmitterBase } from "events";

export interface IEventEmitter extends EventEmitterBase.EventEmitter {
    until(eventName: string | symbol): Promise<IEventEmitter>;
    subscribe(subscriber: IEventEmitter): IEventEmitter;
    unsubscribe(subscriber: IEventEmitter): IEventEmitter;
    emit(eventName: string | symbol, ...args: unknown[]): boolean;
}

/**
 * Расширяет функционал работы с событиями в NodeJS.
 * Добавляет возможность подписки на собыития объекта
 * */
export class EventEmitter extends EventEmitterBase implements IEventEmitter {
    protected subscribers: IEventEmitter[] = [];

    /**
     * Дожидается возникновения необходимого события
     * */
    until(eventName: string | symbol): Promise<IEventEmitter> {
        return new Promise(resolve => this.on(eventName, resolve));
    }

    /**
     * Подписывает на все события сторонний объект
     * */
    subscribe(subscriber: EventEmitter) {
        this.subscribers.push(subscriber);
        return this;
    }

    /**
     * Отписка от событий
     * */
    unsubscribe(subscriber: EventEmitter) {
        this.subscribers = this.subscribers.filter(s => s !== subscriber);
        return this;
    }

    /**
     * Формирует событие у целевого объекта и у подписчиков
     * */
    emit(eventName: string | symbol, ...args: unknown[]): boolean {
        const result = super.emit(eventName, ...args);
        const context = args[0];
        if (context instanceof EventEmitter) {
            return result;
        }
        const { name } = this.constructor;
        const id = name[0].toLowerCase() + name.substring(1);
        const subscriberEventName = id+':'+eventName.toString();
        this.subscribers.forEach(
            subscriber => subscriber.emit(subscriberEventName, this, ...args)
        );
        return result;
    }
}