import './bootstrap';
import { Client } from "../src/Client";
import config from "./config";
import { delay } from "../src/util";

jest.setTimeout(60 * 60 * 1000);

describe('AuthServer', () => {
    test('getting code', async () => {
        const client = new Client({
            ...config,
            auth: {
                ...config.auth,
                server: {
                    port: 3000
                }
            }
        });
        const url = client.auth.getUrl();
        console.log({url});

        const data = await new Promise(resolve => {
            client.connection.on('authServer:code', resolve);
            client.connection.connect();
        });
        expect(data).toBeDefined();
        await delay(1000);
    });

    test('getting token', async () => {
        const client = new Client({
            ...config,
            auth: {
                ...config.auth,
                server: {
                    port: 3000
                }
            }
        });
        const url = client.auth.getUrl();
        console.log({url});

        const data = await new Promise(resolve => {
            client.token.on('change', resolve);
            client.connection.connect();
        });
        expect(data).toBeDefined();
        await delay(1000);
    });
});