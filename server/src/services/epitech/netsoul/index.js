const path = require('path');

const metadata = {
  name: path.basename(__dirname),
  displayName: 'Netsoul',
  description: 'Display your log time',
  params: [
    {
      name: 'autologin',
      type: 'string',
      placeholder: 'Autologin link',
    },
  ],
};

module.exports = metadata;
