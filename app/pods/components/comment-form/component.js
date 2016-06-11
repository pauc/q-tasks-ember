import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Component } = Ember;

export default Component.extend({
  tagName: 'form',

  submit(event) {
    event.preventDefault();

    this.get('save').perform();
  },

  save: task(function * () {
    yield this.get('action')(this.get('body'));

    this.$().find('textarea').val('');
  }).drop()
});
