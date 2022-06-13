/// <reference types="node" />
import * as http from "http";
import EventEmitter from "./EventEmitter";
import { IAuthServerOptions } from "../interfaces/common";
/**
 * Простой сервер авторизации для получения OAuth-токена
 * */
export default class AuthServer extends EventEmitter {
    protected readonly options: IAuthServerOptions;
    protected instance?: http.Server;
    constructor(options: IAuthServerOptions);
    /**
     * Запускает сервер на заданном в {@link options} порту
     * */
    run(): void;
    /**
     * Обработчик успешного запуска сервера
     * */
    onListenStart(): void;
    /**
     * Останавливает сервер
     * */
    stop(): Promise<void>;
    /**
     * Обработчик запроса, поступающего на адрес запущенного сервера
     * */
    handle(request: http.IncomingMessage, response: http.ServerResponse): void;
}
