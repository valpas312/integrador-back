import User, { IUser } from "../models/user";
import { sendEmail } from "../mail/mail";

export const existeEmail = async (email: string): Promise<void> => {
    const existeEmail: IUser | null = await User.findOne({ email });

    if (existeEmail && existeEmail.verified) {
        throw new Error(`El email ${email} ya está registrado`);
    }

    if (existeEmail && !existeEmail.verified) {
        await sendEmail(email, existeEmail.code as string);
        throw new Error(`El email ${email} ya está registrado pero no está verificado. Se ha enviado un nuevo código de verificación`);
    }
};