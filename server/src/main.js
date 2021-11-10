const express = require('express');
const cors = require('cors');
const database = require('./database');
const routes = require('./routes');

const main = async () => {
  const app = express();
  const port = process.env.PORT || 8080;

  app.use(cors());

  app.use(express.json());
  app.use('/auth', routes.authentication);

  await database.database.connectToDatabase();
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}.`);
  });
};

main();
