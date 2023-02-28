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
    </body>
    </html>`
}

module.exports = emailTemplate;