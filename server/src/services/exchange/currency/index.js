const path = require('path');

const metadata = {
  name: path.basename(__dirname),
  displayName: 'Currency exchange',
  description: 'Display the rate between two currencies',
  params: [
    {
      name: 'firstCurrency',
      type: 'string',
      placeholder: 'First currency',
    },
    {
      name: 'secondCurrency',
      type: 'string',
      placeholder: 'Second currency',
    },
  ],
};

module.exports = metadata;
