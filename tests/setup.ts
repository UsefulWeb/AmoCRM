import ngrok from "ngrok";
import { connect } from "./util";
import config, {CODE} from "./config";

(async () => {
    const client = connect({
        ...config,
        auth: {
            ...config.auth,
            code: CODE
        }
    });
    const connected = await client.connection.connect();
    console.log({
        connected
    });
})();