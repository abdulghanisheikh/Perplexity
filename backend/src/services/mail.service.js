import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

// Connection between web server and SMTP (email server)
const transporter = nodemailer.createTransport({
    service: "gmail",
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
export const sendEmail = async({ to, subject, username, emailVerificationToken }) => {
    const emailVerificationURL = `http://localhost:3000/api/auth/verifyEmail?token=${emailVerificationToken}`;

    const html = `
        <p>Hi ${username},</p>
        <p>Please verify your email address by clicking the link below:</p>
        <a href=${emailVerificationURL}>Verify email</a>
        <p>If you did not create an account, Ignore this email.</p>
        <p>- The Perplexity Team</p>
    `;

    try {
        const mailDetails = await transporter.sendMail({
            from: `Abdul Ghani <${process.env.GOOGLE_EMAIL_USER}>`,
            to,
            subject,
            html
          });

        console.log("Email sent!");
    } catch(err) {
        console.log("Error sending email:", err.message);
    }
}