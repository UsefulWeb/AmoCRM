import factories from "../../../factories";

class HasCustomers {
  get customers() {
    return {
      add: customer => this.addCustomer( customer ),
      get: params => this.getCustomers( params )
    };
  }

  addCustomer( customer ) {
    customer.contact_id = this._attributes.id;
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
