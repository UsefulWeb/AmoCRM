// экземпляр Client
const { client } = require('../client');

const run = async () => {
    /*
      базовые методы работы с объектом Lead описаны в интерфейсе ILead
      на сайте библиотеки https://usefulweb.github.io/AmoCRM/interfaces/api_activeRecords_Lead.ILead.html
   */
    const lead = await client.leads.getById(123);
    lead.name = 'Ivan';
    lead.price = 100;

    await lead.save();

    // вы можете менять и читать любые свойства сделки, которые передаются при её создании и обновлении
    console.log(lead.id); // 123

    /* Создание новой сделки */
    const newLead1 = new client.Lead;

    // является ли сделка новой (на основе наличия id у объекта)
    lead.isNew(); // true

    newLead1.name = 'Walter Scott';
    await newLead1.save();
    lead.isNew(); // false

    // вы можете передать параметры сделки объектом
    const newLead2 = new client.Lead({
        name: 'Walter Scott'
    });
    newLead2.price = 100;
    await newLead2.save();

    // ... спустя какое-то время сделка может обновиться на сервере
    // fetch обновит параметры текущей сделки
    const fetchedLead = await newLead2.fetch();
};

run();