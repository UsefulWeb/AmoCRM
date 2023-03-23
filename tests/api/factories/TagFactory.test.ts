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

    test('adds embedded tag for lead', async () => {
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

        expect(lead.embeddedTags.get().length).toEqual(0);

        lead.embeddedTags.add([tag]);

        expect(lead.embeddedTags.get().length).toEqual(1);

        const { id = -1} = await lead.save();

        const existingLead = await client.leads.getById(id);

        expect(existingLead).not.toBeNull();

        const length = existingLead && existingLead.embeddedTags.get().length;

        expect(length).toEqual(1);
    });

    test.only('remove some tags for lead', async () => {
        const attributes = [
            {
                name: 'Tag 1',
                color: 'DDEBB5'
            },
            {
                name: 'Tag 2',
                color: 'DDEBB5'
            },
            {
                name: 'Tag 3',
                color: 'DDEBB5'
            },
        ];

        const tags = await client.leads.tagList.add(attributes);

    });
});