import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  currentUser: inject.service(),

  model(params) {
    return this.store.findRecord('project', params.project_id, { include: 'goals' });
  },

  redirect(model) {
    const goals = model.get('goals');

    if (goals.get('length')) {
      const currentGoalId = this.get('currentUser.currentGoalId') ||
        goals.get('firstObject.id');

      this.transitionTo('goal', currentGoalId);
    } else {
      this.transitionTo('project.first-goal');
    }
  },

  renderTemplate() {
    this.render();

    this.render('project.goals-list', {
      into:   'projects',
      outlet: 'goals-list'
    });
  }
});
