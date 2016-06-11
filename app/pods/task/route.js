import Ember from 'ember';
import { task } from 'ember-concurrency';

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

  deleteTaskTask: task(function * (task) {
    const isLastTask = task.get('goal.tasks.length') === 1;

    if (isLastTask) {
      yield task.reset();
    } else {
      const goal   = task.get('goal');
      const goalId = goal.get('id');

      yield task.destroyRecord();

      this.set('currentUser.currentTaskId', null);

      this.controllerFor('goal').notifyPropertyChange('model.tasks');
      this.transitionTo('goal', goalId);
    }
  }),

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
    },

    deleteTask(task) {
      this.get('deleteTaskTask').perform(task);
    }
  }
});
