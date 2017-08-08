// @ts-check
const { coalesceToTerminals, matcherForTerminal } = require('ng-pwa-tools/lib/ls-routes/lib');

/**
 * Convert routes json file to SW config
 * @param {String} index
 * @param {Array} routes
 * @param {String=} baseUrl
 */
function genRoutingManifest(index, routes, baseUrl = '/') {
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.substr(0, baseUrl.length - 1);
  }

  const routesConfig = coalesceToTerminals(flattenRoutes(routes))
    .map(terminal => matcherForTerminal(terminal, baseUrl))
    .reduce(
    (routes, matcher) => (routes[matcher.pattern] = { prefix: false }, routes),
    {}
    );

  return ({ index: index, routes: routesConfig });
}

exports.genRoutingManifest = genRoutingManifest;

/**
 * @param {Array} routes
 * @param {String=} routes
 */
function flattenRoutes(routes, path = '') {
  if (!routes) {
    return [];
  }

  if (path.endsWith('/')) {
    path = path.substr(0, path.length - 1);
  }

  return routes.reduce((acc, route) => {
    const { children, loadChildren } = route;
    delete route.children;
    delete route.loadChildren;

    if (path) {
      route.path = path + '/' + route.path;
    }

    return [
      ...acc,
      route,
      ...flattenRoutes(children, route.path),
      ...flattenRoutes(loadChildren, route.path)
    ];
  }, []);
}