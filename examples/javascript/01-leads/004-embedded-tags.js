// экземпляр Client
const { client } = require('../client');

const run = async () => {
    /*
        После добавления, теги возможно выбирать
        при создании/редактировании сделок
    */
    const [tag] = await client.leads.tags.create([
        {
            name: 'Building',
            color: 'DDEBB5'
        },
        {
            name: 'VIP',
            color: '9D2B32'
        }
    ]);

    // Теги можно найти с помощью метода get
    const [tag2] = await client.leads.tags.get({
        // ищем ранее созданный тег
        query: 'VIP',
        limit: 1
    });

    const lead = new client.Lead;
    lead.name = 'Elvis House';

    // К сделке можно прикрепить только ранее созданные теги.
    lead.embeddedTags.add([
        tag,
        tag2
    ]);
    // Прикреплённые теги необходимо сохранить
    await lead.save();

    // удаляет все прикреплённые к сделке теги
    lead.embeddedTags.remove();

    await lead.save();

    // устанавливает новое значение. add добавляет теги к существующим, set перезаписывает существующие
    lead.embeddedTags.set([tag2]);

    await lead.save();
};

run();