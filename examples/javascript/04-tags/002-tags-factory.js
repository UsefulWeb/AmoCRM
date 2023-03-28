// экземпляр Client
const { client } = require('../client');

const run = async () => {
    // постраничная навигация тегов. Подробный пример рассмотрен в ./001-companies-pagination.js
    const pagination = await client.leads.tagList.get();

    /* Создание тегов для сущностей*/
    /*
        Создаёт два тега, возвращает массив Tag.
        Параметры совпадают с https://www.amocrm.ru/developers/content/crm_platform/tags-api#%D0%94%D0%BE%D0%B1%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D1%82%D0%B5%D0%B3%D0%BE%D0%B2-%D0%B4%D0%BB%D1%8F-%D0%BA%D0%BE%D0%BD%D0%BA%D1%80%D0%B5%D1%82%D0%BD%D0%BE%D0%B3%D0%BE-%D1%82%D0%B8%D0%BF%D0%B0-%D1%81%D1%83%D1%89%D0%BD%D0%BE%D1%81%D1%82%D0%B8
    */
    const tags = await client.leads.tagList.create([
        {
            name: "Tag 1",
            color: "0C7C59"
        },
        {
            name: "Tag 2",
            color: "90CDB0"
        }
    ]);
}

run();