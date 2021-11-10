const path = require('path');
const { loadDirectory } = require('../utils');

module.exports = loadDirectory(__dirname).map((service) => ({
  ...service,
  widgets: loadDirectory(path.join(__dirname, service.name, 'widgets')),
}));
