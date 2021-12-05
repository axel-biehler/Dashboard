const fetch = require('node-fetch');
const { User } = require('../../../database');

const route = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const r = await fetch(`https://oauth.reddit.com/r/${req.instance.params.subreddit}/about`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.redditAccessToken}`,
        },
      });
    const body = await r.json();

    res.json({
      status: true,
      data: body.data,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: false,
      error: 'internal error',
    });
  }
};
module.exports = route;
