import { IClientOptions } from "../interfaces/common";
import { JSONObject, JSONValue } from "../types";

export interface IEnvironment {
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
    get<T>(path?: string, defaultValue?: T): T;
    /**
     * Устанавливает новое значение настройки
     * @param path - путь к настройке. Аналогичен path в {@link get}
     * @param value - новое значение
     * */
    set(path: string, value: JSONValue): void;
    /**
     * Проверяет наличие настройки
     * @param path - путь к настройке. Аналогичен path в {@link get}
     * */
    exists(path: string): boolean;
}
/**
 * Компонент настроек окружения.
 * Доступен как client.environment
 * Хранит и меняет настройки:
 * - переданные при создании экземпляра {@link Client}
 * - изменённые в процессе работы с помощью {@link Environment.set}
 * */
class Environment implements IEnvironment {
    protected readonly options: IClientOptions;
    constructor(options: IClientOptions) {
        this.options = options;
    }
    get<T>(path?: string, defaultValue?: T): T {
        if (!this.options) {
            return <T>defaultValue;
        }
        if (!path) {
            return <T><unknown>this.options;
        }
        let value: JSONValue = <JSONObject>this.options;
        const parts = path.split('.');
        for (const key of parts) {
            if (typeof value !== 'object') {
                return <T>defaultValue;
            }
            if (Array.isArray(value)) {
                value = value[+key];
            }
            else {
                value = [key];
            }
        }
        if (value === undefined) {
            return <T>defaultValue;
        }
        return <T><unknown>value;
    }

    set(path: string, value: JSONValue) {
        if (!this.options) {
            throw new Error('NO_ENVIRONMENT_OPTIONS');
        }
        let handler: JSONValue = <JSONObject> this.options;
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
                if (!Array.isArray(handler) && !(key in handler)){
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

    exists(path: string): boolean {
        return this.get(path) !== undefined;
    }
}

export default Environment;