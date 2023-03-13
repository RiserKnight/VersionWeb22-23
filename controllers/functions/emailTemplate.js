const emailTemplate = (userID,userName) => {
    return `<html>
    <head>
        <style>
            /* Add any custom styles for your email here */
        </style>
    </head>
    <body>
        <img src="http://version23.in/images/version.png" alt="Logo">
        <h3>Hello ${userName} your registartion ID is <span>${userID}</span></h3>
        <p>We would like to extend our warmest thanks for registering for the all-India MCA symposium hosted by NITT. Your participation is greatly appreciated and we are thrilled to have you join us for this exciting 3-day event. <strong>As a reminder, please don't forget to bring your college ID cards with you to ensure a smooth and hassle-free check-in process.</strong></p>
        <p>Whether you're interested in coding challenges, other tech events, or cultural and fun activities, we have something for everyone. We hope you have fun participating in the events and making the most of this great opportunity. Once again, thank you for registering and we look forward to seeing you soon!</p>
        <hr>
        <p>We are happy to inform that we will provide free accommodation and food for the participants coming from the colleges that are located outside the 60 KMs range of NIT Trichy. You are required to fill the following google form by 16/03/2023 to avail free accommodation and food.</p>
        <a href="https://forms.gle/SwRBeKPxS8ig99Fj8">https://forms.gle/SwRBeKPxS8ig99Fj8</a>
        <br>
        <p>Also, join our WhatsApp groups if you have any queries.</p>
        <p>For Events related queries - </p>
        <a href="https://chat.whatsapp.com/BAtcmwaXD674tZYwQPgJEU">https://chat.whatsapp.com/BAtcmwaXD674tZYwQPgJEU</a>
        <br>
        <p>For Accomodation Related queries -</p>
        <a href="https://chat.whatsapp.com/CIEkc55dSHv9ceGa9CeLaU">"https://chat.whatsapp.com/CIEkc55dSHv9ceGa9CeLaU</a>
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