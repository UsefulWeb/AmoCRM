// экземпляр Client
const { client } = require('../client');

const run = async () => {
    /*
        После добавления, теги возможно выбирать
        при создании/редактировании контактов
    */
    const [tag] = await client.contacts.tags.create([
        {
            name: 'Singer',
            color: 'DDEBB5'
        },
        {
            name: 'Musician',
            color: '9D2B32'
        }
    ]);

    // Теги можно найти с помощью метода get
    const [tag2] = await client.contacts.tags.get({
        // ищем ранее созданный тег
        query: 'Musician',
        limit: 1
    });

    const contact = new client.Contact;
    contact.name = 'Elvis Presley';

    // К контакту можно прикрепить только ранее созданные теги.
    contact.embeddedTags.add([
        tag,
        tag2
    ]);
    // Прикреплённые теги необходимо сохранить
    await contact.save();

    // удаляет все прикреплённые к контакту теги
    contact.embeddedTags.remove();

    await contact.save();

    // устанавливает новое значение. add добавляет теги к существующим, set перезаписывает существующие
    contact.embeddedTags.set([tag2]);

    await contact.save();
};

run();