import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
  keyForAttribute(attr, method) {
    let key = this._super(attr, method);

    return Ember.String.underscore(key);
  },

  keyForRelationship(key) {
    return Ember.String.underscore(key);
  }  
});
