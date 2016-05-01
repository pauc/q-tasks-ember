import DS from 'ember-data';
const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  name: attr('string'),
  description: attr('string'),

  project: belongsTo('project', { inverse: 'goals' }),
  tasks:   hasMany('task', { inverse: 'goal' })
});
