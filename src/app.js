const express = require('express');

const app = express();
const path = require('path');
require('dotenv').config();
const config = require('config');

app.set('view engine', 'ejs'); // setting a local view engine
app.use(express.static('public/dist')); // defining a static directory

require('express-async-errors');

const logger = require('./helper/logger');

/*
 * Be sure to setup your config values before running this code. You can
 * set them using environment variables or modifying the config file in /config.
 *
 */
require('./startup/checkAppConfiguration')(app); // enable cors
require('./startup/validation')();
require('./startup/route')(app);
require('./startup/db')();
require('./startup/scheduler')();

app.use(express.static(path.join(__dirname, '')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/dist/index.html'));
});

// if we have to set port from system
// app.set('port', process.env.PORT || 8080);
const port = process.env.PORT || config.get('port') || app.get('port');

// Start server
// Webhooks must be available via SSL with a certificate signed by a valid certificate authority.
app.listen(port, () => {
  logger.info(`App is running on port: ${port}`);
});

module.exports = app;
