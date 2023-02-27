const emailTemplate  = require('./emailTemplate');

require('dotenv').config();
const nodemailer = require('nodemailer');
// data is js object {"reg":"....","name":"...",}


module.exports.mail = (req,res,email, data)=>{

    const subject = "Version23 Team Welcomes you";

    let transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER, // replace with your email address
            pass: process.env.MAIL_PASS // replace with your email password
        }
    });

    let mailOptions = {
        from: '"Version23 Team" <version23team@version23.in>', // sender address
        to: email, 
        subject: subject, 
        html: emailTemplate(data.reg, data.userName)
    };
    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (!error) {
                console.log(`Email sent to ${email}`);
                res.status(200).json({ message: `Email sent succesfully` });
            } 
        });
    } catch (error) {
        console.log(error);
    }

   

}