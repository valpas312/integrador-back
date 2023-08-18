import { NextFunction, Request, Response } from "express";

export const isVerified = async (req: Request, res: Response, next: NextFunction) => {
    const usuarioConfirmado = req.body.usuarioConfirmado;

    if (!usuarioConfirmado.verificado) {
        return res.status(401).json({
            msg: "Usuario no verificado"
        });
    }

    next();
};