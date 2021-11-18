const path = require('path');

const metadata = {
  name: path.basename(__dirname),
  displayName: 'Infos',
  description: 'Display your credits and GPA',
  params: [
    {
      name: 'autologin',
      type: 'string',
      placeholder: 'Autologin link',
    },
  ],
};

module.exports = metadata;
