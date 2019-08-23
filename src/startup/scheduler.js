/* eslint no-param-reassign: "error" */
const schedule = require('node-schedule');
const moment = require('moment');

const {
  sendMail,
} = require('../helper/mailHelper');

const {
  CarInfo,
} = require('../model/car/carInfo');

const data = {
  from: '<no-reply@car-alert-service.com>',
  to: '',
  subject: 'Alert for maintenance',
  text: 'Test email text',
  html: `
    <div>Dear Customer,</div>
    <br>
    <div>Greetings from car alert service.</div>
    <div>It's time for your car maintenance.</div>
    <br>
    <div style="font-size: 10px;">Thanks,</div>
    <div  style="font-size: 10px;">Team Car Maintenance Alert Service</div>`,
};

module.exports = () => {
  // run every 5 seconds '*/5 * * * * *'
  // run every day '*/1 * * * *'
  schedule.scheduleJob('*/1 * * * *', async () => {
    const cars = await CarInfo.find();
    cars.map(async (car) => {
      const {
        carRegistrationDate,
        lastServicingAlertDate,
        isNewCar,
        email,
      } = car;
      data.to = email;
      const today = moment();
      if (isNewCar) {
        const previousDate = moment(carRegistrationDate);
        const diff = moment.duration(today.diff(previousDate)).years();
        if (diff >= 3) {
          sendMail(data.from, data.to, data.subject, data.text, data.html, (err, res) => {});
          car.isNewCar = false;
          car.lastServicingAlertDate = new Date();
          await car.save();
        }
      } else {
        let previousDate;
        if (lastServicingAlertDate) {
          previousDate = lastServicingAlertDate;
        } else {
          previousDate = carRegistrationDate;
        }
        const diff = moment.duration(today.diff(previousDate)).years();
        if (diff >= 1) {
          sendMail(data.from, data.to, data.subject, data.text, data.html, (err, res) => {});
          car.lastServicingAlertDate = new Date();
          await car.save();
        }
      }
      return car;
    });
  });
};
