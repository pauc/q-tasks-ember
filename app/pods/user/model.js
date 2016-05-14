import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  email:            attr('string'),
  username:         attr('string'),
  currentProjectId: attr('number'),
  currentGoalId:    attr('number'),
  currentTaskId:    attr('number')
});
