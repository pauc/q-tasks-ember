import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  isImage:    attr('boolean'),
  fileName:   attr('string'),
  fileUrl:    attr('string'),
  thumbUrl:   attr('string'),
  previewUrl: attr('string'),
  createdAt:  attr('date'),

  goal: belongsTo('goal', { inverse: 'attachments' })
});
