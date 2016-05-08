import Ember from 'ember';

const { isEmpty, inject } = Ember;

export default Ember.Route.extend({
  currentUser: inject.service(),

  model(params) {
    return this.store.findRecord('goal', params.goal_id, { include: 'tasks' });
  },

  redirect(model, transition) {
    console.log(transition.targetName, "<<<>>>", this.routeName);
    if (transition.targetName !== `${this.routeName}.index`) {
      return;
    }

    const tasks = model.get('tasks');

    if (isEmpty(tasks)) {
      this.transitionTo('goal.first-task');
    } else {
      const currentTaskId = this.get('currentUser.currentTaskId') ||
        tasks.get('firstObject.id');

      this.transitionTo('task', currentTaskId);
    }
  }
});
