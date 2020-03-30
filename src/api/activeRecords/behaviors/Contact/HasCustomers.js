import factories from "../../../factories";

class HasCustomers {

  setCustomers( customers ) {
    this._attributes.customers_id = customers.map( customer => customer._attributes.id );
    return this.save();
  }

  setCustomer( customer ) {
    const { contacts_id=[]} = customer;
    contacts_id.push( this._attributes.id );
    customer.contacts_id = contacts_id;
    return customer.save();
  }

  getCustomers( params ) {
    const factory = factories.Customer,
      resource = this._resource,
      factoryInstance = factory.createFromResource( resource ),
      criteria = {
        ...params,
        contact_id: this._attributes.id
      };

    return factoryInstance.find( criteria );
  }
}

export default HasCustomers;
