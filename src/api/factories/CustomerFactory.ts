import { applyMixins } from "../../util";

export class BaseCustomerFactory {

}

const CustomerFactory = applyMixins(BaseCustomerFactory, [

]);

export CustomerFactory;