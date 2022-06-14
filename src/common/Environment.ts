import { IClientOptions } from "../interfaces/common";

/**
 * Компонент настроек окружения.
 * Доступен как client.environment
 * Хранит и меняет настройки:
 * - переданные при создании экземпляра {@link Client}
 * - изменённые в процессе работы с помощью {@link Environment.set}
 * */
class Environment {
    protected readonly options: IClientOptions;
    constructor(options: IClientOptions) {
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
    get<T>(path?: string, defaultValue?: T): T  {
        if (!this.options) {
            return <T>defaultValue;
        }
        let value: any = this.options;
        if (!path) {
            return <T>value;
        }
        const parts = path.split('.');
        for (const key of parts) {
            if (!value) {
                return <T>defaultValue;
            }
            value = value[key];
        }
        if (value === undefined) {
            return <T>defaultValue;
        }
        return value;
    }

    /**
     * Устанавливает новое значение настройки
     * @param path - путь к настройке. Аналогичен path в {@link get}
     * @param value - новое значение
     * */
    set<T>(path: string, value: T) {
        if (!this.options) {
            throw new Error('NO_ENVIRONMENT_OPTIONS');
        }
        let handler: any = this.options;
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
    exists(path: string): boolean {
        return this.get(path) !== undefined;
    }
}

export default Environment;