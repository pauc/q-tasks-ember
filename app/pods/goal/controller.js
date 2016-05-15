import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Controller.extend({
  currentTeam: inject.service(),
  session:     inject.service(),

  uploadFileUrl: computed(function() {
    return `/${this.get('currentTeam.id')}/attachments`;
  }),

  filesPanelIsVisible: true,

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
      });
    }
  }
});
