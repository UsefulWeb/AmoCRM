// экземпляр Client
const { client } = require('../client');

const run = async () => {
    // Создаём новый контакт в CRM
    const [contact] = await client.contacts.create([
        {
            name: 'Walter Scott',
        },
    ]);

    // создаём задачу для этого контакта
    const [createdTask] = await contact.tasks.create([
        {
            text: 'contact task',
            complete_till: 2280001362
        }
    ]);

    // получаем список задач, связанных с этим контактом
    const [contactTask] = await contact.tasks.get();

    console.log(contactTask.id === createdTask.id)

    // другой способ создания задачи для этого контакта
    const [createdTask2] = new contact.Task({
        text: 'contact task',
        complete_till: 2280001362
    });

    createdTask2.save();
};

run();