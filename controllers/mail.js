const nodemailer = require('nodemailer');
// data is js object {"reg":"....","name":"...",}


module.exports.mail = (email, data)=>{

    const subject = "Version23 Team Welcomes you";
    const text = "Hello "+ data.name +" your registration number is " + data.reg;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'version22.nitt@gmail.com',
            pass: 'iomgzevpcrbasgva' 
        }
    });

    let mailOptions = {
        from: '"Version23 Team" <version22.nitt@gmail.com>', // sender address
        to: email, 
        subject: subject, 
        text: text 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Error sending email to ${email}: ${error}`);
            res.status(500).json({ message: `Error sending email to ${email}: ${error}` });
        } else {
            console.log(`Email sent to ${email}`);
            res.status(200).json({ message: `Email sent succesfully` });
        }
    });

}