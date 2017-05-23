# AmoCRM
Javascript библиотека для работы с AmoCRM

## Подключение к CRM
```
const AmoCRM = require( 'amocrm-js' );

let crm = new AmoCRM({
    login: 'mydomain' // логин пользователя в портале, где адрес портала mydomain.amocrm.ru
    hash: 'mytesthash', // API-ключ доступа
});

// Вход в портал
crm.connect();
```

## Свободный запрос к CRM

```
// Получить данные по аккаунту (GET-запрос)
var request = crm.connection.request;
request.get( '/private/api/v2/json/accounts/current' )
.then( data => {
    console.log( 'Полученные данные', data );
})
.catch e => {
    console.log( 'Произошла ошибка', e );
})

// Создать новый контакт (POST-запрос)
request.post( '/private/api/v2/json/contacts/set', {
    request: {
        contacts: {
            add: [
                {
                    name: "Walter White",
                    request_id: 143,
                    // другие поля ...
                }
            ]
        }
    } 
})
 .then( data => {
     console.log( 'Полученные данные', data );
 })
 .catch e => {
     console.log( 'Произошла ошибка создания контакта', e );
 })
```

## Сделки (TODO)

```
// новая сделка
var lead = new crm.Lead;
lead.linked_company_id = 1245;
lead.date_create = new Date;
lead.price = 10000;

lead.save(); // вернёт Promise

// Обновление сделки
lead.name = "Заявка для Ивана";
lead.save();

// Поиск сделок

crm.Lead.find({
    status: 1 // найти сделки с нужным статусом
    responsible_user_id: 34 // и определённым ответственным человеком 
})
.then( data => {
    console.log( "Найденное" );
})

// Общая информация о сделках
crm.Lead.summary(criteria)
.then( data => {
    // Количество сделок по заданному критерию
    console.log( data.count );
})
```