import Ember from 'ember';

const { Controller, computed, inject } = Ember;

export default Controller.extend({
  goal: inject.controller(),

  withSidebarRight: computed('goal.filesPanelIsVisible', function() {
    const goalRouteIsActive =
      this.get('currentPath').indexOf('.goal.') !== -1;

    return this.get('goal.filesPanelIsVisible') && goalRouteIsActive;
  })
});
