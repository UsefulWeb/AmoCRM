// экземпляр Client
const { client } = require('../client');

const run = async () => {
    // постраничная навигация сделок
    const pagination = await client.companies.get();

    // массив объектов Company на текущей странице
    const companies = pagination.getData();

    // загрузить данные следующей страницы. Возвращает false, если данных нет
    await pagination.next();

    // номер текущей страницы
    const currentPage = pagination.getPage();

    // данные второй страницы
    const companies2 = pagination.getData();

    // другой способ получить массив объектов Company. Возвращает false, если данных нет
    const companies3 = await pagination.next();

    await pagination.next();

    // загрузить данные предыдущей страницы. Возвращает false, если данных нет
    const prevCompanies = await pagination.prev();

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

    // фильтр контактов, см. https://www.amocrm.ru/developers/content/crm_platform/companies-api#companies-list
    const criteria = {
        order: 'created_at',
        page: 2,
        query: 'Иванов'
    };
    // постраничная навигация контактов
    const pagination2 = await client.companies.get(criteria);
};

run();