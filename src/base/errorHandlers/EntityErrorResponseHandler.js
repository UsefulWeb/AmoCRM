class EntityErrorResponseHandler {
  constructor( response ) {
    this._response = response;
  }

  handleErrors() {
    if ( !this.hasErrors()) {
      return;
    }
    throw this.getFirstError();
  }

  getErrorsData() {
    return this._response._embedded.errors;
  }

  hasErrors() {
    const errors = this.getErrorsData();
    return Boolean( errors );
  }

  getFirstError() {
    const errors = this.getErrorsData(),
      errorsNamespace = Object.keys( errors )[ 0 ],
      errorsList = errors[ errorsNamespace ];

    if ( Array.isArray( errorsList )) {
      const [ firstError ] = errorsList,
        { message, code } = firstError;

      return new Error( `${errorsNamespace} failed with code ${code}: ${message}`, code );
    }

    const firstErrorKey = Object.keys( errorsList )[ 0 ],
      message = errorsList[ firstErrorKey ];

    return new Error( `${errorsNamespace} failed for key ${firstErrorKey}: ${message}` );
  }
}

export default EntityErrorResponseHandler;
