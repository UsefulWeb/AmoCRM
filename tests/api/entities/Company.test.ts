
import { Client } from "../../../src/Client";
import config, { CODE } from "../../config";
import { connect } from "../../util";
import {ILead} from "../../../src/api/activeRecords/Lead";
import {GetWith} from "../../../src/api/factories/mixins/hasGetById";
jest.setTimeout(60 * 1000);

let client: Client;

beforeEach(() => {
    client = connect(new Client(config));
});

describe('Company', () => {
    test('adds embedded company for lead', async () => {
        const [company] = await client.companies.create([
            {
                name: 'Company ' + (new Date).toJSON()
            }
        ]);

        const lead = new client.Lead({
            name: 'Lead ' + (new Date).toJSON()
        });

        lead.embeddedCompanies.add([{
            id: company.id
        }]);

        expect(lead.embeddedCompanies.length).toEqual(1);

        const { id = -1 } = await lead.save();

        const savedLead: ILead = <never>await client.leads.getById(id, {
            with: [GetWith.COMPANIES]
        });

        expect(savedLead.embeddedCompanies.length).toEqual(1);
    });
});