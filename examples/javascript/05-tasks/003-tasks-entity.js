// экземпляр Client
const { client } = require('../client');

const run = async () => {
    /*
      базовые методы работы с объектом Task описаны в интерфейсе ITask
      на сайте библиотеки https://usefulweb.github.io/AmoCRM/interfaces/api_activeRecords_Task.ITask.html
   */
    const task = await client.tasks.getById(123);
    task.text = 'Updated Task Text';
    task.complete_till = 2280001362;

    await task.save();

    // вы можете менять и читать любые свойства задачи, которые передаются при её создании и обновлении
    console.log(task.id); // 123

    /* Создание новой задачи */
    const newTask1 = new client.Task;

    // является ли задача новой (на основе наличия id у объекта)
    task.isNew(); // true

    newTask1.text = 'Updated Task Text';
    await newTask1.save();
    task.isNew(); // false

    // вы можете передать параметры задачи объектом
    const newTask2 = new client.Task({
        text: 'Task Text'
    });

    newTask2.complete_till = 2280001362;
    await newTask2.save();

    // ... спустя какое-то время задача может обновиться на сервере
    // fetch обновит параметры текущей задачи
    const fetchedTask = await newTask2.fetch();
};

run();