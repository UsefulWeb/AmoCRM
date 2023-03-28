import ngrok from "ngrok";
import { connect } from "./util";
import config, {CODE} from "./config";
import {Client} from "../src/Client";

(async () => {
    const clientConfig = {
        ...config,
        auth: {
            ...config.auth,
            code: CODE
        }
    };
    const client = connect(new Client(clientConfig));
    const connected = await client.connection.connect();
    console.log({
        connected
    });
})();