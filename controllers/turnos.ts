import { Response, Request } from "express";
import Turno, {ITurno} from "../models/turno";
import { ObjectId } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
 
export const getTurnos = async (req: Request, res: Response) => {
    const usuarioId: ObjectId = req.body._id;

    const turnos: ITurno[] = await Turno.find({ paciente: usuarioId }).populate('paciente', 'nombre').exec();

    res.json({
        data: [...turnos]
    });
};

export const createTurno = async (req: Request, res: Response) => {
    const token = req.header("x-token") as string;

    const payload = jwt.verify(token, "clavesecreta") as JwtPayload;

    const { _id } = payload;

    const turnoData = req.body;

    const data: ITurno = new Turno({
       ...turnoData,
        reservacion: new Date(),
        paciente: _id,
        estado: "Pendiente a confirmar"
    });

    const turno = new Turno(data);

    await turno.save();

    res.json({
        msg: 'Turno creado',
        data: turno
    });
};