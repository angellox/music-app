import nodemailer from 'nodemailer';

const emailSending = async data => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_POST,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });
    
    const { email, name, token, rol } = data;

    // Artist is requested this one
    const ref = rol ? `${process.env.FRONTEND_URL}/confirm/artist/${token}` : `${process.env.FRONTEND_URL}/confirm/listener/${token}`;

    const info = await transporter.sendMail({
        from: 'MUSIC SHARING REGISTRATION',
        to: email,
        subject: 'You\'re about joining us | Music Sharing',
        text: 'Confirm your account in Music Sharing to share/listen songs all over the world',
        html: `
            <p>Hello! ${name}, confirm your account here:</p>
            <p>Just click in the following link to confirm it and play!
            <a href=${ref}>Confirm account now</a></p>

            <p>If you did not create this account by yourself. Please ignore it</p>
        `
    });

    console.log("Mensaje enviado: %s", info.messageId);
};

export default emailSending;