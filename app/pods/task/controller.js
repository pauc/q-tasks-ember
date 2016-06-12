import Ember from 'ember';
import BufferedProxy from 'ember-buffered-proxy/proxy';
import { task, timeout } from 'ember-concurrency';

const { computed, observer } = Ember;

const DependencyDecorator = Ember.Object.extend({
  intl: Ember.inject.service(),

  task: null,

  text: computed('task.{position,username,user}', function() {
    let text = this.get('intl').t('dependency_decorator.task_position', {
      position: this.get('task.position')
    });

    if (this.get('task.user.username')) {
      text = text + ` - ${this.get('task.user.username')}`;
    }

    if (this.get('task.name')) {
      text = text + ` - ${this.get('task.name')}`;
    }

    return text;
  }),

  done: computed('task.done', function() {
    return this.get('task.done');
  })
});

export default Ember.Controller.extend({
  isSaving: false,
  isEditingDescription: false,

  data: computed('model', function() {
    return BufferedProxy.create({
      content: this.get('model')
    });
  }),

  showDescriptionTextarea: computed('data.descriptionMarkdown', 'isEditingDescription', function() {
    return this.get('isEditingDescription') || Ember.isBlank(this.get('data.descriptionMarkdown'));
  }),

  saveTask: task(function * () {
    if (this.get('model.isDeleted')) {
      return;
    }

    const buffer = this.get('data');

    this.set('isSaving', true);

    buffer.applyChanges();
    yield this.get('model').save();

    this.set('isSaving', false);
  }).restartable(),

  saveOnNameChange: observer('data.name', function() {
    if (this.get('model.isDeleted')) {
      return;
    }

    this.get('_updateTaskName').perform();
  }),

  forceSync() {
    if (this.get('model.isDeleted')) {
      return;
    }

    this.get('_updateTaskName').perform(true);
    this.get('_updateTaskUser').perform(true);
  },

  dependencies: computed('model.dependencies.[]', function() {
    if (this.get('model.isDeleted')) {
      return;
    }

    return this.get('model.dependencies').sortBy('position').map( task => {
      return DependencyDecorator.create({
        container: Ember.getOwner(this),
        task:      task
      });
    });
  }),

  elegibleDependencies: computed('model.goal.tasks.[]', 'model.dependencies.[]', function() {
    if (this.get('model.isDeleted')) {
      return;
    }

    const currentDependencyIds = this.get('model').hasMany('dependencies').ids();

    const tasks = this.get('model.goal.tasks').reject( task => {
      return task.get('id') === this.get('model.id') ||
        currentDependencyIds.contains(task.get('id'));
    }).sortBy('position');

    return tasks.map( task => {
      return DependencyDecorator.create({
        container: Ember.getOwner(this),
        task:      task
      });
    });
  }),

  showDependencies: computed('dependencies.[]', 'elegibleDependencies.[]', function() {
    return this.get('dependencies.length') + this.get('elegibleDependencies.length') > 0;
  }),

  commentsSortingProperties: ['createdAt:desc'],

  comments: computed.sort('model.comments.[]', 'commentsSortingProperties'),

  showDeleteButton: computed('model.goal.tasks.[]',
                            'model.{name.descriptionMarkdown,user,done', function() {

    if (this.get('model.goal.tasks.length') > 1) {
      return true;
    }

    const name = this.get('model.name'),
          desc = this.get('model.descriptionMarkdown'),
          user = this.get('model.user.id'),
          done = this.get('model.done');

    if (name || desc || user || done) {
      return true;
    }
  }),

  actions: {
    assignUser(user) {
      const buffer = this.get('data');

      buffer.set('user', user);

      this.get('_updateTaskUser').perform();
    },

    enableDescriptionEdit() {
      this.set("isEditingDescription", true);

      Ember.run.next( () => {
        const $textarea = Ember.$('textarea.assignment-description-field');

        $textarea.focus();
      });
    },

    disableDescriptionEdit() {
      this.set("isEditingDescription", false);
    },

    updateDescription(descriptionMardown) {
      this.set('data.descriptionMarkdown', descriptionMardown);
      this.get('saveTask').perform();
    },

    addDependency(dependency, dropdown) {
      if (dropdown) {
        dropdown.actions.close();
      }

      if (dependency && dependency.get('task')) {
        this.send('addDependency', dependency.get('task'));
      }

      return true;
    }
  },

  _updateTaskName: task(function * (skipTimeout = false) {
    if (!skipTimeout) {
      yield timeout(1500);
    }

    const data  = this.get('data'),
          model = this.get('model');

    if (data.get('name') === null) {
      return;
    }

    if ((data.get('name') || '').trim() !== model.get('name')) {
      this.get('saveTask').perform();
    }
  }).restartable(),

  _updateTaskUser: task(function * (skipTimeout = false) {
    if (!skipTimeout) {
      yield timeout(1500);
    }

    const data = this.get('data'),
          model = this.get('model');

    if (data.get('user') !== model.get('user')) {
      this.get('saveTask').perform();
    }
  }).restartable()
});
