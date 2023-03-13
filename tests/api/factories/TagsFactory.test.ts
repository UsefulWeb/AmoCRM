import * as fs from "fs";
import * as path from "path";

import Client from "../../../src/Client";
import config, { CODE } from "../../config";
import { connect } from "../../util";
jest.setTimeout(60 * 1000);

let client: Client;

beforeEach(() => {
    client = connect({
        ...config,
        auth: {
            ...config.auth,
            code: CODE
        }
    });
});

describe('TagsFactory', () => {
    test('create tags for leads', async () => {
        const [tag] = await client.leads.tagList.add([
            {
                name: 'Очень важно',
                color: 'DDEBB5'
            }
        ]);

        console.log({ tag });
    });
});