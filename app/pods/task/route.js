import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  currentUser: inject.service(),

  model(params) {
    return this.store.findRecord('task', params.task_id);
  },

  afterModel(model) {
    this.set('currentUser.currentTaskId', model.get('id'));
  },

  setupController(controller) {
    this._super(...arguments);

    this.store.findAll('user').then( users => {
      controller.set('users', users);
    });
  },

  actions: {
    willTransition() {
      if (this.modelFor('goal').get('isDeleted')) {
        return;
      }

      const controller = this.get('controller');

      controller.forceSync();

      return this._super(...arguments);
    },

    addDependency(dependency) {
      const task = this.get('currentModel');

      task.get('dependencies').pushObject(dependency);

      task.save();
    },

    removeDependency(dependency) {
      const task = this.get('currentModel');

      task.get('dependencies').removeObject(dependency);

      task.save();
    },

    saveComment(body) {
      const comment = this.store.createRecord('comment', {
        task:         this.get('currentModel'),
        bodyMarkdown: body
      });

      comment.save();
    }
  }
});
