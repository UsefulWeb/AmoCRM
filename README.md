# AmoCRM

Javascript библиотека для работы с AmoCRM

## Установка

```
npm i --save amocrm-js
```

## Инициализация

```js
import AmoCRM from 'amocrm-js';

const crm = new AmoCRM({
    // домен, где полный адрес портала domain.amocrm.ru
    domain: 'domain', // может быть указан полный домен вида domain.amocrm.ru, domain.amocrm.com
    auth: {
        login: 'mylogin@mail.com',
        hash: 'mytesthash' // API-ключ доступа
    }
});
```

Подключение к порталу и обновление сессии происходит
автоматически по запросу.

## Свободные запросы к CRM

Самый базовый функционал при работе с библиотекой

### GET-запрос

```js
// Получить данные по аккаунту (GET-запрос)
const response = await crm.request.get( '/api/v2/account' );
```

### POST-запрос
```js
// Создать новый контакт (POST-запрос)
const response = await crm.request.post( '/api/v2/contacts', {
    add: [
        {
            name: "Walter White",
            request_id: 143,
            // другие поля ...
        }
    ]
});
```

## Работа с объектами

Пример:

```js
// Ищем первый контакт по телефону
const contact = await crm.Contact.findOne({
  query: '89991597532'
});

// Создаём сделку 
const lead = new crm.Lead({
  name: 'Покупка карандашей',
  responsible_user_id: '957083',
  contacts_id: [
    contact.id
  ],
  sale: '5000'
});

await lead.save();

// Создаём примечание к сделке
const note = new crm.Note({
  text: 'Hello from Moscow!'
});

await lead.notes.add( note );

// Добавляем задачу к сделке
const task = new crm.Task({
  text: 'Не забыть перезвонить',
  responsible_user_id: '504141'
});

await lead.tasks.add( task );
```

### Основные функции

1. [Аккаунт](docs/api/account.md)
2. [Сделки](docs/api/leads.md) (crm.Lead)
3. [Контакты](docs/api/contacts.md) (crm.Contact)
4. [Компании](docs/api/companies.md) (crm.Company)
5. [Покупатели](docs/api/customers.md) (crm.Customer)
6. [Задачи](docs/api/tasks.md) (crm.Task)
7. [Примечания](docs/api/notes.md) (crm.Note)
8. [Неразобранное](docs/api/incomingLeads.md) (crm.IncomingLead)
9. [Дополнительные поля](docs/api/fields.md) (crm.Field)
10. [Воронки продаж](docs/api/pipelines.md) (crm.Field)
11. [Виджеты](docs/api/widgets.md) (crm.Widget)
12. [WebHooks](docs/api/webhooks.md) (crm.WebHook)

### API Списки

1. [Списки](docs/catalogs/catalogs.md) (crm.Pipeline)
2. [Элементы](docs/catalogs/elements.md) (crm.Catalog)
2. [Товары](docs/catalogs/product.md) (crm.Product)

## События

Добавление обработчика:

```javascript
crm.on( 'connection:error', () => console.log( 'Ошибка соединения' ));
```

Удаление обработчика:

```javascript
const handler = () => console.log( 'Ошибка соединения' );
crm.on( 'connection:error', handler );

// удалить конкретный обработчик
crm.off( 'connection:error', handler );

// удалить все обработчики конкретного события
crm.off( 'connection:error' );

// удалить все обработчики всех событий
crm.off();
```
