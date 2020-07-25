# AmoCRM

Javascript библиотека для работы с AmoCRM

Данная версия библиотеки поддерживает OAuth авторизацию и использует адреса AmoRM API v4. 

[Поблагодарить можно тут](https://yasobe.ru/na/cisterna_kofe_dlya_razrabot4ika_biblioteki_amocrm)

## Изменения в 2.x.x по сравнению с 1.x.x

1. Поддержка AmoCRM API v4
2. Поддержка OAuth
3. Поддержка метода PATCH
4. Расширенная информация об ответе (статус ответа, время ответа и т.д)

Если вам нужна поддержка AmoCRM API v2, используйте версии 1.x.x данного пакета. 

## Установка

```
npm install amocrm-js
```

## Подключение к CRM
```js
const AmoCRM = require( 'amocrm-js' );

const crm = new AmoCRM({
    // логин пользователя в портале, где адрес портала domain.amocrm.ru
    domain: 'domain', // может быть указан полный домен вида domain.amocrm.ru, domain.amocrm.com
    /* 
      Информация об интеграции (подробности подключения 
      описаны на https://www.amocrm.ru/developers/content/oauth/step-by-step)
    */
    auth: {
      client_id: 'clientId', // ID интеграции
      client_secret: 'clientSecret', // Секретный ключ
      redirect_uri: 'redirectUri', // Ссылка для перенаправления
      code: 'code' // Код авторизации
    },
});

```

## Запросы к порталу

С указанием метода:

```js

const response = await crm.request( 'GET', '/api/v4/account' );
// возвращает тело ответа 
console.log( response.data );
/* 
  Возвращает расширенную информацию об ответе - 
  экземпляр http.ServerResponse:
  https://nodejs.org/api/http.html#http_class_http_serverresponse

*/
console.log( response.info );
// к примеру, HTTP-статус ответа операции
console.log( response.info.statusCode );
```

Методы *crm.request*: get, post, patch

```js
const response = await crm.request.get( '/api/v4/contacts')
```

```js
const response = await crm.request
    .post( '/api/v4/contacts', 
      [
        {
          name: "Walter White",
          request_id: 143,
          // другие поля ...
        }
      ]
    )
```

```js
const response = await crm.request
  .patch( '/api/v4/leads',
    [
      {
        "id": 54886,
        "pipeline_id": 47521,
        "status_id": 143,
        "date_close": 1589297221,
        "loss_reason_id": 7323,
        "updated_by": 0
      }
    ]
  )
```

## OAuth

 Клиент автоматически получает новый токен по истечению
 старого (при необходимости).
 
 Методы:
 
 1. *crm.connection.setCode(code)* - устанавливает код авторизации 
 и получает токен авторизации.
 2. *crm.connection.refreshToken()* - получает новый токен 
 на основе текущего (по полю *refresh_token*). 
 Вызывается автоматически при необходимости обновления.

## Работа с событиями

В настоящий момент доступны следующие события:

1. connection:beforeConnect
2. connection:beforeFetchToken
3. connection:beforeRefreshToken
4. connection:checkToken
5. connection:authError
6. connection:connected
7. connection:error

Добавление обработчика:

```javascript
crm.on( 'connection:error', () => console.log( 'Ошибка соединения' ));
```

Удаление обработчика:

```javascript
const handler = () => console.log( 'Ошибка соединения' );
crm.on( 'connection:error', handler );

// удалить конкретный обработчик
crm.off( 'connection:error', handler );

// удалить все обработчики конкретного события
crm.off( 'connection:error' );

// удалить все обработчики всех событий
crm.off();
```
