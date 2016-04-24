import Ember from 'ember';
import formBufferProperty from 'ember-validated-form-buffer';
import { validator, buildValidations } from 'ember-cp-validations';

const { Component, inject } = Ember;

const Validations = buildValidations({
  name: validator('presence', true)
});

export default Component.extend({
  tagName: 'form',

  currentTeam: inject.service(),

  data: formBufferProperty('model', Validations),

  submit(event) {
    event.preventDefault();

    this.set('showErrors', true);

    if (this.get('data.hasDisplayErrors')) {
      return;
    }

    this.get('data').applyBufferedChanges();

    console.log('Submitting the foooormmma');
  }
});
