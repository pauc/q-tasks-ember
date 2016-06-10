import Ember from 'ember';

export default Ember.Route.extend({
  redirect(model) {
    const goals = model.get('goals');

    if (goals.get('length')) {
      const currentGoalId = this.get('currentUser.currentGoalId') ||
        goals.get('firstObject.id');

      this.transitionTo('goal', currentGoalId);
    } else {
      this.transitionTo('project.first-goal');
    }
  }
});
