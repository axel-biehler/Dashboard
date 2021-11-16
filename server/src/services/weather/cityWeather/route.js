const fetch = require('node-fetch');

const route = async (req, res) => {
  try {
    const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${req.instance.params.city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`);
    const body = await r.json();
    res.json({
      status: true,
      weather: body.weather[0].main,
      icon: body.weather[0].icon,
      city: body.name,
      country: body.sys.country,
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
