const fetch = require('node-fetch');

const route = async (req, res) => {
  try {
    const r = await fetch(`https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${req.instance.params.firstCurrency}${req.instance.params.secondCurrency}=X`, {
      headers: {
        accept: 'application/json',
        'X-API-KEY': process.env.YAHOOFINANCE_API_KEY,
      },
    });
    const body = await r.json();
    res.json({
      status: true,
      name: body.quoteResponse.result[0].shortName,
      price: body.quoteResponse.result[0].regularMarketPrice,
      currency: body.quoteResponse.result[0].financialCurrency,
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
