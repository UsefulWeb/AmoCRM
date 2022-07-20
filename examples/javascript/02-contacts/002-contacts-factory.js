// экземпляр Client
const { client } = require('../client');

const run = async () => {
    /*
        Подробное описание методов и их аргументов описано в
        https://usefulweb.github.io/AmoCRM/classes/api_factories_ContactFactory.ContactFactory.html
    */
    // постраничная навигация контактов. Подробный пример рассмотрен в ./001-contacts-pagination.js
    const pagination = await client.contacts.get();

    /* Поиск контактов по id */
    // получить объект contact по id
    const contact = await client.contacts.getById(123);
    contact.first_name = 'Walter';
    await contact.save();
    /*
        базовые методы работы с объектом Contact описаны
        - в README
        - в примере 003-contact-entity.js
        - на сайте библиотеки https://usefulweb.github.io/AmoCRM/classes/api_activeRecords_Contact.Contact.html
     */

    /* Создание контактов */
    /*
        Создаёт два контакта, возвращает массив Contact с добавленными контактами.
        Параметры совпадают с https://www.amocrm.ru/developers/content/crm_platform/contacts-api#contacts-add
    */
    const contacts = await client.contacts.create([
        {
            first_name: "Contact 1"
        },
        {
            first_name: "Contact2"
        }
    ]);

    const contact1 = contacts[0];
    contact1.last_name = 'LastName';
    await contact1.save();

    const newContact = new client.Contact;

    // в конструктор можно передавать объекты Contact
    const anotherContacts = await client.contacts.create([
        {
            first_name: "Contact1"
        },
        newContact
    ]);

    /* Обновление контактов */

    /*
        Как и в create, туда можно передавать объекты Contact существующих в AmoCRM контактов.
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