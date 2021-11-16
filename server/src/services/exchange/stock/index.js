const path = require('path');

const metadata = {
  name: path.basename(__dirname),
  displayName: 'Stock',
  description: 'Display the price of a stock',
  params: [
    {
      name: 'stockCode',
      type: 'string',
      placeholder: 'Stock code',
    },
  ],
};

module.exports = metadata;
