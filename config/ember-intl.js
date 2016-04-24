/*jshint node:true*/

module.exports = function(environment) {
  return {
    locales: ['ca', 'es', 'en'],
    baseLocale: ['ca'],
    disablePolyfill: true,
    publicOnly: false,
    inputPath: 'translations',
    outputPath: 'translations'
  };
};
