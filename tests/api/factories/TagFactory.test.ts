import * as fs from "fs";
import * as path from "path";

import {Client, IClient} from "../../../src/Client";
import config, { CODE } from "../../config";
import { connect } from "../../util";
import {
    hasUpdatableTags, ITaggedClient,
    ITaggedClientConstructors
} from "../../../src/plugins/hasUpdatableTags";
jest.setTimeout(60 * 1000);

let client: IClient;
const TaggedClient = hasUpdatableTags(Client);

beforeEach(() => {
    client = connect(new Client(config));
});

describe('TagsFactory', () => {
    test('create tags for leads', async () => {
        const attributes = {
            name: 'Очень важно',
            color: 'DDEBB5'
        };

        const [tag] = await client.leads.tagList.add([
            attributes
        ]);

        expect(tag.name).toEqual(attributes.name);
    });

    test('get created tag for leads', async () => {
        const attributes = {
            name: 'Очень важно',
            color: 'DDEBB5'
        };

        await client.leads.tagList.add([
            attributes
        ]);

        const [tag] = await client.leads.tagList.get();

        expect(tag.name).toEqual(attributes.name);
    });

    test.only('removes tag for leads', async () => {
        const client: ITaggedClient = connect(new TaggedClient(config));

        const attributes = {
            name: 'Тег',
            color: 'DDEBB5'
        };

        const [tag] = await client.leads.tagList.add([
            attributes
        ]);

        const lead = new client.Lead({
            name: 'test',
        });

        lead.embeddedTags.add([tag]);

        await lead.save();

        // lead.tagsList.set()
        // await client.leads.tagList.clearFor();

        // const pagination = await client.leads.tagList.get();
        // const { length } = pagination.getData();

        // expect(length).toEqual(0);
    });
});