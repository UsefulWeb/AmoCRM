import {Client, IClient} from "../../../src/Client";
import config, { CODE } from "../../config";
import {connect, tomorrow} from "../../util";
import {LeadAttributes} from "../../../src/api/activeRecords/Lead";
import {TaskAttributes} from "../../../src/api/activeRecords/Task";
jest.setTimeout(60 * 1000);

let client: IClient;

beforeEach(() => {
    client = connect(new Client(config));
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
});