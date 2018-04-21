# Модели ActiveRecords

В настоящий момент доступны следующие модели:

```js

Lead // сделка
Contact // контакт
Company // компания
Customer // клиент
Note // заметка
Task // задача
Field // дополнительное поле
IncomingLead // неразобранное
Pipeline // воронка продаж
```

Для работы с экземпляром Active Record, вы можете воспользоваться одним из способов.

Способ 1. Создать экземпляр через оператор *new* или метод *of* [соответствующей фабрики](./factories.md)
```js
const lead = new crm.Lead;
// с параметрами
const lead2 = new crm.Lead( attributes );
// без конструктора
const lead3 = crm.Lead.of( attributes );
```

Способ 2. Найти экземпляр(ы) через методы *find* и *findById* [соответствующей фабрики](./factories.md)

Данную возможность поддерживают [не все модели](./behaviors/search-in-models.md).
```js
 crm.Lead
  .find({ responsible_user_id: 12332 })
  .then( leads => {
    // ...
  });

  crm.Lead
    .findById( 123321 )
    .then( lead => {
        /* 
         вернёт Lead или undefined, если не найдёт запись
        */
    });
```
