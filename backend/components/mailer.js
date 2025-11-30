const nodemailer = require("nodemailer");
const { errorLogger } = require("./errorLogger");

module.exports.Mailer = async (email, subject, message) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    });

    try {

        const mailerResult = await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: email,
            subject: (subject) ? subject : 'No subject',
            html: message
        });
        return true;

    } catch (error) {

        console.log(error, "Mailer error");
        return false;
    }
}
