# AmoCRM
Javascript библиотека для работы с AmoCRM

## Возможности и особенности

1. Свободные запросы к порталу
2. Работает с основными сущностями CRM с помощью ООП.
3. Может работать с внутренним API портала для реализации доп. функций 
(удаление сделок, контактов и пр.)

## Установка

```
npm i --save amocrm-js
```

## Пример использования
 
```js
const AmoCRM = require( 'amocrm-js' );

const crm = new AmoCRM({
    // логин пользователя в портале, где адрес портала domain.amocrm.ru
    domain: 'domain', // может быть указан полный домен вида domain.amocrm.ru, domain.amocrm.com
    auth: {
        login: 'mylogin',
        hash: 'mytesthash', // API-ключ доступа
    }
});

// Вход в портал
crm.connect().then(() => {
  console.log( `Вход в портал осуществлён` );
})
.catch( e => {
  console.log( 'Ошибка входа', e );
});
```

### Выход из портала

Метод *disconnect()* позволяет выйти из портала.
Он выключает таймер проверки времени истечения сессии.

```javascript
crm.disconnect();
```

## Свободный запрос к CRM

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

[Основы работы](./docs/basic.md)

## Детали

### Основные сущности

1. [Сделки](./docs/leads.md) (Lead)
2. Контакты (Contact)
3. Компании (Company)
4. Клиенты (Customer)
5. Заметки (Note)
6. Задачи (Task)
7. Дополнительные поля (Field)
8. Неразобранное/Входящие заявки из форм и телефонии (IncomingLead) (в разработке)
9. Воронки продаж (Pipeline)

### Поведения

У некоторых сущностей есть расширенный функционал.

1. [Taskable](./docs/behaviors/taskable.md) - позволяет создавать задачу со ссылкой на сущность.
2. [Notable](./docs/behaviors/notable.md) - позволяет создавать заметку со ссылкой на сущность.
3. [Removable](./docs/behaviors/removable.md) - позволяет удалять созданную сущность
4. [Findable](./docs/behaviors/findable.md) - производит поиск записей по критерию
5. [FindableById](./docs/behaviors/findableById.md) - производит поиск записей по идентификатору
