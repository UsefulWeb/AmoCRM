/// <reference types="node" />
import { EventEmitter as EventEmitterBase } from "events";
export interface IEventEmitter extends EventEmitterBase.EventEmitter {
    subscribe(subscriber: IEventEmitter): IEventEmitter;
    unsubscribe(subscriber: IEventEmitter): IEventEmitter;
}
/**
 * Расширяет функционал работы с событиями в NodeJS.
 * Добавляет возможность подписки на собыития объекта
 * */
export declare class EventEmitter extends EventEmitterBase implements IEventEmitter {
    protected subscribers: EventEmitter[];
    /**
     * Подписывает на все события сторонний объект
     * */
    subscribe(subscriber: EventEmitter): this;
    /**
     * Отписка от событий
     * */
    unsubscribe(subscriber: EventEmitter): this;
    /**
     * Формирует событие у целевого объекта и у подписчиков
     * */
    emit(eventName: string | symbol, ...args: unknown[]): boolean;
}
