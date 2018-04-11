import schema from '../../../apiUrls';

class HasMultiactions {

  multiactions( ids, data = {}, multiaction_type ) {
    const { ENTITY_TYPE, multiactionsPath } = this.constructor,
      path = multiactionsPath || schema.multiactions;

    return this.request( 'POST', path,
      {
        request: {
          multiactions: {
            add: [
              {
                entity_type: ENTITY_TYPE,
                multiaction_type,
                data,
                ids
              }
            ]
          }
        }
      },
      {
        formData: true
      }
    );
  }
}

export default HasMultiactions;
