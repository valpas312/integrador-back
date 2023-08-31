import { NextFunction, Request, Response } from "express";

import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";

import User, { IUser } from "../models/user";

const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("x-token") as string;

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }

    if (TokenExpiredError) {
        return res.status(401).json({
            msg: "Token expirado"
        });
    }

    try {
        const payload = jwt.verify(token, "clavesecreta") as JwtPayload;

        const { _id } = payload;

        const usuarioConfirmado: IUser | null = await User.findById(_id);

        if (!usuarioConfirmado) {
            return res.status(401).json({
                msg: "Token no válido - usuario no existe en DB"
            });
        }

        req.body.usuarioConfirmado = usuarioConfirmado;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido"
        });
    }

};

export default validarJWT;