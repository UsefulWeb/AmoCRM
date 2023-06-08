import {Client, IClient} from "../../../src/Client";
import config, { CODE } from "../../config";
import { connect } from "../../util";
jest.setTimeout(60 * 1000);

let client: IClient;

beforeEach(() => {
    client = connect(new Client(config));
});

describe('TagsFactory', () => {
    test('create tags for leads', async () => {
        const attributes = {
            name: 'Очень важно',
            color: 'DDEBB5'
        };

        const [tag] = await client.leads.tags.create([
            attributes
        ]);

        expect(tag.name).toEqual(attributes.name);
    });

    test('get created tag for leads', async () => {
        const attributes = {
            name: 'Очень важно',
            color: 'DDEBB5'
        };

        await client.leads.tags.create([
            attributes
        ]);

        const [tag] = await client.leads.tags.get();

        expect(tag.name).toEqual(attributes.name);
    });
});