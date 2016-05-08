import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const project = this.modelFor('project');

    return this.store.createRecord('goal', {
      project: project
    });
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
