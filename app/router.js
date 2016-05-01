import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');

  this.route('projects', function() {
    this.route('first');
    this.route('project', { path: '/:id', resetNamespace: true }, function() {
      this.route('goal', { path: 'goals/:id', resetNamespace: true }, function() {
        this.route('task', { path: 'tasks/:id', resetNamespace: true }, function() {
        });
      });
    });
  });

  this.route('not-found');
});

export default Router;
