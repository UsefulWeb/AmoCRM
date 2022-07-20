"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
/**
 * Компонент настроек окружения.
 * Доступен как client.environment
 * Хранит и меняет настройки:
 * - переданные при создании экземпляра {@link Client}
 * - изменённые в процессе работы с помощью {@link Environment.set}
 * */
class Environment {
    constructor(options) {
        this.options = options;
    }
    get(path, defaultValue) {
        if (!this.options) {
            return defaultValue;
        }
        if (!path) {
            return this.options;
        }
        let value = this.options;
        const parts = path.split('.');
        for (const key of parts) {
            if (typeof value !== 'object') {
                return defaultValue;
            }
            if (Array.isArray(value)) {
                value = value[+key];
            }
            else {
                value = value[key];
            }
        }
        if (value === undefined) {
            return defaultValue;
        }
        return value;
    }
    set(path, value) {
        if (!this.options) {
            throw new Error('NO_ENVIRONMENT_OPTIONS');
        }
        let handler = this.options;
        const parts = path.split('.');
        if (parts.length === 0) {
            throw new Error('PATH_IS_EMPTY');
        }
        for (let i = 0; i < parts.length - 1; i++) {
            const key = parts[i];
            const numericIndex = +key;
            if (typeof handler === 'object') {
                if (Array.isArray(handler) && !(numericIndex in handler)) {
                    handler[numericIndex] = {};
                }
                if (!Array.isArray(handler) && !(key in handler)) {
                    handler[key] = {};
                }
            }
            else {
                throw new Error('INVALID_PATH');
            }
            if (Array.isArray(handler)) {
                handler = handler[numericIndex];
            }
            else {
                handler = handler[key];
            }
        }
        const lastKey = parts.pop();
        if (!lastKey) {
            throw new Error('INVALID_PATH');
        }
        if (typeof handler !== 'object') {
            throw new Error('INVALID_PATH');
        }
        const lastNumericIndex = +lastKey;
        if (Array.isArray(handler)) {
            handler[lastNumericIndex] = value;
        }
        else {
            handler[lastKey] = value;
        }
        return this;
    }
    exists(path) {
        return this.get(path) !== undefined;
    }
}
exports.Environment = Environment;
//# sourceMappingURL=Environment.js.map