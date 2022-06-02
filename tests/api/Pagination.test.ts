import Client from "../../src/Client";
import config from "../config";
import * as fs from "fs";
import * as path from "path";

jest.setTimeout(60 * 1000);

let client: Client;

beforeEach(() => {
    const file = path.resolve(__dirname, '../token.json');
    const json = fs.readFileSync(file).toString();
    const data = JSON.parse(json);
    client = new Client(config);
    client.token.setValue(data);
});

describe('Pagination',() => {
    test('check existence', async () => {
        expect(client.leads).toBeDefined();
    });
    test.only('check existence', async () => {
        const leads = await client.leads.get();

        expect(leads).toBeInstanceOf(Array);
    });
});