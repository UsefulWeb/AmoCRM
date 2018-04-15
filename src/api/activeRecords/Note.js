'use strict';

import Entity from '../../base/activeRecords/EntityActiveRecord';
import factories from '../factories';
import ContactResource from "../resources/ContactResource";
import LeadResource from "../resources/LeadResource";
import CompanyResource from "../resources/CompanyResource";
import TaskResource from "../resources/TaskResource";
import CustomerResource from "../resources/CustomerResource";
import NoteResource from "../resources/NoteResource";

class Note extends Entity {
  static behaviors = [];

  getElementFactoryClassName() {
    switch ( this._attributes.element_type ) {
      case ContactResource.NOTE_ELEMENT_TYPE:
        return factories.Contact;
      case LeadResource.NOTE_ELEMENT_TYPE:
        return factories.Lead;
      case CompanyResource.NOTE_ELEMENT_TYPE:
        return factories.Company;
      case TaskResource.NOTE_ELEMENT_TYPE:
        return factories.Task;
      case CustomerResource.NOTE_ELEMENT_TYPE:
        return factories.Customer;
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
      .then( response => this.afterFetch( response ));
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
