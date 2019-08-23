const {
  sendMail,
} = require('../../helper/mailHelper');

const sendAlert = async (req, res) => {
  const data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'morisrenar@gmail.com',
    subject: 'After callback Hello there',
    text: 'Testing some Mailgun awesomeness!',
  };

  sendMail(data.from, data.to, data.subject, data.text, (error, response) => {
    if (error) {
      return res.send({
        success: false,
        error,
      });
    }
    return res.send({
      success: true,
      data: response,
    });
  });
};

const sendAlertToCar = async (req, res) => {
  const data = {
    from: '<no-reply@car-alert-service.com>',
    to: req.body.email,
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

  sendMail(data.from, data.to, data.subject, data.text, data.html, (error, response) => {
    if (error) {
      return res.send({
        success: false,
        error,
      });
    }
    return res.send({
      success: true,
      data: response,
    });
  });
};

module.exports = {
  sendAlert,
  sendAlertToCar,
};
