import "./bootstrap";
import config from "./config";
import { Client } from "../src/Client";

describe('Environment', () => {
    test('set', () => {
        const client = new Client(config);
        const value = 'newCode';
        client.environment.set('auth.code', value);
        const code = client.environment.get('auth.code');
        expect(code).toBe(value);
    });
})