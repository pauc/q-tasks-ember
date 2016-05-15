import { moduleForModel, test } from 'ember-qunit';

moduleForModel('attachment', 'Unit | Model | attachment', {
  // Specify the other units that are required for this test.
  needs: [
    'model:goal'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
