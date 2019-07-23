# Аккаунт

Ссылка на документацию: 
https://www.amocrm.ru/developers/content/api/account

### crm.getAccountInfo

Получает данные об аккаунте

```js
const info = await crm.getAccountInfo({
  // вернуть информацию о
  details: [
    'custom_fields',
    'users',
    'pipelines',
    'groups',
    'note_types',
    'task_types'
  ],
  // Вернёт всех пользователей, в том числе бесплатных. По умолчанию false
  includeFreeUsers: true
});
```

