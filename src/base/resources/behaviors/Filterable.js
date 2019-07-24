class Filterable {

  filter( query = {}, params = {}) {
    const { filterPath } = this.constructor;
    return this.request( 'POST', filterPath, query, {
      formData: true,
      useQueryString: true
    });
  }
}

export default Filterable;
