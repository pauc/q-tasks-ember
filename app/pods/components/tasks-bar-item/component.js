import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  intl: inject.service(),

  classNames: ["tasks-bar-item"],

  showUserName:   true,
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

  taskName: computed('model.name', function() {
    const taskName = this.get('model.name');

    return taskName ||
      this.get('intl').t('models.attributes.task.unnamed').capitalize();
  }),

  active: computed('currentTask', function() {
    return this.get('currentTask.id') === this.get('model.id');
  }),

  actions: {
    insertBefore(event) {
      event.stopPropagation();
      event.preventDefault();

      const position = this.get('index') + 1;

      this.sendAction('insertAt', position);
    },

    insertAfter(event) {
      event.stopPropagation();
      event.preventDefault();

      const position = this.get('index') + 2;

      this.sendAction('insertAt', position);
    }
  }
});
