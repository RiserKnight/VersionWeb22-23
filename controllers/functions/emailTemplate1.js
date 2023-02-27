const emailTemplate = (userName,link) => {
    return `<html>
    <head>
        <style>
            .linkBtn{
                background-color: rgb(0, 113, 199);
                color: whitesmoke;
                border: none;
                outline: none;
                width: 10%;
                border-radius: 5px;
                font-size: .9rem;
                padding: 10px;
            }
            a{
                color: white;
                text-decoration: none;
            }
            #linkText{
                color: white;
            }
        </style>
    </head>
    <body>
        <img src="http://version23.in/images/version.png" alt="Logo">
        
        <p><strong>Hello ${userName}. </strong>To verify your account click the button below before 24 hours. You must remember your password to verify your account.</p>
        <button type="button" class="linkBtn"><a id="linkText" href="${link}">Account Verification</a></button>
       
    </body>
    </html>`
}

module.exports = emailTemplate;