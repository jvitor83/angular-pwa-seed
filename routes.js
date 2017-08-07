//@ts-check

const { NgRouterResolver } = require('ng-router-resolver');
const { writeFileSync, readFileSync } = require('fs');
const { genRoutingManifest } = require('./routes-2-sw-conf');

const modulePath = getArgument('--module');
const manifestPath = getArgument('--out');
const index = getArgument('--index', '/index.html');
const baseUrl = getArgument('--base-url', '/');

console.log(`Resolving routes from ${modulePath}...`);

const routes = NgRouterResolver.fromModule(modulePath);

console.log(`OK! Collected ${recursiveRouterLength(routes)} route rules`);
console.log('Generating manifest for routes');

const routesManifest = genRoutingManifest(index, routes, baseUrl);

console.log(`OK! Merging with manifest ${manifestPath}`);

const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
mergeConfig(manifest, { routing: routesManifest });

console.log(`OK! Saving to ${manifestPath}`);

writeFileSync(manifestPath, JSON.stringify(manifest, null, '  '));

console.log('OK');

function recursiveRouterLength(arr) {
  if (!Array.isArray(arr)) return 0;
  return arr.length + arr.reduce((l, n) =>
    l + recursiveRouterLength(n.children) + recursiveRouterLength(n.loadChildren), 0);
}

function getArgument(name, defaultValue, requiredMsg) {
  const idx = process.argv.indexOf(name);
  const found = idx !== -1;

  if (!found && defaultValue === void 0) {
    console.log(requiredMsg || `Argument ${name} is required`);
    process.exit(1);
  }

  return found ? process.argv[idx + 1] : defaultValue;
}

function mergeConfig(mergeTo, mergeFrom) {
    console.log(mergeFrom);
    console.log(mergeTo);
  Object.keys(mergeFrom).forEach(function (key) {
    var value = mergeFrom[key];
    if (mergeTo[key]) {
      if (Array.isArray(mergeTo[value])) {
        if (Array.isArray(value)) {
          mergeTo[key] = mergeTo[key].concat(value);
        }
        else {
          mergeTo[key].push(value);
        }
      }
      else if (typeof value === 'object') {
        mergeTo[key] = mergeConfig(mergeTo[key], value);
      }
      else {
        mergeTo[key] = value;
      }
    }
    else {
      mergeTo[key] = value;
    }
  });
}