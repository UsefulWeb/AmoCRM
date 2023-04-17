
# AmoCRM

[![npm version](https://img.shields.io/npm/v/amocrm-js.svg?style=flat-square)](https://github.com/UsefulWeb/AmoCRM/stargazers)
[![GitHub stars](https://img.shields.io/github/stars/UsefulWeb/AmoCRM)](https://github.com/UsefulWeb/AmoCRM/stargazers)
[![GitHub license](https://img.shields.io/github/license/UsefulWeb/AmoCRM)](https://github.com/UsefulWeb/AmoCRM/blob/master/LICENSE)

NodeJS библиотека для работы с AmoCRM.

Документация: https://usefulweb.github.io/AmoCRM

__Не предназначена для Frontend приложений__

Поддерживает OAuth авторизацию и использует адреса AmoCRM API v4.

Сделайте библиотеку самой популярной в Галактике - поставьте Star ★!

По вопросам сотрудничества [пишите мне в Telegram](https://t.me/neizerth).

## Сообщество и вопросы

[YouTube-плейлист по AmoCRM и библиотеке](https://www.youtube.com/playlist?list=PLcMMJHB8iEYmoNo5PnSjv8286zzMw4bdq)

По всем вопросам работы библиотеки заходите в [чат проекта в Telegram](https://t.me/+QKoG6INanhIyYTAy).
Сделаем вместе пространство уютным :)

## Изменения в 3.x.x по сравнению с 2.x.x

1. TypeScript исходная версия кода
2. Подсветка синтаксиса на основе TS-интерфейсов
3. Удобная передача GET-параметров
4. Добавлен выброс ошибок приложения и API-запросов
5. Добавлены новые события в компоненты приложения
6. Возможность работы с сущностями через ООП
7. Расширенная документация и примеры использования
8. Сократился объем библиотеки

## Установка

npm
```
npm install amocrm-js
```

Yarn
```
yarn add amocrm-js
```

## Использование

```js
const { Client } = require('amocrm-js');
```


ES6:

```js
import { Client } from 'amocrm-js'
```

## Содержание

1. [Подключение к CRM](#connection)
2. [Запросы к порталу](#requests)
3. [Основные методы](#request-methods)
4. [Компоненты](#components)
5. [Работа с событиями](#events)
6. [Обработка ошибок](#errors)
7. [Сохранение авторизации между сессиями](#session)
8. [Переход с версии 2.x.x](#v2-migration)

<a id="connection"></a>
## Подключение к CRM

Подключение возможно:

1. По заранее известному коду авторизации
   (например, с помощью [упрощённой авторизации](https://www.amocrm.ru/developers/content/oauth/easy-auth))
2. С помощью встроенного OAuth-сервера (см. пример ниже)

После успешного подключения клиент автоматически получает новый токен
по истечению старого перед формированием запроса

### Процесс OAuth авторизации

1. Авторзоваться на сайте AmoCRM
2. Получить код авторизации
3. Получить OAuth-токен по коду авторизации

### Получение кода авторизацию

1. С помощью [упрощённой авторизации](https://www.amocrm.ru/developers/content/oauth/easy-auth)
2. С помощью встроенного сервера авторизации данной библиотеки
3. Вручную

### Подключение по коду авторизации (упрощенная авторизация)

Его можно получить с помощью упрощенной авторизации или самостоятельно написанного обработчика
адреса интеграции (redirectUri).

```js
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
    },
});
```

### Подключение через OAuth-сервер

В AmoCRM API код авторизации можно использовать __только один раз__ для получения
токена. Последующие запросы на получение токена будут выдавать ошибку.

Чтобы облегчить процесс получения токена, в данный пакет встроен OAuth-сервер,
который может обрабатывать указанный адрес перенаправления. Сервер включает прослушивание по необходимости
и закрывает соединение по получению кода авторизации.

Пример настройки без параметра *code*:

```js
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
        /*
            Необязательный араметр состояния для проверки на корректность. 
            Используется встроенным сервером авторизации.
            см. https://www.amocrm.ru/developers/content/oauth/step-by-step#%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-Authorization-code
        */
        state: 'state',
        server: {
            // порт, на котором запустится сервер авторизации
            port: 3000
        }
    },
});
```

#### Процесс авторизации:

1. Сервер ожидает перехода пользователя по адресу: *crm.auth.getUrl(mode)*
2. При успешном переходе пользователь перенаправляется на {redirectUri}, заданный в интеграции
3. Сервер авторизации перехватывает запрос на {redirectUri}
   (как это сделать, описано ниже), извлекает код авторизации и
   с помощью *crm.auth.setCode(code)* автоматически получает токен для работы

#### Использование в целях разработки

Один из простых способ разработки интеграции: библиотека-сервис [ngrok](https://ngrok.com).
Пакет перенаправляет трафик с вашего компьютера на заданный публичный IP, который можно задать в
адресе интеграции.

[Пример использования ngrok.](examples/javascript/00-oauth/001-get-token-with-server.js)

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

<a id="factories"></a>
## Фабрики

Фабрики позволяют управлять порталом в ООП стиле.

- Используйте готовые методы вместо API-адресов
- Перебирайте сделки, контакты и пр. с помощью постраничной навигации

```js
const lead = new client.Lead;
lead.name = 'Евгений Иванов';

await lead.save();
```

```js
const lead = client.leads.getById(123);
lead.name = 'Walter Scott';
await lead.save();
```

```js
const pagination = await client.leads.get({
   order: 'created_at',
});
const leads = pagination.getData();
await pagination.next();
```

В настоящий момент библиотека поддерживает фабрики:

- Сделки [[примеры работы]](./examples/javascript/01-leads)
- Контакты [[примеры работы]](./examples/javascript/02-contacts)
- Компании [[примеры работы]](./examples/javascript/03-companies)
- Теги [[примеры работы]](./examples/javascript/04-tags)

<a id="requests"></a>
## Запросы к порталу

С указанием метода:

```js
const result = await client.request.make('GET', '/api/v4/account');
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

<a id="request-methods"></a>
## Методы *client.request*: GET, POST, PATCH

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
const response = await client.request.patch('/api/v4/leads', [
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

<a id="components"></a>
## Компоненты

### client.environment

В нём хранятся все переданные ранее настройки

#### client.environment.get(path?)

Получить настройки, переданные конструктору Client

```js
const { Client } = require('amocrm-js');

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
client.environment.set('auth.state', 'newsState');
```

### client.connection

#### client.connection.connect()

Получает токен на основе (в зависимости от ситуации):
1. Кода авторизации (config.auth.code)
2. Старого токена, если он истёк (refresh_token)
3. Кода авторизации, полученного с помощью перехода пользователя по ссылке. Использует встроенный сервер авторизации

#### client.connection.update()

#### События

- check. Проверка
- beforeConnect. Возникает перед началом соединения
- connected. Успешное соединение
- connectionError. Ошибка соединения
- authServer:code. Успешное получение кода авторизации
- authServer:listen. Начало работы сервера авторизации
- authServer:close. Сервер авторизации завершает прослушивать сооб
- authServer:serverError. Ошибка сервера авторизации

```js
client.connection.on('connectionError', () => {
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

#### client.auth.setCode(code)

Устанавливает код авторизации и удаляет информацию о текущем токене. Желательно применять именно этот метод
в сравнение с client.environment.set('auth.code');

### client.token

#### client.token.setValue(value)

Устанавливает новое значение токена.

#### client.token.getValue()

Возвращает текущее значение токена.

#### client.token.refresh()

Обновляет токен по значению refresh_token текущего. Явно вызывать нет необходимости, так как
при каждом запросе идёт проверка токена на актуальность. Если время жизни токена истекло, этот метод
будет вызван автоматически.

После обновления, токен автоматически устанавливается в приложении.

#### client.token.fetch()

Получение токена по коду авторизации. После обновления, токен автоматически устанавливается в приложении.

#### События

- beforeChange. Возникает после получения по API токена и до того как он будет установлен в приложении
- change. Возникает после установления нового значения в приложении
- expirationCheck. Возникает при проверке актуальности токена
- beforeFetch. Возникает перед попыткой получения токена по коду авторизации
- fetch. Возникает после получения токена по коду авторизации
- beforeRefresh. Возникает перед попыткой обновления токена по значению refresh_token текущего
- refresh. Возникает после получения нового токена по значению refresh_token старого

```js
client.token.on('change', () => {
    console.error('Токен обновлён');
})
```

<a id="events"></a>
## Работа с событиями 

Компоненты Auth, Token, Connection унаследованы от класса
[EventEmitter](https://nodejs.org/api/events.html). То есть они все поддерживают
методы подписки на события (on, off, removeAllListeners) и отписки от них, принятые в EventEmitter.

<a id="errors"></a>
## Обработка ошибок 

- NO_JSON_RESPONSE. Пустой ответ
- INVALID_JSON_RESPONSE. Некорректный JSON вет
- API_RESPONSE_ERROR. Ошибка в ответе по API
- NO_TOKEN_AND_CODE. В настройках отсуствует код и не установлен токен
- CONNECTION_ERROR. Неудачное соединение
- NO_ENVIRONMENT_OPTIONS. Отсутствуют настройки
- PATH_IS_EMPTY. Попытка установить client.environment.set без переданного первого пути
- INVALID_PATH. Неверный
- NO_AUTH_OPTIONS. Отсутствуют настройки config.auth
- JSON_PARSE_ERROR. Ответ AmoCRM сформирован в неверном JSON формате

<a id="session"></a>
## Сохранение авторизации между сессиями

Может быть полезным сохранять авторизацию между запусками приложения. Для этого есть событие `change`
компонента client.token, в которое приходит новый токен при каждом сохранении.

Этот токен можно сохранять куда вам удобно (БД, файлы и тд). При инициализации соединения можно заранее установить токен для восстановления авторизации:
`crm.token.setValue(currentToken)`

[Пример реализации через сохранение в файл](./examples/javascript/00-common/01-session.js)

<a id="v2-migration"></a>
## Переход с версии 2.x.x

### Методы

- client.connect -> client.connection.connect
- client.request(method, path, params, options) -> client.request.make(method, path, params, options)
- client.connection.getAuthUrl() -> client.auth.getUrl()
- client.connection.setState(state) -> client.environment.set('auth.state', state)
- client.connection.getState() -> client.environment.get('auth.state')
- client.connection.getToken() -> client.token.getValue()
- client.connection.setToken(token) -> client.token.setValue(token)
- client.connection.refreshToken() -> client.token.refresh()

#### client.connection.setCode(code)

Замена: client.auth.setCode(code)

Вызов этого метода в версии 2.x.x приводит к обновлению токена по только что заданному коду.

В текущей версии это происходит при последующем запросе к API. Старая версия эквивалентна:

```js
client.auth.setCode(code);
await client.connection.connect();
```

### События

- client.on('connection:beforeConnect') -> client.connection.on('beforeConnect')
- client.on('connection:beforeFetchToken') -> client.token.on('beforeFetch')
- client.on('connection:beforeRefreshToken') -> client.token.on('beforeRefresh')
- client.on('connection:checkToken') -> client.token.on('expirationCheck')
- client.on('connection:authError') -> client.connection.on('connectionError')
- client.on('connection:connected') -> client.connection.on('connected')
- client.on('connection:error') -> client.connection.on('connectionError')
- client.on('connection:newToken') -> client.token.on('change')

## Примеры

Общее:
- [Сохранение сессии](./examples/javascript/00-common/01-session.js)
- [Работа с сервером авторизации](./examples/javascript/00-oauth/001-get-token-with-server.js)

Работа с фабриками:
- Сделки [[примеры работы]](./examples/javascript/01-leads)
- Контакты [[примеры работы]](./examples/javascript/02-contacts)
- Компании [[примеры работы]](./examples/javascript/03-companies)

## Доска почёта

Спасибо @amorev, @maxism, @shuraman69, @korovenko-tatyana, @lotgyero, @capfsb за вклад в разработку этого проекта

Отдельная благодарность @dmitrytemlead за возможность протестировать библиотеку в стороннем проекте
