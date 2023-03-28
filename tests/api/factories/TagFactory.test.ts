import * as fs from "fs";
import * as path from "path";

import {Client, IClient} from "../../../src/Client";
import config, { CODE } from "../../config";
import { connect } from "../../util";
import {
    hasUpdatableTags, ITaggedClient,
    ITaggedClientConstructors
} from "../../../src/plugins/hasUpdatableTags";
import {ILead} from "../../../src/api/activeRecords/Lead";
import {IEmbeddedTag} from "../../../src/api/activeRecords/Tag";
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

        const [tag] = await client.leads.tagList.create([
            attributes
        ]);

        expect(tag.name).toEqual(attributes.name);
    });

    test('get created tag for leads', async () => {
        const attributes = {
            name: 'Очень важно',
            color: 'DDEBB5'
        };

        await client.leads.tagList.create([
            attributes
        ]);

        const [tag] = await client.leads.tagList.get();

        expect(tag.name).toEqual(attributes.name);
    });
});