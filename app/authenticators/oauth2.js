import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import Ember from 'ember';

const {
  RSVP,
  isEmpty,
  assign,
  run
} = Ember;

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: '/oauth/token',
  serverTokenRevocationEndpoint: '/oauth/revoke',

  authenticate(identification, password, teamId, scope = []) {
    return new RSVP.Promise((resolve, reject) => {
      const data = {
        'grant_type': 'password',
        username:     identification, password,
        team_id:      teamId
      };
      const serverTokenEndpoint = this.get('serverTokenEndpoint');
      const scopesString = Ember.makeArray(scope).join(' ');
      if (!Ember.isEmpty(scopesString)) {
        data.scope = scopesString;
      }
      this.makeRequest(serverTokenEndpoint, data).then((response) => {
        run(() => {
          const expiresAt = this._absolutizeExpirationTime(response['expires_in']);
          this._scheduleAccessTokenRefresh(response['expires_in'], expiresAt, response['refresh_token']);
          if (!isEmpty(expiresAt)) {
            response = assign(response, { 'expires_at': expiresAt });
          }
          resolve(response);
        });
      }, (xhr) => {
        run(null, reject, xhr.responseJSON || xhr.responseText);
      });
    });
  }
});
