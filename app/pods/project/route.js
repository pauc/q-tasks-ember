import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  currentUser: inject.service(),

  model(params) {
    return this.store.findRecord('project', params.project_id, { include: 'goals' });
  },

  redirect(model, transition) {
    if (transition.targetName !== `${this.routeName}.index`) {
      return;
    }

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
  },

  actions: {
    createGoal() {
      const newGoal = this.store.createRecord('goal', {
        project: this.get('currentModel')
      });

      this.set('controller.newGoal', newGoal);
      this.set('controller.showGoalForm', true);
    },

    saveGoal(goal) {
      return goal.save().then( (savedGoal) => {
        this.get('currentModel.goals').pushObject(savedGoal);
        this.set('controller.newGoal', null);
        this.set('controller.showGoalForm', false);
        this.transitionTo('goal', savedGoal.id);
      });
    },

    cancelCreateGoal(goal) {
      this._cancelCreateGoal(goal);
    },

    willTransition() {
      const newGoal = this.get('controller.newGoal');

      this._cancelCreateGoal(newGoal);
    }
  },

  _cancelCreateGoal(goal) {
    if (goal) {
      goal.deleteRecord();
    }

    this.set('controller.newGoal', null);
    this.set('controller.showGoalForm', false);
  }
});
