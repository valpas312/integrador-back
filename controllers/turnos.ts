import { Response, Request } from "express";
import Turno, { ITurno } from "../models/turno";
import { ObjectId } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getTurnos = async (req: Request, res: Response) => {
    const usuarioId: ObjectId = req.body._id;

    const turnos: ITurno[] = await Turno.find({ paciente: usuarioId }).populate('paciente', 'users').exec();

    res.json({
        data: [...turnos]
    });
};

// export const getTurnosPendientes = async (req: Request, res: Response) => {
//     const turnos: ITurno[] = await Turno.find({ estado: "Pendiente a confirmar" }).populate('paciente', 'nombre').exec();

//     res.json({
//         data: [...turnos]
//     });
// };

// export const getTurnosConfirmados = async (req: Request, res: Response) => {
//     const turnos: ITurno[] = await Turno.find({ estado: "Confirmado" }).populate('paciente', 'nombre').exec();

//     res.json({
//         data: [...turnos]
//     });
// };

// export const getTurnosCancelados = async (req: Request, res: Response) => {
//     const turnos: ITurno[] = await Turno.find({ estado: "Cancelado" }).populate('paciente', 'nombre').exec();

//     res.json({
//         data: [...turnos]
//     });
// };

// export const getTurnosAsistidos = async (req: Request, res: Response) => {
//     const turnos: ITurno[] = await Turno.find({ fechayhora: { $lt: new Date() } }).populate('paciente', 'nombre').exec();

//     res.json({
//         data: [...turnos]
//     });
// };

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

export const verifyTurno = async (req: Request, res: Response) => {
    const { _id } = req.params;

    const turno = await Turno.findByIdAndUpdate(_id, { estado: "Confirmado" }, { new: true });

    res.json({
        msg: 'Turno confirmado',
        data: turno
    });
};

export const softDeleteTurno = async (req: Request, res: Response) => {
    const { _id } = req.params;

    const turno = await Turno.findByIdAndUpdate(_id, { estado: "Cancelado" }, { new: true });

    res.json({
        msg: 'Turno eliminado',
        data: turno
    });
};


export const hardDeleteTurno = async (req: Request, res: Response) => {
    const { _id } = req.params;

    const turno = await Turno.findByIdAndDelete(_id);

    res.json({
        msg: 'Turno eliminado',
        data: turno
    });
};