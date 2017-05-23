'use strict';
const AmoConnection = require( './AmoConnection.js' );

let _options = new WeakMap;

/**
 * Основной класс для работы с библиотекой
 */
class AmoCRM {
  /**
   * Конструктор класса
   * @param  {Object} options Список настроек для объекта
   */
  constructor( options = {}) {
    options = Object.assign({}, options );
    _options.set( this, options );

    if ( 'connection' in options ) {
      this.connection = new AmoConnection( options.connection );
    }
  }

  /**
   * Установить соединение с CRM
   * @return {Promise}
   */
  connect() {
    return this.connection.establish();
  }
}

module.exports = AmoCRM;
