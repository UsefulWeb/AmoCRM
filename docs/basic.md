## Подключение к CRM
```js
const AmoCRM = require( 'amocrm-js' );

const crm = new AmoCRM({
    domain: 'domain' // логин пользователя в портале, где адрес портала mydomain.amocrm.ru
    auth: {
        login: 'mylogin',
        hash: 'mytesthash', // API-ключ доступа
    }
});

// Вход в портал
crm.connect();
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
crm.Lead.remove([ 12 345, 568944 ])

// удаление отедльной сделки
crm.Lead.findById( 123 )
.then( lead => lead.remove());
```
