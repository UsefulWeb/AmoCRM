import * as fs from "fs";
import * as path from "path";

import {Client, IClient} from "../../../src/Client";
import config, { CODE } from "../../config";
import {connect, tomorrow, uniqId} from "../../util";
import {
    hasUpdatableTags, ITaggedClient,
    ITaggedClientConstructors
} from "../../../src/plugins/hasUpdatableTags";
import {ILead} from "../../../src/api/activeRecords/Lead";
import {IEmbeddedTag} from "../../../src/api/activeRecords/Tag";
import {ITask} from "../../../src/api/activeRecords/Task";
jest.setTimeout(60 * 1000);

let client: IClient;
const TaggedClient = hasUpdatableTags(Client);

beforeEach(() => {
    client = connect(new Client(config));
});

describe('Task', () => {
    test('create global task', async () => {
        const task = new client.Task({
            text: 'Global task instance',
            complete_till: tomorrow()
        });

        await task.save();

        expect(task.id).toBeDefined();
    });

    test.only('create lead task', async () => {
        const id = uniqId();
        const lead = new client.Lead({
            name: 'Test Lead ' + id
        });
        await lead.save();

        const [createdTask] = await lead.tasks.create([
            {
                text: 'Test instance task for Lead' + id,
                complete_till: tomorrow()
            }
        ]);

        const [task] = await lead.tasks.get();
        expect(createdTask.id).toBe(task.id);
    });
});