const services = require('../services');

const about = (req, res) => {
  const strippedServices = services.map((service) => ({
    name: service.name,
    widgets: service.widgets.map((widget) => ({
      name: widget.name,
      params: widget.params.map((param) => ({
        name: param.name,
        type: param.type,
      })),
    })),
  }));

  res.json({
    client: {
      host: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    },
    server: {
      currentTime: Math.floor(new Date().getTime() / 1000),
      services: strippedServices,
    },
  });
};

module.exports = about;
