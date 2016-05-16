import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  name:                attr('string'),
  position:            attr('number'),
  descriptionMarkdown: attr('string'),
  descriptionHtml:     attr('string'),

  goal: belongsTo('goal', { inverse: 'tasks' }),
  user: belongsTo('user', { inverse: false })
});
