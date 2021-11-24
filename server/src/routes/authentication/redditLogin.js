const fetch = require('node-fetch');
const { User } = require('../../database');
const authentication = require('../../authentication');

const REDIRECT_URI = 'http://localhost:3000/reddit';

let authString = 'DQ67vBicYn-BsvRASDYUvg:gjDsEnpuEYx8yBckbVVDSHk9gYKvFA';
authString = Buffer.from(authString).toString('base64');

const redditOauth = async (req, res) => {
  const { name } = req.query;
  const resAccessToken = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${authString}`,
    },
    mode: 'cors',
    body: `grant_type=authorization_code&code=${req.body.code}&redirect_uri=${REDIRECT_URI}`,
  });

  if (resAccessToken.ok) {
    const resBody = await resAccessToken.json();
    const refreshToken = req.body.code;

    const resProfile = await fetch('https://oauth.reddit.com/api/v1/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${resBody.access_token}`,
      },
    });

    const resBodyProfile = await resProfile.json();

    const user = name !== null ? await User.findOne({ username: name })
      : await User.findOne({ redditId: resBodyProfile.name });

    console.log(name);
    const defaultUser = new User({
      username: resBodyProfile.name,
      redditRefreshToken: refreshToken,
      redditId: resBodyProfile.name,
    });

    try {
      if (!user) {
        await defaultUser.save();
        res.json({
          token: authentication.generateJwt(defaultUser),
          redditAccessToken: resBody.access_token,
          status: true,
        });
      } else {
        user.redditRefreshToken = refreshToken;
        user.redditId = resBodyProfile.name;
        user.save();
        res.json({
          token: authentication.generateJwt(user),
          status: true,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: false,
        error: 'internal error',
      });
    }
  }
};

module.exports = redditOauth;
