module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'www',
  root: 'www/',
  ignoreUrlParametersMatching: [/./],
  staticFileGlobs: [
    'www/index.html',
    'www/**/!(*.map|service-worker.js)'
  ]
};
