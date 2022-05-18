import "./bootstrap";
import Client from "../src/Client";

describe('Client', () => {
    test('basic creation', () => {
        const client = new Client({
            domain: 'test',
        });
        expect(client).toBeDefined();
    });
})