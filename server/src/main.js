const express = require('express');
const database = require('./database');
const { User } = require('./database/User');

const main = async () => {
  const app = express();
  const port = process.env.PORT || 8080;

  app.get('/:username', async (req, res) => {
    const u = new User();
    u.username = req.params.username;
    u.password = 'secret';
    await u.save();

    res.send('Hello World!');
  });

  await database.database.connectToDatabase();
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}.`);
  });
};

main();
