const client = require('../client');

const run = async () => {
    /*
        Подробное описание методов и их аргументов описано в
        https://usefulweb.github.io/AmoCRM/classes/api_factories_LeadFactory.LeadFactory.html
    */
    // постраничная навигация сделок. Подробный пример рассмотрен в ./001-leads-pagination.js
    const pagination = await client.leads.get();

    /* Поиск сделок по id */
    // получить объект lead по id
    const lead = client.leads.getById(123);
    lead.name = 'Walter Scott';
    await lead.save();
    /*
        базовые методы работы с объектом Lead описаны
        - в README
        - в примере 003-lead-entity.js
        - на сайте библиотеки https://usefulweb.github.io/AmoCRM/classes/api_activeRecords_Lead.Lead.html
     */

    /* Создание сделок */
    /*
        Создаёт две сделки, возвращает массив Lead с добавленными сделками.
        Параметры совпадают с https://www.amocrm.ru/developers/content/crm_platform/leads-api#leads-add
    */
    const leads = await client.leads.create([
        {
            name: "Lead 1"
        },
        {
            name: "Lead 2"
        }
    ]);

    const lead1 = leads[0];
    lead1.price = 350;
    await lead1.save();

    const newLead = new client.Lead;

    // в конструктор можно передавать объекты Lead
    const anotherLeads = await client.leads.create([
        {
            name: "Lead 1"
        },
        newLead
    ]);

    /* Обновление сделок */

    /*
        Как и в create, туда можно передавать объекты Lead существующих в AmoCRM сделок.
        Параметры совпадают с https://www.amocrm.ru/developers/content/crm_platform/leads-api#leads-edit
    */
    const existingLead = await client.leads.getById(123);

    const updatedLeads = await client.leads.update([
        {
            id: 122,
            name: 'Walter Scott'
        },
        existingLead
    ]);

    const updatedLead2 = updatedLeads[1];
    updatedLead2.name = 'Updated Name';
    updatedLead2.price = 100;
    await updatedLead2.save();
}
run();