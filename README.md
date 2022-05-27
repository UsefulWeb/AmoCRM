# AmoCRM

[![npm version](https://img.shields.io/npm/v/amocrm-js.svg?style=flat-square)](https://github.com/UsefulWeb/AmoCRM/stargazers)
[![GitHub stars](https://img.shields.io/github/stars/UsefulWeb/AmoCRM)](https://github.com/UsefulWeb/AmoCRM/stargazers)
[![GitHub license](https://img.shields.io/github/license/UsefulWeb/AmoCRM)](https://github.com/UsefulWeb/AmoCRM/blob/master/LICENSE)

JavaScript библиотека для работы с AmoCRM

Поддерживает OAuth авторизацию и использует адреса AmoCRM API v4. 

## Изменения в 3.x.x по сравнению с 2.x.x

1. TypeScript исходная версия кода
2. Подсветка синтаксиса на основе TS-интерфейсов
3. Удобная передача GET-параметров 
4. Добавлен выброс ошибок приложения и API-запросов
5. Добавлены новые события в компоненты приложения

## Установка

npm
```
npm install amocrm-js
```

Yarn
```
yarn add amocrm-js
```

## Подключение к CRM

Подключение возможно:

1. По заранее известному коду авторизации
(например, с помощью [упрощённой авторизации](https://www.amocrm.ru/developers/content/oauth/easy-auth))
2. С помощью встроенного OAuth-сервера (см. пример ниже)

### Код авторизации известен

Его можно получить с помощью упрощенной авторизации или самостоятельно написанного обработчика 
адреса интеграции (redirectUri).

```js
const Client = require( 'amocrm-js' );

const client = new Client({
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
      code: 'code', // Код для упрощённой авторизации, необязательный
      /*
        Параметр состояния для проверки на корректность. Необязательный. Используется встроенным сервером авторизации
        см. https://www.amocrm.ru/developers/content/oauth/step-by-step#%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-Authorization-code
      */
      state: 'state',
    },
});
```

### Встроенный OAuth-сервер

В AmoCRM API код авторизации можно использовать __только один раз__ для получения 
токена. Последующие запросы на получение токена будут выдавать ошибку.

Чтобы облегчить процесс получения токена, в данный пакет встроен OAuth-сервер, 
который может обрабатывать указанный адрес перенаправления. Сервер включает прослушивание по необходимости
и закрывает соединение по получению кода авторизации.

Пример настройки без параметра *code*:

```js
const Client = require('amocrm-js');

const client = new Client({
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

#### Процесс авторизации:

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
4. Получаем адрес ссылке, по которой необходимо будет перейти через *crm.auth.getUrl()*
5. Переходим по ссылке, после этого код автоматически установится и библиотека запросит новый токен

Пример настроек:

```js
const client = new Client({
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

```js
const client = new Client({
 // ...
 auth: {
  // ...
  redirect_uri: 'redirectUri',
  server: {
   port: 3001
  }
 },
});
```

## Запросы к порталу

С указанием метода:

```js
const result = await client.request.make( 'GET', '/api/v4/account' );
// возвращает тело ответа 
console.log(result.data);
/* 
  Возвращает расширенную информацию об ответе - 
  экземпляр http.IncomingMessage:
  https://nodejs.org/api/http.html#class-httpincomingmessage
*/
console.log(result.response);
// к примеру, HTTP-статус ответа операции
console.log(result.response.statusCode);
```

## Методы *client.request*: get, post, patch

### GET

```js
const response = await client.request.get('/api/v4/contacts')
```

#### Передача параметров

С помощью querystring:

```js
const response = await client.request.get('/api/v4/contacts?with=version');
```

объектом:
```js
const response = await client.request.get('/api/v4/contacts', {
 with: 'version'
});
```

### POST

```js
const response = await client.request.post('/api/v4/contacts', [
    {
      name: "Walter White",
      request_id: 143,
      // другие поля ...
    }
  ]
);
```

### PATCH

```js
const response = await client.request.patch( '/api/v4/leads', [
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

Клиент автоматически получает новый токен по истечению старого перед формированием запроса

## Компоненты

### client.environment

В нём хранятся все переданные ранее настройки

#### client.environment.get(path?)

Получить настройки, переданные конструктору Client

```js
const Client = require('amocrm-js');

const client = new Client({
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
      code: 'code', // Код для упрощённой авторизации, необязательный
      /*
        Параметр состояния для проверки на корректность. Необязательный. Используется встроенным сервером авторизации
        см. https://www.amocrm.ru/developers/content/oauth/step-by-step#%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-Authorization-code
      */
      state: 'state',
    },
});

client.environment.get(); // возвращает весь объект настроек
client.environment.get('domain'); // 'domain';
client.environment.get('auth.redirect_uri'); // 'redirectUri'
```

#### client.environment.set(path, value)

Устанавливает новое значение в окружении

```js
client.environment.set('auth.code', 'newCode');
```

### client.connection

#### client.connection.connect()

Получает токен на основе кода авторизации (config.auth.code)

#### client.connection.update()

#### События

- check. Проверка
- beforeConnect. Возникает перед началом соединения
- connected. Успешное соединение
- error. Ошибка соединения
- authServer:code. Успешное получение кода авторизации
- authServer:listen. Начало работы сервера авторизации
- authServer:close. Сервер авторизации завершает прослушивать сооб
- authServer:error. Ошибка сервера авторизации

```js
client.connection.on('error', () => {
    console.error('Произошла ошибка соединения');
})
```

### client.auth

#### client.auth.getUrl(mode)

Возвращает адрес ссылки на портал AmoCRM, по которой должен перейти пользователь для получения кода авторизации.

Параметр mode отвечает за обработку запроса на Redirect URI.
1. _popup_ – окно авторизации будет закрыто, а переход на Redirect URI будет выполнен в основном окне.
2. _post_message_ – перенаправление произойдет в окне, которое было открыто, 
после обработки кода авторизации вам нужно закрыть окно

### client.token

#### client.token.setValue(value)

Устанавливает новое значение токена.

#### client.token.getValue()

Возвращает текущее значение токена.

#### События

- beforeChange. Возникает после получения по API токена и до того как он будет установлен в приложении
- change. Возникает после установления нового значения в приложении
- expirationCheck. Возникает при проверке актуальности токена
- beforeFetch. Возникает перед попыткой получения токена по коду авторизации
- fetch. Возникает после получения токена по коду авторизации
- beforeRefresh. Возникает перед попыткой обновления токена по значению refresh_token текущего
- refresh. Возникает после получения нового токена по значению refresh_token старого

```js
client.connection.on('change', () => {
    console.error('Произошла ошибка соединения');
})
```

## Работа с событиями

Все компоненты приложения (auth, token, connection) унаследованы от класса 
[EventEmitter](https://nodejs.org/api/events.html). То есть они все поддерживают 
методы подписки на события (on, off, removeAllListeners) и отписки от них, принятые в EventEmitter.

## Ошибки

- NO_JSON_RESPONSE. Пустой ответ
- INVALID_JSON_RESPONSE. Некорректный JSON вет
- API_RESPONSE_ERROR. Ошибка в ответе по API
- NO_TOKEN_AND_CODE. В настройках отсуствует код и не установлен токен
- CONNECTION_ERROR. Неудачное соединение
- NO_ENVIRONMENT_OPTIONS. Отсутствуют настройки
- PATH_IS_EMPTY. Попытка установить client.environment.set без переданного первого пути  
- INVALID_PATH. Неверный
- NO_AUTH_OPTIONS. Отсутствуют настройки config.auth

## Сохранение авторизации между сессиями

Может быть полезным сохранять авторизацию между запусками приложения. Для этого есть событие `change` 
компонента client.token, в которое приходит новый токен при каждом сохранении. 

Этот токен можно сохранять куда вам удобно (БД, файлы и тд). При инициализации соединения можно заранее установить токен для восстановления авторизации:
`crm.token.setValue(currentToken)`

Ниже пример реализации через сохранение в файл token.json который лежит рядом со скриптом

```js
  client.connection.on('change', () => {
      const token = client.token.getValue();
      fs.writeFileSync('./token.json', JSON.stringify(token));
  });
  try {
      const currentToken = require('./token.json');
      client.token.setValue(currentToken);
  } catch (e) {
    // Файл не найден
  }
```

## Доска почёта

Спасибо @amorev, @maxism за вклад в разработку этого проекта

Отдельная благодарность @dmitrytemlead за возможность протестировать библиотеку в стороннем проекте
