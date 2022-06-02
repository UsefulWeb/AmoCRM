import * as fs from "fs";
import * as path from "path";

import Client from "../../src/Client";
import config from "../config";
import ResourcePagination from "../../dist/api/ResourcePagination";
import Lead from "../../dist/api/activeRecords/Lead";

jest.setTimeout(60 * 1000);

let client: Client;

beforeEach(() => {
    const file = path.resolve(__dirname, '../token.json');
    const json = fs.readFileSync(file).toString();
    const data = JSON.parse(json);
    client = new Client(config);
    client.token.setValue(data);
});

describe('ResourcePagination',() => {
    test('check existence', async () => {
        expect(client.leads).toBeDefined();
    });
    test('check base result', async () => {
        const leads = await client.leads.get();
        expect(leads.constructor.name).toBe(ResourcePagination.name);
    });
    test('check page', async () => {
        const leads = await client.leads.get();
        expect(leads.getPage()).toBe(1);
    });
    test.only('check first result', async () => {
        const leads = await client.leads.get();
        const [lead] = leads.getData();
        expect(typeof lead.id).toBe('number');
    });
});