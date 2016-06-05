import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  bodyMarkdown: attr('string'),
  bodyHtml:     attr('string'),
  createdAt:    attr('date'),

  task: belongsTo('task', { inverse: 'comments' })
});
