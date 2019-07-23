import BaseFindable from '../../../../base/resources/behaviors/Findable';

class Findable extends BaseFindable {

  find() {
    return super.find({ with: 'custom_fields' })
      .then( response => response.getRaw()._embedded.custom_fields );
  }

}

export default Findable;
