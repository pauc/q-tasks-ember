import Ember from 'ember';

const { isEmpty, inject } = Ember;

export default Ember.Route.extend({
  currentUser: inject.service(),

  redirect() {
    const tasks = this.modelFor('goal').get('tasks');

    if (isEmpty(tasks)) {
      this.transitionTo('goal.first-task');
    } else {
      const currentTaskId = this.get('currentUser.currentTaskId') ||
        tasks.get('firstObject.id');

      this.transitionTo('task', currentTaskId);
    }
  }
});
