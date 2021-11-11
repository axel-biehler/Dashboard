const { Instance } = require('../database');

const instanceRouteMiddleware = async (req, res, next) => {
  const { id } = req.params;

  if (typeof id !== 'string') {
    res.status(400).json({
      error: 'bad request',
    });
    return;
  }
  try {
    const instance = await Instance.findById(id);
    if (instance === null) {
      res.status(400).json({
        error: 'unknown instance',
      });
      return;
    }

    if (instance.user.toString() !== req.userId) {
      res.status(401).json({
        error: 'not your instance',
      });
      return;
    }

    req.instance = instance;
    next();
  } catch (err) {
    res.status(400).json({
      error: 'invalid instance',
    });
  }
};

module.exports = instanceRouteMiddleware;
