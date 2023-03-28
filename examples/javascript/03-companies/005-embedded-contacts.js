// экземпляр Client
const { client } = require('../client');

const run = async () => {
    const contact = new client.Contact;
    contact.name = 'Elvis Presley';

    await contact.save();

    const company = new client.Company;
    company.name = 'Elvis House';

    // К компании можно прикрепить только ранее созданные контакты.
    company.embeddedContacts.add([
        contact
    ]);
    // Прикреплённые контакты необходимо сохранить
    await company.save();

    // для отображения прикреплённых контактов, используйте параметр with (доступен в методах get, getById)
    const companies = client.leads.get({
        limit: 2,
        with: ['contacts']
    });

    // прикреплённые контакты первой сделки
    const contacts = companies[0].embeddedContacts.get();
};

run();