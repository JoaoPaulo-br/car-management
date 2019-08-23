const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const error = require('../middleware/error');
const logger = require('../helper/logger');

const authenticationRouter = require('../router/auth/authentication');

const superAdminRouter = require('../router/superAdminRouter/superAdminResourceInfo');
const adminRouter = require('../router/adminRouter/adminResourceInfo');
const ownerRouter = require('../router/ownerRouter/ownerResourceInfo');
const userListRouter = require('../router/userRouter/userList');
const carRouter = require('../router/carRouter/carInfo');
const alertRouter = require('../router/alertRouter/alert');

module.exports = (app) => {
  app.use(express.json());
  app.use(bodyParser.json({
    extended: false,
  }));
  app.use(morgan('tiny', {
    stream: logger.stream,
  }));
  // app.use(morgan('dev'));


  app.use('/api/authentication', authenticationRouter);

  app.use('/api/superAdminTest', superAdminRouter);
  app.use('/api/adminTest', adminRouter);
  app.use('/api/ownerTest', ownerRouter);
  app.use('/api/userList', userListRouter);
  app.use('/api/cars', carRouter);
  app.use('/api/alert', alertRouter);

  app.use(error);
};
