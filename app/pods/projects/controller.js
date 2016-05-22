import Ember from 'ember';

const { Controller, computed, inject } = Ember;

export default Controller.extend({
  project: inject.controller(),

  currentProject: computed.reads('project.model'),
});
