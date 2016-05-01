import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  team: belongsTo(),
  goals: hasMany()
});
