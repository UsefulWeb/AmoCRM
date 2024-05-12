
import { Client } from "../../../src/Client";
import {ltsConfig} from "../../config";
import {ILead} from "../../../src/api/activeRecords/Lead";
import {GetWith} from "../../../src/api/factories/mixins/hasGetById";
jest.setTimeout(60 * 1000);

let client: Client;

beforeEach(() => {
    client = new Client(ltsConfig);
});

describe('Contact', () => {
    test('adds embedded contact for contact', async () => {
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

    test('adds task to contact', async () => {
        const [contact] = await client.contacts.create([
            {
                name: 'Walter Scott',
            },
        ]);

        // создаём задачу для этого контакта
        const [createdTask] = await contact.tasks.create([
            {
                text: 'contact task',
                complete_till: 2280001362
            }
        ]);

        // получаем список задач, связанных с этим контактом
        const [contactTask] = await contact.tasks.get();

        expect(contactTask.id).toEqual(createdTask.id);
    });
});