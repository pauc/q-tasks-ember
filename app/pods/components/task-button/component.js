import Ember from 'ember';

const { computed, inject, on, assert } = Ember;

export default Ember.Component.extend({
  tagName: "button",
  classNames: ['btn'],
  classNameBindings: ['isRunning:btn-loading'],

  intl: inject.service(),

  task:           null,
  text:           null,
  perform:        false,
  preventDefault: true,

  state:     computed.readOnly('task.state'),
  isRunning: computed.equal('state', 'running'),
  runningText: computed.reads('text', function() {
    this.get('text');
  }),

  displayText: computed('state', 'text', 'runningText', function() {
    const state       = this.get('state'),
          text        = this.get('text'),
          runningText = this.get('runningText');

    switch (state) {
      case "running":
        return runningText;
      default:
        return text;
    }
  }),

  _setup: on('didInsertElement', function() {
    const task = this.get('task');
    assert("You must provide a task to task-button", task);

    if (this.get('perform')) {
      const preventDefault = this.get('preventDefault');

      this.click = function(event) {
        if (preventDefault) {
          event.preventDefault();
        }

        task.perform();
      };
    }
  })
});
