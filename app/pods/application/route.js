import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  currentTeam: Ember.inject.service(),

  beforeModel() {
    if (!this.get('subdomain')) {
      return;
    }

    const subdomain = this.get('subdomain');

    return this.store.findRecord('team', subdomain).then( (team) => {
      this.set('currentTeam.content', team);
    }, function() {});
  },

  model() {
    return this.get('currentTeam.content');
  },

  subdomain: function() {
    const hostnameParts = window.location.hostname.split('.');

    if (hostnameParts.length < 3) {
      return null;
    }

    return hostnameParts[0];
  }(),

  renderTemplate(controller, model) {
    if (model) {
      this.render();

      return;
    }

    if (this.get('subdomain')) {
      this.render('not-found');

      return;
    }

    this.render('application-public');
  }
});
