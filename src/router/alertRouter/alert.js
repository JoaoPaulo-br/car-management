const express = require('express');

const {
  sendAlert,
  sendAlertToCar,
} = require('../../controller/alert/alertUser');

const router = express.Router();

router.get('/alert-user', sendAlert);
router.post('/alert-car', sendAlertToCar);

module.exports = router;
