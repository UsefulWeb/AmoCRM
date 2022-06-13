import "./bootstrap";
import config from "./config";
import { Client } from "../src/Client";
import { Client as ES6Client } from '../dist/Client';

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
            // @ts-ignore
            new Client;
        }).toThrowError(new Error('NO_OPTIONS'));
    });
    test('multiple configs', async () => {
        const client1 = new Client({
            domain: 'domain1',
            auth: config.auth
        });
        const client2 = new Client({
            domain: 'domain2',
            auth: config.auth
        });
        const env1 = client1.environment.get();
        const env2 = client2.environment.get();
        expect(env1).not.toStrictEqual(env2);
    });

    test('multiple configs', async () => {
        const client1 = new Client({
            domain: 'domain1',
            auth: config.auth
        });
        const client2 = new Client({
            domain: 'domain2',
            auth: config.auth
        });
        const env1 = client1.environment.get();
        const env2 = client2.environment.get();
        expect(env1).not.toStrictEqual(env2);
    });
    test('default ES6 import', async () => {
        const instance = new ES6Client({
            domain: 'test',
            auth: config.auth
        });
        expect(instance).toBeDefined();
    });
})