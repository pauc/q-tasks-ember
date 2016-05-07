import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { isEmpty, inject } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: inject.service(),

  model() {
    return this.store.findAll('project');
  },

  redirect(model) {
    if (isEmpty(model)) {
      this.transitionTo('first-project');
    } else {
      const currentProjectId = this.get('currentUser.currentProjectId') ||
        model.get('firstObject.id');

      this.transitionTo('project', currentProjectId);
    }
  },

  actions: {
    selectProject(project) {
      this.transitionTo('project', project.get('id'));
    }
  }
});
