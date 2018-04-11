'use strict';

import Entity from '../../base/activeRecords/EntityActiveRecord';
import Removable from "../../base/activeRecords/behaviors/Removable";

class Contact extends Entity {
  static behaviors = [ new Removable ];
}

export default Contact;
