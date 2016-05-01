/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var env = EmberApp.env();
var s3Prefix;

if (env === "production") {
  s3Prefix = "https://s3-eu-west-1.amazonaws.com/q-tasks-prod/"
}

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    babel: {
      includePolyfill: true
    },

    fingerprint: {
      prepend: s3Prefix
    },

    styleProcessorOptions: {
      processors: [
        {
          type: 'postcss',
          plugins: [
            { module: require('postcss-import'),
              options: {
                path: "app/styles"
              }
            },
            { module: require('postcss-mixins') },
            { module: require('postcss-nested-vars') },
            { module: require('postcss-nested') },
            { module: require('postcss-extend') },
            { module: require('postcss-cssnext'),
              options: {
                browsers: ['last 2 versions']
              }
            },
            { module: require('postcss-fontpath') },
            { module: require('postcss-color-function') },
            { module: require('postcss-color-gray') }
          ]
        }
      ],
      extension:  'css'
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
