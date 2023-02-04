const nodemailer = require('nodemailer');
// data is js object {"reg":"....","name":"...",}


module.exports.mail = (req,res,email, data)=>{
    

    const subject = "Version23 Team Welcomes you";
    const text = "Hello "+ data.userName +" your registration number is " + data.reg;

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