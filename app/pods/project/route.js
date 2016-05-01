import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate() {
    this.render();

    this.render('project.goals-list', {
      into:   'projects',
      outlet: 'goals-list'
    });
  }
});
