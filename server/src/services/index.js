/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const path = require('path');
const { loadDirectory } = require('../utils');

module.exports = loadDirectory(__dirname).map((service) => ({
  ...service,
  widgets: loadDirectory(path.join(__dirname, service.name)).map((wid) => ({
    ...wid,
    params: [
      ...wid.params,
      {
        name: 'refreshRate',
        type: 'integer',
        placeholder: 'Refresh rate (in seconds)',
      },
    ],
    route: require(path.join(__dirname, service.name, wid.name, 'route.js')),
  })),
}));
