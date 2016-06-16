import Ember from 'ember';
import { task } from 'ember-concurrency';
import autosize from 'npm:autosize';

const { Component } = Ember;

export default Component.extend({
  tagName: 'form',

  submit(event) {
    event.preventDefault();

    this.get('save').perform();
  },

  save: task(function * () {
    yield this.get('action')(this.get('body'));

    const $textArea = this.$().find('textarea').val('');

    autosize.update($textArea[0]);
  }).drop()
});
