import * as fs from "fs";
import * as path from "path";

import { Client } from "../../../src/Client";
import config, { CODE } from "../../config";
import { connect } from "../../util";
import {ILead} from "../../../src/api/activeRecords/Lead";
jest.setTimeout(60 * 1000);

let client: Client;

beforeEach(() => {
    client = connect(
        new Client({
            ...config,
            auth: {
                ...config.auth,
                // code: CODE
            }
        })
    );
});
describe('LeadFactory', () => {
    test('create with no params', async () => {
        const [lead] = await client.leads.create([
            {}
        ]);
        const { id = -1 } = lead;
        const found = await client.leads.getById(id);
        expect(lead.id).toEqual(found?.id);
    });

    test('findById', async () => {
        const leads = await client.leads.get({
            limit: 1
        });
        const [lead] = leads.getData();
        const { id = -1 } = lead;
        const found = await client.leads.getById(id);
        expect(found?.id).toEqual(lead.id);
    });

    test.only('find non existing lead', async () => {
        const [lead] = await client.leads.create([
            {}
        ]);
        const [found] = await client.leads.get({
            query: Math.random().toString(36).slice(2)
        });
        expect(found).not.toBeDefined();
    });
});