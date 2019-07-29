import factories from '../../../api/factories';

class HasCompany {

  get company() {
    return {
      link: () => this.linkCompany(),
      get: () => this.getCompany(),
      unlink: () => this.unlinkCompany()
    };
  }

  linkCompany( company ) {
    this._attributes.company_id = typeof company === 'object' ? company.id : company;

    return this.save();
  }

  getCompany() {
    const Company = factories.Company.createFromResource( this._resource );

    return Company.find({
      id: this._attributes.company_id
    });
  }

  unlinkCompany() {
    this._attributes.unlink = {
      company_id: this._attributes.company_id
    };

    return this.save();
  }
}

export default HasCompany;
