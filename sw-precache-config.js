module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'www',
  root: 'www/',
  ignoreUrlParametersMatching: [/./],
  handleFetch: true,
  verbose: true,
  maximumFileSizeToCacheInBytes: 10485760,
  staticFileGlobs: [
    'www/index.html',
    'www/**/*(!(*.map))'
  ]
};
