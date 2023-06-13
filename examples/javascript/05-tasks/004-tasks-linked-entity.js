// экземпляр Client
const { client } = require('../client');
const {tomorrow} = require("../../../tests/util");
const {ITask} = require("../../../src/api/activeRecords/Task");
const {ILead} = require("../../../src/api/activeRecords/Lead");

const run = async () => {
    const task = await client.tasks.getById(123);

    // получит связанную сущность, к которой прикреплена задача: сделка, контакт, компания, покупатель
    const entity = await task.entity.get();

    // к примеру, создадим и сразу сохраним сделку
    const lead = new client.Lead({
        name: 'Test Lead #1'
    });
    await lead.save();

    // добавим сделке задачу
    const [createdTask] = await lead.tasks.create([
        {
            text: 'Test instance task for Lead #1',
            complete_till: 2280001362
        }
    ]);

    // получим все необходимые данные о задаче
    const taskDetails = await createdTask.fetch();

    // получим сделку через задачу
    const linkedLead = await taskDetails.entity.get();

    console.log(linkedLead.id === lead.id); // true
};

run();