import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '../mail/mail';
import randomstring from 'randomstring';
import { generarJWT } from '../helpers/generarJWT';

export const createUser = async (req: Request, res: Response) => {
    const { dni, nombre, email, contraseña, }: IUser = req.body

    const user = new User({ dni, nombre, email, contraseña });

    const salt = bcryptjs.genSaltSync();
    user.contraseña = bcryptjs.hashSync(contraseña, salt);

    user.code = randomstring.generate(6);

    await user.save();

    sendEmail(email, user.code);

    res.json({
        message: "Usuario creado correctamente",
        user
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

    const usuarios: IUser[] = await User.find(condicion);

    if (!usuarios) {
        return res.json({
            message: "Usuarios no encontrados"
        });
    }

    res.json({
        message: "Usuarios obtenidos correctamente",
        usuarios
    });
};

export const getUser = async (req: Request, res: Response) => {
    const { dni } = req.params;

    const usuario: IUser | null = await User.findOne({ dni });

    if (!usuario) {
        return res.json({
            message: "Usuario no encontrado"
        });
    }

    res.json({
        message: "Usuario obtenido correctamente",
        usuario
    });
};

export const updateUser = async (req: Request, res: Response) => {
    const { dni } = req.params;

    const { estado, ...data } = req.body;

    const usuario = await User.findOneAndUpdate({ dni }, data, { new: true });


    if (!usuario) {
        return res.json({
            message: "Usuario no encontrado"
        });
    }

    res.json({
        message: "Usuario actualizado correctamente",
        usuario
    });
};

export const hardDeleteUser = async (req: Request, res: Response) => {
    const { dni } = req.params;

    const usuario = await User.findOneAndDelete({ dni });

    if (!usuario) {
        return res.json({
            message: "Usuario no encontrado"
        });
    }

    res.json({
        message: "Usuario eliminado correctamente",
        usuario
    });
};

export const softDeleteUser = async (req: Request, res: Response) => {
    const { dni } = req.params;

    const usuario = await User.findOneAndUpdate({ dni }, { estado: false }, { new: true });

    if (!usuario) {
        return res.json({
            message: "Usuario no encontrado"
        });
    }

    res.json({
        message: "Usuario eliminado correctamente",
        usuario
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