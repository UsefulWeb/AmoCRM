// экземпляр Client
const { client } = require('../client');

const run = async () => {
    /*
        Подробное описание методов и их аргументов описано в
        https://usefulweb.github.io/AmoCRM/classes/api_factories_ContactFactory.ContactFactory.html
    */
    // постраничная навигация сделок. Подробный пример рассмотрен в ./001-contacts-pagination.js
    const pagination = await client.contacts.get();

    /* Поиск сделок по id */
    // получить объект lead по id
    const contact = await client.contacts.getById(123);
    contact.first_name = 'Walter';
    await contact.save();
    /*
        базовые методы работы с объектом Lead описаны
        - в README
        - в примере 003-lead-entity.js
        - на сайте библиотеки https://usefulweb.github.io/AmoCRM/classes/api_activeRecords_Contact.Contact.html
     */

    /* Создание сделок */
    /*
        Создаёт две сделки, возвращает массив Lead с добавленными сделками.
        Параметры совпадают с https://www.amocrm.ru/developers/content/crm_platform/contacts-api#contacts-add
    */
    const contacts = await client.contacts.create([
        {
            first_name: "Lead 1"
        },
        {
            first_name: "Contact2"
        }
    ]);

    const contact1 = contacts[0];
    contact1.last_name = 'LastName';
    await contact1.save();

    const newContact = new client.Lead;

    // в конструктор можно передавать объекты Lead
    const anotherLeads = await client.contacts.create([
        {
            first_name: "Contact1"
        },
        newContact
    ]);

    /* Обновление сделок */

    /*
        Как и в create, туда можно передавать объекты Lead существующих в AmoCRM сделок.
        Параметры совпадают с https://www.amocrm.ru/developers/content/crm_platform/contacts-api#contacts-edit
    */
    const existingContact = await client.contacts.getById(123);

    const updatedContacts = await client.contacts.update([
        {
            id: 122,
            first_name: 'Walter'
        },
        existingContact
    ]);

    const updatedContact2 = updatedContacts[1];
    updatedContact2.first_name = 'UpdatedName';
    updatedContact2.last_name = 'Petrov';
    await updatedContact2.save();
}
run();