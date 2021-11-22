const { Instance } = require('../../database');
const services = require('../../services');

const validateType = (input, requestType) => {
  switch (requestType) {
    case 'integer': return typeof input === 'number';
    case 'string': return typeof input === 'string';
    default: return false;
  }
};

const editInstance = async (req, res) => {
  const { id } = req.params;

  try {
    const instance = await Instance.findById(id);

    if (instance === null) {
      res.status(400).json({
        status: false,
        error: 'instance not found',
      });
      return;
    }
    if (instance.user.toString() !== req.userId) {
      res.status(400).json({
        status: false,
        error: 'not your instance',
      });
      return;
    }

    const widgetMetadata = services.find((svc) => svc.name === instance.service)
      .widgets.find((wdg) => wdg.name === instance.widget);

    const invalidParams = widgetMetadata.params.some((p) => {
      if (!(p.name in req.body) || !validateType(req.body[p.name], p.type)) {
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

    instance.params = req.body;

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

module.exports = editInstance;
