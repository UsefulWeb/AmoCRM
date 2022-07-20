import { IClientOptions } from "../interfaces/common";
import { JSONValue } from "../types";
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
export declare class Environment implements IEnvironment {
    protected readonly options: IClientOptions;
    constructor(options: IClientOptions);
    get<T>(path?: string, defaultValue?: T): T;
    set(path: string, value: JSONValue): this;
    exists(path: string): boolean;
}
