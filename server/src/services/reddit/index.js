const path = require('path');

const metadata = {
  name: path.basename(__dirname),
  displayName: 'Reddit',
  description: 'Use Reddit api to get data from Reddit',
  needsOauth: true,
};

module.exports = metadata;
