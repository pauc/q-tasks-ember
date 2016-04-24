import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  currentTeam: Ember.inject.service(),

  beforeModel() {
    if (this.get('currentTeam.content') &&
        !this.get('session.isAuthenticated')) {
      this.transitionTo('login');

      return;
    }

    this.transitionTo('projects');
  },

  renderTemplate() {
    if (!this.get('currentTeam.content')) {
      this.render('index-public');

      return;
    }

    this.render();
  },

  actions: {
    goToTeam(teamSubdomain, event) {
      event.preventDefault();

      if (Ember.isBlank(teamSubdomain)) {
        return;
      }

      window.location = `//${teamSubdomain}.${window.location.host}`;
    }
  }
});
