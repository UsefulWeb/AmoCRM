// экземпляр Client
const { client } = require('../client');
const run = async () => {
    /*
        Подробное описание методов и их аргументов описано в
        https://usefulweb.github.io/AmoCRM/classes/api_factories_CompanyFactory.CompanyFactory.html
    */
    // постраничная навигация компаний. Подробный пример рассмотрен в ./001-companies-pagination.js
    const pagination = await client.companies.get();

    /* Поиск компании по id */
    // получить объект company по id
    const company = await client.companies.getById(123);
    company.name = 'Walter';
    await company.save();
    /*
        базовые методы работы с объектом Company описаны
        - в README
        - в примере 003-company-entity.js
        - на сайте библиотеки https://usefulweb.github.io/AmoCRM/classes/api_activeRecords_Company.Company.html
     */

    /* Создание компаний */
    /*
        Создаёт две компании, возвращает массив Company с добавленными компаниями.
        Параметры совпадают с https://www.amocrm.ru/developers/content/crm_platform/companies-api#companies-add
    */
    const companies = await client.companies.create([
        {
            name: "Company 1"
        },
        {
            name: "Company2"
        }
    ]);

    const company1 = companies[0];
    company1.name = 'Name2';
    await company1.save();

    const newCompany = new client.Company;

    // в конструктор можно передавать объекты Company
    const anotherCompanies = await client.companies.create([
        {
            name: "Company1"
        },
        newCompany
    ]);

    /* Обновление компаний */

    /*
        Как и в create, туда можно передавать объекты Company существующих в AmoCRM компаний.
        Параметры совпадают с https://www.amocrm.ru/developers/content/crm_platform/companies-api#companies-edit
    */
    const existingCompany = await client.companies.getById(123);

    const updatedCompanies = await client.companies.update([
        {
            id: 122,
            name: 'Walter'
        },
        existingCompany
    ]);

    const updatedCompany2 = updatedCompanies[1];
    updatedCompany2.name = 'UpdatedName';
    await updatedCompany2.save();
}
run();