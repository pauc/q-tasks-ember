import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { task, timeout } from 'ember-concurrency';
import Ember from 'ember';

moduleForComponent('task-button', 'Integration | Component | task button', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('fakeTask', { prop: "I'm a fake task"});

  this.render(hbs`{{task-button text="Save" task=fakeTask}}`);

  assert.equal(this.$().text().trim(), 'Save');

  // Template block usage:
  this.render(hbs`
    {{#task-button task=fakeTask}}
      template block text
    {{/task-button}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('gives feedback when the task is running', function(assert) {
  const Obj = Ember.Object.extend({
    theTask: task(function * () {
      yield timeout(1000);
    })
  });

  this.set('obj', Obj.create());

  this.render(hbs`{{task-button
                    text="Save"
                    runningText="Running..."
                    task=obj.theTask
                  }}`);

  Ember.run( () => {
    this.get('obj.theTask').perform();
  });

  assert.equal(this.$().text().trim(), 'Running...');
  assert.ok(this.$().find('button').hasClass('btn-loading'));
});

test('it launches the task if perform=true', function(assert) {
  const Obj = Ember.Object.extend({
    theTask: task(function * () {
      yield timeout(1000);
    })
  });

  this.set('obj', Obj.create());

  this.render(hbs`{{task-button
                    text="Save"
                    runningText="Running..."
                    task=obj.theTask
                    perform=true
                  }}`);

  this.$('button').click();

  assert.ok(this.get('obj.theTask.isRunning'));
});
