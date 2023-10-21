const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./UserRoutes.js');
const env = require('./loadEnvironment.js');

console.log('Starting UserServer...');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.listen(env.USER_PORT, () => {
  console.log(`UserServer is running on port: ${env.USER_PORT}`);
});
<<<<<<< HEAD

try {
  const mysqlDb = mysql.createConnection({
    ...env.mysqlCreds,
    ...{ database: env.mysqlDbName },
  });

  mysqlDb.connect((error) => {
    if (error)
      throw new Error('MySQL database connection error:' + error.message);
    console.log('SUCCESS: Connected to the MySQL database');
  });
} catch (err) {
  console.error(err);
}
=======
>>>>>>> assignment-4
