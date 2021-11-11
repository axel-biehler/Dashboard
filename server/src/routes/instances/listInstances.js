const { Instance } = require('../../database');

const listInstances = async (req, res) => {
  try {
    const instances = await Instance.find({
      user: req.userId,
    });

    res.json({
      status: true,
      instances,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      error: 'internal error',
    });
  }
};

module.exports = listInstances;
