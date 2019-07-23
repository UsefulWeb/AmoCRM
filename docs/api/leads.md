# Сделки

Ссылка на документацию:
https://www.amocrm.ru/developers/content/api/leads

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
const leads = await crm.Lead.findById({
    // принимает все параметры, описанные док
    query: 'Пропущенный звонок'
});
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

### save()

### fetch()

### exists()

## Работа с примчениями

### notes.add() / addNote()

### notes.get() / getNotes()

## Работа с задачами

### tasks.add() / addTask()

### tasks.get() / getTasks()

## Работа с дополнительными полями

### fields.add() / addField()

### fields.get() / getFields()

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

### crm.Lead.findByCustomFields

### crm.Lead.findByCustomField

### crm.Lead.findByCustomFields

