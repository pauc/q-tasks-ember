import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('project');
  },

  actions: {
    willTransition() {
      const model = this.get('currentModel');

      if (model.get('isNew')) {
        model.deleteRecord();
      }
    }
  }
});
