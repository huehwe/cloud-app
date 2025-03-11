import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "653bc524632dd7",
        pass: "f5b2fe6f109e44"
    }
});

export const sendVerificationEmail = async (email, otp) => {
    try {
        console.log('Sending verification email to:', email);

        const mailOptions = {
            from: '"Your App" <noreply@yourapp.com>',
            to: email,
            subject: 'Email Verification Code',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2c3e50; text-align: center;">Email Verification</h2>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; text-align: center;">
                        <p style="font-size: 16px; color: #2c3e50;">Your verification code is:</p>
                        <h1 style="color: #3498db; font-size: 36px; margin: 20px 0;">${otp}</h1>
                        <p style="color: #7f8c8d; font-size: 14px;">This code will expire in 10 minutes.</p>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
        return info;

    } catch (error) {
        console.error('Email sending failed:', error);
        throw error;
    }
};


export const sendOTP = async (email, otp) => {
    try {
        ư
        console.log('Sending OTP to:', email);
        const info = await sendEmail(email, 'Your OTP Code', generateOTPTemplate(otp));
        console.log('OTP email sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('OTP sending failed:', error);
        throw error;
    }
};

const sendEmail = async (to, subject, html) => {
    const mailOptions = {
        from: '"Your App" <noreply@yourapp.com>',
        to,
        subject,
        html
    };
    return await transporter.sendMail(mailOptions);
};

const generateOTPTemplate = (otp) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c3e50; text-align: center;">Email Verification</h2>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; text-align: center;">
                <p style="font-size: 16px; color: #2c3e50;">Your verification code is:</p>
                <h1 style="color: #3498db; font-size: 36px; margin: 20px 0;">${otp}</h1>
                <p style="color: #7f8c8d; font-size: 14px;">This code will expire in 10 minutes.</p>
            </div>
        </div>
    `;
};