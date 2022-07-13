import * as fs from "fs";
import * as path from "path";

import Client from "../../src/Client";
import config from "../config";
import ResourcePagination from "../../src/api/ResourcePagination";

jest.setTimeout(60 * 1000);

let client: Client;

beforeEach(() => {
    const file = path.resolve(__dirname, '../token.json');
    const json = fs.readFileSync(file).toString();
    const data = JSON.parse(json);
    client = new Client(config);
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
    test('check first result', async () => {
        const leads = await client.leads.get();
        const [lead] = leads.getData();
        expect(typeof lead.id).toBe('number');
    });
    test('page number changes', async () => {
        const pagination = await client.leads.get({
            limit: 1
        });
        await pagination.next();
        expect(pagination.getPage()).toBe(2);
    });
    test('paged leads must changes', async () => {
        const leads = await client.leads.get({
            limit: 1
        });
        const [lead1] = leads.getData();
        await leads.next();
        const [lead2] = leads.getData();

        expect(lead1.id).not.toEqual(lead2.id);
    });
});