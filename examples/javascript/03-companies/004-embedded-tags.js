// экземпляр Client
const { client } = require('../client');

const run = async () => {
    /*
        После добавления, теги возможно выбирать
        при создании/редактировании компаний
    */
    const [tag] = await client.companies.tagList.create([
        {
            name: 'Music shop',
            color: 'DDEBB5'
        },
        {
            name: 'Guitar shop',
            color: '9D2B32'
        }
    ]);

    // Теги можно найти с помощью метода get
    const [tag2] = await client.companies.tagList.get({
        // ищем ранее созданный тег
        query: 'Guitar Shop',
        limit: 1
    });

    const company = new client.Company;
    company.name = '';

    // К компании можно прикрепить только ранее созданные теги.
    company.embeddedTags.add([
        tag,
        tag2
    ]);
    // Прикреплённые теги необходимо сохранить
    await company.save();

    // удаляет все прикреплённые к компании теги
    company.embeddedTags.remove();

    await company.save();

    // устанавливает новое значение. add добавляет теги к существующим, set перезаписывает существующие
    company.embeddedTags.set([tag2]);

    await company.save();
};

run();