import Ember from 'ember';

const { computed, inject } = Ember;

const CurrentUser = Ember.ObjectProxy.extend({
  session: inject.service(),

  content: null,

  present: computed.notEmpty('content'),
  blank:   computed.not('present'),

  currentProjectId: computed('session.data.currentProjectId', {
    get() {
      return this.get('session.data.currentProjectId');
    },

    set(key, value) {
      if (this.get('session.data.currentProjectId') !== value) {
        this.get('session').set('data.currentProjectId', value);
        this.get('session').set('data.currentGoalId', null);
        this.get('session').set('data.currentTaskId', null);
        return value;
      }
    }
  }),

  currentGoalId: computed('session.data.currentGoalId', {
    get() {
      return this.get('session.data.currentGoalId');
    },

    set(key, value) {
      if (this.get('session.data.currentGoalId') !== value) {
        this.get('session').set('data.currentGoalId', value);
        this.get('session').set('data.currentTaskId', null);
        return value;
      }
    },
  }),

  currentTaskId: computed('session.data.currentTaskId', {
    get() {
      return this.get('session.data.currentTaskId');
    },

    set(key, value) {
      if (this.get('session.data.currentTaskId') !== value) {
        this.get('session').set('data.currentTaskId', value);
        return value;
      }
    }
  })
});

CurrentUser.reopenClass({
  isServiceFactory: true
});

export default CurrentUser;
