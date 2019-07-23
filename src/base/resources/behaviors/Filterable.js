class Filterable {

  filter( query = {}) {
    const { filterPath } = this.constructor;
    return this.request( 'POST', filterPath, query, {
      formData: true,
      useQueryString: true
    });
  }
}

export default Filterable;
