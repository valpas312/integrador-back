import { Model, Schema, Types, model } from 'mongoose';

export interface ITurno {
    fechayhora?: Date;
    reservacion?: Date;
    paciente?: Types.ObjectId;
    medico: string;
    especialidad: string;
    estado: string;
}

const turnoSchema = new Schema<ITurno>({
    fechayhora: { type: Date },
    reservacion: { type: Date },
    paciente: { type: Schema.Types.ObjectId, ref:"Users", required: true },
    medico: { type: String, required: true },
    especialidad: { type: String, required: true },
    estado: { type: String, default: "Pendiente a confirmar", required: true },
});

turnoSchema.methods.toJSON = function () {
    const { __v, ...turno } = this.toObject();
    return turno;
};

const Turno: Model<ITurno> = model<ITurno>('Turno', turnoSchema);

export default Turno;