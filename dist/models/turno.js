"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const turnoSchema = new mongoose_1.Schema({
    fechayhora: { type: Date },
    reservacion: { type: Date },
    paciente: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    medico: { type: String, required: true },
    especialidad: { type: String, required: true },
    estado: { type: String, default: "Pendiente a confirmar", required: true },
});
const Turno = (0, mongoose_1.model)('Turno', turnoSchema);
exports.default = Turno;
