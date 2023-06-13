// экземпляр Client
const { client } = require('../client');

const run = async () => {
    /*
      базовые методы работы с объектом Contact описаны в интерфейсе IContact
      на сайте библиотеки https://usefulweb.github.io/AmoCRM/interfaces/api_activeRecords_IContact.IContact.html
   */
    const contact = await client.contacts.getById(123);
    contact.first_name = 'Ivan';
    contact.last_name = 'Petrov';

    await contact.save();

    // вы можете менять и читать любые свойства контакта, которые передаются при её создании и обновлении
    console.log(contact.id); // 123

    /* Создание новой контакта */
    const newContact1 = new client.Contact;

    // является ли контакт новым (на основе наличия id у объекта)
    contact.isNew(); // true

    newContact1.first_name = 'Walter';
    await newContact1.save();
    newContact1.isNew(); // false

    // вы можете передать параметры контакта объектом
    const newContact2 = new client.Contact({
        first_name: 'Walter Scott'
    });
    newContact2.last_name = 'Ivanov';
    await newContact2.save();

    // ... спустя какое-то время контакт может обновиться на сервере
    // fetch обновит параметры текущей контакт
    const fetchedContact = await newContact2.fetch();
};

run();