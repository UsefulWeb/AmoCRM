import { Container, decorate, injectable } from "inversify";
import {EventEmitter} from "events";
import Environment from "./common/Environment";
import Connection from "./common/Connection";
import ClientRequest from "./common/ClientRequest";
import Token from "./common/Token";
import { IoC } from "./types";

decorate(injectable(), EventEmitter);

const container = new Container({
    skipBaseClassChecks: true
});

container.bind<Environment>(IoC.Environment).to(Environment);
container.bind<ClientRequest>(IoC.ClientRequest).to(ClientRequest);
container.bind<Connection>(IoC.Connection).to(Connection);
container.bind<Token>(IoC.Token).to(Token);

export { container };