import Ember from 'ember';

const { computed } = Ember;

const CurrentUser = Ember.ObjectProxy.extend({
  content: null,

  present: computed.notEmpty('content'),
  blank:   computed.not('present')
});

CurrentUser.reopenClass({
  isServiceFactory: true
});

export default CurrentUser;
