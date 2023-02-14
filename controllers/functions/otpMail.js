
require('dotenv').config();
const nodemailer = require('nodemailer');
// data is js object {"reg":"....","name":"...",}


module.exports.mail = (req,res,email, data)=>{
    

    const subject = "Version23 Password Reset";
    const text = "Hello "+ data.userName +" your OTP is " + data.OTP;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS 
        }
    });

    let mailOptions = {
        from: '"Version23 Team" <version22.nitt@gmail.com>', // sender address
        to: email, 
        subject: subject, 
        text: text 
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