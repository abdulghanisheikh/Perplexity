import nodemailer from "nodemailer";

// Connection between web server and SMTP (email server)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
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
    console.log("Email transporter verification failed.");
});

// Function to send email
export const sendEmail = async({ to, subject, text, html }) => {
    try {
        const mailDetails = await transporter.sendMail({
            from: `Abdul Ghani <${process.env.GOOGLE_EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        });

        console.log("Email sent", mailDetails);
    } catch(err) {
        console.log("Error sending email:", err.message);
    }
}