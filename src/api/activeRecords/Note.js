'use strict';

import Entity from '../../base/activeRecords/EntityActiveRecord';
import ContactResource from "../resources/ContactResource";
import LeadResource from "../resources/LeadResource";
import CompanyResource from "../resources/CompanyResource";
import TaskResource from "../resources/TaskResource";
import CustomerResource from "../resources/CustomerResource";
import ContactFactory from "../factories/ContactFactory";
import LeadFactory from "../factories/LeadFactory";
import CompanyFactory from "../factories/CompanyFactory";
import TaskFactory from "../factories/TaskFactory";
import CustomerFactory from "../factories/CustomerFactory";
import NoteResource from "../resources/NoteResource";

class Note extends Entity {
  static behaviors = [];

  getElementFactoryClassName() {

    switch ( this._attributes.element_type ) {
      case ContactResource.NOTE_ELEMENT_TYPE:
        return ContactFactory;
      case LeadResource.NOTE_ELEMENT_TYPE:
        return LeadFactory;
      case CompanyResource.NOTE_ELEMENT_TYPE:
        return CompanyFactory;
      case TaskResource.NOTE_ELEMENT_TYPE:
        return TaskFactory;
      case CustomerResource.NOTE_ELEMENT_TYPE:
        return CustomerFactory;
    }
  }

  fetch() {
    const type = NoteResource.getElementType( this._attributes.element_type ),
      { id } = this._attributes;
    if ( this.isNew()) {
      throw new Error( 'EntityActiveRecord must exists for using EntityActiveRecord.fetch()!' );
    }
    return this._resource
      .findById( id, type )
      .then( response => {
        const attributes = response.getFirstItem();
        if ( !attributes ) {
          return false;
        }
        this._attributes = attributes;
        return this;
      });
  }

  findById( id, type ) {
    return this._resource.findById({ id, type });
  }

  getElement() {
    if ( this.isNew()) {
      throw new Error( 'note must exists!' );
    }
    const factoryClassName = this.getElementFactoryClassName(),
      factory = factoryClassName.createFromResource( this._resource );

    return factory.findById( this._attributes.element_id );
  }
}

export default Note;
