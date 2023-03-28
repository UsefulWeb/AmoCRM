// экземпляр Client
const { client } = require('../client');

const run = async () => {
    const contact = new client.Contact;
    contact.name = 'Elvis Presley';

    await contact.save();

    const lead = new client.Lead;
    lead.name = 'Elvis House';

    // К сделке можно прикрепить только ранее созданные контакты.
    lead.embeddedContacts.add([
        contact
    ]);
    // Прикреплённые контакты необходимо сохранить
    await lead.save();

    // для отображения прикреплённых контактов, используйте параметр with (доступен в методах get, getById)
    const leads = client.leads.get({
        limit: 2,
        with: ['contacts']
    });

    // прикреплённые контакты первой сделки
    const contacts = leads[0].embeddedContacts.get();
};

run();