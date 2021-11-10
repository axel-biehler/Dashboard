const services = require('../../services');

const listServices = (req, res) => {
  res.json(services);
};

module.exports = listServices;
