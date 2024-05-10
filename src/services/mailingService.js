const nodemailer = require("nodemailer");

const {ServiceUnavailableException} = require('../helpers/exceptions');

const SENDER = 'andriikostalev@ukr.net'

const EMAIL_PASSWORD = 'l0GPcKb07elb0Scu'

const PORT = 3000;

// const generateEmailTemplate = (link) => { 
// const mailGenerator = new Mailgen({
//     theme: 'default',
//     product: {
//         name: 'Mailgen',
//         link,
//     }
// });
    
//     const template = mailGenerator.generate();
//     return template;
// }

const transporter = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: SENDER,
    pass: EMAIL_PASSWORD,
  },
});


const send = async (config) => {
  try {
     const { from = SENDER, to,
        subject,
        text,
         html,
    } = config;
    const info = await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html,
    });
    console.log(info);
  } catch (error) {
      console.error(error.message);
      throw new ServiceUnavailableException(error.message);
  }
}

const sendVerificationEmail = async (email, code) => { 
    try {
        const verificationLink = `http://localhost:${PORT}/auth/verify/${code}`;
        const html = `<p>To verify your email please click on <a href="${verificationLink}">link</a></p>`;
        
        await send({to: email, text: 'Verify your email', subject: 'Email verification', html}); // додайте `await` перед `send`
    } catch (error) {
        console.error(error.message);
        throw new ServiceUnavailableException(error.message);
    }
}

const sendForgotPasswordEmail = async (email, code) => { 
  try {
  const forgotVerificationLink  = `http://localhost:${PORT}/auth/verify/${code}`;
  const html = `<p>To reset your email please click on <a href="${forgotVerificationLink}">link</a></p>`;
    const info = await send({from: SENDER, to: email, text: 'Verify your email', subject: 'Email verification', html });    
    console.log(info);
  } catch (error) {
      throw new ServiceUnavailableException(error?.response?.body);
  }
  
}

module.exports = {sendVerificationEmail, sendForgotPasswordEmail}