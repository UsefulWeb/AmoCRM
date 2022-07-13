// экземпляр Client
const { client } = require('../client');

const run = async () => {

    // постраничная навигация сделок
    const pagination = await client.leads.get();

    // массив объектов Lead на текущей странице
    const leads = pagination.getData();

    // загрузить данные следующей страницы. Возвращает false, если данных нет
    await pagination.next();

    // номер текущей страницы
    const currentPage = pagination.getPage();

    // данные второй страницы
    const leads2 = pagination.getData();

    // другой способ получить массив объектов Lead. Возвращает false, если данных нет
    const leads3 = await pagination.next();

    await pagination.next();

    // загрузить данные предыдущей страницы. Возвращает false, если данных нет
    const prevLeads = await pagination.prev();

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

    // фильтр сделок, см. https://www.amocrm.ru/developers/content/crm_platform/leads-api#leads-list
    const criteria = {
        order: 'created_at',
        page: 2,
        query: 'Иванов'
    };
    // постраничная навигация сделок
    const pagination2 = await client.leads.get(criteria);
};

run();