/*jshint node:true*/

module.exports = function(environment) {
  return {
    locales: ['ca', 'es'],
    baseLocale: ['ca'],
    disablePolyfill: true,
    publicOnly: false,
    inputPath: 'translations',
    outputPath: 'translations'
  };
};
