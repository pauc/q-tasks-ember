import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  name:        attr('string'),
  description: attr('string'),
  position:    attr('number'),

  goal: belongsTo('goal', { inverse: 'tasks' }),
  user: belongsTo('user', { inverse: false })
});
