import ResponseErrorHandler from './ResponseErrorHandler';

class EntityResponseErrorHandler extends ResponseErrorHandler {

  getErrorsData() {
    const { _response: response } = this;
    if ( response.error ) {
      return response;
    }
    if ( response.title === 'Error' ) {
      return response;
    }

    const { _embedded } = response;

    if ( !_embedded ) {
      return false;
    }

    if ( Array.isArray( _embedded.errors ) && _embedded.errors.length === 0 ) {
      return false;
    }

    return _embedded.errors;
  }

  hasErrors() {
    const errors = this.getErrorsData();
    return Boolean( errors );
  }

  getFirstError() {
    const errors = this.getErrorsData();

    if ( errors.error ) {
      return new Error( `Failed with code ${errors.error_code}: ${errors.error}` );
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
      error = errorsList[ firstErrorKey ],
      message = error.message ? error.message : error;

    return new Error( `${errorsNamespace} failed for key ${firstErrorKey}: ${message}` );
  }
}

export default EntityResponseErrorHandler;
