# Сделки

Ссылка на документацию:
https://www.amocrm.ru/developers/content/api/leads

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

| Метод      | Описание                                              |
|------------|-------------------------------------------------------|
|find        |Находит сделки по заданному критерию                   |
|findById    |Находит сделку с заданным id                           |
|insert      |Создаёт массив сделок одним запросом к CRM             |
|update      |Обновляет массив сделок одним запросом к CRM           |
|from        |Преобразует массив атрибутов в массив объектов crm.Lead|
|new crm.Lead|Создаёт объект сделки                                  |

<details>
<summary>
Синонимы
</summary>

| Метод | Описание           |
|-------|--------------------|
|of     |Синоним new crm.Lead|
|create |Синоним new crm.Lead|

</details>


### Работа с объектом сделки

Работа с атрибутами сделки

| Метод | Описание |
|-------|----------|
|save   |Сохраняет изменения в сделке.|
|fetch|Заменяет все несохранённые данные актуальными из CRM|
|exists|Проверяет, существует ли до сих пор сделка в CRM.|

### Работа с контактами сделки

| Метод | Описание |
|-------|----------|
|contacts.link|Прикрепляет контакты к сделке|
|contacts.get|Получает список контактов, прикреплённых к сделке|
|contacts.unlink|Открепляет контакты от сделки|

<details>
<summary>
Синонимы
</summary>

| Метод | Описание |
|-------|----------|
|linkContacts|Синоним contacts.link|
|getContacts|Синоним contacts.get|
|unlinkContacts|Синоним contacts.unlink|

</details>

### Работа с компанией сделки

| Метод | Описание |
|-------|----------|
|company.link|Прикрепляет компанию к сделке|
|company.get|Получает компанию, которая прикреплена к сделке|
|company.unlink|Открепляет компанию от сделки|

<details>
<summary>
Синонимы
</summary>

| Метод | Описание |
|-------|----------|
|linkCompany|Синоним company.link|
|getCompany|Синоним company.get|
|unlinkCompany|Синоним company.unlink|

</details>

### Работа с примечаниями сделки

| Метод | Описание |
|-------|----------|
|new Note|Создаёт заметку, которая будет прикреплена к сделке|
|notes.get|Получает список примечаний для данной сделки|
|notes.add|Прикрепляет к сделке массив примечаний|

<details>
<summary>
Синонимы
</summary>

| Метод | Описание |
|-------|----------|
|notes.create|Синоним new Note|
|getNotes|Синоним notes.get|
|addNotes|Синоним notes.add|

</details>

### Работа с задачами сделки

| Метод | Описание |
|-------|----------|
|new Task|Создаёт задачу, которая будет прикреплена к сделке|
|tasks.get|Получает все задачи, прикреплённые к сделке|
|tasks.add|Прикрепляет к сделке массив примечаний|

<details>
<summary>
Синонимы
</summary>

| Метод | Описание |
|-------|----------|
|tasks.create|Синоним new Task|
|getTasks|Синоним tasks.get|
|addTasks|Синоним tasks.add|

</details>

### Работа с дополнительными полями сделок

| Метод | Описание |
|-------|----------|
|new crm.Lead.Field|Создаёт дополнительное поле у сделки|
|crm.Lead.fields.get|Получает все произвольные поля сделок|
|crm.Lead.fields.add|Прикрепляет к сделке массив произвольных полей|

<details>
<summary>
Синонимы
</summary>

| Метод | Описание |
|-------|----------|
|crm.Lead.fields.create|Синоним new crm.Lead.Field|
|crm.Lead.getFields|Синоним crm.Lead.fields.get|
|crm.Lead.addFields|Синоним crm.Lead.fields.add|
</details>

## Множественные операции

### crm.Lead.find

Находит сделки по заданному критерию

```js
const leads = await crm.Lead.find({
    // принимает все параметры, описанные док
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

### contacts.link() / linkContacts()

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

### contacts.get() / getContacts()

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

### contacts.unlink() / unlinkContacts()

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

## Работа с компанией

### company.link() / linkCompany()

Прикрепляет компанию к сделке

```js
const lead = await crm.Lead.findById( 127311 );

const company = await crm.Company.findById( 539712 );

// Аналогично lead.linkCompany
await lead.company.link( company );
```

### company.get() / getCompany()

Получает компанию, которая прикреплена к сделке

```js
const lead = await crm.Lead.findById( 127311 );

// Аналогично lead.getCompany
const company = await lead.company.get();
```

### company.unlink() / unlinkCompany()

Открепляет компанию от сделки

```js
const lead = await crm.Lead.findById( 127311 );

// Аналогично lead.unlinkCompany
await lead.company.unlink();
```

## Работа с примечениями

### notes.create() / new Note()

Создаёт заметку, которая будет прикреплена к сделке.
Данные не добавляются в AmoCRM, для этого вам нужно вручную вызвать
*save()*.

```js
const lead = await crm.Lead.findById( 127311 );

// аналогично lead.notes.create
const note = new lead.Note({
  text: 'Это важно!'
});

// добавляем данные в CRM
await note.save();
```

### notes.get() / getNotes()

Получает список примечаний для данной сделки

```js
const lead = await crm.Lead.findById( 127311 );

const notes = await lead.notes.get();
```

Можно также задать дополнительный критерий получения примечаний.

```js
const lead = await crm.Lead.findById( 127311 );

// найдёт 10 первых примечаний
const notes = await lead.notes.get({
  limit_rows: 10
});
```

Параметры, которые можно задать, смотрите по ссылке в официальной документации:
https://www.amocrm.ru/developers/content/api/notes

### notes.add() / addNotes()

Прикрепляет к сделке массив примечаний.

```js
const lead = await crm.Lead.findById( 127311 );

const note = new crm.Note({
  text: 'Это важно!'
});

// аналогично lead.addNotes
lead.notes.add([ note ]);
```

## Работа с задачами

### tasks.create() / new Task()

Создаёт задачу, которая будет прикреплена к сделке.
Данные не добавляются в AmoCRM, для этого вам нужно вручную вызвать
*save()*.

```js
const lead = await crm.Lead.findById( 127311 );

// аналогично lead.tasks.create
const task = new lead.Task({
  text: 'Не забыть перезвонить',
});

// добавляем данные в CRM
await task.save();
```

### tasks.get() / getTasks()

Получает все задачи, прикреплённые к сделке

```js
const lead = await crm.Lead.findById( 127311 );

// аналогично lead.getTasks
const tasks = await lead.tasks.get();
```

Можно также задать дополнительный критерий получения задач.

```js
const lead = await crm.Lead.findById( 127311 );

// найдёт 10 первых задач
const tasks = await lead.tasks.get({
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
lead.tasks.add([ task ]);
```

## Работа с дополнительными полями

### crm.Lead.fields.create() / new crm.Lead.Field()

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

### crm.Lead.fields.get() / crm.Lead.getFields()

Получает все произвольные поля сделок.

```js
// аналогично crm.Lead.getFields
const fields = await crm.Lead.fields.get();
```

### crm.Lead.fields.add() / crm.Lead.addFields()

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
await crm.Lead.fields.add([ field ]);
```

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
