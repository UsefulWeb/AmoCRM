import * as fs from "fs";
import * as path from "path";
import './bootstrap';
import Client from "../src/Client";
import config, { CODE } from "./config";
import { ITokenData } from "../src/interfaces/common";

jest.setTimeout(60 * 1000);

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
    test('connect with code', async () => {
        const client = new Client({
            ...config,
            auth: {
                ...config.auth,
                code: CODE
            }
        });
        const connected = await client.connection.connect();
        expect(connected).toBe(true);
    });
    test('getting refresh token', async () => {
        const client = new Client({
            ...config,
            auth: {
                ...config.auth,
                code: CODE
            }
        });
        await client.connection.connect();
        const token = client.token.getValue();
        const now = new Date;
        const expired = new Date(now.valueOf() - 1000);
        client.token.setValue(<ITokenData>{
            ...token,
            expires_at: expired.valueOf()
        });
        await client.connection.update();
        const newToken = client.token.getValue();
        expect(token?.access_token).not.toBe(newToken?.access_token);
    });

    test('handle token after connection', async () => {
        const client = new Client({
            ...config,
            auth: {
                ...config.auth,
                code: CODE
            }
        });
        const token: ITokenData = await new Promise(resolve => {
            client.token.on('change', resolve);
            client.connection.connect();
        });
        const currentToken = client.token.getValue();
        expect(token?.access_token).toBe(currentToken?.access_token);
    });

    test('no need to update token when it not expired', async () => {
        const client = new Client({
            ...config,
            auth: {
                ...config.auth,
                code: CODE
            }
        });
        await client.connection.connect();
        const currentToken = client.token.getValue();
        await client.connection.update();
        const token = client.token.getValue();

        expect(currentToken?.access_token).toBe(token?.access_token);
    });

    test.only('storing', async () => {
        const client = new Client({
            ...config,
            auth: {
                ...config.auth,
                code: CODE
            }
        });

        await client.connection.connect();
        const token = client.token.getValue();
        const data = JSON.stringify(token);
        const file = path.resolve(__dirname, 'token.json');
        fs.writeFileSync(file, data);
        const json = fs.readFileSync(file);
        expect(json).toBeDefined();
    });
});