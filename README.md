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


## Выход из портала

Метод *disconnect* выключает переподключение к порталу,
которое обновляет сессию (cookie-файл) до её истечения.

```javascript
crm.disconnect();
```

При необходимости, вы можете выключить переподключение
в настройках (см. ниже).

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

## Фабрики

Фабрика позволяет удобно находить, менять и удалять сделки
с помощью объектов.

Пример:

```js
// Найти сделки по критерию
crm.Lead.find({
    status: 1 // найти сделки с нужным статусом
    responsible_user_id: 34 // и определённым ответственным человеком 
})
// массив сделок
.then( leads => {
  leads.forEach(
    // получить атрибуты сделки
    lead => console.log( lead.attributes )
  );
});

// Найти сделку по id
crm.Lead.findById( 349 );
.then( lead => console.log( lead.attributes ));

// Добавить новые сделки
crm.Lead.insert([
  {
    name: "Walter White",
    request_id: 143,
    // другие поля ...
  },
  {
    name: "Walter Black",
    request_id: 561,
    // другие поля ...
  }
]);

// Обновить сделки
crm.Lead.update([
  {
    id: 1234,
    name: "Walter White",
    request_id: 143,
    // другие поля ...
  },
  {
    id: 5678,
    name: "Walter Black",
    request_id: 561,
    // другие поля ...
  }
]);

// Удалить сделки
crm.Lead.remove([ 1234, 5678 ]);
```

### Основные фабрики

1. [Сделки](docs/factories/leads.md) (crm.Lead)
2. [Контакты](docs/factories/contacts.md) (crm.Contact)
3. [Компании](docs/factories/companies.md) (crm.Company)
4. [Клиенты](docs/factories/customers.md) (crm.Customer)
5. [Заметки](docs/factories/notes.md) (crm.Note)
6. [Задачи](docs/factories/tasks.md) (crm.Task)
7. [Дополнительные поля](docs/factories/fields.md) (crm.Field)
8. [Неразобранное/Входящие заявки из форм и телефонии](docs/factories/incomingLeads.md) (crm.IncomingLead)
9. [Воронки продаж](docs/factories/pipelines.md) (crm.Pipeline)

## Модели ActiveRecord

Вы также можете создавать/редактировать/удалять поштучно сущности.

Пример:

```js
// создание сделки
const lead = new crm.Lead({
  linked_company_id: 1245,
  updated_at: 12345678,
  price: 10000
});
lead.name = "Заявка для Ивана";
lead.save();

// обновление найденной сделки
crm.Lead.find({
  status: 1
})
.then( leads => {
  const lead = leads[ 0 ];
  lead.name = "Обновлённое название";
  lead.save();
});

// удаление найденной сделки
crm.Lead.findById({
  status: 1
})
.then( lead => {
  lead.name = "Обновлённое название";
  lead.save();
});
```

### Основные модели ActiveRecord

1. [Сделки](docs/activeRecords/leads.md) (crm.Lead)
2. [Контакты](docs/activeRecords/contacts.md) (crm.Contact)
3. [Компании](docs/activeRecords/companies.md) (crm.Company)
4. [Клиенты](docs/activeRecords/customers.md) (crm.Customer)
5. [Заметки](docs/activeRecords/notes.md) (crm.Note)
6. [Задачи](docs/activeRecords/tasks.md) (crm.Task)
7. [Дополнительные поля](docs/activeRecords/fields.md) (crm.Field)
8. [Неразобранное/Входящие заявки из форм и телефонии](docs/activeRecords/incomingLeads.md) (crm.IncomingLead)
9. [Воронки продаж](docs/activeRecords/pipelines.md) (crm.Pipeline)


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
         * По умолчанию false.
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

### connection:beforeConnect

Возникает перед тем, как происходит подключение 
к порталу. Вызывается также в момент переподключения.

### connection:beforeReconnect

Возникает перед тем, как происходит повторное
подключение к порталу.

### connection:checkReconnect

Возникает в момент проверки, истекла ли сессия.

### connection:authError

Возникает в момент ошибки авторизации.

### connection:connected

Возникает в момент успешного соединения с CRM.

### connection:disconnected

Возникает в момент выхода из портала (метод *disconnect*).

### connection:error

Возникает в момент любой ошибки соединения с CRM.
