import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name:                attr('string'),
  position:            attr('number'),
  descriptionMarkdown: attr('string'),
  descriptionHtml:     attr('string'),
  done:                attr('boolean'),

  goal: belongsTo('goal', { inverse: 'tasks' }),
  user: belongsTo('user', { inverse: false }),

  dependencies: hasMany('task', { inverse: false }),
  comments:     hasMany('comments', { inverse: 'task' })
});
