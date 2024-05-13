import { Client } from "../../../src/Client";
import { ltsConfig } from "../../config";
jest.setTimeout(60 * 1000);

let client: Client;

beforeEach(() => {
    client = new Client(ltsConfig);
});

describe('CompanyFactory', () => {
    test('create with no params', async () => {
        const [company] = await client.companies.create([
            {}
        ]);
        const { id = -1 } = company;
        const found = await client.companies.getById(id);
        expect(company.id).toEqual(found?.id);
    });
    test('findById', async () => {
        const companys = await client.companies.get({
            limit: 1
        });
        const [company] = companys.getData();
        const { id = -1 } = company;
        const found = await client.companies.getById(id);
        expect(found?.id).toEqual(company.id);
    });
    test('create with name', async () => {
        const [company] = await client.companies.create([
            {
                name: 'Walter Scott'
            }
        ]);
        const { id = -1 } = company;
        const found = await client.companies.getById(id);
        expect(found?.name).toEqual('Walter Scott');
    });
});