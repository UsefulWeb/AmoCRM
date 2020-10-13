# AmoCRM

Javascript библиотека для работы с AmoCRM

Данная версия библиотеки поддерживает OAuth авторизацию и использует адреса AmoCRM API v4. 

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

Подключение возможно:

1. По заранее известному коду авторизации
(например, с помощью [упрощённой авторизации](https://www.amocrm.ru/developers/content/oauth/easy-auth))
2. С помощью встроенного OAuth-сервера (см. пример ниже)

## Что такое OAuth и как всё настроить?

Я снял для вас отдельное видео, ознакомьтесь с основами работы нового протокола и библиотеки: https://youtu.be/eK7xYAbxJHo

### Код авторизации известен

Его можно получить с помощью упрощенной авторизации или самостоятельно написанного обработчика 
адреса интеграции (redirectUri).

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

### Встроенный OAuth-сервер

В AmoCRM API у кода авторизации есть особенность: его можно использовать __только один раз__ для получения 
токена. Последующие запросы на получение токена будут выдавать ошибку.

Чтобы облегчить процесс получения токена, в данный пакет встроен OAuth-сервер, 
который может обрабатывать указанный адрес перенаправления.

Пример настройки без параметра *code*:

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
      redirect_uri: 'redirectUri', // Ссылка для перенаправления,
      server: {
        // порт, на котором запустится сервер авторизации
        port: 3000
      }
    },
});
```

Как выглядит процесс авторизации:

1. Сервер ожидает перехода пользователя по адресу: *crm.connection.getAuthUrl(mode)*
2. При успешном переходе пользователь перенаправляется на {redirectUri}, заданный в интеграции
3. Сервер авторизации перехватывает запрос на {redirectUri} 
(как это сделать, описано ниже), извлекает код авторизации и
с помощью *crm.connection.setCode(code)* автоматически получает токен для работы

#### Использование в целях разработки

Один из простых способ разработки интеграции: библиотека-сервис [ngrok](https://ngrok.com).
Пакет перенаправляет трафик с вашего компьютера на заданный публичный IP, который можно задать в
адресе интеграции.

После установки пакета:

1. Выполните в терминале команду: ```ngrok http 3001```
2. Полученный в результат адрес вида https://311e923c5281.ngrok.io указываем в настройках интеграции AmoCRM
3. В настройках указываем номер порта (в нашем примере 3001) и полученный ngrok-адрес в {auth.redirect_uri}
4. Получаем адрес ссылке, по которой необходимо будет перейти через *crm.connection.getAuthUrl()*
5. Переходим по ссылке, после этого код автоматически установится и библиотека запросит новый токен

Пример настроек:

```js
const crm = new AmoCRM({
    // ...
    auth: {
      // ...
      redirect_uri: 'https://311e923c5281.ngrok.io',
      server: {
        port: 3001
      }
    },
});
```

#### Разработка на production-сервере

Для работы сервера авторизации на «боевом» хостинге ему нужно выполнение условий:

1. Публичный IP-адрес, на котором находится проект
2. Порт сервера авторизации, указанный в настройках данной библиотеки (*auth.server.port*), 
открыт для внешних подключений или работает прокси-переадресация в настройках виртуального хоста.

После остаётся только заменить адрес {redirectUri} на адрес 
вашего хоста в настройках библиотеки и интеграции. 

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
 3. *crm.connection.getAuthUrl(mode)* - возвращает адрес ссылки, по которой должен перейти пользователь.
 Параметр mode отвечает за обработку запроса на Redirect URI. 
 В случае popup – окно авторизации будет закрыто, а переход на Redirect URI будет выполнен в основном окне. 
 В случае передачи значения post_message – перенаправление произойдет в окне, которое было открыто, после обработки кода авторизации вам нужно закрыть окно
 4. *crm.connection.setState(state)* - задаёт произвольную строку состояния 
 (используется для проверки подлинности во встроенном сервере авторизации)
 5. *crm.connection.getState(state)* - возвращает строку состояния
 6. *crm.connection.getToken()* - возвращает текущий токен авторизации
 7. *crm.connection.setToken( token )* - задаёт токен авторизации. Токен должен включать поле expires_at (timestamp, когда токен истечёт)
 
## Работа с событиями

В настоящий момент доступны следующие события:

1. connection:beforeConnect
2. connection:beforeFetchToken
3. connection:beforeRefreshToken
4. connection:checkToken
5. connection:authError
6. connection:connected
7. connection:error
8. connection:newToken

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

### Сохранение авторизации между сессиями

Может быть полезным сохранять авторизацию между запусками приложения. Для этого есть событие `connection:newToken`, в которое приходит новый токен при каждом сохранении. 

Этот токен можно сохранять куда вам удобно (БД, файлы и тд). При инициализации соединения можно заранее установить токен для восстановления авторизации:
`crm.connection.setToken( currentToken )`

Ниже пример реализации через сохранение в файл token.json который лежит рядом со скриптом
```javascript
  crm.on( 'connection:newToken', response => {
    fs.writeFileSync( './token.json', JSON.stringify( response.data ));
  });
  try {
    const currentToken = require( './token.json' );
    crm.connection.setToken( currentToken );
  } catch (e) {
    // Token file not found
  }
```

## Доска почёта

Спасибо @amorev, @maxism за вклад в разработку этого проекта

Отдельная благодарность @dmitrytemlead за возможность протестировать библиотеку в стороннем проекте
