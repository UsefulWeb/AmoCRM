// экземпляр Client
const { client } = require('amocrm-js');
const run = async () => {
    /*
      базовые методы работы с объектом Company описаны в интерфейсе ICompany
      на сайте библиотеки https://usefulweb.github.io/AmoCRM/interfaces/api_activeRecords_ICompany.ICompany.html
   */
    const company = await client.companies.getById(123);
    company.name = 'Ivan';

    await company.save();

    // вы можете менять и читать любые свойства компании, которые передаются при её создании и обновлении
    console.log(company.id); // 123

    /* Создание новой компании */
    const newCompany1 = new client.Company;

    // является ли компания новой (на основе наличия id у объекта)
    company.isNew(); // true

    newCompany1.name = 'Walter';
    await newCompany1.save();
    newCompany1.isNew(); // false

    // вы можете передать параметры компании объектом
    const newCompany2 = new client.Company({
        name: 'Walter Scott'
    });
    newCompany2.name = 'Ivanov';
    await newCompany2.save();

    // ... спустя какое-то время компания может обновиться на сервере
    // fetch обновит параметры текущей компании
    await newCompany2.fetch();
};

run();