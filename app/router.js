import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');

  this.route('first-project');
  this.route('new-project');

  this.route('projects', function() {
    this.route('project', { path: '/:project_id', resetNamespace: true }, function() {
      this.route('first-goal');
      this.route('goal', { path: 'goals/:goal_id', resetNamespace: true }, function() {
        this.route('first-task');
        this.route('task', { path: 'tasks/:task_id', resetNamespace: true });
      });
    });
  });

  this.route('not-found');
});

export default Router;
