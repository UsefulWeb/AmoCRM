# Работа со сделками

## 1. Работа с отдельными сделками

```js
const lead = new crm.Lead( attributes );
lead.setAttribute( 'custom_attribute', custom_value );
lead.getAttribute( 'custom_attribute' );
lead.custom_attribute = custom_value;

lead.removeAttribute( 'custom_attribute' );
lead.fetch();
lead.save();
lead.remove();
```

### 1.1. Создание экземпляра сделки

```js
// аттрибуты по умолчанию
const attributes = {
  name: 'Сделка от 01.06.1998'
}
const lead = new crm.Lead( attributes );
// альтернативный способ
const lead2 = crm.Lead.of( attributes );
```

### 1.2. Работа с параметрами сделки

Вы можете добавлять параметры сделки с помощью
свойств созданного объекта, а также с помощью функций

```js
const lead = new crm.Lead;
lead.name = 'Покупка пылесоса';
lead.setAttribute( 'responsible_user_id', 12332 );
lead.removeAttribute( 'name' );
```

Получить параметры сделки можно двумя способами

```js
console.log( lead.name );
console.log( lead.getAttribute( 'name' ));
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
const lead1 = new crm.Lead,
  lead2 = new crm.Lead;
lead1.name = 'Сделка для Фёдора';
lead2.name = 'Сделка для Татьяны';

/* 
  И вместо того, чтобы по отдельности
  сохранять каждую сделку, можно 
  сделать это пакетно за один запрос
*/
const leads = [ lead1, lead2 ];

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
new crm.Lead.find({
    id: [ 12323, 56745 ]
  })
  .then( onAfterFind )

const onAfterFind = ([ lead1, lead2 ]) => {
  // ... делаем что-либо со сделками
  
  /* 
    Вместо того, чтобы по отдельности
    сохранять каждую сделку, можно 
    сделать это пакетно за один запрос
  */
  const leads = [ lead1, lead2 ];
  
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
}

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
исходя из возможностей и reverse-ingeneering - *crm.Lead.remove*.

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
