import Ember from 'ember';
import formBufferProperty from 'ember-validated-form-buffer';
import { validator, buildValidations } from 'ember-cp-validations';
import { task } from 'ember-concurrency';

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

    this.get('save').perform();
  },

  save: task(function * () {
    yield this.get('action')();
  }).drop()
});
