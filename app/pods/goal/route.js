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

  setupController(controller, model) {
    this._super(...arguments);

    const tasks = model.get('tasks').toArray().sortBy('position').filter( (task) => {
      return !task.get('isNew');
    });

    const tasksProxy = Ember.ArrayProxy.create({
      content: tasks
    });

    controller.set('tasks', tasksProxy);
  },

  insertTaskAt: task(function * (position) {
    const newTask = this.store.createRecord('task', {
      position: position,
      goal:     this.get('currentModel')
    });

    yield newTask.save().then( savedTask => {
      this.transitionTo('task', savedTask.get('id'));
    });

    const index = position - 1;

    this.get('controller.tasks').insertAt(index, newTask);
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

  deleteTaskTask: task(function * (task) {
    const isLastTask = task.get('goal.tasks.length') === 1;

    if (isLastTask) {
      yield task.reset();
    } else {
      this.set('currentUser.currentTaskId', null);

      yield task.destroyRecord();

      this.get('controller.tasks').removeObject(task);

      this.transitionTo('project');
    }
  }).drop(),

  actions: {
    reorderTasks(goal, tasks, movedTask) {
      const tasksProxy = Ember.ArrayProxy.create({
        content: tasks
      });

      this.set('controller.tasks', tasksProxy);

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
    },

    deleteTask(task) {
      this.get('deleteTaskTask').perform(task);
    }
  }
});
