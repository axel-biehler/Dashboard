const { User } = require('../../database');
const authentication = require('../../authentication');

const register = async (req, res) => {
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

  if (username.length < 1) {
    res.status(400).json({
      status: false,
      error: 'username is empty',
    });
    return;
  }

  if (password.length < 4) {
    res.status(400).json({
      status: false,
      error: 'password is too short',
    });
    return;
  }

  try {
    if (!(await authentication.usernameAvailable(username))) {
      res.json({
        status: false,
        error: 'username already taken',
      });
      return;
    }

    const u = new User({
      username,
      password: await authentication.hashPassword(password),
    });
    await u.save();

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

module.exports = register;
