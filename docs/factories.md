# Фабрики

В настоящий момент доступны следующие фабрики:

```js

crm.Lead // манипуляции со сделками
crm.Contact // манипуляции с контактами
crm.Company // манипуляции с компаниями
```

(*crm* в данном случае - [экземпляр AmoCRM](./connection.md))

Каждая из фабрик имеет методы для множественных операций со сделками:

```js
factory.find( criteria );
factory.findById( id );
factory.insert( items );
factory.update( items );
factory.remove( items );
```

(*factory* в данном случае - одна из указанных выше фабрик)
