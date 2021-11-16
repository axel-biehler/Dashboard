const fetch = require('node-fetch');

const route = async (req, res) => {
  try {
    const r = await fetch(`https://intra.epitech.eu/${req.instance.params.autologin}/user?format=json`);
    const body = await r.json();

    const r2 = await fetch(`https://intra.epitech.eu/${req.instance.params.autologin}/?format=json`);
    const body2 = await r2.json();
    res.json({
      status: true,
      credits: body.credits,
      norm: body2.current[0].credits_norm,
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
