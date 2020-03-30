# Контакты

Ссылка на документацию:
https://www.amocrm.ru/developers/content/api/contacts

## Описание методов

1. [Множественные операции](#множественные-операции)
    1. [find](#crmcontactfind)
    2. [findById](#crmcontactfindbyid)
    3. [insert](#crmcontactinsert)
    4. [update](#crmcontactupdate)
    5. [from](#создание)
    6. [of](#создание)
    6. [new crm.Contact](#создание)
2. [Объект контакта](#работа-с-объектом-контакта)
    1. [save](#save)
    2. [fetch](#fetch)
    3. [exists](#exists)
3. [Покупатель контакта](#работа-с-покупателем-контакта)
    1. [getCustomers](#getcustomers)
    2. [getCustomers](#getcustomers) 
    3. [setCustomers](#setCustomers)
4. [Сделки контакта](#работа-со-сделками-контакта)
    1. [new Lead](#new-lead)
    2. [getLeads](#getleads)
    3. [addLeads](#addleads)
5. [Компания контакта](#работа-с-компанией-контакта)
    1. [getCompany](#getсompany) 
    2. [linkCompany](#linkсompany)
    3. [unlinkCompany](#unlinkсompany)
6. [Примечания контакта](#работа-с-примечаниями-контакта)
    1. [new Note](#new-note)
    2. [getNotes](#getnotes)
    3. [addNotes](#addnotes)
7. [Задачи контакта](#работа-с-задачми-контакта)
    1. [new Task](#new-task)
    2. [getTasks](#gettasks) 
    3. [addTasks](#addtasks)
8. [Дополнительные поля контактов](#работа-с-дополнительными-полями-контактов)
    1. [new crm.Contact.Field](#new-crmcontactfield)
    2. [crm.Contact.getFields](#crmcontactgetfields)
    3. [crm.Contact.addFields](#crmcontactaddfields)
9. [Атрибуты контакта](#работа-с-атрибутами-контакта)
9. [Недокументированные возможности](#недокументированные-возможности)
    1. [remove](#remove)
    2. [crm.Contact.remove](#crmcontactremove)
    3. [crm.Contact.findByAttributes](#crmcontactfindbyattributes)
    4. [crm.Contact.findByCustomFields](#crmcontactfindbycustomfields)
    5. [crm.Contact.findByCustomField](#crmcontactfindbycustomfield)
    6. [crm.Contact.findByTerm](#crmcontactfindbyterm)

### Множественные операции

| Метод                         | Описание                                                 |
|-------------------------------|----------------------------------------------------------|
|[find](#crmcontactfind)        |Находит контакты по заданному критерию                    |
|[findById](#crmcontactfindbyid)|Находит контакт с заданным id                             |
|[insert](#crmcontactinsert)    |Создаёт массив контактов одним запросом к CRM             |
|[update](#crmcontactupdate)    |Обновляет массив контактов одним запросом к CRM           |
|[from](#создание)              |Преобразует массив атрибутов в массив объектов crm.Contact|
|[new crm.Contact](#создание)   |Создаёт объект контакта                                   |
|[create](#создание)            |Аналогично new crm.Contact                                |
|[of](#создание)                |Создаёт множество объектов контакта                       |

### Работа с объектом контакта

[Работа с атрибутами контакта](#работа-с-атрибутами-контакта)

| Метод            | Описание                                           |
|------------------|----------------------------------------------------|
|[save](#save)     |Сохраняет изменения в контакте.                     |
|[fetch](#fetch)   |Заменяет все несохранённые данные актуальными из CRM|
|[exists](#exists) |Проверяет, существует ли до сих пор контакт в CRM   |

### Работа с покупателем контакта

| Метод                                            | Описание                                             |
|--------------------------------------------------|------------------------------------------------------|
|[getCustomers](#getcustomers)                     |Получает список покупателей, прикреплённых к контакту |
|[setCustomer](#setCustomer)                       |Добавляет одного покупателя к контакту                |
|[setCustomers](#setCustomers)                     |Добавляет список покупателей к контакту               |

### Работа со сделками контакта

| Метод                                            | Описание                                        |
|--------------------------------------------------|-------------------------------------------------|
|[new Lead](#new-lead)                             |Создаёт сделку, прикреплённый к контакту         |
|[getLeads](#getleads)                             |Получает список сделок, прикреплённых к контакту |
|[addLeads](#addleads)                             |Прикрепляет к контакту список сделок             |

### Работа с компанией контакта

| Метод                                            | Описание                                        |
|--------------------------------------------------|-------------------------------------------------|
|[getCompany](#getсompany)                         |Возвращает компанию, прикреплённую к контакту    |
|[linkCompany](#linkсompany)                       |Прикрепляет компанию к контакту                  |
|[unlinkCompany](#unlinkсompany)                   |Открепляет компанию от контакта                  |

### Работа с примечаниями контакта

| Метод                                            | Описание                                        |
|--------------------------------------------------|-------------------------------------------------|
|[new Note](#new-note)                             |Создаёт примечание у заданного контакта          |
|[getNotes](#getnotes)                             |Возвращает список примечаний у контакта          |
|[addNotes](#addnotes)                             |Добавляет примечания контакту                    |

### Работа с задачми контакта

| Метод                                            | Описание                                        |
|--------------------------------------------------|-------------------------------------------------|
|[new Task](#new-task)                             |Создаёт задачу, прикреплённый к контакту         |
|[getTasks](#gettasks)                             |Получает список задач заданного контакта         |
|[addTasks](#addtasks)                             |Добавляет список задач заданному контакту        |

### Работа с дополнительными полями контактов

| Метод                                                      | Описание                                       |
|------------------------------------------------------------|------------------------------------------------|
|[new crm.Contact.Field](#new-crmcontactfield)               |Создаёт дополнительное поле у контакта          |
|[crm.Contact.getFields](#crmcontactgetfields)               |Получает все произвольные поля контактов        |
|[crm.Contact.addFields](#crmcontactaddfields)               |Прикрепляет к контакту массив произвольных полей|

## Множественные операции

### crm.Contact.find

Находит контакты по заданному критерию

```js
const contacts = await crm.Contact.find({
    // принимает все параметры, описанные в документации
    query: 'Пропущенный звонок'
});
```

### crm.Contact.findById

Находит контакт (один) с заданным id

```js
const contact = await crm.Contact.findById( 1853346 );

contact.name = 'Иван';

contact.save();
```

### crm.Contact.insert

Создаёт массив контактов одним запросом к CRM.

```js
const contact1 = new crm.Contact({
  name: 'Петр'
});

const contact2 = new crm.Contact({
  name: 'Ольга'
});

// Возвращает массив сохранённых контактов [contact1, contact2].
const contacts = await crm.Contact.insert([
  contact1,
  contact2
]);
```

Метод также может работать с обычными объектами

```js
// Возвращает массив сохранённых контактов [contact1, contact2].
const contacts = await crm.Contact.insert([
  {
    name: 'Иван'
  },
  {
    name: 'Ольга'
  }
]);
```

### crm.Contact.update

Обновляет массив контактов одним запросом к CRM.

```js
const contact1 = await crm.Contact.findById( 2381742 );
const contact2 = await crm.Contact.findById( 9735134 );

const contacts = await crm.Contact.update([
  contact1,
  contact2
]);
```

## Работа с объектом контакта

### Создание

С помощью конструктора

```js
const contact = new crm.Contact;
```

Передача начальных атрибутов

```js
const contact = new crm.Contact({
  name: 'Иван',
  responsible_user_id: '957083'
});
```

Аналогичую работу выполняет *crm.Contact.create*

```js
const contact = crm.Contact.create({
  name: 'Иван',
  responsible_user_id: '957083',
});
```

Для создания множества контактов с начальными атрибутами
можно воспользоваться *crm.Contact.of*

```js
const contacts = crm.Contact.of([
  {
    name: 'Иван',
    responsible_user_id: '957083',
  },
  {
    name: 'Татьяна',
    responsible_user_id: '957083',
  }
]);
```

Данные контакты не будут добавлены в CRM. Для их добавления
потребуется вызвать метод *save()* у каждого. Если вы хотите
сразу добавить или обновить контакты, рекомендуем воспользоваться
*crm.Contact.insert* или *crm.Contact.update*.

### Работа с атрибутами контакта

В любой момент времени вы можете получить или задать 
значение атрибута контакта, обращаясь к свойству
объекта:

#### Чтение

| Метод                                         | Описание                                                               |
|-----------------------------------------------|------------------------------------------------------------------------|
|contact.имя_свойства                           | Получает значение совйства                                             |
|contact.getAttribute( 'имя_свойства' )         | Аналогично contact.имя_свойства                                        |
|contact.attributes                             | Получает объект атрибутов                                              |
|contact.hasAttribute( 'имя_свойства' )         | Позволяет узнать наличие свойства у объекта                            |
|contact.isNew()                                | Проверяет, новый ли объект сделки (опирается на наличие/отсутствие id) |

```js
const contact = await crm.Contact.findById( 127311 );

console.log( contact.name ); // Получить свойство name

// Аналогично
contact.getAttribute( 'name' );

// Вернёт объект со всеми свойствами и значением всех атрибутов
console.log( contact.attributes ); 

// Проверка наличия атрибута
contact.hasAttribute( 'name' ); // true

// Проверяет, новый ли объект сделки
contact.isNew(); // false
```

#### Запись

| Метод                                             | Описание                                   |
|---------------------------------------------------|--------------------------------------------|
|contact.имя_свойства = значение                    | Задаёт значение совйства                   |
|contact.setAttribute( 'имя_свойства', 'значение' ) | Аналогично contact.имя_свойства = значение |
|contact.attributes = valuesObject                  | Задаёт объект атрибутов                    |

При изменении значений, для того, чтобы 
они сохранились в CRM, используйте метод [save](#save)

```js
const contact = await crm.Contact.findById( 127311 );
contact.name = 'Новое значение';

// Аналогично

contact.setAttribute( 'name', 'Новое значение' );

/* 
  Полностью заменит все существующие атрибуты новыми.
  Метод сохраняет существующий id объекта в CRM
*/
contact.attributes = {
  name: 'Новое значение'
}
```

#### Удаление

| Метод                                    | Описание                               |
|------------------------------------------|----------------------------------------|
| delete contact.имя_свойства              | Удаляет свойства                       |
|contact.removeAttribute( 'имя_свойства' ) | Аналогично delete contact.имя_свойства |


При изменении значений, для того, чтобы 
они сохранились в CRM, используйте метод [save](#save)

```js
const contact = await crm.Contact.findById( 127311 );

delete contact.name;

// Аналогично
contact.removeAttribute( 'name' );
```

### crm.Contact.from

Преобразует массив атрибутов в массив объектов *crm.Contact*

```js
const contacts = crm.Contact.from([
  {
    name: 'Сделка 1'
  },
  {
    name: 'Сделка 2'
  }
]);
```

### attributes

Возвращает объект с текущими атрибутами контакта

```js
const contact = await crm.Contact.findById( 127311 );

console.log( contact.attributes );
/*
{
  id: 127311,
  name: 'Иван'
}
*/
```

### save()

Сохраняет изменения в контакте.

```js
const contact = await crm.Contact.findById( 127311 );

contact.name = 'Петр';

contact.save();
```

### fetch()

Заменяет все несохранённые данные актуальными из CRM.

```js
const contact = await crm.Contact.findById( 127311 );
console.log( contact.name ); // Пётр

contact.name = 'Это название контакта не сохранится, так как не вызван save()';

contact.fetch();
console.log( contact.name ); // Пётр
```

### exists()

Проверяет, существует ли до сих пор контакт в CRM.

```js
const contact = await crm.Contact.findById( 127311 );

// пока ещё контакт есть в CRM
console.log( await contact.exists()); // true

// ... спустя некоторое время менеджер удалил контакт в CRM ...

console.log( await contact.exists()); // false
```

## Работа с покупателем контакта

### getCustomers()

Получает список покупателей, прикреплённых к контакту

```js
const contact = await crm.Contact.findById( 127311 ),
  customers = await contact.getCustomers(); 
```

### setCustomer()

Добавляет одного покупателя к контакту

```js
const contact = await crm.Contact.findById( 127311 );

const customer = new crm.Customer({
  name: 'Wabeco'
});

await contact.setCustomer( customer );
```

### setCustomers()

Добавляет список покупателей к контакту

```js
const contact = await crm.Contact.findById( 127311 );

const customers = await crm.Customer.find({
  
});

await contact.setCustomers( customers );
```

## Работа со сделками контакта

### new Lead

Создаёт сделку, прикреплённую к контакту

### getLeads()

Получает список сделок, прикреплённых к контакту

### addLeads()

Прикрепляет к контакту список сделок

## Работа с компанией контакта

### getCompany()

Возвращает компанию, прикреплённую к контакту

### linkCompany()

Прикрепляет компанию к контакту

### unlinkCompany()

Открепляет компанию от контакта

## Работа с примечаниями контакта

### new Note

Создаёт примечание у заданного контакта

### getNotes()

Возвращает список примечаний у контакта

### addNotes()

Добавляет примечания контакту

## Работа с задачми контакта

### new Task

Создаёт задачу, прикреплённый к контакту

### getTasks()

Получает список задач заданного контакта

### addTasks()

Добавляет список задач заданному контакту

## Работа с дополнительными полями контактов

### new crm.Contact.Field

Создаёт дополнительное поле у контакта

### crm.Contact.getFields

Получает все произвольные поля контактов

### crm.Contact.addFields

Прикрепляет к контакту массив произвольных полей

## Недокументированные возможности

### remove

Удаляет контакт из CRM

### crm.Contact.remove

Удаляет массив сделок

Метод также может работать с массивом идентификаторов

### crm.Contact.findByAttributes

Поиск по атрибутам контакта. Формирует запрос на портале.
Описание этого метода нуждается в подробностях

### crm.Contact.findByCustomFields

Поиск по произвольным полям. Формирует запрос на портале.
Описание этого метода нуждается в подробностях

### crm.Contact.findByCustomField

Поиск по произвольному полю. Формирует запрос на портале.
Описание этого метода нуждается в подробностях

### crm.Contact.findByTerm

Поиск по общему запросу. Формирует запрос на портале.
Описание этого метода нуждается в подробностях

