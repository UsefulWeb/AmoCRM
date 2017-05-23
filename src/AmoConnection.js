'use strict';

const AmoRequest = require( './AmoRequest.js' );
let _isConnected = new WeakMap,
  _options = new WeakMap;

/**
 * Класс соединения с сервером AmoCRM.
 * Использует для работы AmoRequest
 */
class AmoConnection {
  /**
   * Конструктор класса
   * @param  {String} options.domain домен в CRM
   * @param  {String} options.login имя пользователя
   * @param  {String} options.hash API-ключ
   * @param  {String} options.password Пароль пользователя (возможно подключение через логин/пароль в CRM)
   */
  constructor( options = {}) {
    options = Object.assign({}, options );
    this.validateOptions( options );
    _isConnected.set( this, false );
    _options.set( this, options );
    this.request = new AmoRequest( options.domain );
  }

  /**
   * @return {Boolean} статус подключения к серверу CRM
   */
  getIsConnected() {
    return _isConnected.get( this );
  }
  /**
   * Устанавливает соединение с CRM
   * @return {Promise}
   */
  establish() {
    if ( _isConnected.get( this )) {
      return Promise.resolve();
    }
    let data = Object.create( null ),
      connection = _options.get( this ),
      response;

    data[ 'USER_LOGIN' ] = connection.login;

    if ( 'password' in connection ) {
      data[ 'USER_PASSWORD' ] = connection.password;
    } else {
      data[ 'USER_HASH' ] = connection.hash;
    }

    response = this.getRequest().get( '/private/api/auth.php?type=json', data, {
      headers: { 'Content-Type': 'application/json' },
      updateCookie: true
    })
    .then(() => {
      _isConnected.set( this, true );
    });

    return response;
  }
  /**
   * Проверяет опции в конструкторе.
   * @param  {String} options.domain домен в CRM
   * @param  {String} options.login имя пользователя
   * @param  {String} options.hash API-ключ
   * @param  {String} options.password Пароль пользователя (возможно подключение через логин/пароль в CRM)
   * @return {undefined}
   */
  validateOptions( options ) {
    if ( !( options instanceof Object )) {
      throw new Error( `Неправильно заданы настройки подключения. Ожидался 'object', получено '${typeof options}'` );
    }
    let validationError,
      /**
       * Проверяет свойство объекта на правильность ввода
       * @param  {String} property свойство объекта подключения к AmoCRM
       * @return {Boolean} статус проверки
       */
      validateProperty = ( property ) => {
        if ( typeof options[ property ] !== 'string' ) {
          validationError = new Error( `Свойство "${property}" задано неверно. Ожидался 'string', найдено '${typeof options[ property ]}'` );
          return false;
        }
        return true;
      };

    if ( ![ 'domain', 'login' ].every( validateProperty )) {
      throw validationError;
    }

    if ( ![ 'hash', 'password' ].some( validateProperty )) {
      throw validationError;
    }
  }
}
module.exports = AmoConnection;
