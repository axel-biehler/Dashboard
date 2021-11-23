const { User } = require('../../database');

const getProfile = async (req, res) => {
  let { username } = req.query;

  if (typeof username !== 'string') {
    res.status(400).json({
      status: false,
      error: 'invalid body',
    });
    return;
  }

  username = username.trim();

  try {
    const userRes = await User.findOne({ username }).exec();

    if (!userRes) {
      res.json({
        status: false,
        error: 'user not found',
      });
      return;
    }

    res.json({
      status: true,
      user: userRes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      error: 'internal error',
    });
    console.log('here');
  }
};

module.exports = getProfile;
