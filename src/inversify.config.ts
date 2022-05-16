import { Container } from "inversify";
import Environment from "./Environment";
import Connection from "./Connection";

const container = new Container;
container.bind(Environment).to(Environment);
container.bind(Connection).to(Connection);

export { container };