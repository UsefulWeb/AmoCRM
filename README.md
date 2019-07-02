# AmoCRM
Javascript библиотека для работы с AmoCRM

## Подключение к CRM
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

```js
// Получить данные по аккаунту (GET-запрос)
crm.request
.get( '/api/v2/account' )
.then( data => {
    console.log( 'Полученные данные', data );
})
.catch( e => {
    console.log( 'Произошла ошибка', e );
})

// Создать новый контакт (POST-запрос)
crm.request
.post( '/api/v2/contacts', {
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

## Фабрики

В настоящий момент доступны следующие фабрики:

```js

crm.Lead // манипуляции со сделками
crm.Contact // манипуляции с контактами
```

Каждая из фабрик имеет методы для множественных операций со сделками:

```js
// Поиск сделок по критерию, возвращает [ Lead, Lead, ... ]
crm.Lead.find( criteria );
// Добавление сделок
crm.Lead.insert([
     {
         name: "Walter White",
         request_id: 143,
         // другие поля ...
     }
 ]);
// Обновление сделок
crm.Lead.update([
    {
        id: 1234
        name: "Walter White",
        request_id: 143,
        // другие поля ...
    }
]);

// Возвращает Lead
crm.Lead.findById( id );
```

## Сделки

```js
// новая сделка
const lead = new crm.Lead;
lead.linked_company_id = 1245;
lead.updated_at = 12345678;
lead.price = 10000;

lead.save(); // вернёт Promise
// альтернативный вариант 1
const lead = new crm.Lead({
    linked_company_id: 1245,
    updated_at: 12345678,
    price: 10000
});
lead.save();

// альтернативный вариант 2
const lead = crm.Lead.of({
    linked_company_id: 1245,
    updated_at: 12345678,
    price: 10000
});
lead.save();

// Обновление сделки
lead.name = "Заявка для Ивана";
lead.save();

// Поиск сделок

crm.Lead.find({
    status: 1 // найти сделки с нужным статусом
    responsible_user_id: 34 // и определённым ответственным человеком
})
.then( leads => {
    console.log( "Найденное", leads );
})

// Взять данные о сделке с сервера

crm.Lead.findById( 123 )
.then( lead => console.log( lead ));

```

### Удаление сделок

Так как в официальном API данная возможность не документирована, лавка может в обозримом будущем прикрыться.
Тем не менее, есть возможность удалять сделки.

```js
// список идентификаторов сделок
crm.Lead.remove([ 12345, 568944 ])

// удаление отедльной сделки
crm.Lead.findById( 123 )
.then( lead => lead.remove());
```

## Переподключение

Переподключение к порталу в случае истечения сессии
(15 минут бездействия или истечение cookie-файла в течение 2 лет) происходит автоматически.

## Работа с событиями

В настоящий момент доступны следующие события:

1. connection:beforeReconnect
2. connection:beforeConnect
3. connection:checkReconnect
4. connection:authError
5. connection:connected
6. connection:disconnected
7. connection:error

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
