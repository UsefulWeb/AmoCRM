// экземпляр Client
const { client } = require('../client');

const run = async () => {
    // постраничная навигация задач. Подробный пример рассмотрен в ./001-tasks-pagination.js
    const pagination = await client.tasks.get();

    /* Поиск задач по id */
    // получить объект Task по id
    const task = await client.tasks.getById(123);
    task.text = 'Updated Task Text';
    task.complete_till = 2280001362;

    await task.save();
    /*
        базовые методы работы с объектом Task описаны
        - в README
        - в примере 003-tasks-entity.js
     */

    /* Создание задач */
    /*
        Создаёт две задачи, возвращает массив Task с добавленными задачами.
    */
    const tasks = await client.tasks.create([
        {
            text: 'Global task 1',
            complete_till: 2280001362,
        },
        {
            text: 'Global task 2',
            complete_till: 2280001362
        }
    ]);

    const task1 = tasks[0];
    task1.complete_till = 2280001571;
    await task1.save();

    const newTask = new client.Task;

    // в конструктор можно передавать объекты Task
    const anotherTasks = await client.tasks.create([
        {
            text: 'Global task',
            complete_till: 2280001362
        },
        newTask
    ]);

    /* Обновление задач */
    /*
        Как и в create, туда можно передавать объекты Task существующих в AmoCRM задач.
    */
    const existingTask = await client.tasks.getById(123);

    const updatedTasks = await client.tasks.update([
        {
            id: 123,
            text: 'Global task 2',
            complete_till: 2280001362
        },
        existingTask
    ]);

    const updatedTask2 = updatedTasks[1];
    updatedTask2.text = 'Updated Task Text';
    updatedTask2.com = 2280001362;
    await updatedTask2.save();
}
run();