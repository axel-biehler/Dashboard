const { Instance } = require('../../database');

const deleteInstance = async (req, res) => {
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
    await instance.remove();

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

module.exports = deleteInstance;
