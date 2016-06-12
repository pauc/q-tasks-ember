import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';
import formBufferProperty from 'ember-validated-form-buffer';
import { task } from 'ember-concurrency';

const Validations = buildValidations({
  name: validator('presence', true)
});

const { Component } = Ember;

export default Component.extend({
  tagName:           'form',
  attributeBindings: ['novalidate'],
  novalidate:        "novalidate",

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
  }).drop(),

  actions: {
    cancel() {
      this.get('cancel')();
    }
  }
});
