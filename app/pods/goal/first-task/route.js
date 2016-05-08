import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const goal = this.modelFor('goal');

    return this.store.createRecord('task', { goal: goal});
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
