import EntityResponseErrorHandler from '../../base/errorHandlers/EntityResponseErrorHandler';

export default class PipelineResponseErrorHandler extends EntityResponseErrorHandler {

  getErrorsData() {
    const modifyResponse = this._response.response && this._response.response.pipelines;

    if ( !modifyResponse ) {
      return super.getErrorsData();
    }

    if ( modifyResponse.add && modifyResponse.add.errors ) {
      return modifyResponse.add.errors;
    }
    if ( modifyResponse.update && modifyResponse.update.errors ) {
      return modifyResponse.update.errors;
    }
    return super.getErrorsData();
  }

  getFirstError() {
    const errors = this.getErrorsData();
    if ( Array.isArray( errors ) && typeof errors[ 0 ] === 'string' ) {
      return new Error( errors[ 0 ]);
    }
    return super.getFirstError();
  }
}
