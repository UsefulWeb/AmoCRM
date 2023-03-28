// экземпляр Client
const { client } = require('../client');

const run = async () => {
    const company = new client.Company;
    company.name = 'Elvis Forever';

    await company.save();

    const contact = new client.Contact;
    contact.name = 'Elvis House';

    // К контакту можно прикрепить только ранее созданные компании.
    contact.embeddedCompanies.add([
        company
    ]);
    // Прикреплённые контакты необходимо сохранить
    await contact.save();

    // для отображения прикреплённых компаний, используйте параметр with (доступен в методах get, getById)
    const contacts = client.contacts.get({
        limit: 2,
        with: ['companies']
    });

    // прикреплённые компании первого контакта
    const companies = contacts[0].embeddedCompanies.get();
}

run();