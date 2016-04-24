import Ember from 'ember';

const CurrentTeam = Ember.ObjectProxy.extend({
  content: null
});

CurrentTeam.reopenClass({
  isServiceFactory: true
});

export default CurrentTeam;
