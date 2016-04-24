import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { isEmpty } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  beforeModel() {
    this._super(...arguments);

    const projectsPromise = this.store.findAll('project');

    this.set('projectsPromise', projectsPromise);

    projectsPromise.then( (projects) => {
      if (isEmpty(projects)) {
        this.transitionTo('projects.first');
      }
    });

    return projectsPromise;
  },

  model() {
    return this.get('projectsPromise');
  }
});
