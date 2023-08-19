import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '../mail/mail';
import randomstring from 'randomstring';
import { generarJWT } from '../helpers/generarJWT';

export const createUser = async (req: Request, res: Response) => {
    const { dni, nombre, email, contraseña, }: IUser = req.body

    const student = new User({ dni, nombre, email, contraseña });

    const salt = bcryptjs.genSaltSync();
    student.contraseña = bcryptjs.hashSync(contraseña, salt);

    student.code = randomstring.generate(6);

    await student.save();

    sendEmail(email, student.code);

    res.json({
        message: "Usuario creado correctamente",
        student
    });
};

export const verifyUser = async (req: Request, res: Response) => {
    const { email, code } = req.body;

    try {
        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.json({
                message: "Email no encontrado"
            });
        }

        if (usuario.verified) {
            return res.json({
                message: "Email ya verificado"
            });
        }

        if (usuario.code !== code) {
            return res.json({
                message: "Codigo incorrecto"
            });
        }

        await User.findOneAndUpdate({ email }, { verified: true });

        res.json({
            message: "Email verificado correctamente",
            usuario
        });
    } catch (error) {
        console.log(error)
        res.json({
            message: "Algo salio mal",
            error
        });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    const condicion = { estado: true };

    const students: IUser[] = await User.find(condicion);

    if (!students) {
        return res.json({
            message: "Usuarios no encontrados"
        });
    }

    res.json({
        message: "Usuarios obtenidos correctamente",
        students
    });
};

export const getUser = async (req: Request, res: Response) => {
    const { dni } = req.params;

    const student: IUser | null = await User.findOne({ dni });

    if (!student) {
        return res.json({
            message: "Usuario no encontrado"
        });
    }

    res.json({
        message: "Usuario obtenido correctamente",
        student
    });
};

export const updateUser = async (req: Request, res: Response) => {
    const { dni } = req.params;

    const { estado, ...data } = req.body;

    const student = await User.findOneAndUpdate({ dni }, data, { new: true });


    if (!student) {
        return res.json({
            message: "Usuario no encontrado"
        });
    }

    res.json({
        message: "Usuario actualizado correctamente",
        student
    });
};

export const hardDeleteUser = async (req: Request, res: Response) => {
    const { dni } = req.params;

    const student = await User.findOneAndDelete({ dni });

    if (!student) {
        return res.json({
            message: "Usuario no encontrado"
        });
    }

    res.json({
        message: "Usuario eliminado correctamente",
        student
    });
};

export const softDeleteUser = async (req: Request, res: Response) => {
    const { dni } = req.params;

    const student = await User.findOneAndUpdate({ dni }, { estado: false }, { new: true });

    if (!student) {
        return res.json({
            message: "Usuario no encontrado"
        });
    }

    res.json({
        message: "Usuario eliminado correctamente",
        student
    });
};

export const login = async (req: Request, res: Response) => {
    const { email, contraseña } = req.body;

    try {
        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.json({
                message: "Email no encontrado"
            });
        }

        const validPassword = bcryptjs.compareSync(contraseña, usuario.contraseña);

        if (!validPassword) {
            return res.json({
                message: "Contraseña incorrecta"
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            message: "Login correcto",
            usuario,
            token
        });

    } catch (error) {
        console.log(error)
        res.json({
            message: "Algo salio mal"
        });
    }
};