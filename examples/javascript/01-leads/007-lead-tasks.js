// экземпляр Client
const { client } = require('../client');

const run = async () => {
    // Создаём новую сделку в CRM
    const [lead] = await client.leads.create([
        {
            name: 'Walter Scott',
        },
    ]);

    // создаём задачу для этой сделки
    const [createdTask] = await lead.tasks.create([
        {
            text: 'Lead task',
            complete_till: 2280001362
        }
    ]);

    // получаем список задач, связанных с этой сделкой
    const [leadTask] = await lead.tasks.get();

    console.log(leadTask.id === createdTask.id) // true

    // другой способ создания задачи для этой сделки
    const [createdTask2] = new lead.Task({
        text: 'Lead task',
        complete_till: 2280001362
    });

    createdTask2.save();
};

run();