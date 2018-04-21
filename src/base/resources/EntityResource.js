import RemoteResource from './RemoteResource';
import EntityResponseHandler from "../responseHandlers/EntityResponseHandler";
import Updatable from "./behaviors/Updatable";
import Insertable from "./behaviors/Insertable";
import Findable from "./behaviors/Findable";
import FindableById from "./behaviors/FindableById";

class EntityResource extends RemoteResource {

  static path;
  static getPath;
  static insertPath;
  static updatePath;

  static responseHandlerClass = EntityResponseHandler;

  static ENTITY_TYPE;
  static DELETE_MULTIACTION_TYPE = 4;

  static behaviors = [ new Findable, new FindableById, new Updatable, new Insertable ];
}

export default EntityResource;
