import { EventEmitter as EventEmitterBase } from "events";

/**
 * Расширяет функционал работы с событиями в NodeJS.
 * Добавляет возможность подписки на собыития объекта
 * */
export default class EventEmitter extends EventEmitterBase {
    protected subscribers: EventEmitter[] = [];

    /**
     * Подписывает на все события сторонний объект
     * */
    subscribe(subscriber: EventEmitter) {
        this.subscribers.push(subscriber);
    }

    /**
     * Отписка от событий
     * */
    unsubscribe(subscriber: EventEmitter) {
        this.subscribers = this.subscribers.filter(s => s !== subscriber);
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