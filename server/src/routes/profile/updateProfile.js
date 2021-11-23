const { User } = require('../../database');

const updateProfile = async (req, res) => {
  const profile = req.body;

  if (typeof profile !== 'object') {
    res.status(400).json({
      status: false,
      error: 'invalid body',
    });
    return;
  }

  profile.username = profile.username.trim();

  try {
    // eslint-disable-next-line no-underscore-dangle
    const updateRes = await User.findByIdAndUpdate(profile._id, profile, { new: true }).exec();

    if (!updateRes) {
      res.json({
        status: false,
        error: 'User not found',
      });
    }

    res.json({
      status: true,
      updated: updateRes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      error: 'internal error',
    });
  }
};

module.exports = updateProfile;
