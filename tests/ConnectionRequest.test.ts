import { Client } from "../dist/Client";
import config, { CODE } from "./config";
import * as fs from "fs";
import * as path from "path";

jest.setTimeout(60 * 1000);

describe('ConnectionRequest', () => {
    test('get account info',async () => {
        const client = new Client({
            ...config,
            auth: {
                ...config.auth,
                code: CODE
            }
        });
        const account = await client.request.get('/api/v4/account');

        expect(account.data).toBeDefined();
    });

    test('get account info with query string with token',async () => {
        const client = new Client({
            ...config,
            auth: {
                ...config.auth,
            }
        });
        const file = path.resolve(__dirname, 'token.js');
        const tokenData = fs.readFileSync(file).toString();
        const token = JSON.parse(tokenData);
        client.token.setValue(token);
        const account: any = await client.request.get('/api/v4/account?with=version');
        const { data } = account;
        expect(data.version).toBeDefined();
    });


});