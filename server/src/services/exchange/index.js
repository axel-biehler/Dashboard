const path = require('path');

const metadata = {
  name: path.basename(__dirname),
  displayName: 'Exchange',
  description: 'Uses the Yahoo Finances API.',
  needsOAuth: false,
};

module.exports = metadata;
