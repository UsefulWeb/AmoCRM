"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
const events_1 = require("events");
/**
 * Расширяет функционал работы с событиями в NodeJS.
 * Добавляет возможность подписки на собыития объекта
 * */
class EventEmitter extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.subscribers = [];
    }
    /**
     * Дожидается возникновения необходимого события
     * */
    until(eventName) {
        return new Promise(resolve => this.on(eventName, resolve));
    }
    /**
     * Подписывает на все события сторонний объект
     * */
    subscribe(subscriber) {
        this.subscribers.push(subscriber);
        return this;
    }
    /**
     * Отписка от событий
     * */
    unsubscribe(subscriber) {
        this.subscribers = this.subscribers.filter(s => s !== subscriber);
        return this;
    }
    /**
     * Формирует событие у целевого объекта и у подписчиков
     * */
    emit(eventName, ...args) {
        const result = super.emit(eventName, ...args);
        const context = args[0];
        if (context instanceof EventEmitter) {
            return result;
        }
        const { name } = this.constructor;
        const id = name[0].toLowerCase() + name.substring(1);
        const subscriberEventName = id + ':' + eventName.toString();
        this.subscribers.forEach(subscriber => subscriber.emit(subscriberEventName, this, ...args));
        return result;
    }
}
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=EventEmitter.js.map