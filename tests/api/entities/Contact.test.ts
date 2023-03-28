
import { Client } from "../../../src/Client";
import config, { CODE } from "../../config";
import { connect } from "../../util";
import {ITaggedClient} from "../../../src/plugins/hasUpdatableTags";
import {ILead} from "../../../src/api/activeRecords/Lead";
import {delay} from "../../../src/util";
import {GetWith} from "../../../src/api/factories/mixins/hasGetById";
jest.setTimeout(60 * 1000);

let client: Client;

beforeEach(() => {
    client = connect(new Client(config));
});

describe('Contact', () => {
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

        const savedLead: ILead = <never>await client.leads.getById(id, {
            with: [GetWith.CONTACTS]
        });
        expect(savedLead.embeddedContacts.length).toEqual(1);
    });
});