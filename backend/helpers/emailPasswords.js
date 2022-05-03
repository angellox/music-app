import nodemailer from 'nodemailer';

const emailPasswords = async data => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_POST,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });
    
    const { email, name, token, rol } = data;

    const ref = rol ? `${process.env.FRONTEND_URL}/forgotten-password/artist/${token}` : `${process.env.FRONTEND_URL}/forgotten-password/listener/${token}`;

    const info = await transporter.sendMail({
        from: 'MUSIC SHARING REGISTRATION',
        to: email,
        subject: 'Retrieve your account - Music Sharing',
        text: 'Retrieve your account - Follow this message to be able to sign in again',
        html: `
            <p>Hello! ${name}, you have solicited recover your password!</p>
            <p>Just click in the following link to recover it and reset your password!
            <a href=${ref}>Reset your password click on here</a></p>

            <p>If you did not create this account by yourself. Please ignore it</p>
        `
    });

    console.log("Mensaje enviado: %s", info.messageId);
};

export default emailPasswords;