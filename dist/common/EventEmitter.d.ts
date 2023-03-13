/// <reference types="node" />
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
export declare class EventEmitter extends EventEmitterBase implements IEventEmitter {
    protected subscribers: IEventEmitter[];
    /**
     * Дожидается возникновения необходимого события
     * */
    until(eventName: string | symbol): Promise<IEventEmitter>;
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
