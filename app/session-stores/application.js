import AdaptiveStore from 'ember-simple-auth/session-stores/adaptive';
import Ember from 'ember';

const { computed } = Ember;

export default AdaptiveStore.extend({
  localStorageKey: computed('currentTeam.id', function() {
    const hostnameParts = window.location.hostname.split('.');

    if (hostnameParts.length < 3) {
      return "ember_simple_auth:session";
    }

    return `${hostnameParts[0]}_auth:session`;
  })
});
