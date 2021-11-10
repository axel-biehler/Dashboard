const { Instance } = require('../../database');
const services = require('../../services');

const validateType = (input, requestType) => {
  switch (requestType) {
    case 'integer': return typeof input === 'number';
    case 'string': return typeof input === 'string';
    default: return false;
  }
};

const createInstance = async (req, res) => {
  const { service, widget, params } = req.body;
  if (typeof service !== 'string' || typeof widget !== 'string' || typeof params !== 'object') {
    res.status(400).json({
      status: false,
      error: 'invalid body',
    });
    return;
  }

  const serviceMetadata = services.find((svc) => svc.name === service);
  if (serviceMetadata === undefined) {
    res.status(400).json({
      status: false,
      error: 'invalid service',
    });
    return;
  }

  const widgetMetadata = serviceMetadata.widgets.find((wd) => wd.name === widget);
  if (widgetMetadata === undefined) {
    res.status(400).json({
      status: false,
      error: 'invalid widget',
    });
    return;
  }

  const invalidParams = widgetMetadata.params.some((p) => {
    if (!(p.name in params) || !validateType(params[p.name], p.type)) {
      return true;
    }
    return false;
  });
  if (invalidParams) {
    res.status(400).json({
      status: false,
      error: 'invalid parameters',
    });
    return;
  }

  try {
    const instance = new Instance({
      user: req.userId,
      service,
      widget,
      params,
    });
    await instance.save();

    res.json({
      status: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      error: 'internal error',
    });
  }
};

module.exports = createInstance;
