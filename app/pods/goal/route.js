import Ember from 'ember';
import { task } from 'ember-concurrency';

const { inject } = Ember;

export default Ember.Route.extend({
  currentUser: inject.service(),

  model(params) {
    return this.store.findRecord('goal', params.goal_id, { include: 'tasks' });
  },

  afterModel(model) {
    this.set('currentUser.currentGoalId', model.get('id'));
  },

  insertTaskAt: task(function * (position) {
    const controller = this.get('controller');

    yield this.store.createRecord('task', {
      position: position,
      goal:     this.get('currentModel')
    }).save().then( savedTask => {
      this.refresh();
      this.transitionTo('task', savedTask.get('id'));
    });
  }).drop(),

  deleteGoalTask: task(function * () {
    const goal = this.get('currentModel');

    yield goal.destroyRecord();
    this.set('currentUser.currentGoalId', null);

    this.transitionTo('project');
  }).drop(),

  toggleTaskDone: task(function * (task) {
    task.toggleProperty('done');
    yield task.save();
  }).drop(),

  actions: {
    reorderTasks(goal, tasks, movedTask) {
      this.set('controller.tasks', tasks);

      const newPosition = tasks.indexOf(movedTask) + 1;

      if (newPosition === movedTask.get('position')) {
        return;
      }

      movedTask.set('position', newPosition);

      return movedTask.save().then( () => {
        this.refresh();
      });
    },

    goToTask(task) {
      this.transitionTo('task', task);
    },

    insertAt(position) {
      this.get('insertTaskAt').perform(position);
    },

    deleteAttachment(attachment) {
      attachment.destroyRecord();
    },

    toggleTaskDone(task) {
      this.get('toggleTaskDone').perform(task);
    },

    deleteGoal() {
      this.get('deleteGoalTask').perform();
    }
  }
});
