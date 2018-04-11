class Removable {
  remove() {
    return this._resource
      .remove([ this._attributes.id ])
      .then(() => {
        this._isRemoved = true;
        return this;
      });
  }

  isRemoved() {
    return this._isRemoved === true;
  }
}

export default Removable;
