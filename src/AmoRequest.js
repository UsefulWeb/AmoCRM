'use strict';
const https = require( 'https' ),
  qs = require( 'qs' );

/**
 * Класс для обращения к CRM
 */
class AmoRequest {
  static REQUEST_TIMEOUT = 1000 * 60;
  static REQUEST_CHECK_INTERVAL = 100;
  /**
   * Конструктор класса
   * @param  {String} domain
   */
  constructor( domain ) {
    this._isBusy = false;

    Object.defineProperty( this, 'hostname', {
      value: domain + '.amocrm.ru'
    });
  }
  /**
   * Создаёт POST-запрос через оболчку в виде AmoRequest.request
   * @param  {String} url     URL страницы
   * @param  {Object} data    Данные для передачи
   * @param  {Object} options Опции в запросе
   * @return {Promise}         Обещание-результат работы
   */
  post( url, data = {}, options = {}) {
    return this.request( url, data, 'POST', options );
  }
  /**
   * Создаёт GET-запрос через оболчку в виде AmoRequest.request
   * @param  {String} url     URL страницы
   * @param  {Object} data    Данные для передачи
   * @param  {Object} options Опции в запросе
   * @return {Promise}         Обещание-результат работы
   */
  get( url, data = {}, options = { }) {
    return this.request( url, data, 'GET', options );
  }
  /**
   * Подготавливает и выполняет запрос в AmoCRM
   * @param  {String} url     URL страницы
   * @param  {Object} data    Данные для передачи
   * @param  {String} method  Метод запроса (GET, POST и т.д.)
   * @param  {Object} options Опции в запросе
   * @return {Promise}         Обещание-результат работы
   */
  request( url, data = {}, method = 'GET', options = {}) {
    this._isBusy = true;
    const isAjax = url.indexOf( '/ajax' ) === 0,
      isGET = method === 'GET';

    let encodedData = isAjax || isGET ? qs.stringify( data ) : JSON.stringify( data ),
      response;

    options = Object.assign({}, options );

    options.headers[ 'Cookie' ] = _cookies.get( this ).join();
    options.headers[ 'User-Agent' ] = AmoRequest.DEFAULT_USER_AGENT;
    if ( isAjax ) {
      options.headers[ 'X-Requested-With' ] = 'XMLHttpRequest';
    }

    if ( isGET ) {
      url += '?' + encodedData;
    } else if ( Object.keys( data ).length ) {
      options.headers[ 'Content-Length' ] = Buffer.byteLength( encodedData );
    }

    return this.beginRequest()
      .then(() => this.makeRequest( url, encodedData, options ))
      .then(() => this.endRequest );
  }
  /**
   * Создаёт начало запроса
   * @return {Promise} Ожидание выполнения запроса ранее, если имеется
   */
  beginRequest() {
    let waitTime = AmoRequest.REQUEST_TIMEOUT;

    return new Promise(( resolve, reject ) => {
      /**
       * Таймер проверки занятости запроса.
       * Для того, чтобы не перегружать систему, принято решение -
       * не более одного асинхронного запроса от домена
       * @return {undefined}
       */
      const timer = () => {
        if ( !this._isBusy) {
          resolve();
          return;
        }
        waitTime -= AmoRequest.REQUEST_CHECK_INTERVAL;
        if ( waitTime > 0 ) {
          setTimeout( timer, 100 );
          return;
        }
        reject( new Error( `Истекло максимальное время ожидания запроса (${AmoRequest.REQUEST_TIMEOUT} ms.)` ));
      };

    })
    .then(() => {
      this._isBusy = true;
    });
  }

  /**
   * Функция окончания запроса.
   * Делает доступным совершение последующих запросов
   * @return {Promise}
   */
  endRequest() {
    return new Promise( resolve => {
      this._isBusy = false;
      resolve();
    });
  }

  /**
   * Тело запроса на сервер AmoCRM
   * @param  {String} url     URL страницы
   * @param  {Object} data    Данные для передачи
   * @param  {String} method  Метод запроса (GET, POST и т.д.)
   * @param  {Object} options Опции в запросе
   * @return {Promise}
   */
  makeRequest( url, data = {}, method = 'GET', options = {}) {
    const onRequestError = reject => e => reject( e ),
      response = new Promise(( resolve, reject ) => {
        /**
         * Обработчик результата при запросе в CRM.
         * @param  {Object} result результат запроса
         * @return {undefined}
         */
        const onResponse = result => {
          let data = '';
          /**
           * Обработчик порции данных.
           * @param  {String} chunk [description]
           * @return {undefined}
           */
          const onResponseData = chunk => {
              data += chunk;
            },
            /**
           * Обработчик окончания запроса
           * @return {undefined} [description]
           */
            onRequestEnd = () => {
              if ( options.saveCookie ) {
                _cookies.set( this, result.headers[ 'set-cookie' ]);
              }
              try {
                data = JSON.parse( data );
                if ( !( 'response' in data )) {
                  return resolve( data );
                }

              } catch ( e ) {
                reject( e );
              }
            };

          result.on( 'data', onResponseData );
          result.on( 'end', onRequestEnd );

        };

      const request = https.request({
        hostname: this.hostname,
        port: 443,
        path: url,
        method: method,
        headers: options.headers
      }, onResponse );

      if ( method !== 'GET' ) {
        request.write( data );
      }
      request.on( 'error', onRequestError );
      request.end();

      response.currentRequest = request;
    });

    return response;
  }
}

module.exports = AmoRequest;
