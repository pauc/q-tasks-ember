import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { inject } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  intl:        inject.service(),
  currentTeam: inject.service(),
  currentUser: inject.service(),
  session:     inject.service(),

  beforeModel() {
    this.get('intl').setLocale('ca');

    if (!this.get('subdomain')) {
      return;
    }

    const subdomain = this.get('subdomain');

    return this.store.findRecord('team', subdomain).then( (team) => {
      this.set('currentTeam.content', team);
    }, () => {
      this.transitionTo('not-found');
    });
  },

  model() {
    return this.get('currentTeam.content');
  },

  afterModel() {
    debugger;
    if (this.get('currentTeam.blank') || !this.get('session.isAuthenticated')) {
      return;
    }

    const currentUserId = this.get('session.data.authenticated.resource_owner_id');

    return this.store.find('user', currentUserId).then( user => {
      this.set('currentUser.content', user);
    });
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
