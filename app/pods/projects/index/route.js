import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  currentTeam: inject.service(),
  currentUser: inject.service(),

  beforeModel() {
    let projectId = this.get('currentUser.currentProjectId');

    if (projectId) {
      this.transitionTo('project', projectId);

      return;
    }

    return this.store.findAll('project').then( projects => {
      this.transitionTo('project', projects.get('firstObject.id'));
    });
  }
});
