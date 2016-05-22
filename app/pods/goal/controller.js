import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Controller.extend({
  currentTeam: inject.service(),
  session:     inject.service(),
  store:       inject.service(),
  taskController: inject.controller('task'),

  uploadFileUrl: computed(function() {
    return `/${this.get('currentTeam.id')}/attachments`;
  }),

  filesPanelIsVisible: true,

  currentTask: computed('taskController.model', function() {
    return this.get('taskController.model');
  }),

  actions: {
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
  }
});
