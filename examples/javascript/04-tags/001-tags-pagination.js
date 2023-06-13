// экземпляр Client
const { client } = require('../client');

const run = async () => {
    /*
        Список тегов прикреплён к контактам, сделкам, компаниям и т.д.
        Поэтому необходимо вызывать метод get в привязке к какой-то сущности:
        client.contacts, client.leads, client.companies и т.д.
    */
    const pagination = await client.leads.tags.get();

    // загрузить данные следующей страницы. Возвращает false, если данных нет
    await pagination.next();

    // номер текущей страницы
    const currentPage = pagination.getPage();

    // данные второй страницы
    const tags2 = pagination.getData();

    // другой способ получить массив объектов Tag. Возвращает false, если данных нет
    const tags3 = await pagination.next();

    await pagination.next();
}

run();