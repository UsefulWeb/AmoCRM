/// <reference types="node" />
import { EventEmitter as EventEmitterBase } from "events";
/**
 * Расширяет функционал работы с событиями в NodeJS.
 * Добавляет возможность подписки на собыития объекта
 * */
export default class EventEmitter extends EventEmitterBase {
    protected subscribers: EventEmitter[];
    /**
     * Подписывает на все события сторонний объект
     * */
    subscribe(subscriber: EventEmitter): void;
    /**
     * Отписка от событий
     * */
    unsubscribe(subscriber: EventEmitter): void;
    /**
     * Формирует событие у целевого объекта и у подписчиков
     * */
    emit(eventName: string | symbol, ...args: unknown[]): boolean;
}
