import DomainResponseHandler from './DomainResponseHandler';
import PrivateDomainResponseErrorHandler from '../errorHandlers/PrivateDomainResponseErrorHandler';

class PrivateDomainResponseHandler extends DomainResponseHandler {
  static errorHandlerClass = PrivateDomainResponseErrorHandler;
}

export default PrivateDomainResponseHandler;
