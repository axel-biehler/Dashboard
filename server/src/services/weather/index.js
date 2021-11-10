const path = require('path');

const metadata = {
  name: path.basename(__dirname),
  displayName: 'Weather',
  description: 'Use the OpenWeather API to get weather data.',
  needsOAuth: false,
};

module.exports = metadata;
