const path = require('path');

const metadata = {
  name: path.basename(__dirname),
  displayName: 'City temperature',
  description: 'Display temperature for a city',
  params: [
    {
      name: 'city',
      type: 'string',
      placeholder: 'City name',
    },
    {
      name: 'refreshRate',
      type: 'integer',
      placeholder: 'Refresh rate (in seconds)',
    },
  ],
};

module.exports = metadata;
