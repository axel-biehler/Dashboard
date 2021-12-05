const { User } = require('../../database');
const services = require('../../services');

const listServices = async (req, res) => {
  let list = services;

  const user = await User.findById(req.userId).exec();
  if (user.redditId === null) {
    list = services.filter((service) => !service.needsOauth);
  }
  res.json(list);
};

module.exports = listServices;
