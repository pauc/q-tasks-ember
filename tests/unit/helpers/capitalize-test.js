import { capitalize } from 'q-tasks/helpers/capitalize';
import { module, test } from 'qunit';

module('Unit | Helper | capitalize');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = capitalize(["alcachofas a la brasa"]);
  assert.equal(result, "Alcachofas a la brasa");
});
