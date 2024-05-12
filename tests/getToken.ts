import ngrok from "ngrok";
import { connect } from "./util";
import config, {LTS_TOKEN} from "./config";
import {Client} from "../src/Client";

(async () => {
    const clientConfig = {
        ...config,
        auth: {
            ...config.auth,
            bearer: LTS_TOKEN
        }
    };
    const client = connect(new Client(clientConfig));
    const connected = await client.connection.connect();
    console.log({
        connected
    });
})();