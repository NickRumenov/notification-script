const nodemailer = require('nodemailer');

const emailFrom = '';
const emailTo = '';
const password = '';
const from = '2023-04-24';
const to = '2023-05-06';

let isMailSent = false;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: emailFrom,
    pass: password
  }
});

const mailOptions = {
  from: emailFrom,
  to: emailTo,
  subject: 'Ima chasove',
  text: 'Ima chasove!'
};


const fetchDates = () => {
  const hospitals = ['1274', '1223', '5124']

  hospitals.map(id => {
    fetch(`https://superdoc.bg/calendar/${id}/today/7`)  
      .then(res => res.json())
      .then(({ calendar }) => {

        if (!isMailSent) {
          const earliestDate = calendar.earliestSlot.date;

          if (new Date(earliestDate) > new Date(from) && new Date(earliestDate) < new Date(to)) {
            console.log(`Suitable date found: ${earliestDate}`)

            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                isMailSent = true;
                console.log('Email sent: ' + info.response);
              }
            }) 
          } else {
            console.log(`Earliest Date is not suitable: ${calendar.earliestSlot.date}`)
          }
        } else {
          console.log('Mail already sent')
        }
      }
    );
  })
}

setInterval(function () {
  fetchDates();
}, 900000);

  

