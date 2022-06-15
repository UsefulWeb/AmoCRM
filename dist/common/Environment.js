"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    /**
     * Возвращает настройки приложения
     * @param path - путь к настройке(ам)
     * @example
     * ```ts
     * client.environment.get()
     * ```
     * без значения метод вернёт объект текущих настроек
     * @example
     * ```ts
     * client.environment.get('domain')
     * ```
     * вернёт имя домена портала
     * @example
     * ```ts
     * client.environment.get('auth')
     * ```
     * вернёт объект настроек авторизации
     * @example
     * ```ts
     * client.environment.get('auth.client_id')
     * ```
     * вернёт id OAuth-приложения AmoCRM
     * @param defaultValue - значение, которое вернётся при отсутствии настройки
     * @returns значение настройки. При отсутствии значения вернётся defaultValue
     * */
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
            value = value[key];
        }
        if (value === undefined) {
            return defaultValue;
        }
        return value;
    }
    /**
     * Устанавливает новое значение настройки
     * @param path - путь к настройке. Аналогичен path в {@link get}
     * @param value - новое значение
     * */
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
            if (!handler[key]) {
                handler[key] = {};
            }
            handler = handler[key];
        }
        const lastKey = parts.pop();
        if (!lastKey) {
            throw new Error('INVALID_PATH');
        }
        handler[lastKey] = value;
        return this;
    }
    /**
     * Проверяет наличие настройки
     * @param path - путь к настройке. Аналогичен path в {@link get}
     * */
    exists(path) {
        return this.get(path) !== undefined;
    }
}
exports.default = Environment;
//# sourceMappingURL=Environment.js.map