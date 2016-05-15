import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  fileUrl: attr('string'),

  goal: belongsTo('goal', { inverse: 'attachments' })
});
