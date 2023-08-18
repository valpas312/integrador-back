import { Model, Schema, Types,model } from 'mongoose';

export interface ITurno {
    id: string;
    fecha: Date;
    hora: string;
    paciente: Types.ObjectId;
    medico: string;
    especialidad: string;
    estado: string;
}

const turnoSchema = new Schema<ITurno>({
    fecha: { type: Date, required: true },
    hora: { type: String, required: true },
    paciente: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    medico: { type: String, required: true },
    especialidad: { type: String, required: true },
    estado: { type: String, required: true },
});

const Turno: Model<ITurno> = model<ITurno>('Turno', turnoSchema);

export default Turno;