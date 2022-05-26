import Connection from "../src/common/Connection";
import Client from "../src/Client";
import config, { CODE } from "./config";
import APIResponseError from "../src/common/APIResponseError";

let url;
// jest.setTimeout(60 * 1000);
jest.setTimeout(60 * 60  * 1000);

describe('Token', () => {
    test('throws no code error', () => {
        const client = new Client({
            ...config,
            auth: {
                ...config.auth,
                code: ''
            }
        });
        expect.assertions(1);
        return client.connection.connect()
            .catch(e => {
                expect(e.message).toMatch('NO_AUTH_CODE');
            })
    });
    test('throw api response error', async () => {
        const client = new Client({
            ...config,
            auth: {
                client_id: 'wrong',
                client_secret: 'wrong',
                redirect_uri: 'wrong',
                code: 'wrong_code'
            }
        });
        expect.assertions(1);
        return client.connection.connect()
            .catch(e => {
                expect(e.message).toMatch('API_RESPONSE_ERROR');
            });
    });
    test.only('connect with code', async () => {
        const client = new Client({
            ...config,
            auth: {
                ...config.auth,
                code: CODE
            }
        });
        const url = client.auth.getUrl();
        console.log({url});
        const connected = await client.connection.connect();
        expect(connected).toBe(true);
    });
});