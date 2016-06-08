import Ember from 'ember';
import BufferedProxy from 'ember-buffered-proxy/proxy';
import { task, timeout } from 'ember-concurrency';

const { computed, observer, inject } = Ember;

export default Ember.Controller.extend({
  currentTeam: inject.service(),
  session:     inject.service(),
  store:       inject.service(),
  taskController: inject.controller('task'),

  showTaskNames: false,

  uploadFileUrl: computed(function() {
    return `/${this.get('currentTeam.id')}/attachments`;
  }),

  filesPanelIsVisible: true,

  currentTask: computed('taskController.model', function() {
    return this.get('taskController.model');
  }),

  data: computed('model', function() {
    return BufferedProxy.create({
      content: this.get('model')
    });
  }),

  saveOnNameChange: observer('data.name', function() {
    this.get('_updateGoalName').perform();
  }),

  actions: {
    toggleShowTaskNames() {
      this.toggleProperty('showTaskNames');
    },

    toggleFilesPanel() {
      if (this.get('filesPanelIsVisible')) {
        this.get('actions.closeFilesPanel').apply(this);
      } else {
        this.get('actions.openFilesPanel').apply(this);
      }
    },

    closeFilesPanel() {
      this.set('filesPanelIsVisible', false);
    },

    openFilesPanel() {
      this.set('filesPanelIsVisible', true);
    },

    onInitOfUploader(/* uploader */) {

    },

    uploadImage(file) {
      const authToken = this.get('session.data.authenticated.access_token');

      file.upload(this.get('uploadFileUrl'), {
        headers: {
          Accept:        "application/vnd.api+json",
          Authorization: `Bearer ${authToken}`
        },

        data: {
          goal_id: this.get('model.id')
        }
      }).then( ({status, body}) => {
        if (status === 201) {
          this.get('store').pushPayload('attachment', JSON.parse(body));
        }
      });
    }
  },

  _updateGoalName: task(function * (skipTimeout = false) {
    if (!skipTimeout) {
      yield timeout(1500);
    }

    if (this.get('data.name').trim() !== this.get('model.name')) {
      this.get('data').applyChanges();

      this.get('model').save();
    }
  }).restartable()
});
