/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var env = EmberApp.env();
var s3Prefix;

if (env === "production") {
  s3Prefix = "https://q-tasks-prod.s3.amazonaws.com/"
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

  app.import('bower_components/normalize-css/normalize.css', {
    type: 'vendor',
    prepend: true
  });

  if ((powerSelectCssIndex = app._styleOutputFiles['/assets/vendor.css'].indexOf('vendor/ember-power-select.css')) > -1) {
    app._styleOutputFiles['/assets/vendor.css'].splice(powerSelectCssIndex, 1);
  }

  return app.toTree();
};
