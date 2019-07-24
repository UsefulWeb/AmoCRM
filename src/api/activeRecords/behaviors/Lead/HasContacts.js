import factories from "../../../factories";

class HasContacts {

  get contacts() {
    return {
      link: contacts => this.linkContacts( contacts ),
      get: params =>  this.getContacts( params ),
      unlink: contacts => this.unlinkContacts( contacts )
    }
  }

  linkContacts( contacts=[]) {
    const newIds = this.getDataIdentifiers( contacts ),
      { contacts_id=[]} = this._attributes;

    const ids = Array.isArray( contacts_id ) ? contacts_id : [ contacts_id ];

    ids.push( ...newIds );
    this._attributes.contacts_id = ids;
    return this.save();
  }

  unlinkContacts( contacts=[]) {
    const ids = this.getDataIdentifiers( contacts );
    this._attributes.unlink = {
      contacts_id: ids
    };

    return this.save();
  }

  getContacts( params={}) {
    const { contacts_id } = this._attributes;
    if ( !contacts_id ) {
      return Promise.resolve([]);
    }
    const ids = Array.isArray( contacts_id ) ? contacts_id : [ contacts_id ],
      Contact = factories.Contact.createFromResource( this._resource );

    return Contact.find({
      ...params,
      id: ids
    });
  }
}

export default HasContacts;
