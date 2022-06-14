import Client from './Client';
import { IClientOptions } from "./interfaces/common";
/**
 * Функция обратной совместимости
 * */
declare function BackwardCompatibility(options: IClientOptions): Client;
declare namespace BackwardCompatibility {
    var Client: typeof import("./Client").default;
}
export { Client };
export default BackwardCompatibility;
