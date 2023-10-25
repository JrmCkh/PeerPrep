const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./UserRoutes.js');
const env = require('./loadEnvironment.js');
const logger = require('./Log.js');

logger.register({
  serviceName: "User Service",
  logLevel: logger.LOG_LEVELS.all
});

logger.log('Starting ...');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.listen(env.USER_PORT, () => {
  logger.log(`Running on port: ${env.USER_PORT}`);
});