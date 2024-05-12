import {Client, IClient} from "../../../src/Client";
import { ltsConfig } from "../../config";
import {tomorrow, uniqId} from "../../util";
import {
    hasUpdatableTags,
} from "../../../src/plugins/hasUpdatableTags";
import {ILead} from "../../../src/api/activeRecords/Lead";
import {ITask} from "../../../src/api/activeRecords/Task";
jest.setTimeout(60 * 1000);

let client: IClient;
const TaggedClient = hasUpdatableTags(Client);

beforeEach(() => {
    client = new Client(ltsConfig);
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

    test('create lead task', async () => {
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

    test('check linked lead', async () => {
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

        const taskDetails = await createdTask.fetch() as ITask;

        const linkedLead = await taskDetails.entity.get<ILead>();

        expect(linkedLead?.id).toBe(lead?.id);
    });
});