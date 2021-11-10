const services = require('../../services');

const listServices = (req, res) => {
  // TODO: Filter services which needs OAuth but user is not logged in
  res.json(services);
};

module.exports = listServices;
