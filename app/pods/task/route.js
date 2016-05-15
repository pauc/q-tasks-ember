import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('task', params.task_id);
  },

  setupController(controller) {
    this._super(...arguments);

    this.store.findAll('user').then( users => {
      controller.set('users', users);
    });
  },

  actions: {
    willTransition() {
      const controller = this.get('controller');

      controller.forceSync();

      return this._super(...arguments);
    }
  }
});
