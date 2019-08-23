const apiKey = process.env.mainGunApi;
const domain = process.env.mainGunDomain;

const mailGun = require('mailgun-js')({
  apiKey,
  domain,
});


const sendMail = async (from, to, subject, text, html, cb) => {
  const data = {
    from,
    to,
    subject,
    text,
    html,
  };
  await mailGun.messages().send(data, (error, response) => cb(error, response));
};

module.exports = {
  sendMail,
};
