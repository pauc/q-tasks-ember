import Ember from 'ember';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:application',

  currentTeam: Ember.inject.service(),

  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json"
  },

  coalesceFindRequests: true,

  namespace: Ember.computed('currentTeam.id', function() {
    return `${this.get('currentTeam.id')}`;
  }),

  pathForType(type) {
    let path = this._super(type);

    return Ember.String.underscore(path);
  }
});
