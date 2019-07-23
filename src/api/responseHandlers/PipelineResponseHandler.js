import EntityResponseHandler from "../../base/responseHandlers/EntityResponseHandler";
import EntityErrorResponseHandler from "../../base/errorHandlers/EntityResponseErrorHandler";
import PipelineResponseErrorHandler from "../errorHandlers/PipelineResponseErrorHandler";

export default class PipelineResponseHandler extends EntityResponseHandler {

  static errorHandlerClass = PipelineResponseErrorHandler;

  getItems() {
    if ( Array.isArray( this._response )) {
      return this._response;
    }

    const embedded = this._response._embedded,
      items = embedded && embedded.items;

    if ( typeof items === 'object' && !Array.isArray( items )) {
      return Object.keys( items ).map( id => items[ id ]);
    }
    return items || [];
  }

  getModifiedItems( type ) {
    return this._response.response.pipelines[ type ].pipelines;
  }

  getFirstModifiedItem( type ) {
    const items = this.getModifiedItems( type ),
      firstKey = Object.keys( items )[ 0 ];
    return items[ firstKey ];
  }
}
