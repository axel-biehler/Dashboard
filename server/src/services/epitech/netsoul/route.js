const fetch = require('node-fetch');

const timeConverter = (timestamp) => {
  const a = new Date(timestamp * 1000);
  const time = `${a.getDate()}/${a.getMonth()}`;
  return time;
};

const route = async (req, res) => {
  try {
    const r = await fetch(`https://intra.epitech.eu/${req.instance.params.autologin}/user?format=json`);
    const body = await r.json();

    const { login } = body;

    const r2 = await fetch(`https://intra.epitech.eu/${req.instance.params.autologin}/user/${login}/netsoul?format=json`);
    const body2 = await r2.json();

    const data = body2.slice(-7).map((val) => ([
      timeConverter(val[0] + 3600),
      Math.round(((val[1] / 60) / 60) * 100) / 100,
      Math.round(((val[5] / 60) / 60) * 100) / 100,
    ]));

    res.json({
      status: true,
      name: body.title,
      promo: body.promo,
      netsoul: data,
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
