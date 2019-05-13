# AmoCRM
Javascript библиотека для работы с AmoCRM

## Возможности и особенности

1. Свободные запросы к порталу
2. Работает с основными сущностями CRM с помощью ООП.
3. Может работать с внутренним API портала для реализации доп. функций 
(удаление сделок, контактов и пр.)
4. Запросы к порталу основаны на обещаниях (Promise).

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

### Вход в портал

```js
crm.connect().then(() => {
  console.log( `Вход в портал осуществлён` );
})
.catch( e => {
  console.log( 'Ошибка входа', e );
});
```

## Свободные запросы к CRM

Самый базовый функционал при работе с библиотекой

### GET-запрос

```js
// Получить данные по аккаунту (GET-запрос)
crm.request.get( '/api/v2/account' )
.then( data => {
  console.log( 'Полученные данные', data );
})
.catch( e => {
  console.log( 'Произошла ошибка', e );
})
```

### POST-запрос

```js
// Создать новый контакт (POST-запрос)
crm.request.post( '/api/v2/contacts', {
    add: [
        {
            name: "Walter White",
            request_id: 143,
            // другие поля ...
        }
    ]
})
.then( data => {
  console.log( 'Полученные данные', data );
})
.catch( e => {
  console.log( 'Произошла ошибка создания контакта', e );
})
```

## Основные настройки

```javascript
const crm = new AmoCRM({
    domain: 'domain',
    auth: {
        login: 'mylogin',
        hash: 'mytesthash',
    },
    /*
     * Настройки переподключения.
     * Подклюыения через crm.connect() использует
     * cookie-файл, имеющий ограничения по времени действия.
     * Для непрерывной работы необходимо осуществлять
     * повторный вход в портал незадолго до истечения сессии.
     */
    reconnection: {
        /*
         * Переподключение выключено. 
         * По умолчанию false,
         */
        disabled: true,
        /* 
         * Как часто проверять сессию на предмет истечения. 
         * По умолчанию: 60 * 1000 мс
         */
        checkDelay: 500,
        /* 
         * За какое кол-во мс до истечения сессии необходимо переподключиться. 
         * По умолчанию: 60 * 1000 мс
         */
        accuracyTime: 1000
    }
});
```

## Детали

### Основное

2. [Авторизация и выход](./docs/auth.md)
3. [Свободные запросы](./docs/requests.md)
4. [События](./docs/events.md)
5. [Фабрики](./docs/factories.md)
6. [Модели ActiveRecord](./docs/activeRecords.md)

### Основные сущности

1. [Сделки](./docs/entities/leads.md) (Lead)
2. [Контакты](./docs/entities/contacts.md) (Contact)
3. [Компании](./docs/entities/companies.md) (Company)
4. [Клиенты](./docs/entities/customers.md) (Customer)
5. [Заметки](./docs/entities/notes.md) (Note)
6. [Задачи](./docs/entities/tasks.md) (Task)
7. [Дополнительные поля](./docs/entities/fields.md) (Field)
8. [Неразобранное/Входящие заявки из форм и телефонии](./docs/entities/incomingLeads.md) (IncomingLead)
9. [Воронки продаж](./docs/entities/pipelines.md) (Pipeline)

### Поведения

У некоторых сущностей есть расширенный функционал.

1. [Taskable](./docs/behaviors/taskable.md) - позволяет создавать задачу со ссылкой на сущность.
2. [Notable](./docs/behaviors/notable.md) - позволяет создавать заметку со ссылкой на сущность.
3. [Removable](./docs/behaviors/removable.md) - позволяет удалять созданную сущность
4. [Findable](./docs/behaviors/findable.md) - производит поиск записей по критерию
5. [FindableById](./docs/behaviors/findableById.md) - производит поиск записей по идентификатору
