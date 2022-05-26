import Client from "../src/Client";
import config, { CODE } from "./config";

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

    test.only('get account info with query string',async () => {
        const client = new Client({
            ...config,
            auth: {
                ...config.auth,
                code: CODE
            }
        });
        const account: any = await client.request.get('/api/v4/account?with=version');
        const { data } = account;
        expect(data.version).toBeDefined();
    });
});