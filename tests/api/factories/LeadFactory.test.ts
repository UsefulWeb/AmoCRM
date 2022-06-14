import * as fs from "fs";
import * as path from "path";

import Client from "../../../src/Client";
import config from "../../config";
jest.setTimeout(60 * 1000);

let client: Client;

beforeEach(() => {
    const file = path.resolve(__dirname, '../../token.js');
    const json = fs.readFileSync(file).toString();
    const data = JSON.parse(json);
    client = new Client({
        ...config,
        auth: {
            ...config.auth,
            code: undefined
        }
    });
    client.token.setValue(data);

    client.token.on('change', () => {
        const token = client.token.getValue();
        const data = JSON.stringify(token);
        const file = path.resolve(__dirname, 'token.js');
        fs.writeFileSync(file, data);
    });
});

describe('LeadFactory', () => {
    test('findById', async () => {
        const leads = await client.leads.get({
            limit: 1
        });
        const [lead] = leads.getData();
        const { id = -1 } = lead;
        const found = await client.leads.getById(id);
        expect(found?.id).toEqual(lead.id);
    });
    test('create with no params', async () => {
        const [lead] = await client.leads.create([
            {}
        ]);
        const { id = -1 } = lead;
        const found = await client.leads.getById(id);
        expect(lead.id).toEqual(found.id);
    });
});