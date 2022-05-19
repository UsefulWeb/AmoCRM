import "./bootstrap";
import config from "./config";
import Client from "../src/Client";

describe('Client', () => {
    test('basic creation', () => {
        const client = new Client(config);
        expect(client).toBeDefined();
    });
    test('request object accessible', () => {
        const client = new Client(config);
        expect(client.request).toBeDefined();
    });
    test('empty config', async () => {
        expect(() => {
            new Client;
        }).toThrowError(new Error('NO_OPTIONS'));
    });
    test('empty auth config', async () => {
        const client = new Client({});
        client.connection.connect()
            .catch(e => {
                console.log(e);
                expect(e).toEqual({
                    error: 'NO_AUTH_OPTIONS'
                })
            });
    });
    test('multiple configs', async () => {
        const client1 = new Client({
            domain: 'domain1',
        });
        const client2 = new Client({
            domain: 'domain2'
        });
        const env1 = client1.environment.get();
        const env2 = client2.environment.get();
        expect(env1).not.toStrictEqual(env2);
    });

    test('multiple configs', async () => {
        const client1 = new Client({
            domain: 'domain1',
        });
        const client2 = new Client({
            domain: 'domain2'
        });
        const env1 = client1.environment.get();
        const env2 = client2.environment.get();
        expect(env1).not.toStrictEqual(env2);
    });
})