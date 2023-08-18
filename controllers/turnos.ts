import { Response, Request } from "express";
import Turno, {ITurno} from "../models/turno";
import { ObjectId } from "mongoose";
 
export const getTurnos = async (req: Request, res: Response) => {
    const usuarioId: ObjectId = req.body.usuuarioConfirmado._id;

    const turnos: ITurno[] = await Turno.find({ paciente: usuarioId }).populate('paciente', 'nombre apellido').exec();

    res.json({
        data: [...turnos]
    });
};

export const createTurno = async (req: Request, res: Response) => {
    const usuarioId: ObjectId = req.body.usuuarioConfirmado._id;

    const turnoData = req.body;

    const data: ITurno = new Turno({
        ...turnoData,
        paciente: usuarioId,
        fecha: new Date(),
        estado: 'Pendiente a confirmar'
    });

    const turno = new Turno(data);

    await turno.save();

    res.json({
        msg: 'Turno creado',
        data: turno
    });
};