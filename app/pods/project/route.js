import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('project', params.id, { include: 'goals' });
  },

  renderTemplate() {
    this.render();

    this.render('project.goals-list', {
      into:   'projects',
      outlet: 'goals-list'
    });
  }
});
