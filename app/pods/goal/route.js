import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('goal', params.goal_id, { include: 'tasks' });
  },

  setupController(controller, model) {
    this._super(...arguments);

    const tasks = model.get('tasks').toArray().sortBy('position');

    controller.set('tasks', tasks);
  },

  actions: {
    saveTask(task) {
      return task.save().then( (savedTask) => {
        this.transitionTo('task', savedTask.id);
      });
    },

    reorderTasks(goal, tasks, movedTask) {
      this.set('controller.tasks', tasks);

      const newPosition = tasks.indexOf(movedTask) + 1;
      movedTask.set('position', newPosition);

      return movedTask.save().then( () => {
        this.refresh();
      });
    }
  }
});
