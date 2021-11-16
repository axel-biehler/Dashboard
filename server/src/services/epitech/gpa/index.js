const path = require('path');

const metadata = {
  name: path.basename(__dirname),
  displayName: 'GPA',
  description: 'Display your GPA',
  params: [
    {
      name: 'autologin',
      type: 'string',
      placeholder: 'Autologin link',
    },
  ],
};

module.exports = metadata;
