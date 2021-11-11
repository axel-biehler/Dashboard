/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const path = require('path');
const { loadDirectory } = require('../utils');

module.exports = loadDirectory(__dirname).map((service) => ({
  ...service,
  widgets: loadDirectory(path.join(__dirname, service.name, 'widgets')).map((wid) => ({
    ...wid,
    route: require(path.join(__dirname, service.name, 'widgets', wid.name, 'route.js')),
  })),
}));
