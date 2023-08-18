"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: "valenpalmas446@gmail.com",
        pass: "kafymwphbfrmbvuk"
    },
    from: "valenpalmas446@gmail.com"
});
const sendEmail = (to, code) => {
    try {
        const mailOptions = {
            from: " 'Valentin Palmas' valenpalmas446@gmail.com",
            to,
            subject: "Código de verificación",
            text: `Tu código de verificación es: ${code}`
        };
        transporter.sendMail(mailOptions);
        console.log("Email enviado");
    }
    catch (error) {
        console.log(error);
    }
};
exports.sendEmail = sendEmail;
