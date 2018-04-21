import ResponseErrorHandler from './ResponseErrorHandler';

class EntityResponseErrorHandler extends ResponseErrorHandler {

  getErrorsData() {
    if ( this._response.error ) {
      return this._response;
    }
    if ( this._response.title === 'Error' ) {
      return this._response;
    }
    return this._response._embedded && this._response._embedded.errors;
  }

  hasErrors() {
    const errors = this.getErrorsData();
    return Boolean( errors );
  }

  getFirstError() {
    const errors = this.getErrorsData();

    if ( errors.error ) {
      return new Error( `ailed with code ${errors.error_code}: ${errors.error}` );
    }

    if ( errors.detail ) {
      return new Error( `${errors.type} failed with code ${errors.status}: ${errors.detail}` );
    }

    const errorsNamespace = Object.keys( errors )[ 0 ],
      errorsList = errors[ errorsNamespace ];

    if ( Array.isArray( errorsList )) {
      const [ firstError ] = errorsList,
        { message, code } = firstError;

      return new Error( `${errorsNamespace} failed with code ${code}: ${message}` );
    }

    const firstErrorKey = Object.keys( errorsList )[ 0 ],
      message = errorsList[ firstErrorKey ];

    return new Error( `${errorsNamespace} failed for key ${firstErrorKey}: ${message}` );
  }
}

export default EntityResponseErrorHandler;
