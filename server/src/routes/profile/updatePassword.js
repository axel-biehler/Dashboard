const { User } = require('../../database');
const authentication = require('../../authentication');

const updatePassword = async (req, res) => {
  let { username, password } = req.body;

  if (typeof username !== 'string' || typeof password !== 'string') {
    res.status(400).json({
      status: false,
      error: 'invalid body',
    });
    return;
  }

  username = username.trim();
  password = password.trim();

  if (password.length < 4) {
    res.status(400).json({
      status: false,
      error: 'password is too short',
    });
    return;
  }

  try {
    const newPass = await authentication.hashPassword(password);
    const user = await User.findOne({ username: req.username });

    if (!user) {
      res.json({
        status: false,
        error: 'user not found',
      });
    }

    user.password = newPass;
    user.save();

    res.json({
      status: true,
      token: authentication.generateJwt(user),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      error: 'internal error',
    });
  }
};

module.exports = updatePassword;
