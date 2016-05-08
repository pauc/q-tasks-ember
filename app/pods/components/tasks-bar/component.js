import Ember from 'ember';

export default Ember.Component.extend({
  classNames:        ["tasks-bar"],
  classNameBindings: ["isDragging:dragging"],
  isDragging:        false,

  actions: {
    reorderTasks(goal, tasks) {
      console.log(tasks);
      goal.set('tasks', tasks);
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
