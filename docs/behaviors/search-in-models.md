# Поиск в моделях

Некоторые фабрики имеют возможность искать данные в CRM:

## Поддержка Findable и FindableById

Следующие фабрики поддерживают поведения Findable
и FindableById для получения списка результатов и одного
экземпляра

1. Lead
2. Company
3. Contact
4. Customer
5. Pipeline
6. Task
7. Note (с изменённым методом *findById*, читайте далее)

## FindableById в NoteFactory

Фабрика crm.Note имеет видоизменённый метод
*findById* по причине того, что сама документация 
AmoCRM считает, что помимо id необходимо передавать ещё и тип сущности,
к которой прикреплена заметка

```js
crm.Note.findById( 123123, 'lead' )
  .then( note => console.log( note ));
// также существует константа
const type = crm.Note.ELEMENT_TYPE_NAME.LEAD;
crm.Note.findById( 123123, type )
  .then( note => console.log( note ));
```
