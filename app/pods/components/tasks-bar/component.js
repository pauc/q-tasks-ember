import Ember from 'ember';

export default Ember.Component.extend({
  classNames:        ["tasks-bar"],
  classNameBindings: ["isDragging:dragging"],
  isDragging:        false,

  showUserNames: true,
  showTaskNames: false,

  actions: {
    reorderTasks(goal, tasks, draggedTask) {
      this.get('action')(goal, tasks, draggedTask);
    },

    dragStarted() {
      console.log("Drag starts");
      this.set('isDragging', true);
    },

    dragStopped() {
      console.log("Drag ends");
      this.set('isDragging', false);
    }
  }
});
