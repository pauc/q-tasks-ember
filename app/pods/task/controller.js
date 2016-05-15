import Ember from 'ember';
import BufferedProxy from 'ember-buffered-proxy/proxy';
import { task, timeout } from 'ember-concurrency';

const { computed, observer } = Ember;

export default Ember.Controller.extend({
  isSaving: false,

  data: computed('model', function() {
    return BufferedProxy.create({
      content: this.get('model')
    });
  }),

  saveTask: task(function * () {
    const buffer = this.get('data');

    this.set('isSaving', true);

    buffer.applyChanges();
    yield this.get('model').save();

    this.set('isSaving', false);
  }).restartable(),

  saveOnNameChange: observer('data.name', function() {
    this.get('_updateTaskName').perform();
  }),

  forceSync() {
    this.get('_updateTaskName').perform(true);
    this.get('_updateTaskUser').perform(true);
  },

  actions: {
    assignUser(user) {
      const buffer = this.get('data');

      buffer.set('user', user);

      this.get('_updateTaskUser').perform();
    }
  },

  _updateTaskName: task(function * (skipTimeout = false) {
    if (!skipTimeout) {
      yield timeout(1500);
    }

    const data  = this.get('data'),
          model = this.get('model');


    data.set('name', data.get('name').trim());

    if (data.get('name') !== model.get('name')) {
      this.get('saveTask').perform();
    }
  }),

  _updateTaskUser: task(function * (skipTimeout = false) {
    if (!skipTimeout) {
      yield timeout(1500);
    }

    const data = this.get('data'),
          model = this.get('model');

    if (data.get('user') !== model.get('user')) {
      this.get('saveTask').perform();
    }
  })
});
