// экземпляр Client
const { client } = require('../client');

const run = async () => {
    // Создаём новую компанию в CRM
    const [company] = await client.companies.create([
        {
            name: 'Walter Scott',
        },
    ]);

    // создаём задачу для этой компании
    const [createdTask] = await company.tasks.create([
        {
            text: 'company task',
            complete_till: 2280001362
        }
    ]);

    // получаем список задач, связанных с этой компанией
    const [leadTask] = await company.tasks.get();

    console.log(leadTask.id === createdTask.id)

    // другой способ создания задачи для этой компании
    const [createdTask2] = new company.Task({
        text: 'company task',
        complete_till: 2280001362
    });

    createdTask2.save();
};

run();