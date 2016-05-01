import Ember from 'ember';

const { computed } = Ember;

const CurrentTeam = Ember.ObjectProxy.extend({
  content: null,

  present: computed.notEmpty('content'),
  blank:   computed.not('present')
});

CurrentTeam.reopenClass({
  isServiceFactory: true
});

export default CurrentTeam;
