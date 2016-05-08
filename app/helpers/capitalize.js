import Ember from 'ember';

export function capitalize(params) {
  const string = params[0].toString();

  return Ember.String.capitalize(string);
}

export default Ember.Helper.helper(capitalize);
