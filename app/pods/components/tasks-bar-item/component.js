import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  intl: inject.service(),

  classNames: ["tasks-bar-item"],

  showAssignedTo: true,
  showTaskName:   false,

  isFirst: computed('index', function() {
    return this.get('index') === 0;
  }),

  checkboxId: computed('model.id', function() {
    return `task-bar-item-checkbox-${this.get('model.id')}`;
  }),

  assignedTo: computed('model.user.username', function() {
    const assignedTo = this.get('model.user.username');

    return assignedTo ||
      this.get('intl').t('models.attributes.task.unassigned').capitalize();
  }),

  actions: {
    insertBefore() {
      console.log('insertBefore() fired!!');
      event.stopPropagation();
      event.preventDefault();
    },

    insertAfter(event) {
      console.log('insertAfter() fired!!');
      event.stopPropagation();
      event.preventDefault();
    }
  }
});
