import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  isImage:    attr('boolean'),
  fileUrl:    attr('string'),
  thumbUrl:   attr('string'),
  previewUrl: attr('string'),

  goal: belongsTo('goal', { inverse: 'attachments' })
});
