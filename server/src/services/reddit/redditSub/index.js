const path = require('path');

const metadata = {
  name: path.basename(__dirname),
  displayName: 'Reddit sub',
  description: 'Display informations of a subreddit',
  params: [
    {
      name: 'subreddit',
      type: 'string',
      placeholder: 'Subreddit name',
    },
  ],
};

module.exports = metadata;
