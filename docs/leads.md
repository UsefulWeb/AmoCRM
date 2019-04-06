# Работа со сделками

## 1. Работа с отдельными сделками

### 1.1. Создание экземпляра сделки

```js
// аттрибуты по умолчанию
const attributes = {
  name: 'Сделка от 01.06.1998'
}
const lead = new crm.Lead( attributes );
// аналогично
const lead2 = crm.Lead.of( attributes );
```

### 1.2. Работа с параметрами сделки

Вы можете добавлять параметры сделки с помощью
свойств созданного объекта, а также с помощью функций

```js
const lead = new crm.Lead;

/* добавление и изменение свойств */
lead.name = 'Покупка пылесоса';
// аналогично
lead.setAttribute( 'name', 'Покупка пылесоса' );

/* получение свойств */
lead.name; // Покупка пылесоса
// аналогично
lead.getAttribute( 'name' ); // Покупка пылесоса

/* удаление свойств */
delete lead.name;
// аналогично
lead.removeAttribute( 'name' );
```

### 1.3 Сохранение данных

Данный метод добавляет сделку, если у неё не задан
атрибут id и обновляет её в противном случае.

```js
lead.save()
/* 
  self - текущая сделка,
  self === lead
 */
.then( self => {
  
}); 
```

В *save* можно передать новые атрибуты сделки.
Они добавятся к уже существующим атрибутам

```javascript
const lead = new Lead;

lead.save({
  name: 'Новая сделка',
  sale: 2000
});

console.log( lead.sale ); // 2000
```

### 1.4 Обновление данных с сервера

С течением времени данные сделки могут начать
расходиться с тем, что присутствует в вашей модели.

Метод *fetch()* обновляет атрибуты текущей сделки в случае,
если у неё задан атрибут *id*

```js
lead.fetch()
/* 
  self - текущая сделка,
  self === lead
 */
.then( self => {
  
}); 
```

### 1.5 Удаление (неофициально)

    Удаление сделок является недокументированной возможностью AmoCRM. 
    Использование данной возможности может быть рискованным, 
    так как в один день она просто может перестать работать 
    без объяснений со стороны AmoCRM.

Если вы увидите функционал нерабочим, пожалуйста, 
откройте в этом репозитории соответствующую дискуссию (через issue tracking).

```js
lead.remove()
/* 
  self - текущая сделка,
  self === lead
 */
.then( self => {
  
}); 
```

## 2. Поиск сделок

```js
crm.Lead.findById( id );
crm.Lead.find( criteria );
```

### 2.1. Поиск существующей сделки по id

```js
crm.Lead.findById( id );
```

Пример:
```js
crm.Lead.findById( id )
  .then( lead => {
    console.log( lead );
  });
```

### 2.2. Поиск сделок по критерию

```js
crm.Lead.find( criteria );
```

Пример:

```js
crm.Lead.find({
    responsible_user_id: 123
  })
  .then( leads => {
    leads.forEach( lead => {
      console.log( lead );
    });
  });
```

## 3. Массовое добавление/обновление сделок

```js
crm.Lead.insert( leads );
crm.Lead.update( leads );
```

### 3.1 Добавление

### 3.1.1. В виде массива

```js
const leads = [
  {
    name: 'Сделка для Фёдора'
  },
  {
    name: 'Сделка для Татьяны'
  }
];

crm.Lead.insert( leads )
  .then( lead => {
    console.log( lead );
  })
  /**
   * @param response {EntityResponseHandler}
   */
  .then( response => {
    // полный JSON-ответ с сервера
    const rawResult = response.getRaw(),
      // информация о добавленных элементах
      items = response.getItems(),
      // информация о первом добавленном элементе
      first = response.getFirstItem();
  });
```

### 3.1.2. В виде отдельных объектов

```js
const lead1 = new crm.Lead({
    name: 'Сделка для Фёдора'
  }),
  lead2 = new crm.Lead({
    name: 'Сделка для Татьяны'
  });

/* 
  И вместо того, чтобы по отдельности
  сохранять каждую сделку, можно 
  сделать это пакетно за один запрос
*/
const leads = [ lead1, lead2 ];

crm.Lead.insert( leads )
  /**
   * @param response {EntityResponseHandler}
   */
  .then( response => {
    // полный JSON-ответ с сервера
    const rawResult = response.getRaw(),
      // информация о добавленных элементах
      items = response.getItems(),
      // информация о первом добавленном элементе
      first = response.getFirstItem();
  });
```

[Информация про объект EntityResponseHandler](./response.md)

### 3.2 Обновление

#### 3.2.1 В виде массива

