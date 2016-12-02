module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'www',
  root: 'www/',
  ignoreUrlParametersMatching: [/./],
  handleFetch: true,
  verbose: true,
  maximumFileSizeToCacheInBytes: 104857600,
  staticFileGlobs: [
    'www/index.html',
    //'www/**/*(!(*.map))', //every file except sourcemaps (all files should download successfully to serviceworker to works, otherwise it will not install the serviceworker (and offline will not work). Because of that, all files should have mimetype configured at server to be downloaded.)
    "www/**/*.json",
    "www/**/*.css",
    "www/**/*.{eot,ttf,woff,woff2,eof,otf}",
    "www/**/*.js",
    "www/**/*.xml",
    "www/**/*.{htm,html,xhtml,cshtml,jhtml,shtml}",
    "www/**/*.{png,jpg,jpeg,gif,svg,mp3,ico}"
  ]
};
