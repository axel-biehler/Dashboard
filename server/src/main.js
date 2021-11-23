const express = require('express');
const cors = require('cors');
const database = require('./database');
const routes = require('./routes');
const { authMiddleware } = require('./authentication');

const main = async () => {
  const app = express();
  const port = process.env.PORT || 8080;

  app.use(cors());

  app.use(express.json());
  app.use('/auth', routes.authentication);
  app.use('/about.json', routes.about);

  app.use('/services', authMiddleware, routes.services);
  app.use('/instances', authMiddleware, routes.instances);
  app.use('/profile', authMiddleware, routes.profile);

  await database.database.connectToDatabase();
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}.`);
  });
};

main();
