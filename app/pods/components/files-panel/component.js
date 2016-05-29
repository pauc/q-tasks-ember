import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ["files-panel"],

  sortDefinition:    ['createdAt:desc'],
  sortedAttachments: computed.sort('model.attachments', 'sortDefinition'),

  actions: {
    deleteAttachment(attachment) {
      this.get('deleteAttachment')(attachment);
    }
  }
});
