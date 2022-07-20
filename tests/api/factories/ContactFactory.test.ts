import * as fs from "fs";
import * as path from "path";

import Client from "../../../src/Client";
import config, { CODE } from "../../config";
import { connect } from "../../util";
jest.setTimeout(60 * 1000);

let client: Client;

beforeEach(() => {
    client = connect({
        ...config,
        auth: {
            ...config.auth,
            // code: CODE
        }
    });
});

describe('ContactFactory', () => {
    test('create with no params', async () => {
        const [contact] = await client.contacts.create([
            {}
        ]);
        const { id = -1 } = contact;
        const found = await client.contacts.getById(id);
        expect(contact.id).toEqual(found?.id);
    });
    test('findById', async () => {
        const contacts = await client.contacts.get({
            limit: 1
        });
        const [contact] = contacts.getData();
        const { id = -1 } = contact;
        const found = await client.contacts.getById(id);
        expect(found?.id).toEqual(contact.id);
    });
    test('create with name', async () => {
        const [contact] = await client.contacts.create([
            {
                name: 'Walter Scott'
            }
        ]);
        const { id = -1 } = contact;
        const found = await client.contacts.getById(id);
        expect(found?.name).toEqual('Walter Scott');
    });
});