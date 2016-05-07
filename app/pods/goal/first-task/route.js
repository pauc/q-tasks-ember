import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const goal = this.modelFor('goal');

    return this.store.createRecord('task', { goal: goal});
  }
});
