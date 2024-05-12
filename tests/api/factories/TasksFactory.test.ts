import {Client, IClient} from "../../../src/Client";
import { ltsConfig } from "../../config";
import {tomorrow} from "../../util";
import {LeadAttributes} from "../../../src/api/activeRecords/Lead";
import {TaskAttributes} from "../../../src/api/activeRecords/Task";
jest.setTimeout(60 * 1000);

let client: IClient;

beforeEach(() => {
    client = new Client(ltsConfig);
});

describe('TasksFactory', () => {
    test('create global task', async () => {
        const attributes = {
            text: 'Test task',
            complete_till: tomorrow()
        };

        const [createdTask] = await client.tasks.create([
            attributes
        ]);

        expect(createdTask.id).toBeDefined();

        const { id = -1 } = createdTask;

        const task = await client.tasks.getById(id);

        expect(task).toBeDefined();
        expect(task?.text).toBe(attributes.text);
    });

    test('create lead task', async () => {
        const leadAttributes: LeadAttributes = {
            name: 'Lead for Task'
        };
        const [lead] = await client.leads.create([
            leadAttributes
        ]);

        const taskAttributes: TaskAttributes = {
            text: 'Lead Task',
            entity_id: lead.id,
            complete_till: tomorrow()
        }

        const [task] = await client.leads.tasks.create([
            taskAttributes
        ]);

        expect(task).toBeDefined();
        expect(task.id).toBeDefined();
    });

    test('avoid side effects', async () => {
        const leadAttributes: LeadAttributes = {
            name: 'Lead for Task'
        };

        const [lead] = await client.leads.create([
            leadAttributes
        ]);

        const taskAttributes: TaskAttributes = {
            text: 'Lead Task',
            entity_id: lead.id,
            complete_till: tomorrow()
        }

        const [task] = await client.leads.tasks.create([
            taskAttributes
        ]);

        expect(task).toBeDefined();
        expect(task.id).toBeDefined();

        const [globalTask] = await client.tasks.create([{
            text: 'Global Task',
            complete_till: tomorrow()
        }]);

        expect(globalTask.entity_id).toBeUndefined();
        expect(globalTask.entity_type).toBeUndefined();
    })
});