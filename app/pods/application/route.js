import Ember from 'ember';

export default Ember.Route.extend({
  subdomain: function() {
    return window.location.hostname.split('.')[0];
  }(),

  renderTemplate() {
    this.render('application-public');
  }
});
