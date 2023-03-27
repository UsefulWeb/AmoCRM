
import { Client } from "../../../src/Client";
import config, { CODE } from "../../config";
import { connect } from "../../util";
import {ITaggedClient} from "../../../src/plugins/hasUpdatableTags";
import {ILead} from "../../../src/api/activeRecords/Lead";
import {delay} from "../../../src/util";
jest.setTimeout(60 * 1000);

let client: Client;

beforeEach(() => {
    client = connect(new Client(config));
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

    test('adds embedded contact for lead', async () => {
        const [contact] = await client.contacts.create([
            {
                name: 'Contact ' + (new Date).toJSON()
            }
        ]);

        const lead = new client.Lead({
            name: 'Lead ' + (new Date).toJSON()
        });

        lead.embeddedContacts.add([{
            id: contact.id,
            is_main: true
        }]);

        expect(lead.embeddedContacts.length).toEqual(1);

        const { id = -1 } = await lead.save();

        await delay(500);
        const savedLead: ILead = <never>await client.leads.getById(id, {
            with: ['contacts']
        });
        expect(savedLead.embeddedContacts.length).toEqual(1);
    });
});