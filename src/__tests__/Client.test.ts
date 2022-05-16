import Client from "../Client";

describe('Client', () => {
    test('basic creation', () => {
        const client = new Client({
            domain: 'test'
        });
        expect(client).toBeDefined();
    });
})