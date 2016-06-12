import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  name: attr('string'),
  description: attr('string'),

  project:     belongsTo('project', { inverse: 'goals' }),
  tasks:       hasMany('task', { inverse: 'goal' }),
  attachments: hasMany('attachment', { inverse: 'goal' }),

  done: computed('tasks.@each.done', function() {
    return this.get('tasks').every(function(task) {
      return task.get('done');
    });
  })
});
