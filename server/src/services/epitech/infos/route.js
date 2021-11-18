const fetch = require('node-fetch');

const route = async (req, res) => {
  try {
    const r = await fetch(`https://intra.epitech.eu/${req.instance.params.autologin}/user?format=json`);
    const body = await r.json();

    const r2 = await fetch(`https://intra.epitech.eu/${req.instance.params.autologin}/?format=json`);
    const body2 = await r2.json();

    res.json({
      status: true,
      name: body.title,
      promo: body.promo,
      credits: body.credits,
      objCredits: body2.current[0].credits_obj,
      gpa: body.gpa[0].gpa,
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
