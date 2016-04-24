import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  intl:        Ember.inject.service(),
  session:     Ember.inject.service(),
  currentTeam: Ember.inject.service(),

  actions: {
    authenticate(identification, password, event) {
      event.preventDefault();

      console.log(identification, password);

      this.get('session')
        .authenticate('authenticator:oauth2', identification,
                      password, this.get('currentTeam.id'))
        .catch( () => {
          this.set('controller.errorMessage',
                   this.get('intl').t('authentication.error'));
        });
    }
  }
});
