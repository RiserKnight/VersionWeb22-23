const emailTemplate = (userName,link) => {
    return `<html>
    <head>
        <style>
            /* Add any custom styles for your email here */
        </style>
    </head>
    <body>
        <img src="http://version23.in/images/version.png" alt="Logo">
        <p><strong>Dear Participant,</strong></p>
        
        <p>We are pleased to inform you that free accommodation and food will be provided for participants coming from colleges <strong> located outside </strong> the 60 KM range of NIT Trichy. To avail of this facility, please fill out the following Google Form by March 16, 2023.</p>

        <a href="https://forms.gle/SwRBeKPxS8ig99Fj8"><strong>Click here to fill out the Google Form</strong></a>
        <br><br>
        
        <p><strong>Important points to note:</strong></p>
        <ul>
            <li>Free accommodation and food is only for participants coming from colleges located outside the 60 KM range of NIT Trichy.</li>
            <li>The deadline to fill out the Google Form is March 16, 2023.</li>
        </ul>
        <br>
        
        <p>Additionally, if you have any queries, please join our WhatsApp groups:</p>
        <ul>
            <li><strong>For Events related queries -</strong> <a href="https://chat.whatsapp.com/BAtcmwaXD674tZYwQPgJEU">https://chat.whatsapp.com/BAtcmwaXD674tZYwQPgJEU</a></li>
            <li><strong>For Accommodation related queries -</strong> <a href="https://chat.whatsapp.com/CIEkc55dSHv9ceGa9CeLaU">https://chat.whatsapp.com/CIEkc55dSHv9ceGa9CeLaU</a></li>
        </ul>
        <br>
        
        <p>Thank you and we look forward to your participation in the event.</p>
        <br>
        
        <p><strong>Regards,</strong></p>
        <p><strong>Event Execution Team</strong></p>
        <p><strong>Version'23</strong></p>
        <p><strong>Department of Computer Application</strong></p>
        <p><strong>National Institute of Technology, Tiruchirappalli</strong></p>

    </body>
    </html>`
}

module.exports = emailTemplate;