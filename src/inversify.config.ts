import { Container, decorate, injectable } from "inversify";
import {EventEmitter} from "events";
import Environment from "./common/Environment";
import Connection from "./common/Connection";
import ClientRequest from "./common/ClientRequest";
import Token from "./common/Token";

decorate(injectable(), EventEmitter);

const container = new Container({
    skipBaseClassChecks: true
});
container.bind<Environment>(Environment).toSelf();
container.bind<ClientRequest>(ClientRequest).toSelf();
container.bind<Connection>(Connection).toSelf();
container.bind<Token>(Token).toSelf();

export { container };