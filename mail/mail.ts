import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "valenpalmas446@gmail.com",
        pass: "kafymwphbfrmbvuk"
    },
    from: "valenpalmas446@gmail.com"
});

export const sendEmail = (to: string, code: string) => {
    try {
        const mailOptions = {
            from: " 'Valentin Palmas' valenpalmas446@gmail.com",
            to,
            subject: "Código de verificación",
            text: `Tu código de verificación es: ${code}`
        };

        transporter.sendMail(mailOptions);
        console.log("Email enviado")
    } catch (error) {
        console.log(error);
    }
};