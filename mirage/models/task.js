import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  goal: belongsTo(),
  user: belongsTo()
});
