# Сделки

Ссылка на документацию:
https://www.amocrm.ru/developers/content/api/leads

```js
// Ищем первый контакт по телефону
const contact = await crm.Contact.findOne({
  query: '89991597532'
});

// Создаём сделку 
const lead = new crm.Lead({
  name: 'Покупка карандашей',
  responsible_user_id: '957083',
  contacts_id: [
    contact.id
  ],
  sale: '5000'
});

await lead.save();

// Создаём примечание к сделке
const note = new crm.Note({
  text: 'Это важно!'
});

await lead.addNotes([ note ]);

// Добавляем задачу к сделке
const task = new crm.Task({
  text: 'Не забыть перезвонить',
  responsible_user_id: '504141'
});

await lead.addTasks([ task ]);
```

## Описание методов

| Объект            | Описание                                                                        |
|-------------------|---------------------------------------------------------------------------------|
|crm.Lead           |[Множественные операции](#множественные-операции)                                |
|lead = new crm.Lead|[Работа с объектом сделки](#работа-с-объектом-сделки)                            |
|lead.contacts      |[Работа с контактами сделки](#работа-с-контактами-сделки)                        |
|lead.company       |[Работа с компанией сделки](#работа-с-компанией-сделки)                          |
|lead.notes         |[Работа с примечаниями сделки](#работа-с-примечаниями-сделки)                    |
|lead.tasks         |[Работа с задачми сделки](#работа-с-задачами-сделки)                             |
|crm.Lead.Field     |[Работа с дополнительными полями сделок](#работа-с-дополнительными-полями-сделок)|

### Множественные операции

| Метод                      | Описание                                              |
|----------------------------|-------------------------------------------------------|
|[find](#crmleadfind)        |Находит сделки по заданному критерию                   |
|[findById](#crmleadfindbyid)|Находит сделку с заданным id                           |
|[insert](#crmleadinsert)    |Создаёт массив сделок одним запросом к CRM             |
|[update](#crmleadupdate)    |Обновляет массив сделок одним запросом к CRM           |
|[from](#crmleadfrom)        |Преобразует массив атрибутов в массив объектов crm.Lead|
|[new crm.Lead](#создание)   |Создаёт объект сделки                                  |

<details>
<summary>
Синонимы
</summary>

| Метод              | Описание           |
|--------------------|--------------------|
|[of](#создание)     |Синоним new crm.Lead|
|[create](#создание) |Синоним new crm.Lead|

</details>

### Работа с объектом сделки

[Работа с атрибутами сделки](#работа-с-атрибутами-сделки)

| Метод            | Описание                                           |
|------------------|----------------------------------------------------|
|[save](#save)     |Сохраняет изменения в сделке.                       |
|[fetch](#fetch)   |Заменяет все несохранённые данные актуальными из CRM|
|[exists](#exists) |Проверяет, существует ли до сих пор сделка в CRM    |

### Работа с контактами сделки

| Метод                                            | Описание                                        |
|--------------------------------------------------|-------------------------------------------------|
|[linkContacts](#contactslink--linkcontacts)      |Прикрепляет контакты к сделке                    |
|[getContacts](#contactsget--getcontacts)         |Получает список контактов, прикреплённых к сделке|
|[unlinkContacts](#contactsunlink--unlinkcontacts)|Открепляет контакты от сделки                    |

### Работа с компанией сделки

| Метод                                         | Описание                                      |
|-----------------------------------------------|-----------------------------------------------|
|[linkCompany](#companylink--linkcompany)      |Прикрепляет компанию к сделке                  |
|[getCompany](#companyget--getcompany)         |Получает компанию, которая прикреплена к сделке|
|[unlinkCompany](#companyunlink--unlinkcompany)|Открепляет компанию от сделки                  |

### Работа с примечаниями сделки

| Метод                            | Описание                                          |
|----------------------------------|---------------------------------------------------|
|[new Note](#notescreate--new-note)|Создаёт заметку, которая будет прикреплена к сделке|
|[getNotes](#notesget--getnotes)  |Получает список примечаний для данной сделки       |
|[addNotes](#notesadd--addnotes)  |Прикрепляет к сделке массив примечаний             |

### Работа с задачами сделки

| Метод                            | Описание                                         |
|----------------------------------|--------------------------------------------------|
|[new Task](#taskscreate--new-task)|Создаёт задачу, которая будет прикреплена к сделке|
|[getTasks](#tasksget--gettasks)  |Получает все задачи, прикреплённые к сделке       |
|[addTasks](#tasksadd--addtasks)  |Прикрепляет к сделке массив примечаний            |

### Работа с дополнительными полями сделок

| Метод                                                      | Описание                                     |
|------------------------------------------------------------|----------------------------------------------|
|[new crm.Lead.Field](#crmleadfieldscreate--new-crmleadfield)|Создаёт дополнительное поле у сделки          |
|[crm.Lead.getFields](#crmleadfieldsget--crmleadgetfields)  |Получает все произвольные поля сделок         |
|[crm.Lead.addFields](#crmleadfieldsadd--crmleadaddfields)  |Прикрепляет к сделке массив произвольных полей|

## Множественные операции

### crm.Lead.find

Находит сделки по заданному критерию

```js
const leads = await crm.Lead.find({
    // принимает все параметры, описанные в документации
    query: 'Пропущенный звонок'
});
```

### crm.Lead.findById

Находит сделку (одну) с заданным id

```js
const lead = await crm.Lead.findById( 1853346 );

lead.name = 'Новое название сделки';

lead.save();
```

### crm.Lead.insert

Создаёт массив сделок одним запросом к CRM.

```js
const lead1 = new crm.Lead({
  name: 'Сделка 1'
});

const lead2 = new crm.Lead({
  name: 'Сделка 2'
});

// Возвращает массив сохранённых сделок [lead1, lead2].
const leads = await crm.Lead.insert([
  lead1,
  lead2
]);
```

Метод также может работать с обычными объектами

```js
// Возвращает массив сохранённых сделок [lead1, lead2].
const leads = await crm.Lead.insert([
  {
    name: 'Сделка 1'
  },
  {
    name: 'Сделка 2'
  }
]);
```

### crm.Lead.update

Обновляет массив сделок одним запросом к CRM.

```js
const lead1 = await crm.Lead.findById( 2381742 );
const lead2 = await crm.Lead.findById( 9735134 );

const leads = await crm.Lead.update([
  lead1,
  lead2
]);
```

## Работа с объектом сделки

### Создание

С помощью конструктора

```js
const lead = new crm.Lead;
```

Передача начальных атрибутов

```js
const lead = new crm.Lead({
  name: 'Покупка карандашей',
  responsible_user_id: '957083',
  sale: '5000'
});
```

Аналогичую работу выполняют *crm.Lead.of* и *crm.Lead.create*

```js
const lead = crm.Lead.of({
  name: 'Покупка карандашей',
  responsible_user_id: '957083',
  sale: '5000'
});
```

```js
const lead = crm.Lead.create({
  name: 'Покупка карандашей',
  responsible_user_id: '957083',
  sale: '5000'
});
```

### Работа с атрибутами сделки

В любой момент времени вы можете получить или задать 
значение атрибута сделки, обращаясь к свойству
объекта:

#### Чтение

| Метод                                      | Описание                                                               |
|--------------------------------------------|------------------------------------------------------------------------|
|lead.имя_свойства                           | Получает значение совйства                                             |
|lead.getAttribute( 'имя_свойства' )         | Аналогично lead.имя_свойства                                           |
|lead.attributes                             | Получает объект атрибутов                                              |
|lead.hasAttribute( 'имя_свойства' )         | Позволяет узнать наличие свойства у объекта                            |
|lead.isNew()                                | Проверяет, новый ли объект сделки (опирается на наличие/отсутствие id) |

```js
const lead = await crm.Lead.findById( 127311 );

console.log( lead.name ); // Получить свойство name

// Аналогично
lead.getAttribute( 'name' );

// Вернёт объект со всеми свойствами и значением всех атрибутов
console.log( lead.attributes ); 

// Проверка наличия атрибута
lead.hasAttribute( 'name' ); // true

// Проверяет, новый ли объект сделки
lead.isNew(); // false
```

#### Запись

| Метод                                          | Описание                                |
|------------------------------------------------|-----------------------------------------|
|lead.имя_свойства = значение                    | Задаёт значение совйства                |
|lead.setAttribute( 'имя_свойства', 'значение' ) | Аналогично lead.имя_свойства = значение |
|lead.attributes = valuesObject                  | Задаёт объект атрибутов                 |

При изменении значений, для того, чтобы 
они сохранились в CRM, используйте метод [save](#save)

```js
const lead = await crm.Lead.findById( 127311 );
lead.name = 'Новое значение';

// Аналогично

lead.setAttribute( 'name', 'Новое значение' );

/* 
  Полностью заменит все существующие атрибуты новыми.
  Метод сохраняет существующий id объекта в CRM
*/
lead.attributes = {
  name: 'Новое значение'
}
```

#### Удаление

| Метод                                 | Описание                            |
|---------------------------------------|-------------------------------------|
| delete lead.имя_свойства              | Удаляет свойства                    |
|lead.removeAttribute( 'имя_свойства' ) | Аналогично delete lead.имя_свойства |


При изменении значений, для того, чтобы 
они сохранились в CRM, используйте метод [save](#save)

```js
const lead = await crm.Lead.findById( 127311 );

delete lead.name;

// Аналогично
lead.removeAttribute( 'name' );
```

### crm.Lead.from

Преобразует массив атрибутов в массив объектов *crm.Lead*

```js
const leads = crm.Lead.from([
  {
    name: 'Сделка 1'
  },
  {
    name: 'Сделка 2'
  }
]);
```

### attributes

Возвращает объект с текущими атрибутами сделки

```js
const lead = await crm.Lead.findById( 127311 );

console.log( lead.attributes );
/*
{
  id: 127311,
  name: 'Заявка с сайта'
}
*/
```

### save()

Сохраняет изменения в сделке.

```js
const lead = await crm.Lead.findById( 127311 );

lead.name = 'Обновлённое название сделки';

lead.save();
```

### fetch()

Заменяет все несохранённые данные актуальными из CRM.

```js
const lead = await crm.Lead.findById( 127311 );
console.log( lead.name ); // Заказ обратного звонка

lead.name = 'Это название сделки не сохранится, так как не вызван save()';

lead.fetch();
console.log( lead.name ); // Заказ обратного звонка
```

### exists()

Проверяет, существует ли до сих пор сделка в CRM.

```js
const lead = await crm.Lead.findById( 127311 );

// пока ещё сделка есть в CRM
console.log( await lead.exists()); // true

// ... спустя некоторое время менеджер удалил сделку в CRM ...

console.log( await lead.exists()); // false
```

## Работа с контактами

### linkContacts()

Прикрепляет контакты к сделке.

```js
const lead = await crm.Lead.findById( 127311 );

// аналогично lead.linkContacts
await lead.contacts.link([
  // массив идентификаторов контактов
  539712,
  781242
]);
```

В метод можно также передавать массив объектов.

```js
const lead = await crm.Lead.findById( 127311 );

const contact1 = await crm.Contact.findById( 539712 );
const contact2 = await crm.Contact.findById( 781242 );

// аналогично lead.linkContacts
await lead.contacts.link([
  contact1,
  contact2
]);
```

#### Внутренняя работа метода

Добавляет к свойству *contacts_id* новые значения (сохраняя прежние)
и вызывает *save()* 

### getContacts()

Получает список контактов, прикреплённых к сделке

```js
const lead = await crm.Lead.findById( 127311 );

// аналогично lead.getContacts
const contacts = await lead.contacts.get();
```

Можно также задать дополнительный критерий получения контактов.

```js
const lead = await crm.Lead.findById( 127311 );

// найдёт контакты для данной сделки с заданным ответственным пользователем
const contacts = await lead.contacts.get({
  responsible_user_id: 181732
});
```

Параметры, которые можно задать, смотрите по ссылке в официальной документации:
https://www.amocrm.ru/developers/content/api/contacts

### unlinkContacts()

Открепляет контакты от сделки

```js
const lead = await crm.Lead.findById( 127311 );

// аналогично lead.unlinkContacts
await lead.contacts.unlink([
  // массив идентификаторов контактов
  539712,
  781242
]);
```

В метод можно также передавать массив объектов.

```js
const lead = await crm.Lead.findById( 127311 );

const contact1 = await crm.Contact.findById( 539712 );
const contact2 = await crm.Contact.findById( 781242 );

// аналогично lead.unlinkContacts
await lead.contacts.unlink([
  contact1,
  contact2
]);
```

Пример 2:

```js
const lead = await crm.Lead.findById( 127311 );

const contacts = await lead.contacts.get();

// открепит все контакты от сделки
await lead.contacts.unlink( contacts );
```

#### Внутренняя работа метода

Задаёт значение свойства *unlink.contacts_id* идентификаторам
и вызывает *save()*

## Работа с компанией

### linkCompany()

Прикрепляет компанию к сделке

```js
const lead = await crm.Lead.findById( 127311 );

const company = await crm.Company.findById( 539712 );

// Аналогично lead.linkCompany
await lead.company.link( company );
```

#### Внутренняя работа метода

Заменяет свойство *company_id* новоым значением
и вызывает *save()* 

### getCompany()

Получает компанию, которая прикреплена к сделке

```js
const lead = await crm.Lead.findById( 127311 );

// Аналогично lead.getCompany
const company = await lead.company.get();
```

### unlinkCompany()

Открепляет компанию от сделки

```js
const lead = await crm.Lead.findById( 127311 );

// Аналогично lead.unlinkCompany
await lead.company.unlink();
```

#### Внутренняя работа метода

Задаёт значение свойства *unlink.company_id* идентификаторам
и вызывает *save()*

## Работа с примечениями

### new Note()

Создаёт заметку, которая будет прикреплена к сделке.
Данные не добавляются в AmoCRM, для этого вам нужно вручную вызвать
*save()*.

```js
const lead = await crm.Lead.findById( 127311 );

const note = new lead.Note({
  text: 'Это важно!'
});

// добавляем данные в CRM
await note.save();
```

#### Внутренняя работа метода

Задаёт соответствующие значения свойств 
*element_type* и *element_id*
у передаваемых объектов *Note*

### getNotes()

Получает список примечаний для данной сделки

```js
const lead = await crm.Lead.findById( 127311 );

const notes = await lead.getNotes();
```

Можно также задать дополнительный критерий получения примечаний.

```js
const lead = await crm.Lead.findById( 127311 );

// найдёт 10 первых примечаний
const notes = await lead.getNotes({
  limit_rows: 10
});
```

Параметры, которые можно задать, смотрите по ссылке в официальной документации:
https://www.amocrm.ru/developers/content/api/notes

### addNotes()

Прикрепляет к сделке массив примечаний.

```js
const lead = await crm.Lead.findById( 127311 );

const note = new crm.Note({
  text: 'Это важно!'
});

// аналогично lead.addNotes
lead.addNotes([ note ]);
```

#### Внутренняя работа метода

Задаёт соответствующие значения свойств 
*element_type* и *element_id*
у передаваемых объектов *Note* 
и вызывает *crm.Note.insert*

## Работа с задачами

### new Task()

Создаёт задачу, которая будет прикреплена к сделке.
Данные не добавляются в AmoCRM, для этого вам нужно вручную вызвать
*save()*.

```js
const lead = await crm.Lead.findById( 127311 );

const task = new lead.Task({
  text: 'Не забыть перезвонить',
});

// добавляем данные в CRM
await task.save();
```

#### Внутренняя работа метода

Задаёт соответствующие значения свойств 
*element_type* и *element_id*
у передаваемых объектов *Task*

### getTasks()

Получает все задачи, прикреплённые к сделке

```js
const lead = await crm.Lead.findById( 127311 );

const tasks = await lead.getTasks();
```

Можно также задать дополнительный критерий получения задач.

```js
const lead = await crm.Lead.findById( 127311 );

// найдёт 10 первых задач
const tasks = await lead.getTasks({
  limit_rows: 10
});
```

Параметры, которые можно задать, смотрите по ссылке в официальной документации:
https://www.amocrm.ru/developers/content/api/tasks

### tasks.add() / addTasks()

Прикрепляет к сделке массив примечаний.

```js
const lead = await crm.Lead.findById( 127311 );

const task = new crm.Task({
  text: 'Это важно!'
});

// аналогично lead.addTasks
lead.addTasks([ task ]);
```

#### Внутренняя работа метода

Задаёт соответствующие значения свойств 
*element_type* и *element_id*
у передаваемых объектов *Task*
и вызывает *crm.Task.insert*

## Работа с дополнительными полями

### new crm.Lead.Field()

Создаёт дополнительное поле у сделки.
Данные не добавляются в AmoCRM, для этого вам нужно вручную вызвать
*save()*.

```js
// аналогично crm.Lead.fields.create
const field = new crm.Lead.Field({
  name: "Выбор цветов",
  field_type: "5",
  origin: "528d0285c1f9180911159a9dc6f759b3_zendesk_widget",
  is_editable: "0",
  enums: [
    "чёрный",
    "белый",
    "красный",
    "жёлтый",
    "синий",
    "зелёный"
  ]
});

// добавляем данные в CRM
await field.save();
```

#### Внутренняя работа метода

Задаёт соответствующее значение свойства *element_type*

### crm.Lead.getFields()

Получает все произвольные поля сделок.

```js
const fields = await crm.Lead.getFields();
```

### crm.Lead.addFields()

Прикрепляет к сделке массив произвольных полей.

```js
const field = new crm.Field({
  name: "Выбор цветов",
  field_type: "5",
  origin: "528d0285c1f9180911159a9dc6f759b3_zendesk_widget",
  is_editable: "0",
  enums: [
    "чёрный",
    "белый",
    "красный",
    "жёлтый",
    "синий",
    "зелёный"
  ]
});

// аналогично crm.Lead.addFields
await crm.Lead.addFields([ field ]);
```

#### Внутренняя работа метода

Задаёт соответствующее значение свойства *element_type*
у всех объектов *crm.Field*

## Недокументированные возможности

Данные возможности не описаны в документации AmoCRM, их стабильность
и поддержка в будущем не гарантируется.

### crm.Lead.remove

Удаляет массив сделок

```js
const lead1 = await crm.Lead.findById( 2381742 );
const lead2 = await crm.Lead.findById( 9735134 );

const leads = await crm.Lead.remove([
  lead1,
  lead2
]);
```

Метод также может работать с массивом идентификаторов

```js
// Возвращает массив сохранённых сделок [lead1, lead2].
const leads = await crm.Lead.remove([ 2381742, 9735134 ]);
```

### crm.Lead.findByAttributes

Поиск по атрибутам сделки. Формирует запрос на портале.
Описание этого метода нуждается в подробностях

### crm.Lead.findByCustomFields

Поиск по произвольным полям. Формирует запрос на портале.
Описание этого метода нуждается в подробностях

### crm.Lead.findByCustomField

Поиск по произвольному полю. Формирует запрос на портале.
Описание этого метода нуждается в подробностях

### crm.Lead.findByTerm

Поиск по общему запросу. Формирует запрос на портале.
Описание этого метода нуждается в подробностях

