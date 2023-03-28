// экземпляр Client
const { client } = require('../client');

const run = async () => {
    const company = new client.Company;
    company.name = 'Elvis Forever';

    await company.save();

    const lead = new client.Lead;
    lead.name = 'Elvis House';

    // К сделке можно прикрепить только ранее созданные компании.
    lead.embeddedCompanies.add([
        company
    ]);
    // Прикреплённые контакты необходимо сохранить
    await lead.save();

    // для отображения прикреплённых компаний, используйте параметр with (доступен в методах get, getById)
    const leads = client.leads.get({
        limit: 2,
        with: ['companies']
    });

    // прикреплённые компании первой сделки
    const companies = leads[0].embeddedCompanies.get();
}

run();