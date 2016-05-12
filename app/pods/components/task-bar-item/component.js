import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  classNames: ["tasks-bar-item"],

  isFirst: computed('index', function() {
    return this.get('index') === 0;
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
