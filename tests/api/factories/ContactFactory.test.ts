
import { Client } from "../../../src/Client";
import { ltsConfig } from "../../config";
jest.setTimeout(60 * 1000);

let client: Client;

beforeEach(() => {
    client = new Client(ltsConfig);
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
});