# AmoCRM
Javascript библиотека для работы с AmoCRM

## Возможности и особенности
1. Свободные запросы к порталу
2. Работает с основными сущностями CRM с помощью объектов
3. Может работать с внутренним API портала для реализации доп. функций (удаление сделок, контактов и пр.)

## Установка

```
npm i --save amocrm-js
```

## Пример использования
 
```js
const AmoCRM = require( 'amocrm-js' );

// инициализация
const crm = new AmoCRM({
    /*
     логин пользователя в портале, где адрес
      портала mydomain.amocrm.ru
    */
    domain: 'domain' 
    auth: {
        login: 'mylogin',
        hash: 'mytesthash', // API-ключ доступа
    }
});

// подключение
crm.connect()
  .then(() => {
    // можем отправить либо post, либо get запрос
    return crm.request
      .post( '/api/v2/contacts', {
        add: [
          {
            name: "Walter White",
            request_id: 143,
            // ...
          }
        ]
      })
  })
  .then( response => {
    console.log( response );
  })
  .then(() => {
    const lead = new crm.Lead({
      name: 'Заявка из Ростова'
    });
    /* 
      параметры сущностей задаются 
      напрямую через свойства
     */
    lead.price = 2000;
    // сохранение заявки
    return lead.save();
  })
  .then( lead => {
    console.log( 'id новой заявки', lead.id );
    
    const note = new crm.Note;
    /* 
      все свойства совпадают с параметрами, 
      которые вы будете передавать в запросе
     */
    note.text = 'Hello from Moscow!';
    /* 
      в библиотеке есть константы для значений
      свойств сущностей
     */
    note.note_type = crm.Note.NOTE_TYPE.COMMON;
    /*
     можем добавлять заметки и задачи
     к некоторым сущностям
    */
    return lead.notes.add( note );
  })
  .then( note => {
    /*
     можем получить элемент, к которому
     прикреплена заметка или задача
    */
    return note.getElement();
  })
  .then( lead => {
    // некоторые сущности можно удалять
    return lead.remove();
  })
  .then(() => {
    // многие сущности поддерживают поиск
    return crm.Lead.find({
      status: 1, // найти сделки с нужным статусом
      responsible_user_id: 34 // и определённым ответственным человеком 
    });
  })
  .then( leads => {
    // массив данных
    
    // также можно найти сущность по id
    return crm.Company.findById( 123123 );
  });
```

[Основы работы](./docs/basic.md)

## Детали

### Основные сущности

1. Сделки (Lead)
2. Контакты (Contact)
3. Компании (Company)
4. Клиенты (Customer)
5. Заметки (Note)
6. Задачи (Task)
7. Дополнительные поля (Field)
8. Неразобранное/Входящие заявки из форм и телефонии (IncomingLead)
9. Воронки продаж (Pipeline)

### Поведения

У некоторых сущностей есть расширенный функционал.

1. Taskable - позволяет создавать задачу со ссылкой на сущность.
2. Notable - позволяет создавать заметку со ссылкой на сущность.
3. Removable - позволяет удалять созданную сущность
4. Findable - производит поиск записей по критерию
5. FindableById - производит поиск записей по идентификатору
