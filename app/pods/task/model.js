import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  name:        attr('string'),
  description: attr('string'),

  goal: belongsTo('goal', { inverse: 'tasks' })
});
