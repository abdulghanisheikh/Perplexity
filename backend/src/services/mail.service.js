import nodemailer from "nodemailer";
import {google} from "googleapis";

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

// connection between web server and SMTP (email server)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    family: 4,
    auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN
    }
});

// Verify connection
transporter.verify()
.then(() => {
    console.log("Email transporter is ready to send emails.")
})
.catch((err) => {
    console.log(err.message);
    console.log("Email transporter verification failed.");
});

// Function to send email
export const sendEmail = async({ to, subject, html = "" }) => {
    try {
        const {token} = await oauth2Client.getAccessToken();
        transporter.options.auth.accessToken = token;

        await transporter.sendMail({
            from: process.env.GOOGLE_EMAIL_USER,
            to,
            subject,
            html
        });

        console.log("Email sent!");
        return `Email sent successfully to ${to}`;
    } catch(err) {
        console.log("Error sending email:", err.message);
    }
}