```js
const leads = [
  {
    id: 1234123,
    name: 'Сделка для Фёдора'
  },
  {
    id: 543243,
    name: 'Сделка для Татьяны'
  }
];

crm.Lead.update( leads )
  .then( lead => {
    console.log( lead );
  })
  /**
   * @param response {EntityResponseHandler}
   */
  .then( response => {
    // полный JSON-ответ с сервера
    const rawResult = response.getRaw(),
      // информация о добавленных элементах
      items = response.getItems(),
      // информация о первом добавленном элементе
      first = response.getFirstItem();
  });
```

#### 3.1.2 В виде отдельных объектов

```js

/*
  Предположим, что у нас в CRM уже 
  есть какие-то данные 
*/
crm.Lead.find({
    id: [ 12323, 56745 ]
  })
  .then( leads => {
    // ... делаем что-либо со сделками
    
    /* 
     Вместо того, чтобы по отдельности
     сохранять каждую сделку, можно 
     сделать это пакетно за один запрос
    */
    return crm.Lead.update( leads );
  })
  /**
    * @param response {EntityResponseHandler}
    */
   .then( response => {
     // полный JSON-ответ с сервера
      const rawResult = response.getRaw(),
       // информация о добавленных элементах
       items = response.getItems(),
       // информация о первом добавленном элементе
       first = response.getFirstItem();
   });

```

[Информация про объект EntityResponseHandler](./response.md)

## 4. Удаление сделок (неофициально)

Удаление сделок является недокументированной возможностью AmoCRM. 
Использование данной возможности может быть рискованным, 
так как в один день она просто может перестать работать 
без объяснений со стороны AmoCRM.

Если вы увидите функционал нерабочим, пожалуйста, 
откройте в этом репозитории соответствующую дискуссию (через issue tracking).

**Важно!**
Оба метода используют свои URL-адреса, поэтому, для большей надёжности
лучше воспользоваться каким-либо одним методом при работе 
с удалением сделок. 
На мой взгляд, лучший вариант, 
исходя из возможностей и reverse-engineering - *crm.Lead.remove*.

```js
crm.Lead.remove( ids );
crm.Lead.removeById( id );
```

### 4.1. Пакетное удаление

```js

crm.Lead.remove([ 123, 234 ])
/**
 * @param response {EntityResponseHandler}
 */
.then( response => {
  // полный JSON-ответ с сервера
  const rawResult = response.getRaw();
});

/*
  lead1, lead2 и тд. могут быть как простыми объектами,
  так и экземплярами crm.Lead
 */
crm.Lead.remove([ lead1, lead2 ])
/**
 * @param response {EntityResponseHandler}
 */
.then( response => {
  // полный JSON-ответ с сервера
  const rawResult = response.getRaw();
});
```

[Информация про объект EntityResponseHandler](./response.md)

### 4.2. Удаление отдельной сделки 

```js
crm.Lead.removeById( 1234 )
/**
 * @param response {EntityResponseHandler}
 */
.then( response => {
  // полный JSON-ответ с сервера
  const rawResult = response.getRaw();
});
```

## 5. Связанные задачи

### 5.1. Добавление задачи

Вы можете воспользоваться методами 
*lead.tasks.add* или *lead.addTask*.

```javascript
const lead = new crm.Lead({
      name: 'Заявка на мотоцикл'
    }),
    // задача не должна ранее существовать
    task = new crm.Task({
      text: 'Подготовить плановый отчёт'
    });

lead.addTask( task )
/* 
  updatedTask - обновлённая задача,
  updatedTask === task
 */
.then( updatedTask => {
  console.log( 'Обновлённая задача', updatedTask );
});
```

### 5.2. Получение списка задач

Вы можете воспользоваться методами 
*lead.tasks.get( criteria )* или *lead.getTasks( criteria )*.

```javascript

crm.Lead.findById( 12323 )
  .then( lead =>
    // найдёт все задачи ответственного пользователя
    lead.getTasks({
      responsible_user_id: 123
    })
  )
  // все задачи сделки по заданному критерию
  .then( tasks => {
    
  });
```

## 6. Создание связанных заметок

### 6.1. Добавление заметки

Вы можете воспользоваться методами 
*lead.notes.add* или *lead.addNote*.

```javascript
const lead = new crm.Lead({
      name: 'Заявка на мотоцикл'
    }),
    // задача не должна ранее существовать
    note = new crm.Note({
      text: 'Начаты переговоры по закупке'
    });

lead.addNote( note );
/* 
  updatedNote - обновлённая заметка,
  updatedNote === note
 */
.then( updatedNote => {
  console.log( 'Обновлённая заметка', updatedNote );
});
```

### 6.2. Получение списка заметок

Вы можете воспользоваться методами 
*lead.notes.get( criteria )* или *lead.getNotes( criteria )*.

```javascript

crm.Lead.findById( 12323 )
  .then( lead =>
    // найдёт все заметки ответственного пользователя
    lead.getNotes({
      responsible_user_id: 123
    })
  )
  // все заметки сделки по заданному критерию
  .then( notes => {
    
  });
```
