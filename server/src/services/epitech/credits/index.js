const path = require('path');

const metadata = {
  name: path.basename(__dirname),
  displayName: 'Credits',
  description: 'Display your credits',
  params: [
    {
      name: 'autologin',
      type: 'string',
      placeholder: 'Autologin link',
    },
  ],
};

module.exports = metadata;
