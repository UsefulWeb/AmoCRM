/// <reference types="node" />
import * as http from "http";
import { EventEmitter, IEventEmitter } from "./EventEmitter";
import { IAuthServerOptions } from "../interfaces/common";
export interface IAuthServer extends IEventEmitter {
    /**
     * Запускает сервер на заданном в {@link options} порту
     * */
    run(): void;
    /**
     * Обработчик успешного запуска сервера
     * */
    afterStart(): void;
    /**
     * Останавливает сервер
     * */
    stop(): void;
    /**
     * Обработчик запроса, поступающего на адрес запущенного сервера
     * */
    handle(request: http.IncomingMessage, response: http.ServerResponse): void;
}
/**
 * Простой сервер авторизации для получения OAuth-токена
 * */
export declare class AuthServer extends EventEmitter {
    protected readonly options: IAuthServerOptions;
    protected instance?: http.Server;
    constructor(options: IAuthServerOptions);
    run(): void;
    afterStart(): void;
    stop(): Promise<void>;
    handle(request: http.IncomingMessage, response: http.ServerResponse): void;
}
