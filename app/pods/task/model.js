import DS from 'ember-data';

const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  name:                attr('string'),
  position:            attr('number'),
  descriptionMarkdown: attr('string'),
  descriptionHtml:     attr('string'),

  goal: belongsTo('goal', { inverse: 'tasks' }),
  user: belongsTo('user', { inverse: false }),

  dependencies: hasMany('task', { inverse: false})
});
