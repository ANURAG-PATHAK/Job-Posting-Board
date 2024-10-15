import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendVerificationEmail = async (email, token) => {
    const verificationUrl = `${process.env.APP_URL}/api/auth/verify-email?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Account Verification',
        text: `Please verify your account by clicking the following link: ${verificationUrl}`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending verification email:', error.message);
        throw new Error('Failed to send verification email');
    }
};

export const sendJobEmails = async (job, companyName) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: job.candidates,
        subject: `New Job Posting: ${job.title}`,
        text: `Hello,

A new job has been posted by ${companyName}:

Title: ${job.title}
Description: ${job.description}
Experience Level: ${job.experienceLevel}
Apply before: ${job.endDate.toDateString()}

Best regards,
${companyName}`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending job emails:', error.message);
        throw new Error('Failed to send job alert emails');
    }
};
