// экземпляр Client
const { client } = require('../client');

const run = async () => {

    // постраничная навигация задач
    const pagination = await client.tasks.get();

    // массив объектов Task на текущей странице
    const tasks = pagination.getData();

    // загрузить данные следующей страницы. Возвращает false, если данных нет
    await pagination.next();

    // номер текущей страницы
    const currentPage = pagination.getPage();

    // данные второй страницы
    const tasks2 = pagination.getData();

    // другой способ получить массив объектов Task. Возвращает false, если данных нет
    const tasks3 = await pagination.next();

    await pagination.next();

    // загрузить данные предыдущей страницы. Возвращает false, если данных нет
    const prevTasks = await pagination.prev();

    // загрузить данные первой страницы. Возвращает false, если данных нет
    await pagination.first();

    // обновить данные на текущей странице. Возвращает false, если данных нет
    const refreshedData = await pagination.refresh();

    if (!pagination.hasNext()) {
        console.log('Невозможно перейти на следующую страницу');
    }
    if (!pagination.hasPrev()) {
        console.log('Невозможно перейти на предыдущую страницу');
    }
    if (!pagination.hasFirst()) {
        console.log('Невозможно перейти на первую страницу');
    }

    // фильтр задач
    const criteria = {
        order: 'created_at',
        page: 2,
        query: 'Иванов'
    };
    // постраничная навигация задач
    const pagination2 = await client.tasks.get(criteria);
};

run();